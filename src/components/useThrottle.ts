import { useCallback, useRef } from 'react';

/**
 * Throttle a callback to at most once per `ms`, with a guaranteed trailing call so
 * the final value always lands. Stable identity across renders. Used to keep a
 * dragged colour wheel / temperature dial from flooding the HA WebSocket with a
 * service call on every pointer-move (the SliderTile path debounces via
 * useDragValue; the wheel/dial route through here).
 */
export function useThrottle<A extends unknown[]>(
  fn: (...args: A) => void,
  ms: number,
): (...args: A) => void {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const last = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pending = useRef<A | null>(null);

  return useCallback(
    (...args: A) => {
      pending.current = args;
      const now = performance.now();
      const wait = ms - (now - last.current);
      if (wait <= 0) {
        last.current = now;
        pending.current = null;
        fnRef.current(...args);
      } else if (timer.current == null) {
        timer.current = setTimeout(() => {
          timer.current = null;
          last.current = performance.now();
          const a = pending.current;
          pending.current = null;
          if (a) fnRef.current(...a);
        }, wait);
      }
    },
    [ms],
  );
}
