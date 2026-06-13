import type { ChangeEvent, CSSProperties } from 'react';
import { ChevronDown, ChevronUp, Lock, LockOpen, Power } from 'lucide-react';
import { useCallService, useEntity } from '../hass/context';
import { domainOf, friendly, prettyState, supportsFeature } from '../util';

const TOGGLEABLE = new Set(['switch', 'fan', 'input_boolean', 'humidifier', 'siren', 'automation']);

// One compact row that adapts to its entity's domain. Subscribes to a single
// entity, so it repaints only when that entity changes.
export function EntityRow({ entityId }: { entityId: string }) {
  const e = useEntity(entityId);
  const callService = useCallService();

  if (!e) {
    return (
      <div className="simui-erow">
        <span className="simui-erow-name muted">{entityId}</span>
        <span className="simui-spacer" />
        <span className="simui-erow-state">—</span>
      </div>
    );
  }

  const domain = domainOf(entityId);
  const name = friendly(e);

  if (domain === 'light') {
    const on = e.state === 'on';
    const brightness = (e.attributes.brightness as number | undefined) ?? 0;
    const pct = on ? Math.max(1, Math.round((brightness / 255) * 100)) : 0;
    const toggle = () => void callService('light', on ? 'turn_off' : 'turn_on', {}, { entity_id: entityId });
    const setPct = (ev: ChangeEvent<HTMLInputElement>) =>
      void callService('light', 'turn_on', { brightness_pct: Number(ev.target.value) }, { entity_id: entityId });
    return (
      <div className="simui-erow">
        <button className="simui-erow-dot" data-on={on} aria-label={`Toggle ${name}`} onClick={toggle} />
        <button className="simui-erow-name as-btn" onClick={toggle}>{name}</button>
        <span className="simui-spacer" />
        {on ? (
          <input
            className="simui-slider warm mini"
            type="range"
            min={1}
            max={100}
            value={pct}
            aria-label={`${name} brightness`}
            onChange={setPct}
            style={{ background: `linear-gradient(to right, var(--warm) ${pct}%, var(--faint) ${pct}%)` } as CSSProperties}
          />
        ) : (
          <span className="simui-erow-state">Off</span>
        )}
      </div>
    );
  }

  if (domain === 'lock') {
    const locked = e.state === 'locked';
    const toggle = () => void callService('lock', locked ? 'unlock' : 'lock', {}, { entity_id: entityId });
    return (
      <button className="simui-erow as-row" onClick={toggle}>
        <span className={`simui-erow-ic${locked ? '' : ' amber'}`}>
          {locked ? <Lock size={15} strokeWidth={2} /> : <LockOpen size={15} strokeWidth={2} />}
        </span>
        <span className="simui-erow-name">{name}</span>
        <span className="simui-spacer" />
        <span className={`simui-erow-state${locked ? '' : ' warn'}`}>{locked ? 'Locked' : 'Unlocked'}</span>
      </button>
    );
  }

  if (domain === 'cover') {
    const pos = e.attributes.current_position as number | undefined;
    const call = (s: string) => void callService('cover', s, undefined, { entity_id: entityId });
    return (
      <div className="simui-erow">
        <span className="simui-erow-name">{name}</span>
        <span className="simui-spacer" />
        <span className="simui-erow-state">{pos != null ? `${pos}%` : prettyState(e.state)}</span>
        {supportsFeature(e, 1) && <button className="simui-rbtn" aria-label="Open" onClick={() => call('open_cover')}><ChevronUp size={14} /></button>}
        {supportsFeature(e, 2) && <button className="simui-rbtn" aria-label="Close" onClick={() => call('close_cover')}><ChevronDown size={14} /></button>}
      </div>
    );
  }

  if (domain === 'sensor' || domain === 'binary_sensor') {
    const unit = (e.attributes.unit_of_measurement as string | undefined) ?? '';
    return (
      <div className="simui-erow">
        <span className="simui-erow-name">{name}</span>
        <span className="simui-spacer" />
        <span className="simui-erow-val num">{prettyState(e.state)}{unit ? ` ${unit}` : ''}</span>
      </div>
    );
  }

  if (TOGGLEABLE.has(domain) && (e.state === 'on' || e.state === 'off')) {
    const on = e.state === 'on';
    const toggle = () => void callService('homeassistant', on ? 'turn_off' : 'turn_on', {}, { entity_id: entityId });
    return (
      <button className="simui-erow as-row" onClick={toggle}>
        <span className={`simui-erow-ic${on ? ' cool' : ''}`}><Power size={15} strokeWidth={2} /></span>
        <span className="simui-erow-name">{name}</span>
        <span className="simui-spacer" />
        <span className={`simui-erow-state${on ? ' on' : ''}`}>{on ? 'On' : 'Off'}</span>
      </button>
    );
  }

  return (
    <div className="simui-erow">
      <span className="simui-erow-name">{name}</span>
      <span className="simui-spacer" />
      <span className="simui-erow-state">{prettyState(e.state)}</span>
    </div>
  );
}
