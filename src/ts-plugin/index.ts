/**
 * typescript-to-gdscript language-service plugin — entry point.
 *
 * The plugin's sole responsibility is to surface converter + Godot
 * diagnostics as `ts.Diagnostic`s on the file being edited, so the IDE
 * shows TS→GD problems inline, exactly like TypeScript's own errors.
 *
 *   - `./lint.ts` — tier 1 reads the persistent `ProjectCache`; tier 2
 *                   live-converts in tsserver's own `Program` and kicks
 *                   off async Godot validation.
 *
 * This file is the glue: one-time project setup (resolve config, open
 * `ProjectCache`) and the pass-through proxy that the lint overlay
 * hooks `getSemanticDiagnostics` onto.
 *
 * NOTE: The plugin previously also exposed navigation overlays
 * (redirect go-to-definition from generated shadow classes to the real
 * source, bridge find-references across the shadow↔source boundary).
 * Those were removed after testing showed WebStorm handles symbol
 * navigation entirely through its own native indexer — tsserver never
 * receives `definition` / `references` commands from WebStorm — so the
 * overrides had no effect there. In VS Code the nav overlays worked,
 * but maintaining editor-specific behavior wasn't worth the surface
 * area. Users relying on shadow-class navigation should rely on the
 * underlying TypeScript type aliases + `@see` JSDoc emitted by the
 * typings generator instead.
 */

import type tsModule from 'typescript';
import { ProjectCache } from '../cache/index.ts';
import { resolveConfig, type ResolvedConfig } from '../config/index.ts';
import { createLintOverlay } from './lint.ts';

type TS = typeof tsModule;
type LS = tsModule.LanguageService;

interface PluginInit {
  typescript: TS;
}

function init({ typescript: ts }: PluginInit) {
  function create(info: tsModule.server.PluginCreateInfo): LS {
    const ls = info.languageService;
    const logger = info.project.projectService.logger;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pluginConfig = (info.config ?? {}) as any;

    /**
     * Enable via `{"name": "typescript-to-gdscript/ts-plugin", "debug": true}`
     * in `compilerOptions.plugins`. When on, every short-circuit branch
     * and Godot step of the lint overlay emits a trace line to
     * tsserver's logger. Restart the TS service after toggling.
     *
     * To capture the traces in a file, start tsserver with `TSS_LOG`:
     *
     *   $env:TSS_LOG = "-level verbose -file C:\tsserver.log"
     *
     * Then grep for `[tstogd-plugin]` in the resulting log.
     */
    const debugEnabled: boolean = pluginConfig.debug === true;
    const log = (msg: string): void => logger.info(`[tstogd-plugin] ${msg}`);
    const trace = debugEnabled
      ? (msg: string): void => logger.info(`[tstogd-plugin] TRACE ${msg}`)
      : (_: string): void => {};

    log(`plugin loaded (debug=${debugEnabled})`);

    // ── One-time project setup ──────────────────────────────
    //
    // tsserver invokes `create()` exactly once per configured project
    // — i.e. once per tsconfig.json that mentions us in
    // `compilerOptions.plugins`. Each tsconfig lives under at most one
    // `tstogd.json`, so we resolve the config ONCE here, open ONE
    // `ProjectCache` in `watch: true` mode, and reuse both for every
    // file request.
    //
    // If resolution fails (no `tstogd.json` in the tree, or the cache
    // dir can't be opened), the plugin still proxies the inner
    // LanguageService unchanged — it just contributes no diagnostics.
    const projectDir = info.project.getCurrentDirectory();
    let cfg: ResolvedConfig | null = null;
    let cache: ProjectCache | null = null;
    try {
      cfg = resolveConfig({ configDir: projectDir });
      cache = new ProjectCache(cfg.cacheDir, { watch: true });
      log(
        `resolved config for ${projectDir}: tsDir=${cfg.tsDir} gdDir=${cfg.gdDir} cacheDir=${cfg.cacheDir}`,
      );
    } catch (err) {
      log(
        `plugin disabled (resolveConfig / ProjectCache failed for ${projectDir}): ${err instanceof Error ? err.message : String(err)}`,
      );
    }

    // ── Proxy scaffolding ───────────────────────────────────
    //
    // Canonical tsserver-plugin pattern: copy every method from the
    // inner LS onto a fresh object, wrapping each in a closure that
    // re-binds `this = ls`. This makes the proxy a drop-in replacement
    // for `ls` (every method works) while giving us a clean surface
    // to override the specific ones we care about below.
    const proxy: LS = Object.create(null);
    for (const k of Object.keys(ls) as (keyof LS)[]) {
      const x = ls[k];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (proxy as any)[k] = (...args: unknown[]) => (x as any).apply(ls, args);
    }

    // ── Lint overlay (tier 1 + tier 2 diagnostics) ──────────
    //
    // Only installed when config resolution succeeded — without `cfg`
    // and `cache` we can't convert or read cached diagnostics, so we
    // just let the base LS diagnostics through.
    if (cfg && cache) {
      const lint = createLintOverlay({ ts, info, ls, cfg, cache, log, trace });
      proxy.getSemanticDiagnostics = (fileName) => {
        const base = ls.getSemanticDiagnostics(fileName);
        const extra = lint.getSemanticDiagnostics(fileName);
        return extra.length > 0 ? [...base, ...extra] : base;
      };
    }

    return proxy;
  }

  return { create };
}

export default init;
