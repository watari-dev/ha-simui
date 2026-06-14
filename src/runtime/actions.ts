// Action runtime — resolve a tile/block ActionMap to live behaviours.
//
// Companion to the ActionEditor (src/editor/inspector/actions/ActionEditor.tsx):
// the editor AUTHORS an `ActionMap`, this module RUNS it. It is the single seam
// between "what the user configured a tap to do" and "what actually happens",
// so every surface (tile, row, pill, card) behaves identically (FRAMEWORK.md §1,
// DESIGN_PRINCIPLES §14: glance → tap (Sheet) → context).
//
// It deliberately does NOT invent its own service-call / sheet primitives — it
// composes the ones the app already ships:
//   • `runAction` (src/widgets/tileContract.ts) executes one HassAction against an
//     ActionContext (call-service / url / navigate / more-info / toggle / none).
//   • `useActions` (src/dashboard/useActions.ts) binds that ActionContext to the
//     live app (HA source + shell router + detail Sheet).
//   • `useContextMenu` (src/components/ContextMenu.tsx) owns the long-press /
//     right-click menu the `hold` default opens.
//
// The default fallbacks mirror the ActionMap contract (src/editor/types.ts §ActionMap):
//   tap        ⇒ more-info (open the detail Sheet)
//   iconTap    ⇒ toggle on toggleable domains, else more-info
//   hold       ⇒ open the context menu (NOT a HassAction — a UI affordance)
//   doubleTap  ⇒ none (no smart-click expand unless configured)
//
// Absence is the default: a tile with no `actions` entry behaves exactly as it does
// today, so this is purely additive — existing tiles keep working untouched.

import { useCallback, useMemo, type MouseEvent as ReactMouseEvent } from 'react';
import { useActions } from '../dashboard/useActions';
import type { ActionMap, HassAction } from '../editor/types';

/** Domains a bare `toggle` / icon-tap is meaningful for (mirrors EntityTile). */
const TOGGLEABLE = new Set([
  'light',
  'switch',
  'fan',
  'input_boolean',
  'humidifier',
  'siren',
  'automation',
  'media_player',
  'lock',
  'cover',
]);

function domainOf(entityId: string): string {
  return entityId.split('.')[0] ?? '';
}

/**
 * The default {@link HassAction} for a slot when the user configured none. Returns
 * `undefined` for `hold` because its default is *open the context menu* — a UI
 * affordance, not an executable HassAction. Kept pure/exported so previews, tests,
 * and the editor's "Default (light)" hint can describe the resolved behaviour
 * without running it.
 */
export function defaultAction(
  slot: keyof ActionMap,
  entityId: string | undefined,
): HassAction | undefined {
  const toggleable = !!entityId && TOGGLEABLE.has(domainOf(entityId));
  switch (slot) {
    case 'tap':
      return { action: 'more-info' };
    case 'iconTap':
      return toggleable ? { action: 'toggle' } : { action: 'more-info' };
    case 'doubleTap':
      return { action: 'none' };
    case 'hold':
      // No HassAction default — the caller opens the context menu instead.
      return undefined;
  }
}

/**
 * Resolve one slot of an {@link ActionMap} to the HassAction that should run. An
 * explicit entry wins; absence falls back to {@link defaultAction}. Pure — the
 * execution side-effect lives in `runAction` via {@link useTileAction}.
 */
export function resolveAction(
  actions: ActionMap | undefined,
  slot: keyof ActionMap,
  entityId: string | undefined,
): HassAction | undefined {
  return actions?.[slot] ?? defaultAction(slot, entityId);
}

/** What `useTileAction` returns: spreadable DOM handlers honouring the ActionMap. */
export interface TileActionHandlers {
  /** Body tap → the `tap` slot (default more-info). */
  onClick: (event: ReactMouseEvent) => void;
  /**
   * Right-click → the `hold` slot. When `hold` is unset (or `more-info`/`none`),
   * the handler does NOT preventDefault, so a separately-spread `useContextMenu`
   * keeps owning the native context menu. When `hold` is an explicit *executable*
   * action (toggle / call-service / navigate / url), it runs that and suppresses
   * the browser menu.
   */
  onContextMenu: (event: ReactMouseEvent) => void;
  /** Double-click / smart-click → the `doubleTap` slot (default none). */
  onDoubleClick: (event: ReactMouseEvent) => void;
}

