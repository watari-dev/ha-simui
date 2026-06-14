import { useMemo, useState } from 'react';
import { useAllStates } from '../hass/context';
import { useAreas, useRegistry } from '../dashboard/areas';
import { useEditor } from './store';
import { CardGallery } from './CardGallery';
import { Inspector } from './Inspector';
import { EntityPicker } from './EntityPicker';
import { CARD_KINDS, seedFor } from './cardKinds';
import { buildPreviewContext } from './preview';
import { buildEntityIndex } from './entityIndex';
import type { CardKind, EntityFacets } from './types';

/**
 * Mounts the editor's transient panels (gallery / inspector / entity-picker) over
 * the active surface, driven entirely by the editor store's `panel` + `selection`
 * (SPEC_EDITOR §6). A pure host: it owns no edit state, just feeds the controlled
 * components their props from `useEditor()` + the live entity snapshot, and routes
 * their callbacks back to the editor actions (where undo/commit live).
 */
export function EditorOverlay() {
  const editor = useEditor();
  const states = useAllStates();
  const areas = useAreas();
  const registry = useRegistry();
  const [facets, setFacets] = useState<EntityFacets>({ primaryOnly: true });
  const [picked, setPicked] = useState<string[]>([]);

  const idSig = useMemo(() => Object.keys(states).sort().join(','), [states]);
  const preview = useMemo(() => buildPreviewContext(states), [idSig]); // eslint-disable-line react-hooks/exhaustive-deps
  const index = useMemo(() => buildEntityIndex({ states, areas, registry }), [states, areas, registry]);

  if (!editor.active) return null;

  const { panel, selection } = editor;
  const block =
    selection.kind !== 'none' ? editor.dirtyBlocks.find((b) => b.id === selection.blockId) ?? null : null;
  const tile = selection.kind === 'tile' && block ? (block.tiles?.[selection.entityId] ?? {}) : null;

  if (panel === 'gallery') {
    return (
      <CardGallery
        kinds={CARD_KINDS}
        preview={preview}
        onPick={(kind: CardKind) => editor.addBlock(kind.type, seedFor(kind, preview))}
        onClose={editor.closePanel}
      />
    );
  }

  if (panel === 'entity-picker' && block) {
    return (
      <EntityPicker
        states={states}
        areaOf={index.areaOf}
        isPrimary={index.isPrimary}
        existing={block.entityIds}
        multi
        facets={facets}
        onFacetsChange={setFacets}
        selected={picked}
        onSelectedChange={setPicked}
        onConfirm={(ids) => {
          editor.addEntities(block.id, ids);
          setPicked([]);
          editor.openInspector();
        }}
        onClose={editor.closePanel}
      />
    );
  }

  if (panel === 'inspector' && block) {
    return (
      <Inspector
        selection={selection}
        block={block}
        tile={tile}
        states={states}
        onBlockChange={(patch) => editor.updateBlock(block.id, patch)}
        onTileChange={(patch) => {
          if (selection.kind === 'tile') editor.updateTile(block.id, selection.entityId, patch);
        }}
        onAddEntities={() => {
          setPicked([]);
          editor.openEntityPicker();
        }}
        onRemoveEntity={(entityId) => editor.removeEntity(block.id, entityId)}
        onDuplicate={() => editor.duplicateBlock(block.id)}
        onRemove={() => editor.removeBlock(block.id)}
        onClose={editor.clearSelection}
      />
    );
  }

  return null;
}
