import {
  useCallback,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';

/**
 * A draggable climate ring dial (DESIGN_DIRECTIONS §3 I4, Phase-3 bloom): a 270°
 * arc from min→max temperature, with a knob snapped to `target_temp_step`. Drag
 * the knob (or tap the arc) → onChange(target). The progress arc is tinted by
 * `hvac_action` — warm when heating, cool when cooling, muted otherwise — and the
 * centre carries the live target numeral over a small current-temp readout.
 *
 * SVG-based so the arc is crisp at any size and the geometry is exact. Pointer
 * angle maps onto the 270° sweep (gap centred at the bottom). Single-thumb only;
 * the integrator wires `target_temp_step`/min/max/value from the entity.
 *
 * Accessibility: role=slider with aria-valuemin/max/now and a °-suffixed
 * valuetext; ←/↓ lower and →/↑ raise by one step, Home/End jump to min/max.
 */

const ARC = 270; // sweep in degrees
const START = 135; // degrees from +x axis (gap centred at bottom)
const VB = 200; // viewBox units
const CENTER = VB / 2;
const RADIUS = 78;
const STROKE = 12;

export type DialTint = 'warm' | 'cool' | 'muted';

export function TempDial({
  value,
  min,
  max,
  step = 0.5,
  current,
  unit = '°',
  tint = 'muted',
  label = 'Target temperature',
  onChange,
  size = 200,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  /** Current room temperature shown under the target (optional). */
  current?: number;
  unit?: string;
  /** Drives the arc colour; derive from hvac_action (heating→warm, cooling→cool). */
  tint?: DialTint;
  label?: string;
  onChange: (value: number) => void;
  size?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const span = Math.max(0.0001, max - min);
  const frac = clamp01((value - min) / span);

  const tintVar = tint === 'warm' ? 'var(--warm)' : tint === 'cool' ? 'var(--cool)' : 'var(--accent)';

  const snap = useCallback(
    (raw: number) => {
      const snapped = Math.round((raw - min) / step) * step + min;
      // Avoid float fuzz like 21.30000004.
      const fixed = Math.round(snapped / step) * step;
      return clamp(Number(fixed.toFixed(4)), min, max);
    },
    [min, max, step],
  );

  const fromPoint = useCallback(
    (clientX: number, clientY: number): number => {
      const el = ref.current;
      if (!el) return value;
      const rect = el.getBoundingClientRect();
      // Normalize pointer into viewBox space, then into a 0..1 along the arc.
      const px = ((clientX - rect.left) / rect.width) * VB - CENTER;
      const py = ((clientY - rect.top) / rect.height) * VB - CENTER;
      let deg = (Math.atan2(py, px) * 180) / Math.PI; // -180..180, 0 at +x
      // Shift so the arc start (bottom-left) is 0.
      let along = deg - START;
      while (along < 0) along += 360;
      // Past the end of the arc, snap to whichever end is nearer (dead zone in gap).
      if (along > ARC) {
        along = along - ARC > (360 - ARC) / 2 ? 0 : ARC;
      }
      return snap(min + (along / ARC) * span);
    },
    [value, snap, min, span],
  );

  const onPointerDown = useCallback(
    (e: ReactPointerEvent) => {
      e.preventDefault();
      dragging.current = true;
      (e.currentTarget as unknown as Element).setPointerCapture?.(e.pointerId);
      onChange(fromPoint(e.clientX, e.clientY));
    },
    [fromPoint, onChange],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent) => {
      if (!dragging.current) return;
      onChange(fromPoint(e.clientX, e.clientY));
    },
    [fromPoint, onChange],
  );

  const endDrag = useCallback((e: ReactPointerEvent) => {
    dragging.current = false;
    (e.currentTarget as unknown as Element).releasePointerCapture?.(e.pointerId);
  }, []);

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault();
          onChange(snap(value + step));
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault();
          onChange(snap(value - step));
          break;
        case 'Home':
          e.preventDefault();
          onChange(min);
          break;
        case 'End':
          e.preventDefault();
          onChange(max);
          break;
      }
    },
    [value, step, snap, onChange, min, max],
  );

  const circumference = (ARC / 360) * 2 * Math.PI * RADIUS;
  const knob = polar(START + frac * ARC, RADIUS);

  return (
    <svg
      ref={ref}
      className="simui-dial"
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`${fmt(value)}${unit}`}
      viewBox={`0 0 ${VB} ${VB}`}
      width={size}
      height={size}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
    >
      {/* Track (full sweep, muted) */}
      <path
        className="simui-dial-track"
        d={arcPath(START, START + ARC, RADIUS)}
        fill="none"
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
      {/* Progress (min→value, tinted) */}
      <path
        className="simui-dial-prog"
        d={arcPath(START, START + frac * ARC, RADIUS)}
        fill="none"
        stroke={tintVar}
        strokeWidth={STROKE}
        strokeLinecap="round"
        style={{ strokeDasharray: circumference, transition: 'stroke 0.2s ease' }}
      />
      {/* Knob */}
      <circle
        className="simui-dial-knob"
        cx={knob.x}
        cy={knob.y}
        r={STROKE / 2 + 3}
        fill={tintVar}
        style={{ transition: 'fill 0.2s ease' }}
      />
      {/* Centre readout */}
      <text className="simui-dial-value" x={CENTER} y={CENTER - 2} textAnchor="middle" fill="var(--text)">
        {fmt(value)}
        <tspan className="simui-dial-unit" fill="var(--muted)">{unit}</tspan>
      </text>
      {current != null && (
        <text className="simui-dial-current" x={CENTER} y={CENTER + 24} textAnchor="middle" fill="var(--muted)">
          {fmt(current)}{unit} now
        </text>
      )}
    </svg>
  );
}

function arcPath(startDeg: number, endDeg: number, radius: number): string {
  const a = polar(startDeg, radius);
  const b = polar(endDeg, radius);
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  // sweep=1 → clockwise in SVG's y-down coordinate space.
  return `M ${a.x} ${a.y} A ${radius} ${radius} 0 ${large} 1 ${b.x} ${b.y}`;
}

function polar(deg: number, radius: number): { x: number; y: number } {
  const rad = (deg * Math.PI) / 180;
  return { x: CENTER + Math.cos(rad) * radius, y: CENTER + Math.sin(rad) * radius };
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}
function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}
function fmt(n: number): string {
  return Number.isInteger(n) ? `${n}` : n.toFixed(1);
}
