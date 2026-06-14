import { createContext, useContext, useState, type ReactNode } from 'react';

/**
 * Where body-level overlays portal to.
 *
 * Sheet / ContextMenu / CardGallery / TemplateGallery used to `createPortal(…,
 * document.body)`. That works in standalone dev (the stylesheet is global) but is
 * BROKEN when embedded in Home Assistant: there, the panel's injected `<style>` only
 * covers the panel's own DOM subtree, so a `document.body` portal lands OUTSIDE that
 * scope and renders completely UNSTYLED — in a real HA the context menu blew out to
 * full-width, unstyled native sliders across the whole screen.
 *
 * The fix: render a container INSIDE the app subtree (under `.simui-root`, where the
 * stylesheet + design tokens apply) and portal overlays there. `position: fixed`
 * children still anchor to the viewport; the ContextMenu additionally corrects for a
 * transformed/positioned containing block so it lands at the cursor.
 */
const OverlayRootContext = createContext<HTMLElement | null>(null);

/** The in-scope portal target for overlays. `null` only on the very first render
 *  (before the container mounts) — overlays aren't open then, so callers fall back
 *  to `document.body` for that one frame. */
export function useOverlayRoot(): HTMLElement | null {
  return useContext(OverlayRootContext);
}

export function OverlayRootProvider({ children }: { children: ReactNode }) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  return (
    <OverlayRootContext.Provider value={node}>
      {children}
      {/* Lives under .simui-root, so portaled overlays inherit the scoped stylesheet
          + tokens even when HA embeds the panel in its own (possibly shadow) subtree. */}
      <div className="simui-overlay-root" ref={setNode} />
    </OverlayRootContext.Provider>
  );
}
