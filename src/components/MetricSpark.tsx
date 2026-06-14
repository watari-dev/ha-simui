import { type CSSProperties, type KeyboardEvent, type MouseEvent, useMemo } from 'react';
import { useEntity } from '../hass/context';
import { useHistory, type HistoryWindow } from '../hass/history';
import { formatNumber, friendly } from '../util';

/**
 * Worker 1 / Phase 2 — the metric CELL (DESIGN_DIRECTIONS §2.5 "sparkline wall",
 * I6). A numeric sensor / circuit rendered as data-viz, not a row: a short name,
 * a big tabular value + dimmed unit, a compact area sparkline, a signed coloured
 * delta, and a faint in-band threshold zone that tints amber when the value is
 * out of band.
 *
 * The sparkline is an inline SVG (not a per-cell `lightweight-charts` instance) —
 * deliberately. A wall renders dozens of cells; one WebGL/canvas context +
 * ResizeObserver + data effect per cell is far too heavy and would break the
 * 60fps rule on a wall tablet. The inline SVG is one DOM node, zero canvas, and
 * follows the established glance-tier path (`Sparkline.tsx`). The full
 * `lightweight-charts` `<Chart>` stays the *expand* tier (see ExpandableChart),
 * exactly the two-tier model in FRAMEWORK.md §5.
 *
 * Y is zoomed to the data band (min→max of the window), never anchored to 0 —
 * TradingView semantics, so small meaningful moves read.
 */

export interface MetricBand {
  /** Lower edge of the comfortable/in-spec band (e.g. humidity 40). */
  min?: number;
  /** Upper edge of the comfortable/in-spec band (e.g. humidity 60, CO₂ 1000). */
  max?: number;
}

export interface MetricSparkProps {
  entityId: string;
  /** In-band threshold zone; out-of-band tints the value/spark amber (--warn). */
  band?: MetricBand;
  /** History window for the spark + delta. Default 24h. */
  window?: HistoryWindow;
  /** Override the short cell name (defaults to friendly_name). */
  name?: string;
  /** A fixed identity hue for the series stroke (e.g. 'var(--cyan)'); else --muted. */
  accent?: string;
  /** Smart-click → expand to the full chart (wired by ExpandableChart). */
  onExpand?: () => void;
}

const DEFAULT_WINDOW: HistoryWindow = { value: 24, unit: 'h' };
const SPARK_W = 140;
const SPARK_H = 40;

export function MetricSpark({ entityId, band, window, name, accent, onExpand }: MetricSparkProps) {
  const entity = useEntity(entityId);
  const win = window ?? DEFAULT_WINDOW;
  const dead = !!entity && (entity.state === 'unavailable' || entity.state === 'unknown');
  // When dead, request no history so the cell can't draw or record a trend.
  const series = useHistory(dead ? [] : [entityId], win);
  const points = series[entityId];

  const unit = entity?.attributes.unit_of_measurement as string | undefined;
  const raw = entity?.state;
  const cur = raw != null ? Number.parseFloat(raw) : NaN;
  const hasValue = !dead && Number.isFinite(cur);

  const label = name ?? (entity ? friendly(entity) : entityId);

  // Derive the band membership + delta from the live value and the window's first
  // sample. Memoised on the point set so unrelated re-renders stay cheap.
  const { delta, outOfBand } = useMemo(() => {
    const vals = (points ?? []).map((p) => p.v);
    const first = vals.length ? vals[0] : undefined;
    const last = hasValue ? cur : vals.length ? vals[vals.length - 1] : undefined;
    const d = first != null && last != null ? last - first : undefined;
    const probe = hasValue ? cur : last;
    const oob =
      probe != null &&
      band != null &&
      ((band.min != null && probe < band.min) || (band.max != null && probe > band.max));
    return { delta: d, outOfBand: !!oob };
  }, [points, cur, hasValue, band]);

  const stroke = outOfBand ? 'var(--warn)' : accent ?? 'var(--muted)';
  const valueClass = `simui-metric-val num${outOfBand ? ' oob' : ''}`;

  // Dead device — dim, "—" placeholder, no delta / sparkline / expand affordance.
  if (dead) {
    return (
      <div className="simui-metric is-unavailable">
        <div className="simui-metric-head">
          <span className="simui-metric-name" title={label}>{label}</span>
        </div>
        <div className="simui-metric-value">
          <span className="simui-metric-val num">—</span>
        </div>
      </div>
    );
  }

  const handleClick = (e: MouseEvent) => {
    if (!onExpand) return;
    e.stopPropagation();
    onExpand();
  };
  const handleKey = onExpand
    ? (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onExpand();
        }
      }
    : undefined;

  return (
    <div
      className={`simui-metric${onExpand ? ' is-clickable' : ''}`}
      onClick={onExpand ? handleClick : undefined}
      onKeyDown={handleKey}
      role={onExpand ? 'button' : undefined}
      tabIndex={onExpand ? 0 : undefined}
      aria-label={onExpand ? `${label} — view chart` : undefined}
      style={{ '--metric-accent': stroke } as CSSProperties}
    >
      <div className="simui-metric-head">
        <span className="simui-metric-name" title={label}>{label}</span>
        {delta != null && Math.abs(delta) >= DELTA_EPSILON && (
          <span className={`simui-metric-delta num ${delta > 0 ? 'up' : 'down'}`}>
            {delta > 0 ? '+' : '−'}{formatNumber(Math.abs(delta))}
          </span>
        )}
      </div>
      <div className="simui-metric-value">
        <span className={valueClass}>{hasValue ? formatNumber(cur) : raw ?? '—'}</span>
        {unit && hasValue && <span className="simui-metric-unit">{unit}</span>}
      </div>
      <SparkArea
        values={(points ?? []).map((p) => p.v)}
        band={band}
        stroke={stroke}
      />
    </div>
  );
}

