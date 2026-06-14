import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type TouchEvent as ReactTouchEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { useOverlayRoot } from './OverlayRoot';

/**
 * Right-click / long-press context menu (DESIGN_PRINCIPLES §14). The third layer
 * of disclosure — glance → tap (Sheet) → context. A tile/row spreads
 * {@link useContextMenu}'s `menuProps` to summon a small list of relevant actions
 * at the pointer, clamped to stay on-screen. Color is reserved for state, so the
 * menu is monochrome; only a `danger` item tints (--down). Keyboard accessible:
 * arrows move, Enter/Space invoke, Esc closes; an outside click also closes.
 */

export interface ContextMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  danger?: boolean;
  /** A non-interactive divider above this item (e.g. to fence off destructive actions). */
  separator?: boolean;
  disabled?: boolean;
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  x: number;
  y: number;
  onClose: () => void;
  /** Optional rich quick-controls (e.g. a light's brightness/colour) above the list. */
  header?: ReactNode;
}

/** Gap kept between the menu and the viewport edge when clamping. */
const EDGE = 8;

export function ContextMenu({ items, x, y, onClose, header }: ContextMenuProps) {
  const overlayRoot = useOverlayRoot();
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x, y });
  // -1 = nothing focused yet (pointer-summoned); 0+ = keyboard navigating.
  const [active, setActive] = useState(-1);

  // Indices that can actually receive focus (skip disabled rows).
  const focusable = items.map((it, i) => (it.disabled ? -1 : i)).filter((i) => i >= 0);

  // Clamp into the viewport once we can measure the menu. useLayoutEffect so the
  // reposition happens before paint — the menu never flashes off-screen.
  //
  // `position: fixed` resolves against the nearest ancestor with a transform /
  // filter / contain (its "containing block"), NOT always the viewport. When simUI
  // is embedded in HA, the app shell can transform a wrapper above document.body,
  // so a raw `left: clientX` lands relative to that wrapper and the menu jumps far
  // left. We recover the containing block's viewport origin from the menu's own
  // rect (it is currently rendered at `pos`), then position relative to it. In
  // standalone dev the containing block IS the viewport, so origin ≈ 0 — a no-op.
  useLayoutEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const { width, height } = rect;
    const originX = rect.left - pos.x; // viewport x where the containing block's left edge sits
    const originY = rect.top - pos.y;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let nx = x; // desired position in VIEWPORT coordinates (clientX/clientY)
    let ny = y;
    if (nx + width > vw - EDGE) nx = Math.max(EDGE, vw - width - EDGE);
    if (ny + height > vh - EDGE) ny = Math.max(EDGE, vh - height - EDGE);
    if (nx < EDGE) nx = EDGE;
    if (ny < EDGE) ny = EDGE;
    // Convert the clamped viewport coords into the containing block's coordinate space.
    setPos({ x: nx - originX, y: ny - originY });
  }, [x, y, items.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Focus the menu container so it captures keys immediately (Esc, arrows).
  useEffect(() => {
    menuRef.current?.focus();
  }, []);

  // Outside click / right-click anywhere else / scroll dismisses the menu.
  useEffect(() => {
    const onPointer = (ev: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(ev.target as Node)) onClose();
    };
    const onScroll = () => onClose();
    // capture phase so we win against stopPropagation inside tiles.
    window.addEventListener('mousedown', onPointer, true);
    window.addEventListener('touchstart', onPointer, true);
    window.addEventListener('contextmenu', onPointer, true);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onClose);
    window.addEventListener('blur', onClose);
    return () => {
      window.removeEventListener('mousedown', onPointer, true);
      window.removeEventListener('touchstart', onPointer, true);
      window.removeEventListener('contextmenu', onPointer, true);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onClose);
      window.removeEventListener('blur', onClose);
    };
  }, [onClose]);

  const pick = useCallback(
    (item: ContextMenuItem) => {
      if (item.disabled) return;
      onClose();
      item.onClick();
    },
    [onClose],
  );

  const move = useCallback(
    (dir: 1 | -1) => {
      if (focusable.length === 0) return;
      setActive((cur) => {
        const at = focusable.indexOf(cur);
        if (at === -1) return dir === 1 ? focusable[0] : focusable[focusable.length - 1];
        const next = (at + dir + focusable.length) % focusable.length;
        return focusable[next];
      });
    },
    [focusable],
  );

  const onKeyDown = (e: ReactKeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
      case 'ArrowDown':
        e.preventDefault();
        move(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        move(-1);
        break;
      case 'Home':
        e.preventDefault();
        if (focusable.length) setActive(focusable[0]);
        break;
      case 'End':
        e.preventDefault();
        if (focusable.length) setActive(focusable[focusable.length - 1]);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (active >= 0 && items[active]) pick(items[active]);
        break;
      case 'Tab':
        e.preventDefault();
        move(e.shiftKey ? -1 : 1);
        break;
    }
  };

  return createPortal(
    // Wrap in `simui-root` so the scoped CSS applies even though we portal to
    // <body> (outside the app's React tree) — matching Sheet.tsx's pattern.
    <div
      ref={menuRef}
      className="simui-overlay simui-ctxmenu"
      role="menu"
      tabIndex={-1}
      aria-orientation="vertical"
      style={{ left: pos.x, top: pos.y }}
      onKeyDown={onKeyDown}
      onContextMenu={(e) => e.preventDefault()}
    >
      {header && (
        <div className="simui-ctxhead" onKeyDown={(e) => e.stopPropagation()}>
          {header}
        </div>
      )}
      {header && items.length > 0 && <div className="simui-ctxsep" role="separator" />}
      {items.map((item, i) => (
        <div key={i} role="presentation" className="simui-ctxgroup">
          {item.separator && i > 0 && <div className="simui-ctxsep" role="separator" />}
          <button
            type="button"
            role="menuitem"
            className={[
              'simui-ctxitem',
              item.danger ? 'danger' : '',
              active === i ? 'is-active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            tabIndex={-1}
            disabled={item.disabled}
            aria-disabled={item.disabled || undefined}
            onMouseEnter={() => !item.disabled && setActive(i)}
            onClick={() => pick(item)}
          >
            {item.icon != null && <span className="simui-ctxic">{item.icon}</span>}
            <span className="simui-ctxlabel">{item.label}</span>
          </button>
        </div>
      ))}
    </div>,
    overlayRoot ?? document.body,
  );
}

/** Open state for the menu: pointer position + whether it's showing. */
interface MenuState {
  open: boolean;
  x: number;
  y: number;
}

const CLOSED: MenuState = { open: false, x: 0, y: 0 };

/** Long-press threshold (ms) before a touch summons the menu. */
const LONG_PRESS_MS = 480;
/** Movement (px) that cancels a pending long-press (it's a scroll/drag, not a hold). */
const MOVE_TOLERANCE = 10;

export interface ContextMenuTriggerProps {
  onContextMenu: (e: ReactMouseEvent) => void;
  onTouchStart: (e: ReactTouchEvent) => void;
  onTouchMove: (e: ReactTouchEvent) => void;
  onTouchEnd: (e: ReactTouchEvent) => void;
  onTouchCancel: (e: ReactTouchEvent) => void;
}

export interface UseContextMenu {
  /** Whether the menu is currently open. */
  open: boolean;
  /** Spread onto the element that should trigger the menu (tile / row). */
  menuProps: ContextMenuTriggerProps;
  /** Convenience aliases (per the unit contract). */
  onContextMenu: (e: ReactMouseEvent) => void;
  onTouchStart: (e: ReactTouchEvent) => void;
  /** Pass to <ContextMenu> when `open`; `null` while closed. */
  position: { x: number; y: number } | null;
  /** Imperatively summon the menu at a point (e.g. a "…" button). */
  openAt: (x: number, y: number) => void;
  /** Close the menu — pass as <ContextMenu onClose>. */
  close: () => void;
}

/**
 * Triggers for a context menu. Spread `menuProps` onto a tile/row; when `open`,
 * render `<ContextMenu items={…} {...position!} onClose={close} />`. Right-click
 * opens instantly at the cursor; touch opens after a long-press (cancelled by a
 * scroll/drag). The caller owns the items so each surface offers relevant actions.
 */
export function useContextMenu(): UseContextMenu {
  const [state, setState] = useState<MenuState>(CLOSED);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);

  const clearTimer = useCallback(() => {
    if (timer.current != null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    start.current = null;
  }, []);

  const close = useCallback(() => setState(CLOSED), []);
  const openAt = useCallback((x: number, y: number) => setState({ open: true, x, y }), []);

  const onContextMenu = useCallback(
    (e: ReactMouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      openAt(e.clientX, e.clientY);
    },
    [openAt],
  );

  const onTouchStart = useCallback(
    (e: ReactTouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      start.current = { x: t.clientX, y: t.clientY };
      clearTimer();
      timer.current = setTimeout(() => {
        timer.current = null;
        if (start.current) openAt(start.current.x, start.current.y);
      }, LONG_PRESS_MS);
    },
    [clearTimer, openAt],
  );

  const onTouchMove = useCallback(
    (e: ReactTouchEvent) => {
      const t = e.touches[0];
      if (!t || !start.current) return;
      const dx = Math.abs(t.clientX - start.current.x);
      const dy = Math.abs(t.clientY - start.current.y);
      if (dx > MOVE_TOLERANCE || dy > MOVE_TOLERANCE) clearTimer();
    },
    [clearTimer],
  );

  // Clean up a pending timer if the host unmounts mid-press.
  useEffect(() => clearTimer, [clearTimer]);

  const menuProps: ContextMenuTriggerProps = {
    onContextMenu,
    onTouchStart,
    onTouchMove,
    onTouchEnd: clearTimer,
    onTouchCancel: clearTimer,
  };

  return {
    open: state.open,
    menuProps,
    onContextMenu,
    onTouchStart,
    position: state.open ? { x: state.x, y: state.y } : null,
    openAt,
    close,
  };
}
