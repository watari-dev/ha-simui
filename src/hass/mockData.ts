import type { DevStore } from './connectDev';
import type { Hass, HassEntities, HassEntity } from '../types';

// A faithful local snapshot: real entity IDs + states from the connected HA demo
// instance, with demo-accurate attributes. Lets the dev server run (and be
// browser-tested) without a token/CORS. callService mutates state optimistically
// so the UI is genuinely interactive.
const T = '2026-06-13T22:00:00+00:00';

function ent(entity_id: string, state: string, attributes: Record<string, unknown>): HassEntity {
  return {
    entity_id,
    state,
    attributes,
    last_changed: T,
    last_updated: T,
    context: { id: 'mock', parent_id: null, user_id: null },
  } as HassEntity;
}

const ENTITIES: HassEntity[] = [
  ent('light.bed_light', 'off', { friendly_name: 'Bed Light' }),
  ent('light.ceiling_lights', 'on', { friendly_name: 'Ceiling Lights', brightness: 204, color_mode: 'color_temp' }),
  ent('light.kitchen_lights', 'on', { friendly_name: 'Kitchen Lights', brightness: 180, rgb_color: [255, 200, 120], color_mode: 'rgb' }),
  ent('light.office_rgbw_lights', 'on', { friendly_name: 'Office RGBW Lights', brightness: 150, rgb_color: [180, 120, 255], color_mode: 'rgb' }),

  ent('climate.heatpump', 'heat', { friendly_name: 'HeatPump', current_temperature: 21, temperature: 22, min_temp: 7, max_temp: 35, target_temp_step: 0.5, hvac_action: 'heating' }),
  ent('climate.hvac', 'cool', { friendly_name: 'Hvac', current_temperature: 23, temperature: 21, min_temp: 7, max_temp: 35, target_temp_step: 0.5, hvac_action: 'cooling' }),
  ent('climate.ecobee', 'heat_cool', { friendly_name: 'Ecobee', current_temperature: 22, target_temp_low: 19, target_temp_high: 24, min_temp: 7, max_temp: 35, hvac_action: 'idle' }),

  ent('media_player.living_room', 'playing', { friendly_name: 'Living Room', media_title: 'Midnight City', media_artist: 'M83', volume_level: 0.45, supported_features: 64445 }),
  ent('media_player.kitchen', 'playing', { friendly_name: 'Kitchen', media_title: 'Redbone', media_artist: 'Childish Gambino', volume_level: 0.3, supported_features: 64445 }),
  ent('media_player.bedroom', 'paused', { friendly_name: 'Bedroom', supported_features: 64445 }),

  ent('cover.living_room_window', 'open', { friendly_name: 'Living Room Window', current_position: 60, supported_features: 15 }),
  ent('cover.kitchen_window', 'closed', { friendly_name: 'Kitchen Window', current_position: 0, supported_features: 15 }),
  ent('cover.hall_window', 'open', { friendly_name: 'Hall Window', current_position: 100, supported_features: 15 }),
  ent('cover.garage_door', 'closed', { friendly_name: 'Garage Door', supported_features: 11 }),

  ent('lock.front_door', 'locked', { friendly_name: 'Front Door' }),
  ent('lock.kitchen_door', 'unlocked', { friendly_name: 'Kitchen Door' }),
  ent('lock.openable_lock', 'locked', { friendly_name: 'Openable Lock' }),

  ent('fan.living_room_fan', 'off', { friendly_name: 'Living Room Fan' }),
  ent('fan.ceiling_fan', 'off', { friendly_name: 'Ceiling Fan' }),

  ent('switch.decorative_lights', 'on', { friendly_name: 'Decorative Lights' }),
  ent('switch.ac', 'off', { friendly_name: 'AC' }),

  ent('sensor.outside_temperature', '15.6', { friendly_name: 'Outside Temperature', unit_of_measurement: '°C', device_class: 'temperature' }),
  ent('sensor.outside_humidity', '54', { friendly_name: 'Outside Humidity', unit_of_measurement: '%', device_class: 'humidity' }),
  ent('sensor.energy_consumption', '4.2', { friendly_name: 'Total Energy', unit_of_measurement: 'kWh', device_class: 'energy' }),
];

const SNAPSHOT: HassEntities = Object.fromEntries(ENTITIES.map((e) => [e.entity_id, e]));

function apply(states: HassEntities, domain: string, service: string, data: Record<string, unknown> | undefined, id: string): void {
  const e = states[id];
  if (!e) return;
  const attrs = { ...e.attributes };
  let state = e.state;

  if (service === 'toggle') state = e.state === 'on' ? 'off' : 'on';
  else if (service === 'turn_on') state = 'on';
  else if (service === 'turn_off') state = 'off';

  if (domain === 'light' && service === 'turn_on' && data && data.brightness_pct != null) {
    attrs.brightness = Math.round((Number(data.brightness_pct) / 100) * 255);
  }
  if (domain === 'lock') {
    if (service === 'lock') state = 'locked';
    if (service === 'unlock') state = 'unlocked';
  }
  if (domain === 'cover') {
    if (service === 'open_cover') { state = 'open'; if ('current_position' in attrs) attrs.current_position = 100; }
    if (service === 'close_cover') { state = 'closed'; if ('current_position' in attrs) attrs.current_position = 0; }
    if (service === 'set_cover_position' && data && data.position != null) {
      const p = Number(data.position);
      attrs.current_position = p;
      state = p > 0 ? 'open' : 'closed';
    }
  }
  if (domain === 'media_player') {
    if (service === 'media_play_pause') state = e.state === 'playing' ? 'paused' : 'playing';
    if (service === 'volume_set' && data && data.volume_level != null) attrs.volume_level = Number(data.volume_level);
  }
  if (domain === 'climate' && service === 'set_temperature' && data && data.temperature != null) {
    attrs.temperature = Number(data.temperature);
  }

  states[id] = { ...e, state, attributes: attrs };
}

export function createMockStore(): DevStore {
  let states: HassEntities = { ...SNAPSHOT };
  const listeners = new Set<() => void>();

  const callService: Hass['callService'] = (domain, service, data, target) => {
    const raw = target?.entity_id;
    const ids = raw ? (Array.isArray(raw) ? raw : [raw]) : [];
    ids.forEach((id) => apply(states, domain, service, data, id));
    states = { ...states };
    snapshot = { states, callService };
    listeners.forEach((l) => l());
    return Promise.resolve();
  };

  let snapshot: Hass = { states, callService };

  return {
    subscribe(cb) {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    getSnapshot() {
      return snapshot;
    },
  };
}
