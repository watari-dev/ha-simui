import type { HassEntities } from '../types';
import type { Room } from './types';

/** A short glanceable summary of a room's state, e.g. "21° · 3 lights on · all locked". */
export function summarizeRoom(room: Room, lightIds: string[], states: HassEntities): string {
  const parts: string[] = [];

  const heroId = room.blocks.find((b) => b.type === 'hero')?.entityIds[0];
  const temp = heroId ? states[heroId]?.attributes.current_temperature : undefined;
  if (temp != null) parts.push(`${Math.round(Number(temp))}°`);

  if (lightIds.length) {
    const on = lightIds.filter((id) => states[id]?.state === 'on').length;
    if (on) parts.push(`${on} ${on === 1 ? 'light' : 'lights'} on`);
  }

  const lockIds = room.blocks.flatMap((b) => b.entityIds).filter((id) => id.startsWith('lock.'));
  if (lockIds.length) {
    const unlocked = lockIds.filter((id) => states[id]?.state === 'unlocked').length;
    parts.push(unlocked ? `${unlocked} unlocked` : 'all locked');
  }

  return parts.join(' · ');
}

export function lightIdsOf(room: Room): string[] {
  return room.blocks.flatMap((b) => b.entityIds).filter((id) => id.startsWith('light.'));
}
