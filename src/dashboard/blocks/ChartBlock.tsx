import { Chart } from '../../components/Chart';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import type { Block } from '../types';

/**
 * The history block (FRAMEWORK.md §5) — a TradingView-grade `lightweight-charts`
 * surface wrapped in a card (charts earn a card + wide span per §2/§5). Delegates
 * entirely to `<Chart>`; the block only carries the `chart` spec. Renders nothing
 * when no spec is present (a malformed/empty chart block degrades to silence).
 */
export function ChartBlock({ block }: { block: Block }) {
  if (!block.chart) return null;
  return (
    <div className="simui-surface card">
      <ErrorBoundary fallback={<div className="simui-chart-fallback">Chart unavailable</div>}>
        <Chart spec={block.chart} />
      </ErrorBoundary>
    </div>
  );
}
