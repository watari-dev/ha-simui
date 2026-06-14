# simUI — Extensibility & the public framework surface

> **Status:** spec + build plan (no code in this document). Grounded in the shipped code:
> `src/widgets/index.ts` (the current domain→widget registry), `src/widgets/tileContract.ts`
> (Tile leaf vocab + `runAction`), `src/dashboard/types.ts` (the Block model), `src/editor/types.ts`
> (the editor contracts — `BlockConfig` / `TileConfig` / `CardKind` / the component props),
> `src/hass/context.tsx` (the reactivity hooks), `src/dashboard/areas.ts` (registry/curation),
> and the principle docs ([`FRAMEWORK.md`](FRAMEWORK.md), [`DESIGN_PRINCIPLES.md`](DESIGN_PRINCIPLES.md),
> [`ROADMAP.md`](ROADMAP.md)).
>
> **Thesis.** simUI's real deliverable is *the framework*, not one home ([`AGENTS.md`](AGENTS.md)).
> The block/tile model + binding system is already small and legible; what's missing is the seam
> that lets **someone else add a card type without forking core**, and a written promise about
> *which* surfaces are stable enough to build on. This document defines both — a typed
> **card-type registry**, the **public contract** and its stability tiers, the **theming hooks**,
> and a crisp **milestone cut** ("minimum to replace the owner's dashboard" vs "replace Lovelace
> for everyone").

---

## 0. The extensibility model in one breath

```
register a CardType  ─┐
register a WidgetType ─┼─►  it appears in the gallery, is editable in the inspector,
register a Theme/token─┘     persists in config, and renders — with ZERO core edits.
```

Two extension points, mirroring the two layers of the model (`FRAMEWORK.md §0`):

| Layer | Today (closed) | Target (open) | What a 3rd party adds |
|---|---|---|---|
| **Tile / Widget** (the leaf — owns ONE entity) | hard-coded `REGISTRY` map in `widgets/index.ts`, keyed by domain | a `WidgetRegistry` you `register()` into | a per-domain renderer (e.g. a `valve` widget, a vendor's robot-mower tile) |
| **Card / Block** (the composition — owns layout + grouping) | `BlockType` union in `dashboard/types.ts`; render switch in `dashboard/blocks/*` | a `CardRegistry` you `register()` into | a whole card type (e.g. a `gauge-cluster`, a `floorplan`, a `train-departures` card) |

Everything else (the editor, persistence, previews, theming) is *driven by these two registries
plus the existing config schema* — so registering is the only verb a plugin author needs.

**Non-goal (v1):** running untrusted code in a sandbox, a remote plugin marketplace, or HACS-style
auto-discovery. simUI plugins are **compile-time**: a 3rd party imports `simui/registry`, calls
`register(...)` in their bundle, and ships it alongside core (or core re-exports a curated set).
A runtime/iframe plugin host is explicitly **Later** (§7). This keeps the v1 surface a *typed,
tree-shakeable module API*, not an RPC boundary.

---

## 1. The card-type registry

### 1.1 The descriptor — `CardType`

A card type is **one object** that bundles the five things the system needs to treat a block kind
as a first-class citizen: how to **render** it, how to **edit** it, its **defaults/factory**, a
**live preview**, and a **schema** for validation/migration. This generalises the already-shipped
`CardKind` (`src/editor/types.ts`) — `CardKind` is the *gallery descriptor* (label/icon/`make`);
`CardType` is the *full lifecycle descriptor* that the gallery descriptor is derived from.

```ts
// proposed: src/registry/cardTypes.ts  (NEW — owned by the registry build)
import type { ComponentType } from 'react';
import type { BlockConfig, BlockType, CardKind, PreviewContext } from '../editor/types';
import type { HassEntities } from '../types';

export interface CardTypeContext {
  /** Live snapshot for resolving members. Widgets still subscribe per-entity via useEntity. */
  states: HassEntities;
  /** True only inside the editor (renderers may show affordances / placeholder members). */
  editing: boolean;
  /** Run a HassAction (reuse widgets/tileContract.runAction — never re-implement). */
  // actions are dispatched by the leaf tiles, not the card; see §3.2.
}

export interface CardEditorProps {
  /** The block being edited (already the editor's working copy). */
  block: BlockConfig;
  /** Emit a granular patch — the editor coalesces + commits (one undo step). */
  onChange: (patch: Partial<BlockConfig>) => void;
  /** Live snapshot for option enumeration (e.g. a card that lists hvac_modes). */
  states: HassEntities;
  /** Ask the host to open the faceted EntityPicker for member selection. */
  onAddEntities: () => void;
}

export interface CardType {
  /** Stable id. 3rd-party ids MUST be namespaced: 'acme:floorplan'. Core owns the bare ids. */
  id: string;
  /**
   * Which persisted BlockType this card serialises as. Core kinds map 1:1
   * (group→'group', chart→'chart'…). A NOVEL card with no native BlockType uses
   * type 'card' and discriminates on `block.options.cardType === id` (see §1.4).
   */
  blockType: BlockType;

  // ── gallery descriptor (this is exactly today's CardKind, lifted in) ──────────
  label: string;
  description: string;
  /** Lucide icon name (or a registered custom icon id, §5.4). */
  icon: string;
  defaultSpan: BlockConfig['span'];
  /** Build a fresh, populated block from a seed entity sample. (= CardKind.make) */
  defaults: (seed: string[]) => BlockConfig;
  /** Gallery filter: domains this card is a good leaf for; omit ⇒ any. (= CardKind.domains) */
  domains?: string[];

  // ── the five lifecycle hooks ──────────────────────────────────────────────────
  /** RENDER — the surface renderer. Receives the block + a CardTypeContext. */
  render: ComponentType<{ block: BlockConfig; ctx: CardTypeContext }>;
  /**
   * EDITOR — the type-specific form shown in the Inspector's block tab. Omit ⇒ the
   * generic block form (title / span / members) is all the card needs.
   */
  editor?: ComponentType<CardEditorProps>;
  /**
   * LIVE PREVIEW — the gallery thumbnail. Built from the user's OWN entities via
   * PreviewContext (FRAMEWORK differentiator #1). Omit ⇒ the host renders `render`
   * against a seeded clone as the preview (the safe default — most cards need no
   * bespoke preview component).
   */
  livePreview?: ComponentType<{ preview: PreviewContext }>;
  /**
   * SCHEMA — validate + migrate the persisted shape. Pure, dependency-free (so it
   * runs in the storage layer without React). `validate` returns true for a block
   * this type can render; `migrate` upgrades an older persisted block in place.
   */
  schema: CardSchema;
}

export interface CardSchema {
  /** Cheap structural guard run on load: is this a renderable block of this type? */
  validate: (block: unknown) => block is BlockConfig;
  /** Per-card config version (independent of the dashboard config version). */
  version: number;
  /** Upgrade an older persisted block of this type to `version`. Omit ⇒ identity. */
  migrate?: (block: BlockConfig, from: number) => BlockConfig;
}
```

### 1.2 The registry API

```ts
// proposed: src/registry/index.ts  (NEW)
export function registerCardType(card: CardType): void;
export function getCardType(id: string): CardType | undefined;
/** Resolve the CardType for a persisted block (by options.cardType, else by blockType). */
export function cardTypeForBlock(block: BlockConfig): CardType | undefined;
export function listCardTypes(): readonly CardType[];
/** Project every registered CardType to a gallery CardKind (what CardGallery consumes). */
export function cardKinds(): CardKind[];
```

**Registration is idempotent and last-wins per id**, so a plugin can *override* a core card (e.g.
ship a fancier `chart`) by registering the same id — a deliberate, documented escape hatch. Core
card types are registered in a single `registerCoreCardTypes()` call at module init; plugins call
`registerCardType` from their own entry module, imported before the first render.

### 1.3 How the registry threads through the existing system

Each consumer changes from a **hard-coded switch** to a **registry lookup** — these are the exact
integrator seams (none of this lives in this doc's owned file; it is the contract the renderer/store
agents implement against):

| Consumer | Today | With the registry |
|---|---|---|
| **Gallery** (`CardGallery`) | a hand-written `CardKind[]` | `cardKinds()` — every registered type appears automatically |
| **Surface renderer** (`dashboard/blocks/*` switch) | `switch (block.type)` | `cardTypeForBlock(block)?.render` — unknown type ⇒ a quiet "unknown card" placeholder, never a crash |
| **Inspector** (`Inspector`) | generic block form only | generic form + `cardType.editor` mounted in a "Card settings" section |
| **Drop / add** (`addBlock`, `dropCard`) | `defaultCardSpan` + a card seed | `cardType.defaults(seed)` |
| **Storage** (`storage.ts` load) | version bump only | for each block, `cardTypeForBlock(b)?.schema.{validate,migrate}` before mounting |

### 1.4 Adding a *novel* card type without a new `BlockType`

`BlockType` is a closed union in the shared `dashboard/types.ts` (which extension authors **cannot**
edit). So a 3rd-party card that isn't one of `hero|group|list|chart|card|attention` serialises as
`type: 'card'` and self-identifies via a new optional field on the existing `BlockOptions` bag
(already in `editor/types.ts`):

```ts
// integrator change to src/editor/types.ts → BlockOptions (additive, optional):
cardType?: string;   // e.g. 'acme:floorplan' — set by registry-backed cards; absent for core kinds
```

`cardTypeForBlock` resolves `block.options?.cardType` first, then falls back to `block.type`. This
keeps the persisted schema a plain `BlockConfig[]` (no migration), keeps `BlockType` closed (core
stays legible), and still lets the registry be open — the open set lives in `options.cardType`
namespace strings, not in the type union. **This is the one integrator change `dashboard/types.ts`
or `editor/types.ts` needs for novel cards;** core cards need none.

### 1.5 Worked example — a 3rd-party "Train departures" card

A plugin author, in their *own* package, writes (sketch — not shipped here):

```ts
registerCardType({
  id: 'acme:departures',
  blockType: 'card',
  label: 'Departures', description: 'Next trains from a station sensor.',
  icon: 'TrainFront', defaultSpan: 1,
  domains: ['sensor'],
  defaults: (seed) => ({
    id: uid(), type: 'card', entityIds: seed.slice(0, 1), span: 1,
    options: { cardType: 'acme:departures' },
  }),
  render: DeparturesCard,          // a React component using useEntity(block.entityIds[0])
  editor: DeparturesSettings,      // e.g. "rows to show" + "platform filter"
  schema: { version: 1, validate: (b): b is BlockConfig =>
    !!b && typeof b === 'object' && (b as BlockConfig).type === 'card' },
});
```

Result with **zero core edits**: the card shows in the gallery with a live preview of the user's own
station sensor, drops onto any surface, is reorderable/resizable/duplicable, gets an inspector form,
and round-trips through persistence. That is the bar.

---

## 2. The widget (leaf) registry — the smaller, parallel seam

Cards compose; **widgets** are the leaves cards compose *from* (`FRAMEWORK.md §1`). The current
`widgets/index.ts` is a hard-coded `Record<domain, Component>` with a `GenericTile` fallback. The
open version mirrors §1 but is simpler — a widget owns one entity and renders against `WidgetProps`.

```ts
// proposed: src/registry/widgets.ts  (NEW)
import type { ComponentType } from 'react';
import type { WidgetProps } from '../types';
import type { TileFeature } from '../widgets/tileContract';

export interface WidgetType {
  /** Stable id; 3rd-party namespaced ('acme:mower'). */
  id: string;
  /** Domains this widget claims, e.g. ['valve'] or ['vacuum']. First registrant wins per domain unless override:true. */
  domains: string[];
  /** Allow this registration to replace an existing domain mapping (last-wins). Default false. */
  override?: boolean;
  /** The renderer — same contract as every shipped *Tile.tsx (WidgetProps = { entity }). */
  render: ComponentType<WidgetProps>;
  /**
   * Optional: the inline control features this widget can render as a controller
   * (FRAMEWORK §1). Lets the inspector offer "make this a controller" for the domain.
   */
  features?: TileFeature['type'][];
  /** Optional: a custom detail-sheet body (more-info tier). Omit ⇒ the generic sheet. */
  sheet?: ComponentType<WidgetProps>;
}

export function registerWidget(w: WidgetType): void;
/** Replaces today's widgetFor(domain) — registry lookup, GenericTile fallback preserved. */
export function widgetFor(domain: string): ComponentType<WidgetProps>;
```

`widgets/index.ts`'s `widgetFor` becomes a thin re-export of this registry's `widgetFor`, and the
twelve shipped tiles register themselves via one `registerCoreWidgets()` call — **a refactor, not a
rewrite**: the lookup semantics (`REGISTRY[domain] ?? GenericTile`) are preserved exactly.

**Why two registries, not one.** A card is a *layout/composition* unit edited in the gallery; a
widget is a *per-entity renderer* selected by domain and never appears in the gallery on its own.
Conflating them would force every new sensor renderer through the heavyweight `CardType` lifecycle.
Keeping them separate is what makes "add a `valve` tile" a five-line registration.

---

## 3. The public contract & stability guarantees

Extensibility is only real if authors know **what won't break under them**. simUI declares an
explicit public surface in three tiers. Everything else is private and may change without notice.

### 3.1 Stability tiers

- **Stable** — semver-breaking changes only on a major version; codemods/migrations provided.
- **Evolving** — additive changes any minor; breaking changes only on minor with a deprecation
  window and a `migrate`. (Most of the editor surface lives here until v1.0.)
- **Internal** — no guarantees; import at your own risk (anything not listed below).

### 3.2 The Stable public surface (the framework's API)

Re-exported from a single barrel — proposed **`src/public.ts`** (NEW; the only module a plugin
imports) — so "the public API" is literally one file, and anything not re-exported there is
Internal by definition.

| Export | Source | Tier | Guarantee |
|---|---|---|---|
| `Block`, `BlockType`, `BlockSpan`, `GroupAxis`, `ListSource`, `ChartSpec`, `Condition`, `Matcher` | `dashboard/types.ts` | **Stable** | The persisted config vocabulary. Fields are added optionally; never removed/retyped without a major + migration. `BlockType` grows only additively. |
| `BlockConfig`, `TileConfig`, `ActionMap`, `BlockOptions`, `CardKind` | `editor/types.ts` | **Stable** | The editor/config superset. Every field optional ⇒ additive-safe. |
| `HassAction`, `TileFeature`, `ColorToken`, `StateBit`, `runAction`, `ActionContext` | `widgets/tileContract.ts` | **Stable** | The leaf interaction vocab. New `HassAction`/`TileFeature` variants are additive; `runAction`'s dispatch contract is frozen. |
| `WidgetProps` (`{ entity }`) | `types.ts` | **Stable** | The widget render contract. A widget that takes `{ entity }` keeps working forever. |
| `useEntity`, `useAllStates`, `useAggregate`, `useCallService`, `useConnectionStatus` | `hass/context.tsx` | **Stable** | The binding/reactivity API. Surgical per-entity subscription is the load-bearing guarantee (`DESIGN_PRINCIPLES §13`) — signatures are frozen. |
| `useAreas`, `useRegistry`, `isPrimary`, `AreaMap`, `RegistryMeta` | `dashboard/areas.ts` | **Stable** | Registry/curation access for cards that group or filter. |
| `registerCardType`, `registerWidget`, `getCardType`, `widgetFor`, `cardKinds` + the `CardType` / `WidgetType` interfaces | `registry/*` (NEW) | **Evolving → Stable at v1.0** | The extension API itself. |
| `PreviewContext`, `CardEditorProps`, `CardTypeContext` | `editor/types.ts` + `registry/*` | **Evolving** | Author-facing prop bags; may gain optional fields. |

### 3.3 The component-prop contracts (already written)

`CardGalleryProps`, `InspectorProps`, `EntityPickerProps`, `EntityFacets`, `EditorState`,
`EditorActions`, `Selection` (all in `src/editor/types.ts`) are **Evolving** — they are the *internal*
editor wiring. A plugin author never implements them; only core does. They are listed here so the
boundary is explicit: **plugins extend via the registries, not by re-implementing editor panels.**

### 3.4 What is deliberately NOT public (and why)

- **The dashboard store** (`store.tsx`) and **editor store** (`editor/store.tsx`) — internal;
  plugins mutate state only through the patches their `editor` component emits.
- **`generateDefault.ts`** and the **preset builders** — internal; presets are *data the registry
  produces*, not an API. (A future "preset registry" is a Later extension, §7.)
- **`styles.css` and any `simui-*` class name** — **not** a public API. Authors theme via tokens
  (§5), never by targeting core class names. Class names may be renamed any minor.
- **`tsc`-private generics, util functions** (`uid`, `domainOf`, `friendly`) — Internal even though
  importable.

### 3.5 Versioning the contract

- The **persisted config** carries `version` (now `3`, going to `4` per `editor/types.ts`). The
  storage layer accepts a widening set (`2|3|4`) and never *rewrites* old configs in place — v3
  blocks are already valid v4 (`SPEC_EDITOR.md §persistence`). Same rule extends to v5+: additive.
- **Per-card schema** versions are independent (`CardSchema.version`) so a plugin can evolve its own
  block shape without bumping the global config version — its `migrate` runs at load.
- The **public API** carries the package semver. A `DEPRECATIONS.md` ledger lists every Evolving
  symbol's removal target.

---

## 4. Conformance — what "it just works" requires of an extension

A registered card/widget inherits the whole platform **iff** it obeys the same rules core obeys.
These are the documented author obligations (the "framework contract" a plugin signs):

1. **Subscribe surgically.** Use `useEntity(id)` per leaf; never `useAllStates()` in a tile
   (`DESIGN_PRINCIPLES §13`). A card resolving many members uses `useAggregate` for counts, then
   per-entity subscriptions for the rendered rows (`FRAMEWORK §4`).
2. **Handle `unavailable` / `unknown`.** Dim, disable controls, never show a live-looking control on
   a dead entity (`ROADMAP` Tier A#3; see `LightTile`'s `dead` guard as the reference pattern).
3. **Actions via `runAction`.** Never call `window.open` or `callService` ad-hoc for tap/hold —
   emit a `HassAction` and run it through `runAction` so behaviour is uniform and the inspector can
   rebind it.
4. **Layout-free leaves.** A widget never sets its own span/grid; the block owns placement
   (`FRAMEWORK §1/§2`). A *card* may request a `defaultSpan`, nothing finer.
5. **Theme via tokens only** (§5). No hard-coded hex; no targeting `simui-*` classes.
6. **Minimal motion.** State changes *appear*; no entrance/transition animations beyond the
   ≤0.15s token transitions (`DESIGN_PRINCIPLES §11`).
7. **Pure `schema`/`defaults`.** No side effects, no React, no network — they run in storage and in
   previews.

A `validate()` in the editor's dev mode can lint registrations against (4)–(7) and warn in the
console; (1)–(3) are runtime conventions the docs + a reference `examples/` card enforce by example.

---

## 5. Theming hooks

simUI is already theme-aware by construction: every colour is a CSS variable that *inherits HA's
theme* when embedded, with a dark-first fallback palette (`styles.css` `:root`,
`DESIGN_PRINCIPLES` Design Tokens). Extensibility means making that the **only** theming surface and
documenting it.

### 5.1 The token contract (Stable)

The public token set — the variables an author may read and an integrator may override:

| Token | Role | HA inheritance |
|---|---|---|
| `--bg`, `--surface`, `--surface-2`, `--group` | canvas / surface layers | `primary-background-color`, `ha-card-background`, `card-background-color` |
| `--text`, `--muted`, `--faint`, `--hairline` | type + dividers | `primary-text-color`, `secondary-text-color`, `divider-color` |
| `--accent` | the single interactive/active accent | `primary-color` |
| `--warm`, `--up`, `--down`, `--warn` | reserved state roles (on/heat, +Δ, −Δ, attention) | dark-first fallbacks |

**Rule (frozen):** colour encodes *state or category meaning only* (`DESIGN_PRINCIPLES §7`). A card
may use `--accent` for "active" and `--warm`/`--up`/`--down`/`--warn` for their reserved meanings —
never a raw hex, never a new decorative colour. The **`ColorToken`** type
(`warm|cool|accent|warn|up|down|primary|none|violet|cyan|pink|green|teal|slate`) is the *typed* form
of this same palette for config-level colour choices; a token resolves to a variable, so author
config stays theme-portable.

### 5.2 Author-facing token helper (proposed)

A tiny pure helper so cards resolve a `ColorToken` to a CSS variable consistently (proposed
`src/registry/theme.ts`, NEW):

```ts
export function tokenVar(token: ColorToken): string;   // 'warm' → 'var(--warm)', 'none' → 'inherit'
export function stateAccent(active: boolean, token?: ColorToken): string; // Apple-Home tile tint rule
```

This is the *only* sanctioned way for an extension to colour itself — it guarantees the
monochrome-idle / accent-when-active behaviour and the categorical hues stay consistent with core.

### 5.3 Theme overrides for integrators (not plugin authors)

An *installer* (the person deploying simUI) can override any token in an HA theme YAML or a wrapping
`:root` — exactly as HA themes already work. No simUI API needed; the variables *are* the API.
simUI ships its fallback palette so it looks right even under a theme that defines none of them.

### 5.4 Custom icons (small, optional)

Icons are Lucide names today. The registry exposes an optional `registerIcon(id, ComponentType)` so
a plugin can ship a brand glyph and reference it by id in `TileConfig.icon` / `CardType.icon`.
Resolution order: registered custom id → Lucide name → a neutral fallback dot. **Stable, additive.**

### 5.5 What theming does NOT open

No per-card CSS injection, no `<style>` strings in config, no class-name overrides. The token set is
the contract; this is what keeps every preset and every plugin visually coherent (the project's
whole reason to exist). A card that needs a one-off colour is using colour wrong (§4.5 / §5.1).

---

## 6. Milestones — two concrete cuts

The extensibility work is **sequenced behind the editor**: there is no point opening a registry
nobody can drive through a UI. The cut line is therefore drawn so that **M1 ships the editor's own
card set *through* the registry** (proving the seam internally), and **M2 opens it to 3rd parties**.

### Milestone 1 — "Minimum to replace the owner's dashboard" (near-term)

> **Definition of done:** the owner can build, edit, and live with *their* dashboard entirely in
> simUI's editor — and every core card is already a `CardType` (the registry exists and is *used
> internally*, even if not yet documented for outsiders).

**In:**
- **The two registries exist and core uses them.** `registerCardType` / `registerWidget` shipped;
  `widgets/index.ts` and the surface renderer/gallery refactored to *consume* the registry instead
  of hard-coded switches. (This is the refactor that de-risks everything later.)
- **Core card set registered:** `hero`, `group`, `list`, `chart`, `card`, `attention` — each a
  `CardType` with `render` + `defaults` + `schema`; `editor` for the ones that need type-specific
  forms (chart series/window, list source, group axis).
- **Core widget set registered:** the twelve shipped tiles + the parity additions the dashboard
  needs (weather/camera/gauge/action already exist per recent commits; add `valve`/`number`/
  `select` as registrations to prove the seam).
- **`cardType.editor` mounted in the Inspector** so block-type-specific editing is registry-driven.
- **Storage runs `schema.validate`/`migrate`** per block on load (unknown card ⇒ placeholder, never
  a crash) — the resilience guarantee.
- **Theming tokens documented** (§5.1) as the stable surface; `tokenVar`/`stateAccent` helper shipped
  and used by core tiles.
- **`options.cardType` field added** (the one additive schema change, §1.4) so novel cards are
  *possible* even though none ship yet.

**Out (deferred to M2):**
- A public `src/public.ts` barrel and published types — internal imports are fine for M1.
- 3rd-party plugin *documentation*, an `examples/` card, the conformance linter.
- `registerIcon`, custom-icon resolution.
- Any stability *promise* — M1's registry is **Evolving/Internal**; we reserve the right to reshape
  `CardType` before opening it.
- Preset registry, runtime/iframe plugin host, marketplace.

**Why this cut:** it delivers the owner's actual need (a working editor over *their* home) while
paying down the architecture so the leaf/card model is registry-shaped *before* anyone depends on it
— the cheapest possible moment to get the seam right. The registry is a means here, not the headline.

### Milestone 2 — "Replace Lovelace for everyone" (the long tail)

> **Definition of done:** a developer who has never seen simUI's source can `npm i simui`, write a
> card type in their own repo, register it, and ship a dashboard — with a written stability promise
> and a worked example to copy.

**In:**
- **`src/public.ts` published** as the single import barrel; the §3.2 surface frozen at the stated
  tiers; semver enforced; `DEPRECATIONS.md` ledger started.
- **Authoring docs + a reference `examples/departures-card`** (the §1.5 worked example, real and
  buildable) — the copy-paste starting point.
- **Conformance linter** (§4): dev-mode warnings for span-on-leaf, raw hex, `useAllStates` in a tile,
  missing `unavailable` handling.
- **Custom icons** (`registerIcon`) and the full icon resolution order.
- **Card override semantics documented** (last-wins per id) so a plugin can replace a core card.
- **Per-card schema migration** proven end-to-end (a card evolves its shape across two versions with
  a real `migrate`).
- **The differentiators that need the open model:** the **live-preview preset gallery** generalised
  so *preset* authors (not just card authors) can contribute layouts; **Lovelace import/migration**
  mapping HA card types onto registered `CardType`s (an importer is just a `BlockConfig[]` producer).

**Out (post-1.0 / Later):**
- **Runtime/iframe plugin host** — loading a plugin bundle by URL at runtime, sandboxed. Big surface
  (CSP, versioning, untrusted code); intentionally after the compile-time API is stable.
- **A plugin marketplace / HACS-style discovery.**
- **A visual card-type builder** (compose a card type without code) — the far horizon.

### The cut line, stated plainly

| Question | M1 | M2 |
|---|---|---|
| Does the registry exist and drive core? | **Yes** | Yes |
| Can a 3rd party add a card without forking? | Possible, undocumented | **Yes, supported + documented** |
| Is the public API frozen / semver'd? | No (Evolving/Internal) | **Yes** |
| Worked example + linter + icons? | No | **Yes** |
| Runtime plugin host / marketplace? | No | No (Later) |

---

## 7. Later — beyond v1

- **Preset registry** — `registerPreset(builder)` so the gallery's curated layouts are an open set,
  mirroring `registerCardType`. The builders are already pure functions, so the seam is small.
- **Runtime plugin host** — a sandboxed loader (CSP'd iframe or module-federation) for plugins
  shipped *outside* the bundle; the compile-time `CardType` shape is the same, only the delivery
  changes.
- **Capability negotiation** — a card declares the HA features it needs (`statistics` backend,
  `camera` stream); the host hides it gracefully when absent (extends today's `hideWhenEmpty` /
  graceful-degradation idiom to whole card types).
- **A visual "card type studio"** — author a simple card type from the editor itself (bind fields to
  attributes, choose a layout) without writing TypeScript — the ultimate expression of "no YAML, for
  other people."

---

## 8. Summary of integrator changes this spec implies

This document is a spec; it edits no shared files. For the integrator, the concrete seams are:

1. **NEW files** (owned by the registry build, not this doc): `src/registry/index.ts`,
   `src/registry/cardTypes.ts`, `src/registry/widgets.ts`, `src/registry/theme.ts`, and (M2)
   `src/public.ts`.
2. **`widgets/index.ts`** — refactor `REGISTRY`/`widgetFor` to delegate to the widget registry;
   register the twelve core tiles via `registerCoreWidgets()`. Lookup semantics unchanged.
3. **Surface renderer** (`dashboard/blocks/*` render switch) — replace `switch (block.type)` with
   `cardTypeForBlock(block)?.render`, with an "unknown card" placeholder fallback.
4. **`CardGallery` host** — feed it `cardKinds()` instead of a hand-written list.
5. **`Inspector`** — mount `cardType.editor` in a "Card settings" section when present.
6. **`editor/types.ts` → `BlockOptions`** — add the single optional field `cardType?: string` (§1.4).
   This is the only schema change, and it is additive (v3 blocks stay valid).
7. **`storage.ts`** — on load, run `schema.validate`/`migrate` per block; widen accepted versions.

No change to `styles.css`, `App.tsx`, `panel.tsx`, `store.tsx`, or `dashboard/types.ts` is required
for M1 (novel 3rd-party cards in M2 need only the additive `options.cardType` field, kept in
`editor/types.ts`, so `dashboard/types.ts`'s closed `BlockType` union never has to open).
