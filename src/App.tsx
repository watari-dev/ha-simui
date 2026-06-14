import { DashboardProvider } from './dashboard/store';
import { EditorProvider } from './editor/store';
import { KioskProvider } from './dashboard/kioskMode';
import { DashboardView } from './dashboard/DashboardView';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ConnectionBanner } from './components/ConnectionBanner';
import { OverlayRootProvider } from './components/OverlayRoot';

export function App() {
  return (
    <ErrorBoundary>
      <OverlayRootProvider>
        <ConnectionBanner />
        <KioskProvider>
          <DashboardProvider>
            <EditorProvider>
              <DashboardView />
            </EditorProvider>
          </DashboardProvider>
        </KioskProvider>
      </OverlayRootProvider>
    </ErrorBoundary>
  );
}
