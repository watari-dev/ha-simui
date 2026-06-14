# simUI — Roadmap: the road to (and past) Lovelace competitiveness

> Consolidated from a 7-agent product brainstorm (edit suite · preset gallery · widget
> parity · multi-dashboard · real-HA robustness · differentiation · ship-readiness),
> grounded in an audit of the current code. Brainstorm/reference — not a spec.

---

# simUI — what's next: the road to (and past) Lovelace competitiveness

*Product-lead consolidation of seven specialist brainstorms, grounded in `DESIGN_PRINCIPLES.md`, `AGENTS.md`, and `TODO.md`. The mandate per AGENTS.md: not one home, but **a framework + editable preset gallery for other people**, built to the owner's taste as the quality bar.*

---

## 1. Where we are

- **The engine is real; the product surface around it is missing.** We have a genuinely strong foundation Lovelace can't easily match: a state-reactive `AmbientCanvas`, smart-click `lightweight-charts`, unified `QuickControls`/`BloomStudio`, conditional escalation (`visibleWhen`), per-entity subscriptions, and **seven pure preset builders** that already compose cross-room surfaces. But almost none of it is *reachable or editable* by a human.
- **The edit suite is skeletal and room-only — the exact gap the owner flagged.** All mutation (`reorderBlocks`/`removeBlock`/`cycleBlockSpan`/`addCard`) is hard-gated on `route.kind === 'room'`. **Category/preset surfaces are 100% read-only** (rendered through `StaticBlock`). There is no block/tile inspector, no way to hand-create a group/list/chart, no undo, no duplicate, and the picker is a flat, single-select, 200-capped list — unusable at the owner's **6,257 entities**.
- **The preset gallery exists only as code.** The builders are powerful and pure (free live previews), but there is **no picker UI, no onboarding, no way to commit a preset into the saved config**. First-run silently auto-generates one room dashboard — the signature "pick a preset → it lays out *your* devices → edit" differentiator is invisible.
- **A real correctness bug means we look broken on the real home.** Builders read `e.attributes.area_id`, a field HA does not put in entity state, so the resolved area registry never reaches them and **all 20 real areas collapse into ~9 keyword buckets / "Home."** Add: no `unavailable` state in any widget (the majority state for sensors/media), no floor axis, and per-tick O(6,257) aggregate recompute that's never been profiled live. The data model holds **one un-named room blob** — below Lovelace's most basic unit.

---

## 2. "Minimum Lovelace competitiveness" — the definition

**The milestone:** *a non-owner could install simUI, point it at their real home, and plausibly replace their Lovelace dashboard.* That requires all of the following — deduped across the seven lenses and ranked by leverage. This is the headline checklist.

**Tier A — it doesn't work correctly without these (correctness + scale on a real home):**
1. **Fix the `area_id` bug + add a floor axis** — resolve grouping from the real entityId→area map; section by the 3 floors. *Today every category surface is wrong on the real instance.* (Real-HA lens — must)
2. **Registry-driven curation** — exclude `entity_category` diagnostic/config, hidden/disabled, and noise (`browser_mod_*`, `*_signal_strength`, `update.*`, restart buttons) from every scan. *"Never dump the registry" is a design rule; without this a surface is a database dump.* (Real-HA — must)
3. **`unavailable`/`unknown`/`stale` state in every widget** — dimmed, controls disabled. *1,500+ sensors are unavailable at any moment; a dead light showing a live 0% slider reads as broken.* (Real-HA — must)
4. **Profile + de-jank the live tick** — kill the per-render giant `idSig` string and O(all-entities) aggregate recompute. *"Performance is a design property"; currently unvalidated at scale.* (Real-HA — must)
5. **Faceted, virtualized entity search at 6,000 scale** — domain/area/label facets, fuzzy match, multi-select. *The shared index powering both the picker and a future ⌘K.* (Edit + Real-HA lenses — must)

