import { Minus, Plus, Thermometer } from 'lucide-react';
import { Tile } from '../components/Tile';
import { TileFeatures } from '../components/TileFeatures';
import { useCallService } from '../hass/context';
import type { TileFeature } from '../widgets/tileContract';
import type { WidgetProps } from '../types';
import { clamp, friendly } from '../util';

// icon tint follows what the unit is doing (or its mode if idle)
const ACTION_CLASS: Record<string, string> = { heating: 'warm', cooling: 'cool', drying: 'warm', fan: 'cool' };
const MODE_CLASS: Record<string, string> = { heat: 'warm', cool: 'cool', heat_cool: 'cool', auto: 'cool' };

export function ClimateTile({ entity }: WidgetProps) {
  const callService = useCallService();
  const a = entity.attributes;
  const action = a.hvac_action as string | undefined;
  const current = a.current_temperature as number | undefined;
  const target = a.temperature as number | undefined;
  const tLow = a.target_temp_low as number | undefined;
  const tHigh = a.target_temp_high as number | undefined;
  const step = (a.target_temp_step as number | undefined) ?? 0.5;
  const min = (a.min_temp as number | undefined) ?? 7;
  const max = (a.max_temp as number | undefined) ?? 35;
  const iconClass = (action && ACTION_CLASS[action]) || MODE_CLASS[entity.state] || '';

  const nudge = (delta: number) => {
    if (target == null) return;
    const next = clamp(Math.round((target + delta) / step) * step, min, max);
    void callService('climate', 'set_temperature', { temperature: next }, { entity_id: entity.entity_id });
  };

  // Inline HVAC-mode control strip (FRAMEWORK.md §1) — a curated subset of the
  // entity's own modes, icon-only to stay dense. Renders nothing without modes.
  const hvacModes = (a.hvac_modes as string[] | undefined) ?? [];
  const features: TileFeature[] =
    hvacModes.length > 1 ? [{ type: 'climate-hvac-modes', modes: hvacModes, style: 'icons' }] : [];

  return (
    <Tile>
      <div className="simui-row">
        <span className={`simui-ic ${iconClass}`}><Thermometer size={16} strokeWidth={2} /></span>
        <span className="simui-name" title={friendly(entity)}>{friendly(entity)}</span>
      </div>
      <div className="simui-row">
        <span className="simui-big">{current != null ? Math.round(current) : '—'}<span className="simui-unit">°</span></span>
        <span className="simui-spacer" />
        {target != null ? (
          <div className="simui-step">
            <button className="simui-sbtn" aria-label="Lower target" onClick={() => nudge(-step)}><Minus size={14} strokeWidth={2.5} /></button>
            <span className="simui-target">{fmt(target)}°</span>
            <button className="simui-sbtn" aria-label="Raise target" onClick={() => nudge(step)}><Plus size={14} strokeWidth={2.5} /></button>
          </div>
        ) : tLow != null && tHigh != null ? (
          <span className="simui-target">{fmt(tLow)}–{fmt(tHigh)}°</span>
        ) : null}
      </div>
      <TileFeatures entity={entity} features={features} />
    </Tile>
  );
}

function fmt(n: number): string {
  return Number.isInteger(n) ? `${n}` : n.toFixed(1);
}
