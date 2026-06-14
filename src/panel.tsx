import { createRoot, type Root } from 'react-dom/client';
import { App } from './App';
import { HassProvider } from './hass/context';
import type { HassSource } from './types';
import styleText from './styles.css?inline';

interface InjectedHass {
  states: HassSource['getStates'] extends () => infer S ? S : never;
  callService: HassSource['callService'];
  connection?: HassSource['connection'];
}

/**
 * <simui-panel> — the custom element HA mounts. HA pushes a fresh `hass` object
 * into the property on every state change; instead of re-rendering the React
 * root each time, we expose a STABLE HassSource and just notify subscribers, so
 * per-entity components update surgically (no full-tree repaint = no lag).
 */
class SimUiPanel extends HTMLElement {
  private _root?: Root;
  private _mount?: HTMLDivElement;
  private _hass: InjectedHass | undefined;
  private _listeners = new Set<() => void>();
  private _source?: HassSource;
  private _narrow = false;

  set hass(value: InjectedHass) {
    this._hass = value;
    this._listeners.forEach((l) => l());
  }
  get hass(): InjectedHass | undefined {
    return this._hass;
  }

  // HA sets `narrow` whenever the layout is phone-width / the sidebar is docked.
  // Reflect it onto the mount as `data-ha-narrow` so CSS can force the compact
  // layout even when the viewport (what @media sees) is wider than the panel.
  set narrow(value: boolean) {
    this._narrow = value;
    this._mount?.setAttribute('data-ha-narrow', value ? 'true' : 'false');
  }
  // simUI owns its own in-panel routing via the location hash (see dashboard/store),
  // which survives reload + Back without depending on HA's path-based route prop.
  set route(_value: unknown) {}
  set panel(_value: unknown) {}

  connectedCallback(): void {
    if (!this._source) {
      const self = this;
      this._source = {
        subscribe(listener) {
          self._listeners.add(listener);
          return () => self._listeners.delete(listener);
        },
        getStates: () => (self._hass ? self._hass.states : {}),
        callService: (domain, service, data, target) => self._hass!.callService(domain, service, data, target),
        get connection() {
          return self._hass ? self._hass.connection : undefined;
        },
      } as HassSource;
    }
    if (!this._mount) {
      const style = document.createElement('style');
      style.textContent = styleText;
      this.appendChild(style);
      this._mount = document.createElement('div');
      this._mount.className = 'simui-root';
      this._mount.setAttribute('data-ha-narrow', this._narrow ? 'true' : 'false');
      this.appendChild(this._mount);
      this._root = createRoot(this._mount);
      // rendered ONCE; updates flow through the source's subscribers
      this._root.render(
        <HassProvider source={this._source}>
          <App />
        </HassProvider>,
      );
    }
  }

  disconnectedCallback(): void {
    this._root?.unmount();
    this._root = undefined;
    this._mount = undefined;
  }
}

if (!customElements.get('simui-panel')) {
  customElements.define('simui-panel', SimUiPanel);
}
