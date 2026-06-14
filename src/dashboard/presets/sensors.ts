// Sensors category surface (PRESETS.md §4) — split by data type, not forced into
// one shape. Numeric → sparkline tiles grouped by measured quantity; binary →
// status tiles grouped by class/floor; overview charts lead when there's volume.
//
// Degradation: a handful of sensors → skip the overview charts and emit one
// combined group. Each numeric quantity with members becomes its own sparkline
// group; binary classes collapse into a single status group when sparse.
import type { Block, ChartSeries, ChartSpec } from '../types';
import type { HassEntity } from '../../types';
import type { PresetContext, Surface } from './index';
import { blockId, isLive, isNumericSensor, leafName, groupByRoom, isPrimary } from './index';
import { domainOf } from '../../util';

const OVERVIEW_MIN = 8; // fewer numeric sensors than this → skip overview charts

// Measured-quantity buckets, keyed by device_class, with a display heading and a
// matcher fallback on unit when the class is missing.
const QUANTITIES: Array<{ key: string; title: string; classes: string[]; units?: string[] }> = [
  { key: 'temperature', title: 'Temperature', classes: ['temperature'], units: ['°C', '°F'] },
  { key: 'humidity', title: 'Humidity', classes: ['humidity'], units: ['%'] },
  { key: 'air', title: 'Air quality', classes: ['pm25', 'pm10', 'pm1', 'co2', 'carbon_dioxide', 'volatile_organic_compounds', 'aqi', 'nitrogen_dioxide', 'ozone'] },
  { key: 'pressure', title: 'Pressure', classes: ['pressure', 'atmospheric_pressure'] },
  { key: 'illuminance', title: 'Light level', classes: ['illuminance'] },
  { key: 'battery', title: 'Battery', classes: ['battery'] },
  { key: 'signal', title: 'Signal', classes: ['signal_strength'] },
];

function quantityOf(e: HassEntity): { key: string; title: string } | undefined {
  const dc = e.attributes.device_class as string | undefined;
  const unit = e.attributes.unit_of_measurement as string | undefined;
  for (const q of QUANTITIES) {
    if (dc && q.classes.includes(dc)) return { key: q.key, title: q.title };
    if (!dc && unit && q.units?.includes(unit)) return { key: q.key, title: q.title };
  }
  return undefined;
}

function colorForQuantity(key: string): string | undefined {
  // Stable per-quantity identity across charts (FRAMEWORK.md §4 closing note).
  switch (key) {
    case 'temperature': return 'var(--warn)';
    case 'humidity': return 'var(--accent)';
    case 'air': return 'var(--up)';
    default: return undefined;
  }
}

export function buildSensors(ctx: PresetContext): Surface {
  const { states, areas, registry } = ctx;
  // Curation gate (TODO Tier A): sensors are the worst noise vector — diagnostic
  // battery/RSSI/linkquality/signal-strength entities flood here. Drop them before
  // bucketing. Pattern-only when `registry` is absent (dev/mock).
  const primary = (e: HassEntity) => isPrimary(e.entity_id, e, registry);
  const numeric = Object.values(states).filter((e) => isNumericSensor(e) && primary(e));
  const binary = Object.values(states).filter(
    (e) => domainOf(e.entity_id) === 'binary_sensor' && isLive(e) && primary(e),
  );

  const surface: Surface = { blocks: [] };
  if (!numeric.length && !binary.length) return surface;

  surface.statusStrip = [
    {
      kind: 'count',
      icon: 'alert-triangle',
      label: 'active',
      accent: 'warn',
      source: {
        include: [
          { domain: 'binary_sensor', state: 'on' },
        ],
        exclude: [{ name: '*connectivity*' }],
        hideWhenEmpty: false,
      },
    },
  ];

  // Bucket numeric sensors by measured quantity; the rest fall to a misc group.
  const byQuantity = new Map<string, { title: string; ents: HassEntity[] }>();
  const misc: HassEntity[] = [];
  for (const e of numeric) {
    const q = quantityOf(e);
    if (!q) { misc.push(e); continue; }
    let bucket = byQuantity.get(q.key);
    if (!bucket) { bucket = { title: q.title, ents: [] }; byQuantity.set(q.key, bucket); }
    bucket.ents.push(e);
  }

  // 1. Overview ChartBlock(s) — only with enough numeric volume to be worth it.
  if (numeric.length >= OVERVIEW_MIN) {
    const overviewKeys = ['temperature', 'humidity', 'air'];
    for (const key of overviewKeys) {
      const bucket = byQuantity.get(key);
      if (!bucket || bucket.ents.length < 2) continue;
      surface.blocks.push(overviewChart(bucket.title, key, bucket.ents.slice(0, 6)));
    }
  }

  // 2. Numeric GroupBlocks — grouped by quantity; each member a sparkline tile.
  //    Heading carries the quantity, the tile name carries the room/leaf.
  for (const q of QUANTITIES) {
    const bucket = byQuantity.get(q.key);
    if (!bucket || !bucket.ents.length) continue;
    surface.blocks.push({
      id: blockId(`sensors-${q.key}`),
      type: 'group',
      title: bucket.title,
      axis: 'metrics', // → MetricSpark data-viz wall (Phase 2, I6)
      entityIds: bucket.ents.map((e) => e.entity_id),
      span: 2,
    });
  }

  if (misc.length) {
    surface.blocks.push({
      id: blockId('sensors-misc'),
      type: 'list',
      title: 'Other measurements',
      axis: 'none',
      entityIds: misc.map((e) => e.entity_id),
      span: 1,
    });
  }

  // 3. Binary GroupBlocks — grouped by room/source; status tiles with recency.
  if (binary.length) {
    // Sparse → one combined group; otherwise split by room.
    if (binary.length <= 6) {
      surface.blocks.push(binaryList('Status', binary.map((e) => e.entity_id)));
    } else {
      for (const [room, ents] of groupByRoom(binary, areas)) {
        surface.blocks.push(binaryList(room, ents.map((e) => e.entity_id)));
      }
    }
  }

  return surface;
}

function overviewChart(title: string, key: string, ents: HassEntity[]): Block {
  const color = colorForQuantity(key);
  const series: ChartSeries[] = ents.map((e, i) => ({
    entity: e.entity_id,
    name: leafName(e),
    fill: 'line',
    strokeWidth: 2,
    // First series gets the quantity's identity color; rest use the auto-palette.
    color: i === 0 ? color : undefined,
    axisId: 'main',
  }));
  const chart: ChartSpec = {
    title,
    window: { value: 48, unit: 'h' },
    bucket: 'hour',
    reducer: 'mean',
    backend: 'history',
    header: { showCurrent: true, colorize: true },
    axes: [{ id: 'main' }],
    series,
  };
  return {
    id: blockId(`sensors-overview-${key}`),
    type: 'chart',
    title,
    entityIds: ents.map((e) => e.entity_id),
    span: 'full',
    chart,
  };
}

function binaryList(title: string, entityIds: string[]): Block {
  return {
    id: blockId('sensors-binary'),
    type: 'list',
    title,
    axis: 'room',
    entityIds,
    span: 1,
  };
}
