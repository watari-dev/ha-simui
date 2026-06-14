import type { ChangeEvent, CSSProperties, MouseEvent } from 'react';
import { Fan } from 'lucide-react';
import { Tile } from '../components/Tile';
import { useCallService } from '../hass/context';
import type { WidgetProps } from '../types';
import { friendly, prettyState, supportsFeature } from '../util';

// FanEntityFeature
const FEAT = { SET_SPEED: 1 };

export function FanTile({ entity }: WidgetProps) {
  const callService = useCallService();
  const dead = entity.state === 'unavailable' || entity.state === 'unknown';
  const on = entity.state === 'on';
  const pct = on ? ((entity.attributes.percentage as number | undefined) ?? 100) : 0;
  const canSetSpeed = !dead && supportsFeature(entity, FEAT.SET_SPEED);
  const name = friendly(entity);

  const toggle = () =>
    void callService('fan', on ? 'turn_off' : 'turn_on', {}, { entity_id: entity.entity_id });
  const setPct = (e: ChangeEvent<HTMLInputElement>) =>
    void callService('fan', 'set_percentage', { percentage: Number(e.target.value) }, { entity_id: entity.entity_id });

  const fill = on ? 'var(--cool)' : 'var(--faint)';
  const trackStyle: CSSProperties = {
    background: `linear-gradient(to right, ${fill} ${pct}%, var(--faint) ${pct}%)`,
  };

  if (dead) {
    return (
      <Tile className="simui-fan is-unavailable">
        <div className="simui-row">
          <span className="simui-ic"><Fan size={16} strokeWidth={2} /></span>
          <span className="simui-name" title={name}>{name}</span>
          <span className="simui-spacer" />
          <span className="simui-state">{prettyState(entity.state)}</span>
        </div>
      </Tile>
    );
  }

  return (
    <Tile onClick={toggle} className={`simui-fan${on ? ' is-on' : ''}`}>
      <div className="simui-row">
        <span className={`simui-ic${on ? ' cool' : ''}`}><Fan size={16} strokeWidth={2} /></span>
        <span className="simui-name" title={name}>{name}</span>
        <span className="simui-spacer" />
        <span className={`simui-pct${on ? ' on' : ''}`}>{on ? `${pct}%` : 'Off'}</span>
      </div>
      {canSetSpeed && (
        <input
          className="simui-slider"
          type="range"
          min={0}
          max={100}
          value={pct}
          aria-label={`${name} speed`}
          style={trackStyle}
          onClick={(e: MouseEvent) => e.stopPropagation()}
          onChange={setPct}
        />
      )}
    </Tile>
  );
}
