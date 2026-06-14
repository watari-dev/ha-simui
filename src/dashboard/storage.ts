import type { Block, BlockSpan, DashboardConfig, SurfaceOverride } from './types';
import type { HassSource } from '../types';

const KEY = 'simui:dashboard:v2';

/** Normalize a block: earlier configs stored `size`; the contract renamed it to `span`. */
function migrateBlock(b: Block): Block {
  const legacy = b as Block & { size?: BlockSpan };
  const span: BlockSpan = b.span ?? legacy.size ?? 1;
  const next = { ...b, span };
  delete (next as { size?: unknown }).size;
  return next;
}

// Back-compat: map old `size`→`span` and bump v2 → v3 (adds the `overrides` map for
// edited category surfaces). Idempotent, so it's safe to run on a v3 config too.
function migrate(config: DashboardConfig): DashboardConfig {
  const overrides: Record<string, SurfaceOverride> = {};
  for (const [k, ov] of Object.entries(config.overrides ?? {})) {
    overrides[k] = { blocks: (ov.blocks ?? []).map(migrateBlock) };
  }
  return {
    version: 3,
    overrides,
    rooms: (config.rooms ?? []).map((room) => ({ ...room, blocks: room.blocks.map(migrateBlock) })),
  };
}

export async function loadDashboard(source: HassSource): Promise<DashboardConfig | null> {
  const conn = source.connection;
  if (conn) {
    try {
      const res = await conn.sendMessagePromise<{ value?: DashboardConfig }>({ type: 'frontend/get_user_data', key: KEY } as never);
      const ver = (res?.value as { version?: number } | undefined)?.version;
      if (res && res.value && (ver === 2 || ver === 3)) return migrate(res.value);
    } catch {
      // fall through
    }
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DashboardConfig;
      const ver = (parsed as { version?: number }).version;
      if (ver === 2 || ver === 3) return migrate(parsed);
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
