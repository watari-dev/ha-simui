import { useMemo, type CSSProperties } from 'react';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Check, ChevronLeft, Pencil } from 'lucide-react';
import { useAggregate } from '../hass/context';
import { useDashboard } from './store';
import { useEditableSurface } from './useEditableSurface';
import { EmptyState } from '../editor/chrome';
import { BlockChrome, StaticBlock } from './BlockChrome';
import { lightIdsOf, summarizeRoom } from './summary';
import type { Room } from './types';

export function RoomView({ room }: { room: Room }) {
  const { goHome } = useDashboard();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // Rooms are always editable and have NO override — their blocks live directly on
  // the room (passed as `surfaceBlocks`). The shared hook renders the editor's
  // optimistic working copy while active, else the room's blocks; the store seeds
  // `dirtyBlocks` from `room.blocks` on enter and commits edits straight back
  // (debounced). No snapshot/reset — a room has no preset to revert to.
  const { blocks, active, onEditToggle, onBack, moveBlock, openGallery } = useEditableSurface({
    surface: { kind: 'room' },
    surfaceBlocks: room.blocks,
  });
  const ids = blocks.map((b) => b.id);
  const lightIds = useMemo(() => lightIdsOf(room), [room]);

  const onDragEnd = (e: DragEndEvent) => {
    const { active: dragged, over } = e;
    if (!over || dragged.id === over.id) return;
    const o = ids.indexOf(String(dragged.id));
    const n = ids.indexOf(String(over.id));
    if (o >= 0 && n >= 0) moveBlock(o, n);
  };

  return (
    <div className="simui-app">
      <header className="simui-head">
        <button className="simui-back" onClick={() => onBack(goHome)} aria-label="Back to home"><ChevronLeft size={18} /></button>
        <span className="simui-head-title">{room.name}</span>
        <RoomGlance room={room} lightIds={lightIds} />
        <span className="simui-spacer" />
        {/* Add / Undo / Redo / Save live in the floating EditorToolbar while editing
            (mounted by DashboardView) — keep the header chrome minimal. */}
        <button
          className={`simui-iconbtn-h${active ? ' active' : ''}`}
          onClick={onEditToggle}
          aria-label={active ? 'Done editing' : 'Edit room'}
        >
          {active ? <Check size={16} /> : <Pencil size={15} />}
        </button>
      </header>

      <div className="simui-content simui-room">
        <RoomAmbient lightIds={lightIds} />
        {blocks.length ? (
          active ? (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={ids} strategy={rectSortingStrategy}>
                <div className="simui-grid">
                  {blocks.map((b) => <BlockChrome key={b.id} block={b} editing />)}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <div className="simui-grid">
              {blocks.map((b) => <StaticBlock key={b.id} block={b} />)}
            </div>
          )
        ) : active ? (
          <EmptyState
            title={`${room.name} is empty`}
            onAddCard={() => openGallery()}
          />
        ) : (
          <div className="simui-msg">Nothing in {room.name} yet.</div>
        )}
      </div>
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
