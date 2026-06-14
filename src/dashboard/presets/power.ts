// Power category surface (PRESETS.md §5) — answers Energy-vs-Power by MERGING:
// generation and consumption on one chart (FRAMEWORK.md §5 dual-axis). Then a
// per-circuit sparkline wall, then outlets/GPOs.
//
// Degradation: no per-circuit metering → just the flow chart (whole-home draw +
// solar). No solar → single-series consumption. No battery → drop that series.
import type { Block, ChartAxis, ChartSeries, ChartSpec } from '../types';
import type { HassEntity } from '../../types';
import type { PresetContext, Surface } from './index';
import { blockId, isLive, leafName, isPrimary } from './index';
import { domainOf, friendly } from '../../util';

const POWER_UNITS = new Set(['W', 'kW']);
const ENERGY_UNITS = new Set(['Wh', 'kWh', 'MWh']);

function isPowerLike(e: HassEntity): boolean {
  if (domainOf(e.entity_id) !== 'sensor' || !isLive(e)) return false;
  const dc = e.attributes.device_class as string | undefined;
  const unit = e.attributes.unit_of_measurement as string | undefined;
  return dc === 'power' || dc === 'energy' || (!!unit && (POWER_UNITS.has(unit) || ENERGY_UNITS.has(unit)));
}

function matchName(e: HassEntity, rx: RegExp): boolean {
  return rx.test(`${e.entity_id} ${friendly(e)}`);
}

/** Classify a power/energy sensor into a role for the merged flow chart. */
type Role = 'solar' | 'load' | 'battery' | 'grid' | 'circuit';
function roleOf(e: HassEntity): Role {
  if (matchName(e, /sol(ar)?|pv|generation|inverter/i)) return 'solar';
  if (matchName(e, /batt(ery)?|soc|state_of_charge/i)) return 'battery';
  if (matchName(e, /grid|import|export|mains|utility/i)) return 'grid';
  if (matchName(e, /house|home|total|load|consumption|whole/i)) return 'load';
  return 'circuit';
}

