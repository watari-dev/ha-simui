import { useEffect, useMemo, useRef } from 'react';
import {
  AreaSeries,
  ColorType,
  CrosshairMode,
  LineSeries,
  LineStyle,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type LineData,
  type SeriesType,
  type Time,
  type UTCTimestamp,
} from 'lightweight-charts';
import type { ChartSpec, ChartSeries, ChartAxis } from '../dashboard/types';
import { useHistory } from '../hass/history';
import { useEntity } from '../hass/context';
import { formatNumber } from '../util';

/**
 * The TradingView-grade history block (FRAMEWORK.md §5). A thin, theme-aware
 * shell around `lightweight-charts`: AreaSeries for `fill:'area'`, LineSeries
 * for `fill:'line'`, an optional second right-hand scale (`axis.opposite`),
 * fixed scales from `axis.min/max`, faint gridlines + a crosshair readout.
 *
 * The HEADER row is the glance layer (REQUIRED when `header.showCurrent`): each
 * series' current value, tabular and tinted by its series color. The chart is
 * the *expand* tier; `Sparkline.tsx` is the glance tier on a tile.
 */
export function Chart({ spec }: { spec: ChartSpec }) {
  const entities = useMemo(() => spec.series.map((s) => s.entity), [spec.series]);
  const data = useHistory(entities, spec.window);

  return (
    <div className="simui-chart">
      {(spec.title || spec.header.showCurrent) && (
        <div className="simui-chart-head">
          {spec.title && <span className="simui-chart-title">{spec.title}</span>}
          {spec.header.showCurrent && (
            <div className="simui-chart-readout">
              {spec.series.map((s, i) => (
                <CurrentValue
                  key={`${s.entity}-${i}`}
                  series={s}
                  color={seriesTokenColor(s, i)}
                  colorize={spec.header.colorize}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <ChartCanvas spec={spec} data={data} />
    </div>
  );
}

/**
 * One header cell: the live current value for a series, tabular and tinted.
 * Subscribes to its own entity (surgical) — the glance layer (FRAMEWORK.md §5).
 */
function CurrentValue({
  series,
  color,
  colorize,
}: {
  series: ChartSeries;
  color: string;
  colorize: boolean;
}) {
  const entity = useEntity(series.entity);
  const raw = entity?.state;
  const num = raw != null ? Number.parseFloat(raw) : NaN;
  const unit = entity?.attributes.unit_of_measurement as string | undefined;
  const value = Number.isFinite(num) ? formatNumber(num) : (raw ?? '—');
  return (
    <span className="simui-chart-cur">
      <span className="simui-chart-dot" style={{ background: color }} />
      <span className="simui-chart-cur-name">{series.name ?? seriesLabel(series.entity)}</span>
      <span className="simui-chart-cur-val" style={colorize ? { color } : undefined}>
        {value}
        {unit && Number.isFinite(num) ? <small> {unit}</small> : null}
      </span>
    </span>
  );
}

type Series = Record<string, { t: number; v: number }[]>;

/** The lightweight-charts canvas. Imperative — created once, fed on data change. */
function ChartCanvas({ spec, data }: { spec: ChartSpec; data: Series }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<SeriesType>[]>([]);

  // Resolve theme colors at mount (CSS vars don't reach the canvas). Read from
  // the host element so we inherit hass.themes when embedded.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const css = getComputedStyle(host);
    const v = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
    const text = v('--text', '#edeef2');
    const muted = v('--muted', '#838996');
    const faint = v('--faint', '#23262e');

    const chart = createChart(host, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: muted,
        fontFamily: getComputedStyle(host).fontFamily,
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: faint, style: LineStyle.Solid },
        horzLines: { color: faint, style: LineStyle.Solid },
      },
      rightPriceScale: { borderColor: faint, visible: true },
      leftPriceScale: { borderColor: faint, visible: false },
      timeScale: { borderColor: faint, timeVisible: spec.window.unit === 'h', secondsVisible: false },
      crosshair: {
        mode: CrosshairMode.Magnet,
        vertLine: { color: muted, width: 1, style: LineStyle.Dotted, labelBackgroundColor: faint },
        horzLine: { color: muted, width: 1, style: LineStyle.Dotted, labelBackgroundColor: faint, labelVisible: true },
      },
      handleScale: false,
      handleScroll: false,
      autoSize: false,
    });
    chart.applyOptions({ layout: { textColor: muted } });
    chartRef.current = chart;

    // Show the left scale only when some axis lives there; `opposite` → right.
    const usesLeft = (spec.axes.length ? spec.axes : [undefined]).some((a) => priceScaleId(a) === 'left');
    chart.priceScale('left').applyOptions({ visible: usesLeft, borderColor: faint, textColor: text });
    chart.priceScale('right').applyOptions({ borderColor: faint, textColor: text });

    // Build series.
    seriesRef.current = spec.series.map<ISeriesApi<SeriesType>>((s, i) => {
      const color = seriesColor(s, i, css);
      const axis = findAxis(spec, s);
      const scaleId = priceScaleId(axis);
      const lineWidth = clampLineWidth(s.strokeWidth ?? 2);

      if (s.fill === 'area') {
        const op = s.opacity ?? 0.18;
        const series = chart.addSeries(AreaSeries, {
          lineColor: color,
          topColor: withAlpha(color, op),
          bottomColor: withAlpha(color, 0),
          lineWidth,
          priceScaleId: scaleId,
          priceLineVisible: false,
          lastValueVisible: true,
          crosshairMarkerVisible: true,
        });
        applyFixedScale(series, axis);
        return series;
      }
      const series = chart.addSeries(LineSeries, {
        color,
        lineWidth,
        priceScaleId: scaleId,
        priceLineVisible: false,
        lastValueVisible: true,
        crosshairMarkerVisible: true,
      });
      applyFixedScale(series, axis);
      return series;
    });

    // Value-banded reference lines (FRAMEWORK.md §5) — e.g. a comfort band — drawn
    // as faint dashed horizontals on the primary series.
    const primary = seriesRef.current[0];
    if (primary && spec.thresholds?.length) {
      for (const t of spec.thresholds) {
        primary.createPriceLine({
          price: t.value,
          color: resolveColor(t.color, css),
          lineWidth: 1,
          lineStyle: LineStyle.Dashed,
          axisLabelVisible: false,
        });
      }
    }

    const ro = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect;
      if (!box || !chartRef.current) return;
      try { chartRef.current.resize(box.width, box.height); } catch { /* disposed mid-resize */ }
    });
    ro.observe(host);
    // `|| 1` guards the first paint, where the host may not be laid out yet.
    try { chart.resize(host.clientWidth || 1, host.clientHeight || 1); } catch { /* not ready */ }

    return () => {
      ro.disconnect();
      try { chart.remove(); } catch { /* already disposed */ }
      chartRef.current = null;
      seriesRef.current = [];
    };
    // Rebuild only when the spec's structure changes (series/axes/window), not
    // on every data tick — data flows through the separate effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specStructure(spec)]);

  // Feed data into the existing series whenever history changes.
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    try {
      let any = false;
      spec.series.forEach((s, i) => {
        const series = seriesRef.current[i];
        if (!series) return;
        const points = data[s.entity] ?? [];
        const line: LineData<Time>[] = dedupeByTime(points).map((p) => ({
          time: Math.floor(p.t / 1000) as UTCTimestamp,
          value: p.v,
        }));
        // Area & Line both consume LineData (SingleValueData); the union series
        // api types setData against every series shape, so narrow at the call.
        (series as ISeriesApi<'Line'>).setData(line);
        if (line.length) any = true;
      });
      if (any) chart.timeScale().fitContent();
    } catch {
      // Series/chart disposed between effects (StrictMode/resize race) — the next
      // data tick re-renders against the live chart.
    }
  }, [data, spec.series]);

  return <div className="simui-chart-canvas" ref={hostRef} />;
}

