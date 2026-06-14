import { uid } from '../util';
import type { CardKind, PreviewContext } from './types';

/** Seed/preview sample size per kind (small + fixed, SPEC_EDITOR §4). */
function seedSize(type: CardKind['type']): number {
  return type === 'card' || type === 'hero' || type === 'chart' ? 1 : 3;
}

/**
 * Entity seed for a kind, when previewing or dropping it (SPEC_EDITOR §2.3).
 * Domain-filtered with a fallback to any available entity, so a dropped card
 * lands populated rather than empty.
 */
export function seedFor(kind: CardKind, preview: PreviewContext): string[] {
  const n = seedSize(kind.type);
  const picked = preview.sample(n, kind.domains);
  return picked.length ? picked : preview.sample(n);
}

/**
 * The add-able card catalogue shown in the gallery (SPEC_EDITOR §2.3). Each
 * `make(seed)` produces a fully-valid, renderable BlockConfig. Ordered "compose
 * first" per DESIGN_PRINCIPLES — Group / List / Chart / Hero before Card.
 */
export const CARD_KINDS: CardKind[] = [
  {
    id: 'group', type: 'group', label: 'Group', icon: 'group', defaultSpan: 'full',
    description: 'A surface of related controls.',
    make: (seed) => ({ id: uid(), type: 'group', title: 'Group', entityIds: seed, span: 'full', axis: 'none' }),
  },
  {
    id: 'list', type: 'list', label: 'List', icon: 'list', defaultSpan: 'full',
    description: 'A hairline-divided list of entities.',
    make: (seed) => ({ id: uid(), type: 'list', title: 'List', entityIds: seed, span: 'full' }),
  },
  {
    id: 'chart', type: 'chart', label: 'History chart', icon: 'activity', defaultSpan: 'full',
    domains: ['sensor'],
    description: 'A TradingView-grade history graph.',
    make: (seed) => ({
      id: uid(),
      type: 'chart',
      span: 'full',
      entityIds: seed.slice(0, 1),
      chart: seed[0]
        ? {
            window: { value: 24, unit: 'h' },
            header: { showCurrent: true, colorize: true },
            axes: [{ id: 'left' }],
            series: [{ entity: seed[0], fill: 'area', axisId: 'left' }],
          }
        : undefined,
    }),
  },
  {
    id: 'hero', type: 'hero', label: 'Hero', icon: 'thermometer', defaultSpan: 2,
    domains: ['climate'],
    description: 'A big headline readout.',
    make: (seed) => ({ id: uid(), type: 'hero', entityIds: seed.slice(0, 1), span: 2 }),
  },
  {
    id: 'card', type: 'card', label: 'Card', icon: 'box', defaultSpan: 1,
    description: 'A single entity tile.',
    make: (seed) => ({ id: uid(), type: 'card', entityIds: seed.slice(0, 1), span: 1 }),
  },
];
