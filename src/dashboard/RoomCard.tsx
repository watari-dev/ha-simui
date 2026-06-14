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
  const lightIds = useMemo(() => lightIdsOf(room), [room]);
  const lockIds = useMemo(() => room.blocks.flatMap((b) => b.entityIds).filter((id) => id.startsWith('lock.')), [room]);
  const deviceCount = useMemo(() => new Set(room.blocks.flatMap((b) => b.entityIds)).size, [room]);

  const lit = useAggregate((s) => lightIds.some((id) => s[id]?.state === 'on'));
  const unlocked = useAggregate((s) => lockIds.some((id) => s[id]?.state === 'unlocked'));
  const glance = useAggregate((s) => summarizeRoom(room, lightIds, s));

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
