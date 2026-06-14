# simUI

A custom, beautiful, **information-dense** UI layer for Home Assistant — built in React,
adaptive across phone, desktop, and an installable/native form factor. The goal is
aesthetics and density that stock Lovelace doesn't deliver. This is a personal project,
optimized first and foremost for the owner's taste.

## Status

Working prototype, HACS-installable (see `custom_components/simui/`). The view layer is a
**composed, per-room** dashboard (not a card grid): a home overview menu of rooms →
each room is a surface composed of `hero / group / list / card` blocks on a state-reactive
**ambient canvas**, per [`DESIGN_PRINCIPLES.md`](DESIGN_PRINCIPLES.md). Per-entity
subscriptions (`useEntity` / `useAggregate`) keep updates surgical. Per-room edit mode
(drag-reorder / resize / add). Persistence via HA user-data store (localStorage fallback);
defaults auto-generated per room (never the whole entity registry). Entity widgets: light,
sensor, climate, media_player, cover, lock + generic fallback. `npm run dev` (mock data
when no token) → `dist/simui-panel.js`. Verified end-to-end in a headless browser.

**Current pivot:** from the per-room dashboard to a navigation **shell** — a Home summary,
device-type category views, native detail sheets, and preset templates (see "Navigation &
interaction" below, and [`TODO.md`](TODO.md) / [`PROGRESS.md`](PROGRESS.md)). Smaller known
gaps: real HA **area registry** for rooms (currently a name heuristic); richer in-UI
composition; a `lightweight-charts` history card.

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
- **⚠️ The connected MCP currently points at a public *demo* sandbox**
  (`ha-mcp-demo-server.qc-h.net` — HA's demo integration: "Bed Light", "Ecobee", "Paulus",
  demo vacuums), **not the owner's real home.** All work so far is validated against demo
  data. To work against the real instance, re-point the HA MCP at it **and restart the
  session** (MCP servers load at session start), then verify `base_url` is the owner's domain.

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
on interaction (progressive disclosure).

**The binding spec is [`DESIGN_PRINCIPLES.md`](DESIGN_PRINCIPLES.md)** — read it before any
UI work. Core rule: *compose, don't tile* (the card is a primitive, not the layout); the
room is the surface; the background is a living ambient canvas; minimize chrome.

## Navigation & interaction (decided)

Mid-pivot from a per-room dashboard to a **shell**:

- **No in-app sidebar** — HA already owns the left sidebar; nav lives in the panel's
  top / summary chrome.
- **Land on a Home summary** (status strip → scenes/favorites → rooms strip → an
  "Everything" categories list), *not* a card grid.
- **Two axes:** rooms + device categories — Lights / Climate / Media / Security / Sensors /
  Energy / Power & outlets / System / Scenes — each a *composed* cross-room view.
- **Tap = native Sheet** (bottom sheet on phone, popover on desktop); **right-click /
  long-press = context menu**; **smart-click expands** (chart → detailed `lightweight-charts`
  graph). Layered disclosure: glance → tap → context / expand.
- **Presets** — ship a gallery of pre-composed pages/dashboards the user picks (instant nice
  page), then edits. Auto-generate becomes one preset among several.
- **Minimal motion** — state changes appear, not animate.

Full spec: [`DESIGN_PRINCIPLES.md`](DESIGN_PRINCIPLES.md) §14.

## Decisions made

- **Full custom panel** (not Lovelace cards), embedded via `panel_custom`.
- **Distribution: HACS custom integration** — published at
  [github.com/watari-dev/ha-simui](https://github.com/watari-dev/ha-simui).
- **Config-driven**, composed blocks, drag-to-edit, persisted per user.
- **Stack:** Vite + React 19 + TypeScript, `home-assistant-js-websocket`, dnd-kit,
  lucide-react; plain CSS with HA-theme-aware variables.

## Open questions

- **Energy vs. Power** — separate category views, or merged into one?
- Which **presets** ship by default (Minimal / Information-dense / Family hub / Wall tablet…).
- Real **area registry** integration (replace the name-keyword room heuristic).

## Conventions

- **`CLAUDE.md` is a symlink to this file (`AGENTS.md`)** — edit either; they are the same
  file on disk. If a tool ever *replaces* the file instead of editing it and breaks the
  link, re-run: `ln -sf AGENTS.md CLAUDE.md`
- **Keep [`PROGRESS.md`](PROGRESS.md) and [`TODO.md`](TODO.md) current** as work proceeds —
  log what shipped in PROGRESS, and what's queued/decided in TODO. Update them at the end of
  each meaningful chunk of work.
