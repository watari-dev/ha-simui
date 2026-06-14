import type { ChangeEvent, CSSProperties } from 'react';
import { useCallService, useEntity } from '../hass/context';
import { TileFeatures } from './TileFeatures';
import type { HassEntity } from '../types';
import type { TileFeature } from '../widgets/tileContract';
import { domainOf } from '../util';

/**
 * The unified per-type quick-control rack (DESIGN_DIRECTIONS Phase 1) — one
 * component, two densities (compact in the context menu, full in the Sheet):
 *  - light  → brightness + warm↔cool color-temp ribbon + colour swatches
 *  - climate/cover/fan/lock/alarm → the existing TileFeatures control strip
 * Renders null for domains it can't control (sensor, etc.). "Compose, don't fork":
 * the same controls render in the menu, the Sheet, and (later) tile headers.
 */

const CONTROLLABLE = new Set(['light', 'climate', 'cover', 'fan', 'lock', 'alarm_control_panel']);

/** Whether QuickControls renders anything for this entity's domain. */
export function isControllable(entityId: string): boolean {
  return CONTROLLABLE.has(domainOf(entityId));
}

export function QuickControls({ entityId, compact }: { entityId: string; compact?: boolean }) {
  const e = useEntity(entityId);
  if (!e) return null;
  if (domainOf(entityId) === 'light') return <LightControls entity={e} compact={compact} />;
  const features = featuresFor(domainOf(entityId), e);
  if (!features.length) return null;
  return (
    <div className={`simui-qc${compact ? ' compact' : ''}`}>
      <TileFeatures entity={e} features={features} />
    </div>
  );
}

function featuresFor(domain: string, e: HassEntity): TileFeature[] {
  switch (domain) {
    case 'climate': {
      const modes = (e.attributes.hvac_modes as string[] | undefined) ?? [];
      const feats: TileFeature[] = [];
      if (modes.length) feats.push({ type: 'climate-hvac-modes', modes, style: 'icons' });
      feats.push({ type: 'target-temperature' });
      return feats;
    }
    case 'cover': return [{ type: 'cover-open-close' }];
    case 'fan': return [{ type: 'fan-speed' }, { type: 'fan-oscillate' }];
    case 'lock': return [{ type: 'lock-commands' }];
    case 'alarm_control_panel':
      return [{ type: 'alarm-modes', modes: ['armed_home', 'armed_away', 'armed_night', 'disarmed'] }];
    default: return [];
  }
}

// ── light: brightness + colour-temp ribbon + colour swatches ──────────────────

const COLOR_MODES = new Set(['hs', 'rgb', 'rgbw', 'rgbww', 'xy']);
// A small, friendly colour palette (hue, saturation%) — covers the 90% of "set my
// light to X" without a full wheel (the wheel is a Phase-3 bloom).
const SWATCHES: Array<{ name: string; hs: [number, number] }> = [
  { name: 'Red', hs: [4, 86] }, { name: 'Orange', hs: [28, 88] }, { name: 'Amber', hs: [44, 90] },
  { name: 'Green', hs: [128, 70] }, { name: 'Teal', hs: [172, 68] }, { name: 'Blue', hs: [218, 82] },
  { name: 'Violet', hs: [268, 68] }, { name: 'Pink', hs: [322, 72] },
];

function LightControls({ entity, compact }: { entity: HassEntity; compact?: boolean }) {
  const callService = useCallService();
  const id = entity.entity_id;
  const a = entity.attributes;
  const on = entity.state === 'on';
  const brightness = (a.brightness as number | undefined) ?? 0;
  const pct = on ? Math.max(1, Math.round((brightness / 255) * 100)) : 0;

  // Prefer supported_color_modes (real HA); fall back to the active color_mode +
  // present colour attributes so it also lights up on mock/partial data.
  const modes = (a.supported_color_modes as string[] | undefined) ?? [];
  const curMode = a.color_mode as string | undefined;
  const has = (k: string) => a[k] != null;
  const supportsColor =
    modes.some((m) => COLOR_MODES.has(m)) ||
    (curMode != null && COLOR_MODES.has(curMode)) ||
    has('rgb_color') || has('hs_color') || has('rgbw_color') || has('rgbww_color') || has('xy_color');
  const supportsTemp =
    modes.includes('color_temp') || curMode === 'color_temp' || has('color_temp') || has('color_temp_kelvin');
  const minK = (a.min_color_temp_kelvin as number | undefined) ?? 2200;
  const maxK = (a.max_color_temp_kelvin as number | undefined) ?? 6500;
  const curK = (a.color_temp_kelvin as number | undefined) ?? Math.round((minK + maxK) / 2);

  const setPct = (v: number) => void callService('light', 'turn_on', { brightness_pct: v }, { entity_id: id });
  const setK = (k: number) => void callService('light', 'turn_on', { color_temp_kelvin: k }, { entity_id: id });
  const setHs = (hs: [number, number]) => void callService('light', 'turn_on', { hs_color: hs }, { entity_id: id });

  const brightStyle: CSSProperties = {
    background: `linear-gradient(to right, var(--warm) ${pct}%, var(--faint) ${pct}%)`,
  };

  return (
    <div className={`simui-qc light${compact ? ' compact' : ''}`}>
      <div className="simui-qc-row">
        <span className="simui-qc-label">Brightness</span>
        <span className="simui-qc-val num">{on ? `${pct}%` : 'Off'}</span>
      </div>
      <input
        className="simui-slider warm"
        type="range"
        min={0}
        max={100}
        value={pct}
        aria-label="Brightness"
        style={brightStyle}
        onChange={(ev: ChangeEvent<HTMLInputElement>) => setPct(Number(ev.target.value))}
      />
      {supportsTemp && (
        <input
          className="simui-temp-ribbon"
          type="range"
          min={minK}
          max={maxK}
          step={50}
          value={curK}
          aria-label="Colour temperature"
          onChange={(ev: ChangeEvent<HTMLInputElement>) => setK(Number(ev.target.value))}
        />
      )}
      {supportsColor && (
        <div className="simui-qc-swatches">
          {SWATCHES.map((s) => (
            <button
              key={s.name}
              type="button"
              className="simui-qc-swatch"
              aria-label={s.name}
              title={s.name}
              style={{ background: `hsl(${s.hs[0]} ${s.hs[1]}% 56%)` }}
              onClick={() => setHs(s.hs)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
