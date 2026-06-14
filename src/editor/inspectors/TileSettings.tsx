// TileSettings — the per-tile (leaf) form (Inspector enrichment module).
//
// Deep per-entity overrides for ONE leaf inside a block: name, icon, accent colour,
// layout/size, the state line (show/hide + what it shows), an inline control strip
// (features, by domain) and the tap/hold/etc. action map. Emits granular
// `onTileChange(patch)` patches into the keyed TileConfig override record.
//
// CONTROLLED + store-free. Honours "absence === default" rigorously: every control
// that returns to its default clears its field (writes `undefined`) so presets stay
// terse and a `{}` override is identical to no override at all.

import './TileSettings.css';
import { Plus, X } from 'lucide-react';
import {
  SubField,
  SubSection,
  SubSegmented,
  SubSwatches,
  SubCheck,
  SubIconPicker,
} from './controls';
import { ActionEditor } from './actions';
import type {
  TileConfig,
  TileFeature,
  StateBit,
  ColorToken,
} from '../types';
import type { HassEntity } from '../../types';

function domainOf(entityId: string): string {
  return entityId.split('.')[0] ?? '';
}

// Which inline controls are offerable, keyed by domain (FRAMEWORK.md §1) — a small
// curated menu, not every HA capability.
const FEATURE_MENU: Record<string, { feature: TileFeature; label: string }[]> = {
  cover: [{ feature: { type: 'cover-open-close' }, label: 'Open / close' }],
  climate: [
    { feature: { type: 'target-temperature' }, label: 'Target temperature' },
    { feature: { type: 'climate-hvac-modes', modes: [] }, label: 'HVAC modes' },
    { feature: { type: 'climate-fan-modes' }, label: 'Fan modes' },
  ],
  fan: [
    { feature: { type: 'fan-speed' }, label: 'Fan speed' },
    { feature: { type: 'fan-oscillate' }, label: 'Oscillate' },
  ],
  lock: [{ feature: { type: 'lock-commands' }, label: 'Lock / unlock' }],
  alarm_control_panel: [{ feature: { type: 'alarm-modes', modes: [] }, label: 'Alarm modes' }],
};

// The state-line content options the picker offers. `state` is the primary value;
// the rest are recency bits. Stored as a StateBit[] (omit ⇒ ['state']).
const STATE_BITS: { bit: StateBit; label: string }[] = [
  { bit: 'state', label: 'Value' },
  { bit: 'last_changed', label: 'Changed' },
  { bit: 'last_updated', label: 'Updated' },
];

export interface TileSettingsProps {
  entityId: string;
  entity: HassEntity | undefined;
  /** The resolved tile config (defaults merged); pass `{}` when there is no override. */
  tile: TileConfig;
  onChange: (patch: Partial<TileConfig>) => void;
}

export function TileSettings({ entityId, entity, tile, onChange }: TileSettingsProps) {
  const domain = domainOf(entityId);
  const fallbackName = (entity?.attributes.friendly_name as string | undefined) ?? entityId;
  const hasFeatures = Boolean(FEATURE_MENU[domain]);

  return (
    <>
      <SubSection first>
        <SubField label="Name">
          <input
            className="simui-isub-input"
            placeholder={fallbackName}
            value={tile.name ?? ''}
            onChange={(e) => onChange({ name: e.target.value || undefined })}
          />
        </SubField>
        <SubField label="Icon">
          <SubIconPicker value={tile.icon} onChange={(icon) => onChange({ icon })} />
        </SubField>
        <SubField label="Size">
          <SubSegmented
            options={[
              { value: 'horizontal' as const, label: 'Row', title: 'Full-width row' },
              { value: 'vertical' as const, label: 'Mini', title: 'Icon-over-label mini tile' },
            ]}
            value={tile.orientation ?? 'horizontal'}
            onChange={(orientation) =>
              onChange({ orientation: orientation === 'horizontal' ? undefined : orientation })
            }
          />
        </SubField>
      </SubSection>

      <SubSection head="Accent">
        <SubSwatches
          value={tile.color ?? 'none'}
          onChange={(color: ColorToken) => onChange({ color: color === 'none' ? undefined : color })}
        />
      </SubSection>

      <SubSection head="Secondary line">
        <SubCheck
          checked={!tile.hideState}
          onChange={(checked) => onChange({ hideState: checked ? undefined : true })}
        >
          Show the secondary line
        </SubCheck>
        {!tile.hideState && (
          <div className="simui-isub-tile-bits">
            <StateContentEditor
              content={tile.stateContent ?? ['state']}
              onChange={(content) =>
                onChange({
                  // Default is exactly ['state'] ⇒ clear when it matches.
                  stateContent:
                    content.length === 1 && content[0] === 'state' ? undefined : content,
                })
              }
            />
          </div>
        )}
      </SubSection>

      {hasFeatures && (
        <SubSection head="Controls">
          <FeatureEditor
            domain={domain}
            features={tile.features ?? []}
            onChange={(features) => onChange({ features: features.length ? features : undefined })}
          />
        </SubSection>
      )}

      <SubSection head="Actions">
        <ActionEditor
          actions={tile.actions ?? {}}
          domain={domain}
          states={entity ? { [entityId]: entity } : undefined}
          onChange={(actions) =>
            onChange({ actions: Object.keys(actions).length ? actions : undefined })
          }
        />
      </SubSection>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// State-line content — which bits show on the secondary line.
// ─────────────────────────────────────────────────────────────────────────────

function StateContentEditor({
  content,
  onChange,
}: {
  content: StateBit[];
  onChange: (next: StateBit[]) => void;
}) {
  const has = (bit: StateBit) => content.includes(bit);
  const toggle = (bit: StateBit) => {
    if (has(bit)) {
      const next = content.filter((b) => b !== bit);
      // Never empty the primary value entirely — fall back to ['state'].
      onChange(next.length ? next : ['state']);
    } else {
      onChange([...content, bit]);
    }
  };
  return (
    <div className="simui-isub-pills">
      {STATE_BITS.map((s) => (
        <button
          key={s.bit}
          type="button"
          className={`simui-isub-pill${has(s.bit) ? ' active' : ''}`}
          onClick={() => toggle(s.bit)}
        >
          {has(s.bit) ? (
            <span className="simui-isub-pill-x">
              <X size={11} strokeWidth={2.5} />
            </span>
          ) : (
            <Plus size={11} strokeWidth={2.5} />
          )}
          {s.label}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Feature pills — toggle the inline control strip on a leaf.
// ─────────────────────────────────────────────────────────────────────────────

function FeatureEditor({
  domain,
  features,
  onChange,
}: {
  domain: string;
  features: TileFeature[];
  onChange: (next: TileFeature[]) => void;
}) {
  const menu = FEATURE_MENU[domain] ?? [];
  const has = (t: TileFeature['type']) => features.some((f) => f.type === t);
  const toggle = (feature: TileFeature) => {
    if (has(feature.type)) onChange(features.filter((f) => f.type !== feature.type));
    else onChange([...features, feature]);
  };
  return (
    <div className="simui-isub-pills">
      {menu.map((m) => (
        <button
          key={m.feature.type}
          type="button"
          className={`simui-isub-pill${has(m.feature.type) ? ' active' : ''}`}
          onClick={() => toggle(m.feature)}
        >
          {has(m.feature.type) ? (
            <span className="simui-isub-pill-x">
              <X size={11} strokeWidth={2.5} />
            </span>
          ) : (
            <Plus size={11} strokeWidth={2.5} />
          )}
          {m.label}
        </button>
      ))}
    </div>
  );
}
