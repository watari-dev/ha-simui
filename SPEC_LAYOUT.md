# SPEC_LAYOUT.md — the layout-editing engine

> The build plan for simUI's layout subsystem: a **12-column responsive grid**, block
> **position + span**, **drag-to-move** (including between sections), **drag-to-resize**
> (handles), **sections/regions** within a surface, **responsive breakpoints** consuming
> HA's `narrow`, and the **`{ surfaces }` unification** that lets Home / Room / Category
> share ONE edit shell.
>
> This is a spec, not code. It states the target **data model**, **component structure**,
> and a **migration path** that keeps every existing v3 config rendering unchanged. It is
> written against the real code as it stands today:
> `src/dashboard/types.ts`, `store.tsx`, `RoomView.tsx`, `CategoryView.tsx`, `HomeView.tsx`,
> `BlockChrome.tsx`, `storage.ts`, `panel.tsx`, and the editor contracts in
> `src/editor/types.ts` (the Foundation deliverable). It obeys `FRAMEWORK.md` §2 (block owns
> layout; the tile never carries placement) and `DESIGN_PRINCIPLES.md` §14 (one tree re-flows;
> minimal motion — layout *appears*, it doesn't animate).

---

## 0. Where we are vs. where this takes us

**Today.** Placement is a single enum `BlockSpan = 1 | 2 | 'full'` on the block. The grid is
CSS `repeat(auto-fill, minmax(150px, 1fr))` (`styles.css:46`); span maps to `grid-column: span 2`
/ `1 / -1` (`styles.css:153–154`). There is no column count, no row, no explicit position — blocks
flow in array order. Edit chrome (`BlockChrome.tsx`) gives drag-to-**reorder** (one flat
`SortableContext`), a **cycle-span** button (`1× → 2× → Full`), and remove. There are **three
near-duplicate view shells** (`RoomView`, `CategoryView`, `HomeView`), each re-implementing the
same `DndContext` + `SortableContext` + edit header, and a **room-vs-override fork**: rooms are
always editable; Home and Category surfaces render read-only from a preset builder until the user
edits, which snapshots into `config.overrides[...]`. `panel.tsx:34` receives HA's `narrow` and
**throws it away** (`set narrow(_value: boolean) {}`).

**Target.** A surface is a list of **sections**; each section lays its blocks into a **12-column
grid** by explicit `{ col, span }` (and an implicit packed row order). Blocks **move** within and
**between** sections by drag; they **resize** by dragging an edge handle that snaps to columns;
breakpoints (`phone | tablet | desktop`, derived from HA's `narrow` + width) collapse the grid to
fewer columns with a deterministic reflow. All three surfaces render through **one** `SurfaceView`
+ one `EditShell`, driven by a unified `surfaces` accessor that erases the room/override fork from
the call sites.

This lands in **four independently-shippable phases** (§9) so nothing has to break at once.

---

## 1. The grid model — 12 columns, responsive

Per `FRAMEWORK.md` §2: *"blocks auto-size into a 12-col section grid by default; `span` is the only
knob (`'full' | 1..12`); `rows` is reserved for charts/banners."* We implement exactly that.

### 1.1 Column count per breakpoint

The authoring grid is **12 columns at desktop**. At narrower breakpoints the grid *narrows* — the
column count drops and each block's effective span is clamped — but the **stored** spans are always
authored against 12. This is the single most important rule: **author once at 12, reflow down.**

| Breakpoint | Trigger | Columns | Notes |
|---|---|---|---|
| `desktop` | `!narrow && width ≥ 1100` | **12** | full authoring grid |
| `tablet`  | `!narrow && width ≥ 680`, or `narrow && width ≥ 680` | **6** | spans halved + clamped (§1.3) |
| `phone`   | otherwise (incl. `narrow && width < 680`) | **4** | most blocks go full-bleed |

`narrow` comes from HA (it's true in the Companion apps and the slim sidebar layout). Width comes
from a `ResizeObserver` on the panel root — `narrow` alone is too coarse (a wall tablet in landscape
is not `narrow` but is not desktop either). The breakpoint is **min** of the two signals: if HA says
`narrow`, we never exceed `tablet`.

### 1.2 Block placement fields

Replace the lone `span` enum with an explicit placement object, **all fields optional** so an
un-placed block auto-flows exactly like today:

```ts
// dashboard/types.ts — extends Block (non-breaking; every field optional)
export interface BlockLayout {
  /** 1..12 column width at the authoring (desktop, 12-col) grid. Omit ⇒ auto-fit. */
  span?: number;            // was BlockSpan (1 | 2 | 'full'); 'full' ⇒ 12
  /** 1-based start column at the 12-col grid. Omit ⇒ auto-pack left-to-right. */
  col?: number;             // 1..12
  /** Row band for explicit 2-D placement. Omit ⇒ implicit (array order packs rows). */
  row?: number;
  /** Vertical extent for charts/banners (FRAMEWORK.md §2 `rows`). Omit ⇒ content height. */
  rowSpan?: number;
  /**
   * Per-breakpoint span overrides. Omit a breakpoint ⇒ derive by clamping (§1.3).
   * Authors rarely set this; the editor writes it only when the user resizes AT a
   * specific breakpoint ("make this full-width on phone").
   */
  spanAt?: Partial<Record<Breakpoint, number>>;
}
export type Breakpoint = 'phone' | 'tablet' | 'desktop';
```

`Block.span` keeps existing meaning by aliasing: a `BlockSpan` of `1 | 2 | 'full'` is read as
`span = 1 | 2 | 12`. We do **not** delete `span` from `Block`; we **widen** it (§4) so old configs
and old presets keep compiling. `col`/`row`/`rowSpan`/`spanAt` are brand-new optional fields — a v3
block has none, so it auto-flows, identical to today.

### 1.3 Reflow: deriving the effective span at a breakpoint

A pure function, no React, fully testable, the heart of "author once, reflow down":

```ts
// dashboard/layout.ts (new, pure)
function effectiveSpan(layout: BlockLayout, bp: Breakpoint, cols: number): number {
  // 1. explicit per-breakpoint override wins
  const explicit = layout.spanAt?.[bp];
  if (explicit != null) return clamp(explicit, 1, cols);
  // 2. otherwise scale the authored 12-col span down to this grid, never below 1,
  //    and snap "≥ ¾ of the grid" up to full so wide blocks don't orphan a thin column.
  const authored = normalizeSpan(layout.span);          // 'full' | undefined → 12 | auto
  if (authored == null) return cols;                     // auto-fit ⇒ full at this bp by default
  const scaled = Math.round((authored / 12) * cols);
  const snapped = scaled >= cols * 0.75 ? cols : scaled;
  return clamp(snapped, 1, cols);
}
```

- At `desktop` (12 cols) this is the identity — a stored `span: 6` is 6 columns.
- At `phone` (4 cols) a `span: 6` (half) becomes `round(6/12*4)=2`; a `span: 9` (¾) snaps to 4
  (full). This is the graceful-degradation rule from `FRAMEWORK.md` §8 expressed numerically.
- `col`/`row` are honoured only at `desktop`; at `tablet`/`phone` blocks **re-pack** in array
  order into the narrower grid (explicit 2-D positioning at phone width is more harm than help).
  This keeps reflow deterministic and matches HA's own narrow behaviour (it collapses to one column).

### 1.4 CSS: real `grid-template-columns`, not auto-fill

The grid stops being content-sized (`auto-fill minmax`) and becomes a true N-column track grid, so
`col` can place a block and resize handles can snap to a column edge.

```css
/* owned by the layout component's *.css, NOT the global styles.css — see §8 hand-off */
.simui-section-grid {
  display: grid;
  grid-template-columns: repeat(var(--cols, 12), minmax(0, 1fr));
  gap: var(--grid-gap, 12px);
  align-items: start;
}
```

Each block sets `grid-column: var(--col, auto) / span var(--span)` via inline style (the engine
computes `--cols`, `--col`, `--span` from the breakpoint + `effectiveSpan`). A block with no `col`
uses `auto` and the grid's implicit packing places it — i.e. exactly today's flow behaviour, just on
a 12-track grid instead of an auto-fill one.

> **Integrator note (shared file).** `styles.css:46/153/154` define `.simui-grid` (auto-fill) and
> the `.span-2`/`.span-full` mappings. Those stay for any non-migrated call site, but the new
> surface grid uses `.simui-section-grid` from a co-located CSS module. The integrator should add a
> body-level `--cols` custom property and ensure `.simui-surface-grid` (already on Home/Category)
> opts into the new class. Described, not edited, per the fan-out rules.

---

## 2. Sections / regions within a surface

A surface today is a flat `Block[]`. Real dashboards group blocks under headings ("Climate",
"Security") that should reflow and reorder as units, and a 12-col grid begs for column-banded
regions ("a 2-col rail beside an 8-col main"). We introduce a **Section**: a titled sub-grid.

```ts
// dashboard/types.ts
export interface Section {
  id: string;
  /** Optional heading rendered as a GroupBlock-style title (typography, no panel). */
  title?: string;
  /** Blocks laid into THIS section's 12-col grid. */
  blocks: Block[];
  /**
   * Region shape. 'grid' (default) = the full 12-col grid. 'rail' = a narrow fixed
   * band (e.g. 3 cols) that sits beside the next 'main' section at desktop and stacks
   * above it on phone. Reserved for the wall-tablet / dashboard presets.
   */
  region?: 'grid' | 'rail' | 'main';
  /** Conditional surfacing for the WHOLE section (mirrors Block.visibleWhen). */
  visibleWhen?: Condition;
}
```

**Backward compatibility is the whole game here.** A surface that is "just a flat block list" is
modelled as **one implicit section** with no title and `region: 'grid'`. The data model therefore
keeps storing `blocks: Block[]` at the surface level *and* gains an optional `sections?: Section[]`;
the resolver (§3.2) yields a normalized `Section[]` either way:

```ts
function sectionsOf(surface: { blocks: Block[]; sections?: Section[] }): Section[] {
  if (surface.sections?.length) return surface.sections;
  return [{ id: '__root__', blocks: surface.blocks, region: 'grid' }];
}
```

So nothing in storage changes until the user actually adds a second section. Sections are a Phase-3
capability (§9); Phases 1–2 operate entirely on the single implicit root section.

**Cross-section drag** (move a block out of "Climate" into "Security") falls out of dnd-kit's
multi-container pattern: each section is its own `SortableContext` with the section id as the
droppable container; the surface wraps them in one `DndContext` and a `closestCenter`/`pointerWithin`
collision strategy. On `onDragEnd` the engine computes (sourceSection, fromIndex) → (targetSection,
toIndex/col) and issues a single `moveBlock` across sections (§5.3). This is the standard
dnd-kit sortable-between-containers recipe — no custom hit-testing.

---

## 3. The `{ surfaces }` unification — one edit shell

This is the structural payoff. Today `RoomView`, `CategoryView`, `HomeView` each:

- compute `blocks` (room: `room.blocks`; category/home: `override ?? preset.build(...)`),
- own a `DndContext` + `SortableContext` + `onDragEnd → reorderBlocks`,
- own an edit-toggle header with Add/Reset/Done,
- branch on `override` to pick `BlockChrome` (editable) vs `StaticBlock` (read-only).

Three copies of one mechanism, forked by surface kind and by "is this an override yet". We retire
the fork.

### 3.1 A `Surface` is the same thing everywhere

Define one resolved type the editor and renderer both speak:

```ts
// dashboard/surfaces.ts (new)
export type SurfaceKey =
  | { kind: 'home' }
  | { kind: 'room'; id: string }
  | { kind: 'category'; id: string };

export interface ResolvedSurface {
  key: SurfaceKey;
  title: string;
  /** Normalized sections (always ≥ 1; flat surfaces ⇒ one implicit section). */
  sections: Section[];
  /** The status-strip pills (home/category presets supply these; rooms: none). */
  statusStrip?: Pill[];
  /** Ambient config (lights ids for the canvas; rooms + lights/climate categories). */
  ambient?: { mode: 'glow' | 'field'; lightIds: string[]; maxOpacity?: number };
  /**
   * Whether this surface is currently backed by *editable* persisted blocks (a room,
   * or an overridden home/category) vs. a *live preset* (read-only until first edit).
   * The shell uses this to decide whether the first Edit click needs a snapshot.
   */
  editable: boolean;
  /** Preset-built blocks to snapshot on first edit (only when `editable` is false). */
  presetBlocks?: Block[];
}
```

### 3.2 One resolver, replacing three inline builders

A single hook resolves any `SurfaceKey` to a `ResolvedSurface`, centralizing the room/preset/override
logic that's currently smeared across the three views:

```ts
// dashboard/surfaces.ts
export function useSurface(key: SurfaceKey): ResolvedSurface;
```

Internally:
- `home` → `buildHome(...)` (today in `HomeView`), override at `overrides['home']`.
- `room` → `config.rooms.find(...)`, always editable, no preset.
- `category` → `getPreset(id).build(...)` or `fallbackSurface(...)` (today in `CategoryView`),
  override at `overrides['category:id']`.

The override/preset selection, the `idSig` memoization, and `sectionsOf(...)` normalization all live
**here, once**. `RoomView`/`CategoryView`/`HomeView` shrink to thin wrappers (or vanish — §3.4).

### 3.3 `mutateBlocks` already generalizes — it just needs a section index

`store.tsx`'s `mutateBlocks(fn)` already routes a block-list transform to the correct backing store
keyed off `route.kind` (rooms array vs `overrides['home']` vs `overrides['category:id']`). That is
**exactly** the unification at the data layer — the editor doesn't need three code paths, it needs
`mutateBlocks` to address a **section**:

```ts
// integrator change to store.tsx (DESCRIBED, not edited here):
mutateSection(sectionId: string, fn: (blocks: Block[]) => Block[]): void
// — resolves the active surface (route), finds the section (or the implicit root),
//   applies fn to that section's blocks, writes back. The current mutateBlocks
//   becomes mutateSection('__root__', fn). All existing callers keep working.
```

The room-vs-override fork in `mutateBlocks` stays *inside the store* (it's the right place — it's a
persistence concern), but it disappears from the **views**, which now only ever call
`editor.moveBlock(...)` / `editor.resizeBlock(...)` and never branch on surface kind.

### 3.4 `EditShell` + `SurfaceView` — the two components that replace three views

```
<SurfaceRoute>                         // store-connected; reads route → SurfaceKey
  └─ useSurface(key) → ResolvedSurface
  └─ <EditShell surface=… >            // header chrome + edit toggle + panels host
       └─ <SurfaceCanvas surface=… >   // ambient + status strip + sections
            └─ <SectionGrid section=… editing=… >   // ONE 12-col grid, dnd container
                 └─ <BlockFrame block=… editing=… > // replaces BlockChrome (§5)
```

- **`SurfaceRoute`** (store-connected) maps `route` → `SurfaceKey`, calls `useSurface`, and renders
  `EditShell`. This is the *only* component that touches `useDashboard().route`.
- **`EditShell`** (new, owns the edit header: back button, title, glance, Add, Reset, Done, undo/redo)
  is **surface-kind-agnostic**: it reads `surface.editable`/`surface.presetBlocks` to do the
  first-edit snapshot (calling `createOverride`/`createHomeOverride` as appropriate via one
  `ensureEditable()` callback the resolver provides), then mounts the gallery/inspector panels from
  the Foundation editor store. The three bespoke headers in `RoomView`/`CategoryView`/`HomeView`
  collapse into this one.
- **`SurfaceCanvas`** renders ambient (`AmbientCanvas`), the `SurfaceStrip`, and maps
  `surface.sections` → `SectionGrid`. Home additionally renders its rooms strip below (a
  surface-specific child slot, passed in by `SurfaceRoute` for `kind: 'home'`).
- **`SectionGrid`** owns the per-section `SortableContext` and the 12-col CSS grid; the surface-level
  `DndContext` lives in `SurfaceCanvas` so drags can cross sections (§2).
- **`BlockFrame`** is the evolved `BlockChrome` (§5).

`RoomView.tsx`, `CategoryView.tsx`, `HomeView.tsx` are deleted (or become 3-line `SurfaceRoute`
shims during the transition). The `StaticBlock` vs `BlockChrome` fork dies: a non-editing surface
renders `BlockFrame` with `editing=false` (which renders no handles and honours `visibleWhen` — same
as `StaticBlock` does today).

> **Integrator note (shared files).** `App.tsx` currently switches `route.kind` to render
> Room/Category/Home. It should instead render a single `<SurfaceRoute />`. `store.tsx` needs
> `mutateSection` (§3.3) and the editor seams from `SPEC_EDITOR.md` (`addBlock`, `duplicateBlock`,
> exported `mutateBlocks`). Both described, not edited.

---

## 4. Data-model changes — concrete diff

All additive; **no field is removed or narrowed**, so every persisted v3 config and every preset
builder keeps type-checking and rendering.

```ts
// dashboard/types.ts

// (a) widen span; keep the old union assignable.
export type BlockSpan = 1 | 2 | 'full' | number;   // number = 1..12 (authoring grid)

// (b) new placement object (§1.2) — added to Block, all optional.
export interface Block {
  id: string;
  type: BlockType;
  title?: string;
  entityIds: string[];
  span: BlockSpan;          // unchanged field; now also accepts 1..12
  col?: number;             // NEW — 1..12 start column (desktop only)
  row?: number;             // NEW — explicit row band (desktop only)
  rowSpan?: number;         // NEW — vertical extent (charts/banners)
  spanAt?: Partial<Record<Breakpoint, number>>;  // NEW — per-breakpoint span override
  // …existing optional type-specific fields unchanged (axis/tile/source/visibleWhen/chart)
}

// (c) sections on a surface (§2) — optional, surface-level.
export interface Room { id: string; name: string; areaId: string | null;
  blocks: Block[]; sections?: Section[]; }          // sections optional
export interface SurfaceOverride { blocks: Block[]; sections?: Section[]; }

// (d) Breakpoint + Section + BlockLayout exported (see §1.2 / §2).

// (e) version bump.
export interface DashboardConfig { version: 4; rooms: Room[];
  overrides?: Record<string, SurfaceOverride>; }
```

This dovetails with `src/editor/types.ts`: `BlockConfig extends Block`, so the placement fields
(`col`/`row`/`rowSpan`/`spanAt`) and `BlockSpan = …| number` flow into `BlockConfig` for free, and
`DashboardConfigV4` already declares `version: 4`. The Inspector's "span" control (Foundation) writes
`span`; this spec adds the `col`/`spanAt` writers in the *layout* surface, not the inspector.

**Relationship to `BlockLayout` (editor contract).** §1.2 presents the placement fields as a grouped
`BlockLayout` interface for clarity, but they live **flat on `Block`** (mirroring how `axis`/`source`
already live flat), so no nesting/migration is needed and `BlockConfig extends Block` keeps working.
`BlockLayout` is the *conceptual* grouping the layout functions accept (`effectiveSpan(layoutOf(block),
…)` where `layoutOf` just picks the four fields off the block).

---

## 5. Drag-to-move and drag-to-resize

### 5.1 What `BlockFrame` renders in edit mode

`BlockChrome` today renders a drag-grab strip, a span-**cycle** button (`1× → 2× → Full`), and a
remove `×`. `BlockFrame` keeps the grab + remove, **replaces the cycle button with real resize
handles**, and adds select-to-inspect:

```
┌───────────────────────────────────────────────┐
│ ⠿ (grab, whole-frame move)              ⧉  ×   │  ← duplicate, remove
│                                                │
│   <BlockBody/>  (one render path, preview too) │
│                                              ▕ │  ← E (east) resize handle
└───────────────────────────────────────────────┘
        ▔▔▔▔▔▔▔▔▔ S (south) handle, only when rowSpan-capable (charts)
```

- **Body tap** in edit mode = `selectBlock(id)` (drives the Inspector). Tile tap =
  `selectTile(id, entityId)`. (Outside edit mode taps keep their runtime behaviour — Sheet etc.)
- **Whole-frame drag** (grab handle, or press-drag on the body) = **move**.
- **East handle** drag = **resize span**; **south handle** (charts/banners with `rowSpan`) = resize
  rows. The handle snaps to the nearest column boundary using the live grid metrics (§5.2).

### 5.2 Resize: column-snapping via grid geometry

Resize is a pointer gesture, not dnd-kit sortable (dnd-kit is for reorder/move). Implement with a
small `usePointerResize` hook:

1. On handle `pointerdown`, capture the pointer, read the section grid's bounding box and the
   computed column width: `colWidth = (gridWidth - gap*(cols-1)) / cols`.
2. On `pointermove`, `deltaCols = round((clientX - startX) / (colWidth + gap))`.
3. Preview the new span live by setting `--span` on the frame (CSS only — **no React state per
   move**, so it's 60fps and there's no re-render storm; this honours "minimal motion / surgical
   updates").
4. On `pointerup`, commit once: `editor.resizeBlock(id, clamp(startSpan + deltaCols, 1, cols))`. At
   `desktop` that writes `span` (1..12). At `tablet`/`phone` it writes `spanAt[bp]` (so resizing on a
   phone doesn't silently rewrite the desktop authoring span — the "make this full-width on phone"
   case from §1.2).

Resize at `phone` is offered only for the two coarse widths the 4-col grid supports (e.g. 2 and 4);
the handle snaps between them. Density-first: we don't expose 4 phone widths.

### 5.3 Move: dnd-kit, within and across sections

- Each `SectionGrid` is a `SortableContext` (items = its block ids) **and** a droppable keyed by
  section id. The `DndContext` wraps all sections (in `SurfaceCanvas`).
- **Within a section**: identical to today's `arrayMove` reorder, but the drop index is computed from
  the **grid cell under the pointer** (so dropping into a gap places the block at that column/row),
  not just list order. For an auto-flow section (no explicit `col`) this degrades to plain reorder —
  exactly current behaviour, preserved.
- **Across sections**: `onDragEnd` yields `{ from: {sectionId, index}, to: {sectionId, index} }`. The
  engine removes from the source section and inserts into the target via a single editor action
  `moveBlock(from, to)` (which, under the hood, calls `mutateSection` twice atomically inside one
  store update + one undo snapshot).
- **Live placement preview**: while dragging, the target cell shows a dashed insertion outline (CSS
  `outline`, the same hairline language as `.simui-block.editing`). No layout animation — the
  placeholder *appears* at the snap cell (§ minimal motion).

### 5.4 Adding a card lands it placed

The Foundation gallery's `dropCard(index?)` appends. Layout extends drop targeting: dragging a
gallery card over the grid highlights the **cell** it will occupy; dropping calls
`dropCard` then immediately `resizeBlock`/sets `col` from `CardKind.defaultSpan` and the drop cell.
Click-to-add (no drag) appends to the active section at auto-flow — current behaviour.

---

## 6. Responsive breakpoints — consuming HA's `narrow`

### 6.1 Plumb `narrow` (currently discarded)

`panel.tsx:34` is `set narrow(_value: boolean) {}`. HA pushes `narrow` on every layout change; we
must surface it. Smallest viable change: store it on the panel and notify the same subscriber set the
`hass` setter uses, and expose it on the source.

```ts
// DESCRIBED change to panel.tsx + types.ts (shared files — integrator applies):
//   types.ts:  HassSource adds  isNarrow?: () => boolean;
//   panel.tsx: set narrow(v) { this._narrow = v; this._listeners.forEach(l => l()); }
//              source.isNarrow = () => self._narrow ?? false;
```

In dev (`main-dev.tsx`) there is no HA, so `isNarrow` is absent → treated as `false`; the width-based
`ResizeObserver` still yields phone/tablet from the viewport, so responsive layout works in the dev
harness too.

### 6.2 The breakpoint hook

```ts
// dashboard/useBreakpoint.ts (new)
export function useBreakpoint(): { bp: Breakpoint; cols: number } {
  // 1. width via ResizeObserver on the .simui-app root (debounced to rAF)
  // 2. narrow via useHassSource().isNarrow?.() (subscribed, so it re-evals on push)
  // 3. bp = min(byWidth(width), narrow ? 'tablet' : 'desktop'); cols = COLS[bp]
}
const COLS: Record<Breakpoint, number> = { phone: 4, tablet: 6, desktop: 12 };
```

The breakpoint is provided via a tiny `LayoutContext` at `SurfaceCanvas` so `SectionGrid` (sets
`--cols`) and every `BlockFrame` (computes `effectiveSpan`) read it without prop-drilling. Because it
derives from the subscribed source, a narrow-toggle from HA re-flows the grid with **zero** entity
re-renders — only the layout context value changes.

### 6.3 Reflow behaviour summary

| | desktop (12) | tablet (6) | phone (4) |
|---|---|---|---|
| stored `span: 12 / 'full'` | full | full | full |
| stored `span: 6` | half | full (≥¾ snap) | 2/4 |
| stored `span: 4` | third | 2/6 | full (≥¾ snap) |
| stored `span: 1/2` (legacy) | 1 or 2 of 12 | clamps | 1 or full |
| explicit `col`/`row` | honoured | ignored (re-pack) | ignored (re-pack) |
| `spanAt.phone` set | — | — | wins |

`align-items: start` + implicit packing means short blocks don't stretch and the column reflow never
leaves holes mid-grid. This is the same one-tree-reflows promise as `DESIGN_PRINCIPLES.md` §14
("multi-column ⇄ single") made literal.

---

## 7. Component structure — file map

```
src/dashboard/
  layout.ts            NEW  pure: effectiveSpan, packSections, gridStyleFor(block,bp,cols),
                            dropCellAt(point, gridRect) — no React, unit-tested
  surfaces.ts          NEW  SurfaceKey, ResolvedSurface, Section types + useSurface(key),
                            sectionsOf(), ensureEditable() — the unification core (§3)
  useBreakpoint.ts     NEW  bp + cols from width(ResizeObserver) ⊓ narrow(source) (§6)
  LayoutContext.tsx    NEW  provides { bp, cols } to the subtree
  SurfaceRoute.tsx     NEW  route → SurfaceKey → useSurface → EditShell (only route reader)
  EditShell.tsx        NEW  edit header + panels host; replaces 3 bespoke headers (§3.4)
  SurfaceCanvas.tsx    NEW  ambient + strip + DndContext + sections; rooms-strip slot
  SectionGrid.tsx      NEW  one 12-col grid + SortableContext + droppable (§2/§5.3)
  BlockFrame.tsx       NEW  evolved BlockChrome: move grab + resize handles + select (§5)
  usePointerResize.ts  NEW  column-snapping resize gesture (§5.2)
  layout.css           NEW  .simui-section-grid, handles, insertion outline (co-located)

  RoomView.tsx         DELETE → SurfaceRoute shim, then removed
  CategoryView.tsx     DELETE → SurfaceRoute shim, then removed
  HomeView.tsx         DELETE → SurfaceRoute (keeps rooms-strip child) then removed
  BlockChrome.tsx      SUPERSEDED by BlockFrame (BlockBody/StaticBlock logic folded in)
  types.ts             EXTEND  §4 fields (integrator / Foundation-owned file)
  store.tsx            EXTEND  mutateSection, addBlock, duplicateBlock (integrator)
```

The pure core (`layout.ts`) is deliberately React-free so the snap math and reflow table (§6.3) are
unit-testable without a DOM, and so the same functions drive both the live grid and the gallery's
drop preview.

---

## 8. CSS ownership (fan-out rule)

Every new style ships in `src/dashboard/layout.css`, imported by the component that uses it — the
global `src/styles.css` is **not** edited by the layout work. The integrator makes exactly these
global touches (each described, none done here):

- Add `.simui-section-grid { grid-template-columns: repeat(var(--cols,12), minmax(0,1fr)); … }` (or
  let it live in `layout.css` — preferred).
- Ensure `.simui-surface-grid` / `.simui-home-summary` either adopt the new class or are left intact
  for any un-migrated call site (they can coexist; old auto-fill grid still renders legacy spans).
- Keep `.simui-block.span-2` / `.span-full` (`styles.css:153–154`) as the legacy fallback; the new
  grid sets `grid-column` inline so it doesn't depend on them.

The visual language is unchanged: hairline dashed insertion outline reuses the existing
`.simui-block.editing` dashed-outline token; handles are 6px hit-targets with a 1px accent edge on
hover; **no transitions on grid-column** (layout appears, never animates — `DESIGN_PRINCIPLES.md` §11).

---

## 9. Migration path — four shippable phases

Each phase compiles and renders on its own; nothing requires a flag day.

**Phase 0 — model widening (no behaviour change).**
`BlockSpan |= number`; add `col`/`row`/`rowSpan`/`spanAt`/`Breakpoint`/`Section` to `types.ts`; bump
`version: 4`; `storage.ts` accepts `2|3|4` and `migrate` is a no-op version bump (the Foundation spec
already establishes v3→v4 as a no-op). Result: every existing config loads unchanged; `'full'` still
means full. **Ship.**

**Phase 1 — the unification, same grid.**
Add `surfaces.ts`/`SurfaceRoute`/`EditShell`/`SurfaceCanvas`/`SectionGrid`/`BlockFrame` rendering on
the *existing* auto-fill grid and the *legacy* `1|2|'full'` span (cols treated as the current
auto-fill). Delete the three views. Behaviour is byte-for-byte today's (reorder + cycle-span +
remove), but now from one shell with the room/override fork gone from the call sites. **Ship.**

**Phase 2 — the 12-col grid + resize + responsive.**
Switch `SectionGrid` to the real 12-track grid; `effectiveSpan` + `useBreakpoint` go live; the
cycle-span button becomes drag-resize handles writing `span`/`spanAt`; plumb `narrow` in `panel.tsx`.
Legacy `1|2|'full'` map to `1|2|12` so old configs look right immediately and gain responsive reflow
for free. **Ship.**

**Phase 3 — sections/regions + cross-section move + 2-D placement.**
Enable `sections?`; the editor can add/title/reorder sections and drag blocks between them; `col`/`row`
2-D placement and `rail`/`main` regions land for the wall-tablet presets. Flat surfaces keep running
as the single implicit root section, so this is purely additive. **Ship.**

Rollback at any phase is trivial: the data is a strict superset, so a client one phase behind simply
ignores the fields it doesn't know (`col`/`spanAt`/`sections`) and renders the auto-flow fallback.

---

## 10. Open seams the integrator/other agents must close

1. **`store.tsx`**: add `mutateSection(sectionId, fn)` (generalizing `mutateBlocks`), `addBlock(type,
   seed)`, `duplicateBlock(id)`, and export the `mutateBlocks`/`mutateSection` seam to the editor
   store (per `SPEC_EDITOR.md`). The room/override routing stays inside the store.
2. **`panel.tsx` + `types.ts`**: surface HA's `narrow` (§6.1) — `HassSource.isNarrow?: () => boolean`
   and a real `set narrow(v)` that notifies listeners. Without this, responsive falls back to
   width-only (acceptable but loses the Companion-app signal).
3. **`App.tsx`**: render `<SurfaceRoute/>` in place of the `route.kind` switch over
   Room/Category/Home.
4. **`types.ts`** (Foundation-owned): apply the §4 additive fields. `BlockConfig extends Block`
   inherits them; `DashboardConfigV4.version` already `4`.
5. **`editor/store.tsx`** (Foundation): `moveBlock`/`resizeBlock` in `EditorActions` already exist;
   layout needs them to accept a `{sectionId,index}` move target and a per-breakpoint resize target.
   Suggest widening their signatures to `moveBlock(from: BlockAddr, to: BlockAddr)` and
   `resizeBlock(id, span, bp?)`.

**Assumptions flagged:** (a) `Pill` and `AmbientCanvas` props referenced in `ResolvedSurface` are the
existing shapes from `dashboard/presets/index` and `components/AmbientCanvas`; I reused them rather
than redefining. (b) `Section`/`Breakpoint`/`BlockLayout` are new types I introduce here — if the
Foundation `editor/types.ts` later wants to re-export them, they should live in `dashboard/types.ts`
(the model) and be imported, matching how `BlockSpan`/`GroupAxis` are already re-exported by the
editor. (c) dnd-kit's multi-container sortable is assumed available (it ships in `@dnd-kit/core` +
`@dnd-kit/sortable`, already dependencies). (d) I treat HA `narrow` as the only injected layout
signal; if HA later exposes a width/dock hint we'd fold it into `useBreakpoint` without changing the
model.
