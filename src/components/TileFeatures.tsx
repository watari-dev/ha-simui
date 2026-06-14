import type { ChangeEvent, CSSProperties } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Fan,
  Flame,
  Lock,
  LockOpen,
  Minus,
  Plus,
  Power,
  Snowflake,
  Square,
  Sun,
} from 'lucide-react';
import { useCallService } from '../hass/context';
import type { HassEntity } from '../types';
import type { TileFeature } from '../widgets/tileContract';
import { clamp, prettyState } from '../util';

/**
 * The tile FEATURE control-strip (FRAMEWORK.md §1) — upgrades a display tile into
 * a controller. Each feature renders one compact inline control below the tile
 * header, reusing the existing `widgets/*Tile.tsx` control idioms (`.simui-sbtn`,
 * `.simui-slider`, the temperature stepper). The control owns one service call;
 * placement and the entity subscription live on the parent tile.
 */
export function TileFeatures({ entity, features }: { entity: HassEntity; features: TileFeature[] }) {
  if (!features.length) return null;
  return (
    <div className="simui-feats">
      {features.map((f, i) => (
        <Feature key={`${f.type}-${i}`} entity={entity} feature={f} />
      ))}
    </div>
  );
}

function Feature({ entity, feature }: { entity: HassEntity; feature: TileFeature }) {
  switch (feature.type) {
    case 'cover-open-close':
      return <CoverOpenClose entity={entity} />;
    case 'climate-hvac-modes':
      return <ClimateHvacModes entity={entity} modes={feature.modes} style={feature.style} />;
    case 'climate-fan-modes':
      return <ClimateFanModes entity={entity} />;
    case 'target-temperature':
      return <TargetTemperature entity={entity} />;
    case 'fan-speed':
      return <FanSpeed entity={entity} />;
    case 'fan-oscillate':
      return <FanOscillate entity={entity} />;
    case 'lock-commands':
      return <LockCommands entity={entity} />;
    case 'alarm-modes':
      return <AlarmModes entity={entity} modes={feature.modes} />;
  }
}

// ── cover: open / stop / close (mirrors CoverTile's control row) ──────────────
const COVER_FEAT = { OPEN: 1, CLOSE: 2, STOP: 8 };

