import { useMemo } from 'react';
import {
  AlarmCheck,
  AlertTriangle,
  Blinds,
  CheckCircle2,
  DoorClosed,
  DoorOpen,
  Droplets,
  Flame,
  Lock,
  LockOpen,
  ShieldCheck,
  Wind,
  type LucideIcon,
} from 'lucide-react';
import { useEntity, useAggregate } from '../hass/context';
import { StateLine } from './StateLine';
import { useContextMenu, ContextMenu, type ContextMenuItem } from './ContextMenu';
import { QuickControls, isControllable } from './QuickControls';
import { useActions } from '../dashboard/useActions';
import type { HassEntities, HassEntity } from '../types';
import { domainOf, friendly, prettyState } from '../util';

/**
 * Security status-board tile (DESIGN_DIRECTIONS I5, Phase 2). A presence-first
 * squircle (~96px): a 22px glyph, a 17px status WORD ("Locked"/"Closed"/"Clear"),
 * and a dimmed recency line. State drives the tint: secure = calm/monochrome,
 * open/unlocked/tripped = amber→red glass + a soft halo. One surgical `useEntity`.
 *
 * Promotes the old micro-rows to a scannable board you can read across a room.
 * Right-click / long-press opens the shared QuickControls (lock/alarm/cover).
 */

type Tone = 'secure' | 'warn' | 'alert' | 'idle';

interface Status {
  /** The single status word. */
  word: string;
  tone: Tone;
  icon: LucideIcon;
  /** True when this entity needs attention (drives the Attention strip). */
  attention: boolean;
}

// ── Per-domain security semantics ─────────────────────────────────────────────
// Returns the status word, tone, glyph, and whether it's "tripped/unsecured".

const DOOR_CLASSES = new Set(['door', 'garage_door', 'window', 'opening']);
const HAZARD_CLASSES = new Set(['smoke', 'gas', 'carbon_monoxide']);
const LEAK_CLASSES = new Set(['moisture']);

export function securityStatus(e: HassEntity): Status {
  const domain = domainOf(e.entity_id);
  const dc = e.attributes.device_class as string | undefined;

  if (domain === 'lock') {
    const locked = e.state === 'locked';
    const busy = e.state === 'locking' || e.state === 'unlocking';
    return {
      word: busy ? prettyState(e.state) : locked ? 'Locked' : 'Unlocked',
      tone: locked ? 'secure' : 'warn',
      icon: locked ? Lock : LockOpen,
      attention: !locked && !busy,
    };
  }

  if (domain === 'cover') {
    const closed = e.state === 'closed';
    return {
      word: closed ? 'Closed' : prettyState(e.state),
      tone: closed ? 'secure' : 'warn',
      icon: Blinds,
      attention: !closed && e.state !== 'unavailable',
    };
  }

  if (domain === 'alarm_control_panel') {
    const triggered = e.state === 'triggered';
    const armed = e.state.startsWith('armed');
    return {
      word: triggered ? 'Triggered' : prettyState(e.state),
      tone: triggered ? 'alert' : armed ? 'secure' : 'idle',
      icon: triggered ? AlertTriangle : armed ? ShieldCheck : AlarmCheck,
      attention: triggered,
    };
  }

  // binary_sensor — semantics depend on device_class.
  const tripped = e.state === 'on';
  if (dc && HAZARD_CLASSES.has(dc)) {
    return {
      word: tripped ? 'Detected' : 'Clear',
      tone: tripped ? 'alert' : 'secure',
      icon: Flame,
      attention: tripped,
    };
  }
  if (dc && LEAK_CLASSES.has(dc)) {
    return {
      word: tripped ? 'Leak' : 'Dry',
      tone: tripped ? 'alert' : 'secure',
      icon: Droplets,
      attention: tripped,
    };
  }
  if (dc && DOOR_CLASSES.has(dc)) {
    return {
      word: tripped ? 'Open' : 'Closed',
      tone: tripped ? 'warn' : 'secure',
      icon: tripped ? DoorOpen : DoorClosed,
      attention: tripped,
    };
  }
  if (dc === 'motion' || dc === 'occupancy' || dc === 'presence') {
    return {
      word: tripped ? 'Motion' : 'Clear',
      tone: tripped ? 'warn' : 'idle',
      icon: Wind,
      attention: false, // motion is informational, not an alert
    };
  }
  // Generic binary sensor.
  return {
    word: tripped ? 'On' : 'Clear',
    tone: tripped ? 'warn' : 'secure',
    icon: tripped ? AlertTriangle : CheckCircle2,
    attention: false,
  };
}

