import { useDashboard } from './store';
import { HomeView } from './HomeView';
import { RoomView } from './RoomView';

export function DashboardView() {
  const { config, route } = useDashboard();

  if (!config) return <div className="simui-msg">Loading dashboard…</div>;
  if (!config.rooms.length) return <div className="simui-msg">No rooms to show yet.</div>;

  if (route.kind === 'home') return <HomeView />;

  const room = config.rooms.find((r) => r.id === route.id) ?? config.rooms[0];
  return <RoomView key={room.id} room={room} />;
}
