import { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { useEntity, useAggregate } from '../hass/context';
import { widgetFor } from '../widgets';
import { domainOf } from '../util';
import { lightIdsOf, summarizeRoom } from './summary';
import type { Room } from './types';

/**
 * Room-first home (Apple-Home gestalt): each room is a section of its own device
 * tiles, rendered inline on the landing page rather than hidden behind a room-card.
 * The header taps through to the full composed RoomView; the section shows the
 * room's primary, controllable devices as big tiles (capped, with a "+N" overflow).
 */

// Controllable / glanceable domains that earn a tile on the home. Sensors and
// diagnostics stay in the category/room views, not the room-first overview.
const TILE_DOMAINS = new Set([
  'light', 'climate', 'media_player', 'lock', 'cover', 'fan', 'switch', 'input_boolean', 'humidifier',
]);
const MAX_TILES = 6;

// Media players and cameras need width for album art / transport / preview — give
// them a 2-wide cell so the title doesn't truncate to a single letter.
const WIDE_DOMAINS = new Set(['media_player', 'camera']);

function DeviceTile({ id }: { id: string }) {
  const entity = useEntity(id);
  const Widget = widgetFor(domainOf(id));
  if (!entity) return null;
  const wide = WIDE_DOMAINS.has(domainOf(id));
  return (
    <div className={`simui-roomsec-cell${wide ? ' wide' : ''}`}>
      <Widget entity={entity} />
    </div>
  );
}

export function RoomSection({ room, onOpen }: { room: Room; onOpen: () => void }) {
  const allIds = useMemo(() => [...new Set(room.blocks.flatMap((b) => b.entityIds))], [room]);
  const lightIds = useMemo(() => lightIdsOf(room), [room]);
  const deviceIds = useMemo(() => allIds.filter((id) => TILE_DOMAINS.has(domainOf(id))), [allIds]);

  const glance = useAggregate((s) => summarizeRoom(room, lightIds, s), allIds);

  if (!deviceIds.length) return null;
  const shown = deviceIds.slice(0, MAX_TILES);
  const extra = deviceIds.length - shown.length;

  return (
    <section className="simui-roomsec">
      <button className="simui-roomsec-head" onClick={onOpen} aria-label={`Open ${room.name}`}>
        <span className="simui-roomsec-name">{room.name}</span>
        {glance && <span className="simui-roomsec-glance num">{glance}</span>}
        <ChevronRight className="simui-roomsec-go" size={17} strokeWidth={2} />
      </button>
      <div className="simui-roomsec-grid">
        {shown.map((id) => <DeviceTile key={id} id={id} />)}
        {extra > 0 && (
          <button className="simui-roomsec-more" onClick={onOpen}>
            +{extra} more
          </button>
        )}
      </div>
    </section>
  );
}
