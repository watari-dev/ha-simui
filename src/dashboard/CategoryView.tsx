import { useMemo } from 'react';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Check, ChevronLeft, Pencil, RotateCcw } from 'lucide-react';
import { useAllStates } from '../hass/context';
import { useAreas, useRegistry } from './areas';
import { useDashboard } from './store';
import { useEditor } from '../editor/store';
import { EditorOverlay } from '../editor/EditorOverlay';
import { EmptyState } from '../editor/chrome';
import { SurfaceStrip } from './SurfaceStrip';
import { BlockChrome, StaticBlock } from './BlockChrome';
import { AmbientCanvas } from '../components/AmbientCanvas';
import { getPreset } from './presets/index';
import type { Surface } from './presets/index';
import { blockId, ofDomain, isLive } from './presets/index';
import type { HassEntities } from '../types';

// Categories that get a living ambient field behind their surface. Lights warms to
// its own members; Climate's cooling-wash + time-of-day base alone give it life.
const AMBIENT_CATEGORIES = new Set(['lights', 'climate']);

// The category id → preset id. media/scenes have no dedicated builder yet, so
// they use a generic cross-room fallback below.
const PRESET_FOR: Record<string, string> = {
  lights: 'lights',
  climate: 'climate',
  sensors: 'sensors',
  power: 'power',
  security: 'security',
  server: 'server',
};

const CATEGORY_TITLE: Record<string, string> = {
  lights: 'Lights',
  climate: 'Climate',
  media: 'Media',
  security: 'Security',
  sensors: 'Sensors',
  power: 'Power',
  scenes: 'Scenes',
  server: 'System',
};

/**
 * A composed cross-room device-category surface (DESIGN_PRINCIPLES §14, the second
 * navigation axis). Built live from a preset builder; **read-only until you edit it**,
 * at which point the generated blocks are snapshotted into a persisted, editable
 * override (drag-reorder / resize / remove / add — the same chrome as a room).
 * "Reset to preset" drops the override and goes back to the live surface.
 */
export function CategoryView({ categoryId }: { categoryId: string }) {
  const states = useAllStates();
  const areaMap = useAreas();
  const registryMeta = useRegistry();
  const { config, goHome, setEditing, createOverride, resetOverride } = useDashboard();
  const editor = useEditor();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // Rebuild the live surface only when the entity SET changes (idSig) — each block
  // subscribes to its own values. areaMap is entity-keyed; pass it straight through.
  const idSig = useMemo(() => Object.keys(states).sort().join(','), [states]);
  const surface: Surface = useMemo(() => {
    const presetId = PRESET_FOR[categoryId];
    const preset = presetId ? getPreset(presetId) : undefined;
    if (preset) return preset.build({ states, areas: areaMap, registry: registryMeta });
    return fallbackSurface(categoryId, states);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, idSig, areaMap, registryMeta]);

  // An override (a user-edited snapshot) takes over from the live surface. While
  // the editor is active we render its optimistic working copy (`dirtyBlocks`) so
  // edits show instantly; the editor commits them back into the override (debounced).
  const override = config?.overrides?.[`category:${categoryId}`];
  const blocks = editor.active ? editor.dirtyBlocks : override ? override.blocks : surface.blocks;
  const ids = blocks.map((b) => b.id);

  const title = CATEGORY_TITLE[categoryId] ?? categoryId;
  const ambient = AMBIENT_CATEGORIES.has(categoryId);
  const surfaceLightIds = useMemo(
    () => (ambient ? blocks.flatMap((b) => b.entityIds).filter((id) => id.startsWith('light.')) : []),
    [ambient, blocks],
  );

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const o = ids.indexOf(String(active.id));
    const n = ids.indexOf(String(over.id));
    if (o >= 0 && n >= 0) editor.moveBlock(o, n);
  };

  // Entering edit on a live surface first snapshots it into an editable override,
  // then hands control to the editor store (it seeds its working copy from the
  // override once the snapshot materialises — SPEC_EDITOR §1.2). We flip the
  // dashboard `editing` flag in the same beat so they start in lockstep.
  const onEditToggle = () => {
    if (editor.active) {
      editor.exit();
      return;
    }
    if (!override) createOverride(categoryId, surface.blocks);
    setEditing(true);
    editor.enter();
  };
  const onReset = () => {
    editor.exit({ discard: true });
    resetOverride(categoryId);
  };
  const onBack = () => {
    if (editor.active) editor.exit();
    goHome();
  };

  return (
    <div className="simui-app">
      <header className="simui-head">
        <button className="simui-back" onClick={onBack} aria-label="Back to home"><ChevronLeft size={18} /></button>
        <span className="simui-head-title">{title}</span>
        <span className="simui-spacer" />
        {editor.active && override && (
          <button className="simui-iconbtn-h" onClick={onReset} aria-label="Reset to preset"><RotateCcw size={15} /></button>
        )}
        {/* Add / Undo / Redo / Save live in the floating EditorToolbar while editing
            (mounted by EditorOverlay) — keep the header chrome minimal. */}
        <button
          className={`simui-iconbtn-h${editor.active ? ' active' : ''}`}
          onClick={onEditToggle}
          aria-label={editor.active ? 'Done editing' : 'Edit surface'}
        >
          {editor.active ? <Check size={16} /> : <Pencil size={15} />}
        </button>
      </header>
      <div className={`simui-content${ambient ? ' simui-cat-content' : ''}`}>
        {ambient && <AmbientCanvas mode="field" lightIds={surfaceLightIds} maxOpacity={0.12} />}
        <div className={ambient ? 'simui-cat-layer' : undefined}>
          {surface.statusStrip && surface.statusStrip.length > 0 && (
            <SurfaceStrip pills={surface.statusStrip} />
          )}
          {blocks.length ? (
            editor.active ? (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext items={ids} strategy={rectSortingStrategy}>
                  <div className="simui-grid simui-surface-grid">
                    {blocks.map((b) => <BlockChrome key={b.id} block={b} editing />)}
                  </div>
                </SortableContext>
              </DndContext>
            ) : (
              <div className="simui-grid simui-surface-grid">
                {blocks.map((b) => <StaticBlock key={b.id} block={b} />)}
              </div>
            )
          ) : editor.active ? (
            <EmptyState
              title={`${title} is empty`}
              onAddCard={() => editor.openGallery()}
              onPickTemplate={() => editor.openTemplates()}
            />
          ) : (
            <div className="simui-msg">Nothing in {title.toLowerCase()} yet.</div>
          )}
        </div>
      </div>
      <EditorOverlay />
    </div>
  );
}

/** Generic surface for categories without a dedicated preset (media / scenes). */
function fallbackSurface(categoryId: string, states: HassEntities): Surface {
  const surface: Surface = { blocks: [] };

  if (categoryId === 'media') {
    const players = ofDomain(states, 'media_player').filter(isLive);
    for (const p of players) {
      surface.blocks.push({ id: blockId('cat-media'), type: 'card', entityIds: [p.entity_id], span: 2 });
    }
    return surface;
  }

  if (categoryId === 'scenes') {
    const ids = [...ofDomain(states, 'scene'), ...ofDomain(states, 'script')].filter(isLive).map((e) => e.entity_id);
    if (ids.length) surface.blocks.push({ id: blockId('cat-scenes'), type: 'group', title: 'Scenes & scripts', axis: 'function', entityIds: ids, span: 'full' });
    return surface;
  }

  return surface;
}
