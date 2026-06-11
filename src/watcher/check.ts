/**
 * Debounced full-project diagnostic check + error-driven self-heal for
 * watch mode. Extracted from the Watcher class (file-size rule); the
 * watcher delegates here via a small deps interface.
 *
 * Concurrency: checks now WRITE files (the heal pass), so overlapping
 * runs are forbidden — `run()` is guarded by an in-flight flag, and a
 * run requested while one is active is re-scheduled (debounced) after
 * the active one finishes.
 */

import ts from 'typescript';
import { createTsProgram } from '../parser/typescript/index.ts';
import {
  collectProjectDiagnostics,
  printDiagnostics,
  summarizeDiagnostics,
  type CheckResult,
} from '../checker/index.ts';
import type { ProjectCache } from '../cache/index.ts';
import {
  diagnosticSignatures,
  computeSuspects,
  healFiles,
  normPath,
} from './heal.ts';

export interface CheckRunnerDeps {
  tsDir: string;
  gdDir: string;
  projectRoot: string;
  cacheDir?: string;
  tsConfigPath?: string;
  godotPath?: string;
  emitOnError?: boolean;
  debug?: boolean;
  cache: ProjectCache;
  /** Current set of watched .ts files (absolute paths). */
  getTsFiles(): ReadonlySet<string>;
  /** Program reuse: read the watcher's cached program (may be null). */
  getProgram(): ts.Program | null;
  /** Store a program built here so later batches reuse it. */
  setProgram(program: ts.Program): void;
  /** Ask the watcher to schedule another debounced check. */
  requestRecheck(): void;
  log(file: string, message: string, severity: string): void;
  debugLog(message: string): void;
}

export class CheckRunner {
  private deps: CheckRunnerDeps;

  /**
   * Per-file diagnostic signature from the previous completed check.
   * `null` = no baseline yet (first check after startup) — then every
   * file with diagnostics counts as changed, intentionally healing
   * stale-error files left over from previous sessions.
   */
  private prevDiagSignatures: Map<string, string> | null = null;
  /**
   * Normalized paths of files converted since the last check. Their
   * diagnostic signature legitimately changed (they were edited), so
   * they're excluded from heal suspects.
   */
  private batchConverted: Set<string> = new Set();
  /**
   * Files whose diagnostics moved in the post-heal recheck without
   * having been healed themselves (e.g. a heal-write changed what Godot
   * reports about a third file). They couldn't be acted on in that
   * cycle (single heal iteration per check), so they're carried over as
   * pre-seeded suspects for the next one.
   */
  private pendingHealSuspects: Set<string> = new Set();

  private running = false;
  private rerunRequested = false;
  private disposed = false;
  private current: Promise<void> | null = null;

  constructor(deps: CheckRunnerDeps) {
    this.deps = deps;
  }

  /** Record a file converted by the watcher's batch path. */
  noteConverted(filePath: string): void {
    this.batchConverted.add(normPath(filePath));
  }

  /**
   * Run one check cycle. Never overlaps: a call while a cycle is active
   * requests a re-schedule instead (the heal pass writes files — two
   * interleaved chains could tear writes and stomp baselines).
   */
  run(): void {
    if (this.disposed) return;
    if (this.running) {
      this.rerunRequested = true;
      return;
    }
    this.running = true;
    this.current = this.runOnce()
      .catch((err: Error) => {
        console.error(`[check] Failed: ${err.message}`);
      })
      .finally(() => {
        this.running = false;
        this.current = null;
        if (this.rerunRequested && !this.disposed) {
          this.rerunRequested = false;
          this.deps.requestRecheck();
        }
      });
  }

  /** Block new runs and wait for the in-flight one (if any) to settle. */
  async dispose(): Promise<void> {
    this.disposed = true;
    this.rerunRequested = false;
    if (this.current) await this.current;
  }

  private async runOnce(): Promise<void> {
    const tsFiles = [...this.deps.getTsFiles()].filter(
      (f) => !f.endsWith('.d.ts'),
    );
    if (tsFiles.length === 0) {
      this.deps.debugLog('Diagnostic check skipped — no .ts files');
      return;
    }

    const checkStart = Date.now();
    this.deps.debugLog(
      `Diagnostic check starting (${tsFiles.length} file(s), program=${this.deps.getProgram() ? 'reused' : 'fresh'})`,
    );

    const firstResult = await this.collect(tsFiles);
    const { result, rewrote } = await this.healAndRecheck(firstResult, tsFiles);
    this.deps.debugLog(
      `Diagnostic check finished in ${Date.now() - checkStart}ms`,
    );

    const summary = summarizeDiagnostics(result);
    // Only clear the console when there's something to show — preserves the
    // recent per-file conversion logs when the project is clean.
    if (summary) {
      process.stdout.write('\x1Bc');
      if (rewrote.length > 0) {
        console.log(`[heal] Reconverted ${rewrote.length} stale file(s):`);
        for (const f of rewrote) console.log(`  ${f}`);
        console.log('');
      }
      printDiagnostics(result.tsDiagnostics, 'TS');
      printDiagnostics(result.converterDiagnostics, 'CONV');
      printDiagnostics(result.godotDiagnostics, 'GD');
      console.log('[check] complete:');
      console.log(summary);
    } else {
      if (rewrote.length > 0) {
        console.log(`[heal] Reconverted ${rewrote.length} stale file(s).`);
      }
      console.log('[check] No issues found.');
    }
  }

