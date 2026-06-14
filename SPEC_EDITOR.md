# SPEC_EDITOR — the simUI editor subsystem

The make-or-break gap: a **Lovelace-grade "add a card" experience** that simUI owns end to
end (the owner chose "own everything", including the editor — no YAML, ever). This is the
definitive architecture. It obeys [`DESIGN_PRINCIPLES.md`](DESIGN_PRINCIPLES.md) (compose
don't tile; minimal motion; tap = Sheet; right-click = context menu; dark-first, one accent)
and extends the contracts in [`FRAMEWORK.md`](FRAMEWORK.md) (Tile / Block / Chart / StatusStrip).

The concrete TypeScript lives in [`src/editor/types.ts`](src/editor/types.ts) — every type
named here exists there. This document is the *why* and the *flow*; that file is the *what*.

---

## 0. Where the editor sits today

The shell already has a primitive editor:

- `store.tsx` holds `editing: boolean`, plus block-list mutators — `reorderBlocks`,
  `removeBlock`, `cycleBlockSpan`, `addCard(entityId)` — all routed through one private
  `mutateBlocks(fn: (Block[]) => Block[])` that targets whichever surface is active (a room, a
  category override, or the home override).
- `BlockChrome.tsx` renders, in edit mode, a drag handle + a span-cycle button + a remove "×"
  per block.
- `AddCardPanel.tsx` is a flat, search-only entity list that appends a `card` block.
- `CategoryView.tsx` snapshots a generated preset into an **override** on first edit, then
  edits it like a room ("Reset to preset" drops the override).

**What's missing** (the deliverable): a **card gallery** (add *any* block type, not just a
single-entity card), a **per-card/per-tile inspector** (name / icon / color / features /
actions / span / membership), a **faceted entity picker**, real **drag-move + drag-resize**,
**duplicate / copy-paste / undo-redo**, and a **serialisable per-tile config** so a leaf can be
named, recolored, and rebound. Everything below builds that without breaking saved configs.

---

## 1. The edit / selection model

### 1.1 Two levels of selection

The unit of composition is the **block**; the unit of binding is the **tile** (one entity). The
editor therefore has a two-level selection (`Selection` in `editor/types.ts`):

```
none → block (a whole block is selected) → tile (one leaf inside the block)
```

- **Click a block's chrome** (its frame / drag handle) → `selectBlock(blockId)`. The block gets
  a hairline selection ring (no glow — DESIGN_PRINCIPLES §3, depth is light not elevation).
- **Click a leaf inside a selected block** → `selectTile(blockId, entityId)`. The Inspector
  deepens from the block form to the tile form.
- **Click empty surface / Esc** → `clearSelection()`.

The Inspector binds to the *deepest* selection: a `tile` selection shows the tile form, a bare
`block` selection shows the block form. This keeps one inspector instead of two competing panels.

### 1.2 Entering / leaving edit

`enter()` flips `EditorState.active`, mirrors it to the dashboard store's `editing`, and — on a
**category** surface — first snapshots the live preset into an editable override (the existing
`createOverride` / `createHomeOverride` path). On enter, the editor copies the active surface's
blocks into `dirtyBlocks` (its optimistic working copy). `exit({ discard })` flushes (or drops)
`dirtyBlocks`, clears selection / clipboard / undo, and unmounts every transient panel. Per the
minimal-motion rule, panels **appear**, they do not slide.

### 1.3 The gallery → drop → inspector flow

This is the spine of "add a card":

1. **Open gallery** (`openGallery()`, the "+" in the surface header). A panel of `CardKind`
   thumbnails, each a **live preview** built from the user's own entities (§5).
2. **Pick a kind.** Click = `dropCard()` appends; drag = `beginPlacing(kind)` then `dropCard(i)`
   at a drop index (dnd-kit, reusing the existing `SortableContext`). A drop calls the kind's
   `make(seed)` to produce a populated `BlockConfig`, inserts it, and pushes one undo snapshot.
