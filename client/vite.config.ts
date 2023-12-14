import { defineConfig } from "vite";
import viteCompression from 'vite-plugin-compression';
import { createRequire } from "module";
import type { RollupCommonJSOptions } from "vite";
import { ViteMinifyPlugin } from 'vite-plugin-minify'

const require = createRequire(import.meta.url)

export default defineConfig({
  plugins: [viteCompression({algorithm: "brotliCompress"})],
  build: {
    // Bugfix required to handle issue with vite, rollup and libs (like react-phone-input-2)
    commonjsOptions: {
      defaultIsModuleExports(id) {
        try {
          const module = require(id);
          if (module?.default) {
            return false;
          }
          return 'auto';
        } catch (error) {
          return 'auto';
        }
      },
      transformMixedEsModules: true,
    } as RollupCommonJSOptions,
  }
});

// plugins: [viteCompression({algorithm: "brotliCompress"})],