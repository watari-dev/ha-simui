import { Lock, LockOpen } from 'lucide-react';
import { Tile } from '../components/Tile';
import { useHass } from '../hass/context';
import type { WidgetProps } from '../types';
import { friendly } from '../util';

export function LockTile({ entity }: WidgetProps) {
  const { callService } = useHass();
  const locked = entity.state === 'locked';
  const toggle = () => void callService('lock', locked ? 'unlock' : 'lock', {}, { entity_id: entity.entity_id });

  return (
    <Tile onClick={toggle} className={locked ? '' : 'is-unlocked'}>
      <div className="simui-row">
        <span className={`simui-ic${locked ? '' : ' amber'}`}>
          {locked ? <Lock size={15} strokeWidth={2} /> : <LockOpen size={15} strokeWidth={2} />}
        </span>
        <span className="simui-name" title={friendly(entity)}>{friendly(entity)}</span>
      </div>
      <span className={`simui-state${locked ? '' : ' warn'}`}>{locked ? 'Locked' : 'Unlocked'}</span>
    </Tile>
  );
}
