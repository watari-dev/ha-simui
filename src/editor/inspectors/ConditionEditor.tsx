// ConditionEditor — build a `Condition` for conditional surfacing (Inspector
// enrichment module). A block (or status pill) mounts only while this holds, then
// unmounts — "hide noise until it's signal" (FRAMEWORK.md §3 / Condition).
//
// CONTROLLED + store-free: takes the current `Condition | undefined` plus a live
// states snapshot (for the entity picker + a live "matches now?" readout) and emits
// the next Condition, or `undefined` to clear it (always-visible default). A
// Condition needs at least an `entity`; clearing the entity clears the whole gate.

import { useMemo, useState } from 'react';
import './ConditionEditor.css';
import { Check, Minus, Search, X } from 'lucide-react';
import { SubField, SubSegmented } from './controls';
import type { Condition } from '../types';
import type { HassEntities } from '../../types';

function domainOf(entityId: string): string {
  return entityId.split('.')[0] ?? '';
}
function friendlyOf(states: HassEntities, entityId: string): string {
  return (states[entityId]?.attributes.friendly_name as string | undefined) || entityId;
}

type Comparator = 'state' | 'above' | 'below';

export interface ConditionEditorProps {
  condition: Condition | undefined;
  states: HassEntities;
  onChange: (next: Condition | undefined) => void;
}

export function ConditionEditor({ condition, states, onChange }: ConditionEditorProps) {
  const entity = condition?.entity ?? '';
  const comparator: Comparator =
    condition?.above != null ? 'above' : condition?.below != null ? 'below' : 'state';

  const live = useMemo(() => matchNow(condition, states), [condition, states]);

  const setEntity = (id: string) => {
    if (!id) return onChange(undefined);
    // Keep whichever comparator the user had; default to a state match.
    onChange({ entity: id, ...comparatorPatch(comparator, condition) });
  };

  const setComparator = (c: Comparator) => {
    if (!entity) return;
    onChange({ entity, ...comparatorPatch(c, condition) });
  };

  const setState = (s: string) => {
    if (!entity) return;
    onChange({ entity, state: s || undefined });
  };
  const setBound = (key: 'above' | 'below', raw: string) => {
    if (!entity) return;
    const n = Number(raw);
    if (raw.trim() === '' || Number.isNaN(n)) {
      // Clearing the bound leaves a bare entity gate (visible whenever it exists).
      const { [key]: _drop, ...rest } = condition ?? { entity };
      void _drop;
      onChange({ ...rest, entity });
    } else {
      onChange({ entity, [key]: n });
    }
  };

  return (
    <div className="simui-isub-cond">
      <SubField label="Show only when">
        <EntityField
          value={entity}
          states={states}
          onChange={setEntity}
        />
      </SubField>

      {entity && (
        <>
          <SubField label="Condition">
            <SubSegmented
              options={[
                { value: 'state' as const, label: 'Is' },
                { value: 'above' as const, label: 'Above' },
                { value: 'below' as const, label: 'Below' },
              ]}
              value={comparator}
              onChange={setComparator}
            />
          </SubField>

          {comparator === 'state' && (
            <SubField label="State equals" hint={liveStateOf(states, entity)}>
              <input
                className="simui-isub-input"
                placeholder="e.g. on · home · armed_away"
                value={typeof condition?.state === 'string' ? condition.state : ''}
                onChange={(e) => setState(e.target.value)}
              />
            </SubField>
          )}
          {comparator === 'above' && (
            <SubField label="Greater than" hint={liveStateOf(states, entity)}>
              <input
                className="simui-isub-input num"
                type="number"
                placeholder="0"
                value={condition?.above ?? ''}
                onChange={(e) => setBound('above', e.target.value)}
              />
            </SubField>
          )}
          {comparator === 'below' && (
            <SubField label="Less than" hint={liveStateOf(states, entity)}>
              <input
                className="simui-isub-input num"
                type="number"
                placeholder="0"
                value={condition?.below ?? ''}
                onChange={(e) => setBound('below', e.target.value)}
              />
            </SubField>
          )}

          <div className={`simui-isub-cond-now${live ? ' on' : ''}`}>
            {live ? <Check size={13} strokeWidth={2.5} /> : <Minus size={13} strokeWidth={2.5} />}
            {live ? 'Visible right now' : 'Hidden right now'}
          </div>
        </>
      )}

      <p className="simui-isub-hint" style={{ marginTop: entity ? 12 : 8 }}>
        {entity
          ? 'This card appears only while the condition holds, then quietly unmounts.'
          : 'Leave empty to always show this card.'}
      </p>
    </div>
  );
}

