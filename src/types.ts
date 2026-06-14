import type { Connection, HassEntities, HassEntity } from 'home-assistant-js-websocket';
import type { ActionMap } from './editor/types';

export type { HassEntities, HassEntity };

export type CallService = (
  domain: string,
  service: string,
  serviceData?: Record<string, unknown>,
  target?: { entity_id?: string | string[] },
) => Promise<unknown>;

/**
 * A stable, subscribable view of Home Assistant. The object identity never
 * changes, so components subscribe to a single entity (useEntity) and re-render
 * only when *that* entity changes — not on every state tick.
 */
export interface HassSource {
  subscribe: (listener: () => void) => () => void;
  getStates: () => HassEntities;
  callService: CallService;
  connection?: Connection;
  /**
   * A version counter that bumps ONLY when the entity-key SET changes (an entity
   * added or removed) — not on value ticks. Lets surface builders rebuild on
   * set-change instead of every tick, and replaces the per-render
   * `Object.keys(states).sort().join()` signature. Provided by `HassProvider`'s
   * wrapper (`useEntityKeys`); absent on a raw source (treated as 0 / never bumps).
   */
  getKeysVersion?: () => number;
}

export interface WidgetProps {
  entity: HassEntity;
  /**
   * Authored interaction overrides for this leaf (SPEC_EDITOR §card-config). A widget
   * honors a slot ONLY when it is explicitly set, otherwise it keeps its own domain
   * default (so absence === today's behavior). Threaded by CardBlock from
   * `block.tiles?.[id]?.actions ?? block.actions`. Run them with `useTapHandler`
   * (src/runtime/actions.ts).
   */
  actions?: ActionMap;
}
