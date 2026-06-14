// useResize — a pointer-drag resize hook for block side-handles (SPEC_LAYOUT.md §5.2).
//
// Resize is a *pointer gesture*, not a dnd-kit sortable (dnd-kit is for reorder/move).
// On `pointerdown` the hook captures the pointer, reads the section-grid geometry, and
// on every `pointermove` snaps the drag delta to whole grid columns — previewing the new
// span by writing a CSS custom property on the frame (NO React state per move, so it's
// 60fps with no re-render storm; honours DESIGN_PRINCIPLES §11 "minimal motion / surgical
// updates"). On `pointerup` it commits ONCE via `onCommit(span)`, which the integrator
// wires to `EditorActions.resizeBlock` (see this file's header note in the task summary).
//
// Forward-compatible with the 12-col model (SPEC_LAYOUT.md §1): the hook is parameterised
// by the live column count (`cols`) and works for ANY grid width. It also accepts today's
// legacy `BlockSpan` (1 | 2 | 'full') and resolves the new span back into the same
// vocabulary when the grid is the legacy auto-fill/2-col one, so it drives both the
// current grid and the future 12-track grid unchanged.

import { useCallback, useRef } from 'react';
import type { PointerEvent as ReactPointerEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { BlockSpan } from '../dashboard/types';

/** Which edge handle is being dragged. East = horizontal (span); South = vertical (rowSpan). */
export type ResizeSide = 'e' | 's';

export interface UseResizeOptions {
  /**
   * Live column count of the section grid at the current breakpoint
   * (desktop 12 / tablet 6 / phone 4). For the legacy auto-fill grid pass the
   * effective track count (see `legacy` below). Used to clamp + snap.
   */
  cols: number;
  /** The block's current authored span, in the SAME vocabulary `onCommit` expects. */
  span: BlockSpan;
  /**
   * Commit the resolved span exactly once, on pointer-up. The integrator wires this to
   * `editor.resizeBlock(blockId, span)`. At desktop this is the 12-col `span`; at a
   * narrower breakpoint the integrator may route it to `spanAt[bp]` (SPEC_LAYOUT.md §5.2).
   */
  onCommit: (span: BlockSpan, side: ResizeSide) => void;
  /**
   * Legacy mode: the grid is still the auto-fill `1 | 2 | 'full'` model, so resolve the
   * snapped column count back into that union (1 → 1, 2 → 2, ≥ cols → 'full'). Omit /
   * false ⇒ commit the raw 1..cols number (the 12-col model). Lets Phase-1 and Phase-2
   * (SPEC_LAYOUT.md §9) share this hook without change.
   */
  legacy?: boolean;
  /**
   * Live grid metrics. The hook reads the grid element to derive column width; pass the
   * grid node (or a getter) so it measures the REAL rendered track, gap included. When
   * omitted it falls back to the resize handle's parent grid via `closest('[data-grid]')`.
   */
  gridEl?: HTMLElement | null;
  /** Minimum span (default 1). */
  min?: number;
  /**
   * Called on every snap step while dragging with the previewed span, so the caller can
   * paint a live affordance (e.g. a column-count badge). Optional — the hook already
   * previews the geometry itself via the CSS var on the frame.
   */
  onPreview?: (span: number, side: ResizeSide) => void;
}

export interface UseResizeReturn {
  /** Spread onto the EAST handle element: `<div {...east} />`. */
  east: ResizeHandleProps;
  /** Spread onto the SOUTH handle element (charts/banners with rowSpan): `<div {...south} />`. */
  south: ResizeHandleProps;
  /** True while a resize gesture is live (caller may add a `.resizing` class). */
  isResizing: () => boolean;
}

export interface ResizeHandleProps {
  onPointerDown: (e: ReactPointerEvent<HTMLElement>) => void;
  role: 'separator';
  'aria-orientation': 'vertical' | 'horizontal';
  'aria-label': string;
  tabIndex: 0;
  /** Keyboard a11y: ←/→ (east) or ↑/↓ (south) nudge the span one column at a time. */
  onKeyDown: (e: ReactKeyboardEvent<HTMLElement>) => void;
}

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

/** Read a legacy `1 | 2 | 'full'` span as a column count against `cols`. */
function spanToCols(span: BlockSpan, cols: number): number {
  if (span === 'full') return cols;
  if (typeof span === 'number') return clamp(span === 1 || span === 2 ? span : Math.round(span), 1, cols);
  return 1;
}

/** Resolve a snapped column count back into the configured span vocabulary. */
function colsToSpan(n: number, cols: number, legacy: boolean): BlockSpan {
  const c = clamp(Math.round(n), 1, cols);
  if (!legacy) return c; // 12-col model: store the raw number
  if (c >= cols) return 'full';
  if (c >= 2) return 2; // legacy grid only has 1 | 2 | full
  return 1;
}

/**
 * Resolve the grid element + a single column's pixel pitch (track + gap) from a node
 * inside it. Reads the REAL computed `grid-template-columns` so it works for the
 * auto-fill grid (today) AND the 12-track grid (Phase 2) identically.
 */
function gridMetrics(grid: HTMLElement | null): { rect: DOMRect; pitch: number; cols: number; rowPitch: number } | null {
  if (!grid) return null;
  const rect = grid.getBoundingClientRect();
  const cs = getComputedStyle(grid);
  const cols = cs.gridTemplateColumns.split(' ').filter(Boolean).length || 1;
  const colGap = parseFloat(cs.columnGap || cs.gap || '0') || 0;
  const rowGap = parseFloat(cs.rowGap || cs.gap || '0') || 0;
  const trackW = (rect.width - colGap * (cols - 1)) / cols;
  const rows = cs.gridTemplateRows.split(' ').filter(Boolean).length || 1;
  const trackH = (rect.height - rowGap * (rows - 1)) / rows;
  return { rect, pitch: trackW + colGap, cols, rowPitch: trackH + rowGap };
}

/**
 * Drag a side handle to resize a block's column span, snapping to grid columns.
 *
 * Wiring (BlockChrome/BlockFrame): give each handle the spread props and ensure the
 * block frame carries `--span` inline so the live preview lands on it. The hook walks up
 * from the handle to the nearest `[data-grid]` ancestor for geometry, or uses `gridEl`.
 */
export function useResize(opts: UseResizeOptions): UseResizeReturn {
  const { cols, span, onCommit, legacy = false, gridEl, min = 1, onPreview } = opts;
  // Refs so the live pointermove closure always reads fresh values without re-subscribing.
  const optsRef = useRef(opts);
  optsRef.current = opts;
  const resizingRef = useRef(false);

  const start = useCallback(
    (e: ReactPointerEvent<HTMLElement>, side: ResizeSide) => {
      e.preventDefault();
      e.stopPropagation();
      const handle = e.currentTarget;
      // Grid element: explicit prop wins, else the nearest data-grid ancestor.
      const grid =
        optsRef.current.gridEl ??
        (handle.closest('[data-grid]') as HTMLElement | null) ??
        (handle.closest('.simui-section-grid, .simui-grid') as HTMLElement | null);
      const m = gridMetrics(grid);
      if (!m) return;
      // The frame whose --span we preview = the block element (the handle's positioned host).
      const frame = handle.closest('.simui-block, .simui-card') as HTMLElement | null;

      const live = optsRef.current;
      const colsNow = m.cols || live.cols || cols;
      const startSpan = spanToCols(live.span, colsNow);
      const startX = e.clientX;
      const startY = e.clientY;
      let lastSpan = startSpan;

      resizingRef.current = true;
      frame?.classList.add('resizing');
      handle.setPointerCapture?.(e.pointerId);

      const onMove = (ev: PointerEvent) => {
        const cur = optsRef.current;
        const cn = m.cols || cur.cols || colsNow;
        let next: number;
        if (side === 'e') {
          const deltaCols = Math.round((ev.clientX - startX) / m.pitch);
          next = clamp(startSpan + deltaCols, cur.min ?? min, cn);
          if (frame) frame.style.setProperty('--span', String(next));
        } else {
          const deltaRows = Math.round((ev.clientY - startY) / m.rowPitch);
          next = clamp(startSpan + deltaRows, cur.min ?? min, 12);
          if (frame) frame.style.setProperty('--row-span', String(next));
        }
        if (next !== lastSpan) {
          lastSpan = next;
          cur.onPreview?.(next, side);
        }
      };

      const onUp = (ev: PointerEvent) => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
        handle.releasePointerCapture?.(ev.pointerId);
        resizingRef.current = false;
        frame?.classList.remove('resizing');
        const cur = optsRef.current;
        const cn = m.cols || cur.cols || colsNow;
        // Clear the inline preview override so React's authored style takes back over.
        if (frame) {
          frame.style.removeProperty('--span');
          frame.style.removeProperty('--row-span');
        }
        if (lastSpan !== startSpan) {
          cur.onCommit(colsToSpan(lastSpan, cn, cur.legacy ?? legacy), side);
        }
      };

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
    },
    [cols, span, onCommit, legacy, gridEl, min, onPreview],
  );

  const nudge = useCallback(
    (e: ReactKeyboardEvent<HTMLElement>, side: ResizeSide) => {
      const cur = optsRef.current;
      const grid =
        cur.gridEl ??
        (e.currentTarget.closest('[data-grid]') as HTMLElement | null) ??
        (e.currentTarget.closest('.simui-section-grid, .simui-grid') as HTMLElement | null);
      const m = gridMetrics(grid);
      const colsNow = m?.cols || cur.cols || cols;
      const startSpan = spanToCols(cur.span, colsNow);
      const inc = side === 'e'
        ? e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
        : e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
      if (inc === 0) return;
      e.preventDefault();
      const max = side === 'e' ? colsNow : 12;
      const next = clamp(startSpan + inc, cur.min ?? min, max);
      if (next !== startSpan) cur.onCommit(colsToSpan(next, colsNow, cur.legacy ?? legacy), side);
    },
    [cols, min, legacy],
  );

  return {
    east: {
      onPointerDown: (e) => start(e, 'e'),
      onKeyDown: (e) => nudge(e, 'e'),
      role: 'separator',
      'aria-orientation': 'vertical',
      'aria-label': 'Resize width',
      tabIndex: 0,
    },
    south: {
      onPointerDown: (e) => start(e, 's'),
      onKeyDown: (e) => nudge(e, 's'),
      role: 'separator',
      'aria-orientation': 'horizontal',
      'aria-label': 'Resize height',
      tabIndex: 0,
    },
    isResizing: () => resizingRef.current,
  };
}
