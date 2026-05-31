/**
 * Lint overlay for the typescript-to-gdscript language-service plugin.
 *
 * Surfaces converter + Godot diagnostics as regular `ts.Diagnostic`s so
 * the IDE shows TS→GD problems inline, exactly like TypeScript's own
 * errors. Two tiers, in preference order:
 *
 *   1. **Live convert** (`liveDiagnosticsFor`) — runs `convertTsToGd`
 *      in-process against tsserver's own `ts.Program`. Handles the
 *      dirty buffer (unsaved changes), produces converter diagnostics
 *      synchronously, and kicks off async Godot validation. Results
 *      are memoized per (file, SourceFile.version) in an LRU.
 *
 *   2. **Cached fallback** (`cachedDiagnosticsFor`) — reads diagnostics
 *      the CLI/watcher already stored in the `ProjectCache`. Used when
 *      live convert can't run (e.g. convert threw) OR produced nothing
 *      but the on-disk cache has a fresh entry.
 *
 * Godot validation runs async on every successful live convert. When
 * Godot returns we merge its diagnostics into the live memo and call
 * `info.project.refreshDiagnostics()` so tsserver re-queries the file
 * without waiting for another edit.
 */

import type tsModule from 'typescript';
import { resolve, relative } from 'path';
import {
  ProjectCache,
  hashContent,
  type CachedDiagnostic,
} from '../cache/index.ts';
import { resolveGodotPath, type ResolvedConfig } from '../config/index.ts';
import { convertTsToGd } from '../converter/ts-to-gd/index.ts';
import { validateGdFiles } from '../godot-validate/index.ts';
import type { TransformDiagnostic } from '../converter/common/index.ts';
import { LRU } from './lru.ts';

type TS = typeof tsModule;
type LS = tsModule.LanguageService;

/** Diagnostic codes the plugin owns — users can filter them via source === 'tstogd'. */
const DIAG_CODE_BASE = 90000;

export interface LintOverlayDeps {
  ts: TS;
  info: tsModule.server.PluginCreateInfo;
  ls: LS;
  cfg: ResolvedConfig;
  cache: ProjectCache;
  log: (msg: string) => void;
  trace: (msg: string) => void;
}

export interface LintOverlay {
  /**
   * Append tier-1/tier-2 diagnostics to whatever the inner LS produced.
   * Caller is responsible for invoking `ls.getSemanticDiagnostics()`
   * first — this helper only contributes the extra entries.
   */
  getSemanticDiagnostics(fileName: string): tsModule.Diagnostic[];
}

