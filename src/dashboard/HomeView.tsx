import { useMemo, useState } from 'react';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Check, Pencil, Plus, RotateCcw } from 'lucide-react';
import { useAggregate, useAllStates } from '../hass/context';
import { useAreas } from './areas';
import { useDashboard } from './store';
import { RoomCard } from './RoomCard';
import { SurfaceStrip } from './SurfaceStrip';
import { BlockChrome, StaticBlock } from './BlockChrome';
import { AddCardPanel } from './AddCardPanel';
import { AmbientCanvas } from '../components/AmbientCanvas';
import { buildHome } from './presets/home';
import type { Surface } from './presets/index';
import type { DashboardConfig } from './types';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 5) return 'Good night';
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export function HomeView() {
  const { config, openRoom, editing, setEditing, reorderBlocks, addCard, createHomeOverride, resetHomeOverride } = useDashboard();
  const states = useAllStates();
  const areaMap = useAreas();
  const [adding, setAdding] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // The Home summary preset: status strip + scenes + category launcher + security
  // (PRESETS.md §1). Rebuilt only when the entity SET changes. `areaMap` is
  // entity-keyed (entityId → {area, floor}); the builders look up by entity id.
  const idSig = useMemo(() => Object.keys(states).sort().join(','), [states]);
  const surface: Surface = useMemo(() => buildHome({ states, areas: areaMap }), [idSig, areaMap]); // eslint-disable-line react-hooks/exhaustive-deps

  // The home's own light ids drive the living field's warmth.
  const roomSig = config ? config.rooms.map((r) => r.id).join(',') : '';
  const homeLightIds = useMemo(
    () =>
      config
        ? config.rooms.flatMap((r) => r.blocks.flatMap((b) => b.entityIds)).filter((id) => id.startsWith('light.'))
        : [],
    [roomSig], // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Read-only until edited; first Edit snapshots the summary into an editable
  // override (same mechanism as a category surface), then it drags/resizes/removes.
  const override = config?.overrides?.['home'];
  const blocks = override ? override.blocks : surface.blocks;
  const ids = blocks.map((b) => b.id);

  const onEditToggle = () => {
    if (editing) {
      setEditing(false);
      return;
    }
    if (!override) createHomeOverride(surface.blocks);
    setEditing(true);
  };
  const onReset = () => {
    resetHomeOverride();
    setEditing(false);
  };
  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const o = ids.indexOf(String(active.id));
    const n = ids.indexOf(String(over.id));
    if (o >= 0 && n >= 0) reorderBlocks(o, n);
  };

  if (!config) return null;

  return (
    <div className="simui-app simui-home">
      <header className="simui-head">
        <span className="simui-head-title">{greeting()}</span>
        <HouseGlance config={config} />
        <span className="simui-spacer" />
        {editing && override && (
          <button className="simui-iconbtn-h" onClick={onReset} aria-label="Reset home"><RotateCcw size={15} /></button>
        )}
        {editing && (
          <button className="simui-iconbtn-h" onClick={() => setAdding(true)} aria-label="Add card"><Plus size={16} /></button>
        )}
        <button
          className={`simui-iconbtn-h${editing ? ' active' : ''}`}
          onClick={onEditToggle}
          aria-label={editing ? 'Done editing' : 'Edit home'}
        >
          {editing ? <Check size={16} /> : <Pencil size={15} />}
        </button>
      </header>
      <div className="simui-content simui-home-content">
        <AmbientCanvas lightIds={homeLightIds} />
        <div className="simui-home-layer">
          {surface.statusStrip && surface.statusStrip.length > 0 && (
            <SurfaceStrip pills={surface.statusStrip} />
          )}
          {blocks.length > 0 &&
            (override ? (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext items={ids} strategy={rectSortingStrategy}>
                  <div className="simui-grid simui-surface-grid simui-home-summary">
                    {blocks.map((b) => <BlockChrome key={b.id} block={b} editing={editing} />)}
                  </div>
                </SortableContext>
              </DndContext>
            ) : (
              <div className="simui-grid simui-surface-grid simui-home-summary">
                {blocks.map((b) => <StaticBlock key={b.id} block={b} />)}
              </div>
            ))}
          <div className="simui-rooms-head">Rooms</div>
          <div className="simui-home-grid">
            {config.rooms.map((r) => (
              <RoomCard key={r.id} room={r} onOpen={() => openRoom(r.id)} />
            ))}
          </div>
        </div>
      </div>
      {adding && (
        <AddCardPanel
          existing={blocks.flatMap((b) => b.entityIds)}
          onAdd={addCard}
          onClose={() => setAdding(false)}
        />
      )}
    </div>
  );
}

function HouseGlance({ config }: { config: DashboardConfig }) {
  const summary = useAggregate((states) => {
    const lightIds = config.rooms.flatMap((r) => r.blocks.flatMap((b) => b.entityIds)).filter((id) => id.startsWith('light.'));
    const on = lightIds.filter((id) => states[id]?.state === 'on').length;
    const rooms = config.rooms.length;
    return `${rooms} ${rooms === 1 ? 'room' : 'rooms'}${on ? ` · ${on} lights on` : ''}`;
  });
  return <span className="simui-head-glance num">{summary}</span>;
}
