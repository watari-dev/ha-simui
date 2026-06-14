# simUI — design directions & fixes

> Consolidated from a 7-agent design brainstorm (Apple Home · TradingView · Linear/Raycast ·
> Teenage Engineering/Nothing · Automotive-EV · HA-community · visionOS-ambient), each bounded
> by [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md). Brainstorm/reference — not a spec.

# simUI — make it amazing: directions + fixes

The seven lenses are not seven dashboards — they're one dashboard with three personalities fighting over the surface treatment. Underneath, they agree on almost everything that matters. Here's the consolidated read, the moves worth stealing, the concrete fixes, and a sequence to green-light.

---

## 1. The through-line

**Where all seven converge (this is the spine — build it regardless of which fork you pick):**

- **Color becomes a real two-tier *information* system, not decoration.** Every single lens lands on the same architecture: a fixed **category-identity hue** (nav / heading / chart series only) + a **state tint that only ignites when an entity is active** (the Apple-Home on-tint), all over a near-black base that stays ~85% monochrome. This is the literal text of §7, and it's the agreed fix for "generic" *and* "color underused." If you adopt nothing else, adopt this.
- **The ambient canvas must actually be alive.** Today it's one static warm radial. Every lens replaces it with a multi-stop field driven by live aggregates (lights-warmth, climate, time-of-day). This is §3, and it's the single biggest "alive on load" lever.
- **Sensors and Power become data-viz, not rows.** Unanimous: a **sparkline wall** (per-metric inline charts, value + signed delta + in-band threshold) feeding a **smart-click → full lightweight-charts** expand, and **one merged dual-axis Power chart** with strict series semantics. Swap the in-memory 40-point buffer for the real history API.
- **One per-type quick-control surface, reused everywhere.** The context menu, the Sheet, and tile headers all render the *same* domain control component (brightness + color-temp + scenes for light; setpoint + modes for climate; transport for media). Build it once. This fixes I2/I3/I4 together and is "compose, don't fork."
- **Kill the uniform bordered grid.** Depth from light + hairlines + one hero per surface, not a box per entity (§1/§4/§5).

**The genuine forks the owner must choose between (this is the actual decision):**

1. **Surface personality — pick ONE:**
   - **A · Apple-tactile glass** (Lenses 1 + 7 + 6): frosted backdrop-blur, drag-to-set tiles where *the tile is the slider*, long-press *bloom*, album-art-aware tint. Warmest, most "premium consumer," most tactile. **Trade-off:** `backdrop-filter` blur is the heaviest GPU cost — risks the 60fps rule on a wall tablet, and the embedded HA web-component context can make blur janky.
   - **B · Industrial-technical** (Lens 4 — TE/Braun/Nothing): engraved-groove hairlines, monospace silk-screen labels, a **dot-matrix display layer** for counts/sparklines/ambient. Most *ownable* and distinctive identity by far. **Trade-off:** monospace uppercase labels collide head-on with §8 ("sentence case everywhere, never ALL CAPS except small labels") — it's the boldest but the most off-spec, and the riskiest to the owner's "Linear-restraint" taste.
   - **C · Terminal-precise** (Lens 2 — Bloomberg/TradingView): every value tabular and column-aligned, one shared **crosshair** from 64px sparkline to full chart, a live "house tape" ticker. Most coherent with the data ambition, lowest GPU cost, safest. **Trade-off:** can read *cold* / less emotionally delightful than A.
2. **Energy signature object — flow diagram or chart?** Lens 5's animated **Powerwall flow-node** (solar⇄home⇄battery⇄grid, dots streaming at kW-scaled speed) is the single most "wow" object proposed — but it's the **only looping motion** in the app and demo data has no solar, so it must degrade gracefully. The alternative (Lenses 2/3/6) is a *static* coherent dual-axis chart, fully in-spec, far cheaper. **Decision:** flow-node as the hero *on real-home data*, chart as the always-present floor.
3. **How far the ambient field goes.** Everyone wants a live canvas; Lens 6 pushes to **circadian + presence-aware** (rose at dawn, violet at dusk, warms when motion fires) and Lens 4 to a full **dot-matrix room map**. These are the "delight ceiling" — gorgeous, but defer until the spine is solid.

> **My recommendation:** **C as the structural base** (terminal precision, tabular alignment, crosshair, cheap + on-spec + matches the TradingView north star), **borrow A's drag-to-set tiles and long-press quick-controls** for tactility, and **reserve B's dot-matrix only for the ambient canvas** as the signature flourish. That's "Linear bones, Apple touch, one TE party trick."

---

## 2. Signature moves to steal (ranked by impact)

