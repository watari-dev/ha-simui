// Dominant-colour extraction from album artwork (DESIGN_DIRECTIONS §2.9 — the
// "album-art-aware media tile"). Downscale the artwork onto a tiny offscreen
// canvas, then pick a representative colour biased toward the most *saturated*
// pixels (a flat grey wall of pixels averages to mud — the eye remembers the
// vivid hue, so we weight for it). CORS-safe: a tainted canvas throws on
// getImageData, which we catch and surface as a graceful failure (null) so the
// caller falls back to the monochrome tile. No dependencies; runs off the main
// render path (the hook drives it).

/** A resolved tint plus the raw channels, so callers can mix their own opacities. */
export interface AlbumTint {
  /** `rgb(r g b)` — drop straight into a CSS var / color-mix(). */
  rgb: string;
  r: number;
  g: number;
  b: number;
  /** HSL for callers that want to clamp lightness or reuse the hue. */
  h: number;
  s: number;
  l: number;
}

/** Size of the downscale buffer. 16px is plenty for an average and ~free to decode. */
const SAMPLE = 16;

/**
 * Extract a representative tint from an image URL. Resolves to `null` on any
 * failure (load error, CORS taint, empty/transparent art, decode abort). Always
 * sets `crossOrigin` so a CORS-enabled host (HA serves artwork same-origin, and
 * most streaming art ships permissive headers) yields a readable canvas; when it
 * doesn't, we degrade quietly rather than throw.
 */
export function extractAlbumTint(
  url: string,
  signal?: { aborted: boolean },
): Promise<AlbumTint | null> {
  return new Promise((resolve) => {
    if (!url || typeof document === 'undefined') {
      resolve(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';

    const done = (v: AlbumTint | null) => {
      img.onload = null;
      img.onerror = null;
      resolve(signal?.aborted ? null : v);
    };

    img.onerror = () => done(null);
    img.onload = () => {
      if (signal?.aborted) {
        done(null);
        return;
      }
      try {
        const canvas = document.createElement('canvas');
        canvas.width = SAMPLE;
        canvas.height = SAMPLE;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          done(null);
          return;
        }
        ctx.drawImage(img, 0, 0, SAMPLE, SAMPLE);
        const { data } = ctx.getImageData(0, 0, SAMPLE, SAMPLE);
        done(pickTint(data));
      } catch {
        // Tainted canvas (cross-origin without CORS) or any decode issue.
        done(null);
      }
    };

    img.src = url;
  });
}

/**
 * Reduce raw RGBA pixels to one tint. Each pixel contributes weighted by its
 * saturation² (so a few vivid pixels outvote a sea of grey) and by its alpha;
 * near-transparent and near-black/near-white pixels are dropped. Falls back to a
 * plain alpha-weighted average if nothing is saturated (a genuinely greyscale
 * cover), then clamps lightness into a band that reads as a *tint*, not a wash.
 */
function pickTint(data: Uint8ClampedArray): AlbumTint | null {
  let wr = 0;
  let wg = 0;
  let wb = 0;
  let wsum = 0;
  // Plain average fallback for greyscale art.
  let ar = 0;
  let ag = 0;
  let ab = 0;
  let asum = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const alpha = data[i + 3] / 255;
    if (alpha < 0.5) continue;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    // Drop near-black / near-white: they carry no usable hue.
    if (max < 18 || min > 240) {
      ar += r * alpha;
      ag += g * alpha;
      ab += b * alpha;
      asum += alpha;
      continue;
    }
    const sat = max === 0 ? 0 : (max - min) / max;
    const w = sat * sat * alpha;
    wr += r * w;
    wg += g * w;
    wb += b * w;
    wsum += w;

    ar += r * alpha;
    ag += g * alpha;
    ab += b * alpha;
    asum += alpha;
  }

  let r: number;
  let g: number;
  let b: number;
  if (wsum > 0.001) {
    r = wr / wsum;
    g = wg / wsum;
    b = wb / wsum;
  } else if (asum > 0) {
    r = ar / asum;
    g = ag / asum;
    b = ab / asum;
  } else {
    return null;
  }

  const hsl = rgbToHsl(r, g, b);
  const h = hsl[0];
  // Keep it a tint: clamp into a mid band, lift muddy saturation a touch.
  const l = clamp01(hsl[2], 0.32, 0.66);
  const s = Math.max(hsl[1], 0.18);
  [r, g, b] = hslToRgb(h, s, l);

  const ri = Math.round(r);
  const gi = Math.round(g);
  const bi = Math.round(b);
  return { rgb: `rgb(${ri} ${gi} ${bi})`, r: ri, g: gi, b: bi, h, s, l };
}

function clamp01(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

/** RGB (0–255) → HSL (h 0–360, s/l 0–1). */
export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return [h, s, l];
}

/** HSL (h 0–360, s/l 0–1) → RGB (0–255). */
export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = (((h % 360) + 360) % 360) / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;
  if (hp >= 0 && hp < 1) [r, g, b] = [c, x, 0];
  else if (hp < 2) [r, g, b] = [x, c, 0];
  else if (hp < 3) [r, g, b] = [0, c, x];
  else if (hp < 4) [r, g, b] = [0, x, c];
  else if (hp < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const m = l - c / 2;
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}
