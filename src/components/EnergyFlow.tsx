import { Home as HomeIcon, Sun as SunIcon, Zap as ZapIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEntity } from '../hass/context';
import { domainOf } from '../util';
import type { HassEntity } from '../types';
import type { Block } from '../dashboard/types';
import './EnergyFlow.css';

/** A flow-node glyph. Battery is custom (carries a SOC fill); the rest wrap lucide. */
type FlowNodeIcon = (props: { soc?: number }) => ReactNode;

const Sun: FlowNodeIcon = () => <SunIcon size={20} strokeWidth={2} />;
const House: FlowNodeIcon = () => <HomeIcon size={20} strokeWidth={2} />;
const Utility: FlowNodeIcon = () => <ZapIcon size={20} strokeWidth={2} />;

/**
 * A battery glyph whose fill tracks state-of-charge (the Powerwall idiom). Drawn by
 * hand so the inner bar can scale to `soc`%; uses currentColor so the node accent
 * tints it. No SOC ⇒ a hollow battery outline.
 */
const Battery: FlowNodeIcon = ({ soc }) => {
  const pct = soc == null ? 0 : Math.min(100, Math.max(0, soc));
  const innerMax = 11; // inner width at 100%
  const w = (pct / 100) * innerMax;
  return (
    <svg width={22} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="7" width="16" height="10" rx="2.2" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="10" width="2.4" height="4" rx="1" fill="currentColor" />
      {soc != null && w > 0 && (
        <rect x="3.5" y="8.5" width={w} height="7" rx="1" fill="currentColor" />
      )}
    </svg>
  );
};

/**
 * A Powerwall-style energy-flow object (FRAMEWORK.md "novel object" seam): a native,
 * glanceable diagram of where power is flowing right now — generation → home, grid
 * import/export, battery charge/discharge — with live values. Display-only, controlled
 * by `block` exactly like StatBlock: it reads `block.entityIds` + `block.options`
 * structurally so no shared Block type needs augmenting (the `options.energyFlow` seam).
 *
 * Layout — a four-node cross around the Home hub:
 *
 *        ☀ Solar
 *           │
 *   ⌁ Grid ─●─ 🔋 Battery
 *          Home
 *
 * Each peripheral node connects to Home by a single flow edge that carries the live
 * power value. An edge is "active" only when |power| crosses a small threshold; only
 * active edges colour + animate (minimal motion — a slow dash, disabled under
 * prefers-reduced-motion). Missing nodes are omitted; unavailable/dim values read "—".
 *
 * Sign conventions (the Tesla Powerwall idiom, the canonical home-battery system —
 * see assumptions in EnergyFlow.css header):
 *   solar    : magnitude only; >0 ⇒ producing (flows Solar → Home).
 *   grid     : SIGNED. >0 ⇒ importing (Grid → Home, var(--warn)); <0 ⇒ exporting
 *              (Home → Grid, var(--up)). Override via options.energyFlow.gridSign.
 *   battery  : SIGNED. >0 ⇒ discharging (Battery → Home, var(--up)); <0 ⇒ charging
 *              (Home → Battery, var(--accent)). Override via options.energyFlow.batterySign.
 *   home     : load magnitude (always a sink).
 */

type Role = 'solar' | 'load' | 'grid' | 'battery';

/** Optional sub-config carried on `block.options.energyFlow` (read structurally). */
interface EnergyFlowOptions {
  /** Truthy ⇒ this card is an energy-flow object (the routing seam in BlockChrome). */
  energyFlow?: boolean;
  /** Explicit entity assignment, bypassing the heuristic classifier. */
  solar?: string;
  load?: string;
  grid?: string;
  battery?: string;
  /** Battery state-of-charge sensor (`%`). Omit ⇒ derived from the entity set. */
  batterySoc?: string;
  /**
   * Sign of an importing grid reading. `1` (default, Tesla idiom): a POSITIVE grid
   * power value means importing. `-1`: a positive value means exporting (some
   * inverters report the opposite). Flips the import/export interpretation.
   */
  gridSign?: 1 | -1;
  /**
   * Sign of a discharging battery reading. `1` (default, Tesla idiom): a POSITIVE
   * battery power value means discharging (battery → home). `-1`: a positive value
   * means charging.
   */
  batterySign?: 1 | -1;
}

