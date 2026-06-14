import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { CSSProperties } from 'react';
import { useAggregate } from '../hass/context';
import { useDashboard } from './store';
import { HeroBlock } from './blocks/HeroBlock';
import { GroupBlock } from './blocks/GroupBlock';
import { ListBlock } from './blocks/ListBlock';
import { CardBlock } from './blocks/CardBlock';
import { ChartBlock } from './blocks/ChartBlock';
import { AttentionStrip } from '../components/StatusBoardTile';
import type { Block, BlockSpan, Condition } from './types';

const spanClass = (s: BlockSpan): string => (s === 2 ? ' span-2' : s === 'full' ? ' span-full' : '');
const spanLabel = (s: BlockSpan): string => (s === 2 ? '2×' : s === 'full' ? 'Full' : '1×');

export function BlockBody({ block }: { block: Block }) {
  switch (block.type) {
    case 'hero': return <HeroBlock block={block} />;
    case 'group': return <GroupBlock block={block} />;
    case 'list': return <ListBlock block={block} />;
    case 'chart': return <ChartBlock block={block} />;
    case 'card': return <CardBlock block={block} />;
    case 'attention': return <AttentionStrip entities={block.entityIds} />;
    default: return null;
  }
}

/**
 * A read-only block in a category/preset surface (no drag/edit chrome). Honors
 * `visibleWhen` exactly like the room renderer, and carries the same span class so
 * category surfaces share the room grid's column model.
 */
export function StaticBlock({ block }: { block: Block }) {
  const visible = useAggregate((states) => {
    const cond = block.visibleWhen;
    if (!cond) return true;
    const e = states[cond.entity];
    return matchCondition(cond, e?.state, Number(e?.state));
  });
  if (!visible) return null;
  return (
    <div className={`simui-block${spanClass(block.span)}`}>
      <BlockBody block={block} />
    </div>
  );
}

/** Evaluate a conditional-surfacing Condition (FRAMEWORK.md §3) against live state. */
function matchCondition(cond: Condition, state: string | undefined, num: number): boolean {
  if (cond.state != null) {
    const want = Array.isArray(cond.state) ? cond.state : [cond.state];
    if (state == null || !want.includes(state)) return false;
  }
  if (cond.above != null && !(num > cond.above)) return false;
  if (cond.below != null && !(num < cond.below)) return false;
  return true;
}

// Grid item that holds a block; in edit mode it becomes a drag handle with
// remove + resize controls.
export function BlockChrome({ block, editing }: { block: Block; editing: boolean }) {
  const { removeBlock, cycleBlockSpan } = useDashboard();
  // Conditional surfacing (FRAMEWORK.md §3): subscribe to the gate entity's value
  // (cheap primitive) so the block mounts/unmounts when it crosses the threshold.
  // Always evaluate to keep hook order stable; while editing we never hide.
  const visible = useAggregate((states) => {
    const cond = block.visibleWhen;
    if (!cond) return true;
    const e = states[cond.entity];
    return matchCondition(cond, e?.state, Number(e?.state));
  });
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
    disabled: !editing,
  });

  if (!visible && !editing) return null;
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`simui-block${spanClass(block.span)}${editing ? ' editing' : ''}${isDragging ? ' dragging' : ''}`}
    >
      <BlockBody block={block} />
      {editing && (
        <>
          <div className="simui-card-grab" {...attributes} {...listeners} aria-label="Drag to reorder" />
          <button className="simui-card-btn size" onPointerDown={(e) => e.stopPropagation()} onClick={() => cycleBlockSpan(block.id)} aria-label="Cycle width">
            {spanLabel(block.span)}
          </button>
          <button className="simui-card-btn x" onPointerDown={(e) => e.stopPropagation()} onClick={() => removeBlock(block.id)} aria-label="Remove block">
            ×
          </button>
        </>
      )}
    </div>
  );
}
