import type { Connection, HassEntities, HassEntity } from 'home-assistant-js-websocket';

export type { HassEntities, HassEntity };

/**
 * The minimal surface simUI needs from Home Assistant. It is satisfied two ways:
 *  - Embedded: the `hass` object HA injects into the panel already has `states`
 *    and `callService`, so we adapt it directly (see panel.tsx).
 *  - Dev: synthesized from home-assistant-js-websocket + a long-lived token
 *    (see hass/connectDev.ts).
 */
export interface Hass {
  states: HassEntities;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: { entity_id?: string | string[] },
  ) => Promise<unknown>;
  connection?: Connection;
}

export interface WidgetProps {
  entity: HassEntity;
}
