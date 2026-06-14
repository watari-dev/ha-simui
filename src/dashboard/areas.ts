// Area-registry resolver (FRAMEWORK.md §8) — replaces the name-keyword heuristic.
//
// When embedded in Home Assistant we have a live `connection`, so we can ask HA
// the real truth: fetch the area / device / entity registries and join
// entity -> device -> area (honouring a per-entity area override). In dev/mock
// (no connection) we degrade gracefully to the same name-keyword guess the
// auto-generator uses, so rooms still resolve offline.

import { useEffect, useState } from 'react';
import type { HassEntities, HassEntity, HassSource } from '../types';
import { domainOf, friendly } from '../util';
import { useHassSource } from '../hass/context';

/** entityId -> the area (and its floor) it belongs to. */
export type AreaMap = Record<
  string,
  { areaId: string; areaName: string; floorId: string | null; floorName: string | null }
>;

/**
 * Per-entity registry curation metadata (the curation gate — TODO Tier A). Keyed
 * by entity_id, this is the subset of the entity registry that decides whether an
 * entity is a *primary* surface (user-facing control / reading) vs. noise
 * (diagnostics, config, hidden/disabled). `isPrimaryEntity` reads it.
 *
 * Only present when embedded with registry access; in dev/mock it is absent and
 * curation falls back to entity_id pattern filtering (see `isPrimaryEntity`).
 */
export interface EntityMeta {
  /** HA `entity_category`: 'diagnostic' | 'config' for non-primary surfaces, else null. */
  entityCategory: string | null;
  /** Hidden in the registry (`hidden_by` set) — kept out of dashboards. */
  hidden: boolean;
  /** Disabled in the registry (`disabled_by` set) — has no live state, never primary. */
  disabled: boolean;
}

/** entityId -> its curation metadata (FRAMEWORK.md §8: never expose the raw registry). */
export type RegistryMeta = Record<string, EntityMeta>;

// --- Registry shapes (only the fields we join on). HA may add more; we ignore them.

interface AreaRegistryEntry {
  area_id: string;
  name: string;
  floor_id?: string | null;
}

interface FloorRegistryEntry {
  floor_id: string;
  name: string;
  level?: number | null;
}

interface DeviceRegistryEntry {
  id: string;
  area_id: string | null;
}

interface EntityRegistryEntry {
  entity_id: string;
  device_id: string | null;
  area_id: string | null; // per-entity override; wins over the device's area
  entity_category?: string | null; // 'diagnostic' | 'config' | null
  hidden_by?: string | null; // set ⇒ hidden by user/integration
  disabled_by?: string | null; // set ⇒ disabled (no live state)
}

// --- Name-keyword fallback (mirrors generateDefault.ts ROOM_KEYWORDS) ---------

const ROOM_KEYWORDS: Array<[string, string]> = [
  ['living', 'Living Room'], ['kitchen', 'Kitchen'], ['bedroom', 'Bedroom'], ['bed_', 'Bedroom'],
  ['office', 'Office'], ['bath', 'Bathroom'], ['hall', 'Hallway'], ['garage', 'Garage'],
  ['outside', 'Outdoor'], ['outdoor', 'Outdoor'], ['garden', 'Garden'], ['backyard', 'Outdoor'],
];