3. **Auto-select + open inspector.** After a drop the new block is `selectBlock`ed and the
   Inspector opens, so "add" flows straight into "configure" — the Lovelace card-picker →
   card-editor handoff, but inline and live.

### 1.4 Manipulation verbs (all push exactly one undo snapshot)

| Verb | Trigger | Editor action |
|---|---|---|
| **Move** | drag a block | `moveBlock(from, to)` (dnd-kit `arrayMove`) |
| **Resize** | drag a side handle, or span-cycle button | `resizeBlock(id, span)` |
| **Remove** | "×" on chrome / Inspector / `Delete` key | `removeBlock(id)` |
| **Duplicate** | context menu / Inspector / `⌘D` | `duplicateBlock(id)` (deep clone, fresh ids) |
| **Copy / Paste** | `⌘C` / `⌘V` | `copyBlock(id)` → `clipboard`; `pasteBlock(i)` (cross-surface OK) |
| **Undo / Redo** | `⌘Z` / `⇧⌘Z` | `undo()` / `redo()` over `EditorSnapshot` ring |
| **Add member** | Inspector "+" | `openEntityPicker()` → `addEntities(id, ids)` |
| **Rebind leaf** | tile Inspector | `updateTile(id, entityId, patch)` |

Undo/redo is a **bounded ring of `EditorSnapshot`** (blocks + selection), surface-scoped:
switching surfaces clears it. Coalescing: rapid slider/text edits in the Inspector debounce into
a single snapshot (one drag = one undo), so `⌘Z` undoes a *gesture*, not a keystroke.

---

## 2. The card-config schema (config v3 → v4)

### 2.1 The core move — leaves become configurable

Today a block is only `entityIds: string[]`; a leaf carries **no** name/icon/color/feature/
action overrides — the renderers derive everything. The editor's central addition is a
**per-leaf override record** so a tile can be named, recolored, given a control strip, and
rebound — *without* abandoning the auto-default (the 90% case stays empty).

`BlockConfig` (extends the existing `Block`):

```ts
interface BlockConfig extends Block {
  tiles?: Record<string, TileConfig>;   // entityId → leaf overrides; absent ⇒ auto-defaults
  actions?: ActionMap;                   // block-level (action-only / launcher / single card)
  options?: BlockOptions;                // per-type knobs (axis/source/chart/visibleWhen/wrap)
}
```

- **Stored INLINE on the block.** The persisted shape stays a `Block[]`; renderers read
  `block.tiles?.[entityId]` to flex one leaf. No parallel config tree, no id-join to maintain.
- **Absence = default.** An entity with no `tiles` entry, or an empty `TileConfig`, renders
  exactly as it does today. This is what makes v3 configs forward-compatible and presets terse.

`TileConfig` mirrors the Tile contract (FRAMEWORK.md §1) field-for-field — `name`, `icon`,
`color` (a `ColorToken`, never raw hex), `features` (`TileFeature[]`), `stateContent`,
`hideState`, `orientation`, and `actions` (an `ActionMap`).

### 2.2 Configurable actions — cleaner than `tap_action`

`ActionMap` models Lovelace's `tap_action` / `hold_action` / `double_tap_action`, renamed to
simUI's interaction model and made a **closed discriminated union** (`HassAction`, already
shipped in `widgets/tileContract.ts` and executed by `runAction`):

```ts
interface ActionMap { tap?; iconTap?; hold?; doubleTap?: HassAction }
```

- `tap` → body tap (default `more-info` → the Sheet). `iconTap` → icon tap (default `toggle`).
  `hold` → long-press / right-click (default: the context menu). `doubleTap` → smart-click
  expand (chart → full chart).
- **Never store a default.** Absence *is* the default. The inspector writes a slot only when the
  user changes it, so configs stay minimal and round-trip cleanly. `navigate` is an internal
  route (`category/<id>`, `room/<id>`, `home`), never `/lovelace/*`.

