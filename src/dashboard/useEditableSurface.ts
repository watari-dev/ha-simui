// useEditableSurface — the one place the three editable surfaces (Home summary,
// a composed room, a cross-room category) agree on how editing works.
//
// The three views are structurally identical in their edit lifecycle — enter
// snapshots a live preset into an editable override (category/home) or edits the
// room's own blocks directly (room); the rendered block list is the editor's
// optimistic working copy while active, else the override (or the live surface);
// exit/reset are thin wrappers over the editor + dashboard stores. This hook
// captures that contract once and folds the per-surface differences into a single
// discriminated descriptor, so the views stay free of duplicated wiring.

import type { Block } from './types';
import { useDashboard } from './store';
import { useEditor } from '../editor/store';

/**
 * Which surface is being edited. Category/home are override-backed (a generated
 * preset snapshotted into a persisted, editable copy); a room edits its own blocks
 * directly and has no preset to reset to.
 */
export type EditableSurface =
  | { kind: 'category'; id: string }
  | { kind: 'room' }
  | { kind: 'home' };

interface UseEditableSurfaceArgs {
  /** The surface descriptor (drives snapshot + reset behaviour). */
  surface: EditableSurface;
  /** The live/generated block list for this surface (preset output, or the room's blocks). */
  surfaceBlocks: Block[];
  /** The persisted override blocks, if any (category/home). Rooms pass `undefined`. */
  override?: Block[];
}

export interface EditableSurfaceController {
  /** The block list to render: the editor's working copy while active, else the override, else the live surface. */
  blocks: Block[];
  /** Whether the editor is currently active on this surface. */
  active: boolean;
  /** Toggle edit mode — snapshots the live preset into an override first (category/home), then enters. */
  onEditToggle: () => void;
  /** Reset to the generated preset (category/home). `undefined` for rooms (no preset). */
  onReset?: () => void;
  /** Exit the editor (if active) and run the host's navigation. */
  onBack: (goBack: () => void) => void;
  /** Reorder blocks by index (the DnD drag-end handler). */
  moveBlock: (from: number, to: number) => void;
  /** Open the card gallery (EmptyState → "Add card"). */
  openGallery: () => void;
  /** Open the template picker (EmptyState → "Pick template"; category/home only). */
  openTemplates: () => void;
}

/**
 * Encapsulates the per-surface edit contract shared by CategoryView / RoomView /
 * HomeView. Behaviour-preserving: each view keeps its exact enter/exit/blocks/reset
 * semantics — they just stop spelling them out inline.
 */
export function useEditableSurface({
  surface,
  surfaceBlocks,
  override,
}: UseEditableSurfaceArgs): EditableSurfaceController {
  const { setEditing, createOverride, resetOverride, createHomeOverride, resetHomeOverride } =
    useDashboard();
  const editor = useEditor();

  // An override (a user-edited snapshot) takes over from the live surface. While
  // the editor is active we render its optimistic working copy (`dirtyBlocks`) so
  // edits show instantly; the editor commits them back (debounced).
  const blocks = editor.active ? editor.dirtyBlocks : override ? override : surfaceBlocks;

  // Entering edit on a category/home surface first snapshots the live preset into an
  // editable override (the editor seeds its working copy from the override once it
  // materialises), then hands control to the editor store. Rooms are already editable
  // and need no snapshot. The dashboard `editing` flag flips in the same beat as
  // `editor.enter()` so the two start in lockstep.
  const onEditToggle = () => {
    if (editor.active) {
      editor.exit();
      return;
    }
    if (surface.kind === 'category') {
      if (!override) createOverride(surface.id, surfaceBlocks);
    } else if (surface.kind === 'home') {
      if (!override) createHomeOverride(surfaceBlocks);
    }
    // room: no snapshot — its blocks live directly on the room.
    setEditing(true);
    editor.enter();
  };

  // Reset drops the override and returns to the live preset (category/home only).
  // Rooms have no preset, so `onReset` is undefined.
  const onReset =
    surface.kind === 'category'
      ? () => {
          editor.exit({ discard: true });
          resetOverride(surface.id);
        }
      : surface.kind === 'home'
        ? () => {
            editor.exit({ discard: true });
            resetHomeOverride();
          }
        : undefined;

  const onBack = (goBack: () => void) => {
    if (editor.active) editor.exit();
    goBack();
  };

  return {
    blocks,
    active: editor.active,
    onEditToggle,
    onReset,
    onBack,
    moveBlock: editor.moveBlock,
    openGallery: editor.openGallery,
    openTemplates: editor.openTemplates,
  };
}
