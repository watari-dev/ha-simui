import { useMemo, useState } from 'react';
import { useAllStates } from '../hass/context';
import { useAreas, useRegistry } from '../dashboard/areas';
import { useDashboard } from '../dashboard/store';
import { useEditor } from './store';
import { CardGallery } from './CardGallery';
import { Inspector } from './Inspector';
import { EntityPicker } from './EntityPicker';
import { EditorToolbar, OnboardingHint } from './chrome';
import { TemplateGallery, type PageTemplate } from './templates';
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
  const dash = useDashboard();
  const states = useAllStates();
  const areas = useAreas();
  const registry = useRegistry();
  const [facets, setFacets] = useState<EntityFacets>({ primaryOnly: true });
  const [picked, setPicked] = useState<string[]>([]);
  const [onboarded, setOnboarded] = useState(
    () => typeof localStorage !== 'undefined' && localStorage.getItem('simui:editor:onboarded') === '1',
  );

  const idSig = useMemo(() => Object.keys(states).sort().join(','), [states]);
  const preview = useMemo(() => buildPreviewContext(states), [idSig]); // eslint-disable-line react-hooks/exhaustive-deps
  const index = useMemo(() => buildEntityIndex({ states, areas, registry }), [states, areas, registry]);

  // Apply a page template onto the active surface. We tear the editor down WITHOUT
  // committing first (discard) so its empty working copy can't overwrite the template
  // on flush; the surface then re-renders the new override read-only (tap Edit to refine).
  const applyTemplate = (t: PageTemplate) => {
    const blocks = t.build({ states, areaOf: index.areaOf });
    const r = dash.route;
    editor.exit({ discard: true });
    if (r.kind === 'home') dash.createHomeOverride(blocks);
    else if (r.kind === 'category') dash.createOverride(r.id, blocks);
    else dash.mutateBlocks(() => blocks);
  };

  if (!editor.active) return null;

  const { panel, selection } = editor;
  const block =
    selection.kind !== 'none' ? editor.dirtyBlocks.find((b) => b.id === selection.blockId) ?? null : null;
  const tile = selection.kind === 'tile' && block ? (block.tiles?.[selection.entityId] ?? {}) : null;

  // One fragment so the toolbar coexists with whatever panel is open (SPEC_EDITOR §6).
  return (
    <>
      <EditorToolbar />
      {!onboarded && (
        <OnboardingHint
          onDismiss={() => {
            if (typeof localStorage !== 'undefined') localStorage.setItem('simui:editor:onboarded', '1');
            setOnboarded(true);
          }}
        />
      )}

      {panel === 'gallery' && (
        <CardGallery
          kinds={CARD_KINDS}
          preview={preview}
          onPick={(kind: CardKind) => editor.addBlock(kind.type, seedFor(kind, preview))}
          onClose={editor.closePanel}
        />
      )}

      {panel === 'templates' && (
        <TemplateGallery
          states={states}
          areaOf={index.areaOf}
          onPick={applyTemplate}
          onClose={editor.closePanel}
        />
      )}

      {panel === 'entity-picker' && block && (
        <EntityPicker
          states={states}
          areaOf={index.areaOf}
          isPrimary={index.isPrimary}
          areas={areas}
          registry={registry}
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
      )}

      {panel === 'inspector' && block && (
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
      )}
    </>
  );
}