export interface StatusBoardTileProps {
  entity: string;
  name?: string;
  /** Extra right-click / long-press items appended after the defaults. */
  menuItems?: ContextMenuItem[];
}

export function StatusBoardTile({ entity, name, menuItems }: StatusBoardTileProps) {
  const e = useEntity(entity);
  const menu = useContextMenu();
  const run = useActions();
  if (!e) return null;

  const st = securityStatus(e);
  const label = name ?? friendly(e);
  const Icon = st.icon;

  const items: ContextMenuItem[] = [
    { label: 'Details', onClick: () => run({ action: 'more-info' }, entity) },
    ...(menuItems ?? []),
  ];

  return (
    <>
      <div
        className={`simui-statusboard tone-${st.tone}${st.attention ? ' is-attn' : ''}`}
        role="group"
        aria-label={`${label}: ${st.word}`}
        {...menu.menuProps}
      >
        <span className="simui-statusboard-ic" aria-hidden="true">
          <Icon size={22} strokeWidth={2} />
        </span>
        <span className="simui-statusboard-word">{st.word}</span>
        <span className="simui-statusboard-name" title={label}>{label}</span>
        <StateLine value="" since={e.last_changed} tone={st.tone === 'alert' || st.tone === 'warn' ? 'warn' : 'muted'} />
      </div>
      {menu.open && menu.position && (
        <ContextMenu
          items={items}
          x={menu.position.x}
          y={menu.position.y}
          onClose={menu.close}
          header={isControllable(entity) ? <QuickControls entityId={entity} compact /> : undefined}
        />
      )}
    </>
  );
}

// ── Attention escalation (DESIGN_DIRECTIONS I5 + FRAMEWORK §3) ─────────────────
// "Calm by default, loud exactly when it matters." Surfaces ONLY the tripped /
// unsecured members of a set; collapses to one quiet "All N clear" line otherwise.

export interface AttentionStripProps {
  /** The full set of security entity ids to watch. */
  entities: string[];
  /** Optional label for the all-clear line ("All N clear" by default). */
  clearLabel?: (total: number) => string;
}

/**
 * A single aggregate over the watched set (never N subscriptions): re-renders only
 * when the *set of attention ids* changes (the snapshot is a joined string). When
 * none need attention it renders one calm "All N clear" line; when some do it
 * mounts a compact run of {@link StatusBoardTile}s — it *appears*, not animates
 * (minimal motion, FRAMEWORK §3).
 */
export function AttentionStrip({ entities, clearLabel }: AttentionStripProps) {
  // Aggregate to a primitive key so the component only re-renders on real change.
  const key = useAggregate((states) => attentionIds(states, entities).join(','));
  const attn = useMemo(() => (key ? key.split(',') : []), [key]);
  const total = entities.length;

  if (attn.length === 0) {
    const text = clearLabel ? clearLabel(total) : `All ${total} clear`;
    return (
      <div className="simui-attn is-clear">
        <span className="simui-attn-ic"><ShieldCheck size={15} strokeWidth={2} /></span>
        <span className="simui-attn-clear">{text}</span>
      </div>
    );
  }

  return (
    <div className="simui-attn is-active" role="alert">
      <div className="simui-attn-head">
        <span className="simui-attn-ic warn"><AlertTriangle size={15} strokeWidth={2} /></span>
        <span className="simui-attn-title">
          {attn.length === 1 ? '1 needs attention' : `${attn.length} need attention`}
        </span>
      </div>
      <div className="simui-attn-tiles">
        {attn.map((id) => (
          <StatusBoardTile key={id} entity={id} />
        ))}
      </div>
    </div>
  );
}

/** The subset of `entities` whose live state needs attention (pure over states). */
export function attentionIds(states: HassEntities, entities: string[]): string[] {
  const out: string[] = [];
  for (const id of entities) {
    const e = states[id];
    if (!e || e.state === 'unavailable' || e.state === 'unknown') continue;
    if (securityStatus(e).attention) out.push(id);
  }
  return out;
}
