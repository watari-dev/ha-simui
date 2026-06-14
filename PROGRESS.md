# simUI — Progress log

What's been built and decided. Pairs with [TODO.md](TODO.md) (what's next) and
[AGENTS.md](AGENTS.md) (vision + architecture). Keep this current at the end of each chunk.

## Where things stand

Working prototype, HACS-installable and published. Composed **per-room** dashboard with a
home overview menu, a state-reactive ambient canvas, per-entity subscriptions, edit mode,
and seven entity widgets. **Mid-pivot** to a navigation *shell* (Home summary + device-type
categories + native sheets + presets). **All validation so far is against the HA demo
sandbox** (`ha-mcp-demo-server.qc-h.net`), not the owner's real instance.

## Shipped

- **Architecture decided** — embedded HA **custom panel** (`panel_custom`), React mounted in
  a web component, inherits HA's auth; appears in every Companion app. Never a separate URL.
- **Phase-1 vertical slice** — Vite + React 19 + TypeScript, `home-assistant-js-websocket`;
  dual-mode Hass source (HA-injected `hass` in-panel / long-lived token in dev) with a mock
  snapshot fallback so the app runs and is browser-testable without a token.
- **Entity widgets** — light, sensor (live sparkline), climate, media_player, cover, lock,
  and a generic fallback. Lucide icons, slim filled sliders, warm/cool/amber state tints.
- **Design language** — Linear / Apple / TradingView, codified in
  [`DESIGN_PRINCIPLES.md`](DESIGN_PRINCIPLES.md) (the binding spec; core rule: *compose,
  don't tile*).
- **Dashboard framework** — first a Lovelace-style card grid (edit mode, dnd-kit
  drag-reorder, add/remove/resize, per-user persistence), then **rebuilt** into the composed
  per-room layout: `hero / group / list / card` blocks on an ambient canvas; per-entity
  subscriptions (`useEntity` / `useAggregate`) to fix lag; per-room auto-generated defaults
  (no entity-dump).
- **Home overview + headers** — home menu of rooms, sticky distinct headers (fixed an
  overlap bug), coloured room icons (fixed a "lost all colour when idle" regression).
- **Distribution** — HACS custom integration (`custom_components/simui/`) with a config
  flow that serves the bundle and auto-registers the panel. CI green (hassfest + HACS); a
  build workflow rebuilds `simui-panel.js` on source change. Public repo:
  [github.com/watari-dev/ha-simui](https://github.com/watari-dev/ha-simui).
- **Navigation model decided** — no in-app sidebar, Home-summary landing, device-type
  categories, native detail sheets, right-click/long-press + smart-click, presets, minimal
  motion. Captured in `DESIGN_PRINCIPLES.md` §14.

## Notes / gotchas

- **Connected HA is a demo**, not the owner's home — re-point the MCP + restart the session
  to work against real devices (see AGENTS.md → How this connects to Home Assistant).
- esbuild pinned to ≥0.28.1 (dev-only advisory); Vite dev transform target pinned to
  `esnext` so it prebundles dnd-kit / lucide-react.
- Verified end-to-end in a headless browser (render, edit, drag-reorder, add/remove/resize,
  toggle, persistence, room switching).
