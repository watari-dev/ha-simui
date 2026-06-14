// EntityMembers — the block's member list (Inspector enrichment module).
//
// Lists the selected block's explicit `entityIds` with a per-row remove button, a
// live state read, and an "Add entities…" button that opens the faceted picker
// (via `onAddEntities`). Optionally selectable so a click drills into a leaf's
// TileSettings (via `onSelect`). CONTROLLED + store-free.

import './EntityMembers.css';
import { Plus, X } from 'lucide-react';
import { SubIconGlyph } from './controls';
import type { TileConfig } from '../types';
import type { HassEntities } from '../../types';

function domainOf(entityId: string): string {
  return entityId.split('.')[0] ?? '';
}
function friendlyOf(states: HassEntities, entityId: string): string {
  return (states[entityId]?.attributes.friendly_name as string | undefined) || entityId;
}

const DEAD = new Set(['unavailable', 'unknown', '']);

export interface EntityMembersProps {
  entityIds: string[];
  states: HassEntities;
  /** Per-tile overrides keyed by entityId — used only to surface a leaf's name/icon. */
  tiles?: Record<string, TileConfig>;
  /** Open the faceted entity picker to add members. */
  onAddEntities: () => void;
  /** Remove a member entity from the block. */
  onRemoveEntity: (entityId: string) => void;
  /** Optional: select a member (drills into TileSettings). Omit ⇒ rows aren't selectable. */
  onSelect?: (entityId: string) => void;
  /** Optional: the currently-selected member, highlighted. */
  selectedEntityId?: string;
  /** Add-button label (default "Add entities…"). */
  addLabel?: string;
}

export function EntityMembers({
  entityIds,
  states,
  tiles,
  onAddEntities,
  onRemoveEntity,
  onSelect,
  selectedEntityId,
  addLabel = 'Add entities…',
}: EntityMembersProps) {
  return (
    <div className="simui-isub-mem">
      {entityIds.length === 0 ? (
        <p className="simui-isub-hint">No entities yet — add some below.</p>
      ) : (
        <div className="simui-isub-mem-list">
          {entityIds.map((id) => {
            const cfg = tiles?.[id];
            const name = cfg?.name || friendlyOf(states, id);
            const entity = states[id];
            const dead = !entity || DEAD.has(entity.state);
            const unit = entity?.attributes.unit_of_measurement as string | undefined;
            const selectable = Boolean(onSelect);
            return (
              <div
                className={`simui-isub-mem-row${selectedEntityId === id ? ' selected' : ''}${
                  selectable ? ' selectable' : ''
                }`}
                key={id}
                role={selectable ? 'button' : undefined}
                tabIndex={selectable ? 0 : undefined}
                onClick={selectable ? () => onSelect!(id) : undefined}
                onKeyDown={
                  selectable
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelect!(id);
                        }
                      }
                    : undefined
                }
              >
                <span className="simui-isub-mem-icon">
                  <SubIconGlyph name={cfg?.icon} size={15} />
                </span>
                <div className="simui-isub-mem-text">
                  <span className="simui-isub-mem-name">{name}</span>
                  <span className="simui-isub-mem-id">{id}</span>
                </div>
                <span className={`simui-isub-mem-state${dead ? ' dead' : ''}`}>
                  {dead ? domainOf(id) : `${entity!.state}${unit ? ` ${unit}` : ''}`}
                </span>
                <button
                  type="button"
                  className="simui-isub-mem-x"
                  aria-label={`Remove ${id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveEntity(id);
                  }}
                >
                  <X size={14} strokeWidth={2} />
                </button>
              </div>
            );
          })}
        </div>
      )}
      <button
        type="button"
        className="simui-isub-btn"
        style={{ marginTop: entityIds.length ? 10 : 0 }}
        onClick={onAddEntities}
      >
        <Plus size={15} strokeWidth={2} />
        {addLabel}
      </button>
    </div>
  );
}
