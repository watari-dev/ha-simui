// simUI — the card-type registry (SPEC_EXTENSIBILITY.md §1).
//
// THE SEAM that lets someone add a card type WITHOUT forking core. Today the
// gallery's `CARD_KINDS` is a hand-written array (`./cardKinds`) and the surface
// renderer is a hard-coded `switch (block.type)`. This module replaces the
// hand-written array with a typed REGISTRY: every add-able card kind is registered
// as one descriptor object, `CARD_KINDS` is *derived* from it, and a third party
// adds a kind by importing this module and calling `registerCardKind(...)` from
// their own bundle — zero core edits (SPEC_EXTENSIBILITY §0/§1.5).
//
// SCOPE — pure data + functions, NO React. The full lifecycle descriptor in the
// spec (`CardType`, §1.1) additionally carries `render` / `editor` / `livePreview`
// React components and a `schema`. Those cannot live in a React-free module, so
// this registry keeps them as OPAQUE, optional slots (`render?: unknown`, …): the
// registry can *carry and return* them so the integrator's renderer/inspector/
// storage layers can pick them up, but this module never imports React and never
// invokes them. When the integrator builds `src/registry/cardTypes.ts` (the typed
// `CardType` home, per the spec), it narrows these `unknown` slots to their real
// `ComponentType<…>` / `CardSchema` shapes — a widening, source-compatible move.
//
// Public surface (the only verbs a plugin author needs):
//   registerCardKind(def)         — add or override a kind (idempotent, last-wins)
//   getCardKinds(surfaceContext?) — list, optionally filtered by what a surface holds
//   getCardKind(id)               — one descriptor by id
//   unregisterCardKind(id)        — remove (mainly for tests / hot-reload)
//   toCardKind(def)               — project a descriptor to the gallery's `CardKind`
//   CARD_KIND_DEFS                 — the core descriptors (what `cardKinds.ts` re-exports)
//
// Stability: Evolving → Stable at v1.0 (SPEC_EXTENSIBILITY §3.2). Fields are added
// optionally; `CardKind` (the gallery shape) is frozen.

import { uid, domainOf } from '../util';
import type {
  BlockConfig,
  BlockSpan,
  BlockType,
  CardKind,
  PreviewContext,
} from './types';
import type { HassEntities } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// 1. The descriptor — `CardKindDef`
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The five extra lifecycle hooks from `CardType` (SPEC_EXTENSIBILITY §1.1), kept
 * OPAQUE here so this module stays React-free and dependency-light. The integrator's
 * typed `CardType` (`src/registry/cardTypes.ts`) re-declares these with their real
 * types:
 *   render      → ComponentType<{ block: BlockConfig; ctx: CardTypeContext }>
 *   editor      → ComponentType<CardEditorProps>
 *   livePreview → ComponentType<{ preview: PreviewContext }>
 *   schema      → CardSchema  ({ validate, version, migrate? })
 * A `CardKindDef` that omits all of them is fully valid — it's exactly today's
 * gallery descriptor (`CardKind` + a couple of registry fields). Carrying them as
 * `unknown` lets the same registry serve both the (React-free) gallery and the
 * (React-bearing) renderer/inspector/storage layers without this file importing React.
 */
export interface CardKindLifecycle {
  /** The surface renderer. Opaque here; ComponentType in the integrator's CardType. */
  render?: unknown;
  /** The Inspector's type-specific block form. Opaque here. */
  editor?: unknown;
  /** The gallery's bespoke live-preview component. Opaque here. Omit ⇒ host renders `render` against a seeded clone. */
  livePreview?: unknown;
  /** Validate + migrate the persisted shape (pure, React-free). Opaque here; CardSchema in CardType. */
  schema?: unknown;
}

/**
 * Optional, declarative hints the editor MAY honour for a kind without bespoke
 * code (SPEC_EXTENSIBILITY §1.1, additive). Pure data — no behaviour, so the
 * registry stays React-free and the inspector can read them generically.
 */
