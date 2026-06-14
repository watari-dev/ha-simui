// FacetBar — the picker's faceting rail. Three progressive-disclosure dimensions:
//   • a Primary-only ↔ All segmented toggle (curation gate — hides diagnostic noise),
//   • domain chips (ranked by count), and
//   • area chips (alphabetical).
// Every chip carries a tabular count so the user sees what selecting it would yield
// BEFORE they commit. Fully controlled: it renders the `FacetOption[]` lists it is
// handed and emits a complete next `EntityFacets` upward — it owns no state.
//
// Graceful degradation: an empty area list (dev/mock with no registry) simply hides
// the Area group; an empty domain list collapses to a dash. Long chip lists fold
// behind a "Show all" disclosure so the rail never becomes a wall.
//
// Self-contained: React + lucide + its own CSS. Not wired anywhere yet.

import { useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import type { EntityFacets } from '../types';
import type { FacetOption } from '../entityIndex';
import './FacetBar.css';

export interface FacetBarProps {
  /** Current controlled facet state. */
  facets: EntityFacets;
  /** Emit a complete next facet state. */
  onFacetsChange: (facets: EntityFacets) => void;
  /** Domain facet options (id/label/count), already ranked. */
  domainOptions: FacetOption[];
  /** Area facet options (id/label/count), already alpha-sorted. Empty ⇒ hidden. */
  areaOptions: FacetOption[];
  /** Collapse domain/area lists longer than this behind "Show all" (default 8). */
  collapseAfter?: number;
}

export function FacetBar({
  facets,
  onFacetsChange,
  domainOptions,
  areaOptions,
  collapseAfter = 8,
}: FacetBarProps) {
  const domainSel = useMemo(() => new Set(facets.domains ?? []), [facets.domains]);
  const areaSel = useMemo(() => new Set(facets.areas ?? []), [facets.areas]);
  const primaryOnly = facets.primaryOnly !== false;

  const toggleDomain = (id: string) => {
    const cur = facets.domains ?? [];
    const next = cur.includes(id) ? cur.filter((d) => d !== id) : [...cur, id];
    onFacetsChange({ ...facets, domains: next });
  };
  const toggleArea = (id: string) => {
    const cur = facets.areas ?? [];
    const next = cur.includes(id) ? cur.filter((a) => a !== id) : [...cur, id];
    onFacetsChange({ ...facets, areas: next });
  };
  const setPrimaryOnly = (on: boolean) => onFacetsChange({ ...facets, primaryOnly: on });
  const clearAll = () =>
    onFacetsChange({ domains: [], areas: [], query: facets.query, primaryOnly });

  const hasFilters =
    domainSel.size > 0 || areaSel.size > 0 || !!(facets.query && facets.query.length);

  return (
    <div className="pk-facets" aria-label="Filters">
      {/* Curation gate — segmented, not a checkbox: it's the highest-leverage knob,
          and a segmented control reads as the primary axis (glance level). */}
      <div className="pk-seg" role="group" aria-label="Curation">
        <button
          type="button"
          className={`pk-seg-btn${primaryOnly ? ' is-on' : ''}`}
          onClick={() => setPrimaryOnly(true)}
          aria-pressed={primaryOnly}
        >
          Primary
        </button>
        <button
          type="button"
          className={`pk-seg-btn${!primaryOnly ? ' is-on' : ''}`}
          onClick={() => setPrimaryOnly(false)}
          aria-pressed={!primaryOnly}
        >
          All
        </button>
      </div>

      <FacetGroup
        title="Domain"
        options={domainOptions}
        selected={domainSel}
        onToggle={toggleDomain}
        collapseAfter={collapseAfter}
        action={
          hasFilters ? (
            <button className="pk-facet-clear" onClick={clearAll} type="button">
              Clear
            </button>
          ) : null
        }
      />

      {areaOptions.length > 0 ? (
        <FacetGroup
          title="Area"
          options={areaOptions}
          selected={areaSel}
          onToggle={toggleArea}
          collapseAfter={collapseAfter}
        />
      ) : null}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FacetGroup — a titled chip cloud with a "Show all (+N)" disclosure when long.
// Selected chips are always shown even when collapsed, so a chosen facet can't hide.
// ─────────────────────────────────────────────────────────────────────────────

function FacetGroup({
  title,
  options,
  selected,
  onToggle,
  collapseAfter,
  action,
}: {
  title: string;
  options: FacetOption[];
  selected: ReadonlySet<string>;
  onToggle: (id: string) => void;
  collapseAfter: number;
  action?: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  const overflowing = options.length > collapseAfter;

  // When collapsed, keep the first N PLUS any selected-but-hidden chips visible.
  const visible = useMemo(() => {
    if (expanded || !overflowing) return options;
    const head = options.slice(0, collapseAfter);
    const headIds = new Set(head.map((o) => o.id));
    const pinned = options.filter((o) => selected.has(o.id) && !headIds.has(o.id));
    return [...head, ...pinned];
  }, [expanded, overflowing, options, collapseAfter, selected]);

  const hiddenCount = options.length - visible.length;

  if (options.length === 0) {
    return (
      <div className="pk-facet-group">
        <div className="pk-facet-head">
          <span>{title}</span>
          {action}
        </div>
        <span className="pk-facet-empty">—</span>
      </div>
    );
  }

  return (
    <div className="pk-facet-group">
      <div className="pk-facet-head">
        <span>{title}</span>
        {action}
      </div>
      <div className="pk-chips">
        {visible.map((o) => {
          const on = selected.has(o.id);
          return (
            <button
              key={o.id}
              type="button"
              className={`pk-chip${on ? ' is-on' : ''}`}
              onClick={() => onToggle(o.id)}
              aria-pressed={on}
              title={`${o.label} · ${o.n}`}
            >
              {on ? <Check size={11} strokeWidth={3} className="pk-chip-check" aria-hidden /> : null}
              <span className="pk-chip-label">{o.label}</span>
              <span className="pk-chip-count">{o.n}</span>
            </button>
          );
        })}
        {overflowing ? (
          <button
            type="button"
            className="pk-chip pk-chip-more"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : `+${hiddenCount} more`}
          </button>
        ) : null}
      </div>
    </div>
  );
}
