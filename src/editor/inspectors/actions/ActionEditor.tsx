// ActionEditor — map a tile/block's interactions to behaviours (SPEC_EDITOR.md §card-config).
//
// A CONTROLLED editor producing an `ActionMap`: for each interaction slot
// (tap · icon tap · hold · smart-click) the user picks an action — Open details
// (more-info) · Toggle · Navigate · Call service · Open URL · Do nothing — and the
// editor reveals ONLY the fields that action needs (progressive disclosure:
// glance → tweak → deep edit). Absence is the default, so an untouched slot stores
// nothing and the runtime (src/runtime/actions.ts) applies the domain default.
//
// Designed as a drop-in upgrade for the inline `ActionsEditor` currently in
// src/editor/Inspector.tsx: same `actions` / `domain` / `onChange` contract, richer
// fields (service target + data, navigate destination builder, double-tap). The
// integrator swaps the inline block for <ActionEditor/> — see the INTEGRATION notes.
//
// Style: Linear-restraint, monochrome base, one accent on the active control,
// hairline dividers, tabular numerals. Reuses the inspector's own control classes
// (.simui-insp-*) so it sits seamlessly inside the rail, plus a few .simui-act-*
// classes for the slot layout. Co-located CSS — never the global stylesheet.

import { useMemo, useState } from 'react';
import {
  Pointer,
  MousePointerClick,
  Hand,
  Maximize2,
  ChevronDown,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import './ActionEditor.css';
import type { ActionMap, HassAction } from '../../types';
import type { HassEntities } from '../../../types';

// ─────────────────────────────────────────────────────────────────────────────
// Vocabulary
// ─────────────────────────────────────────────────────────────────────────────

/** The interaction slots, in disclosure order (tap is the 90% case, first). */
const SLOTS: { key: keyof ActionMap; label: string; hint: string; icon: LucideIcon }[] = [
  { key: 'tap', label: 'Tap', hint: 'Body tap', icon: Pointer },
  { key: 'iconTap', label: 'Icon tap', hint: 'Tap the icon', icon: MousePointerClick },
  { key: 'hold', label: 'Hold / right-click', hint: 'Long-press', icon: Hand },
  { key: 'doubleTap', label: 'Smart-click', hint: 'Double-click to expand', icon: Maximize2 },
];

/** The choosable action kinds (plus the implicit "Default" = clear the slot). */
const ACTION_KINDS: { value: HassAction['action']; label: string }[] = [
  { value: 'more-info', label: 'Open details' },
  { value: 'toggle', label: 'Toggle' },
  { value: 'navigate', label: 'Navigate' },
  { value: 'call-service', label: 'Call service' },
  { value: 'url', label: 'Open URL' },
  { value: 'none', label: 'Do nothing' },
];

/** Common navigation destinations, surfaced as a builder so users avoid raw paths. */
const NAV_PRESETS: { path: string; label: string }[] = [
  { path: 'home', label: 'Home summary' },
  { path: 'category/lights', label: 'Lights' },
  { path: 'category/climate', label: 'Climate' },
  { path: 'category/media', label: 'Media' },
  { path: 'category/security', label: 'Security' },
  { path: 'category/sensors', label: 'Sensors' },
  { path: 'category/energy', label: 'Energy & power' },
  { path: 'category/scenes', label: 'Scenes' },
];

/** The default each unset slot resolves to (mirrors src/runtime/actions.ts). */
const TOGGLEABLE = new Set([
  'light', 'switch', 'fan', 'input_boolean', 'humidifier', 'siren', 'automation', 'media_player', 'lock', 'cover',
]);

function defaultLabel(slot: keyof ActionMap, domain: string): string {
  switch (slot) {
    case 'tap':
      return 'Open details';
    case 'iconTap':
      return TOGGLEABLE.has(domain) ? 'Toggle' : 'Open details';
    case 'hold':
      return 'Context menu';
    case 'doubleTap':
      return 'Do nothing';
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public component
// ─────────────────────────────────────────────────────────────────────────────

export interface ActionEditorProps {
  /** The current map (controlled). `{}` ⇒ every slot uses its domain default. */
  actions: ActionMap;
  /** Dominant domain of the tile/block — drives the "Default (…)" hint + toggle offer. */
  domain: string;
  /** Live entity snapshot — enumerates entity_id targets for the call-service builder. */
  states?: HassEntities;
  /** Emit the next map. An empty map ⇒ the caller stores `undefined` (absence = default). */
  onChange: (next: ActionMap) => void;
  /** Restrict which slots show (e.g. a chart card has no icon tap). Omit ⇒ all four. */
  slots?: (keyof ActionMap)[];
}

/**
 * The tap-action editor. Renders one collapsible row per interaction slot; an
 * unconfigured slot reads "Default (…)" and stores nothing. Selecting an action
 * reveals only its needed fields. Fully controlled — all state lives in `actions`.
 */
export function ActionEditor({ actions, domain, states, onChange, slots }: ActionEditorProps) {
  const visible = slots ? SLOTS.filter((s) => slots.includes(s.key)) : SLOTS;

  const setSlot = (key: keyof ActionMap, action: HassAction | undefined) => {
    const next: ActionMap = { ...actions };
    if (action === undefined) delete next[key];
    else next[key] = action;
    onChange(next);
  };

  return (
    <div className="simui-act">
      {visible.map(({ key, label, hint, icon }) => (
        <ActionSlot
          key={key}
          slotKey={key}
          label={label}
          hint={hint}
          icon={icon}
          value={actions[key]}
          domain={domain}
          states={states}
          onChange={(action) => setSlot(key, action)}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// One slot
// ─────────────────────────────────────────────────────────────────────────────

function ActionSlot({
  slotKey,
  label,
  hint,
  icon: Icon,
  value,
  domain,
  states,
  onChange,
}: {
  slotKey: keyof ActionMap;
  label: string;
  hint: string;
  icon: LucideIcon;
  value: HassAction | undefined;
  domain: string;
  states: HassEntities | undefined;
  onChange: (next: HassAction | undefined) => void;
}) {
  // A configured slot opens expanded so its fields are reachable in one glance; an
  // unconfigured slot stays collapsed (just the "Default" summary) to keep the rail terse.
  const configured = value !== undefined;
  const [open, setOpen] = useState(configured);
  const expanded = open || configured;

  const summary = configured ? kindLabel(value) : `Default · ${defaultLabel(slotKey, domain)}`;

  const setKind = (kind: string) => {
    if (kind === 'default') return onChange(undefined);
    onChange(freshAction(kind as HassAction['action']));
  };

  return (
    <div className={`simui-act-slot${configured ? ' is-set' : ''}`}>
      <button
        type="button"
        className="simui-act-head"
        aria-expanded={expanded}
        title={hint}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="simui-act-chev">
          {expanded ? <ChevronDown size={14} strokeWidth={2} /> : <ChevronRight size={14} strokeWidth={2} />}
        </span>
        <span className="simui-act-ic">
          <Icon size={14} strokeWidth={2} />
        </span>
        <span className="simui-act-head-text">
          <span className="simui-act-label">{label}</span>
          <span className="simui-act-summary" title={summary}>{summary}</span>
        </span>
        {configured && <span className="simui-act-dot" aria-hidden />}
      </button>

      {expanded && (
        <div className="simui-act-body">
          <select
            className="simui-insp-select"
            aria-label={`${label} action`}
            value={value?.action ?? 'default'}
            onChange={(e) => setKind(e.target.value)}
          >
            <option value="default">Default · {defaultLabel(slotKey, domain)}</option>
            {ACTION_KINDS.map((k) => (
              <option key={k.value} value={k.value}>{k.label}</option>
            ))}
          </select>

          {value?.action === 'navigate' && (
            <NavigateFields value={value} onChange={onChange} />
          )}
          {value?.action === 'url' && (
            <UrlField value={value} onChange={onChange} />
          )}
          {value?.action === 'call-service' && (
            <ServiceFields value={value} states={states} onChange={onChange} />
          )}
          {slotKey === 'hold' && !configured && (
            <p className="simui-act-note">Unset, a hold opens the context menu.</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Per-action detail fields (only the chosen action's fields render)
// ─────────────────────────────────────────────────────────────────────────────

function NavigateFields({
  value,
  onChange,
}: {
  value: Extract<HassAction, { action: 'navigate' }>;
  onChange: (next: HassAction) => void;
}) {
  return (
    <div className="simui-act-detail">
      <div className="simui-act-chips">
        {NAV_PRESETS.map((p) => (
          <button
            key={p.path}
            type="button"
            className={`simui-act-chip${value.path === p.path ? ' active' : ''}`}
            onClick={() => onChange({ action: 'navigate', path: p.path })}
          >
            {p.label}
          </button>
        ))}
      </div>
      <input
        className="simui-insp-input"
        placeholder="room/<id> · category/lights · home"
        value={value.path}
        onChange={(e) => onChange({ action: 'navigate', path: e.target.value })}
      />
    </div>
  );
}

function UrlField({
  value,
  onChange,
}: {
  value: Extract<HassAction, { action: 'url' }>;
  onChange: (next: HassAction) => void;
}) {
  return (
    <div className="simui-act-detail">
      <input
        className="simui-insp-input"
        type="url"
        placeholder="https://…  (opens in a new tab)"
        value={value.url}
        onChange={(e) => onChange({ action: 'url', url: e.target.value })}
      />
    </div>
  );
}

function ServiceFields({
  value,
  states,
  onChange,
}: {
  value: Extract<HassAction, { action: 'call-service' }>;
  states: HassEntities | undefined;
  onChange: (next: HassAction) => void;
}) {
  // The action's wire shape is { service: 'domain.service', target?, data? }. We edit
  // the human-friendly view: a service string, an optional entity_id target, and a
  // JSON data blob — re-assembling on every change so the stored shape never drifts.
  const target = value.target as { entity_id?: string | string[] } | undefined;
  const targetId = typeof target?.entity_id === 'string'
    ? target.entity_id
    : Array.isArray(target?.entity_id)
      ? target?.entity_id[0] ?? ''
      : '';

  const emit = (patch: Partial<{ service: string; targetId: string; data: object | undefined }>) => {
    const service = patch.service ?? value.service;
    const nextTargetId = patch.targetId !== undefined ? patch.targetId : targetId;
    const data = 'data' in patch ? patch.data : (value.data as object | undefined);
    const next: Extract<HassAction, { action: 'call-service' }> = { action: 'call-service', service };
    if (nextTargetId.trim()) next.target = { entity_id: nextTargetId.trim() };
    if (data && Object.keys(data).length) next.data = data;
    onChange(next);
  };

  const entityIds = useMemo(
    () => (states ? Object.keys(states).sort() : []),
    [states],
  );

  return (
    <div className="simui-act-detail">
      <input
        className="simui-insp-input"
        placeholder="domain.service — e.g. script.goodnight"
        value={value.service}
        onChange={(e) => emit({ service: e.target.value })}
      />

      <label className="simui-act-sublabel">Target entity (optional)</label>
      <input
        className="simui-insp-input"
        list={entityIds.length ? 'simui-act-entities' : undefined}
        placeholder="leave blank to act on this tile’s entity"
        value={targetId}
        onChange={(e) => emit({ targetId: e.target.value })}
      />
      {entityIds.length > 0 && (
        <datalist id="simui-act-entities">
          {entityIds.slice(0, 600).map((id) => (
            <option key={id} value={id} />
          ))}
        </datalist>
      )}

      <DataField data={value.data as object | undefined} onChange={(data) => emit({ data })} />
    </div>
  );
}

/** Free-form service data, edited as JSON with live validity feedback (no silent loss). */
function DataField({
  data,
  onChange,
}: {
  data: object | undefined;
  onChange: (next: object | undefined) => void;
}) {
  // Keep a local text buffer so a momentarily-invalid edit doesn't wipe the parsed data.
  const [text, setText] = useState(() => (data && Object.keys(data).length ? JSON.stringify(data, null, 0) : ''));
  const [error, setError] = useState<string | null>(null);

  const apply = (raw: string) => {
    setText(raw);
    const trimmed = raw.trim();
    if (!trimmed) {
      setError(null);
      onChange(undefined);
      return;
    }
    try {
      const parsed = JSON.parse(trimmed);
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        setError('Expected a JSON object');
        return;
      }
      setError(null);
      onChange(parsed as object);
    } catch {
      setError('Invalid JSON');
    }
  };

  return (
    <>
      <label className="simui-act-sublabel">Service data (JSON, optional)</label>
      <textarea
        className={`simui-insp-textarea${error ? ' has-error' : ''}`}
        spellCheck={false}
        placeholder={'{ "brightness_pct": 60 }'}
        value={text}
        onChange={(e) => apply(e.target.value)}
      />
      {error && <p className="simui-act-error">{error}</p>}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Build a fresh action of `kind` with empty editable fields. */
function freshAction(kind: HassAction['action']): HassAction {
  switch (kind) {
    case 'navigate':
      return { action: 'navigate', path: '' };
    case 'url':
      return { action: 'url', url: '' };
    case 'call-service':
      return { action: 'call-service', service: '' };
    case 'toggle':
      return { action: 'toggle' };
    case 'more-info':
      return { action: 'more-info' };
    case 'none':
      return { action: 'none' };
  }
}

/** One-line summary of a configured action for the collapsed slot header. */
function kindLabel(action: HassAction): string {
  switch (action.action) {
    case 'more-info':
      return 'Open details';
    case 'toggle':
      return 'Toggle';
    case 'navigate':
      return action.path ? `Navigate → ${action.path}` : 'Navigate';
    case 'url':
      return action.url ? `Open ${action.url}` : 'Open URL';
    case 'call-service':
      return action.service ? `Call ${action.service}` : 'Call service';
    case 'none':
      return 'Do nothing';
  }
}
