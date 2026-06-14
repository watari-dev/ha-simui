// Preset gallery (PRESETS.md) — onboarding = pick a preset, it lays out *your*
// real devices, you edit. Each preset is a PURE builder: it inspects the live
// states (+ optional area registry) and composes an ordered list of Blocks
// (FRAMEWORK.md) plus an optional StatusStrip. No hooks, no subscriptions — the
// output is plain data the surface renderer subscribes to per-entity.
//
// > Degradation is part of every spec (PRESETS.md). A builder must look right at
// > 3 entities or 280: it prefers group/aggregate entities, auto-detects which
// > integrations/domains exist, and includes only the blocks that have content.
import type { Block, Condition, ListSource, Matcher } from '../types';
import type { ColorToken, HassAction, TileFeature } from '../../widgets/tileContract';
import type { HassEntities, HassEntity } from '../../types';
import type { AreaMap, RegistryMeta } from '../areas';
import { isPrimaryEntity } from '../areas';
import { domainOf, friendly } from '../../util';

import { buildHome } from './home';
import { buildLights } from './lights';
import { buildMedia } from './media';
import { buildClimate } from './climate';
import { buildSensors } from './sensors';
import { buildPower } from './power';
import { buildSecurity } from './security';
import { buildServer } from './server';

// ── Gallery descriptors ──────────────────────────────────────────────────────
// These describe the *category surfaces* the gallery produces. They are not part
// of the persisted DashboardConfig (that's room-shaped); a surface is rendered
// directly, or its `blocks` are dropped into a Room when the user "saves" it.

/** entityId → its area + floor (FRAMEWORK.md §8). Re-exported from the resolver. */
export type { AreaMap, RegistryMeta } from '../areas';
/** The shared curation gate (TODO Tier A) — re-exported so builders can curate directly. */
export { isPrimaryEntity, isPrimary } from '../areas';

/** One pill in a surface's top chrome (FRAMEWORK.md §6). Pure data; the strip renderer owns subscriptions. */
export type StripPill =
  | { kind: 'count'; icon: string; label: string; source: ListSource; accent?: ColorToken; path?: string; zeroText?: string }
  | { kind: 'nav'; icon: string; label: string; path: string; accent?: ColorToken }
  | { kind: 'action'; icon: string; label: string; action: HassAction; accent?: ColorToken }
  | { kind: 'conditional'; icon: string; label: string; visibleWhen: Condition; accent?: ColorToken }
  | { kind: 'status'; entityId: string; stateContent?: string[] }
  | { kind: 'select'; entityId: string; name?: string };

/** A composed surface: top chrome + an ordered list of blocks. */
export interface Surface {
  statusStrip?: StripPill[];
  blocks: Block[];
}

/** Everything a builder needs. `areas` and `registry` are optional (mock/dev has none). */
export interface PresetContext {
  states: HassEntities;
  areas?: AreaMap;
  /**
   * Per-entity registry curation metadata (TODO Tier A). When present, the shared
   * scan helpers (`ofDomain`, `resolveSource`) exclude diagnostic/config/hidden/
   * disabled entities in addition to the always-on entity_id pattern filter. When
   * absent (dev/mock), only the pattern filter runs — surfaces never blank out.
   */
  registry?: RegistryMeta;
}

/** One entry in the gallery. `build` is pure and total — it always returns a Surface (possibly sparse). */
export interface Preset {
  id: string;
  name: string;
  description: string;
  /** Categorical accent for the launcher tile / nav pill (FRAMEWORK.md §7). */
  accent?: ColorToken;
  build: (ctx: PresetContext) => Surface;
}

// ── The registry ─────────────────────────────────────────────────────────────

export const PRESETS: Preset[] = [
  {
    id: 'home',
    name: 'Home summary',
    description: 'The landing surface — status strip, scenes, a category launcher, live status, security.',
    accent: 'accent',
    build: buildHome,
  },
  {
    id: 'lights',
    name: 'Lights',
    description: 'All your lights, grouped by room, with the room group tile leading each section.',
    accent: 'warm',
    build: buildLights,
  },
  {
    id: 'media',
    name: 'Media',
    description: 'What’s playing now, with transport, over a compact list of every speaker and display.',
    accent: 'violet',
    build: buildMedia,
  },
  {
    id: 'climate',
    name: 'Climate',
    description: 'Feature-control tiles — mode and setpoint inline — plus a comfort trend.',
    accent: 'accent',
    build: buildClimate,
  },
  {
    id: 'sensors',
    name: 'Sensors',
    description: 'Split by data type — numeric sparklines, binary status tiles, overview charts.',
    accent: 'up',
    build: buildSensors,
  },
  {
    id: 'power',
    name: 'Power',
    description: 'Merged generation + consumption, a live flow chart, and a per-circuit sparkline wall.',
    accent: 'warn',
    build: buildPower,
  },
  {
    id: 'security',
    name: 'Security',
    description: 'A presence-first status board — locks, doors and hazards — with an Attention escalation strip and the alarm hero.',
    accent: 'green',
    build: buildSecurity,
  },
  {
    id: 'server',
    name: 'Server / Homelab',
    description: 'Node vitals, VM/container control, ZFS, backups and a service launchpad — auto-detected.',
    accent: 'up',
    build: buildServer,
  },
];

