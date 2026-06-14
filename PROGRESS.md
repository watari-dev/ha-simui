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

## Notes / gotchas

- **Two HA MCPs:** `simbas-home-assistant` = the owner's real home (use this);
  `Home_Assistant` = the old demo sandbox (ignore). See AGENTS.md → How this connects to HA.
- esbuild pinned to ≥0.28.1 (dev-only advisory); Vite dev transform target pinned to
  `esnext` so it prebundles dnd-kit / lucide-react.
- Verified end-to-end in a headless browser (render, edit, drag-reorder, add/remove/resize,
  toggle, persistence, room switching).
