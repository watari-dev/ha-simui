import { useEffect } from 'react';
import { Minimize2 } from 'lucide-react';
import { useDashboard } from './store';
import { useKiosk } from './kioskMode';
import { HomeView } from './HomeView';
import { RoomView } from './RoomView';
import { CategoryView } from './CategoryView';
import { Sheet } from '../components/Sheet';
import { DetailContent } from './DetailContent';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { EditorOverlay } from '../editor/EditorOverlay';
import { useScreenWakeLock } from '../hooks/useScreenWakeLock';
import { useEntity } from '../hass/context';
import { friendly } from '../util';

export function DashboardView() {
  const { config, route, sheetEntityId, closeSheet } = useDashboard();
  const { enabled: kiosk, exit: exitKiosk } = useKiosk();

  // Keep a docked wall tablet awake while in kiosk (no-op where unsupported).
  useScreenWakeLock(kiosk);

  // Chrome-off is driven by a `data-kiosk` attribute on the `.simui-root` mount
  // (created in panel.tsx / main-dev.tsx, both out of scope) — so we toggle it
  // from React rather than at mount time. Default it to "false" on cleanup so a
  // hot reload or unmount never leaves the surface stuck chrome-off.
  useEffect(() => {
    const root = document.querySelector('.simui-root');
    root?.setAttribute('data-kiosk', kiosk ? 'true' : 'false');
    return () => { root?.setAttribute('data-kiosk', 'false'); };
  }, [kiosk]);

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
      {/* No editing in kiosk — the floating editor chrome stays unmounted. Outside
          kiosk it mounts once at the router level and self-gates on `editor.active`,
          driving every surface (home / room / category) from a single instance. */}
      {!kiosk && <EditorOverlay />}
      {/* Kiosk hides all header chrome, so a small low-opacity floating button is
          the only way out — tap it to leave wall-tablet mode. */}
      {kiosk && (
        <button className="simui-kiosk-exit" onClick={exitKiosk} aria-label="Exit kiosk">
          <Minimize2 size={16} />
        </button>
      )}
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
