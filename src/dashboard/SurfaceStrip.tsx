import { useAggregate } from '../hass/context';
import { useActions } from './useActions';
import {
  ActionPill,
  ConditionalBadge,
  CountPill,
  NavPill,
  SelectControl,
  StatusStrip,
  StatusTile,
} from '../components/StatusStrip';
import { iconNode } from '../components/icons';
import { resolveSource } from './presets/index';
import type { StripPill } from './presets/index';

/**
 * Render a surface's StatusStrip (FRAMEWORK.md §6) from the pure `StripPill[]` a
 * preset builder emitted. The pills are presentational; this layer owns the
 * subscriptions — counts come from a `useAggregate` over the pill's ListSource,
 * conditionals from a live state check. Tap wiring goes through `useActions`.
 */
export function SurfaceStrip({ pills }: { pills: StripPill[] }) {
  if (!pills.length) return null;
  return (
    <StatusStrip>
      {pills.map((p, i) => (
        <PillView key={i} pill={p} />
      ))}
    </StatusStrip>
  );
}

function PillView({ pill }: { pill: StripPill }) {
  const run = useActions();

  switch (pill.kind) {
    case 'count':
      return <CountPillBound pill={pill} />;
    case 'nav':
      return (
        <NavPill
          icon={iconNode(pill.icon)}
          label={pill.label}
          accent={pill.accent}
          onTap={() => run({ action: 'navigate', path: pill.path })}
        />
      );
    case 'action':
      return (
        <ActionPill
          icon={iconNode(pill.icon)}
          label={pill.label}
          accent={pill.accent}
          onTap={() => run(pill.action)}
        />
      );
    case 'conditional':
      return <ConditionalPillBound pill={pill} />;
    case 'status':
      return <StatusTile entity={pill.entityId} />;
    case 'select':
      // Glance-only in the strip; tap opens the option picker as a Sheet.
      return (
        <SelectControl
          entity={pill.entityId}
          name={pill.name}
          onTap={() => run({ action: 'more-info' }, pill.entityId)}
        />
      );
  }
}

function CountPillBound({ pill }: { pill: Extract<StripPill, { kind: 'count' }> }) {
  const count = useAggregate((states) => resolveSource(pill.source, states).length);
  return (
    <CountPill
      label={pill.label}
      count={count}
      iconOn={iconNode(pill.icon)}
      iconOff={iconNode(pill.icon)}
      activeColor={pill.accent}
    />
  );
}

function ConditionalPillBound({ pill }: { pill: Extract<StripPill, { kind: 'conditional' }> }) {
  const visible = useAggregate((states) => {
    const cond = pill.visibleWhen;
    const e = states[cond.entity];
    if (!e) return false;
    if (cond.state != null) {
      const want = Array.isArray(cond.state) ? cond.state : [cond.state];
      if (!want.includes(e.state)) return false;
    }
    const n = Number(e.state);
    if (cond.above != null && !(n > cond.above)) return false;
    if (cond.below != null && !(n < cond.below)) return false;
    return true;
  });
  return <ConditionalBadge label={pill.label} icon={iconNode(pill.icon)} accent={pill.accent} visible={visible} />;
}
