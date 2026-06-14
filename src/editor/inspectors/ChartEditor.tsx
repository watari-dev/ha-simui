// ChartEditor — the chart-block history config (Inspector enrichment module).
//
// A TradingView-grade editor for a ChartBlock's `ChartSpec`: title, range window,
// header readout, a per-series list (name / accent / line-or-area fill / axis side)
// with a live numeric-series add, a right-axis toggle, and value-banded thresholds.
//
// CONTROLLED + store-free: takes `ChartSpec | undefined` (undefined ⇒ a sensible
// blank spec is materialised for editing) plus a live states snapshot, and emits the
// full next ChartSpec via onChange. The integrator renders this for a chart-block
// selection in place of the block's generic settings.

import { useMemo, useState } from 'react';
import './ChartEditor.css';
import { Plus, X } from 'lucide-react';
import { SubField, SubSection, SubSegmented, SubCheck } from './controls';
import { SUB_COLOR_TOKENS } from './controls';
import type { ChartSpec, ChartSeries } from '../types';
import type { HassEntities } from '../../types';

function domainOf(entityId: string): string {
  return entityId.split('.')[0] ?? '';
}
function friendlyOf(states: HassEntities, entityId: string): string {
  return (states[entityId]?.attributes.friendly_name as string | undefined) || entityId;
}

const RIGHT_AXIS_ID = 'right';
const LEFT_AXIS_ID = 'left';

// A compact swatch palette for series colours — stored as the CSS string a series
// expects (ChartSeries.color is a raw colour string, not a token).
const SERIES_COLORS: { css: string; label: string }[] = SUB_COLOR_TOKENS.filter(
  (c) => c.token !== 'none',
).map((c) => ({ css: c.css, label: c.label }));

export interface ChartEditorProps {
  chart: ChartSpec | undefined;
  states: HassEntities;
  onChange: (next: ChartSpec) => void;
}

export function ChartEditor({ chart, states, onChange }: ChartEditorProps) {
  const spec: ChartSpec = chart ?? {
    window: { value: 24, unit: 'h' },
    header: { showCurrent: true, colorize: true },
    axes: [{ id: LEFT_AXIS_ID }],
    series: [],
  };

  const hasRightAxis = spec.axes.some((a) => a.id === RIGHT_AXIS_ID);

  const setWindow = (value: number, unit: 'h' | 'd') =>
    onChange({ ...spec, window: { value, unit } });

  const updateSeries = (entity: string, patch: Partial<ChartSeries>) =>
    onChange({
      ...spec,
      series: spec.series.map((s) => (s.entity === entity ? { ...s, ...patch } : s)),
    });

  const removeSeries = (entity: string) =>
    onChange({ ...spec, series: spec.series.filter((s) => s.entity !== entity) });

  const addSeries = (entity: string) =>
    onChange({ ...spec, series: [...spec.series, { entity, fill: 'line', axisId: LEFT_AXIS_ID }] });

  const toggleRightAxis = (on: boolean) => {
    if (on) {
      onChange({
        ...spec,
        axes: [...spec.axes.filter((a) => a.id !== RIGHT_AXIS_ID), { id: RIGHT_AXIS_ID, opposite: true }],
      });
    } else {
      onChange({
        ...spec,
        axes: spec.axes.filter((a) => a.id !== RIGHT_AXIS_ID),
        // Re-home any series that pointed at the right axis.
        series: spec.series.map((s) =>
          s.axisId === RIGHT_AXIS_ID ? { ...s, axisId: LEFT_AXIS_ID } : s,
        ),
      });
    }
  };

  return (
    <>
      <SubSection first>
        <SubField label="Chart title">
          <input
            className="simui-isub-input"
            placeholder="Optional headline"
            value={spec.title ?? ''}
            onChange={(e) => onChange({ ...spec, title: e.target.value || undefined })}
          />
        </SubField>
        <SubField label="Range">
          <SubSegmented
            options={[
              { value: '24h', label: '24h' },
              { value: '7d', label: '7d' },
              { value: '30d', label: '30d' },
            ]}
            value={`${spec.window.value}${spec.window.unit}`}
            onChange={(w) => {
              if (w === '24h') setWindow(24, 'h');
              else if (w === '7d') setWindow(7, 'd');
              else setWindow(30, 'd');
            }}
          />
        </SubField>
      </SubSection>

      <SubSection head="Header readout">
        <SubCheck
          checked={spec.header.showCurrent}
          onChange={(checked) =>
            onChange({ ...spec, header: { ...spec.header, showCurrent: checked } })
          }
        >
          Show the current value
        </SubCheck>
        <SubCheck
          style={{ marginTop: 9 }}
          checked={spec.header.colorize}
          onChange={(checked) =>
            onChange({ ...spec, header: { ...spec.header, colorize: checked } })
          }
        >
          Tint it by the series colour
        </SubCheck>
        <SubCheck
          style={{ marginTop: 9 }}
          checked={hasRightAxis}
          onChange={toggleRightAxis}
        >
          Add a second (right-hand) value scale
        </SubCheck>
      </SubSection>

      <SubSection head="Series" count={spec.series.length}>
        {spec.series.length === 0 ? (
          <p className="simui-isub-hint">No series yet — add a numeric entity below.</p>
        ) : (
          <div className="simui-isub-chart-series">
            {spec.series.map((s) => (
              <SeriesRow
                key={s.entity}
                series={s}
                label={s.name || friendlyOf(states, s.entity)}
                hasRightAxis={hasRightAxis}
                onUpdate={(patch) => updateSeries(s.entity, patch)}
                onRemove={() => removeSeries(s.entity)}
              />
            ))}
          </div>
        )}
        <AddSeries states={states} existing={spec.series} onAdd={addSeries} />
      </SubSection>

      <SubSection head="Thresholds">
        <ThresholdEditor
          thresholds={spec.thresholds ?? []}
          onChange={(thresholds) =>
            onChange({ ...spec, thresholds: thresholds.length ? thresholds : undefined })
          }
        />
      </SubSection>
    </>
  );
}

