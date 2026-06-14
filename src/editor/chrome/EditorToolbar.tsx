import { Undo2, Redo2, Plus, Check } from 'lucide-react';
import { useEditor } from '../store';
import './EditorToolbar.css';

/**
 * EditorToolbar — the slim floating command bar shown while the editor is active
 * (SPEC_EDITOR §6 chrome). A Linear-restraint frame around editing: Undo / Redo
 * (disabled per canUndo/canRedo), Add card (opens the gallery), Done (exits +
 * flushes), and an unobtrusive dirty/"saving" hint — a dot, never a spinner, so
 * the save stays calm (DESIGN_PRINCIPLES §14, minimal motion).
 *
 * Reads `useEditor()` directly (it is editor chrome, not a reusable leaf), so it
 * MUST be rendered inside an <EditorProvider>. It self-gates on `active`, so the
 * integrator can mount it unconditionally next to the surface and it appears only
 * while editing. Floats centred at the bottom on phone (respecting the safe-area
 * inset) and shifts to the bottom-right on desktop.
 */
export function EditorToolbar() {
  const editor = useEditor();
  if (!editor.active) return null;

  const { canUndo, canRedo, committing, undo, redo, openGallery, exit } = editor;

  return (
    <div className="simui-root simui-etb-anchor" role="toolbar" aria-label="Editing">
      <div className="simui-etb">
        <div className="simui-etb-group">
          <button
            type="button"
            className="simui-etb-btn"
            onClick={undo}
            disabled={!canUndo}
            aria-label="Undo"
            title="Undo (⌘Z)"
          >
            <Undo2 size={16} strokeWidth={2} />
          </button>
          <button
            type="button"
            className="simui-etb-btn"
            onClick={redo}
            disabled={!canRedo}
            aria-label="Redo"
            title="Redo (⇧⌘Z)"
          >
            <Redo2 size={16} strokeWidth={2} />
          </button>
        </div>

        <span className="simui-etb-div" aria-hidden />

        <button
          type="button"
          className="simui-etb-btn primary"
          onClick={openGallery}
          aria-label="Add a card"
          title="Add a card"
        >
          <Plus size={16} strokeWidth={2.2} />
          <span className="simui-etb-label">Add card</span>
        </button>

        <span className="simui-etb-div" aria-hidden />

        {/* Save state — a quiet dot, not a spinner. Live region so a screen reader
            hears "Saving…" / "Saved" without stealing focus. */}
        <span
          className={`simui-etb-save${committing ? ' is-saving' : ''}`}
          role="status"
          aria-live="polite"
        >
          <span className="simui-etb-dot" aria-hidden />
          <span className="simui-etb-save-label">{committing ? 'Saving' : 'Saved'}</span>
        </span>

        <button
          type="button"
          className="simui-etb-btn done"
          onClick={() => exit()}
          aria-label="Done editing"
          title="Done editing"
        >
          <Check size={16} strokeWidth={2.2} />
          <span className="simui-etb-label">Done</span>
        </button>
      </div>
    </div>
  );
}
