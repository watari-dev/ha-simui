// Page-template / preset gallery — the "instant nice page" pillar.
//
// Public surface for the integrator:
//   TEMPLATES                — the built-in page templates (data)
//   getTemplate(id)          — look one up by id
//   TemplateGallery          — the picker modal (live mini-previews, onPick/onClose)
//   PageTemplate / TemplateContext / TemplateDensity — the data contracts
//   TemplateGalleryProps     — the picker's prop shape
//
// A template's `build(ctx)` returns a plain `BlockConfig[]` — exactly what the
// dashboard store's `createOverride` / `createHomeOverride` persist and what the
// editor store loads into `dirtyBlocks`. See the module's INTEGRATION notes for the
// "Start from a template" affordance + the persist path.

export {
  TEMPLATES,
  getTemplate,
  type PageTemplate,
  type TemplateContext,
  type TemplateDensity,
} from './templates';

export {
  TemplateGallery,
  type TemplateGalleryProps,
} from './TemplateGallery';
