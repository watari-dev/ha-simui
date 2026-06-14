import type { ComponentType } from 'react';
import type { WidgetProps } from '../types';
import { ActionTile } from './ActionTile';
import { CameraTile } from './CameraTile';
import { ClimateTile } from './ClimateTile';
import { CoverTile } from './CoverTile';
import { FanTile } from './FanTile';
import { GenericTile } from './GenericTile';
import { LightTile } from './LightTile';
import { LockTile } from './LockTile';
import { MediaPlayerTile } from './MediaPlayerTile';
import { SensorTile } from './SensorTile';
import { VacuumTile } from './VacuumTile';
import { WeatherTile } from './WeatherTile';
import { AlarmTile } from './AlarmTile';
import { NumberTile } from './NumberTile';
import { PersonTile } from './PersonTile';
import { SelectTile } from './SelectTile';
import { ValveTile } from './ValveTile';
import { WaterHeaterTile } from './WaterHeaterTile';

// domain → widget. Anything unmapped falls back to GenericTile so every
// entity renders *something*. Grow this map as widgets get built.
const REGISTRY: Record<string, ComponentType<WidgetProps>> = {
  light: LightTile,
  sensor: SensorTile,
  climate: ClimateTile,
  media_player: MediaPlayerTile,
  cover: CoverTile,
  lock: LockTile,
  camera: CameraTile,
  weather: WeatherTile,
  fan: FanTile,
  vacuum: VacuumTile,
  scene: ActionTile,
  script: ActionTile,
  button: ActionTile,
  input_button: ActionTile,
  valve: ValveTile,
  person: PersonTile,
  device_tracker: PersonTile,
  water_heater: WaterHeaterTile,
  alarm_control_panel: AlarmTile,
  number: NumberTile,
  input_number: NumberTile,
  select: SelectTile,
  input_select: SelectTile,
};

// GaugeTile is intentionally NOT auto-mapped (a sensor reads better inline by
// default). Re-exported so a composed block / preset can opt a numeric entity in.
export { GaugeTile } from './GaugeTile';

export function widgetFor(domain: string): ComponentType<WidgetProps> {
  return REGISTRY[domain] ?? GenericTile;
}
