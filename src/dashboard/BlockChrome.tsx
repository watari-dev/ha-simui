import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { CSSProperties } from 'react';
import { useAggregate } from '../hass/context';
import { useDashboard } from './store';
import { useEditorOptional } from '../editor/store';
import { HeroBlock } from './blocks/HeroBlock';
import { GroupBlock } from './blocks/GroupBlock';
import { ListBlock } from './blocks/ListBlock';
import { CardBlock } from './blocks/CardBlock';
import { ChartBlock } from './blocks/ChartBlock';
import { StatBlock } from './blocks/StatBlock';
import { EnergyFlow } from '../components/EnergyFlow';
import { AttentionStrip } from '../components/StatusBoardTile';
import { ResizeHandle } from '../editor/resize/ResizeHandle';
import type { Block, BlockSpan, Condition } from './types';
import '../editor/grid.css';

const spanClass = (s: BlockSpan): string => (s === 2 ? ' span-2' : s === 'full' ? ' span-full' : '');
const spanLabel = (s: BlockSpan): string => (s === 2 ? '2×' : s === 'full' ? 'Full' : '1×');
const nextSpan = (s: BlockSpan): BlockSpan => (s === 1 ? 2 : s === 2 ? 'full' : 1);

export function BlockBody({ block }: { block: Block }) {
  switch (block.type) {
    case 'hero': return <HeroBlock block={block} />;
    case 'group': return <GroupBlock block={block} />;
    case 'list': return <ListBlock block={block} />;
    case 'chart': return <ChartBlock block={block} />;
    case 'card': {
      // Display-only kinds serialise as type:'card' and self-identify via an
      // options flag — the novel-card seam. `energyFlow` ⇒ the Powerwall-style
      // flow object; `statVariant` ⇒ a stat/gauge/section/divider leaf.
      const opts = (block as { options?: { statVariant?: string; energyFlow?: unknown } }).options;
      if (opts?.energyFlow) return <EnergyFlow block={block} />;
      return opts?.statVariant ? <StatBlock block={block} /> : <CardBlock block={block} />;
    }
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
  const dash = useDashboard();
  const editor = useEditorOptional();
  // When the editor store is driving this surface, every mutation funnels through
  // it (one undo snapshot per gesture + optimistic dirtyBlocks). Otherwise fall
  // back to the dashboard's coarse mutators (rooms/home in the legacy path).
  const editorActive = !!editor?.active;
  const remove = () => (editorActive ? editor!.removeBlock(block.id) : dash.removeBlock(block.id));
  const cycle = () =>
    editorActive ? editor!.resizeBlock(block.id, nextSpan(block.span)) : dash.cycleBlockSpan(block.id);
  const selected =
    editorActive && editor!.selection.kind !== 'none' && editor!.selection.blockId === block.id;
  const onSelect = editorActive
    ? () => {
        editor!.selectBlock(block.id);
        editor!.openInspector();
      }
    : undefined;

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
    outline: selected ? '2px solid var(--simui-accent, #3b82f6)' : undefined,
    outlineOffset: selected ? 2 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`simui-block${spanClass(block.span)}${editing ? ' editing' : ''}${isDragging ? ' dragging' : ''}${selected ? ' selected' : ''}`}
    >
      <BlockBody block={block} />
      {editing && (
        <>
          {/* Capture layer: in edit mode a body tap SELECTS the block (opens the
              inspector) rather than firing the tile's live action. Sits above the
              body but below the drag/resize/remove controls (later siblings). */}
          {onSelect && (
            <div
              className="simui-block-capture"
              style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}
              onClick={onSelect}
              aria-hidden
            />
          )}
          <ResizeHandle block={block} />
          <div className="simui-card-grab" {...attributes} {...listeners} aria-label="Drag to reorder" />
          <button
            className="simui-card-btn size"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); cycle(); }}
            aria-label="Cycle width"
          >
            {spanLabel(block.span)}
          </button>
          <button
            className="simui-card-btn x"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); remove(); }}
            aria-label="Remove block"
          >
            ×
          </button>
        </>
      )}
    </div>
  );
}
