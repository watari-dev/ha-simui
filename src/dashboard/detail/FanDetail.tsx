import { Power } from 'lucide-react';
import { useCallService } from '../../hass/context';
import { TileFeatures } from '../../components/TileFeatures';
import type { HassEntity } from '../../types';
import type { TileFeature } from '../../widgets/tileContract';
import { prettyState, supportsFeature } from '../../util';
import { AttrList } from './AttrList';
import { DetailHeader } from './DetailHeader';

/**
 * Fan "more-info": a speed-% / state masthead, an on/off toggle, then the shared
 * `TileFeatures` fan strip (speed slider + oscillate) — reused, not re-implemented,
 * so the sheet matches the FanTile control vocab at sheet density. Composed only
 * from existing primitives, mirroring the other per-domain detail bodies.
 *
 * Integrator (SPEC_DETAIL §7.1): replace the trailing `<AttrList>` with
 * `<DetailDepth entity omit={FAN_OWNED} historySpec={{ attr: 'percentage' }} />`
 * so the fan gains the universal depth panes (history of speed %, logbook, device,
 * related) once `DetailDepth` lands. Until then this renders the controls + table.
 */

// FanEntityFeature bits.
const FEAT = { SET_SPEED: 1, OSCILLATE: 2, PRESET_MODE: 8 };

export const FAN_OWNED = ['percentage', 'percentage_step', 'oscillating', 'preset_modes', 'preset_mode'];

export function FanDetail({ entity }: { entity: HassEntity }) {
  const callService = useCallService();
  const id = entity.entity_id;
  const on = entity.state === 'on';
  const busy = entity.state === 'unavailable' || entity.state === 'unknown';
  const a = entity.attributes;
  const pct = on ? ((a.percentage as number | undefined) ?? 100) : 0;

  const presets = (a.preset_modes as string[] | undefined) ?? [];
  const curPreset = a.preset_mode as string | undefined;

  const features: TileFeature[] = [];
  if (supportsFeature(entity, FEAT.SET_SPEED)) features.push({ type: 'fan-speed' });
  if (supportsFeature(entity, FEAT.OSCILLATE)) features.push({ type: 'fan-oscillate' });

  const toggle = () =>
    void callService('fan', on ? 'turn_off' : 'turn_on', {}, { entity_id: id });

  return (
    <div className="simui-detail">
      <DetailHeader
        value={on ? pct : prettyState(entity.state)}
        unit={on ? '%' : undefined}
        sub={on ? prettyState(entity.state) : undefined}
        tone={on ? 'cool' : undefined}
        since={entity.last_changed}
      />

      <div className="simui-detail-buttons wide">
        <button
          className={`simui-segbtn lg${on ? ' is-active' : ''}`}
          aria-pressed={on}
          disabled={busy}
          onClick={toggle}
        >
          <Power size={15} strokeWidth={2} /> {on ? 'On' : 'Off'}
        </button>
      </div>

      {features.length > 0 && (
        <div className="simui-detail-field">
          <span className="simui-qc-label">Speed</span>
          <TileFeatures entity={entity} features={features} />
        </div>
      )}

      {presets.length > 0 && (
        <div className="simui-detail-field">
          <span className="simui-qc-label">Preset</span>
          <div className="simui-seg simui-detail-seg" role="group" aria-label="Fan preset">
            {presets.map((p) => {
              const active = curPreset === p;
              return (
                <button
                  key={p}
                  className={`simui-segbtn${active ? ' is-active' : ''}`}
                  aria-pressed={active}
                  onClick={() => void callService('fan', 'set_preset_mode', { preset_mode: p }, { entity_id: id })}
                >
                  {prettyState(p)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <AttrList entity={entity} omit={FAN_OWNED} />
    </div>
  );
}
