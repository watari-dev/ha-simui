import { useEntity } from '../../hass/context';
import { useActions } from '../useActions';
import { GaugeTile } from '../../widgets';
import { iconNode } from '../../components/icons';
import { tokenVar } from '../../components/Tile';
import { domainOf, friendly, formatNumber, prettyState } from '../../util';
import type { CSSProperties } from 'react';
import type { ColorToken } from '../../widgets/tileContract';
import type { Block } from '../types';
import './StatBlock.css';

/**
 * The display-only block the core renderers can't produce (FRAMEWORK.md §1, the
 * "glance" tier). One renderer, several variants chosen by `options.statVariant`:
 *
 *   stat     a big tabular number (+ optional delta + sparkline) — TradingView readout
 *   gauge    a radial gauge (reuses the built `widgets/GaugeTile`, which is opt-in)
 *   label    a section heading that sits on the ambient canvas (no surface chrome)
 *   divider  a hairline rule / spacer
 *
 * All variants degrade gracefully: a missing entity yields a quiet "unavailable"
 * stat, never a crash. Knobs live in the forward-compatible `block.options` bag
 * (read structurally) so no shared type needs augmenting.
 */

type StatVariant = 'stat' | 'gauge' | 'label' | 'divider';

interface StatOptions {
  /** Which display variant to render. Omit ⇒ 'stat'. */
  statVariant?: StatVariant;
  /** Force the value accent (else state-derived). */
  color?: ColorToken;
  /** Override the icon (lucide name). Omit ⇒ derived from variant/domain. */
  icon?: string;
  /** Override the label line. Omit ⇒ friendly name. */
  label?: string;
  /** stat: a small static sparkline (preset-seeded). Omit ⇒ no sparkline. */
  spark?: number[];
  /** stat: render the delta-vs-first chip from `spark`. Default true when spark present. */
  showDelta?: boolean;
  /** label: a dimmed sub-label after the title. */
  sublabel?: string;
  /** label: drop the trailing hairline rule. */
  noRule?: boolean;
  /** divider: render as a transparent spacer rather than a hairline. */
  spacer?: boolean;
}

function readOptions(block: Block): StatOptions {
  return ((block as { options?: StatOptions }).options ?? {}) as StatOptions;
}

export function StatBlock({ block }: { block: Block }) {
  const opts = readOptions(block);
  const variant = opts.statVariant ?? 'stat';

  if (variant === 'divider') return <Divider spacer={opts.spacer} />;
  if (variant === 'label') return <SectionLabel block={block} opts={opts} />;
  if (variant === 'gauge') return <GaugeStat block={block} />;
  return <NumberStat block={block} opts={opts} />;
}

/** Radial gauge — delegate to the existing (opt-in) GaugeTile widget. */
function GaugeStat({ block }: { block: Block }) {
  const id = block.entityIds[0];
  const entity = useEntity(id);
  if (!entity) {
    return (
      <div className="simui-stat is-unavailable">
        <div className="simui-stat-label">{id ?? 'No entity'}</div>
        <div className="simui-stat-val">—</div>
      </div>
    );
  }
  return <GaugeTile entity={entity} />;
}

