import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { clamp } from '../util';

/**
 * "The tile IS the slider" (DESIGN_DIRECTIONS, signature move #2). A pointer drag —
 * horizontal OR vertical — anywhere over the host element maps to a 0–100 value
 * with optimistic local state and a debounced commit. Replaces the timid 4px
 * hairline range input: the value visualization and the control become the same
 * pixels.
 *
 * - **Optimistic**: `value` tracks the finger instantly; the external `value` prop
 *   only re-syncs once the drag ends (and there's no pending debounce) so live HA
 *   updates never fight the gesture.
 * - **Debounced commit** (~120ms): `onCommit` fires at most every `commitMs` while
 *   dragging, plus once on release — surgical service calls, not one-per-pixel.
 * - **rAF-throttled**: pointer math coalesces to one update per frame.
 * - **Axis**: defaults to `'auto'` — the dominant drag axis wins on the first move,
 *   then locks (vertical = up-increases, the brightness-fill idiom). Force with
 *   `axis: 'vertical' | 'horizontal'`.
 *
 * Returns `{ value, dragging, moved, handlers, fillStyle }`. Spread `handlers` onto
 * the host; `fillStyle` is the inline `height`/`width` % for the tinted fill child.
 * `moved` distinguishes a drag from a tap (so the host can toggle on a clean tap).
 */

export interface DragValueOptions {
  /** The authoritative 0–100 value (e.g. brightness %). Re-syncs `value` when idle. */
  value: number;
  /** Committed when the value settles — wire to a service call. */
  onCommit: (value: number) => void;
  /** Drag axis. `'auto'` (default) locks to the dominant axis on first move. */
  axis?: 'vertical' | 'horizontal' | 'auto';
  /** Debounce + max-rate for `onCommit`, in ms (default 120). */
  commitMs?: number;
  /** Snap the value to this step before committing (e.g. 1, 5). Default 1. */
  step?: number;
  /** Disable dragging (e.g. an off / unavailable entity). Taps still pass through. */
  disabled?: boolean;
  /** Min drag distance (px) before a gesture counts as a drag, not a tap. Default 4. */
  threshold?: number;
}

export interface DragValueResult {
  /** The live, optimistic 0–100 value (snapped). */
  value: number;
  /** True while a drag gesture is in flight. */
  dragging: boolean;
  /** True once the current/last gesture exceeded the tap threshold (drag, not tap). */
  moved: () => boolean;
  /** Spread onto the host element. */
  handlers: {
    onPointerDown: (e: ReactPointerEvent) => void;
  };
  /** Inline style for the tinted fill child (`height` for vertical, `width` for horizontal). */
  fillStyle: CSSProperties;
}

function snap(v: number, step: number): number {
  if (step <= 0) return clamp(Math.round(v), 0, 100);
  return clamp(Math.round(v / step) * step, 0, 100);
}

