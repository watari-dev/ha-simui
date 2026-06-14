import { MapPin, UserCheck, UserX } from 'lucide-react';
import { Tile } from '../components/Tile';
import { StateLine } from '../components/StateLine';
import { useActions } from '../dashboard/useActions';
import { useTapHandler } from '../runtime';
import type { WidgetProps } from '../types';
import { friendly, prettyState } from '../util';

/**
 * person / device_tracker presence — home/away with a zone read-out. Tap opens the
 * detail Sheet (where a map can live); the icon tints `cool` (accent) when home,
 * `warn` (amber) when away. State stays glanceable with a recency suffix.
 */
export function PersonTile({ entity, actions }: WidgetProps) {
  const run = useActions();
  const onTap = useTapHandler(entity.entity_id, actions, () =>
    run({ action: 'more-info' }, entity.entity_id),
  );
  const dead = entity.state === 'unavailable' || entity.state === 'unknown';
  const name = friendly(entity);

  if (dead) {
    return (
      <Tile className="is-unavailable">
        <div className="simui-row">
          <span className="simui-ic"><MapPin size={15} strokeWidth={2} /></span>
          <span className="simui-name" title={name}>{name}</span>
        </div>
        <StateLine value="Unavailable" tone="muted" />
      </Tile>
    );
  }

  const home = entity.state === 'home';
  const away = entity.state === 'not_home';
  // A custom zone ("Work", "School") is neither — surface its name verbatim.
  const label = home ? 'Home' : away ? 'Away' : prettyState(entity.state);
  const Icon = home ? UserCheck : away ? UserX : MapPin;
  const iconClass = home ? ' cool' : away ? '' : ' amber';

  return (
    <Tile onClick={onTap} className={home ? 'is-on' : ''}>
      <div className="simui-row">
        <span className={`simui-ic${iconClass}`}><Icon size={15} strokeWidth={2} /></span>
        <span className="simui-name" title={name}>{name}</span>
      </div>
      <StateLine value={label} since={entity.last_changed} tone={home ? 'on' : away ? 'muted' : 'warn'} />
    </Tile>
  );
}
