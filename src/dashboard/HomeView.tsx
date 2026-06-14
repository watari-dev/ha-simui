import { useMemo } from 'react';
import { useAggregate, useAllStates } from '../hass/context';
import { useAreas } from './areas';
import { useDashboard } from './store';
import { RoomCard } from './RoomCard';
import { SurfaceStrip } from './SurfaceStrip';
import { StaticBlock } from './BlockChrome';
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
  const states = useAllStates();
  const areaMap = useAreas();

  // The Home summary preset: status strip + scenes + category launcher + live
  // status + security (PRESETS.md §1). Rebuilt only when the entity SET changes.
  // `areaMap` is entity-keyed (entityId → {area, floor}) — pass it straight to the
  // builders, which look up by entity id.
  const idSig = useMemo(() => Object.keys(states).sort().join(','), [states]);
  const surface: Surface = useMemo(() => buildHome({ states, areas: areaMap }), [idSig, areaMap]); // eslint-disable-line react-hooks/exhaustive-deps

  // The home's own light ids drive the living field's warmth; memoise on the room
  // signature so the canvas reacts only to the home's lights, not every light.
  const roomSig = config ? config.rooms.map((r) => r.id).join(',') : '';
  const homeLightIds = useMemo(
    () =>
      config
        ? config.rooms
            .flatMap((r) => r.blocks.flatMap((b) => b.entityIds))
            .filter((id) => id.startsWith('light.'))
        : [],
    [roomSig], // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (!config) return null;

  return (
    <div className="simui-app simui-home">
      <header className="simui-head">
        <span className="simui-head-title">{greeting()}</span>
        <HouseGlance config={config} />
      </header>
      <div className="simui-content simui-home-content">
        <AmbientCanvas lightIds={homeLightIds} />
        <div className="simui-home-layer">
          {surface.statusStrip && surface.statusStrip.length > 0 && (
            <SurfaceStrip pills={surface.statusStrip} />
          )}
          {surface.blocks.length > 0 && (
            <div className="simui-grid simui-surface-grid simui-home-summary">
              {surface.blocks.map((b) => <StaticBlock key={b.id} block={b} />)}
            </div>
          )}
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
