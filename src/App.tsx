import { DashboardProvider } from './dashboard/store';
import { DashboardView } from './dashboard/DashboardView';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ConnectionBanner } from './components/ConnectionBanner';

export function App() {
  return (
    <ErrorBoundary>
      <ConnectionBanner />
      <DashboardProvider>
        <DashboardView />
      </DashboardProvider>
    </ErrorBoundary>
  );
}
