// Inspector — the per-selection block/tile config editor (SPEC_EDITOR.md §inspector).
//
// A CONTROLLED component: it receives the selected block (and tile, when a leaf is
// selected) plus a live entity snapshot, and emits granular patches via callbacks. It
// never touches the store — the parent applies `onBlockChange` / `onTileChange` through
// the editor actions, so undo/commit semantics live in one place (editor/store).
//
// Rendering switches on `selection.kind`:
//   • tile  → the tile form  (name / icon / colour / orientation / features / actions)
//   • block → the block form (title / span / type-specific options / members)
//   • none  → an empty hint
//
// Layout (CSS): a right-rail on desktop, a bottom sheet on phone (DESIGN_PRINCIPLES §14).
// Co-located styles in ./Inspector.css. Per the fan-out rules this file imports the
// editor contracts from ./types and nothing from the global stylesheet.

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Copy,
  Trash2,
  Plus,
  X,
  Search,
  Maximize2,
  type LucideIcon,
} from 'lucide-react';
import * as Lucide from 'lucide-react';
import './Inspector.css';
import type {
  InspectorProps,
  BlockConfig,
  TileConfig,
  ColorToken,
  HassAction,
  ActionMap,
  TileFeature,
  GroupAxis,
  BlockSpan,
  ChartSpec,
  ChartSeries,
  ListSource,
} from './types';
import type { HassEntities, HassEntity } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Small local helpers (kept self-contained; mirror ../util semantics).
// ─────────────────────────────────────────────────────────────────────────────

function domainOf(entityId: string): string {
  return entityId.split('.')[0] ?? '';
}

function friendlyOf(states: HassEntities, entityId: string): string {
  const e = states[entityId];
  return (e?.attributes.friendly_name as string | undefined) || entityId;
}

const COLOR_TOKENS: { token: ColorToken; css: string; label: string }[] = [
  { token: 'none', css: 'transparent', label: 'Auto (monochrome)' },
  { token: 'warm', css: 'var(--warm, #ffb267)', label: 'Warm' },
  { token: 'cool', css: 'var(--accent, #5b8cff)', label: 'Cool' },
  { token: 'accent', css: 'var(--accent, #5b8cff)', label: 'Accent' },
  { token: 'warn', css: 'var(--warn, #f0a84b)', label: 'Warn' },
  { token: 'up', css: 'var(--up, #3fd08a)', label: 'Up' },
  { token: 'down', css: 'var(--down, #f0735e)', label: 'Down' },
  { token: 'violet', css: '#a78bfa', label: 'Violet' },
  { token: 'cyan', css: '#22d3ee', label: 'Cyan' },
  { token: 'pink', css: '#f472b6', label: 'Pink' },
  { token: 'green', css: '#4ade80', label: 'Green' },
  { token: 'teal', css: '#2dd4bf', label: 'Teal' },
  { token: 'slate', css: '#94a3b8', label: 'Slate' },
  { token: 'primary', css: 'var(--text, #edeef2)', label: 'Primary' },
];

