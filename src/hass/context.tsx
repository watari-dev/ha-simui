import { createContext, useContext, type ReactNode } from 'react';
import type { Hass, HassEntity } from '../types';

const HassContext = createContext<Hass | null>(null);

export function HassProvider({ hass, children }: { hass: Hass; children: ReactNode }) {
  return <HassContext.Provider value={hass}>{children}</HassContext.Provider>;
}

export function useHass(): Hass {
  const hass = useContext(HassContext);
  if (!hass) throw new Error('useHass must be used inside a <HassProvider>');
  return hass;
}

export function useEntity(entityId: string): HassEntity | undefined {
  return useHass().states[entityId];
}
