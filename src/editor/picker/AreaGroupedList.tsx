// AreaGroupedList — the picker's result surface. Ranked rows are grouped under
// sticky AREA headers (graceful, glanceable structure instead of a flat dump), each
// header carrying a count + a "select all in area" affordance. Rows show the domain
// glyph, fuzzy-highlighted name, entity id, and a live-ish state hint, with a
// multi-select checkmark (or single-select radio).
//
// Graceful degradation for huge registries: rather than render thousands of nodes,
// each area is CAPPED at `perAreaCap` rows with a "+N more" expander, and the whole
// list is CAPPED at `totalCap` rendered rows with a trailing "+N more entities —
// refine your search" hint. Never an infinite wall. (The parent already narrows via
// facets; this is the safety net for the unfiltered first paint.)
//
// Controlled: selection lives in the parent (rows carry `selected`); this emits
// toggle / select-all-in-area / row-activate callbacks only. Keyboard nav (a roving
// active index over the FLAT visible row order) is owned here so arrow keys move
// across area boundaries naturally.
//
// Self-contained: React + lucide + its own CSS + ./pickerModel + ./EmptyState.

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import {
  bucketByArea,
  domainIcon,
  isDead,
  stateHint,
  UNASSIGNED,
  type AreaBucket,
  type PickerRow,
} from './pickerModel';
import { EmptyState } from './EmptyState';
import './AreaGroupedList.css';

export interface AreaGroupedListProps {
  /** Ranked, already-filtered rows (from rowsFromIndex). */
  rows: PickerRow[];
  /** Resolve an area key → header label (from the index's area facets). */
  areaName: (areaId: string) => string;
  /** Single vs multi affordance (radio vs checkbox). */
  multi?: boolean;
  /** Whether a text query is active (drives ranked-vs-alpha bucket order + empty copy). */
  querying?: boolean;
  /** Toggle one entity's selection. */
  onToggle: (entityId: string) => void;
  /** Select every (currently-visible) row in an area at once. */
  onSelectArea: (entityIds: string[]) => void;
  /** Rows to render per area before a "+N more" expander (default 12). */
  perAreaCap?: number;
  /** Hard cap on total rendered rows across all areas (default 300). */
  totalCap?: number;
  /** Clear the active search/facets from the empty state. */
  onClearFilters?: () => void;
}

