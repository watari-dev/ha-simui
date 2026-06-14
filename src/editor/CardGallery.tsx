import { useId, useMemo, useState, type DragEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Search, X } from 'lucide-react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { BlockBody } from '../dashboard/BlockChrome';
import { iconNode } from '../components/icons';
import type { CardGalleryProps, CardKind, BlockConfig, PreviewContext } from './types';
import './CardGallery.css';

/**
 * CardGallery — the "add a card" catalogue (SPEC_EDITOR §gallery / §4). Lovelace's
 * weakest point, done right: every add-able block/card kind is a thumbnail whose
 * preview is the ACTUAL block renderer (`BlockBody`) fed a small sample of the
 * user's OWN entities — so you see what you'll actually get, not a generic stub.
 *
 * Controlled + decoupled (CardGalleryProps): the parent supplies the filtered
 * `kinds` and a `PreviewContext` (states + sample/resolve), and handles the result
 * via `onPick` (click-to-add) / `onBeginPlace` (drag-to-place). The gallery owns
 * no store state — only its local search box (and only when the parent doesn't
 * control `query`).
 *
 * Hosts its own modal shell (a Sheet-style portal: dim backdrop, Esc/backdrop to
 * close, focus on the search field). Minimal motion — it appears, it doesn't
 * perform (DESIGN_PRINCIPLES §14).
 */
export function CardGallery({
  kinds,
  preview,
  onPick,
  onBeginPlace,
  query,
  onQueryChange,
  onClose,
}: CardGalleryProps) {
  // Controlled query when the parent drives it; otherwise local. Either way the
  // input stays responsive and the previews never re-sample on a keystroke.
  const [localQuery, setLocalQuery] = useState('');
  const q = query ?? localQuery;
  const setQuery = onQueryChange ?? setLocalQuery;
  const labelId = useId();

  const needle = q.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!needle) return kinds;
    return kinds.filter(
      (k) =>
        k.label.toLowerCase().includes(needle) ||
        k.description.toLowerCase().includes(needle) ||
        k.id.toLowerCase().includes(needle) ||
        k.type.toLowerCase().includes(needle),
    );
  }, [kinds, needle]);

  return createPortal(
    <div className="simui-overlay simui-gallery-backdrop" onClick={onClose}>
      <div
        className="simui-gallery"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="simui-gallery-head">
          <div className="simui-gallery-search">
            <Search size={15} className="simui-gallery-search-ic" aria-hidden />
            <input
              autoFocus
              className="simui-gallery-input"
              placeholder="Add a card — search Group, Chart, Live list…"
              value={q}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search card types"
            />
          </div>
          <span id={labelId} className="simui-gallery-title-sr">Add a card</span>
          <button className="simui-iconbtn-h" onClick={onClose} aria-label="Close gallery">
            <X size={16} />
          </button>
        </header>

        <div className="simui-gallery-grid" role="list">
          {filtered.map((kind) => (
            <GalleryCard
              key={kind.id}
              kind={kind}
              preview={preview}
              onPick={onPick}
              onBeginPlace={onBeginPlace}
            />
          ))}
          {filtered.length === 0 && (
            <div className="simui-gallery-empty">
              {kinds.length === 0
                ? 'No card types available for this surface.'
                : `No card types match “${q}”.`}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/**
 * One catalogue entry: a live preview (the real block, scaled, non-interactive)
 * over a label + one-line description. Click adds it; drag begins placement when
 * the parent supports it. The seed is sampled ONCE (memoised on the kind) so the
 * preview is stable across re-renders / searches — a 6,000-entity home never
 * re-samples or re-renders the wall on a keystroke (DESIGN_PRINCIPLES §13).
 */
function GalleryCard({
  kind,
  preview,
  onPick,
  onBeginPlace,
}: {
  kind: CardKind;
  preview: PreviewContext;
  onPick: (kind: CardKind) => void;
  onBeginPlace?: (kind: CardKind) => void;
}) {
  // Build a populated block from a small, fixed sample of the user's entities.
  // Memo so the preview is rendered from a stable BlockConfig — no churn.
  const previewBlock = useMemo<BlockConfig>(
    () => kind.make(sampleFor(kind, preview)),
    // `preview` identity is stable for the gallery's lifetime (built once by the
    // host from useAllStates); resampling only on a new kind is intentional.
    [kind, preview],
  );

  const populated = (previewBlock.entityIds?.length ?? 0) > 0;
  const draggable = Boolean(onBeginPlace);

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    onBeginPlace?.(kind);
    // A lightweight payload so a native drop target (the surface) can identify the
    // kind; the editor's dnd layer is the source of truth, this is just a hint.
    try {
      e.dataTransfer.setData('application/x-simui-card', kind.id);
      e.dataTransfer.effectAllowed = 'copy';
    } catch {
      /* dataTransfer may be unavailable in some test envs — placement still begins */
    }
  };

  // NB: the card is a role="button" DIV, not a real <button> — its live preview is
  // the real BlockBody, which contains its own <button>s (tile controls). Nesting a
  // button inside a button is invalid HTML, so we use a focusable div with explicit
  // keyboard handling instead. The preview layer is inert (pointer-events:none), so
  // those inner controls never receive events.
  return (
    <div
      role="listitem"
      className="simui-gallery-card"
      tabIndex={0}
      draggable={draggable}
      onDragStart={draggable ? onDragStart : undefined}
      onClick={() => onPick(kind)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPick(kind);
        }
      }}
      aria-label={`Add ${kind.label} — ${kind.description}`}
    >
      <div className="simui-gallery-preview" aria-hidden>
        <div className="simui-gallery-preview-scale">
          {populated ? (
            <ErrorBoundary fallback={<PreviewFallback kind={kind} />}>
              {/* The REAL renderer — one code path for preview and for real. It is
                  inert here: the whole layer is pointer-events:none. */}
              <BlockBody block={previewBlock} />
            </ErrorBoundary>
          ) : (
            <PreviewFallback kind={kind} empty />
          )}
        </div>
      </div>
      <div className="simui-gallery-meta">
        <span className="simui-gallery-card-ic" aria-hidden>{iconNode(kind.icon, 14)}</span>
        <span className="simui-gallery-card-label">{kind.label}</span>
        <span className="simui-gallery-card-desc">{kind.description}</span>
      </div>
    </div>
  );
}

