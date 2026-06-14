import type { Block, BlockSpan, DashboardConfig } from './types';
import type { HassSource } from '../types';

const KEY = 'simui:dashboard:v2';

// Back-compat: earlier configs stored `size` on blocks; the contract renamed it
// to `span` (FRAMEWORK.md §2). Map old → new on load so saved dashboards survive.
function migrate(config: DashboardConfig): DashboardConfig {
  return {
    ...config,
    rooms: config.rooms.map((room) => ({
      ...room,
      blocks: room.blocks.map((b) => {
        const legacy = b as Block & { size?: BlockSpan };
        const span: BlockSpan = b.span ?? legacy.size ?? 1;
        const next = { ...b, span };
        delete (next as { size?: unknown }).size;
        return next;
      }),
    })),
  };
}

export async function loadDashboard(source: HassSource): Promise<DashboardConfig | null> {
  const conn = source.connection;
  if (conn) {
    try {
      const res = await conn.sendMessagePromise<{ value?: DashboardConfig }>({ type: 'frontend/get_user_data', key: KEY } as never);
      if (res && res.value && res.value.version === 2) return migrate(res.value);
    } catch {
      // fall through
    }
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DashboardConfig;
      if (parsed.version === 2) return migrate(parsed);
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
