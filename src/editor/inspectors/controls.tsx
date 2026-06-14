// Inspector sub-editor primitives (Inspector enrichment module).
//
// Shared, controlled, store-free controls every sub-editor composes: a labelled
// Field, a segmented control, a hairline section, a swatch grid, a lucide icon
// picker, and a numeric/text input. Scoped under `simui-isub-*` so they neither
// depend on nor collide with the existing `simui-insp-*` styles in Inspector.css
// (a shared file this module must not touch). Linear-restraint: monochrome base,
// one accent on the active control, tabular numerals on values, minimal motion.
//
// Every control is a pure controlled component (value + onChange) — no internal
// store access, no side effects beyond local popover UI state.

import { useEffect, useMemo, useRef, useState } from 'react';
import * as Lucide from 'lucide-react';
import { Search, type LucideIcon } from 'lucide-react';
import './controls.css';
import type { ColorToken } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Colour tokens — the role palette (mirrors Inspector.tsx COLOR_TOKENS).
// ─────────────────────────────────────────────────────────────────────────────

export const SUB_COLOR_TOKENS: { token: ColorToken; css: string; label: string }[] = [
  { token: 'none', css: 'transparent', label: 'Auto (monochrome)' },
  { token: 'warm', css: 'var(--warm, #ffb267)', label: 'Warm' },
  { token: 'cool', css: 'var(--accent, #5b8cff)', label: 'Cool' },
  { token: 'accent', css: 'var(--accent, #5b8cff)', label: 'Accent' },
  { token: 'warn', css: 'var(--warn, #f0a84b)', label: 'Warn' },
  { token: 'up', css: 'var(--up, #3fd08a)', label: 'Up' },
  { token: 'down', css: 'var(--down, #f0735e)', label: 'Down' },
  { token: 'violet', css: '#a78bfa', label: 'Violet' },
  { token: 'cyan', css: '#22d3ee', label: 'Cyan' },
  { token: 'pink', css: '#f472b6', label: 'Pink' },
  { token: 'green', css: '#4ade80', label: 'Green' },
  { token: 'teal', css: '#2dd4bf', label: 'Teal' },
  { token: 'slate', css: '#94a3b8', label: 'Slate' },
  { token: 'primary', css: 'var(--text, #edeef2)', label: 'Primary' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Curated lucide subset for the icon picker (home-device glyphs). Stored value is
// lucide's kebab name so it round-trips with components/icons.tsx.
// ─────────────────────────────────────────────────────────────────────────────

const ICON_WANTED: [string, string][] = [
  ['lightbulb', 'Lightbulb'], ['lamp', 'Lamp'], ['sun', 'Sun'], ['moon', 'Moon'],
  ['thermometer', 'Thermometer'], ['flame', 'Flame'], ['snowflake', 'Snowflake'],
  ['fan', 'Fan'], ['wind', 'Wind'], ['droplet', 'Droplet'], ['droplets', 'Droplets'],
  ['gauge', 'Gauge'], ['activity', 'Activity'], ['zap', 'Zap'], ['plug', 'Plug'],
  ['power', 'Power'], ['battery', 'Battery'], ['battery-charging', 'BatteryCharging'],
  ['blinds', 'Blinds'], ['door-open', 'DoorOpen'], ['door-closed', 'DoorClosed'],
  ['lock', 'Lock'], ['lock-open', 'LockOpen'], ['shield', 'Shield'],
  ['shield-alert', 'ShieldAlert'], ['shield-check', 'ShieldCheck'], ['bell', 'Bell'],
  ['camera', 'Camera'], ['video', 'Video'], ['tv', 'Tv'], ['cast', 'Cast'],
  ['speaker', 'Speaker'], ['music', 'Music'], ['volume-2', 'Volume2'], ['play', 'Play'],
  ['home', 'Home'], ['sofa', 'Sofa'], ['bed', 'Bed'], ['bath', 'Bath'],
  ['utensils', 'Utensils'], ['car', 'Car'], ['server', 'Server'], ['cpu', 'Cpu'],
  ['hard-drive', 'HardDrive'], ['wifi', 'Wifi'], ['router', 'Router'], ['cloud', 'Cloud'],
  ['cloud-rain', 'CloudRain'], ['umbrella', 'Umbrella'], ['leaf', 'Leaf'],
  ['sprout', 'Sprout'], ['trees', 'Trees'], ['sparkles', 'Sparkles'], ['star', 'Star'],
  ['heart', 'Heart'], ['user', 'User'], ['users', 'Users'], ['map-pin', 'MapPin'],
  ['clock', 'Clock'], ['calendar', 'Calendar'], ['settings', 'Settings'],
  ['sliders-horizontal', 'SlidersHorizontal'], ['toggle-right', 'ToggleRight'],
  ['alert-triangle', 'AlertTriangle'], ['alert-octagon', 'AlertOctagon'], ['box', 'Box'],
  ['circle-dot', 'CircleDot'], ['gem', 'Gem'], ['waves', 'Waves'], ['thermometer-sun', 'ThermometerSun'],
];

export const SUB_ICON_CHOICES: { name: string; comp: LucideIcon }[] = (() => {
  const ns = Lucide as unknown as Record<string, LucideIcon | undefined>;
  return ICON_WANTED
    .map(([name, pascal]) => ({ name, comp: ns[pascal] }))
    .filter((x): x is { name: string; comp: LucideIcon } => Boolean(x.comp));
})();

const ICON_BY_NAME = new Map(SUB_ICON_CHOICES.map((c) => [c.name, c.comp]));

/** Resolve a stored icon name to its lucide glyph (CircleDot fallback). */
export function SubIconGlyph({ name, size = 18 }: { name?: string; size?: number }) {
  const Comp = (name && ICON_BY_NAME.get(name)) || Lucide.CircleDot;
  return <Comp size={size} strokeWidth={2} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Field — a labelled form row.
// ─────────────────────────────────────────────────────────────────────────────

export function SubField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="simui-isub-field">
      <div className="simui-isub-label-row">
        <label className="simui-isub-label">{label}</label>
        {hint != null && <span className="simui-isub-fieldhint">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

/** A hairline-topped section with an optional uppercase head + trailing count. */
export function SubSection({
  head,
  count,
  children,
  first,
}: {
  head?: string;
  count?: React.ReactNode;
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <section className={`simui-isub-section${first ? ' first' : ''}`}>
      {head != null && (
        <div className="simui-isub-head">
          <span>{head}</span>
          {count != null && <span className="simui-isub-count">{count}</span>}
        </div>
      )}
      {children}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Segmented control.
// ─────────────────────────────────────────────────────────────────────────────

export function SubSegmented<T extends string | number>({
  options,
  value,
  onChange,
  wrap,
}: {
  options: { value: T; label: React.ReactNode; title?: string }[];
  value: T;
  onChange: (value: T) => void;
  wrap?: boolean;
}) {
  return (
    <div className={`simui-isub-seg${wrap ? ' wrap' : ''}`} role="group">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          title={o.title}
          className={`simui-isub-seg-btn${o.value === value ? ' active' : ''}`}
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Swatch grid (colour tokens).
// ─────────────────────────────────────────────────────────────────────────────

export function SubSwatches({
  value,
  onChange,
}: {
  value: ColorToken;
  onChange: (token: ColorToken) => void;
}) {
  return (
    <div className="simui-isub-swatches">
      {SUB_COLOR_TOKENS.map((c) => (
        <button
          key={c.token}
          type="button"
          className={`simui-isub-swatch${c.token === value ? ' active' : ''}${
            c.token === 'none' ? ' none' : ''
          }`}
          style={{ '--sw': c.css } as React.CSSProperties}
          title={c.label}
          aria-label={c.label}
          aria-pressed={c.token === value}
          onClick={() => onChange(c.token)}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Toggle row (checkbox styled as a square check).
// ─────────────────────────────────────────────────────────────────────────────

export function SubCheck({
  checked,
  onChange,
  children,
  style,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <label className="simui-isub-check" style={style}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{children}</span>
    </label>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Icon picker — a swatch button + free-text input that pops a searchable grid.
// ─────────────────────────────────────────────────────────────────────────────

export function SubIconPicker({
  value,
  onChange,
  placeholder = 'Default by device type',
}: {
  value: string | undefined;
  onChange: (icon: string | undefined) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return SUB_ICON_CHOICES;
    return SUB_ICON_CHOICES.filter((c) => c.name.includes(query));
  }, [q]);

  return (
    <div ref={rootRef} className="simui-isub-iconroot">
      <div className="simui-isub-iconfield">
        <button
          type="button"
          className={`simui-isub-iconbtn${open ? ' open' : ''}`}
          aria-label="Choose icon"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <SubIconGlyph name={value} size={18} />
        </button>
        <input
          className="simui-isub-input"
          placeholder={placeholder}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value || undefined)}
          onFocus={() => setOpen(true)}
        />
      </div>

      {open && (
        <div className="simui-isub-iconpop">
          <div className="simui-isub-iconsearchwrap">
            <Search size={14} strokeWidth={2} className="simui-isub-iconsearchglyph" />
            <input
              className="simui-isub-iconsearch"
              placeholder="Search icons…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoFocus
            />
          </div>
          <div className="simui-isub-icongrid">
            {filtered.length === 0 ? (
              <div className="simui-isub-iconempty">No icons match “{q}”.</div>
            ) : (
              filtered.map((c) => {
                const Comp = c.comp;
                return (
                  <button
                    key={c.name}
                    type="button"
                    className={`simui-isub-iconcell${c.name === value ? ' active' : ''}`}
                    title={c.name}
                    aria-label={c.name}
                    onClick={() => {
                      onChange(c.name);
                      setOpen(false);
                    }}
                  >
                    <Comp size={17} strokeWidth={2} />
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
