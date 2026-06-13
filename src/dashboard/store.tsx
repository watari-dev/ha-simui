import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { useHassSource } from '../hass/context';
import type { Block, BlockSize, DashboardConfig } from './types';
import { defaultCardSize, generateDefault } from './generateDefault';
import { loadDashboard, saveDashboard } from './storage';
import { uid } from '../util';

interface DashboardCtx {
  config: DashboardConfig | null;
  activeRoomId: string | null;
  setActiveRoom: (id: string) => void;
  editing: boolean;
  setEditing: (v: boolean) => void;
  reorderBlocks: (oldIndex: number, newIndex: number) => void;
  removeBlock: (blockId: string) => void;
  setBlockSize: (blockId: string, size: BlockSize) => void;
  addCard: (entityId: string) => void;
}

const Ctx = createContext<DashboardCtx | null>(null);

export function useDashboard(): DashboardCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error('useDashboard must be used inside <DashboardProvider>');
  return v;
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const source = useHassSource();
  const [config, setConfig] = useState<DashboardConfig | null>(null);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    let alive = true;
    void (async () => {
      const saved = await loadDashboard(source);
      const cfg = saved ?? generateDefault(source.getStates());
      if (alive) {
        setConfig(cfg);
        setActiveRoomId(cfg.rooms[0]?.id ?? null);
        loaded.current = true;
      }
    })();
    return () => { alive = false; };
  }, [source]);

  useEffect(() => {
    if (!loaded.current || !config) return;
    void saveDashboard(source, config);
  }, [config, source]);

  const mutateBlocks = (fn: (blocks: Block[]) => Block[]) => {
    setConfig((c) => {
      if (!c) return c;
      return { ...c, rooms: c.rooms.map((r) => (r.id === activeRoomId ? { ...r, blocks: fn(r.blocks) } : r)) };
    });
  };

  const value: DashboardCtx = {
    config,
    activeRoomId,
    setActiveRoom: setActiveRoomId,
    editing,
    setEditing,
    reorderBlocks: (oldIndex, newIndex) => mutateBlocks((b) => arrayMove(b, oldIndex, newIndex)),
    removeBlock: (id) => mutateBlocks((b) => b.filter((x) => x.id !== id)),
    setBlockSize: (id, size) => mutateBlocks((b) => b.map((x) => (x.id === id ? { ...x, size } : x))),
    addCard: (entityId) => mutateBlocks((b) => [...b, { id: uid(), type: 'card', entityIds: [entityId], size: defaultCardSize(entityId) }]),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