  /** One full-project diagnostics pass (reuses the watcher's program). */
  private collect(tsFiles: string[]): Promise<CheckResult> {
    return collectProjectDiagnostics({
      tsDir: this.deps.tsDir,
      gdDir: this.deps.gdDir,
      projectRoot: this.deps.projectRoot,
      tsFiles,
      tsConfigPath: this.deps.tsConfigPath,
      cache: this.deps.cache,
      godotPath: this.deps.godotPath,
      cacheDir: this.deps.cacheDir,
      noEmit: false,
      program: this.deps.getProgram() ?? undefined,
      onDebug: this.deps.debug ? (msg) => this.deps.debugLog(msg) : undefined,
    });
  }

  /**
   * Error-driven self-heal. Files whose diagnostic signature changed
   * without having been converted in the current batch are presumed
   * stale (a type they depend on changed in another file): reconvert
   * them in memory and rewrite the ones whose bytes differ. When bytes
   * changed, rerun the diagnostic check ONCE; suspects that surface
   * only in that second pass are carried over to the next cycle (a
   * recheck is requested), keeping the one-heal-per-cycle bound while
   * still converging.
   */
  private async healAndRecheck(
    result: CheckResult,
    tsFiles: string[],
  ): Promise<{ result: CheckResult; rewrote: string[] }> {
    const curr = diagnosticSignatures(result);
    const projectTsFiles = new Set(tsFiles.map(normPath));

    // Snapshot + reset synchronously: files converted while this check
    // is awaiting belong to the NEXT cycle's exclusion set.
    const batch = this.batchConverted;
    this.batchConverted = new Set();

    const carried = [...this.pendingHealSuspects].filter(
      (f) => projectTsFiles.has(f) && !batch.has(f),
    );
    this.pendingHealSuspects = new Set();

    const suspects = [
      ...new Set([
        ...computeSuspects(this.prevDiagSignatures, curr, {
          batchConverted: batch,
          projectTsFiles,
        }),
        ...carried,
      ]),
    ];

    let final = result;
    const rewroteAll: string[] = [];
    if (suspects.length > 0) {
      this.deps.debugLog(
        `Heal: ${suspects.length} suspect file(s) with changed diagnostics`,
      );
      const program =
        this.deps.getProgram() ??
        createTsProgram({
          rootDir: this.deps.tsDir,
          files: tsFiles,
          tsConfigPath: this.deps.tsConfigPath,
        });
      this.deps.setProgram(program);

      const { rewrote } = healFiles({
        files: suspects,
        program,
        cache: this.deps.cache,
        tsDir: this.deps.tsDir,
        gdDir: this.deps.gdDir,
        projectRoot: this.deps.projectRoot,
        tsConfigPath: this.deps.tsConfigPath,
        emitOnError: this.deps.emitOnError,
        onLog: (file, msg) => this.deps.log(file, msg, 'info'),
      });
      rewroteAll.push(...rewrote);

      if (rewrote.length > 0) {
        this.deps.cache.save();
        this.deps.debugLog(
          `Heal rewrote ${rewrote.length} file(s) — re-running diagnostic check once`,
        );
        final = await this.collect(tsFiles);

        // Heal-writes can move diagnostics of files we did NOT heal
        // (e.g. Godot's view of a third file changes when a healed .gd
        // changes a type annotation). All suspects are fresh now, so
        // only OTHER files qualify — carry them into the next cycle.
        const second = diagnosticSignatures(final);
        const next = computeSuspects(curr, second, {
          batchConverted: new Set(suspects),
          projectTsFiles,
        });
        if (next.length > 0) {
          for (const f of next) this.pendingHealSuspects.add(f);
          this.deps.debugLog(
            `Heal: ${next.length} file(s) affected by heal-writes — recheck scheduled`,
          );
          this.deps.requestRecheck();
        }
      }
    }

    this.prevDiagSignatures = diagnosticSignatures(final);
    return { result: final, rewrote: rewroteAll };
  }
}
