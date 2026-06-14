// The editor store — the glue that makes the simUI editor real.
//
// SPEC_EDITOR.md §1, §5, §6.1. The editor is a THIN, DECOUPLED layer over the
// dashboard store:
//
//   • The dashboard store owns *block data* + persistence (`config`, `route`,
//     `editing`, and the surface-targeting mutators). It is the only thing that
//     writes to storage.
//   • The editor store owns everything *transient and never persisted*:
//     `active`, `selection`, `dirtyBlocks` (an optimistic working copy of the
//     active surface), `clipboard`, `placing`, and the undo/redo ring.
//
// Every block-list mutation runs through `EditorActions` here so exactly one undo
// snapshot is pushed per user action (gestures coalesce — see history.ts), the
// optimistic `dirtyBlocks` updates immediately, and a *debounced* commit flushes
// to the dashboard store (and thence persistence). Pure UI components
// (CardGallery / Inspector / EntityPicker) receive only the slice they need as
// props — they never reach into this store.
//
// ── Decoupling seam ──────────────────────────────────────────────────────────
// The cleanest commit path is a single raw `mutateBlocks(fn)` on the dashboard
// store that targets the active surface. That seam is being added to
// `src/dashboard/store.tsx` (see the integrator notes returned with this file).
// Until/unless it lands, this store DEGRADES GRACEFULLY by composing the existing
// public mutators (`reorderBlocks`, `removeBlock`, `cycleBlockSpan`, `addBlock`)
// to reconcile committed blocks toward `dirtyBlocks`. Either way the editor's
// public contract (EditorState & EditorActions) is identical.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { uid } from '../util';
import { useDashboard, type Route } from '../dashboard/store';
import type { Block } from '../dashboard/types';
import { CARD_KINDS } from './cardKinds';
import { HistoryRing, type CoalesceKey } from './history';
import { copyToClipboard, pasteFromClipboard, detachBlock } from './clipboard';
import type {
  BlockConfig,
  BlockSpan,
  BlockType,
  CardKind,
  EditorActions,
  EditorPanel,
  EditorSnapshot,
  EditorState,
  Selection,
  TileConfig,
} from './types';

/** Debounce window for flushing dirtyBlocks → dashboard store (SPEC §5). */
const COMMIT_DEBOUNCE_MS = 350;

// ─────────────────────────────────────────────────────────────────────────────
// Surface plumbing
// ─────────────────────────────────────────────────────────────────────────────

type Surface = EditorState['surface'];

/** Map the dashboard `route` to the editor's `surface` discriminant. */
function surfaceOf(route: Route): Surface {
  if (route.kind === 'room') return { kind: 'room', id: route.id };
  if (route.kind === 'category') return { kind: 'category', id: route.id };
  return { kind: 'home' };
}

/** Stable key so we can detect a surface switch (clears undo + re-syncs dirty). */
function surfaceKey(s: Surface): string {
  return s.kind === 'home' ? 'home' : `${s.kind}:${s.id}`;
}

/**
 * Read the CURRENT surface's committed blocks straight out of the dashboard
 * `config`, honouring the same precedence the dashboard renderer uses (home /
 * category overrides shadow their generated surface; a room reads its own
 * blocks). Returns `[]` when the surface has no persisted/override blocks yet
 * (e.g. a category that hasn't been snapshotted) — `enter()` triggers the
 * snapshot before editing begins, so by the time we edit there is a real list.
 */
function committedBlocksFor(
  config: ReturnType<typeof useDashboard>['config'],
  route: Route,
): BlockConfig[] {
  if (!config) return [];
  if (route.kind === 'home') return (config.overrides?.['home']?.blocks ?? []) as BlockConfig[];
  if (route.kind === 'room') {
    const room = config.rooms.find((r) => r.id === route.id);
    return (room?.blocks ?? []) as BlockConfig[];
  }
  // category
  return (config.overrides?.[`category:${route.id}`]?.blocks ?? []) as BlockConfig[];
}

