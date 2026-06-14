import type { ChangeEvent, CSSProperties } from 'react';
import { useCallService, useEntity } from '../hass/context';
import type { HassEntity } from '../types';
import { clamp, domainOf, prettyState } from '../util';
import { ColorWheel } from './ColorWheel';
import { TempDial, type DialTint } from './TempDial';
import { TileFeatures } from './TileFeatures';
import { useThrottle } from './useThrottle';
import type { TileFeature } from '../widgets/tileContract';

/**
 * The FULL quick-control studio (DESIGN_DIRECTIONS §3 Phase-3 "long-press bloom"):
 * the rich sibling of QuickControls. Where QuickControls renders the COMPACT rack
 * (brightness + ribbon + swatches in the context-menu header), BloomStudio renders
 * the full studio for the Sheet / long-press —
 *   - light   → ColorWheel + warm↔cool ribbon + a tall brightness fill
 *   - climate → TempDial + hvac mode pills
 * Everything else falls back to QuickControls' feature strip so no domain is left
 * uncontrollable. Composes the existing pieces (TileFeatures, the ribbon idiom) —
 * "compose, don't fork." Surgical: subscribes to the one entity it controls.
 */

const STUDIO_DOMAINS = new Set(['light', 'climate']);

/** Whether BloomStudio renders a bespoke full studio (vs. the feature fallback). */
export function hasStudio(entityId: string): boolean {
  return STUDIO_DOMAINS.has(domainOf(entityId));
}

export function BloomStudio({ entityId }: { entityId: string }) {
  const e = useEntity(entityId);
  if (!e) return null;
  const domain = domainOf(entityId);
  if (domain === 'light') return <LightStudio entity={e} />;
  if (domain === 'climate') return <ClimateStudio entity={e} />;
  // Fallback: render the standard feature strip for cover/fan/lock/alarm.
  return <FeatureStudio entity={e} domain={domain} />;
}

// ── light: colour wheel + temp ribbon + brightness ───────────────────────────

const COLOR_MODES = new Set(['hs', 'rgb', 'rgbw', 'rgbww', 'xy']);

function LightStudio({ entity }: { entity: HassEntity }) {
  const callService = useCallService();
  const id = entity.entity_id;
  const a = entity.attributes;
  const on = entity.state === 'on';
  const brightness = (a.brightness as number | undefined) ?? 0;
  const pct = on ? Math.max(1, Math.round((brightness / 255) * 100)) : 0;

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

  // Current hue/saturation for the wheel thumb (default to a warm amber when unset).
  const hsAttr = a.hs_color as [number, number] | undefined;
  const hs: [number, number] = hsAttr ?? [40, 70];

  const setPct = (v: number) => void callService('light', 'turn_on', { brightness_pct: v }, { entity_id: id });
  const setK = (k: number) => void callService('light', 'turn_on', { color_temp_kelvin: k }, { entity_id: id });
  // The wheel fires onChange on every pointer-move — throttle the WS service call.
  const setHs = useThrottle(
    (next: [number, number]) => void callService('light', 'turn_on', { hs_color: next }, { entity_id: id }),
    110,
  );

  const brightStyle: CSSProperties = {
    background: `linear-gradient(to right, var(--warm) ${pct}%, var(--faint) ${pct}%)`,
  };

  return (
    <div className="simui-bloom light">
      {supportsColor && (
        <div className="simui-bloom-wheelwrap">
          <ColorWheel hs={hs} onChange={setHs} size={208} label="Light colour" />
        </div>
      )}
      <div className="simui-bloom-sliders">
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
          <>
            <div className="simui-qc-row">
              <span className="simui-qc-label">Temperature</span>
              <span className="simui-qc-val num">{curK}K</span>
            </div>
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
          </>
        )}
      </div>
    </div>
  );
}

// ── climate: temp dial + mode pills ──────────────────────────────────────────

const HEATING = new Set(['heating', 'heat']);
const COOLING = new Set(['cooling', 'cool', 'fan']);

