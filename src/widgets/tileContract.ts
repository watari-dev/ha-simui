// Tile leaf contract (FRAMEWORK.md §1) — the universal leaf every widget renders
// against. The block owns layout (span/rows); the tile owns one entity and one
// surgical subscription. Placement never lives here.
import type { CallService } from '../types';

/**
 * What renders on a tile's state line (FRAMEWORK.md §1). `stateContent[0]` is the
 * primary value (tabular numerals); any time-bit renders as a dimmed relative
 * timestamp. Normalize the `-`/`_` inconsistency at parse time.
 */
export type StateBit = 'state' | 'last_changed' | 'last_updated' | string;

/**
 * A color role, not a raw hex (FRAMEWORK.md §5/§7). Resolves to a CSS variable so
 * it inherits `hass.themes` when embedded. `'none'` = monochrome (idle). State
 * accents apply only when the entity is on/active; category accents are fixed.
 */
export type ColorToken =
  | 'warm' | 'cool' | 'accent' | 'warn' | 'up' | 'down' | 'primary' | 'none'
  // Categorical accents (FRAMEWORK.md §7) — a fixed per-category identity hue for
  // the launcher / nav, distinct from the single state accent.
  | 'violet' | 'cyan' | 'pink' | 'green' | 'teal' | 'slate';

/**
 * Upgrades a display tile into a controller (FRAMEWORK.md §1). Rendered as an
 * inline control strip below the header; reuse the existing `widgets/*Tile.tsx`
 * as the feature renderers. `modes` is a curated subset, not every HA capability.
 */
export type TileFeature =
  | { type: 'cover-open-close' }
  | { type: 'climate-hvac-modes'; modes: string[]; style?: 'icons' | 'dropdown' }
  | { type: 'climate-fan-modes'; style?: 'dropdown' }
  | { type: 'target-temperature' }
  | { type: 'fan-speed' }
  | { type: 'fan-oscillate' }
  | { type: 'lock-commands' }
  | { type: 'alarm-modes'; modes: string[] };

/**
 * What a tap (body or icon) does (FRAMEWORK.md §1). `navigate` is an internal
 * route (category/room), never `/lovelace/*`; `call-service` carries a
 * `'domain.service'` string. See `runAction` for execution semantics.
 */
export type HassAction =
  | { action: 'navigate'; path: string } // internal route, opened via ctx.navigate
  | { action: 'url'; url: string } // opens in a new tab
  | { action: 'call-service'; service: string; target?: object; data?: object }
  | { action: 'toggle' }
  | { action: 'more-info' }
  | { action: 'none' };

/** Side-channel callbacks an action may need beyond a raw service call. */
export interface ActionContext {
  callService: CallService;
  entityId?: string;
  navigate?: (path: string) => void;
  openSheet?: (entityId: string) => void;
}

/**
 * Execute a {@link HassAction} (FRAMEWORK.md §1). Centralizes the action vocab so
 * every tile/pill behaves identically:
 * - `call-service` splits `'domain.service'` and forwards `data`/`target`.
 * - `url` opens a new tab.
 * - `navigate` / `more-info` defer to callbacks (`more-info` ⇒ the detail Sheet).
 * - `toggle` calls `homeassistant.toggle` on the tile's entity.
 * - `none` is a no-op.
 */
export function runAction(action: HassAction, ctx: ActionContext): void {
  switch (action.action) {
    case 'call-service': {
      const [domain, service] = action.service.split('.');
      if (!domain || !service) return;
      void ctx.callService(
        domain,
        service,
        action.data as Record<string, unknown> | undefined,
        action.target as { entity_id?: string | string[] } | undefined,
      );
      return;
    }
    case 'url':
      window.open(action.url, '_blank', 'noopener,noreferrer');
      return;
    case 'navigate':
      ctx.navigate?.(action.path);
      return;
    case 'more-info':
      if (ctx.entityId) ctx.openSheet?.(ctx.entityId);
      return;
    case 'toggle':
      if (ctx.entityId) {
        void ctx.callService('homeassistant', 'toggle', undefined, { entity_id: ctx.entityId });
      }
      return;
    case 'none':
      return;
  }
}
