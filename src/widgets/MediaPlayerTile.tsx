import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { Tile } from '../components/Tile';
import { useCallService } from '../hass/context';
import type { WidgetProps } from '../types';
import { friendly, prettyState, supportsFeature } from '../util';

const FEAT = { PREV: 16, NEXT: 32 };

export function MediaPlayerTile({ entity }: WidgetProps) {
  const callService = useCallService();
  const a = entity.attributes;
  const st = entity.state;
  const playing = st === 'playing';
  const title = a.media_title as string | undefined;
  const artist = (a.media_artist ?? a.media_album_name ?? a.app_name) as string | undefined;
  const pic = a.entity_picture as string | undefined;
  const hasMedia = Boolean(title);

  const call = (service: string) => void callService('media_player', service, undefined, { entity_id: entity.entity_id });

  if (!hasMedia) {
    return (
      <Tile>
        <div className="simui-row">
          <span className="simui-name" title={friendly(entity)}>{friendly(entity)}</span>
          <span className="simui-spacer" />
          <span className="simui-state">{prettyState(st)}</span>
        </div>
        <div className="simui-tp" style={{ marginLeft: 0 }}>
          <button className="play" aria-label="Play" onClick={() => call('media_play_pause')}><Play size={15} fill="currentColor" /></button>
        </div>
      </Tile>
    );
  }

  return (
    <Tile>
      <div className="simui-np">
        {pic ? <img className="simui-art" src={pic} alt="" /> : <div className="simui-art" />}
        <div className="simui-np-body">
          <span className="simui-title" title={title}>{title}</span>
          {artist && <span className="simui-artist" title={artist}>{artist}</span>}
        </div>
        <div className="simui-tp">
          {supportsFeature(entity, FEAT.PREV) && (
            <button aria-label="Previous" onClick={() => call('media_previous_track')}><SkipBack size={18} fill="currentColor" /></button>
          )}
          <button className="play" aria-label={playing ? 'Pause' : 'Play'} onClick={() => call('media_play_pause')}>
            {playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
          </button>
          {supportsFeature(entity, FEAT.NEXT) && (
            <button aria-label="Next" onClick={() => call('media_next_track')}><SkipForward size={18} fill="currentColor" /></button>
          )}
        </div>
      </div>
    </Tile>
  );
}
