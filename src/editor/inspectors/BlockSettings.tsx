// BlockSettings — the block-level form (Inspector enrichment module).
//
// Edits the title, width (span), and type-specific layout knobs of the selected
// block, emitting granular `onBlockChange(patch)` patches. CONTROLLED + store-free:
// it takes the block + a live states snapshot and never reaches into the editor
// store. The integrator renders it for a bare BLOCK selection (selection.kind ===
// 'block') above EntityMembers / ChartEditor / ConditionEditor.
//
// Dual-write idiom (matches Inspector.tsx): type-specific knobs are written to BOTH
// the canonical legacy `Block` field (so the existing renderers keep working) AND
// `block.options` (the editor's forward-compatible bag). Reads prefer `options`,
// falling back to the legacy field.

import './BlockSettings.css';
import { Rows3, LayoutGrid } from 'lucide-react';
import { SubField, SubSection, SubSegmented, SubCheck } from './controls';
import type {
  BlockConfig,
  BlockSpan,
  GroupAxis,
  LeafTile,
  ListSource,
} from '../types';
import type { HassEntities } from '../../types';

const SPANS: { value: BlockSpan; label: string }[] = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 'full', label: 'Full' },
];

const AXES: { value: GroupAxis; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'room', label: 'Room' },
  { value: 'floor', label: 'Floor' },
  { value: 'function', label: 'Function' },
  { value: 'device-class', label: 'Class' },
  { value: 'metrics', label: 'Metrics' },
];

const LEAF_TILES: { value: 'default' | LeafTile; label: string; title: string }[] = [
  { value: 'default', label: 'Rows', title: 'Default entity rows' },
  { value: 'slider', label: 'Sliders', title: 'Drag-to-set slider wall' },
  { value: 'statusboard', label: 'Board', title: 'Presence-first status board' },
];

export interface BlockSettingsProps {
  block: BlockConfig;
  states: HassEntities;
  onChange: (patch: Partial<BlockConfig>) => void;
}

export function BlockSettings({ block, onChange }: BlockSettingsProps) {
  // Read with options-first fallback to the legacy Block fields.
  const axis: GroupAxis = block.options?.axis ?? block.axis ?? 'none';
  const leaf: 'default' | LeafTile = block.options?.leafTile ?? block.tile ?? 'default';
  const source: ListSource | undefined = block.options?.source ?? block.source;
  const wrap: 'rows' | 'tiles' = block.options?.wrap ?? source?.wrap ?? 'rows';

  const setAxis = (a: GroupAxis) =>
    onChange({ axis: a, options: { ...block.options, axis: a } });

  const setLeaf = (l: 'default' | LeafTile) => {
    if (l === 'default') {
      // Absence === default: clear both the legacy field and the option.
      const nextOptions = { ...block.options };
      delete nextOptions.leafTile;
      onChange({
        tile: undefined,
        options: Object.keys(nextOptions).length ? nextOptions : undefined,
      });
    } else {
      onChange({ tile: l, options: { ...block.options, leafTile: l } });
    }
  };

  const setWrap = (w: 'rows' | 'tiles') => {
    // wrap lives on the list source (renderer reads source.wrap) AND in options.
    const nextSource: ListSource = source
      ? { ...source, wrap: w }
      : { include: [], wrap: w };
    onChange({ source: nextSource, options: { ...block.options, source: nextSource, wrap: w } });
  };

  const isGroup = block.type === 'group';
  const isList = block.type === 'list';

  return (
    <>
      <SubSection first>
        <SubField label="Title">
          <input
            className="simui-isub-input"
            placeholder="Section heading (optional)"
            value={block.title ?? ''}
            onChange={(e) => onChange({ title: e.target.value || undefined })}
          />
        </SubField>
        <SubField label="Width">
          <SubSegmented
            options={SPANS}
            value={normalizeSpan(block.span)}
            onChange={(span) => onChange({ span })}
          />
        </SubField>
      </SubSection>

      {isGroup && (
        <SubSection head="Group">
          <SubField label="Group members by">
            <SubSegmented wrap options={AXES} value={axis} onChange={setAxis} />
          </SubField>
          <SubField label="Leaf style" hint="how each member renders">
            <SubSegmented
              options={LEAF_TILES.map((t) => ({ value: t.value, label: t.label, title: t.title }))}
              value={leaf}
              onChange={setLeaf}
            />
          </SubField>
        </SubSection>
      )}

      {isList && (
        <SubSection head="List layout">
          <SubField label="Wrap">
            <SubSegmented
              options={[
                { value: 'rows' as const, label: <Inline icon={<Rows3 size={13} strokeWidth={2} />} text="Rows" /> },
                { value: 'tiles' as const, label: <Inline icon={<LayoutGrid size={13} strokeWidth={2} />} text="Tiles" /> },
              ]}
              value={wrap}
              onChange={setWrap}
            />
          </SubField>
          <SubCheck
            checked={source?.hideWhenEmpty ?? true}
            onChange={(checked) => {
              const next: ListSource = source
                ? { ...source, hideWhenEmpty: checked }
                : { include: [], hideWhenEmpty: checked };
              onChange({ source: next, options: { ...block.options, source: next } });
            }}
          >
            Hide the card when it resolves to nothing
          </SubCheck>
        </SubSection>
      )}
    </>
  );
}

function Inline({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <>
      {icon}
      {text}
    </>
  );
}

/** Coerce an arbitrary numeric span to the nearest segmented option so the control highlights. */
function normalizeSpan(span: BlockSpan): BlockSpan {
  if (span === 'full' || span === 1 || span === 2) return span;
  // Numeric grid spans (1..12) map onto the coarse 1 / 2 / Full control.
  if (typeof span === 'number') {
    if (span <= 1) return 1;
    if (span <= 2) return 2;
    return 'full';
  }
  return span;
}
