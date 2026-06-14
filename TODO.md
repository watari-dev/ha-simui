# simUI — TODO

The full backlog. Pairs with [PROGRESS.md](PROGRESS.md) (what shipped), [ROADMAP.md](ROADMAP.md)
(the competitiveness plan + rationale), [DESIGN_DIRECTIONS.md](DESIGN_DIRECTIONS.md) (the visual
direction), and [AGENTS.md](AGENTS.md) (vision). `[x]` done · `[~]` partial · `[ ]` to do.

**Status:** the engine + navigation shell + design (Phases 1–3) are built and on the
`design-overhaul` branch / [PR #1](https://github.com/watari-dev/ha-simui/pull/1). The
**competitiveness sprint** is underway: real-area grouping, unavailable states, and editable
category surfaces are in; the editor (Inspector / add-block / gallery picker), widget parity,
multi-dashboard, and ship-readiness are next.

---

## ⭐ Minimum Lovelace competitiveness — the milestone

*A stranger can install simUI, point it at their home, and replace their Lovelace dashboard.*
The must-have checklist (ROADMAP §2), by tier.

### Tier A — correctness + scale on a real home (stop looking broken)
- [x] **`area_id` + floor axis** — entity-keyed resolver + builders; floor registry; `axis:'floor'`.
- [ ] **Registry curation gate** — exclude diagnostic/config (`entity_category`), hidden/disabled,
      and noise (`browser_mod_*`, `*_signal_strength`, `update.*`, restart/identify buttons) from
      every entity scan. Needs registry flags threaded through `PresetContext` (like the AreaMap):
      extend `areas.ts` to also return `entity_category`/`hidden` per entity, add `isPrimaryEntity`,
      apply in the shared scan helpers (`ofDomain`/`resolveSource`/builders).
- [~] **`unavailable`/`unknown` states** — done in `EntityRow` + `SliderTile` (`.is-unavailable`).
      TODO: extend to `StatusBoardTile`, `MetricSpark`, and the domain widgets.
- [ ] **Profile + de-jank the live tick** — measure render counts at scale; kill the per-render
      `idSig` string join and O(all-entities) aggregate recompute (memoise the entity-key set; only
      recompute aggregates whose inputs changed). Validate 60fps on ~6k entities.
- [ ] **Faceted, virtualized entity picker** — replace `AddCardPanel`: search + domain/area/label
      facets, fuzzy match, multi-select, virtualization, group-entity-preferred. The shared index
      reused by the Inspector, add-block flow, list-source authoring, and ⌘K.

### Tier B — the editor + preset gallery (the flagged edit-suite gap)
- [~] **Editable surfaces** — category surfaces are now editable via persisted **overrides**
      (config v2→v3; `mutateBlocks` edits the current surface; snapshot-on-first-edit; drag/resize/
      remove/add + Reset-to-preset). TODO: the proper **`{ surfaces }` unification** + a shared
      `SurfaceCanvas` (retire the room/override fork; RoomView/CategoryView share one edit shell).
- [ ] **Add-block flow** — the `+` opens a typed menu (Group / List / Chart / Card / Hero) and
      inserts an empty block of that type; inline `+` between blocks + an empty-state `+`. (Today
      "add" = a single-entity card only.)
- [ ] **Block / Tile Inspector (no YAML)** — a right-rail (desktop) / bottom-sheet (phone) panel
      editing the selected block via structured controls: block title; Group `axis` + member list
      (reorder/remove/`+`); List `source` matcher rows (domain/state/area → live "resolves to N");
      Chart series + window + thresholds; per-tile name / icon (lucide picker) / `color` swatch /
      `stateContent` / feature toggles.
- [~] **Undo/redo + duplicate** — Reset-to-preset done. TODO: a single-level undo/redo history on
      the config object + duplicate-block.
- [x] **Persisted overrides** for generated surfaces (survive reload; reconcilable with the preset).
- [ ] **Preset-gallery picker + first-run onboarding** — browsable **preset cards** with **live
      previews built from the user's own entities**; picking commits to config; auto-generate
      becomes one card; empty-state onboarding.

### Tier C — structure + widget parity
- [ ] **Multi-dashboard / named views** — evolve the model to multiple named dashboards/views with
      a quiet top-chrome switcher (not a sidebar); default-dashboard selection; sidebar panel
      registration. (Depends on the `{ surfaces }` model.)
- [ ] **Missing widgets** (compose, don't port): **camera** + **camera wall** (the sanctioned
      tiling exception) · **weather** · **gauge** · generalized **action/button tile** (scene/script/
      button/input_button) · **editable helpers** (number/select/text/datetime) · **alarm-panel**
      control on-surface · **fan** / **vacuum** / **valve** · **person/device_tracker** presence ·
      **calendar** · **markdown** · picture-glance.
- [ ] **Real per-domain detail Sheets** — `DetailContent` is widget + raw-attribute dump for most
      domains; give each domain a proper more-info tier.
- [ ] **Domain-correct service calls** — cover position, fan percentage/preset, lock code, media
      transport/source, alarm arm/disarm, number/select set (not a 7-domain toggle allowlist).

### Tier D — ship-readiness (a stranger can install + trust it)
- [~] **Error boundaries** — `Chart` is wrapped. TODO: app-level + per-surface `ErrorBoundary` +
      a reconnecting/connection-lost banner (one bad widget must not blank the panel).
- [ ] **Adaptive shell** — consume HA's `narrow` (currently discarded); reflow nav phone/tablet/desktop.
- [ ] **URL / route persistence** — Back + reload restore the view (precondition for kiosk deep-links).
- [ ] **Release hygiene** — LICENSE, version sync, tagged release + CHANGELOG, README rewrite +
      screenshots (gates any non-owner install).
- [ ] **Settings / options flow** + a reset-layout escape hatch.
- [ ] **Accessibility pass** — keyboard/focus-visible, contrast, screen-reader on the custom
      controls (wheel/dial/charts/drag-tiles); a **reduced-motion** pass (we currently exceed our
      own minimal-motion principle).

---

## ✨ Differentiators — keep the edge (why switch, not just match)
- [ ] **⌘K command palette as a *control* surface** — "movie" runs the scene, "kitchen" jumps,
      "all lights off" = scoped bulk action, "living room temp" opens the climate Sheet. Reuses the
      faceted picker + `runAction` + Sheet + ContextMenu keyboard model. *The #1 reason to switch.*
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
- **Docs** — INSPIRATION / FRAMEWORK / PRESETS / DESIGN_DIRECTIONS / ROADMAP; AGENTS/DESIGN_PRINCIPLES reframed.
