import { Tile } from '../components/Tile';
import type { WidgetProps } from '../types';
import { clamp, formatNumber, friendly } from '../util';

/**
 * A radial arc gauge for a numeric entity (sensor / number / input_number).
 * Min/max come from the entity's attributes when present (`min`/`max`, the
 * `number` domain's bounds), else a 0–100 default. Theme-aware (the arc uses the
 * single accent), tabular value. Exported but NOT auto-mapped to a domain — opt
 * in by composing it explicitly. Dead state dims via `.is-unavailable`.
 */

const SIZE = 96;
const STROKE = 9;
const R = (SIZE - STROKE) / 2;
const CX = SIZE / 2;
const CY = SIZE / 2;
// 270° sweep (a classic open-bottom gauge), starting 135° below the +x axis.
const START = 135;
const SWEEP = 270;
const CIRC = 2 * Math.PI * R;
const ARC_LEN = CIRC * (SWEEP / 360);

function polar(angleDeg: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
}

function arcPath(): string {
  const a = polar(START);
  const b = polar(START + SWEEP);
  const large = SWEEP > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${R} ${R} 0 ${large} 1 ${b.x} ${b.y}`;
}

export function GaugeTile({ entity }: WidgetProps) {
  const dead = entity.state === 'unavailable' || entity.state === 'unknown';
  const a = entity.attributes;
  const unit = (a.unit_of_measurement as string | undefined) ?? '';
  const min = (a.min as number | undefined) ?? 0;
  const max = (a.max as number | undefined) ?? 100;
  const num = Number(entity.state);
  const isNumeric = entity.state !== '' && !Number.isNaN(num);
  const name = friendly(entity);

  const span = max - min || 1;
  const frac = isNumeric ? clamp((num - min) / span, 0, 1) : 0;
  const path = arcPath();

  return (
    <Tile className={`simui-gauge${dead ? ' is-unavailable' : ''}`}>
      <span className="simui-name" title={name}>{name}</span>
      <div className="simui-gauge-wrap">
        <svg
          className="simui-gauge-svg"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          width={SIZE}
          height={SIZE}
          role="img"
          aria-label={`${name}: ${isNumeric ? formatNumber(num) : entity.state}${unit ? ` ${unit}` : ''}`}
        >
          <path
            className="simui-gauge-track"
            d={path}
            fill="none"
            strokeWidth={STROKE}
            strokeLinecap="round"
          />
          <path
            className="simui-gauge-fill"
            d={path}
            fill="none"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${ARC_LEN * frac} ${CIRC}`}
          />
        </svg>
        <div className="simui-gauge-readout">
          <span className="simui-gauge-val">
            {isNumeric ? formatNumber(num) : '—'}
          </span>
          {unit && <span className="simui-gauge-unit">{unit}</span>}
        </div>
      </div>
    </Tile>
  );
}