export interface CardKindEditorHints {
  /** Member cardinality this card expects (drives picker `multi` + seed slicing). */
  members?: 'none' | 'single' | 'multi';
  /** Spans the inspector should offer in the resize control (omit ⇒ all valid spans). */
  spans?: BlockSpan[];
  /** Domains this card *requires* of its members (stricter than `domains`, which only filters the gallery). */
  requireDomains?: string[];
  /** Free-form, forward-compatible bag for future hint kinds (kept additive). */
  [key: string]: unknown;
}

/**
 * One registered card kind. The single object that makes a block kind a first-class
 * citizen of the gallery + editor (SPEC_EXTENSIBILITY §1). It is a SUPERSET of the
 * gallery's `CardKind` (`./types`) — `toCardKind` projects it down — plus the
 * registry/lifecycle fields the spec calls for.
 *
 * Every field beyond the `CardKind` core is optional, so a minimal registration is
 * five lines (label / icon / type / defaultSpan / make), matching the spec's bar.
 */
export interface CardKindDef extends CardKindLifecycle {
  /**
   * Stable id. Core owns the bare ids (`group`, `list`, `chart`, `hero`, `card`,
   * `attention`). Third-party ids MUST be namespaced — `'acme:floorplan'`
   * (SPEC_EXTENSIBILITY §1.1) — so a plugin never collides with a future core id.
   */
  id: string;
  /**
   * Which persisted `BlockType` this kind serialises as. Core kinds map 1:1. A NOVEL
   * card with no native BlockType uses `'card'` and self-identifies via
   * `block.options.cardType === id` (SPEC_EXTENSIBILITY §1.4) — its `make()` sets
   * that field. Keeps `BlockType` a closed, legible union while the registry stays open.
   */
  type: BlockType;
  /** Sentence-case gallery label, e.g. "Group", "History chart". */
  label: string;
  /** One-line gallery description. */
  description: string;
  /** Lucide icon name (or a registered custom-icon id) for the gallery thumbnail. */
  icon: string;
  /** Default span when dropped (the gallery preview honours it). */
  defaultSpan: BlockSpan;
  /**
   * Build a fresh, populated `BlockConfig` from a small seed entity sample
   * (= `CardKind.make`). MUST be pure: no side effects, no React, no network — it
   * runs in previews and on drop (SPEC_EXTENSIBILITY §4.7). An empty seed yields an
   * empty-but-valid block the user then fills.
   */
  make: (seed: string[]) => BlockConfig;
  /**
   * Which entity domains this kind is a good leaf for — used to FILTER the gallery
   * to what a surface actually contains (graceful degradation). Omit ⇒ any domain
   * (always offered).
   */
  domains?: string[];
  /**
   * Gallery sort weight — lower sorts first. DESIGN_PRINCIPLES "compose first":
   * Group/List/Chart/Hero before Card. Core uses 10/20/30/40/50/60; omit ⇒ 100, so
   * unranked third-party kinds trail the core set but keep insertion order among
   * themselves (`getCardKinds` is a stable sort).
   */
  order?: number;
  /** Declarative editor hints the inspector may honour without bespoke code. */
  editorHints?: CardKindEditorHints;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Surface context — the gallery filter input
// ─────────────────────────────────────────────────────────────────────────────

/**
 * What a surface offers, used to filter `getCardKinds` to kinds the surface can
 * actually populate (graceful degradation — never show a "History chart" on a
 * surface with no numeric sensors). Every field optional ⇒ an absent/empty context
 * means "no filtering, return everything" (the gallery's safe default).
 */
export interface SurfaceContext {
  /** Domains present on the surface (e.g. from its entities). A kind passes if it declares no `domains` or shares one. */
  domains?: string[];
  /**
   * A live snapshot, when the host has one. `getCardKinds` uses it only to DERIVE
   * `domains` when `domains` is omitted, so callers can pass either. Never iterated
   * per-render in a hot path beyond this one derivation.
   */
  states?: HassEntities;
  /**
   * Optional escape hatch: a host-supplied predicate to additionally include/exclude
   * a kind (e.g. hide `chart` until the history backend is known available). Returns
   * `false` to drop a kind. Omit ⇒ no extra filtering.
   */
  supports?: (def: CardKindDef) => boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. The registry store
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Insertion-ordered registry, keyed by id. A `Map` so `registerCardKind` is
 * idempotent + last-wins per id (re-registering the same id REPLACES — the
 * documented override escape hatch, SPEC_EXTENSIBILITY §1.2) while iteration stays
 * insertion-ordered for a stable gallery.
 */
const REGISTRY = new Map<string, CardKindDef>();

/** Monotonic registration counter, so the gallery sort is stable for equal `order`. */
let SEQ = 0;
const SEQ_OF = new WeakMap<CardKindDef, number>();

/**
 * Register a card kind (or override one by re-using its id). Idempotent + last-wins
 * (SPEC_EXTENSIBILITY §1.2): a plugin can ship a fancier `chart` by registering id
 * `'chart'`. Returns the registry so calls can chain. The ONLY verb a plugin author
 * needs to add a card.
 *
 * @example
 *   registerCardKind({
 *     id: 'acme:departures', type: 'card',
 *     label: 'Departures', description: 'Next trains from a station sensor.',
 *     icon: 'TrainFront', defaultSpan: 1, domains: ['sensor'],
 *     make: (seed) => ({ id: uid(), type: 'card', entityIds: seed.slice(0, 1), span: 1,
 *                        options: { cardType: 'acme:departures' } }),
 *     render: DeparturesCard, editor: DeparturesSettings,   // wired by the integrator's CardType layer
 *   });
 */
export function registerCardKind(def: CardKindDef): typeof REGISTRY {
  if (!def || typeof def.id !== 'string' || def.id === '') {
    throw new Error('registerCardKind: a non-empty string `id` is required.');
  }
  if (typeof def.make !== 'function') {
    throw new Error(`registerCardKind("${def.id}"): \`make\` must be a function.`);
  }
  SEQ_OF.set(def, SEQ++);
  REGISTRY.set(def.id, def);
  return REGISTRY;
}

/** Register many at once (e.g. a plugin's whole card set, or core's). Last-wins per id. */
export function registerCardKinds(defs: readonly CardKindDef[]): void {
  for (const def of defs) registerCardKind(def);
}

/** Remove a registration by id. Returns true if one was removed. Mainly for tests / hot-reload. */
export function unregisterCardKind(id: string): boolean {
  return REGISTRY.delete(id);
}

/** The full descriptor for one id (with all lifecycle/registry fields), or undefined. */
export function getCardKind(id: string): CardKindDef | undefined {
  return REGISTRY.get(id);
}

/**
 * Resolve the descriptor for a PERSISTED block (SPEC_EXTENSIBILITY §1.4): a novel
 * card self-identifies via `options.cardType`; everything else falls back to the
 * block's `type`. Returns undefined for an unknown kind so the renderer can show a
 * quiet "unknown card" placeholder rather than crash.
 *
 * Reads `options.cardType` structurally so this module needn't import the (future)
 * augmented `BlockOptions.cardType` field — it works whether or not that field is
 * declared yet.
 */
export function cardKindForBlock(block: BlockConfig): CardKindDef | undefined {
  const tagged = (block.options as { cardType?: string } | undefined)?.cardType;
  if (tagged) {
    const byTag = REGISTRY.get(tagged);
    if (byTag) return byTag;
  }
  return REGISTRY.get(block.type);
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Listing + the gallery projection
// ─────────────────────────────────────────────────────────────────────────────

/** Sort by `order` (default 100) then registration sequence — stable + "compose first". */
function byOrder(a: CardKindDef, b: CardKindDef): number {
  const oa = a.order ?? 100;
  const ob = b.order ?? 100;
  if (oa !== ob) return oa - ob;
  return (SEQ_OF.get(a) ?? 0) - (SEQ_OF.get(b) ?? 0);
}

/** Every registered descriptor, ordered for the gallery. (Full `CardKindDef`s, not projected.) */
export function listCardKindDefs(): CardKindDef[] {
  return [...REGISTRY.values()].sort(byOrder);
}

/**
 * Project a descriptor down to the gallery's `CardKind` shape (`./types`) — the
 * frozen public gallery contract `CardGallery` consumes. Drops the registry/lifecycle
 * fields the gallery doesn't read; what remains is structurally identical to today's
 * hand-written entries, so `CardGallery` needs no change.
 */
export function toCardKind(def: CardKindDef): CardKind {
  const kind: CardKind = {
    id: def.id,
    type: def.type,
    label: def.label,
    description: def.description,
    icon: def.icon,
    defaultSpan: def.defaultSpan,
    make: def.make,
  };
  if (def.domains) kind.domains = def.domains;
  return kind;
}

/**
 * THE gallery entry point. List the add-able kinds as `CardKind[]` (what `CardGallery`
 * takes), optionally filtered by what a surface supports. Drop-in for today's
 * hand-written `CARD_KINDS` import.
 *
 * Filtering (graceful degradation, SPEC_EXTENSIBILITY §1 / DESIGN_PRINCIPLES §12):
 *  - No context (or an empty one) ⇒ every kind, ordered.
 *  - With `domains` (or `states`, from which domains are derived): a kind passes if
 *    it declares NO `domains` (universal — Group/List/Card) or shares at least one
 *    domain with the surface. So a chart (domains:['sensor']) is hidden on a surface
 *    with no sensors, but Group is always offered.
 *  - A host `supports(def)` predicate, when given, can further drop kinds.
 */
export function getCardKinds(surfaceContext?: SurfaceContext): CardKind[] {
  const defs = listCardKindDefs();
  const ctx = surfaceContext;
  if (!ctx) return defs.map(toCardKind);

  const surfaceDomains = resolveSurfaceDomains(ctx);
  const out: CardKind[] = [];
  for (const def of defs) {
    if (ctx.supports && !ctx.supports(def)) continue;
    if (surfaceDomains && def.domains && def.domains.length > 0) {
      const fits = def.domains.some((d) => surfaceDomains.has(d));
      if (!fits) continue;
    }
    out.push(toCardKind(def));
  }
  return out;
}

/** The full descriptors (not projected) that pass a surface filter — for callers that need lifecycle fields. */
export function getCardKindDefs(surfaceContext?: SurfaceContext): CardKindDef[] {
  if (!surfaceContext) return listCardKindDefs();
  const ctx = surfaceContext;
  const surfaceDomains = resolveSurfaceDomains(ctx);
  return listCardKindDefs().filter((def) => {
    if (ctx.supports && !ctx.supports(def)) return false;
    if (surfaceDomains && def.domains && def.domains.length > 0) {
      return def.domains.some((d) => surfaceDomains.has(d));
    }
    return true;
  });
}

/** Derive the surface's domain set from an explicit list or a states snapshot. Null ⇒ "don't filter by domain". */
function resolveSurfaceDomains(ctx: SurfaceContext): Set<string> | null {
  if (ctx.domains && ctx.domains.length > 0) return new Set(ctx.domains);
  if (ctx.states) {
    const set = new Set<string>();
    for (const id of Object.keys(ctx.states)) set.add(domainOf(id));
    return set.size > 0 ? set : null;
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Seeding helpers (shared with cardKinds.ts; keep behaviour identical)
// ─────────────────────────────────────────────────────────────────────────────

/** Seed/preview sample size per block type (small + fixed, SPEC_EDITOR §4) — single source of truth. */
export function seedSize(type: BlockType): number {
  return type === 'card' || type === 'hero' || type === 'chart' ? 1 : 3;
}

/**
 * Entity seed for a kind, when previewing or dropping it (SPEC_EDITOR §2.3).
 * Domain-filtered with a fallback to any available entity, so a dropped card lands
 * populated rather than empty. Lives here so the registry, the gallery preview, and
 * `cardKinds.ts` all share one definition.
 */
export function seedFor(def: Pick<CardKindDef, 'type' | 'domains'>, preview: PreviewContext): string[] {
  const n = seedSize(def.type);
  const picked = preview.sample(n, def.domains);
  return picked.length ? picked : preview.sample(n);
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. The core card set — registered here, so the gallery is registry-driven
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The built-in kinds, as descriptors. Identical in behaviour to the hand-written
 * `CARD_KINDS` (`./cardKinds`) — same ids, types, icons, spans, and `make` bodies —
 * now with `order` (compose-first) and `editorHints`. `cardKinds.ts` becomes a thin
 * re-export deriving `CARD_KINDS` from these via `toCardKind` (see integration plan).
 *
 * Ordered "compose first" per DESIGN_PRINCIPLES — Group / List / Chart / Hero before
 * Card. `attention` is registered too (it's a `BlockType`) so the registry covers the
 * full core set named in SPEC_EXTENSIBILITY §1 Milestone 1; the gallery surfaces it
 * once a surface supports it (it carries no `domains`, so it's universal — adjust its
 * `domains`/`order` when the attention card lands a bespoke renderer).
 */
export const CORE_CARD_KIND_DEFS: CardKindDef[] = [
  {
    id: 'group',
    type: 'group',
    label: 'Group',
    icon: 'group',
    defaultSpan: 'full',
    order: 10,
    description: 'A surface of related controls.',
    editorHints: { members: 'multi' },
    make: (seed) => ({ id: uid(), type: 'group', title: 'Group', entityIds: seed, span: 'full', axis: 'none' }),
  },
  {
    id: 'list',
    type: 'list',
    label: 'List',
    icon: 'list',
    defaultSpan: 'full',
    order: 20,
    description: 'A hairline-divided list of entities.',
    editorHints: { members: 'multi' },
    make: (seed) => ({ id: uid(), type: 'list', title: 'List', entityIds: seed, span: 'full' }),
  },
  {
    id: 'chart',
    type: 'chart',
    label: 'History chart',
    icon: 'activity',
    defaultSpan: 'full',
    order: 30,
    domains: ['sensor'],
    description: 'A TradingView-grade history graph.',
    editorHints: { members: 'single', requireDomains: ['sensor'] },
    make: (seed) => ({
      id: uid(),
      type: 'chart',
      span: 'full',
      entityIds: seed.slice(0, 1),
      chart: seed[0]
        ? {
            window: { value: 24, unit: 'h' },
            header: { showCurrent: true, colorize: true },
            axes: [{ id: 'left' }],
            series: [{ entity: seed[0], fill: 'area', axisId: 'left' }],
          }
        : undefined,
    }),
  },
  {
    id: 'hero',
    type: 'hero',
    label: 'Hero',
    icon: 'thermometer',
    defaultSpan: 2,
    order: 40,
    domains: ['climate'],
    description: 'A big headline readout.',
    editorHints: { members: 'single' },
    make: (seed) => ({ id: uid(), type: 'hero', entityIds: seed.slice(0, 1), span: 2 }),
  },
  {
    id: 'card',
    type: 'card',
    label: 'Card',
    icon: 'box',
    defaultSpan: 1,
    order: 50,
    description: 'A single entity tile.',
    editorHints: { members: 'single' },
    make: (seed) => ({ id: uid(), type: 'card', entityIds: seed.slice(0, 1), span: 1 }),
  },
];

/** Alias kept for the integrator: the descriptors `cardKinds.ts` re-exports from. */
export const CARD_KIND_DEFS = CORE_CARD_KIND_DEFS;

/**
 * Register the built-in kinds. Idempotent (clears core ids first) so it's safe to
 * call at module init and again after HMR. The integrator calls this once at startup
 * (it is NOT auto-run on import, to keep this module a pure, side-effect-free library
 * — important for tree-shaking + testability per SPEC_EXTENSIBILITY §0).
 */
export function registerCoreCardKinds(): void {
  registerCardKinds(CORE_CARD_KIND_DEFS);
}
