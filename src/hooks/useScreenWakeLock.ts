import { useEffect } from 'react';

/**
 * useScreenWakeLock — keep the screen awake while `enabled` (the wall-tablet/kiosk
 * use case: a docked display should never dim or sleep). Uses the Screen Wake Lock
 * API where available; a full no-op everywhere it is not (older Safari, non-secure
 * contexts). The sentinel is re-acquired on `visibilitychange → visible` because the
 * platform auto-releases the lock whenever the tab is hidden, and released on disable
 * or unmount. Fully guarded — never throws.
 */

// The Wake Lock API is not in this project's lib typings; describe just what we touch.
interface WakeLockSentinelLike {
  released: boolean;
  release: () => Promise<void>;
}
interface WakeLockLike {
  request: (type: 'screen') => Promise<WakeLockSentinelLike>;
}

export function useScreenWakeLock(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;
    if (typeof navigator === 'undefined') return;
    const wakeLock = (navigator as Navigator & { wakeLock?: WakeLockLike }).wakeLock;
    if (!wakeLock) return;

    let cancelled = false;
    let sentinel: WakeLockSentinelLike | null = null;

    const acquire = async () => {
      if (cancelled) return;
      // Only meaningful while the page is actually visible.
      if (typeof document !== 'undefined' && document.visibilityState !== 'visible') return;
      try {
        sentinel = await wakeLock.request('screen');
      } catch {
        // Permission denied / not allowed / unsupported — silently give up.
        sentinel = null;
      }
    };

    const onVisible = () => {
      if (document.visibilityState === 'visible' && (!sentinel || sentinel.released)) {
        void acquire();
      }
    };

    void acquire();
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisible);
      try {
        void sentinel?.release?.();
      } catch {
        /* already released / unsupported — ignore */
      }
      sentinel = null;
    };
  }, [enabled]);
}