// ── one series row: swatch · name · fill · axis · remove ───────────────────────

function SeriesRow({
  series,
  label,
  hasRightAxis,
  onUpdate,
  onRemove,
}: {
  series: ChartSeries;
  label: string;
  hasRightAxis: boolean;
  onUpdate: (patch: Partial<ChartSeries>) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(false);
  const swatch = series.color || 'var(--accent, #5b8cff)';

  return (
    <div className="simui-isub-chart-srow">
      <div className="simui-isub-chart-shead">
        <button
          type="button"
          className="simui-isub-chart-swatch"
          style={{ '--sw': swatch } as React.CSSProperties}
          aria-label="Series colour"
          onClick={() => setOpen((v) => !v)}
        />
        <span className="simui-isub-chart-sname" title={series.entity}>
          {label}
        </span>
        <button
          type="button"
          className="simui-isub-chart-fill"
          onClick={() => onUpdate({ fill: series.fill === 'area' ? 'line' : 'area' })}
        >
          {series.fill === 'area' ? 'Area' : 'Line'}
        </button>
        {hasRightAxis && (
          <button
            type="button"
            className="simui-isub-chart-axis"
            title="Which value scale this series uses"
            onClick={() => onUpdate({ axisId: series.axisId === RIGHT_AXIS_ID ? LEFT_AXIS_ID : RIGHT_AXIS_ID })}
          >
            {series.axisId === RIGHT_AXIS_ID ? 'R' : 'L'}
          </button>
        )}
        <button
          type="button"
          className="simui-isub-chart-x"
          aria-label="Remove series"
          onClick={onRemove}
        >
          <X size={14} strokeWidth={2} />
        </button>
      </div>

      {open && (
        <div className="simui-isub-chart-spop">
          <SubField label="Name">
            <input
              className="simui-isub-input"
              placeholder={series.entity}
              value={series.name ?? ''}
              onChange={(e) => onUpdate({ name: e.target.value || undefined })}
            />
          </SubField>
          <div className="simui-isub-chart-cols">
            <button
              type="button"
              className={`simui-isub-chart-col none${!series.color ? ' active' : ''}`}
              title="Auto palette"
              aria-label="Auto palette colour"
              onClick={() => onUpdate({ color: undefined })}
            />
            {SERIES_COLORS.map((c) => (
              <button
                key={c.css}
                type="button"
                className={`simui-isub-chart-col${series.color === c.css ? ' active' : ''}`}
                style={{ '--sw': c.css } as React.CSSProperties}
                title={c.label}
                aria-label={c.label}
                onClick={() => onUpdate({ color: c.css })}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── add a numeric series ───────────────────────────────────────────────────────

function AddSeries({
  states,
  existing,
  onAdd,
}: {
  states: HassEntities;
  existing: ChartSeries[];
  onAdd: (entity: string) => void;
}) {
  const [q, setQ] = useState('');
  const matches = useMemo(() => {
    if (!q.trim()) return [];
    const have = new Set(existing.map((s) => s.entity));
    const query = q.toLowerCase();
    return Object.values(states)
      .filter((e) => domainOf(e.entity_id) === 'sensor' || e.attributes.unit_of_measurement)
      .filter((e) => !have.has(e.entity_id))
      .filter(
        (e) =>
          e.entity_id.toLowerCase().includes(query) ||
          ((e.attributes.friendly_name as string | undefined) ?? '').toLowerCase().includes(query),
      )
      .slice(0, 6);
  }, [q, states, existing]);

  return (
    <div className="simui-isub-chart-add">
      <input
        className="simui-isub-input"
        placeholder="Add a numeric series…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {matches.length > 0 && (
        <div className="simui-isub-chart-results">
          {matches.map((e) => {
            const unit = e.attributes.unit_of_measurement as string | undefined;
            return (
              <button
                key={e.entity_id}
                type="button"
                className="simui-isub-chart-result"
                onClick={() => {
                  onAdd(e.entity_id);
                  setQ('');
                }}
              >
                <Plus size={14} strokeWidth={2} className="simui-isub-chart-result-plus" />
                <div className="simui-isub-chart-result-text">
                  <span className="simui-isub-chart-result-name">
                    {(e.attributes.friendly_name as string | undefined) ?? e.entity_id}
                  </span>
                  <span className="simui-isub-chart-result-id">{e.entity_id}</span>
                </div>
                <span className="simui-isub-chart-result-val">
                  {e.state}
                  {unit ? ` ${unit}` : ''}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── thresholds (value-banded line colouring) ──────────────────────────────────

function ThresholdEditor({
  thresholds,
  onChange,
}: {
  thresholds: { value: number; color: string }[];
  onChange: (next: { value: number; color: string }[]) => void;
}) {
  const [val, setVal] = useState('');
  const add = () => {
    const n = Number(val);
    if (val.trim() === '' || Number.isNaN(n)) return;
    onChange([...thresholds, { value: n, color: 'var(--warn, #f0a84b)' }].sort((a, b) => a.value - b.value));
    setVal('');
  };

  return (
    <>
      {thresholds.length > 0 && (
        <div className="simui-isub-chart-series">
          {thresholds.map((t, i) => (
            <div className="simui-isub-chart-thresh" key={`${t.value}-${i}`}>
              <span
                className="simui-isub-chart-swatch"
                style={{ '--sw': t.color } as React.CSSProperties}
              />
              <span className="simui-isub-chart-tval">≥ {t.value}</span>
              <button
                type="button"
                className="simui-isub-chart-x"
                style={{ marginLeft: 'auto' }}
                aria-label="Remove threshold"
                onClick={() => onChange(thresholds.filter((_, j) => j !== i))}
              >
                <X size={14} strokeWidth={2} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="simui-isub-chart-threshadd">
        <input
          className="simui-isub-input num"
          type="number"
          placeholder="At value…"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') add();
          }}
        />
        <button
          type="button"
          className="simui-isub-btn compact"
          disabled={val.trim() === '' || Number.isNaN(Number(val))}
          aria-label="Add threshold"
          onClick={add}
        >
          <Plus size={15} strokeWidth={2} />
        </button>
      </div>
    </>
  );
}
