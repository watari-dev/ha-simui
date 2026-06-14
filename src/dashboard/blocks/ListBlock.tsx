import { useAggregate } from '../../hass/context';
import { useAreas } from '../areas';
import { resolveSource } from '../presets/index';
import { EntityRow } from '../EntityRow';
import type { Block } from '../types';

// A hairline-divided list of entities — quiet status + simple controls. When
// `block.source` is set the membership is DYNAMIC (FRAMEWORK.md §4): resolved live
// against the Matcher (include OR, exclude after). `hideWhenEmpty` (default true)
// makes the whole card vanish when nothing matches — "hide noise until it's signal."
export function ListBlock({ block }: { block: Block }) {
  if (block.source) return <DynamicList block={block} />;
  return <StaticList title={block.title} ids={block.entityIds} />;
}

function DynamicList({ block }: { block: Block }) {
  const areas = useAreas();
  const source = block.source!;
  // Resolve to a stable, sorted, joined id string so the component repaints only
  // when the membership set actually changes (the primitive-snapshot trick).
  const joined = useAggregate((states) =>
    resolveSource(source, states, (id) => areas?.[id]?.areaName).join(','),
  );
  const ids = joined ? joined.split(',') : [];

  if (!ids.length && (source.hideWhenEmpty ?? true)) return null;
  return <StaticList title={block.title} ids={ids} empty="Nothing right now." />;
}

function StaticList({ title, ids, empty }: { title?: string; ids: string[]; empty?: string }) {
  return (
    <div className="simui-surface list">
      {title && (
        <div className="simui-surface-head">
          <span>{title}</span>
        </div>
      )}
      {ids.length ? (
        <div className="simui-rows divided">
          {ids.map((id) => <EntityRow key={id} entityId={id} />)}
        </div>
      ) : (
        empty && <div className="simui-list-empty">{empty}</div>
      )}
    </div>
  );
}
