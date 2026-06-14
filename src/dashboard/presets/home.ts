// Home summary surface (PRESETS.md §1) — the landing. A vertical PRIORITY FEED,
// not a card grid (DESIGN_PRINCIPLES.md §14): status strip → conditional alert →
// scenes/favorites → category launcher → live status → security.
//
// Degradation: the launcher lists only categories with entities. No scenes → drop
// that block. No energy → drop the metric cluster. No alarm → security becomes a
// lock tile or is omitted. Minimum viable Home = strip + launcher.
import type { Condition } from '../types';
import type { ColorToken } from '../../widgets/tileContract';
import type { HassEntities, HassEntity } from '../../types';
import type { PresetContext, StripPill, Surface } from './index';
import { blockId, anyWhere, isLive } from './index';
import { domainOf, friendly } from '../../util';

// Which categories exist, and the nav/launcher metadata for each. Mirrors the
// category axis in CLAUDE.md (Lights / Climate / Media / Security / Sensors /
// Power / Scenes / System). Each maps to a preset surface where one exists.
interface CategoryDef {
  id: string;
  name: string;
  icon: string;
  accent: ColorToken;
  present: (states: HassEntities) => boolean;
}

const CATEGORIES: CategoryDef[] = [
  { id: 'lights', name: 'Lights', icon: 'lightbulb', accent: 'warm', present: (s) => hasDomain(s, 'light') },
  { id: 'climate', name: 'Climate', icon: 'thermostat', accent: 'accent', present: (s) => hasDomain(s, 'climate') || hasDomain(s, 'humidifier') },
  { id: 'media', name: 'Media', icon: 'cast', accent: 'accent', present: (s) => hasDomain(s, 'media_player') },
  { id: 'security', name: 'Security', icon: 'shield', accent: 'up', present: (s) => hasDomain(s, 'lock') || hasDomain(s, 'alarm_control_panel') || hasBinaryClass(s, 'door', 'window', 'motion') },
  { id: 'sensors', name: 'Sensors', icon: 'activity', accent: 'up', present: (s) => hasNumericSensor(s) || hasDomain(s, 'binary_sensor') },
  { id: 'power', name: 'Power', icon: 'zap', accent: 'warn', present: (s) => hasPower(s) },
  { id: 'scenes', name: 'Scenes', icon: 'sparkles', accent: 'accent', present: (s) => hasDomain(s, 'scene') || hasDomain(s, 'script') },
  { id: 'server', name: 'System', icon: 'server', accent: 'up', present: (s) => hasServer(s) },
];

function hasDomain(states: HassEntities, domain: string): boolean {
  return anyWhere(states, (e) => domainOf(e.entity_id) === domain && isLive(e));
}
function hasBinaryClass(states: HassEntities, ...classes: string[]): boolean {
  return anyWhere(states, (e) => domainOf(e.entity_id) === 'binary_sensor' && classes.includes(e.attributes.device_class as string));
}
function hasNumericSensor(states: HassEntities): boolean {
  return anyWhere(states, (e) => domainOf(e.entity_id) === 'sensor' && e.attributes.unit_of_measurement != null && isLive(e));
}
function hasPower(states: HassEntities): boolean {
  return anyWhere(states, (e) => domainOf(e.entity_id) === 'sensor' && (e.attributes.device_class === 'power' || e.attributes.device_class === 'energy'));
}
function hasServer(states: HassEntities): boolean {
  return anyWhere(states, (e) => /docker|proxmox|container|zfs|truenas|\bnas\b|\bpbs\b|server/i.test(`${e.entity_id} ${friendly(e)}`));
}

