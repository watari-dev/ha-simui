import { Lock, LockOpen } from 'lucide-react';
import { useCallService } from '../../hass/context';
import type { HassEntity } from '../../types';
import { prettyState } from '../../util';
import { AttrList } from './AttrList';
import { DetailHeader } from './DetailHeader';

/**
 * Lock "more-info": a status masthead with the relative last-changed time, then a
 * pair of explicit Lock / Unlock buttons (clearer than a single toggle at sheet
 * density), gated only on the transient locking / unlocking states.
 */
export function LockDetail({ entity }: { entity: HassEntity }) {
  const callService = useCallService();
  const id = entity.entity_id;
  const locked = entity.state === 'locked';
  const busy = entity.state === 'locking' || entity.state === 'unlocking';

  const call = (service: string) => void callService('lock', service, {}, { entity_id: id });

  return (
    <div className="simui-detail">
      <DetailHeader
        value={prettyState(entity.state)}
        tone={locked ? undefined : 'warn'}
        since={entity.last_changed}
      />

      <div className="simui-detail-buttons wide">
        <button
          className={`simui-segbtn lg${locked ? ' is-active' : ''}`}
          aria-pressed={locked}
          disabled={busy}
          onClick={() => call('lock')}
        >
          <Lock size={15} strokeWidth={2} /> Lock
        </button>
        <button
          className={`simui-segbtn lg${!locked && !busy ? ' is-active' : ''}`}
          aria-pressed={!locked && !busy}
          disabled={busy}
          onClick={() => call('unlock')}
        >
          <LockOpen size={15} strokeWidth={2} /> Unlock
        </button>
      </div>

      <AttrList entity={entity} />
    </div>
  );
}
