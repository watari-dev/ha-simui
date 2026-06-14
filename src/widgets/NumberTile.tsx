import type { ChangeEvent, CSSProperties, MouseEvent } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Tile } from '../components/Tile';
import { useCallService } from '../hass/context';
import { useTapHandler } from '../runtime';
import type { WidgetProps } from '../types';
import { clamp, domainOf, formatNumber, friendly } from '../util';
import './InputTile.css';

/**
 * number / input_number — a labelled value the user can set. A `slider`-mode
 * helper gets a fill slider (like LightTile); a `box`-mode helper (or one with no
 * sensible range) gets a −/+ stepper. Both call `<domain>.set_value`. The current
 * value uses tabular numerals; the unit dims after it.
 */
export function NumberTile({ entity, actions }: WidgetProps) {
  const callService = useCallService();
  // Display-only body today — only the inner slider/steppers act. Honor an
  // authored `tap`, else inert (fallback undefined ⇒ byte-for-byte unchanged).
  const onTap = useTapHandler(entity.entity_id, actions, undefined);
  const domain = domainOf(entity.entity_id); // 'number' | 'input_number'
  const dead = entity.state === 'unavailable' || entity.state === 'unknown';
  const name = friendly(entity);

  const a = entity.attributes;
  const min = (a.min as number | undefined) ?? 0;
  const max = (a.max as number | undefined) ?? 100;
  const step = (a.step as number | undefined) ?? 1;
  const unit = (a.unit_of_measurement as string | undefined) ?? '';
  const mode = (a.mode as string | undefined) ?? 'auto';
  const raw = Number(entity.state);
  const value = Number.isFinite(raw) ? raw : min;

  if (dead) {
    return (
      <Tile className="is-unavailable simui-input" onClick={onTap}>
        <div className="simui-row">
          <span className="simui-name" title={name}>{name}</span>
          <span className="simui-spacer" />
          <span className="simui-value">Unavailable</span>
        </div>
      </Tile>
    );
  }

  const setValue = (v: number) =>
    void callService(domain, 'set_value', { value: clamp(v, min, max) }, { entity_id: entity.entity_id });
  const nudge = (delta: number) =>
    setValue(Math.round((value + delta) / step) * step);

  // A wide-range numeric reads best as a slider; box-mode (or a degenerate range)
  // gets the precise stepper instead.
  const span = max - min;
  const asSlider = mode !== 'box' && span > 0 && span / step <= 1000;
  const pct = span > 0 ? clamp(((value - min) / span) * 100, 0, 100) : 0;
  const trackStyle: CSSProperties = {
    background: `linear-gradient(to right, var(--accent) ${pct}%, var(--faint) ${pct}%)`,
  };

  return (
    <Tile className="simui-input" onClick={onTap}>
      <div className="simui-row">
        <span className="simui-name" title={name}>{name}</span>
        <span className="simui-spacer" />
        <span className="simui-value simui-input-value">
          {formatNumber(value)}{unit && <span className="simui-unit"> {unit}</span>}
        </span>
      </div>
      {asSlider ? (
        <input
          className="simui-slider"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={name}
          style={trackStyle}
          onClick={(e: MouseEvent) => e.stopPropagation()}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(Number(e.target.value))}
        />
      ) : (
        <div className="simui-step simui-input-step">
          <button className="simui-sbtn" aria-label="Decrease" disabled={value <= min} onClick={() => nudge(-step)}>
            <Minus size={14} strokeWidth={2.5} />
          </button>
          <span className="simui-target">{formatNumber(value)}</span>
          <button className="simui-sbtn" aria-label="Increase" disabled={value >= max} onClick={() => nudge(step)}>
            <Plus size={14} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </Tile>
  );
}
