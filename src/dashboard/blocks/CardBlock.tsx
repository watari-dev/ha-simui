import { useEntity } from '../../hass/context';
import { widgetFor } from '../../widgets';
import { domainOf } from '../../util';
import type { Block } from '../types';

// A single entity rendered as a discrete object — the one place a "card" is the
// right answer (media player, chart, camera). Reuses the existing widgets.
export function CardBlock({ block }: { block: Block }) {
  const id = block.entityIds[0];
  const entity = useEntity(id);
  const Widget = widgetFor(domainOf(id));

  if (!entity) {
    return (
      <div className="simui-tile">
        <div className="simui-row"><span className="simui-name" title={id}>{id}</span></div>
        <span className="simui-state">Unavailable</span>
      </div>
    );
  }
  return <Widget entity={entity} />;
}
