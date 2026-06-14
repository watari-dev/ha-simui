import type { ChangeEvent, CSSProperties } from 'react';
import { ChevronDown, ChevronUp, Square } from 'lucide-react';
import { useCallService } from '../../hass/context';
import type { HassEntity } from '../../types';
import { prettyState, supportsFeature } from '../../util';
import { AttrList } from './AttrList';
import { DetailHeader } from './DetailHeader';

/**
 * Cover "more-info": a position masthead, a position slider (when settable) with
 * open / stop / close buttons, plus a tilt slider and tilt buttons when the cover
 * reports tilt support. Mirrors the CoverTile control vocab but at sheet density.
 */

// Standard HA cover supported_features bits.
const FEAT = {
  OPEN: 1,
  CLOSE: 2,
  SET_POSITION: 4,
  STOP: 8,
  OPEN_TILT: 16,
  CLOSE_TILT: 32,
  STOP_TILT: 64,
  SET_TILT_POSITION: 128,
};

export function CoverDetail({ entity }: { entity: HassEntity }) {
  const callService = useCallService();
  const a = entity.attributes;
  const position = a.current_position as number | undefined;
  const tilt = a.current_tilt_position as number | undefined;
  const canSetPos = supportsFeature(entity, FEAT.SET_POSITION) && position != null;
  const canTilt =
    supportsFeature(entity, FEAT.SET_TILT_POSITION) ||
    supportsFeature(entity, FEAT.OPEN_TILT) ||
    supportsFeature(entity, FEAT.CLOSE_TILT);

  const call = (service: string, data?: Record<string, unknown>) =>
    void callService('cover', service, data, { entity_id: entity.entity_id });

  const posStyle: CSSProperties | undefined =
    position != null
      ? { background: `linear-gradient(to right, var(--accent) ${position}%, var(--faint) ${position}%)` }
      : undefined;
  const tiltStyle: CSSProperties | undefined =
    tilt != null
      ? { background: `linear-gradient(to right, var(--accent) ${tilt}%, var(--faint) ${tilt}%)` }
      : undefined;

  return (
    <div className="simui-detail">
      <DetailHeader
        value={position != null ? position : prettyState(entity.state)}
        unit={position != null ? '%' : undefined}
        sub={position != null ? prettyState(entity.state) : undefined}
        tone={entity.state === 'open' ? 'accent' : undefined}
        since={entity.last_changed}
      />

      {canSetPos && (
        <div className="simui-detail-field">
          <span className="simui-qc-label">Position</span>
          <input
            className="simui-slider"
            type="range"
            min={0}
            max={100}
            value={position}
            aria-label="Position"
            style={posStyle}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              call('set_cover_position', { position: Number(e.target.value) })
            }
          />
        </div>
      )}

      <div className="simui-detail-buttons">
        {supportsFeature(entity, FEAT.OPEN) && (
          <button className="simui-sbtn" aria-label="Open" onClick={() => call('open_cover')}>
            <ChevronUp size={16} strokeWidth={2} />
          </button>
        )}
        {supportsFeature(entity, FEAT.STOP) && (
          <button className="simui-sbtn" aria-label="Stop" onClick={() => call('stop_cover')}>
            <Square size={12} strokeWidth={2} />
          </button>
        )}
        {supportsFeature(entity, FEAT.CLOSE) && (
          <button className="simui-sbtn" aria-label="Close" onClick={() => call('close_cover')}>
            <ChevronDown size={16} strokeWidth={2} />
          </button>
        )}
      </div>

      {canTilt && (
        <div className="simui-detail-field">
          <span className="simui-qc-label">Tilt{tilt != null ? ` · ${tilt}%` : ''}</span>
          {supportsFeature(entity, FEAT.SET_TILT_POSITION) && tilt != null && (
            <input
              className="simui-slider"
              type="range"
              min={0}
              max={100}
              value={tilt}
              aria-label="Tilt"
              style={tiltStyle}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                call('set_cover_tilt_position', { tilt_position: Number(e.target.value) })
              }
            />
          )}
          <div className="simui-detail-buttons">
            {supportsFeature(entity, FEAT.OPEN_TILT) && (
              <button className="simui-sbtn" aria-label="Open tilt" onClick={() => call('open_cover_tilt')}>
                <ChevronUp size={16} strokeWidth={2} />
              </button>
            )}
            {supportsFeature(entity, FEAT.STOP_TILT) && (
              <button className="simui-sbtn" aria-label="Stop tilt" onClick={() => call('stop_cover_tilt')}>
                <Square size={12} strokeWidth={2} />
              </button>
            )}
            {supportsFeature(entity, FEAT.CLOSE_TILT) && (
              <button className="simui-sbtn" aria-label="Close tilt" onClick={() => call('close_cover_tilt')}>
                <ChevronDown size={16} strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
      )}

      <AttrList entity={entity} omit={['current_position', 'current_tilt_position']} />
    </div>
  );
}