/** A small floor so a flat line doesn't render a noisy ±0.0 delta. */
const DELTA_EPSILON = 0.05;

/**
 * The inline area sparkline. Y is zoomed to the data band (min→max), padded a
 * touch so the line doesn't kiss the edges. An optional in-band rectangle shades
 * the comfortable zone (faint); the line + soft area fill use the cell accent.
 */
function SparkArea({
  values,
  band,
  stroke,
  width = SPARK_W,
  height = SPARK_H,
}: {
  values: number[];
  band?: MetricBand;
  stroke: string;
  width?: number;
  height?: number;
}) {
  // Stable, unique gradient id per cell — must run before any early return so the
  // hook order stays constant across renders.
  const gid = useMemo(() => `ms-${Math.random().toString(36).slice(2, 8)}`, []);

  if (values.length < 2) {
    return <div className="simui-metric-spark is-empty" style={{ height }} aria-hidden="true" />;
  }

  const lo = Math.min(...values);
  const hi = Math.max(...values);
  // Pad the band so flat-ish series still show a line mid-cell, never clipped.
  const pad = (hi - lo || Math.abs(hi) || 1) * 0.12;
  const min = lo - pad;
  const max = hi + pad;
  const span = max - min || 1;
  const step = width / (values.length - 1);
  const y = (v: number) => height - ((v - min) / span) * height;

  const line = values.map((v, i) => `${(i * step).toFixed(1)},${y(v).toFixed(1)}`);
  const linePts = line.join(' ');
  // Close the area down to the baseline for the soft fill.
  const areaPts = `0,${height} ${linePts} ${width},${height}`;

  // In-band shaded zone, clamped to the visible band.
  let bandRect: { y: number; h: number } | null = null;
  if (band && (band.min != null || band.max != null)) {
    const top = band.max != null ? clampPx(y(band.max), height) : 0;
    const bottom = band.min != null ? clampPx(y(band.min), height) : height;
    const h = Math.max(0, bottom - top);
    if (h > 0.5) bandRect = { y: top, h };
  }

  return (
    <svg
      className="simui-metric-spark"
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.22" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {bandRect && (
        <rect
          className="simui-metric-band"
          x="0"
          y={bandRect.y.toFixed(1)}
          width={width}
          height={bandRect.h.toFixed(1)}
        />
      )}
      <polygon points={areaPts} fill={`url(#${gid})`} stroke="none" />
      <polyline
        points={linePts}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function clampPx(v: number, height: number): number {
  return v < 0 ? 0 : v > height ? height : v;
}
