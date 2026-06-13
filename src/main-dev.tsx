import { useEffect, useState, useSyncExternalStore } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HassProvider } from './hass/context';
import { connectDev, type DevStore } from './hass/connectDev';
import { createMockStore } from './hass/mockData';
import './styles.css';

function Connected({ store }: { store: DevStore }) {
  const hass = useSyncExternalStore(store.subscribe, store.getSnapshot);
  return (
    <HassProvider hass={hass}>
      <App />
    </HassProvider>
  );
}

function DevRoot() {
  const [store, setStore] = useState<DevStore | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = import.meta.env.VITE_HASS_URL;
    const token = import.meta.env.VITE_HASS_TOKEN;
    if (url && token) {
      connectDev(url, token).then(setStore).catch((e) => setError(`Could not connect to ${url}: ${e}`));
    } else {
      // no token → run against the bundled mock snapshot (fully interactive)
      setStore(createMockStore());
    }
  }, []);

  if (error) return <div className="simui-msg">{error}</div>;
  if (!store) return <div className="simui-msg">Connecting…</div>;
  return <Connected store={store} />;
}

createRoot(document.getElementById('root')!).render(
  <div className="simui-root">
    <DevRoot />
  </div>,
);
