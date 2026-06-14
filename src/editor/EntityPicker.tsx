// EntityPicker — the area-grouped, faceted entity chooser (SPEC_EDITOR.md §entity-picker).
//
// Replaces the flat AddCardPanel: filter by domain / area / text, fuzzy-match,
// multi-select, and confirm. CONTROLLED per the foundation contract
// (`EntityPickerProps` in ./types): facets + selection are owned by the parent so
// the picker is reusable for "add members" (multi) and "pick a chart series"
// (single). Live entity data arrives as a snapshot; the picker does not subscribe.
//
// This is a thin host: it builds the AREA-AWARE `EntityIndex` once per
// states/areas/registry identity and composes the prebuilt picker polish module
// (`./picker/*`) — a SearchBox, a faceting FacetBar, and an AreaGroupedList that
// groups ranked rows under sticky area headers (graceful caps, never an infinite
// wall). All the windowing / ranking / grouping lives in those pieces; here we only
// wire facets → index queries and rows → selection.
//
// Design law (DESIGN_PRINCIPLES.md): dark-first, monochrome + single accent, tabular
// numerals, minimal motion, hairline chrome. Group entities are preferred (surfaced
// + badged) because composing from a `group.*` is denser than hand-picking members.

import { useCallback, useMemo } from 'react';
import { X } from 'lucide-react';
import type { EntityPickerProps } from './types';
import { buildEntityIndex } from './entityIndex';
import {
  AreaGroupedList,
  EmptyState,
  FacetBar,
  SearchBox,
  rowsFromIndex,
} from './picker';
import './EntityPicker.css';

// ─────────────────────────────────────────────────────────────────────────────
// EntityPicker
// ─────────────────────────────────────────────────────────────────────────────

export function EntityPicker({
  states,
  areas,
  registry,
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

  // ── Build the AREA-AWARE faceted index once per states / areas / registry
  //    identity. This is the expensive pass (the per-entity universe + sort); it
  //    survives keystrokes via memo, and the returned closures are cheap.
  const index = useMemo(
    () => buildEntityIndex({ states, areas, registry }),
    [states, areas, registry],
  );

  const primaryOnly = facets.primaryOnly !== false;

  // ── Facet option lists (counts respect the curation gate).
  const domainOptions = useMemo(() => index.domainFacets(primaryOnly), [index, primaryOnly]);
  const areaOptions = useMemo(() => index.areaFacets(primaryOnly), [index, primaryOnly]);

  // Resolve an area key → its header label (from the index's area facets); fall
  // back to the key itself so a row's area always has a name.
  const areaName = useCallback(
    (areaId: string) => areaOptions.find((o) => o.id === areaId)?.label ?? areaId,
    [areaOptions],
  );

  // ── Apply facets + fuzzy query → the ranked, render-ready rows. Selection /
  //    on-surface entities stay visible behind the curation gate (handled inside).
  const rows = useMemo(
    () => rowsFromIndex(index, states, facets, selectedSet, existingSet),
    [index, states, facets, selectedSet, existingSet],
  );

  const querying = !!facets.query?.trim();

  // ── Selection mutator. Multi: toggle in place. Single: replace + confirm for a
  //    one-tap flow (matches the controlled single-pick contract).
  const toggle = useCallback(
    (entityId: string) => {
      if (multi) {
        const next = selectedSet.has(entityId)
          ? selected.filter((id) => id !== entityId)
          : [...selected, entityId];
        onSelectedChange(next);
      } else {
        onSelectedChange([entityId]);
        onConfirm([entityId]);
      }
    },
    [multi, selected, selectedSet, onSelectedChange, onConfirm],
  );

  // Select / deselect every shown row in an area at once (multi only). If all are
  // already selected, the action removes them; otherwise it adds the missing ones.
  const onSelectArea = useCallback(
    (entityIds: string[]) => {
      if (!entityIds.length) return;
      const allSelected = entityIds.every((id) => selectedSet.has(id));
      if (allSelected) {
        const drop = new Set(entityIds);
        onSelectedChange(selected.filter((id) => !drop.has(id)));
      } else {
        const next = [...selected];
        for (const id of entityIds) if (!selectedSet.has(id)) next.push(id);
        onSelectedChange(next);
      }
    },
    [selected, selectedSet, onSelectedChange],
  );

  // Controlled facet mutators.
  const setQuery = useCallback(
    (query: string) => onFacetsChange({ ...facets, query }),
    [facets, onFacetsChange],
  );
  const clearFilters = useCallback(
    () => onFacetsChange({ domains: [], areas: [], query: '', primaryOnly: facets.primaryOnly }),
    [facets.primaryOnly, onFacetsChange],
  );

  const selCount = selected.length;

  return (
    <div className="simui-modal ep-overlay" onClick={onClose}>
      <div
        className="ep-card"
        role="dialog"
        aria-label="Choose entities"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: search + close */}
        <div className="ep-head">
          <SearchBox
            value={facets.query ?? ''}
            onChange={setQuery}
            placeholder={multi ? 'Search entities…' : 'Search for an entity…'}
          />
          <button className="simui-iconbtn-h" onClick={onClose} aria-label="Close" type="button">
            <X size={16} />
          </button>
        </div>

        <div className="ep-body">
          {/* Facet rail */}
          <FacetBar
            facets={facets}
            onFacetsChange={onFacetsChange}
            domainOptions={domainOptions}
            areaOptions={areaOptions}
          />

          {/* Area-grouped result list */}
          {rows.length === 0 ? (
            <EmptyState querying={querying} onClearFilters={clearFilters} />
          ) : (
            <AreaGroupedList
              rows={rows}
              areaName={areaName}
              multi={multi}
              querying={querying}
              onToggle={toggle}
              onSelectArea={onSelectArea}
              onClearFilters={clearFilters}
            />
          )}
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
