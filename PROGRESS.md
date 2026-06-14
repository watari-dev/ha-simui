# simUI — Progress log

What's been built and decided. Pairs with [TODO.md](TODO.md) (what's next) and
[AGENTS.md](AGENTS.md) (vision + architecture). Keep this current at the end of each chunk.

## Where things stand

Working prototype, HACS-installable and published. Composed **per-room** dashboard with a
home overview menu, a state-reactive ambient canvas, per-entity subscriptions, edit mode,
and seven entity widgets. **Mid-pivot** to a navigation *shell* (Home summary + device-type
categories + native sheets + presets) — the shell, primitive contracts, and first presets are
now **specified** (INSPIRATION / FRAMEWORK / PRESETS). The owner's **real** HA is now connected
(`simbas-home-assistant`) and its dashboard analyzed for inspiration.

## Shipped

- **Editor MVP wired — the "add a card" gallery works end-to-end** (the make-or-break feature).
  `src/editor/cardKinds.ts` (catalogue: Group / List / History chart / Hero / Card, each a valid
  `make(seed)` → renderable BlockConfig) + `src/editor/preview.ts` (`buildPreviewContext` samples
  real, *available* entities) + `store.addBlock(block)`. CategoryView's `+` now opens the
  **CardGallery** (replacing the flat AddCardPanel): five kinds, each a **live preview built from
  the user's real entities** — History chart shows real "Energy · 4.2 kWh" w/ sparkline, Hero
  shows "22°", Card shows "Ecobee". Pick → block added + persisted to the surface override.
  Verified headless (navigate → edit → `+` → gallery 5 kinds/5 live previews → pick Group →
  1→2 blocks, persisted). Next: generalize the gallery to Home/Room, wire the **Inspector**
  (select block/tile → configure name/icon/color/features/actions), drag-resize, undo, and the
  **EntityPicker** for members.

- **Editor subsystem fan-out (7 Opus agents, ~732k tokens)** — the real "own the editor" build
  (option A). Foundation wrote `SPEC_EDITOR.md` + `src/editor/types.ts`: config **v4** via an
  *optional inline* `tiles?: Record<entityId, TileConfig>` on each block (per-leaf
  name/icon/color/features/actions) ⇒ every v3 block is already a valid v4 block (**zero
  migration**); plus the full `EditorActions`/`EditorState` API and clean controlled prop
  contracts. Three components built (isolated in `src/editor/`, all typecheck clean):
  **CardGallery** (add-card catalogue with *live previews from the user's real entities*, via
  the real `BlockBody` renderer), **Inspector** (per-block + per-tile config — the form
  replacement), **EntityPicker** (faceted + virtualized over thousands of entities). Three
  build-plan specs: `SPEC_LAYOUT.md` (12-col grid, drag move/resize, `{surfaces}` unification),
  `SPEC_DETAIL.md` (more-info depth), `SPEC_EXTENSIBILITY.md` (card-type registry +
  framework-for-others + milestone cut). `tsc --noEmit` green. **Not yet wired** — next: the
  editor store (`EditorActions` over `mutateBlocks`), the `CardKind` catalogue, the editor
  host, and the edit → gallery → drop → inspector flow.

- **Framework fixes — editable Home + no horizontal scroll** (refocus on the editor per
  owner feedback). (1) **Horizontal scroll killed** — the living `.simui-ambient-canvas`
  had negative *horizontal* insets (`-16px`) that overflowed the viewport (the side-to-side
  drift); now `inset: -16px 0 auto 0`. Verified `overflowX: 0`. (2) **Home is now editable** —
  it landed read-only (no edit affordance), so it *felt* like nothing was editable. Added the
  same override mechanism categories use: the Edit pencil snapshots `buildHome`'s summary into
  a persisted `home` override (`store.createHomeOverride`/`resetHomeOverride`; `mutateBlocks`
  now handles `route.kind==='home'`) → drag-reorder / resize / remove / add / **Reset to
  preset**. Verified headless (home override persists; block chrome present). **Next editor
  focus:** typed *add-block* (real card-type choice, not entity-only), right-click + long-press
  everywhere, the block/tile **Inspector**, and the `{ surfaces }` unification so every surface
  shares one edit shell.

