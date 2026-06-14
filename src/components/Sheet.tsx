import { useCallback, useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface SheetProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

const FOCUSABLE =
  'a[href],area[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * The native detail Sheet (DESIGN_PRINCIPLES §14: tap = bottom sheet on phone /
 * popover on desktop). A portal to <body>: a dim backdrop (click / Esc to close)
 * plus a panel that slides up from the bottom on narrow viewports and centres as
 * a popover on wide ones. Minimal fast motion (~140ms) — it appears, it doesn't
 * perform. Traps focus while open and restores it on close; role=dialog +
 * aria-modal. Dependency-free beyond React + lucide.
 */
export function Sheet({ open, title, onClose, children }: SheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const labelId = useId();

  // Esc to close + focus trap, scoped to the lifetime of an open sheet.
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const items = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (items.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    document.addEventListener('keydown', onKeyDown, true);
    // Move focus into the sheet (first focusable, else the panel itself).
    const panel = panelRef.current;
    const target = panel?.querySelector<HTMLElement>(FOCUSABLE) ?? panel;
    target?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      restoreRef.current?.focus?.();
    };
  }, [open, onKeyDown]);

  if (!open) return null;

  return createPortal(
    <div className="simui-root simui-sheet-backdrop" onClick={onClose}>
      <div
        ref={panelRef}
        className="simui-sheet"
        role="dialog"
        aria-modal="true"
        aria-label={title ? undefined : 'Details'}
        aria-labelledby={title ? labelId : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <header className="simui-sheet-head">
            <span id={labelId} className="simui-sheet-title">{title}</span>
            <button className="simui-iconbtn-h" onClick={onClose} aria-label="Close">
              <X size={16} />
            </button>
          </header>
        )}
        <div className="simui-sheet-body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
