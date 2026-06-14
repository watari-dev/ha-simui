import { useEffect, useMemo, useRef, useState } from 'react';
import { useHassSource } from './context';
import type { HassEntities, HassSource } from '../types';

/** One sample: epoch millis + numeric value. The shape ChartBlock plots. */
export interface HistoryPoint {
  t: number;
  v: number;
}

/** A time window, e.g. `{ value: 24, unit: 'h' }` or `{ value: 7, unit: 'd' }`. */
export interface HistoryWindow {
  value: number;
  unit: 'h' | 'd';
}

type Series = Record<string, HistoryPoint[]>;

function windowMs(w: HistoryWindow): number {
  const hour = 3_600_000;
  return w.unit === 'd' ? w.value * 24 * hour : w.value * hour;
}

/** Parse a (possibly unit-suffixed) HA state into a finite number, else null. */
function numericState(raw: string | undefined): number | null {
  if (raw == null) return null;
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) ? n : null;
}

/**
 * Deterministic hash → seeded pseudo-random in [0, 1). Keeps synthesized
 * series stable across renders for the same entity (no jitter on re-mount).
 */
function seeded(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4_294_967_296;
  };
}

function hashString(str: string): number {
  let h = 2_166_136_261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16_777_619);
  }
  return h >>> 0;
}

/**
 * Synthesize a plausible history for ONE entity from its current value via a
 * seeded random walk ending at `current`. Used in mock/dev when no HA
 * connection is present, so charts still render with something lifelike.
 */
function synthesize(entityId: string, current: number, win: HistoryWindow): HistoryPoint[] {
  const span = windowMs(win);
  const count = win.unit === 'd' ? Math.min(win.value * 24, 240) : Math.min(win.value * 12, 240);
  const now = Date.now();
  const start = now - span;
  const step = span / Math.max(1, count - 1);
  const rand = seeded(hashString(entityId));

  // Random-walk backwards from `current` so the final point matches live state.
  const scale = (Math.abs(current) || 1) * 0.12 + 0.5;
  const vals: number[] = new Array(count);
  vals[count - 1] = current;
  for (let i = count - 2; i >= 0; i--) {
    vals[i] = vals[i + 1] + (rand() - 0.5) * scale;
  }
  return vals.map((v, i) => ({ t: Math.round(start + i * step), v: Math.round(v * 100) / 100 }));
}

interface HistoryRow {
  s?: string;
  state?: string;
  lu?: number;
  last_updated?: string | number;
}
type HistoryResponse = Record<string, HistoryRow[] | undefined>;

/** Coerce one HA history row into a point, or null when the value isn't numeric. */
function rowToPoint(row: HistoryRow): HistoryPoint | null {
  const v = numericState(row.s ?? row.state);
  if (v == null) return null;
  const luRaw = row.lu ?? row.last_updated;
  let t: number;
  if (typeof luRaw === 'number') t = luRaw < 1e12 ? luRaw * 1000 : luRaw;
  else if (typeof luRaw === 'string') t = Date.parse(luRaw);
  else return null;
  if (!Number.isFinite(t)) return null;
  return { t, v };
}

function signatureOf(states: HassEntities, ids: string[]): string {
  return ids.map((id) => states[id]?.state ?? '').join('|');
}

/**
 * Subscribe surgically to the numeric values of a fixed entity set; returns a
 * cheap signature string that changes only when one of those states moves.
 * Drives the synth path's re-derivation without re-rendering on unrelated ticks.
 */
function useTrackedSignature(source: HassSource, ids: string[]): string {
  const idsKey = ids.join(',');
  const [sig, setSig] = useState(() => signatureOf(source.getStates(), ids));
  useEffect(() => {
    setSig(signatureOf(source.getStates(), ids));
    return source.subscribe(() => {
      const next = signatureOf(source.getStates(), ids);
      setSig((prev) => (prev === next ? prev : next));
    });
  }, [source, idsKey]); // eslint-disable-line react-hooks/exhaustive-deps
  return sig;
}

/**
 * TradingView-grade history feed (FRAMEWORK.md §5). Fetches the real recorder
 * history over the HA WebSocket (`history/history_during_period`) when a
 * connection is available; otherwise synthesizes a seeded walk from current
 * state so charts render in mock/dev.
 *
 * Returns `Record<entityId, HistoryPoint[]>`. Subscribes surgically: re-fetches
 * only when the entity set or window changes, and (in the synth/mock path) when
 * a tracked entity's live value moves. One subscription, not N.
 */
export function useHistory(entities: string[], window: HistoryWindow): Series {
  const source = useHassSource();

  // Stable identity for the dependency arrays (avoid re-fetch on array re-creation).
  const idsKey = entities.filter(Boolean).join(',');
  const winKey = `${window.value}${window.unit}`;
  const ids = useMemo(() => entities.filter(Boolean), [idsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasConnection = !!source.connection;
  const [fetched, setFetched] = useState<Series>({});

  // --- Real backend path: fetch once per (entities, window) when connected. ---
  const reqRef = useRef(0);
  useEffect(() => {
    const conn = source.connection;
    if (!conn || ids.length === 0) {
      setFetched({});
      return;
    }
    const req = ++reqRef.current;
    const end = new Date();
    const start = new Date(end.getTime() - windowMs(window));

    conn
      .sendMessagePromise<HistoryResponse>({
        type: 'history/history_during_period',
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        entity_ids: ids,
        minimal_response: true,
        no_attributes: true,
        significant_changes_only: false,
      })
      .then((res) => {
        if (req !== reqRef.current) return; // a newer request superseded this one
        const next: Series = {};
        for (const id of ids) {
          const rows = res?.[id] ?? [];
          const pts: HistoryPoint[] = [];
          for (const row of rows) {
            const p = rowToPoint(row);
            if (p) pts.push(p);
          }
          if (pts.length) next[id] = pts;
        }
        setFetched(next);
      })
      .catch(() => {
        if (req === reqRef.current) setFetched({});
      });
  }, [source, ids, winKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // --- Synth/mock path: re-derive only when a tracked live value changes. ---
  const sig = useTrackedSignature(source, ids);

  return useMemo(() => {
    const states = source.getStates();
    const out: Series = {};
    for (const id of ids) {
      if (fetched[id]?.length) {
        out[id] = fetched[id]; // prefer real recorder rows
        continue;
      }
      const cur = numericState(states[id]?.state);
      if (cur != null) out[id] = synthesize(id, cur, window);
    }
    return out;
    // `sig` captures live-state moves; `fetched` captures the WS response.
  }, [source, ids, fetched, sig, winKey, hasConnection]); // eslint-disable-line react-hooks/exhaustive-deps
}
