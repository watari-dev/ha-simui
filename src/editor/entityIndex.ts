// Faceted entity index (SPEC_EDITOR.md §entity-picker) — the shared, pure data
// layer behind the EntityPicker and the gallery's domain filtering.
//
// Given a live states snapshot plus the resolved area map + registry curation
// metadata (both from src/dashboard/areas.ts), this builds — ONCE per
// states-signature — the facet option lists (domain / area / label) WITH counts,
// a fast fuzzy search over friendly_name + entity_id, and the two bound
// predicates the picker's props want:
//
//   • `areaOf(entityId)`            → the entity's area key (id), or undefined
//   • `isPrimary(entityId, entity)` → the curation gate (REUSES areas.ts; we do
//                                      NOT re-implement the gate logic)
//
// Pure TS — no React, no CSS. The picker subscribes to states itself; this module
// only transforms a snapshot. Memo-friendly: build once and reuse across
// keystrokes (the expensive pass is the per-entity universe build).
//
// Design law (DESIGN_PRINCIPLES.md): group entities compose denser than their
// members, so they are surfaced + badged; facet lists are ordered for glanceable
// scanning (domains by count, areas + labels alphabetically).

import { domainOf, friendly } from '../util';
import { isPrimary as isPrimaryGate } from '../dashboard/areas';
import type { AreaMap, RegistryMeta } from '../dashboard/areas';
import type { HassEntities, HassEntity } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Public shapes
// ─────────────────────────────────────────────────────────────────────────────

/** One facet option (a domain id, an area id, or a label) with its entity count. */
export interface FacetOption {
  /** The raw key used for filtering (domain id / area id / label string). */
  id: string;
  /** Human-readable chip label. */
  label: string;
  /** How many curation-gated entities carry this value. */
  n: number;
}

/** A scored fuzzy-search hit: the entity id, its rank, and label highlight indices. */
export interface SearchHit {
  entityId: string;
  /** Higher = better. */
  score: number;
  /** Match indices into the entity's display label, for highlighting. */
  hits: number[];
}

/** The built, memo-friendly index handed to the picker + gallery. */
export interface EntityIndex {
  /** Every entity id in the snapshot, stable-sorted by display label then id. */
  readonly ids: readonly string[];

  /** entityId → area key (the AreaMap's `areaId`), or undefined when unassigned. */
  areaOf: (entityId: string) => string | undefined;
  /** Curation gate bound to the supplied registry meta — matches EntityPickerProps. */
  isPrimary: (entityId: string, entity: HassEntity | undefined) => boolean;

  /**
   * Domain facet options with counts. `gated` ⇒ counts over primary-only entities
   * (the default, matching `facets.primaryOnly`); otherwise over every entity.
   */
  domainFacets: (gated?: boolean) => FacetOption[];
  /** Area facet options with counts (same `gated` semantics). */
  areaFacets: (gated?: boolean) => FacetOption[];
  /** Label (HA `label_id`) facet options with counts (same `gated` semantics). */
  labelFacets: (gated?: boolean) => FacetOption[];

  /**
   * Fuzzy-rank entities against `query` (matched over friendly_name + entity_id).
   * Empty query ⇒ all ids in stable label order, score 0, no hits. Optionally
   * pre-narrow by domain / area / labels / primary-only before scoring.
   */
  search: (query: string, opts?: SearchOptions) => SearchHit[];

  /** True when the entity composes denser than its members (`group.*` or member list). */
  isGroup: (entityId: string) => boolean;
  /** The cached display label (friendly_name) for an entity. */
  labelOf: (entityId: string) => string;
  /** The domain segment of an entity id (cached). */
  domainOfId: (entityId: string) => string;
  /** Label ids attached to an entity (HA registry `labels`), empty when none. */
  labelsOf: (entityId: string) => readonly string[];
}

/** Narrowing applied before fuzzy scoring in `search`. */
export interface SearchOptions {
  /** Restrict to these domains; empty / omitted ⇒ all. */
  domains?: string[];
  /** Restrict to these area keys; empty / omitted ⇒ all. */
  areas?: string[];
  /** Restrict to entities carrying any of these label ids; empty / omitted ⇒ all. */
  labels?: string[];
  /** Apply the curation gate (default true). */
  primaryOnly?: boolean;
  /** Always keep these ids visible even if the gate would hide them (selection safety). */
  keep?: Iterable<string>;
}

