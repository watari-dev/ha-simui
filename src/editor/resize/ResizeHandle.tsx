// ResizeHandle — direct-manipulation resize of a block's column span.
//
// Drop this inside BlockChrome's `editing` controls (see INTEGRATION). It renders a slim
// east (width) edge — and, for charts/banners, an optional south (height) edge — that the
// user drags to set the block's span. The drag snaps to valid spans (1 / 2 / full on the
// legacy grid, or 1..N columns on the 12-track grid) and commits ONCE on pointer-up via
// `editor.resizeBlock(block.id, span)`.
//
// Design language (DESIGN_PRINCIPLES §11, SPEC_LAYOUT.md §5):
//   • The hairline accent edge + hit-target geometry already live in `grid.css`
//     (`.simui-resize-handle.e/.s`); we reuse those classes verbatim — this file adds ONLY
//     the live width badge (resize.css), so there is no style duplication.
//   • Minimal motion: the geometry preview is render-free (the underlying `useResize` hook
//     writes a `--span` CSS var on the frame); the only React update is the small badge,
//     which ticks once per snap step, not per pointermove.
//   • The handle OWNS its pointer gesture: `onPointerDown` stops propagation so dnd-kit's
//     sortable never starts a reorder drag from an edge pull (an edge pull resizes; a body
//     grab moves).
//
// Self-contained: it reads the editor via `useEditorOptional()`, so the integrator's only
// change to BlockChrome is to render `<ResizeHandle block={block} />`. When no editor store
// is mounted (legacy dashboard path) it renders nothing.

import { useEditorOptional } from '../store';
import { useSpanFromDrag } from './useSpanFromDrag';
import type { Block, BlockSpan } from '../../dashboard/types';
import './resize.css';

/** Block types that meaningfully support a vertical (rowSpan) drag. */
const ROW_RESIZABLE = new Set<Block['type']>(['chart', 'attention']);

export interface ResizeHandleComponentProps {
  /** The block this handle resizes. */
  block: Block;
  /**
   * Force the legacy `1 | 2 | 'full'` span vocabulary. Defaults to true (today's grid).
   * The integrator flips this to false once the surface runs the 12-track grid (grid12.css).
   */
  legacy?: boolean;
  /**
   * Column count of the live grid. Legacy grid: leave at 2 (drag cycles 1 → 2 → full).
   * 12-track grid: pass the breakpoint's column count (12 / 6 / 4).
   */
  cols?: number;
  /** Force-enable / disable the south (height) handle. Omit ⇒ on for chart/attention blocks. */
  vertical?: boolean;
}

/**
 * The draggable resize edges for one block. Renders nothing unless an editor store is
 * active (so it's safe to mount unconditionally inside `editing` chrome).
 */
export function ResizeHandle({ block, legacy = true, cols = 2, vertical }: ResizeHandleComponentProps) {
  const editor = useEditorOptional();
  const showSouth = vertical ?? ROW_RESIZABLE.has(block.type);

  const { east, south, dragging, badge } = useSpanFromDrag({
    span: block.span,
    cols,
    legacy,
    vertical: showSouth,
    onResize: (span: BlockSpan) => editor?.resizeBlock(block.id, span),
  });

  // No editor store driving this surface ⇒ no resize affordance (legacy dashboard path).
  if (!editor?.active) return null;

  // Stop the pointer reaching dnd-kit's sortable listeners on the frame: an edge pull must
  // resize, never start a reorder drag. We wrap the hook's own handler so its
  // preventDefault/stopPropagation still runs first.
  const swallow = (handler: (e: React.PointerEvent<HTMLElement>) => void) =>
    (e: React.PointerEvent<HTMLElement>) => {
      e.stopPropagation();
      handler(e);
    };

  return (
    <>
      {/* East edge — drag to set width. */}
      <div
        {...east}
        onPointerDown={swallow(east.onPointerDown)}
        className="simui-resize-handle e"
        data-resizing={dragging || undefined}
      />
      {/* South edge — drag to set height (charts / banners only). */}
      {showSouth && (
        <div
          {...south}
          onPointerDown={swallow(south.onPointerDown)}
          className="simui-resize-handle s"
          data-resizing={dragging || undefined}
        />
      )}
      {/* Live width badge — appears only mid-drag, pinned to the trailing edge, showing the
          span a pointer-up would commit. State changes appear, they don't animate. */}
      {dragging && (
        <span className="simui-resize-badge" aria-hidden>
          {badge}
        </span>
      )}
    </>
  );
}
