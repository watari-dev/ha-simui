// useSpanFromDrag — bridge the low-level `useResize` pointer hook to the editor's
// `resizeBlock` action, and surface a tiny React state for the LIVE width badge.
//
// `useResize` (src/editor/useResize.ts) already does the hard part: it captures the
// pointer, reads the real grid geometry, snaps the drag to whole columns, previews the
// geometry by writing `--span` on the frame (no per-move React render), and commits the
// resolved span ONCE on pointer-up. It does NOT, by itself, own any of:
//   • the commit target (which `resizeBlock` to call),
//   • a React value for a visible "1× / 2× / Full" affordance, or
//   • the legacy-vs-12-col span vocabulary decision.
// This helper supplies all three so `ResizeHandle` stays a thin, declarative view.
//
// The grid today is the legacy `1 | 2 | 'full'` auto-fill model, so we resolve in
// `legacy` mode by default (1 → 1, 2 → 2, ≥cols → 'full'). When a surface upgrades to the
// 12-track grid (grid12.css), pass `legacy: false` and the raw 1..N span flows through
// unchanged — same hook, same handle, no rewrite (SPEC_LAYOUT.md §9).

import { useEffect, useMemo, useRef, useState } from 'react';
import { useResize, type ResizeSide, type UseResizeReturn } from '../useResize';
import type { BlockSpan } from '../../dashboard/types';

/** A snapped, human-readable label for the live width badge. */
export function spanBadge(span: BlockSpan): string {
  if (span === 'full') return 'Full';
  if (typeof span === 'number') return span <= 1 ? '1×' : `${span}×`;
  return '1×';
}

export interface UseSpanFromDragOptions {
  /** The block's current authored span (drives the snap start + the idle badge). */
  span: BlockSpan;
  /** Commit a resolved span exactly once, on pointer-up. Wire to `editor.resizeBlock(id, span)`. */
  onResize: (span: BlockSpan) => void;
  /**
   * Live column count of the section grid. The legacy auto-fill grid has no fixed track
   * count, so a value of `2` makes the east-handle behave as today's 1 → 2 → full cycle
   * with continuous drag snapping. The 12-col grid passes 12 / 6 / 4 per breakpoint.
   */
  cols?: number;
  /**
   * Legacy `1 | 2 | 'full'` resolution (default true — today's grid). Set false on a
   * surface running the 12-track grid to store the raw 1..N number.
   */
  legacy?: boolean;
  /** Enable the south (rowSpan) handle for charts/banners. Default false. */
  vertical?: boolean;
}

export interface UseSpanFromDragReturn {
  /** Spread onto the EAST (width) handle element. */
  east: UseResizeReturn['east'];
  /** Spread onto the SOUTH (height) handle element — only render when `vertical`. */
  south: UseResizeReturn['south'];
  /** True only while a drag gesture is live (drives the badge's visibility + the .resizing class). */
  dragging: boolean;
  /**
   * The span to SHOW in the badge: the live, mid-drag previewed span while dragging,
   * else the block's authored span. Always reflects what a pointer-up would commit.
   */
  previewSpan: BlockSpan;
  /** Convenience: the badge label string for `previewSpan`. */
  badge: string;
}

/**
 * Wire a block's resize handles to the editor. Returns the handle prop-bags plus a
 * minimal React preview state (used ONLY for the badge — the geometry preview itself is
 * still render-free, driven by the CSS var the underlying hook writes).
 */
export function useSpanFromDrag(opts: UseSpanFromDragOptions): UseSpanFromDragReturn {
  const { span, onResize, cols = 2, legacy = true } = opts;

  // The only React state we hold: the previewed column count while a drag is live. This
  // re-renders only on each *snap step* (not per pointermove), so it's a handful of
  // renders across a whole gesture — well within the "minimal motion" budget.
  const [drag, setDrag] = useState<{ span: number; side: ResizeSide } | null>(null);
  const draggingRef = useRef(false);
  draggingRef.current = drag != null;

  const handles = useResize({
    cols,
    span,
    legacy,
    min: 1,
    onPreview: (n, side) => setDrag({ span: n, side }),
    onCommit: (next) => {
      setDrag(null);
      onResize(next);
    },
  });

  // Safety net: `useResize` only fires `onCommit` when the span actually CHANGED across the
  // gesture (drag out and back to the start span ⇒ no commit). Without this the preview
  // badge could stay pinned. A capture-phase pointerup/cancel clears the preview whenever a
  // drag is live, regardless of whether the hook committed.
  useEffect(() => {
    const clear = () => {
      if (draggingRef.current) setDrag(null);
    };
    window.addEventListener('pointerup', clear, true);
    window.addEventListener('pointercancel', clear, true);
    return () => {
      window.removeEventListener('pointerup', clear, true);
      window.removeEventListener('pointercancel', clear, true);
    };
  }, []);

  const dragging = drag != null;

  // Resolve the previewed column count back into the badge's vocabulary. While dragging we
  // show the live snapped span; the east handle drives width (1..cols), the south handle
  // drives rowSpan (shown as a row count, not a width badge — callers gate that).
  const previewSpan: BlockSpan = useMemo(() => {
    if (!drag || drag.side !== 'e') return span;
    if (legacy) {
      if (drag.span >= cols) return 'full';
      return drag.span >= 2 ? 2 : 1;
    }
    return drag.span;
  }, [drag, span, cols, legacy]);

  return {
    east: handles.east,
    south: handles.south,
    dragging,
    previewSpan,
    badge: spanBadge(previewSpan),
  };
}
