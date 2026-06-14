import { useEffect, useState } from 'react';
import { extractAlbumTint, type AlbumTint } from '../util/albumColor';

/**
 * Resolve a media player's artwork to a tint colour (DESIGN_DIRECTIONS §2.9).
 * Pass the artwork URL (a media_player's `entity_picture`); the hook decodes it
 * off the render path and returns a tint once ready — `null` until then and on
 * any CORS/decode failure, so the caller renders the monochrome tile by default.
 *
 * Surgical: it only re-extracts when the URL changes, and aborts an in-flight
 * extraction if the URL changes or the component unmounts (no torn writes).
 */
export function useAlbumTint(url: string | undefined | null): AlbumTint | null {
  const [tint, setTint] = useState<AlbumTint | null>(null);

  useEffect(() => {
    if (!url) {
      setTint(null);
      return;
    }
    const signal = { aborted: false };
    void extractAlbumTint(url, signal).then((t) => {
      if (!signal.aborted) setTint(t);
    });
    return () => {
      signal.aborted = true;
    };
  }, [url]);

  return tint;
}

/**
 * The CSS the integrator can spread onto the media tile so the album tint reads
 * as an Apple-Home-style on-tint: a soft state-fill plus a hairline. Returns
 * `undefined` when there's no tint (the tile stays monochrome). The tile should
 * still own its own base background; these vars only *layer* the tint.
 *
 *   <Tile style={albumTintStyle(tint)} className={tint ? 'is-album-tinted' : ''}>
 *
 * Pairs with the `.simui-tile.is-album-tinted` rule in this worker's cssText.
 */
export function albumTintStyle(tint: AlbumTint | null): Record<string, string> | undefined {
  if (!tint) return undefined;
  return { '--album-tint': tint.rgb } as Record<string, string>;
}

export type { AlbumTint };
