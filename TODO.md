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
- [x] **Profile + de-jank the live tick** — DONE on both fronts:
      • **Container re-renders** — killed the per-render `idSig` `Object.keys().sort().join()` and the
        per-tick re-renders. `HassProvider` wraps the source with a memoized **entity-keys version**
        (`useEntityKeys`, bumps only on add/remove, once per tick); HomeView/CategoryView/EditorOverlay
        build on it + read the live map lazily, so value ticks no longer re-render the containers or
        rebuild the entity index (verified: 0 container re-renders across value ticks).
      • **Aggregate recompute** — `useAggregate(compute, deps?)` skips the compute on ticks where no
        dep entity changed. The O(all-entities) `resolveSource` scans (status-strip count pills,
        dynamic lists) are scoped to the source's candidate domains; the string-builders
        (summarizeRoom / HouseGlance / attentionIds) to their entity lists. `useEntity` stays surgical.
      Remaining (optional): live-tick FPS profiling on the real ~6k home to confirm 60fps end-to-end.
- [x] **Faceted, virtualized entity picker** — shipped: `EntityPicker` composes the `picker/` module
      (SearchBox / FacetBar / AreaGroupedList) over the area-aware `EntityIndex` — domain+area+label
      facets, fuzzy match, multi-select, area-grouped with per-area select-all, group-entity-preferred;
      the shared index is reused by the Inspector add-members flow. `AddCardPanel` removed.

### Tier B — the editor + preset gallery (the flagged edit-suite gap)
*Largely SHIPPED via the decoupled editor store (`src/editor/store.tsx`) + wave-3 fan-out.*
- [x] **Editable surfaces — all three, unified** — Home / Room / Category all drive the editor
      store through a shared **`useEditableSurface`** hook (`src/dashboard/useEditableSurface.ts`):
      enter → (snapshot to **override** for home/category; rooms edit `room.blocks` directly with
      no snapshot) → optimistic `dirtyBlocks` → debounced commit via the atomic `mutateBlocks`
      seam; drag/resize/remove/add + Reset (home/category). `EditorOverlay` is mounted ONCE at
      `DashboardView`. The per-view duplication is retired. (A `SurfaceCanvas` component to also
      share the JSX is a further nicety, not required.)
- [x] **Per-tile config reachable** — `EntityMembers` rows are clickable → `editor.selectTile`,
      surfacing `TileSettings` (name / lucide icon / colour / size / state-line / features /
      **ActionEditor**) with a back-to-card affordance. This is what makes authored tap-actions
      (and all per-tile overrides) usable from the UI.
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

#### Tier B follow-ups
- [x] **Action execution — every leaf** — `useTileAction`/`useTapHandler` (`src/runtime/actions.ts`)
      threaded through: `EntityRow` (group/list rows), all **19 domain widgets** via `WidgetProps.actions`
      ← `CardBlock` (single-entity cards), and the special Group leaves `SliderTile` /
      `StatusBoardTile` + `HeroBlock`. A leaf's handler is overridden ONLY when its ActionMap slot is
      explicitly set, so every domain default is preserved (no-regress verified). End-to-end verified:
      authoring `tap → navigate → home` on a light tile makes the tap navigate home instead of toggling.
      (Minor: the `metric wall`/chart-expand leaves keep their own smart-click semantics; LightTile/
      GenericTile leave their *unavailable* branch inert by design.)
- [x] **Area-grouped EntityPicker** — `EntityPicker.tsx` now composes the `src/editor/picker/`
      module (SearchBox / FacetBar / AreaGroupedList + `rowsFromIndex`) over the area-aware
      `EntityIndex` (`areas`/`registry` threaded through `EntityPickerProps` ← `EditorOverlay`).
      Domain + area facets with counts, per-area "All" select, EmptyState. Verified grouping by
      real areas (Bedroom / Kitchen / Living Room …).

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
- [x] **Adaptive shell** — the panel now consumes HA's `narrow` (→ `data-ha-narrow`, forces the
      compact layout when the panel is narrow but the viewport is wider); surfaces (auto-fill grids),
      editor panels (rail↔bottom-sheet), and the detail Sheet were already responsive; phone packs
      rooms two-up. Verified 6-col desktop / 3-col tablet / 2-col phone.
- [x] **URL / route persistence** — route lives in the location hash (`#/category/lights`,
      `#/room/<id>`); Back + forward + reload restore the view. Self-contained (rides on the panel's
      `/simui` URL, no HA-router coupling); works in standalone dev too. Verified end-to-end.
- [~] **Release hygiene** — DONE: LICENSE (MIT), README rewrite (framework + editor + presets, honest
      status), CHANGELOG `[Unreleased]`, `package.json` license field, version sync (0.2.0 across
      package/manifest/hacs). TODO (owner): confirm the MIT default; cut a tagged release (likely
      **0.3.0** — bump package/manifest, move `[Unreleased]`→`[0.3.0]`, rebuild bundle, push tag) so
      HACS surfaces the editor + perf work. Screenshots still a placeholder.
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
- [~] **First-class wall-tablet / kiosk mode** — DONE: chrome-off (`data-kiosk` hides the header),
      Screen Wake Lock, dot-matrix (`mode="dots"`) ambient, enter (Home header) / exit (floating)
      affordances, persisted via localStorage + `?kiosk=1`, editor suppressed (tap-to-control kept).
      TODO (later): idle screensaver dim + auto-return-home + per-device profile.
- [x] **Powerwall-style energy flow object** — `EnergyFlow` (Solar/Home/Grid/Battery cross with live
      values, SOC fill, signed grid/battery flow + travelling-dash on active wires, reduced-motion
      static). Gated on real solar + (battery|grid|SOC) detection in the Power preset (via the
      `options.energyFlow` card seam). Verified.
- [ ] **"Reality Doctor" health surface** — turn full-registry awareness into "which integrations
      are down / stale / orphaned / low-battery" — makes a giant install legible. (Showcase, later.)

---

## 🎨 Design polish — Phase 1–3 leftovers ([`DESIGN_DIRECTIONS.md`](DESIGN_DIRECTIONS.md))
- [ ] Shared **crosshair scrub** across the glance sparkline ↔ the full chart.
- [x] **Range toggle (24h/7d/30d)** on the always-on Power "flow" chart — `Chart` gained a
      `rangeToggle` prop; `ChartBlock` enables it for multi-series (flow) charts.
- [x] **Sparkline-wall history batching** — `MetricWall` fetches the whole wall's history in ONE
      `useHistory(ids)` call and feeds each `MetricSpark` its slice (was one WS request per cell).
- [ ] Whisper the **album-art tint** into the `AmbientCanvas` (the tile tint is done).
- [x] **Wall-tablet dot-matrix** — kiosk mode wires `mode="dots"` for Home + ambient categories;
      the "Wall tablet" page template already exists in the gallery.
- [ ] Shared **crosshair scrub** (sparkline ↔ full chart) — deferred (SVG spark vs WebGL chart; low value).
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
