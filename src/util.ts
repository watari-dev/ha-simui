import type { HassEntity } from './types';

export function domainOf(entityId: string): string {
  return entityId.split('.')[0];
}

export function friendly(entity: HassEntity): string {
  return (entity.attributes.friendly_name as string | undefined) || entity.entity_id;
}

export function prettyState(state: string): string {
  return state.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

export function formatNumber(n: number): string {
  if (Math.abs(n) >= 100) return Math.round(n).toString();
  return n.toFixed(1).replace(/\.0$/, '');
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/**
 * Compact relative time ("just now", "5m ago", "2h ago", "3d ago") from an ISO
 * timestamp — the `state · last_changed` recency line borrowed from the real
 * dashboard. Recomputes whenever its tile re-renders (i.e. when the entity
 * changes); it does not self-tick. See FRAMEWORK.md §1 (Tile `stateContent`).
 */
export function relativeTime(iso: string | undefined, now: number = Date.now()): string {
  if (!iso) return '';
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return '';
  const s = Math.max(0, Math.round((now - t) / 1000));
  if (s < 45) return 'just now';
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d}d ago`;
  const w = Math.round(d / 7);
  if (w < 5) return `${w}w ago`;
  const mo = Math.round(d / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.round(d / 365)}y ago`;
}

/** Bitwise check against an entity's `supported_features` attribute. */
export function supportsFeature(entity: HassEntity, bit: number): boolean {
  const sf = entity.attributes.supported_features as number | undefined;
  return sf != null && (sf & bit) === bit;
}

export function uid(): string {
  return crypto.randomUUID();
}