// A curated lucide subset for the icon picker — the glyphs that read for home
// devices. Resolved from the lucide-react namespace by PascalCase name; the stored
// value is lucide's own kebab name (e.g. 'lightbulb') so it round-trips with the rest
// of the app (components/icons.tsx). Keep this list legible, not exhaustive.
const ICON_CHOICES: { name: string; comp: LucideIcon }[] = (() => {
  const wanted: [string, string][] = [
    ['lightbulb', 'Lightbulb'],
    ['lamp', 'Lamp'],
    ['sun', 'Sun'],
    ['moon', 'Moon'],
    ['thermometer', 'Thermometer'],
    ['flame', 'Flame'],
    ['snowflake', 'Snowflake'],
    ['fan', 'Fan'],
    ['wind', 'Wind'],
    ['droplet', 'Droplet'],
    ['gauge', 'Gauge'],
    ['activity', 'Activity'],
    ['zap', 'Zap'],
    ['plug', 'Plug'],
    ['power', 'Power'],
    ['battery', 'Battery'],
    ['blinds', 'Blinds'],
    ['door-open', 'DoorOpen'],
    ['door-closed', 'DoorClosed'],
    ['lock', 'Lock'],
    ['lock-open', 'LockOpen'],
    ['shield', 'Shield'],
    ['shield-alert', 'ShieldAlert'],
    ['bell', 'Bell'],
    ['camera', 'Camera'],
    ['video', 'Video'],
    ['tv', 'Tv'],
    ['cast', 'Cast'],
    ['speaker', 'Speaker'],
    ['music', 'Music'],
    ['volume-2', 'Volume2'],
    ['play', 'Play'],
    ['home', 'Home'],
    ['sofa', 'Sofa'],
    ['bed', 'Bed'],
    ['bath', 'Bath'],
    ['utensils', 'Utensils'],
    ['car', 'Car'],
    ['server', 'Server'],
    ['cpu', 'Cpu'],
    ['hard-drive', 'HardDrive'],
    ['wifi', 'Wifi'],
    ['router', 'Router'],
    ['cloud', 'Cloud'],
    ['cloud-rain', 'CloudRain'],
    ['umbrella', 'Umbrella'],
    ['leaf', 'Leaf'],
    ['sprout', 'Sprout'],
    ['trees', 'Trees'],
    ['sparkles', 'Sparkles'],
    ['star', 'Star'],
    ['heart', 'Heart'],
    ['user', 'User'],
    ['users', 'Users'],
    ['map-pin', 'MapPin'],
    ['clock', 'Clock'],
    ['calendar', 'Calendar'],
    ['settings', 'Settings'],
    ['sliders-horizontal', 'SlidersHorizontal'],
    ['toggle-right', 'ToggleRight'],
    ['alert-triangle', 'AlertTriangle'],
    ['alert-octagon', 'AlertOctagon'],
    ['box', 'Box'],
    ['circle-dot', 'CircleDot'],
  ];
  const ns = Lucide as unknown as Record<string, LucideIcon | undefined>;
  return wanted
    .map(([name, pascal]) => ({ name, comp: ns[pascal] }))
    .filter((x): x is { name: string; comp: LucideIcon } => Boolean(x.comp));
})();

const ICON_BY_NAME = new Map(ICON_CHOICES.map((c) => [c.name, c.comp]));

function IconGlyph({ name, size = 18 }: { name?: string; size?: number }) {
  const Comp = (name && ICON_BY_NAME.get(name)) || Lucide.CircleDot;
  return <Comp size={size} strokeWidth={2} />;
}

// The six block kinds expose different option forms; this drives the section list.
const SPANS: { value: BlockSpan; label: string }[] = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 'full', label: 'Full' },
];

const AXES: { value: GroupAxis; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'room', label: 'Room' },
  { value: 'floor', label: 'Floor' },
  { value: 'function', label: 'Function' },
  { value: 'device-class', label: 'Class' },
  { value: 'metrics', label: 'Metrics' },
];

const ACTION_KINDS: { value: HassAction['action']; label: string }[] = [
  { value: 'more-info', label: 'Open details' },
  { value: 'toggle', label: 'Toggle' },
  { value: 'navigate', label: 'Navigate' },
  { value: 'url', label: 'Open URL' },
  { value: 'call-service', label: 'Call service' },
  { value: 'none', label: 'Do nothing' },
];

// Which features are offerable, keyed by the dominant domain of the block's members
// (FRAMEWORK.md §1). A small curated menu, not every HA capability.
const FEATURE_MENU: Record<string, { feature: TileFeature; label: string }[]> = {
  cover: [{ feature: { type: 'cover-open-close' }, label: 'Open / close' }],
  climate: [
    { feature: { type: 'target-temperature' }, label: 'Target temperature' },
    { feature: { type: 'climate-hvac-modes', modes: [] }, label: 'HVAC modes' },
    { feature: { type: 'climate-fan-modes' }, label: 'Fan modes' },
  ],
  fan: [
    { feature: { type: 'fan-speed' }, label: 'Fan speed' },
    { feature: { type: 'fan-oscillate' }, label: 'Oscillate' },
  ],
  lock: [{ feature: { type: 'lock-commands' }, label: 'Lock / unlock' }],
  alarm_control_panel: [{ feature: { type: 'alarm-modes', modes: [] }, label: 'Alarm modes' }],
};

export function dominantDomain(entityIds: string[]): string | undefined {
  const counts = new Map<string, number>();
  for (const id of entityIds) {
    const d = domainOf(id);
    counts.set(d, (counts.get(d) ?? 0) + 1);
  }
  let best: string | undefined;
  let max = 0;
  for (const [d, n] of counts) {
    if (n > max) {
      max = n;
      best = d;
    }
  }
  return best;
}

// ─────────────────────────────────────────────────────────────────────────────
// Inspector
// ─────────────────────────────────────────────────────────────────────────────

