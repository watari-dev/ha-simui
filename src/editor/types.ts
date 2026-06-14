// simUI editor subsystem — concrete contracts (SPEC_EDITOR.md).
//
// These are the TypeScript interfaces the build agents implement against: the
// editor's selection/edit model (`EditorState`), the serialisable per-card config
// that EXTENDS the existing Block model (`TileConfig`, `BlockConfig`, `ActionMap`),
// and the EXACT prop interfaces for the three foundation components — `CardGallery`,
// `Inspector`, `EntityPicker`.
//
// Import-light by design: only from the existing Block model (`../dashboard/types`)
// and the HA primitives (`../types`). The tile-leaf vocabulary (HassAction /
// TileFeature / ColorToken / StateBit) is RE-DECLARED here as a structural copy of
// `../widgets/tileContract` so this file stays dependency-light and valid standalone;
// the shapes are identical, so values flow between them without casts. The integrator
// may replace these aliases with a direct re-export once wiring lands.

import type {
  Block,
  BlockType,
  BlockSpan,
  GroupAxis,
  LeafTile,
  ListSource,
  ChartSpec,
  ChartSeries,
  ChartAxis,
  Condition,
} from '../dashboard/types';
import type { HassEntities, HassEntity } from '../types';
import type { AreaMap, RegistryMeta } from '../dashboard/areas';

