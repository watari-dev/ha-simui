import { useState } from 'react';
import { X } from 'lucide-react';
import { useAllStates } from '../hass/context';
import { domainOf, friendly } from '../util';

interface Props {
  existing: string[];
  onAdd: (entityId: string) => void;
  onClose: () => void;
}

// Adds an entity to the active room as a card block. Composing groups/lists by
// hand is a later step; this keeps quick "add this entity" available.
export function AddCardPanel({ existing, onAdd, onClose }: Props) {
  const states = useAllStates();
  const [q, setQ] = useState('');
  const existingSet = new Set(existing);
  const query = q.toLowerCase();
  const list = Object.values(states)
    .filter((e) => !existingSet.has(e.entity_id))
    .filter((e) => friendly(e).toLowerCase().includes(query) || e.entity_id.includes(query))
    .sort((a, b) => friendly(a).localeCompare(friendly(b)))
    .slice(0, 200);

  return (
    <div className="simui-modal" onClick={onClose}>
      <div className="simui-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="simui-modal-head">
          <input
            autoFocus
            className="simui-search"
            placeholder="Add a card — search entities…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="simui-iconbtn-h" onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>
        <div className="simui-modal-list">
          {list.map((e) => (
            <div key={e.entity_id} className="simui-add-row" onClick={() => onAdd(e.entity_id)}>
              <span className="simui-name" title={e.entity_id}>{friendly(e)}</span>
              <span className="simui-add-dom">{domainOf(e.entity_id)}</span>
            </div>
          ))}
          {list.length === 0 && <div className="simui-msg">No matches</div>}
        </div>
      </div>
    </div>
  );
}
