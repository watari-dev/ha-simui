# simUI Repair & Apple‑Home Redesign Plan

> Direction: lean harder into **Apple Home** (card language + top‑of‑home status
> highlights) and **Minimalist‑UI / Mushroom** (chip + tint discipline). Fix the
> broken interactions first, then restyle. Everything stays **user‑editable** and
> **token‑driven** per [CLAUDE.md](CLAUDE.md) / [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md).

This plan was produced by a parallel audit (7 diagnosis agents + 3 design‑research
agents) **and cross‑checked live** against the running dev app. Phase 1 stops the
bleeding; Phases 2–4 are the redesign. Ship in order; §6 flags what parallelizes.

---

## 0. Live verification (what was reproduced in the running app)

| Symptom | Repro in dev? | Reality |
|---|---|---|
| Right‑click menu "far left" | **No — works perfectly** (lands exactly at cursor, `position:fixed`, no transform‑breaking ancestor) | **Embedded‑in‑HA only.** Fix must target the containing‑block origin, not the clamp math. |
| Edit chrome broken / "at the bottom" | **Yes** | `.simui-etb-anchor` is `position:fixed; inset:0` **and reuses `.simui-root`, inheriting opaque `background:var(--bg)` → a full‑screen scrim hides the surface**; the bar stretches to 342×688px and docks to an edge. |
| Add‑card "see‑through / can't read / spacing" | **Readable in dev**; previews blank | See‑through is **embedded‑only** (translucent HA theme token values). Blank previews + bad spacing **do** repro in dev (below). |
| Light cards "horrible" | **Yes** | Muddy brown brightness‑**fill block** with a hard horizontal seam; not Apple Home's soft tint. |

One correction the agents nailed with hard evidence (grep of the **built** bundle):
simUI uses **no shadow DOM** (`this.appendChild`, not `attachShadow`), so the stylesheet
is document‑global. The shared overlay bug is therefore **not** a stylesheet‑escape — it's
that design tokens live on the **class** `.simui-root`, and overlays re‑add that class to
get tokens, which also drags in `background`/`min-height` side‑effects.

---

## 1. Root causes at a glance

| # | Issue | Root cause | Sev | Effort |
|---|---|---|---|---|
| **R0** | **Overlay token/layout coupling** (shared) | Tokens declared on class `.simui-root` ([styles.css:4](src/styles.css)), not `:root`. Body‑portaled overlays re‑add `.simui-root` for tokens → also inherit `min-height:100%` + `background:var(--bg)` + `color`. Substrate under R1/R2/R3. | high | S |
| **R1** | Right‑click menu jumps far left | Body‑portaled `position:fixed` menu resolves `left=clientX` against a transformed/contained HA ancestor, not the viewport. Clean in dev (verified). | high | S |
| **R2** | Edit chrome floats at edge / scrims surface | `EditorToolbar.css` `.simui-etb-anchor` is `position:fixed; inset:0` reusing `.simui-root` → opaque scrim + edge‑docked stretched bar. Spec wants it **in the surface header**. | high | M |
| **R3** | Add‑card see‑through + empty previews | (a) Panel paints `background:var(--surface)`; HA themes make `--surface` translucent → modal see‑through. (b) `.simui-gallery-grid` default `align-items:stretch` + preview `flex:0 1 auto` → the 116px preview frame collapses to ~48/22px and clips the live block. Both confirmed live. | high | S |
| **R4** | Light cards look generic | Default registry maps `light → LightTile` (a raw native `<input type=range>`), not the premium `SliderTile`. Active tint only ~7%; no value hierarchy; flat icon. | high | M |
| **R5** | Missing / weak top highlights | Only Lights/Fans pills; no Climate/Security/Media. Count pills are **inert** (no `onTap`). Strip is visually recessive on Home. | high | M |
| **R6** | Systemic visual drift | No spacing/radius/elevation token layer: 16 gap values, 14 radii, 11 elevation recipes, 4 bezel alphas, hard borders the spec says to retire. | high | M |

> **Fix once, resolves several:** R0 underlies R1/R2/R3. Do R0 first.

---

## 2. Phase 1 — Stop the bleeding (bug fixes)

