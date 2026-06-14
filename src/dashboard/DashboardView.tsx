import { useDashboard } from './store';
import { HomeView } from './HomeView';
import { RoomView } from './RoomView';
import { CategoryView } from './CategoryView';
import { Sheet } from '../components/Sheet';
import { DetailContent } from './DetailContent';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useEntity } from '../hass/context';
import { friendly } from '../util';

export function DashboardView() {
  const { config, route, sheetEntityId, closeSheet } = useDashboard();

  // A stable key per route so a surface that threw clears its error once you
  // navigate away (and so each surface gets its own boundary instance).
  const routeKey = route.kind === 'home' ? 'home' : `${route.kind}/${route.id}`;

  return (
    <>
      <ErrorBoundary compact label="This view" resetKey={routeKey}>
        <Body />
      </ErrorBoundary>
      <ErrorBoundary compact label="Detail" resetKey={sheetEntityId ?? ''}>
        <SheetHost entityId={sheetEntityId} onClose={closeSheet} />
      </ErrorBoundary>
    </>
  );

  function Body() {
    if (!config) return <div className="simui-msg">Loading dashboard…</div>;
    if (route.kind === 'category') return <CategoryView categoryId={route.id} />;
    if (!config.rooms.length) return <div className="simui-msg">No rooms to show yet.</div>;
    if (route.kind === 'home') return <HomeView />;
    const room = config.rooms.find((r) => r.id === route.id) ?? config.rooms[0];
    return <RoomView key={room.id} room={room} />;
  }
}

/** The single native-Sheet host (DESIGN_PRINCIPLES §14). Tap → more-info opens it. */
function SheetHost({ entityId, onClose }: { entityId: string | null; onClose: () => void }) {
  const entity = useEntity(entityId ?? '');
  const title = entityId ? (entity ? friendly(entity) : entityId) : undefined;
  return (
    <Sheet open={!!entityId} title={title} onClose={onClose}>
      {entityId && <DetailContent entityId={entityId} />}
    </Sheet>
  );
}
