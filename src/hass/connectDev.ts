import {
  callService,
  createConnection,
  createLongLivedTokenAuth,
  subscribeEntities,
  type HassEntities,
} from 'home-assistant-js-websocket';
import type { Hass } from '../types';

/**
 * An external store (for useSyncExternalStore) backed by a live HA websocket
 * connection authenticated with a long-lived token. Dev/standalone only.
 */
export interface DevStore {
  subscribe: (onChange: () => void) => () => void;
  getSnapshot: () => Hass;
}

export async function connectDev(hassUrl: string, token: string): Promise<DevStore> {
  const auth = createLongLivedTokenAuth(hassUrl, token);
  const connection = await createConnection({ auth });

  let states: HassEntities = {};
  const listeners = new Set<() => void>();

  const build = (): Hass => ({
    states,
    connection,
    callService: (domain, service, serviceData, target) =>
      callService(connection, domain, service, serviceData, target),
  });

  let snapshot = build();

  subscribeEntities(connection, (newStates) => {
    states = newStates;
    snapshot = build();
    listeners.forEach((l) => l());
  });

  return {
    subscribe(onChange) {
      listeners.add(onChange);
      return () => listeners.delete(onChange);
    },
    getSnapshot() {
      return snapshot;
    },
  };
}
