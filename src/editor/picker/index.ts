// Polished entity-picker sub-components (SPEC_EDITOR.md §entity-picker).
//
// An approachable, area-grouped, faceted, searchable chooser the EntityPicker
// composes — it NEVER dumps the raw registry. Each piece is controlled (value +
// onChange) and consumes the shared `EntityIndex` (src/editor/entityIndex.ts) the
// parent builds. See each file's header for behaviour; see the module's INTEGRATION
// notes for how EntityPicker.tsx wires them together.

export { SearchBox } from './SearchBox';
export type { SearchBoxProps } from './SearchBox';

export { FacetBar } from './FacetBar';
export type { FacetBarProps } from './FacetBar';

export { AreaGroupedList } from './AreaGroupedList';
export type { AreaGroupedListProps } from './AreaGroupedList';

export { EmptyState } from './EmptyState';
export type { EmptyStateProps } from './EmptyState';

export {
  rowsFromIndex,
  bucketByArea,
  domainIcon,
  stateHint,
  isDead,
  UNASSIGNED,
} from './pickerModel';
export type { PickerRow, AreaBucket, FacetOption } from './pickerModel';