/**
 * Shown when there's nothing to preview (no matching entity on this surface) or a
 * preview throws — a quiet, on-brand placeholder so the card still reads, honoring
 * graceful degradation (DESIGN_PRINCIPLES §12). Never an error spew.
 */
function PreviewFallback({ kind, empty }: { kind: CardKind; empty?: boolean }): ReactNode {
  return (
    <div className="simui-gallery-preview-stub">
      <span className="simui-gallery-stub-ic">{iconNode(kind.icon, 22)}</span>
      <span className="simui-gallery-stub-label">
        {empty ? 'Add entities after dropping' : kind.label}
      </span>
    </div>
  );
}

/**
 * Pick the seed entities for a kind's preview. Honors `CardKind.domains` (so a
 * Chart samples a numeric sensor, a Group samples lights, etc.); a chart/card wants
 * exactly one series, a group/list a few. Falls back to any entity so every card
 * shows *something* live. Kept small + fixed per §4 (perf).
 */
function sampleFor(kind: CardKind, preview: PreviewContext): string[] {
  const n = previewSampleSize(kind.type);
  const domains = kind.domains;
  const picked = preview.sample(n, domains);
  if (picked.length > 0) return picked;
  // Domain-filtered sample came up empty on this surface — fall back to anything,
  // so the preview is still built from the user's real entities, not a stub.
  return domains ? preview.sample(n) : picked;
}

/** How many leaves a preview of this block type should show (small + fixed). */
function previewSampleSize(type: CardKind['type']): number {
  switch (type) {
    case 'chart':
    case 'hero':
    case 'card':
      return 1;
    case 'list':
    case 'group':
    case 'attention':
      return 3;
    default:
      return 3;
  }
}
