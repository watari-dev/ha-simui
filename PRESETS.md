# simUI — Preset gallery

Presets are **editable starting points**, not fixed layouts. Onboarding = pick a preset → it
lays out *your* real devices → you edit. Auto-generate is one preset among several. Each preset
is just **data**: an ordered list of Blocks ([`FRAMEWORK.md`](FRAMEWORK.md)) bound to entities
resolved from the area/entity registry. Specs below cite real patterns from
[`INSPIRATION.md`](INSPIRATION.md) but are written to **generalize** — they must look right
whether a home has 3 lights or 280 ([`AGENTS.md`](AGENTS.md): templates for other people).

> **Degradation is part of every spec.** A preset that only looks good on a 6,000-entity home
> is a failure. Every surface states how it scales down.

## Gallery (planned)

| Preset | For | Core idea |
|---|---|---|
| **Home summary** | everyone (the landing) | status strip → favorites → category launcher → live status → security |
| **Lights** (category) | everyone | all lights, grouped by room, group-entity leads |
| **Climate** (category) | most | feature-control tiles (mode + setpoint inline) |
| **Sensors** (category) | most | binary → status tiles; numeric → sparklines; summary-first |
| **Power** (category) | metered homes | merged generation + consumption; sparkline wall |
| **Server / Homelab** | homelab owners | node vitals · VM/container control · ZFS · backups · launchpad |
| *Minimal / Family hub / Wall tablet* | (later) | density/role variants of the above |

---

## 1. Home summary

The landing surface — a vertical **priority feed**, not a card grid
([`DESIGN_PRINCIPLES.md`](DESIGN_PRINCIPLES.md) §14). Proven against the real `Home` view.

**StatusStrip (chrome):**
- Presence + weather + commute (StatusTile/entity badges).
- **CountPills:** "N lights on", "N fans on" — icon/tint swap at >0, tap → Sheet of active.
- **ConditionalBadges:** appliance running / AC on / door unlocked — render only while true.

**Blocks (top → bottom):**
1. **Conditional alert** (`visibleWhen`) — e.g. garage open → a full-width control HeroBlock
   that mounts only on alert, then vanishes.
2. **Favorites / scenes** — ActionPills or a GroupBlock of scene launcher tiles (Movie, Sleep,
   Goodnight) firing one house-group service each.
3. **Category launcher** — a GroupBlock of **vertical mini-tiles** (action-only, categorical
   color), one per category present in this home: Lights, Climate, Media, Security, Sensors,
   Power, Scenes, System. Each `tapAction: navigate(category)`.
4. **Live status** — a GroupBlock mixing read-only metric tiles (energy: consumption=amber,
   solar=green, battery=accent; `tapAction:none`) and a couple of rich StatusTiles (washer/dryer).
5. **Security hero** — a HeroBlock for the alarm with an `alarm-modes` feature (only the modes
   this home uses); tap-body more-info, tap-icon toggle.

**Degradation:** the launcher lists only categories with entities. No scenes → drop block 2.
No energy → drop the metric cluster. No alarm → block 5 becomes a lock tile or is omitted.
Minimum viable Home = strip + launcher.

---

## 2. Lights (category surface)

"All your lights, grouped by room" — the category axis rendered as a composed surface.

**StatusStrip:** CountPill ("N on" → Sheet of on-lights), ActionPills (All off; a Movie/ambient scene).

**Blocks:** one **GroupBlock per area** (`axis:'room'`), each:
- titled by the area (SectionHeading);
- **group-entity leads** — the room's light group tile first (the aggregate is the common
  case); individual members follow, names stripped to the leaf ("Downlights", "Lamp").
- fixture-type icons (downlight / strip / floor-lamp / heat-lamp), not the bare domain icon.

**Degradation:** **few lights** → a single flat GroupBlock, no per-room split. **Many lights /
no group entities** → synthesize a per-area aggregate control at the top of each group; expose
members on tap. Column count from the heaviest tile. A power-user "dense/raw" variant drops
names and sub-headers.

---

## 3. Climate (category surface)

Controllers, not read-outs — control without opening a sheet.

**Blocks:**
1. **Whole-home / zone HeroBlock** — the master controller tile, large, with `climate-hvac-modes`
   (curated subset) + `target-temperature` features inline.
