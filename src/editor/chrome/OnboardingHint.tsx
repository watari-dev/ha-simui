import { X, MousePointerClick, Plus, Undo2 } from 'lucide-react';
import './OnboardingHint.css';

export interface OnboardingHintProps {
  /** Called when the user dismisses the coachmark (the host persists the flag). */
  onDismiss: () => void;
  /** Heading. Omit ⇒ "You're editing". */
  title?: string;
}

/**
 * OnboardingHint — a one-time coachmark for first-time edit mode (SPEC_EDITOR §6
 * chrome). Purely presentational: it explains the three core moves (tap a card to
 * tweak it, add cards, undo anything) and offers a single Dismiss. It does NOT
 * read or write any storage — the host decides when to show it (e.g. a
 * `simui:editor:onboarded` flag) and passes `onDismiss` to flip that flag. Sits
 * above the surface near the toolbar so the eye connects the hint to the controls.
 *
 * Minimal motion: it appears, it doesn't slide in (DESIGN_PRINCIPLES §14).
 */
export function OnboardingHint({ onDismiss, title = "You're editing" }: OnboardingHintProps) {
  return (
    <div
      className="simui-root simui-coach-anchor"
      role="dialog"
      aria-label="Editing tips"
    >
      <div className="simui-coach">
        <button
          type="button"
          className="simui-coach-x"
          onClick={onDismiss}
          aria-label="Dismiss tip"
        >
          <X size={14} strokeWidth={2.2} />
        </button>
        <div className="simui-coach-title">{title}</div>
        <ul className="simui-coach-list">
          <li className="simui-coach-item">
            <span className="simui-coach-ic" aria-hidden>
              <MousePointerClick size={15} strokeWidth={2} />
            </span>
            <span><b>Tap a card</b> to rename, recolour or restyle it.</span>
          </li>
          <li className="simui-coach-item">
            <span className="simui-coach-ic" aria-hidden>
              <Plus size={15} strokeWidth={2} />
            </span>
            <span><b>Add card</b> opens a gallery of live previews to drop in.</span>
          </li>
          <li className="simui-coach-item">
            <span className="simui-coach-ic" aria-hidden>
              <Undo2 size={15} strokeWidth={2} />
            </span>
            <span><b>Undo</b> anything — nothing saves until it looks right.</span>
          </li>
        </ul>
        <button type="button" className="simui-coach-go" onClick={onDismiss}>
          Got it
        </button>
      </div>
    </div>
  );
}
