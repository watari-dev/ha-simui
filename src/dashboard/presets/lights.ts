// Lights category surface (PRESETS.md §2) — "all your lights, grouped by room",
// the room's light-group tile leading each section.
//
// Degradation: few lights → one flat GroupBlock (no per-room split). Many lights
// / no group entities → still split by room; each room's group tile (if any) leads
// and members follow with the room prefix stripped to the leaf.
import type { Block } from '../types';
import type { PresetContext, Surface } from './index';
import { blockId, groupByRoom } from './index';
import { friendly } from '../../util';

const FEW_LIGHTS = 6; // at/under this, don't bother splitting by room

/** Is this light entity a *group* (the aggregate that should lead a room)? */
function isLightGroup(entity_id: string, name: string): boolean {
  const hay = `${entity_id} ${name}`.toLowerCase();
  return /group|all\b|_lights\b|\blights$/.test(hay);
}

/** Order a room's lights so any group/aggregate tile leads, then members A→Z. */
function orderRoomLights(ids: Array<{ id: string; name: string }>): string[] {
  const groups = ids.filter((x) => isLightGroup(x.id, x.name));
  const members = ids.filter((x) => !isLightGroup(x.id, x.name));
  return [...groups, ...members].map((x) => x.id);
}

export function buildLights(ctx: PresetContext): Surface {
  const { states, areas } = ctx;
  const lights = Object.values(states).filter((e) => e.entity_id.startsWith('light.'));

  const surface: Surface = { blocks: [] };
  if (!lights.length) return surface;

  // StatusStrip: "N on" count → sheet of on-lights; All-off + an ambient scene.
  surface.statusStrip = [
    {
      kind: 'count',
      icon: 'lightbulb',
      label: 'on',
      accent: 'warm',
      source: { include: [{ domain: 'light', state: 'on' }], hideWhenEmpty: false },
    },
    {
      kind: 'action',
      icon: 'power-off',
      label: 'All off',
      action: { action: 'call-service', service: 'light.turn_off', target: { entity_id: 'all' } },
    },
  ];

  // Degradation: few lights → a single flat group, no per-room split.
  if (lights.length <= FEW_LIGHTS) {
    const ordered = orderRoomLights(lights.map((e) => ({ id: e.entity_id, name: friendly(e) })));
    surface.blocks.push(group('Lights', ordered, 'full'));
    return surface;
  }

  // One GroupBlock per area (axis:'room'); group-entity leads each.
  for (const [room, ents] of groupByRoom(lights, areas)) {
    const ordered = orderRoomLights(ents.map((e) => ({ id: e.entity_id, name: friendly(e) })));
    if (ordered.length) surface.blocks.push(group(room, ordered, 2));
  }
  return surface;
}

function group(title: string, entityIds: string[], span: Block['span']): Block {
  // `tile:'slider'` → the drag-to-set SliderTile wall (Phase 2, signature #2):
  // the tinted fill IS the brightness; drag to set, tap to toggle.
  return { id: blockId('lights'), type: 'group', title, axis: 'room', tile: 'slider', entityIds, span };
}