### 1.0 — Shared root cause (R0): tokens → `:root, :host`
**File:** [styles.css](src/styles.css)
- Move all custom‑property declarations out of `.simui-root { … }` (the token block + the `--focus-ring` decl) into a `:root, :host { … }` block at the top. The HA‑theme fallbacks (`var(--primary-background-color)` etc.) still resolve — they come from HA's own `:root`.
- **Leave** non‑custom props (`color`, `background`, `min-height:100%`, `font-family`, `.simui-root * { box-sizing }`) on `.simui-root` so the app container still paints, but portals no longer inherit them.
- Add `:host` now (harmless in light DOM) to de‑risk a future shadow‑DOM pivot.
- Then **drop `simui-root` from the four portal wrappers** (`ContextMenu`, `Sheet`, `CardGallery`, `TemplateGallery`) — tokens now come from `:root`, so the wrappers stop inheriting the `background`/`min-height` footgun. Delete the now‑dead `.simui-ctxmenu { min-height:0 }` patch.
- **Verify:** open gallery + menu; then `document.body.style.setProperty('--card-background-color','rgba(255,255,255,0.05)')` and confirm tokens still resolve.

### 1.1 — Right‑click position (R1)
**File:** [ContextMenu.tsx](src/components/ContextMenu.tsx)
- In the measure `useLayoutEffect`, set `left:0; top:0`, read `rect`; `rect.left/top` is the negative containing‑block origin. Then `left = nx - rect.left`, `top = ny - rect.top` (clamped `clientX/clientY`). No‑op when the containing block is the viewport (dev), correct when an HA ancestor is transformed.
- Belt‑and‑suspenders: also portal the menu into the panel's own mount (keeps CSS + tokens in‑tree regardless of HA wrapping).
- **Verify:** dev no‑op at all four edges; **requires embedded HA verification** in the PR.

### 1.2 — Gallery: opaque panel + visible previews (R3)
**File:** [CardGallery.css](src/editor/CardGallery.css)
- **Opaque:** layer an opaque base under the maybe‑translucent surface on `.simui-gallery`, `.simui-gallery-head`, `.simui-gallery-card`:
  `background-color: var(--bg); background-image: linear-gradient(var(--surface), var(--surface));` (hard `#0a0b0d` fallback if a theme also makes `--bg` translucent).
- **Previews:** `.simui-gallery-grid { align-items: start; }` + `.simui-gallery-preview { flex: none; }` — restores the 116px frame so the live `BlockBody` shows (validated live: preview 116px, card 175px).
- **Verify:** open gallery — opaque panel, all ~23 previews render full‑height with uniform spacing.

### 1.3 — Edit chrome → inline top bar (R2)
**Files:** [EditorToolbar.css](src/editor/chrome/EditorToolbar.css), [EditorToolbar.tsx](src/editor/chrome/EditorToolbar.tsx), [HomeView](src/dashboard/HomeView.tsx)/[RoomView](src/dashboard/RoomView.tsx)/[CategoryView](src/dashboard/CategoryView.tsx), [EditorOverlay.tsx](src/editor/EditorOverlay.tsx)
1. **CSS:** delete the fixed `inset:0` anchor + its `@media(min-width:720px)` edge override. Make `.simui-etb-anchor` `position:static; display:flex; padding:0; pointer-events:auto`. Drop its `.simui-root` class (kills the opaque scrim). Drop `box-shadow`/`backdrop-filter` from `.simui-etb` — it now sits in the solid `--bg` header.
2. **Render in the header:** in each view's `<header className="simui-head">`, while `editor.active`, render the `.simui-etb` group (Undo/Redo/Add/Saved/Done) after `<span className="simui-spacer"/>`. The existing `.simui-head` flex lays out `back · title · spacer · controls`.
3. **De‑dupe:** remove `<EditorToolbar/>` from the `EditorOverlay` fragment so it's not double‑mounted.
4. **One Done:** consolidate the per‑view pencil→check toggle with the toolbar's Done.
5. Re‑point `OnboardingHint` copy to the top header.
- **Verify:** edit mode on Home/Room/Category shows inline controls in the top header; check 390px phone fit (existing 440px rule drops the "Saved" label); kiosk still hides `.simui-head`.

