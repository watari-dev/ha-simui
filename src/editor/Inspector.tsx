// Inspector — the per-selection block/tile config editor (SPEC_EDITOR.md §inspector).
//
// A CONTROLLED component: it receives the selected block (and tile, when a leaf is
// selected) plus a live entity snapshot, and emits granular patches via callbacks. It
// never touches the store — the parent applies `onBlockChange` / `onTileChange` through
// the editor actions, so undo/commit semantics live in one place (editor/store).
//
// Rendering switches on `selection.kind`:
//   • tile  → TileSettings   (name / icon / colour / size / state line / features / actions)
//   • block → BlockSettings + (ChartEditor | EntityMembers) + ConditionEditor
//   • none  → an empty hint
//
// The form bodies are the enrichment sub-editors (./inspector/*), each a controlled,
// store-free component. This file owns only the shell (header / footer / selection
// switch). Layout (CSS): a right-rail on desktop, a bottom sheet on phone
// (DESIGN_PRINCIPLES §14). Co-located styles in ./Inspector.css.

import { Copy, Trash2, X } from 'lucide-react';
import './Inspector.css';
// NB: explicit `/index` — this file is `Inspector.tsx` and the barrel dir is
// `inspector/`; on a case-insensitive filesystem a bare `./inspector` resolves back
// to THIS file (a circular self-import). The `/index` suffix forces the directory.
import {
  BlockSettings,
  TileSettings,
  ConditionEditor,
  ChartEditor,
  EntityMembers,
} from './inspector/index';
import type { InspectorProps } from './types';
import type { HassEntities } from '../types';

function friendlyOf(states: HassEntities, entityId: string): string {
  const e = states[entityId];
  return (e?.attributes.friendly_name as string | undefined) || entityId;
}

// ─────────────────────────────────────────────────────────────────────────────
// Inspector
// ─────────────────────────────────────────────────────────────────────────────

export function Inspector({
  selection,
  block,
  tile,
  states,
  onBlockChange,
  onTileChange,
  onAddEntities,
  onRemoveEntity,
  onDuplicate,
  onRemove,
  onClose,
}: InspectorProps) {
  if (selection.kind === 'none' || !block) {
    return (
      <aside className="simui-insp" role="complementary" aria-label="Inspector">
        <Header kicker="Inspector" title="Nothing selected" onClose={onClose} />
        <div className="simui-insp-empty">
          Select a card to edit its title, layout and contents — or a tile inside it to
          tweak that entity.
        </div>
      </aside>
    );
  }

  const isTile = selection.kind === 'tile';
  const entityId = selection.kind === 'tile' ? selection.entityId : undefined;

  // Chart blocks keep their spec on `block.chart`; the editor's `options` bag may shadow
  // it mid-edit (hoisted onto the canonical field on commit — store.syncOptions).
  const chart = block.options?.chart ?? block.chart;
  const visibleWhen = block.options?.visibleWhen ?? block.visibleWhen;

  return (
    <aside className="simui-insp" role="complementary" aria-label="Inspector">
      <Header
        kicker={isTile ? 'Tile' : `${block.type} card`}
        title={
          isTile
            ? (tile?.name ?? friendlyOf(states, entityId!))
            : (block.title || `${block.type} card`)
        }
        onClose={onClose}
      />

      <div className="simui-insp-body">
        {isTile && entityId ? (
          <TileSettings
            entityId={entityId}
            entity={states[entityId]}
            tile={tile ?? {}}
            onChange={onTileChange}
          />
        ) : (
          <>
            <BlockSettings block={block} states={states} onChange={onBlockChange} />

            {block.type === 'chart' ? (
              <ChartEditor
                chart={chart}
                states={states}
                onChange={(next) =>
                  onBlockChange({ chart: next, options: { ...block.options, chart: next } })
                }
              />
            ) : (
              <section className="simui-insp-section">
                <div className="simui-insp-section-head">
                  Members
                  <span className="simui-insp-hint" style={{ marginTop: 0 }}>
                    {block.entityIds.length}
                  </span>
                </div>
                <EntityMembers
                  entityIds={block.entityIds}
                  states={states}
                  tiles={block.tiles}
                  onAddEntities={onAddEntities}
                  onRemoveEntity={onRemoveEntity}
                />
              </section>
            )}

            <section className="simui-insp-section">
              <div className="simui-insp-section-head">Visibility</div>
              <ConditionEditor
                condition={visibleWhen}
                states={states}
                onChange={(cond) =>
                  onBlockChange({ visibleWhen: cond, options: { ...block.options, visibleWhen: cond } })
                }
              />
            </section>
          </>
        )}
      </div>

      <footer className="simui-insp-footer">
        <div className="simui-insp-footer-row">
          <button className="simui-insp-btn ghost" onClick={onDuplicate}>
            <Copy size={15} strokeWidth={2} />
            Duplicate
          </button>
          <button className="simui-insp-btn danger" onClick={onRemove}>
            <Trash2 size={15} strokeWidth={2} />
            Remove
          </button>
        </div>
      </footer>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────────────────────────────────────

function Header({
  kicker,
  title,
  onClose,
}: {
  kicker: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <header className="simui-insp-head">
      <div className="simui-insp-head-text">
        <span className="simui-insp-kicker">{kicker}</span>
        <span className="simui-insp-title" title={title}>
          {title}
        </span>
      </div>
      <button className="simui-insp-close" onClick={onClose} aria-label="Close inspector">
        <X size={16} strokeWidth={2} />
      </button>
    </header>
  );
}
