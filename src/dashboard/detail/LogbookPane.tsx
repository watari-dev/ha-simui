import { useEffect, useRef, useState } from 'react';
import type { Connection } from 'home-assistant-js-websocket';
import { useHassSource } from '../../hass/context';
import { prettyState, relativeTime } from '../../util';
import './LogbookPane.css';

/**
 * LogbookPane (SPEC_DETAIL §3.4) — a compact, tabular timeline of recent state
 * changes for one entity: `relativeTime · state · (context)`, most-recent first.
 * Rows reuse the `simui-detail-attr` key/value rhythm — left: relative time
 * (tabular), right: the new state (state-tinted dot + label).
 *
 * Data (graceful, three tiers):
 *   1. HA's logbook WS (`logbook/get_events`) — the richest (name, message, context).
 *   2. Fallback — state-history transitions (`history/history_during_period`) when
 *      the logbook integration isn't reachable; less rich but always there with the
 *      recorder.
 *   3. dev/mock with no connection → `[]` → the pane renders NOTHING (§9).
 *
 * No spinner: the pane mounts when data arrives (minimal motion). One-shot fetch
 * over a fixed window — the sheet is short-lived, so no live tail.
 */

export interface LogbookEntry {
  when: number; // epoch ms
  state: string;
  name?: string;
  message?: string;
}

const WINDOW_MS = 7 * 24 * 3_600_000; // 7 days back — enough for a useful timeline.

export function LogbookPane({ entityId, limit = 12 }: { entityId: string; limit?: number }) {
  const entries = useLogbook(entityId);
  const [expanded, setExpanded] = useState(false);

  if (entries.length === 0) return null;

  const shown = expanded ? entries.slice(0, 50) : entries.slice(0, limit);
  const more = entries.length - shown.length;

  return (
    <div className="simui-logbook">
      {shown.map((e, i) => (
        <div className="simui-logbook-row" key={`${e.when}-${i}`}>
          <span className="simui-logbook-when num">{relativeTime(new Date(e.when).toISOString()) || 'just now'}</span>
          <span className="simui-logbook-state">
            <span className={`simui-logbook-dot ${stateTone(e.state)}`} aria-hidden="true" />
            <span className="simui-logbook-label">{e.message ? e.message : prettyState(e.state)}</span>
          </span>
        </div>
      ))}
      {more > 0 && !expanded && (
        <button type="button" className="simui-logbook-more" onClick={() => setExpanded(true)}>
          Show {more} more
        </button>
      )}
    </div>
  );
}

/** A coarse on/off/neutral tone for the leading dot — state colour only (§9). */
const ON_STATES = new Set(['on', 'open', 'home', 'unlocked', 'cleaning', 'playing', 'detected', 'active', 'heat', 'cool']);
const WARN_STATES = new Set(['unavailable', 'unknown', 'problem', 'alarm', 'triggered']);

function stateTone(state: string): 'on' | 'off' | 'warn' {
  const s = state.toLowerCase();
  if (WARN_STATES.has(s)) return 'warn';
  if (ON_STATES.has(s)) return 'on';
  return 'off';
}

/* ════════════════════════════════════════════════════════════════════════════
 * useLogbook — logbook WS with a state-history fallback. Memoised per
 * (entityId, window) via a request-superseding ref, like useHistory. Self-contained
 * so the pane works whether or not the §4.4 sibling hook lands.
 * ════════════════════════════════════════════════════════════════════════════ */

interface LogbookWsEvent {
  when?: number | string; // HA sends epoch seconds (number) for logbook events
  state?: string;
  name?: string;
  message?: string;
  entity_id?: string;
}

interface HistRow {
  s?: string;
  state?: string;
  lu?: number;
  last_updated?: string | number;
}

function toMs(when: number | string | undefined): number | null {
  if (typeof when === 'number') return when < 1e12 ? when * 1000 : when;
  if (typeof when === 'string') {
    const t = Date.parse(when);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}

function useLogbook(entityId: string): LogbookEntry[] {
  const source = useHassSource();
  const [entries, setEntries] = useState<LogbookEntry[]>([]);
  const reqRef = useRef(0);

  useEffect(() => {
    const conn = source.connection;
    if (!conn) {
      setEntries([]);
      return;
    }
    const req = ++reqRef.current;
    const end = new Date();
    const start = new Date(end.getTime() - WINDOW_MS);

    const settle = (rows: LogbookEntry[]) => {
      if (req !== reqRef.current) return;
      // Most-recent first.
      rows.sort((a, b) => b.when - a.when);
      setEntries(rows);
    };

    conn
      .sendMessagePromise<LogbookWsEvent[]>({
        type: 'logbook/get_events',
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        entity_ids: [entityId],
      })
      .then((events) => {
        const rows: LogbookEntry[] = [];
        for (const ev of events ?? []) {
          const when = toMs(ev.when);
          if (when == null) continue;
          if (ev.state == null && ev.message == null) continue;
          rows.push({
            when,
            state: ev.state ?? '',
            name: ev.name,
            message: ev.message,
          });
        }
        if (rows.length) {
          settle(rows);
        } else {
          // Empty logbook → derive from state history.
          void fallbackToHistory(conn, entityId, start, end, settle);
        }
      })
      .catch(() => {
        // No logbook integration → derive from state history.
        void fallbackToHistory(conn, entityId, start, end, settle);
      });
  }, [source, entityId]);

  return entries;
}

async function fallbackToHistory(
  conn: Connection,
  entityId: string,
  start: Date,
  end: Date,
  settle: (rows: LogbookEntry[]) => void,
): Promise<void> {
  try {
    const res = await conn.sendMessagePromise<Record<string, HistRow[] | undefined>>({
      type: 'history/history_during_period',
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      entity_ids: [entityId],
      minimal_response: true,
      no_attributes: true,
      significant_changes_only: false,
    });
    const rows = res?.[entityId] ?? [];
    const out: LogbookEntry[] = [];
    let prev: string | undefined;
    for (const row of rows) {
      const state = row.s ?? row.state;
      if (state == null || state === '') continue;
      if (state === prev) continue; // only transitions
      prev = state;
      const lu = row.lu ?? row.last_updated;
      let when: number | null = null;
      if (typeof lu === 'number') when = lu < 1e12 ? lu * 1000 : lu;
      else if (typeof lu === 'string') when = Date.parse(lu);
      if (when == null || !Number.isFinite(when)) continue;
      out.push({ when, state });
    }
    settle(out);
  } catch {
    settle([]);
  }
}
