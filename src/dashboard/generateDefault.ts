import type { Block, BlockSpan, DashboardConfig, Room } from './types';
import type { AreaMap } from './areas';
import type { HassEntities, HassEntity } from '../types';
import { domainOf, friendly, uid } from '../util';

// Assign entities to rooms. Real HA area registry is preferred when embedded
// (the resolved AreaMap is passed in); absent that (dev/mock), fall back to
// name-keyword heuristics.
const ROOM_KEYWORDS: Array<[string, string]> = [
  ['living', 'Living Room'], ['kitchen', 'Kitchen'], ['bedroom', 'Bedroom'], ['bed_', 'Bedroom'],
  ['office', 'Office'], ['bath', 'Bathroom'], ['hall', 'Hallway'], ['garage', 'Garage'],
  ['outside', 'Outdoor'], ['outdoor', 'Outdoor'], ['garden', 'Garden'], ['backyard', 'Outdoor'],
];
const ALLOW = new Set(['light', 'climate', 'media_player', 'cover', 'lock', 'fan', 'switch', 'sensor', 'binary_sensor', 'humidifier', 'siren']);
const ROOM_ORDER = ['Living Room', 'Kitchen', 'Bedroom', 'Office', 'Bathroom', 'Hallway', 'Garage', 'Outdoor', 'Garden', 'Home'];

function roomNameFor(e: HassEntity, areas?: AreaMap): string {
  // Prefer the real area registry when we have a join for this entity.
  const reg = areas?.[e.entity_id];
  if (reg) return reg.areaName;
  const hay = `${e.entity_id} ${friendly(e)}`.toLowerCase();
  for (const [kw, name] of ROOM_KEYWORDS) if (hay.includes(kw)) return name;
  return 'Home';
}

/** A real area_id when known, else null (heuristic rooms have none persisted). */
function roomAreaIdFor(e: HassEntity, areas?: AreaMap): string | null {
  const reg = areas?.[e.entity_id];
  return reg && !reg.areaId.startsWith('heuristic:') ? reg.areaId : null;
}

export function defaultCardSpan(entityId: string): BlockSpan {
  const d = domainOf(entityId);
  return d === 'media_player' || d === 'sensor' ? 2 : 1;
}

export function generateDefault(states: HassEntities, areas?: AreaMap): DashboardConfig {
  const byRoom = new Map<string, HassEntity[]>();
  const areaIdOf = new Map<string, string | null>();
  for (const e of Object.values(states)) {
    const d = domainOf(e.entity_id);
    if (!ALLOW.has(d)) continue;
    if (d === 'sensor' && !e.attributes.unit_of_measurement) continue;
    const name = roomNameFor(e, areas);
    let arr = byRoom.get(name);
    if (!arr) { arr = []; byRoom.set(name, arr); }
    arr.push(e);
    if (!areaIdOf.has(name)) areaIdOf.set(name, roomAreaIdFor(e, areas));
  }

  const rooms: Room[] = [];
  for (const [name, ents] of byRoom) {
    const ofDomain = (d: string) =>
      ents.filter((e) => domainOf(e.entity_id) === d).sort((a, b) => friendly(a).localeCompare(friendly(b)));
    const lights = ofDomain('light');
    const climates = ofDomain('climate');
    const medias = ofDomain('media_player');
    const covers = ofDomain('cover');
    const locks = ofDomain('lock');
    const switches = [...ofDomain('switch'), ...ofDomain('fan'), ...ofDomain('humidifier'), ...ofDomain('siren')];
    const sensors = [...ofDomain('sensor'), ...ofDomain('binary_sensor')];

    const blocks: Block[] = [];
    const add = (type: Block['type'], ids: string[], span: BlockSpan, title?: string) => {
      if (ids.length) blocks.push({ id: uid(), type, title, entityIds: ids, span });
    };

    if (climates.length) add('hero', [climates[0].entity_id], 2);
    add('group', lights.map((e) => e.entity_id), 2, 'Lighting');
    for (const m of medias) add('card', [m.entity_id], 2);
    if (climates.length > 1) add('list', climates.slice(1).map((e) => e.entity_id), 1, 'Climate');
    add('list', [...locks, ...covers].map((e) => e.entity_id), 1, 'Security & doors');
    add('group', switches.map((e) => e.entity_id), 1, 'Switches & fans');
    add('list', sensors.map((e) => e.entity_id), 1, 'Sensors');

    if (blocks.length) rooms.push({ id: uid(), name, areaId: areaIdOf.get(name) ?? null, blocks });
  }

  rooms.sort((a, b) => {
    const ia = ROOM_ORDER.indexOf(a.name);
    const ib = ROOM_ORDER.indexOf(b.name);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.name.localeCompare(b.name);
  });
  return { version: 3, rooms, overrides: {} };
}