**Tier B — the editor + gallery (the owner's flagged gap):**
6. **Unify surfaces under one editable model** — `{ surfaces: Surface[] }`, move mutation off the room gate so **categories edit with the same chrome as rooms**. *The keystone; every edit feature then applies everywhere for free.* (Edit lens — must)
7. **Preset gallery picker + first-run onboarding** — browsable cards with **live previews built from the user's own entities**; picking commits to config; auto-generate becomes one card. (Preset lens — must)
8. **Add-block flow + Block/Tile Inspector (no YAML)** — choose the primitive (group/list/chart/card/hero); edit title, members, chart series/window, per-tile name/icon/color via structured controls. (Edit lens — must)
9. **Undo/redo + duplicate + reset-to-preset** — table-stakes, cheap given a plain-JSON config. (Edit lens — must)
10. **Persisted overrides for generated surfaces** — an edited preset survives reload and regeneration. (Edit/Preset lenses — must)

**Tier C — structural + widget parity:**
11. **Multi-dashboard / named views (v3 model)** with a quiet top-chrome switcher (not a sidebar). *Below Lovelace's basic unit today.* (Dashboards lens — must)
12. **The missing widgets:** **camera** (+ camera wall — the sanctioned tiling exception), **weather**, **gauge**, **generalized action/button tile** (scenes/scripts/buttons), **editable helpers** (number/select/text), **alarm panel control on-surface**, **fan/vacuum/valve**, **presence/person**, **calendar**, **markdown**. (Widget lens — must/should)
13. **Real per-domain detail Sheets** — replace the `widgetFor` + raw-attribute dump (the more-info tier is as shallow as glance for ~33 of 39 domains). (Widget lens — should)
14. **Domain-correct service calls** — cover position, fan percentage/preset, lock code, media transport/source, alarm arm/disarm, number/select set — not a 7-domain toggle allowlist. (Real-HA/Widget — should)

**Tier D — ship-readiness (a stranger can install and trust it):**
15. **App-level + per-surface ErrorBoundary + reconnecting state** — one bad widget must not blank the panel. (Ship lens — must)
16. **True phone/tablet/desktop adaptivity** — consume HA's `narrow` (currently discarded), reflow nav. (Ship lens — must)
17. **URL/route persistence** — Back + reload restore the view; precondition for kiosk deep-links. (Ship/Dashboards — must)
18. **Release hygiene** — LICENSE, version sync, tagged release + CHANGELOG, accurate README + screenshots. *A redistribution + trust blocker for "a framework for other people."* (Ship — must)
19. **Settings/options + reset-layout escape hatch**, and a **reduced-motion / contrast / focus-visible** a11y pass (we violate our own minimal-motion principle today). (Ship — must/should)

---

## 3. The roadmap

Sequenced into **Now / Next / Later**. Dependencies are explicit — the two keystones (the **unified surface model**, Tier B#6, and the **v3 multi-dashboard model**, Tier C#11) unblock most of the rest, so they go early. Effort: S/M/L/XL.

### NOW — "stop being wrong, become editable" (the unblockers)
*Why now: the real-home correctness bugs make us look broken on the only instance that matters, and the surface-model unification is the single keystone the entire edit suite + gallery hang off.*

- **Fix `area_id` + floor axis** — M. *Highest-leverage single fix; every category surface is currently wrong.* (no deps)
- **Registry curation + `unavailable` states** — M+M. *Turns a database dump into "a place"; trust on first load.* (no deps)
- **Unify surfaces under one editable model (v2→v3 migration)** — L. **Keystone.** Unblocks editing categories, the gallery's "commit to config," overrides, and multi-dashboard.
- **Faceted, virtualized picker at 6k scale** — L. *Reused by the inspector, add-block flow, list-source authoring, and ⌘K.* (shares the curation index from above)
- **Profile + de-jank the live tick** — L. *Validate 60fps on real data before we add hundreds more tiles.* (no deps)

### NEXT — "the editor, the gallery, and the parity widgets"
*Why now: with the surface model unified and the picker scalable, the owner's flagged edit suite + preset gallery become mostly UI work on solid plumbing — and this is where simUI starts to *feel* like a product, not a demo.*

- **Preset gallery picker + first-run onboarding (live previews)** — L. Depends on: unified model. *The signature "see my home six ways" moment.*
- **Add-block flow + Block/Tile Inspector** — XL. Depends on: unified model, picker.
- **Undo/redo + duplicate + reset-to-preset** — M. Cheap; de-risks every other edit feature.
- **Persisted overrides for generated surfaces** — L. Depends on: unified model, gallery.
- **Multi-dashboard / named views + switcher** — M/L. Depends on: unified model. *Closes the "one page vs my whole home" gap.*
- **Widget parity wave 1: weather, camera (+ wall), gauge, action/button, editable helpers** — M/L. *The most visible "Lovelace can't do that" holes; weather + camera are the credibility wins.*
- **Domain-correct service calls** — L. *Wrong control on tap is an instant dealbreaker.*
- **Resilience: app + per-surface ErrorBoundary + reconnecting banner** — M.
- **Adaptive shell (consume `narrow`, reflow nav) + URL routing** — L+M.

### LATER — "trust, polish, and the long tail"
*Why now-ish: needed for a public release and for the power user, but not gating the core competitiveness milestone.*

- **Widget parity wave 2 + real per-domain detail Sheets** — alarm/fan/vacuum/valve/presence/calendar/markdown; proper more-info tier. M/L.
- **Lovelace import/migration** — XL. *The single biggest switching-cost lever for power users; high effort, so it follows the editor.* (Preset lens — should)
- **Release package** — LICENSE, version sync, tagged release, README rewrite + screenshots, a11y pass. M. *Gates any non-owner install.*
- **Settings/options flow + reset escape hatch** — M.
- **Multi-select / bulk edit on canvas** — M. Power-user throughput.
- **Conditional/template tile visibility + entity-filter list source** — M. Our "hide noise until signal" principle, generalized.

---

## 4. Differentiators to keep our edge

Interleave these so the roadmap **leads with pull, not just parity** — otherwise we build a prettier Lovelace clone. The thesis (Differentiation lens): *Lovelace is a dashboard you look at; simUI is a home you summon and that reacts to you.* The strongest five:

1. **⌘K command palette as a *control* surface** *(Differentiation — must)*. Type "movie" → run the scene, "kitchen" → jump, "all lights off" → scoped bulk action, "living room temp" → climate Sheet. On a 6,257-entity home this is the #1 "why switch," and it **reuses the faceted picker, `runAction`, Sheet, and `ContextMenu` keyboard model** we're already building in Tier A. *Build it in NEXT, on top of the picker.*
2. **Live-preview preset gallery** *(Preset/Differentiation — must)*. Not marketing thumbnails — every card is *your real home, composed*. No competitor offers "see your home in N curated layouts before you commit." This *is* the onboarding and it makes switching feel like an upgrade. Already in the roadmap (NEXT) — protect its priority.
3. **Whole-home glance digest where counts *are* actions** *(Differentiation — must)*. A top-of-Home strip: "3 lights on → [turn all off]", doors open, media playing — conditional pills that stay quiet when the house is quiet. Answers "is my house OK?" in one glance, cross-room, which Lovelace can't auto-compose. Reuses `useAggregate` + `StripPill` + `runAction`.
4. **First-class wall-tablet / kiosk mode** *(Ship — should)*. Chrome-off, Screen Wake Lock, idle ambient screensaver (the built `dots` canvas), auto-return-home, per-device profile. Lovelace needs kiosk-mode + WallPanel + browser_mod glued together; we ship it native, dark, and ambient. A demoable reason to switch. *Slot in LATER, after URL routing + settings land.*
5. **Powerwall-style energy flow object** *(Differentiation — should)*. The most-screenshotted HA object, built native on our TradingView-grade data layer. Gate on real solar/battery per `TODO.md`. A flagship visual.

> Honorable mention / signature bet: the **"Reality Doctor" health surface** (Real-HA lens) — turn our full-registry awareness into "which integrations are down, what's stale/orphaned/low-battery" — flips our biggest liability (a 6k-entity messy home) into the one dashboard that makes a giant install *legible*. Park as a LATER showcase.

---

## 5. The first concrete sprint

**Goal: stop looking broken on the real home, and make the second nav axis editable — the two things blocking everything else.** Six items, sequenced; the first four are independent and parallelizable, the last two are the keystone + its first payoff.

1. **Fix the `area_id` bug + add the floor axis.** *(M)* — Pass the entityId-keyed `AreaMap` through `PresetContext`; fetch `floor_registry`; two-tier floor→area grouping; add a vitest with a registry fixture asserting entities land in real areas, not "Home." **Rationale: the single highest-leverage fix in the whole brief — every category surface is silently wrong on the owner's instance, exactly where Lovelace's area cards shine.**
2. **Registry curation gate + `unavailable`/`unknown` widget states.** *(M+M)* — One shared `isPrimaryEntity` gate (excludes diagnostic/config/hidden/noise) used by every builder; one `.is-unavailable` treatment across all widgets. **Rationale: together with #1, this is the difference between "a place" and "a broken database dump" on first load — trust is won or lost here.**
3. **Faceted, virtualized entity picker.** *(L)* — Replace `AddCardPanel` with search + domain/area/label facets + multi-select over the curation index. **Rationale: nothing else in the edit suite (or ⌘K) is usable at 6,257 entities without it; build the shared index once, reuse everywhere.**
4. **Profile one live state tick** and kill the `idSig` string + O(all-entities) recompute. *(M, scoped)* — **Rationale: validate 60fps before we mount the inspector, gallery previews, and hundreds more tiles on top.**
5. **Unify surfaces under one editable model (v2→v3 migration).** *(L)* — `{ surfaces: Surface[] }`; move mutation off the `route.kind === 'room'` gate; lift the room's DnD/edit shell into a shared `SurfaceCanvas`. **Rationale: the keystone the owner's flagged edit suite *and* the preset gallery both require — do it once, cleanly, with a lossless migration.**
6. **First payoff: make category surfaces editable + ship the gallery picker shell** with live previews and commit-to-config. *(L, can extend into sprint 2)* — **Rationale: turns the keystone into something the owner can *see and use* immediately — the headline gap ("can I edit a category? can I pick a preset that lays out my real devices?") goes from "no" to "yes" in one visible leap.**

**Why this sprint over alternatives:** it front-loads the *correctness* bugs that make us look broken on the only home that matters, builds the *one shared primitive* (faceted picker) and the *one keystone model* (unified surfaces) that the largest number of downstream features depend on, and ends on a visible win that directly answers the owner's question. Widgets, multi-dashboard, ⌘K, and ship-hardening all land more cheaply *after* this foundation — and trying any of them first would mean building on the room-only gate and the broken area grouping we'd then have to tear out.
