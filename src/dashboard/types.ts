// Dashboard config v2 — composed rooms, not a flat list of cards.
// A room is a surface; blocks are the vocabulary you compose it from.
export type BlockType = 'hero' | 'group' | 'list' | 'chart' | 'card' | 'attention';

// Placement is a property of the BLOCK, never the leaf tile (FRAMEWORK.md §2).
// `1`/`2` = column span in the auto-fill grid; `'full'` = the whole row.
// (The contract's eventual 1..12 model lands when the grid moves to 12 columns.)
export type BlockSpan = 1 | 2 | 'full' | number;

/**
 * How a GroupBlock's members are grouped (FRAMEWORK.md §2). Not hard-coded to
 * room — a category surface groups by `function` or `device-class`, etc.
 * `metrics` renders the members as a MetricSpark data-viz wall (Phase 2, I6/I7).
 */
export type GroupAxis = 'room' | 'floor' | 'function' | 'device-class' | 'none' | 'metrics';

/**
 * Optional leaf-render hint for a GroupBlock (Phase 2). Overrides the default
 * EntityRow rendering of a group's members:
 *  - `slider`      → drag-to-set SliderTile wall (light/cover/fan glance tier)
 *  - `statusboard` → security StatusBoardTile board (presence-first squircles)
 * Omit ⇒ the group renders rows / a metrics wall per `axis`.
 */
export type LeafTile = 'slider' | 'statusboard';

/**
 * Conditional surfacing (FRAMEWORK.md §3). A block (or status pill) mounts only
 * while this holds, then unmounts — "hide noise until it's signal." Per the
 * minimal-motion rule it *appears*, not animates.
 */
export interface Condition {
  entity: string;
  state?: string | string[];
  above?: number;
  below?: number;
}

/**
 * One row of a ListBlock `source` query (FRAMEWORK.md §4). Fields AND within a
 * single matcher; matchers OR across an `include`/`exclude` array.
 */
export interface Matcher {
  entityId?: string; // exact or glob: 'automation.*pico*'
  domain?: string; // 'light'
  state?: string | string[]; // 'on'
  name?: string; // glob on friendly_name
  area?: string;
}

/**
 * Dynamic membership for a ListBlock (FRAMEWORK.md §4) — i.e. auto-generate.
 * Resolve via `useAggregate` over the matchers, then subscribe per resolved
 * entity (never N individual subscriptions for the list itself).
 */
export interface ListSource {
  include: Matcher[]; // OR across rows
  exclude?: Matcher[]; // applied after include
  hideWhenEmpty?: boolean; // default true — the card vanishes when resolved length 0
  sort?: 'name' | 'state' | 'last_changed';
  wrap?: 'rows' | 'tiles';
  /**
   * Opt OUT of the registry curation gate (TODO Tier A). By default `resolveSource`
   * drops diagnostic/config/hidden/disabled and entity_id pattern noise (e.g.
   * `update.*`, `*_signal_strength`, restart buttons). A few surfaces *intend* to
   * show those — e.g. the Server preset's "updates available" / "needs attention"
   * lists deliberately include `update.*` and maintenance binary_sensors. Set this
   * `true` on such a source so its explicit matchers are honoured verbatim.
   */
  includeNoise?: boolean;
}

/** One value scale on a ChartBlock (FRAMEWORK.md §5). */
export interface ChartAxis {
  id: string;
  min?: number;
  max?: number;
  opposite?: boolean; // a second, right-hand price scale
  ticks?: number;
}

/** One plotted entity on a ChartBlock (FRAMEWORK.md §5). */
export interface ChartSeries {
  entity: string;
  name?: string;
  color?: string; // omit ⇒ restrained auto-palette
  fill: 'line' | 'area';
  opacity?: number;
  strokeWidth?: number;
  axisId?: string;
}

/**
 * TradingView-grade history config (FRAMEWORK.md §5). Implemented with
 * `lightweight-charts`. The header value-readout is the glance layer, required.
 */
export interface ChartSpec {
  title?: string;
  window: { value: number; unit: 'h' | 'd' }; // smart-click switches range
  bucket?: 'hour' | 'day';
  reducer?: 'mean' | 'min' | 'max';
  backend?: 'history' | 'statistics'; // statistics for > 7d (recorder LTS)
  header: { showCurrent: boolean; colorize: boolean }; // current value, tinted by series
  axes: ChartAxis[];
  series: ChartSeries[];
  thresholds?: { value: number; color: string }[]; // value-banded line coloring
}

export interface Block {
  id: string;
  type: BlockType;
  title?: string;
  entityIds: string[];
  span: BlockSpan;
  // Optional, type-specific (FRAMEWORK.md §2/§3/§4/§5). All omittable so existing
  // configs keep compiling; the block owns layout, the tile owns the entity.
  axis?: GroupAxis; // group: how members are grouped
  tile?: LeafTile; // group: override leaf rendering (slider / statusboard)
  source?: ListSource; // list: dynamic membership
  visibleWhen?: Condition; // conditional surfacing; omit ⇒ always
  chart?: ChartSpec; // chart: history config
}

export interface Room {
  id: string;
  name: string;
  areaId: string | null;
  blocks: Block[];
}

/**
 * A user-edited snapshot of an otherwise preset-generated surface (a category).
 * Until a surface is overridden it renders live from its preset builder (read-only);
 * once the user edits it, the override is persisted and editable like a room. Keyed
 * in `DashboardConfig.overrides` by `category:<id>`.
 */
export interface SurfaceOverride {
  blocks: Block[];
}

export interface DashboardConfig {
  version: 3;
  rooms: Room[];
  /** Per-surface edits to generated category surfaces. Key: `category:<id>`. */
  overrides?: Record<string, SurfaceOverride>;
}
