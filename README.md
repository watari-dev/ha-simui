# simUI

A beautiful, information-dense React UI layer for Home Assistant, embedded as a
**custom panel** — it lives in the HA sidebar and shows up in every Companion app
(iOS / macOS / Android) at your normal HA address. No separate URL, no separate login,
no YAML.

simUI is two things:

- **A framework** — a small, legible block/widget model plus a binding system. One
  universal **Tile** leaf (owns a single entity), composed by a handful of **Block**
  primitives (`hero / group / list / chart / card`) that own layout and grouping, bound
  to live Home Assistant state. See [`FRAMEWORK.md`](FRAMEWORK.md).
- **A preset gallery** — pre-composed, editable starting points (Home summary, Lights,
  Climate, Sensors, Power, Server/Homelab). Pick one, it lays out *your* real devices,
  then you edit it in the app. See [`PRESETS.md`](PRESETS.md).

It is built to be a template gallery **for other people** — every surface is editable
without YAML, approachable to non-power users (sensible auto-defaults, progressive
disclosure, graceful degradation), and adaptive across phone, tablet, and desktop.

> **Status: working prototype.** HACS-installable and published. The shell (Home summary
> + device-type category views + native detail sheets), the editor, and the first presets
> are in place and verified end-to-end in a headless browser. Known gaps and what's next
> are tracked in [`TODO.md`](TODO.md) and [`ROADMAP.md`](ROADMAP.md).

> _Screenshots coming._

## Install (HACS)

1. In Home Assistant → **HACS → ⋮ → Custom repositories**, add
   `https://github.com/watari-dev/ha-simui` with category **Integration**.
2. Install **simUI**, then **restart** Home Assistant.
3. **Settings → Devices & services → Add integration → simUI.**

simUI appears in the sidebar — and in every Companion app — serving its own bundled
frontend. No manual file copy, no YAML, no token (it inherits HA auth).

> **Manual install (no HACS):** copy `custom_components/simui/` into your HA
> `config/custom_components/`, restart, then add the integration as in step 3.

## What it does

- **Lands on a Home summary**, not a card grid — a status strip, favorites/scenes, a
  category launcher, live status, and security, as a vertical priority feed.
- **Two navigation axes** — rooms and device categories (Lights / Climate / Media /
  Security / Sensors / Power / System / Scenes), each a *composed* cross-room surface.
- **Layered disclosure** — glance at a tile, tap for a native detail Sheet (bottom sheet
  on phone, popover on desktop), right-click / long-press for a context menu, smart-click
  to expand a chart.
- **Edit in the app, no YAML** — add cards from a gallery of ~23 kinds (each with a live
  preview built from your real entities), configure blocks and individual tiles in a
  no-YAML Inspector (name / icon / accent / state line / features / tap-actions), start
  from a page template, drag to reorder and resize, with undo / redo. Home, room, and
  category surfaces are all editable. Edits persist per user.
- **Entity widgets** — light, sensor, climate, media_player, cover, lock, camera, weather,
  gauge, fan, vacuum, scene/script/button actions, and a generic fallback. Unavailable and
  unknown states degrade gracefully (dimmed, no controls, no fabricated history).
- **TradingView-grade history** — `lightweight-charts` history cards with a colorized
  header readout, area/line fills, and dual-axis (e.g. merged generation + consumption on
  the Power surface).

## Design language

Minimalist, clean, modern — show *the right* information, not the most. Dark-first;
monochrome base plus a single accent (color reserved for state/active); tabular figures
for all values. References: **Linear** (restrained dark palette, hairline borders, calm
motion), **Apple / Apple Home** (continuous-radius cards, active-state tile tint),
**TradingView** (thin lines, gridlines, crosshair readouts). The binding spec is
[`DESIGN_PRINCIPLES.md`](DESIGN_PRINCIPLES.md) — core rule: *compose, don't tile*.

## How it connects to Home Assistant

- **Auth is inherited, not managed.** When embedded as a panel, HA injects an
  authenticated `hass` object (connection + live states) — no token, no separate login,
  identical in every Companion app. A long-lived access token is used *only* for
  standalone local dev.
- **Live + real-time** via [`home-assistant-js-websocket`](https://github.com/home-assistant/home-assistant-js-websocket):
  state subscriptions, service calls, and the area / device / entity registries (the
  registries drive auto-grouping and keep surfaces from reading as an entity dump).
- **Theme-aware** — consumes HA's CSS variables / `hass.themes`, so simUI inherits the
  user's theme and feels native.
- **Surgical updates** — per-entity subscriptions (`useEntity` / `useAggregate`) so a
  single state change doesn't re-render the whole surface.

One React app, two entry points feeding the same minimal `Hass` shape
([`src/types.ts`](src/types.ts)):

- `src/panel.tsx` — defines the `<simui-panel>` custom element HA mounts; inherits HA's
  `hass` (no token).
- `src/main-dev.tsx` — standalone dev server (Vite HMR), connects to HA with a long-lived
  token, and falls back to a mock snapshot when no token is set.

## Develop

```bash
npm install
npm run dev            # Vite dev server — runs on mock data with no token
```

To point the dev server at a real HA instance, copy `.env.example` to `.env.local` and set
`VITE_HASS_TOKEN` (Profile → Security → Long-lived access tokens). A browser talking to a
remote HA needs CORS: add your dev origin (e.g. `http://localhost:5173`) to HA's
`http: cors_allowed_origins:`.

```bash
npm run typecheck         # tsc --noEmit
npm run build             # type-check + build → dist/simui-panel.js (single ES module)
npm run build:integration # build, then copy the bundle into custom_components/simui/
```

`build:integration` is what produces the bundle the HACS integration serves.

## Documentation

- [`AGENTS.md`](AGENTS.md) — vision and locked architecture decisions (source of truth).
- [`FRAMEWORK.md`](FRAMEWORK.md) — the Tile / Block / Chart / StatusStrip contracts.
- [`PRESETS.md`](PRESETS.md) — the preset gallery and how each surface degrades.
- [`DESIGN_PRINCIPLES.md`](DESIGN_PRINCIPLES.md) — the binding look-and-feel spec.
- [`INSPIRATION.md`](INSPIRATION.md) — the real-world evidence behind the framework.
- [`PROGRESS.md`](PROGRESS.md) / [`TODO.md`](TODO.md) — what shipped and what's next.

## License

[MIT](LICENSE).