function readOptions(block: Block): EnergyFlowOptions {
  const flag = (block as { options?: { energyFlow?: EnergyFlowOptions | boolean } }).options?.energyFlow;
  // `energyFlow` may be a bare `true` (just the routing flag) or a sub-config object.
  return typeof flag === 'object' && flag ? flag : {};
}

// ── A tiny role classifier (the `roleOf` in power.ts is not exported; this mirrors
// it but adds SOC detection + a `site`/`mains` grid alias the chart's role logic
// lacks). Pattern-only over the entity id so it can run BEFORE the per-slot
// subscriptions, keeping the hook order fixed (see `resolveIds`). ──
const RX_SOC = /charge|state_of_charge|\bsoc\b|battery_level|_level$/i;
const RX_SOLAR = /sol(ar)?|pv|generation|inverter|production/i;
const RX_BATTERY = /batt|powerwall/i;
const RX_GRID = /grid|site|import|export|mains|utility|feed/i;

interface Picked {
  solar?: string;
  load?: string;
  grid?: string;
  battery?: string;
  soc?: string;
}

// ── Geometry. A 260×180 viewBox; Home at the hub, three satellites on a cross.
// Kept tight vertically (no bottom node) so the diagram fills its card instead of
// leaving an empty lower third. ──
const VB_W = 260;
const VB_H = 180;
const HUB = { x: VB_W / 2, y: 104 };
const POS: Record<Role, { x: number; y: number }> = {
  solar: { x: VB_W / 2, y: 36 },
  grid: { x: 40, y: HUB.y },
  battery: { x: VB_W - 40, y: HUB.y },
  load: HUB,
};

function fmt(kw: number): string {
  const a = Math.abs(kw);
  if (a >= 10) return Math.round(a).toString();
  if (a >= 1) return a.toFixed(1).replace(/\.0$/, '');
  // Sub-kW: show watts so a trickle still reads (e.g. 240 W rather than 0.2).
  return Math.round(a * 1000).toString();
}
function unitFor(kw: number): string {
  return Math.abs(kw) >= 1 ? 'kW' : 'W';
}

interface NodeView {
  role: Role;
  icon: FlowNodeIcon;
  label: string;
  /** Accent CSS var for the node when active. */
  accent: string;
  /** kW magnitude shown under the icon (sink/source headline). */
  value: number;
  dead: boolean;
  /** battery only: state-of-charge percentage (0..100) or undefined. */
  soc?: number;
}

interface EdgeView {
  role: Exclude<Role, 'load'>;
  /** Direction of real power flow: 'in' = toward Home, 'out' = away from Home. */
  dir: 'in' | 'out' | 'idle';
  active: boolean;
  /** kW magnitude on the wire. */
  value: number;
  accent: string;
  dead: boolean;
}

const ACTIVE_KW = 0.05; // 50 W — below this an edge is "idle" (no colour, no motion).

