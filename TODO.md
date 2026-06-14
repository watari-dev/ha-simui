# simUI — TODO

The full backlog. Pairs with [PROGRESS.md](PROGRESS.md) (what shipped), [ROADMAP.md](ROADMAP.md)
(the competitiveness plan + rationale), [DESIGN_DIRECTIONS.md](DESIGN_DIRECTIONS.md) (the visual
direction), and [AGENTS.md](AGENTS.md) (vision). `[x]` done · `[~]` partial · `[ ]` to do.

**Status:** the engine + navigation shell + design (Phases 1–3) are built and on the
`design-overhaul` branch / [PR #1](https://github.com/watari-dev/ha-simui/pull/1). The
**competitiveness sprint** has landed a large batch: real-area grouping, the **registry curation
gate**, full **unavailable/unknown** states, **per-domain detail Sheets**, six new **widgets**
(camera/weather/gauge/action/fan/vacuum), domain-correct service calls, **error boundaries +
reconnect banner**, and an **a11y + reduced-motion** pass. Next: the editor (Inspector / add-block /
gallery picker), the `{ surfaces }` unification, live-tick profiling, multi-dashboard, and release hygiene.

---

## ⭐ Minimum Lovelace competitiveness — the milestone

*A stranger can install simUI, point it at their home, and replace their Lovelace dashboard.*
The must-have checklist (ROADMAP §2), by tier.

### Tier A — correctness + scale on a real home (stop looking broken)
- [x] **`area_id` + floor axis** — entity-keyed resolver + builders; floor registry; `axis:'floor'`.
- [x] **Registry curation gate** — `isPrimaryEntity`/`isPrimary` in `areas.ts` excludes diagnostic/
      config (`entity_category`), hidden/disabled, and id-pattern noise (`browser_mod_*`,
      `*_signal_strength`/`*_linkquality`, `update.*`, restart/identify/update buttons). `RegistryMeta`
      fetched via the entity registry, threaded through `PresetContext`, applied in `ofDomain`/
      `resolveSource` + `generateDefault` + the direct builder scans; wired into `store`+`CategoryView`.
      Graceful pattern-only fallback when no registry (dev/mock). `ListSource.includeNoise` opt-out.
- [x] **`unavailable`/`unknown` states** — `.is-unavailable` now applied across `EntityRow`,
      `SliderTile`, `StatusBoardTile`, `MetricSpark`, and every domain widget: dimmed, placeholder
      (`—`/`Unavailable`), no controls, no fabricated sparkline/history while dead.
- [ ] **Profile + de-jank the live tick** — measure render counts at scale; kill the per-render
      `idSig` string join and O(all-entities) aggregate recompute (memoise the entity-key set; only
      recompute aggregates whose inputs changed). Validate 60fps on ~6k entities.
- [ ] **Faceted, virtualized entity picker** — replace `AddCardPanel`: search + domain/area/label
      facets, fuzzy match, multi-select, virtualization, group-entity-preferred. The shared index
      reused by the Inspector, add-block flow, and list-source authoring.

### Tier B — the editor + preset gallery (the flagged edit-suite gap)
*Largely SHIPPED via the decoupled editor store (`src/editor/store.tsx`) + wave-3 fan-out.*
- [~] **Editable surfaces** — category surfaces are editable via the editor store: enter →
      snapshot to **override** → optimistic `dirtyBlocks` → debounced commit through the atomic
      `mutateBlocks` seam; drag/resize/remove/add + Reset-to-preset. TODO: generalize the loop to
      **Room/Home** surfaces (they still run the legacy dashboard-editing path + don't mount
      `EditorOverlay`); then the **`{ surfaces }` unification** + a shared `SurfaceCanvas`.
- [x] **Add-block flow** — `CardGallery` (live `BlockBody` previews) with **23 kinds**; pick →
      insert → auto-select → inspector. (`ResizeHandle` + 1×/2×/Full cycle for sizing.)
- [x] **Block / Tile Inspector (no YAML)** — `BlockSettings` (title/width/axis) · `EntityMembers`
      (list + add/remove) · `ChartEditor` (series/window/thresholds) · `ConditionEditor`
      (visibility) · `TileSettings` (name / lucide icon / colour / size / state-line / features /
      `ActionEditor`).
- [x] **Undo/redo + duplicate** — history ring (⌘Z / ⇧⌘Z + toolbar), duplicate-block, copy/paste.
- [x] **Persisted overrides** for generated surfaces (survive reload; reconcilable with the preset).
- [x] **Preset-gallery picker + first-run onboarding** — `TemplateGallery`: 6 role/density page
      templates with **live previews from the user's own entities**; picking snapshots onto the
      surface. `OnboardingHint` one-time coachmark + `EmptyState`.

#### Tier B follow-ups (built + type-clean on disk, NOT yet wired)
- [ ] **Action execution** — the `ActionEditor` authors `TileConfig.actions` (persisted) but they
      don't run yet. Thread `useTileAction` (`src/runtime/actions.ts`) through the real render
      leaves — the domain widgets (`widgetFor`) + `EntityRow` + the block renderers passing
      `block.tiles?.[id]?.actions` / `block.actions` down. (`EntityTile` is currently unused.)
- [ ] **Area-grouped EntityPicker** — wire the polished `src/editor/picker/` (SearchBox / FacetBar /
      AreaGroupedList + `rowsFromIndex`) into `EntityPicker.tsx`. Needs the area-aware `EntityIndex`
      threaded in (pass `areas`/`registry` or the built `index` down). Current picker is already
      faceted + virtualized + fuzzy — this adds per-area grouping + select-all-area.

### Tier C — structure + widget parity
- [ ] **Multi-dashboard / named views** — evolve the model to multiple named dashboards/views with
      a quiet top-chrome switcher (not a sidebar); default-dashboard selection; sidebar panel
      registration. (Depends on the `{ surfaces }` model.)
- [~] **Missing widgets** (compose, don't port): **camera** ✓ · **weather** ✓ · **gauge** ✓ (opt-in)
      · generalized **action/button tile** ✓ (scene/script/button/input_button) · **fan** ✓ /
      **vacuum** ✓. TODO: **camera wall** (the sanctioned tiling exception) · **editable helpers**
      (number/select/text/datetime) · **alarm-panel** control on-surface · **valve** · **person/
      device_tracker** presence · **calendar** · **markdown** · picture-glance.
- [~] **Real per-domain detail Sheets** — custom more-info tiers shipped for light / climate /
      media_player / cover / lock / sensor (+ binary_sensor), composed from existing primitives
      (`BloomStudio`/`ExpandableChart`/…), with attribute-table fallback. TODO: fan / vacuum / alarm.
- [x] **Domain-correct service calls** — covered idiomatically: widgets call `useCallService`
      directly (cover position/open/stop, media transport/volume/source, lock, fan %), `TileFeatures`/
      `QuickControls` add climate/cover/fan/lock/alarm, and the detail Sheets do the deep per-domain
      controls. (number/select/helper *set* remains under "editable helpers" above.)

### Tier D — ship-readiness (a stranger can install + trust it)
- [x] **Error boundaries** — app-level + per-surface (`HomeView`/`RoomView`/Sheet) `ErrorBoundary`
      with compact inline fallback + route-derived `resetKey`; `ConnectionBanner` + `useConnectionStatus`
      reconnect banner (auto-hides when live, `'live'` in dev/mock). One bad widget no longer blanks the panel.
- [ ] **Adaptive shell** — consume HA's `narrow` (currently discarded); reflow nav phone/tablet/desktop.
- [ ] **URL / route persistence** — Back + reload restore the view (precondition for kiosk deep-links).
- [ ] **Release hygiene** — LICENSE, version sync, tagged release + CHANGELOG, README rewrite +
      screenshots (gates any non-owner install).
- [ ] **Settings / options flow** + a reset-layout escape hatch.
- [~] **Accessibility pass** — done: ARIA + keyboard on the custom controls (slider/dial roles +
      value/arrow-keys, `role=dialog`+focus-trap+Esc on Sheet, `role=menu`+arrow-nav on ContextMenu,
      `SliderTile` keyboard nudge, Chart labelled/canvas `aria-hidden`), a shared `--focus-ring`
      `:focus-visible` token, and a global `prefers-reduced-motion` block. TODO: contrast audit +
      full screen-reader pass.

---

## ✨ Differentiators — keep the edge (why switch, not just match)
- [ ] **Live-preview preset gallery** — every card is *your real home, composed* (this is Tier B's
      gallery — protect its priority; it's the onboarding *and* the differentiator).
- [~] **Whole-home glance digest** — the status strip exists; make the counts *actions*
      ("3 lights on → turn all off"), cross-room, conditional-quiet.
- [ ] **First-class wall-tablet / kiosk mode** — chrome-off, Screen Wake Lock, idle ambient
      screensaver (the built `mode="dots"` canvas), auto-return-home, per-device profile.
- [ ] **Powerwall-style energy flow object** — native, on the TradingView-grade data layer; gate on
      real solar/battery detection.
- [ ] **"Reality Doctor" health surface** — turn full-registry awareness into "which integrations
      are down / stale / orphaned / low-battery" — makes a giant install legible. (Showcase, later.)

---

## 🎨 Design polish — Phase 1–3 leftovers ([`DESIGN_DIRECTIONS.md`](DESIGN_DIRECTIONS.md))
- [ ] Shared **crosshair scrub** across the glance sparkline ↔ the full chart.
- [ ] **Range toggle (24h/7d/30d)** on the always-on Power "flow" chart (only in the expand Sheet today).
- [ ] **Sparkline-wall history batching** — one shared history provider for walls with many cells
      (today: one WS request per cell).
- [ ] Whisper the **album-art tint** into the `AmbientCanvas` (the tile tint is done).
- [ ] Wire a **wall-tablet preset** that uses the dot-matrix `mode="dots"` canvas.
- [ ] Adopt the `TileFeatures` strip across *all* control widgets; full **1..12 grid** + `rows`.
- [ ] Prefer **group/aggregate entities** in the auto-generator (intent-level controls, not bulbs).
- [ ] Dedicated **media / scenes** category builders (security shipped; media/scenes still fallback).

---

## Open questions
- Surface-personality already chosen: **C-base + A-touch** (terminal precision + Apple touch +
  dot-matrix flourish) — see [`DESIGN_DIRECTIONS.md`](DESIGN_DIRECTIONS.md).
- Which *role/density* preset variants ship first (Minimal / Family hub / Wall tablet)?
- Multi-dashboard model shape — extend `DashboardConfig` to `{ dashboards: [...] }` or keep one
  dashboard with named views? (Decide before the `{ surfaces }` refactor.)

---

## ✅ Built (done) — reference
- **Framework primitives** — Tile contract (`stateContent`/`features`/split actions/`orientation`/
  `color`/launcher), Block (`span`/`axis`/`source`/`visibleWhen`/`chart`/`tile`), ListBlock dynamic
  `source`, StatusStrip, area-registry resolver. (`FRAMEWORK.md`)
- **Navigation shell** — Home summary, `Sheet`, category route + `CategoryView`, `ContextMenu`,
  `lightweight-charts` `ChartBlock`, preset builders (home/lights/climate/sensors/power/security/server).
- **Design Phase 1** — colour tokens, context-menu fix, unified `QuickControls`, climate-zone
  stepper, power-chart `var()`-colour fix, de-border.
- **Design Phase 2** — `MetricSpark` sparkline walls (real history API) + `ExpandableChart`, Security
  status board + `AttentionStrip`, drag-to-set `SliderTile`, living `AmbientCanvas`.
- **Design Phase 3** — `BloomStudio` (`ColorWheel` + `TempDial`), album-art media tint, dot-matrix canvas.
- **Competitiveness sprint** — `area_id`+floor fix, unavailable states, editable category surfaces (overrides, v2→v3).
- **Competitiveness batch** — registry curation gate (`isPrimaryEntity`), full unavailable/unknown states,
  per-domain detail Sheets (`detail/*`), six widgets (camera/weather/gauge/action/fan/vacuum), error
  boundaries + `ConnectionBanner`, a11y + reduced-motion. (Built via a worktree-isolated agent fan-out.)
- **Docs** — INSPIRATION / FRAMEWORK / PRESETS / DESIGN_DIRECTIONS / ROADMAP; AGENTS/DESIGN_PRINCIPLES reframed.
