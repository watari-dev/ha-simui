# simUI — Framework primitives & contracts

The **fundamental framework** is the real deliverable ([`AGENTS.md`](AGENTS.md)): a small,
legible set of blocks + a leaf widget + a binding model. Get the primitives right and presets
become *data* ([`PRESETS.md`](PRESETS.md)); editing becomes safe and approachable. These
contracts are derived from real-world evidence ([`INSPIRATION.md`](INSPIRATION.md)) and must
obey the look-and-feel rules in [`DESIGN_PRINCIPLES.md`](DESIGN_PRINCIPLES.md).

> Each section gives the **target contract**, then **current state** in the codebase, so this
> doubles as the implementation gap list. The whole point of the architecture: **the block
> owns layout; the tile owns the entity.** HA leaks grid sizing into the card — we don't.

---

## 0. The model in one breath

```
DashboardConfig → Surface[] → Block[] → (leaf) Tile / Widget
                  (Home, a room, or a category)
```

A **Surface** is what you land on or navigate to: the Home summary, a room, or a device
category ("all your lights, grouped by room"). It is an ordered list of **Blocks** plus a top
**StatusStrip** (chrome). A Block is a *composition* primitive (group / list / chart / card /
hero); its leaves are **Tiles** (generic) or **Widgets** (per-domain renderers). Blocks own
placement and grouping; tiles own a single entity and one surgical subscription.

**Current:** `src/dashboard/types.ts` has `Surface`≈`Room` and `Block = {id, type:
hero|group|list|card, title?, entityIds[], size:1|2}`. Targets below extend this — notably a
real Tile contract, block-owned placement, a `chart` block, list `source`, and surfaces for
categories (not only rooms).

---

## 1. Tile — the universal leaf

The atom 317/317 real cards are built from. 50% use only the first four fields; everything
else defaults off. The leaf is dead-simple by default and flexes into ~5 roles by props.

```ts
interface Tile {
  entity?: string;                 // omit for an action-only / launcher tile
  name?: string;                   // default: friendly_name minus the group/area prefix (see §6)
  icon?: string;                   // default: by device/fixture type, not just domain (§7)
  stateContent?: StateBit[] | StateBit;   // ['state','last_changed'|'last_updated', …]
  features?: TileFeature[];        // inline control strip; rendered below the header
  tapAction?: HassAction;          // body tap   — default: open the detail Sheet (more-info)
  iconTapAction?: HassAction;      // icon tap   — default: toggle (toggleable domains)
  orientation?: 'horizontal' | 'vertical';  // vertical = icon-over-label mini-tile
  color?: ColorToken;              // §5 — state-accent or categorical accent
  hideState?: boolean;             // drop the state line (action/nav/launcher tiles)
}

type StateBit = 'state' | 'last_changed' | 'last_updated' | string;  // normalize - vs _
type TileFeature =
  | { type: 'cover-open-close' }
  | { type: 'climate-hvac-modes'; modes: string[]; style?: 'icons' | 'dropdown' }
  | { type: 'climate-fan-modes'; style?: 'dropdown' }
  | { type: 'target-temperature' }
  | { type: 'fan-speed' } | { type: 'fan-oscillate' }
  | { type: 'lock-commands' }
  | { type: 'alarm-modes'; modes: string[] };
type HassAction =
  | { action: 'navigate'; path: string }      // internal route (category/room), not /lovelace/*
  | { action: 'url'; url: string }            // opens in a new tab
  | { action: 'call-service'; service: string; target?: object; data?: object }
  | { action: 'toggle' } | { action: 'more-info' } | { action: 'none' };
```

**Rules**
- `stateContent[0]` is the primary value (tabular numerals); any time-bit renders as a dimmed
  relative timestamp ("· 2h ago"). `last_changed` = event time; `last_updated` = liveness
  (use for battery/safety). Normalize the `-`/`_` inconsistency at parse time.