1. **The unified per-type quick-control component** *(Lens 3 "QuickControls" / Lens 1 "bloom" / Lens 2 "command popover")* — one component rendered at two densities (compact in menu, full in Sheet): light → brightness + warm↔cool ribbon + scene swatches; climate → setpoint stepper + mode pills; cover/media/lock equivalents. **Why amazing:** fixes the three biggest interaction gaps in one build and makes control feel instant and consistent. *Highest leverage in the whole set.*
2. **Drag-to-set: the tile IS the slider** *(Lens 1)* — vertical tinted fill inside the tile *is* the brightness/position value; drag anywhere to set, tap to toggle, tabular % floats top-right. **Why amazing:** density goes up while chrome goes down — the value visualization and the control are the same pixels. Replaces the timid 4px hairline slider.
3. **Two-tier semantic color system** *(all 7, cleanest in Lenses 1, 3, 6)* — fixed category hue for identity + state-tint only when active. **Why amazing:** it's the difference between "designed" and "random," and it's what makes the screen read as a live map of the home.
4. **The living color field** *(Lens 6 / Lens 5 dual-pole)* — canvas driven by light-warmth + climate + a sun-interpolated base, transitioning over ~600ms. **Why amazing:** the app is alive *before content loads* — the §3 promise finally kept.
5. **Sparkline wall + one crosshair, every scale** *(Lens 2 / Lens 6)* — every numeric metric is a chart cell with value + signed delta + in-band band; the *same* crosshair scrub works on a 64px spark and the full graph. **Why amazing:** this is the TradingView identity made literal and it's gorgeous density.
6. **The Powerwall flow-node** *(Lens 5)* — diamond of glowing nodes, directional dots whose speed scales with kW, ring gauges per node, net draw as the hero numeral. **Why amazing:** the single most distinctive object no Lovelace/Apple/Google Home has. *Reserve for real-home data; it's the "wow."*
7. **Long-press bloom** *(Lens 1)* — long-press springs the tile into its native control studio (color wheel / temp dial / transport), inheriting the tile's live tint; the meta-action text menu shrinks to overflow. **Why amazing:** the most-loved HA-community pattern (Bubble Card), done with real depth.
8. **Surfaces as lit frosted glass, not boxes** *(Lens 7 / Lens 1)* — retire `1px solid --faint`; depth from an inset top-highlight + ambient drop + inner state-glow. **Why amazing:** removes the "grid of widgets" read at the composition layer, not just the tile.
9. **Album-art-aware media tile** *(Lens 1)* — playing media extracts the dominant album color as its live tint and whispers it into the canvas. **Why amazing:** cheap, magical, instantly "this is *my* home right now."
10. **Cluster ring-gauge primitive** *(Lens 5)* — one circular gauge reused for the climate dial, battery SoC, humidity, and a top-of-Home "house cluster." **Why amazing:** force-multiplier — one premium primitive powers Climate + Power + the Home summary.
11. **Conditional escalation** *(Lenses 1/2/3/6)* — an "Attention" block *mounts* only when a lock is open / leak detected, then vanishes; all-clear collapses to one quiet line. **Why amazing:** calm by default, loud exactly when it matters (§3/§6).
12. **The dot-matrix ambient canvas** *(Lens 4, scoped down)* — the Home background as a dim 5px-pitch dot field that brightens/warms by aggregate state; a wall-tablet "status wall" you read across the room. **Why amazing:** the one ownable flourish — pure CSS radial dots, 60fps, motion-minimal.

---

## 3. Fix each current issue

**I1 — looks generic.**
→ **Strongest (Lens 6 + 7):** stack three moves — (a) the **living color field** replaces the static glow; (b) surfaces become **lit frosted glass** (drop every `1px solid --faint`, depth via inset highlight + inner state-glow); (c) every category leads with **one true hero** (lights→dial, climate→dial, power→flow-node) so weight is asymmetric, never a uniform run of rows. Add the type rhythm (11px label / 13px body / 44px-300 hero, tabular everywhere).
→ *Alt (Lens 4):* the "machined faceplate" — engraved grooves + monospace silk-screen labels + dot-matrix; more ownable, but fights §8.

**I2 — context menu extends to infinity.**
→ **Strongest (consensus, all 7 diagnose it identically):** root cause is `.simui-ctxmenu` has `min-width` but **no `max-width`**, items are `width:100%`, and `.simui-ctxgroup{display:contents}` removes the width-bounding box → the body-portaled flex menu balloons. **Fix:** `width: max-content; min-width: 200px; max-width: min(280px, calc(100vw - 16px)); box-sizing: border-box;` + `.simui-ctxlabel { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; min-width:0 }` + `.simui-ctxitem { min-width:0 }`; drop `display:contents`; keep the `useLayoutEffect` viewport clamp but **measure after width is constrained**. Then beautify as the quick-control popover (radius 16–18, frosted surface, 8px rows, hairline before the danger group).
→ *Alt:* same bounds, plus a header readout row (entity + live state + sparkline) to make it a real command surface (Lens 2/4).

