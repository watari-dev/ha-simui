// Shared model + helpers for the polished entity picker sub-components
// (src/editor/picker/*). Pure TS — no React, no CSS. These are the small,
// self-contained pieces the picker composes; they consume the `EntityIndex`
// (src/editor/entityIndex.ts) the parent builds, never the raw registry.
//
// Design law (DESIGN_PRINCIPLES.md): area-grouped + faceted, graceful degradation
// (cap + "+N more", never an infinite wall), group entities surfaced as denser
// compositions. Monochrome base, single accent reserved for selection/active.

import {
  Activity,
  AirVent,
  Blinds,
  Camera,
  CircleDot,
  Fan,
  Gauge,
  Layers,
  Lightbulb,
  Lock,
  MapPin,
  Music,
  PlayCircle,
  Power,
  Radio,
  Shield,
  Sparkles,
  Thermometer,
  ToggleRight,
  User,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type { EntityFacets } from '../types';
import type { EntityIndex, FacetOption, SearchHit } from '../entityIndex';
import type { HassEntities, HassEntity } from '../../types';

// ─────────────────────────────────────────────────────────────────────────────
// Row model — one entity, fully resolved for render. Built from a SearchHit + the
// index so the list components stay dumb (no index plumbing per row).
// ─────────────────────────────────────────────────────────────────────────────

export interface PickerRow {
  entityId: string;
  entity: HassEntity | undefined;
  /** Cached display label (friendly_name). */
  label: string;
  /** Domain segment (cached). */
  domain: string;
  /** Resolved area key, or undefined when unassigned. */
  areaId: string | undefined;
  /** Composes denser than its members (group.* / member list). */
  isGroup: boolean;
  /** Fuzzy-highlight indices into `label` (empty when no query). */
  hits: number[];
  /** Whether the entity is selected (mirrored for cheap render). */
  selected: boolean;
  /** Whether the entity is already on the surface. */
  existing: boolean;
}

/** A bucket of rows for one area (or the "Unassigned" pseudo-area). */
export interface AreaBucket {
  /** Stable area key; the sentinel UNASSIGNED for entities with no area. */
  areaId: string;
  /** Human label for the section header. */
  label: string;
  rows: PickerRow[];
}

/** Sentinel key for entities that resolve to no area. */
export const UNASSIGNED = '__unassigned__';

// ─────────────────────────────────────────────────────────────────────────────
// Domain → glyph. The shared `iconNode(undefined)` always yields a neutral dot;
// the picker reads denser when each row carries its domain's silhouette. Group
// entities override with a Layers badge upstream. Unknown domains fall back to the
// neutral dot, matching the rest of the app.
// ─────────────────────────────────────────────────────────────────────────────

const DOMAIN_ICONS: Record<string, LucideIcon> = {
  light: Lightbulb,
  switch: ToggleRight,
  sensor: Activity,
  binary_sensor: Radio,
  climate: Thermometer,
  cover: Blinds,
  media_player: Music,
  lock: Lock,
  fan: Fan,
  camera: Camera,
  vacuum: AirVent,
  scene: Sparkles,
  script: PlayCircle,
  automation: PlayCircle,
  person: User,
  device_tracker: MapPin,
  weather: Activity,
  number: Gauge,
  select: CircleDot,
  button: Power,
  input_button: Power,
  alarm_control_panel: Shield,
  group: Layers,
  zone: MapPin,
  sun: Sparkles,
  update: Zap,
};

/** The lucide glyph for a domain (group entities are handled by callers). */
export function domainIcon(domain: string): LucideIcon {
  return DOMAIN_ICONS[domain] ?? CircleDot;
}

// ─────────────────────────────────────────────────────────────────────────────
// Live-ish state hint — a compact, glanceable string for the row's right rail.
// We resolve from the snapshot the index was built over; this is "live-ish" in the
// sense the picker re-derives it each render from the latest snapshot passed down.
// Units are appended for numeric sensors so a reading reads as a reading.
// ─────────────────────────────────────────────────────────────────────────────

export function stateHint(entity: HassEntity | undefined): string {
  if (!entity) return 'unavailable';
  const s = entity.state;
  if (s === 'unavailable' || s === 'unknown' || s === '') return 'unavailable';
  const unit = entity.attributes?.unit_of_measurement as string | undefined;
  if (unit && /^-?\d/.test(s)) return `${s}${unit === '%' ? '' : ' '}${unit}`;
  // Title-case bare on/off/open/closed-style states for a calmer read.
  if (/^[a-z_]+$/.test(s)) return s.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
  return s;
}

/** True when the entity is missing or in a dead state (drives a dimmed row). */
export function isDead(entity: HassEntity | undefined): boolean {
  return !entity || entity.state === 'unavailable' || entity.state === 'unknown';
}

// ─────────────────────────────────────────────────────────────────────────────
// Search → rows → area buckets. The whole filtered/ranked pipeline lives in the
// index; these adapters turn its `SearchHit[]` into the render-ready shapes the
// list component wants, applying the selection/existing flags and area grouping.
// ─────────────────────────────────────────────────────────────────────────────

/** Build the flat, ranked row list from the index for the current facets. */
export function rowsFromIndex(
  index: EntityIndex,
  states: HassEntities,
  facets: EntityFacets,
  selectedSet: ReadonlySet<string>,
  existingSet: ReadonlySet<string>,
): PickerRow[] {
  const hits: SearchHit[] = index.search(facets.query ?? '', {
    domains: facets.domains,
    areas: facets.areas,
    primaryOnly: facets.primaryOnly !== false,
    // Selection/on-surface entities stay visible even behind the curation gate.
    keep: unionKeep(selectedSet, existingSet),
  });
  const out: PickerRow[] = [];
  for (const h of hits) {
    const id = h.entityId;
    out.push({
      entityId: id,
      entity: states[id],
      label: index.labelOf(id),
      domain: index.domainOfId(id),
      areaId: index.areaOf(id),
      isGroup: index.isGroup(id),
      hits: h.hits,
      selected: selectedSet.has(id),
      existing: existingSet.has(id),
    });
  }
  return out;
}

function unionKeep(a: ReadonlySet<string>, b: ReadonlySet<string>): string[] {
  if (a.size === 0 && b.size === 0) return [];
  const s = new Set<string>(a);
  for (const x of b) s.add(x);
  return [...s];
}

/**
 * Group ranked rows into area buckets, preserving the relative (ranked) order of
 * rows within each bucket. When a query is active the buckets are ordered by their
 * best (first) row's rank so the strongest match floats to the top; otherwise
 * alphabetically by label, with "Unassigned" pinned last. `areaName` resolves a
 * key to its header label (from the index's area facets).
 */
export function bucketByArea(
  rows: PickerRow[],
  areaName: (areaId: string) => string,
  sorted: boolean,
): AreaBucket[] {
  const buckets = new Map<string, AreaBucket>();
  const order: string[] = [];
  for (const r of rows) {
    const key = r.areaId ?? UNASSIGNED;
    let b = buckets.get(key);
    if (!b) {
      b = { areaId: key, label: key === UNASSIGNED ? 'Unassigned' : areaName(key), rows: [] };
      buckets.set(key, b);
      order.push(key);
    }
    b.rows.push(r);
  }
  const list = order.map((k) => buckets.get(k)!);
  if (sorted) {
    list.sort((a, b) => {
      if (a.areaId === UNASSIGNED) return 1;
      if (b.areaId === UNASSIGNED) return -1;
      return a.label.localeCompare(b.label);
    });
  }
  return list;
}

// ─────────────────────────────────────────────────────────────────────────────
// Facet option helpers — thin pass-throughs so the FacetBar never imports the
// index's internals; it just renders `FacetOption[]` it is handed.
// ─────────────────────────────────────────────────────────────────────────────

export type { FacetOption };
