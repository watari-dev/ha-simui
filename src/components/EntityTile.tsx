import type { MouseEvent, ReactNode } from 'react';
import { useEntity } from '../hass/context';
import { useActions } from '../dashboard/useActions';
import { Tile } from './Tile';
import { TileFeatures } from './TileFeatures';
import { StateLine } from './StateLine';
import { ContextMenu, useContextMenu, type ContextMenuItem } from './ContextMenu';
import { QuickControls, isControllable } from './QuickControls';
import { iconNode } from './icons';
import type { ColorToken, HassAction, StateBit, TileFeature } from '../widgets/tileContract';
import { domainOf, friendly, prettyState } from '../util';

export interface EntityTileProps {
  entity: string;
  name?: string;
  icon?: string;
  stateContent?: StateBit[] | StateBit;
  features?: TileFeature[];
  /** body tap — default: more-info (open the detail Sheet). */
  tapAction?: HassAction;
  /** icon tap — default: toggle for toggleable domains, else more-info. */
  iconTapAction?: HassAction;
  orientation?: 'horizontal' | 'vertical';
  color?: ColorToken;
  hideState?: boolean;
  /** Extra right-click / long-press items appended after the defaults. */
  menuItems?: ContextMenuItem[];
}

const TOGGLEABLE = new Set([
  'light', 'switch', 'fan', 'input_boolean', 'humidifier', 'siren', 'automation', 'media_player', 'lock', 'cover',
]);

function isActive(state: string): boolean {
  return state !== 'off' && state !== 'unavailable' && state !== 'unknown' && state !== 'closed' && state !== 'locked' && state !== '';
}

/**
 * The full-contract leaf (FRAMEWORK.md §1) for generic entities: name/icon header,
 * an optional inline `features` control strip, split body/icon taps via `runAction`
 * (body default = more-info Sheet, icon default = toggle), a `stateContent` line,
 * and a right-click / long-press context menu. One surgical `useEntity`; the block
 * owns placement. Per-domain widgets still render their own rich bodies — this is
 * the fallback/composed leaf and the launcher's sibling.
 */
export function EntityTile(props: EntityTileProps) {
  const e = useEntity(props.entity);
  const run = useActions();
  const menu = useContextMenu();

  const domain = domainOf(props.entity);
  const name = props.name ?? (e ? friendly(e) : props.entity);
  const on = !!e && isActive(e.state);
  const toggleable = TOGGLEABLE.has(domain);

  const bodyAction: HassAction = props.tapAction ?? { action: 'more-info' };
  const iconAction: HassAction = props.iconTapAction ?? (toggleable ? { action: 'toggle' } : { action: 'more-info' });

  const onBody = () => run(bodyAction, props.entity);
  const onIcon = (ev: MouseEvent) => {
    ev.stopPropagation();
    run(iconAction, props.entity);
  };

  const stateBits = props.stateContent
    ? Array.isArray(props.stateContent) ? props.stateContent : [props.stateContent]
    : ['state'];
  const wantsSince = stateBits.includes('last_changed') || stateBits.includes('last_updated');
  const sinceIso = wantsSince
    ? (stateBits.includes('last_updated') ? e?.last_updated : e?.last_changed)
    : undefined;
  const unit = (e?.attributes.unit_of_measurement as string | undefined) ?? '';
  const stateText = e ? `${prettyState(e.state)}${unit ? ` ${unit}` : ''}` : '—';

  const icon: ReactNode = iconNode(props.icon ?? defaultIconName(domain));

  const items: ContextMenuItem[] = [
    ...(toggleable ? [{ label: on ? 'Turn off' : 'Turn on', onClick: () => run({ action: 'toggle' }, props.entity) }] : []),
    { label: 'Details', onClick: () => run({ action: 'more-info' }, props.entity) },
    ...(props.menuItems ?? []),
  ];

  return (
    <>
      <Tile
        orientation={props.orientation}
        color={props.color}
        active={on}
        onClick={onBody}
        menuProps={menu.menuProps}
        className={on && (props.color === 'warm') ? 'is-lit' : ''}
      >
        <div className="simui-row">
          <span
            className={`simui-ic${on ? ' on' : ''}`}
            onClick={iconAction.action !== 'none' ? onIcon : undefined}
            role={iconAction.action !== 'none' ? 'button' : undefined}
            aria-label={iconAction.action === 'toggle' ? `Toggle ${name}` : undefined}
          >
            {icon}
          </span>
          <span className="simui-name" title={name}>{name}</span>
        </div>
        {props.features && props.features.length > 0 && e && (
          <TileFeatures entity={e} features={props.features} />
        )}
        {!props.hideState && <StateLine value={stateText} since={sinceIso} tone={on ? 'on' : 'muted'} />}
      </Tile>
      {menu.open && menu.position && (
        <ContextMenu
          items={items}
          x={menu.position.x}
          y={menu.position.y}
          onClose={menu.close}
          header={isControllable(props.entity) ? <QuickControls entityId={props.entity} compact /> : undefined}
        />
      )}
    </>
  );
}

function defaultIconName(domain: string): string {
  switch (domain) {
    case 'light': return 'lightbulb';
    case 'climate': return 'thermostat';
    case 'media_player': return 'cast';
    case 'lock': return 'lock';
    case 'cover': return 'blinds';
    case 'fan': return 'fan';
    case 'sensor': return 'gauge';
    case 'binary_sensor': return 'activity';
    case 'scene':
    case 'script': return 'sparkles';
    default: return 'power';
  }
}

/**
 * Action-only / launcher tile (FRAMEWORK.md §1) — no entity. The category launcher
 * and scene/macro buttons. `hideState` is implied; tap fires `tapAction`.
 */
export function LauncherTile({
  name,
  icon,
  color = 'accent',
  orientation = 'vertical',
  onTap,
}: {
  name: string;
  icon?: string;
  color?: ColorToken;
  orientation?: 'horizontal' | 'vertical';
  onTap: () => void;
}) {
  return (
    <Tile orientation={orientation} color={color} active onClick={onTap} className="is-launcher">
      <span className="simui-launch-ic">{iconNode(icon, orientation === 'vertical' ? 20 : 16)}</span>
      <span className="simui-name simui-launch-name" title={name}>{name}</span>
    </Tile>
  );
}
