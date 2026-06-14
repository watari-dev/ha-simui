# SPEC_DETAIL — the more-info / detail-sheet depth spec

The detail Sheet is simUI's deepest disclosure tier: **glance → tap (Sheet) → context / expand**
(DESIGN_PRINCIPLES §14). Today it dispatches a per-domain "more-info" body
(`DetailContent.tsx`) composed from shared control primitives. It is *good at controls* and
weak at **depth** — the things HA's own more-info dialog gives you and we don't yet:

1. A **history graph** wired to the real recorder (we have it for numeric sensors only).
2. A **complete, legible attributes table** (we have `AttrList`, but it's a flat dump).
3. **Device / area links** — "this entity lives on *Hue bridge* in *Living Room*."
4. **Related entities** — the other entities on the same device, one tap away.
5. A **logbook** — the recent state-change timeline for this entity.
6. **Settings / quick-config** — rename, area, the editor's per-tile inspector inline.

This spec maps **each domain → what its detail shows**, defines the **shared panes to add**,
their **data needs**, and the **per-domain composition** reusing the primitives we already
ship. No code — a precise build plan. The bar is *match-and-beat* HA's more-info while staying
inside simUI's design law (dark-first, monochrome + one accent, tabular numerals, minimal
motion, compose-don't-tile).

This is a **spec task**. It edits no shared files. The build agents implement the panes named
in §3 as new files under `src/dashboard/detail/` + co-located CSS, and the integrator wires the
single store change in §8.

---

## 0. What exists today (the baseline to extend)

| Piece | File | What it gives us |
| --- | --- | --- |
| Sheet host | `dashboard/DashboardView.tsx` → `SheetHost` | One `<Sheet>` at app root; `tap → more-info` opens it for an `entityId`. |
| Sheet shell | `components/Sheet.tsx` | Portal, backdrop, focus trap, Esc/click-close, `role=dialog`. Bottom-sheet on phone / popover on desktop. |
| Body dispatcher | `dashboard/DetailContent.tsx` | `switch (domain)` → per-domain sheet, else `FallbackDetail`. Subscribes to the one entity (`useEntity`). |
| Masthead | `dashboard/detail/DetailHeader.tsx` | Big tabular value + unit + sub-line + relative-time recency, tone-tinted. |
| Attributes | `dashboard/detail/AttrList.tsx` | Tabular `key → value` dump, `omit` set for already-surfaced keys. |
| Per-domain bodies | `dashboard/detail/{Light,Climate,Media,Cover,Lock,Sensor}Detail.tsx` | Controls via `BloomStudio` / `QuickControls` / `TileFeatures`; sensor gets `ExpandableChart`. |
| Controls | `components/BloomStudio.tsx`, `components/QuickControls.tsx`, `components/TileFeatures.tsx` | Full studio (wheel/dial) + compact rack + feature strips. |
| Charts | `components/ExpandableChart.tsx`, `components/Chart.tsx`, `hass/history.ts` | `lightweight-charts` graph + 24h/7d/30d toggle + real recorder feed (`history/history_during_period`). |
| Registry | `dashboard/areas.ts` | `useAreas()` (entity→area/floor), `useRegistry()` (curation meta), `isPrimary`. Memoised per source. |

**Design discipline already established and to be preserved:** every sheet is
`DetailHeader` → bespoke controls → (new depth panes) → `AttrList`; controls are *reused, never
re-implemented*; the body subscribes only to its own entity; non-specialised domains degrade to
`FallbackDetail`. The new panes must follow the same discipline — one render path, surgical
subscription, graceful absence (a pane that has no data renders nothing, never an empty frame).

---

## 1. The detail Sheet's information architecture (every domain shares this skeleton)

The sheet body is a **vertical stack of sections** in a fixed priority order. A section that has
no data for the current entity is **omitted entirely** (no empty headers — graceful degradation,
DESIGN_PRINCIPLES "Don't add an entity because it exists"). The order, top to bottom:

```
┌─ DetailHeader ──────────────────────────────  primary value · unit · sub · recency  (exists)
│
├─ [A] PrimaryControls ───────────────────────  the bespoke per-domain studio          (exists)
│        light→BloomStudio · climate→TempDial · media→transport · cover→position …
│
├─ [B] HistoryPane ──────────────────────────── inline graph + range toggle            (NEW)
│        numeric/continuous domains; collapsed to a sparkline that smart-clicks to full
│
├─ [C] QuickConfig ──────────────────────────── rename · favourite · per-tile inspector (NEW, edit-mode aware)
│
├─ [D] AttrList ─────────────────────────────── the tabular attribute readout          (exists, refined)
│
├─ [E] LogbookPane ──────────────────────────── recent state-change timeline           (NEW)
│
├─ [F] DeviceInfo ───────────────────────────── device · area · floor · integration    (NEW)
│
└─ [G] RelatedEntities ──────────────────────── siblings on the same device / area      (NEW)
```

Rationale for the order: **act first** (controls), **understand next** (history → attributes →
logbook), **navigate last** (device → related). HA's dialog buries history under tabs; we keep
it inline and scannable. The sheet is scrollable (`simui-sheet-body` already scrolls); on
desktop popover it caps height and the lower panes scroll into view.

**Sectioning primitive (NEW, tiny):** a shared `DetailSection` wrapper — an 11px uppercase
tracked label (the established `simui-qc-label` / detail-label idiom) over its content, with a
hairline divider above. It is *collapsible* for the heavier panes (Logbook, Related) so the sheet
opens compact and expands on demand — collapsed-by-default for [E][F][G], open for [B][D].
Collapse state is local component state (not persisted); the chevron is the only motion and it is
instant. This keeps a 280-light home's lock sheet from being a wall.

---

## 2. Per-domain detail composition

Each row: the domain, its **header**, its **primary controls** (existing), and which **depth
panes** mount. "—" = pane omitted for that domain. Every domain still ends with `AttrList`.
DeviceInfo + RelatedEntities + Logbook are **universal** (mount for every domain when data
exists); the table below calls out only the domain-specific tuning.

| Domain | Header (value · sub) | Primary controls (exists) | HistoryPane [B] | Domain-specific notes |
| --- | --- | --- | --- | --- |
| **light** | `friendly` · color-mode | `BloomStudio` (wheel + ribbon + brightness) + effect picker | **Brightness %** over time (numeric attr history, see §4) | Logbook is high-value (on/off/dim events). Related = other lights on the same device (RGBW + white). |
| **climate** | current temp · hvac_action + humidity | `BloomStudio` (TempDial[s] + mode pills) + preset/fan pickers | **Current vs target temp** dual-series; **humidity** as opposite axis | Threshold band = target setpoint line (reuse `ChartSpec.thresholds`). |
| **media_player** | now-playing / state | transport + volume + source picker | — (transport, not a metric) | Related = the receiver's source/zone siblings. Logbook = play/pause/source changes. |
| **cover** | position % · state | position slider + open/stop/close + tilt | **Position %** over time (optional, low priority) | Logbook (opened/closed) more useful than a graph here. |
| **lock** | state · recency | Lock / Unlock buttons | — | **Logbook is the star** — who/when locked. Promote it directly under the buttons. |
| **sensor** (numeric) | reading · unit | — | **the reading** (primary series, exists via `ExpandableChart`) | Statistics backend for >7d. Min/max/avg readout strip under the graph (§3 HistoryPane). |
| **sensor** (non-numeric) / **binary_sensor** | state | — | **state timeline** (a stepped/band history, not a line — §4) | Binary history renders as an on/off band, not a numeric line. |
| **switch / input_boolean** | state | toggle (FallbackDetail today) | **on/off band** | Add to the dispatcher (§7) so it gets the full skeleton, not just FallbackDetail. |
| **fan** | speed % · state | `QuickControls` feature strip | **speed %** (optional) | — |
| **number / input_number** | value · unit | a slider (NEW small control or `target-temperature`-style) | **value** over time | Promote out of FallbackDetail. |
| **select / input_select** | option | option segmented control | — | — |
| **person / device_tracker** | zone · recency | — | **zone timeline** (band) | Related = the person's tracked devices. DeviceInfo → area = current zone. |
| **vacuum / camera / weather** | state | existing domain widget (FallbackDetail) | — | Keep FallbackDetail's widget as `[A]`; just gain the universal depth panes. |
| **everything else** | state | `QuickControls` → widget (FallbackDetail) | numeric attr → graph if any | The skeleton degrades: any domain gets DeviceInfo / Related / Logbook / Attrs for free. |

**Key principle:** the per-domain files stay *thin* — they keep choosing `[A]` (their controls)
and any domain tuning, then drop in the **universal depth panes** via one shared component
(`DetailDepth`, §3) so we don't repeat the pane wiring six times. `FallbackDetail` gains the same
`DetailDepth`, which is what finally makes *every* domain (switch, fan, number, person…) match
HA's more-info without a bespoke file each.

---

## 3. Shared components to add

All new files live in `src/dashboard/detail/`, each with a **co-located `*.css`** imported from
the component (never touch `src/styles.css`). All are **presentational + one data hook**; they
subscribe surgically and render nothing when their data is empty.

### 3.1 `DetailSection` (layout primitive)
- **Props:** `{ label: string; collapsible?: boolean; defaultOpen?: boolean; count?: number; children }`.
- A tracked-uppercase label (optional trailing count badge, e.g. "Logbook · 12"), hairline rule
  above, and — when `collapsible` — a chevron that toggles local `open` state. Instant toggle.
- Used by every depth pane so the sheet reads as one consistent tier. ~40 lines.

### 3.2 `DetailDepth` (the universal depth stack)
- **Props:** `{ entity: HassEntity }`.
- Renders, in order, the universal panes that have data: `HistoryPane?` (when the domain/attr is
  graphable — it decides internally), `AttrList`, `LogbookPane`, `DeviceInfo`, `RelatedEntities`.
- This is the single seam the per-domain files and `FallbackDetail` drop in after their controls,
  so adding a pane later touches one file. It takes an optional `historySpec?: ChartSpec | { attr: string }`
  override so a domain can say "graph the brightness attribute, not the state."
- ~60 lines of composition; no logic of its own beyond ordering + omission.

### 3.3 `HistoryPane` (NEW — generalises the sensor chart to every numeric source)
- **Props:** `{ entityId: string; attr?: string; mode?: 'line' | 'band'; band?: MetricBand; accent?: ColorToken; series?: ChartSpec }`.
- **Reuses `ExpandableChart`** verbatim for the numeric line case — it already wraps `MetricSpark`
  (the inline glance spark) and smart-clicks to the full `lightweight-charts` `<Chart>` in a nested
  Sheet with the 24h/7d/30d toggle. **No new charting infra.** `SensorDetail` already does exactly
  this; `HistoryPane` is that pattern lifted out so light-brightness, climate-temp, cover-position,
  fan-speed, number-value all reuse it.
- **Two render modes:**
  - `line` — numeric state or numeric attribute → `ExpandableChart` (single series area).
  - `band` — on/off or categorical state (binary_sensor, switch, person zone) → a **stepped state
    band** (a thin horizontal track segmented by state, coloured by state, with a crosshair-style
    hover readout). This is a *new small renderer* (not `lightweight-charts`) that consumes the
    same `useHistory` rows — see §4 (`useStateHistory`). ~80 lines incl. CSS.
- **Numeric stats strip:** under a `line` graph, a tabular **min / avg / max / now** row computed
  from the fetched history points (no extra request — derive from the same `useHistory` series).
  Matches HA's min/mean/max but tighter, tabular-numeral.
- **Attribute history:** when `attr` is set (e.g. `brightness`), HistoryPane requests the entity's
  history *with attributes* (the existing `history/history_during_period` call drops `no_attributes`)
  and plots that attribute. This is the one genuinely new fetch path — specified in §4.

### 3.4 `LogbookPane` (NEW)
- **Props:** `{ entityId: string; limit?: number }` (default 12, "show more" extends to 50).
- A compact, tabular timeline of recent state changes: `relativeTime · state · (trigger context)`.
  Rows reuse the `simui-detail-attr` key/value rhythm — left: relative time (tabular), right: the
  new state (state-tinted dot + label). Most-recent first.
- **Data:** the HA **logbook** WS API (§4 `useLogbook`). Degrades to **state-history-derived
  entries** when the logbook integration isn't reachable (derive transitions from `useHistory`),
  and to **nothing** in dev/mock with no connection (the section omits). No spinner — the pane
  appears when data arrives (minimal motion).
- Collapsible, collapsed-by-default except for **lock / cover / person**, where the timeline is the
  point and it opens by default.

### 3.5 `DeviceInfo` (NEW)
- **Props:** `{ entityId: string }`.
- Three quiet rows: **Area** (· floor), **Device** (model / manufacturer), **Integration**
  (the config-entry / platform). Each is a muted key + value; Area and Device are **tappable** —
  Area navigates to that room surface (`{ action: 'navigate', path }`), Device opens the device's
  related-entities (could reuse the same sheet scoped to the device, or a future device sheet —
  for now: scroll to / expand RelatedEntities).
- **Data:** `useAreas()` (already memoised) gives area + floor. Device + integration need two
  extra registry joins — see §4 (`useDeviceInfo`), built on the **same cached raw-registry fetch**
  `areas.ts` already performs (`fetchRawRegistry`), so this adds *zero new round-trips*; it just
  reads device name/model/manufacturer/integration from the device + config-entry registries.
- Omits cleanly in dev/mock (no registry) — `useAreas` already falls back to the heuristic area;
  device/integration rows simply don't render without the registry.

### 3.6 `RelatedEntities` (NEW)
- **Props:** `{ entityId: string }`.
- "On this device" + "In this area" — up to ~8 sibling entities, each an `EntityRow`
  (existing) so tapping one **re-points the detail Sheet** to that entity (the sheet host already
  takes an `entityId`; the row's default `more-info` action does this). This is the
  click-through that HA's "related" tab gives, but inline and live.
- **Curation:** filter siblings through `isPrimary` (areas.ts) so we don't list 14 diagnostic
  sensors. Show the count, "show all N" expands past the curated set.
- **Data:** the device→entities and area→entities joins from the **same cached registry**
  (`useDeviceInfo` / `useAreas`); no new fetch. In dev/mock, fall back to **area siblings only**
  (heuristic areas still resolve), so the pane is useful offline too.

### 3.7 `QuickConfig` (NEW — the edit-mode bridge to the editor subsystem)
- **Props:** `{ entityId: string; blockId?: string }`.
- The settings/quick-config row HA puts behind a gear. Two tiers:
  - **Always:** a **Favourite** toggle (adds/removes from the Home summary favourites) and a
    **copy entity_id** affordance.
  - **In edit mode only** (when the editor is `active` and this entity belongs to a known block):
    inline the editor's **tile Inspector** form for this leaf — name / icon / colour / features /
    actions — bound to the block's `tiles?.[entityId]` (`TileConfig`) via the editor actions
    `updateTile`. This is the elegant payoff: *the detail sheet doubles as the per-tile inspector*
    when editing, so "tap a tile in edit mode → tweak it where you see it." See §6.
- Rename / area-assignment write to the **entity registry** (`config/entity_registry/update`),
  guarded behind an "Advanced" disclosure (changing the real registry is a power action — keep it
  one tap further down, with a clear destination). Out of scope for the first pass beyond the
  affordance stub; the editor's `TileConfig.name` override is the non-destructive default rename
  path (renames the tile, not the HA entity).

---

## 4. Data needs — the APIs each pane requires

All live in `src/hass/` as small hooks mirroring `useHistory`'s shape (surgical, memoised per
source, graceful offline). The build agent owns these `src/hass/*.ts` files; **do not edit
`hass/history.ts`** — add siblings.

### 4.1 Numeric state history — `useHistory` (EXISTS)
Already implemented (`hass/history.ts`): `history/history_during_period`, real recorder when
connected, seeded synth in mock. `HistoryPane` line-mode + the stats strip consume it directly.

### 4.2 Attribute history — `useAttributeHistory` (NEW, small)
- For brightness / position / volume etc. — re-issue `history/history_during_period` **without**
  `no_attributes`, then project `row.a?.[attr]` (HA includes attributes per row when not
  suppressed) into the same `HistoryPoint[]` shape. Reuse `useHistory`'s caching/superseding
  pattern (request-id ref, dedupe-by-time). ~60 lines. Mock path: synth from the current
  attribute value just like `useHistory` synths from state.

### 4.3 State-change band history — `useStateHistory` (NEW, small)
- For binary_sensor / switch / person / select: the **string-state** transitions over the window
  (not numeric). Same WS call, but keep non-numeric states (don't coerce to number) and emit
  `{ t, state }[]`. `HistoryPane` band-mode renders these as coloured segments. ~50 lines.

### 4.4 Logbook — `useLogbook` (NEW)
- **Primary:** HA's logbook WS — `logbook/get_events` (`{ start_time, end_time, entity_ids:[id] }`)
  or the `logbook/event_stream` subscription for live tail. One-shot fetch over the sheet's window
  is enough for v1 (no live tail needed — the sheet is short-lived). Returns
  `{ when, state, name, message?, context? }[]`.
- **Fallback A (no logbook integration):** derive entries from `useStateHistory` transitions
  (`when = t`, `state = state`) — strictly less rich (no context/trigger) but always available
  when recorder is.
- **Fallback B (dev/mock, no connection):** return `[]` → `LogbookPane` omits.
- ~80 lines. Memoise per (entityId, window) like `useHistory`.

### 4.5 Registry joins — `useDeviceInfo` (NEW), built on `areas.ts`'s cache
- `areas.ts` already fetches + caches the raw registry (`fetchRawRegistry`: areas, devices,
  entities, floors) per source via a `WeakMap`. `useDeviceInfo(entityId)` reaches the **same
  cached promise** and additionally joins the **device registry** (name / model / manufacturer /
  `config_entries`) and the **config-entry registry** (`config/config_entries/get` →
  integration domain + title). Returns
  `{ area, floor, device?: {name, model, manufacturer}, integration?: {domain, title}, deviceEntities: string[], areaEntities: string[] }`.
- **Integrator note (§8):** `fetchRawRegistry` and its `RawRegistry` interface are currently
  *module-private* in `areas.ts`. To avoid a second registry round-trip, `areas.ts` should
  **export** a `resolveDeviceInfo(source)` (memoised, same `WeakMap` pattern) that extends the raw
  fetch with the device list + a `deviceId → entityIds` index, and `useDeviceInfo` wraps it. This
  is the one change to an existing file the detail subsystem requests — described, not made.
- Mock: `useAreas` heuristic still gives an area name; device/integration absent → those rows omit.

**All five hooks share the discipline of `useHistory`:** identity-stable deps, request
superseding, `WeakMap` per-source cache for config-shaped data, and a clean empty return offline
so every pane degrades to "renders nothing" rather than "spins" or "errors."

---

## 5. Reusing existing primitives (compose, don't reinvent)

| Need | Reuse | Notes |
| --- | --- | --- |
| Inline + expandable graph | `ExpandableChart` → `MetricSpark` + `Chart` | HistoryPane line-mode *is* this. Stats strip derives from its `useHistory` data. |
| Full studio controls | `BloomStudio` / `QuickControls` / `TileFeatures` | `[A]` per-domain controls unchanged. |
| Masthead | `DetailHeader` | Every sheet keeps it. |
| Attribute table | `AttrList` | Refine: group `state/changed/entity` as a fixed head, then alphabetise the rest; keep `omit`. |
| Sibling rows | `EntityRow` | RelatedEntities renders these; tap re-points the sheet. |
| Per-tile editing | the editor's **Inspector** (`InspectorProps`, editor/types) | QuickConfig embeds the tile form in edit mode (§6). |
| Area/curation | `useAreas`, `isPrimary` (`areas.ts`) | DeviceInfo + RelatedEntities + EntityPicker curation all reuse these. |
| Section chrome | new `DetailSection` | The only new layout primitive; everything else composes. |
| Sheet host | `SheetHost` (`DashboardView.tsx`) | Unchanged — it already takes an `entityId` and swaps content; RelatedEntities re-points it via `more-info`. |

---

## 6. The edit-mode payoff: detail sheet ⇄ tile inspector

In **view mode** the sheet is read/act: controls + history + logbook + device. In **edit mode**
(`EditorState.active`) the same sheet, opened on a tile, surfaces `QuickConfig`'s inline
**Inspector** form so the user edits *the leaf they just tapped* without a separate panel hunt.

- The sheet host learns the **block context**: when a tile is tapped in edit mode, the host is
  told `(blockId, entityId)` (the `EntityTile` already knows its block when rendered inside one).
  `DetailContent` receives an optional `blockId`; `QuickConfig` only shows the inspector when both
  `editing` and `blockId` are present.
- The inline inspector binds to `block.tiles?.[entityId]` (a `TileConfig`) and emits
  `onTileChange` → editor `updateTile(blockId, entityId, patch)` — **the exact contract the
  Inspector agent builds** (`InspectorProps.onTileChange`). So the detail sheet and the standalone
  Inspector share one form component; we don't fork the tile editor.
- This keeps disclosure honest: **glance → tap → (view: act; edit: tweak)**, no modal-in-modal.

If the Inspector form component isn't ready at integration time, `QuickConfig` degrades to the
favourite-toggle + copy-id row only; the inline inspector is an additive enhancement, not a
dependency.

---

## 7. Dispatcher changes (`DetailContent.tsx`) — describe, don't edit

`DetailContent.tsx` is an existing `src/dashboard/*` file — **the detail agent does not edit it**;
the integrator applies these, or owns it if assigned. The changes:

1. **Add `DetailDepth`** to every branch: each per-domain body ends with `<DetailDepth entity={entity} />`
   instead of a bare `<AttrList>` (DetailDepth includes AttrList plus the universal panes). The
   per-domain `omit` set carries through (pass it to `DetailDepth`, which forwards to `AttrList`).
2. **Promote domains out of `FallbackDetail`** into first-class cases that gain a `HistoryPane`:
   `switch` / `input_boolean` (on/off band), `number` / `input_number` (value line),
   `person` / `device_tracker` (zone band). These can be thin: controls (existing toggle/slider)
   + `DetailDepth`.
3. **Thread `blockId?`** through `DetailContent({ entityId, blockId })` so `QuickConfig` can show
   the inline inspector in edit mode (§6).
4. `FallbackDetail` itself ends with `DetailDepth`, so *every* domain — even ones with no bespoke
   file — gets history (if graphable), attributes, logbook, device, related.

Net: the dispatcher stays a `switch`; the depth is centralised in `DetailDepth`; bespoke files
only own their controls.

---

## 8. Integration seams (what the integrator wires)

| Seam | Where | Change |
| --- | --- | --- |
| `DetailDepth` into bodies | `dashboard/DetailContent.tsx` + per-domain files | Replace trailing `<AttrList>` with `<DetailDepth entity omit historySpec? />` (§7.1). |
| New dispatcher cases | `dashboard/DetailContent.tsx` | switch / number / person branches (§7.2). |
| `blockId` thread-through | `DetailContent`, `SheetHost` (`DashboardView.tsx`), store sheet state | Sheet host carries `(entityId, blockId?)` so edit-mode tile inspector binds (§6). |
| `resolveDeviceInfo` export | `dashboard/areas.ts` | Export a memoised device-info resolver reusing the cached raw registry (§4.5) — the only existing-file change the panes need; avoids a duplicate registry fetch. |
| New hooks | `src/hass/{attrHistory,stateHistory,logbook,deviceInfo}.ts` | New files, no edits to `hass/history.ts`. |
| New panes | `src/dashboard/detail/{DetailSection,DetailDepth,HistoryPane,LogbookPane,DeviceInfo,RelatedEntities,QuickConfig}.tsx` + co-located CSS | New files. |
| Favourites toggle | store (home favourites) | `QuickConfig` needs an add/remove-favourite action; if the store lacks it, stub to a no-op and flag. |
| CSS | each pane's `*.css`, imported locally | New `simui-detail-section`, `simui-history-band`, `simui-logbook-*`, `simui-deviceinfo-*`, `simui-related-*` classes. **No edit to `src/styles.css`.** |

**No breaking changes.** Every new pane omits cleanly when its data is absent, so wiring them in
behind incomplete data (or in dev/mock) never regresses the current sheet. Config schema is
untouched — depth is *derived* (history/logbook/registry), never persisted.

---

## 9. Design-law checklist (every pane must pass)

- **Dark-first, monochrome + one accent** — state colour only (logbook dots, band segments,
  history series); device/area/attrs are muted. No decorative colour.
- **Tabular numerals** — every value, time, stat (`.num` class) is tabular, right-rhythm aligned
  to the existing `simui-detail-attr` grid.
- **Minimal motion** — sections *appear*; the only animation is the collapse chevron, instant.
  No skeleton shimmer, no spinner — panes mount when data arrives.
- **Compose, don't tile** — panes are sections on the sheet surface, not bordered cards;
  hairline dividers + the section label carry separation (DESIGN_PRINCIPLES "use whitespace,
  hairlines, and type").
- **Graceful degradation** — 3 lights or 280, full registry or none, logbook present or derived:
  every pane has a defined fallback ending in "render nothing." A sheet never shows an empty
  labelled frame.
- **Surgical reactivity** — each pane subscribes only to what it shows (`useEntity` for live
  state; the history/logbook/registry hooks fetch once per window/source and don't re-subscribe
  per tick).
- **Accessibility** — collapsible sections are real `<button>`s with `aria-expanded`; the graph
  keeps `ExpandableChart`'s real-text header readout (the canvas stays `aria-hidden`); logbook is a
  list, related entities are the existing keyboard-accessible `EntityRow`s; the Sheet's focus trap
  already covers all of it.

---

## 10. Build order (suggested, for the implementing agent)

1. `DetailSection` + `DetailDepth` (skeleton; wraps existing `AttrList`) — sheets unchanged but
   centralised.
2. `HistoryPane` line-mode (lift `SensorDetail`'s `ExpandableChart` usage out) + stats strip —
   immediately upgrades light/climate/cover/number to inline graphs.
3. `DeviceInfo` + `RelatedEntities` on the cached registry (`resolveDeviceInfo`) — the biggest
   match-HA win, zero new round-trips.
4. `LogbookPane` (`useLogbook` + history fallback) — promotes lock/cover/person.
5. `useAttributeHistory` / `useStateHistory` → HistoryPane attr + band modes (brightness graph,
   binary/zone timelines).
6. `QuickConfig` favourite/copy row, then the edit-mode inline inspector once the Inspector
   component lands (§6) — the editor payoff.

Each step is independently shippable and degrades cleanly, so the sheet improves monotonically as
panes land.
