import type { ChangeEvent } from 'react';
import { useAggregate, useCallService } from '../../hass/context';
import { domainOf } from '../../util';
import { EntityRow } from '../EntityRow';
import type { Block } from '../types';

// A cohesive surface holding related controls. For an all-lights group it gets
// a master brightness; otherwise just the rows.
export function GroupBlock({ block }: { block: Block }) {
  const ids = block.entityIds;
  const allLights = ids.length > 0 && ids.every((id) => domainOf(id) === 'light');

  return (
    <div className="simui-surface">
      {block.title && (
        <div className="simui-surface-head">
          <span>{block.title}</span>
        </div>
      )}
      {allLights && <LightMaster ids={ids} />}
      <div className="simui-rows">
        {ids.map((id) => <EntityRow key={id} entityId={id} />)}
      </div>
    </div>
  );
}

function LightMaster({ ids }: { ids: string[] }) {
  const callService = useCallService();
  const avg = useAggregate((states) => {
    const on = ids.filter((id) => states[id]?.state === 'on');
    if (!on.length) return 0;
    const sum = on.reduce((s, id) => s + Number(states[id]?.attributes.brightness ?? 0), 0);
    return Math.round((sum / on.length / 255) * 100);
  });
  const setAll = (e: ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    ids.forEach((id) => void callService('light', 'turn_on', { brightness_pct: v }, { entity_id: id }));
  };
  return (
    <div className="simui-master">
      <span className="simui-master-label">All</span>
      <input
        className="simui-slider warm"
        type="range"
        min={0}
        max={100}
        value={avg}
        aria-label="All lights brightness"
        onChange={setAll}
        style={{ background: `linear-gradient(to right, var(--warm) ${avg}%, var(--faint) ${avg}%)` }}
      />
      <span className="simui-master-val num">{avg}%</span>
    </div>
  );
}
