import { useMemo } from 'react';
import { Bath, BedDouble, Briefcase, Car, ChevronRight, DoorOpen, Home, Sofa, Trees, Utensils, type LucideIcon } from 'lucide-react';
import { useAggregate } from '../hass/context';
import { lightIdsOf, summarizeRoom } from './summary';
import type { Room } from './types';

function iconFor(name: string): LucideIcon {
  const n = name.toLowerCase();
  if (n.includes('living')) return Sofa;
  if (n.includes('kitchen')) return Utensils;
  if (n.includes('bed')) return BedDouble;
  if (n.includes('office')) return Briefcase;
  if (n.includes('bath')) return Bath;
  if (n.includes('hall')) return DoorOpen;
  if (n.includes('garage')) return Car;
  if (n.includes('outdoor') || n.includes('garden')) return Trees;
  return Home;
}

// A room as an entry tile on the home overview. The icon chip carries colour
// regardless of state (so the grid is alive even when everything's off); it
// warms when a light is on and goes amber when something's unlocked.
export function RoomCard({ room, onOpen }: { room: Room; onOpen: () => void }) {
  const allIds = useMemo(() => room.blocks.flatMap((b) => b.entityIds), [room]);
  const lightIds = useMemo(() => lightIdsOf(room), [room]);
  const lockIds = useMemo(() => allIds.filter((id) => id.startsWith('lock.')), [allIds]);
  const deviceCount = useMemo(() => new Set(allIds).size, [allIds]);

  const lit = useAggregate((s) => lightIds.some((id) => s[id]?.state === 'on'));
  const unlocked = useAggregate((s) => lockIds.some((id) => s[id]?.state === 'unlocked'));
  // summarizeRoom builds a string from hero-temp + lights + locks → deps-scope to the
  // room's entities so an unrelated tick skips it (the string work, not just a scan).
  const glance = useAggregate((s) => summarizeRoom(room, lightIds, s), allIds);

  const Icon = iconFor(room.name);
  const mood = lit ? 'warm' : unlocked ? 'amber' : 'accent';

  return (
    <button className={`simui-roomcard${lit ? ' lit' : ''}`} onClick={onOpen}>
      <div className="simui-roomcard-top">
        <span className={`simui-roomcard-icon ${mood}`}><Icon size={18} strokeWidth={2} /></span>
        <ChevronRight className="simui-roomcard-go" size={16} />
      </div>
      <span className="simui-roomcard-name">{room.name}</span>
      <span className="simui-roomcard-glance num">
        {glance || `${deviceCount} ${deviceCount === 1 ? 'device' : 'devices'}`}
      </span>
    </button>
  );
}
