import type { DashboardConfig } from './types';
import type { HassSource } from '../types';

const KEY = 'simui:dashboard:v2';

export async function loadDashboard(source: HassSource): Promise<DashboardConfig | null> {
  const conn = source.connection;
  if (conn) {
    try {
      const res = await conn.sendMessagePromise<{ value?: DashboardConfig }>({ type: 'frontend/get_user_data', key: KEY } as never);
      if (res && res.value && res.value.version === 2) return res.value;
    } catch {
      // fall through
    }
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DashboardConfig;
      if (parsed.version === 2) return parsed;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export async function saveDashboard(source: HassSource, config: DashboardConfig): Promise<void> {
  try {
    localStorage.setItem(KEY, JSON.stringify(config));
  } catch {
    /* ignore */
  }
  const conn = source.connection;
  if (conn) {
    try {
      await conn.sendMessagePromise({ type: 'frontend/set_user_data', key: KEY, value: config } as never);
    } catch {
      /* ignore */
    }
  }
}
