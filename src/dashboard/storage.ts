import type { DashboardConfig } from './types';
import type { Hass } from '../types';

const KEY = 'simui:dashboard:v1';

// Persist per-user via HA's frontend user-data store when embedded (so the
// layout follows the user across the web UI and every Companion app), falling
// back to localStorage in standalone dev.
export async function loadDashboard(hass: Hass): Promise<DashboardConfig | null> {
  const conn = hass.connection;
  if (conn) {
    try {
      const res = await conn.sendMessagePromise<{ value?: DashboardConfig }>({ type: 'frontend/get_user_data', key: KEY } as never);
      if (res && res.value) return res.value;
    } catch {
      // fall through to localStorage
    }
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as DashboardConfig;
  } catch {
    /* ignore */
  }
  return null;
}

export async function saveDashboard(hass: Hass, config: DashboardConfig): Promise<void> {
  try {
    localStorage.setItem(KEY, JSON.stringify(config));
  } catch {
    /* ignore */
  }
  const conn = hass.connection;
  if (conn) {
    try {
      await conn.sendMessagePromise({ type: 'frontend/set_user_data', key: KEY, value: config } as never);
    } catch {
      /* ignore */
    }
  }
}
