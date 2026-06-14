import { type ReactNode, useMemo, useState } from 'react';
import { useEntity } from '../hass/context';
import { Chart } from './Chart';
import { Sheet } from './Sheet';
import { MetricSpark, type MetricBand } from './MetricSpark';
import { friendly } from '../util';
import type { ChartSpec } from '../dashboard/types';
import type { HistoryWindow } from '../hass/history';

/**
 * Worker 1 / Phase 2 — the smart-click bridge (DESIGN_DIRECTIONS §2.5, I6/I7).
 * Wraps the *glance* tier (a `MetricSpark` cell, or any custom children) and, on
 * click, opens the *expand* tier: the full `lightweight-charts` `<Chart>` inside
 * a `<Sheet>` with a 24h / 7d / 30d range toggle. This is the one shared
 * crosshair-grade graph reused from a 40px spark up to the full chart
 * (FRAMEWORK.md §5 two-tier model).
 *
 * Provide EITHER a ready `spec` (e.g. a power flow chart) OR an `entityId` (a
 * single-series spec is auto-built, y zoomed to the band, optional threshold
 * band lines). The range toggle drives the live spec's `window`, so changing it
 * re-fetches real recorder history via `useHistory` inside `<Chart>`.
 */

export type ChartRange = '24h' | '7d' | '30d';

const RANGES: { id: ChartRange; label: string; window: HistoryWindow }[] = [
  { id: '24h', label: '24h', window: { value: 24, unit: 'h' } },
  { id: '7d', label: '7d', window: { value: 7, unit: 'd' } },
  { id: '30d', label: '30d', window: { value: 30, unit: 'd' } },
];

export interface ExpandableChartProps {
  /** Single-metric mode: the cell entity. Ignored when `spec` is given. */
  entityId?: string;
  /** Multi-series mode: a ready chart spec (e.g. the merged Power flow chart). */
  spec?: ChartSpec;
  /** In-band threshold zone — drawn on both the glance spark and the full chart. */
  band?: MetricBand;
  /** A fixed identity hue for the series (e.g. 'var(--cyan)'). */
  accent?: string;
  /** Override the glance label / sheet title. */
  name?: string;
  /** Initial range. Default 24h. */
  range?: ChartRange;
  /** Custom glance content; defaults to a `MetricSpark` cell (single-metric mode). */
  children?: ReactNode;
}

export function ExpandableChart({
  entityId,
  spec,
  band,
  accent,
  name,
  range = '24h',
  children,
}: ExpandableChartProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<ChartRange>(range);

  const entity = useEntity(entityId ?? '');
  const title = name ?? (entity ? friendly(entity) : entityId);
  const win = RANGES.find((r) => r.id === current)?.window ?? RANGES[0].window;

  // Resolve the spec for the current range. A passed `spec` is re-windowed;
  // otherwise auto-build a restrained single-series area chart for the entity.
  const liveSpec = useMemo<ChartSpec | null>(() => {
    if (spec) return { ...spec, window: win };
    if (!entityId) return null;
    return buildSingleSpec(entityId, title ?? entityId, win, accent, band);
  }, [spec, entityId, title, win, accent, band]);

  const glance = children ?? (
    entityId ? (
      <MetricSpark
        entityId={entityId}
        band={band}
        window={win}
        name={name}
        accent={accent}
        onExpand={() => setOpen(true)}
      />
    ) : null
  );

  // When custom children are provided, wrap them so a click still expands.
  const glanceWrapped =
    children != null ? (
      <div
        className="simui-expand-glance is-clickable"
        role="button"
        tabIndex={0}
        aria-label={title ? `${title} — view chart` : 'View chart'}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        {glance}
      </div>
    ) : (
      glance
    );

  return (
    <>
      {glanceWrapped}
      <Sheet open={open} title={title} onClose={() => setOpen(false)}>
        <div className="simui-expand-sheet">
          <div className="simui-range-toggle" role="tablist" aria-label="Chart range">
            {RANGES.map((r) => (
              <button
                key={r.id}
                role="tab"
                aria-selected={current === r.id}
                className={`simui-range-btn${current === r.id ? ' active' : ''}`}
                onClick={() => setCurrent(r.id)}
              >
                {r.label}
              </button>
            ))}
          </div>
          {liveSpec && (
            <div className="simui-expand-chart">
              <Chart spec={liveSpec} />
            </div>
          )}
        </div>
      </Sheet>
    </>
  );
}

/**
 * Build a restrained single-series area spec for one entity: y auto-zoomed to the
 * band (no fixed axis), monochrome/accent fill, header readout on, and any band
 * edges rendered as faint threshold lines on the full chart.
 */
function buildSingleSpec(
  entityId: string,
  name: string,
  window: HistoryWindow,
  accent: string | undefined,
  band: MetricBand | undefined,
): ChartSpec {
  const thresholds: { value: number; color: string }[] = [];
  if (band?.min != null) thresholds.push({ value: band.min, color: 'var(--warn)' });
  if (band?.max != null) thresholds.push({ value: band.max, color: 'var(--warn)' });

  return {
    title: name,
    window,
    bucket: window.unit === 'd' ? 'day' : 'hour',
    reducer: 'mean',
    backend: window.unit === 'd' && window.value > 7 ? 'statistics' : 'history',
    header: { showCurrent: true, colorize: true },
    axes: [{ id: 'main' }],
    series: [
      {
        entity: entityId,
        name,
        fill: 'area',
        opacity: 0.18,
        strokeWidth: 2,
        color: accent,
        axisId: 'main',
      },
    ],
    thresholds: thresholds.length ? thresholds : undefined,
  };
}