export function EnergyFlow({ block }: { block: Block }) {
  const opts = readOptions(block);
  // useEntity per slot — surgical subscriptions (DESIGN_PRINCIPLES §13). Hooks run
  // unconditionally in a fixed order; a slot with no id resolves to undefined.
  // We must resolve the picks before the hooks, so derive ids from a non-reactive
  // read first, then subscribe. The id set is stable for a given block config.
  const ids = resolveIds(block, opts);
  const solarE = useEntity(ids.solar ?? '');
  const loadE = useEntity(ids.load ?? '');
  const gridE = useEntity(ids.grid ?? '');
  const batteryE = useEntity(ids.battery ?? '');
  const socE = useEntity(ids.soc ?? '');

  const gridSign = opts.gridSign ?? 1;
  const batterySign = opts.batterySign ?? 1;

  // Build node views. A node is "present" if its id was assigned (even if dead).
  const nodes: NodeView[] = [];

  const solar = numVal(solarE);
  if (ids.solar) {
    nodes.push({
      role: 'solar',
      icon: Sun,
      label: 'Solar',
      accent: 'var(--up)',
      value: Math.abs(solar.kw),
      dead: solar.dead,
    });
  }

  const load = numVal(loadE);
  // Home is always shown when there's any system at all (it's the hub).
  nodes.push({
    role: 'load',
    icon: House,
    label: 'Home',
    accent: 'var(--text)',
    value: Math.abs(load.kw),
    dead: ids.load ? load.dead : true,
  });

  const grid = numVal(gridE);
  if (ids.grid) {
    nodes.push({
      role: 'grid',
      icon: Utility,
      label: 'Grid',
      accent: 'var(--warn)',
      value: Math.abs(grid.kw),
      dead: grid.dead,
    });
  }

  const battery = numVal(batteryE);
  const socNum = numVal(socE);
  if (ids.battery || ids.soc) {
    nodes.push({
      role: 'battery',
      icon: Battery,
      label: 'Battery',
      accent: 'var(--accent)',
      value: Math.abs(battery.kw),
      dead: ids.battery ? battery.dead : true,
      soc: !socNum.dead && Number.isFinite(socNum.kw) ? clampPct(socNum.kw) : undefined,
    });
  }

  // Build edges (peripheral → Home). Direction/colour from the signed reading.
  const edges: EdgeView[] = [];
  if (ids.solar) {
    // Solar magnitude only; >0 ⇒ flowing into Home.
    const v = Math.abs(solar.kw);
    const active = !solar.dead && v >= ACTIVE_KW;
    edges.push({ role: 'solar', dir: active ? 'in' : 'idle', active, value: v, accent: 'var(--up)', dead: solar.dead });
  }
  if (ids.grid) {
    const signed = grid.kw * gridSign; // >0 ⇒ importing (toward Home)
    const v = Math.abs(grid.kw);
    const active = !grid.dead && v >= ACTIVE_KW;
    const importing = signed > 0;
    edges.push({
      role: 'grid',
      dir: active ? (importing ? 'in' : 'out') : 'idle',
      active,
      value: v,
      // Importing draws from the grid (attention); exporting is a credit (good).
      accent: importing ? 'var(--warn)' : 'var(--up)',
      dead: grid.dead,
    });
  }
  if (ids.battery) {
    const signed = battery.kw * batterySign; // >0 ⇒ discharging (toward Home)
    const v = Math.abs(battery.kw);
    const active = !battery.dead && v >= ACTIVE_KW;
    const discharging = signed > 0;
    edges.push({
      role: 'battery',
      dir: active ? (discharging ? 'in' : 'out') : 'idle',
      active,
      value: v,
      // Discharging gives to the home (good/up); charging stores (accent).
      accent: discharging ? 'var(--up)' : 'var(--accent)',
      dead: battery.dead,
    });
  }

  const edgeByRole = new Map(edges.map((e) => [e.role, e]));

  return (
    <div className="simui-eflow">
      <svg
        className="simui-eflow-svg"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Energy flow"
      >
        {/* Edges first (under the nodes). One <g> per edge: a base wire + an active
            overlay that carries the colour + the flowing dash. */}
        {(['solar', 'grid', 'battery'] as const).map((role) => {
          const edge = edgeByRole.get(role);
          if (!edge) return null;
          return <FlowEdge key={role} from={POS[role]} to={POS.load} edge={edge} />;
        })}
      </svg>

      {/* Nodes as absolutely-positioned HTML over the SVG — crisp text + icons,
          tabular values, the SVG is purely the connective tissue. */}
      <div className="simui-eflow-nodes" aria-hidden={false}>
        {nodes.map((n) => (
          <FlowNode key={n.role} node={n} />
        ))}
      </div>
    </div>
  );
}

/** One node chip (icon + label + headline value), positioned by % of the viewBox. */
function FlowNode({ node }: { node: NodeView }) {
  const Icon = node.icon;
  const left = (POS[node.role].x / VB_W) * 100;
  const top = (POS[node.role].y / VB_H) * 100;
  const dead = node.dead;
  return (
    <div
      className={`simui-eflow-node role-${node.role}${dead ? ' is-dead' : ''}`}
      style={{ left: `${left}%`, top: `${top}%`, ['--eflow-node' as string]: node.accent }}
    >
      <span className="simui-eflow-node-ic">
        <Icon soc={node.soc} />
      </span>
      <span className="simui-eflow-node-label">{node.label}</span>
      <span className="simui-eflow-node-val">
        {dead ? (
          '—'
        ) : (
          <>
            {fmt(node.value)}
            <span className="simui-eflow-node-unit">{unitFor(node.value)}</span>
          </>
        )}
      </span>
      {node.role === 'battery' && node.soc != null && (
        <span className="simui-eflow-node-soc">{Math.round(node.soc)}%</span>
      )}
    </div>
  );
}

