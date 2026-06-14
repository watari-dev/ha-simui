# simUI — Inspiration study

What a real, heavily-built Home Assistant dashboard taught us — distilled into patterns
worth generalizing. This is **evidence**, not a target to clone. It feeds the contracts in
[`FRAMEWORK.md`](FRAMEWORK.md) and the templates in [`PRESETS.md`](PRESETS.md).

> **Principle:** inspiration ≠ replication. simUI is a framework + template gallery for
> *other people* ([`AGENTS.md`](AGENTS.md)). We keep what generalizes and deliberately drop
> what is personal to one home.

## Source

The owner's real instance ("Simba's Home", reachable via the `simbas-home-assistant` MCP):
~6,257 entities, 3 floors, 20 areas, HA 2026.6.3. The "Overview" dashboard is **23 views**
organized by **device category** (Lights, Cameras, A/C, Fans, Blinds, TV, Switches, Sensors,
Powerpoints, Servers, Power, Batteries, Motion/Contact/Water sensors, Device Temp,
Automations, Scenes, HomeLab, Reliability…) plus a **Home** summary. We analyzed all 23 views
plus three cross-cutting concerns (tile DNA, layout/chrome, dynamic-lists/charts).

## The one big finding

Despite **46 custom cards installed**, the dashboard is built almost entirely from **native
HA primitives**: **317 `tile` cards**, 104 `heading`s, in `sections` grids. Custom cards are
used *surgically* — apexcharts (history), mushroom chips/badges (status strip), auto-entities
(dynamic lists), webrtc (cameras). **50% of the 317 tiles use only `entity` + `name` +
`icon` + `state_content`.** The sophistication is in *naming, icon choice, grouping, and a
handful of high-value tricks* — not card variety. That is the entire thesis for a framework:
**one tiny primitive, composed.**

It also already implements simUI's "compose, don't tile" in stock HA: a `heading` followed by
a run of `tile`s — no panels, no borders — *is* a group. That maps 1:1 onto a GroupBlock.

## Keep vs. drop

| Keep — generalizes → ship as framework/preset | Drop — personal artifact |
|---|---|
| `heading` + run-of-tiles = a group (zero chrome) | The exact 23-view list, Greek server names |
| One tile flexed into ~5 roles via props | The `input_button.navigation_button` sentinel hack |
| Grouping **axis varies** per surface (floor / function / device-class) | 6,000-entity scale assumptions |
| `state_content:[state, last_changed]` recency line | Hand-writing every name, curating 37-entity allowlists |
| Status strip in chrome; "what's on" count pills | Rainbow per-series chart colors (the low-density Lovelace look) |
| Charts as section closers with a live header readout | `layout_options` vs `grid_options` schema inconsistency |
| Group/aggregate entities as the default binding | Per-tile micromanagement |

## Pattern catalog (the generalizable tricks)

Each pattern below is cited with a real config fragment and points at the contract it informs.

### 1. Heading-supplies-context naming
The section heading carries the noun; the tile carries only the leaf. Under "Kitchen" the
tile is just **"Downlights"**; under "HomePods" it's just **"Dining Room"**.
`{type: tile, entity: light.kitchen_downlights_group, name: "Downlights", icon: "mdi:light-recessed"}`
→ simUI auto-derives short labels by stripping the area/group prefix. *(→ FRAMEWORK: naming.)*

### 2. Two-tier headings = the whole grouping model
`{type: heading, heading: "Level 1"}` then `{type: heading, heading: "Bedroom", heading_style: "subtitle"}`.
Floor (title) → room (subtitle). No nested containers, no cards — typography is the structure.
*(→ FRAMEWORK: GroupBlock, SectionHeading.)*

### 3. The grouping axis is declarative, not always "room"
Lights group by floor→room; **Powerpoints** group by function (GPOs vs HomePods);
**Bathrooms** group cross-floor by function; **Fans** file climate entities under "Heating"
because they ride on fan hardware. Group by the user's mental model, not the HA domain.
*(→ FRAMEWORK: GroupBlock `axis`.)*

### 4. `state_content` recency line — the highest-value single borrow
`state_content: ["state", "last_changed"]` on every motion/contact tile → "Clear · 2h ago" in
one chip. Safety/battery devices use `last_updated` (proves liveness, not just change).
*(→ FRAMEWORK: Tile `stateContent`.)*

### 5. One tile, ~5 roles via props
- **Display/status** — `{entity, name, state_content}` (50% of tiles).
- **Vertical mini-tile** — `vertical:true, hide_state:true` → icon-over-label launcher squares.
- **Feature control** — `features:[{type:'climate-hvac-modes', hvac_modes:[...]},{type:'target-temperature'}]` → an inline controller.
- **Colored active-state** — `color` tint (semantic category or Apple-Home on-tint).
- **Action-overridden** — `tap_action`/`icon_tap_action` decouple behavior from the entity.

`hvac_modes` / `modes` / `features` are always **curated subsets** (the 4 alarm modes actually
used, not all 7 HA modes). *(→ FRAMEWORK: Tile contract.)*

