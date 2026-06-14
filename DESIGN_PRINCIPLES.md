# simUI — Design Principles

The contract for how simUI looks and feels. Every screen, component, and change is
measured against this. When a decision is unclear, these principles win over convenience.

> **North star:** simUI should feel like *a place*, not a feed of widgets — minimalist,
> genuinely beautiful, integrated, and premium. Show the *right* information, not the most.
> Lineage: **Linear** (restraint, calm), **Apple / Apple Home** (cards done well, but we
> fix their flat density), **TradingView** (precise, legible data).

---

## 1. Compose, don't tile — the card is a *primitive*, not the layout

A uniform grid of identical bordered boxes reads as "list of widgets," never as a place.
It is the ceiling that makes Lovelace, Google Home, and even Apple Home feel competent but
not premium.

- A **card** is the right answer only when something is a genuine *object* — a now-playing
  player, a chart, a camera. Then a card *means* something.
- Everything else is composed from quieter elements: heroes, groups, lists, and the
  ambient canvas. **Reserve the card treatment; don't default to it.**
- **The compose mechanism, validated on a real dashboard:** a *section heading* followed by a
  run of quiet rows *is* a group — no panel, no border; the structure is typography. The one
  legitimate exception is a **camera video wall**, where the stream content *is* the card. See
  [`INSPIRATION.md`](INSPIRATION.md) and the block contracts in [`FRAMEWORK.md`](FRAMEWORK.md).

## 2. The room is the surface

A room is not N cards — it is **one cohesive region** with internal hierarchy. Lights,
climate, and locks live *inside* a unified surface that shares a background, with one
primary element and quieter secondary ones.

- The **area/room is the primary unit** of the dashboard.
- Group by meaning. A "Lighting" group is one surface with a master + quiet rows — not four
  separate light cards.

## 3. The ambient canvas — the background is alive

The background is not a neutral slab that cards float on. It is a canvas that **reflects
state**: warm when lights are on, cooler at night, shifting with time / weather / presence.

- Content sits *on* and *in* the canvas — embedded, not pasted.
- Ambient light is how we create depth — **not** drop shadows or heavy elevation.

## 4. Minimize chrome

Borders + gaps on everything is the "card next card" failure. Separate elements with
**whitespace, hairlines, and typography** instead.

- Most things are **borderless rows or quiet groups**. A visible box is the exception that
  signals "this is a discrete object."
- Hairline dividers (`~6% white`) over boxes for lists. One subtle surface to hold a group,
  not a box per item.

## 5. Compose with varied weight

Premium layouts are **deliberately asymmetric**: a hero element, supporting elements,
varied sizes. The uniform repeating grid is exactly what reads as mechanical.

- Give the most important thing the most space and the quietest chrome.
- Vary element size and density on purpose; never repeat one tile shape down the page.

## 6. Density of meaning, not pixels — progressive disclosure

"Information density" means **the right information is glanceable**, not that everything is
crammed on screen.

- Each element shows the one thing that matters at a glance; detail appears on interaction.
- Put ambient summary in the frame ("21° · 3 lights on · all locked"), not in a card.

## 7. Color & light

Dark-first. **Monochrome base + a single accent.** Color is reserved for *state and
meaning*, never decoration.

- `warm` = a light is on / heating. `accent` (cool blue) = cooling / active / interactive.
  `amber` = attention (e.g. a door unlocked). `up`/`down` = positive/negative deltas.
- When embedded, inherit Home Assistant's theme variables; the palette below is the
  fallback / standalone default.
- Two reserved roles: a **state accent** (the single accent, applied *only* when an entity is
  on/active — the Apple-Home tint) and a **categorical accent** (a fixed per-category color for
  navigation only). Static color elsewhere is decoration — avoid it. Detail: [`FRAMEWORK.md`](FRAMEWORK.md) §7.

## 8. Typography

- Clean sans (system / SF-like; Inter or Geist acceptable). Sentence case everywhere — never
  Title Case, never ALL CAPS except small uppercase labels.
- **Tabular numerals on every value** (`font-variant-numeric: tabular-nums`) so digits don't
  jitter as state updates. This is a core part of feeling "precise."
- Restrained weights (400 / 500, 600 sparingly). Hero numerals are large and *light* with
  tight negative letter-spacing.

## 9. Data & charts — TradingView-grade

Charts are first-class, not afterthoughts: thin precise lines, a subtle area fill, faint
gridlines, a crosshair value readout, tabular axes. Use TradingView's open-source
`lightweight-charts` for history/energy. A chart *is* an object → it earns a card.

- The current value, colorized, belongs in the chart **header** — a glance readout, not
  decoration; it is **required**, not optional. A compact sparkline is the glance tier; the
  full chart is the smart-click *expand* tier (selectable 24h/7d/30d range).
