import { BloomStudio } from '../../components/BloomStudio';
import { useCallService } from '../../hass/context';
import type { HassEntity } from '../../types';
import { prettyState } from '../../util';
import { AttrList } from './AttrList';
import { DetailHeader } from './DetailHeader';

/**
 * Climate "more-info": a current-temp / humidity masthead, the full BloomStudio
 * (TempDial[s] + HVAC-mode pills — reused, not duplicated), then preset and fan
 * mode selectors when the thermostat reports them. The studio owns the setpoint
 * and hvac mode, so the fallback table omits those and the values above.
 */

const STUDIO_OWNED = [
  'temperature',
  'target_temp_low',
  'target_temp_high',
  'target_temp_step',
  'min_temp',
  'max_temp',
  'hvac_modes',
  'hvac_action',
  'current_temperature',
  'current_humidity',
];

function tone(entity: HassEntity): 'warm' | 'cool' | undefined {
  const action = entity.attributes.hvac_action as string | undefined;
  if (action === 'heating' || entity.state === 'heat') return 'warm';
  if (action === 'cooling' || action === 'fan' || entity.state === 'cool') return 'cool';
  return undefined;
}

export function ClimateDetail({ entity }: { entity: HassEntity }) {
  const callService = useCallService();
  const id = entity.entity_id;
  const a = entity.attributes;
  const current = a.current_temperature as number | undefined;
  const humidity = a.current_humidity as number | undefined;
  const action = a.hvac_action as string | undefined;

  const presets = (a.preset_modes as string[] | undefined) ?? [];
  const curPreset = a.preset_mode as string | undefined;
  const fanModes = (a.fan_modes as string[] | undefined) ?? [];
  const curFan = a.fan_mode as string | undefined;

  const sub = [
    action ? prettyState(action) : prettyState(entity.state),
    humidity != null ? `${Math.round(humidity)}% humidity` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className="simui-detail">
      <DetailHeader
        value={current != null ? Math.round(current) : '—'}
        unit="°"
        sub={sub || undefined}
        tone={tone(entity)}
        since={entity.last_changed}
      />

      <div className="simui-detail-widget">
        <BloomStudio entityId={id} />
      </div>

      {presets.length > 0 && (
        <div className="simui-detail-field">
          <span className="simui-qc-label">Preset</span>
          <div className="simui-seg simui-detail-seg" role="group" aria-label="Preset mode">
            {presets.map((p) => {
              const active = curPreset === p;
              return (
                <button
                  key={p}
                  className={`simui-segbtn${active ? ' is-active' : ''}`}
                  aria-pressed={active}
                  onClick={() => void callService('climate', 'set_preset_mode', { preset_mode: p }, { entity_id: id })}
                >
                  {prettyState(p)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {fanModes.length > 0 && (
        <div className="simui-detail-field">
          <span className="simui-qc-label">Fan</span>
          <div className="simui-seg simui-detail-seg" role="group" aria-label="Fan mode">
            {fanModes.map((f) => {
              const active = curFan === f;
              return (
                <button
                  key={f}
                  className={`simui-segbtn${active ? ' is-active' : ''}`}
                  aria-pressed={active}
                  onClick={() => void callService('climate', 'set_fan_mode', { fan_mode: f }, { entity_id: id })}
                >
                  {prettyState(f)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <AttrList entity={entity} omit={[...STUDIO_OWNED, 'preset_modes', 'preset_mode', 'fan_modes', 'fan_mode']} />
    </div>
  );
}