- `features` upgrades a display tile into a controller — **reuse the existing
  `widgets/*Tile.tsx` as the feature renderers**, don't fork new card types. `modes` is a
  **curated subset** (default to the entity's actually-used options, not every HA capability).
- **Action-only / launcher tile** (no `entity`): `{name, icon, color, hideState:true,
  tapAction}` — a first-class variant. Kills the real dashboard's `input_button.navigation_button`
  sentinel hack and feeds the category launcher and presets gallery.
- Placement (`span`/`rows`) is **NOT** on the Tile — it belongs to the parent block (§4).

**Current:** `src/components/Tile.tsx` is a presentational wrapper (`children, active,
onClick`); per-domain content lives in `src/widgets/*Tile.tsx` (light, sensor, climate, cover,
lock, media_player, generic). **Gap:** the prop contract above (`stateContent`, `features`,
two-target actions, `orientation`, `color` token, action-only variant) is the core widget
work.

---

## 2. Block — the composition primitives

```ts
interface Block {
  id: string;
  type: 'hero' | 'group' | 'list' | 'chart' | 'card';
  title?: string;
  span?: 'full' | number;     // 1..12 columns; omit ⇒ auto-fit (the 90% case)
  rows?: number;              // reserved for charts/banners (rare)
  visibleWhen?: Condition;    // §3 conditional surfacing; omit ⇒ always
  // type-specific:
  axis?: GroupAxis;           // group: 'room' | 'floor' | 'function' | 'device-class' | 'none'
  source?: ListSource;        // list: dynamic membership (§ ListBlock)
  chart?: ChartSpec;          // chart: history config (§ ChartBlock)
  entityIds?: string[];       // group/card: explicit members
}
```

- **GroupBlock** — `title` + a homogeneous run of leaves, **no panel/border** (typography is
  the structure). Two-tier headings via nesting (a `title` group followed by `subtitle`
  sub-groups). `axis` declares how members are grouped — *not hard-coded to room*.
- **ListBlock** — a dynamic, self-collapsing collection (§ below). This is auto-generate.
- **ChartBlock** — a history object; earns a card and a wide span (§ below).
- **CardBlock** — reserve for a genuine *object*: a media player, a camera/video wall, a
  rich device. Cameras are the one legitimate tiling exception (a responsive video wall).
- **HeroBlock** — the single most-important element on a surface, large with quiet chrome.

**Placement contract:** blocks auto-size into a 12-col section grid by default (density-first).
`span` is the only knob (`'full'` | `1..12`); `rows` is reserved for charts/banners. This maps
HA's two competing keys (`layout_options` + `grid_options`) onto **one** model and is the
single biggest, deliberate divergence from HA's schema.

**Current:** `src/dashboard/blocks/{Hero,Group,List,Card}Block.tsx` exist; `Block` has
`size: 1|2` (not `span`), no `axis`, no `source`, no `visibleWhen`, no `chart` type.

---

## 3. Conditional surfacing — `visibleWhen`

A block (or status pill) mounts only when a condition holds, then unmounts — "hide noise until
it's signal." Garage section only when open; appliance badge only while running. Per
[`DESIGN_PRINCIPLES.md`](DESIGN_PRINCIPLES.md) §11 (minimal motion) it **appears, not animates**.

```ts
type Condition = { entity: string; state?: string | string[]; above?: number; below?: number };
```

This is also how the ambient canvas escalates: when something needs attention, **add a block**,
don't just recolor.

---

## 4. ListBlock `source` — dynamic membership (= auto-generate)

```ts
interface ListSource {
  include: Matcher[];          // OR across rows
  exclude?: Matcher[];         // applied after include
  hideWhenEmpty?: boolean;     // default true — the card vanishes when resolved length 0
  sort?: 'name' | 'state' | 'last_changed';
  wrap?: 'rows' | 'tiles';
}
interface Matcher {            // fields AND within one matcher
  entityId?: string;           // exact or glob: 'automation.*pico*'
  domain?: string;             // 'light'
  state?: string | string[];   // 'on'
  name?: string;               // glob on friendly_name
  area?: string;
}
```

- The **"what's on"** idiom: `{include:[{domain:'light'}], exclude:[{state:'off'},{state:'unavailable'}], hideWhenEmpty:true}`
  → lists only active members, disappears when none. The contract for the Home status surface
  and every category "active" list.
- Resolve via **`useAggregate`** over the matcher (one aggregate selector), then subscribe
  per-resolved-entity — never N individual subscriptions for a list.
- The **auto-default generator** emits ListBlocks whose `source` is a domain/area query, so
  defaults are *computed*, not hand-listed.

---

## 5. ChartBlock — TradingView-grade history

Normalizes the three real engines (apexcharts / mini-graph / statistics) into one contract.
Implemented with `lightweight-charts`. The header value-readout is **required — it is the
glance layer, not decoration.**

```ts
interface ChartSpec {
  title?: string;
  window: { value: 24 | 7 | 30; unit: 'h' | 'd' };  // smart-click switches range
  bucket?: 'hour' | 'day';
  reducer?: 'mean' | 'min' | 'max';
  backend?: 'history' | 'statistics';   // statistics for > 7d (recorder LTS)
  header: { showCurrent: boolean; colorize: boolean };   // current value, tinted by series
  axes: { id: string; min?: number; max?: number; opposite?: boolean; ticks?: number }[];
  series: { entity: string; name?: string; color?: string;   // omit ⇒ restrained auto-palette
            fill: 'line' | 'area'; opacity?: number; strokeWidth?: number; axisId?: string }[];
  thresholds?: { value: number; color: string }[];   // value-banded line coloring
}
```

- **Two tiers:** a compact **sparkline** (no header, name-only) is the *glance* tier on a tile;
  the full ChartBlock is the *expand* tier (smart-click). `src/components/Sparkline.tsx` is the
  glance tier today.
- Map to lightweight-charts: `fill:'area'` → AreaSeries (top/bottom from color+opacity);
  `strokeWidth` → `lineWidth` (≈2); `opposite` → a second right-hand price scale; `thresholds`
  → baseline/banded coloring; gridlines + crosshair readout = the header approximated live.
- **Palette:** default to monochrome-base + the single accent; honor explicit hex only when a
  series needs a stable identity. The real config's rainbow-per-series is exactly the
  low-density look to improve on.
- **Dual-axis** (e.g. Power: solar area under load line; or %+absolute) is a required
  capability, not an edge case — and it answers "Energy vs Power": the real config merges
  generation + consumption in **one** chart, so simUI ships **one merged Power surface**.

---

## 6. StatusStrip — the top chrome (no in-app sidebar)

A horizontal flex of pills above the body. Navigation and ambient status live here, never in
the tile grid ([`DESIGN_PRINCIPLES.md`](DESIGN_PRINCIPLES.md) §14).

| Pill | Shape | Source pattern |
|---|---|---|
| **CountPill** | number + icon, icon/tint swap at count>0, tap → Sheet of active entities | `useAggregate` count (lights-on) |
| **NavPill** | label + icon + **categorical** accent, tap → navigate(category) | cross-surface nav |
| **ActionPill** | icon + accent, tap → service call | scene/macro (Movie, All-off, Open-all) |
| **ConditionalBadge** | label + icon, renders only while active | `visibleWhen` |
| **SelectControl** | dropdown/segmented in the strip | `input_select`/`select` |
| **StatusTile** | primary + multiline secondary, tint only when on | rich appliance status |

---

## 7. Color tokens — two reserved roles

Per [`DESIGN_PRINCIPLES.md`](DESIGN_PRINCIPLES.md) §7 (monochrome base + a single accent,
color = state/meaning):

- **`stateAccent`** — the single accent, applied **only when the entity is on/active**
  (Apple-Home tile tint). Idle = monochrome. This is the genuine improvement over the real
  dashboard, which mostly uses static color.
- **`categoryAccent`** — a fixed, per-category color for NavPills and category launcher tiles
  (Lights/accent, Climate/purple, Security/green, Power/amber…). Not state-driven.

Both encode as theme tokens that inherit `hass.themes` when embedded. `primary`/`accent` in
HA configs really mean "this is a button" — simUI auto-applies that tint to action-only tiles
rather than requiring authors to set it.

---

## 8. Naming, auto-defaults & graceful degradation — the approachability layer

This is simUI's actual value-add; the real (power-user) dashboard does **not** solve it.

- **Naming** — heading carries the noun, the tile carries the leaf. Auto-derive a short label
  by stripping the matching area/group prefix from `friendly_name`; always allow a per-tile
  override.
- **Auto-defaults** — generate a surface from the **area registry** + domains; **prefer group
  entities** (e.g. `light.kitchen_downlights_group`) over individual members; **never** expose
  the raw entity registry. Auto-generate is one preset among several.
- **Graceful degradation** — a surface must look right across scales: pick column count from
  the heaviest tile; switch to grouped/aggregated rendering when a domain has many members
  (a Lights surface works with 3 lights or 280). Empty/sparse surfaces are valid (reserve the
  slot, fill later).
- **Editing, no YAML** — progressive: glance → tweak (rename / recolor / reorder / resize /
  favorite) → deep edit (rebind / change features). Drag-to-edit per surface.

**Current:** `src/dashboard/generateDefault.ts` auto-generates **per room** with curated key
entities (no entity-dump). **Gap:** generalize the generator to **categories** too, drive
grouping from a real **area registry** (replacing the name-keyword heuristic), and prefer
group entities.

---

## Implementation gap — summary

| Primitive | Have | Need |
|---|---|---|
| Tile leaf | presentational wrapper + 7 domain widgets | the §1 prop contract (stateContent, features, two-target actions, orientation, color token, action-only) |
| Block | `{type, title, entityIds, size}` | `span`/`rows` placement, `axis`, `source`, `visibleWhen`, `chart` type |
| Surfaces | rooms only | category surfaces; Home summary |
| ListBlock | static `entityIds` | dynamic `source` matchers + hideWhenEmpty via `useAggregate` |
| ChartBlock | `Sparkline.tsx` (glance) | full `lightweight-charts` ChartBlock (expand tier) |
| StatusStrip | — | count/nav/action/conditional pills in top chrome |
| Auto-default | per-room generator | per-category + real area registry + group-entity preference |
