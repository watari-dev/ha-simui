import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { useHassSource } from '../hass/context';
import type { Block, BlockSpan, DashboardConfig } from './types';
import { defaultCardSpan, generateDefault } from './generateDefault';
import { resolveAreas, resolveRegistryMeta } from './areas';
import { loadDashboard, saveDashboard } from './storage';
import { uid } from '../util';

// The navigation shell's three surfaces (DESIGN_PRINCIPLES §14): the Home
// summary, a composed room, and a cross-room device category.
export type Route =
  | { kind: 'home' }
  | { kind: 'room'; id: string }
  | { kind: 'category'; id: string };

interface DashboardCtx {
  config: DashboardConfig | null;
  route: Route;
  goHome: () => void;
  openRoom: (id: string) => void;
  openCategory: (id: string) => void;
  /** Internal-route entry point used by tile/pill `navigate` actions ("room/<id>", "category/<id>", "home"). */
  navigate: (path: string) => void;
  editing: boolean;
  setEditing: (v: boolean) => void;
  reorderBlocks: (oldIndex: number, newIndex: number) => void;
  removeBlock: (blockId: string) => void;
  cycleBlockSpan: (blockId: string) => void;
  addCard: (entityId: string) => void;
  /** Append a fully-built block (the gallery → drop path). */
  addBlock: (block: Block) => void;
  /** Raw surface-block mutator — the editor store flushes dirtyBlocks through this. */
  mutateBlocks: (fn: (blocks: Block[]) => Block[]) => void;
  /** Snapshot a generated category surface into a persisted, editable override. */
  createOverride: (categoryId: string, blocks: Block[]) => void;
  /** Drop a category override → back to the live preset. */
  resetOverride: (categoryId: string) => void;
  /** Snapshot the generated Home summary into an editable override, and drop it. */
  createHomeOverride: (blocks: Block[]) => void;
  resetHomeOverride: () => void;
  // Native detail Sheet (tap = more-info). One sheet host at the app root.
  sheetEntityId: string | null;
  openSheet: (entityId: string) => void;
  closeSheet: () => void;
}

const nextSpan = (s: BlockSpan): BlockSpan => (s === 1 ? 2 : s === 2 ? 'full' : 1);

const Ctx = createContext<DashboardCtx | null>(null);

export function useDashboard(): DashboardCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error('useDashboard must be used inside <DashboardProvider>');
  return v;
}

/** Parse an internal `navigate` path into a Route. `category/lights`, `room/<id>`, `home`. */
function parseRoute(path: string): Route {
  const clean = path.replace(/^\/+/, '');
  const [kind, id] = clean.split('/');
  if (kind === 'category' && id) return { kind: 'category', id };
  if (kind === 'room' && id) return { kind: 'room', id };
  return { kind: 'home' };
}

/** Inverse of {@link parseRoute}: a Route → its url path (`category/lights`, `room/<id>`, ``). */
function routeToPath(r: Route): string {
  if (r.kind === 'category') return `category/${r.id}`;
  if (r.kind === 'room') return `room/${r.id}`;
  return '';
}