// Re-export the Block vocabulary so downstream editor files import everything from
// one module.
export type {
  Block,
  BlockType,
  BlockSpan,
  GroupAxis,
  LeafTile,
  ListSource,
  ChartSpec,
  ChartSeries,
  ChartAxis,
  Condition,
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. Tile-leaf vocabulary (structural mirror of ../widgets/tileContract)
// ─────────────────────────────────────────────────────────────────────────────

/** A color role, not a raw hex (FRAMEWORK.md §5/§7). Resolves to a theme variable. */
export type ColorToken =
  | 'warm' | 'cool' | 'accent' | 'warn' | 'up' | 'down' | 'primary' | 'none'
  | 'violet' | 'cyan' | 'pink' | 'green' | 'teal' | 'slate';

/** What renders on a tile's state line (FRAMEWORK.md §1). `[0]` is the primary value. */
export type StateBit = 'state' | 'last_changed' | 'last_updated' | string;

/** Inline control strip that upgrades a display tile into a controller (FRAMEWORK.md §1). */
export type TileFeature =
  | { type: 'cover-open-close' }
  | { type: 'climate-hvac-modes'; modes: string[]; style?: 'icons' | 'dropdown' }
  | { type: 'climate-fan-modes'; style?: 'dropdown' }
  | { type: 'target-temperature' }
  | { type: 'fan-speed' }
  | { type: 'fan-oscillate' }
  | { type: 'lock-commands' }
  | { type: 'alarm-modes'; modes: string[] };

/**
 * What a tap / hold / right-click does (FRAMEWORK.md §1). Cleaner than Lovelace's
 * `tap_action`: a closed discriminated union, internal `navigate` routes (never
 * `/lovelace/*`), and a `'domain.service'` string for service calls.
 */
export type HassAction =
  | { action: 'navigate'; path: string }
  | { action: 'url'; url: string }
  | { action: 'call-service'; service: string; target?: object; data?: object }
  | { action: 'toggle' }
  | { action: 'more-info' }
  | { action: 'none' };

/**
 * The three configurable interaction slots on a leaf (SPEC_EDITOR.md §card-config).
 * Models Lovelace's `tap_action` / `hold_action` / `double_tap_action` but renamed
 * to simUI's interaction model: tap → Sheet, hold/right-click → context menu.
 * Any slot omitted ⇒ the leaf's domain default applies (body tap = more-info, icon
 * tap = toggle, hold = context menu). NEVER store a default explicitly — absence is
 * the default, so presets stay terse and migrations are no-ops.
 */
export interface ActionMap {
  /** Body tap. Default when omitted: `{ action: 'more-info' }`. */
  tap?: HassAction;
  /** Icon tap. Default when omitted: `toggle` (toggleable domains) else `more-info`. */
  iconTap?: HassAction;
  /** Long-press / right-click. Default when omitted: open the context menu. */
  hold?: HassAction;
  /** Smart-click expand (chart → full chart). Default when omitted: domain default. */
  doubleTap?: HassAction;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Card config — the serialisable per-tile + per-block schema (config v4)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Per-leaf overrides for ONE entity inside a block (SPEC_EDITOR.md §card-config).
 * This is the new surface the editor adds: today a block is only `entityIds: string[]`,
 * so a leaf can carry no name/icon/color/feature/action overrides. `TileConfig` is the
 * keyed override record; an entity with no entry renders from auto-defaults (the 90%
 * case — graceful degradation, DESIGN_PRINCIPLES §12). Every field is optional;
 * `{}` means "all defaults", identical to no entry at all.
 */
export interface TileConfig {
  /** Display name. Omit ⇒ derived short label (friendly_name minus area prefix). */
  name?: string;
  /** Lucide icon name (see components/icons). Omit ⇒ by device/fixture type. */
  icon?: string;
  /** State/categorical accent. Omit ⇒ monochrome idle, state-accent when active. */
  color?: ColorToken;
  /** Inline control strip. Omit ⇒ none (display tile). */
  features?: TileFeature[];
  /** What the state line shows. Omit ⇒ `['state']`. */
  stateContent?: StateBit[];
  /** Drop the state line entirely (action/nav/launcher tiles). */
  hideState?: boolean;
  /** Mini-tile (icon-over-label) layout. Omit ⇒ horizontal. */
  orientation?: 'horizontal' | 'vertical';
  /** Configurable tap / hold / right-click. Omit ⇒ domain defaults (§ActionMap). */
  actions?: ActionMap;
}

/**
 * The editor's view of a block: the existing `Block` plus the per-tile override map
 * and an optional action map for action-only/card leaves. Stored INLINE on the block
 * (a new optional `tiles` field) so the persisted shape stays a `Block[]`; the
 * renderer reads `block.tiles?.[entityId]` to flex a leaf. Because every new field is
 * optional, a v3 block IS a valid v4 block — no migration of existing data is forced.
 *
 * `BlockConfig` is structurally a `Block` with these additions; the editor authors it,
 * the store persists it, the renderers consume it.
 */
export interface BlockConfig extends Block {
  /** entityId → per-leaf overrides. Absent / no-entry entity ⇒ auto-defaults. */
  tiles?: Record<string, TileConfig>;
  /**
   * Block-level action map for an action-only / launcher / single-card block (no
   * per-leaf entry needed). Omit ⇒ the block's leaves use their own defaults.
   */
  actions?: ActionMap;
  /** Free-form per-block options the inspector may set (e.g. list `wrap`, group density). */
  options?: BlockOptions;
}

/**
 * Per-block, type-specific knobs the Inspector edits but that don't belong on every
 * block. Kept as one optional bag so the persisted Block shape doesn't grow a field
 * per block type. All optional; the renderer falls back to its current behaviour.
 */
export interface BlockOptions {
  /** group: render members as rows (default) / a slider wall / a status board. */
  leafTile?: LeafTile;
  /** group: how members sub-divide (FRAMEWORK.md §2). Mirrors Block.axis. */
  axis?: GroupAxis;
  /** list: dynamic membership (mirrors Block.source). */
  source?: ListSource;
  /** list: rows vs. tiles wrap. */
  wrap?: 'rows' | 'tiles';
  /** chart: the full history spec (mirrors Block.chart). */
  chart?: ChartSpec;
  /** any: conditional surfacing (mirrors Block.visibleWhen). */
  visibleWhen?: Condition;
}

/**
 * The catalogue entry for one add-able card type, shown in the gallery
 * (SPEC_EDITOR.md §gallery). Pure descriptor data — the gallery renders it, the
 * `make()` factory produces a fresh `BlockConfig` when the user drops it onto the
 * surface. `make` receives a sampled entity list so a freshly-dropped card lands
 * populated (e.g. a Lights group pre-filled with the surface's lights) rather than empty.
 */
export interface CardKind {
  /** Stable id, e.g. 'group', 'list', 'chart', 'hero', 'card', 'attention', 'launcher'. */
  id: string;
  type: BlockType;
  /** Sentence-case gallery label, e.g. "Group", "Live list", "History chart". */
  label: string;
  /** One-line gallery description. */
  description: string;
  /** Lucide icon name for the gallery thumbnail header. */
  icon: string;
  /** Default span when dropped (the gallery preview honours it). */
  defaultSpan: BlockSpan;
  /**
   * Build a fresh block of this kind. `seed` is a small, relevant entity sample
   * (the surface's existing members of a fitting domain) so the dropped card is
   * non-empty; an empty seed yields an empty-but-valid block the user then fills.
   */
  make: (seed: string[]) => BlockConfig;
  /**
   * Which entity domains this kind is a good leaf for — used to filter the gallery
   * by what the surface actually contains (graceful degradation). Omit ⇒ any.
   */
  domains?: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Persistence — config v4
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The persisted dashboard config bumped to v4. Identical to v3 except `version: 4`
 * and that blocks MAY now carry the optional `tiles` / `actions` / `options` fields
 * (a `BlockConfig` is a superset of `Block`). v3 → v4 migration is a no-op rewrite of
 * the version field: every v3 block already validates as a v4 BlockConfig. See
 * SPEC_EDITOR.md §persistence.
 */
export interface DashboardConfigV4 {
  version: 4;
  rooms: Array<{ id: string; name: string; areaId: string | null; blocks: BlockConfig[] }>;
  overrides?: Record<string, { blocks: BlockConfig[] }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Selection & edit model
// ─────────────────────────────────────────────────────────────────────────────

/**
 * What is currently selected in the editor (SPEC_EDITOR.md §selection-model). The
 * editor selects a BLOCK and, optionally, a TILE (leaf) within it. The Inspector
 * binds to whichever is the deeper selection: a tile selection drives the tile
 * inspector, a bare block selection drives the block inspector.
 */
export type Selection =
  | { kind: 'none' }
  | { kind: 'block'; blockId: string }
  | { kind: 'tile'; blockId: string; entityId: string };

/** Which transient editor panel is mounted over the surface. */
export type EditorPanel = 'none' | 'gallery' | 'inspector' | 'entity-picker' | 'templates';

/**
 * One snapshot on the undo/redo stack: the full block list of the surface being
 * edited, plus the selection at the time, so undo restores both. The editor keeps a
 * bounded ring (e.g. 50) of these. Surface-scoped: switching surfaces clears it.
 */
export interface EditorSnapshot {
  blocks: BlockConfig[];
  selection: Selection;
}

/**
 * The complete editor state (SPEC_EDITOR.md §EditorState). Held in an editor store
 * that is DECOUPLED from the dashboard store: the editor owns selection / clipboard /
 * undo, and commits block-list mutations back through the dashboard store's
 * `mutateBlocks`. `dirtyBlocks` is the editor's optimistic working copy of the
 * surface's blocks — the Inspector edits it controlled; a debounced commit flushes it
 * to the dashboard store (and thence persistence).
 */
export interface EditorState {
  /** Master edit toggle (mirrors dashboard `editing`; the editor owns the source of truth). */
  active: boolean;
  /** The surface being edited, so undo/clipboard are correctly scoped. */
  surface:
    | { kind: 'home' }
    | { kind: 'room'; id: string }
    | { kind: 'category'; id: string };
  /** The editor's optimistic working copy of the surface's blocks. */
  dirtyBlocks: BlockConfig[];
  /** Current selection (block and/or tile). */
  selection: Selection;
  /** Which transient panel is open over the surface. */
  panel: EditorPanel;
  /**
   * When the gallery is dropping a new card, the kind being placed (drag preview /
   * pending drop); null when not placing.
   */
  placing: CardKind | null;
  /** Copy/paste buffer — a detached block config (cross-surface paste allowed). */
  clipboard: BlockConfig | null;
  /** Undo ring (most-recent last); `undo()` pops it onto `redoStack`. */
  undoStack: EditorSnapshot[];
  redoStack: EditorSnapshot[];
  /** True while a debounced commit is pending (drives a subtle "saving" hint, no spinner). */
  committing: boolean;
}

/**
 * The imperative editor API the integrator wires into the dashboard store
 * (SPEC_EDITOR.md §module-map). Every block-list mutation runs through these so a
 * single undo snapshot is pushed per user action, and the result is committed back
 * via `mutateBlocks`. Pure UI components receive the slice of this they need as props
 * — they never reach into the store directly.
 */
export interface EditorActions {
  enter: () => void;
  exit: (opts?: { discard?: boolean }) => void;
  // selection
  selectBlock: (blockId: string) => void;
  selectTile: (blockId: string, entityId: string) => void;
  clearSelection: () => void;
  // panels
  openGallery: () => void;
  openInspector: () => void;
  openEntityPicker: () => void;
  /** Open the page-template gallery (the "start from a template" affordance). */
  openTemplates: () => void;
  closePanel: () => void;
  // gallery → drop
  beginPlacing: (kind: CardKind) => void;
  /** Commit the pending placement at an index (default: append). Returns new block id. */
  dropCard: (index?: number) => string;
  cancelPlacing: () => void;
  // block ops
  addBlock: (type: BlockType, seed?: string[]) => string;
  updateBlock: (blockId: string, patch: Partial<BlockConfig>) => void;
  updateTile: (blockId: string, entityId: string, patch: Partial<TileConfig>) => void;
  addEntities: (blockId: string, entityIds: string[]) => void;
  removeEntity: (blockId: string, entityId: string) => void;
  moveBlock: (fromIndex: number, toIndex: number) => void;
  resizeBlock: (blockId: string, span: BlockSpan) => void;
  removeBlock: (blockId: string) => void;
  duplicateBlock: (blockId: string) => string;
  // clipboard
  copyBlock: (blockId: string) => void;
  pasteBlock: (index?: number) => string | null;
  // history
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Component prop interfaces — the EXACT contracts the build agents implement
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Live preview context handed to gallery cards and tile previews. Decoupled from the
 * hass context so previews are pure/testable: the gallery is given a snapshot + a
 * sampler rather than calling `useAllStates` itself. `sample(domains, n)` returns up
 * to `n` real entity ids from the surface/home that match, so each gallery card shows
 * a LIVE preview built from the user's own entities (SPEC_EDITOR.md §live-previews).
 */
export interface PreviewContext {
  states: HassEntities;
  /** Up to `n` real entity ids matching any of `domains` (omit domains ⇒ any). */
  sample: (n: number, domains?: string[]) => string[];
  /** Resolve one entity for a preview cell (undefined when missing/unavailable). */
  resolve: (entityId: string) => HassEntity | undefined;
}

/**
 * CardGallery — the "add a card" catalogue (SPEC_EDITOR.md §gallery). Renders each
 * `CardKind` as a thumbnail with a LIVE preview built from `preview`. Picking a kind
 * begins placement (drag) or drops it immediately (click). Controlled and decoupled:
 * it owns no store state; the parent supplies the kinds + preview context and handles
 * selection via callbacks.
 */
export interface CardGalleryProps {
  /** The catalogue, already filtered to what the surface can support. */
  kinds: CardKind[];
  /** Live-preview source (the user's real entities). */
  preview: PreviewContext;
  /** Click-to-add: drop this kind onto the surface (append). */
  onPick: (kind: CardKind) => void;
  /** Drag-to-place start (HTML5 / dnd-kit); omit ⇒ click-only gallery. */
  onBeginPlace?: (kind: CardKind) => void;
  /** Optional search/filter text (controlled). */
  query?: string;
  onQueryChange?: (q: string) => void;
  /** Dismiss the gallery. */
  onClose: () => void;
}

/**
 * Inspector — the per-selection editor (SPEC_EDITOR.md §inspector). CONTROLLED and
 * decoupled from the store: it receives the currently-selected block (and tile, when a
 * leaf is selected) plus a live entity snapshot, and emits granular patches. It never
 * mutates the store directly — the parent applies `onBlockChange` / `onTileChange`
 * through the editor actions (one undo step per coalesced edit). Rendering switches on
 * `selection.kind`: a tile selection shows the tile form (name/icon/color/features/
 * actions); a block selection shows the block form (title/span/axis/source/chart/
 * visibleWhen, members).
 */
export interface InspectorProps {
  /** What is selected; drives which form renders. */
  selection: Selection;
  /** The selected block's full config (null when selection.kind === 'none'). */
  block: BlockConfig | null;
  /** The selected tile's resolved config (defaults merged), when a tile is selected. */
  tile: TileConfig | null;
  /** Live entity snapshot for previews / option enumeration (e.g. hvac_modes). */
  states: HassEntities;
  /** Patch the selected block (title/span/options/actions/members). */
  onBlockChange: (patch: Partial<BlockConfig>) => void;
  /** Patch the selected tile's overrides. No-op when no tile is selected. */
  onTileChange: (patch: Partial<TileConfig>) => void;
  /** Open the entity picker to add members to the selected block. */
  onAddEntities: () => void;
  /** Remove a member entity from the selected block. */
  onRemoveEntity: (entityId: string) => void;
  /** Block-level ops surfaced as inspector buttons. */
  onDuplicate: () => void;
  onRemove: () => void;
  /** Dismiss the inspector (keeps the selection). */
  onClose: () => void;
}

/** One faceted filter dimension the picker offers (SPEC_EDITOR.md §entity-picker). */
export interface EntityFacets {
  /** Restrict to these domains; empty ⇒ all. */
  domains?: string[];
  /** Restrict to these areas (area ids or names); empty ⇒ all. */
  areas?: string[];
  /** Free-text query over friendly_name + entity_id. */
  query?: string;
  /** Hide curation-gated noise (diagnostic/config/hidden). Default true. */
  primaryOnly?: boolean;
}

/**
 * EntityPicker — the faceted entity chooser (SPEC_EDITOR.md §entity-picker). Replaces
 * the flat AddCardPanel: filter by domain / area / text, multi-select, and confirm.
 * CONTROLLED: facets and selection are owned by the parent (so the picker is reusable
 * for "add members" and "pick a chart series"). Live entity data comes in as a
 * snapshot; the picker does not subscribe itself.
 */
export interface EntityPickerProps {
  /** Live entity snapshot to choose from. */
  states: HassEntities;
  /** entityId → area metadata, for the area facet (optional; absent in dev/mock). */
  areaOf?: (entityId: string) => string | undefined;
  /** Curation gate predicate (hides diagnostic/config noise when `facets.primaryOnly`). */
  isPrimary?: (entityId: string, entity: HassEntity | undefined) => boolean;
  /**
   * Resolved area map (src/dashboard/areas.ts `useAreas`). Lets the picker build an
   * AREA-AWARE faceted index internally so result rows group under their real area
   * rather than all collapsing to "Unassigned". Absent (dev/mock) ⇒ no area grouping.
   */
  areas?: AreaMap;
  /**
   * Registry curation meta (src/dashboard/areas.ts `useRegistry`). Drives the
   * primary-only gate over real registry metadata. Absent ⇒ entity_id pattern gate.
   */
  registry?: RegistryMeta;
  /** Already-on-surface entities, shown checked / de-emphasised. */
  existing?: string[];
  /** Allow choosing more than one (members) vs. exactly one (chart series, single card). */
  multi?: boolean;
  /** Controlled facet state. */
  facets: EntityFacets;
  onFacetsChange: (facets: EntityFacets) => void;
  /** Controlled selection (entity ids). */
  selected: string[];
  onSelectedChange: (selected: string[]) => void;
  /** Confirm the current selection. */
  onConfirm: (entityIds: string[]) => void;
  onClose: () => void;
}
