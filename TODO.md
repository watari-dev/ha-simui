# simUI — TODO

What's next, roughly prioritised. Pairs with [PROGRESS.md](PROGRESS.md) (what's done) and
[AGENTS.md](AGENTS.md) (vision). Check items off and move them to PROGRESS as they ship.

## Blockers

- [ ] **Connect the real HA.** The MCP currently points at the demo sandbox. Re-point it at
      the owner's instance **and restart the session**, then verify `base_url` is their
      domain and entities are real (not "Bed Light / Paulus / Demo vacuum").

## Next — the navigation shell (current focus)

- [ ] **Home summary** landing — status strip · scenes/favorites · rooms strip · "Everything"
      categories list. Replaces the room-card grid. No in-app sidebar (HA owns the left rail).
- [ ] **`Sheet` primitive** — tap a tile → bottom sheet (phone) / popover (desktop) with the
      entity's full controls. The universal detail surface.
- [ ] **Category views** — Lights / Climate / Media / Security / Sensors / Energy /
      Power & outlets / System / Scenes; each a composed cross-room view (reuse the blocks).
- [ ] **Right-click / long-press context menus** — relevant actions per type
      (`DESIGN_PRINCIPLES.md` §14): light→colour/scene; climate→mode/history; sensor→expand
      graph/range; media→transfer/source; energy→breakdown; etc. Always includes
      favorite + edit.
- [ ] **Smart-click expand** — chart/sparkline → full `lightweight-charts` graph
      (crosshair, time range).
- [ ] **Presets** — a gallery of pre-composed pages/dashboards (Minimal / Information-dense /
      Family hub / Wall tablet…). Onboarding = pick a preset → it lays out the real devices →
      edit. Auto-generate becomes one preset.

## Backlog

- [ ] Real **area registry** for room assignment (replace the name-keyword heuristic).
- [ ] Richer in-UI composition — build groups/lists by hand, not just add-as-card.
- [ ] `lightweight-charts` energy/history card (the "expand graph" target).
- [ ] **Reduce motion** to near-zero across the UI; update the motion principle accordingly.
- [ ] Scenes & favorites as first-class; a **command palette (⌘K)** to jump/control anything.
- [ ] More widgets — vacuum, camera, fan speed, alarm panel, valve.
- [ ] Optional: publish select widgets as standalone Lovelace cards.

## Open questions

- **Energy vs. Power** — separate category views, or merged into one?
- Which **presets** ship by default?
