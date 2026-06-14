import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from 'react';
import type { CallService, HassEntities, HassEntity, HassSource } from '../types';

const Ctx = createContext<HassSource | null>(null);

/**
 * Wrap a source with a memoized **entity-keys version**: a counter that bumps only
 * when the key SET changes (entity added/removed), computed ONCE per tick here (not
 * O(M·logM) per component per render). Transparent for `useEntity`/`useAggregate`
 * (their per-snapshot comparison is unchanged); it just adds `getKeysVersion` for
 * `useEntityKeys`. One underlying subscription drives it for the provider's lifetime.
 */
function withKeysVersion(inner: HassSource): HassSource {
  const listeners = new Set<() => void>();
  let version = 0;
  let prevKeys: Set<string> | null = null;
  let attached = false;

  const recompute = () => {
    const keys = Object.keys(inner.getStates());
    if (!prevKeys) {
      prevKeys = new Set(keys);
      return;
    }
    let changed = prevKeys.size !== keys.length;
    if (!changed) {
      for (let i = 0; i < keys.length; i++) {
        if (!prevKeys.has(keys[i])) { changed = true; break; }
      }
    }
    if (changed) {
      prevKeys = new Set(keys);
      version++;
    }
  };

  const onInner = () => {
    recompute();
    listeners.forEach((l) => l());
  };

  return {
    subscribe(listener) {
      if (!attached) {
        attached = true;
        recompute(); // seed prevKeys before any version comparison
        inner.subscribe(onInner); // single, provider-lifetime subscription
      }
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    },
    getStates: inner.getStates,
    callService: inner.callService,
    get connection() { return inner.connection; },
    getKeysVersion: () => version,
  };
}

export function HassProvider({ source, children }: { source: HassSource; children: ReactNode }) {
  const keyed = useMemo(() => withKeysVersion(source), [source]);
  return <Ctx.Provider value={keyed}>{children}</Ctx.Provider>;
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

const ZERO_VERSION = () => 0;

/**
 * Subscribe to the entity-key SET only: returns a version that bumps when an entity
 * is added/removed, and stays referentially stable across value ticks. Surface
 * builders memoize on this instead of re-rendering every tick — read the live map
 * lazily via `useHassSource().getStates()` inside the keyed memo. Replaces the
 * per-render `Object.keys(states).sort().join()` signature (DESIGN_PRINCIPLES §13).
 */
export function useEntityKeys(): number {
  const source = useHassSource();
  return useSyncExternalStore(source.subscribe, source.getKeysVersion ?? ZERO_VERSION);
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
