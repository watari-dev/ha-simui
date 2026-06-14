import {
  useCallback,
  useId,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';

/**
 * An HSV colour wheel (DESIGN_DIRECTIONS §3 I3, Phase-3 "bloom"): a conic-gradient
 * hue ring over a radial white→transparent saturation field, with a draggable
 * thumb pinned at the current [hue, saturation]. Pointer drag anywhere in the disc
 * → onChange([h, s]); the angle is the hue (0–360), the radius the saturation
 * (0–100, clamped to the rim). Self-contained and dependency-free; the disc colour
 * is pure CSS, so it costs nothing to paint. Lightness is fixed at full (HA's
 * `hs_color` is hue+saturation only) — brightness lives on its own control.
 *
 * Accessibility: a labelled slider-like surface. Arrow keys nudge hue (±/−) and
 * saturation (↑/↓); Home/End jump saturation to the rim/centre. Values are
 * announced via aria-valuetext.
 */
export function ColorWheel({
  hs,
  onChange,
  size = 200,
  label = 'Colour',
}: {
  /** Current [hue 0–360, saturation 0–100]. */
  hs: [number, number];
  onChange: (hs: [number, number]) => void;
  size?: number;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const id = useId();
  const [h, s] = hs;

  // Thumb position: polar (hue angle, saturation radius) → cartesian, 0..1.
  const rad = (h * Math.PI) / 180;
  const r = Math.min(1, Math.max(0, s / 100));
  const cx = 0.5 + Math.cos(rad) * 0.5 * r;
  const cy = 0.5 + Math.sin(rad) * 0.5 * r;

  const fromPoint = useCallback(
    (clientX: number, clientY: number): [number, number] => {
      const el = ref.current;
      if (!el) return hs;
      const rect = el.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width - 0.5;
      const py = (clientY - rect.top) / rect.height - 0.5;
      let deg = (Math.atan2(py, px) * 180) / Math.PI;
      if (deg < 0) deg += 360;
      const dist = Math.min(1, Math.hypot(px, py) / 0.5);
      return [Math.round(deg), Math.round(dist * 100)];
    },
    [hs],
  );

  const onPointerDown = useCallback(
    (e: ReactPointerEvent) => {
      e.preventDefault();
      dragging.current = true;
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
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
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  }, []);

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      const HUE = 6;
      const SAT = 6;
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          onChange([(h + HUE) % 360, s]);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onChange([(h - HUE + 360) % 360, s]);
          break;
        case 'ArrowUp':
          e.preventDefault();
          onChange([h, Math.min(100, s + SAT)]);
          break;
        case 'ArrowDown':
          e.preventDefault();
          onChange([h, Math.max(0, s - SAT)]);
          break;
        case 'Home':
          e.preventDefault();
          onChange([h, 100]);
          break;
        case 'End':
          e.preventDefault();
          onChange([h, 0]);
          break;
      }
    },
    [h, s, onChange],
  );

  return (
    <div
      ref={ref}
      className="simui-wheel"
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-labelledby={id}
      aria-valuetext={`Hue ${h} degrees, saturation ${s} percent`}
      aria-valuemin={0}
      aria-valuemax={360}
      aria-valuenow={h}
      style={{ width: size, height: size }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
    >
      <span id={id} className="simui-sr-only">{label}</span>
      <div className="simui-wheel-disc" aria-hidden="true" />
      <div
        className="simui-wheel-thumb"
        aria-hidden="true"
        style={{
          left: `${cx * 100}%`,
          top: `${cy * 100}%`,
          background: `hsl(${h} ${s}% 50%)`,
        }}
      />
    </div>
  );
}
