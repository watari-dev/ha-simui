import { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react';
import type { CallService, HassEntities, HassEntity, HassSource } from '../types';

const Ctx = createContext<HassSource | null>(null);

export function HassProvider({ source, children }: { source: HassSource; children: ReactNode }) {
  return <Ctx.Provider value={source}>{children}</Ctx.Provider>;
}

export function useHassSource(): HassSource {
  const s = useContext(Ctx);
  if (!s) throw new Error('useHassSource must be used inside <HassProvider>');
  return s;
}

/** Subscribe to ONE entity. Re-renders only when that entity's object changes. */
export function useEntity(entityId: string): HassEntity | undefined {
  const source = useHassSource();
  return useSyncExternalStore(source.subscribe, () => source.getStates()[entityId]);
}

/** The whole states map — re-renders on every change. Use sparingly (e.g. pickers). */
export function useAllStates(): HassEntities {
  const source = useHassSource();
  return useSyncExternalStore(source.subscribe, source.getStates);
}

/**
 * A derived primitive (number / string / boolean). Because the snapshot is a
 * primitive, the component re-renders only when the derived VALUE changes —
 * ideal for ambient aggregates (e.g. "how many lights are on").
 */
export function useAggregate<T extends string | number | boolean>(compute: (states: HassEntities) => T): T {
  const source = useHassSource();
  return useSyncExternalStore(source.subscribe, () => compute(source.getStates()));
}

export function useCallService(): CallService {
  return useHassSource().callService;
}

export type ConnectionStatus = 'live' | 'reconnecting';

/**
 * Observe the HA websocket and report whether it is `'live'` or `'reconnecting'`.
 * The Connection emits `'ready'` (back online) and `'disconnected'` /
 * `'reconnect-error'` (dropped) and exposes `.connected`. When there is no
 * connection (dev/mock), we report `'live'` — nothing to reconnect to.
 */
export function useConnectionStatus(): ConnectionStatus {
  const source = useHassSource();
  const conn = source.connection;

  const subscribe = (listener: () => void) => {
    if (!conn) return () => {};
    conn.addEventListener('ready', listener);
    conn.addEventListener('disconnected', listener);
    conn.addEventListener('reconnect-error', listener);
    return () => {
      conn.removeEventListener('ready', listener);
      conn.removeEventListener('disconnected', listener);
      conn.removeEventListener('reconnect-error', listener);
    };
  };

  const getSnapshot = (): ConnectionStatus => (!conn || conn.connected ? 'live' : 'reconnecting');

  return useSyncExternalStore(subscribe, getSnapshot);
}