// ── inline entity field with a small live-search dropdown ──────────────────────

function EntityField({
  value,
  states,
  onChange,
}: {
  value: string;
  states: HassEntities;
  onChange: (id: string) => void;
}) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return Object.values(states)
      .filter(
        (e) =>
          e.entity_id.toLowerCase().includes(query) ||
          ((e.attributes.friendly_name as string | undefined) ?? '').toLowerCase().includes(query),
      )
      .slice(0, 7);
  }, [q, states]);

  if (value) {
    return (
      <div className="simui-isub-cond-chip">
        <span className="simui-isub-cond-chip-dom">{domainOf(value)}</span>
        <div className="simui-isub-cond-chip-text">
          <span className="simui-isub-cond-chip-name">{friendlyOf(states, value)}</span>
          <span className="simui-isub-cond-chip-id">{value}</span>
        </div>
        <button
          type="button"
          className="simui-isub-cond-chip-x"
          aria-label="Clear condition entity"
          onClick={() => {
            onChange('');
            setQ('');
          }}
        >
          <X size={14} strokeWidth={2} />
        </button>
      </div>
    );
  }

  return (
    <div className="simui-isub-cond-search">
      <div className="simui-isub-cond-searchwrap">
        <Search size={14} strokeWidth={2} className="simui-isub-cond-searchglyph" />
        <input
          className="simui-isub-input"
          style={{ paddingLeft: 30 }}
          placeholder="Pick a gate entity…"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
      </div>
      {open && matches.length > 0 && (
        <div className="simui-isub-cond-results">
          {matches.map((e) => (
            <button
              key={e.entity_id}
              type="button"
              className="simui-isub-cond-result"
              onClick={() => {
                onChange(e.entity_id);
                setQ('');
                setOpen(false);
              }}
            >
              <div className="simui-isub-cond-chip-text">
                <span className="simui-isub-cond-chip-name">
                  {(e.attributes.friendly_name as string | undefined) ?? e.entity_id}
                </span>
                <span className="simui-isub-cond-chip-id">{e.entity_id}</span>
              </div>
              <span className="simui-isub-cond-result-state">{e.state}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── helpers ────────────────────────────────────────────────────────────────

/** Carry forward / build the comparator-specific fields when switching comparator. */
function comparatorPatch(
  c: Comparator,
  prev: Condition | undefined,
): Partial<Condition> {
  if (c === 'above') return { above: prev?.above ?? 0 };
  if (c === 'below') return { below: prev?.below ?? 0 };
  return { state: prev?.state };
}

/** Live "is this gate satisfied right now?" — mirrors BlockChrome's matchCondition. */
function matchNow(cond: Condition | undefined, states: HassEntities): boolean {
  if (!cond?.entity) return true;
  const e = states[cond.entity];
  const state = e?.state;
  const num = Number(state);
  if (cond.state != null) {
    const want = Array.isArray(cond.state) ? cond.state : [cond.state];
    if (state == null || !want.includes(state)) return false;
  }
  if (cond.above != null && !(num > cond.above)) return false;
  if (cond.below != null && !(num < cond.below)) return false;
  return true;
}

function liveStateOf(states: HassEntities, entityId: string): string {
  const e = states[entityId];
  if (!e) return '';
  const unit = e.attributes.unit_of_measurement as string | undefined;
  return `now: ${e.state}${unit ? ` ${unit}` : ''}`;
}