// ── URL persistence (hash routing) ───────────────────────────────────────────
// The route lives in the location HASH (e.g. `…/simui#/category/lights`). Hash
// routing is self-contained: it rides on whatever URL hosts simUI (the HA panel's
// `/simui`, or the dev server) WITHOUT fighting HA's own router, and Back + reload
// restore the view for free. The hash is the single source of truth — `goTo` writes
// it; a `hashchange` listener is the only thing that sets `route` state.
const readHashPath = (): string =>
  typeof location !== 'undefined' ? location.hash.replace(/^#\/?/, '') : '';
const writeHashPath = (path: string): void => {
  if (typeof location === 'undefined') return;
  const next = `#/${path}`;
  if (location.hash !== next && !(path === '' && (location.hash === '' || location.hash === '#'))) {
    location.hash = next;
  }
};

export function DashboardProvider({ children }: { children: ReactNode }) {
  const source = useHassSource();
  const [config, setConfig] = useState<DashboardConfig | null>(null);
  const [route, setRoute] = useState<Route>(() => parseRoute(readHashPath()));
  const [editing, setEditing] = useState(false);
  const [sheetEntityId, setSheetEntityId] = useState<string | null>(null);
  const loaded = useRef(false);

  useEffect(() => {
    let alive = true;
    void (async () => {
      const saved = await loadDashboard(source);
      // Real area registry (when embedded) drives room assignment; heuristic in dev.
      // The entity registry also feeds the curation gate (diagnostic/hidden = noise).
      const [areas, registry] = saved
        ? [undefined, undefined]
        : await Promise.all([resolveAreas(source), resolveRegistryMeta(source)]);
      const cfg = saved ?? generateDefault(source.getStates(), areas, registry);
      if (alive) {
        setConfig(cfg);
        loaded.current = true;
      }
    })();
    return () => { alive = false; };
  }, [source]);

  useEffect(() => {
    if (!loaded.current || !config) return;
    void saveDashboard(source, config);
  }, [config, source]);

  // Edit the CURRENT surface's blocks — a room, or an overridden category. A
  // category must be overridden (snapshotted) before it can be mutated.
  const mutateBlocks = (fn: (blocks: Block[]) => Block[]) => {
    setConfig((c) => {
      if (!c) return c;
      if (route.kind === 'home') {
        const ov = c.overrides?.['home'];
        if (!ov) return c;
        return { ...c, overrides: { ...c.overrides, home: { blocks: fn(ov.blocks) } } };
      }
      if (route.kind === 'room') {
        return { ...c, rooms: c.rooms.map((r) => (r.id === route.id ? { ...r, blocks: fn(r.blocks) } : r)) };
      }
      if (route.kind === 'category') {
        const key = `category:${route.id}`;
        const ov = c.overrides?.[key];
        if (!ov) return c;
        return { ...c, overrides: { ...c.overrides, [key]: { blocks: fn(ov.blocks) } } };
      }
      return c;
    });
  };

  // Back / forward / reload restore the view: a hashchange is the only EXTERNAL
  // route driver. Functional updater compares against the live route so an echo of
  // our own `goTo` (which already set state) is a no-op — no double render.
  useEffect(() => {
    const onHash = () => {
      const p = readHashPath();
      setRoute((prev) => (routeToPath(prev) === p ? prev : parseRoute(p)));
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const goTo = (r: Route) => {
    setEditing(false);
    setRoute(r);
    writeHashPath(routeToPath(r)); // persist to the URL (fires hashchange → no-op echo)
    window.scrollTo?.(0, 0);
  };

  const value: DashboardCtx = {
    config,
    route,
    goHome: () => goTo({ kind: 'home' }),
    openRoom: (id) => goTo({ kind: 'room', id }),
    openCategory: (id) => goTo({ kind: 'category', id }),
    navigate: (path) => goTo(parseRoute(path)),
    editing,
    setEditing,
    reorderBlocks: (oldIndex, newIndex) => mutateBlocks((b) => arrayMove(b, oldIndex, newIndex)),
    removeBlock: (id) => mutateBlocks((b) => b.filter((x) => x.id !== id)),
    cycleBlockSpan: (id) => mutateBlocks((b) => b.map((x) => (x.id === id ? { ...x, span: nextSpan(x.span) } : x))),
    addCard: (entityId) => mutateBlocks((b) => [...b, { id: uid(), type: 'card', entityIds: [entityId], span: defaultCardSpan(entityId) }]),
    addBlock: (block) => mutateBlocks((b) => [...b, block]),
    mutateBlocks,
    createOverride: (categoryId, blocks) =>
      setConfig((c) =>
        c
          ? {
              ...c,
              overrides: {
                ...(c.overrides ?? {}),
                // Fresh stable ids so the snapshot doesn't depend on the volatile
                // preset id scheme.
                [`category:${categoryId}`]: { blocks: blocks.map((b) => ({ ...b, id: uid() })) },
              },
            }
          : c,
      ),
    resetOverride: (categoryId) =>
      setConfig((c) => {
        if (!c?.overrides) return c;
        const next = { ...c.overrides };
        delete next[`category:${categoryId}`];
        return { ...c, overrides: next };
      }),
    createHomeOverride: (blocks) =>
      setConfig((c) =>
        c
          ? { ...c, overrides: { ...(c.overrides ?? {}), home: { blocks: blocks.map((b) => ({ ...b, id: uid() })) } } }
          : c,
      ),
    resetHomeOverride: () =>
      setConfig((c) => {
        if (!c?.overrides) return c;
        const next = { ...c.overrides };
        delete next['home'];
        return { ...c, overrides: next };
      }),
    sheetEntityId,
    openSheet: (entityId) => setSheetEntityId(entityId),
    closeSheet: () => setSheetEntityId(null),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
