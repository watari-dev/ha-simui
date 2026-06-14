// Security category surface (PRESETS.md §I5, Phase 2) — a presence-first status
// board, not micro-rows. Composes:
//   - a conditional "Attention" StatusStrip pill (mounts only when unsecured)
//   - an Attention escalation block at the top (collapses to "All N clear")
//   - a StatusBoardTile board (squircle tiles, sorted unsecured-first)
//   - the alarm panel as a full-width hero with the arm-mode segmented control
//
// Degradation: no alarm → no hero; all-secure → the board still renders calm
// tiles and the Attention strip collapses to one quiet line.
import type { Block } from '../types';
import type { HassEntity } from '../../types';
import type { PresetContext, StripPill, Surface } from './index';
import { blockId, isLive, ofDomain } from './index';
import { attentionIds } from '../../components/StatusBoardTile';
import { domainOf } from '../../util';

// device_classes that belong on the security surface (mirrors StatusBoardTile).
const DOOR_CLASSES = new Set(['door', 'garage_door', 'window', 'opening']);
const HAZARD_CLASSES = new Set(['smoke', 'gas', 'carbon_monoxide']);
const LEAK_CLASSES = new Set(['moisture']);

function isSecurityBinary(e: HassEntity): boolean {
  if (domainOf(e.entity_id) !== 'binary_sensor' || !isLive(e)) return false;
  const dc = e.attributes.device_class as string | undefined;
  return !!dc && (DOOR_CLASSES.has(dc) || HAZARD_CLASSES.has(dc) || LEAK_CLASSES.has(dc));
}

/** Is this cover an exterior/entry cover worth treating as a security boundary? */
function isSecurityCover(e: HassEntity): boolean {
  if (!isLive(e)) return false;
  const dc = e.attributes.device_class as string | undefined;
  const hay = `${e.entity_id} ${(e.attributes.friendly_name as string) ?? ''}`.toLowerCase();
  return dc === 'garage' || dc === 'door' || /garage|gate|front|back|exterior|entry/.test(hay);
}

export function buildSecurity(ctx: PresetContext): Surface {
  const { states } = ctx;

  const locks = ofDomain(states, 'lock').filter(isLive);
  const alarms = ofDomain(states, 'alarm_control_panel').filter(isLive);
  const covers = ofDomain(states, 'cover').filter(isSecurityCover);
  const binaries = Object.values(states).filter(isSecurityBinary);

  // The full watched set: sort unsecured first (securityStatus is pure).
  const all: HassEntity[] = [...alarms, ...locks, ...covers, ...binaries];
  const surface: Surface = { blocks: [] };
  if (!all.length) return surface;

  const allIds = all.map((e) => e.entity_id);
  const attn = attentionIds(states, allIds);
  const attnSet = new Set(attn);

  // StatusStrip: a conditional pill that mounts only while something is unsecured,
  // plus a "Lock all" action when there are locks to act on.
  const strip: StripPill[] = [];
  if (alarms.length) {
    strip.push({
      kind: 'conditional',
      icon: 'alert-triangle',
      label: 'Triggered',
      accent: 'down',
      visibleWhen: { entity: alarms[0].entity_id, state: 'triggered' },
    });
  }
  if (locks.length) {
    strip.push({
      kind: 'action',
      icon: 'lock',
      label: 'Lock all',
      accent: 'green',
      action: { action: 'call-service', service: 'lock.lock', target: { entity_id: locks.map((e) => e.entity_id) } },
    });
  }
  if (strip.length) surface.statusStrip = strip;

  // 1. Attention escalation — self-collapses to "All N clear".
  surface.blocks.push({
    id: blockId('security-attention'),
    type: 'attention',
    entityIds: allIds,
    span: 'full',
  });

  // 2. Alarm panel hero(es) — arm-mode segmented control belongs on the hero.
  for (const a of alarms) {
    surface.blocks.push({
      id: blockId('security-alarm'),
      type: 'hero',
      title: (a.attributes.friendly_name as string) ?? a.entity_id,
      entityIds: [a.entity_id],
      span: 'full',
    });
  }

  // 3. Status board — squircle tiles, unsecured sorted first.
  const boardEnts = [...locks, ...covers, ...binaries];
  const boardIds = boardEnts
    .map((e) => e.entity_id)
    .sort((x, y) => (attnSet.has(y) ? 1 : 0) - (attnSet.has(x) ? 1 : 0));
  if (boardIds.length) {
    surface.blocks.push(board('Doors & locks', boardIds));
  }

  return surface;
}

function board(title: string, entityIds: string[]): Block {
  return {
    id: blockId('security-board'),
    type: 'group',
    title,
    tile: 'statusboard', // → StatusBoardTile grid (Phase 2, I5)
    entityIds,
    span: 'full',
  };
}
