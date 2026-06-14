import { Component, type ErrorInfo, type ReactNode } from 'react';

/**
 * A minimal error boundary so an imperative child (e.g. the lightweight-charts
 * `<Chart>`) can never blank its surface — a transient mount/resize race is
 * contained to a quiet fallback instead of propagating up the tree. Resets when
 * its children change (new spec/data) so a recovered chart re-renders.
 */
export class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  // The boundary IS the handling — swallow rather than spew console noise.
  componentDidCatch(_error: Error, _info: ErrorInfo): void {}

  componentDidUpdate(prev: { children: ReactNode }): void {
    if (this.state.failed && prev.children !== this.props.children) {
      this.setState({ failed: false });
    }
  }

  render(): ReactNode {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