---

## 3. Phase 2 — Apple Home card language (tile / light redesign, R4)

North star (Apple Home × Mushroom): **one `--tile-color` driver**, tint the **icon disc**
+ a *faint* card lift, color **only when active**, squircle radius, tabular values,
vertical‑slider‑first on expand.

1. **Wire the good tile as default** — [widgets/index.ts](src/widgets/index.ts): `light → SliderTile` treatment (remap, or make `LightTile` a thin wrapper). Keep LightTile's dead‑device branch.
2. **The tile is the slider** — remove the native `<input type=range>`; brightness = a tinted fill rising from the tile base, draggable anywhere. No OS thumb.
3. **Active tint (single driver)** — `--tile-color = active ? stateColor : neutralGrey`:
   - Icon disc: fully round ~36px, bg = `--tile-color` @ **0.18–0.20α** (0.35 hover); glyph at full `--tile-color`, ~18–24px.
   - Card lift: `--tile-color` @ **0.04–0.08** over `--surface` — a wash, **don't flood**.
   - Off/idle: `--tile-color` = neutral grey, **zero** color. Maximum on/off contrast.
   - Per‑domain state color: light=`--warm`, climate=by hvac_action, security=`--up`/`--down`, media=`--accent`.
   - **RGB contrast clamp (required):** `rgb_color → HSV`, clamp S/V so pale/near‑white bulbs don't wash out.
4. **Value hierarchy** — brightness % is the headline (18–20px / 600 / tabular, `--text` when on); name demoted to 12–13px / 500 muted; "Off" muted in the headline slot when off. Single‑line ellipsis (3 → 280 lights).
5. **Radius / spacing / motion** — card → **18px** squircle; icon disc fully round; min‑height ~92px; fill ~0.04s linear during drag, tint **280ms ease‑out**. Reserve pulse for alert states only.
6. **Split‑action gesture (design now, wire as available)** — icon disc = toggle in place; body/name = open Sheet; long‑press/right‑click = context menu. The detail Sheet is the tile's own language scaled up + a **tall vertical** brightness slider + color/temp pickers.

**Mandatory:** every value (tint α, radius, which domains use slider) stays a token/prop — never hard‑coded per preset. Tile must look right with 3 or 280 entities and with a missing brightness attribute (fall back to on/off). **Watch:** lit‑tile warm tint vs the warm ambient canvas — raise disc α (not card‑lift α) if lit tiles vanish in evening mode.

---

## 4. Phase 3 — Top‑of‑home highlights (R5)

An always‑present, prominent, **tappable** highlights band above the priority feed — Apple
Home's status sections, each a live `useAggregate` navigating to its filtered category view.
**Files:** [presets/home.ts](src/dashboard/presets/home.ts), [SurfaceStrip.tsx](src/dashboard/SurfaceStrip.tsx), [StatusStrip.tsx](src/components/StatusStrip.tsx), [presets/index.ts](src/dashboard/presets/index.ts), [styles.css](src/styles.css), [HomeView.tsx](src/dashboard/HomeView.tsx)

**Mandatory on every aggregate:** exclude `state==='unavailable'` from numerator *and*
denominator (this home: 126 unavailable lights, 142 media, ~1500 sensors).

| Chip | Aggregation | Label |
|---|---|---|
| **Lights on** | `light.* && state==='on'`; denom = lights not unavailable | "{n} on" — warm when n>0 |
| **Energy/Power** | single entity, **not** the 113 circuit sensors: `sensor.powerwall_load_now` → `…solar_now` → `…charge` → `…site_now` | "4.5 kW" — `warn` if importing |
| **Climate** | `climate.* && state ∉ {off,unavailable}` (2 of 7 are fan dupes; real zones = 4) | "{n} on" / "Climate idle" |
| **Security** | **always visible**: `alarm_control_panel.alarmo` (not the UNVR mirror) + `lock.* unlocked` (drop `/helper$/i`) | "Secure"/up vs "{n} open"/warn |
| **Speakers** | `media_player.* && /sonos\|homepod/i && state==='playing'`, dedupe `_(roon\|\d+)$` | "{n} playing" |
| **TV** (conditional) | `/apple_tv\|tv/i && state ∈ {playing,on}`, deduped — render as conditional badge | "TV playing" |
| **Fans** (secondary) | `fan.* && state==='on'` | "{n} on" |
| Garage/door open | keep as **conditional hero**, not a strip pill | — |

