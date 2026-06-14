// Page-template gallery — the "instant nice page" pillar (PRESETS.md, CLAUDE.md).
//
// A *preset* (../../dashboard/presets) builds a whole CATEGORY surface from a fixed
// recipe. A *page template* is the editor-side analogue: the user opens an empty (or
// any) surface, picks a template, and gets a coherent, COMPOSED page seeded from
// their OWN real entities — which they then edit like any other surface. The same
// degradation rule applies (PRESETS.md): a template must look right at 3 entities or
// 280, prefer group/aggregate blocks, and emit only blocks that have content.
//
// Each template is PURE DATA + a pure `build(ctx)`:
//   • no hooks, no subscriptions, no React — it returns a plain `BlockConfig[]`
//     the surface renderer subscribes to per-entity (same contract as a preset).
//   • it composes a *page* (hero / group / list / chart blocks under headings), not
//     a card grid (DESIGN_PRINCIPLES §14 — compose, don't tile).
//   • it self-identifies which density it targets so the gallery can badge it.
//
// The output BlockConfig[] is exactly what `createOverride(catId, blocks)` /
// `createHomeOverride(blocks)` persist, and what the editor store loads into
// `dirtyBlocks` — so a chosen template drops straight onto a surface, editable.

import { domainOf, friendly } from '../../util';
import type { BlockConfig, BlockSpan } from '../types';
import type { HassEntities, HassEntity } from '../../types';

// ─────────────────────────────────────────────────────────────────────────────
// Public types
// ─────────────────────────────────────────────────────────────────────────────

/** Density / role variant a template targets (drives the gallery badge + layout). */
export type TemplateDensity = 'minimal' | 'standard' | 'dense';

/** Everything a template's `build` needs. Mirrors PresetContext but editor-local. */
export interface TemplateContext {
  /** Live entity snapshot to compose the page from. */
  states: HassEntities;
  /** entityId → area/room label, when a real registry is available (optional). */
  areaOf?: (entityId: string) => string | undefined;
}

/**
 * One pickable page template. `build` is pure + total — it always returns a
 * (possibly sparse) BlockConfig[]; it never throws and degrades to fewer blocks
 * when the home is small.
 */
