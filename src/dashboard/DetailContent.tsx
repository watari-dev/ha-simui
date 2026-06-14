import { useEntity } from '../hass/context';
import { widgetFor } from '../widgets';
import { QuickControls, isControllable } from '../components/QuickControls';
import { BloomStudio, hasStudio } from '../components/BloomStudio';
import { domainOf } from '../util';
import { AttrList } from './detail/AttrList';
import { LightDetail } from './detail/LightDetail';
import { ClimateDetail } from './detail/ClimateDetail';
import { MediaDetail } from './detail/MediaDetail';
import { CoverDetail } from './detail/CoverDetail';
import { LockDetail } from './detail/LockDetail';
import { SensorDetail } from './detail/SensorDetail';
import type { HassEntity } from '../types';

/**
 * The body of the native detail Sheet (DESIGN_PRINCIPLES §14, "tap = Sheet"). The
 * progressive-disclosure tier above a glance. Dispatches to a per-domain "more-info"
 * surface — light / climate / media_player / cover / lock / sensor / binary_sensor —
 * each composed from the SHARED primitives (BloomStudio, ColorWheel, TempDial,
 * MetricSpark, ExpandableChart, QuickControls) rather than bespoke control code.
 * Domains without a specialised sheet fall back GRACEFULLY to the universal control
 * surface + the quiet, tabular attribute readout. Subscribes to the one entity it
 * shows (surgical) — the Sheet host owns nothing live.
 */
export function DetailContent({ entityId }: { entityId: string }) {
  const entity = useEntity(entityId);
  if (!entity) {
    return <div className="simui-detail-empty">{entityId} is unavailable.</div>;
  }

  switch (domainOf(entityId)) {
    case 'light':
      return <LightDetail entity={entity} />;
    case 'climate':
      return <ClimateDetail entity={entity} />;
    case 'media_player':
      return <MediaDetail entity={entity} />;
    case 'cover':
      return <CoverDetail entity={entity} />;
    case 'lock':
      return <LockDetail entity={entity} />;
    case 'sensor':
    case 'binary_sensor':
      return <SensorDetail entity={entity} />;
    default:
      return <FallbackDetail entity={entity} />;
  }
}

/**
 * The graceful fallback for unspecialised domains — the original detail body: the
 * best available control surface (a full BloomStudio, else the QuickControls rack,
 * else the read-only domain widget), then the attribute table.
 */
function FallbackDetail({ entity }: { entity: HassEntity }) {
  const entityId = entity.entity_id;
  const Widget = widgetFor(domainOf(entityId));
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
      <AttrList entity={entity} />
    </div>
  );
}
