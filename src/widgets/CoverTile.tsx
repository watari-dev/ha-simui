import type { ChangeEvent, CSSProperties } from 'react';
import { ChevronDown, ChevronUp, Square } from 'lucide-react';
import { Tile } from '../components/Tile';
import { useCallService } from '../hass/context';
import type { WidgetProps } from '../types';
import { friendly, prettyState, supportsFeature } from '../util';

const FEAT = { OPEN: 1, CLOSE: 2, SET_POSITION: 4, STOP: 8 };

export function CoverTile({ entity }: WidgetProps) {
  const callService = useCallService();
  const dead = entity.state === 'unavailable' || entity.state === 'unknown';

  // Dead device — dim, no slider / transport buttons (it can't be moved).
  if (dead) {
    return (
      <Tile className="is-unavailable">
        <div className="simui-row">
          <span className="simui-name" title={friendly(entity)}>{friendly(entity)}</span>
          <span className="simui-spacer" />
          <span className="simui-value">Unavailable</span>
        </div>
      </Tile>
    );
  }

  const position = entity.attributes.current_position as number | undefined;
  const open = entity.state === 'open' || (position != null && position > 0);
  const canSet = supportsFeature(entity, FEAT.SET_POSITION) && position != null;

  const call = (service: string, data?: Record<string, unknown>) =>
    void callService('cover', service, data, { entity_id: entity.entity_id });

  const trackStyle: CSSProperties | undefined = canSet
    ? { background: `linear-gradient(to right, var(--accent) ${position}%, var(--faint) ${position}%)` }
    : undefined;

  return (
    <Tile className={open ? 'is-on' : ''}>
      <div className="simui-row">
        <span className="simui-name" title={friendly(entity)}>{friendly(entity)}</span>
        <span className="simui-spacer" />
        <span className="simui-value">{position != null ? `${position}%` : prettyState(entity.state)}</span>
      </div>
      {canSet ? (
        <input
          className="simui-slider"
          type="range"
          min={0}
          max={100}
          value={position}
          aria-label="Position"
          style={trackStyle}
          onChange={(e: ChangeEvent<HTMLInputElement>) => call('set_cover_position', { position: Number(e.target.value) })}
        />
      ) : (
        <div className="simui-controls">
          {supportsFeature(entity, FEAT.OPEN) && (
            <button className="simui-sbtn" aria-label="Open" onClick={() => call('open_cover')}><ChevronUp size={15} strokeWidth={2} /></button>
          )}
          {supportsFeature(entity, FEAT.STOP) && (
            <button className="simui-sbtn" aria-label="Stop" onClick={() => call('stop_cover')}><Square size={12} strokeWidth={2} /></button>
          )}
          {supportsFeature(entity, FEAT.CLOSE) && (
            <button className="simui-sbtn" aria-label="Close" onClick={() => call('close_cover')}><ChevronDown size={15} strokeWidth={2} /></button>
          )}
        </div>
      )}
    </Tile>
  );
}
