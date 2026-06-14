import { useEntity } from '../../hass/context';
import { TileFeatures } from '../../components/TileFeatures';
import { domainOf, friendly, prettyState } from '../../util';
import type { TileFeature } from '../../widgets/tileContract';
import type { Block } from '../types';

// Borderless headline that sits on the ambient canvas. The room's climate as a
// big, quiet temperature readout — but it also degrades to a generic state hero
// (alarm panel, garage alert) when the preset surfaces a non-climate entity.
export function HeroBlock({ block }: { block: Block }) {
  const entity = useEntity(block.entityIds[0]);
  if (!entity) return null;

  const a = entity.attributes;
  const domain = domainOf(entity.entity_id);
  const isClimate = domain === 'climate' || a.current_temperature != null;

  if (isClimate) {
    const current = a.current_temperature as number | undefined;
    const target = a.temperature as number | undefined;
    const action = a.hvac_action as string | undefined;

    let sub = entity.state.replace(/_/g, ' ');
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

  // Generic state hero — alarm panel / garage alert / lock. Big state + the
  // entity's inline control strip (FRAMEWORK.md §1) when it has one.
  const features = heroFeatures(domain, entity.state);
  return (
    <div className="simui-hero is-state">
      <div className="simui-hero-state num">{prettyState(entity.state)}</div>
      <div className="simui-hero-sub">{block.title ?? friendly(entity)}</div>
      {features.length > 0 && <TileFeatures entity={entity} features={features} />}
    </div>
  );
}

function heroFeatures(domain: string, _state: string): TileFeature[] {
  if (domain === 'alarm_control_panel') {
    return [{ type: 'alarm-modes', modes: ['disarmed', 'armed_home', 'armed_away', 'armed_night'] }];
  }
  if (domain === 'cover') return [{ type: 'cover-open-close' }];
  if (domain === 'lock') return [{ type: 'lock-commands' }];
  return [];
}

function fmt(n: number): string {
  return Number.isInteger(n) ? `${n}` : n.toFixed(1);
}
