import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import type { ColorToken } from '../widgets/tileContract';
import type { ContextMenuTriggerProps } from './ContextMenu';

/** Resolve a state/categorical ColorToken to its theme CSS variable (FRAMEWORK.md §7). */
export function tokenVar(token: ColorToken | undefined): string | undefined {
  switch (token) {
    case 'warm': return 'var(--warm)';
    case 'accent':
    case 'primary': return 'var(--accent)';
    case 'cool': return 'var(--cool)';
    case 'warn': return 'var(--warn)';
    case 'up':
    case 'green': return 'var(--up)';
    case 'down': return 'var(--down)';
    case 'violet': return 'var(--violet)';
    case 'cyan': return 'var(--cyan)';
    case 'pink': return 'var(--pink)';
    case 'teal': return 'var(--teal)';
    case 'slate': return 'var(--slate)';
    case 'none':
    default: return undefined;
  }
}

interface TileProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  /** Mini-tile (icon-over-label) layout — used by the category launcher (FRAMEWORK.md §1). */
  orientation?: 'horizontal' | 'vertical';
  /** State/categorical accent tint; applies the active surface when `active` (Apple-Home tint). */
  color?: ColorToken;
  /** Right-click / long-press triggers spread from `useContextMenu()` (DESIGN_PRINCIPLES §14). */
  menuProps?: ContextMenuTriggerProps;
}

/**
 * The universal leaf wrapper (FRAMEWORK.md §1). Presentational and dead-simple by
 * default (children/active/onClick) — the per-domain `widgets/*Tile.tsx` and the
 * new `EntityTile` render their content inside it. Flexes into the launcher/mini
 * role via `orientation`, takes a state-accent `color`, and forwards context-menu
 * triggers. Placement never lives here (that's the block).
 */
export function Tile({
  children,
  active,
  onClick,
  className = '',
  style,
  orientation = 'horizontal',
  color,
  menuProps,
}: TileProps) {
  const handleKey = onClick
    ? (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }
    : undefined;

  const accent = tokenVar(color);
  const mergedStyle = accent ? ({ ...style, '--tile-accent': accent } as CSSProperties) : style;

  return (
    <div
      className={[
        'simui-tile',
        orientation === 'vertical' ? 'is-vertical' : '',
        active ? 'is-active' : '',
        accent && active ? 'is-tinted' : '',
        onClick ? 'is-clickable' : '',
        className,
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      onKeyDown={handleKey}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={mergedStyle}
      {...menuProps}
    >
      {children}
    </div>
  );
}
