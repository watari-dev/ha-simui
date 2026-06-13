import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HassProvider } from './hass/context';
import { connectDev } from './hass/connectDev';
import { createMockSource } from './hass/mockData';
import type { HassSource } from './types';
import './styles.css';

function DevRoot() {
  const [source, setSource] = useState<HassSource | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = import.meta.env.VITE_HASS_URL;
    const token = import.meta.env.VITE_HASS_TOKEN;
    if (url && token) {
      connectDev(url, token).then(setSource).catch((e) => setError(`Could not connect to ${url}: ${e}`));
    } else {
      setSource(createMockSource());
    }
  }, []);

  if (error) return <div className="simui-msg">{error}</div>;
  if (!source) return <div className="simui-msg">Connecting…</div>;
  return (
    <HassProvider source={source}>
      <App />
    </HassProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <div className="simui-root">
    <DevRoot />
  </div>,
);