export function buildPower(ctx: PresetContext): Surface {
  const { states, registry } = ctx;
  // Curation gate (TODO Tier A): exclude diagnostic/hidden power telemetry before
  // roles are assigned. Pattern-only when `registry` is absent (dev/mock).
  const primary = (e: HassEntity) => isPrimary(e.entity_id, e, registry);
  const powerSensors = Object.values(states).filter((e) => isPowerLike(e) && primary(e));

  const surface: Surface = { blocks: [] };
  if (!powerSensors.length) return surface;

  const byRole = new Map<Role, HassEntity[]>();
  for (const e of powerSensors) {
    const r = roleOf(e);
    let arr = byRole.get(r);
    if (!arr) { arr = []; byRole.set(r, arr); }
    arr.push(e);
  }
  const solar = byRole.get('solar') ?? [];
  const battery = byRole.get('battery') ?? [];
  const grid = byRole.get('grid') ?? [];
  // Prefer an explicit whole-home load; else the largest non-circuit reading.
  const load = byRole.get('load') ?? [];
  const circuits = byRole.get('circuit') ?? [];
  // The live flow object + chart want an INSTANTANEOUS power (W/kW) load — a cumulative
  // "Total Energy" kWh sensor (which also matches the load role) is not a flow value.
  const loadPick =
    load.find((e) => {
      const u = e.attributes.unit_of_measurement as string | undefined;
      return e.attributes.device_class === 'power' || u === 'W' || u === 'kW';
    }) ?? load[0];

  // Battery state-of-charge (a `%` battery sensor) — not a power reading, so it sits
  // outside `powerSensors`. The flow object renders it as the battery fill.
  const socEntity = Object.values(states).find(
    (e) =>
      domainOf(e.entity_id) === 'sensor' &&
      isLive(e) &&
      primary(e) &&
      e.attributes.unit_of_measurement === '%' &&
      (e.attributes.device_class === 'battery' || matchName(e, /charge|state_of_charge|soc/i)),
  );

  // The shared `roleOf` lacks a `site`/`mains` grid alias (e.g. Tesla's
  // `sensor.powerwall_site_now`), so such a feed lands in `circuits`. Recover it for
  // the flow object without disturbing the chart's role buckets.
  const gridEntity =
    grid[0] ?? circuits.find((e) => matchName(e, /grid|site|mains|utility|feed/i));

  // 0. Powerwall-style flow object — only for a REAL energy system (solar plus a
  // battery and/or grid feed). A lone consumption sensor isn't worth a diagram, so
  // most homes (no solar/battery) emit nothing here and fall straight to the chart.
  if (solar.length && (battery.length || gridEntity || socEntity)) {
    const flowIds: string[] = [];
    if (solar.length) flowIds.push(solar[0].entity_id);
    if (loadPick) flowIds.push(loadPick.entity_id);
    if (gridEntity) flowIds.push(gridEntity.entity_id);
    if (battery.length) flowIds.push(battery[0].entity_id);
    if (socEntity) flowIds.push(socEntity.entity_id);
    surface.blocks.push({
      id: blockId('power-flow-object'),
      type: 'card',
      title: 'Energy flow',
      entityIds: flowIds,
      span: 'full',
      // The novel-card seam (BlockChrome routes a `type:'card'` block with this flag
      // to <EnergyFlow>). Explicit role assignment removes any classifier ambiguity;
      // batterySoc names the `%` fill sensor.
      options: {
        energyFlow: true,
        solar: solar[0]?.entity_id,
        load: loadPick?.entity_id,
        grid: gridEntity?.entity_id,
        battery: battery[0]?.entity_id,
        batterySoc: socEntity?.entity_id,
      },
    } as Block);
  }

  // StatusStrip: live whole-home draw + solar (status tiles read the value live).
  const strip: Surface['statusStrip'] = [];
  if (loadPick) strip.push({ kind: 'status', entityId: loadPick.entity_id, stateContent: ['state'] });
  if (solar.length) strip.push({ kind: 'status', entityId: solar[0].entity_id, stateContent: ['state'] });
  if (battery.length) strip.push({ kind: 'status', entityId: battery[0].entity_id, stateContent: ['state'] });
  if (strip.length) surface.statusStrip = strip;

  // 1. Flow ChartBlock — solar (area) under load (line); battery on opposite axis.
  const series: ChartSeries[] = [];
  if (solar.length) {
    series.push({ entity: solar[0].entity_id, name: leafName(solar[0]), fill: 'area', color: 'var(--up)', opacity: 0.25, strokeWidth: 2, axisId: 'power' });
  }
  const loadEntity = loadPick ?? grid[0];
  if (loadEntity) {
    series.push({ entity: loadEntity.entity_id, name: leafName(loadEntity), fill: 'line', color: 'var(--warn)', strokeWidth: 2, axisId: 'power' });
  }
  if (battery.length) {
    series.push({ entity: battery[0].entity_id, name: leafName(battery[0]), fill: 'line', color: 'var(--accent)', strokeWidth: 1, axisId: 'battery' });
  }

  if (series.length) {
    const axes: ChartAxis[] = [{ id: 'power' }];
    if (battery.length) axes.push({ id: 'battery', min: 0, max: 100, opposite: true });
    const chart: ChartSpec = {
      title: 'Power flow',
      window: { value: 24, unit: 'h' },
      bucket: 'hour',
      reducer: 'mean',
      backend: 'history',
      header: { showCurrent: true, colorize: true },
      axes,
      series,
    };
    surface.blocks.push({
      id: blockId('power-flow'),
      type: 'chart',
      title: 'Power flow',
      entityIds: series.map((s) => s.entity),
      span: 'full',
      chart,
    });
  }

  // 2. Per-circuit sparkline wall — densest TradingView-feeling pattern.
  if (circuits.length) {
    surface.blocks.push({
      id: blockId('power-circuits'),
      type: 'group',
      title: 'Circuits',
      axis: 'metrics', // → per-circuit MetricSpark wall (Phase 2, I7)
      entityIds: circuits.map((e) => e.entity_id),
      span: 2,
    });
  }

  // 3. Outlets / GPOs (if present) — toggle tiles grouped by function.
  const outlets = Object.values(states).filter(
    (e) =>
      (domainOf(e.entity_id) === 'switch' || domainOf(e.entity_id) === 'input_boolean') &&
      isLive(e) &&
      primary(e) &&
      (e.attributes.device_class === 'outlet' || matchName(e, /outlet|plug|gpo|socket/i)),
  );
  if (outlets.length) {
    surface.blocks.push({
      id: blockId('power-outlets'),
      type: 'group',
      title: 'Outlets',
      axis: 'function',
      entityIds: outlets.map((e) => e.entity_id),
      span: 1,
    });
  }

  return surface;
}
