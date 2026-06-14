// EntityPicker — the faceted, virtualized entity chooser (SPEC_EDITOR.md §entity-picker).
//
// Replaces the flat AddCardPanel: filter by domain / area / text, fuzzy-match,
// multi-select, full keyboard nav, and confirm. CONTROLLED per the foundation
// contract (`EntityPickerProps` in ./types): facets + selection are owned by the
// parent so the picker is reusable for "add members" (multi) and "pick a chart
// series" (single). Live entity data arrives as a snapshot; the picker does not
// subscribe itself.
//
// VIRTUALIZED with a self-contained windowing impl (no new dependency): a tall
// spacer sizes the scroll track, and only the rows intersecting the viewport (plus
// a small overscan) are rendered. This keeps a 6,000-entity home smooth.
//
// Design law (DESIGN_PRINCIPLES.md): dark-first, monochrome + single accent, tabular
// numerals, minimal motion (no row animation), hairline chrome. Group entities are
// preferred (surfaced + badged) because composing from a `group.*` is denser than
// hand-picking its members.

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react';
import { Check, Layers, Search, X } from 'lucide-react';
import type { EntityPickerProps } from './types';
import type { HassEntity } from '../types';
import { domainOf, friendly, prettyState } from '../util';
import { iconNode } from '../components/icons';
import './EntityPicker.css';

// ─────────────────────────────────────────────────────────────────────────────
// Fuzzy matcher — a small subsequence scorer (no dependency). Returns a score
// (higher = better) or null when `query` is not a subsequence of `text`. Bonuses:
// prefix match, word-boundary starts, and contiguous runs. Lowercased upstream.
// ─────────────────────────────────────────────────────────────────────────────

interface FuzzyResult {
  score: number;
  /** Match indices in the haystack, for highlighting. */
  hits: number[];
}

function fuzzyScore(needle: string, hay: string): FuzzyResult | null {
  if (!needle) return { score: 0, hits: [] };
  if (!hay) return null;
  // Fast exact-substring path scores highest (and gives a clean contiguous range).
  const sub = hay.indexOf(needle);
  if (sub >= 0) {
    const hits: number[] = [];
    for (let i = 0; i < needle.length; i++) hits.push(sub + i);
    // Prefix / word-boundary bonus on top of a big contiguous score.
    const boundary = sub === 0 || /[\s._-]/.test(hay[sub - 1]) ? 40 : 0;
    return { score: 1000 - sub + boundary + needle.length * 4, hits };
  }
  // Subsequence walk.
  let h = 0;
  let score = 0;
  let run = 0;
  const hits: number[] = [];
  for (let n = 0; n < needle.length; n++) {
    const ch = needle[n];
    let found = -1;
    for (; h < hay.length; h++) {
      if (hay[h] === ch) {
        found = h;
        break;
      }
    }
    if (found < 0) return null;
    const prev = hay[found - 1];
    const boundary = found === 0 || (prev !== undefined && /[\s._-]/.test(prev));
    score += 1 + (boundary ? 8 : 0) + run * 3; // contiguous runs compound
    run = found === (hits[hits.length - 1] ?? -2) + 1 ? run + 1 : 0;
    hits.push(found);
    h = found + 1;
  }
  return { score, hits };
}

// ─────────────────────────────────────────────────────────────────────────────
// Row model — what virtualization renders.
// ─────────────────────────────────────────────────────────────────────────────

interface PickRow {
  entityId: string;
  entity: HassEntity | undefined;
  /** Cached label (friendly name) for render + measuring. */
  label: string;
  /** Lowercased haystack used by fuzzy search. */
  hay: string;
  domain: string;
  areaId: string | undefined;
  isGroup: boolean;
  /** Highlight hit indices into `label` (empty when no query). */
  hits: number[];
}

const ROW_H = 44; // px — fixed-height rows keep windowing math trivial.
const OVERSCAN = 6; // rows above/below the viewport to pre-render.
const VIEWPORT_H = 360; // px — list viewport height (matches CSS .ep-list height).