- **Competitiveness batch — 6-agent fan-out (worktree-isolated, merged onto `design-overhaul`)** —
  one parallel sweep across the backlog; `tsc --noEmit` clean and `npm run build` green (897 kB / 214 kB
  gzip), verified headless (Home + category nav + Living Room + the new light detail Sheet, zero console
  errors). Landed: (1) **Registry curation gate** — `isPrimaryEntity` in `areas.ts` drops diagnostic/
  config/hidden/disabled + id-pattern noise (`browser_mod_*`, `*_signal_strength`/`_linkquality`,
  `update.*`, restart/identify buttons); `RegistryMeta` threaded through `PresetContext`, applied in
  `ofDomain`/`resolveSource`/`generateDefault`/builders, wired into `store`+`CategoryView`; pattern-only
  fallback when no registry; `ListSource.includeNoise` opt-out. (2) **Full `unavailable`/`unknown`
  states** — extended `.is-unavailable` from `EntityRow`/`SliderTile` to `StatusBoardTile`, `MetricSpark`,
  and all domain widgets (dimmed, placeholder, no controls, no fake history). (3) **Per-domain detail
  Sheets** — `DetailContent` now dispatches to `detail/{Light,Climate,Media,Cover,Lock,Sensor}Detail`,
  composed from existing primitives (BloomStudio / ExpandableChart / QuickControls), attribute-table
  fallback. (4) **Six new widgets** — Camera, Weather, Gauge (opt-in), Action (scene/script/button/
  input_button), Fan, Vacuum, registered in `widgets/index.ts`. (5) **Error boundaries + reconnect
  banner** — app-level + per-surface `ErrorBoundary` (compact fallback + `resetKey`); `ConnectionBanner`
  + `useConnectionStatus`. (6) **A11y + reduced-motion** — ARIA/keyboard on the custom controls, a shared
  `--focus-ring`, global `prefers-reduced-motion`. *Domain-correct service calls* were assessed as already
  idiomatic here (per-widget `useCallService` + TileFeatures + the detail Sheets); a stale agent's parallel
  `services.ts`/`useActions` rewrite was **discarded** as an architecture misfit. The **⌘K command palette**
  differentiator was dropped from the docs (Home Assistant already ships a quick-bar). *Process note:* the
  first fan-out's worktrees were created from a stale base (`0d231f4`); three agents self-corrected and were
  merged, four were re-run against the correct tip with a `git reset --hard` safeguard.
- **Competitiveness sprint (in progress, [`ROADMAP.md`](ROADMAP.md))** — (1) **`area_id` + floor fix**:
  the resolver + all preset builders are now entity-keyed (HA doesn't put `area_id` in state — the
  bug); `areas.ts` resolves the floor registry; `GroupBlock` `axis:'floor'` buckets by floor — so on
  a real home, category surfaces group by the real areas/floors. (2) **`unavailable`/`unknown`
  states** dimmed + non-interactive (`EntityRow`, `SliderTile`, `.is-unavailable`). (3) **Editable
  category surfaces** (the headline edit-suite gap): config **v2→v3** (added `overrides`); `mutateBlocks`
  now edits the *current* surface (room or category), not just rooms; a category snapshots into a
  persisted, editable **override** on first Edit (drag-reorder / resize / remove / add — the same
  chrome as a room) with **Reset to preset** to revert. Verified headless end-to-end; `npm run build`
  green. Remaining: registry curation, perf de-jank, faceted picker, full `{surfaces}` model + Inspector
  + add-block flow, preset-gallery picker shell.
- **Phase 2/3 post-review hardening** — fixed the two HIGH findings from the adversarial review:
  (1) **CategoryView remount churn** — the surface `useMemo` keyed on raw `states` rebuilt every
  tick (regenerating block ids → remounting every Chart/MetricSpark); now memoised on the
  entity-set signature (`idSig`) like HomeView. (2) **BloomStudio WS flood** — the colour wheel /
  temp dial fired a service call on every pointer-move; now throttled (~110ms, trailing) via a new
  `useThrottle` hook. Plus the dead **"Details"** context-menu items on `SliderTile` +
  `StatusBoardTile` now open the detail Sheet (`run({action:'more-info'})`) — which is how you
  reach the BloomStudio from those surfaces. Verified headless: sparkline-wall Sensors, status-board
  Security, drag-to-set Lights, the HSV colour-wheel BloomStudio — all render, zero console errors,
  `npm run build` green (~843 kB).