/** A stable, slug-like id for a heuristic room (no real area_id exists offline). */
function heuristicAreaId(name: string): string {
  return `heuristic:${name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
}

function roomNameFor(e: HassEntity): string {
  const hay = `${e.entity_id} ${friendly(e)}`.toLowerCase();
  for (const [kw, name] of ROOM_KEYWORDS) if (hay.includes(kw)) return name;
  return 'Home';
}

/**
 * Synchronous name-keyword fallback used when there is no HA connection (dev /
 * mock). Every entity resolves to *some* room so surfaces never go empty.
 */
export function heuristicAreas(states: HassEntities): AreaMap {
  const map: AreaMap = {};
  for (const e of Object.values(states)) {
    const areaName = roomNameFor(e);
    map[e.entity_id] = { areaId: heuristicAreaId(areaName), areaName, floorId: null, floorName: null };
  }
  return map;
}

// --- Registry resolver --------------------------------------------------------

/** The raw registry lists, fetched once per source (or null when offline / no access). */
interface RawRegistry {
  areas: AreaRegistryEntry[];
  devices: DeviceRegistryEntry[];
  entities: EntityRegistryEntry[];
  floors: FloorRegistryEntry[];
}

/**
 * Per-source memo so the registry WS calls fire ONCE and every consumer (the
 * store at config-gen, each `useAreas`, each `useRegistry`) shares one in-flight
 * promise (FRAMEWORK.md §8: resolve once per source). Keyed by the source object;
 * a new source (reconnect) gets a fresh fetch. The raw fetch is cached separately
 * so the area map and the curation meta both derive from a single round-trip.
 */
const _rawCache = new WeakMap<HassSource, Promise<RawRegistry | null>>();
const _areaCache = new WeakMap<HassSource, Promise<AreaMap>>();
const _metaCache = new WeakMap<HassSource, Promise<RegistryMeta>>();

/** Fetch (and memoize) the raw registry lists; null when there is no access. */
function fetchRawRegistry(source: HassSource): Promise<RawRegistry | null> {
  let p = _rawCache.get(source);
  if (!p) {
    p = fetchRawRegistryUncached(source);
    _rawCache.set(source, p);
  }
  return p;
}

async function fetchRawRegistryUncached(source: HassSource): Promise<RawRegistry | null> {
  const { connection } = source;
  if (!connection) return null;
  try {
    const [areas, devices, entities, floors] = await Promise.all([
      connection.sendMessagePromise<AreaRegistryEntry[]>({ type: 'config/area_registry/list' }),
      connection.sendMessagePromise<DeviceRegistryEntry[]>({ type: 'config/device_registry/list' }),
      connection.sendMessagePromise<EntityRegistryEntry[]>({ type: 'config/entity_registry/list' }),
      // Floors are newer; tolerate a server that doesn't know the command.
      connection
        .sendMessagePromise<FloorRegistryEntry[]>({ type: 'config/floor_registry/list' })
        .catch(() => [] as FloorRegistryEntry[]),
    ]);
    return { areas, devices, entities, floors };
  } catch {
    // No registry access (restricted token, demo, transient) — degrade cleanly.
    return null;
  }
}

/**
 * Resolve every entity to its area, memoized per source. Prefers the real HA
 * registries (via the WebSocket connection); falls back to the keyword heuristic
 * when offline.
 *
 * Join order per entity:
 *   1. entity-registry `area_id` override (if set) wins,
 *   2. else the entity's device's `area_id`,
 *   3. else the entity is unassigned (left out of the map).
 *
 * Entities present in `getStates()` but absent from the entity registry (rare:
 * legacy / template) fall through to the heuristic so they still land somewhere.
 */
export function resolveAreas(source: HassSource): Promise<AreaMap> {
  let p = _areaCache.get(source);
  if (!p) {
    p = resolveAreasUncached(source);
    _areaCache.set(source, p);
  }
  return p;
}

async function resolveAreasUncached(source: HassSource): Promise<AreaMap> {
  const raw = await fetchRawRegistry(source);
  if (!raw) return heuristicAreas(source.getStates());
  const { areas, devices, entities, floors } = raw;

  const floorName = new Map<string, string>();
  for (const f of floors) floorName.set(f.floor_id, f.name || f.floor_id);

  const areaName = new Map<string, string>();
  const areaFloor = new Map<string, string | null>();
  for (const a of areas) {
    areaName.set(a.area_id, a.name || a.area_id);
    areaFloor.set(a.area_id, a.floor_id ?? null);
  }

  const deviceArea = new Map<string, string>();
  for (const d of devices) if (d.area_id) deviceArea.set(d.id, d.area_id);

  const floorOf = (areaId: string) => {
    const fid = areaFloor.get(areaId) ?? null;
    return { floorId: fid, floorName: fid ? floorName.get(fid) ?? null : null };
  };

  const map: AreaMap = {};
  const registered = new Set<string>();
  for (const e of entities) {
    registered.add(e.entity_id);
    const areaId = e.area_id ?? (e.device_id ? deviceArea.get(e.device_id) ?? null : null);
    if (!areaId) continue;
    map[e.entity_id] = { areaId, areaName: areaName.get(areaId) ?? areaId, ...floorOf(areaId) };
  }

  // Backfill anything the registry didn't cover with the heuristic so no live
  // entity is left orphaned (keeps surfaces populated during migration).
  const states = source.getStates();
  for (const e of Object.values(states)) {
    if (map[e.entity_id] || registered.has(e.entity_id)) continue;
    const name = roomNameFor(e);
    map[e.entity_id] = { areaId: heuristicAreaId(name), areaName: name, floorId: null, floorName: null };
  }

  return map;
}

// --- React hook ---------------------------------------------------------------

/**
 * Resolve areas once for the active HA source. Returns `undefined` until the
 * async registry fetch settles; renders the heuristic immediately would also be
 * fine, but `undefined` lets callers distinguish "loading" from "no areas".
 *
 * The registries are config (not live state), so this runs once per source —
 * no per-tick re-subscription. Re-resolve by remounting if the registry changes.
 */
export function useAreas(): AreaMap | undefined {
  const source = useHassSource();
  const [areas, setAreas] = useState<AreaMap | undefined>(undefined);

  useEffect(() => {
    let live = true;
    resolveAreas(source).then((m) => {
      if (live) setAreas(m);
    });
    return () => {
      live = false;
    };
  }, [source]);

  return areas;
}

// --- Registry curation gate (TODO Tier A) ------------------------------------
//
// One shared predicate so NO entity scan surfaces noise. The expensive, accurate
// signal is the entity registry (entity_category / hidden_by / disabled_by); when
// that is unavailable (dev/mock, restricted token) we degrade to entity_id PATTERN
// filtering ONLY — never excluding everything, so a missing registry can't blank
// the dashboard.

/**
 * Resolve per-entity curation metadata, memoized per source. Returns `{}` when the
 * registry is unavailable — callers MUST treat an empty map as "no registry, use
 * pattern fallback", never as "everything is noise".
 */
export function resolveRegistryMeta(source: HassSource): Promise<RegistryMeta> {
  let p = _metaCache.get(source);
  if (!p) {
    p = resolveRegistryMetaUncached(source);
    _metaCache.set(source, p);
  }
  return p;
}

async function resolveRegistryMetaUncached(source: HassSource): Promise<RegistryMeta> {
  const raw = await fetchRawRegistry(source);
  if (!raw) return {};
  const meta: RegistryMeta = {};
  for (const e of raw.entities) {
    meta[e.entity_id] = {
      entityCategory: e.entity_category ?? null,
      hidden: e.hidden_by != null,
      disabled: e.disabled_by != null,
    };
  }
  return meta;
}

/**
 * Resolve registry curation metadata once for the active HA source. `undefined`
 * until the fetch settles; an empty object means "no registry access" (pattern
 * fallback applies in `isPrimaryEntity`).
 */
export function useRegistry(): RegistryMeta | undefined {
  const source = useHassSource();
  const [meta, setMeta] = useState<RegistryMeta | undefined>(undefined);

  useEffect(() => {
    let live = true;
    resolveRegistryMeta(source).then((m) => {
      if (live) setMeta(m);
    });
    return () => {
      live = false;
    };
  }, [source]);

  return meta;
}

// Noise patterns on entity_id — the graceful fallback when no registry exists, and
// an always-on backstop even when one does. These are integration-agnostic and
// safe: they only match telemetry/maintenance entities a person never puts on a
// dashboard, never primary controls or readings.
const NOISE_ID_PATTERNS: RegExp[] = [
  /^browser_mod_/i, // browser_mod_* helper entities
  /\.browser_mod_/i, // domain.browser_mod_*
  /_signal_strength$/i, // RSSI / link telemetry
  /_link_?quality$/i, // Zigbee/Z-Wave LQI
  /^update\./i, // update.* (firmware/HACS update entities)
];

// Restart / reboot / identify / update maintenance buttons & switches. These leak
// onto Lights/System surfaces as noise; a person controls them from device pages.
const MAINTENANCE_WORDS = /\b(restart|reboot|identify|update|firmware|re-?index)\b/i;
const MAINTENANCE_DEVICE_CLASSES = new Set(['restart', 'identify', 'update']);

/**
 * The curation gate. `true` ⇒ the entity is a primary, user-facing surface and may
 * appear in a scan; `false` ⇒ it is diagnostic/config/hidden/disabled or pattern
 * noise and must be excluded.
 *
 * @param entityId the entity_id under test
 * @param state    its live HassEntity, when available (used for device_class /
 *                 friendly_name maintenance-button heuristics). Pass `undefined`
 *                 if only the id is known.
 * @param meta     per-entity registry curation metadata. When `undefined` (dev/mock
 *                 or no registry access), ONLY entity_id pattern filtering applies —
 *                 we never exclude everything for lack of a registry.
 */
export function isPrimaryEntity(
  entityId: string,
  state?: HassEntity,
  meta?: EntityMeta,
): boolean {
  // 1. Registry truth (when we have it): diagnostic/config/hidden/disabled = noise.
  if (meta) {
    if (meta.entityCategory === 'diagnostic' || meta.entityCategory === 'config') return false;
    if (meta.hidden || meta.disabled) return false;
  }

  // 2. entity_id pattern noise — always applied (the dev/mock fallback AND a
  //    backstop for integrations that never set entity_category).
  for (const rx of NOISE_ID_PATTERNS) if (rx.test(entityId)) return false;

  // 3. Maintenance buttons/switches: restart / identify / reboot / update.
  const domain = domainOf(entityId);
  if (domain === 'button' || domain === 'switch') {
    const dc = (state?.attributes.device_class as string | undefined) ?? undefined;
    if (dc && MAINTENANCE_DEVICE_CLASSES.has(dc)) return false;
    const hay = `${entityId} ${state ? friendly(state) : ''}`;
    if (MAINTENANCE_WORDS.test(hay)) return false;
  }

  return true;
}

/**
 * Convenience: look up an entity's meta in a `RegistryMeta` and run the gate.
 * `meta` may be `undefined` (no registry) — pattern fallback still applies.
 */
export function isPrimary(
  entityId: string,
  state: HassEntity | undefined,
  meta: RegistryMeta | undefined,
): boolean {
  return isPrimaryEntity(entityId, state, meta?.[entityId]);
}
