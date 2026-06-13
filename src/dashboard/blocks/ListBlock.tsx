import { EntityRow } from '../EntityRow';
import type { Block } from '../types';

// A hairline-divided list of entities — quiet status + simple controls.
export function ListBlock({ block }: { block: Block }) {
  return (
    <div className="simui-surface list">
      {block.title && (
        <div className="simui-surface-head">
          <span>{block.title}</span>
        </div>
      )}
      <div className="simui-rows divided">
        {block.entityIds.map((id) => <EntityRow key={id} entityId={id} />)}
      </div>
    </div>
  );
}
