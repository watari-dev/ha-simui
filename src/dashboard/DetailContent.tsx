import { useEntity } from '../hass/context';
import { widgetFor } from '../widgets';
import { QuickControls, isControllable } from '../components/QuickControls';
import { BloomStudio, hasStudio } from '../components/BloomStudio';
import { domainOf, friendly, prettyState, relativeTime } from '../util';

/**
 * The body of the native detail Sheet (DESIGN_PRINCIPLES §14, "tap = Sheet"). The
 * progressive-disclosure tier above a glance: the entity's full domain widget as
 * the control surface, then a quiet, tabular attribute readout. Subscribes to the
 * one entity it shows (surgical) — the Sheet host owns nothing live.
 */
export function DetailContent({ entityId }: { entityId: string }) {
  const entity = useEntity(entityId);
  if (!entity) {
    return <div className="simui-detail-empty">{entityId} is unavailable.</div>;
  }

  const Widget = widgetFor(domainOf(entityId));
  const a = entity.attributes;
  const rows = Object.entries(a)
    .filter(([k]) => k !== 'friendly_name' && k !== 'icon' && k !== 'supported_features' && k !== 'entity_picture')
    .filter(([, v]) => v != null && v !== '' && (typeof v !== 'object' || Array.isArray(v)));

  return (
    <div className="simui-detail">
      <div className="simui-detail-widget">
        {hasStudio(entityId) ? (
          <BloomStudio entityId={entityId} />
        ) : isControllable(entityId) ? (
          <QuickControls entityId={entityId} />
        ) : (
          <Widget entity={entity} />
        )}
      </div>
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
          <span className="simui-detail-val muted">{friendly(entity) === entityId ? entityId : entityId}</span>
        </div>
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