/** Look up a preset by id. */
export function getPreset(id: string): Preset | undefined {
  return PRESETS.find((p) => p.id === id);
}

// ── Shared, pure helpers (used by every builder) ─────────────────────────────
// Kept here so the whole gallery shares one matcher/grouping/naming vocabulary
// and the file set stays to the manifest (index + the six builders).

let _seq = 0;
/** Stable, deterministic block id within a single build pass (pure — no crypto/uuid). */
export function blockId(prefix: string): string {
  _seq += 1;
  return `preset-${prefix}-${_seq}`;
}

/** Glob match where `*` is any run of chars; falls back to exact when no `*`. */
export function globMatch(pattern: string, value: string): boolean {
  if (!pattern.includes('*')) return pattern === value;
  const rx = new RegExp(
    '^' + pattern.split('*').map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*') + '$',
    'i',
  );
  return rx.test(value);
}

function asArray<T>(v: T | T[] | undefined): T[] {
  return v == null ? [] : Array.isArray(v) ? v : [v];
}

/** Does an entity satisfy a single Matcher (fields AND within the matcher)? */
export function matches(e: HassEntity, m: Matcher, areaOf?: (id: string) => string | undefined): boolean {
  if (m.entityId && !globMatch(m.entityId, e.entity_id)) return false;
  if (m.domain && domainOf(e.entity_id) !== m.domain) return false;
  if (m.state) {
    const states = asArray(m.state);
    if (!states.includes(e.state)) return false;
  }
  if (m.name && !globMatch(m.name, friendly(e))) return false;
  if (m.area) {
    const a = areaOf?.(e.entity_id);
    if (a !== m.area) return false;
  }
  return true;
}

/**
 * Resolve a ListSource against states → entity ids (include OR, exclude after).
 * The curation gate runs first on every candidate (TODO Tier A): diagnostic/config/
 * hidden/disabled (when `meta` is supplied) and entity_id pattern noise (always)
 * are dropped before include/exclude, so no list ever surfaces noise. `meta` is
 * optional — without it only the pattern filter applies (dev/mock fallback).
 */
export function resolveSource(
  source: ListSource,
  states: HassEntities,
  areaOf?: (id: string) => string | undefined,
  meta?: RegistryMeta,
): string[] {
  // A source may opt out of the gate when it *intends* to surface noise/maintenance
  // entities (e.g. the Server preset's update/attention lists). Default: gate on.
  const gate = !source.includeNoise;
  const out: string[] = [];
  for (const e of Object.values(states)) {
    if (gate && !isPrimaryEntity(e.entity_id, e, meta?.[e.entity_id])) continue;
    if (!source.include.some((m) => matches(e, m, areaOf))) continue;
    if (source.exclude?.some((m) => matches(e, m, areaOf))) continue;
    out.push(e.entity_id);
  }
  return out.sort();
}

/**
 * The domains a source's include matchers constrain to, or `null` when ANY matcher
 * is cross-domain (no `domain`) — then the candidate set can't be narrowed. Used to
 * scope a `useAggregate(resolveSource…, deps)` so it only re-scans when an entity of
 * a relevant domain changed, not on every tick (TODO Tier A de-jank).
 */
export function sourceDomains(source: ListSource): string[] | null {
  if (!source.include.length) return null;
  const doms = new Set<string>();
  for (const m of source.include) {
    if (!m.domain) return null;
    doms.add(m.domain);
  }
  return [...doms];
}

/** Entity ids whose domain is one of `domains` — the candidate dep set for a domain-scoped source. */
export function keysOfDomains(states: HassEntities, domains: string[]): string[] {
  const set = new Set(domains);
  const out: string[] = [];
  for (const id of Object.keys(states)) if (set.has(domainOf(id))) out.push(id);
  return out;
}

/**
 * All PRIMARY entities of a domain, friendly-name sorted. The curation gate (TODO
 * Tier A) excludes diagnostic/config/hidden/disabled (when `meta` is supplied) and
 * entity_id pattern noise (always), so every builder that scans by domain is noise-
 * free for free. `meta` is optional — without it only the pattern filter applies.
 */
export function ofDomain(states: HassEntities, domain: string, meta?: RegistryMeta): HassEntity[] {
  return Object.values(states)
    .filter((e) => domainOf(e.entity_id) === domain && isPrimaryEntity(e.entity_id, e, meta?.[e.entity_id]))
    .sort((a, b) => friendly(a).localeCompare(friendly(b)));
}