function CoverOpenClose({ entity }: { entity: HassEntity }) {
  const callService = useCallService();
  const sf = (entity.attributes.supported_features as number | undefined) ?? 0;
  const moving = entity.state === 'opening' || entity.state === 'closing';
  const call = (service: string) => void callService('cover', service, undefined, { entity_id: entity.entity_id });

  return (
    <div className="simui-controls">
      {(sf & COVER_FEAT.OPEN) === COVER_FEAT.OPEN && (
        <button className="simui-sbtn" aria-label="Open" onClick={() => call('open_cover')}>
          <ChevronUp size={15} strokeWidth={2} />
        </button>
      )}
      <button className="simui-sbtn" aria-label="Stop" disabled={!moving} onClick={() => call('stop_cover')}>
        <Square size={12} strokeWidth={2} />
      </button>
      {(sf & COVER_FEAT.CLOSE) === COVER_FEAT.CLOSE && (
        <button className="simui-sbtn" aria-label="Close" onClick={() => call('close_cover')}>
          <ChevronDown size={15} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}

// ── climate: hvac mode segmented buttons OR dropdown ──────────────────────────
const HVAC_ICON: Record<string, typeof Sun> = {
  heat: Flame,
  cool: Snowflake,
  heat_cool: Sun,
  auto: Sun,
  dry: Sun,
  fan_only: Fan,
  off: Power,
};

function ClimateHvacModes({
  entity,
  modes,
  style,
}: {
  entity: HassEntity;
  modes: string[];
  style?: 'icons' | 'dropdown';
}) {
  const callService = useCallService();
  const setMode = (mode: string) =>
    void callService('climate', 'set_hvac_mode', { hvac_mode: mode }, { entity_id: entity.entity_id });

  if (style === 'dropdown') {
    return (
      <Dropdown
        value={entity.state}
        options={modes}
        ariaLabel="HVAC mode"
        onSelect={setMode}
      />
    );
  }

  return (
    <div className="simui-seg" role="group" aria-label="HVAC mode">
      {modes.map((mode) => {
        const Icon = HVAC_ICON[mode] ?? Power;
        const active = entity.state === mode;
        return (
          <button
            key={mode}
            className={`simui-segbtn${active ? ' is-active' : ''}`}
            aria-pressed={active}
            aria-label={prettyState(mode)}
            title={prettyState(mode)}
            onClick={() => setMode(mode)}
          >
            {style === 'icons' ? <Icon size={14} strokeWidth={2} /> : prettyState(mode)}
          </button>
        );
      })}
    </div>
  );
}

// ── climate: fan mode dropdown ────────────────────────────────────────────────
function ClimateFanModes({ entity }: { entity: HassEntity }) {
  const callService = useCallService();
  const modes = (entity.attributes.fan_modes as string[] | undefined) ?? [];
  const current = entity.attributes.fan_mode as string | undefined;
  if (!modes.length) return null;
  return (
    <Dropdown
      value={current ?? ''}
      options={modes}
      ariaLabel="Fan mode"
      onSelect={(mode) =>
        void callService('climate', 'set_fan_mode', { fan_mode: mode }, { entity_id: entity.entity_id })
      }
    />
  );
}

// ── target temperature stepper (mirrors ClimateTile's stepper) ────────────────
function TargetTemperature({ entity }: { entity: HassEntity }) {
  const callService = useCallService();
  const a = entity.attributes;
  const target = a.temperature as number | undefined;
  const step = (a.target_temp_step as number | undefined) ?? 0.5;
  const min = (a.min_temp as number | undefined) ?? 7;
  const max = (a.max_temp as number | undefined) ?? 35;
  if (target == null) return null;

  const nudge = (delta: number) => {
    const next = clamp(Math.round((target + delta) / step) * step, min, max);
    void callService('climate', 'set_temperature', { temperature: next }, { entity_id: entity.entity_id });
  };

  return (
    <div className="simui-step">
      <button className="simui-sbtn" aria-label="Lower target" onClick={() => nudge(-step)}>
        <Minus size={14} strokeWidth={2.5} />
      </button>
      <span className="simui-target">{fmtTemp(target)}°</span>
      <button className="simui-sbtn" aria-label="Raise target" onClick={() => nudge(step)}>
        <Plus size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}

// ── fan speed slider → fan.set_percentage ─────────────────────────────────────
function FanSpeed({ entity }: { entity: HassEntity }) {
  const callService = useCallService();
  const pct = (entity.attributes.percentage as number | undefined) ?? 0;
  const stepRaw = entity.attributes.percentage_step as number | undefined;
  const step = stepRaw && stepRaw > 0 ? stepRaw : 1;

  const trackStyle: CSSProperties = {
    background: `linear-gradient(to right, var(--accent) ${pct}%, var(--faint) ${pct}%)`,
  };

  return (
    <input
      className="simui-slider"
      type="range"
      min={0}
      max={100}
      step={step}
      value={pct}
      aria-label="Fan speed"
      style={trackStyle}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        void callService('fan', 'set_percentage', { percentage: Number(e.target.value) }, { entity_id: entity.entity_id })
      }
    />
  );
}

// ── fan oscillate toggle ──────────────────────────────────────────────────────
function FanOscillate({ entity }: { entity: HassEntity }) {
  const callService = useCallService();
  const on = Boolean(entity.attributes.oscillating);
  return (
    <button
      className={`simui-ftoggle${on ? ' is-active' : ''}`}
      role="switch"
      aria-checked={on}
      aria-label="Oscillate"
      onClick={() =>
        void callService('fan', 'oscillate', { oscillating: !on }, { entity_id: entity.entity_id })
      }
    >
      <Fan size={14} strokeWidth={2} />
      <span>Oscillate</span>
    </button>
  );
}

// ── lock: lock / unlock ───────────────────────────────────────────────────────
function LockCommands({ entity }: { entity: HassEntity }) {
  const callService = useCallService();
  const locked = entity.state === 'locked';
  const busy = entity.state === 'locking' || entity.state === 'unlocking';
  const call = (service: string) => void callService('lock', service, undefined, { entity_id: entity.entity_id });

  return (
    <div className="simui-seg" role="group" aria-label="Lock">
      <button
        className={`simui-segbtn${locked ? ' is-active' : ''}`}
        aria-pressed={locked}
        disabled={busy}
        onClick={() => call('lock')}
      >
        <Lock size={14} strokeWidth={2} />
        <span>Lock</span>
      </button>
      <button
        className={`simui-segbtn${!locked ? ' is-active' : ''}`}
        aria-pressed={!locked}
        disabled={busy}
        onClick={() => call('unlock')}
      >
        <LockOpen size={14} strokeWidth={2} />
        <span>Unlock</span>
      </button>
    </div>
  );
}

// ── alarm: mode buttons → alarm_control_panel.alarm_arm_* / disarm ────────────
const ALARM_SERVICE: Record<string, string> = {
  disarmed: 'alarm_disarm',
  armed_home: 'alarm_arm_home',
  armed_away: 'alarm_arm_away',
  armed_night: 'alarm_arm_night',
  armed_vacation: 'alarm_arm_vacation',
  armed_custom_bypass: 'alarm_arm_custom_bypass',
};
const ALARM_LABEL: Record<string, string> = {
  disarmed: 'Disarm',
  armed_home: 'Home',
  armed_away: 'Away',
  armed_night: 'Night',
  armed_vacation: 'Vacation',
  armed_custom_bypass: 'Custom',
};

function AlarmModes({ entity, modes }: { entity: HassEntity; modes: string[] }) {
  const callService = useCallService();
  return (
    <div className="simui-seg" role="group" aria-label="Alarm mode">
      {modes.map((mode) => {
        const service = ALARM_SERVICE[mode];
        if (!service) return null;
        const active = entity.state === mode;
        return (
          <button
            key={mode}
            className={`simui-segbtn${active ? ' is-active' : ''}`}
            aria-pressed={active}
            onClick={() =>
              void callService('alarm_control_panel', service, undefined, { entity_id: entity.entity_id })
            }
          >
            {ALARM_LABEL[mode] ?? prettyState(mode)}
          </button>
        );
      })}
    </div>
  );
}

// ── shared: a themed select used by the climate dropdowns ─────────────────────
function Dropdown({
  value,
  options,
  ariaLabel,
  onSelect,
}: {
  value: string;
  options: string[];
  ariaLabel: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="simui-fsel-wrap">
      <select
        className="simui-fsel"
        aria-label={ariaLabel}
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onSelect(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {prettyState(opt)}
          </option>
        ))}
      </select>
      <ChevronDown className="simui-fsel-caret" size={13} strokeWidth={2} />
    </div>
  );
}

function fmtTemp(n: number): string {
  return Number.isInteger(n) ? `${n}` : n.toFixed(1);
}
