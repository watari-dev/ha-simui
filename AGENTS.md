# simUI

A custom, beautiful, **information-dense** UI layer for Home Assistant — built in React,
adaptive across phone, desktop, and an installable/native form factor. The goal is
aesthetics and density that stock Lovelace doesn't deliver. This is a personal project,
optimized first and foremost for the owner's taste.

## Status

Working prototype. A React custom-panel framework exists: a Lovelace-style dashboard
(views → cards) with edit mode, drag-to-reorder (dnd-kit), add/remove/resize, and per-user
persistence (HA user-data store, localStorage fallback). Widgets: light, sensor, climate,
media_player, cover, lock + generic fallback. Runs via `npm run dev` (mock data when no
token) and builds to `dist/simui-panel.js`. Verified end-to-end in a headless browser.

## Vision & principles

- **Information density first** — show a lot, legibly. No wasted whitespace, no oversized cards.
- **Genuinely beautiful + modern** — design-led, not utilitarian.
- **Adaptive** — one codebase serving phone, tablet, desktop, and a downloadable/native shell.
- **Fully customizable dashboards** — composable widgets bound to Home Assistant entities.
- **Real-time** — live state via Home Assistant's WebSocket API.

## How this connects to Home Assistant

- Data + control via [`home-assistant-js-websocket`](https://github.com/home-assistant/home-assistant-js-websocket)
  (state subscriptions, service calls, area/device/entity registries) and/or the REST API.
- **Auth is inherited, not managed.** When embedded in HA, the frontend injects an
  authenticated `hass` object (connection + live states) — no token, no separate login,
  works identically in every Companion app. A long-lived access token is used *only* for
  standalone local dev (Vite HMR).
- **A Home Assistant MCP server is connected in this environment.** Use the
  `mcp__Home_Assistant__*` tools to inspect the live instance (entities, areas, devices,
  dashboards, history) when designing — don't guess at what exists.

## Architecture (decided)

- **Embedded in Home Assistant, never a separate URL.** simUI ships as a **custom panel**
  (`panel_custom`) — a thin custom-element shell that mounts the React app and receives
  HA's injected `hass` object. It lives in the HA sidebar and is served by HA itself.
- **Works everywhere HA does, for free.** Because the iOS / macOS / Android Companion apps
  are native shells around the HA frontend, an embedded panel appears in all of them
  automatically — no PWA / Tauri / Capacitor packaging needed.
- **React inside a web component.** A custom element (`<simui-panel>`) mounts a React root
  and passes `hass` down via context; HA stays none the wiser.
- **Theme-aware.** Consume HA's CSS variables / `hass.themes` so simUI inherits the user's
  theme and feels native.

## Design language (north star)

Minimalist, clean, modern — show *the right* information, not the most. References:

- **Linear** — restrained dark-first palette, layered near-black surfaces, hairline borders,
  one accent, calm purposeful motion.
- **Apple / Apple Home** — SF-style type, continuous-radius (squircle) cards, content-first
  hierarchy; Apple Home's active-color tile tint (a device that's *on* softly tints its card).
  Borrow the card feel; improve on the low density.
- **TradingView** — precise data viz: thin lines, subtle area fills, gridlines, crosshair
  value readouts, tabular numerals. Plan to use TradingView's open-source `lightweight-charts`
  (Apache-2.0) for sensor/energy history.

Principles: dark-first; monochrome base + a single accent (color reserved for state/active);
generous-but-purposeful spacing; tabular figures for all values; glanceable tiles with detail
on interaction (progressive disclosure). Full spec lives in `DESIGN.md` (generated).

## Open decisions (resolve during brainstorm)

- **Full custom panel vs. custom Lovelace cards** — own the whole canvas (max density &
  design freedom) vs. slot dense widgets into HA's existing dashboards (max integration).
  Leaning: full panel, with optionally publishing widgets as cards later.
- Distribution: drop the build in `/config/www/` + YAML `panel_custom` (simplest) →
  custom integration (HACS-installable) later.
- Config-driven (drag-to-build) vs. code/JSON-defined dashboards.
- Data/state layer, styling system, component library.

## Conventions

- **`CLAUDE.md` is a symlink to this file (`AGENTS.md`)** — edit either; they are the same
  file on disk. If a tool ever *replaces* the file instead of editing it and breaks the
  link, re-run: `ln -sf AGENTS.md CLAUDE.md`
