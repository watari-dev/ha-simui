import { Clapperboard, FileCode, Play, Power } from 'lucide-react';
import type { ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';
import { Tile } from '../components/Tile';
import { useCallService } from '../hass/context';
import type { WidgetProps } from '../types';
import { domainOf, friendly } from '../util';

/**
 * A one-tap runner for stateless / momentary entities — scene · script · button ·
 * input_button. These have no meaningful on/off state, so the tile shows the
 * friendly name + a clear "run" affordance and fires the correct service:
 *   scene / script  → turn_on
 *   button / input_button → press
 * No fake state is invented; an unavailable entity dims + can't be run.
 */

const ICONS: Record<string, ComponentType<LucideProps>> = {
  scene: Clapperboard,
  script: FileCode,
  button: Power,
  input_button: Power,
};

function serviceFor(domain: string): string {
  return domain === 'scene' || domain === 'script' ? 'turn_on' : 'press';
}

export function ActionTile({ entity }: WidgetProps) {
  const callService = useCallService();
  const domain = domainOf(entity.entity_id);
  const dead = entity.state === 'unavailable' || entity.state === 'unknown';
  const Icon = ICONS[domain] ?? Play;
  const name = friendly(entity);

  const run = () => {
    if (dead) return;
    void callService(domain, serviceFor(domain), {}, { entity_id: entity.entity_id });
  };

  return (
    <Tile
      onClick={dead ? undefined : run}
      className={`simui-action${dead ? ' is-unavailable' : ''}`}
    >
      <div className="simui-row">
        <span className="simui-ic"><Icon size={16} strokeWidth={2} /></span>
        <span className="simui-name" title={name}>{name}</span>
        <span className="simui-spacer" />
        <span className="simui-action-run" aria-hidden="true">
          <Play size={13} strokeWidth={2} fill="currentColor" />
        </span>
      </div>
    </Tile>
  );
}
