// Media category surface (PRESETS.md) — the Apple-Home "Media": what's playing now
// (rich transport cards) over a compact list of every speaker & display you can start.
//
// Degradation: nothing playing → just the speaker list. One/zero players → a flat
// list (or nothing). Mirror entities — a speaker re-exposed by Roon, a HomePod
// re-added as `_2`/`_5` — are collapsed to one so a real home's media list isn't
// doubled or tripled (the owner's home has ~180 media_player entities, most of them
// browser_mod ghosts the curation gate already drops, plus Sonos/HomePod mirrors).
import type { Block } from '../types';
import type { HassEntity } from '../../types';
import type { PresetContext, Surface } from './index';
import { blockId, isPrimary } from './index';
import { domainOf, friendly } from '../../util';

/** States that count as "actively in a session" → a rich now-playing card. */
const PLAYING = new Set(['playing', 'paused', 'buffering']);

/**
 * A key that collapses common mirror entities to one group: a trailing `_roon`
 * (Sonos↔Roon) or a numeric `_2`/`_5` (a device re-added) is stripped. Heuristic and
 * generalizable — two genuinely-distinct players that differ only by a trailing
 * number will merge, but the surface is user-editable so that's a safe default.
 */
function mirrorKey(e: HassEntity): string {
  return e.entity_id.replace(/^media_player\./, '').replace(/_(roon|\d+)$/, '');
}

const STATE_RANK: Record<string, number> = { playing: 5, buffering: 4, paused: 3, on: 2, idle: 1 };
function rank(e: HassEntity): number {
  return STATE_RANK[e.state] ?? 0;
}

export function buildMedia(ctx: PresetContext): Surface {
  const { states, registry } = ctx;
  // Curation gate: drop diagnostic/hidden/disabled + the browser_mod ghost players,
  // and anything unavailable. Pattern-only when `registry` is absent (dev/mock).
  const available = Object.values(states).filter(
    (e) =>
      domainOf(e.entity_id) === 'media_player' &&
      e.state !== 'unavailable' &&
      e.state !== 'unknown' &&
      isPrimary(e.entity_id, e, registry),
  );

  const surface: Surface = { blocks: [] };
  if (!available.length) return surface;

  // Collapse mirror entities, keeping the most-active one per group.
  const byKey = new Map<string, HassEntity>();
  for (const e of available) {
    const k = mirrorKey(e);
    const cur = byKey.get(k);
    if (!cur || rank(e) > rank(cur)) byKey.set(k, e);
  }
  const players = [...byKey.values()].sort((a, b) => friendly(a).localeCompare(friendly(b)));

  // Status strip: "N playing" → taps through nowhere new (already here), kept as a glance.
  surface.statusStrip = [
    {
      kind: 'count',
      icon: 'cast',
      label: 'playing',
      accent: 'violet',
      source: { include: [{ domain: 'media_player', state: 'playing' }] },
    },
  ];

  const playing = players.filter((e) => PLAYING.has(e.state));
  const rest = players.filter((e) => !PLAYING.has(e.state));

  // Now playing — rich transport cards (the hero). A `card` block renders the full
  // MediaPlayerTile (album + title + transport); a group would only give plain rows.
  // Two-wide so several sessions tile nicely; they lead the surface.
  for (const e of playing) {
    surface.blocks.push({
      id: blockId('media-now'),
      type: 'card',
      entityIds: [e.entity_id],
      span: 2,
    } as Block);
  }

  // Everything else — a compact list to glance + tap to start playback / control.
  if (rest.length) {
    surface.blocks.push({
      id: blockId('media-rest'),
      type: 'list',
      title: playing.length ? 'Speakers & displays' : 'Media',
      axis: 'none',
      entityIds: rest.map((e) => e.entity_id),
      span: 'full',
    } as Block);
  }

  return surface;
}