### 6. Split tap targets
Body and icon do **different** verbs: alarm tile = tap-body `more-info`, tap-icon `toggle`;
timer tile = tap-body `timer.start`, tap-icon `more-info`. Two actions per tile, no extra card.
*(→ FRAMEWORK: `tapAction` + `iconTapAction`; → §14 layered disclosure.)*

### 7. Semantic color as an information channel
`color:'primary'`/`'accent'` = "this is a button/action"; `color:'red'` = destructive
(restart); category colors on nav tiles; Jinja `icon_color: "{{ 'indigo' if is_state(...,'on') else '' }}"`
= tint **only when on**. Two disjoint roles: **state-reactive accent** vs **static categorical accent**.
*(→ FRAMEWORK: color tokens.)*

### 8. Status strip in chrome, never in the body
- **Count pill** — `content:"{{states('sensor.lights_currently_on')}}"`, icon+color swap at
  `> '0'`, tap → popup of only the on entities.
- **Quick-action chips** — Movie (20% brightness), Sleep (all-off via one house group), Open-all-blinds.
- **Nav badges** — color-coded `mushroom-template-badge` that `navigate` to a sibling view.
- **Conditional badges** — render only while active (`visibility: state on`): "Dishwasher Running".
*(→ FRAMEWORK: StatusStrip; → PRESETS: Home summary.)*

### 9. Conditional surfacing — hide noise until it's signal
A whole "Garage Door" **section** mounts only when `cover.garage_door` is `open`, then
vanishes. Washer/dryer/AC badges appear only while running. The home stays sparse and gets
denser exactly when there's something to act on. *(→ FRAMEWORK: block `visibleWhen`.)*

### 10. Dynamic lists that self-collapse (auto-entities)
`show_empty:false` + `filter.include` (glob/domain/state) + `exclude:[{state:off},{state:unavailable}]`
→ a card that lists only what's active and disappears when nothing is. Two families: explicit
allowlist (curated) and glob/predicate query (true discovery). **This is auto-generate.**
*(→ FRAMEWORK: ListBlock `source`.)*

### 11. Charts as section closers, with a live header readout
apexcharts `header: {show_states:true, colorize_states:true}` puts the **current value**,
colorized, in the chart header (TradingView crosshair-readout idea). Thin 2px strokes, area
fill at ~0.3 opacity, y-axis zoomed to the meaningful band (`min:20`, not 0), 24h/7d/30d
windows, dual-axis when units differ (Fuel% + Range km), value-threshold banding (humidity
comfort zone). The **per-circuit sparkline wall** (one tiny line per device) is the densest,
most TradingView-feeling pattern. *(→ FRAMEWORK: ChartBlock.)*

### 12. Summary-first ordering
Device Temperature opens with three overview charts, *then* the 30-item per-floor list.
Controls up top, history at the bottom: glance → act → understand. *(→ PRESETS.)*

### 13. Cameras are the one legit exception to "compose, don't tile"
A 4-up `webrtc-camera` video wall, no headings, no tiles — content *is* the card, with a
latency-first + fallback stream chain. *(→ FRAMEWORK: ChartBlock peers / camera block.)*

### 14. Density knobs
`max_columns` tuned per surface (Lights 3, switches/graphs 2, camera wall 4, link grid 4);
`dense_section_placement` reflows columns to pack tightly; explicit spans are **rare** (13
cards total) and reserved for full-width strips and wide charts. *(→ FRAMEWORK: placement.)*

## Homelab telemetry inventory (for the Server/Homelab preset)

Grounded in what actually exists in HA, so the Server template is buildable today and
adoptable by anyone with the same integrations:

- **Proxmox VE** — nodes **DeltaServer**, **GammaServer** (per-node CPU/mem/disk, VMs-running
  count, status `binary_sensor`); a **Proxmox Backup Server**.
- **Monitor Docker** — per-container CPU/mem/state/image, **start/stop `switch` + restart
  `button` + status `binary_sensor`** (real control, e.g. `docker_roonserver_*`).
- **TrueNAS/ZFS** — **OmegaNAS**, **TauNAS** — dataset sizes (Immich, Paperless-ngx,
  Seafile/OCIS/OpenCloud, Sabnzbd, Transmission, jDownloader2, nginx-proxy-manager), disks, swap.
- **UniFi UDM Pro** — WAN/clients/throughput; **PoE port power-cycle buttons**; `*_restart` button.
- **Self-hosted stack** — Immich, Paperless-ngx, Seafile, Plex, *arr/download, NPM, Roon.
- Existing dashboard surfaces: per-machine **Servers** composites, a **HomeLab Services**
  launcher grid (Portainer/Media/Content Delivery/Other/Cameras/Cockpit), a **Reliability**
  auto-entities health view.

**Decision:** the Server preset uses **native simUI controls only — no embedded iframes** of
Proxmox/Portainer/Cockpit. Deep-links open the real console in a new tab; vitals, inventory,
and start/stop/restart are native tiles/sheets. *(→ PRESETS: Server / Homelab.)*
