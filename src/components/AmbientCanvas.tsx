import { useMemo, type CSSProperties } from 'react';
import { useAggregate } from '../hass/context';
import type { HassEntities } from '../types';

/**
 * AmbientCanvas — the living color field behind a surface (DESIGN_PRINCIPLES.md §3,
 * DESIGN_DIRECTIONS.md I1/I8 "alive" lever). Replaces the static `.simui-home-ambient`
 * single warm radial with a multi-stop gradient driven by live aggregates:
 *
 *   - **warmth** from the fraction of lights on  → amber bloom (--warm)
 *   - **cool wash** when any climate entity is cooling → cyan (--cool)
 *   - **time-of-day base** from `sun.sun` (or the local hour) → rose dawn / warm day /
 *     violet dusk / deep night
 *
 * It is a dim field BEHIND content (modest opacity), so legibility is never at risk.
 * Two looks: `mode:'field'` (default) is a soft multi-stop radial wash; `mode:'dots'`
 * is the ownable wall-tablet flourish — a full-bleed ~5px-pitch dot matrix (pure CSS
 * radial-gradient, 60fps, no JS animation) whose dot brightness/warmth tracks state.
 *
 * Subscriptions are surgical: a single `useAggregate` packs every input the canvas
 * cares about into one quantized number, so the field repaints only on a *meaningful*
 * change (a light flips, cooling starts, the time-of-day phase rolls over) — not on
 * every state tick. The slow ~600ms transition lives in CSS (see cssText below); per
 * DESIGN_PRINCIPLES.md §11 the field "appears, not animates".
 */

export type AmbientMode = 'field' | 'dots';

export interface AmbientCanvasProps {
  /** Visual treatment. Default 'field' (soft wash); 'dots' = dot-matrix flourish. */
  mode?: AmbientMode;
  /**
   * Entity ids whose `light.*` members drive warmth. Omit to scan all `light.*`
   * in the state map. Pass a room/surface's ids to make a category surface react
   * only to its own lights.
   */
  lightIds?: string[];
  /**
   * Optional cap on the field's overall opacity (the brightest, all-lights-on
   * state). Default 0.20 for 'field', 0.16 for 'dots' — kept dim so content stays
   * legible. Lower it for a category surface that wants a subtler hint.
   */
  maxOpacity?: number;
  /** Extra class on the root (e.g. to scope a category surface's canvas). */
  className?: string;
}

/* Time-of-day phases → a base hue + how warm/dim that hour feels. The base is the
   floor of the field even with every light off, so the app is alive before content. */
type Phase = 'night' | 'dawn' | 'day' | 'dusk';

function phaseOf(hour: number, sunState: string): Phase {
  // Prefer the real sun if present; below_horizon at a daytime hour ⇒ deep night.
  if (sunState === 'above_horizon') {
    if (hour < 8) return 'dawn';
    if (hour >= 18) return 'dusk';
    return 'day';
  }
  if (sunState === 'below_horizon') {
    if (hour >= 5 && hour < 8) return 'dawn';
    if (hour >= 18 && hour < 21) return 'dusk';
    return 'night';
  }
  // No sun entity — fall back to the local hour alone.
  if (hour < 5) return 'night';
  if (hour < 8) return 'dawn';
  if (hour < 18) return 'day';
  if (hour < 21) return 'dusk';
  return 'night';
}

/** The token + base intensity that anchors each phase (multi-stop accent below). */
const PHASE_FIELD: Record<Phase, { hue: string; base: number }> = {
  dawn: { hue: 'var(--pink)', base: 0.55 }, // rose first light
  day: { hue: 'var(--warm)', base: 0.42 }, // warm, low — daylight carries the room
  dusk: { hue: 'var(--violet)', base: 0.62 }, // violet wind-down
  night: { hue: 'var(--slate)', base: 0.34 }, // deep, cool, quiet
};

/** Pack the inputs into ONE primitive so useAggregate only repaints on real change. */
function packState(states: HassEntities, lightIds?: string[]): number {
  // Warmth: fraction of the relevant lights that are on, quantized to 0.1 steps.
  const ids = lightIds && lightIds.length
    ? lightIds.filter((id) => id.startsWith('light.'))
    : Object.keys(states).filter((id) => id.startsWith('light.'));
  let warm = 0;
  if (ids.length) {
    const on = ids.reduce((n, id) => n + (states[id]?.state === 'on' ? 1 : 0), 0);
    warm = Math.round((on / ids.length) * 10); // 0..10
  }
  // Cooling: any climate entity actively cooling → a cool wash flag.
  let cooling = 0;
  for (const id in states) {
    if (id.charCodeAt(0) === 99 /* 'c' */ && id.startsWith('climate.')) {
      const action = states[id]?.attributes?.hvac_action;
      if (action === 'cooling') { cooling = 1; break; }
    }
  }
  // Time-of-day phase, recomputed from the live sun + the current hour.
  const sun = states['sun.sun']?.state ?? '';
  const phase = phaseOf(new Date().getHours(), String(sun));
  const phaseCode = phase === 'night' ? 0 : phase === 'dawn' ? 1 : phase === 'day' ? 2 : 3;
  // 4 bits phase + 1 bit cooling + warmth(0..10) → one stable integer.
  return phaseCode * 100 + cooling * 20 + warm;
}

function unpack(code: number): { phase: Phase; cooling: boolean; warm: number } {
  const phaseCode = Math.floor(code / 100);
  const phase: Phase = phaseCode === 0 ? 'night' : phaseCode === 1 ? 'dawn' : phaseCode === 2 ? 'day' : 'dusk';
  const cooling = Math.floor((code % 100) / 20) === 1;
  const warm = code % 20;
  return { phase, cooling, warm };
}

export function AmbientCanvas({
  mode = 'field',
  lightIds,
  maxOpacity,
  className,
}: AmbientCanvasProps) {
  const code = useAggregate((states) => packState(states, lightIds));
  const { phase, cooling, warm } = useMemo(() => unpack(code), [code]);
  const cfg = PHASE_FIELD[phase];

  // Warmth fraction (0..1) scales an amber bloom on top of the phase base.
  const warmFrac = warm / 10;
  // Overall field opacity: a low time-of-day floor that lifts as lights come on.
  const cap = maxOpacity ?? (mode === 'dots' ? 0.16 : 0.2);
  const floor = cap * 0.3;
  const opacity = Math.min(cap, floor + warmFrac * (cap - floor) * cfg.base * 1.6 + cfg.base * (cap - floor) * 0.5);

  // The dot matrix tracks warmth with its own (slightly higher) presence so the
  // wall-tablet read holds across the room even at a glance.
  const dotOpacity = Math.min(cap, floor + warmFrac * (cap - floor) * 1.2 + cfg.base * (cap - floor) * 0.4);

  const style = {
    '--amb-phase': cfg.hue,
    // Warm bloom strength: present once any light is on, scaled by the fraction.
    '--amb-warm': warmFrac.toFixed(2),
    // Cool wash: only ignites while a climate entity is actively cooling.
    '--amb-cool': cooling ? '1' : '0',
    '--amb-opacity': (mode === 'dots' ? dotOpacity : opacity).toFixed(3),
  } as CSSProperties;

  return (
    <div
      className={`simui-ambient-canvas is-${mode}${className ? ` ${className}` : ''}`}
      data-phase={phase}
      aria-hidden="true"
      style={style}
    />
  );
}

export default AmbientCanvas;
