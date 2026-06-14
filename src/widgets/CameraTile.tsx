import { useEffect, useState } from 'react';
import { VideoOff } from 'lucide-react';
import { Tile } from '../components/Tile';
import type { WidgetProps } from '../types';
import { friendly, prettyState } from '../util';

const REFRESH_MS = 10_000;

/**
 * A live still from a camera entity. HA exposes a signed proxy URL on
 * `entity_picture` (the same authenticated snapshot endpoint MediaPlayerTile uses
 * for album art) — we cache-bust it on an interval so the still stays fresh
 * without pulling a full stream. A dead camera dims via `.is-unavailable` and
 * shows a clean placeholder (never a broken/stale frame).
 */
export function CameraTile({ entity }: WidgetProps) {
  const dead = entity.state === 'unavailable' || entity.state === 'unknown';
  const base = entity.attributes.entity_picture as string | undefined;
  const [tick, setTick] = useState(() => Date.now());

  useEffect(() => {
    if (dead || !base) return;
    const id = window.setInterval(() => setTick(Date.now()), REFRESH_MS);
    return () => window.clearInterval(id);
  }, [dead, base]);

  // Append a cache-busting param; preserve any existing query string the proxy
  // URL carries (it is usually a signed `?token=…` URL).
  const src = base ? `${base}${base.includes('?') ? '&' : '?'}_=${tick}` : undefined;
  const name = friendly(entity);

  return (
    <Tile className={`simui-camera${dead ? ' is-unavailable' : ''}`}>
      <div className="simui-cam-frame">
        {src && !dead ? (
          <img className="simui-cam-img" src={src} alt={name} loading="lazy" />
        ) : (
          <div className="simui-cam-empty" aria-hidden="true">
            <VideoOff size={20} strokeWidth={1.75} />
          </div>
        )}
        <div className="simui-cam-cap">
          <span className="simui-cam-name" title={name}>{name}</span>
          {dead && <span className="simui-cam-state">{prettyState(entity.state)}</span>}
        </div>
      </div>
    </Tile>
  );
}