/** Optional inputs beyond the states snapshot, all degrade gracefully when absent. */
export interface BuildIndexInput {
  states: HassEntities;
  /** Resolved area map (src/dashboard/areas.ts `useAreas`). Absent ⇒ no area facet. */
  areas?: AreaMap;
  /** Registry curation meta (src/dashboard/areas.ts `useRegistry`). Absent ⇒ pattern gate. */
  registry?: RegistryMeta;
  /** Optional entityId → label ids (HA registry `labels`). Absent ⇒ no label facet. */
  labels?: Record<string, readonly string[]>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Display helpers (kept in-module so EntityPicker can drop its private copies and
// import these instead — see the integration notes returned to the integrator).
// ─────────────────────────────────────────────────────────────────────────────

const DOMAIN_LABELS: Record<string, string> = {
  light: 'Lights',
  switch: 'Switches',
  sensor: 'Sensors',
  binary_sensor: 'Binary sensors',
  climate: 'Climate',
  cover: 'Covers',
  media_player: 'Media',
  lock: 'Locks',
  fan: 'Fans',
  camera: 'Cameras',
  vacuum: 'Vacuums',
  scene: 'Scenes',
  script: 'Scripts',
  automation: 'Automations',
  group: 'Groups',
  person: 'People',
  device_tracker: 'Trackers',
  weather: 'Weather',
  number: 'Numbers',
  select: 'Selects',
  button: 'Buttons',
};

/** Title-case a slug ("living_room" → "Living Room"); pass spaced names through. */
function titleizeSlug(idOrName: string): string {
  if (/\s/.test(idOrName)) return idOrName;
  const raw = idOrName.replace(/^heuristic:/, '');
  return (
    raw
      .split(/[._-]+/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') || idOrName
  );
}

/** A friendly domain label for the facet rail. */
export function domainLabel(domain: string): string {
  return DOMAIN_LABELS[domain] ?? titleizeSlug(domain);
}

/** A friendly label-id label for the facet rail (label ids are slugs). */
export function labelLabel(labelId: string): string {
  return titleizeSlug(labelId);
}

// ─────────────────────────────────────────────────────────────────────────────
// Fuzzy matcher — a small subsequence scorer (no dependency). Returns a score
// (higher = better) or null when `needle` is not a subsequence of `hay`. Bonuses:
// exact-substring (with prefix/word-boundary boost), word-boundary starts, and
// contiguous runs. `needle` and `hay` must already be lowercased.
// ─────────────────────────────────────────────────────────────────────────────

interface FuzzyResult {
  score: number;
  /** Match indices into `hay`, for highlighting. */
  hits: number[];
}

export function fuzzyScore(needle: string, hay: string): FuzzyResult | null {
  if (!needle) return { score: 0, hits: [] };
  if (!hay) return null;
  // Fast exact-substring path scores highest (clean contiguous range).
  const sub = hay.indexOf(needle);
  if (sub >= 0) {
    const hits: number[] = [];
    for (let i = 0; i < needle.length; i++) hits.push(sub + i);
    const boundary = sub === 0 || /[\s._-]/.test(hay[sub - 1]) ? 40 : 0;
    return { score: 1000 - sub + boundary + needle.length * 4, hits };
  }
  // Subsequence walk.
  let h = 0;
  let score = 0;
  let run = 0;
  const hits: number[] = [];
  for (let n = 0; n < needle.length; n++) {
    const ch = needle[n];
    let found = -1;
    for (; h < hay.length; h++) {
      if (hay[h] === ch) {
        found = h;
        break;
      }
    }
    if (found < 0) return null;
    const prev = hay[found - 1];
    const boundary = found === 0 || (prev !== undefined && /[\s._-]/.test(prev));
    score += 1 + (boundary ? 8 : 0) + run * 3; // contiguous runs compound
    run = found === (hits[hits.length - 1] ?? -2) + 1 ? run + 1 : 0;
    hits.push(found);
    h = found + 1;
  }
  return { score, hits };
}

/** `group.*`, or any entity whose attributes carry a >1 `entity_id` member list. */
function isGroupEntity(id: string, e: HassEntity | undefined): boolean {
  if (domainOf(id) === 'group') return true;
  const members = e?.attributes?.entity_id;
  return Array.isArray(members) && members.length > 1;
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal per-entity record (built once).
// ─────────────────────────────────────────────────────────────────────────────

interface Rec {
  id: string;
  entity: HassEntity | undefined;
  label: string;
  /** Lowercased "<label> <id>" haystack for fuzzy search. */
  hay: string;
  domain: string;
  areaId: string | undefined;
  labels: readonly string[];
  isGroup: boolean;
}

const EMPTY_LABELS: readonly string[] = Object.freeze([]);

// ─────────────────────────────────────────────────────────────────────────────
// Index builder
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build the faceted index from a snapshot + optional area/registry/label metadata.
 * Call this ONCE per states-signature (memoize on the states object identity in
 * the picker via `useMemo`, plus the area / registry / labels identities). All the
 * heavy work (the per-entity universe + sort) happens here; the returned closures
 * are cheap and reusable across keystrokes.
 */
export function buildEntityIndex(input: BuildIndexInput): EntityIndex {
  const { states, areas, registry, labels } = input;

  // ── One pass: build the record universe + cache lookups.
  const recById = new Map<string, Rec>();
  for (const e of Object.values(states)) {
    const id = e.entity_id;
    const label = friendly(e);
    recById.set(id, {
      id,
      entity: e,
      label,
      hay: `${label} ${id}`.toLowerCase(),
      domain: domainOf(id),
      areaId: areas?.[id]?.areaId,
      labels: labels?.[id] ?? EMPTY_LABELS,
      isGroup: isGroupEntity(id, e),
    });
  }

  // Stable order: display label, then id (tie-break) — the resting list order.
  const ids = [...recById.keys()].sort((a, b) => {
    const ra = recById.get(a)!;
    const rb = recById.get(b)!;
    return ra.label.localeCompare(rb.label) || a.localeCompare(b);
  });

  // ── Bound predicates (the picker's props want these exact signatures).
  const areaOf = (entityId: string): string | undefined => recById.get(entityId)?.areaId;

  // REUSE the curation gate from areas.ts — bind the registry meta so the picker
  // gets the 2-arg `(entityId, entity) => boolean` it expects. We do NOT duplicate
  // any gate logic here.
  const isPrimary = (entityId: string, entity: HassEntity | undefined): boolean =>
    isPrimaryGate(entityId, entity ?? recById.get(entityId)?.entity, registry);

  // ── Facet builders (lazy + cached by the `gated` flag, so a render that reads
  //    them twice doesn't recompute). Counts respect the curation gate when gated.
  const facetCache = new Map<string, FacetOption[]>();

  const buildFacets = (
    kind: 'domain' | 'area' | 'label',
    gated: boolean,
  ): FacetOption[] => {
    const cacheKey = `${kind}:${gated ? 1 : 0}`;
    const cached = facetCache.get(cacheKey);
    if (cached) return cached;

    const counts = new Map<string, { label: string; n: number }>();
    for (const id of ids) {
      const r = recById.get(id)!;
      if (gated && !isPrimary(r.id, r.entity)) continue;
      const bump = (key: string, lbl: string) => {
        const cur = counts.get(key);
        counts.set(key, { label: lbl, n: (cur?.n ?? 0) + 1 });
      };
      if (kind === 'domain') {
        bump(r.domain, domainLabel(r.domain));
      } else if (kind === 'area') {
        if (r.areaId) {
          const name = areas?.[r.id]?.areaName ?? titleizeSlug(r.areaId);
          bump(r.areaId, name);
        }
      } else {
        for (const lab of r.labels) bump(lab, labelLabel(lab));
      }
    }

    const out = [...counts.entries()].map(([id, v]) => ({ id, label: v.label, n: v.n }));
    // Domains: most-populated first (then alpha). Areas / labels: alpha — they read
    // as a scannable, stable rail rather than a ranking.
    if (kind === 'domain') {
      out.sort((a, b) => b.n - a.n || a.label.localeCompare(b.label));
    } else {
      out.sort((a, b) => a.label.localeCompare(b.label));
    }
    facetCache.set(cacheKey, out);
    return out;
  };

  const domainFacets = (gated = true) => buildFacets('domain', gated);
  const areaFacets = (gated = true) => buildFacets('area', gated);
  const labelFacets = (gated = true) => buildFacets('label', gated);

  // ── Search: optional narrowing → fuzzy score → rank.
  const search = (query: string, opts: SearchOptions = {}): SearchHit[] => {
    const q = query.trim().toLowerCase();
    const domSet = opts.domains?.length ? new Set(opts.domains) : null;
    const areaSet = opts.areas?.length ? new Set(opts.areas) : null;
    const labelSet = opts.labels?.length ? new Set(opts.labels) : null;
    const primaryOnly = opts.primaryOnly !== false;
    const keepSet = opts.keep ? new Set(opts.keep) : null;

    const scored: SearchHit[] = [];
    for (const id of ids) {
      const r = recById.get(id)!;

      // Curation gate — but never hide a `keep` (selected / on-surface) entity, so
      // a selection can't silently vanish behind the gate.
      if (primaryOnly && !isPrimary(r.id, r.entity)) {
        if (!keepSet || !keepSet.has(id)) continue;
      }
      if (domSet && !domSet.has(r.domain)) continue;
      if (areaSet && (!r.areaId || !areaSet.has(r.areaId))) continue;
      if (labelSet && !r.labels.some((l) => labelSet.has(l))) continue;

      if (!q) {
        scored.push({ entityId: id, score: 0, hits: [] });
        continue;
      }
      const m = fuzzyScore(q, r.hay);
      if (!m) continue;
      // Map hay-indices onto the label prefix (label is the start of hay).
      const hits = m.hits.filter((i) => i < r.label.length);
      scored.push({ entityId: id, score: m.score, hits });
    }

    if (q) {
      scored.sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score; // best fuzzy first
        const ra = recById.get(a.entityId)!;
        const rb = recById.get(b.entityId)!;
        if (ra.isGroup !== rb.isGroup) return ra.isGroup ? -1 : 1; // groups preferred
        return ra.label.localeCompare(rb.label) || a.entityId.localeCompare(b.entityId);
      });
    }
    // When no query, `ids` is already in stable label order — and the for-loop
    // preserved it — so no re-sort needed.
    return scored;
  };

  // ── Cheap accessors.
  const isGroup = (entityId: string) => recById.get(entityId)?.isGroup ?? false;
  const labelOf = (entityId: string) => recById.get(entityId)?.label ?? entityId;
  const domainOfId = (entityId: string) => recById.get(entityId)?.domain ?? domainOf(entityId);
  const labelsOf = (entityId: string) => recById.get(entityId)?.labels ?? EMPTY_LABELS;

  return {
    ids,
    areaOf,
    isPrimary,
    domainFacets,
    areaFacets,
    labelFacets,
    search,
    isGroup,
    labelOf,
    domainOfId,
    labelsOf,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Convenience adapters — so wiring the picker is trivial (one call site).
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Derive the two bound predicates the picker's props want directly from the area
 * map + registry meta, WITHOUT building the full index — handy at a call site that
 * only needs `areaOf` / `isPrimary` (e.g. seeding a card from the gallery). Both
 * degrade gracefully: a missing area map ⇒ `areaOf` returns undefined; a missing
 * registry ⇒ the gate falls back to entity_id pattern filtering (areas.ts).
 */
export function pickerPredicates(areas?: AreaMap, registry?: RegistryMeta): {
  areaOf: (entityId: string) => string | undefined;
  isPrimary: (entityId: string, entity: HassEntity | undefined) => boolean;
} {
  return {
    areaOf: (entityId) => areas?.[entityId]?.areaId,
    isPrimary: (entityId, entity) => isPrimaryGate(entityId, entity, registry),
  };
}
