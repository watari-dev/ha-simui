import { Lightbulb } from 'lucide-react';
import { Tile } from '../components/Tile';
import { SliderTile } from '../components/SliderTile';
import type { WidgetProps } from '../types';
import { friendly } from '../util';

/**
 * Light tile — the everyday light surface. Delegates the live case to the premium
 * drag-to-set {@link SliderTile} (the tile IS the slider: a soft warm fill rises
 * with brightness, a round icon disc toggles in place, the body opens the detail
 * sheet — Apple-Home split-action). Keeps a dedicated dead-device branch so an
 * unavailable light never shows a live dimmer (it would read as broken/controllable
 * when it isn't).
 */
export function LightTile({ entity, actions }: WidgetProps) {
  const dead = entity.state === 'unavailable' || entity.state === 'unknown';
  if (dead) {
    return (
      <Tile className="is-unavailable">
        <div className="simui-row">
          <span className="simui-ic"><Lightbulb size={16} strokeWidth={2} /></span>
          <span className="simui-name" title={friendly(entity)}>{friendly(entity)}</span>
          <span className="simui-spacer" />
          <span className="simui-pct">Unavailable</span>
        </div>
      </Tile>
    );
  }
  return <SliderTile entity={entity.entity_id} actions={actions} />;
}
