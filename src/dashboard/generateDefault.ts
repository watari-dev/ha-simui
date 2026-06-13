import type { CardSize, DashboardConfig } from './types';
import type { HassEntities } from '../types';
import { domainOf, friendly, uid } from '../util';

const ALLOW = new Set(['light', 'climate', 'media_player', 'cover', 'lock', 'fan', 'switch', 'sensor']);
const ORDER = ['light', 'climate', 'media_player', 'cover', 'lock', 'fan', 'switch', 'sensor'];

export function defaultSize(entityId: string): CardSize {
  return domainOf(entityId) === 'media_player' ? 2 : 1;
}

// First-run dashboard: a sensible default built from whatever the instance has,
// so simUI is useful before the user edits anything (à la Lovelace auto-gen).
export function generateDefault(states: HassEntities): DashboardConfig {
  const entities = Object.values(states).filter((e) => {
    const d = domainOf(e.entity_id);
    if (!ALLOW.has(d)) return false;
    if (d === 'sensor' && !e.attributes.unit_of_measurement) return false; // skip noisy non-numeric sensors
    return true;
  });
  entities.sort((a, b) => {
    const da = ORDER.indexOf(domainOf(a.entity_id));
    const db = ORDER.indexOf(domainOf(b.entity_id));
    return da - db || friendly(a).localeCompare(friendly(b));
  });
  const cards = entities.map((e) => ({ id: uid(), entityId: e.entity_id, size: defaultSize(e.entity_id) }));
  return { version: 1, views: [{ id: uid(), title: 'Home', cards }] };
}