### 2.3 Per-type add-able kinds

Every add-able block type is a `CardKind` in the gallery, each with a `make(seed)` factory that
produces a populated `BlockConfig`:

| Kind | `type` | Defaults `make()` produces | Inspector exposes |
|---|---|---|---|
| **Card** | `card` | one entity, span by domain | the entity, name/icon/color, `actions` |
| **Group** | `group` | seed members, `axis: 'none'` | title, `axis`, `leafTile` (rows/slider/board), members, per-tile |
| **Live list** | `list` | a `source` (e.g. `{domain}` active) | title, `source` matchers, `wrap`, `hideWhenEmpty` |
| **History chart** | `chart` | a `chart` spec, span 2/full | title, `window`, `series[]`, `axes`, `thresholds`, header |
| **Hero** | `hero` | the primary entity, span 2 | the entity, name/color, `features` |
| **Attention** | `attention` | seed members | members, `visibleWhen` |
| **Launcher** | `group` (action-only) | `category.*` synthetic ids | label, icon, `categoryAccent`, `tap` action |

`make` receives a relevant entity **seed** (the surface's members of a fitting domain) so a
dropped card lands non-empty — drop a Group on the Lights surface and it arrives pre-filled. An
empty seed yields an empty-but-valid block the user then fills via the picker. Type-specific
knobs (`axis`, `source`, `chart`, `visibleWhen`, `wrap`) live under `options` *and* on the
existing `Block` fields; the renderer reads the `Block` field, the inspector writes both (they
are kept in sync on commit — see §3).

### 2.4 Color, naming, graceful degradation — the approachability layer

- **Color is a token, not a hex** (`ColorToken`) — it resolves to a theme variable and inherits
  `hass.themes` when embedded (FRAMEWORK.md §7). The inspector offers the two reserved roles only:
  a state accent (applied when active) and the per-category accents — never a freeform picker.
- **Name** defaults to the short leaf label (friendly_name minus the area/group prefix,
  `leafName` in presets); the inspector always allows an override.
- A surface must look right at 3 entities or 280 (DESIGN_PRINCIPLES §12) — the gallery filters
  kinds by what the surface actually contains (`CardKind.domains`), and prefers list/group over a
  wall of single cards.

---

## 3. Persistence + migration (v3 → v4, non-breaking)

The persisted config moves from `version: 3` to `version: 4` (`DashboardConfigV4`). **The
migration is a no-op rewrite of the version field**: because every new field on `BlockConfig`
(`tiles`, `actions`, `options`) is optional, **every v3 `Block` already validates as a v4
`BlockConfig`**. Nothing in a saved config needs rewriting; v4 just *permits* the new fields.

Concretely, in `storage.ts`:

- `migrate()` keeps the existing `size → span` normalisation (still needed for ancient v2),
  then sets `version: 4` and passes blocks through unchanged. It already runs idempotently, so
  re-running on a v4 config is safe.
- `loadDashboard` widens its accept list from `ver === 2 || ver === 3` to **`2 | 3 | 4`**.
- The storage key (`simui:dashboard:v2`) and the HA user-data round-trip (localStorage +
  `frontend/{get,set}_user_data`) are unchanged.
- **Sync rule on commit:** when the inspector edits an `options.*` field that shadows a real
  `Block` field (`options.axis`/`axis`, `options.source`/`source`, `options.chart`/`chart`,
  `options.visibleWhen`/`visibleWhen`, `options.leafTile`/`tile`), the commit writes the
  canonical `Block` field (what the renderer reads) and may drop the `options` shadow. This keeps
  one source of truth in the persisted block and avoids divergence. New-only fields (`tiles`,
  per-tile `actions`) have no `Block` shadow and persist as-is.

Forward safety: an unknown future field on a block is preserved by the spread-based mutators
(`{ ...block, ...patch }`), so a newer simUI's config opened by an older build degrades rather
than corrupts.

---

## 4. Live previews in the gallery

Each gallery thumbnail is a **real preview built from the user's own entities**, not a static
mock — this is what makes the picker trustworthy (you see what you'll get).

- The gallery is handed a `PreviewContext` (`states` + `sample(n, domains)` + `resolve(id)`),
  **not** the hass context. It is therefore pure and testable: the parent (the editor host)
  builds `PreviewContext` once from `useAllStates()` + the surface's area map and passes it down.
- `sample(n, domains)` returns up to `n` real entity ids from the surface (falling back to the
  whole home) matching any of `domains`. A Group thumbnail samples 3 lights; a Chart thumbnail
  samples one numeric sensor; a Card thumbnail samples one media_player — so every card shows
  *your* devices.
- Each thumbnail renders the **actual block renderer** (`BlockBody` from `BlockChrome.tsx`) at
  reduced scale inside a non-interactive container, with `make(sample(...))` as input. One code
  path for preview and for real — no preview-only components to drift.
- Performance (DESIGN_PRINCIPLES §13): previews subscribe through the same per-entity
  `useEntity`; the gallery samples a *small fixed* set so a 6,000-entity home doesn't re-render
  the picker on every tick.

---

## 5. The Inspector — controlled, decoupled from the store

The Inspector is a **controlled** component (`InspectorProps`): it receives the selected
`block` + `tile` + a `states` snapshot and emits granular patches (`onBlockChange`,
`onTileChange`). **It never touches the store.** The editor host applies those patches through
`EditorActions` (`updateBlock` / `updateTile`), which is where undo-snapshotting and the
debounced commit live. This decoupling is deliberate:

- The inspector is pure UI → trivially testable and reusable (the same tile-form drives the
  gallery's "configure on drop").
- One place owns mutation semantics (coalescing, undo, commit, `options`↔`Block` sync), so the
  inspector can't accidentally bypass undo or persist mid-drag.

It switches form by `selection.kind`:

- **tile** → the leaf form: name, icon (lucide name from `components/icons`), color token,
  `features` (curated by domain — a climate tile offers hvac/fan modes + setpoint; a cover offers
  open/close), `stateContent`, `hideState`, `orientation`, and the three action slots.
- **block** → the block form: title, span, type-specific options (`axis`, `source` matchers,
  `chart` spec, `visibleWhen`), and the member list (add via the picker, remove inline, reorder).
- **none** → an empty hint ("Select a block to edit").

Commit path: inspector patch → `EditorActions.update*` (push/coalesce undo) → mutate
`dirtyBlocks` → debounced flush → dashboard store `mutateBlocks` → `saveDashboard`. The
"committing" flag drives a subtle saved-hint, never a spinner (minimal motion).

---

## 6. Module map — `src/editor/`

```
src/editor/
  types.ts            // ✅ the contracts (this deliverable)
  store.tsx           // EditorProvider + useEditor(): EditorState & EditorActions.
                      //   Owns selection/clipboard/undo + dirtyBlocks; commits via the
                      //   dashboard store's mutateBlocks. Wraps DashboardProvider's children.
  EditorOverlay.tsx   // Mounts the active transient panel (gallery | inspector | picker)
                      //   over the surface; hosts the selection ring + drag/resize handles.
  CardGallery.tsx     // <CardGallery> (CardGalleryProps) — the catalogue + live previews.
  cardKinds.ts        // the CardKind[] catalogue + each kind's make(seed) factory.
  Inspector.tsx       // <Inspector> (InspectorProps) — block form + tile form.
  inspector/          // TileForm, BlockForm, ActionEditor, ChartEditor, SourceEditor,
                      //   ColorTokenPicker, IconPicker, FeaturePicker (controlled sub-forms).
  EntityPicker.tsx    // <EntityPicker> (EntityPickerProps) — faceted, multi-select chooser.
  preview.ts          // buildPreviewContext(states, areaOf) → PreviewContext (sample/resolve).
  history.ts          // the EditorSnapshot ring (push/undo/redo/coalesce).
  clipboard.ts        // copy/paste of a detached BlockConfig (deep clone, fresh ids).
```

### 6.1 How it wires into the existing code (for the integrator)

The editor is a **thin layer over the dashboard store**, not a rewrite. Required additions:

**`store.tsx` — expose the seams the editor commits through.** It already has the private
`mutateBlocks` and the `editing` flag; surface what the editor needs:

- Keep `mutateBlocks` but **export it** (via context) so `editor/store.tsx` can flush
  `dirtyBlocks` in one call. (Today every mutator is hand-rolled around it; the editor wants the
  raw seam.)
- Add `addBlock(type, seed?)` — generalises the current `addCard(entityId)` (which only ever
  makes a `card` block) to any `BlockType` via the matching `CardKind.make`.
- Add `duplicateBlock(blockId)` — deep-clone with fresh `uid()`s, insert after the original.
- Add **selection state** *or* (preferred) leave selection entirely inside `editor/store.tsx`
  and have the dashboard store own only block data. Selection is editor-transient, not persisted,
  so it should NOT live in `DashboardConfig`. The cleanest split: dashboard store = block data +
  `mutateBlocks`; editor store = `active`, `selection`, `dirtyBlocks`, `clipboard`, undo.
- Add `undo` / `redo` is **editor-store-owned** (it snapshots `dirtyBlocks`), not dashboard-store
  — the dashboard store only ever sees the final committed block list.

**`BlockChrome.tsx` — drive chrome from selection + add resize handles.**

- Read `useEditor()` for `selection` and the verb callbacks; add the selection ring
  (`selection.kind !== 'none' && selection.blockId === block.id`), per-leaf click → `selectTile`,
  and side drag-handles for `resizeBlock` (the current span-cycle button stays as the coarse
  fallback). The remove "×" routes to `EditorActions.removeBlock` (→ undo).
- Add a per-block context menu (reuse `useContextMenu` from `components/ContextMenu.tsx`):
  Duplicate / Copy / Remove / "Edit…" (→ `selectBlock` + `openInspector`).

**`CategoryView.tsx` (and the room view) — swap the panels.**

- Replace `<AddCardPanel>` with the gallery + picker mounted by `<EditorOverlay>`; the "+" calls
  `openGallery()`. Keep the existing override-snapshot-on-edit behaviour — the editor's `enter()`
  triggers it.

Nothing in the render path changes for **viewing**: a non-editing surface renders `BlockConfig`s
exactly as it renders `Block`s today (the new fields are read opportunistically). The editor is
additive.

---

## 7. Interaction & visual rules (recap against the design law)

- **Minimal motion** — panels appear; the selection ring is a hairline, not a glow; no
  card-flip or slide on add. Transitions ≤180ms where unavoidable.
- **Tap = Sheet, hold/right-click = context menu** — the editor *configures* those actions
  (`ActionMap`) but never changes the gesture grammar; the context menu is the edit affordance in
  edit mode (Duplicate/Copy/Remove) and the action menu in view mode.
- **One accent, tokens not hex** — the color picker offers only the reserved roles.
- **No exposed entity wall** — the picker is faceted and curation-gated (`isPrimary`), never the
  raw 6,000-entity registry (DESIGN_PRINCIPLES §12).
- **Compose, don't tile** — the gallery leads with Group / Live list / Hero (the composing
  primitives); Card is reserved for true objects (media / chart / camera), matching §1.

---

## Contracts

The authoritative shapes live in [`src/editor/types.ts`](src/editor/types.ts). Downstream agents
implement against `EditorState` + the three component prop interfaces (quoted verbatim at the end
of the agent summary).