- **Phase 2 + 3 — surfaces become data-viz + signature delight ("C-base + A-touch")** —
  integrated four parallel modules into the shared hubs, build **green**, verified headless
  (zero errors from app code). (1) **Sensors** + **Power** now render a `MetricSpark`
  **sparkline wall** (`axis:'metrics'` on the quantity/circuit groups → `MetricWall` in
  `GroupBlock`): big tabular value, signed coloured delta, area spark with a per-`device_class`
  in-band shade (humidity 40–60 %, CO₂ <1000, battery >20 %), all on the real history API
  (`history/history_during_period`, seeded-mock fallback). Smart-click → full `Chart` in a
  Sheet with a 24h/7d/30d toggle (`ExpandableChart`). (2) **Lights** glance tier is now the
  drag-to-set `SliderTile` wall (`tile:'slider'`) — the tinted fill *is* the brightness; tap
  toggles, icon toggles independently. (3) **Security** is a new preset (`presets/security.ts`,
  registered): a presence-first `StatusBoardTile` board (squircles, unsecured sorted first) +
  the `AttentionStrip` escalation block (new `attention` block type) that mounts only the
  tripped members and collapses to "All N clear", + a conditional strip pill + the alarm hero.
  (4) The static home glow is replaced by the living `AmbientCanvas` (warmth-from-lights +
  cooling wash + sun/time-of-day base), also mounted behind the Lights/Climate surfaces; the
  `dots` wall-tablet mode is available. (5) The detail Sheet now opens the full `BloomStudio`
  (HSV `ColorWheel` / `TempDial`) for light/climate while the compact `QuickControls` stays in
  the context menu; the playing media tile takes an **album-art tint** (`useAlbumTint`). New
  schema: `GroupAxis` gains `'metrics'`, `Block` gains `tile?:'slider'|'statusboard'` +
  `'attention'` type. All worker CSS authored + consolidated into `src/styles.css` (tabular
  numerals, ≤1 category hue per surface, slow tints only — "appears, not animates").
- **Architecture decided** — embedded HA **custom panel** (`panel_custom`), React mounted in
  a web component, inherits HA's auth; appears in every Companion app. Never a separate URL.
- **Phase-1 vertical slice** — Vite + React 19 + TypeScript, `home-assistant-js-websocket`;
  dual-mode Hass source (HA-injected `hass` in-panel / long-lived token in dev) with a mock
  snapshot fallback so the app runs and is browser-testable without a token.
- **Entity widgets** — light, sensor (live sparkline), climate, media_player, cover, lock,
  and a generic fallback. Lucide icons, slim filled sliders, warm/cool/amber state tints.
