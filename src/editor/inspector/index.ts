// Inspector enrichment — deep, progressive per-block and per-tile configuration.
//
// The sub-editor components the Inspector composes so ANY card is fully editable
// without YAML. Each is a CONTROLLED component (value + onChange), store-free, and
// styled with self-contained `simui-isub-*` CSS (one file per component) — additive
// to the existing Inspector.tsx, which the integrator rewires to compose these.
//
//   BlockSettings   — title / width / axis / leaf style / list wrap (block-level)
//   TileSettings    — name / icon / accent / size / state line / features / actions
//   ConditionEditor — build a Condition for `visibleWhen` (conditional surfacing)
//   ChartEditor     — series / range / header / axis / fill / thresholds
//   EntityMembers   — the block's member list + "Add entities…" (opens the picker)
//
// Plus the shared Linear-restraint primitives (SubField/SubSegmented/…) if a host
// wants to compose its own forms in the same idiom.

export { BlockSettings } from './BlockSettings';
export type { BlockSettingsProps } from './BlockSettings';

export { TileSettings } from './TileSettings';
export type { TileSettingsProps } from './TileSettings';

export { ConditionEditor } from './ConditionEditor';
export type { ConditionEditorProps } from './ConditionEditor';

export { ChartEditor } from './ChartEditor';
export type { ChartEditorProps } from './ChartEditor';

export { EntityMembers } from './EntityMembers';
export type { EntityMembersProps } from './EntityMembers';

// Shared, reusable controls (the Linear-restraint primitives the sub-editors use).
export {
  SubField,
  SubSection,
  SubSegmented,
  SubSwatches,
  SubCheck,
  SubIconPicker,
  SubIconGlyph,
  SUB_COLOR_TOKENS,
  SUB_ICON_CHOICES,
} from './controls';
