import { useMemo } from 'react';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { MonitorPlay, Pencil, RotateCcw } from 'lucide-react';
import { useAggregate, useHassSource, useEntityKeys } from '../hass/context';
import { useAreas } from './areas';
import { useDashboard } from './store';
import { useKioskOptional } from './kioskMode';
import { useEditableSurface } from './useEditableSurface';
import { EditorToolbar, EmptyState } from '../editor/chrome';
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
  const { config, openRoom } = useDashboard();
  const { enabled: kiosk, enter: enterKiosk } = useKioskOptional();
  const source = useHassSource();
  const keysVersion = useEntityKeys();
  const areaMap = useAreas();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // The Home summary preset: status strip + scenes + category launcher + security
  // (PRESETS.md §1). Rebuilt only when the entity SET changes (keysVersion) — NOT on
  // value ticks; the live map is read lazily. `areaMap` is entity-keyed
  // (entityId → {area, floor}); the builders look up by entity id.
  const surface: Surface = useMemo(() => buildHome({ states: source.getStates(), areas: areaMap }), [keysVersion, areaMap]); // eslint-disable-line react-hooks/exhaustive-deps

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
  // live summary. The shared hook resolves the rendered block list (editor working
  // copy while active, else the override, else the live summary) and the edit
  // lifecycle (snapshot-on-enter, reset-to-preset).
  const override = config?.overrides?.['home'];
  const { blocks, active, onEditToggle, onReset, moveBlock, openGallery, openTemplates } =
    useEditableSurface({
      surface: { kind: 'home' },
      surfaceBlocks: surface.blocks,
      override: override?.blocks,
    });
  const ids = blocks.map((b) => b.id);

  const onDragEnd = (e: DragEndEvent) => {
    const { active: dragged, over } = e;
    if (!over || dragged.id === over.id) return;
    const o = ids.indexOf(String(dragged.id));
    const n = ids.indexOf(String(over.id));
    if (o >= 0 && n >= 0) moveBlock(o, n);
  };

  if (!config) return null;

  return (
    <div className="simui-app simui-home">
      <header className="simui-head">
        <span className="simui-head-title">{greeting()}</span>
        <HouseGlance config={config} />
        <span className="simui-spacer" />
        {active && override && onReset && (
          <button className="simui-iconbtn-h" onClick={onReset} aria-label="Reset home"><RotateCcw size={15} /></button>
        )}
        {/* Enter wall-tablet/kiosk mode — chrome-off, screen-awake, dot ambient.
            Hidden once in kiosk (the header is hidden there anyway) and while editing
            (the edit bar owns the header). */}
        {!kiosk && !active && (
          <button className="simui-iconbtn-h" onClick={enterKiosk} aria-label="Enter kiosk mode">
            <MonitorPlay size={15} />
          </button>
        )}
        {/* While editing, the inline edit bar (Undo / Redo / Add card / Saved / Done)
            takes over the header's right side; otherwise just the Edit pencil. */}
        {active ? (
          <EditorToolbar />
        ) : (
          <button className="simui-iconbtn-h" onClick={onEditToggle} aria-label="Edit home">
            <Pencil size={15} />
          </button>
        )}
      </header>
      <div className="simui-content simui-home-content">
        <AmbientCanvas mode={kiosk ? 'dots' : 'field'} lightIds={homeLightIds} />
        <div className="simui-home-layer">
          {surface.statusStrip && surface.statusStrip.length > 0 && (
            <SurfaceStrip pills={surface.statusStrip} />
          )}
          {blocks.length > 0 ? (
            active ? (
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
          ) : active ? (
            <EmptyState
              title="Your home summary is empty"
              onAddCard={() => openGallery()}
              onPickTemplate={() => openTemplates()}
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
  // The home's light ids are the only entity inputs → deps-scope the count + string
  // build so an unrelated tick (sensors, energy) skips it. `config` is stable; a
  // rooms change re-renders this and rebuilds `lightIds`.
  const lightIds = useMemo(
    () => config.rooms.flatMap((r) => r.blocks.flatMap((b) => b.entityIds)).filter((id) => id.startsWith('light.')),
    [config],
  );
  const summary = useAggregate((states) => {
    const on = lightIds.filter((id) => states[id]?.state === 'on').length;
    const rooms = config.rooms.length;
    return `${rooms} ${rooms === 1 ? 'room' : 'rooms'}${on ? ` · ${on} lights on` : ''}`;
  }, lightIds);
  return <span className="simui-head-glance num">{summary}</span>;
}
