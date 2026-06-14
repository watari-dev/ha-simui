import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  Blinds,
  Box,
  Cast,
  CircleDot,
  Fan,
  Gauge,
  Home,
  Lightbulb,
  Lock,
  LockOpen,
  Power,
  PowerOff,
  Server,
  Shield,
  Sparkles,
  Thermometer,
  Tv,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/**
 * Map the string icon names that the pure preset builders emit (they cannot import
 * React components) to lucide components. Keeps the gallery data plain while the
 * renderers resolve glyphs here. Unknown names fall back to a neutral dot.
 */
const ICONS: Record<string, LucideIcon> = {
  lightbulb: Lightbulb,
  thermostat: Thermometer,
  thermometer: Thermometer,
  cast: Cast,
  tv: Tv,
  shield: Shield,
  activity: Activity,
  zap: Zap,
  sparkles: Sparkles,
  server: Server,
  fan: Fan,
  'lock-open': LockOpen,
  lock: Lock,
  'power-off': PowerOff,
  power: Power,
  'alert-triangle': AlertTriangle,
  'alert-octagon': AlertOctagon,
  'alert-octagon-2': AlertOctagon,
  box: Box,
  blinds: Blinds,
  gauge: Gauge,
  home: Home,
};

export function iconNode(name: string | undefined, size = 15): React.ReactNode {
  const Icon = (name && ICONS[name]) || CircleDot;
  return <Icon size={size} strokeWidth={2} />;
}

export function iconFor(name: string | undefined): LucideIcon {
  return (name && ICONS[name]) || CircleDot;
}
