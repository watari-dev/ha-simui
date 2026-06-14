import { Chart } from '../../components/Chart';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import type { Block } from '../types';

/**
 * The history block (FRAMEWORK.md §5) — a TradingView-grade `lightweight-charts`
 * surface wrapped in a card (charts earn a card + wide span per §2/§5). Delegates
 * entirely to `<Chart>`; the block only carries the `chart` spec. Renders nothing
 * when no spec is present (a malformed/empty chart block degrades to silence).
 *
 * A multi-series chart (≥2 series) is the merged flow chart (e.g. Power's
 * generation + consumption) — it earns an always-on 24h/7d/30d range toggle in
 * its header. Single-series mini-charts stay toggle-free (they expand via a
 * sheet for range control).
 */
export function ChartBlock({ block }: { block: Block }) {
  if (!block.chart) return null;
  const isFlow = (block.chart.series?.length ?? 0) > 1;
  return (
    <div className="simui-surface card">
      <ErrorBoundary fallback={<div className="simui-chart-fallback">Chart unavailable</div>}>
        <Chart spec={block.chart} rangeToggle={isFlow} />
      </ErrorBoundary>
    </div>
  );
}
