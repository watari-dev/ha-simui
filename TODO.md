# simUI — TODO

What's next, roughly prioritised. Pairs with [PROGRESS.md](PROGRESS.md) (what's done) and
[AGENTS.md](AGENTS.md) (vision). Check items off and move them to PROGRESS as they ship.

## Blockers

- None. ~~Connect the real HA~~ — done: `simbas-home-assistant` is the owner's real home
  ("Simba's Home"); its dashboard is analyzed in [`INSPIRATION.md`](INSPIRATION.md).

## First sprint — Lovelace competitiveness ([`ROADMAP.md`](ROADMAP.md), "the road to competitiveness")

*Goal: stop looking broken on the real home + make the 2nd nav axis editable.*

- [x] **Fix `area_id` + floor axis** — the resolver/builders are now entity-keyed (HA doesn't put
      `area_id` in state); `areas.ts` resolves the floor registry too; `GroupBlock` `axis:'floor'`
      buckets by floor. Category surfaces now group by the real 20 areas / 3 floors on the real home.
- [ ] **Registry curation gate** — exclude diagnostic/config (`entity_category`), hidden/disabled,
      and noise (`browser_mod_*`, `*_signal_strength`, `update.*`, restart buttons) from every scan.
      (Needs registry flags threaded through `PresetContext`, like the AreaMap.)
- [~] **`unavailable`/`unknown` states** — dimmed + non-interactive in `EntityRow` (groups/lists) +
      `SliderTile`; CSS `.is-unavailable`. TODO: extend to `StatusBoardTile`/`MetricSpark`/domain widgets.
- [ ] **Profile + de-jank the live tick** — kill the per-render `idSig` string + O(all-entities) recompute.
- [ ] **Faceted, virtualized entity picker** (search + domain/area/label facets + multi-select) — the
      shared primitive the editor + ⌘K both need.
- [ ] **Unify surfaces under one editable model** (`{ surfaces }`, v2→v3 migration; move mutation off
      the room gate; shared `SurfaceCanvas`) — the keystone.
- [ ] **First payoff: editable category surfaces + preset-gallery picker shell** (live previews).

## Design polish ([`DESIGN_DIRECTIONS.md`](DESIGN_DIRECTIONS.md) — direction: C-base + A-touch)

- [x] **Phase 1 (quick wins)** — two-tier colour tokens · context-menu infinite-box fix · unified
      `QuickControls` (light colour/temp + climate setpoint/modes, in menu + Sheet) · climate-zone
      stepper · power chart `var()`-colour fix · de-border first cut.
- [x] **Phase 2 (surfaces → data-viz, right-sized)** — `MetricSpark` sparkline wall for Sensors
      (grouped by `device_class`, in-band shading) + Power circuits, on the real **history API**
      (`history/history_during_period`, seeded-mock fallback) · smart-click → full `Chart` in a
      Sheet w/ 24h/7d/30d toggle (`ExpandableChart`) · Security **status board** (`StatusBoardTile`
      + `AttentionStrip` escalation, `presets/security.ts`) · drag-to-set `SliderTile` (*the tile is
      the slider*) on the Lights surface · the **living colour field** `AmbientCanvas` (Home +
      Lights/Climate surfaces). TODO (polish): crosshair scrub across spark↔full chart; range
      toggle on the always-on Power flow chart; sparkline-wall history batching at scale.
- [x] **Phase 3 (signature delight)** — long-press **bloom** quick-control studio (`BloomStudio`:
      HSV `ColorWheel` / `TempDial`) in the detail Sheet for light/climate · album-art-aware media
      tint (`useAlbumTint`) on the playing media tile · dot-matrix `AmbientCanvas` mode available
      (wall-tablet). TODO: Powerwall **flow-node** (gate on real solar/battery); whisper album tint
      into the canvas; wire the wall-tablet preset that uses `mode="dots"`.

## Framework primitives (the foundation — do these first)

The shell + presets are now specified ([`FRAMEWORK.md`](FRAMEWORK.md) / [`PRESETS.md`](PRESETS.md));
harden the primitives they assume:

- [x] **Tile contract** — `stateContent` recency (`StateLine`), `features` strip (`TileFeatures`),
      split tap/icon actions (`runAction`), `orientation` (vertical mini-tile), `color` token,
      and the action-only **launcher** (`EntityTile` + `LauncherTile`). TODO (polish): adopt the
      features strip across *all* control widgets; full 1..12 grid.
- [x] **Block owns placement + type-specific fields** — `span:1|2|'full'`; `axis` (GroupBlock
      sub-grouping, now by real `device_class`), `source` (dynamic ListBlock), `visibleWhen`
      (conditional), `chart` (ChartBlock). TODO (polish): `rows` for charts.
- [x] **ListBlock `source`** — dynamic matchers (include/exclude, `hideWhenEmpty`) resolved via
      `useAggregate` (`presets/index.ts` `resolveSource`).
- [x] **StatusStrip** — count / nav / action / conditional / status / select pills in top chrome
      (`StatusStrip.tsx` + `SurfaceStrip.tsx`).
- [x] **Real area registry** (`areas.ts`, memoized per source) feeds `generateDefault`; heuristic
      fallback in dev. TODO (polish): prefer group/aggregate entities in the generator.

## Navigation shell — built (polish remaining)

- [x] **Home summary** — StatusStrip (count/conditional pills) + "Everything" category launcher
      + live-status/security blocks, above the preserved room menu (`HomeView`).
- [x] **`Sheet` primitive** — tap a tile/row → `role=dialog` bottom sheet (phone) / popover
      (desktop) with the domain widget + a tabular attribute readout (`Sheet` + `DetailContent`).
- [x] **Category views** — `category/<id>` route → `CategoryView` composes a cross-room surface
      from the preset builders (Lights/Climate/Sensors/Power/Server). TODO: dedicated
      **media / security / scenes** builders (currently a generic fallback surface).
- [x] **Right-click / long-press context menus** — `ContextMenu` + `useContextMenu` on rows/tiles
      (toggle, lock/unlock, Details→Sheet). TODO: richer per-type actions (colour/scene, range).
- [x] **Charts** — `lightweight-charts` `ChartBlock` with the required header readout, area/line,
      dual-axis, threshold bands. TODO: **smart-click expand** (sparkline → full chart, range picker).
- [x] **Presets** — pure builders + registry (`presets/`). TODO: the **gallery picker UI**
      (onboarding = choose a preset → lay out real devices → edit) + Minimal/Family-hub/Wall-tablet.

## Backlog

- [ ] Prefer **group/aggregate entities** in the auto-generator (intent-level controls, not bulbs).
- [ ] Richer in-UI composition — build groups/lists by hand, not just add-as-card.
- [ ] **Reduce motion** to near-zero across the UI; update the motion principle accordingly.
- [ ] Scenes & favorites as first-class; a **command palette (⌘K)** to jump/control anything.
- [ ] More widgets — vacuum, camera, fan speed, alarm panel, valve.
- [ ] Optional: publish select widgets as standalone Lovelace cards.

## Open questions

- *Resolved:* Energy + Power **merged** into one surface; first presets decided (Home summary ·
  Lights / Climate / Sensors / Power · Server) — see [`PRESETS.md`](PRESETS.md).
- Which *role/density* preset variants ship next (Minimal / Family hub / Wall tablet…)?
