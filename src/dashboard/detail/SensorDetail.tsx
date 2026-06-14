import { ExpandableChart } from '../../components/ExpandableChart';
import type { HassEntity } from '../../types';
import { domainOf, prettyState } from '../../util';
import { AttrList } from './AttrList';
import { DetailHeader } from './DetailHeader';

/**
 * Sensor / binary_sensor "more-info": a clean primary reading masthead, then —
 * for NUMERIC sensors only — a history sparkline that smart-clicks to the full
 * `lightweight-charts` graph. Both the spark and the expand graph come from the
 * shared `ExpandableChart` (which wraps `MetricSpark`); no new history infra is
 * built here. Non-numeric sensors and binary_sensors skip the chart and show the
 * state + attribute table.
 */
export function SensorDetail({ entity }: { entity: HassEntity }) {
  const a = entity.attributes;
  const unit = a.unit_of_measurement as string | undefined;
  const num = Number.parseFloat(entity.state);
  const numeric = domainOf(entity.entity_id) === 'sensor' && entity.state !== '' && Number.isFinite(num);
  const isOn = entity.state === 'on';

  return (
    <div className="simui-detail">
      {numeric ? (
        <DetailHeader value={formatReading(num)} unit={unit} since={entity.last_changed} />
      ) : (
        <DetailHeader
          value={prettyState(entity.state)}
          tone={isOn ? 'accent' : undefined}
          since={entity.last_changed}
        />
      )}

      {numeric && (
        <div className="simui-detail-chart">
          <ExpandableChart entityId={entity.entity_id} accent="var(--cyan)" />
        </div>
      )}

      <AttrList entity={entity} />
    </div>
  );
}

function formatReading(n: number): string {
  if (Math.abs(n) >= 100) return Math.round(n).toLocaleString();
  return n.toFixed(1).replace(/\.0$/, '');
}
