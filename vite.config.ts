import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Two build targets share one codebase:
//  - default (dev server / standalone): `vite` / `vite build`
//  - `--mode panel`: a single self-contained ES module that defines the
//    <simui-panel> custom element, to be served by Home Assistant from /local/.
export default defineConfig(({ mode }) => {
  if (mode === 'panel') {
    return {
      plugins: [react()],
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
