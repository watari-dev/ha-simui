// simUI — the EXTRA card-kind library (the CHOICE pillar of the gallery).
//
// The core gallery (`../cardKinds` / the registry's `CORE_CARD_KIND_DEFS`) ships
// only the five primitives — Group / List / Chart / Hero / Card. This module is the
// palette expansion: a rich set of preconfigured, immediately-renderable kinds so the
// "add a card" gallery feels like a real catalogue rather than five generic shells.
//
// Every kind is a plain `CardKind` (matching `../types` EXACTLY) whose `make(seed)`
// returns a fully-valid `BlockConfig` that renders without crashing when seeded from
// `buildPreviewContext` sample entities. Most reuse an EXISTING BlockType configured
// via knobs (axis / tile / source / chart / options). The four display-only kinds
// (stat / gauge / section / divider) keep the closed `BlockType` union intact: they
// serialise as `type: 'card'` and SELF-IDENTIFY via `options.cardType` (exactly the
// novel-card seam documented in registry.ts / SPEC_EXTENSIBILITY §1.4), rendered by
// the new `StatBlock` this module ships alongside (see INTEGRATION).
//
// Ordering: these are given intent through array position, but since `CardKind`
// carries no `order` field, the integrator merges them AFTER the core set
// (compose-first) — see INTEGRATION. Pure data + factories: no React, no side effects.

import { uid } from '../../util';
import type { BlockConfig, BlockOptions, CardKind } from '../types';

/**
 * The `options` knobs the StatBlock variants read. A structural superset of
 * `BlockOptions` (the novel-card seam): `cardType` routes the renderer, the rest are
 * StatBlock-specific. Cast through `statBlock()` so the authored literal stays valid
 * against `BlockConfig.options: BlockOptions` without growing that shared type.
 */
interface StatBlockOptions extends BlockOptions {
  cardType: 'stat' | 'gauge' | 'section' | 'divider';
  statVariant: 'stat' | 'gauge' | 'label' | 'divider';
  label?: string;
  sublabel?: string;
  spacer?: boolean;
  noRule?: boolean;
}

/** Build a display-only block (type:'card' + self-identifying options). */
function statBlock(span: BlockConfig['span'], entityIds: string[], options: StatBlockOptions, title?: string): BlockConfig {
  const block: BlockConfig = { id: uid(), type: 'card', entityIds, span, options: options as BlockOptions };
  if (title) block.title = title;
  return block;
}

// ─────────────────────────────────────────────────────────────────────────────
// Display-only kinds — serialise as `type: 'card'` + `options.cardType` (novel-card
// seam). StatBlock reads `options.statVariant` to pick its variant.
// ─────────────────────────────────────────────────────────────────────────────