**Wire tap‑through (structural — fixes all surfaces):** extend the `'count'` StripPill variant
with `path?` + `accent?`; `SurfaceStrip.CountPillBound` passes `onTap={() => run({action:'navigate', path})}`;
`StatusStrip.CountPill` already supports `onTap`/active tint. **Layout:** dedicated band, ~44–48px
pills, value 18–20px tabular, Apple active‑tint when count>0, **wrap to 2 rows on phone**; remove the
`.simui-home-layer` near‑transparent override **for this band only**; delete the redundant `HouseGlance`;
add a `pluralise()` helper.

> **Thin spot:** `category.media` has no preset builder yet — tapping Media lands on a sparse
> auto‑surface. Track a follow‑up `presets/media.ts`; not blocking.

---

## 5. Phase 4 — Visual system polish (R6)

Visual‑only refactor: add a real token layer at the top of [styles.css](src/styles.css), then
refactor call sites. **No logic change.** Do one family at a time, eyeballing Home/Lights/Sensors/Power/Sheet/menu after each.

1. **Spacing (4px base):** `--s-1:4 … --s-6:24`. Snap 16 ad‑hoc gaps + ~30 paddings to nearest step. Target ≤6 gaps, ≤8 padding shapes.
2. **Two‑tier radius:** `--r-surface:18 / --r-control:9 / --r-pill:999 / --r-sheet:20`. Map all card/tile/roomcard/metric/slidertile → surface; all seg/fsel/search/iconbtn → control. Delete standalone 7/10/11/12/13/14/16.
3. **Elevation + bezel tokens:** `--surface-raised` (text 4% / surface), `--surface-hover` (7%), `--bezel: inset 0 .5px 0 rgba(255,255,255,.08)`. Replace all 11 mixes + 4 bezel alphas.
4. **Palette/role:** fix `--muted` `#838996 → #8a909c`; point `.simui-ic.cool` at `var(--cool)` not `--accent` (reserve `--accent` for interactive/focus).
5. **Retire hard borders** (biggest lever on "ugly boxes"): replace `1px solid var(--faint)` on search/seg/fsel/ftoggle/scene‑tile/surface.card/pill.active with `--surface-raised` + `--bezel`. Keep 1px only on true object boundaries (sheet/modal/ctxmenu/conn‑banner).
6. **Type tokens:** `--fz-label:11 / --fz-meta:12 / --fz-body:13 / --fz-value:22 / --fz-hero:44`; one `.simui-hero-num`. Reconcile the 5 divergent big‑number treatments onto value/hero; drop 30px/400 and 46px.
7. Mark these canonical in [DESIGN_DIRECTIONS.md](DESIGN_DIRECTIONS.md) §4.

---

## 6. Sequencing & risk

**Ship order:** R0 → (R1 + R3 together) → R2 → **Phase 4 tokens** → **Phase 2 tiles** (consume the new tokens) → **Phase 3 highlights** (parallel with Phase 2; different files).

**Riskiest:**
- **R0** — additive for the app subtree; re‑test ctxmenu clamp once it no longer inherits `min-height:100%`; confirm `[data-kiosk]`/narrow selectors still key off `.simui-root[data-…]`.
- **R4 default‑tile swap** — `SliderTile` is reused via `tile:'slider'`; verify dense list/GroupBlock composition; keep the dead‑device branch.
- **Phase 4 border/radius sweep** — don't land a control on a surface radius or flatten a true boundary; review dense rows for cramping after the 4px snap.
- **R5 security "always‑visible"** — behavior change from hide‑when‑locked; confirm against the noise‑curation gate (no diagnostic/helper locks).

**Embedded‑only verification:** R1 (and the embedded see‑through) can only be confirmed inside
HA — require an embedded check in those PRs.
