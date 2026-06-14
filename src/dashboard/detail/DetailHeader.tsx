import type { ReactNode } from 'react';
import { relativeTime } from '../../util';

/**
 * The shared masthead of every per-domain detail Sheet — a big, glanceable primary
 * reading (tabular numerals), an optional dimmed unit / sub-line, and a quiet
 * relative-time recency line. Keeps the bespoke sheets visually consistent so they
 * read as one "more-info" tier, not a grab-bag of layouts.
 */
export function DetailHeader({
  value,
  unit,
  sub,
  tone,
  since,
}: {
  value: ReactNode;
  unit?: string;
  sub?: ReactNode;
  /** Accent the primary value (state colour). */
  tone?: 'warm' | 'cool' | 'accent' | 'warn' | 'up' | 'down';
  since?: string;
}) {
  const rel = since ? relativeTime(since) : '';
  return (
    <div className="simui-dh">
      <div className={`simui-dh-value num${tone ? ` ${tone}` : ''}`}>
        {value}
        {unit && <span className="simui-dh-unit">{unit}</span>}
      </div>
      {sub && <div className="simui-dh-sub">{sub}</div>}
      {rel && <div className="simui-dh-since num">{rel}</div>}
    </div>
  );
}