export function buildHome(ctx: PresetContext): Surface {
  const { states } = ctx;
  const surface: Surface = { blocks: [] };

  // ── StatusStrip (chrome) ──
  const strip: StripPill[] = [];

  // CountPills: lights on, fans on.
  if (hasDomain(states, 'light')) {
    strip.push({
      kind: 'count',
      icon: 'lightbulb',
      label: 'lights on',
      accent: 'warm',
      source: { include: [{ domain: 'light', state: 'on' }], hideWhenEmpty: false },
    });
  }
  if (hasDomain(states, 'fan')) {
    strip.push({
      kind: 'count',
      icon: 'fan',
      label: 'fans on',
      accent: 'accent',
      source: { include: [{ domain: 'fan', state: 'on' }], hideWhenEmpty: false },
    });
  }

  // ConditionalBadges: door unlocked, appliance running — render only while true.
  if (hasDomain(states, 'lock')) {
    strip.push({
      kind: 'conditional',
      icon: 'lock-open',
      label: 'Door unlocked',
      accent: 'warn',
      visibleWhen: firstStateCondition(states, (e) => domainOf(e.entity_id) === 'lock', 'unlocked'),
    });
  }

  // Weather, if present, as a status tile.
  const weather = Object.values(states).find((e) => domainOf(e.entity_id) === 'weather' && isLive(e));
  if (weather) strip.push({ kind: 'status', entityId: weather.entity_id, stateContent: ['state'] });

  if (strip.length) surface.statusStrip = strip;

  // ── Block 1: Conditional alert (garage/door open) — mounts only on alert ──
  const openCover = Object.values(states).find(
    (e) => domainOf(e.entity_id) === 'cover' && /garage|door|gate/i.test(friendly(e)),
  );
  if (openCover) {
    surface.blocks.push({
      id: blockId('home-alert'),
      type: 'hero',
      title: friendly(openCover),
      entityIds: [openCover.entity_id],
      span: 'full',
      visibleWhen: { entity: openCover.entity_id, state: 'open' },
    });
  }

  // ── Block 2: Favorites / scenes ──
  const scenes = Object.values(states)
    .filter((e) => (domainOf(e.entity_id) === 'scene' || domainOf(e.entity_id) === 'script') && isLive(e))
    .map((e) => e.entity_id);
  if (scenes.length) {
    surface.blocks.push({
      id: blockId('home-scenes'),
      type: 'group',
      title: 'Scenes',
      axis: 'function',
      entityIds: scenes.slice(0, 8),
      span: 'full',
    });
  }

  // ── Block 3: Category launcher — vertical mini-tiles, one per present category ──
  // Action-only tiles (no entity): the entityIds are the category ids, the renderer
  // draws them as nav launchers (navigate(category)). This always renders (the
  // minimum-viable Home is strip + launcher).
  const present = CATEGORIES.filter((c) => c.present(states));
  surface.blocks.push({
    id: blockId('home-launcher'),
    type: 'group',
    title: 'Everything',
    axis: 'none',
    entityIds: present.map((c) => `category.${c.id}`),
    span: 'full',
  });

  // ── Block 4: Live status — read-only metric tiles + a couple of rich statuses ──
  const metrics: string[] = [];
  const pickFirst = (pred: (e: HassEntity) => boolean) => {
    const e = Object.values(states).find(pred);
    if (e) metrics.push(e.entity_id);
  };
  pickFirst((e) => domainOf(e.entity_id) === 'sensor' && e.attributes.device_class === 'power' && /house|home|total|load|consumption/i.test(friendly(e)));
  pickFirst((e) => domainOf(e.entity_id) === 'sensor' && /sol(ar)?|pv|generation/i.test(friendly(e)) && e.attributes.unit_of_measurement != null);
  pickFirst((e) => domainOf(e.entity_id) === 'sensor' && e.attributes.device_class === 'battery');
  // Rich appliance statuses (washer/dryer) if any.
  const appliance = Object.values(states).find((e) => /washer|dryer|dishwasher|laundry/i.test(friendly(e)) && isLive(e));
  if (appliance) metrics.push(appliance.entity_id);
  if (metrics.length) {
    surface.blocks.push({
      id: blockId('home-live'),
      type: 'group',
      title: 'Live status',
      axis: 'function',
      entityIds: metrics,
      span: 2,
    });
  }

  // ── Block 5: Security hero — alarm (curated modes) → lock fallback → omit ──
  const alarm = Object.values(states).find((e) => domainOf(e.entity_id) === 'alarm_control_panel' && isLive(e));
  if (alarm) {
    surface.blocks.push({
      id: blockId('home-security'),
      type: 'hero',
      title: friendly(alarm),
      entityIds: [alarm.entity_id],
      span: 'full',
    });
  } else {
    const locks = Object.values(states).filter((e) => domainOf(e.entity_id) === 'lock' && isLive(e)).map((e) => e.entity_id);
    if (locks.length) {
      surface.blocks.push({
        id: blockId('home-locks'),
        type: 'list',
        title: 'Security & doors',
        axis: 'none',
        entityIds: locks,
        span: 1,
      });
    }
  }

  return surface;
}

/** Build a visibleWhen Condition keyed on the first entity matching a predicate. */
function firstStateCondition(states: HassEntities, pred: (e: HassEntity) => boolean, state: string): Condition {
  const e = Object.values(states).find(pred);
  return { entity: e ? e.entity_id : 'unknown.none', state };
}
