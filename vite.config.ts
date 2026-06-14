import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// In lib mode, component-imported CSS (e.g. editor/*.css) is emitted as a separate
// asset. The HACS integration serves ONLY simui-panel.js, so the panel must be fully
// self-contained: collect every emitted CSS asset and inject it as a <style> on load
// (the same mechanism panel.tsx uses for styles.css?inline), then drop the asset.
function inlineCss(): Plugin {
  return {
    name: 'simui-inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      let css = '';
      for (const [key, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'asset' && key.endsWith('.css')) {
          css += typeof chunk.source === 'string' ? chunk.source : '';
          delete bundle[key];
        }
      }
      if (!css) return;
      for (const chunk of Object.values(bundle)) {
        if (chunk.type === 'chunk' && chunk.isEntry) {
          chunk.code =
            `(function(){try{var s=document.createElement('style');s.textContent=${JSON.stringify(css)};document.head.appendChild(s);}catch(e){}})();` +
            chunk.code;
          break;
        }
      }
    },
  };
}

// Two build targets share one codebase:
//  - default (dev server / standalone): `vite` / `vite build`
//  - `--mode panel`: a single self-contained ES module that defines the
//    <simui-panel> custom element, to be served by Home Assistant from /local/.
export default defineConfig(({ mode }) => {
  if (mode === 'panel') {
    return {
      plugins: [react(), inlineCss()],
      define: { 'process.env.NODE_ENV': '"production"' },
      build: {
        lib: {
          entry: 'src/panel.tsx',
          formats: ['es'],
          fileName: () => 'simui-panel.js',
        },
        rollupOptions: { output: { inlineDynamicImports: true } },
        cssCodeSplit: false,
        target: 'es2020',
        emptyOutDir: true,
      },
    };
  }
  return {
    plugins: [react()],
    // esbuild 0.28 (pinned for the dev-only security advisory) can't lower some
    // dependency destructuring to Vite's default multi-target dev list; pin the
    // dev transform/prebundle target to esnext (modern browsers only).
    optimizeDeps: { esbuildOptions: { target: 'esnext' } },
    esbuild: { target: 'esnext' },
  };
});