**I3 — light has no color/temp/scene control.**
→ **Strongest (Lens 1/3):** light long-press/menu opens the quick-control rack — **HSV color wheel** (if `supported_color_modes` includes color) + a **warm↔cool ribbon** `#ffb46b→#fff4e6→#cfe0ff` mapped to mireds→`color_temp_kelvin`, a large **vertical brightness fill** (drag-to-set, tabular %), and a row of **4–5 scene/preset swatches** (`scene.turn_on` / preset brightness). Same component, compact in the menu, full in the Sheet.
→ *Alt:* skip the wheel for a 5-swatch recent/preset row + ribbon (faster to ship, covers 90% of use).

**I4 — climate is display-only.**
→ **Strongest (Lens 5 + 3):** the bug is structural — the climate hero renders through `HeroBlock`'s read-only `current_temperature` branch and zones fall through `EntityRow`'s generic "show state" case. Fix the hero to a **draggable ring dial** (270° arc min→max, knob snapped to `target_temp_step` → `climate.set_temperature`; dual-thumb for `heat_cool` low/high; arc tinted by `hvac_action` — warm heating / cyan cooling) + an **icon mode segmented control** from the curated `hvac_modes` (`climate.set_hvac_mode`). Make zones render `ClimateTile` (which already has the stepper + modes) with a compact `−/target/+` on the tile.
→ *Alt:* skip the dial, ship the `−/[target]/+` stepper + mode pills inline on both hero and zones (lower effort, fully controllable).

**I5 — security cramped.**
→ **Strongest (Lens 1/5/6):** promote from micro-rows to a **presence-first status board** — 2-up phone / 3–4-up desktop squircle tiles (~96px): 22px lucide glyph, 17px status word ("Locked"/"Closed"/"Clear"), and the existing `StateLine` recency ("· 2h ago"). State drives tint: secure = calm, **open/unlocked = amber→red glass + soft halo**. Alarm becomes a **full-width hero** with inline arm-mode segmented control. Collapse all-clear sensors into one "All 14 clear" row; break out individually only when tripped; surface a conditional "Needs attention" strip on top.
→ *Alt:* keep rows but enlarge to 56–64px, add recency + lock/unlock control inline, sort unsecured to top with amber tint.

**I6 — sensors are plain rows.**
→ **Strongest (Lens 2/6):** **sparkline wall** — each numeric sensor is a cell: name, big tabular value + dimmed unit, full-width 56–72px `lightweight-charts` area spark (y zoomed to the meaningful band, *not* 0), a signed colored delta, and a faint **in-band threshold zone** (humidity 40–60%, CO₂ <1000) that tints amber when out of band. Group by `device_class` with a per-quantity hue; lead with 2–3 overview charts when ≥8 sensors. Smart-click → full chart with crosshair + 24h/7d/30d. **Swap the 40-point buffer for the real history API.**
→ *Alt:* inline 64×22 sparkline beside each value row (lighter than full cells, still data-viz).

**I7 — power chart incoherent.**
→ **Strongest (consensus semantics):** one **merged dual-axis chart** with *fixed* series colors — **solar/gen = green area fill ~0.22** under the line; **load = amber 2px line**; **grid import = red / export = green** signed; **battery SoC = blue on the right 0–100% axis**. Required colorized header: `Solar 2.4 kW · Load 3.1 kW · Net −1.2 kW` (tabular). Y-axis in real W/kW zoomed to the active band; faint gridlines; crosshair. Below it, the per-circuit sparkline wall. *Kill the near-black-on-dark line.* On real-home data (Powerwall + solar), promote to the **flow-node hero** above the chart; degrade cleanly to home-draw-only on the demo (Lens 5).
→ *Alt:* same color law without the flow-node — the dual-axis chart alone fully fixes coherence.

**I8 — color underused/inconsistent.**
→ **Strongest (all 7 agree):** ship the **two-tier token system**. Category-identity (nav glyph+halo, NavPill, surface hero, chart primary *only*): Lights amber, Climate teal (heat-red/cool-cyan sub-modes), Media violet, Security green, Sensors cyan, Power amber, Scenes pink, System slate. State-semantic (active-only): warm=on/heat, cool=cooling/active, up=good/gen, down=alert, warn=attention. Idle/structural stays monochrome; fills via `color-mix(hue 8–10%, surface)`, full hue on icons/strokes; **≤1 category hue visible per surface.** Encode as CSS vars that fall back to `hass.themes`.
→ *Alt:* identical roles, fewer hues (merge Power into Lights-amber, System into muted) if 8 feels noisy.

---

## 4. Proposed palette + type + material system (one coherent identity)