// A friendly domain label for the facet rail.
const DOMAIN_LABELS: Record<string, string> = {
  light: 'Lights',
  switch: 'Switches',
  sensor: 'Sensors',
  binary_sensor: 'Binary sensors',
  climate: 'Climate',
  cover: 'Covers',
  media_player: 'Media',
  lock: 'Locks',
  fan: 'Fans',
  camera: 'Cameras',
  vacuum: 'Vacuums',
  scene: 'Scenes',
  script: 'Scripts',
  automation: 'Automations',
  group: 'Groups',
  person: 'People',
  device_tracker: 'Trackers',
  weather: 'Weather',
  number: 'Numbers',
  select: 'Selects',
  button: 'Buttons',
};

function domainLabel(d: string): string {
  return DOMAIN_LABELS[d] ?? prettyState(d);
}

// `areaOf` may hand back a real area name ("Living Room") or a slug id
// ("living_room", "heuristic:living_room"). Prettify slugs for the facet chip;
// leave already-spaced names untouched.
function areaLabel(idOrName: string): string {
  if (/\s/.test(idOrName)) return idOrName;
  const raw = idOrName.replace(/^heuristic:/, '');
  return raw
    .split(/[._-]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// `group.*`, plus any entity whose attributes carry an `entity_id` list (HA groups
// and light groups both do) — these compose denser than their members, so we prefer
// and badge them.
function isGroupEntity(id: string, e: HassEntity | undefined): boolean {
  if (domainOf(id) === 'group') return true;
  const members = e?.attributes?.entity_id;
  return Array.isArray(members) && members.length > 1;
}

// ─────────────────────────────────────────────────────────────────────────────
// EntityPicker
// ─────────────────────────────────────────────────────────────────────────────

export function EntityPicker({
  states,
  areaOf,
  isPrimary,
  existing,
  multi = true,
  facets,
  onFacetsChange,
  selected,
  onSelectedChange,
  onConfirm,
  onClose,
}: EntityPickerProps) {
  const existingSet = useMemo(() => new Set(existing ?? []), [existing]);
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  // ── Build the raw, un-filtered row universe once per states identity. This is
  //    the expensive pass (thousands of entities); it survives keystrokes via memo.
  const allRows = useMemo<PickRow[]>(() => {
    const rows: PickRow[] = [];
    for (const e of Object.values(states)) {
      const id = e.entity_id;
      const label = friendly(e);
      rows.push({
        entityId: id,
        entity: e,
        label,
        hay: `${label} ${id}`.toLowerCase(),
        domain: domainOf(id),
        areaId: areaOf?.(id),
        isGroup: isGroupEntity(id, e),
        hits: [],
      });
    }
    return rows;
  }, [states, areaOf]);

  // ── Facet option lists (counts respect the OTHER active facets so a chip's count
  //    reflects what selecting it would actually yield — but kept simple: counts are
  //    over the curation-gated universe, independent of text query).
  const { domainOpts, areaOpts } = useMemo(() => {
    const primaryOnly = facets.primaryOnly !== false;
    const domainCount = new Map<string, number>();
    const areaCount = new Map<string, { name: string; n: number }>();
    for (const r of allRows) {
      if (primaryOnly && isPrimary && !isPrimary(r.entityId, r.entity)) continue;
      domainCount.set(r.domain, (domainCount.get(r.domain) ?? 0) + 1);
      if (r.areaId) {
        const cur = areaCount.get(r.areaId);
        areaCount.set(r.areaId, { name: areaLabel(r.areaId), n: (cur?.n ?? 0) + 1 });
      }
    }
    const domainOpts = [...domainCount.entries()]
      .map(([id, n]) => ({ id, label: domainLabel(id), n }))
      .sort((a, b) => b.n - a.n || a.label.localeCompare(b.label));
    const areaOpts = [...areaCount.entries()]
      .map(([id, v]) => ({ id, label: v.name, n: v.n }))
      .sort((a, b) => a.label.localeCompare(b.label));
    return { domainOpts, areaOpts };
  }, [allRows, facets.primaryOnly, isPrimary]);

  // ── Apply facets + fuzzy query → the visible, ranked list.
  const rows = useMemo<PickRow[]>(() => {
    const primaryOnly = facets.primaryOnly !== false;
    const domSet = facets.domains && facets.domains.length ? new Set(facets.domains) : null;
    const areaSet = facets.areas && facets.areas.length ? new Set(facets.areas) : null;
    const q = (facets.query ?? '').trim().toLowerCase();

    const out: Array<{ row: PickRow; score: number }> = [];
    for (const r of allRows) {
      if (primaryOnly && isPrimary && !isPrimary(r.entityId, r.entity)) {
        // Keep already-selected / already-on-surface entities visible even if the
        // curation gate would hide them, so selection can't silently vanish.
        if (!selectedSet.has(r.entityId) && !existingSet.has(r.entityId)) continue;
      }
      if (domSet && !domSet.has(r.domain)) continue;
      if (areaSet && (!r.areaId || !areaSet.has(r.areaId))) continue;
      let score = 0;
      let hits: number[] = [];
      if (q) {
        const m = fuzzyScore(q, r.hay);
        if (!m) continue;
        score = m.score;
        // Map hay-indices back onto the label prefix (label is the start of hay).
        hits = m.hits.filter((i) => i < r.label.length);
      }
      out.push({ row: q ? { ...r, hits } : r, score });
    }

    out.sort((a, b) => {
      if (a.score !== b.score) return b.score - a.score; // best fuzzy first
      // Group-entity-preferred, then alpha.
      if (a.row.isGroup !== b.row.isGroup) return a.row.isGroup ? -1 : 1;
      return a.row.label.localeCompare(b.row.label);
    });
    return out.map((o) => o.row);
  }, [allRows, facets, isPrimary, selectedSet, existingSet]);

  // ── Virtualization: track scrollTop, render the visible window only.
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const onScroll = useCallback(() => {
    if (listRef.current) setScrollTop(listRef.current.scrollTop);
  }, []);

  const total = rows.length;
  const first = Math.max(0, Math.floor(scrollTop / ROW_H) - OVERSCAN);
  const visibleCount = Math.ceil(VIEWPORT_H / ROW_H) + OVERSCAN * 2;
  const last = Math.min(total, first + visibleCount);
  const windowRows = rows.slice(first, last);

  // ── Keyboard nav: a roving "active" index over the filtered rows.
  const [active, setActive] = useState(0);
  // Clamp active when the list shrinks/grows.
  useEffect(() => {
    setActive((a) => (total === 0 ? 0 : Math.min(a, total - 1)));
  }, [total]);

  // Scroll the active row into view when it moves outside the window.
  const scrollActiveIntoView = useCallback(
    (idx: number) => {
      const el = listRef.current;
      if (!el) return;
      const top = idx * ROW_H;
      const bottom = top + ROW_H;
      if (top < el.scrollTop) el.scrollTop = top;
      else if (bottom > el.scrollTop + el.clientHeight) el.scrollTop = bottom - el.clientHeight;
    },
    [],
  );

  const toggle = useCallback(
    (entityId: string) => {
      if (multi) {
        const next = selectedSet.has(entityId)
          ? selected.filter((id) => id !== entityId)
          : [...selected, entityId];
        onSelectedChange(next);
      } else {
        // Single-select: replace, and confirm immediately for a one-tap flow.
        onSelectedChange([entityId]);
        onConfirm([entityId]);
      }
    },
    [multi, selected, selectedSet, onSelectedChange, onConfirm],
  );

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => {
          const next = Math.min(total - 1, a + 1);
          scrollActiveIntoView(next);
          return next;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) => {
          const next = Math.max(0, a - 1);
          scrollActiveIntoView(next);
          return next;
        });
      } else if (e.key === 'Home') {
        e.preventDefault();
        setActive(0);
        scrollActiveIntoView(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        const n = Math.max(0, total - 1);
        setActive(n);
        scrollActiveIntoView(n);
      } else if (e.key === 'PageDown') {
        e.preventDefault();
        setActive((a) => {
          const next = Math.min(total - 1, a + Math.floor(VIEWPORT_H / ROW_H));
          scrollActiveIntoView(next);
          return next;
        });
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        setActive((a) => {
          const next = Math.max(0, a - Math.floor(VIEWPORT_H / ROW_H));
          scrollActiveIntoView(next);
          return next;
        });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const row = rows[active];
        // Ctrl/Cmd+Enter (or Enter with no row focus in multi-mode) confirms the set.
        if ((e.metaKey || e.ctrlKey) && multi) {
          onConfirm(selected);
          return;
        }
        if (row) toggle(row.entityId);
      } else if (e.key === ' ' && document.activeElement?.tagName !== 'INPUT') {
        // Space toggles when focus isn't in the search field.
        e.preventDefault();
        const row = rows[active];
        if (row) toggle(row.entityId);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [total, active, rows, multi, selected, scrollActiveIntoView, toggle, onConfirm, onClose],
  );

  // Reset active to top whenever the query changes (so the best match is focused).
  useLayoutEffect(() => {
    setActive(0);
    if (listRef.current) listRef.current.scrollTop = 0;
    setScrollTop(0);
  }, [facets.query, facets.domains, facets.areas, facets.primaryOnly]);

  // ── Facet mutators (controlled — emit a new EntityFacets to the parent).
  const setQuery = (query: string) => onFacetsChange({ ...facets, query });
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
  const togglePrimaryOnly = () =>
    onFacetsChange({ ...facets, primaryOnly: !(facets.primaryOnly !== false) });
  const clearFacets = () =>
    onFacetsChange({ domains: [], areas: [], query: '', primaryOnly: facets.primaryOnly });

  const hasFacets =
    !!(facets.domains && facets.domains.length) ||
    !!(facets.areas && facets.areas.length) ||
    !!(facets.query && facets.query.length);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const selCount = selected.length;

  return (
    <div className="simui-modal ep-overlay" onClick={onClose}>
      <div
        className="ep-card"
        role="dialog"
        aria-label="Choose entities"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        {/* Header: search + close */}
        <div className="ep-head">
          <div className="ep-searchwrap">
            <Search size={15} className="ep-search-ico" aria-hidden />
            <input
              ref={inputRef}
              className="ep-search"
              type="text"
              placeholder={multi ? 'Search entities…' : 'Search for an entity…'}
              value={facets.query ?? ''}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search entities"
              autoComplete="off"
              spellCheck={false}
            />
            {facets.query ? (
              <button
                className="ep-search-clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                type="button"
              >
                <X size={13} />
              </button>
            ) : null}
          </div>
          <button className="simui-iconbtn-h" onClick={onClose} aria-label="Close" type="button">
            <X size={16} />
          </button>
        </div>

        <div className="ep-body">
          {/* Facet rail */}
          <div className="ep-facets" aria-label="Filters">
            <div className="ep-facet-group">
              <div className="ep-facet-head">
                <span>Domain</span>
                {hasFacets ? (
                  <button className="ep-facet-clear" onClick={clearFacets} type="button">
                    Clear
                  </button>
                ) : null}
              </div>
              <div className="ep-chips">
                {domainOpts.map((d) => {
                  const on = (facets.domains ?? []).includes(d.id);
                  return (
                    <button
                      key={d.id}
                      className={`ep-chip${on ? ' is-on' : ''}`}
                      onClick={() => toggleDomain(d.id)}
                      type="button"
                      aria-pressed={on}
                    >
                      <span className="ep-chip-label">{d.label}</span>
                      <span className="ep-chip-count">{d.n}</span>
                    </button>
                  );
                })}
                {domainOpts.length === 0 ? <span className="ep-facet-empty">—</span> : null}
              </div>
            </div>

            {areaOpts.length > 0 ? (
              <div className="ep-facet-group">
                <div className="ep-facet-head">
                  <span>Area</span>
                </div>
                <div className="ep-chips">
                  {areaOpts.map((a) => {
                    const on = (facets.areas ?? []).includes(a.id);
                    return (
                      <button
                        key={a.id}
                        className={`ep-chip${on ? ' is-on' : ''}`}
                        onClick={() => toggleArea(a.id)}
                        type="button"
                        aria-pressed={on}
                      >
                        <span className="ep-chip-label">{a.label}</span>
                        <span className="ep-chip-count">{a.n}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <label className="ep-toggle">
              <input
                type="checkbox"
                checked={facets.primaryOnly !== false}
                onChange={togglePrimaryOnly}
              />
              <span>Primary entities only</span>
            </label>
          </div>

          {/* Virtualized result list */}
          <div
            className="ep-list"
            ref={listRef}
            onScroll={onScroll}
            role="listbox"
            aria-multiselectable={multi}
            aria-label="Entities"
            tabIndex={-1}
          >
            {total === 0 ? (
              <div className="ep-empty">No matching entities</div>
            ) : (
              <div className="ep-spacer" style={{ height: total * ROW_H }}>
                <div className="ep-window" style={{ transform: `translateY(${first * ROW_H}px)` }}>
                  {windowRows.map((r, i) => {
                    const idx = first + i;
                    const isSel = selectedSet.has(r.entityId);
                    const isExisting = existingSet.has(r.entityId);
                    const isActive = idx === active;
                    return (
                      <Row
                        key={r.entityId}
                        row={r}
                        selected={isSel}
                        existing={isExisting}
                        active={isActive}
                        multi={multi}
                        onToggle={() => {
                          setActive(idx);
                          toggle(r.entityId);
                        }}
                        onHover={() => setActive(idx)}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer: selection summary + confirm (multi only) */}
        {multi ? (
          <div className="ep-foot">
            <span className="ep-selcount simui-value">
              {selCount === 0 ? 'Nothing selected' : `${selCount} selected`}
            </span>
            <div className="ep-foot-actions">
              {selCount > 0 ? (
                <button
                  className="ep-btn ep-btn-ghost"
                  onClick={() => onSelectedChange([])}
                  type="button"
                >
                  Clear
                </button>
              ) : null}
              <button className="ep-btn ep-btn-ghost" onClick={onClose} type="button">
                Cancel
              </button>
              <button
                className="ep-btn ep-btn-primary"
                onClick={() => onConfirm(selected)}
                disabled={selCount === 0}
                type="button"
              >
                Add{selCount > 0 ? ` ${selCount}` : ''}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Row — one entity. Memo-free (cheap) but isolated so the window re-renders shallow.
// ─────────────────────────────────────────────────────────────────────────────

function Row({
  row,
  selected,
  existing,
  active,
  multi,
  onToggle,
  onHover,
}: {
  row: PickRow;
  selected: boolean;
  existing: boolean;
  active: boolean;
  multi: boolean;
  onToggle: () => void;
  onHover: () => void;
}) {
  const e = row.entity;
  const unavailable = !e || e.state === 'unavailable' || e.state === 'unknown';
  const stateText = e ? prettyState(e.state) : 'unavailable';

  return (
    <div
      className={
        'ep-row' +
        (selected ? ' is-selected' : '') +
        (active ? ' is-active' : '') +
        (existing ? ' is-existing' : '') +
        (unavailable ? ' is-unavailable' : '')
      }
      role="option"
      aria-selected={selected}
      onClick={onToggle}
      onMouseMove={onHover}
    >
      <span className={`ep-check${multi ? '' : ' is-radio'}`} aria-hidden>
        {selected ? <Check size={13} strokeWidth={3} /> : null}
      </span>
      <span className="ep-row-ico" aria-hidden>
        {row.isGroup ? <Layers size={15} strokeWidth={2} /> : iconNode(undefined, 15)}
      </span>
      <span className="ep-row-main">
        <span className="ep-row-name" title={row.entityId}>
          <Highlighted text={row.label} hits={row.hits} />
          {row.isGroup ? <span className="ep-badge">group</span> : null}
          {existing ? <span className="ep-badge ep-badge-soft">on surface</span> : null}
        </span>
        <span className="ep-row-id">{row.entityId}</span>
      </span>
      <span className="ep-row-state simui-value">{stateText}</span>
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
        <mark key={i} className="ep-hl">
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
