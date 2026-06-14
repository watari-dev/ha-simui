import { LayoutTemplate, Plus, Sparkles } from 'lucide-react';
import './EmptyState.css';

export interface EmptyStateProps {
  /** Heading copy. Omit ⇒ a sensible default ("This surface is empty"). */
  title?: string;
  /** Supporting line under the heading. Omit ⇒ a sensible default. */
  hint?: string;
  /**
   * Start-from-a-template action. Omit ⇒ the template button is hidden (e.g. a
   * room surface where presets don't apply), leaving just "Add a card".
   */
  onPickTemplate?: () => void;
  /** Add-a-card action (opens the gallery). */
  onAddCard: () => void;
}

/**
 * EmptyState — the friendly empty-surface state (SPEC_EDITOR §6 chrome). Shown in
 * place of a block grid when a surface has no blocks yet, in edit mode. Two clear
 * on-ramps, glance → act: "Start from a template" (the fast, nice-page path) and
 * "Add a card" (compose by hand). Purely presentational — the host wires the
 * callbacks to the preset picker / `editor.openGallery()`.
 *
 * Self-contained and additive: it owns no store state. Quiet by design — one soft
 * accent on the primary action, monochrome elsewhere; it appears, it doesn't
 * animate (DESIGN_PRINCIPLES §14).
 */
export function EmptyState({
  title = 'This surface is empty',
  hint = 'Start from a template for an instant page, or add a card and compose it yourself.',
  onPickTemplate,
  onAddCard,
}: EmptyStateProps) {
  return (
    <div className="simui-root simui-empty">
      <div className="simui-empty-art" aria-hidden>
        <span className="simui-empty-glyph">
          <Sparkles size={22} strokeWidth={1.6} />
        </span>
      </div>
      <h2 className="simui-empty-title">{title}</h2>
      <p className="simui-empty-hint">{hint}</p>
      <div className="simui-empty-actions">
        {onPickTemplate && (
          <button
            type="button"
            className="simui-empty-btn primary"
            onClick={onPickTemplate}
          >
            <LayoutTemplate size={16} strokeWidth={2} />
            <span>Start from a template</span>
          </button>
        )}
        <button
          type="button"
          className={`simui-empty-btn${onPickTemplate ? '' : ' primary'}`}
          onClick={onAddCard}
        >
          <Plus size={16} strokeWidth={2.2} />
          <span>Add a card</span>
        </button>
      </div>
    </div>
  );
}
