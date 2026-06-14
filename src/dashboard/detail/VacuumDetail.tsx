import { Home, MapPin, Pause, Play, Square } from 'lucide-react';
import { useCallService } from '../../hass/context';
import type { HassEntity } from '../../types';
import { prettyState, supportsFeature } from '../../util';
import { AttrList } from './AttrList';
import { DetailHeader } from './DetailHeader';

/**
 * Vacuum "more-info": a status masthead with an optional battery readout, the
 * full command rack (start / pause / stop / return-to-base / locate), and a fan-
 * speed selector when the robot reports one. Mirrors the VacuumTile control vocab
 * at sheet density, composed only from existing button / select primitives.
 *
 * Integrator (SPEC_DETAIL §7.1): replace the trailing `<AttrList>` with
 * `<DetailDepth entity omit={VACUUM_OWNED} />` so the vacuum gains the universal
 * depth panes (logbook of cleaning runs, device, related) once `DetailDepth` lands.
 */

// VacuumEntityFeature bits.
const FEAT = {
  PAUSE: 4,
  STOP: 8,
  RETURN_HOME: 16,
  FAN_SPEED: 128,
  BATTERY: 64,
  LOCATE: 512,
  START: 8192,
};

const ACTIVE = new Set(['cleaning', 'returning']);

export const VACUUM_OWNED = ['battery_level', 'battery_icon', 'fan_speed', 'fan_speed_list'];

export function VacuumDetail({ entity }: { entity: HassEntity }) {
  const callService = useCallService();
  const id = entity.entity_id;
  const dead = entity.state === 'unavailable' || entity.state === 'unknown';
  const active = ACTIVE.has(entity.state);
  const a = entity.attributes;
  const battery = a.battery_level as number | undefined;

  const fanSpeed = a.fan_speed as string | undefined;
  const fanSpeedList = (a.fan_speed_list as string[] | undefined) ?? [];

  const call = (service: string, data?: Record<string, unknown>) =>
    void callService('vacuum', service, data, { entity_id: id });

  const sub = battery != null ? `${Math.round(battery)}% battery` : undefined;

  return (
    <div className="simui-detail">
      <DetailHeader
        value={prettyState(entity.state)}
        sub={sub}
        tone={active ? 'accent' : undefined}
        since={entity.last_changed}
      />

      {!dead && (
        <div className="simui-detail-buttons wide">
          {supportsFeature(entity, FEAT.START) && (
            <button
              className={`simui-segbtn${active ? ' is-active' : ''}`}
              aria-label="Start"
              onClick={() => call('start')}
            >
              <Play size={14} strokeWidth={2} fill="currentColor" /> Start
            </button>
          )}
          {supportsFeature(entity, FEAT.PAUSE) && (
            <button className="simui-segbtn" aria-label="Pause" onClick={() => call('pause')}>
              <Pause size={14} strokeWidth={2} /> Pause
            </button>
          )}
          {supportsFeature(entity, FEAT.STOP) && (
            <button className="simui-segbtn" aria-label="Stop" onClick={() => call('stop')}>
              <Square size={12} strokeWidth={2} /> Stop
            </button>
          )}
          {supportsFeature(entity, FEAT.RETURN_HOME) && (
            <button className="simui-segbtn" aria-label="Return to base" onClick={() => call('return_to_base')}>
              <Home size={14} strokeWidth={2} /> Dock
            </button>
          )}
          {supportsFeature(entity, FEAT.LOCATE) && (
            <button className="simui-segbtn" aria-label="Locate" onClick={() => call('locate')}>
              <MapPin size={14} strokeWidth={2} /> Locate
            </button>
          )}
        </div>
      )}

      {fanSpeedList.length > 0 && (
        <div className="simui-detail-field">
          <span className="simui-qc-label">Suction</span>
          <div className="simui-seg simui-detail-seg" role="group" aria-label="Fan speed">
            {fanSpeedList.map((s) => {
              const isActive = fanSpeed === s;
              return (
                <button
                  key={s}
                  className={`simui-segbtn${isActive ? ' is-active' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => call('set_fan_speed', { fan_speed: s })}
                >
                  {prettyState(s)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <AttrList entity={entity} omit={VACUUM_OWNED} />
    </div>
  );
}
