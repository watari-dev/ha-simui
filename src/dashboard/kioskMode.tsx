import { createContext, useContext, useState, type ReactNode } from 'react';

/**
 * Kiosk mode — the chrome-off, screen-awake, dot-matrix-ambient wall-tablet display
 * (the "Wall tablet" role variant flagged in CLAUDE.md "Open questions"). When on, the
 * surface header (`.simui-head`) is hidden and editing is suppressed; the only way out
 * is the floating "Exit kiosk" button DashboardView mounts. The flag is sticky: it is
 * seeded from `localStorage('simui:kiosk')` OR a `?kiosk=1` query param (either turns
 * it on) so a tablet booted at that URL lands straight in kiosk, and persisted on
 * enter()/exit() so a reload holds the mode.
 */

const STORE_KEY = 'simui:kiosk';

export interface KioskContextValue {
  /** True when the dashboard is in chrome-off wall-tablet mode. */
  enabled: boolean;
  /** Enter kiosk: persist the flag and (best-effort) request fullscreen. */
  enter: () => void;
  /** Leave kiosk: persist the flag and (best-effort) exit fullscreen. */
  exit: () => void;
}

const Ctx = createContext<KioskContextValue | null>(null);

/** Throws outside a provider — use it in components that always live under one. */
export function useKiosk(): KioskContextValue {
  const v = useContext(Ctx);
  if (!v) throw new Error('useKiosk must be used inside <KioskProvider>');
  return v;
}

/** Provider-safe variant: a no-op `{ enabled: false }` when there is no provider. */
export function useKioskOptional(): KioskContextValue {
  return useContext(Ctx) ?? { enabled: false, enter: () => {}, exit: () => {} };
}

/** Seed the initial flag from persisted storage OR the `?kiosk=1` query param. */
function initialEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (localStorage.getItem(STORE_KEY) === '1') return true;
  } catch {
    /* storage unavailable (private mode / sandbox) — fall through */
  }
  try {
    if (new URLSearchParams(location.search).get('kiosk') === '1') return true;
  } catch {
    /* no location — ignore */
  }
  return false;
}

function persist(on: boolean): void {
  try {
    if (on) localStorage.setItem(STORE_KEY, '1');
    else localStorage.removeItem(STORE_KEY);
  } catch {
    /* storage unavailable — the in-memory flag still drives this session */
  }
}

export function KioskProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState<boolean>(initialEnabled);

  const enter = () => {
    setEnabled(true);
    persist(true);
    // Best-effort: a wall tablet wants the whole screen. Rejection (no gesture,
    // unsupported) is harmless — kiosk chrome-off works regardless.
    try {
      void document.documentElement.requestFullscreen?.()?.catch?.(() => {});
    } catch {
      /* requestFullscreen unavailable — ignore */
    }
  };

  const exit = () => {
    setEnabled(false);
    persist(false);
    try {
      if (document.fullscreenElement) void document.exitFullscreen?.()?.catch?.(() => {});
    } catch {
      /* exitFullscreen unavailable — ignore */
    }
  };

  return <Ctx.Provider value={{ enabled, enter, exit }}>{children}</Ctx.Provider>;
}
