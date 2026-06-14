import { ShieldAlert, ShieldCheck, ShieldOff } from 'lucide-react';
import { useCallService } from '../../hass/context';
import { TileFeatures } from '../../components/TileFeatures';
import type { HassEntity } from '../../types';
import { prettyState } from '../../util';
import { AttrList } from './AttrList';
import { DetailHeader } from './DetailHeader';
import './AlarmDetail.css';

/**
 * Alarm-control-panel "more-info": a state masthead (armed / disarmed / triggered,
 * tone-tinted), a clear Disarm action, and the arm-mode buttons the panel actually
 * supports (home / away / night / vacation / custom) via the shared `TileFeatures`
 * `alarm-modes` strip — reused, not re-implemented. Composed only from existing
 * primitives, matching the other per-domain detail bodies.
 *
 * Integrator (SPEC_DETAIL §7.1): replace the trailing `<AttrList>` with
 * `<DetailDepth entity omit={ALARM_OWNED} />` so the panel gains the universal
 * depth panes (the arm/disarm logbook is the star here, plus device / related).
 */

// AlarmControlPanelEntityFeature bits.
const FEAT = {
  ARM_HOME: 1,
  ARM_AWAY: 2,
  ARM_NIGHT: 4,
  TRIGGER: 8,
  ARM_CUSTOM_BYPASS: 16,
  ARM_VACATION: 32,
};

export const ALARM_OWNED = ['code_format', 'code_arm_required', 'changed_by'];

// state → masthead tone (state colour only; §9).
function tone(state: string): 'accent' | 'warn' | undefined {
  if (state === 'triggered' || state === 'pending' || state === 'arming') return 'warn';
  if (state.startsWith('armed')) return 'accent';
  return undefined;
}

export function AlarmDetail({ entity }: { entity: HassEntity }) {
  const callService = useCallService();
  const id = entity.entity_id;
  const sf = (entity.attributes.supported_features as number | undefined) ?? 0;
  const disarmed = entity.state === 'disarmed';
  const changedBy = entity.attributes.changed_by as string | undefined;

  // Build the curated arm-mode list from what the panel actually supports — never
  // a wall of every capability (FRAMEWORK.md §1: a curated subset).
  const modes: string[] = [];
  if ((sf & FEAT.ARM_HOME) === FEAT.ARM_HOME) modes.push('armed_home');
  if ((sf & FEAT.ARM_AWAY) === FEAT.ARM_AWAY) modes.push('armed_away');
  if ((sf & FEAT.ARM_NIGHT) === FEAT.ARM_NIGHT) modes.push('armed_night');
  if ((sf & FEAT.ARM_VACATION) === FEAT.ARM_VACATION) modes.push('armed_vacation');
  if ((sf & FEAT.ARM_CUSTOM_BYPASS) === FEAT.ARM_CUSTOM_BYPASS) modes.push('armed_custom_bypass');
  // Fall back to the standard three if the panel reports no feature bits (mock/partial).
  if (modes.length === 0) modes.push('armed_home', 'armed_away', 'armed_night');

  const StateIcon = disarmed ? ShieldOff : tone(entity.state) === 'warn' ? ShieldAlert : ShieldCheck;

  const sub = changedBy ? `by ${changedBy}` : undefined;

  return (
    <div className="simui-detail">
      <DetailHeader
        value={
          <span className="simui-alarm-state">
            <StateIcon size={20} strokeWidth={2} />
            {prettyState(entity.state)}
          </span>
        }
        sub={sub}
        tone={tone(entity.state)}
        since={entity.last_changed}
      />

      <div className="simui-detail-buttons wide">
        <button
          className={`simui-segbtn lg${disarmed ? ' is-active' : ''}`}
          aria-pressed={disarmed}
          onClick={() => void callService('alarm_control_panel', 'alarm_disarm', undefined, { entity_id: id })}
        >
          <ShieldOff size={15} strokeWidth={2} /> Disarm
        </button>
      </div>

      <div className="simui-detail-field">
        <span className="simui-qc-label">Arm</span>
        <TileFeatures entity={entity} features={[{ type: 'alarm-modes', modes }]} />
      </div>

      <AttrList entity={entity} omit={ALARM_OWNED} />
    </div>
  );
}
