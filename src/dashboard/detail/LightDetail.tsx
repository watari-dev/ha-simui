import { BloomStudio } from '../../components/BloomStudio';
import { useCallService } from '../../hass/context';
import type { HassEntity } from '../../types';
import { prettyState } from '../../util';
import { AttrList } from './AttrList';

/**
 * Light "more-info": the full BloomStudio (ColorWheel + warm↔cool ribbon + a tall
 * brightness fill — reused, never duplicated) plus an effect picker when the bulb
 * reports an effect list, and a quiet colour-mode read-out. The studio already
 * owns brightness / temp / colour, so the attribute fallback omits those to avoid
 * repeating the same numbers twice.
 */

const STUDIO_OWNED = [
  'brightness',
  'color_temp',
  'color_temp_kelvin',
  'min_color_temp_kelvin',
  'max_color_temp_kelvin',
  'hs_color',
  'rgb_color',
  'rgbw_color',
  'rgbww_color',
  'xy_color',
  'supported_color_modes',
];

export function LightDetail({ entity }: { entity: HassEntity }) {
  const callService = useCallService();
  const id = entity.entity_id;
  const a = entity.attributes;
  const effects = (a.effect_list as string[] | undefined) ?? [];
  const curEffect = a.effect as string | undefined;
  const colorMode = a.color_mode as string | undefined;

  return (
    <div className="simui-detail">
      <div className="simui-detail-widget">
        <BloomStudio entityId={id} />
      </div>

      {colorMode && (
        <div className="simui-detail-pillrow">
          <span className="simui-detail-pilllabel">Colour mode</span>
          <span className="simui-detail-pillval num">{prettyState(colorMode)}</span>
        </div>
      )}

      {effects.length > 0 && (
        <div className="simui-detail-field">
          <span className="simui-qc-label">Effect</span>
          <div className="simui-seg simui-detail-seg" role="group" aria-label="Effect">
            {effects.map((fx) => {
              const active = curEffect === fx;
              return (
                <button
                  key={fx}
                  className={`simui-segbtn${active ? ' is-active' : ''}`}
                  aria-pressed={active}
                  onClick={() => void callService('light', 'turn_on', { effect: fx }, { entity_id: id })}
                >
                  {prettyState(fx)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <AttrList entity={entity} omit={[...STUDIO_OWNED, 'effect', 'effect_list', 'color_mode']} />
    </div>
  );
}
