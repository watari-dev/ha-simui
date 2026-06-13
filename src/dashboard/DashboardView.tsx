import { useState } from 'react';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Check, Pencil, Plus } from 'lucide-react';
import { useHass } from '../hass/context';
import { useDashboard } from './store';
import { CardChrome } from './CardChrome';
import { AddCardPanel } from './AddCardPanel';

export function DashboardView() {
  const { states } = useHass();
  const { config, editing, setEditing, reorder, addCard, removeCard, setCardSize } = useDashboard();
  const [adding, setAdding] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  if (!config) return <div className="simui-msg">Loading dashboard…</div>;

  const view = config.views[0];
  const ids = view.cards.map((c) => c.id);
  const total = Object.keys(states).length;

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    if (oldIndex >= 0 && newIndex >= 0) reorder(oldIndex, newIndex);
  };

  return (
    <div className="simui-app">
      <header className="simui-header">
        <h1>{view.title}</h1>
        <span className="simui-sub">{view.cards.length} cards · {total} entities</span>
        <span className="simui-spacer" />
        {editing && (
          <button className="simui-iconbtn-h" onClick={() => setAdding(true)} aria-label="Add card"><Plus size={16} /></button>
        )}
        <button
          className={`simui-iconbtn-h${editing ? ' active' : ''}`}
          onClick={() => setEditing(!editing)}
          aria-label={editing ? 'Done editing' : 'Edit dashboard'}
        >
          {editing ? <Check size={16} /> : <Pencil size={15} />}
        </button>
      </header>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={ids} strategy={rectSortingStrategy}>
          <div className="simui-grid">
            {view.cards.map((card) => (
              <CardChrome
                key={card.id}
                card={card}
                editing={editing}
                onRemove={() => removeCard(card.id)}
                onResize={() => setCardSize(card.id, card.size === 2 ? 1 : 2)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {adding && (
        <AddCardPanel
          existing={view.cards.map((c) => c.entityId)}
          onAdd={addCard}
          onClose={() => setAdding(false)}
        />
      )}
    </div>
  );
}
