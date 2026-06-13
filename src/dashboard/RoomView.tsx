import { useMemo, useState, type CSSProperties } from 'react';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Check, ChevronLeft, Pencil, Plus } from 'lucide-react';
import { useAggregate } from '../hass/context';
import { useDashboard } from './store';
import { BlockChrome } from './BlockChrome';
import { AddCardPanel } from './AddCardPanel';
import { lightIdsOf, summarizeRoom } from './summary';
import type { Room } from './types';

export function RoomView({ room }: { room: Room }) {
  const { editing, setEditing, reorderBlocks, addCard, goHome } = useDashboard();
  const [adding, setAdding] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const ids = room.blocks.map((b) => b.id);
  const lightIds = useMemo(() => lightIdsOf(room), [room]);

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const o = ids.indexOf(String(active.id));
    const n = ids.indexOf(String(over.id));
    if (o >= 0 && n >= 0) reorderBlocks(o, n);
  };

  return (
    <div className="simui-app">
      <header className="simui-head">
        <button className="simui-back" onClick={goHome} aria-label="Back to home"><ChevronLeft size={18} /></button>
        <span className="simui-head-title">{room.name}</span>
        <RoomGlance room={room} lightIds={lightIds} />
        <span className="simui-spacer" />
        {editing && (
          <button className="simui-iconbtn-h" onClick={() => setAdding(true)} aria-label="Add card"><Plus size={16} /></button>
        )}
        <button
          className={`simui-iconbtn-h${editing ? ' active' : ''}`}
          onClick={() => setEditing(!editing)}
          aria-label={editing ? 'Done editing' : 'Edit room'}
        >
          {editing ? <Check size={16} /> : <Pencil size={15} />}
        </button>
      </header>

      <div className="simui-content simui-room">
        <RoomAmbient lightIds={lightIds} />
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={ids} strategy={rectSortingStrategy}>
            <div className="simui-grid">
              {room.blocks.map((b) => <BlockChrome key={b.id} block={b} editing={editing} />)}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {adding && (
        <AddCardPanel
          existing={room.blocks.flatMap((b) => b.entityIds)}
          onAdd={addCard}
          onClose={() => setAdding(false)}
        />
      )}
    </div>
  );
}

function RoomGlance({ room, lightIds }: { room: Room; lightIds: string[] }) {
  const summary = useAggregate((states) => summarizeRoom(room, lightIds, states));
  return summary ? <span className="simui-head-glance num">{summary}</span> : null;
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
