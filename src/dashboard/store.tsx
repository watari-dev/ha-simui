import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { useHass } from '../hass/context';
import type { CardConfig, CardSize, DashboardConfig } from './types';
import { defaultSize, generateDefault } from './generateDefault';
import { loadDashboard, saveDashboard } from './storage';
import { uid } from '../util';

interface DashboardCtx {
  config: DashboardConfig | null;
  editing: boolean;
  setEditing: (v: boolean) => void;
  reorder: (oldIndex: number, newIndex: number) => void;
  addCard: (entityId: string) => void;
  removeCard: (cardId: string) => void;
  setCardSize: (cardId: string, size: CardSize) => void;
}

const Ctx = createContext<DashboardCtx | null>(null);

export function useDashboard(): DashboardCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error('useDashboard must be used inside <DashboardProvider>');
  return v;
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const hass = useHass();
  const hassRef = useRef(hass);
  hassRef.current = hass;

  const [config, setConfig] = useState<DashboardConfig | null>(null);
  const [editing, setEditing] = useState(false);
  const loaded = useRef(false);

  // load once; generate a default if nothing is stored
  useEffect(() => {
    let alive = true;
    void (async () => {
      const saved = await loadDashboard(hassRef.current);
      const cfg = saved ?? generateDefault(hassRef.current.states);
      if (alive) {
        setConfig(cfg);
        loaded.current = true;
      }
    })();
    return () => { alive = false; };
  }, []);

  // autosave after load
  useEffect(() => {
    if (!loaded.current || !config) return;
    void saveDashboard(hassRef.current, config);
  }, [config]);

  const mutateCards = (fn: (cards: CardConfig[]) => CardConfig[]) => {
    setConfig((c) => {
      if (!c) return c;
      const [view, ...rest] = c.views;
      return { ...c, views: [{ ...view, cards: fn(view.cards) }, ...rest] };
    });
  };

  const value: DashboardCtx = {
    config,
    editing,
    setEditing,
    reorder: (oldIndex, newIndex) => mutateCards((cards) => arrayMove(cards, oldIndex, newIndex)),
    addCard: (entityId) => mutateCards((cards) => [...cards, { id: uid(), entityId, size: defaultSize(entityId) }]),
    removeCard: (cardId) => mutateCards((cards) => cards.filter((c) => c.id !== cardId)),
    setCardSize: (cardId, size) => mutateCards((cards) => cards.map((c) => (c.id === cardId ? { ...c, size } : c))),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
