import type { Connection, HassEntities, HassEntity } from 'home-assistant-js-websocket';

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
}

export interface WidgetProps {
  entity: HassEntity;
}