/** One connective wire: a faint base line + a coloured, optionally-animated overlay. */
function FlowEdge({
  from,
  to,
  edge,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  edge: EdgeView;
}) {
  // Trim the line so it starts/ends at the node-chip edge, not its centre.
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const PAD = 30; // ≈ node-chip radius in viewBox units
  const x1 = from.x + ux * PAD;
  const y1 = from.y + uy * PAD;
  const x2 = to.x - ux * PAD;
  const y2 = to.y - uy * PAD;
  // The flowing dash always travels in the real direction of power: from the source
  // to the sink. When power flows OUT of Home (export/charge) the animation runs from
  // Home outward; we encode that by swapping the dash direction class. The wire shows
  // only direction + colour — the magnitude already lives under each node, so a
  // mid-wire value badge would just duplicate it and collide with the dash.
  const cls = `simui-eflow-edge dir-${edge.dir}${edge.active ? ' is-active' : ''}${edge.dead ? ' is-dead' : ''}`;
  return (
    <g className={cls} style={{ ['--eflow-edge' as string]: edge.accent }}>
      <line className="simui-eflow-wire" x1={x1} y1={y1} x2={x2} y2={y2} />
      {edge.active && (
        <line className="simui-eflow-pulse" x1={x1} y1={y1} x2={x2} y2={y2} pathLength={100} />
      )}
    </g>
  );
}

// ── helpers ──────────────────────────────────────────────────────────────────

interface Num {
  kw: number;
  dead: boolean;
}
/** Read an entity as a kW number; W is normalised to kW. Dead/missing ⇒ {0,true}. */
function numVal(e: HassEntity | undefined): Num {
  if (!e) return { kw: 0, dead: true };
  if (e.state === 'unavailable' || e.state === 'unknown' || e.state === '') return { kw: 0, dead: true };
  const n = Number(e.state);
  if (Number.isNaN(n)) return { kw: 0, dead: true };
  const unit = e.attributes.unit_of_measurement as string | undefined;
  return { kw: unit === 'W' ? n / 1000 : n, dead: false };
}

function clampPct(n: number): number {
  return Math.min(100, Math.max(0, n));
}

/**
 * Resolve the assigned ids WITHOUT subscribing — a pure read off the static block
 * config plus the live snapshot we already have via the per-slot hooks would be
 * circular, so this classifier runs against entity-id PATTERNS only (no state read).
 * Overrides in `opts` always win. The result drives the fixed hook order in the
 * component; it is deterministic for a given block, so hook order stays stable.
 */
function resolveIds(block: Block, opts: EnergyFlowOptions): Picked {
  const picked: Picked = {
    solar: opts.solar,
    load: opts.load,
    grid: opts.grid,
    battery: opts.battery,
    soc: opts.batterySoc,
  };
  for (const id of block.entityIds) {
    const lower = id.toLowerCase();
    // SOC: a percentage-charge sensor. Heuristic on id only (no state here) — a
    // `_now`/`_power` reading is never an SOC, so exclude those explicitly.
    if (!picked.soc && domainOf(lower) === 'sensor' && RX_SOC.test(lower) && !/_now$|power|_w$|_kw$/.test(lower)) {
      picked.soc = id;
      continue;
    }
    if (!picked.solar && RX_SOLAR.test(lower)) {
      picked.solar = id;
      continue;
    }
    if (!picked.battery && RX_BATTERY.test(lower)) {
      picked.battery = id;
      continue;
    }
    if (!picked.grid && RX_GRID.test(lower)) {
      picked.grid = id;
      continue;
    }
    if (!picked.load) {
      picked.load = id;
    }
  }
  return picked;
}