export function Inspector({
  selection,
  block,
  tile,
  states,
  onBlockChange,
  onTileChange,
  onAddEntities,
  onRemoveEntity,
  onDuplicate,
  onRemove,
  onClose,
}: InspectorProps) {
  if (selection.kind === 'none' || !block) {
    return (
      <aside className="simui-insp" role="complementary" aria-label="Inspector">
        <Header kicker="Inspector" title="Nothing selected" onClose={onClose} />
        <div className="simui-insp-empty">
          Select a card to edit its title, layout and contents — or a tile inside it to
          tweak that entity.
        </div>
      </aside>
    );
  }

  const isTile = selection.kind === 'tile';
  const entityId = selection.kind === 'tile' ? selection.entityId : undefined;

  return (
    <aside className="simui-insp" role="complementary" aria-label="Inspector">
      <Header
        kicker={isTile ? 'Tile' : `${block.type} card`}
        title={
          isTile
            ? (tile?.name ?? friendlyOf(states, entityId!))
            : (block.title || `${block.type} card`)
        }
        onClose={onClose}
      />

      <div className="simui-insp-body">
        {isTile && entityId ? (
          <TileForm
            entityId={entityId}
            entity={states[entityId]}
            tile={tile ?? {}}
            onTileChange={onTileChange}
          />
        ) : (
          <BlockForm
            block={block}
            states={states}
            onBlockChange={onBlockChange}
            onAddEntities={onAddEntities}
            onRemoveEntity={onRemoveEntity}
          />
        )}
      </div>

      <footer className="simui-insp-footer">
        <div className="simui-insp-footer-row">
          <button className="simui-insp-btn ghost" onClick={onDuplicate}>
            <Copy size={15} strokeWidth={2} />
            Duplicate
          </button>
          <button className="simui-insp-btn danger" onClick={onRemove}>
            <Trash2 size={15} strokeWidth={2} />
            Remove
          </button>
        </div>
      </footer>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────────────────────────────────────

function Header({
  kicker,
  title,
  onClose,
}: {
  kicker: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <header className="simui-insp-head">
      <div className="simui-insp-head-text">
        <span className="simui-insp-kicker">{kicker}</span>
        <span className="simui-insp-title" title={title}>
          {title}
        </span>
      </div>
      <button className="simui-insp-close" onClick={onClose} aria-label="Close inspector">
        <X size={16} strokeWidth={2} />
      </button>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Block form — title, span, type-specific options, members
// ─────────────────────────────────────────────────────────────────────────────

function BlockForm({
  block,
  states,
  onBlockChange,
  onAddEntities,
  onRemoveEntity,
}: {
  block: BlockConfig;
  states: HassEntities;
  onBlockChange: (patch: Partial<BlockConfig>) => void;
  onAddEntities: () => void;
  onRemoveEntity: (entityId: string) => void;
}) {
  // Type-specific knobs may live either on the block directly (legacy Block fields) or
  // inside `options` (the editor bag). Read with a fallback, write to the canonical
  // field so the renderer keeps working.
  const axis: GroupAxis = block.options?.axis ?? block.axis ?? 'none';
  const source: ListSource | undefined = block.options?.source ?? block.source;
  const chart: ChartSpec | undefined = block.options?.chart ?? block.chart;

  return (
    <>
      <section className="simui-insp-section">
        <Field label="Title">
          <input
            className="simui-insp-input"
            placeholder="Section heading (optional)"
            value={block.title ?? ''}
            onChange={(e) => onBlockChange({ title: e.target.value || undefined })}
          />
        </Field>
        <Field label="Width">
          <Segmented
            options={SPANS}
            value={block.span}
            onChange={(span) => onBlockChange({ span })}
          />
        </Field>
      </section>

      {block.type === 'group' && (
        <section className="simui-insp-section">
          <div className="simui-insp-section-head">Group</div>
          <Field label="Group members by">
            <Segmented
              wrap
              options={AXES}
              value={axis}
              onChange={(a) => onBlockChange({ axis: a, options: { ...block.options, axis: a } })}
            />
          </Field>
        </section>
      )}

      {block.type === 'list' && (
        <ListSourceEditor
          source={source}
          states={states}
          onChange={(next) =>
            onBlockChange({ source: next, options: { ...block.options, source: next } })
          }
        />
      )}

      {block.type === 'chart' && (
        <ChartEditor
          chart={chart}
          states={states}
          onChange={(next) =>
            onBlockChange({ chart: next, options: { ...block.options, chart: next } })
          }
        />
      )}

      {/* Members — every block type except a pure dynamic list edits its explicit
          membership here. A list driven by a source still shows its pinned ids. */}
      {block.type !== 'chart' && (
        <section className="simui-insp-section">
          <div className="simui-insp-section-head">
            Members
            <span className="simui-insp-hint" style={{ marginTop: 0 }}>
              {block.entityIds.length}
            </span>
          </div>
          <Members
            entityIds={block.entityIds}
            states={states}
            onRemove={onRemoveEntity}
          />
          <button
            className="simui-insp-btn"
            onClick={onAddEntities}
            style={{ marginTop: block.entityIds.length ? 10 : 0 }}
          >
            <Plus size={15} strokeWidth={2} />
            Add entities…
          </button>
        </section>
      )}
    </>
  );
}

function Members({
  entityIds,
  states,
  onRemove,
}: {
  entityIds: string[];
  states: HassEntities;
  onRemove: (entityId: string) => void;
}) {
  if (entityIds.length === 0) {
    return <div className="simui-insp-hint">No entities yet — add some below.</div>;
  }
  return (
    <div className="simui-insp-members">
      {entityIds.map((id) => (
        <div className="simui-insp-member" key={id}>
          <span style={{ color: 'var(--muted, #8a909c)', display: 'inline-flex', flex: 'none' }}>
            <IconGlyph size={15} />
          </span>
          <div className="simui-insp-member-text">
            <span className="simui-insp-member-name">{friendlyOf(states, id)}</span>
            <span className="simui-insp-member-id">{id}</span>
          </div>
          <button
            className="simui-insp-member-x"
            onClick={() => onRemove(id)}
            aria-label={`Remove ${id}`}
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ── list source matchers + live "resolves to N" ───────────────────────────────

function ListSourceEditor({
  source,
  states,
  onChange,
}: {
  source: ListSource | undefined;
  states: HassEntities;
  onChange: (next: ListSource) => void;
}) {
  const include = source?.include ?? [];
  // Edit the first include matcher's domain + state as the common case; advanced
  // multi-matcher editing is a later pass. Keeps the 90% path one-glance.
  const first = include[0] ?? {};

  const setMatcher = (patch: Partial<typeof first>) => {
    const next: ListSource = {
      include: [{ ...first, ...patch }, ...include.slice(1)],
      ...(source?.exclude ? { exclude: source.exclude } : {}),
      ...(source?.sort ? { sort: source.sort } : {}),
      ...(source?.wrap ? { wrap: source.wrap } : {}),
      ...(source?.hideWhenEmpty != null ? { hideWhenEmpty: source.hideWhenEmpty } : {}),
      ...(source?.includeNoise != null ? { includeNoise: source.includeNoise } : {}),
    };
    onChange(next);
  };

  const resolved = useMemo(
    () => resolveCount(states, source),
    [states, source],
  );

  const domains = useMemo(() => {
    const set = new Set<string>();
    for (const id of Object.keys(states)) set.add(domainOf(id));
    return [...set].sort();
  }, [states]);

  return (
    <section className="simui-insp-section">
      <div className="simui-insp-section-head">
        Live list
        <span className="simui-insp-hint" style={{ marginTop: 0 }}>
          resolves to {resolved}
        </span>
      </div>
      <Field label="Domain">
        <select
          className="simui-insp-select"
          value={first.domain ?? ''}
          onChange={(e) => setMatcher({ domain: e.target.value || undefined })}
        >
          <option value="">Any</option>
          {domains.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </Field>
      <div className="simui-insp-row">
        <Field label="State equals">
          <input
            className="simui-insp-input"
            placeholder="e.g. on"
            value={typeof first.state === 'string' ? first.state : ''}
            onChange={(e) => setMatcher({ state: e.target.value || undefined })}
          />
        </Field>
        <Field label="Area">
          <input
            className="simui-insp-input"
            placeholder="any"
            value={first.area ?? ''}
            onChange={(e) => setMatcher({ area: e.target.value || undefined })}
          />
        </Field>
      </div>
      <Field label="Name matches">
        <input
          className="simui-insp-input"
          placeholder="glob on friendly name, e.g. *pico*"
          value={first.name ?? ''}
          onChange={(e) => setMatcher({ name: e.target.value || undefined })}
        />
      </Field>
      <Field label="Layout">
        <Segmented
          options={[
            { value: 'rows' as const, label: 'Rows' },
            { value: 'tiles' as const, label: 'Tiles' },
          ]}
          value={source?.wrap ?? 'rows'}
          onChange={(wrap) => onChange({ ...source, include, wrap })}
        />
      </Field>
      <label className="simui-insp-check" style={{ marginTop: 10 }}>
        <input
          type="checkbox"
          checked={source?.hideWhenEmpty ?? true}
          onChange={(e) => onChange({ ...source, include, hideWhenEmpty: e.target.checked })}
        />
        Hide when empty
      </label>
    </section>
  );
}

/** Live count of how many entities the source's first matcher resolves to. */
function resolveCount(states: HassEntities, source: ListSource | undefined): number {
  if (!source || source.include.length === 0) return 0;
  const matchers = source.include;
  let n = 0;
  for (const id of Object.keys(states)) {
    const e = states[id];
    const ok = matchers.some((m) => {
      if (m.domain && domainOf(id) !== m.domain) return false;
      if (m.entityId && !globMatch(m.entityId, id)) return false;
      if (m.state) {
        const want = Array.isArray(m.state) ? m.state : [m.state];
        if (!want.includes(e.state)) return false;
      }
      if (m.name) {
        const fn = (e.attributes.friendly_name as string | undefined) ?? id;
        if (!globMatch(m.name, fn)) return false;
      }
      return true;
    });
    if (ok) n++;
  }
  return n;
}

function globMatch(pattern: string, value: string): boolean {
  if (!pattern.includes('*')) return value.toLowerCase().includes(pattern.toLowerCase());
  const re = new RegExp(
    '^' + pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$',
    'i',
  );
  return re.test(value);
}

// ── chart series / window / thresholds ────────────────────────────────────────

function ChartEditor({
  chart,
  states,
  onChange,
}: {
  chart: ChartSpec | undefined;
  states: HassEntities;
  onChange: (next: ChartSpec) => void;
}) {
  const spec: ChartSpec =
    chart ?? {
      window: { value: 24, unit: 'h' },
      header: { showCurrent: true, colorize: true },
      axes: [{ id: 'left' }],
      series: [],
    };

  const setWindow = (value: number, unit: 'h' | 'd') =>
    onChange({ ...spec, window: { value, unit } });

  const removeSeries = (entity: string) =>
    onChange({ ...spec, series: spec.series.filter((s) => s.entity !== entity) });

  const toggleFill = (entity: string) =>
    onChange({
      ...spec,
      series: spec.series.map((s) =>
        s.entity === entity ? { ...s, fill: s.fill === 'area' ? 'line' : 'area' } : s,
      ),
    });

  return (
    <>
      <section className="simui-insp-section">
        <div className="simui-insp-section-head">Chart</div>
        <Field label="Title">
          <input
            className="simui-insp-input"
            placeholder="Chart title (optional)"
            value={spec.title ?? ''}
            onChange={(e) => onChange({ ...spec, title: e.target.value || undefined })}
          />
        </Field>
        <Field label="Window">
          <Segmented
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
        </Field>
        <label className="simui-insp-check">
          <input
            type="checkbox"
            checked={spec.header.showCurrent}
            onChange={(e) =>
              onChange({ ...spec, header: { ...spec.header, showCurrent: e.target.checked } })
            }
          />
          Show current value in header
        </label>
        <label className="simui-insp-check" style={{ marginTop: 9 }}>
          <input
            type="checkbox"
            checked={spec.header.colorize}
            onChange={(e) =>
              onChange({ ...spec, header: { ...spec.header, colorize: e.target.checked } })
            }
          />
          Colorize header value
        </label>
      </section>

      <section className="simui-insp-section">
        <div className="simui-insp-section-head">
          Series
          <span className="simui-insp-hint" style={{ marginTop: 0 }}>
            {spec.series.length}
          </span>
        </div>
        {spec.series.length === 0 ? (
          <div className="simui-insp-hint">No series yet — add one below.</div>
        ) : (
          <div className="simui-insp-members">
            {spec.series.map((s) => (
              <div className="simui-insp-series" key={s.entity}>
                <span
                  className="simui-insp-series-swatch"
                  style={{ '--sw': s.color || 'var(--accent, #5b8cff)' } as React.CSSProperties}
                />
                <span className="simui-insp-series-name" title={s.entity}>
                  {s.name || friendlyOf(states, s.entity)}
                </span>
                <button
                  className="simui-insp-feat simui-insp-series-fill"
                  onClick={() => toggleFill(s.entity)}
                >
                  {s.fill === 'area' ? 'Area' : 'Line'}
                </button>
                <button
                  className="simui-insp-member-x"
                  onClick={() => removeSeries(s.entity)}
                  aria-label={`Remove ${s.entity}`}
                >
                  <X size={14} strokeWidth={2} />
                </button>
              </div>
            ))}
          </div>
        )}
        <AddSeries states={states} existing={spec.series} onAdd={(entity) =>
          onChange({ ...spec, series: [...spec.series, { entity, fill: 'line' }] })
        } />
      </section>

      <section className="simui-insp-section">
        <div className="simui-insp-section-head">Thresholds</div>
        <ThresholdEditor
          thresholds={spec.thresholds ?? []}
          onChange={(thresholds) =>
            onChange({ ...spec, thresholds: thresholds.length ? thresholds : undefined })
          }
        />
      </section>
    </>
  );
}

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
          e.entity_id.includes(query) ||
          ((e.attributes.friendly_name as string | undefined) ?? '').toLowerCase().includes(query),
      )
      .slice(0, 6);
  }, [q, states, existing]);

  return (
    <div style={{ marginTop: 10 }}>
      <div className="simui-insp-iconfield" style={{ gap: 0 }}>
        <input
          className="simui-insp-input"
          placeholder="Add a numeric series…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      {matches.length > 0 && (
        <div className="simui-insp-members" style={{ marginTop: 6 }}>
          {matches.map((e) => (
            <button
              key={e.entity_id}
              className="simui-insp-member"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              onClick={() => {
                onAdd(e.entity_id);
                setQ('');
              }}
            >
              <span style={{ color: 'var(--muted, #8a909c)', display: 'inline-flex' }}>
                <Plus size={14} strokeWidth={2} />
              </span>
              <div className="simui-insp-member-text">
                <span className="simui-insp-member-name">
                  {(e.attributes.friendly_name as string | undefined) ?? e.entity_id}
                </span>
                <span className="simui-insp-member-id">{e.entity_id}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ThresholdEditor({
  thresholds,
  onChange,
}: {
  thresholds: { value: number; color: string }[];
  onChange: (next: { value: number; color: string }[]) => void;
}) {
  const [val, setVal] = useState('');
  return (
    <>
      {thresholds.length > 0 && (
        <div className="simui-insp-members">
          {thresholds.map((t, i) => (
            <div className="simui-insp-series" key={`${t.value}-${i}`}>
              <span
                className="simui-insp-series-swatch"
                style={{ '--sw': t.color } as React.CSSProperties}
              />
              <span className="simui-insp-series-name num" style={{ fontVariantNumeric: 'tabular-nums' }}>
                ≥ {t.value}
              </span>
              <button
                className="simui-insp-member-x"
                style={{ marginLeft: 'auto' }}
                onClick={() => onChange(thresholds.filter((_, j) => j !== i))}
                aria-label="Remove threshold"
              >
                <X size={14} strokeWidth={2} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="simui-insp-row" style={{ marginTop: thresholds.length ? 10 : 0 }}>
        <Field label="At value">
          <input
            className="simui-insp-input num"
            type="number"
            placeholder="0"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </Field>
        <button
          className="simui-insp-btn"
          style={{ width: 'auto', flex: 'none' }}
          disabled={val.trim() === '' || Number.isNaN(Number(val))}
          onClick={() => {
            const n = Number(val);
            if (Number.isNaN(n)) return;
            onChange([...thresholds, { value: n, color: 'var(--warn, #f0a84b)' }]);
            setVal('');
          }}
        >
          <Plus size={15} strokeWidth={2} />
        </button>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tile form — name, icon, colour, orientation, features, actions
// ─────────────────────────────────────────────────────────────────────────────

function TileForm({
  entityId,
  entity,
  tile,
  onTileChange,
}: {
  entityId: string;
  entity: HassEntity | undefined;
  tile: TileConfig;
  onTileChange: (patch: Partial<TileConfig>) => void;
}) {
  const domain = domainOf(entityId);
  const fallbackName =
    (entity?.attributes.friendly_name as string | undefined) ?? entityId;

  return (
    <>
      <section className="simui-insp-section">
        <Field label="Name">
          <input
            className="simui-insp-input"
            placeholder={fallbackName}
            value={tile.name ?? ''}
            onChange={(e) => onTileChange({ name: e.target.value || undefined })}
          />
        </Field>
        <Field label="Icon">
          <IconPicker
            value={tile.icon}
            onChange={(icon) => onTileChange({ icon })}
          />
        </Field>
        <Field label="Layout">
          <Segmented
            options={[
              { value: 'horizontal' as const, label: 'Row' },
              { value: 'vertical' as const, label: 'Mini' },
            ]}
            value={tile.orientation ?? 'horizontal'}
            onChange={(orientation) =>
              onTileChange({ orientation: orientation === 'horizontal' ? undefined : orientation })
            }
          />
        </Field>
      </section>

      <section className="simui-insp-section">
        <div className="simui-insp-section-head">Colour</div>
        <Swatches
          value={tile.color ?? 'none'}
          onChange={(color) => onTileChange({ color: color === 'none' ? undefined : color })}
        />
      </section>

      <section className="simui-insp-section">
        <div className="simui-insp-section-head">State line</div>
        <label className="simui-insp-check">
          <input
            type="checkbox"
            checked={!tile.hideState}
            onChange={(e) => onTileChange({ hideState: e.target.checked ? undefined : true })}
          />
          Show state
        </label>
      </section>

      {FEATURE_MENU[domain] && (
        <section className="simui-insp-section">
          <div className="simui-insp-section-head">Controls</div>
          <FeatureEditor
            domain={domain}
            features={tile.features ?? []}
            onChange={(features) =>
              onTileChange({ features: features.length ? features : undefined })
            }
          />
        </section>
      )}

      <section className="simui-insp-section">
        <div className="simui-insp-section-head">Actions</div>
        <ActionsEditor
          actions={tile.actions ?? {}}
          domain={domain}
          onChange={(actions) =>
            onTileChange({
              actions: Object.keys(actions).length ? actions : undefined,
            })
          }
        />
      </section>
    </>
  );
}

function FeatureEditor({
  domain,
  features,
  onChange,
}: {
  domain: string;
  features: TileFeature[];
  onChange: (next: TileFeature[]) => void;
}) {
  const menu = FEATURE_MENU[domain] ?? [];
  const has = (t: TileFeature['type']) => features.some((f) => f.type === t);
  const toggle = (feature: TileFeature) => {
    if (has(feature.type)) onChange(features.filter((f) => f.type !== feature.type));
    else onChange([...features, feature]);
  };
  return (
    <div className="simui-insp-feats">
      {menu.map((m) => (
        <button
          key={m.feature.type}
          className={`simui-insp-feat${has(m.feature.type) ? ' active' : ''}`}
          onClick={() => toggle(m.feature)}
        >
          {has(m.feature.type) ? (
            <span className="simui-insp-feat-x">
              <X size={12} strokeWidth={2.5} />
            </span>
          ) : (
            <Plus size={12} strokeWidth={2.5} />
          )}
          {m.label}
        </button>
      ))}
    </div>
  );
}

// ── actions: tap / iconTap / hold / doubleTap ─────────────────────────────────

const ACTION_SLOTS: { key: keyof ActionMap; label: string; icon: LucideIcon }[] = [
  { key: 'tap', label: 'Tap', icon: Lucide.Pointer },
  { key: 'iconTap', label: 'Icon tap', icon: Lucide.MousePointerClick },
  { key: 'hold', label: 'Hold / right-click', icon: Lucide.Hand },
  { key: 'doubleTap', label: 'Smart-click (expand)', icon: Maximize2 },
];

function ActionsEditor({
  actions,
  domain,
  onChange,
}: {
  actions: ActionMap;
  domain: string;
  onChange: (next: ActionMap) => void;
}) {
  const setSlot = (key: keyof ActionMap, action: HassAction | undefined) => {
    const next: ActionMap = { ...actions };
    if (action === undefined) delete next[key];
    else next[key] = action;
    onChange(next);
  };

  return (
    <div>
      {ACTION_SLOTS.map(({ key, label, icon: Icon }) => (
        <div className="simui-insp-action" key={key}>
          <div className="simui-insp-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon size={13} strokeWidth={2} />
            {label}
          </div>
          <ActionField
            value={actions[key]}
            domain={domain}
            onChange={(action) => setSlot(key, action)}
          />
        </div>
      ))}
    </div>
  );
}

function ActionField({
  value,
  domain,
  onChange,
}: {
  value: HassAction | undefined;
  domain: string;
  onChange: (next: HassAction | undefined) => void;
}) {
  // No stored value ⇒ "Default" (the domain default applies). Choosing a kind stores
  // an explicit action; choosing "Default" clears it again (absence = default).
  const current = value?.action ?? 'default';

  const setKind = (kind: string) => {
    if (kind === 'default') return onChange(undefined);
    switch (kind as HassAction['action']) {
      case 'navigate':
        return onChange({ action: 'navigate', path: '' });
      case 'url':
        return onChange({ action: 'url', url: '' });
      case 'call-service':
        return onChange({ action: 'call-service', service: '' });
      case 'toggle':
        return onChange({ action: 'toggle' });
      case 'more-info':
        return onChange({ action: 'more-info' });
      case 'none':
        return onChange({ action: 'none' });
    }
  };

  return (
    <>
      <select
        className="simui-insp-select"
        value={current}
        onChange={(e) => setKind(e.target.value)}
      >
        <option value="default">
          Default{domain ? ` (${domain})` : ''}
        </option>
        {ACTION_KINDS.map((k) => (
          <option key={k.value} value={k.value}>
            {k.label}
          </option>
        ))}
      </select>

      {value?.action === 'navigate' && (
        <div className="simui-insp-action-detail">
          <input
            className="simui-insp-input"
            placeholder="room/<id> · category/lights · home"
            value={value.path}
            onChange={(e) => onChange({ action: 'navigate', path: e.target.value })}
          />
        </div>
      )}
      {value?.action === 'url' && (
        <div className="simui-insp-action-detail">
          <input
            className="simui-insp-input"
            placeholder="https://…"
            value={value.url}
            onChange={(e) => onChange({ action: 'url', url: e.target.value })}
          />
        </div>
      )}
      {value?.action === 'call-service' && (
        <div className="simui-insp-action-detail">
          <input
            className="simui-insp-input"
            placeholder="domain.service — e.g. script.goodnight"
            value={value.service}
            onChange={(e) =>
              onChange({ action: 'call-service', service: e.target.value, data: value.data, target: value.target })
            }
          />
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Reusable controls
// ─────────────────────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="simui-insp-field">
      <label className="simui-insp-label">{label}</label>
      {children}
    </div>
  );
}

function Segmented<T extends string | number>({
  options,
  value,
  onChange,
  wrap,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  wrap?: boolean;
}) {
  return (
    <div className={`simui-insp-seg${wrap ? ' wrap' : ''}`} role="group">
      {options.map((o) => (
        <button
          key={String(o.value)}
          className={`simui-insp-seg-btn${o.value === value ? ' active' : ''}`}
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Swatches({
  value,
  onChange,
}: {
  value: ColorToken;
  onChange: (token: ColorToken) => void;
}) {
  return (
    <div className="simui-insp-swatches">
      {COLOR_TOKENS.map((c) => (
        <button
          key={c.token}
          className={`simui-insp-swatch${c.token === value ? ' active' : ''}${
            c.token === 'none' ? ' none' : ''
          }`}
          style={{ '--sw': c.css } as React.CSSProperties}
          title={c.label}
          aria-label={c.label}
          aria-pressed={c.token === value}
          onClick={() => onChange(c.token)}
        />
      ))}
    </div>
  );
}

function IconPicker({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (icon: string | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);

  // Outside click / Esc closes the popover.
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return ICON_CHOICES;
    return ICON_CHOICES.filter((c) => c.name.includes(query));
  }, [q]);

  return (
    <div ref={rootRef}>
      <div className="simui-insp-iconfield">
        <button
          type="button"
          className={`simui-insp-iconbtn${open ? ' open' : ''}`}
          aria-label="Choose icon"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <IconGlyph name={value} size={18} />
        </button>
        <input
          className="simui-insp-input"
          placeholder="Default by device type"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value || undefined)}
          onFocus={() => setOpen(true)}
        />
      </div>

      {open && (
        <div className="simui-insp-iconpop">
          <input
            className="simui-insp-iconsearch"
            placeholder="Search icons…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoFocus
          />
          <div className="simui-insp-icongrid">
            {filtered.length === 0 ? (
              <div className="simui-insp-iconempty">No icons match “{q}”.</div>
            ) : (
              filtered.map((c) => {
                const Comp = c.comp;
                return (
                  <button
                    key={c.name}
                    type="button"
                    className={`simui-insp-iconcell${c.name === value ? ' active' : ''}`}
                    title={c.name}
                    aria-label={c.name}
                    onClick={() => {
                      onChange(c.name);
                      setOpen(false);
                    }}
                  >
                    <Comp size={17} strokeWidth={2} />
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Re-export the helper marker so consumers know which icon name a tile yields without
// reaching into lucide directly (parallels components/icons.tsx semantics).
export { Search as InspectorSearchIcon };
