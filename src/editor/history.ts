// Editor undo/redo — a bounded ring of EditorSnapshots with gesture coalescing.
//
// SPEC_EDITOR.md §1.4: undo/redo is a *bounded* ring of `EditorSnapshot`
// (`blocks` + `selection`), surface-scoped (switching surfaces clears it), and
// coalescing — rapid slider/text edits in the Inspector debounce into a single
// snapshot so ⌘Z undoes a *gesture*, not a keystroke.
//
// This module is pure data (no React): the editor store holds a `HistoryRing`
// instance in a ref and mirrors `canUndo` / `canRedo` into state. Keeping it out
// of React makes coalescing trivial — `push` decides, by a coalesce key + a time
// window, whether to fold the new snapshot into the previous one or open a new
// undo step.

import type { EditorSnapshot } from './types';

/** Max retained undo steps (SPEC_EDITOR.md §1.4 suggests ~50). */
export const HISTORY_LIMIT = 50;

/** Coalesce window: edits sharing a key within this many ms fold into one step. */
const COALESCE_MS = 600;

/**
 * Identifies a *gesture* for coalescing. Two consecutive pushes with an equal,
 * non-null key inside the time window collapse into a single undo step (e.g. a
 * slider drag firing many `updateTile` patches, or repeated keystrokes in one
 * text field). A `null` key never coalesces — it always opens a fresh step
 * (structural ops: add / remove / move / paste / drop).
 *
 * Convention used by the store: `update:<blockId>:<field>` /
 * `tile:<blockId>:<entityId>:<field>` for fine-grained inspector edits; `null`
 * for everything discrete.
 */
export type CoalesceKey = string | null;

/** Deep-ish clone of a snapshot so the ring never aliases live working state. */
function cloneSnapshot(s: EditorSnapshot): EditorSnapshot {
  return {
    // Blocks are plain JSON-shaped config; structuredClone keeps it honest and
    // detaches nested `tiles` / `options` / `chart` objects from the live copy.
    blocks: cloneBlocks(s.blocks),
    selection: { ...s.selection },
  };
}

function cloneBlocks<T>(blocks: T): T {
  if (typeof structuredClone === 'function') return structuredClone(blocks);
  return JSON.parse(JSON.stringify(blocks)) as T;
}

/**
 * The bounded undo/redo ring. Stores *committed* snapshots only: the store calls
 * `push(present, key)` BEFORE applying a mutation, so each entry is the state to
 * return to. `undo`/`redo` swap the present across the two stacks.
 */
export class HistoryRing {
  private undoStack: EditorSnapshot[] = [];
  private redoStack: EditorSnapshot[] = [];
  /** Key + timestamp of the most recent push, for coalescing. */
  private lastKey: CoalesceKey = null;
  private lastAt = 0;

  constructor(private readonly limit: number = HISTORY_LIMIT) {}

  get canUndo(): boolean {
    return this.undoStack.length > 0;
  }
  get canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  /** Expose copies for `EditorState.undoStack` / `redoStack` mirroring. */
  snapshotStacks(): { undoStack: EditorSnapshot[]; redoStack: EditorSnapshot[] } {
    return { undoStack: [...this.undoStack], redoStack: [...this.redoStack] };
  }

  /**
   * Record `present` as a restore point before a mutation is applied. Any redo
   * history is discarded (a new edit forks the timeline). If `key` matches the
   * previous push within the coalesce window, the push is folded — the prior
   * restore point is kept and only the recency clock is refreshed — so a whole
   * gesture is one undo step.
   */
  push(present: EditorSnapshot, key: CoalesceKey = null, now: number = Date.now()): void {
    const coalesces =
      key !== null &&
      key === this.lastKey &&
      now - this.lastAt <= COALESCE_MS &&
      this.undoStack.length > 0;

    this.lastKey = key;
    this.lastAt = now;

    // A new edit always invalidates the redo branch.
    if (this.redoStack.length) this.redoStack = [];

    if (coalesces) {
      // Fold: the existing top already captures the pre-gesture state.
      return;
    }

    this.undoStack.push(cloneSnapshot(present));
    if (this.undoStack.length > this.limit) this.undoStack.shift();
  }

  /**
   * Pop one restore point. `present` (the current working snapshot) is pushed
   * onto the redo stack so `redo` can return to it. Returns the snapshot to
   * apply, or `null` when there is nothing to undo.
   */
  undo(present: EditorSnapshot): EditorSnapshot | null {
    const prev = this.undoStack.pop();
    if (!prev) return null;
    this.redoStack.push(cloneSnapshot(present));
    if (this.redoStack.length > this.limit) this.redoStack.shift();
    // Undo breaks any in-flight coalescing gesture.
    this.lastKey = null;
    return prev;
  }

  /** Inverse of `undo`. Returns the snapshot to apply, or `null`. */
  redo(present: EditorSnapshot): EditorSnapshot | null {
    const next = this.redoStack.pop();
    if (!next) return null;
    this.undoStack.push(cloneSnapshot(present));
    if (this.undoStack.length > this.limit) this.undoStack.shift();
    this.lastKey = null;
    return next;
  }

  /** Drop all history (surface switch / exit). */
  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
    this.lastKey = null;
    this.lastAt = 0;
  }
}
