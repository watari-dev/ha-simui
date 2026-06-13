# simUI

A beautiful, information-dense React UI layer for Home Assistant, embedded as a
**custom panel** — it lives in the HA sidebar and shows up in every Companion app
(iOS / macOS / Android) at your normal HA address. No separate URL, no separate login.

See [AGENTS.md](AGENTS.md) for vision and locked architecture decisions.

## Install (HACS)

1. In Home Assistant → **HACS → ⋮ → Custom repositories**, add
   `https://github.com/watari-dev/ha-simui` with category **Integration**.
2. Install **simUI**, then **restart** Home Assistant.
3. **Settings → Devices & services → Add integration → simUI.**

simUI appears in the sidebar — and in every Companion app — serving its own
bundled frontend. No manual file copy, no YAML, no token (it inherits HA auth).

> **Manual install (no HACS):** copy `custom_components/simui/` into your HA
> `config/custom_components/`, restart, then add the integration as in step 3.

## How it works

- One React app, two entry points:
  - `src/main-dev.tsx` — standalone dev server (Vite HMR), connects to HA with a
    long-lived token.
  - `src/panel.tsx` — defines the `<simui-panel>` custom element that HA mounts;
    it inherits HA's authenticated `hass` object (no token).
- Both feed the same minimal [`Hass`](src/types.ts) shape (`states` + `callService`)
  into a React context, so widgets are identical in both modes.

## Phase 1 (this scaffold)

- Live entity state via `home-assistant-js-websocket`.
- Dense grid, entities grouped by domain, theme-aware (inherits HA's CSS variables).
- Real widgets: `light` (toggle + brightness), `sensor` (value + live sparkline).
- Generic fallback tile for every other domain (toggles switches/fans/etc.).

## Local dev

```bash
npm install
cp .env.example .env.local   # then set VITE_HASS_TOKEN (Profile → Security → Long-lived access tokens)
npm run dev
```

> Browser → remote HA needs CORS: add your dev origin (e.g. `http://localhost:5173`)
> to HA's `http: cors_allowed_origins:`. Easiest path for a first run is to point at
> your own HA instance.

## Build & install into Home Assistant

```bash
npm run build          # → dist/simui-panel.js (single self-contained ES module)
```

1. Copy `dist/simui-panel.js` to your HA `config/www/` directory (served at `/local/`).
2. Add to `configuration.yaml`:

   ```yaml
   panel_custom:
     - name: simui-panel            # must equal the custom element tag
       url_path: simui              # → /simui in the sidebar
       sidebar_title: simUI
       sidebar_icon: mdi:view-dashboard-variant
       module_url: /local/simui-panel.js
   ```

3. Restart Home Assistant. simUI appears in the sidebar — and in every Companion app.

> Later, a small custom integration can register the panel and serve the bundle
> automatically (HACS-installable), removing the manual copy + YAML step.