/** Count entities matching a predicate. */
export function countWhere(states: HassEntities, pred: (e: HassEntity) => boolean): number {
  let n = 0;
  for (const e of Object.values(states)) if (pred(e)) n += 1;
  return n;
}

/** True when at least one entity matches. */
export function anyWhere(states: HassEntities, pred: (e: HassEntity) => boolean): boolean {
  for (const e of Object.values(states)) if (pred(e)) return true;
  return false;
}

/** Available (not unavailable/unknown) entities only — the common exclude. */
export function isLive(e: HassEntity): boolean {
  return e.state !== 'unavailable' && e.state !== 'unknown';
}

/** A device-class predicate over the entity's attributes. */
export function hasDeviceClass(e: HassEntity, ...classes: string[]): boolean {
  const dc = e.attributes.device_class as string | undefined;
  return dc != null && classes.includes(dc);
}

/** Numeric sensors only (have a unit) — the chartable/sparkline set. */
export function isNumericSensor(e: HassEntity): boolean {
  return domainOf(e.entity_id) === 'sensor' && e.attributes.unit_of_measurement != null && isLive(e);
}

// ── Naming: heading carries the noun, the tile carries the leaf (FRAMEWORK.md §1/§8)
// Strip a leading area/group prefix from a friendly name so the tile shows the leaf.
export function leafName(e: HassEntity, prefix?: string): string {
  let n = friendly(e);
  if (prefix) {
    const lower = n.toLowerCase();
    const p = prefix.toLowerCase();
    if (lower.startsWith(p + ' ')) n = n.slice(prefix.length + 1);
    else if (lower.startsWith(p)) n = n.slice(prefix.length);
  }
  return n.trim() || friendly(e);
}

// ── Area assignment (real registry preferred; name-heuristic fallback) ───────
const ROOM_KEYWORDS: Array<[string, string]> = [
  ['living', 'Living Room'], ['lounge', 'Living Room'], ['kitchen', 'Kitchen'],
  ['bedroom', 'Bedroom'], ['bed_', 'Bedroom'], ['master', 'Bedroom'],
  ['office', 'Office'], ['study', 'Office'], ['bath', 'Bathroom'], ['ensuite', 'Bathroom'],
  ['hall', 'Hallway'], ['entry', 'Entryway'], ['garage', 'Garage'], ['laundry', 'Laundry'],
  ['dining', 'Dining'], ['outside', 'Outdoor'], ['outdoor', 'Outdoor'], ['garden', 'Garden'],
  ['backyard', 'Outdoor'], ['patio', 'Outdoor'], ['porch', 'Outdoor'],
];

/**
 * Resolve a room/area label for an entity. Prefers a real area registry when
 * one was supplied (`areas` + an `area_id` attribute), else a name heuristic.
 */
export function roomLabelOf(e: HassEntity, areas?: AreaMap): string {
  // The resolved registry is keyed by ENTITY id (HA does not put area_id in state).
  const reg = areas?.[e.entity_id];
  if (reg) return reg.areaName;
  const hay = `${e.entity_id} ${friendly(e)}`.toLowerCase();
  for (const [kw, name] of ROOM_KEYWORDS) if (hay.includes(kw)) return name;
  return 'Home';
}

/** The floor an entity sits on, when the registry knows it (else undefined). */
export function floorLabelOf(e: HassEntity, areas?: AreaMap): string | undefined {
  return areas?.[e.entity_id]?.floorName ?? undefined;
}

/** Group a set of entities into rooms, preserving a sensible room order. */
export function groupByRoom(entities: HassEntity[], areas?: AreaMap): Array<[string, HassEntity[]]> {
  const ROOM_ORDER = [
    'Living Room', 'Kitchen', 'Dining', 'Bedroom', 'Office', 'Bathroom', 'Hallway',
    'Entryway', 'Laundry', 'Garage', 'Outdoor', 'Garden', 'Home',
  ];
  const byRoom = new Map<string, HassEntity[]>();
  for (const e of entities) {
    const room = roomLabelOf(e, areas);
    let arr = byRoom.get(room);
    if (!arr) { arr = []; byRoom.set(room, arr); }
    arr.push(e);
  }
  return [...byRoom.entries()].sort((a, b) => {
    const ia = ROOM_ORDER.indexOf(a[0]);
    const ib = ROOM_ORDER.indexOf(b[0]);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a[0].localeCompare(b[0]);
  });
}

// ── Common matcher fragments ─────────────────────────────────────────────────
/** Exclude the dead/unknown states from a list source. */
export const EXCLUDE_DEAD: Matcher[] = [{ state: 'unavailable' }, { state: 'unknown' }];

export type { Block, ListSource, Matcher, Condition };
export type { ColorToken, HassAction, TileFeature };