/** Big tabular number — the headline readout (FRAMEWORK.md §1 glance tier). */
function NumberStat({ block, opts }: { block: Block; opts: StatOptions }) {
  const id = block.entityIds[0];
  const entity = useEntity(id);
  const run = useActions();
  const compact = block.span === 1;

  if (!entity) {
    return (
      <div className={`simui-stat is-unavailable${compact ? ' is-compact' : ''}`}>
        <div className="simui-stat-head">
          <span className="simui-stat-label" title={id}>{block.title ?? id ?? 'No entity'}</span>
        </div>
        <div className="simui-stat-body"><span className="simui-stat-val">—</span></div>
      </div>
    );
  }

  const a = entity.attributes;
  const dead = entity.state === 'unavailable' || entity.state === 'unknown';
  const unit = (a.unit_of_measurement as string | undefined) ?? '';
  const num = Number(entity.state);
  const isNumeric = entity.state !== '' && !Number.isNaN(num);
  const label = opts.label ?? block.title ?? friendly(entity);
  const accent = tokenVar(opts.color ?? deriveColor(entity.state, a.device_class as string | undefined));
  const icon = opts.icon ?? iconForDomain(domainOf(entity.entity_id), a.device_class as string | undefined);

  const spark = opts.spark && opts.spark.length >= 2 ? opts.spark : undefined;
  const showDelta = spark != null && (opts.showDelta ?? true);
  const delta = spark ? spark[spark.length - 1] - spark[0] : 0;

  const style = accent ? ({ '--stat-accent': accent } as CSSProperties) : undefined;
  const accented = !!accent && !dead;

  return (
    <div
      className={`simui-stat${accented ? ' is-accented' : ''}${dead ? ' is-unavailable' : ''}${compact ? ' is-compact' : ''}`}
      style={style}
      role="button"
      tabIndex={0}
      onClick={() => run({ action: 'more-info' }, entity.entity_id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); run({ action: 'more-info' }, entity.entity_id); } }}
    >
      <div className="simui-stat-head">
        {icon && <span className="simui-stat-ic">{iconNode(icon, 14)}</span>}
        <span className="simui-stat-label" title={label}>{label}</span>
        {showDelta && (
          <span className={`simui-stat-delta${delta > 0 ? ' up' : delta < 0 ? ' down' : ''}`}>
            {delta > 0 ? '↑' : delta < 0 ? '↓' : '·'} {formatNumber(Math.abs(delta))}
          </span>
        )}
      </div>
      <div className="simui-stat-body">
        <span className={`simui-stat-val${accented ? ' is-accented' : ''}`}>
          {dead ? prettyState(entity.state) : isNumeric ? formatNumber(num) : prettyState(entity.state)}
        </span>
        {unit && !dead && <span className="simui-stat-unit">{unit}</span>}
      </div>
      {spark && <Sparkline points={spark} />}
    </div>
  );
}

/** A small TradingView-flavoured sparkline (line + faint area), normalized to box. */
function Sparkline({ points }: { points: number[] }) {
  const W = 120;
  const H = 30;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const step = points.length > 1 ? W / (points.length - 1) : W;
  const xy = points.map((p, i) => {
    const x = i * step;
    const y = H - ((p - min) / span) * (H - 4) - 2; // 2px breathing room
    return [x, y] as const;
  });
  const line = xy.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const area = `${line} L ${W} ${H} L 0 ${H} Z`;
  return (
    <svg className="simui-stat-spark" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden>
      <path className="simui-stat-sparkarea" d={area} />
      <path className="simui-stat-sparkline" d={line} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Section heading on the canvas — orients a stretch of blocks without a card box. */
function SectionLabel({ block, opts }: { block: Block; opts: StatOptions }) {
  const title = opts.label ?? block.title ?? 'Section';
  return (
    <div className="simui-stat-section">
      {opts.icon && <span className="simui-stat-section-ic">{iconNode(opts.icon, 15)}</span>}
      <span className="simui-stat-section-title">{title}</span>
      {opts.sublabel && <span className="simui-stat-section-sub">{opts.sublabel}</span>}
      {!opts.noRule && <span className="simui-stat-section-rule" />}
    </div>
  );
}

function Divider({ spacer }: { spacer?: boolean }) {
  return <div className={`simui-stat-divider${spacer ? ' is-spacer' : ''}`} aria-hidden />;
}

/** State-derived accent (color reserved for state/active, DESIGN_PRINCIPLES). */
function deriveColor(state: string, deviceClass?: string): ColorToken {
  switch (deviceClass) {
    case 'temperature': return 'warn';
    case 'humidity': return 'cyan';
    case 'power':
    case 'energy': return 'warn';
    case 'battery': return 'none';
    case 'illuminance': return 'cyan';
    default: break;
  }
  if (state === 'on' || state === 'home' || state === 'open') return 'accent';
  return 'none';
}

function iconForDomain(domain: string, deviceClass?: string): string {
  if (deviceClass === 'temperature') return 'thermometer';
  if (deviceClass === 'power' || deviceClass === 'energy') return 'zap';
  switch (domain) {
    case 'light': return 'lightbulb';
    case 'climate': return 'thermostat';
    case 'media_player': return 'cast';
    case 'sensor': return 'activity';
    case 'binary_sensor': return 'activity';
    default: return 'activity';
  }
}
