// Area-registry resolver (FRAMEWORK.md §8) — replaces the name-keyword heuristic.
//
// When embedded in Home Assistant we have a live `connection`, so we can ask HA
// the real truth: fetch the area / device / entity registries and join
// entity -> device -> area (honouring a per-entity area override). In dev/mock
// (no connection) we degrade gracefully to the same name-keyword guess the
// auto-generator uses, so rooms still resolve offline.

import { useEffect, useState } from 'react';
import type { HassEntities, HassEntity, HassSource } from '../types';
import { friendly } from '../util';
import { useHassSource } from '../hass/context';

/** entityId -> the area (and its floor) it belongs to. */
export type AreaMap = Record<
  string,
  { areaId: string; areaName: string; floorId: string | null; floorName: string | null }
>;

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

/**
 * Per-source memo so the three registry WS calls fire ONCE and every consumer
 * (the store at config-gen + each `useAreas`) shares one in-flight promise
 * (FRAMEWORK.md §8: resolve once per source). Keyed by the source object; a new
 * source (reconnect) gets a fresh fetch.
 */
const _cache = new WeakMap<HassSource, Promise<AreaMap>>();

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
  let p = _cache.get(source);
  if (!p) {
    p = resolveAreasUncached(source);
    _cache.set(source, p);
  }
  return p;
}

async function resolveAreasUncached(source: HassSource): Promise<AreaMap> {
  const { connection } = source;
  if (!connection) return heuristicAreas(source.getStates());

  let areas: AreaRegistryEntry[];
  let devices: DeviceRegistryEntry[];
  let entities: EntityRegistryEntry[];
  let floors: FloorRegistryEntry[] = [];
  try {
    [areas, devices, entities, floors] = await Promise.all([
      connection.sendMessagePromise<AreaRegistryEntry[]>({ type: 'config/area_registry/list' }),
      connection.sendMessagePromise<DeviceRegistryEntry[]>({ type: 'config/device_registry/list' }),
      connection.sendMessagePromise<EntityRegistryEntry[]>({ type: 'config/entity_registry/list' }),
      // Floors are newer; tolerate a server that doesn't know the command.
      connection
        .sendMessagePromise<FloorRegistryEntry[]>({ type: 'config/floor_registry/list' })
        .catch(() => [] as FloorRegistryEntry[]),
    ]);
  } catch {
    // No registry access (restricted token, demo, transient) — degrade cleanly.
    return heuristicAreas(source.getStates());
  }

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
