import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Custom fallback shown when a child throws. Overrides the built-in notices. */
  fallback?: ReactNode;
  /**
   * Render a hairline inline "unavailable" notice instead of a blank/null
   * fallback — for wrapping a single surface so it degrades in place rather
   * than blanking the whole panel.
   */
  compact?: boolean;
  /** Optional label woven into the compact notice (e.g. the surface name). */
  label?: string;
  /**
   * When this value changes, a caught error is cleared and children re-render.
   * Pass a route-derived key so navigating away from a throwing surface recovers.
   */
  resetKey?: unknown;
}

/**
 * An error boundary so a throwing child (e.g. the imperative lightweight-charts
 * `<Chart>`, or one bad widget) can never blank its surface — the failure is
 * contained to a quiet fallback instead of propagating up the tree.
 *
 * Resets on two signals: when its children change (new spec/data) so a recovered
 * chart re-renders, and when `resetKey` changes (route change) so leaving a
 * throwing surface clears the error.
 */
export class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  // The boundary IS the handling — swallow rather than spew console noise.
  componentDidCatch(_error: Error, _info: ErrorInfo): void {}

  componentDidUpdate(prev: Props): void {
    if (this.state.failed && (prev.children !== this.props.children || prev.resetKey !== this.props.resetKey)) {
      this.setState({ failed: false });
    }
  }

  render(): ReactNode {
    if (this.state.failed) {
      if (this.props.fallback !== undefined) return this.props.fallback;
      if (this.props.compact) {
        return (
          <div className="simui-eb-compact" role="status">
            {this.props.label ? `${this.props.label} unavailable` : 'Unavailable'}
          </div>
        );
      }
      return (
        <div className="simui-eb-full" role="alert">
          <div className="simui-eb-title">Something went wrong</div>
          <div className="simui-eb-body">A part of the panel failed to render. Navigate away and back, or reload to recover.</div>
        </div>
      );
    }
    return this.props.children;
  }
}
