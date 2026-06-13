import type { ComponentType } from 'react';
import type { WidgetProps } from '../types';
import { ClimateTile } from './ClimateTile';
import { CoverTile } from './CoverTile';
import { GenericTile } from './GenericTile';
import { LightTile } from './LightTile';
import { LockTile } from './LockTile';
import { MediaPlayerTile } from './MediaPlayerTile';
import { SensorTile } from './SensorTile';

// domain → widget. Anything unmapped falls back to GenericTile so every
// entity renders *something*. Grow this map as widgets get built.
const REGISTRY: Record<string, ComponentType<WidgetProps>> = {
  light: LightTile,
  sensor: SensorTile,
  climate: ClimateTile,
  media_player: MediaPlayerTile,
  cover: CoverTile,
  lock: LockTile,
};

export function widgetFor(domain: string): ComponentType<WidgetProps> {
  return REGISTRY[domain] ?? GenericTile;
}
