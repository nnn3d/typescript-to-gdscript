/**
 * typescript-to-gdscript language-service plugin — entry point.
 *
 * Two responsibilities:
 *
 *   1. **Diagnostic surfacing** (`./lint.ts`) — converter + Godot
 *      errors shown inline as `ts.Diagnostic`s, exactly like
 *      TypeScript's own errors. Tier 1 reads the persistent
 *      `ProjectCache`; tier 2 live-converts in tsserver's own
 *      `Program` and kicks off async Godot validation.
 *
 *   2. **Diagnostic suppression** — TypeScript reports a few codes
 *      as part of the namespace+class merge pattern the typings
 *      generator emits in `<name>.gd.d.ts` files (TS2434 / TS2435
 *      "namespace must precede the class", TS2449 "class used before
 *      its declaration"). These are noise for the user — the
 *      generated typings are correct — so we filter them
 *      unconditionally for in-scope `.ts` files.
 *
 * The plugin does NOT modify the user's source view (no snapshot
 * wrapping). All type augmentation comes from the per-script
 * `<name>.gd.d.ts` files emitted by `tstogd generate-typings` /
 * `tstogd watch`. Users who want `Foo.X` access for class-level
 * consts / enums / inner classes write an explicit
 * `export namespace Foo { ... }` block alongside their
 * `export class Foo` — TypeScript's native namespace+class merging
 * gives them `Foo.X` cross-file and `this.X` on instance.
 *
 * NOTE: Navigation overlays (go-to-def / find-refs across the
 * shadow ↔ source boundary) were removed after testing showed
 * WebStorm handles symbol navigation entirely through its own
 * native indexer — tsserver never receives `definition` /
 * `references` from WebStorm — so the overrides had no effect
 * there. Users relying on shadow-class navigation should rely on
 * the typings generator's `@see` JSDoc + TS type aliases instead.
 */

import type tsModule from 'typescript';
import { appendFileSync, mkdirSync } from 'fs';
import { dirname, relative, resolve } from 'path';
import { ProjectCache } from '../cache/index.ts';
import { resolveConfig, type ResolvedConfig } from '../config/index.ts';
import { createLintOverlay } from './lint.ts';

type TS = typeof tsModule;
type LS = tsModule.LanguageService;

interface PluginInit {
  typescript: TS;
}

/**
 * Diagnostic codes emitted by the namespace+class merge pattern in
 * the generated `.gd.d.ts` files that never correspond to real user
 * mistakes. Always filtered for in-scope files.
 *   - TS2434 / TS2435 — "namespace must precede the class".
 *   - TS2449 — "class used before its declaration", when the
 *               typings module references the script class.
 */
const ALWAYS_FILTERED_CODES = new Set<number>([2434, 2435, 2449]);

