import { createRoot, type Root } from 'react-dom/client';
import { App } from './App';
import { HassProvider } from './hass/context';
import type { Hass } from './types';
import styleText from './styles.css?inline';

// The HA-injected `hass` object already exposes `states` and `callService`.
// We wrap it so the React tree only ever depends on our minimal `Hass` shape.
function adapt(hass: HassLike): Hass {
  return {
    states: hass.states,
    connection: hass.connection,
    callService: (domain, service, serviceData, target) =>
      hass.callService(domain, service, serviceData, target),
  };
}

interface HassLike {
  states: Hass['states'];
  connection?: Hass['connection'];
  callService: Hass['callService'];
}

/**
 * <simui-panel> — the custom element Home Assistant mounts as a full-screen panel.
 * Its only job is to host a React root and feed it the latest `hass` object.
 */
class SimUiPanel extends HTMLElement {
  private _root?: Root;
  private _mount?: HTMLDivElement;
  private _hass?: HassLike;

  set hass(value: HassLike) {
    this._hass = value;
    this._render();
  }
  get hass(): HassLike | undefined {
    return this._hass;
  }

  // Accepted but currently unused — declared so HA's property writes don't warn.
  set narrow(_value: boolean) {}
  set route(_value: unknown) {}
  set panel(_value: unknown) {}

  connectedCallback(): void {
    if (!this._mount) {
      const style = document.createElement('style');
      style.textContent = styleText;
      this.appendChild(style);

      this._mount = document.createElement('div');
      this._mount.className = 'simui-root';
      this.appendChild(this._mount);

      this._root = createRoot(this._mount);
    }
    this._render();
  }

  disconnectedCallback(): void {
    this._root?.unmount();
    this._root = undefined;
    this._mount = undefined;
  }

  private _render(): void {
    if (!this._root || !this._hass) return;
    this._root.render(
      <HassProvider hass={adapt(this._hass)}>
        <App />
      </HassProvider>,
    );
  }
}

if (!customElements.get('simui-panel')) {
  customElements.define('simui-panel', SimUiPanel);
}
