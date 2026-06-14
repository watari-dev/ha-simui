import { domainOf } from '../util';
import type { HassEntities, HassEntity } from '../types';
import type { PreviewContext } from './types';

const DEAD = new Set(['unavailable', 'unknown', '']);

/**
 * Build a PreviewContext from a live states snapshot (SPEC_EDITOR §4). `sample`
 * returns real, *available* entity ids of the requested domains, so gallery
 * previews — and freshly-dropped cards — land populated with the user's own
 * devices rather than a stub. Pure (no hass context) so it's testable and the
 * gallery doesn't re-sample on every tick.
 */
export function buildPreviewContext(states: HassEntities): PreviewContext {
  const ids = Object.keys(states).sort();
  const sample = (n: number, domains?: string[]): string[] => {
    const out: string[] = [];
    for (const id of ids) {
      if (domains && !domains.includes(domainOf(id))) continue;
      const e = states[id];
      if (!e || DEAD.has(e.state)) continue;
      out.push(id);
      if (out.length >= n) break;
    }
    return out;
  };
  return {
    states,
    sample,
    resolve: (id) => states[id] as HassEntity | undefined,
  };
}
