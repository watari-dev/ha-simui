import { useMemo } from 'react';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Check, Pencil, RotateCcw } from 'lucide-react';
import { useAggregate, useAllStates } from '../hass/context';
import { useAreas } from './areas';
import { useDashboard } from './store';
import { useEditor } from '../editor/store';
import { EmptyState } from '../editor/chrome';
import { RoomCard } from './RoomCard';
import { SurfaceStrip } from './SurfaceStrip';
import { BlockChrome, StaticBlock } from './BlockChrome';
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
  const { config, openRoom, setEditing, createHomeOverride, resetHomeOverride } = useDashboard();
  const editor = useEditor();
  const states = useAllStates();
  const areaMap = useAreas();
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

  // Read-only until edited; an override (a user-edited snapshot) takes over from the
  // live summary. While the editor is active we render its optimistic working copy
  // (`dirtyBlocks`); the editor commits edits back into the override (debounced).
  const override = config?.overrides?.['home'];
  const blocks = editor.active ? editor.dirtyBlocks : override ? override.blocks : surface.blocks;
  const ids = blocks.map((b) => b.id);

  // Entering edit on the live summary first snapshots it into an editable override,
  // then hands control to the editor store (it seeds its working copy from the
  // override once the snapshot materialises). We flip the dashboard `editing` flag
  // in the same beat so they start in lockstep.
  const onEditToggle = () => {
    if (editor.active) {
      editor.exit();
      return;
    }
    if (!override) createHomeOverride(surface.blocks);
    setEditing(true);
    editor.enter();
  };
  const onReset = () => {
    editor.exit({ discard: true });
    resetHomeOverride();
  };
  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const o = ids.indexOf(String(active.id));
    const n = ids.indexOf(String(over.id));
    if (o >= 0 && n >= 0) editor.moveBlock(o, n);
  };

  if (!config) return null;

  return (
    <div className="simui-app simui-home">
      <header className="simui-head">
        <span className="simui-head-title">{greeting()}</span>
        <HouseGlance config={config} />
        <span className="simui-spacer" />
        {editor.active && override && (
          <button className="simui-iconbtn-h" onClick={onReset} aria-label="Reset home"><RotateCcw size={15} /></button>
        )}
        {/* Add / Undo / Redo / Save live in the floating EditorToolbar while editing
            (mounted by DashboardView) — keep the header chrome minimal. */}
        <button
          className={`simui-iconbtn-h${editor.active ? ' active' : ''}`}
          onClick={onEditToggle}
          aria-label={editor.active ? 'Done editing' : 'Edit home'}
        >
          {editor.active ? <Check size={16} /> : <Pencil size={15} />}
        </button>
      </header>
      <div className="simui-content simui-home-content">
        <AmbientCanvas lightIds={homeLightIds} />
        <div className="simui-home-layer">
          {surface.statusStrip && surface.statusStrip.length > 0 && (
            <SurfaceStrip pills={surface.statusStrip} />
          )}
          {blocks.length > 0 ? (
            editor.active ? (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext items={ids} strategy={rectSortingStrategy}>
                  <div className="simui-grid simui-surface-grid simui-home-summary">
                    {blocks.map((b) => <BlockChrome key={b.id} block={b} editing />)}
                  </div>
                </SortableContext>
              </DndContext>
            ) : (
              <div className="simui-grid simui-surface-grid simui-home-summary">
                {blocks.map((b) => <StaticBlock key={b.id} block={b} />)}
              </div>
            )
          ) : editor.active ? (
            <EmptyState
              title="Your home summary is empty"
              onAddCard={() => editor.openGallery()}
              onPickTemplate={() => editor.openTemplates()}
            />
          ) : null}
          <div className="simui-rooms-head">Rooms</div>
          <div className="simui-home-grid">
            {config.rooms.map((r) => (
              <RoomCard key={r.id} room={r} onOpen={() => openRoom(r.id)} />
            ))}
          </div>
        </div>
      </div>
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
