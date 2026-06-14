import type { ChangeEvent, CSSProperties } from 'react';
import { Pause, Play, SkipBack, SkipForward, Square, Volume2, VolumeX } from 'lucide-react';
import { useCallService } from '../../hass/context';
import { useAlbumTint, albumTintStyle } from '../../components/useAlbumTint';
import type { HassEntity } from '../../types';
import { prettyState, supportsFeature } from '../../util';
import { AttrList } from './AttrList';

/**
 * Media-player "more-info": a large now-playing card (album art + title / artist),
 * a full transport rack (prev / play-pause / next / stop — gated on
 * supported_features), a volume slider + mute, and a source picker. Reuses the
 * album-tint hook so the sheet glows with the cover, matching the tile.
 */

// Standard HA media_player supported_features bits.
const FEAT = {
  PAUSE: 1,
  VOLUME_SET: 4,
  VOLUME_MUTE: 8,
  PREV: 16,
  NEXT: 32,
  SELECT_SOURCE: 2048,
  STOP: 4096,
  PLAY: 16384,
};

export function MediaDetail({ entity }: { entity: HassEntity }) {
  const callService = useCallService();
  const id = entity.entity_id;
  const a = entity.attributes;
  const st = entity.state;
  const playing = st === 'playing';
  const idle = st === 'off' || st === 'idle' || st === 'standby' || st === 'unavailable';

  const title = a.media_title as string | undefined;
  const artist = (a.media_artist ?? a.media_album_name ?? a.app_name) as string | undefined;
  const pic = a.entity_picture as string | undefined;
  const tint = useAlbumTint(pic);

  const volume = a.volume_level as number | undefined;
  const muted = a.is_volume_muted === true;
  const sources = (a.source_list as string[] | undefined) ?? [];
  const curSource = a.source as string | undefined;

  const hasTransport =
    supportsFeature(entity, FEAT.PLAY) ||
    supportsFeature(entity, FEAT.PAUSE) ||
    supportsFeature(entity, FEAT.PREV) ||
    supportsFeature(entity, FEAT.NEXT);

  const call = (service: string, data?: Record<string, unknown>) =>
    void callService('media_player', service, data, { entity_id: id });

  const volPct = volume != null ? Math.round(volume * 100) : 0;
  const volStyle: CSSProperties = {
    background: `linear-gradient(to right, var(--accent) ${volPct}%, var(--faint) ${volPct}%)`,
  };

  return (
    <div className="simui-detail">
      <div
        className={`simui-md-now${tint ? ' is-album-tinted' : ''}`}
        style={tint ? albumTintStyle(tint) : undefined}
      >
        {pic ? <img className="simui-md-art" src={pic} alt="" /> : <div className="simui-md-art" />}
        <div className="simui-md-meta">
          {title ? (
            <>
              <span className="simui-md-title" title={title}>{title}</span>
              {artist && <span className="simui-md-artist" title={artist}>{artist}</span>}
            </>
          ) : (
            <span className="simui-md-title">{prettyState(st)}</span>
          )}
          {title && <span className="simui-md-state num">{prettyState(st)}</span>}
        </div>
      </div>

      {hasTransport && (
        <div className="simui-md-transport">
          {supportsFeature(entity, FEAT.PREV) && (
            <button className="simui-md-btn" aria-label="Previous" onClick={() => call('media_previous_track')}>
              <SkipBack size={20} fill="currentColor" />
            </button>
          )}
          <button
            className="simui-md-btn play"
            aria-label={playing ? 'Pause' : 'Play'}
            disabled={idle}
            onClick={() => call('media_play_pause')}
          >
            {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
          </button>
          {supportsFeature(entity, FEAT.STOP) && (
            <button className="simui-md-btn" aria-label="Stop" onClick={() => call('media_stop')}>
              <Square size={14} fill="currentColor" />
            </button>
          )}
          {supportsFeature(entity, FEAT.NEXT) && (
            <button className="simui-md-btn" aria-label="Next" onClick={() => call('media_next_track')}>
              <SkipForward size={20} fill="currentColor" />
            </button>
          )}
        </div>
      )}

      {(supportsFeature(entity, FEAT.VOLUME_SET) || volume != null) && (
        <div className="simui-md-volrow">
          {supportsFeature(entity, FEAT.VOLUME_MUTE) && (
            <button
              className={`simui-iconbtn-h${muted ? ' active' : ''}`}
              aria-label={muted ? 'Unmute' : 'Mute'}
              aria-pressed={muted}
              onClick={() => call('volume_mute', { is_volume_muted: !muted })}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          )}
          <input
            className="simui-slider"
            type="range"
            min={0}
            max={100}
            value={muted ? 0 : volPct}
            aria-label="Volume"
            style={volStyle}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              call('volume_set', { volume_level: Number(e.target.value) / 100 })
            }
          />
          <span className="simui-qc-val num">{volPct}%</span>
        </div>
      )}

      {supportsFeature(entity, FEAT.SELECT_SOURCE) && sources.length > 0 && (
        <div className="simui-detail-field">
          <span className="simui-qc-label">Source</span>
          <div className="simui-seg simui-detail-seg" role="group" aria-label="Source">
            {sources.map((s) => {
              const active = curSource === s;
              return (
                <button
                  key={s}
                  className={`simui-segbtn${active ? ' is-active' : ''}`}
                  aria-pressed={active}
                  onClick={() => call('select_source', { source: s })}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <AttrList
        entity={entity}
        omit={[
          'media_title',
          'media_artist',
          'media_album_name',
          'volume_level',
          'is_volume_muted',
          'source',
          'source_list',
        ]}
      />
    </div>
  );
}
