import type { HassEntity } from '../../types';
import { prettyState, relativeTime } from '../../util';

/**
 * The quiet, tabular attribute readout — the graceful FALLBACK tier of the detail
 * Sheet (DESIGN_PRINCIPLES §14). Extracted verbatim from the original
 * `DetailContent` so every per-domain sheet can append the full attribute table
 * below its bespoke controls, and so unspecialised domains still get a clean dump.
 *
 * Pass `omit` to hide attributes a domain already surfaced richly above (e.g. a
 * light's brightness, a climate's setpoint) so the table doesn't repeat them.
 */
export function AttrList({ entity, omit }: { entity: HassEntity; omit?: Iterable<string> }) {
  const a = entity.attributes;
  const skip = new Set<string>([
    'friendly_name',
    'icon',
    'supported_features',
    'entity_picture',
    ...(omit ?? []),
  ]);
  const rows = Object.entries(a)
    .filter(([k]) => !skip.has(k))
    .filter(([, v]) => v != null && v !== '' && (typeof v !== 'object' || Array.isArray(v)));

  return (
    <div className="simui-detail-attrs">
      <div className="simui-detail-attr">
        <span className="simui-detail-key">State</span>
        <span className="simui-detail-val num">{prettyState(entity.state)}</span>
      </div>
      <div className="simui-detail-attr">
        <span className="simui-detail-key">Changed</span>
        <span className="simui-detail-val num">{relativeTime(entity.last_changed) || '—'}</span>
      </div>
      {rows.map(([k, v]) => (
        <div className="simui-detail-attr" key={k}>
          <span className="simui-detail-key">{prettyState(k)}</span>
          <span className="simui-detail-val num">{formatAttr(v)}</span>
        </div>
      ))}
      <div className="simui-detail-attr">
        <span className="simui-detail-key">Entity</span>
        <span className="simui-detail-val muted">{entity.entity_id}</span>
      </div>
    </div>
  );
}

function formatAttr(v: unknown): string {
  if (Array.isArray(v)) return v.map((x) => String(x)).join(', ');
  if (typeof v === 'number') return String(v);
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  return prettyState(String(v));
}
