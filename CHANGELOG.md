# Changelog

All notable changes to simUI are documented here. Versions follow
[semantic versioning](https://semver.org/); the tag, `package.json`, and
`custom_components/simui/manifest.json` are kept in sync.

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
