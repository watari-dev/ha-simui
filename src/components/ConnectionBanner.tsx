import { RefreshCw } from 'lucide-react';
import { useConnectionStatus } from '../hass/context';

/**
 * A quiet reconnect notice shown above the panel chrome while the HA websocket
 * is down. It simply appears while reconnecting and auto-hides once live —
 * minimal motion, no pulsing (DESIGN_PRINCIPLES §14). In dev/mock (no
 * connection) the status is always `'live'`, so this renders nothing.
 */
export function ConnectionBanner() {
  const status = useConnectionStatus();
  if (status === 'live') return null;
  return (
    <div className="simui-conn-banner" role="status" aria-live="polite">
      <RefreshCw size={13} className="simui-conn-ic" aria-hidden="true" />
      <span>Reconnecting to Home Assistant…</span>
    </div>
  );
}
