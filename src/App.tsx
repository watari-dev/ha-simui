import { DashboardProvider } from './dashboard/store';
import { DashboardView } from './dashboard/DashboardView';

export function App() {
  return (
    <DashboardProvider>
      <DashboardView />
    </DashboardProvider>
  );
}
