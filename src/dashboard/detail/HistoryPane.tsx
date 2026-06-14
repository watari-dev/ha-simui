import { type CSSProperties, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { ExpandableChart } from '../../components/ExpandableChart';
import type { MetricBand } from '../../components/MetricSpark';
import type { ChartSpec } from '../types';
import { useEntity, useHassSource } from '../../hass/context';
import { type HistoryWindow } from '../../hass/history';
import { prettyState } from '../../util';
import './HistoryPane.css';

/**
 * HistoryPane (SPEC_DETAIL §3.3) — the inline history graph for the detail Sheet,
 * generalising `SensorDetail`'s `ExpandableChart` usage to EVERY graphable source:
 * light-brightness, climate-temp, cover-position, fan-speed, number-value (numeric
 * `line` mode) and binary_sensor / switch / person-zone (`band` mode).
 *
 *  - `line`  → reuses `ExpandableChart` VERBATIM (MetricSpark glance + the full
 *              `lightweight-charts` graph on smart-click). No new charting infra.
 *              A tabular min / avg / max / now strip is derived under the spark
 *              from the same fetched window (one request, no extra round-trip).
 *  - `band`  → a small stepped state-band renderer (NOT lightweight-charts): a thin
 *              horizontal track segmented by state, state-tinted, with a hover
 *              readout. Consumes the same `history_during_period` rows, kept as
 *              strings (§4.3 `useStateHistory`, inlined here so the pane is
 *              self-contained and degrades to "renders nothing" offline).
 *
 * Attribute history (§4.2): when `attr` is set (e.g. `brightness`), the pane fetches
 * the entity's history WITH attributes and plots `row.a[attr]` — the one genuinely
 * new fetch path. Mock/dev with no connection → the section omits.
 *
 * Surgical: subscribes only to its own entity for the live "now" value; fetches the
 * window once per (entity, attr, window), superseding stale requests like
 * `useHistory`.
 */

export interface HistoryPaneProps {
  entityId: string;
  /** Plot a numeric ATTRIBUTE (e.g. `brightness`, `current_position`) not the state. */
  attr?: string;
  /** `line` (numeric) or `band` (categorical / on-off). Default inferred from the value. */
  mode?: 'line' | 'band';
  /** In-band threshold zone, forwarded to the glance spark + full chart (line mode). */
  band?: MetricBand;
  /** A fixed identity hue for the series, e.g. 'var(--cyan)'. */
  accent?: string;
  /** A ready chart spec override (multi-series, e.g. climate current vs target). */
  series?: ChartSpec;
  /** Override label / title. */
  name?: string;
}

const BAND_WINDOW: HistoryWindow = { value: 24, unit: 'h' };

export function HistoryPane({ entityId, attr, mode, band, accent, series, name }: HistoryPaneProps) {
  const entity = useEntity(entityId);

  // Decide line vs band. A ready multi-series spec is always a line graph. With an
  // attribute we assume numeric (line). Otherwise: numeric state → line, else band.
  const stateNum = entity ? Number.parseFloat(entity.state) : NaN;
  const resolvedMode: 'line' | 'band' =
    mode ?? (series || attr || Number.isFinite(stateNum) ? 'line' : 'band');

  if (!entity) return null;

  if (resolvedMode === 'band') {
    return <StateBand entityId={entityId} accent={accent} />;
  }

  // ── Numeric line: reuse ExpandableChart (with optional attribute series) + stats.
  if (attr) {
    return <AttributeHistory entityId={entityId} attr={attr} accent={accent} band={band} name={name} />;
  }

  return (
    <div className="simui-history">
      <ExpandableChart entityId={entityId} spec={series} accent={accent} band={band} name={name} />
      <NumericStats entityId={entityId} attr={undefined} window={BAND_WINDOW} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 * Numeric stats strip — min / avg / max / now, derived from the fetched window.
 * One request; no extra round-trip beyond what the chart already fetches.
 * ════════════════════════════════════════════════════════════════════════════ */

function NumericStats({
  entityId,
  attr,
  window,
}: {
  entityId: string;
  attr: string | undefined;
  window: HistoryWindow;
}) {
  const points = useValueHistory(entityId, attr, window);
  const entity = useEntity(entityId);
  const liveNum = entity ? Number.parseFloat(attr ? String(entity.attributes[attr]) : entity.state) : NaN;

  const stats = useMemo(() => {
    const vals = points.map((p) => p.v).filter((v) => Number.isFinite(v));
    if (!vals.length) return null;
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    for (const v of vals) {
      if (v < min) min = v;
      if (v > max) max = v;
      sum += v;
    }
    return { min, max, avg: sum / vals.length };
  }, [points]);

  if (!stats) return null;
  const now = Number.isFinite(liveNum) ? liveNum : points[points.length - 1]?.v;

  return (
    <div className="simui-history-stats" role="group" aria-label="History statistics">
      <Stat label="Min" value={stats.min} />
      <Stat label="Avg" value={stats.avg} />
      <Stat label="Max" value={stats.max} />
      <Stat label="Now" value={now} strong />
    </div>
  );
}

function Stat({ label, value, strong }: { label: string; value: number | undefined; strong?: boolean }) {
  return (
    <div className={`simui-history-stat${strong ? ' is-now' : ''}`}>
      <span className="simui-history-stat-k">{label}</span>
      <span className="simui-history-stat-v num">{value != null ? fmtStat(value) : '—'}</span>
    </div>
  );
}

function fmtStat(n: number): string {
  if (Math.abs(n) >= 100) return Math.round(n).toLocaleString();
  return (Math.round(n * 10) / 10).toString();
}

/* ════════════════════════════════════════════════════════════════════════════
 * Attribute history (§4.2) — graph a numeric ATTRIBUTE (brightness / position …).
 * Builds a single-series Expandable-style sheet around the fetched attribute
 * points and renders an inline spark; smart-click expands to the full chart.
 * (We can't pass an attribute to ExpandableChart's auto-built entity spec, so the
 * attribute case owns its own small inline spark + the shared full chart on tap.)
 * ════════════════════════════════════════════════════════════════════════════ */

function AttributeHistory({
  entityId,
  attr,
  accent,
  band,
  name,
}: {
  entityId: string;
  attr: string;
  accent?: string;
  band?: MetricBand;
  name?: string;
}) {
  const entity = useEntity(entityId);
  const points = useValueHistory(entityId, attr, BAND_WINDOW);

  if (!entity) return null;
  const liveNum = Number.parseFloat(String(entity.attributes[attr]));
  const hasData = points.length >= 2 || Number.isFinite(liveNum);
  if (!hasData) return null;

  return (
    <div className="simui-history simui-history-attr">
      <InlineSpark points={points} accent={accent ?? 'var(--warm)'} band={band} label={name ?? prettyState(attr)} />
      <NumericStats entityId={entityId} attr={attr} window={BAND_WINDOW} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 * State band (§4.3) — a stepped, state-coloured horizontal track for categorical /
 * on-off histories. Self-contained fetch (string states), no lightweight-charts.
 * ════════════════════════════════════════════════════════════════════════════ */

interface StatePoint {
  t: number;
  state: string;
}

function StateBand({ entityId, accent }: { entityId: string; accent?: string }) {
  const segments = useStateHistory(entityId, BAND_WINDOW);
  const entity = useEntity(entityId);
  const [hover, setHover] = useState<{ x: number; seg: StateBandSeg } | null>(null);

  const built = useMemo(() => buildSegments(segments, entity?.state), [segments, entity?.state]);
  if (!built || built.segs.length === 0) return null;

  const { segs, start, end } = built;
  const span = Math.max(1, end - start);

  return (
    <div className="simui-history simui-history-band-wrap">
      <div
        className="simui-history-band"
        role="img"
        aria-label="State timeline"
        onMouseLeave={() => setHover(null)}
      >
        {segs.map((seg, i) => {
          const left = ((seg.from - start) / span) * 100;
          const width = ((seg.to - seg.from) / span) * 100;
          const style: CSSProperties = {
            left: `${left}%`,
            width: `${width}%`,
            background: colorForState(seg.state, accent),
          };
          return (
            <button
              key={i}
              type="button"
              className="simui-history-seg"
              style={style}
              aria-label={`${prettyState(seg.state)} from ${fmtClock(seg.from)}`}
              onMouseEnter={(e) =>
                setHover({ x: e.currentTarget.offsetLeft + e.currentTarget.offsetWidth / 2, seg })
              }
              onFocus={() =>
                setHover({ x: left + width / 2, seg })
              }
            />
          );
        })}
      </div>
      <div className="simui-history-band-axis num">
        <span>{fmtClock(start)}</span>
        <span>{fmtClock(end)}</span>
      </div>
      {hover && (
        <div className="simui-history-band-readout num" aria-live="polite">
          <span className="simui-history-band-dot" style={{ background: colorForState(hover.seg.state, accent) }} />
          {prettyState(hover.seg.state)} · {fmtClock(hover.seg.from)}
        </div>
      )}
    </div>
  );
}

interface StateBandSeg {
  state: string;
  from: number;
  to: number;
}

function buildSegments(
  points: StatePoint[],
  liveState: string | undefined,
): { segs: StateBandSeg[]; start: number; end: number } | null {
  if (!points.length) return null;
  const sorted = [...points].sort((a, b) => a.t - b.t);
  const start = sorted[0].t;
  const end = Date.now();
  const segs: StateBandSeg[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const from = sorted[i].t;
    const to = i + 1 < sorted.length ? sorted[i + 1].t : end;
    if (to <= from) continue;
    const prev = segs[segs.length - 1];
    if (prev && prev.state === sorted[i].state) prev.to = to;
    else segs.push({ state: sorted[i].state, from, to });
  }
  // Stretch the final segment to "now" using the live state if it changed.
  if (liveState && segs.length) {
    const last = segs[segs.length - 1];
    if (last.state !== liveState) segs.push({ state: liveState, from: last.to, to: end });
    else last.to = end;
  }
  return segs.length ? { segs, start, end } : null;
}

/* ── A tiny inline spark for the attribute case (mirrors MetricSpark's SVG). ── */

function InlineSpark({
  points,
  accent,
  band,
  label,
}: {
  points: { t: number; v: number }[];
  accent: string;
  band?: MetricBand;
  label: string;
}) {
  const values = points.map((p) => p.v);
  if (values.length < 2) {
    return <div className="simui-history-spark is-empty" aria-hidden="true" />;
  }
  const W = 280;
  const H = 56;
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const pad = (hi - lo || Math.abs(hi) || 1) * 0.12;
  const min = lo - pad;
  const max = hi + pad;
  const span = max - min || 1;
  const step = W / (values.length - 1);
  const y = (v: number) => H - ((v - min) / span) * H;
  const line = values.map((v, i) => `${(i * step).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `0,${H} ${line} ${W},${H}`;
  const gid = `hp-${label.replace(/\W+/g, '')}`;

  return (
    <svg
      className="simui-history-spark"
      width="100%"
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`${label} history`}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {band && bandRect(band, y, H, W)}
      <polygon points={area} fill={`url(#${gid})`} stroke="none" />
      <polyline
        points={line}
        fill="none"
        stroke={accent}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function bandRect(band: MetricBand, y: (v: number) => number, H: number, W: number): ReactNode {
  const top = band.max != null ? Math.max(0, Math.min(H, y(band.max))) : 0;
  const bottom = band.min != null ? Math.max(0, Math.min(H, y(band.min))) : H;
  const h = Math.max(0, bottom - top);
  if (h <= 0.5) return null;
  return <rect className="simui-history-spark-band" x="0" y={top.toFixed(1)} width={W} height={h.toFixed(1)} />;
}

/* ════════════════════════════════════════════════════════════════════════════
 * Self-contained history fetches (mirror useHistory's discipline: request
 * superseding, identity-stable deps, clean empty return offline). These are kept
 * local so HistoryPane works whether or not the §4 sibling hooks land; they can
 * later be swapped for `useAttributeHistory` / `useStateHistory` without changing
 * this component's surface.
 * ════════════════════════════════════════════════════════════════════════════ */

interface RawHistRow {
  s?: string;
  state?: string;
  lu?: number;
  last_updated?: string | number;
  a?: Record<string, unknown>;
  attributes?: Record<string, unknown>;
}

function rowTime(row: RawHistRow): number | null {
  const lu = row.lu ?? row.last_updated;
  let t: number;
  if (typeof lu === 'number') t = lu < 1e12 ? lu * 1000 : lu;
  else if (typeof lu === 'string') t = Date.parse(lu);
  else return null;
  return Number.isFinite(t) ? t : null;
}

function windowMs(w: HistoryWindow): number {
  const hour = 3_600_000;
  return w.unit === 'd' ? w.value * 24 * hour : w.value * hour;
}

/**
 * Numeric history of the STATE (attr undefined) or a numeric ATTRIBUTE. When `attr`
 * is set, the request keeps attributes (drops `no_attributes`) and projects
 * `row.a[attr]`. Synthesises nothing offline — returns `[]` so the stats strip and
 * attribute spark simply omit (the chart's own `useHistory` handles synth for the
 * state-line case).
 */
function useValueHistory(entityId: string, attr: string | undefined, window: HistoryWindow): { t: number; v: number }[] {
  const source = useHassSource();
  const [points, setPoints] = useState<{ t: number; v: number }[]>([]);
  const reqRef = useRef(0);
  const winKey = `${window.value}${window.unit}`;

  useEffect(() => {
    const conn = source.connection;
    if (!conn) {
      setPoints([]);
      return;
    }
    const req = ++reqRef.current;
    const end = new Date();
    const start = new Date(end.getTime() - windowMs(window));
    conn
      .sendMessagePromise<Record<string, RawHistRow[] | undefined>>({
        type: 'history/history_during_period',
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        entity_ids: [entityId],
        minimal_response: !attr,
        no_attributes: !attr,
        significant_changes_only: false,
      })
      .then((res) => {
        if (req !== reqRef.current) return;
        const rows = res?.[entityId] ?? [];
        const out: { t: number; v: number }[] = [];
        for (const row of rows) {
          const t = rowTime(row);
          if (t == null) continue;
          const raw = attr
            ? (row.a ?? row.attributes)?.[attr]
            : row.s ?? row.state;
          const v = Number.parseFloat(String(raw));
          if (Number.isFinite(v)) out.push({ t, v });
        }
        setPoints(out);
      })
      .catch(() => {
        if (req === reqRef.current) setPoints([]);
      });
  }, [source, entityId, attr, winKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return points;
}

/** String-state transitions over the window (band mode). Empty offline. */
function useStateHistory(entityId: string, window: HistoryWindow): StatePoint[] {
  const source = useHassSource();
  const [points, setPoints] = useState<StatePoint[]>([]);
  const reqRef = useRef(0);
  const winKey = `${window.value}${window.unit}`;

  useEffect(() => {
    const conn = source.connection;
    if (!conn) {
      setPoints([]);
      return;
    }
    const req = ++reqRef.current;
    const end = new Date();
    const start = new Date(end.getTime() - windowMs(window));
    conn
      .sendMessagePromise<Record<string, RawHistRow[] | undefined>>({
        type: 'history/history_during_period',
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        entity_ids: [entityId],
        minimal_response: true,
        no_attributes: true,
        significant_changes_only: false,
      })
      .then((res) => {
        if (req !== reqRef.current) return;
        const rows = res?.[entityId] ?? [];
        const out: StatePoint[] = [];
        for (const row of rows) {
          const t = rowTime(row);
          const state = row.s ?? row.state;
          if (t != null && state != null && state !== '') out.push({ t, state: String(state) });
        }
        setPoints(out);
      })
      .catch(() => {
        if (req === reqRef.current) setPoints([]);
      });
  }, [source, entityId, winKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return points;
}

/* ── State → colour (monochrome base + one accent; state colour only, §9). ── */

const ON_STATES = new Set(['on', 'open', 'home', 'cleaning', 'playing', 'heat', 'cool', 'detected', 'active']);
const OFF_STATES = new Set(['off', 'closed', 'not_home', 'away', 'idle', 'docked', 'paused', 'standby']);

function colorForState(state: string, accent?: string): string {
  const s = state.toLowerCase();
  if (ON_STATES.has(s)) return accent ?? 'var(--accent)';
  if (OFF_STATES.has(s)) return 'var(--faint)';
  if (s === 'unavailable' || s === 'unknown') return 'var(--faint)';
  // Any other discrete state (zones, custom options): a muted neutral.
  return 'var(--muted)';
}

function fmtClock(t: number): string {
  const d = new Date(t);
  const now = Date.now();
  // Within 24h → HH:MM; older → day label.
  if (now - t < 24 * 3_600_000) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}
