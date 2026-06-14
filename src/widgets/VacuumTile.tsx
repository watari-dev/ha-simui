import { Home, Play, Square } from 'lucide-react';
import { Tile } from '../components/Tile';
import { StateLine } from '../components/StateLine';
import { useCallService } from '../hass/context';
import type { WidgetProps } from '../types';
import { friendly, prettyState, supportsFeature } from '../util';

// VacuumEntityFeature
const FEAT = { PAUSE: 4, STOP: 8, RETURN_HOME: 16, START: 8192 };

const ACTIVE = new Set(['cleaning', 'returning']);

export function VacuumTile({ entity }: WidgetProps) {
  const callService = useCallService();
  const dead = entity.state === 'unavailable' || entity.state === 'unknown';
  const active = ACTIVE.has(entity.state);
  const name = friendly(entity);

  const call = (service: string) =>
    void callService('vacuum', service, {}, { entity_id: entity.entity_id });

  if (dead) {
    return (
      <Tile className="simui-vacuum is-unavailable">
        <div className="simui-row">
          <span className="simui-name" title={name}>{name}</span>
          <span className="simui-spacer" />
          <span className="simui-state">{prettyState(entity.state)}</span>
        </div>
      </Tile>
    );
  }

  return (
    <Tile className={`simui-vacuum${active ? ' is-on' : ''}`}>
      <div className="simui-row">
        <span className="simui-name" title={name}>{name}</span>
        <span className="simui-spacer" />
        <StateLine value={prettyState(entity.state)} since={entity.last_changed} tone={active ? 'on' : 'muted'} />
      </div>
      <div className="simui-controls">
        {supportsFeature(entity, FEAT.START) && (
          <button className="simui-sbtn" aria-label="Start" onClick={() => call('start')}>
            <Play size={13} strokeWidth={2} fill="currentColor" />
          </button>
        )}
        {supportsFeature(entity, FEAT.STOP) && (
          <button className="simui-sbtn" aria-label="Stop" onClick={() => call('stop')}>
            <Square size={12} strokeWidth={2} />
          </button>
        )}
        {supportsFeature(entity, FEAT.RETURN_HOME) && (
          <button className="simui-sbtn" aria-label="Return to base" onClick={() => call('return_to_base')}>
            <Home size={14} strokeWidth={2} />
          </button>
        )}
      </div>
    </Tile>
  );
}
