import type { ChangeEvent, CSSProperties } from 'react';
import { ChevronDown, ChevronUp, Info, Lock, LockOpen, Power } from 'lucide-react';
import { useCallService, useEntity } from '../hass/context';
import { useActions } from './useActions';
import { useTileAction } from '../runtime/actions';
import { ContextMenu, useContextMenu, type ContextMenuItem } from '../components/ContextMenu';
import { QuickControls, isControllable } from '../components/QuickControls';
import { TileFeatures } from '../components/TileFeatures';
import { domainOf, friendly, prettyState, relativeTime, supportsFeature } from '../util';
import type { ActionMap } from '../editor/types';

/** Dimmed "· 2m ago" recency suffix for event-like rows. */
function Since({ iso }: { iso?: string }) {
  const rel = relativeTime(iso);
  return rel ? <span className="simui-since"> · {rel}</span> : null;
}

const TOGGLEABLE = new Set(['switch', 'fan', 'input_boolean', 'humidifier', 'siren', 'automation']);

// One compact row that adapts to its entity's domain. Subscribes to a single
// entity, so it repaints only when that entity changes. Right-click / long-press
// opens a context menu; the menu's "Details" opens the native detail Sheet.
//
// `actions` (optional) carries the editor-authored ActionMap. When omitted (every
// row today), the per-domain hardcoded defaults below are used unchanged. When set,
// `useTileAction` resolves the configured tap / iconTap / doubleTap to the same
// `runAction` path as the rest of the app. Hold / context menu is left to the
// existing `menuProps` wiring this pass (the body hook's `onRequestMenu` only routes
// an *explicit* executable hold; an unset hold keeps the native menu).
export function EntityRow({ entityId, actions }: { entityId: string; actions?: ActionMap }) {
  const e = useEntity(entityId);
  const callService = useCallService();
  const run = useActions();
  const menu = useContextMenu();

  // Resolved interaction handlers honouring `actions`. Called unconditionally to
  // keep hook order stable; the per-leaf rule below only swaps in the hook handler
  // when the matching slot was actually configured.
  const hookBody = useTileAction(entityId, actions, {
    onRequestMenu: (x, y) => menu.openAt(x, y),
  });
  const hookIcon = useTileAction(entityId, actions, { useIconTap: true });
  // doubleTap fires only when configured; otherwise undefined (no smart-click).
  const onDoubleClick = actions?.doubleTap ? hookBody.onDoubleClick : undefined;

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
    const bodyTap = actions?.tap ? hookBody.onClick : () => run({ action: 'more-info' }, entityId);
    return (
      <button className="simui-erow as-row is-unavailable" onClick={bodyTap} onDoubleClick={onDoubleClick} {...menu.menuProps}>
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
    // Dot = icon tap (default toggle); name = body tap (default more-info).
    const dotTap = actions?.iconTap ? hookIcon.onClick : toggle;
    const nameTap = actions?.tap ? hookBody.onClick : () => run({ action: 'more-info' }, entityId);
    return (
      <div className="simui-erow" {...menu.menuProps}>
        <button className="simui-erow-dot" data-on={on} aria-label={`Toggle ${name}`} onClick={dotTap} />
        <button className="simui-erow-name as-btn" onClick={nameTap} onDoubleClick={onDoubleClick}>{name}</button>
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
    const bodyTap = actions?.tap ? hookBody.onClick : toggle;
    return (
      <button className="simui-erow as-row" onClick={bodyTap} onDoubleClick={onDoubleClick} {...menu.menuProps}>
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
    // The cover row has no body-level tap today; only honour a configured tap so
    // existing behaviour (no row click) is preserved when `actions` is unset.
    const bodyTap = actions?.tap ? hookBody.onClick : undefined;
    return (
      <div className="simui-erow" onClick={bodyTap} onDoubleClick={onDoubleClick} {...menu.menuProps}>
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
    const nameTap = actions?.tap ? hookBody.onClick : () => run({ action: 'more-info' }, entityId);
    return (
      <div className="simui-erow climate" {...menu.menuProps}>
        <button className="simui-erow-name as-btn" onClick={nameTap} onDoubleClick={onDoubleClick}>{name}</button>
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
    const bodyTap = actions?.tap ? hookBody.onClick : () => run({ action: 'more-info' }, entityId);
    return (
      <button className="simui-erow as-row" onClick={bodyTap} onDoubleClick={onDoubleClick} {...menu.menuProps}>
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
    const bodyTap = actions?.tap ? hookBody.onClick : toggle;
    return (
      <button className="simui-erow as-row" onClick={bodyTap} onDoubleClick={onDoubleClick} {...menu.menuProps}>
        <span className={`simui-erow-ic${on ? ' cool' : ''}`}><Power size={15} strokeWidth={2} /></span>
        <span className="simui-erow-name">{name}</span>
        <span className="simui-spacer" />
        <span className={`simui-erow-state${on ? ' on' : ''}`}>{on ? 'On' : 'Off'}<Since iso={e.last_changed} /></span>
        {menuOverlay}
      </button>
    );
  }

  const bodyTap = actions?.tap ? hookBody.onClick : () => run({ action: 'more-info' }, entityId);
  return (
    <button className="simui-erow as-row" onClick={bodyTap} onDoubleClick={onDoubleClick} {...menu.menuProps}>
      <span className="simui-erow-name">{name}</span>
      <span className="simui-spacer" />
      <span className="simui-erow-state">{prettyState(e.state)}</span>
      {menuOverlay}
    </button>
  );
}