export function createLintOverlay(deps: LintOverlayDeps): LintOverlay {
  const { ts, info, ls, cfg, cache, log, trace } = deps;

  /**
   * Per-file memo of converter + Godot diagnostics, keyed by fileName.
   * Each entry is small (a few hundred bytes) so the cap is generous
   * — it exists purely to keep the Map from growing for the life of
   * the tsserver process.
   */
  const liveCache = new LRU<LiveEntry>(100);
  /**
   * In-flight Godot validations, one per file. Aborting a previous
   * run before starting a new one kills its child process and lets
   * `validateGdFiles` return early instead of parsing stale output.
   *
   * Entries self-clean on settle — we only delete when the stored
   * controller is still our own, so a superseding request doesn't
   * race-clear the newer controller that just replaced ours. At
   * steady state the size is bounded by the number of files
   * concurrently being validated — normally 1, at most a handful.
   */
  const pendingGodot = new Map<string, AbortController>();
  /**
   * Last-known Godot diagnostics per file, stored as `CachedDiagnostic[]`
   * (SourceFile-independent) so they can be re-anchored against any
   * future version's `SourceFile`. Crucial for on-the-fly validation
   * in WebStorm: WebStorm only repaints squiggles from a "primary"
   * `getErr` round (one it initiated), not from async follow-ups
   * triggered by `refreshDiagnostics()`. By seeding every new
   * `LiveEntry.godot` from this cache, the very first `getErr` for
   * a new version already carries Godot diagnostics — so WebStorm
   * paints them on its own primary-round response, no async-refresh
   * dependency needed.
   *
   * The diag positions are stale until fresh Godot catches up (at most
   * one line or two off during active typing), but the presence of
   * the squiggle is what matters UX-wise. Fresh Godot overwrites both
   * `liveCache[file].godot` and this map on every completion.
   *
   * `LRU(100)` caps the map size. Evicted entries just mean those
   * files start without a seed on the next edit — no data loss for
   * on-disk state.
   */
  const lastGodotByFile = new LRU<CachedDiagnostic[]>(100);

  /**
   * Accept a file for plugin overlays iff it's a plain `.ts` (not
   * `.d.ts`) AND it lives under `cfg.tsDir`. Pure O(1) check — no
   * I/O, no memos. Files outside `tsDir` are foreign; the plugin
   * ignores them.
   */
  function isInScope(fileName: string): boolean {
    if (!fileName.endsWith('.ts') || fileName.endsWith('.d.ts')) {
      trace(`skip ${fileName}: not a plain .ts file`);
      return false;
    }
    // `rel` starts with `..` iff `fileName` is outside `cfg.tsDir`.
    const rel = relative(cfg.tsDir, fileName);
    if (rel.startsWith('..')) {
      trace(`skip ${fileName}: outside tsDir (${cfg.tsDir})`);
      return false;
    }
    return true;
  }

  function severityToCategory(
    sev: CachedDiagnostic['severity'],
  ): tsModule.DiagnosticCategory {
    switch (sev) {
      case 'error':
      case 'type-error':
        return ts.DiagnosticCategory.Error;
      case 'warning':
        return ts.DiagnosticCategory.Warning;
      default:
        return ts.DiagnosticCategory.Suggestion;
    }
  }

  /**
   * Convert cached converter diagnostics into ts.Diagnostic objects
   * anchored at the right positions in the current source file.
   * Skips any diagnostic whose file doesn't match `fileName` — keeps
   * cross-file diagnostics from being mis-attributed to the wrong
   * SourceFile (which would make positions nonsensical).
   */
  function cachedToTsDiagnostics(
    fileName: string,
    cached: readonly CachedDiagnostic[],
  ): tsModule.Diagnostic[] {
    const program = ls.getProgram();
    if (!program) return [];
    const sf = program.getSourceFile(fileName);
    if (!sf) return [];
    const out: tsModule.Diagnostic[] = [];
    for (const d of cached) {
      if (resolve(d.file) !== resolve(fileName)) continue;
      if (d.severity === 'info') continue;
      // CachedDiagnostic line/column are 1-based from the converter.
      const line = Math.max(0, d.line - 1);
      const col = Math.max(0, d.column - 1);
      let start: number;
      try {
        start = ts.getPositionOfLineAndCharacter(sf, line, col);
      } catch {
        // Out-of-range position — anchor at line start as a fallback.
        try {
          start = ts.getPositionOfLineAndCharacter(
            sf,
            Math.min(line, sf.getLineStarts().length - 1),
            0,
          );
        } catch {
          start = 0;
        }
      }
      // Make the squiggle span the remainder of the line so it's
      // visible even when column info is imprecise.
      const lineStarts = sf.getLineStarts();
      const nextLineStart =
        line + 1 < lineStarts.length ? lineStarts[line + 1]! : sf.getEnd();
      const length = Math.max(1, nextLineStart - start - 1);

      out.push({
        file: sf,
        start,
        length,
        category: severityToCategory(d.severity),
        code: DIAG_CODE_BASE + (d.severity === 'type-error' ? 1 : 0),
        messageText: d.message,
        source: 'tstogd',
      });
    }
    return out;
  }

  function toCachedDiagnostics(
    diags: readonly TransformDiagnostic[],
  ): CachedDiagnostic[] {
    return diags.map((d) => ({
      message: d.message,
      severity: d.severity,
      file: d.file,
      line: d.line,
      column: d.column,
    }));
  }

  // ── Tier 1: cached fallback ───────────────────────────────

  function cachedDiagnosticsFor(fileName: string): tsModule.Diagnostic[] {
    if (!isInScope(fileName)) return [];
    const relPath = relative(cfg.tsDir, fileName);
    const gdPath = resolve(cfg.gdDir, relPath.replace(/\.ts$/, '.gd'));
    // Accept the entry if either:
    //   (a) disk is fresh (real .gd matches entry), or
    //   (b) cache-folder has a fresh copy (plugin/CLI just ran but
    //       hasn't promoted yet) — in which case the diagnostics in
    //       the entry still correspond to the current source.
    const freshOnDisk = cache.isTsToGdFresh(fileName, gdPath);
    const freshInCache = cache.hasFreshCachedGd(fileName);
    if (!freshOnDisk && !freshInCache) return [];
    const diags = cache.getDiagnostics(fileName);
    if (!diags) return [];
    return cachedToTsDiagnostics(fileName, diags);
  }

  // ── Tier 2: live convert + async Godot ────────────────────

  interface LiveEntry {
    version: string;
    converter: tsModule.Diagnostic[];
    godot: tsModule.Diagnostic[];
  }

  function liveDiagnosticsFor(fileName: string): tsModule.Diagnostic[] {
    trace(`getSemanticDiagnostics fileName=${fileName}`);
    if (!isInScope(fileName)) return [];
    const program = ls.getProgram();
    if (!program) {
      trace(`skip ${fileName}: no program`);
      return [];
    }
    const sf = program.getSourceFile(fileName);
    if (!sf) {
      trace(`skip ${fileName}: source file not in program`);
      return [];
    }
    // tsserver sets `.version` on every SourceFile it tracks, but it's
    // not in the public type. Fall back to a content hash when absent
    // (e.g. SourceFiles from a raw createProgram, which `tsc --noEmit`
    // uses in tests).
    const version =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (sf as any).version ?? hashContent(sf.getFullText());

    // LRU.get() already bumps the entry to most-recently-used on hit.
    const memo = liveCache.get(fileName);
    if (memo && memo.version === version) {
      trace(
        `memo hit ${fileName} version=${version} converter=${memo.converter.length} godot=${memo.godot.length} → returning ${memo.converter.length + memo.godot.length} ts.Diagnostic(s)`,
      );
      return [...memo.converter, ...memo.godot];
    }
    if (memo) {
      trace(
        `memo MISS ${fileName} had version=${memo.version} current=${version}`,
      );
    } else {
      trace(`memo MISS ${fileName} (no entry) current=${version}`);
    }

    // Convert in-process using tsserver's warm program. The converter
    // sees the file exactly as the user wrote it — no snapshot
    // transformation — and the GDScript output is produced directly
    // from that AST. `this.X` references (for lifts that land as
    // script-class members via the user's explicit
    // `export namespace Foo { ... }` paired with `export class Foo`)
    // resolve via TypeScript's native namespace + class merging, which
    // the program already has evaluated.
    let result: ReturnType<typeof convertTsToGd>;
    try {
      result = convertTsToGd({
        filePath: fileName,
        rootDir: cfg.tsDir,
        tsDir: cfg.tsDir,
        gdDir: cfg.gdDir,
        projectRoot: cfg.rootDir,
        sourceMap: true,
        program,
      });
    } catch (err) {
      log(
        `convertTsToGd failed for ${fileName}: ${err instanceof Error ? err.message : String(err)}`,
      );
      return [];
    }
    trace(
      `converter produced ${result.diagnostics.length} diag(s) for ${fileName}`,
    );

    const converterDiags = cachedToTsDiagnostics(
      fileName,
      toCachedDiagnostics(result.diagnostics),
    );
    trace(
      `mapped to ${converterDiags.length} ts.Diagnostic(s) (after current-file filter + severity=info drop)`,
    );

    // Seed the new entry's Godot diagnostics with the last-known set
    // (possibly from a prior version). Positions are re-anchored against
    // the CURRENT SourceFile via `cachedToTsDiagnostics`, so no stale
    // `ts.SourceFile` references leak across versions. During active
    // typing this keeps the squiggle visible in WebStorm (which only
    // repaints on primary `getErr` rounds, not on async refresh
    // follow-ups) — fresh Godot overwrites with precise positions when
    // it finishes for this version.
    const priorGodot = lastGodotByFile.get(fileName);
    const entry: LiveEntry = {
      version,
      converter: converterDiags,
      godot: priorGodot ? cachedToTsDiagnostics(fileName, priorGodot) : [],
    };
    liveCache.set(fileName, entry);

    // Persist to the ProjectCache so CLI/watcher can promote the bytes
    // we just produced without re-converting. Key by bufferHash (not
    // disk hash) — when user saves, disk == buffer → CLI matches.
    //
    // `saveAsync()` returns immediately; the actual cache.json write
    // runs off the tsserver event loop. The in-memory update
    // (`updateTsToGd`) has already made the entry visible to this
    // instance; the disk flush exists purely so other processes (CLI
    // watcher) can see it.
    //
    // Godot validation is chained STRICTLY after the save settles so
    // it always runs against a fully-persisted on-disk cache state.
    // `.finally()` ensures a failed save doesn't swallow the Godot
    // kick-off — the mirror .gd was written synchronously inside
    // `updateTsToGd`, so Godot has what it needs either way.
    try {
      // The plugin no longer wraps the host's getScriptSnapshot, so
      // the SourceFile text IS the user's source — direct
      // `sf.getFullText()` match the on-disk hash.
      const bufferText = sf.getFullText();
      const relPath = relative(cfg.tsDir, fileName);
      const gdPath = resolve(cfg.gdDir, relPath.replace(/\.ts$/, '.gd'));
      cache.updateTsToGd(
        fileName,
        gdPath,
        result.sourceMap ?? '{}',
        result.diagnostics,
        { tsContent: bufferText, gdContent: result.code },
      );
      cache
        .saveAsync()
        .catch((err) => {
          log(
            `cache saveAsync failed for ${fileName}: ${err instanceof Error ? err.message : String(err)}`,
          );
        })
        .finally(() => {
          maybeStartGodotValidation(fileName, version, result);
        });
    } catch (err) {
      log(
        `cache persist failed for ${fileName}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }

    return [...entry.converter, ...entry.godot];
  }

  function maybeStartGodotValidation(
    fileName: string,
    version: string,
    convertResult: ReturnType<typeof convertTsToGd>,
  ): void {
    if (cfg.disableGodotLint) {
      trace(`godot: skip ${fileName} — disableGodotLint is true`);
      return;
    }
    // Skip Godot when the converter itself failed — invalid GD would
    // just spew parse errors that duplicate what the converter said.
    if (convertResult.diagnostics.some((d) => d.severity === 'error')) {
      trace(`godot: skip ${fileName} — converter reported an 'error' severity`);
      return;
    }
    if (!convertResult.code) {
      trace(`godot: skip ${fileName} — converter produced no output`);
      return;
    }

    const projectRoot = cfg.rootDir;
    let godotPath: string;
    try {
      godotPath = resolveGodotPath({ godotPath: cfg.godotPath });
    } catch (err) {
      trace(
        `godot: skip ${fileName} — resolveGodotPath threw: ${err instanceof Error ? err.message : String(err)}`,
      );
      return;
    }
    trace(
      `godot: start ${fileName} godot=${godotPath} projectRoot=${projectRoot}`,
    );

    // Abort any prior Godot run for this file — its result would
    // apply to a stale version.
    pendingGodot.get(fileName)?.abort();

    // Reuse the `.gd` bytes the caller just persisted to the
    // ProjectCache mirror (`<cacheDir>/gd-output/<hash>-<name>.gd`) —
    // no separate scratch file needed. The mirror is typically under
    // `os.tmpdir()`, so Godot sees it as outside-project and the
    // "Class X hides a global script class" false positive is
    // automatically suppressed by `isDuplicateClassFalsePositive`.
    const cachedGdPath = cache.getCachedGdPath(fileName);
    if (!cachedGdPath) {
      trace(`godot: skip ${fileName} — cache mirror path unavailable`);
      return;
    }

    const ctrl = new AbortController();
    pendingGodot.set(fileName, ctrl);

    validateGdFiles({
      // Pass the source map inline (we just produced it in-process).
      // With `tsFilePath` set, remapError anchors diagnostics at the
      // real TS file regardless of where the cache mirror lives.
      gdFiles: [
        {
          path: cachedGdPath,
          sourceMapJson: convertResult.sourceMap,
          tsFilePath: fileName,
        },
      ],
      projectRoot,
      godotPath,
      // Tell the validator where our cache mirror lives so it can
      // suppress the "Class X hides a global script class" false
      // positive Godot emits when it sees both the real .gd and
      // our throwaway mirror.
      cacheDir: cfg.cacheDir,
      // Hand the abort controller's signal to the validator so a
      // superseded request kills its child Godot process and returns
      // immediately — no wasted parsing/remapping, no Godot backlog.
      signal: ctrl.signal,
    }).then(
      (validate) => {
        // Settle: drop our pendingGodot entry so the Map doesn't
        // accumulate one slot per file touched over the session.
        // Only delete if we're still the owner — a superseding
        // request may have replaced us with a newer controller.
        if (pendingGodot.get(fileName) === ctrl) pendingGodot.delete(fileName);
        trace(
          `godot: result ${fileName} available=${validate.godotAvailable} diagnostics=${validate.diagnostics.length} ` +
            `aborted=${ctrl.signal.aborted} liveVersion=${liveCache.get(fileName)?.version} requestVersion=${version}`,
        );
        if (ctrl.signal.aborted) return;
        // Superseded by a newer version while Godot was running.
        const current = liveCache.get(fileName);
        if (!current || current.version !== version) return;
        // We pass `tsFilePath` into validateGdFiles, so diagnostics
        // already point at the real TS file — no normalization needed.
        const normalizedDiags = toCachedDiagnostics(validate.diagnostics);
        current.godot = cachedToTsDiagnostics(fileName, normalizedDiags);
        // Also stash the raw `CachedDiagnostic[]` form so the next
        // version's memo-miss path can seed its `LiveEntry.godot`
        // from this (re-anchored against the new SourceFile). See
        // `lastGodotByFile` docs for why this sidesteps WebStorm's
        // "async refresh ignored" behavior.
        lastGodotByFile.set(fileName, normalizedDiags);
        trace(
          `godot: stored ${current.godot.length} ts.Diagnostic(s) for ${fileName}; nudging tsserver`,
        );

        // Nudge tsserver to re-query this file so the freshly-arrived
        // Godot diagnostics show up without waiting for another edit.
        // `refreshDiagnostics()` isn't in the public LS type — cast.
        // VS Code honors this; WebStorm's tsserver client does not —
        // there, users see Godot errors on their next natural `geterr`
        // (save / focus change / idle timeout).
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const refresh = (info.project as any).refreshDiagnostics;
          if (typeof refresh === 'function') {
            refresh.call(info.project);
            trace(`godot: refreshDiagnostics() invoked`);
          } else {
            trace(`godot: refreshDiagnostics NOT available on info.project`);
          }
        } catch (err) {
          trace(
            `godot: refreshDiagnostics threw: ${err instanceof Error ? err.message : String(err)}`,
          );
        }
      },
      (err: unknown) => {
        // Same settle cleanup as the success path.
        if (pendingGodot.get(fileName) === ctrl) pendingGodot.delete(fileName);
        log(
          `Godot validation failed for ${fileName}: ${err instanceof Error ? (err.stack ?? err.message) : String(err)}`,
        );
      },
    );
  }

  return {
    getSemanticDiagnostics(fileName) {
      const live = liveDiagnosticsFor(fileName);
      if (live.length > 0) return live;
      return cachedDiagnosticsFor(fileName);
    },
  };
}
