import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { useEntity } from '../hass/context';
import type { ColorToken } from '../widgets/tileContract';
import { friendly, prettyState } from '../util';

/**
 * StatusStrip — the top chrome (FRAMEWORK.md §6). A horizontal flex of pills above
 * the body; navigation and ambient status live here, never in the tile grid
 * (DESIGN_PRINCIPLES.md §14, "no in-app sidebar"). Every member is small and
 * presentational; counts/state come from surgical subscriptions in the caller
 * (`useAggregate`) or, for the entity-bound members, a single `useEntity` here.
 *
 * Color obeys the two reserved roles (FRAMEWORK.md §7): a **state accent** that
 * tints only when the entity is on/active (idle = monochrome), and a fixed
 * **categorical accent** for nav. Both resolve to theme tokens via `tokenVar`.
 */

/** Resolve a ColorToken to its CSS custom property (FRAMEWORK.md §7). */
function tokenVar(token: ColorToken | undefined): string {
  switch (token) {
    case 'warm':
      return 'var(--warm)';
    case 'accent':
    case 'primary':
      return 'var(--accent)';
    case 'cool':
      return 'var(--cool)';
    case 'warn':
      return 'var(--warn)';
    case 'up':
    case 'green':
      return 'var(--up)';
    case 'down':
      return 'var(--down)';
    case 'violet':
      return 'var(--violet)';
    case 'cyan':
      return 'var(--cyan)';
    case 'pink':
      return 'var(--pink)';
    case 'teal':
      return 'var(--teal)';
    case 'slate':
      return 'var(--slate)';
    default:
      return 'var(--muted)';
  }
}

function activate(handler?: () => void) {
  return handler
    ? (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handler();
        }
      }
    : undefined;
}

/** The strip itself — a horizontal, horizontally-scrollable flex container. */
export function StatusStrip({ children }: { children: ReactNode }) {
  return <div className="simui-strip">{children}</div>;
}

/**
 * CountPill — a number + icon whose icon and tint swap on at `count > 0`
 * (FRAMEWORK.md §6). The glance answer to "how many lights are on"; tap opens a
 * Sheet of the active entities. Feed `count` from a `useAggregate` in the caller
 * so the pill repaints only when the number changes.
 */
export function CountPill({
  label,
  count,
  iconOn,
  iconOff,
  activeColor = 'warm',
  onTap,
}: {
  label: string;
  count: number;
  iconOn: ReactNode;
  iconOff: ReactNode;
  activeColor?: ColorToken;
  onTap?: () => void;
}) {
  const active = count > 0;
  const style = active ? ({ '--pill-accent': tokenVar(activeColor) } as CSSProperties) : undefined;
  return (
    <button
      type="button"
      className={`simui-pill-count${active ? ' is-active' : ''}`}
      style={style}
      onClick={onTap}
      onKeyDown={activate(onTap)}
      aria-label={`${count} ${label}`}
      aria-pressed={active}
      disabled={!onTap}
    >
      <span className="simui-pill-ic">{active ? iconOn : iconOff}</span>
      <span className="simui-pill-num">{count}</span>
      <span className="simui-pill-label">{label}</span>
    </button>
  );
}

/**
 * NavPill — label + icon carrying a fixed **categorical** accent (FRAMEWORK.md
 * §6/§7); tap navigates to a category/room surface. The accent is identity, not
 * state, so it always shows — quietly, as a left-edge tint on the icon.
 */
export function NavPill({
  label,
  icon,
  accent = 'accent',
  onTap,
}: {
  label: string;
  icon: ReactNode;
  accent?: ColorToken;
  onTap?: () => void;
}) {
  const style = { '--pill-accent': tokenVar(accent) } as CSSProperties;
  return (
    <button
      type="button"
      className="simui-pill-nav"
      style={style}
      onClick={onTap}
      onKeyDown={activate(onTap)}
      aria-label={label}
      disabled={!onTap}
    >
      <span className="simui-pill-ic">{icon}</span>
      <span className="simui-pill-label">{label}</span>
    </button>
  );
}

/**
 * ActionPill — an icon-only trigger for a scene/macro (Movie, All-off, Open-all);
 * tap fires a service call (FRAMEWORK.md §6). The accent marks it as actionable
 * (FRAMEWORK.md §7: `primary`/`accent` really means "this is a button").
 */