export function AreaGroupedList({
  rows,
  areaName,
  multi = true,
  querying = false,
  onToggle,
  onSelectArea,
  perAreaCap = 12,
  totalCap = 300,
  onClearFilters,
}: AreaGroupedListProps) {
  const buckets = useMemo(
    () => bucketByArea(rows, areaName, !querying),
    [rows, areaName, querying],
  );

  // Per-area "expanded" set (which areas show beyond their cap).
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  // Collapse expansions whenever the result set changes shape.
  useEffect(() => {
    setExpanded(new Set());
  }, [querying]);

  // Roving active index over the FLAT visible-row order (across areas).
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  // Build the flat render plan: a sequence of header + row + footer nodes, while
  // tracking the flat row index for keyboard nav and enforcing the total cap.
  const plan = useMemo(
    () => buildPlan(buckets, expanded, perAreaCap, totalCap),
    [buckets, expanded, perAreaCap, totalCap],
  );
  const flatCount = plan.flatRows.length;

  // Clamp the active index when the visible set shrinks.
  useEffect(() => {
    setActive((a) => (flatCount === 0 ? 0 : Math.min(a, flatCount - 1)));
  }, [flatCount]);

  // Reset to the top when the query/facets change (best match first).
  useEffect(() => {
    setActive(0);
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [rows]);

  const scrollActiveIntoView = (idx: number) => {
    const el = listRef.current;
    if (!el) return;
    const node = el.querySelector<HTMLElement>(`[data-flat="${idx}"]`);
    node?.scrollIntoView({ block: 'nearest' });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (flatCount === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => {
        const n = Math.min(flatCount - 1, a + 1);
        scrollActiveIntoView(n);
        return n;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => {
        const n = Math.max(0, a - 1);
        scrollActiveIntoView(n);
        return n;
      });
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(0);
      scrollActiveIntoView(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      const n = flatCount - 1;
      setActive(n);
      scrollActiveIntoView(n);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const row = plan.flatRows[active];
      if (row) onToggle(row.entityId);
    }
  };

  if (rows.length === 0) {
    return <EmptyState querying={querying} onClearFilters={onClearFilters} />;
  }

  return (
    <div
      className="pk-list"
      ref={listRef}
      role="listbox"
      aria-multiselectable={multi}
      aria-label="Entities"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {plan.sections.map((section) => (
        <AreaSection
          key={section.bucket.areaId}
          section={section}
          multi={multi}
          activeId={plan.flatRows[active]?.entityId}
          onToggle={onToggle}
          onSelectArea={onSelectArea}
          onActivate={(id) => {
            const idx = plan.flatRows.findIndex((r) => r.entityId === id);
            if (idx >= 0) setActive(idx);
          }}
          onExpand={() =>
            setExpanded((prev) => {
              const next = new Set(prev);
              next.add(section.bucket.areaId);
              return next;
            })
          }
        />
      ))}
      {plan.overflow > 0 ? (
        <div className="pk-overflow">
          <span className="simui-value">+{plan.overflow}</span> more entities — refine your
          search to narrow the list
        </div>
      ) : null}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Render plan — flatten buckets into sections, honoring per-area + total caps.
// ─────────────────────────────────────────────────────────────────────────────

interface PlanSection {
  bucket: AreaBucket;
  /** Rows actually rendered for this area (after caps). */
  shown: PickerRow[];
  /** Whether this area is truncated and shows a "+N more" expander. */
  truncated: boolean;
  /** Hidden-row count for this area's expander. */
  hidden: number;
  /** Flat index of the first row in this section (for data-flat attrs). */
  flatStart: number;
}

interface Plan {
  sections: PlanSection[];
  /** Every shown row, in flat render order (for keyboard nav). */
  flatRows: PickerRow[];
  /** Total rows dropped by the total cap (the trailing "+N more" hint). */
  overflow: number;
}

function buildPlan(
  buckets: AreaBucket[],
  expanded: ReadonlySet<string>,
  perAreaCap: number,
  totalCap: number,
): Plan {
  const sections: PlanSection[] = [];
  const flatRows: PickerRow[] = [];
  let budget = totalCap;
  let overflow = 0;

  for (const bucket of buckets) {
    if (budget <= 0) {
      overflow += bucket.rows.length;
      continue;
    }
    const isExpanded = expanded.has(bucket.areaId);
    const areaCap = isExpanded ? bucket.rows.length : Math.min(perAreaCap, bucket.rows.length);
    // Also clamp to the remaining global budget.
    const take = Math.min(areaCap, budget);
    const shown = bucket.rows.slice(0, take);
    const hiddenInArea = bucket.rows.length - shown.length;

    sections.push({
      bucket,
      shown,
      truncated: hiddenInArea > 0,
      hidden: hiddenInArea,
      flatStart: flatRows.length,
    });
    for (const r of shown) flatRows.push(r);
    budget -= shown.length;
    // Note: rows hidden by a per-area cap are revealed by that area's own "+N more"
    // expander, so they are NOT counted in `overflow` — the trailing global hint
    // reflects only entire areas dropped once the global budget is exhausted.
  }
  return { sections, flatRows, overflow };
}

// ─────────────────────────────────────────────────────────────────────────────
// AreaSection — a sticky header + its rows + an optional "+N more" expander.
// ─────────────────────────────────────────────────────────────────────────────

function AreaSection({
  section,
  multi,
  activeId,
  onToggle,
  onSelectArea,
  onActivate,
  onExpand,
}: {
  section: PlanSection;
  multi: boolean;
  activeId: string | undefined;
  onToggle: (id: string) => void;
  onSelectArea: (ids: string[]) => void;
  onActivate: (id: string) => void;
  onExpand: () => void;
}) {
  const { bucket, shown, truncated, hidden, flatStart } = section;
  // "Select all" targets the rows currently shown for the area (predictable: the
  // user selects what they can see). Already-fully-selected ⇒ the action deselects.
  const allSelected = shown.length > 0 && shown.every((r) => r.selected);
  const total = bucket.rows.length;

  return (
    <div className="pk-area">
      <div className="pk-area-head">
        <span className="pk-area-label" title={bucket.label}>
          {bucket.areaId === UNASSIGNED ? <span className="pk-area-dim">{bucket.label}</span> : bucket.label}
        </span>
        <span className="pk-area-count simui-value">{total}</span>
        {multi ? (
          <button
            type="button"
            className="pk-area-all"
            onClick={() => onSelectArea(shown.map((r) => r.entityId))}
            title={allSelected ? 'Deselect all shown in this area' : 'Select all shown in this area'}
          >
            {allSelected ? 'None' : 'All'}
          </button>
        ) : null}
      </div>
      {shown.map((row, i) => (
        <PickRow
          key={row.entityId}
          row={row}
          flatIndex={flatStart + i}
          active={row.entityId === activeId}
          multi={multi}
          onToggle={() => onToggle(row.entityId)}
          onActivate={() => onActivate(row.entityId)}
        />
      ))}
      {truncated ? (
        <button type="button" className="pk-area-more" onClick={onExpand}>
          <ChevronDown size={13} aria-hidden />
          Show {hidden} more in {bucket.label}
        </button>
      ) : null}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PickRow — one entity. Cheap + isolated so the list re-renders shallow.
// ─────────────────────────────────────────────────────────────────────────────

function PickRow({
  row,
  flatIndex,
  active,
  multi,
  onToggle,
  onActivate,
}: {
  row: PickerRow;
  flatIndex: number;
  active: boolean;
  multi: boolean;
  onToggle: () => void;
  onActivate: () => void;
}) {
  const Icon = domainIcon(row.domain);
  const dead = isDead(row.entity);
  const hint = stateHint(row.entity);

  return (
    <div
      data-flat={flatIndex}
      className={
        'pk-row' +
        (row.selected ? ' is-selected' : '') +
        (active ? ' is-active' : '') +
        (row.existing ? ' is-existing' : '') +
        (dead ? ' is-dead' : '')
      }
      role="option"
      aria-selected={row.selected}
      onClick={onToggle}
      onMouseMove={onActivate}
    >
      <span className={`pk-check${multi ? '' : ' is-radio'}`} aria-hidden>
        {row.selected ? <Check size={12} strokeWidth={3} /> : null}
      </span>
      <span className="pk-row-ico" aria-hidden>
        <Icon size={15} strokeWidth={2} />
      </span>
      <span className="pk-row-main">
        <span className="pk-row-name" title={row.entityId}>
          <Highlighted text={row.label} hits={row.hits} />
          {row.isGroup ? <span className="pk-badge">group</span> : null}
          {row.existing ? <span className="pk-badge pk-badge-soft">on surface</span> : null}
        </span>
        <span className="pk-row-id">{row.entityId}</span>
      </span>
      <span className="pk-row-state simui-value">{hint}</span>
    </div>
  );
}

// Highlight fuzzy hits inside the entity name. `hits` are sorted indices into `text`.
function Highlighted({ text, hits }: { text: string; hits: number[] }) {
  if (!hits.length) return <>{text}</>;
  const set = new Set(hits);
  const parts: ReactNode[] = [];
  let buf = '';
  let mark = false;
  const flush = (i: number) => {
    if (!buf) return;
    parts.push(
      mark ? (
        <mark key={i} className="pk-hl">
          {buf}
        </mark>
      ) : (
        <span key={i}>{buf}</span>
      ),
    );
    buf = '';
  };
  for (let i = 0; i < text.length; i++) {
    const m = set.has(i);
    if (m !== mark) {
      flush(i);
      mark = m;
    }
    buf += text[i];
  }
  flush(text.length);
  return <>{parts}</>;
}
