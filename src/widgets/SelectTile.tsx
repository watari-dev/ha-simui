import type { ChangeEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import { Tile } from '../components/Tile';
import { useCallService } from '../hass/context';
import { useTapHandler } from '../runtime';
import type { WidgetProps } from '../types';
import { domainOf, friendly, prettyState } from '../util';
import './InputTile.css';

/**
 * select / input_select — an inline option chooser. A short option set (≤ 4)
 * renders as a segmented control (reusing `.simui-seg`); a longer list collapses
 * to the themed dropdown (`.simui-fsel`). Both call `<domain>.select_option`.
 */
export function SelectTile({ entity, actions }: WidgetProps) {
  const callService = useCallService();
  // Body tap honors an authored `tap`; display-only by default (option chooser
  // lives in the inner segmented control / dropdown), so no fallback ⇒ inert.
  const onTap = useTapHandler(entity.entity_id, actions, undefined);
  const domain = domainOf(entity.entity_id); // 'select' | 'input_select'
  const dead = entity.state === 'unavailable' || entity.state === 'unknown';
  const name = friendly(entity);

  const options = (entity.attributes.options as string[] | undefined) ?? [];
  const current = entity.state;

  if (dead || options.length === 0) {
    return (
      <Tile className="is-unavailable simui-input">
        <div className="simui-row">
          <span className="simui-name" title={name}>{name}</span>
          <span className="simui-spacer" />
          <span className="simui-value">{dead ? 'Unavailable' : prettyState(current)}</span>
        </div>
      </Tile>
    );
  }

  const select = (option: string) =>
    void callService(domain, 'select_option', { option }, { entity_id: entity.entity_id });

  // A compact set reads + taps best as a segmented control; a long list collapses
  // to the dropdown to stay dense.
  const segmented = options.length <= 4 && options.every((o) => o.length <= 12);

  return (
    <Tile className="simui-input" onClick={onTap}>
      <div className="simui-row">
        <span className="simui-name" title={name}>{name}</span>
        {!segmented && (
          <>
            <span className="simui-spacer" />
            <span className="simui-value">{prettyState(current)}</span>
          </>
        )}
      </div>
      {segmented ? (
        <div className="simui-seg simui-input-seg" role="group" aria-label={name}>
          {options.map((opt) => {
            const active = opt === current;
            return (
              <button
                key={opt}
                className={`simui-segbtn${active ? ' is-active' : ''}`}
                aria-pressed={active}
                title={prettyState(opt)}
                onClick={() => select(opt)}
              >
                {prettyState(opt)}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="simui-feats">
          <div className="simui-fsel-wrap simui-input-fsel">
            <select
              className="simui-fsel"
              aria-label={name}
              value={current}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => select(e.target.value)}
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>{prettyState(opt)}</option>
              ))}
            </select>
            <ChevronDown className="simui-fsel-caret" size={13} strokeWidth={2} />
          </div>
        </div>
      )}
    </Tile>
  );
}