const STAT_KINDS: CardKind[] = [
  {
    id: 'stat',
    type: 'card',
    label: 'Stat',
    icon: 'activity',
    defaultSpan: 1,
    domains: ['sensor', 'number', 'input_number'],
    description: 'A big tabular number — the glance-tier readout.',
    make: (seed) => statBlock(1, seed.slice(0, 1), { cardType: 'stat', statVariant: 'stat' }),
  },
  {
    id: 'gauge',
    type: 'card',
    label: 'Gauge',
    icon: 'gauge',
    defaultSpan: 1,
    domains: ['sensor', 'number', 'input_number'],
    description: 'A radial gauge for a bounded numeric value.',
    make: (seed) => statBlock(1, seed.slice(0, 1), { cardType: 'gauge', statVariant: 'gauge' }),
  },
  {
    id: 'section',
    type: 'card',
    label: 'Section label',
    icon: 'box',
    defaultSpan: 'full',
    description: 'A heading that orients a stretch of the surface.',
    make: () => statBlock('full', [], { cardType: 'section', statVariant: 'label', label: 'Section' }, 'Section'),
  },
  {
    id: 'divider',
    type: 'card',
    label: 'Divider',
    icon: 'box',
    defaultSpan: 'full',
    description: 'A hairline rule or spacer between blocks.',
    make: () => statBlock('full', [], { cardType: 'divider', statVariant: 'divider' }),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Composed kinds — reuse the EXISTING BlockTypes, configured via knobs. Each
// renders today with zero renderer changes (see the mapping note per kind).
// ─────────────────────────────────────────────────────────────────────────────

const COMPOSED_KINDS: CardKind[] = [
  // GroupBlock → SceneGroup path (all scene/script ids → one-tap activation tiles).
  {
    id: 'scenes',
    type: 'group',
    label: 'Scenes',
    icon: 'sparkles',
    defaultSpan: 'full',
    domains: ['scene', 'script'],
    description: 'A grid of one-tap scenes and scripts.',
    make: (seed) => ({ id: uid(), type: 'group', title: 'Scenes', entityIds: seed, span: 'full', axis: 'none' }),
  },
  // GroupBlock → SliderWall (tile:'slider') — drag-to-set wall for lights/covers/fans.
  {
    id: 'slider-wall',
    type: 'group',
    label: 'Sliders',
    icon: 'lightbulb',
    defaultSpan: 'full',
    domains: ['light', 'cover', 'fan'],
    description: 'A drag-to-set wall — the tile is the slider.',
    make: (seed) => ({ id: uid(), type: 'group', title: 'Lights', entityIds: seed, span: 'full', tile: 'slider' }),
  },
  // GroupBlock → MetricWall (axis:'metrics') — numeric sensors as MetricSpark cells.
  {
    id: 'metric-wall',
    type: 'group',
    label: 'Metrics wall',
    icon: 'activity',
    defaultSpan: 'full',
    domains: ['sensor'],
    description: 'A wall of sparkline metric cells; smart-click expands to a chart.',
    make: (seed) => ({ id: uid(), type: 'group', title: 'Metrics', entityIds: seed, span: 'full', axis: 'metrics' }),
  },
  // GroupBlock → GroupedRows (axis:'device-class') — sensors under measured-quantity heads.
  {
    id: 'sensors-by-class',
    type: 'group',
    label: 'Sensors by type',
    icon: 'activity',
    defaultSpan: 'full',
    domains: ['sensor', 'binary_sensor'],
    description: 'Sensors sub-grouped by what they measure.',
    make: (seed) => ({ id: uid(), type: 'group', title: 'Sensors', entityIds: seed, span: 'full', axis: 'device-class' }),
  },
  // GroupBlock → StatusBoard (tile:'statusboard') — presence-first squircle tiles.
  {
    id: 'security-board',
    type: 'group',
    label: 'Security board',
    icon: 'shield',
    defaultSpan: 'full',
    domains: ['binary_sensor', 'lock', 'cover'],
    description: 'A presence-first board of doors, locks and motion.',
    make: (seed) => ({ id: uid(), type: 'group', title: 'Security', entityIds: seed, span: 'full', tile: 'statusboard' }),
  },
  // CardBlock → ClimateTile (single climate entity).
  {
    id: 'climate-card',
    type: 'card',
    label: 'Climate',
    icon: 'thermostat',
    defaultSpan: 2,
    domains: ['climate'],
    description: 'A thermostat with mode + target controls.',
    make: (seed) => ({ id: uid(), type: 'card', entityIds: seed.slice(0, 1), span: 2 }),
  },
  // CardBlock → MediaPlayerTile (single media_player).
  {
    id: 'media-card',
    type: 'card',
    label: 'Media',
    icon: 'cast',
    defaultSpan: 2,
    domains: ['media_player'],
    description: 'Now-playing with transport controls.',
    make: (seed) => ({ id: uid(), type: 'card', entityIds: seed.slice(0, 1), span: 2 }),
  },
  // CardBlock → CameraTile (single camera).
  {
    id: 'camera-card',
    type: 'card',
    label: 'Camera',
    icon: 'box',
    defaultSpan: 2,
    domains: ['camera'],
    description: 'A live camera snapshot tile.',
    make: (seed) => ({ id: uid(), type: 'card', entityIds: seed.slice(0, 1), span: 2 }),
  },
  // HeroBlock generic-state path — a big state headline (alarm / lock / cover).
  {
    id: 'state-hero',
    type: 'hero',
    label: 'State hero',
    icon: 'shield',
    defaultSpan: 2,
    domains: ['alarm_control_panel', 'lock', 'cover'],
    description: 'A big state headline with its inline control strip.',
    make: (seed) => ({ id: uid(), type: 'hero', entityIds: seed.slice(0, 1), span: 2 }),
  },
  // AttentionStrip (attention) — "hide noise until it's signal" status pill.
  {
    id: 'status-strip',
    type: 'attention',
    label: 'Status strip',
    icon: 'shield',
    defaultSpan: 'full',
    domains: ['binary_sensor', 'lock', 'cover'],
    description: 'A pill that surfaces only what needs attention.',
    make: (seed) => ({ id: uid(), type: 'attention', entityIds: seed, span: 'full' }),
  },
  // ListBlock static (divided rows) — a compact multi-entity glance.
  {
    id: 'glance',
    type: 'list',
    label: 'Glance',
    icon: 'list',
    defaultSpan: 1,
    description: 'A compact, hairline-divided multi-entity glance.',
    make: (seed) => ({ id: uid(), type: 'list', title: 'Glance', entityIds: seed, span: 1 }),
  },
  // ListBlock dynamic (source) — auto-populating "what's on" list (FRAMEWORK.md §4).
  {
    id: 'live-list',
    type: 'list',
    label: "What's on",
    icon: 'list',
    defaultSpan: 'full',
    domains: ['light', 'switch', 'fan'],
    description: "A self-updating list of everything currently on.",
    make: (seed) => ({
      id: uid(),
      type: 'list',
      title: "What's on",
      entityIds: seed,
      span: 'full',
      source: {
        include: [
          { domain: 'light', state: 'on' },
          { domain: 'switch', state: 'on' },
          { domain: 'fan', state: 'on' },
        ],
        hideWhenEmpty: true,
        sort: 'name',
      },
    }),
  },
  // ChartBlock with two series — the merged Energy + Power surface (one decision).
  {
    id: 'energy-power',
    type: 'chart',
    label: 'Energy + Power',
    icon: 'zap',
    defaultSpan: 'full',
    domains: ['sensor'],
    description: 'A merged generation + consumption history chart.',
    make: (seed) => {
      const a = seed[0];
      const b = seed[1] ?? seed[0];
      return {
        id: uid(),
        type: 'chart',
        span: 'full',
        entityIds: a ? Array.from(new Set([a, b].filter(Boolean))) : [],
        chart: a
          ? {
              title: 'Energy + Power',
              window: { value: 24, unit: 'h' },
              header: { showCurrent: true, colorize: true },
              axes: [{ id: 'left' }],
              series: b && b !== a
                ? [
                    { entity: a, fill: 'area', axisId: 'left' },
                    { entity: b, fill: 'line', axisId: 'left' },
                  ]
                : [{ entity: a, fill: 'area', axisId: 'left' }],
            }
          : undefined,
      };
    },
  },
  // ChartBlock single series, 7-day window — the "trend" companion to History chart.
  {
    id: 'week-trend',
    type: 'chart',
    label: 'Week trend',
    icon: 'activity',
    defaultSpan: 'full',
    domains: ['sensor'],
    description: 'A 7-day trend line for a single sensor.',
    make: (seed) => ({
      id: uid(),
      type: 'chart',
      span: 'full',
      entityIds: seed.slice(0, 1),
      chart: seed[0]
        ? {
            window: { value: 7, unit: 'd' },
            bucket: 'day',
            backend: 'statistics',
            header: { showCurrent: true, colorize: true },
            axes: [{ id: 'left' }],
            series: [{ entity: seed[0], fill: 'line', axisId: 'left' }],
          }
        : undefined,
    }),
  },
];

/**
 * The full expansion set, ordered display-readouts-then-composed for a sensible
 * gallery flow. Merge AFTER the core kinds (compose-first) — see INTEGRATION.
 */
export const EXTRA_CARD_KINDS: CardKind[] = [...COMPOSED_KINDS, ...STAT_KINDS];
