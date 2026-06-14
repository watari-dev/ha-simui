import { useRef, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { Blinds, Fan, Lightbulb, Volume2, VolumeX, type LucideIcon } from 'lucide-react';
import { useEntity, useCallService } from '../hass/context';
import { useContextMenu, ContextMenu, type ContextMenuItem } from './ContextMenu';
import { QuickControls, isControllable } from './QuickControls';
import { useDragValue } from './useDragValue';
import { useActions } from '../dashboard/useActions';
import { useTapHandler } from '../runtime/actions';
import type { HassEntity } from '../types';
import type { ActionMap } from '../editor/types';
import { domainOf, friendly } from '../util';

/**
 * The drag-to-set tile (DESIGN_DIRECTIONS signature move #2, Phase 2) — a premium
 * replacement for the 4px hairline slider. The tile's tinted fill IS the value:
 * a vertical fill rises with brightness / position / speed / volume. Drag anywhere
 * (vertical) to set; a clean tap toggles the entity; the icon toggles independently;
 * a tabular % floats top-right. Right-click / long-press opens the shared
 * QuickControls context menu.
 *
 * One surgical `useEntity`; the block owns placement. Works for:
 *  - light   → brightness (brightness_pct / turn_on|off)
 *  - cover   → position (set_cover_position / open|close)
 *  - fan     → speed % (set_percentage / turn_on|off)
 *  - media   → volume (volume_set / volume_mute)
 */

type SliderDomain = 'light' | 'cover' | 'fan' | 'media_player';

interface DomainSpec {
  /** Categorical fill tint (a CSS var). */
  tint: string;
  /** Read the live 0–100 value from the entity (null ⇒ not settable, render off). */
  read: (e: HassEntity) => number | null;
  /** Is the entity currently "on"/open/active? Drives tint + toggle target. */
  isOn: (e: HassEntity) => boolean;
  /** Glyph (on / off variants). */
  icon: (on: boolean) => LucideIcon;
  /** Commit a dragged value via a service call. */
  commit: (call: Call, e: HassEntity, v: number) => void;
  /** Toggle via the icon / a clean tap. */
  toggle: (call: Call, e: HassEntity, on: boolean) => void;
}

type Call = (domain: string, service: string, data?: Record<string, unknown>, target?: { entity_id?: string }) => void;

const COVER_SET_POSITION = 4;

const SPECS: Record<SliderDomain, DomainSpec> = {
  light: {
    tint: 'var(--warm)',
    read: (e) => {
      if (e.state !== 'on') return 0;
      const b = e.attributes.brightness as number | undefined;
      return b != null ? Math.max(1, Math.round((b / 255) * 100)) : 100;
    },
    isOn: (e) => e.state === 'on',
    icon: () => Lightbulb,
    commit: (call, e, v) => call('light', 'turn_on', { brightness_pct: v }, { entity_id: e.entity_id }),
    toggle: (call, e, on) => call('light', on ? 'turn_off' : 'turn_on', {}, { entity_id: e.entity_id }),
  },
  cover: {
    tint: 'var(--accent)',
    read: (e) => {
      const p = e.attributes.current_position as number | undefined;
      if (p != null) return p;
      return e.state === 'open' ? 100 : 0;
    },
    isOn: (e) => e.state === 'open' || (e.attributes.current_position as number | undefined ?? 0) > 0,
    icon: () => Blinds,
    commit: (call, e, v) => call('cover', 'set_cover_position', { position: v }, { entity_id: e.entity_id }),
    toggle: (call, e, on) => call('cover', on ? 'close_cover' : 'open_cover', undefined, { entity_id: e.entity_id }),
  },
  fan: {
    tint: 'var(--cool)',
    read: (e) => {
      if (e.state !== 'on') return 0;
      const p = e.attributes.percentage as number | undefined;
      return p != null ? p : 100;
    },
    isOn: (e) => e.state === 'on',
    icon: () => Fan,
    commit: (call, e, v) => call('fan', 'set_percentage', { percentage: v }, { entity_id: e.entity_id }),
    toggle: (call, e, on) => call('fan', on ? 'turn_off' : 'turn_on', {}, { entity_id: e.entity_id }),
  },
  media_player: {
    tint: 'var(--violet)',
    read: (e) => {
      const v = e.attributes.volume_level as number | undefined;
      return v != null ? Math.round(v * 100) : 0;
    },
    isOn: (e) => !(e.attributes.is_volume_muted as boolean | undefined) && e.state !== 'off',
    icon: (on) => (on ? Volume2 : VolumeX),
    commit: (call, e, v) =>
      call('media_player', 'volume_set', { volume_level: v / 100 }, { entity_id: e.entity_id }),
    toggle: (call, e, on) =>
      call('media_player', 'volume_mute', { is_volume_muted: on }, { entity_id: e.entity_id }),
  },
};

export interface SliderTileProps {
  entity: string;
  name?: string;
  /** Drag-step in % (default 1; covers/fans often read nicer at 5). */
  step?: number;
  /** Extra right-click / long-press items appended after the defaults. */
  menuItems?: ContextMenuItem[];
  /** Authored interaction overrides. An explicit `tap` replaces the body toggle. */
  actions?: ActionMap;
}

export function SliderTile({ entity, name, step = 1, menuItems, actions }: SliderTileProps) {
  const e = useEntity(entity);
  const rawCall = useCallService();
  const menu = useContextMenu();
  const run = useActions();
  // Adapt the typed CallService to the simple Call the specs expect.
  const call: Call = (d, s, data, target) => void rawCall(d, s, data, target);

  const domain = domainOf(entity) as SliderDomain;
  const spec = SPECS[domain];
  const unavailable = !!e && (e.state === 'unavailable' || e.state === 'unknown');

  // Settable? cover needs SET_POSITION; everything else is settable when it has a value.
  const sf = (e?.attributes.supported_features as number | undefined) ?? 0;
  const settable =
    !!spec && !unavailable && (domain !== 'cover' || (sf & COVER_SET_POSITION) === COVER_SET_POSITION);

  const on = !!e && !!spec && spec.isOn(e);
  const live = e && spec ? spec.read(e) ?? 0 : 0;

  const drag = useDragValue({
    value: live,
    axis: 'vertical',
    step,
    disabled: !settable || !e,
    onCommit: (v) => {
      if (e && spec) spec.commit(call, e, v);
    },
  });

  // Suppress the synthetic click that follows a drag (so a drag never toggles).
  const suppressClick = useRef(false);

  // Apple split-action grammar: the icon disc toggles in place (onIconClick); a
  // clean tap on the BODY opens the detail sheet; a drag sets the value. An authored
  // `tap` action overrides this default. The drag-suppress + unavailable guards gate
  // it via `onTileClick` below — neither a drag nor a dead entity fires it.
  const tap = useTapHandler(entity, actions, () => {
    run({ action: 'more-info' }, entity);
  });

  if (!e || !spec) return null;

  const label = name ?? friendly(e);
  const value = settable ? drag.value : on ? live : 0;
  const Icon = spec.icon(on);

  const onTileClick = () => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    if (unavailable) return;
    tap?.();
  };

  const onPointerUpCapture = () => {
    // If the gesture moved, swallow the click that the browser will synthesize.
    if (drag.moved()) suppressClick.current = true;
  };

  const onIconClick = (ev: MouseEvent) => {
    ev.stopPropagation();
    spec.toggle(call, e, on);
  };

  // Arrow-key operability for the role=slider tile. Nudges the value by `step`
  // (PageUp/Down by 10×) and commits via the same service path as a drag; the
  // optimistic local value re-syncs once HA echoes the change back.
  const nudge = (next: number) => {
    const v = Math.max(0, Math.min(100, Math.round(next)));
    spec.commit(call, e, v);
  };
  const onKeyDown = (ev: ReactKeyboardEvent) => {
    // Enter / Space activate the toggle on any available tile (a slider role is
    // still a click target here); the arrow/page/home/end nudges need a settable
    // value (e.g. a positionable cover).
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      if (!unavailable) spec.toggle(call, e, on);
      return;
    }
    if (!settable) return;
    const big = 10;
    switch (ev.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        ev.preventDefault();
        nudge(value + step);
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        ev.preventDefault();
        nudge(value - step);
        break;
      case 'PageUp':
        ev.preventDefault();
        nudge(value + big);
        break;
      case 'PageDown':
        ev.preventDefault();
        nudge(value - big);
        break;
      case 'Home':
        ev.preventDefault();
        nudge(0);
        break;
      case 'End':
        ev.preventDefault();
        nudge(100);
        break;
    }
  };

  // Height/width comes from the drag value; the tint is applied in CSS as a soft
  // vertical gradient (from --slider-tint) so it reads as a glow, not a flat block.
  const fill: CSSProperties = drag.fillStyle;

  const items: ContextMenuItem[] = [
    { label: on ? offLabel(domain) : onLabel(domain), onClick: () => spec.toggle(call, e, on) },
    { label: 'Details', onClick: () => run({ action: 'more-info' }, entity) },
    ...(menuItems ?? []),
  ];

  return (
    <>
      <div
        className={`simui-slidertile${on ? ' is-on' : ''}${drag.dragging ? ' is-dragging' : ''}${settable ? '' : ' is-static'}${unavailable ? ' is-unavailable' : ''}`}
        style={{ '--slider-tint': spec.tint } as CSSProperties}
        role="slider"
        aria-label={`${label} ${valueNoun(domain)}`}
        aria-orientation="vertical"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={`${value}%`}
        aria-disabled={settable ? undefined : true}
        tabIndex={0}
        onClick={onTileClick}
        onKeyDown={onKeyDown}
        onPointerUpCapture={onPointerUpCapture}
        {...(settable ? drag.handlers : {})}
        {...menu.menuProps}
      >
        <span className="simui-slidertile-fill" style={fill} aria-hidden="true" />
        <span className="simui-slidertile-body">
          <span className="simui-slidertile-head">
            <button
              type="button"
              className={`simui-slidertile-ic${on ? ' on' : ''}`}
              aria-label={on ? offLabel(domain) : onLabel(domain)}
              onClick={onIconClick}
              onPointerDown={(ev) => ev.stopPropagation()}
            >
              <Icon size={19} strokeWidth={2} {...(on ? { fill: 'currentColor', fillOpacity: 0.16 } : {})} />
            </button>
            <span className="simui-slidertile-pct num">{readout(domain, on, value)}</span>
          </span>
          <span className="simui-slidertile-name" title={label}>{label}</span>
        </span>
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

function valueNoun(domain: SliderDomain): string {
  switch (domain) {
    case 'light': return 'brightness';
    case 'cover': return 'position';
    case 'fan': return 'speed';
    case 'media_player': return 'volume';
  }
}

/** The top-right tabular readout. Off light/fan reads "Off"; cover/media show %. */
function readout(domain: SliderDomain, on: boolean, value: number): ReactNode {
  if ((domain === 'light' || domain === 'fan') && !on) return 'Off';
  if (domain === 'media_player' && !on) return 'Muted';
  return `${value}%`;
}

function onLabel(domain: SliderDomain): string {
  switch (domain) {
    case 'cover': return 'Open';
    case 'media_player': return 'Unmute';
    default: return 'Turn on';
  }
}
function offLabel(domain: SliderDomain): string {
  switch (domain) {
    case 'cover': return 'Close';
    case 'media_player': return 'Mute';
    default: return 'Turn off';
  }
}
