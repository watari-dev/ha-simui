// Runtime barrel — the live execution layer the editor's config drives.
// Currently the action runtime (tap / hold / double-tap → behaviour). Re-exported
// from one module so render-path callers import everything runtime from `../runtime`.

export {
  useTileAction,
  resolveAction,
  defaultAction,
  type TileActionHandlers,
  type TileActionOptions,
} from './actions';
