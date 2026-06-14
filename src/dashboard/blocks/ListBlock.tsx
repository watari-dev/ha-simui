import { useMemo } from 'react';
import { useAggregate, useEntityKeys, useHassSource } from '../../hass/context';
import { useAreas } from '../areas';
import { resolveSource, sourceDomains, keysOfDomains } from '../presets/index';
import { EntityRow } from '../EntityRow';
import type { Block } from '../types';
import type { TileConfig } from '../../editor/types';

/** Per-entity override map, present on a `BlockConfig` (the real object behind `Block`). */
type Tiles = Record<string, TileConfig>;
function tilesOf(block: Block): Tiles | undefined {
  return (block as { tiles?: Tiles }).tiles;
}

// A hairline-divided list of entities — quiet status + simple controls. When
// `block.source` is set the membership is DYNAMIC (FRAMEWORK.md §4): resolved live
// against the Matcher (include OR, exclude after). `hideWhenEmpty` (default true)
// makes the whole card vanish when nothing matches — "hide noise until it's signal."
export function ListBlock({ block }: { block: Block }) {
  if (block.source) return <DynamicList block={block} />;
  return <StaticList title={block.title} ids={block.entityIds} tiles={tilesOf(block)} />;
}

function DynamicList({ block }: { block: Block }) {
  const areas = useAreas();
  const hassSource = useHassSource();
  const keysVersion = useEntityKeys();
  const source = block.source!;
  // Resolve to a stable, sorted, joined id string so the component repaints only
  // when the membership set actually changes (the primitive-snapshot trick). The
  // resolve scans EVERY entity, so scope the aggregate to the source's candidate
  // domains (recomputed only on set-change) — it re-scans only when a relevant-domain
  // entity changed, not every tick. Cross-domain sources fall back to every-tick.
  const candidates = useMemo(() => {
    const doms = sourceDomains(source);
    return doms ? keysOfDomains(hassSource.getStates(), doms) : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keysVersion, source]);
  const joined = useAggregate(
    (states) => resolveSource(source, states, (id) => areas?.[id]?.areaName).join(','),
    candidates,
  );
  const ids = joined ? joined.split(',') : [];

  if (!ids.length && (source.hideWhenEmpty ?? true)) return null;
  return <StaticList title={block.title} ids={ids} tiles={tilesOf(block)} empty="Nothing right now." />;
}

function StaticList({ title, ids, tiles, empty }: { title?: string; ids: string[]; tiles?: Tiles; empty?: string }) {
  return (
    <div className="simui-surface list">
      {title && (
        <div className="simui-surface-head">
          <span>{title}</span>
        </div>
      )}
      {ids.length ? (
        <div className="simui-rows divided">
          {ids.map((id) => <EntityRow key={id} entityId={id} actions={tiles?.[id]?.actions} />)}
        </div>
      ) : (
        empty && <div className="simui-list-empty">{empty}</div>
      )}
    </div>
  );
}