/** Tune `useTileAction` for tiles that split body vs. icon taps, or opt out of a slot. */
export interface TileActionOptions {
  /** Use the `iconTap` slot instead of `tap` for the primary click (icon hit-area). */
  useIconTap?: boolean;
  /**
   * Called when `hold` resolves to "open the context menu" (its unset default, or an
   * explicit `more-info`). Wire this to `useContextMenu().openAt(x, y)` so right-click
   * summons the menu. Omit ⇒ right-click is left to the element's own `menuProps`.
   */
  onRequestMenu?: (x: number, y: number) => void;
}

/**
 * Bind an entity + its {@link ActionMap} to ready-to-spread interaction handlers
 * (FRAMEWORK.md §1). Tiles/rows/cards spread the result so a configured tap / hold /
 * double-tap runs through the same `runAction` path as everything else, and an
 * unconfigured slot falls back to the sensible default.
 *
 * Hold semantics: a right-click whose `hold` is unset, `more-info`, or `none` is
 * treated as "show the context menu" (the third disclosure layer). Only an explicit
 * *executable* hold (toggle / call-service / navigate / url) takes over the gesture.
 * This keeps the right-click menu available by default while letting a power user
 * rebind hold to, say, a scene.
 *
 * @param entityId  the tile's entity (undefined for action-only / launcher leaves —
 *                  `toggle` / `more-info` become no-ops, matching `runAction`).
 * @param actions   the ActionMap (from `block.tiles?.[id]?.actions` or `block.actions`).
 */
export function useTileAction(
  entityId: string | undefined,
  actions: ActionMap | undefined,
  options: TileActionOptions = {},
): TileActionHandlers {
  const run = useActions();
  const { useIconTap = false, onRequestMenu } = options;

  // Resolve each slot once per (actions, entityId) change; the handlers are stable
  // so spreading them never thrashes a tile's identity.
  const resolved = useMemo(() => {
    const primarySlot: keyof ActionMap = useIconTap ? 'iconTap' : 'tap';
    return {
      primary: resolveAction(actions, primarySlot, entityId),
      hold: actions?.hold, // explicit only; absence ⇒ menu
      doubleTap: resolveAction(actions, 'doubleTap', entityId),
    };
  }, [actions, entityId, useIconTap]);

  const onClick = useCallback(
    (event: ReactMouseEvent) => {
      const action = resolved.primary;
      if (!action || action.action === 'none') return;
      // An icon tap inside a body-tappable tile must not also fire the body tap.
      if (useIconTap) event.stopPropagation();
      run(action, entityId);
    },
    [resolved.primary, run, entityId, useIconTap],
  );

  const onContextMenu = useCallback(
    (event: ReactMouseEvent) => {
      const hold = resolved.hold;
      // Executable hold (toggle / call-service / navigate / url) takes the gesture.
      if (hold && hold.action !== 'none' && hold.action !== 'more-info') {
        event.preventDefault();
        event.stopPropagation();
        run(hold, entityId);
        return;
      }
      // Otherwise default to the context menu when a host wired one up.
      if (onRequestMenu) {
        event.preventDefault();
        event.stopPropagation();
        onRequestMenu(event.clientX, event.clientY);
      }
      // No menu host: leave the event alone so an element-level `menuProps`
      // (useContextMenu) still handles it. Never swallow silently.
    },
    [resolved.hold, run, entityId, onRequestMenu],
  );

  const onDoubleClick = useCallback(
    (event: ReactMouseEvent) => {
      const action = resolved.doubleTap;
      if (!action || action.action === 'none') return;
      event.preventDefault();
      event.stopPropagation();
      run(action, entityId);
    },
    [resolved.doubleTap, run, entityId],
  );

  return { onClick, onContextMenu, onDoubleClick };
}
