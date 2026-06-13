import { useState } from 'react';
import { Check, Pencil, Plus } from 'lucide-react';
import { useDashboard } from './store';
import { RoomView } from './RoomView';
import { AddCardPanel } from './AddCardPanel';

export function DashboardView() {
  const { config, activeRoomId, setActiveRoom, editing, setEditing, addCard } = useDashboard();
  const [adding, setAdding] = useState(false);

  if (!config) return <div className="simui-msg">Loading dashboard…</div>;
  if (!config.rooms.length) return <div className="simui-msg">No rooms to show yet.</div>;

  const room = config.rooms.find((r) => r.id === activeRoomId) ?? config.rooms[0];

  return (
    <div className="simui-app">
      <div className="simui-topbar">
        <div className="simui-pills">
          {config.rooms.map((r) => (
            <button
              key={r.id}
              className={`simui-pill${r.id === room.id ? ' active' : ''}`}
              onClick={() => setActiveRoom(r.id)}
            >
              {r.name}
            </button>
          ))}
        </div>
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
      </div>

      <RoomView key={room.id} room={room} />

      {adding && (
        <AddCardPanel
          existing={room.blocks.flatMap((b) => b.entityIds)}
          onAdd={addCard}
          onClose={() => setAdding(false)}
        />
      )}
    </div>
  );
}