/* ---------------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------------- */

/** A restrained default palette: monochrome accent first, then category hues. */
const PALETTE = ['--accent', '--warm', '--up', '--down', '--warn'] as const;

function seriesColor(s: ChartSeries, i: number, css?: CSSStyleDeclaration): string {
  // Resolve a `var(--token)` string to a real hex — the lightweight-charts canvas
  // can't parse CSS vars, so an unresolved 'var(--warn)' rendered as a dead line.
  if (s.color) return resolveColor(s.color, css);
  const token = PALETTE[i % PALETTE.length];
  const fallback = ['#5b8cff', '#ffb267', '#3fd08a', '#f0735e', '#f0a84b'][i % PALETTE.length];
  const value = css?.getPropertyValue(token).trim();
  return value || fallback;
}

/**
 * DOM-native color for the header readout: an explicit series color, else the
 * theme CSS var (the browser resolves `var()` and inherits hass.themes), so the
 * header swatch always matches the canvas series — even under a custom HA theme.
 */
function seriesTokenColor(s: ChartSeries, i: number): string {
  return s.color ?? `var(${PALETTE[i % PALETTE.length]})`;
}

/** Resolve a `--token` / `var(--token)` color string to its computed value (else pass through). */
function resolveColor(color: string, css?: CSSStyleDeclaration): string {
  const c = color.trim();
  if (c.startsWith('--')) return css?.getPropertyValue(c).trim() || c;
  const m = c.match(/^var\(\s*(--[a-z0-9-]+)\s*\)$/i);
  if (m) return css?.getPropertyValue(m[1]).trim() || c;
  return c;
}

