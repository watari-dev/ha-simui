import { Lock, LockOpen } from 'lucide-react';
import { Tile } from '../components/Tile';
import { StateLine } from '../components/StateLine';
import { useCallService } from '../hass/context';
import { useTapHandler } from '../runtime';
import type { WidgetProps } from '../types';
import { friendly } from '../util';

export function LockTile({ entity, actions }: WidgetProps) {
  const callService = useCallService();
  const locked = entity.state === 'locked';
  const toggle = () => void callService('lock', locked ? 'unlock' : 'lock', {}, { entity_id: entity.entity_id });
  // Whole-tile tap defaults to lock/unlock; an authored `tap` action overrides it.
  const onTap = useTapHandler(entity.entity_id, actions, toggle);
  const dead = entity.state === 'unavailable' || entity.state === 'unknown';

  // Dead device — dim, no toggle (a dead lock must not look operable).
  if (dead) {
    return (
      <Tile className="is-unavailable">
        <div className="simui-row">
          <span className="simui-ic"><Lock size={15} strokeWidth={2} /></span>
          <span className="simui-name" title={friendly(entity)}>{friendly(entity)}</span>
        </div>
        <StateLine value="Unavailable" tone="muted" />
      </Tile>
    );
  }

  return (
    <Tile onClick={onTap} className={locked ? '' : 'is-unlocked'}>
      <div className="simui-row">
        <span className={`simui-ic${locked ? '' : ' amber'}`}>
          {locked ? <Lock size={15} strokeWidth={2} /> : <LockOpen size={15} strokeWidth={2} />}
        </span>
        <span className="simui-name" title={friendly(entity)}>{friendly(entity)}</span>
      </div>
      <StateLine value={locked ? 'Locked' : 'Unlocked'} since={entity.last_changed} tone={locked ? 'muted' : 'warn'} />
    </Tile>
  );
}
