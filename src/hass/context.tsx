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