function dialTint(entity: HassEntity): DialTint {
  const action = entity.attributes.hvac_action as string | undefined;
  const mode = entity.state;
  if (action && HEATING.has(action)) return 'warm';
  if (action && COOLING.has(action)) return 'cool';
  if (mode === 'heat') return 'warm';
  if (mode === 'cool') return 'cool';
  return 'muted';
}

function ClimateStudio({ entity }: { entity: HassEntity }) {
  const callService = useCallService();
  const id = entity.entity_id;
  const a = entity.attributes;
  const min = (a.min_temp as number | undefined) ?? 7;
  const max = (a.max_temp as number | undefined) ?? 35;
  const step = (a.target_temp_step as number | undefined) ?? 0.5;
  const current = a.current_temperature as number | undefined;
  const target = a.temperature as number | undefined;
  const tLow = a.target_temp_low as number | undefined;
  const tHigh = a.target_temp_high as number | undefined;
  const modes = (a.hvac_modes as string[] | undefined) ?? [];
  const tint = dialTint(entity);

  // The dial fires onChange on every pointer-move — throttle the WS service call.
  const setTemp = useThrottle(
    (temperature: number) => void callService('climate', 'set_temperature', { temperature }, { entity_id: id }),
    110,
  );
  const setRange = useThrottle(
    (low: number, high: number) =>
      void callService('climate', 'set_temperature', { target_temp_low: low, target_temp_high: high }, { entity_id: id }),
    110,
  );

  return (
    <div className="simui-bloom climate">
      <div className="simui-bloom-dialwrap">
        {target != null ? (
          <TempDial
            value={clamp(target, min, max)}
            min={min}
            max={max}
            step={step}
            current={current}
            tint={tint}
            label="Target temperature"
            onChange={setTemp}
            size={208}
          />
        ) : tLow != null && tHigh != null ? (
          // heat_cool: a heating dial + a cooling dial side by side (single-thumb each).
          <div className="simui-bloom-dialpair">
            <div className="simui-bloom-dialcol">
              <span className="simui-qc-label">Heat to</span>
              <TempDial
                value={clamp(tLow, min, tHigh)}
                min={min}
                max={tHigh}
                step={step}
                current={current}
                tint="warm"
                label="Heat to"
                onChange={(v) => setRange(v, tHigh)}
                size={150}
              />
            </div>
            <div className="simui-bloom-dialcol">
              <span className="simui-qc-label">Cool to</span>
              <TempDial
                value={clamp(tHigh, tLow, max)}
                min={tLow}
                max={max}
                step={step}
                current={current}
                tint="cool"
                label="Cool to"
                onChange={(v) => setRange(tLow, v)}
                size={150}
              />
            </div>
          </div>
        ) : (
          current != null && <div className="simui-bloom-readonly num">{current}° now</div>
        )}
      </div>
      {modes.length > 0 && (
        <div className="simui-seg simui-bloom-modes" role="group" aria-label="HVAC mode">
          {modes.map((mode) => {
            const active = entity.state === mode;
            return (
              <button
                key={mode}
                className={`simui-segbtn${active ? ' is-active' : ''}`}
                aria-pressed={active}
                onClick={() =>
                  void callService('climate', 'set_hvac_mode', { hvac_mode: mode }, { entity_id: id })
                }
              >
                {prettyState(mode)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── fallback: the standard feature strip for non-studio domains ──────────────

function FeatureStudio({ entity, domain }: { entity: HassEntity; domain: string }) {
  const features = featuresFor(domain);
  if (!features.length) return null;
  return (
    <div className="simui-bloom feats">
      <TileFeatures entity={entity} features={features} />
    </div>
  );
}

function featuresFor(domain: string): TileFeature[] {
  switch (domain) {
    case 'cover':
      return [{ type: 'cover-open-close' }];
    case 'fan':
      return [{ type: 'fan-speed' }, { type: 'fan-oscillate' }];
    case 'lock':
      return [{ type: 'lock-commands' }];
    case 'alarm_control_panel':
      return [{ type: 'alarm-modes', modes: ['armed_home', 'armed_away', 'armed_night', 'disarmed'] }];
    default:
      return [];
  }
}
