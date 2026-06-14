# Changelog

All notable changes to simUI are documented here. Versions follow
[semantic versioning](https://semver.org/); the tag, `package.json`, and
`custom_components/simui/manifest.json` are kept in sync. This project follows
[Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

The no-YAML editor lands end-to-end — the make-or-break feature for "a framework
for other people" — plus a live-tick performance pass for large real homes.

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
