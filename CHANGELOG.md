# Changelog

All notable changes to simUI are documented here. Versions follow
[semantic versioning](https://semver.org/); the tag, `package.json`, and
`custom_components/simui/manifest.json` are kept in sync. This project follows
[Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

## [0.5.0-beta.2] - 2026-06-15

### Changed
- **Universal Minimalist icon disc** — every tile (climate, cover, lock, fan, generic),
  not just lights, now renders the UI-Lovelace-Minimalist round icon cell that fills
  with its soft state colour when active. Covers gained a blinds icon. Consistent
  icon-disc anatomy across the whole grid.

## [0.5.0-beta.1] - 2026-06-15

Preview of the room-first Minimalist redesign — grounded in the actual
[UI-Lovelace-Minimalist](https://github.com/UI-Lovelace-Minimalist/UI) theme tokens.

### Changed
- **Room-first Home** (Apple-Home gestalt) — the landing page is no longer a
  category-launcher list + room-overview cards; each room is now a section of its own
  device tiles (lights, climate, media, covers, locks…) rendered inline, with a quiet
  tappable room header. The category launcher + security drop below as secondary nav.
- **Minimalist visual language** — soft pastel state palette (yellow `#fcd663`, blue
  `#89b3f8`, green `#80c994`, coral `#f18b82`); `#1d1d1d` cards that FLOAT on a soft
  drop shadow (`0 2px 4px rgba(0,0,0,.16)`); 20px radius; a barely-there ~12% active
  tint on a round icon disc. Reverses the flat "depth from light" look.

## [0.4.1] - 2026-06-15

### Fixed
- **Popups rendered unstyled when embedded in Home Assistant** — the context menu, detail
  sheets, and the add-card / template galleries portaled to `document.body`, which sits
  *outside* the panel's stylesheet scope in a real HA install, so they appeared completely
  unstyled (the right-click menu blew out to full-width native sliders across the screen).
  They now portal into an overlay container *inside* the panel's styled subtree, so their CSS
  and design tokens always apply. (Worked in standalone dev all along, which is why it was
  only visible embedded.)

## [0.4.0] - 2026-06-15

An Apple-Home design pass over the whole shell — a redesigned light tile, a glanceable
top-of-home highlights band, a dedicated Media surface, and a Powerwall-style energy-flow
object — alongside a sweep of UX bug fixes (editing, the add-card gallery, the context
menu) and a real design-token layer.

### Added
- **Apple-Home top highlights** — an always-present, tappable band on the Home summary
  (Lights / Climate / Security / Media / Fans), each a live aggregate that taps through to its
  filtered category view; Security reads a calm "Secure" when everything is locked.
- **Media category surface** — "Now playing" rich transport cards (album · title · prev/play/next)
  over a compact speaker & display list, with mirror-entity dedup + curation so a large real home
  isn't a wall of unavailable ghosts.
- **Wall-tablet / kiosk mode** — a chrome-off, screen-awake display mode (enter from the Home
  header or `?kiosk=1`): hides the header, switches the ambient to the dot-matrix field, holds a
  Screen Wake Lock, suppresses the editor (tap-to-control kept), with a floating exit button.
- **Powerwall-style energy-flow object** — a compact Solar / Home / Grid / Battery flow diagram
  with live values, battery state-of-charge, signed grid/battery direction, and motion only on
  active wires. Emitted by the Power preset when a real solar + battery/grid system is detected.
- **Range toggle (24h / 7d / 30d)** on the always-on Power flow chart (previously only in the
  expand sheet).
- **Design-token layer** — a 4px spacing scale, two radius tiers, an elevation/bezel material and
  a type scale declared on `:root`, so surfaces share one rhythm.

### Changed
- **Apple-Home light tile** — the everyday light surface is now the premium drag-to-set tile: a
  soft warm-glow brightness fill (no more muddy block), a round icon disc, a warm card wash +
  squircle radius only when on, and a bold tabular % headline. Split-action gesture — the icon
  disc toggles in place, the body opens the detail sheet, a drag sets brightness.
- **Inline top edit bar** — Undo / Redo / Add card / Done live inline in the surface header while
  editing, instead of a bar floating at the bottom of the screen.
- **Borderless cards** — tiles, room cards, surfaces, scene tiles and control chrome trade hard
  1px borders for a raised fill + hairline bezel ("depth from light, not boxes"); surface radii
  unified to 18px.
- **Cleaner Power surface** — the energy-flow object drops its redundant mid-wire value labels and
  empty lower third; history charts show their window (anchored at the latest sample) instead of
  stretching to fit a stray sample.
- **Curated highlight counts** — the status strip applies the same registry curation as the preset
  builders, so counts exclude hidden/diagnostic entities on a real home.

### Fixed
- **Right-click / long-press context menu** position when embedded in Home Assistant — it anchors
  to its real containing block instead of jumping to the far left.
- **Add-card gallery** — an opaque panel (some themes made `--surface` translucent → see-through)
  and live previews that no longer collapse to a sliver.
- **Editor scrim** — entering edit mode no longer paints an opaque full-screen overlay over the
  surface.
- **Power chart battery series** — signed battery power was pinned to a 0–100 SOC axis and drawn
  off-screen; it now shares the power axis.

### Performance
- **Batched sparkline-wall history** — a metric wall fetches its whole history in one request and
  feeds each cell its slice, instead of one WebSocket request per cell.

## [0.3.0] - 2026-06-14

The no-YAML editor lands end-to-end — the make-or-break feature for "a framework
for other people" — plus a live-tick performance pass for large real homes, an
adaptive shell with URL/route persistence, and release hygiene (LICENSE + docs).

### Added
- **In-app editor** — enter edit mode on any surface to add, reorder, resize, and
  remove cards with no YAML. Entering edit snapshots the live preset into an
  editable override; changes are debounced and persisted per user. Includes undo /
  redo, a floating toolbar, a one-time onboarding hint, and an empty-state
  ("start from a template" / "add a card").
- **Card gallery — ~23 card kinds** — pick a card from a catalogue (Group, List,
  History chart, Hero, Card, Scenes, Sliders, Metrics wall, Sensors-by-type,
  Security board, Climate, Media, Camera, State hero, Status strip, Glance,
  What's-on, Energy + Power, Week trend, plus display-only Stat / Gauge / Section /
  Divider). Each card shows a **live preview built from the user's real entities**.
- **Inspector (no-YAML configuration)** — per-block settings (title / width / axis),
  per-tile settings (name / icon / accent / size / state-line / features / actions),
  a chart editor, an entity-members editor, and a visibility (condition) editor.
- **Page templates** — a gallery of six role/density variants (Minimal, Standard
  home, Family hub, Wall tablet, Power user, By category), each a live full-page
  preview built from the user's real entities; picking one snapshots it onto the
  surface.
- **Area-grouped entity picker** — a faceted, virtualized chooser over the
  area-aware entity index, with domain and area facets, live counts, and per-area
  "select all".
- **Drag-to-resize** — a resize handle on the block edit chrome snapping to
  1 / 2 / full columns, alongside the existing drag-to-reorder.
- **URL / route persistence** — the active surface lives in the location hash
  (`#/category/lights`, `#/room/<id>`); Back, forward, and reload restore the view.
- **Adaptive shell** — the panel consumes HA's `narrow` flag, and the home packs
  rooms two-up on phone-width (the surfaces, editor panels, and detail sheet were
  already responsive).
- **LICENSE (MIT)** + a rewritten README covering the framework, editor, and presets.

### Changed
- **All three surfaces are editable** — Home, room, and category surfaces now share
  one edit contract via the shared `useEditableSurface` hook (the per-view
  duplication is gone).
- **Authored tap-actions execute on every leaf** — actions configured in the
  Inspector (toggle / more-info / navigate / call-service / url) run on every domain
  widget, slider and status-board tile, hero, and row. A leaf keeps its domain
  default unless a slot is explicitly set, so no existing behaviour regresses.

### Performance
- **Live-tick de-jank** — the embedded panel replaces the whole `states` object
  every tick; surface builders now key their memos on a memoized **entity-keys
  version** (bumps only when the key set changes) and read live state lazily, so a
  value tick no longer re-renders or re-sorts the whole surface or rebuilds the
  editor's entity index.
- **Input-scoped `useAggregate`** — aggregates skip recompute on ticks where no
  tracked entity changed identity, scoping the O(all-entities) source scans
  (count pills, dynamic lists) to the relevant domains.

## [0.2.0] — 2026-06-14

Competitiveness batch — a large step toward Lovelace parity, plus the first
versioned release so HACS surfaces proper semantic updates.

### Added
- **Registry curation gate** — `isPrimaryEntity` excludes diagnostic/config,
  hidden/disabled, and id-pattern noise (`browser_mod_*`, `*_signal_strength`,
  `*_linkquality`, `update.*`, restart/identify buttons) from every entity scan,
  so surfaces stop reading as a database dump on a large real home. Graceful
  pattern-only fallback when the registry is unavailable; `ListSource.includeNoise`
  opt-out for surfaces that intentionally show maintenance entities.
- **New entity widgets** — camera, weather, gauge (opt-in), generalized
  action/button (scene/script/button/input_button), fan, and vacuum.
- **Per-domain detail Sheets** — richer more-info for light, climate, media_player,
  cover, lock, and sensor, composed from existing primitives.
- **Error boundaries + reconnect banner** — app-level and per-surface error
  boundaries (one bad widget no longer blanks the panel) and a quiet
  connection-lost/reconnecting banner.

### Changed
- **Unavailable/unknown states** now applied across every tile (StatusBoard,
  MetricSpark, and all domain widgets): dimmed, placeholder value, no controls,
  and no fabricated history.
- **Accessibility + reduced motion** — ARIA roles/labels and keyboard operation
  on the custom controls, a shared focus-ring token, and a global
  `prefers-reduced-motion` pass.
- Versions synced and the bundled panel rebuilt with all of the above.

### Removed
- The planned ⌘K command-palette differentiator (Home Assistant already ships a
  built-in quick-bar).