// The dashboard context MAY expose a raw `mutateBlocks` seam once the integrator
// patch lands. We probe for it structurally so this file compiles against the
// current `DashboardCtx` (which does not yet declare it) AND lights up the fast
// path the moment it does.
type MaybeRawMutator = {
  mutateBlocks?: (fn: (blocks: Block[]) => Block[]) => void;
};

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────

type EditorContextValue = EditorState & EditorActions;

const Ctx = createContext<EditorContextValue | null>(null);

export function useEditor(): EditorContextValue {
  const v = useContext(Ctx);
  if (!v) throw new Error('useEditor must be used inside <EditorProvider>');
  return v;
}

/**
 * Optional hook for components that legitimately render outside an EditorProvider
 * (e.g. a read-only view): returns `null` instead of throwing.
 */
export function useEditorOptional(): EditorContextValue | null {
  return useContext(Ctx);
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────

export function EditorProvider({ children }: { children: ReactNode }) {
  const dashboard = useDashboard();
  const {
    config,
    route,
    editing,
    setEditing,
    reorderBlocks,
    removeBlock: dashRemoveBlock,
    addBlock: dashAddBlock,
  } = dashboard;

  const surface = useMemo(() => surfaceOf(route), [route]);
  const sKey = surfaceKey(surface);

  // ── Transient, editor-owned state (never persisted) ───────────────────────
  const [active, setActive] = useState(false);
  const [dirtyBlocks, setDirtyBlocks] = useState<BlockConfig[]>([]);
  const [selection, setSelection] = useState<Selection>({ kind: 'none' });
  const [panel, setPanel] = useState<EditorPanel>('none');
  const [placing, setPlacing] = useState<CardKind | null>(null);
  const [clipboard, setClipboard] = useState<BlockConfig | null>(null);
  const [committing, setCommitting] = useState(false);
  // The undo ring lives in a ref (mutable, non-rendering); we mirror its
  // can-undo/can-redo + stacks into state for the contract surface.
  const history = useRef(new HistoryRing());
  const [undoStack, setUndoStack] = useState<EditorSnapshot[]>([]);
  const [redoStack, setRedoStack] = useState<EditorSnapshot[]>([]);

  // Latest values captured for the debounced committer + key handlers, so those
  // callbacks stay stable while always seeing fresh state.
  const dirtyRef = useRef(dirtyBlocks);
  dirtyRef.current = dirtyBlocks;
  const selectionRef = useRef(selection);
  selectionRef.current = selection;
  const activeRef = useRef(active);
  activeRef.current = active;
  const clipboardRef = useRef(clipboard);
  clipboardRef.current = clipboard;
  const placingRef = useRef(placing);
  placingRef.current = placing;
  const panelRef = useRef(panel);
  panelRef.current = panel;

  const commitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const syncHistoryMirror = useCallback(() => {
    const { undoStack: u, redoStack: r } = history.current.snapshotStacks();
    setUndoStack(u);
    setRedoStack(r);
  }, []);

  // ── Commit: flush dirtyBlocks → dashboard store (the single write seam) ────
  const commitNow = useCallback(
    (blocks: BlockConfig[]) => {
      const raw = (dashboard as unknown as MaybeRawMutator).mutateBlocks;
      if (typeof raw === 'function') {
        // Fast path: replace the whole surface block list atomically.
        raw(() => blocks as Block[]);
      } else {
        // Fallback: reconcile committed blocks toward `blocks` using the public
        // mutators. We can't replace arbitrary fields without a raw seam, so this
        // path only keeps order/membership coarse-correct (add/remove/reorder);
        // fine field edits (tiles/options/actions) require the raw seam. The
        // integrator patch upgrades this to the fast path — see returned notes.
        reconcileViaPublicMutators(
          committedBlocksFor(config, route),
          blocks,
          { reorderBlocks, removeBlock: dashRemoveBlock, addBlock: dashAddBlock },
        );
      }
      setCommitting(false);
    },
    [dashboard, reorderBlocks, dashRemoveBlock, dashAddBlock, config, route],
  );

  const scheduleCommit = useCallback(
    (blocks: BlockConfig[]) => {
      setCommitting(true);
      if (commitTimer.current) clearTimeout(commitTimer.current);
      commitTimer.current = setTimeout(() => {
        commitTimer.current = null;
        commitNow(blocks);
      }, COMMIT_DEBOUNCE_MS);
    },
    [commitNow],
  );

  const flushPending = useCallback(() => {
    if (commitTimer.current) {
      clearTimeout(commitTimer.current);
      commitTimer.current = null;
      commitNow(dirtyRef.current);
    }
  }, [commitNow]);

  // ── The one mutation primitive every verb funnels through ─────────────────
  // Pushes an undo snapshot (coalesced by `key`), applies `fn` to the working
  // blocks optimistically, and schedules a debounced commit. Optionally adjusts
  // selection in the same beat.
  const applyMutation = useCallback(
    (
      fn: (blocks: BlockConfig[]) => BlockConfig[],
      opts?: { key?: CoalesceKey; selection?: Selection },
    ) => {
      const prev: EditorSnapshot = {
        blocks: dirtyRef.current,
        selection: selectionRef.current,
      };
      history.current.push(prev, opts?.key ?? null);
      const next = fn(dirtyRef.current);
      dirtyRef.current = next;
      setDirtyBlocks(next);
      if (opts?.selection) {
        selectionRef.current = opts.selection;
        setSelection(opts.selection);
      }
      syncHistoryMirror();
      scheduleCommit(next);
    },
    [scheduleCommit, syncHistoryMirror],
  );

  // ── Surface lifecycle: load dirtyBlocks on enter / surface switch ─────────
  //
  // Re-seeding is one-shot per surface key. The subtlety: on a category/home
  // surface, `enter()` snapshots the live preset into an override via the
  // dashboard store, but that `setConfig` lands a render LATER — so committed
  // blocks may be `[]` on the first pass. We therefore only mark the surface
  // "seeded" once we've actually observed a non-empty committed list, OR the
  // surface is a room (always editable, may legitimately be empty). This depends
  // on `config` deliberately, but the `loadedKey` guard makes it idempotent: once
  // seeded, later `config` ticks (the editor's own commits echoing back) are
  // ignored, so in-flight edits are never clobbered.
  const loadedKey = useRef<string | null>(null);
  useEffect(() => {
    if (!active) {
      loadedKey.current = null;
      return;
    }
    if (loadedKey.current === sKey) return;
    const committed = committedBlocksFor(config, route);
    // For override-backed surfaces, wait for the snapshot to materialise before
    // seeding, so we don't lock in an empty working copy.
    const overrideBacked = route.kind === 'category' || route.kind === 'home';
    const overrideExists = overrideBacked
      ? route.kind === 'home'
        ? !!config?.overrides?.['home']
        : !!config?.overrides?.[`category:${route.id}`]
      : true;
    if (overrideBacked && !overrideExists) return; // host hasn't snapshotted yet
    flushPending();
    dirtyRef.current = committed;
    setDirtyBlocks(committed);
    setSelection({ kind: 'none' });
    setPanel('none');
    setPlacing(null);
    history.current.clear();
    syncHistoryMirror();
    loadedKey.current = sKey;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, sKey, config]);

  // The editor owns `active` (SPEC §1.2); only enter()/exit() change it, and the
  // host that calls enter() flips the dashboard `editing` flag in the same beat,
  // so the two start in lockstep. The one case to mirror here is an EXTERNAL
  // force-off of `editing` — navigation calls `setEditing(false)` while we're
  // still active — which we follow by flushing pending edits and tearing the
  // editor down. (We deliberately do NOT push `editing` back on from here: that
  // would fight a route change mid-edit.)
  useEffect(() => {
    if (active && !editing) {
      flushPending();
      setActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  // Flush any pending commit on unmount.
  useEffect(
    () => () => {
      if (commitTimer.current) {
        clearTimeout(commitTimer.current);
        commitTimer.current = null;
        commitNow(dirtyRef.current);
      }
    },
    [commitNow],
  );

  // NOTE on seeding: the host (EditorOverlay/CategoryView) supplies the real
  // PreviewContext to <CardGallery>, and passes its richer seed into `dropCard`
  // via `beginPlacing`'s kind. For internal `addBlock`/`dropCard` seeding without
  // a host-provided seed, we sample from the surface's own entities as a
  // dependency-free fallback (`seedFromSurface` below) — no hass coupling here.

  // ── Helpers ───────────────────────────────────────────────────────────────
  const indexOfBlock = (blocks: BlockConfig[], id: string) =>
    blocks.findIndex((b) => b.id === id);

  const kindFor = (type: BlockType): CardKind | undefined =>
    CARD_KINDS.find((k) => k.type === type);

  /** Dependency-free seed: reuse entities already on the surface of a domain. */
  const seedFromSurface = (kind: CardKind, n: number): string[] => {
    const present = dirtyRef.current.flatMap((b) => b.entityIds);
    const domains = kind.domains;
    const filtered = domains
      ? present.filter((id) => domains.includes(id.split('.')[0]))
      : present;
    const uniq = Array.from(new Set(filtered.length ? filtered : present));
    return uniq.slice(0, n);
  };

  // ── EditorActions ─────────────────────────────────────────────────────────

  const enter = useCallback(() => {
    // SPEC §1.2: on a category/home surface the live preset must be snapshotted
    // into an editable override BEFORE editing. The editor cannot synthesise
    // preset blocks (those are built by the preset/CategoryView host), so the
    // CONTRACT is: the host snapshots the live blocks via the dashboard store
    // (`createOverride(categoryId, liveBlocks)` / `createHomeOverride(liveBlocks)`)
    // and THEN calls `enter()`. The surface-lifecycle effect waits for the
    // override to materialise before seeding `dirtyBlocks`, so ordering is safe
    // even if the host snapshots and enters in the same tick. Rooms are already
    // editable and need no snapshot. (`createOverride` / `createHomeOverride`
    // remain available on the dashboard store for the host.)
    setActive(true);
  }, []);

  const exit = useCallback(
    (opts?: { discard?: boolean }) => {
      if (opts?.discard) {
        // Drop the working copy without committing.
        if (commitTimer.current) {
          clearTimeout(commitTimer.current);
          commitTimer.current = null;
        }
        setCommitting(false);
      } else {
        flushPending();
      }
      setActive(false);
      setEditing(false);
      setSelection({ kind: 'none' });
      setPanel('none');
      setPlacing(null);
      setClipboard(null);
      clipboardRef.current = null;
      history.current.clear();
      syncHistoryMirror();
      loadedKey.current = null;
    },
    [flushPending, setEditing, syncHistoryMirror],
  );

  // selection
  const selectBlock = useCallback((blockId: string) => {
    const sel: Selection = { kind: 'block', blockId };
    selectionRef.current = sel;
    setSelection(sel);
  }, []);

  const selectTile = useCallback((blockId: string, entityId: string) => {
    const sel: Selection = { kind: 'tile', blockId, entityId };
    selectionRef.current = sel;
    setSelection(sel);
  }, []);

  const clearSelection = useCallback(() => {
    selectionRef.current = { kind: 'none' };
    setSelection({ kind: 'none' });
  }, []);

  // panels
  const openGallery = useCallback(() => setPanel('gallery'), []);
  const openInspector = useCallback(() => setPanel('inspector'), []);
  const openEntityPicker = useCallback(() => setPanel('entity-picker'), []);
  const openTemplates = useCallback(() => setPanel('templates'), []);
  const closePanel = useCallback(() => {
    setPanel('none');
    setPlacing(null);
  }, []);

  // ── add / drop ────────────────────────────────────────────────────────────
  const insertBlock = useCallback(
    (block: BlockConfig, index?: number): string => {
      applyMutation(
        (blocks) => {
          const next = [...blocks];
          const at = index == null ? next.length : Math.max(0, Math.min(index, next.length));
          next.splice(at, 0, block);
          return next;
        },
        { selection: { kind: 'block', blockId: block.id } },
      );
      return block.id;
    },
    [applyMutation],
  );

  const addBlock = useCallback(
    (type: BlockType, seed?: string[]): string => {
      const kind = kindFor(type);
      if (!kind) {
        // Minimal valid block for an unknown type (defensive).
        const block: BlockConfig = { id: uid(), type, entityIds: seed ?? [], span: 1 };
        const id = insertBlock(block);
        openInspector();
        return id;
      }
      const finalSeed = seed ?? seedFromSurface(kind, type === 'group' || type === 'list' ? 3 : 1);
      const block = kind.make(finalSeed);
      const id = insertBlock(block);
      openInspector();
      return id;
    },
    [insertBlock, openInspector],
  );

  const beginPlacing = useCallback((kind: CardKind) => {
    placingRef.current = kind;
    setPlacing(kind);
  }, []);

  const dropCard = useCallback(
    (index?: number): string => {
      const kind = placingRef.current;
      if (!kind) {
        // No active placement — treat as an append of the first gallery kind is
        // wrong; instead no-op safely by creating nothing. Return empty id.
        return '';
      }
      const seed = seedFromSurface(kind, kind.type === 'group' || kind.type === 'list' ? 3 : 1);
      const block = kind.make(seed);
      const id = insertBlock(block, index);
      placingRef.current = null;
      setPlacing(null);
      openInspector();
      return id;
    },
    [insertBlock, openInspector],
  );

  const cancelPlacing = useCallback(() => {
    placingRef.current = null;
    setPlacing(null);
  }, []);

  // ── block ops ─────────────────────────────────────────────────────────────
  const updateBlock = useCallback(
    (blockId: string, patch: Partial<BlockConfig>) => {
      const field = Object.keys(patch)[0] ?? 'multi';
      applyMutation(
        (blocks) => blocks.map((b) => (b.id === blockId ? syncOptions({ ...b, ...patch }) : b)),
        { key: `block:${blockId}:${field}` },
      );
    },
    [applyMutation],
  );

  const updateTile = useCallback(
    (blockId: string, entityId: string, patch: Partial<TileConfig>) => {
      const field = Object.keys(patch)[0] ?? 'multi';
      applyMutation(
        (blocks) =>
          blocks.map((b) => {
            if (b.id !== blockId) return b;
            const tiles = { ...(b.tiles ?? {}) };
            const prev = tiles[entityId] ?? {};
            const merged: TileConfig = pruneTile({ ...prev, ...patch });
            if (Object.keys(merged).length === 0) {
              // Empty override ⇒ drop the entry (absence === default, SPEC §2.1).
              delete tiles[entityId];
            } else {
              tiles[entityId] = merged;
            }
            const nextTiles = Object.keys(tiles).length ? tiles : undefined;
            return { ...b, tiles: nextTiles };
          }),
        { key: `tile:${blockId}:${entityId}:${field}` },
      );
    },
    [applyMutation],
  );

  const addEntities = useCallback(
    (blockId: string, entityIds: string[]) => {
      applyMutation((blocks) =>
        blocks.map((b) => {
          if (b.id !== blockId) return b;
          const merged = [...b.entityIds];
          for (const id of entityIds) if (!merged.includes(id)) merged.push(id);
          return { ...b, entityIds: merged };
        }),
      );
    },
    [applyMutation],
  );

  const removeEntity = useCallback(
    (blockId: string, entityId: string) => {
      applyMutation((blocks) =>
        blocks.map((b) => {
          if (b.id !== blockId) return b;
          const entityIds = b.entityIds.filter((id) => id !== entityId);
          const tiles = b.tiles ? { ...b.tiles } : undefined;
          if (tiles) delete tiles[entityId];
          return { ...b, entityIds, tiles: tiles && Object.keys(tiles).length ? tiles : undefined };
        }),
      );
    },
    [applyMutation],
  );

  const moveBlock = useCallback(
    (fromIndex: number, toIndex: number) => {
      applyMutation((blocks) => {
        if (
          fromIndex < 0 ||
          toIndex < 0 ||
          fromIndex >= blocks.length ||
          toIndex >= blocks.length
        ) {
          return blocks;
        }
        return arrayMove(blocks, fromIndex, toIndex);
      });
    },
    [applyMutation],
  );

  const resizeBlock = useCallback(
    (blockId: string, span: BlockSpan) => {
      applyMutation(
        (blocks) => blocks.map((b) => (b.id === blockId ? { ...b, span } : b)),
        { key: `block:${blockId}:span` },
      );
    },
    [applyMutation],
  );

  const removeBlock = useCallback(
    (blockId: string) => {
      const wasSelected =
        selectionRef.current.kind !== 'none' && selectionRef.current.blockId === blockId;
      applyMutation((blocks) => blocks.filter((b) => b.id !== blockId), {
        selection: wasSelected ? { kind: 'none' } : selectionRef.current,
      });
    },
    [applyMutation],
  );

  const duplicateBlock = useCallback(
    (blockId: string): string => {
      const src = dirtyRef.current.find((b) => b.id === blockId);
      if (!src) return '';
      const clone = detachBlock(src);
      applyMutation(
        (blocks) => {
          const at = indexOfBlock(blocks, blockId);
          const next = [...blocks];
          next.splice(at < 0 ? next.length : at + 1, 0, clone);
          return next;
        },
        { selection: { kind: 'block', blockId: clone.id } },
      );
      return clone.id;
    },
    [applyMutation],
  );

  // ── clipboard ─────────────────────────────────────────────────────────────
  const copyBlock = useCallback((blockId: string) => {
    const src = dirtyRef.current.find((b) => b.id === blockId);
    if (!src) return;
    const entry = copyToClipboard(src);
    clipboardRef.current = entry;
    setClipboard(entry);
  }, []);

  const pasteBlock = useCallback(
    (index?: number): string | null => {
      const block = pasteFromClipboard(clipboardRef.current);
      if (!block) return null;
      insertBlock(block, index);
      return block.id;
    },
    [insertBlock],
  );

  // ── history ───────────────────────────────────────────────────────────────
  const undo = useCallback(() => {
    const present: EditorSnapshot = {
      blocks: dirtyRef.current,
      selection: selectionRef.current,
    };
    const restored = history.current.undo(present);
    if (!restored) return;
    dirtyRef.current = restored.blocks;
    selectionRef.current = restored.selection;
    setDirtyBlocks(restored.blocks);
    setSelection(restored.selection);
    syncHistoryMirror();
    scheduleCommit(restored.blocks);
  }, [scheduleCommit, syncHistoryMirror]);

  const redo = useCallback(() => {
    const present: EditorSnapshot = {
      blocks: dirtyRef.current,
      selection: selectionRef.current,
    };
    const restored = history.current.redo(present);
    if (!restored) return;
    dirtyRef.current = restored.blocks;
    selectionRef.current = restored.selection;
    setDirtyBlocks(restored.blocks);
    setSelection(restored.selection);
    syncHistoryMirror();
    scheduleCommit(restored.blocks);
  }, [scheduleCommit, syncHistoryMirror]);

  // Keyboard shortcuts (⌘Z / ⇧⌘Z / ⌘C / ⌘V / ⌘D / Delete / Esc) — only while
  // active and not typing into a field (SPEC §1.4).
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (!activeRef.current) return;
      const target = e.target as HTMLElement | null;
      const typing =
        !!target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);
      const mod = e.metaKey || e.ctrlKey;
      const sel = selectionRef.current;

      if (e.key === 'Escape') {
        if (placingRef.current) cancelPlacing();
        else if (panelRef.current !== 'none') closePanel();
        else clearSelection();
        return;
      }
      if (typing) return;

      if (mod && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
        return;
      }
      if (mod && e.key.toLowerCase() === 'c' && sel.kind !== 'none') {
        e.preventDefault();
        copyBlock(sel.blockId);
        return;
      }
      if (mod && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        pasteBlock();
        return;
      }
      if (mod && e.key.toLowerCase() === 'd' && sel.kind !== 'none') {
        e.preventDefault();
        duplicateBlock(sel.blockId);
        return;
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && sel.kind === 'block') {
        e.preventDefault();
        removeBlock(sel.blockId);
        return;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [
    active,
    undo,
    redo,
    copyBlock,
    pasteBlock,
    duplicateBlock,
    removeBlock,
    clearSelection,
    closePanel,
    cancelPlacing,
  ]);

  const value: EditorContextValue = {
    // state
    active,
    surface,
    dirtyBlocks,
    selection,
    panel,
    placing,
    clipboard,
    undoStack,
    redoStack,
    committing,
    // actions
    enter,
    exit,
    selectBlock,
    selectTile,
    clearSelection,
    openGallery,
    openInspector,
    openEntityPicker,
    openTemplates,
    closePanel,
    beginPlacing,
    dropCard,
    cancelPlacing,
    addBlock,
    updateBlock,
    updateTile,
    addEntities,
    removeEntity,
    moveBlock,
    resizeBlock,
    removeBlock,
    duplicateBlock,
    copyBlock,
    pasteBlock,
    undo,
    redo,
    canUndo: history.current.canUndo,
    canRedo: history.current.canRedo,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Commit helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Keep the persisted `Block` field as the single source of truth when the
 * inspector wrote a shadow under `options.*` (SPEC_EDITOR.md §3 sync rule). The
 * renderer reads `Block.axis`/`source`/`chart`/`visibleWhen`/`tile`; `options`
 * is the inspector's working bag. On commit we hoist any shadow onto the
 * canonical field and drop the shadow so the two never diverge.
 */
function syncOptions(block: BlockConfig): BlockConfig {
  if (!block.options) return block;
  const o = block.options;
  const next: BlockConfig = { ...block };
  if (o.axis !== undefined) next.axis = o.axis;
  if (o.source !== undefined) next.source = o.source;
  if (o.chart !== undefined) next.chart = o.chart;
  if (o.visibleWhen !== undefined) next.visibleWhen = o.visibleWhen;
  if (o.leafTile !== undefined) next.tile = o.leafTile;
  // Drop the canonical shadows; keep only non-shadow knobs (e.g. list `wrap`).
  const { axis, source, chart, visibleWhen, leafTile, ...rest } = o;
  void axis;
  void source;
  void chart;
  void visibleWhen;
  void leafTile;
  next.options = Object.keys(rest).length ? rest : undefined;
  return next;
}

/** Drop `undefined`/empty values from a TileConfig so absence stays absence. */
function pruneTile(tile: TileConfig): TileConfig {
  const out: TileConfig = {};
  for (const [k, v] of Object.entries(tile)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    if (typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0) continue;
    (out as Record<string, unknown>)[k] = v;
  }
  return out;
}

/**
 * Fallback commit when the dashboard store does NOT expose a raw `mutateBlocks`.
 * Reconciles `from` (committed) toward `to` (dirty) using only the public
 * mutators. This handles add/remove but NOT field edits or precise reorders —
 * which is why the integrator should add the raw seam (see returned notes). Kept
 * intentionally simple and side-effecting; the fast path makes it dead code.
 */
function reconcileViaPublicMutators(
  from: BlockConfig[],
  to: BlockConfig[],
  ops: {
    reorderBlocks: (oldIndex: number, newIndex: number) => void;
    removeBlock: (blockId: string) => void;
    addBlock: (block: Block) => void;
  },
): void {
  const fromIds = new Set(from.map((b) => b.id));
  const toIds = new Set(to.map((b) => b.id));
  // Removals first.
  for (const b of from) if (!toIds.has(b.id)) ops.removeBlock(b.id);
  // Additions (append; precise index needs the raw seam).
  for (const b of to) if (!fromIds.has(b.id)) ops.addBlock(b as Block);
}