export function useDragValue(opts: DragValueOptions): DragValueResult {
  const { value: external, onCommit, axis = 'auto', commitMs = 120, step = 1, disabled, threshold = 4 } = opts;

  const [value, setValue] = useState(() => snap(external, step));
  const [dragging, setDragging] = useState(false);
  const [lockedAxis, setLockedAxis] = useState<'vertical' | 'horizontal'>(axis === 'auto' ? 'vertical' : axis);

  // Per-instance refs the global pointer listeners read without re-subscribing.
  const draggingRef = useRef(false);
  const valueRef = useRef(value);
  const rectRef = useRef<DOMRect | null>(null);
  const lockAxisRef = useRef<'vertical' | 'horizontal' | null>(axis === 'auto' ? null : axis);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const pointRef = useRef<{ x: number; y: number } | null>(null);
  const movedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<number | null>(null);

  // Debounced commit: emit at most every `commitMs`, trailing edge guaranteed.
  const lastCommitRef = useRef(0);
  const commitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCommitRef = useRef(onCommit);
  onCommitRef.current = onCommit;

  const flushCommit = useCallback(() => {
    if (commitTimer.current != null) {
      clearTimeout(commitTimer.current);
      commitTimer.current = null;
    }
    if (pendingRef.current != null) {
      const v = pendingRef.current;
      pendingRef.current = null;
      lastCommitRef.current = Date.now();
      onCommitRef.current(v);
    }
  }, []);

  const scheduleCommit = useCallback(
    (v: number) => {
      pendingRef.current = v;
      const now = Date.now();
      const wait = Math.max(0, commitMs - (now - lastCommitRef.current));
      if (commitTimer.current != null) clearTimeout(commitTimer.current);
      commitTimer.current = setTimeout(flushCommit, wait);
    },
    [commitMs, flushCommit],
  );

  // Re-sync to the authoritative value only when idle (not mid-drag, no pending
  // commit) — otherwise a slow HA round-trip would snap the finger back.
  useEffect(() => {
    if (draggingRef.current || pendingRef.current != null) return;
    const next = snap(external, step);
    valueRef.current = next;
    setValue(next);
  }, [external, step]);

  // Compute the value from the live pointer + host rect (one update per frame).
  const apply = useCallback(() => {
    rafRef.current = null;
    const rect = rectRef.current;
    const pt = pointRef.current;
    if (!rect || !pt) return;

    // Lock the axis on the first meaningful move (auto mode).
    if (lockAxisRef.current == null && startRef.current) {
      const dx = Math.abs(pt.x - startRef.current.x);
      const dy = Math.abs(pt.y - startRef.current.y);
      if (dx > threshold || dy > threshold) {
        const a = dy >= dx ? 'vertical' : 'horizontal';
        lockAxisRef.current = a;
        setLockedAxis(a);
      }
    }
    const active = lockAxisRef.current ?? 'vertical';

    let raw: number;
    if (active === 'vertical') {
      // Up increases: 0 at the bottom edge, 100 at the top.
      raw = rect.height > 0 ? ((rect.bottom - pt.y) / rect.height) * 100 : 0;
    } else {
      raw = rect.width > 0 ? ((pt.x - rect.left) / rect.width) * 100 : 0;
    }
    const next = snap(raw, step);
    if (next !== valueRef.current) {
      valueRef.current = next;
      setValue(next);
      scheduleCommit(next);
    }
  }, [step, threshold, scheduleCommit]);

  // Global move/up listeners are attached for the lifetime of a drag only.
  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      pointRef.current = { x: e.clientX, y: e.clientY };
      if (startRef.current && !movedRef.current) {
        const dx = Math.abs(e.clientX - startRef.current.x);
        const dy = Math.abs(e.clientY - startRef.current.y);
        if (dx > threshold || dy > threshold) movedRef.current = true;
      }
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(apply);
    };

    const onUp = () => {
      draggingRef.current = false;
      setDragging(false);
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      // If the gesture actually moved, make sure the final position commits.
      if (movedRef.current) {
        if (pendingRef.current == null) pendingRef.current = valueRef.current;
        flushCommit();
      }
    };

    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [dragging, threshold, apply, flushCommit]);

  // Clean up any pending RAF / timer on unmount.
  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (commitTimer.current != null) clearTimeout(commitTimer.current);
    },
    [],
  );

  const onPointerDown = useCallback(
    (e: ReactPointerEvent) => {
      if (disabled) return;
      if (e.button != null && e.button !== 0) return; // primary button / touch only
      const el = e.currentTarget as HTMLElement;
      rectRef.current = el.getBoundingClientRect();
      startRef.current = { x: e.clientX, y: e.clientY };
      pointRef.current = { x: e.clientX, y: e.clientY };
      movedRef.current = false;
      lockAxisRef.current = axis === 'auto' ? null : axis;
      draggingRef.current = true;
      setDragging(true);
      // Note: we do NOT apply the press point immediately — a clean tap (no move)
      // should fall through to the host's toggle, not snap the value. The host
      // checks `moved()` on click to decide tap-vs-drag.
    },
    [disabled, axis],
  );

  const fillStyle: CSSProperties = lockedAxis === 'horizontal' ? { width: `${value}%` } : { height: `${value}%` };

  const moved = useCallback(() => movedRef.current, []);

  return { value, dragging, moved, handlers: { onPointerDown }, fillStyle };
}
