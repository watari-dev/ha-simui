// Editor chrome & UX — the frame around editing (SPEC_EDITOR §6).
//
// The toolbar, empty states, onboarding coachmark, and selection/edit-affordance
// styles that wrap the editor's panels. All self-contained and additive: nothing
// here is imported by existing files until the integrator wires it in (see the
// INTEGRATION notes returned with this module). The two presentational components
// (EmptyState / OnboardingHint) own no store state; EditorToolbar reads `useEditor()`
// and self-gates on `active`, so it can be mounted unconditionally beside the surface.
//
// The two affordance stylesheets (selection.css / edit-affordances.css) export no
// symbols — import them once (e.g. here, or where the surface mounts) so their
// additive classes are available to BlockChrome-style markup.

import './selection.css';
import './edit-affordances.css';

export { EditorToolbar } from './EditorToolbar';
export { EmptyState } from './EmptyState';
export type { EmptyStateProps } from './EmptyState';
export { OnboardingHint } from './OnboardingHint';
export type { OnboardingHintProps } from './OnboardingHint';