- **Design language** — Linear / Apple / TradingView, codified in
  [`DESIGN_PRINCIPLES.md`](DESIGN_PRINCIPLES.md) (the binding spec; core rule: *compose,
  don't tile*).
- **Dashboard framework** — first a Lovelace-style card grid (edit mode, dnd-kit
  drag-reorder, add/remove/resize, per-user persistence), then **rebuilt** into the composed
  per-room layout: `hero / group / list / card` blocks on an ambient canvas; per-entity
  subscriptions (`useEntity` / `useAggregate`) to fix lag; per-room auto-generated defaults
  (no entity-dump).
- **Home overview + headers** — home menu of rooms, sticky distinct headers (fixed an
  overlap bug), coloured room icons (fixed a "lost all colour when idle" regression).
- **Distribution** — HACS custom integration (`custom_components/simui/`) with a config
  flow that serves the bundle and auto-registers the panel. CI green (hassfest + HACS); a
  build workflow rebuilds `simui-panel.js` on source change. Public repo:
  [github.com/watari-dev/ha-simui](https://github.com/watari-dev/ha-simui).
- **Navigation model decided** — no in-app sidebar, Home-summary landing, device-type
  categories, native detail sheets, right-click/long-press + smart-click, presets, minimal
  motion. Captured in `DESIGN_PRINCIPLES.md` §14.
- **Design Phase 1** (direction: *C-base + A-touch* per [`DESIGN_DIRECTIONS.md`](DESIGN_DIRECTIONS.md),
  chosen from a 7-agent inspiration brainstorm) — the fork-independent quick-win pass:
  (a) **two-tier colour tokens** — state accents (`--warm/--cool/--up/--down/--warn`) + categorical
  hues (`--violet/--cyan/--pink/--teal/--slate`) + `--hairline`; category launcher recoloured
  (Climate teal, System slate). (b) **Context-menu "infinite box" fixed** — root cause was
  `width:100%` items + `display:contents` groups (ballooned width) *and* `.simui-root min-height:100%`
  leaking onto the portaled menu (ballooned height); now `width:max-content` + capped `max-width`/
  `max-height` + ellipsised labels. (c) **Unified `QuickControls`** (`components/QuickControls.tsx`) —
  one component rendered in the context-menu header AND the Sheet: light → brightness + warm↔cool
  colour-temp ribbon + colour swatches; climate/cover/fan/lock/alarm → the `TileFeatures` strip.
  Fixes light colour control (I3) + climate setpoint/modes (I4) together. (d) **Climate zones
  controllable** — added a `climate` branch to `EntityRow` (inline setpoint stepper). (e) **Power
  "black line" fixed** — `Chart.tsx` now resolves `var(--token)` series colours to computed hex
  before the lightweight-charts canvas (it can't parse CSS vars); the load line renders amber (I7).
  (f) **De-border first cut** — dropped the default `1px solid --faint` on tiles/surfaces for soft
  elevation + a hairline highlight (I1). Verified headless: bounded menu with colour swatches,
  climate stepper, amber power line, zero console errors. `npm run build` green (~783 kB).
- **Home redesign (de-boxed, integrated)** — reworked the Home summary to the layered "place"
  the principles call for (DESIGN_PRINCIPLES §1/§3/§4): a state-reactive **ambient canvas**
  glow; the "Everything" launcher is now a borderless **icon rail** with per-category identity
  hues (`violet`/`cyan`/`pink` tokens added); security is a borderless hairline-divided list; the
  summary is a full-width vertical feed, not a grid of panels; room cards are borderless with a
  warm **corner-glow** when lit (replacing the flat brown wash). Fixed a contrast bug — lit
  room-card names were inheriting the `<button>` UA black; now explicitly `var(--text)`. Also
  **hardened the Chart**: wrapped in an `ErrorBoundary` + try/catch guards on the resize/teardown/
  data effects so the lightweight-charts imperative lifecycle can't blank a surface or log on a
  StrictMode/resize race (verified clean console on a fresh server). `npm run build` green
  (~776 kB); verified at desktop + mobile widths.
- **Framework build-out (full)** — the Tile/Block contract, navigation shell, and preset gallery,
  built via a parallel multi-agent workflow (foundation → 7 parallel module workers → serial
  integration → build-gate + adversarial review) then hardened by hand. Shipped: the **Tile
  contract** (`EntityTile`/`LauncherTile` + `TileFeatures` strip + `runAction` split tap/icon +
  `orientation`/`color` tokens, `tileContract.ts`); **blocks** gained `axis` (sub-group by area/
  real `device_class`), `source` (dynamic `ListBlock` via `resolveSource`), `visibleWhen`
  (conditional), and `chart` (`ChartBlock`); a **lightweight-charts** history card (`Chart` +
  `hass/history.ts`) with the required colorized header readout, dual-axis, and threshold bands;
  the **StatusStrip** chrome (count/nav/action/conditional/status/select pills); a native detail
  **Sheet** (`Sheet` + `DetailContent`) opened on tap; **ContextMenu** (right-click/long-press);
  the **area registry** resolver (`areas.ts`, memoized per source) feeding `generateDefault`; and
  a **preset gallery** of pure builders (`presets/`: home/lights/climate/sensors/power/server).
  Routes extended to `category` (`CategoryView`); HomeView now leads with the StatusStrip +
  category launcher. **`npm run build` green** (dist/simui-panel.js ~772 kB). Verified end-to-end
  in a headless browser: Home summary, category surfaces, the temperature trend chart, and the
  detail Sheet all render with zero console errors. Reviewer findings fixed (area-fetch memo,
  NavPill/SelectControl wiring, real device_class grouping, chart header theme color, threshold
  lines). Remaining polish tracked in TODO (media/security/scenes builders, preset picker UI,
  smart-click chart expand, group-entity preference).
- **Tile/Block primitives — increment 1** — shipped the `stateContent` **recency line**
  (`StateLine` + `relativeTime`: "Unlocked · 2h ago" on lock / binary-sensor / toggle tiles +
  rows — the #1 borrowed pattern), and moved placement onto the block: `Block.size:1|2` →
  `span:1|2|'full'` with a 1×→2×→Full cycle control and a load-time `size`→`span` migration.
  Typecheck clean; verified headless (recency renders; span cycles, applies, and persists as
  `span` with no `size`; no console/server errors). Next: tile `features` strip, split
  tap/icon actions, action-only launcher tile ([`FRAMEWORK.md`](FRAMEWORK.md) §1).
- **Real HA connected + dashboard reverse-engineered** — `simbas-home-assistant` MCP ("Simba's
  Home", ~6,257 entities, 3 floors, 20 areas, HA 2026.6.3). A 9-analyst pass over all 23
  dashboard views + cross-cutting DNA (tiles / layout / charts) drove the framework direction,
  captured in three new docs: [`INSPIRATION.md`](INSPIRATION.md) (evidence + generalizable
  patterns), [`FRAMEWORK.md`](FRAMEWORK.md) (Tile / Block / Chart / StatusStrip contracts),
  [`PRESETS.md`](PRESETS.md) (Home + category + Server/Homelab specs). Decisions: inspiration ≠
  replication; block owns layout / tile owns entity; Energy + Power merged; Server preset =
  native controls only (no iframes).

- **Editor loop activated (the framework's make-or-break)** — the decoupled editor store
  (`src/editor/store.tsx`, `EditorProvider`) is now wired live on category surfaces. Entering
  edit snapshots the live preset into an editable **override**, seeds an optimistic working copy
  (`dirtyBlocks`), and commits back through the dashboard store's new atomic `mutateBlocks` seam
  (debounced 350ms). `CategoryView` + `BlockChrome` drive the store: select a block (capture-layer
  tap → selection ring + **Inspector**), resize via the span control (`resizeBlock`), drag-reorder
  (`moveBlock`), add via the **CardGallery** (live `BlockBody` previews of each kind → insert →
  auto-select → inspector), and **⌘Z undo**. `EditorOverlay` hosts the gallery/inspector/picker
  per `editor.panel`. Fixed the `active`↔`editing` mirror (external nav now tears the editor down,
  not fights it) and the gallery's nested-`<button>` hydration bug (cards are focusable
  `role=button` divs). **Verified end-to-end in-browser**: enter → select → inspector → resize →
  add → undo → exit, console clean. Next: generalize the loop to Room/Home surfaces + integrate
  the wave-3 modules (more card kinds, richer inspector, action editor, drag-resize handles,
  template gallery, faceted picker, editor chrome).

- **Editor wave-3 integrated (the gallery/inspector/templates suite)** — a 7-builder
  fan-out + synthesizer, integrated and verified end-to-end in-browser:
  - **Card-kind gallery → 23 kinds** (was 5): Scenes, Sliders, Metrics wall, Sensors-by-type,
    Security board, Climate, Media, Camera, State hero, Status strip, Glance, What's-on,
    Energy+Power, Week trend + display-only Stat / Gauge / Section / Divider (rendered by a new
    `StatBlock` via the `options.statVariant` seam — no new `BlockType`).
  - **Inspector enrichment** — composes `BlockSettings` (title/width/axis), `TileSettings`
    (name/icon/accent/size/state-line/features/actions), `ChartEditor`, `EntityMembers`,
    `ConditionEditor` (the new **Visibility** section) + the richer **ActionEditor**.
  - **Editor chrome** — a floating `EditorToolbar` (undo/redo/add/save-dot/done), a one-time
    `OnboardingHint`, and an `EmptyState` ("Start from a template" / "Add a card").
  - **Page templates** — a `TemplateGallery` of 6 role/density variants (Minimal / Standard
    home / Family hub / Wall tablet / Power user / By category), each a live full-page preview
    built from the user's real entities; picking one snapshots it onto the surface.
  - **Drag-to-resize** — `ResizeHandle` wired into the block edit chrome (snaps 1/2/full).
  - Gotchas fixed: the `inspector/` dir collided with `Inspector.tsx` on macOS (case-insensitive)
    and broke Vite dev resolution → renamed to `inspectors/`; gallery/template cards must be
    `role=button` divs (their live `BlockBody` previews contain `<button>`s — invalid nesting).
  - **Deferred follow-ups** (built + type-clean on disk, not yet wired): the polished
    area-grouped **EntityPicker** rewrite (current faceted/virtualized picker stays); **action
    execution** (the ActionEditor authors `TileConfig.actions`, but running them needs
    `useTileAction` threaded through the real leaves — domain widgets + `EntityRow` + block
    renderers — since `EntityTile` is unused); generalizing the editor loop to **Room/Home**
    surfaces (today only Category surfaces drive the editor store).

- **Editor wave-3 follow-ups integrated (3-way parallel worktree fan-out)** — the deferred items
  shipped via three isolated worktree builders (disjoint files → clean cherry-pick), verified
  in-browser:
  - **Tap-actions execute** — `useTileAction` (`src/runtime/actions.ts`) threaded through
    `EntityRow`; `GroupBlock`/`ListBlock` pass `block.tiles?.[id]?.actions`. A leaf's handler is
    overridden ONLY when its slot is explicitly set, so all domain defaults are byte-for-byte
    preserved (no-regress verified: a default tap still opens the Sheet).
  - **Area-grouped EntityPicker** — composes the `picker/` module (SearchBox / FacetBar /
    AreaGroupedList over the area-aware `EntityIndex`); domain + area facets with live counts,
    per-area "All" select, EmptyState. `areas`/`registry` threaded `EditorOverlay → EntityPicker`.
  - **All three surfaces editable** — Home / Room / Category now drive the editor store
    identically; `EditorOverlay` hoisted to a single mount in `DashboardView`; rooms enter with no
    snapshot, home via `createHomeOverride`. Removed the now-unused `AddCardPanel`.
  - Gotcha (logged to memory): the first fan-out's worktrees branched from a STALE pre-wave-3
    commit — fixed by forcing `git reset --hard <HEAD>` in each agent's setup before building.
  - tsc + panel build + runtime console all clean on the combined main.

- **Actions everywhere + per-tile authoring + surface unification (7-agent fan-out)** — closed out
  the editor's remaining gaps:
  - **Authored tap-actions execute on every leaf** — `WidgetProps.actions` + a `useTapHandler`
    runtime helper let all 19 domain widgets (via `CardBlock`) honor an authored `tap`; the special
    Group leaves (`SliderTile`/`StatusBoardTile`) + `HeroBlock` too; rows were already wired. Every
    leaf preserves its domain default unless a slot is explicitly set (no-regress).
  - **Per-tile config is reachable** — the missing link: `EntityMembers` rows now drill into
    `editor.selectTile` → `TileSettings` (name/icon/colour/state-line/features/**ActionEditor**) with
    a back-to-card affordance. Without this the whole per-tile panel was unreachable.
  - **End-to-end verified in-browser**: drill into a light tile → author `tap → navigate → home` →
    exit → tapping the light navigates home (runs the authored action, NOT the default toggle/sheet).
  - **Surface unification** — extracted a shared `useEditableSurface` hook; Home/Room/Category now
    share one edit contract (the per-view duplication is gone), behavior-preserving.
  - 9 commits cherry-picked from isolated worktrees (foundation → 7 parallel builders → tile-select);
    tsc + panel build + console all clean. Stale-worktree-base trap hit again → mitigated by forcing
    `git reset --hard <SHA>` in every agent's setup ([[workflow-worktree-stale-base]]).

- **Live-tick de-jank (Tier A scale)** — the embedded panel + dev socket replace the whole
  `states` object every tick, so `useAllStates` re-rendered HomeView/CategoryView/EditorOverlay on
  EVERY state change anywhere — each recomputing an `O(M·logM)` `Object.keys().sort().join()` idSig
  (and EditorOverlay rebuilt the whole entity index per tick). `HassProvider` now wraps the source
  with a memoized **entity-keys version** (`useEntityKeys` — bumps only when the key SET changes,
  computed once per tick); the three surface builders key their memos on it and read the live map
  lazily via `getStates()`. `useEntity` stays surgical. **Verified in-browser**: 5 light toggles
  (value ticks) → `CategoryView` re-renders **0×** (was 1× + a 6k-key sort each); editor/picker
  intact; console clean.
- **Input-scoped `useAggregate` (finishes the de-jank)** — `useAggregate(compute, deps?)` skips the
  compute on a tick where no dep entity changed identity (returns the cached value). Applied to the
  computes costing more than O(deps): the **O(all-entities) `resolveSource`** scans (status-strip
  count pills + dynamic `ListBlock`s) — scoped to the source's candidate domains via
  `sourceDomains`/`keysOfDomains` (recomputed only on set-change), so they re-scan only when a
  relevant-domain entity changed; and the string-builders `summarizeRoom` + the home `HouseGlance` +
  `StatusBoardTile` — scoped to their entity lists. Trivial `.some()`/`.filter()` aggregates + the
  time-dependent `AmbientCanvas` `packState` keep computing every tick (skip-check would cost the
  same, or a non-entity time input can't be tracked). Verified: room glance `23° · 1 light on` →
  `23°` updates correctly on toggle (deps are a correct superset — no stale values).

- **Shell: adaptive + URL persistence + distribution + real-home validation** — picked up the
  three "bigger directions":
  - **URL/route persistence** — the route now lives in the location **hash** (`#/category/lights`,
    `#/room/<id>`): Back / forward / reload restore the view. Self-contained — rides on the HA
    panel's `/simui` URL without touching HA's router, and works identically in standalone dev.
    `routeToPath` ↔ `parseRoute`; `goTo` writes the hash, a `hashchange` listener is the sole
    external driver (functional updater dedupes the echo). Verified: nav updates the hash, Back
    returns home, reload of `#/category/sensors` restores Sensors.
  - **Adaptive shell** — the panel **consumes HA's `narrow`** (was discarded → `data-ha-narrow` on
    the root, forces the compact layout when the panel is narrow but the viewport is wider). The
    surfaces (auto-fill grids), editor panels (332px rail ↔ bottom-sheet), and detail Sheet were
    already responsive; added phone (≤480 / narrow) two-up room cards. Verified 6/3/2-col rooms
    across desktop/tablet/phone.
  - **Release hygiene** (fan-out agent) — LICENSE (MIT), README rewrite (framework + editor +
    presets, honest "working prototype" status), CHANGELOG `[Unreleased]`, `package.json` license,
    version sync. Owner to confirm MIT + cut a tagged 0.3.0 release.
  - **Real-home validation** (read-only via the `simbas-home-assistant` MCP) — inspected the actual
    home: **6,257 entities / 39 domains / 20 areas / 3 floors**, ~36% `unavailable`, and heavy
    diagnostic noise (3,160 sensors incl. 1,511 dead; 222 `update.*`; 359 maintenance buttons;
    Shelly fault diagnostics; `browser_mod_*` "Screen" lights; 335 `device_tracker` vs **2** people).
    Findings: the architecture holds — the registry curation gate (entity_category/hidden/disabled)
    filters the bulk, no preset/auto-gen scans `device_tracker` (it's only a pickable "Trackers"
    facet), the floor→area hierarchy is clean for `axis:'floor'`, and the just-shipped live-tick
    perf work is *confirmed essential* at this scale. Fix applied: extended the dev/no-registry
    pattern backstop with the Shelly fault suffixes + power-cycle/factory-reset/safe-mode maintenance
    words. Noted (not blocking): room-glance temperature assumes a per-room `climate` hero, but this
    home uses floor/zone climate — rooms could read a temp *sensor* instead (future enhancement).

## Notes / gotchas

- **Two HA MCPs:** `simbas-home-assistant` = the owner's real home (use this);
  `Home_Assistant` = the old demo sandbox (ignore). See AGENTS.md → How this connects to HA.
- esbuild pinned to ≥0.28.1 (dev-only advisory); Vite dev transform target pinned to
  `esnext` so it prebundles dnd-kit / lucide-react.
- Verified end-to-end in a headless browser (render, edit, drag-reorder, add/remove/resize,
  toggle, persistence, room switching).
