import { useCallback } from 'react';
import { useCallService } from '../hass/context';
import { useDashboard } from './store';
import { runAction, type ActionContext, type HassAction } from '../widgets/tileContract';

/**
 * Bind the {@link runAction} vocabulary to the live app: service calls go through
 * the HA source, `navigate` drives the shell router, and `more-info` opens the
 * detail Sheet hosted at the app root. Tiles/pills/rows call `run(action, entityId)`
 * so every surface behaves identically (FRAMEWORK.md §1).
 */
export function useActions() {
  const callService = useCallService();
  const { navigate, openSheet } = useDashboard();

  return useCallback(
    (action: HassAction, entityId?: string) => {
      const ctx: ActionContext = { callService, entityId, navigate, openSheet };
      runAction(action, ctx);
    },
    [callService, navigate, openSheet],
  );
}
