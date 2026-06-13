import { useEntity } from '../../hass/context';
import type { Block } from '../types';

// Borderless headline that sits on the ambient canvas — typically the room's
// climate as a big, quiet readout.
export function HeroBlock({ block }: { block: Block }) {
  const climate = useEntity(block.entityIds[0]);
  if (!climate) return null;

  const a = climate.attributes;
  const current = a.current_temperature as number | undefined;
  const target = a.temperature as number | undefined;
  const action = a.hvac_action as string | undefined;

  let sub = climate.state.replace(/_/g, ' ');
  if (action === 'heating' && target != null) sub = `Heating to ${fmt(target)}°`;
  else if (action === 'cooling' && target != null) sub = `Cooling to ${fmt(target)}°`;
  else if (action === 'idle') sub = 'Idle';
  else if (target != null) sub = `Set to ${fmt(target)}°`;

  return (
    <div className="simui-hero">
      <div className="simui-hero-temp num">{current != null ? Math.round(current) : '—'}<small>°</small></div>
      <div className="simui-hero-sub">{sub}</div>
    </div>
  );
}

function fmt(n: number): string {
  return Number.isInteger(n) ? `${n}` : n.toFixed(1);
}
