import type { ChangeEvent } from 'react';
import { useAggregate, useCallService, useEntity, useHassSource } from '../../hass/context';
import { useActions } from '../useActions';
import { useAreas } from '../areas';
import { LauncherTile } from '../../components/EntityTile';
import { iconFor } from '../../components/icons';
import { EntityRow } from '../EntityRow';
import { ExpandableChart } from '../../components/ExpandableChart';
import type { MetricBand } from '../../components/MetricSpark';
import { SliderTile } from '../../components/SliderTile';
import { StatusBoardTile } from '../../components/StatusBoardTile';
import { useDashboard } from '../store';
import { domainOf, friendly, prettyState } from '../../util';
import type { Block, GroupAxis } from '../types';
import type { TileConfig } from '../../editor/types';
import type { ColorToken } from '../../widgets/tileContract';
import type { HassEntity } from '../../types';

/** Per-entity override map, present on a `BlockConfig` (the real object behind `Block`). */
type Tiles = Record<string, TileConfig>;
function tilesOf(block: Block): Tiles | undefined {
  return (block as { tiles?: Tiles }).tiles;
}

const LAUNCHER_PREFIX = 'category.';

// Each category carries a fixed identity hue (categoryAccent, FRAMEWORK.md §7) so
// the launcher reads by colour at a glance instead of a wall of monochrome blue.
const CATEGORY_META: Record<string, { name: string; icon: string; color: ColorToken }> = {
  lights: { name: 'Lights', icon: 'lightbulb', color: 'warm' },
  climate: { name: 'Climate', icon: 'thermostat', color: 'teal' },
  media: { name: 'Media', icon: 'cast', color: 'violet' },
  security: { name: 'Security', icon: 'shield', color: 'green' },
  sensors: { name: 'Sensors', icon: 'activity', color: 'cyan' },
  power: { name: 'Power', icon: 'zap', color: 'warn' },
  scenes: { name: 'Scenes', icon: 'sparkles', color: 'pink' },
  server: { name: 'System', icon: 'server', color: 'slate' },
};

// A cohesive surface holding related controls. Honors `block.axis` (FRAMEWORK.md
// §2): when the members span rooms/classes the group sub-divides under quiet
// headings; otherwise it's a flat surface. Special cases: `category.*` synthetic
// ids render as a launcher; scene/script ids render as action tiles.
export function GroupBlock({ block }: { block: Block }) {
  const ids = block.entityIds;

  // Category launcher (Home summary "Everything"): action-only mini-tiles.
  if (ids.length && ids.every((id) => id.startsWith(LAUNCHER_PREFIX))) {
    return <LauncherGroup block={block} />;
  }

  // Scenes / scripts group: one-tap activation tiles.
  const allScenes = ids.length > 0 && ids.every((id) => domainOf(id) === 'scene' || domainOf(id) === 'script');
  if (allScenes) {
    return <SceneGroup block={block} />;
  }

  // Data-viz wall (Phase 2, I6/I7): numeric sensors / power circuits render as
  // MetricSpark cells with smart-click → full Chart, not rows.
  if (block.axis === 'metrics') {
    return <MetricWall block={block} />;
  }

  // Security status board (Phase 2, I5): presence-first squircle tiles.
  if (block.tile === 'statusboard') {
    return <StatusBoard block={block} />;
  }

  // Drag-to-set wall (Phase 2, signature #2): the tile IS the slider.
  if (block.tile === 'slider') {
    return <SliderWall block={block} />;
  }

  const allLights = ids.length > 0 && ids.every((id) => domainOf(id) === 'light');
  const axis: GroupAxis = block.axis ?? 'none';
  const grouped = axis === 'room' || axis === 'floor' || axis === 'device-class';
  const tiles = tilesOf(block);

  return (
    <div className="simui-surface">
      {block.title && (
        <div className="simui-surface-head">
          <span>{block.title}</span>
        </div>
      )}
      {allLights && <LightMaster ids={ids} />}
      {grouped ? <GroupedRows ids={ids} axis={axis} tiles={tiles} /> : (
        <div className="simui-rows">
          {ids.map((id) => <EntityRow key={id} entityId={id} actions={tiles?.[id]?.actions} />)}
        </div>
      )}
    </div>
  );
}

