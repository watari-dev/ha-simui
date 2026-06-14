import type { ChangeEvent, CSSProperties, MouseEvent } from 'react';
import { Lightbulb } from 'lucide-react';
import { Tile } from '../components/Tile';
import { useCallService } from '../hass/context';
import { useTapHandler } from '../runtime';
import type { WidgetProps } from '../types';
import { friendly } from '../util';

export function LightTile({ entity, actions }: WidgetProps) {
  const callService = useCallService();
  const dead = entity.state === 'unavailable' || entity.state === 'unknown';
  const on = entity.state === 'on';
  const toggle = () => void callService('light', on ? 'turn_off' : 'turn_on', {}, { entity_id: entity.entity_id });
  const onTap = useTapHandler(entity.entity_id, actions, toggle);

  // Dead device — dim, no toggle, no slider (a dead light showing a live dimmer
  // reads as broken / controllable when it isn't).
  if (dead) {
    return (
      <Tile className="is-unavailable">
        <div className="simui-row">
          <span className="simui-ic"><Lightbulb size={16} strokeWidth={2} /></span>
          <span className="simui-name" title={friendly(entity)}>{friendly(entity)}</span>
          <span className="simui-spacer" />
          <span className="simui-pct">Unavailable</span>
        </div>
      </Tile>
    );
  }

  const brightness = (entity.attributes.brightness as number | undefined) ?? 0;
  const pct = on ? Math.max(1, Math.round((brightness / 255) * 100)) : 0;

  const setPct = (e: ChangeEvent<HTMLInputElement>) =>
    void callService('light', 'turn_on', { brightness_pct: Number(e.target.value) }, { entity_id: entity.entity_id });

  const fill = on ? 'var(--warm)' : 'var(--faint)';
  const trackStyle: CSSProperties = { background: `linear-gradient(to right, ${fill} ${pct}%, var(--faint) ${pct}%)` };

  return (
    <Tile onClick={onTap} className={on ? 'is-lit' : ''}>
      <div className="simui-row">
        <span className={`simui-ic${on ? ' warm' : ''}`}><Lightbulb size={16} strokeWidth={2} /></span>
        <span className="simui-name" title={friendly(entity)}>{friendly(entity)}</span>
        <span className="simui-spacer" />
        <span className={`simui-pct${on ? ' on' : ''}`}>{on ? `${pct}%` : 'Off'}</span>
      </div>
      <input
        className="simui-slider"
        type="range"
        min={0}
        max={100}
        value={pct}
        aria-label={`${friendly(entity)} brightness`}
        style={trackStyle}
        onClick={(e: MouseEvent) => e.stopPropagation()}
        onChange={setPct}
      />
    </Tile>
  );
}
