// Climate category surface (PRESETS.md §3) — controllers, not read-outs.
// Hero master + per-zone feature tiles (mode + setpoint inline) + a comfort trend.
//
// Degradation: one thermostat → just the hero. No extra zones → drop the zone
// group. No numeric temperature history → drop the chart.
//
// Note on features: mode + setpoint controls are a *Tile* concern (FRAMEWORK.md
// §1), not a Block field — the climate tile renderer inlines `climate-hvac-modes`
// + `target-temperature` for any climate entity it draws. This builder only
// chooses the entities and their placement; the controls follow automatically.
import type { ChartSeries, ChartSpec } from '../types';
import type { HassEntity } from '../../types';
import type { PresetContext, Surface, RegistryMeta } from './index';
import { blockId, ofDomain, isLive, isNumericSensor, leafName, isPrimary } from './index';
import { friendly } from '../../util';

/** Pick the "whole-home" thermostat: a named master/main/home zone, else the first. */
function pickMaster(climates: HassEntity[]): HassEntity {
  const named = climates.find((e) => /master|whole|home|main|house|hvac/i.test(friendly(e)));
  return named ?? climates[0];
}

/** Temperature-bearing entities usable for the comfort trend. */
function trendSeries(
  states: PresetContext['states'],
  climates: HassEntity[],
  registry?: RegistryMeta,
): ChartSeries[] {
  const series: ChartSeries[] = [];
  // Prefer dedicated temperature sensors; fall back to the climates themselves.
  // Curation gate (TODO Tier A): skip diagnostic/hidden temperature telemetry.
  const tempSensors = Object.values(states)
    .filter(
      (e) =>
        isNumericSensor(e) &&
        e.attributes.device_class === 'temperature' &&
        isPrimary(e.entity_id, e, registry),
    )
    .slice(0, 4);
  for (const e of tempSensors) {
    series.push({ entity: e.entity_id, name: leafName(e), fill: 'line', strokeWidth: 2 });
  }
  if (!series.length) {
    for (const c of climates.slice(0, 3)) {
      series.push({ entity: c.entity_id, name: leafName(c), fill: 'line', strokeWidth: 2 });
    }
  }
  return series;
}

export function buildClimate(ctx: PresetContext): Surface {
  const { states, registry } = ctx;
  const climates = ofDomain(states, 'climate', registry).filter(isLive);
  const humidifiers = ofDomain(states, 'humidifier', registry).filter(isLive);

  const surface: Surface = { blocks: [] };
  if (!climates.length && !humidifiers.length) return surface;

  surface.statusStrip = [
    {
      kind: 'count',
      icon: 'thermostat',
      label: 'active',
      accent: 'accent',
      source: {
        include: [
          { domain: 'climate', state: 'heat' },
          { domain: 'climate', state: 'cool' },
          { domain: 'climate', state: 'heat_cool' },
        ],
        hideWhenEmpty: false,
      },
    },
  ];

  if (climates.length) {
    const master = pickMaster(climates);

    // 1. Whole-home / zone HeroBlock — the large master controller.
    surface.blocks.push({
      id: blockId('climate-hero'),
      type: 'hero',
      title: leafName(master),
      entityIds: [master.entity_id],
      span: 'full',
    });

    // 2. Per-zone GroupBlock — a feature-control tile per remaining zone.
    const zones = climates.filter((c) => c.entity_id !== master.entity_id);
    if (zones.length) {
      surface.blocks.push({
        id: blockId('climate-zones'),
        type: 'group',
        title: 'Zones',
        axis: 'function',
        entityIds: zones.map((z) => z.entity_id),
        span: 2,
      });
    }
  }

  // Humidifiers (if present) as their own small group.
  if (humidifiers.length) {
    surface.blocks.push({
      id: blockId('climate-humidifier'),
      type: 'group',
      title: 'Humidity',
      axis: 'function',
      entityIds: humidifiers.map((h) => h.entity_id),
      span: 1,
    });
  }

  // 4. ChartBlock closer — comfort trend (72h). Drop when nothing chartable.
  const series = trendSeries(states, climates, registry);
  if (series.length) {
    const chart: ChartSpec = {
      title: 'Temperature trend',
      window: { value: 72, unit: 'h' },
      bucket: 'hour',
      reducer: 'mean',
      backend: 'history',
      header: { showCurrent: true, colorize: true },
      axes: [{ id: 'temp' }],
      series: series.map((s) => ({ ...s, axisId: 'temp' })),
      // Comfort band (~19–24°C) — value-banded coloring per FRAMEWORK.md §5.
      thresholds: [
        { value: 19, color: 'var(--up)' },
        { value: 24, color: 'var(--warn)' },
      ],
    };
    surface.blocks.push({
      id: blockId('climate-chart'),
      type: 'chart',
      title: 'Temperature trend',
      entityIds: series.map((s) => s.entity),
      span: 'full',
      chart,
    });
  }

  return surface;
}