/** Sub-divide members under quiet headings by the chosen axis (areas for room/floor). */
function GroupedRows({ ids, axis, tiles }: { ids: string[]; axis: GroupAxis; tiles?: Tiles }) {
  const areas = useAreas();
  // device_class is effectively static, so read a one-shot snapshot rather than
  // subscribing — the rows themselves subscribe per-entity for live values.
  const states = useHassSource().getStates();
  const classOf = (id: string) => states[id]?.attributes.device_class as string | undefined;

  const buckets = new Map<string, string[]>();
  for (const id of ids) {
    const key = bucketKey(id, axis, areas, classOf);
    let arr = buckets.get(key);
    if (!arr) { arr = []; buckets.set(key, arr); }
    arr.push(id);
  }

  // A single bucket isn't worth a sub-heading — render flat.
  if (buckets.size <= 1) {
    return <div className="simui-rows">{ids.map((id) => <EntityRow key={id} entityId={id} actions={tiles?.[id]?.actions} />)}</div>;
  }

  return (
    <div className="simui-subgroups">
      {[...buckets.entries()].map(([label, members]) => (
        <div className="simui-subgroup" key={label}>
          <div className="simui-subhead">{label}</div>
          <div className="simui-rows">
            {members.map((id) => <EntityRow key={id} entityId={id} actions={tiles?.[id]?.actions} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function bucketKey(
  id: string,
  axis: GroupAxis,
  areas: ReturnType<typeof useAreas>,
  classOf: (id: string) => string | undefined,
): string {
  if (axis === 'floor') {
    return areas?.[id]?.floorName ?? areas?.[id]?.areaName ?? 'Home';
  }
  if (axis === 'room') {
    return areas?.[id]?.areaName ?? 'Other';
  }
  if (axis === 'device-class') {
    // Real device_class ("Temperature", "Humidity", "Door") when present, else
    // the domain — so a sensor group reads by what it measures, not just "Sensor".
    const dc = classOf(id);
    return dc ? prettyState(dc) : prettyState(domainOf(id));
  }
  return 'Other';
}

function LauncherGroup({ block }: { block: Block }) {
  const { openCategory } = useDashboard();
  const cats = block.entityIds.map((id) => id.slice(LAUNCHER_PREFIX.length));
  return (
    <div className="simui-surface">
      {block.title && (
        <div className="simui-surface-head"><span>{block.title}</span></div>
      )}
      <div className="simui-launcher-grid">
        {cats.map((cat) => {
          const meta = CATEGORY_META[cat] ?? { name: prettyState(cat), icon: 'home', color: 'accent' as ColorToken };
          return (
            <LauncherTile
              key={cat}
              name={meta.name}
              icon={meta.icon}
              color={meta.color}
              onTap={() => openCategory(cat)}
            />
          );
        })}
      </div>
    </div>
  );
}

function SceneGroup({ block }: { block: Block }) {
  const run = useActions();
  return (
    <div className="simui-surface">
      {block.title && (
        <div className="simui-surface-head"><span>{block.title}</span></div>
      )}
      <div className="simui-launcher-grid">
        {block.entityIds.map((id) => (
          <SceneTile key={id} entityId={id} onTap={() => run({ action: 'call-service', service: `${domainOf(id)}.turn_on`, target: { entity_id: id } }, id)} />
        ))}
      </div>
    </div>
  );
}

function SceneTile({ entityId, onTap }: { entityId: string; onTap: () => void }) {
  const e = useEntity(entityId);
  const SceneIcon = iconFor('sparkles');
  return (
    <button className="simui-scene-tile" onClick={onTap} aria-label={e ? friendly(e) : entityId}>
      <span className="simui-launch-ic"><SceneIcon size={18} strokeWidth={2} /></span>
      <span className="simui-name simui-launch-name">{e ? friendly(e) : entityId}</span>
    </button>
  );
}

// ── Data-viz wall (Worker 1) ──────────────────────────────────────────────────
// Numeric sensors / power circuits as MetricSpark cells. Band + accent are derived
// per-cell from each entity's device_class (zero schema change) so a humidity cell
// flags amber out of 40–60%, a temperature cell carries the warn hue, etc.

/** In-band comfort/spec zone per device_class (out-of-band tints the cell amber). */
function bandFor(e: HassEntity | undefined): MetricBand | undefined {
  const dc = e?.attributes.device_class as string | undefined;
  switch (dc) {
    case 'humidity': return { min: 40, max: 60 };
    case 'carbon_dioxide': return { max: 1000 };
    case 'pm25': return { max: 35 };
    case 'pm10': return { max: 50 };
    case 'battery': return { min: 20 };
    default: return undefined;
  }
}

/** Fixed identity hue per measured quantity (mirrors sensors.ts colorForQuantity). */
function accentFor(e: HassEntity | undefined): string {
  const dc = e?.attributes.device_class as string | undefined;
  switch (dc) {
    case 'temperature': return 'var(--warn)';
    case 'humidity': return 'var(--accent)';
    case 'pm25':
    case 'pm10':
    case 'pm1':
    case 'co2':
    case 'carbon_dioxide':
    case 'volatile_organic_compounds':
    case 'aqi':
    case 'nitrogen_dioxide':
    case 'ozone': return 'var(--up)';
    case 'power':
    case 'energy': return 'var(--warn)';
    case 'battery': return 'var(--muted)';
    case 'illuminance': return 'var(--cyan)';
    default: return 'var(--cyan)';
  }
}

function MetricWall({ block }: { block: Block }) {
  const states = useHassSource().getStates();
  return (
    <div className="simui-surface">
      {block.title && (
        <div className="simui-surface-head"><span>{block.title}</span></div>
      )}
      <div className="simui-metric-wall">
        {block.entityIds.map((id) => {
          const e = states[id];
          return (
            <ExpandableChart key={id} entityId={id} band={bandFor(e)} accent={accentFor(e)} />
          );
        })}
      </div>
    </div>
  );
}

// ── Security status board (Worker 2) ──────────────────────────────────────────

function StatusBoard({ block }: { block: Block }) {
  return (
    <div className="simui-surface">
      {block.title && (
        <div className="simui-surface-head"><span>{block.title}</span></div>
      )}
      <div className="simui-statusboard-grid">
        {block.entityIds.map((id) => <StatusBoardTile key={id} entity={id} />)}
      </div>
    </div>
  );
}

// ── Drag-to-set wall (Worker 2) ───────────────────────────────────────────────
// Covers/fans read nicer with a coarser drag step; lights stay at 1%.

function SliderWall({ block }: { block: Block }) {
  return (
    <div className="simui-surface">
      {block.title && (
        <div className="simui-surface-head"><span>{block.title}</span></div>
      )}
      <div className="simui-slider-wall">
        {block.entityIds.map((id) => (
          <SliderTile key={id} entity={id} step={domainOf(id) === 'light' ? 1 : 5} />
        ))}
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
