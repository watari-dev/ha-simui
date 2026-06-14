import type { ComponentType } from 'react';
import {
  Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Cloudy,
  Moon, Sun, Wind, type LucideProps,
} from 'lucide-react';
import { Tile } from '../components/Tile';
import type { WidgetProps } from '../types';
import { formatNumber, friendly, prettyState } from '../util';

/** HA weather `condition` → glyph. Falls back to Cloud for anything unmapped. */
const ICONS: Record<string, ComponentType<LucideProps>> = {
  'clear-night': Moon,
  cloudy: Cloudy,
  exceptional: Wind,
  fog: CloudFog,
  hail: CloudSnow,
  lightning: CloudLightning,
  'lightning-rainy': CloudLightning,
  partlycloudy: Cloud,
  pouring: CloudRain,
  rainy: CloudDrizzle,
  snowy: CloudSnow,
  'snowy-rainy': CloudSnow,
  sunny: Sun,
  windy: Wind,
  'windy-variant': Wind,
};

interface ForecastEntry {
  datetime?: string;
  temperature?: number;
  condition?: string;
}

function conditionIcon(condition: string): ComponentType<LucideProps> {
  return ICONS[condition] ?? Cloud;
}

function dayLabel(iso: string | undefined): string {
  if (!iso) return '';
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return '';
  return new Date(t).toLocaleDateString(undefined, { weekday: 'short' });
}

export function WeatherTile({ entity }: WidgetProps) {
  const dead = entity.state === 'unavailable' || entity.state === 'unknown';
  const a = entity.attributes;
  const temp = a.temperature as number | undefined;
  const unit = (a.temperature_unit as string | undefined) ?? '°';
  const condition = entity.state;
  const Icon = conditionIcon(condition);
  const name = friendly(entity);

  const forecast = (Array.isArray(a.forecast) ? (a.forecast as ForecastEntry[]) : []).slice(0, 4);

  if (dead) {
    return (
      <Tile className="simui-weather is-unavailable">
        <div className="simui-row">
          <span className="simui-name" title={name}>{name}</span>
          <span className="simui-spacer" />
          <span className="simui-state">{prettyState(entity.state)}</span>
        </div>
      </Tile>
    );
  }

  return (
    <Tile className="simui-weather">
      <div className="simui-wx-head">
        <span className="simui-wx-ic"><Icon size={26} strokeWidth={1.75} /></span>
        <div className="simui-wx-now">
          <span className="simui-wx-temp">
            {temp != null ? formatNumber(temp) : '—'}
            <span className="simui-unit">{unit}</span>
          </span>
          <span className="simui-wx-cond" title={name}>{prettyState(condition)}</span>
        </div>
      </div>
      {forecast.length > 0 && (
        <div className="simui-wx-fc">
          {forecast.map((f, i) => {
            const FIcon = conditionIcon(f.condition ?? '');
            return (
              <div className="simui-wx-fcd" key={f.datetime ?? i}>
                <span className="simui-wx-fcl">{dayLabel(f.datetime)}</span>
                <span className="simui-wx-fci"><FIcon size={14} strokeWidth={1.75} /></span>
                <span className="simui-wx-fct">
                  {f.temperature != null ? formatNumber(f.temperature) : '—'}°
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Tile>
  );
}
