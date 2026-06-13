import { Power } from 'lucide-react';
import { Tile } from '../components/Tile';
import { useHass } from '../hass/context';
import type { WidgetProps } from '../types';
import { domainOf, friendly, prettyState } from '../util';

const TOGGLEABLE = new Set(['switch', 'fan', 'input_boolean', 'siren', 'humidifier', 'automation']);

export function GenericTile({ entity }: WidgetProps) {
  const { callService } = useHass();
  const domain = domainOf(entity.entity_id);
  const isOnOff = entity.state === 'on' || entity.state === 'off';
  const on = entity.state === 'on';
  const canToggle = TOGGLEABLE.has(domain) && isOnOff;
  const unit = (entity.attributes.unit_of_measurement as string | undefined) ?? '';

  const toggle = canToggle
    ? () => void callService('homeassistant', on ? 'turn_off' : 'turn_on', {}, { entity_id: entity.entity_id })
    : undefined;

  return (
    <Tile onClick={toggle} className={canToggle && on ? 'is-on' : ''}>
      <div className="simui-row">
        {canToggle && <span className={`simui-ic${on ? ' cool' : ''}`}><Power size={15} strokeWidth={2} /></span>}
        <span className="simui-name" title={friendly(entity)}>{friendly(entity)}</span>
      </div>
      <span className="simui-state">{prettyState(entity.state)}{unit ? ` ${unit}` : ''}</span>
    </Tile>
  );
}
