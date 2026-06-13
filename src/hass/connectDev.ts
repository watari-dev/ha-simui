import {
  callService as callServiceRaw,
  createConnection,
  createLongLivedTokenAuth,
  subscribeEntities,
  type HassEntities,
} from 'home-assistant-js-websocket';
import type { HassSource } from '../types';

/** Standalone dev source: a live HA websocket authenticated with a token. */
export async function connectDev(hassUrl: string, token: string): Promise<HassSource> {
  const auth = createLongLivedTokenAuth(hassUrl, token);
  const connection = await createConnection({ auth });

  let states: HassEntities = {};
  const listeners = new Set<() => void>();

  // subscribeEntities preserves referential identity of unchanged entities,
  // which is what makes useEntity's per-entity bail-out work.
  subscribeEntities(connection, (next) => {
    states = next;
    listeners.forEach((l) => l());
  });

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getStates: () => states,
    callService: (domain, service, data, target) => callServiceRaw(connection, domain, service, data, target),
    connection,
  };
}
