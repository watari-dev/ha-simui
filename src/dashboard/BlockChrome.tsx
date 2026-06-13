import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { CSSProperties } from 'react';
import { useDashboard } from './store';
import { HeroBlock } from './blocks/HeroBlock';
import { GroupBlock } from './blocks/GroupBlock';
import { ListBlock } from './blocks/ListBlock';
import { CardBlock } from './blocks/CardBlock';
import type { Block } from './types';

function BlockBody({ block }: { block: Block }) {
  switch (block.type) {
    case 'hero': return <HeroBlock block={block} />;
    case 'group': return <GroupBlock block={block} />;
    case 'list': return <ListBlock block={block} />;
    case 'card': return <CardBlock block={block} />;
    default: return null;
  }
}

// Grid item that holds a block; in edit mode it becomes a drag handle with
// remove + resize controls.
export function BlockChrome({ block, editing }: { block: Block; editing: boolean }) {
  const { removeBlock, setBlockSize } = useDashboard();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
    disabled: !editing,
  });
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`simui-block${block.size === 2 ? ' span-2' : ''}${editing ? ' editing' : ''}${isDragging ? ' dragging' : ''}`}
    >
      <BlockBody block={block} />
      {editing && (
        <>
          <div className="simui-card-grab" {...attributes} {...listeners} aria-label="Drag to reorder" />
          <button className="simui-card-btn size" onPointerDown={(e) => e.stopPropagation()} onClick={() => setBlockSize(block.id, block.size === 2 ? 1 : 2)} aria-label="Toggle width">
            {block.size === 2 ? '1×' : '2×'}
          </button>
          <button className="simui-card-btn x" onPointerDown={(e) => e.stopPropagation()} onClick={() => removeBlock(block.id)} aria-label="Remove block">
            ×
          </button>
        </>
      )}
    </div>
  );
}
