import { useAggregate } from '../hass/context';
import { useDashboard } from './store';
import { RoomCard } from './RoomCard';
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
  if (!config) return null;

  return (
    <div className="simui-app">
      <header className="simui-head">
        <span className="simui-head-title">{greeting()}</span>
        <HouseGlance config={config} />
      </header>
      <div className="simui-content">
        <div className="simui-home-grid">
          {config.rooms.map((r) => (
            <RoomCard key={r.id} room={r} onOpen={() => openRoom(r.id)} />
          ))}
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