2. **Per-zone GroupBlock** — a feature-control tile per zone (mode segmented control + setpoint
   stepper); split tap targets (body → sheet/history, icon → toggle).
3. **Timers / presets** (if present) — duration-named tiles ("1 Hour" → `timer.start`; "Cool"
   preset → scene); `color:'primary'` on the active presets, neutral on Off.
4. **ChartBlock (closer)** — humidity/temperature trend, multi-series, value-banded line
   (green in comfort band), 72h, header readout.

**Degradation:** one thermostat → just block 1. No zones → drop block 2. No history → drop 4.
Force a single column for wide feature tiles.

---

## 4. Sensors (category surface)

Split by **data type**, not forced into one shape (concrete "compose, don't tile").

**Blocks (summary-first):**
1. **Overview ChartBlock(s)** — a multi-series comparison + a weekly aggregate, *before* the list.
2. **Numeric GroupBlocks** — grouped by measured quantity (Temperature, Humidity, Air Quality);
   each member a **48h sparkline** tile, name = the room (heading carries the quantity).
3. **Binary GroupBlocks** — grouped by source/floor; each a status tile with
   `stateContent:[state,last_changed]` ("Open · just now"); water/safety uses `last_updated`.

**Degradation:** a handful of sensors → skip the overview charts; one combined group. Give each
entity a stable color identity across its charts.

---

## 5. Power (category surface)

Answers the Energy-vs-Power question: **merged**. The real config puts generation and
consumption on one chart.

**Blocks:**
1. **Flow HeroBlock / ChartBlock** — solar (area) under load (line), dual-axis if needed, 24h,
   live header readout. Battery charge % alongside.
2. **Per-circuit sparkline wall** — a GroupBlock of tiny line-graph tiles, one per circuit
   (`detail:2`, 48–72h) — the densest, most TradingView-feeling pattern.
3. **Outlets / GPOs** (if present) — toggle tiles grouped by function.

**Degradation:** no per-circuit metering → just block 1 (whole-home draw + solar). No solar →
single-series consumption. No battery → drop that series.

---

## 6. Server / Homelab

A standout surface stock Lovelace can't reach — and a template **any** Proxmox + Docker + NAS
owner could adopt (auto-detect those integrations, compose from them). **Native simUI controls
only — no embedded iframes** (decision); deep-links open the real console in a new tab.
Grounded in the real inventory ([`INSPIRATION.md`](INSPIRATION.md)).

**StatusStrip:** overall health (hosts up / containers up / backups OK); a "what's wrong"
CountPill → Sheet.

**Blocks (glance → tap → expand):**
1. **Homelab health HeroBlock** — a synthesized score + a self-collapsing ListBlock of *only*
   what needs attention: container down, pool > 80%, backup stale, update available, cert
   expiring (`source` glob+state, `hideWhenEmpty`).
2. **Per-node GroupBlock** (one per host: DeltaServer, GammaServer…) — status dot, CPU / mem /
   disk / temp **sparklines**, uptime, VMs-running count; deep-link tiles (Proxmox / IPMI /
   Cockpit) open in a new tab.
3. **VM / LXC inventory** — a tile per guest: running/stopped tint, start / stop / restart
   actions, console deep-link.
4. **Container grid** — a tile per Docker container: live CPU/mem, state, **start/stop switch +
   restart button inline** (the entities exist); grouped by host or stack.
5. **ZFS capacity** — pool usage bars + dataset breakdown ("what's eating disk"); scrub/SMART
   status; a free-space **trend** that predicts when a pool fills (ChartBlock, 30d).
6. **Backups** — PBS last-run, success/fail, age (the "is my data safe" glance).
7. **Service launchpad** — self-hosted apps (Immich, Paperless, Seafile, Plex…) as
   action-only tiles with **up/down status** (ping/uptime) + one-tap open; NPM reverse-proxy health.
8. **Network** (optional) — WAN status, throughput, clients, PoE port control.

**Provocations (beyond replication):** cost-of-running per host (rack power × tariff — Power
data already exists); a ZFS dataset treemap; a dependency/topology map (NPM → services); an
incident timeline from the logbook; WoL/power control for hosts.

**Degradation:** no Proxmox → drop nodes/VMs, keep containers. No Docker → drop block 4. No
NAS → drop ZFS/backups. A minimal homelab = health hero + one node + launchpad. The preset
**auto-detects** which integrations are present and includes only those blocks.
