import { useMemo, type CSSProperties } from 'react';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useAggregate } from '../hass/context';
import { domainOf } from '../util';
import { useDashboard } from './store';
import { BlockChrome } from './BlockChrome';
import type { Room } from './types';

export function RoomView({ room }: { room: Room }) {
  const { editing, reorderBlocks } = useDashboard();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const ids = room.blocks.map((b) => b.id);
  const lightIds = useMemo(
    () => room.blocks.flatMap((b) => b.entityIds).filter((id) => domainOf(id) === 'light'),
    [room],
  );

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const o = ids.indexOf(String(active.id));
    const n = ids.indexOf(String(over.id));
    if (o >= 0 && n >= 0) reorderBlocks(o, n);
  };

  return (
    <div className="simui-room">
      <RoomAmbient lightIds={lightIds} />
      <RoomSummary room={room} lightIds={lightIds} />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={ids} strategy={rectSortingStrategy}>
          <div className="simui-grid">
            {room.blocks.map((b) => <BlockChrome key={b.id} block={b} editing={editing} />)}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function RoomAmbient({ lightIds }: { lightIds: string[] }) {
  const frac = useAggregate((states) => {
    if (!lightIds.length) return 0;
    const on = lightIds.filter((id) => states[id]?.state === 'on').length;
    return Math.round((on / lightIds.length) * 10) / 10;
  });
  const opacity = 0.04 + frac * 0.13;
  return <div className="simui-ambient" style={{ '--amb': String(opacity) } as CSSProperties} />;
}

function RoomSummary({ room, lightIds }: { room: Room; lightIds: string[] }) {
  const summary = useAggregate((states) => {
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
  });

  return (
    <div className="simui-room-head">
      <span className="simui-room-name">{room.name}</span>
      {summary && <span className="simui-room-glance num">{summary}</span>}
    </div>
  );
}