function seriesLabel(entityId: string): string {
  const obj = entityId.split('.')[1] ?? entityId;
  return obj.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

function findAxis(spec: ChartSpec, s: ChartSeries): ChartAxis | undefined {
  if (s.axisId) return spec.axes.find((a) => a.id === s.axisId);
  return spec.axes[0];
}

function priceScaleId(axis: ChartAxis | undefined): string {
  return axis?.opposite ? 'right' : 'left';
}

/** Pin a series' visible range to the axis' fixed [min, max] when both given. */
function applyFixedScale(series: ISeriesApi<SeriesType>, axis: ChartAxis | undefined): void {
  if (!axis || axis.min == null || axis.max == null) return;
  const minValue = axis.min;
  const maxValue = axis.max;
  series.applyOptions({
    autoscaleInfoProvider: () => ({
      priceRange: { minValue, maxValue },
    }),
  });
}

/** lightweight-charts only accepts integer line widths 1..4. */
function clampLineWidth(w: number): 1 | 2 | 3 | 4 {
  const r = Math.round(w);
  return (r < 1 ? 1 : r > 4 ? 4 : r) as 1 | 2 | 3 | 4;
}

/** Apply an alpha to a hex/rgb color → rgba(); pass through other forms. */
function withAlpha(color: string, alpha: number): string {
  const a = Math.max(0, Math.min(1, alpha));
  const hex = color.trim();
  if (/^#([0-9a-f]{3})$/i.test(hex)) {
    const r = parseInt(hex[1] + hex[1], 16);
    const g = parseInt(hex[2] + hex[2], 16);
    const b = parseInt(hex[3] + hex[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  if (/^#([0-9a-f]{6})$/i.test(hex)) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  const rgb = hex.match(/^rgb\(([^)]+)\)$/i);
  if (rgb) return `rgba(${rgb[1]}, ${a})`;
  // color-mix / named / already-rgba: fall back to a CSS color-mix with transparent.
  return `color-mix(in srgb, ${hex} ${Math.round(a * 100)}%, transparent)`;
}

/** lightweight-charts requires strictly ascending, unique times. */
function dedupeByTime(points: { t: number; v: number }[]): { t: number; v: number }[] {
  const sorted = [...points].sort((a, b) => a.t - b.t);
  const out: { t: number; v: number }[] = [];
  let lastSec = -1;
  for (const p of sorted) {
    const sec = Math.floor(p.t / 1000);
    if (sec === lastSec) out[out.length - 1] = p; // keep the latest for that second
    else {
      out.push(p);
      lastSec = sec;
    }
  }
  return out;
}

/**
 * A cheap structural signature: rebuild the chart only when series identity,
 * axis layout, or the window changes — not when data or current values move.
 */
function specStructure(spec: ChartSpec): string {
  const series = spec.series
    .map((s) => `${s.entity}:${s.fill}:${s.color ?? ''}:${s.strokeWidth ?? ''}:${s.axisId ?? ''}:${s.opacity ?? ''}`)
    .join(',');
  const axes = spec.axes.map((a) => `${a.id}:${a.opposite ? 1 : 0}:${a.min ?? ''}:${a.max ?? ''}:${a.ticks ?? ''}`).join(',');
  const thresholds = (spec.thresholds ?? []).map((t) => `${t.value}:${t.color}`).join(',');
  return `${spec.window.value}${spec.window.unit}|${series}|${axes}|${thresholds}`;
}
