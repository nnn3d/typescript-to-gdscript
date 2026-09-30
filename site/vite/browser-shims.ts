import { fileURLToPath } from 'node:url';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import type { Plugin } from 'vite';

const here = dirname(fileURLToPath(import.meta.url));
const repoSrc = resolve(here, '..', '..', 'src');
const stub = resolve(here, 'node-stub.ts');
/** Resolves bare ids from `site/`, where the shim packages are installed. */
const siteImporter = resolve(here, '..', 'package.json');

/** Replaced by a package, resolved through Vite so dev serves its optimized ESM build. */
const PACKAGE_SHIMS: Record<string, string> = { path: 'path-browserify' };

/** Replaced by a file. */
const FILE_SHIMS: Record<string, string> = {
  fs: stub,
  os: stub,
  url: stub,
};

/**
 * Redirect Node built-ins imported by the converter (`../src`) to browser
 * shims. Only files under the repo's `src/` are affected and never in SSR,
 * so Astro's own server-side code keeps the real modules.
 */
export function browserShims(): Plugin {
  return {
    name: 'tstogd-browser-shims',
    enforce: 'pre',
    resolveId(id, importer, options) {
      if (options?.ssr || !importer) return null;
      const importerPath = resolve(importer.split('?')[0]);
      const rel = relative(repoSrc, importerPath);
      if (!rel || rel.startsWith('..') || isAbsolute(rel)) return null;
      const name = id.replace(/^node:/, '');
      const pkg = PACKAGE_SHIMS[name];
      if (pkg) {
        return this.resolve(pkg, siteImporter, { ...options, skipSelf: true });
      }
      return FILE_SHIMS[name] ?? null;
    },
  };
}
