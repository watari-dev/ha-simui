import type { ChangeEvent, CSSProperties } from 'react';
import { ChevronDown, ChevronUp, Info, Lock, LockOpen, Power } from 'lucide-react';
import { useCallService, useEntity } from '../hass/context';
import { useActions } from './useActions';
import { ContextMenu, useContextMenu, type ContextMenuItem } from '../components/ContextMenu';
import { QuickControls, isControllable } from '../components/QuickControls';
import { TileFeatures } from '../components/TileFeatures';
import { domainOf, friendly, prettyState, relativeTime, supportsFeature } from '../util';

/** Dimmed "· 2m ago" recency suffix for event-like rows. */
function Since({ iso }: { iso?: string }) {
  const rel = relativeTime(iso);
  return rel ? <span className="simui-since"> · {rel}</span> : null;
}

const TOGGLEABLE = new Set(['switch', 'fan', 'input_boolean', 'humidifier', 'siren', 'automation']);

// One compact row that adapts to its entity's domain. Subscribes to a single
// entity, so it repaints only when that entity changes. Right-click / long-press
// opens a context menu; the menu's "Details" opens the native detail Sheet.
export function EntityRow({ entityId }: { entityId: string }) {
  const e = useEntity(entityId);
  const callService = useCallService();
  const run = useActions();
  const menu = useContextMenu();

  const domain = domainOf(entityId);
  const name = e ? friendly(e) : entityId;

  const on = !!e && e.state === 'on';
  const locked = !!e && e.state === 'locked';
  const menuItems: ContextMenuItem[] = [
    ...(domain === 'light' || TOGGLEABLE.has(domain)
      ? [{ label: on ? 'Turn off' : 'Turn on', onClick: () => run({ action: 'toggle' }, entityId) }]
      : []),
    ...(domain === 'lock'
      ? [{ label: locked ? 'Unlock' : 'Lock', onClick: () => void callService('lock', locked ? 'unlock' : 'lock', {}, { entity_id: entityId }) }]
      : []),
    { label: 'Details', icon: <Info size={14} />, onClick: () => run({ action: 'more-info' }, entityId) },
  ];

  const menuOverlay = menu.open && menu.position && (
    <ContextMenu
      items={menuItems}
      x={menu.position.x}
      y={menu.position.y}
      onClose={menu.close}
      header={isControllable(entityId) ? <QuickControls entityId={entityId} compact /> : undefined}
    />
  );

  if (!e) {
    return (
      <div className="simui-erow" {...menu.menuProps}>
        <span className="simui-erow-name muted">{entityId}</span>
        <span className="simui-spacer" />
        <span className="simui-erow-state">—</span>
        {menuOverlay}
      </div>
    );
  }

  // Unavailable / unknown — dim, drop the controls (a dead device showing a live
  // slider reads as broken). On a real home this is the majority sensor state.
  if (e.state === 'unavailable' || e.state === 'unknown') {
    return (
      <button className="simui-erow as-row is-unavailable" onClick={() => run({ action: 'more-info' }, entityId)} {...menu.menuProps}>
        <span className="simui-erow-name">{name}</span>
        <span className="simui-spacer" />
        <span className="simui-erow-state">{prettyState(e.state)}</span>
        {menuOverlay}
      </button>
    );
  }

  if (domain === 'light') {
    const brightness = (e.attributes.brightness as number | undefined) ?? 0;
    const pct = on ? Math.max(1, Math.round((brightness / 255) * 100)) : 0;
    const toggle = () => void callService('light', on ? 'turn_off' : 'turn_on', {}, { entity_id: entityId });
    const setPct = (ev: ChangeEvent<HTMLInputElement>) =>
      void callService('light', 'turn_on', { brightness_pct: Number(ev.target.value) }, { entity_id: entityId });
    return (
      <div className="simui-erow" {...menu.menuProps}>
        <button className="simui-erow-dot" data-on={on} aria-label={`Toggle ${name}`} onClick={toggle} />
        <button className="simui-erow-name as-btn" onClick={() => run({ action: 'more-info' }, entityId)}>{name}</button>
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
        {menuOverlay}
      </div>
    );
  }

  if (domain === 'lock') {
    const toggle = () => void callService('lock', locked ? 'unlock' : 'lock', {}, { entity_id: entityId });
    return (
      <button className="simui-erow as-row" onClick={toggle} {...menu.menuProps}>
        <span className={`simui-erow-ic${locked ? '' : ' amber'}`}>
          {locked ? <Lock size={15} strokeWidth={2} /> : <LockOpen size={15} strokeWidth={2} />}
        </span>
        <span className="simui-erow-name">{name}</span>
        <span className="simui-spacer" />
        <span className={`simui-erow-state${locked ? '' : ' warn'}`}>{locked ? 'Locked' : 'Unlocked'}<Since iso={e.last_changed} /></span>
        {menuOverlay}
      </button>
    );
  }

  if (domain === 'cover') {
    const pos = e.attributes.current_position as number | undefined;
    const call = (s: string) => void callService('cover', s, undefined, { entity_id: entityId });
    return (
      <div className="simui-erow" {...menu.menuProps}>
        <span className="simui-erow-name">{name}</span>
        <span className="simui-spacer" />
        <span className="simui-erow-state">{pos != null ? `${pos}%` : prettyState(e.state)}</span>
        {supportsFeature(e, 1) && <button className="simui-rbtn" aria-label="Open" onClick={() => call('open_cover')}><ChevronUp size={14} /></button>}
        {supportsFeature(e, 2) && <button className="simui-rbtn" aria-label="Close" onClick={() => call('close_cover')}><ChevronDown size={14} /></button>}
        {menuOverlay}
      </div>
    );
  }

  if (domain === 'climate') {
    const current = e.attributes.current_temperature as number | undefined;
    const action = (e.attributes.hvac_action as string | undefined) ?? e.state;
    const tone = action === 'heating' ? ' warn' : action === 'cooling' ? ' on' : '';
    return (
      <div className="simui-erow climate" {...menu.menuProps}>
        <button className="simui-erow-name as-btn" onClick={() => run({ action: 'more-info' }, entityId)}>{name}</button>
        <span className="simui-spacer" />
        <span className={`simui-erow-state${tone}`}>{current != null ? `${Math.round(current)}°` : prettyState(e.state)}</span>
        <TileFeatures entity={e} features={[{ type: 'target-temperature' }]} />
        {menuOverlay}
      </div>
    );
  }

  if (domain === 'sensor' || domain === 'binary_sensor') {
    const unit = (e.attributes.unit_of_measurement as string | undefined) ?? '';
    const isBinary = domain === 'binary_sensor';
    return (
      <button className="simui-erow as-row" onClick={() => run({ action: 'more-info' }, entityId)} {...menu.menuProps}>
        <span className="simui-erow-name">{name}</span>
        <span className="simui-spacer" />
        <span className={isBinary ? 'simui-erow-state' : 'simui-erow-val num'}>
          {prettyState(e.state)}{unit ? ` ${unit}` : ''}{isBinary && <Since iso={e.last_changed} />}
        </span>
        {menuOverlay}
      </button>
    );
  }

  if (TOGGLEABLE.has(domain) && (e.state === 'on' || e.state === 'off')) {
    const toggle = () => void callService('homeassistant', on ? 'turn_off' : 'turn_on', {}, { entity_id: entityId });
    return (
      <button className="simui-erow as-row" onClick={toggle} {...menu.menuProps}>
        <span className={`simui-erow-ic${on ? ' cool' : ''}`}><Power size={15} strokeWidth={2} /></span>
        <span className="simui-erow-name">{name}</span>
        <span className="simui-spacer" />
        <span className={`simui-erow-state${on ? ' on' : ''}`}>{on ? 'On' : 'Off'}<Since iso={e.last_changed} /></span>
        {menuOverlay}
      </button>
    );
  }

  return (
    <button className="simui-erow as-row" onClick={() => run({ action: 'more-info' }, entityId)} {...menu.menuProps}>
      <span className="simui-erow-name">{name}</span>
      <span className="simui-spacer" />
      <span className="simui-erow-state">{prettyState(e.state)}</span>
      {menuOverlay}
    </button>
  );
}
