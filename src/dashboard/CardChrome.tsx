import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { CSSProperties } from 'react';
import { useHass } from '../hass/context';
import { widgetFor } from '../widgets';
import { domainOf } from '../util';
import type { CardConfig } from './types';

interface Props {
  card: CardConfig;
  editing: boolean;
  onRemove: () => void;
  onResize: () => void;
}

// Wraps a widget as a grid item. In edit mode it becomes a drag handle (full
// overlay so the widget's own controls don't fire) with remove + resize buttons.
export function CardChrome({ card, editing, onRemove, onResize }: Props) {
  const { states } = useHass();
  const entity = states[card.entityId];
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    disabled: !editing,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : undefined,
  };
  const Widget = widgetFor(domainOf(card.entityId));

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`simui-card${card.size === 2 ? ' span-2' : ''}${editing ? ' editing' : ''}${isDragging ? ' dragging' : ''}`}
    >
      {entity ? (
        <Widget entity={entity} />
      ) : (
        <div className="simui-tile">
          <div className="simui-row"><span className="simui-name" title={card.entityId}>{card.entityId}</span></div>
          <span className="simui-state">Unavailable</span>
        </div>
      )}
      {editing && (
        <>
          <div className="simui-card-grab" {...attributes} {...listeners} aria-label="Drag to reorder" />
          <button className="simui-card-btn size" onPointerDown={(e) => e.stopPropagation()} onClick={onResize} aria-label="Toggle width">
            {card.size === 2 ? '1×' : '2×'}
          </button>
          <button className="simui-card-btn x" onPointerDown={(e) => e.stopPropagation()} onClick={onRemove} aria-label="Remove card">
            ×
          </button>
        </>
      )}
    </div>
  );
}
