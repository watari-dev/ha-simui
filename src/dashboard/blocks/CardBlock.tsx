import { useEntity } from '../../hass/context';
import { widgetFor } from '../../widgets';
import { domainOf } from '../../util';
import type { Block } from '../types';
import type { ActionMap, TileConfig } from '../../editor/types';

// A single entity rendered as a discrete object — the one place a "card" is the
// right answer (media player, chart, camera). Reuses the existing widgets.
export function CardBlock({ block }: { block: Block }) {
  const id = block.entityIds[0];
  const entity = useEntity(id);
  const Widget = widgetFor(domainOf(id));

  // Authored interactions for this leaf: the per-tile override wins, else the
  // block-level map (single-entity card). The renderer param is typed `Block` but
  // the runtime object is a `BlockConfig`, so read `tiles`/`actions` structurally.
  const cfg = block as { tiles?: Record<string, TileConfig>; actions?: ActionMap };
  const actions = cfg.tiles?.[id]?.actions ?? cfg.actions;

  if (!entity) {
    return (
      <div className="simui-tile">
        <div className="simui-row"><span className="simui-name" title={id}>{id}</span></div>
        <span className="simui-state">Unavailable</span>
      </div>
    );
  }
  return <Widget entity={entity} actions={actions} />;
}
