import { useMemo } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useAllStates } from '../hass/context';
import { useAreas } from './areas';
import { useDashboard } from './store';
import { SurfaceStrip } from './SurfaceStrip';
import { StaticBlock } from './BlockChrome';
import { AmbientCanvas } from '../components/AmbientCanvas';
import { getPreset } from './presets/index';
import type { Surface } from './presets/index';
import { blockId, ofDomain, isLive } from './presets/index';
import type { HassEntities } from '../types';

// Categories that get a living ambient field behind their surface. Lights warms to
// its own members; Climate's cooling-wash + time-of-day base alone give it life.
const AMBIENT_CATEGORIES = new Set(['lights', 'climate']);

// The category id → preset id. media/scenes have no dedicated builder yet, so
// they use a generic cross-room fallback below.
const PRESET_FOR: Record<string, string> = {
  lights: 'lights',
  climate: 'climate',
  sensors: 'sensors',
  power: 'power',
  security: 'security',
  server: 'server',
};

const CATEGORY_TITLE: Record<string, string> = {
  lights: 'Lights',
  climate: 'Climate',
  media: 'Media',
  security: 'Security',
  sensors: 'Sensors',
  power: 'Power',
  scenes: 'Scenes',
  server: 'System',
};

/**
 * A composed cross-room device-category surface (DESIGN_PRINCIPLES §14, the second
 * navigation axis). Built from a preset builder when one exists, else a generic
 * fallback. Read-only chrome (back + title + strip); the blocks render through the
 * same vocabulary as a room, on the same grid.
 */
export function CategoryView({ categoryId }: { categoryId: string }) {
  const states = useAllStates();
  const areaMap = useAreas();
  const { goHome } = useDashboard();

  // Rebuild the surface only when the entity SET (not live values) changes — each
  // block subscribes to its own values, so rebuilding on every tick would remount
  // every Chart/MetricSpark and churn the canvas. Mirrors HomeView's idSig memo.
  // `areaMap` is entity-keyed (entityId → {area, floor}); pass it straight through.
  const idSig = useMemo(() => Object.keys(states).sort().join(','), [states]);
  const surface: Surface = useMemo(() => {
    const presetId = PRESET_FOR[categoryId];
    const preset = presetId ? getPreset(presetId) : undefined;
    if (preset) return preset.build({ states, areas: areaMap });
    return fallbackSurface(categoryId, states);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, idSig, areaMap]);

  const title = CATEGORY_TITLE[categoryId] ?? categoryId;
  const ambient = AMBIENT_CATEGORIES.has(categoryId);

  // The surface's own light ids → the field warms only to this category's lights.
  const surfaceLightIds = useMemo(
    () =>
      ambient
        ? surface.blocks.flatMap((b) => b.entityIds).filter((id) => id.startsWith('light.'))
        : [],
    [ambient, surface],
  );

  return (
    <div className="simui-app">
      <header className="simui-head">
        <button className="simui-back" onClick={goHome} aria-label="Back to home"><ChevronLeft size={18} /></button>
        <span className="simui-head-title">{title}</span>
      </header>
      <div className={`simui-content${ambient ? ' simui-cat-content' : ''}`}>
        {ambient && <AmbientCanvas mode="field" lightIds={surfaceLightIds} maxOpacity={0.12} />}
        <div className={ambient ? 'simui-cat-layer' : undefined}>
          {surface.statusStrip && surface.statusStrip.length > 0 && (
            <SurfaceStrip pills={surface.statusStrip} />
          )}
          {surface.blocks.length ? (
            <div className="simui-grid simui-surface-grid">
              {surface.blocks.map((b) => <StaticBlock key={b.id} block={b} />)}
            </div>
          ) : (
            <div className="simui-msg">Nothing in {title.toLowerCase()} yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Generic surface for categories without a dedicated preset (media / scenes). */
function fallbackSurface(categoryId: string, states: HassEntities): Surface {
  const surface: Surface = { blocks: [] };

  if (categoryId === 'media') {
    const players = ofDomain(states, 'media_player').filter(isLive);
    for (const p of players) {
      surface.blocks.push({ id: blockId('cat-media'), type: 'card', entityIds: [p.entity_id], span: 2 });
    }
    return surface;
  }

  if (categoryId === 'scenes') {
    const ids = [...ofDomain(states, 'scene'), ...ofDomain(states, 'script')].filter(isLive).map((e) => e.entity_id);
    if (ids.length) surface.blocks.push({ id: blockId('cat-scenes'), type: 'group', title: 'Scenes & scripts', axis: 'function', entityIds: ids, span: 'full' });
    return surface;
  }

  return surface;
}