function init({ typescript: ts }: PluginInit) {
  function create(info: tsModule.server.PluginCreateInfo): LS {
    const ls = info.languageService;
    const logger = info.project.projectService.logger;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pluginConfig = (info.config ?? {}) as any;

    /**
     * Enable via `{"name": "typescript-to-gdscript/ts-plugin", "debug": true}`
     * in `compilerOptions.plugins`. When on, every short-circuit
     * branch and Godot step of the lint overlay emits a trace line
     * to tsserver's logger. Restart the TS service after toggling.
     */
    const debugEnabled: boolean = pluginConfig.debug === true;
    /**
     * `"debugLog": "C:/path/to/tstogd-plugin.log"` mirrors plugin
     * trace lines into a dedicated file (no need to filter through
     * the noisy tsserver log). Both the configured log path AND
     * tsserver's own logger receive the lines.
     */
    const debugLogPath: string | undefined =
      typeof pluginConfig.debugLog === 'string' && pluginConfig.debugLog.length > 0
        ? pluginConfig.debugLog
        : undefined;
    if (debugLogPath) {
      try {
        mkdirSync(dirname(debugLogPath), { recursive: true });
      } catch {
        /* best-effort — appendFileSync below will surface a real failure */
      }
    }
    const writeDebug = (line: string): void => {
      if (!debugLogPath) return;
      try {
        appendFileSync(debugLogPath, line + '\n', 'utf-8');
      } catch {
        /* swallow — losing a debug line shouldn't break the editor */
      }
    };
    const log = (msg: string): void => {
      const formatted = `[tstogd-plugin] ${msg}`;
      logger.info(formatted);
      writeDebug(formatted);
    };
    const trace = debugEnabled || debugLogPath
      ? (msg: string): void => {
          const formatted = `[tstogd-plugin] TRACE ${msg}`;
          if (debugEnabled) logger.info(formatted);
          writeDebug(formatted);
        }
      : (_: string): void => {};

    log(`plugin loaded (debug=${debugEnabled} debugLog=${debugLogPath ?? 'off'})`);

    // ── One-time project setup ──────────────────────────────
    //
    // tsserver invokes `create()` exactly once per configured project
    // — i.e. once per tsconfig.json that mentions us in
    // `compilerOptions.plugins`. Each tsconfig lives under at most
    // one `tstogd.json`, so we resolve the config ONCE here, open
    // ONE `ProjectCache` in `watch: true` mode, and reuse both for
    // every file request.
    //
    // If resolution fails (no `tstogd.json` in the tree, or the
    // cache dir can't be opened), the plugin still proxies the
    // inner LanguageService unchanged — it just contributes no
    // diagnostics.
    const projectDir = info.project.getCurrentDirectory();
    let cfg: ResolvedConfig | null = null;
    let cache: ProjectCache | null = null;
    try {
      cfg = resolveConfig({ configDir: projectDir });
      /**
       * When set in the plugin's `compilerOptions.plugins` entry,
       * this overrides `disableGodotLint` from `tstogd.json` for
       * THIS editor session only. Useful when a developer wants to
       * silence the async Godot pass in their IDE without changing
       * the project-wide config the CLI/watcher still honor. Pass
       * `false` to force-enable Godot even if the project config
       * disables it.
       */
      if (typeof pluginConfig.disableGodotLint === 'boolean') {
        cfg = { ...cfg, disableGodotLint: pluginConfig.disableGodotLint };
      }
      cache = new ProjectCache(cfg.cacheDir, { watch: true });
      log(
        `resolved config for ${projectDir}: tsDir=${cfg.tsDir} gdDir=${cfg.gdDir} cacheDir=${cfg.cacheDir}`,
      );
    } catch (err) {
      log(
        `plugin disabled (resolveConfig / ProjectCache failed for ${projectDir}): ${err instanceof Error ? err.message : String(err)}`,
      );
    }

    /**
     * Accept a file for diagnostic filtering iff it's a plain `.ts`
     * (not `.d.ts`) AND lives under `cfg.tsDir`. Pure O(1). Files
     * outside scope pass through unchanged.
     *
     * When `cfg` is null (config resolution failed), nothing is in
     * scope — the plugin degrades to a transparent pass-through.
     */
    function isInScope(fileName: string): boolean {
      if (!cfg) return false;
      if (!fileName.endsWith('.ts') || fileName.endsWith('.d.ts')) return false;
      const rel = relative(cfg.tsDir, fileName);
      if (!rel || rel.startsWith('..') || resolve(cfg.tsDir, rel) !== resolve(fileName)) {
        return false;
      }
      return true;
    }

    // ── Proxy scaffolding ───────────────────────────────────
    //
    // Canonical tsserver-plugin pattern: copy every method from the
    // inner LS onto a fresh object, wrapping each in a closure that
    // re-binds `this = ls`. This makes the proxy a drop-in
    // replacement for `ls` (every method works) while giving us a
    // clean surface to override the specific ones we care about
    // below.
    const proxy: LS = Object.create(null);
    for (const k of Object.keys(ls) as (keyof LS)[]) {
      const x = ls[k];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (proxy as any)[k] = (...args: unknown[]) => (x as any).apply(ls, args);
    }

    // ── Diagnostic filter ────────────────────────────────────
    //
    // Drops `ALWAYS_FILTERED_CODES` for in-scope files. These codes
    // come from the namespace+class merge pattern the typings
    // generator emits and are correct-but-noisy; the user can't act
    // on them.
    function filterAugmentationDiagnostics(
      fileName: string,
      diags: readonly tsModule.Diagnostic[],
    ): tsModule.Diagnostic[] {
      if (!isInScope(fileName)) return [...diags];
      const filtered: tsModule.Diagnostic[] = [];
      for (const d of diags) {
        if (ALWAYS_FILTERED_CODES.has(d.code)) {
          trace(`filter ${fileName}: dropping TS${d.code} (always-filtered)`);
          continue;
        }
        filtered.push(d);
      }
      return filtered;
    }

    proxy.getSyntacticDiagnostics = (fileName) => {
      const base = ls.getSyntacticDiagnostics(fileName);
      return filterAugmentationDiagnostics(fileName, base) as tsModule.DiagnosticWithLocation[];
    };
    proxy.getSuggestionDiagnostics = (fileName) => {
      const base = ls.getSuggestionDiagnostics(fileName);
      return filterAugmentationDiagnostics(fileName, base) as tsModule.DiagnosticWithLocation[];
    };

    // ── Lint overlay (tier 1 + tier 2 diagnostics) ──────────
    //
    // Only installed when config resolution succeeded — without
    // `cfg` and `cache` we can't convert or read cached diagnostics,
    // so we just let the (filtered) base LS diagnostics through.
    if (cfg && cache) {
      const lint = createLintOverlay({ ts, info, ls, cfg, cache, log, trace });
      proxy.getSemanticDiagnostics = (fileName) => {
        const base = filterAugmentationDiagnostics(
          fileName,
          ls.getSemanticDiagnostics(fileName),
        );
        const extra = lint.getSemanticDiagnostics(fileName);
        return extra.length > 0 ? [...base, ...extra] : base;
      };
    } else {
      proxy.getSemanticDiagnostics = (fileName) => {
        return filterAugmentationDiagnostics(
          fileName,
          ls.getSemanticDiagnostics(fileName),
        );
      };
    }

    return proxy;
  }

  return { create };
}

export default init;