- Generation and consumption share **one merged Power chart** (dual-axis), not separate views.
  Contract: [`FRAMEWORK.md`](FRAMEWORK.md) §5.

## 10. Iconography

**Lucide** — clean, SF-adjacent, consistent stroke width, inline (not boxed). Icons inherit
color from state (warm / cool / amber / muted). Never decorative; an icon clarifies or it's
removed.

## 11. Motion

Subtle, fast, purposeful (Linear-like). State changes are *felt*, not announced. No bouncy,
attention-seeking animation. Transitions ~120–180ms, eased.

## 12. Defaults & customization

- **Never dump the entity registry.** Defaults are generated **per room and per category**
  with a curated set of key entities — preferring group/aggregate entities — useful and quiet
  out of the box. Presets are editable starting points: [`PRESETS.md`](PRESETS.md).
- Customization uses a richer vocabulary than "card": **hero / group / list / card /
  ambient-layer**. The user composes and arranges *regions*; the system keeps it cohesive.
- Bias toward curated composition over infinite freeform; premium beats maximally-fiddly.
- **Graceful degradation is a design rule:** every surface must look right whether a domain
  has 3 entities or 280 (auto column count; aggregate when many). A layout that only works on
  a huge home is a bug — simUI is a framework for *other people*, not one home.

## 13. Performance is a design property

Smoothness is part of "premium." Lag breaks the ambient illusion.

- **Per-entity subscriptions:** an element re-renders only when *its* entity changes — never
  re-render the whole dashboard on every state tick.
- The ambient canvas and live updates must stay at 60fps; treat jank as a design bug.

---

## 14. Navigation & interaction

- **No in-app sidebar.** simUI is an HA panel; HA already owns the left sidebar — a
  second one is wrong. Navigation lives in the panel's top / summary chrome.
- **Land on a Home summary, not a card grid.** Status strip → scenes/favorites →
  a rooms strip → an "Everything" categories list. The menu is integrated chrome
  (lists / chips), never a grid of tiles.
- **Two axes:** by room, and by device category — Lights, Climate, Media, Security,
  Sensors, Energy, Power & outlets, System, Scenes. Each category is a *composed*
  view ("all your lights, grouped by room"), not a card grid.
- **Tap = a native Sheet** (bottom sheet on phone, popover on desktop) with the
  entity's full controls. Glance on the surface; depth in the sheet.
- **Right-click / long-press = a context menu** of relevant actions; **smart-click
  expands** (a chart → a full detailed chart). Disclosure is layered:
  glance → tap (sheet) → context / expand.
- **Adaptive:** one tree re-flows — top nav ⇄ tab bar, popover ⇄ bottom sheet,
  multi-column ⇄ single.

---

## Do / Don't

**Do**
- Start from the room and compose down into it.
- Use whitespace, hairlines, and type for separation.
- Let the background carry state and mood.
- Reserve cards for true objects (media, charts, cameras).
- Use tabular numerals and a single accent.

**Don't**
- Default to a grid of identical bordered boxes.
- Put a border + gap around every entity.
- Use color for decoration, or more than one accent.
- Add an entity to the dashboard "because it exists."
- Re-render everything on every state change.

---

## Design tokens (current defaults)

Fallback palette when not inheriting HA's theme. Dark-first, layered near-black.

```
--bg:        #0a0b0d   /* base canvas */
--surface:   #15171c   /* solid surface (a real card/object) */
--surface-2: #1b1e25   /* nested / control surface */
--group:     rgba(255,255,255,0.035)  /* quiet group surface on the ambient canvas */
--text:      #edeef2
--muted:     #8a909c
--faint:     rgba(255,255,255,0.06)   /* hairlines, dividers (≈ #23262e solid) */

--accent:    #5b8cff   /* interactive / cooling */
--warm:      #ffb267   /* light on / heating */
--up:        #3fd08a   /* positive delta */
--down:      #f0735e   /* negative delta */
--warn:      #f0a84b   /* attention (e.g. unlocked) */

ambient glow (lights-on, evening):
  radial-gradient(120% 75% at 22% -8%, rgba(255,178,103,0.13), transparent 55%)

radius:  groups/objects 18–20px · small controls 8–9px (continuous/squircle feel)
type:    label 11px (uppercase, +0.6 tracking) · meta 12px · body 13px ·
         value 22–26px · hero numeral 40–46px weight 300, tight tracking
icons:   Lucide, 15–18px, stroke 2
```

*These principles are the source of truth for look and feel. `AGENTS.md` summarizes the
project; [`FRAMEWORK.md`](FRAMEWORK.md) specifies the primitive contracts; [`PRESETS.md`](PRESETS.md)
the template gallery; [`INSPIRATION.md`](INSPIRATION.md) the real-world evidence behind them.*