export function ActionPill({
  icon,
  label,
  accent = 'accent',
  onTap,
}: {
  icon: ReactNode;
  label?: string;
  accent?: ColorToken;
  onTap?: () => void;
}) {
  const style = { '--pill-accent': tokenVar(accent) } as CSSProperties;
  return (
    <button
      type="button"
      className="simui-pill-action"
      style={style}
      onClick={onTap}
      onKeyDown={activate(onTap)}
      aria-label={label}
      title={label}
      disabled={!onTap}
    >
      <span className="simui-pill-ic">{icon}</span>
    </button>
  );
}

/**
 * ConditionalBadge — label + icon that renders only while `visible` is true
 * (FRAMEWORK.md §3/§6). "Hide noise until it's signal": a garage-open or
 * appliance-running flag. Per the minimal-motion rule it *appears, not animates* —
 * resolve `visible` from a `useAggregate`/`visibleWhen` check in the caller.
 */
export function ConditionalBadge({
  label,
  icon,
  accent = 'warn',
  visible,
}: {
  label: string;
  icon?: ReactNode;
  accent?: ColorToken;
  visible: boolean;
}) {
  if (!visible) return null;
  const style = { '--pill-accent': tokenVar(accent) } as CSSProperties;
  return (
    <span className="simui-pill-badge" style={style}>
      {icon && <span className="simui-pill-ic">{icon}</span>}
      <span className="simui-pill-label">{label}</span>
    </span>
  );
}

/**
 * StatusTile — a richer strip member for an appliance: a primary value with an
 * optional multiline secondary, the icon tinted **only when on** else monochrome
 * (FRAMEWORK.md §6/§7). Binds to one entity (`useEntity`) so it repaints only when
 * that entity changes. `primary`/`secondary` override the derived state/name.
 */
export function StatusTile({
  entity,
  primary,
  secondary,
  icon,
  activeColor = 'accent',
  onTap,
}: {
  entity: string;
  primary?: ReactNode;
  secondary?: ReactNode;
  icon?: ReactNode;
  activeColor?: ColorToken;
  onTap?: () => void;
}) {
  const e = useEntity(entity);
  const on = !!e && e.state !== 'off' && e.state !== 'unavailable' && e.state !== 'unknown' && e.state !== '';
  const style = on ? ({ '--pill-accent': tokenVar(activeColor) } as CSSProperties) : undefined;
  const primaryText = primary ?? (e ? prettyState(e.state) : '—');
  const secondaryText = secondary ?? (e ? friendly(e) : entity);
  const className = `simui-pill-status${on ? ' is-active' : ''}${onTap ? ' is-clickable' : ''}`;
  const inner = (
    <>
      {icon && <span className={`simui-pill-ic${on ? ' is-on' : ''}`}>{icon}</span>}
      <span className="simui-pill-status-body">
        <span className="simui-pill-status-primary">{primaryText}</span>
        {secondaryText != null && secondaryText !== '' && (
          <span className="simui-pill-status-secondary">{secondaryText}</span>
        )}
      </span>
    </>
  );
  if (onTap) {
    return (
      <button type="button" className={className} style={style} onClick={onTap} onKeyDown={activate(onTap)}>
        {inner}
      </button>
    );
  }
  return (
    <div className={className} style={style}>
      {inner}
    </div>
  );
}

/**
 * SelectControl — surfaces an `input_select`/`select` entity inline in the strip
 * (FRAMEWORK.md §6). Glance-only here: the current option plus a chevron; `onTap`
 * opens the option picker (a Sheet on phone, popover on desktop) — the strip never
 * holds a live dropdown. Binds to one entity via `useEntity`.
 */
export function SelectControl({
  entity,
  name,
  onTap,
}: {
  entity: string;
  name?: string;
  onTap?: () => void;
}) {
  const e = useEntity(entity);
  const label = name ?? (e ? friendly(e) : entity);
  const value = e && e.state !== 'unavailable' && e.state !== 'unknown' ? prettyState(e.state) : '—';
  return (
    <button
      type="button"
      className="simui-pill-select"
      onClick={onTap}
      onKeyDown={activate(onTap)}
      aria-label={`${label}: ${value}`}
      disabled={!onTap}
    >
      <span className="simui-pill-select-name">{label}</span>
      <span className="simui-pill-select-value">{value}</span>
      <span className="simui-pill-select-caret"><ChevronDown size={13} strokeWidth={2} /></span>
    </button>
  );
}