export interface PageTemplate {
  /** Stable id, e.g. 'minimal', 'family-hub', 'wall-tablet'. */
  id: string;
  /** Sentence-case gallery name. */
  name: string;
  /** One/two-line gallery description. */
  description: string;
  /** Density/role variant — badged in the gallery, shapes the layout. */
  density: TemplateDensity;
  /** Lucide icon name for the gallery header. */
  icon: string;
  /** Compose the page from the user's real entities. Pure + total. */
  build: (ctx: TemplateContext) => BlockConfig[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Pure helpers (local — no coupling to the preset module's internals)
// ─────────────────────────────────────────────────────────────────────────────

const DEAD = new Set(['unavailable', 'unknown', '']);

let _seq = 0;
/** Deterministic-enough block id within one build pass (the store re-ids on persist). */
function tid(prefix: string): string {
  _seq += 1;
  return `tmpl-${prefix}-${_seq}`;
}

function isLive(e: HassEntity): boolean {
  return !DEAD.has(e.state);
}

/** All live entities of a domain, friendly-name sorted. */
function ofDomain(states: HassEntities, domain: string): HassEntity[] {
  return Object.values(states)
    .filter((e) => domainOf(e.entity_id) === domain && isLive(e))
    .sort((a, b) => friendly(a).localeCompare(friendly(b)));
}

function ids(entities: HassEntity[]): string[] {
  return entities.map((e) => e.entity_id);
}

function hasDomain(states: HassEntities, domain: string): boolean {
  return Object.values(states).some((e) => domainOf(e.entity_id) === domain && isLive(e));
}

/** Numeric sensors (carry a unit) — the chartable/sparkline set. */
function numericSensors(states: HassEntities): HassEntity[] {
  return Object.values(states)
    .filter(
      (e) =>
        domainOf(e.entity_id) === 'sensor' &&
        e.attributes.unit_of_measurement != null &&
        isLive(e),
    )
    .sort((a, b) => friendly(a).localeCompare(friendly(b)));
}

function deviceClass(e: HassEntity): string | undefined {
  return e.attributes.device_class as string | undefined;
}

/** First live entity matching a predicate, or undefined. */
function firstWhere(states: HassEntities, pred: (e: HassEntity) => boolean): HassEntity | undefined {
  return Object.values(states).find((e) => isLive(e) && pred(e));
}

/** Pick the "best" numeric sensor for a chart — prefers power/energy/temperature. */
function headlineSensor(states: HassEntities): HassEntity | undefined {
  const nums = numericSensors(states);
  if (!nums.length) return undefined;
  const PRIORITY = ['power', 'energy', 'temperature', 'humidity'];
  for (const dc of PRIORITY) {
    const hit = nums.find((e) => deviceClass(e) === dc);
    if (hit) return hit;
  }
  return nums[0];
}

/** Build a single-series area chart from one sensor (FRAMEWORK §5 shape). */
function chartBlock(sensor: HassEntity, span: BlockSpan, windowH = 24): BlockConfig {
  return {
    id: tid('chart'),
    type: 'chart',
    title: friendly(sensor),
    entityIds: [sensor.entity_id],
    span,
    chart: {
      window: { value: windowH, unit: 'h' },
      header: { showCurrent: true, colorize: true },
      axes: [{ id: 'left' }],
      series: [{ entity: sensor.entity_id, fill: 'area', axisId: 'left' }],
    },
  };
}

// The category axis (CLAUDE.md) → launcher metadata. Synthetic `category.<id>` ids
// render as nav launchers in GroupBlock (it special-cases the `category.` prefix).
interface CatDef {
  id: string;
  present: (states: HassEntities) => boolean;
}
const CATEGORIES: CatDef[] = [
  { id: 'lights', present: (s) => hasDomain(s, 'light') },
  { id: 'climate', present: (s) => hasDomain(s, 'climate') || hasDomain(s, 'humidifier') },
  { id: 'media', present: (s) => hasDomain(s, 'media_player') },
  {
    id: 'security',
    present: (s) =>
      hasDomain(s, 'lock') ||
      hasDomain(s, 'alarm_control_panel') ||
      Object.values(s).some(
        (e) =>
          domainOf(e.entity_id) === 'binary_sensor' &&
          ['door', 'window', 'motion'].includes(deviceClass(e) ?? ''),
      ),
  },
  { id: 'sensors', present: (s) => numericSensors(s).length > 0 || hasDomain(s, 'binary_sensor') },
  {
    id: 'power',
    present: (s) =>
      Object.values(s).some(
        (e) =>
          domainOf(e.entity_id) === 'sensor' &&
          ['power', 'energy'].includes(deviceClass(e) ?? ''),
      ),
  },
  { id: 'scenes', present: (s) => hasDomain(s, 'scene') || hasDomain(s, 'script') },
  {
    id: 'server',
    present: (s) =>
      Object.values(s).some((e) =>
        /docker|proxmox|container|zfs|truenas|\bnas\b|\bpbs\b|server/i.test(
          `${e.entity_id} ${friendly(e)}`,
        ),
      ),
  },
];

/** A category-launcher group block (vertical mini-tiles, one per present category). */
function launcherBlock(states: HassEntities, title = 'Everything'): BlockConfig | null {
  const present = CATEGORIES.filter((c) => c.present(states));
  if (!present.length) return null;
  return {
    id: tid('launcher'),
    type: 'group',
    title,
    axis: 'none',
    entityIds: present.map((c) => `category.${c.id}`),
    span: 'full',
  };
}

/** Scenes + scripts as a quick-action group. */
function scenesBlock(states: HassEntities, limit = 8): BlockConfig | null {
  const scenes = Object.values(states)
    .filter((e) => (domainOf(e.entity_id) === 'scene' || domainOf(e.entity_id) === 'script') && isLive(e))
    .map((e) => e.entity_id);
  if (!scenes.length) return null;
  return {
    id: tid('scenes'),
    type: 'group',
    title: 'Scenes',
    axis: 'function',
    entityIds: scenes.slice(0, limit),
    span: 'full',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// The templates
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 1. Minimal — the glanceable page. A short priority feed: one headline (climate or
 *    the best sensor), the most-used scenes, and a tight "lights on / locks" list.
 *    Few blocks, generous breathing room, nothing that needs a second look.
 */
const MINIMAL: PageTemplate = {
  id: 'minimal',
  name: 'Minimal',
  description: 'A calm, glanceable page — one headline, your scenes, and the essentials. Nothing more.',
  density: 'minimal',
  icon: 'minus',
  build: ({ states }) => {
    const blocks: BlockConfig[] = [];

    // Headline: climate hero, else the best sensor as a hero readout.
    const climate = firstWhere(states, (e) => domainOf(e.entity_id) === 'climate');
    const weather = firstWhere(states, (e) => domainOf(e.entity_id) === 'weather');
    const headEntity = climate ?? weather;
    if (headEntity) {
      blocks.push({
        id: tid('hero'),
        type: 'hero',
        title: friendly(headEntity),
        entityIds: [headEntity.entity_id],
        span: 'full',
      });
    } else {
      const s = headlineSensor(states);
      if (s) blocks.push({ id: tid('hero'), type: 'hero', title: friendly(s), entityIds: [s.entity_id], span: 'full' });
    }

    const scenes = scenesBlock(states, 6);
    if (scenes) blocks.push({ ...scenes, span: 'full' });

    // A single tight essentials list: lights, then locks/covers — whatever exists.
    const lights = ids(ofDomain(states, 'light')).slice(0, 6);
    const locks = ids(ofDomain(states, 'lock'));
    const essentials = [...lights, ...locks];
    if (essentials.length) {
      blocks.push({
        id: tid('essentials'),
        type: 'list',
        title: 'Essentials',
        entityIds: essentials.slice(0, 8),
        span: 'full',
      });
    }

    return blocks;
  },
};

/**
 * 2. Standard home — the everyday landing. A balanced feed: a category launcher,
 *    scenes, a live-status metric cluster, and a comfort/power trend chart. The
 *    "looks right out of the box" default.
 */
const STANDARD: PageTemplate = {
  id: 'standard',
  name: 'Standard home',
  description: 'The balanced everyday landing — category launcher, scenes, live status, and a trend chart.',
  density: 'standard',
  icon: 'layout-dashboard',
  build: ({ states }) => {
    const blocks: BlockConfig[] = [];

    const launcher = launcherBlock(states);
    if (launcher) blocks.push(launcher);

    const scenes = scenesBlock(states);
    if (scenes) blocks.push(scenes);

    // Live status: a small cluster of the most telling metrics.
    const metrics: string[] = [];
    const power = firstWhere(
      states,
      (e) => domainOf(e.entity_id) === 'sensor' && deviceClass(e) === 'power',
    );
    if (power) metrics.push(power.entity_id);
    const temp = firstWhere(
      states,
      (e) => domainOf(e.entity_id) === 'sensor' && deviceClass(e) === 'temperature',
    );
    if (temp) metrics.push(temp.entity_id);
    const battery = firstWhere(
      states,
      (e) => domainOf(e.entity_id) === 'sensor' && deviceClass(e) === 'battery',
    );
    if (battery) metrics.push(battery.entity_id);
    if (metrics.length) {
      blocks.push({
        id: tid('live'),
        type: 'group',
        title: 'Live status',
        axis: 'function',
        entityIds: metrics,
        span: 2,
      });
    }

    // A trend chart on the most meaningful sensor.
    const head = headlineSensor(states);
    if (head) blocks.push(chartBlock(head, 'full'));

    // Security at the foot: alarm hero, else a locks list.
    const alarm = firstWhere(states, (e) => domainOf(e.entity_id) === 'alarm_control_panel');
    if (alarm) {
      blocks.push({ id: tid('alarm'), type: 'hero', title: friendly(alarm), entityIds: [alarm.entity_id], span: 'full' });
    } else {
      const locks = ids(ofDomain(states, 'lock'));
      if (locks.length) blocks.push({ id: tid('locks'), type: 'list', title: 'Security & doors', entityIds: locks, span: 1 });
    }

    return blocks;
  },
};

/**
 * 3. Family hub — built for a shared household screen. Leads with scenes + people
 *    presence, then lights by room, media, and an attention strip for anything that
 *    needs a glance (open doors, running appliances). Warm, social, action-first.
 */
const FAMILY_HUB: PageTemplate = {
  id: 'family-hub',
  name: 'Family hub',
  description: 'A shared-screen hub — scenes, who is home, room lights, media and what needs attention.',
  density: 'standard',
  icon: 'users',
  build: ({ states, areaOf }) => {
    const blocks: BlockConfig[] = [];

    const scenes = scenesBlock(states);
    if (scenes) blocks.push(scenes);

    // People presence.
    const people = ids(ofDomain(states, 'person'));
    if (people.length) {
      blocks.push({
        id: tid('people'),
        type: 'group',
        title: 'Who’s home',
        axis: 'none',
        entityIds: people,
        span: 2,
      });
    }

    // Lights, grouped by room (the renderer sub-divides under quiet headings).
    const lights = ofDomain(states, 'light');
    if (lights.length) {
      blocks.push({
        id: tid('lights'),
        type: 'group',
        title: 'Lights',
        axis: areaOf ? 'room' : 'none',
        entityIds: ids(lights).slice(0, 24),
        span: 'full',
      });
    }

    // Media — a group of players.
    const media = ids(ofDomain(states, 'media_player'));
    if (media.length) {
      blocks.push({
        id: tid('media'),
        type: 'group',
        title: 'Media',
        axis: 'none',
        entityIds: media,
        span: 'full',
      });
    }

    // Attention strip: doors/windows/covers that may be open — conditional, dynamic.
    const watch = Object.values(states).filter(
      (e) =>
        isLive(e) &&
        ((domainOf(e.entity_id) === 'binary_sensor' &&
          ['door', 'window', 'garage_door', 'opening'].includes(deviceClass(e) ?? '')) ||
          domainOf(e.entity_id) === 'cover'),
    );
    if (watch.length) {
      blocks.push({
        id: tid('attention'),
        type: 'attention',
        title: 'Needs attention',
        entityIds: ids(watch).slice(0, 10),
        span: 'full',
      });
    }

    return blocks;
  },
};

/**
 * 4. Wall tablet — big tap targets for a mounted screen. Few, large blocks: a
 *    full-width scene wall, a slider-leaf light group (drag-to-set), and a climate
 *    hero. Sparse on text, heavy on touch.
 */
const WALL_TABLET: PageTemplate = {
  id: 'wall-tablet',
  name: 'Wall tablet',
  description: 'Big, finger-friendly controls for a mounted screen — scene wall, light sliders and a climate hero.',
  density: 'minimal',
  icon: 'tablet',
  build: ({ states }) => {
    const blocks: BlockConfig[] = [];

    // Scene wall — the primary affordance, full width.
    const scenes = scenesBlock(states, 6);
    if (scenes) blocks.push({ ...scenes, span: 'full' });

    // Climate hero — large, central.
    const climate = firstWhere(states, (e) => domainOf(e.entity_id) === 'climate');
    if (climate) {
      blocks.push({ id: tid('climate'), type: 'hero', title: friendly(climate), entityIds: [climate.entity_id], span: 'full' });
    }

    // Lights as a slider wall (drag-to-set, big targets) — `tile: 'slider'`.
    const lights = ids(ofDomain(states, 'light'));
    if (lights.length) {
      blocks.push({
        id: tid('lights'),
        type: 'group',
        title: 'Lights',
        axis: 'none',
        tile: 'slider',
        entityIds: lights.slice(0, 12),
        span: 'full',
      });
    }

    // Covers as their own big group, if any.
    const covers = ids(ofDomain(states, 'cover'));
    if (covers.length) {
      blocks.push({
        id: tid('covers'),
        type: 'group',
        title: 'Blinds & doors',
        axis: 'none',
        entityIds: covers.slice(0, 8),
        span: 'full',
      });
    }

    return blocks;
  },
};

/**
 * 5. Power user — maximum density. A category launcher up top, then everything in
 *    tight lists/charts: sensor sparklines, a multi-room light group, a live list of
 *    what's on, and a stacked chart wall. For someone who wants it all on one screen.
 */
const POWER_USER: PageTemplate = {
  id: 'power-user',
  name: 'Power user',
  description: 'Maximum density — launcher, sparklines, a live “what’s on” list and a stacked chart wall.',
  density: 'dense',
  icon: 'layout-grid',
  build: ({ states, areaOf }) => {
    const blocks: BlockConfig[] = [];

    const launcher = launcherBlock(states);
    if (launcher) blocks.push(launcher);

    // Numeric sensor metrics wall (sparklines).
    const nums = numericSensors(states);
    if (nums.length >= 2) {
      blocks.push({
        id: tid('metrics'),
        type: 'group',
        title: 'Sensors',
        axis: 'metrics',
        entityIds: ids(nums).slice(0, 12),
        span: 'full',
      });
    }

    // Lights, grouped by room when areas exist (tight rows).
    const lights = ofDomain(states, 'light');
    if (lights.length) {
      blocks.push({
        id: tid('lights'),
        type: 'group',
        title: 'Lights',
        axis: areaOf ? 'room' : 'none',
        entityIds: ids(lights).slice(0, 40),
        span: 'full',
      });
    }

    // A live list of everything currently on (dynamic source — auto-updates).
    blocks.push({
      id: tid('whats-on'),
      type: 'list',
      title: 'What’s on',
      entityIds: [],
      span: 2,
      source: {
        include: [
          { domain: 'light', state: 'on' },
          { domain: 'switch', state: 'on' },
          { domain: 'fan', state: 'on' },
          { domain: 'media_player', state: 'playing' },
        ],
        sort: 'name',
        hideWhenEmpty: false,
      },
    });

    // A stacked chart wall — the two headline sensors.
    const head = headlineSensor(states);
    if (head) {
      blocks.push(chartBlock(head, 2, 48));
      const headClass = deviceClass(head);
      const second = nums.find(
        (e) => e.entity_id !== head.entity_id && deviceClass(e) !== headClass,
      );
      if (second) blocks.push(chartBlock(second, 2, 48));
    }

    return blocks;
  },
};

/**
 * 6. By category — the tile-first, category-organised page the real dashboard
 *    validated (INSPIRATION.md). One section per present device category, each a
 *    group of that category's entities under a heading. Generalises the
 *    category-axis pattern into a single editable surface.
 */
const BY_CATEGORY: PageTemplate = {
  id: 'by-category',
  name: 'By category',
  description: 'A section per device type — lights, climate, media, sensors — each a group you can reorder and edit.',
  density: 'standard',
  icon: 'layers',
  build: ({ states, areaOf }) => {
    const blocks: BlockConfig[] = [];

    const sections: Array<{ title: string; domain: string; axis: BlockConfig['axis']; limit: number }> = [
      { title: 'Lights', domain: 'light', axis: areaOf ? 'room' : 'none', limit: 24 },
      { title: 'Climate', domain: 'climate', axis: 'none', limit: 8 },
      { title: 'Media', domain: 'media_player', axis: 'none', limit: 8 },
      { title: 'Covers', domain: 'cover', axis: 'none', limit: 12 },
      { title: 'Switches', domain: 'switch', axis: areaOf ? 'room' : 'none', limit: 20 },
      { title: 'Locks', domain: 'lock', axis: 'none', limit: 8 },
    ];

    for (const sec of sections) {
      const members = ids(ofDomain(states, sec.domain)).slice(0, sec.limit);
      if (!members.length) continue;
      blocks.push({
        id: tid(`cat-${sec.domain}`),
        type: 'group',
        title: sec.title,
        axis: sec.axis,
        entityIds: members,
        span: 'full',
      });
    }

    // Sensors as a metrics wall to close the page.
    const nums = numericSensors(states);
    if (nums.length) {
      blocks.push({
        id: tid('cat-sensors'),
        type: 'group',
        title: 'Sensors',
        axis: 'metrics',
        entityIds: ids(nums).slice(0, 12),
        span: 'full',
      });
    }

    return blocks;
  },
};

/**
 * The template gallery — ordered glance → dense (DESIGN_PRINCIPLES progressive
 * disclosure). The integrator imports this; the gallery renders it.
 */
export const TEMPLATES: PageTemplate[] = [
  MINIMAL,
  STANDARD,
  FAMILY_HUB,
  WALL_TABLET,
  POWER_USER,
  BY_CATEGORY,
];

/** Look up a template by id. */
export function getTemplate(id: string): PageTemplate | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
