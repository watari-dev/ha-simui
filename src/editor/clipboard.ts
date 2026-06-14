// Editor clipboard + block-cloning helpers.
//
// SPEC_EDITOR.md §1.4: Copy/Paste (⌘C / ⌘V) and Duplicate (⌘D) both detach a
// `BlockConfig` and re-issue *fresh* ids so the clone is an independent block —
// never an alias of the original (which would make undo/move/remove ambiguous and
// corrupt persistence, since `Block.id` is the dnd-kit key and the surface key).
//
// Pure data utilities (no React, no store). The store calls `detachBlock` for
// copy/duplicate and `pasteBlock` to realise a clipboard entry.

import { uid } from '../util';
import type { BlockConfig } from './types';

/** Deep clone that survives without structuredClone (older runtimes / tests). */
function deepClone<T>(value: T): T {
  if (typeof structuredClone === 'function') return structuredClone(value);
  return JSON.parse(JSON.stringify(value)) as T;
}

/**
 * Produce an independent copy of a block with a brand-new id. Everything else —
 * `entityIds`, per-tile `tiles` overrides, `options`, `actions`, `chart`,
 * `source`, `visibleWhen` — is deep-cloned so editing the clone never mutates the
 * source. The id is the ONLY field re-issued: tile overrides are keyed by
 * entityId (stable across the clone), and chart series reference entityIds, so no
 * inner id rewrite is needed.
 */
export function detachBlock(block: BlockConfig): BlockConfig {
  const clone = deepClone(block);
  clone.id = uid();
  return clone;
}

/**
 * The transient copy buffer. Holds at most one detached block (the last copied /
 * cut). Cross-surface paste is allowed (SPEC_EDITOR.md §1.4), so this is a plain
 * value the editor store carries in `EditorState.clipboard`, not surface-scoped.
 */
export type Clipboard = BlockConfig | null;

/**
 * Snapshot a block INTO the clipboard: detach + fresh id at copy time so a later
 * paste is already independent even if the source block is since deleted. (Paste
 * re-detaches again, so multiple pastes of one copy are each independent.)
 */
export function copyToClipboard(block: BlockConfig): Clipboard {
  return detachBlock(block);
}

/**
 * Realise a clipboard entry as a NEW block ready to insert. Re-detaches (fresh
 * id + deep clone) so pasting the same clipboard buffer N times yields N
 * independent blocks. Returns `null` when the clipboard is empty.
 */
export function pasteFromClipboard(clipboard: Clipboard): BlockConfig | null {
  if (!clipboard) return null;
  return detachBlock(clipboard);
}
