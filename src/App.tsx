import { DashboardProvider } from './dashboard/store';
import { EditorProvider } from './editor/store';
import { KioskProvider } from './dashboard/kioskMode';
import { DashboardView } from './dashboard/DashboardView';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ConnectionBanner } from './components/ConnectionBanner';

export function App() {
  return (
    <ErrorBoundary>
      <ConnectionBanner />
      <KioskProvider>
        <DashboardProvider>
          <EditorProvider>
            <DashboardView />
          </EditorProvider>
        </DashboardProvider>
      </KioskProvider>
    </ErrorBoundary>
  );
}
