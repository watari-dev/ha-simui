import { ShieldAlert, ShieldCheck, ShieldOff } from 'lucide-react';
import { Tile } from '../components/Tile';
import { StateLine } from '../components/StateLine';
import { TileFeatures } from '../components/TileFeatures';
import type { TileFeature } from './tileContract';
import type { WidgetProps } from '../types';
import { friendly, prettyState } from '../util';

// AlarmControlPanelEntityFeature → the arm services they map to.
const FEAT_MODE: { bit: number; mode: string }[] = [
  { bit: 1, mode: 'armed_home' },
  { bit: 2, mode: 'armed_away' },
  { bit: 4, mode: 'armed_night' },
  { bit: 8, mode: 'armed_custom_bypass' },
  { bit: 32, mode: 'armed_vacation' },
];

const TRIGGERED = 'triggered';
const PENDING = new Set(['arming', 'pending', 'disarming']);

/**
 * alarm_control_panel — arm/disarm via the shared `alarm-modes` control strip
 * (TileFeatures). The mode set is derived from `supported_features`, with
 * `disarmed` always offered. Icon + tint follow the security posture: armed =
 * accent, triggered = `down` (red), disarmed = neutral.
 */
export function AlarmTile({ entity }: WidgetProps) {
  const dead = entity.state === 'unavailable' || entity.state === 'unknown';
  const name = friendly(entity);

  if (dead) {
    return (
      <Tile className="is-unavailable">
        <div className="simui-row">
          <span className="simui-ic"><ShieldOff size={15} strokeWidth={2} /></span>
          <span className="simui-name" title={name}>{name}</span>
        </div>
        <StateLine value="Unavailable" tone="muted" />
      </Tile>
    );
  }

  const state = entity.state;
  const armed = state.startsWith('armed');
  const triggered = state === TRIGGERED;
  const pending = PENDING.has(state);

  const sf = (entity.attributes.supported_features as number | undefined) ?? 0;
  const modes = ['disarmed', ...FEAT_MODE.filter((m) => (sf & m.bit) === m.bit).map((m) => m.mode)];
  const features: TileFeature[] = modes.length > 1 ? [{ type: 'alarm-modes', modes }] : [];

  const Icon = triggered ? ShieldAlert : armed ? ShieldCheck : ShieldOff;
  const iconClass = triggered ? ' amber' : armed ? ' cool' : '';
  const tone = triggered ? 'warn' : armed ? 'on' : 'muted';
  const cls = triggered ? 'is-unlocked' : armed ? 'is-on' : '';

  return (
    <Tile className={cls}>
      <div className="simui-row">
        <span className={`simui-ic${iconClass}`}><Icon size={15} strokeWidth={2} /></span>
        <span className="simui-name" title={name}>{name}</span>
      </div>
      <StateLine
        value={pending ? prettyState(state) : armed ? prettyState(state).replace(/^Armed /, '') : triggered ? 'Triggered' : 'Disarmed'}
        since={entity.last_changed}
        tone={tone}
      />
      <TileFeatures entity={entity} features={features} />
    </Tile>
  );
}
