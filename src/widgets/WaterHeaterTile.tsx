import type { ChangeEvent } from 'react';
import { ChevronDown, Droplet, Flame, Minus, Plus } from 'lucide-react';
import { Tile } from '../components/Tile';
import { useCallService } from '../hass/context';
import type { WidgetProps } from '../types';
import { clamp, friendly, prettyState } from '../util';

// WaterHeaterEntityFeature
const FEAT = { TARGET_TEMPERATURE: 1, OPERATION_MODE: 2, AWAY_MODE: 4 };

// active/heating-ish operation modes warm the icon; eco/off stays neutral.
const WARM_MODES = new Set(['eco', 'electric', 'gas', 'heat_pump', 'high_demand', 'performance', 'on']);

/**
 * water_heater — current/target temperature stepper (mirrors ClimateTile) plus an
 * inline operation-mode dropdown (reuses the themed `.simui-fsel` select). Icon
 * tints `warm` when a heating mode is active.
 */
export function WaterHeaterTile({ entity }: WidgetProps) {
  const callService = useCallService();
  const dead = entity.state === 'unavailable' || entity.state === 'unknown';
  const name = friendly(entity);

  if (dead) {
    return (
      <Tile className="is-unavailable">
        <div className="simui-row">
          <span className="simui-ic"><Droplet size={16} strokeWidth={2} /></span>
          <span className="simui-name" title={name}>{name}</span>
        </div>
        <div className="simui-row">
          <span className="simui-big">—<span className="simui-unit">°</span></span>
          <span className="simui-spacer" />
          <span className="simui-state">Unavailable</span>
        </div>
      </Tile>
    );
  }

  const a = entity.attributes;
  const current = a.current_temperature as number | undefined;
  const target = a.temperature as number | undefined;
  const step = (a.target_temp_step as number | undefined) ?? 1;
  const min = (a.min_temp as number | undefined) ?? 30;
  const max = (a.max_temp as number | undefined) ?? 80;
  const modes = (a.operation_list as string[] | undefined) ?? [];
  const mode = entity.state;
  const canSetTemp = supportsTemp(a) && target != null;
  const heating = WARM_MODES.has(mode);

  const nudge = (delta: number) => {
    if (target == null) return;
    const next = clamp(Math.round((target + delta) / step) * step, min, max);
    void callService('water_heater', 'set_temperature', { temperature: next }, { entity_id: entity.entity_id });
  };
  const setMode = (operation_mode: string) =>
    void callService('water_heater', 'set_operation_mode', { operation_mode }, { entity_id: entity.entity_id });

  return (
    <Tile className={heating ? 'is-on' : ''}>
      <div className="simui-row">
        <span className={`simui-ic${heating ? ' warm' : ''}`}>
          {heating ? <Flame size={16} strokeWidth={2} /> : <Droplet size={16} strokeWidth={2} />}
        </span>
        <span className="simui-name" title={name}>{name}</span>
      </div>
      <div className="simui-row">
        <span className="simui-big">{current != null ? Math.round(current) : '—'}<span className="simui-unit">°</span></span>
        <span className="simui-spacer" />
        {canSetTemp && (
          <div className="simui-step">
            <button className="simui-sbtn" aria-label="Lower target" onClick={() => nudge(-step)}><Minus size={14} strokeWidth={2.5} /></button>
            <span className="simui-target">{fmt(target!)}°</span>
            <button className="simui-sbtn" aria-label="Raise target" onClick={() => nudge(step)}><Plus size={14} strokeWidth={2.5} /></button>
          </div>
        )}
      </div>
      {modes.length > 1 && (
        <div className="simui-feats">
          <div className="simui-fsel-wrap">
            <select
              className="simui-fsel"
              aria-label="Operation mode"
              value={mode}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setMode(e.target.value)}
            >
              {modes.map((m) => (
                <option key={m} value={m}>{prettyState(m)}</option>
              ))}
            </select>
            <ChevronDown className="simui-fsel-caret" size={13} strokeWidth={2} />
          </div>
        </div>
      )}
    </Tile>
  );
}

function supportsTemp(a: Record<string, unknown>): boolean {
  const sf = a.supported_features as number | undefined;
  return sf != null && (sf & FEAT.TARGET_TEMPERATURE) === FEAT.TARGET_TEMPERATURE;
}

function fmt(n: number): string {
  return Number.isInteger(n) ? `${n}` : n.toFixed(1);
}
