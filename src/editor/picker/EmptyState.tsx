// EmptyState — the picker's no-results surface. Two voices: a "nothing matches your
// search" state (offers a one-tap Clear) and a "nothing here yet" state for an empty
// universe. Calm, centered, monochrome — a dead-end should feel intentional, not broken.
//
// Self-contained: React + lucide + its own CSS. Not wired anywhere yet.

import { SearchX } from 'lucide-react';
import './EmptyState.css';

export interface EmptyStateProps {
  /** True when a text query is active (changes the copy + offers Clear). */
  querying?: boolean;
  /** Optional one-tap reset of the active search/facets. */
  onClearFilters?: () => void;
  /** Override the title (defaults derive from `querying`). */
  title?: string;
  /** Override the hint line. */
  hint?: string;
}

export function EmptyState({ querying = false, onClearFilters, title, hint }: EmptyStateProps) {
  const heading = title ?? (querying ? 'No matching entities' : 'Nothing to show here');
  const sub =
    hint ??
    (querying
      ? 'Try a different search, or widen the filters.'
      : 'Adjust the filters above to see entities.');

  return (
    <div className="pk-empty" role="status">
      <span className="pk-empty-ico" aria-hidden>
        <SearchX size={26} strokeWidth={1.5} />
      </span>
      <div className="pk-empty-title">{heading}</div>
      <div className="pk-empty-hint">{sub}</div>
      {querying && onClearFilters ? (
        <button type="button" className="pk-empty-btn" onClick={onClearFilters}>
          Clear filters
        </button>
      ) : null}
    </div>
  );
}