Synthesizes the recurring values across all seven (they're remarkably close — these hexes are the median). Keeps the existing near-black base so it's a refinement, not a rewrite.

**Base — dark, layered (depth from light, not borders):**
```
--bg          #0a0b0d   canvas
--surface     #15171c   a true object (chart, media, menu)
--surface-2   #1b1e25   nested / control
--group       rgba(255,255,255,.035)   quiet borderless group
--text        #edeef2
--muted       #8a909c
--hairline    rgba(255,255,255,.06)    dividers + inset top-highlight
```
**Material (the "lit glass" recipe — use sparingly, reserve real blur for menus/Sheets):**
```
surface glass : color-mix(in srgb, var(--text) 4%, transparent)
bezel         : inset 0 .5px 0 rgba(255,255,255,.08), 0 1px 0 rgba(0,0,0,.30)
active tile    : + color-mix(in srgb, var(--state) 8–16%, surface)   (opacity tracks value)
radius         : surfaces/sheets 18–20px (continuous squircle) · controls 8–9px · gauges circular
```
**State semantics (apply ONLY when active):**
```
--warm  #ffb267  on / heating
--cool  #5ec8e6  cooling / active   (--accent #5b8cff for interactive/focus)
--up    #3fd08a  good / generating / secure
--down  #f0735e  alert / importing
--warn  #f0a84b  attention (unlocked / out-of-band) — the one color allowed to breathe
```
**Category identity (nav glyph + halo, NavPill, surface hero, chart primary — nowhere else):**
```
Lights #ffb267 · Climate #34c0a8 (heat #ff8f6b / cool #5ec8e6) · Media #a78bfa
Security #3fd08a · Sensors #5ec8e6 · Power #ffb454 · Scenes #ec8fb8 · System #7c93c8
```
**Color-temp ribbon (light controls):** `#ffb46b (2200K) → #fff4e6 (4000K) → #cfe0ff (6500K)`.

**Type (system/SF stack; Inter/Geist acceptable; sentence case; tabular-nums on *every* value):**
```
label  11px uppercase +0.6 tracking --muted   (the only caps, per §8)
meta   12px · body 13px/500 · value 22–26px
hero numeral  clamp(44px, 8vw, 60px) weight 300, -0.02em, tabular — light against the glow
```
**Icons:** Lucide 16–22px, stroke 2, inherit `--state` when active else `--muted`.

**Usage law (the rule that keeps it tasteful):** a value is colored only if it's *active*, *signed*, or *out-of-band*; everything structural is monochrome; ≤1 category hue per surface; no static color fills.

---

## 5. Phased plan

**Phase 0 — Foundation tokens (½ day, unblocks everything).**
Ship the two-tier CSS variable system (§4) with `hass.themes` fallback. No visual change yet, but every later phase reads from it. *This is the prerequisite for I8 and all category surfaces.*

**Phase 1 — Quick high-impact wins (the "it already feels better" pass).**
- **Fix the context-menu infinite box (I2)** — pure CSS + one `useLayoutEffect` tweak; highest ROI bug in the app.
- **Build the unified QuickControls component** and wire it into the menu + Sheet — instantly fixes **I3** (light color/temp/scene) and **I4** (climate setpoint/mode) together.
- **Power color law (I7)** — recolor the existing dual-axis chart to fixed semantics + colorized header. No new object, immediate coherence.
- **Kill `1px solid --faint`** default and lead each category with one hero (first cut of **I1**).

**Phase 2 — Surfaces become data-viz + right-sized (the "this is premium" pass).**
- **Sparkline wall for Sensors + Power (I6)**, swap to the **real history API**, add smart-click → full chart with crosshair (one shared component).
- **Security status board (I5)** + conditional "Attention" escalation.
- **Drag-to-set tiles** and the **living color field** (real §3 ambient) — the two moves that flip the whole app from "competent" to "alive" (finishes **I1**).

**Phase 3 — Signature delight (the "wait, HA can look like THAT?" pass).**
- **Long-press bloom** quick-control studio (color wheel / temp dial).
- **Powerwall flow-node** on real-home data (gate behind solar/battery detection; degrade gracefully).
- **Album-art-aware media tint** + a whisper into the canvas.
- **The dot-matrix ambient canvas** for the wall-tablet preset — the one ownable flourish — and/or circadian + presence-aware field.

**Sequencing logic:** Phase 1 is mostly CSS + one shared React component and fixes 4 of 8 issues in days; Phase 2 needs the history API and chart work; Phase 3 is the differentiator you ship once the bones are unimpeachable. Decide the **surface-personality fork (A/B/C)** before Phase 2's tile work, and the **flow-node-vs-chart fork** before Phase 3 — Phase 1 is identical under all of them, so you can start now.
