import { useEffect, useRef, useState } from 'react';
import { Thermometer } from 'lucide-react';
import { Tile } from '../components/Tile';
import { Sparkline } from '../components/Sparkline';
import type { WidgetProps } from '../types';
import { formatNumber, friendly } from '../util';

// In-memory rolling history per entity, accumulated live as states update.
// (Real long-range history via the HA history API is a later phase.)
const buffers = new Map<string, number[]>();
const MAX_POINTS = 40;

export function SensorTile({ entity }: WidgetProps) {
  const a = entity.attributes;
  const unit = (a.unit_of_measurement as string | undefined) ?? '';
  const isTemp = a.device_class === 'temperature';
  const num = Number(entity.state);
  const isNumeric = entity.state !== '' && !Number.isNaN(num);
  const lastSeen = useRef('');
  const [, bump] = useState(0);

  useEffect(() => {
    if (!isNumeric || lastSeen.current === entity.state) return;
    lastSeen.current = entity.state;
    const buf = buffers.get(entity.entity_id) ?? [];
    buf.push(num);
    while (buf.length > MAX_POINTS) buf.shift();
    buffers.set(entity.entity_id, buf);
    bump((n) => n + 1);
  }, [entity.entity_id, entity.state, isNumeric, num]);

  const buf = buffers.get(entity.entity_id) ?? [];
  const delta = buf.length > 1 ? num - buf[0] : 0;
  const showDelta = isNumeric && Math.abs(delta) >= 0.05;
  const deltaSuffix = isTemp ? '°' : '';

  return (
    <Tile>
      <div className="simui-row">
        {isTemp && <span className="simui-ic"><Thermometer size={15} strokeWidth={2} /></span>}
        <span className="simui-name" title={friendly(entity)}>{friendly(entity)}</span>
        <span className="simui-spacer" />
        {showDelta && (
          <span className={`simui-delta ${delta > 0 ? 'up' : 'down'}`}>
            {delta > 0 ? '▲' : '▼'} {formatNumber(Math.abs(delta))}{deltaSuffix}
          </span>
        )}
      </div>
      <div className="simui-row" style={{ alignItems: 'flex-end' }}>
        <span className="simui-big">
          {isNumeric ? formatNumber(num) : entity.state}
          {unit ? <span className="simui-unit"> {unit}</span> : null}
        </span>
        {isNumeric && buf.length > 1 && (
          <span style={{ marginLeft: 'auto' }} className="simui-spark"><Sparkline values={buf} width={64} height={22} /></span>
        )}
      </div>
    </Tile>
  );
}
