import { useId, useMemo, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
  LayoutGrid,
  LayoutTemplate,
  Layers,
  Minus,
  Search,
  Tablet,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { BlockBody } from '../../dashboard/BlockChrome';
import type { BlockConfig } from '../types';
import type { HassEntities } from '../../types';
import { TEMPLATES, type PageTemplate, type TemplateContext, type TemplateDensity } from './templates';
import './TemplateGallery.css';

/**
 * The template-header glyphs. The shared `iconNode` whitelist (components/icons)
 * doesn't carry these page-shape icons, so the gallery resolves them locally from
 * lucide-react (the same package CardGallery imports directly). Unknown ⇒ a neutral
 * page icon, never a crash.
 */
const TEMPLATE_ICONS: Record<string, LucideIcon> = {
  minus: Minus,
  'layout-dashboard': LayoutTemplate,
  users: Users,
  tablet: Tablet,
  'layout-grid': LayoutGrid,
  layers: Layers,
};

function templateIcon(name: string, size: number): ReactNode {
  const Icon = TEMPLATE_ICONS[name] ?? LayoutTemplate;
  return <Icon size={size} strokeWidth={2} />;
}

/**
 * TemplateGallery — the "start from a template" picker (PRESETS.md, CLAUDE.md). The
 * onboarding twin of `CardGallery`: instead of adding ONE card, the user picks a
 * pre-composed PAGE and the surface is seeded from their own real entities, then
 * edited. Each tile shows a tiny LIVE mini-preview built with the SAME renderer the
 * surface uses (`BlockBody`), scaled down — so the user sees the actual page they'll
 * get, not a generic mock (same trick as CardGallery's per-card preview).
 *
 * Controlled + decoupled: the parent supplies a live `states` snapshot (and optional
 * `areaOf`) and handles the result via `onPick(template)`. The gallery owns no store
 * state — only its local search box. Dark, Linear-restraint, minimal motion: it
 * appears, it doesn't perform (DESIGN_PRINCIPLES §14).
 */
export interface TemplateGalleryProps {
  /** Live entity snapshot — every preview + the chosen build run against this. */
  states: HassEntities;
  /** entityId → area/room label, when a real registry is available (optional). */
  areaOf?: (entityId: string) => string | undefined;
  /** The templates to offer. Defaults to the built-in `TEMPLATES`. */
  templates?: PageTemplate[];
  /** Choose a template — the parent persists `template.build(ctx)` onto the surface. */
  onPick: (template: PageTemplate) => void;
  /** Dismiss the gallery. */
  onClose: () => void;
}

const DENSITY_LABEL: Record<TemplateDensity, string> = {
  minimal: 'Minimal',
  standard: 'Standard',
  dense: 'Dense',
};

export function TemplateGallery({
  states,
  areaOf,
  templates = TEMPLATES,
  onPick,
  onClose,
}: TemplateGalleryProps) {
  const [query, setQuery] = useState('');
  const labelId = useId();

  // Build the preview context ONCE per states identity, so previews don't re-build
  // on a keystroke (a large home composes each template only on first paint).
  const idSig = useMemo(() => Object.keys(states).sort().join(','), [states]);
  const ctx = useMemo<TemplateContext>(() => ({ states, areaOf }), [idSig, areaOf]); // eslint-disable-line react-hooks/exhaustive-deps

  const needle = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!needle) return templates;
    return templates.filter(
      (t) =>
        t.name.toLowerCase().includes(needle) ||
        t.description.toLowerCase().includes(needle) ||
        t.id.toLowerCase().includes(needle) ||
        DENSITY_LABEL[t.density].toLowerCase().includes(needle),
    );
  }, [templates, needle]);

  return createPortal(
    <div className="simui-root simui-tmpl-backdrop" onClick={onClose}>
      <div
        className="simui-tmpl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="simui-tmpl-head">
          <div className="simui-tmpl-titlewrap">
            <span id={labelId} className="simui-tmpl-title">Start from a template</span>
            <span className="simui-tmpl-subtitle">A whole page, laid out with your devices. Edit anything after.</span>
          </div>
          <div className="simui-tmpl-search">
            <Search size={15} className="simui-tmpl-search-ic" aria-hidden />
            <input
              className="simui-tmpl-input"
              placeholder="Search templates…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search page templates"
            />
          </div>
          <button className="simui-iconbtn-h" onClick={onClose} aria-label="Close templates">
            <X size={16} />
          </button>
        </header>

        <div className="simui-tmpl-grid" role="list">
          {filtered.map((template) => (
            <TemplateCard key={template.id} template={template} ctx={ctx} onPick={onPick} />
          ))}
          {filtered.length === 0 && (
            <div className="simui-tmpl-empty">No templates match “{query}”.</div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/**
 * One template tile: a stacked mini-preview of the composed page (the real blocks,
 * scaled + inert) over name / density badge / description. The page is built ONCE
 * (memoised on the template + ctx) so the wall never re-composes on a search
 * keystroke — a 6,000-entity home stays smooth (DESIGN_PRINCIPLES §13).
 */
function TemplateCard({
  template,
  ctx,
  onPick,
}: {
  template: PageTemplate;
  ctx: TemplateContext;
  onPick: (template: PageTemplate) => void;
}) {
  const blocks = useMemo<BlockConfig[]>(() => {
    try {
      return template.build(ctx);
    } catch {
      return [];
    }
  }, [template, ctx]);

  // Preview only the first few blocks — enough to read the page's shape without
  // composing the whole wall in a thumbnail.
  const previewBlocks = blocks.slice(0, 4);
  const populated = previewBlocks.length > 0;

  return (
    <button
      type="button"
      role="listitem"
      className="simui-tmpl-card"
      onClick={() => onPick(template)}
      aria-label={`Use the ${template.name} template — ${template.description}`}
    >
      <div className="simui-tmpl-preview" aria-hidden>
        <div className="simui-tmpl-preview-scale">
          {populated ? (
            <ErrorBoundary fallback={<PreviewFallback template={template} />}>
              {previewBlocks.map((block) => (
                <div key={block.id} className="simui-tmpl-preview-block">
                  <BlockBody block={block} />
                </div>
              ))}
            </ErrorBoundary>
          ) : (
            <PreviewFallback template={template} empty />
          )}
        </div>
        <span className={`simui-tmpl-badge density-${template.density}`}>
          {DENSITY_LABEL[template.density]}
        </span>
      </div>
      <div className="simui-tmpl-meta">
        <span className="simui-tmpl-card-ic" aria-hidden>{templateIcon(template.icon, 15)}</span>
        <span className="simui-tmpl-card-name">{template.name}</span>
        <span className="simui-tmpl-card-count">
          {blocks.length} {blocks.length === 1 ? 'block' : 'blocks'}
        </span>
        <span className="simui-tmpl-card-desc">{template.description}</span>
      </div>
    </button>
  );
}

/** Quiet, on-brand placeholder when there's nothing to preview or a build/render throws. */
function PreviewFallback({ template, empty }: { template: PageTemplate; empty?: boolean }): ReactNode {
  return (
    <div className="simui-tmpl-preview-stub">
      <span className="simui-tmpl-stub-ic">{templateIcon(template.icon, 24)}</span>
      <span className="simui-tmpl-stub-label">
        {empty ? 'Few entities — fills out as you add devices' : template.name}
      </span>
    </div>
  );
}
