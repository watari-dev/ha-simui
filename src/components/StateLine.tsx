import type { ReactNode } from 'react';
import { relativeTime } from '../util';

type Tone = 'muted' | 'warn' | 'on';

/**
 * The tile state line: a primary value plus an optional dimmed relative-time
 * suffix ("Open · 2m ago"). This is the `stateContent` primitive from
 * FRAMEWORK.md §1 — the highest-value pattern borrowed from the real dashboard:
 * a status chip that also says *how long* it has been that way.
 *
 * Pass `since` an ISO timestamp (entity.last_changed for events, last_updated
 * for liveness/heartbeat on safety + battery devices).
 */
export function StateLine({
  value,
  since,
  tone = 'muted',
}: {
  value: ReactNode;
  since?: string;
  tone?: Tone;
}) {
  const rel = since ? relativeTime(since) : '';
  return (
    <span className={`simui-state${tone !== 'muted' ? ` ${tone}` : ''}`}>
      {value}
      {rel && <span className="simui-since"> · {rel}</span>}
    </span>
  );
}
