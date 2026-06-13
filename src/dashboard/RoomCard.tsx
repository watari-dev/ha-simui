import { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { useAggregate } from '../hass/context';
import { lightIdsOf, summarizeRoom } from './summary';
import type { Room } from './types';

// A room as an entry tile on the home overview — name + glance, warm-tinted
// when something's on. Tap to enter the room.
export function RoomCard({ room, onOpen }: { room: Room; onOpen: () => void }) {
  const lightIds = useMemo(() => lightIdsOf(room), [room]);
  const deviceCount = useMemo(() => new Set(room.blocks.flatMap((b) => b.entityIds)).size, [room]);
  const lit = useAggregate((states) => lightIds.some((id) => states[id]?.state === 'on'));
  const glance = useAggregate((states) => summarizeRoom(room, lightIds, states));

  return (
    <button className={`simui-roomcard${lit ? ' lit' : ''}`} onClick={onOpen}>
      <div className="simui-roomcard-top">
        <span className="simui-roomcard-name">{room.name}</span>
        <ChevronRight className="simui-roomcard-go" size={16} />
      </div>
      <span className="simui-roomcard-glance num">{glance || `${deviceCount} ${deviceCount === 1 ? 'device' : 'devices'}`}</span>
    </button>
  );
}
