import { resolve, relative, normalize } from 'path';
import { readFileSync, existsSync } from 'fs';
import type ts from 'typescript';
import { createTsProgram } from '../parser/typescript/index.ts';
import { convertTsToGd } from '../converter/ts-to-gd/index.ts';
import { collectTsDiagnostics } from './ts-diagnostics.ts';
import { runGodotProjectCheck } from './godot-project.ts';
import type { TransformDiagnostic } from '../converter/common/index.ts';
import type { ProjectCache } from '../cache/index.ts';

export interface CheckOptions {
  tsDir: string;
  gdDir: string;
  projectRoot: string;
  tsFiles: string[];
  tsConfigPath?: string;
  cache: ProjectCache | null;
  godotPath?: string;
  cacheDir?: string;
  /** When true: compare in-memory converter output to disk .gd; don't write. */
  noEmit?: boolean;
  signal?: AbortSignal;
  /**
   * Existing `ts.Program` to reuse (e.g. from a recent conversion batch).
   * Avoids re-parsing all `.ts` files. When omitted, a fresh program is built.
   */
  program?: ts.Program;
  /** Optional debug callback for phase-by-phase logging. */
  onDebug?: (message: string) => void;
}

export interface CheckResult {
  tsDiagnostics: TransformDiagnostic[];
  converterDiagnostics: TransformDiagnostic[];
  godotDiagnostics: TransformDiagnostic[];
  /** Resolved .gd paths whose on-disk content differs from what converter would emit. */
  staleFiles: string[];
}

export async function collectProjectDiagnostics(opts: CheckOptions): Promise<CheckResult> {
  const { tsDir, gdDir, projectRoot, tsFiles, cache, noEmit = false, onDebug } = opts;
  const debug = (msg: string): void => onDebug?.(`[checker] ${msg}`);

  debug(`Starting (${tsFiles.length} file(s), noEmit=${noEmit})`);

  // Reuse the caller's program when provided (e.g. watcher's cachedProgram
  // built during the conversion batch); otherwise build a fresh one.
  let program: ts.Program;
  if (opts.program) {
    debug('Reusing caller-provided ts.Program');
    program = opts.program;
  } else {
    debug('Building fresh ts.Program');
    program = createTsProgram({
      rootDir: tsDir,
      files: tsFiles,
      tsConfigPath: opts.tsConfigPath,
    });
  }

  const converterDiagnostics: TransformDiagnostic[] = [];
  const staleFiles: string[] = [];
  const sourceMapTable = new Map<string, { sourceMapJson?: string; tsFilePath?: string }>();
  let cacheHits = 0;
  let conversions = 0;

  for (const tsFile of tsFiles) {
    if (tsFile.endsWith('.d.ts')) continue;

    const relPath = relative(tsDir, tsFile);
    const gdPath = resolve(gdDir, relPath.replace(/\.ts$/, '.gd'));
    const resolvedGd = normalize(resolve(gdPath));

    // In normal (emit) mode: if cache is fresh, use cached source map + diagnostics
    if (!noEmit && cache?.isTsToGdFresh(tsFile, gdPath)) {
      const sourceMapJson = cache.getSourceMap(tsFile);
      sourceMapTable.set(resolvedGd, { sourceMapJson, tsFilePath: tsFile });
      const cached = cache.getDiagnostics(tsFile);
      if (cached) converterDiagnostics.push(...cached);
      cacheHits++;
      continue;
    }

    conversions++;
    const result = convertTsToGd({
      filePath: tsFile,
      rootDir: tsDir,
      tsDir,
      gdDir,
      projectRoot,
      tsConfigPath: opts.tsConfigPath,
      sourceMap: true,
      program,
    });

    converterDiagnostics.push(...result.diagnostics);

    if (noEmit) {
      let sourceMapForThisFile: string | undefined = result.sourceMap;
      if (existsSync(gdPath)) {
        const diskContent = readFileSync(gdPath, 'utf-8');
        // Normalize line endings — Git's autocrlf may have rewritten existing
        // .gd files to CRLF while the converter always emits LF.
        const normalize = (s: string) => s.replace(/\r\n/g, '\n');
        if (normalize(diskContent) !== normalize(result.code)) {
          staleFiles.push(resolvedGd);
          sourceMapForThisFile = undefined;
          converterDiagnostics.push({
            message: `Output is stale — run 'tstogd convert' to update`,
            severity: 'warning',
            file: tsFile,
            line: 1,
            column: 1,
          });
        }
      } else {
        staleFiles.push(resolvedGd);
        sourceMapForThisFile = undefined;
        converterDiagnostics.push({
          message: `Output missing — run 'tstogd convert' to generate`,
          severity: 'warning',
          file: tsFile,
          line: 1,
          column: 1,
        });
      }
      sourceMapTable.set(resolvedGd, { sourceMapJson: sourceMapForThisFile, tsFilePath: tsFile });
    } else {
      sourceMapTable.set(resolvedGd, { sourceMapJson: result.sourceMap, tsFilePath: tsFile });
    }
  }

  debug(
    `Conversion phase done — ${cacheHits} cache hit(s), ${conversions} fresh convert(s), ` +
    `${converterDiagnostics.length} converter diagnostic(s), ${staleFiles.length} stale file(s)`,
  );

  let godotDiagnostics: TransformDiagnostic[] = [];
  if (opts.godotPath) {
    debug(`Running Godot full-project check (projectRoot=${projectRoot})`);
    godotDiagnostics = await runGodotProjectCheck({
      projectRoot,
      godotPath: opts.godotPath,
      gdDir,
      cacheDir: opts.cacheDir,
      sourceMapTable,
      signal: opts.signal,
    });
    debug(`Godot phase done — ${godotDiagnostics.length} diagnostic(s)`);
  } else {
    debug('Godot phase skipped (no godotPath)');
  }

  // TS diagnostics require a tsconfig to know about Godot types (int, float, Node, etc.).
  // Without it, results would be full of false-positive "Cannot find name" errors.
  let tsDiagnostics: TransformDiagnostic[];
  if (opts.tsConfigPath) {
    debug('Collecting TS diagnostics');
    tsDiagnostics = collectTsDiagnostics(program, tsDir);
    debug(`TS phase done — ${tsDiagnostics.length} diagnostic(s)`);
  } else {
    tsDiagnostics = [];
    console.error(
      '[checker] No --tsconfig provided; TS diagnostics skipped ' +
      '(would produce false positives for Godot types). Pass --tsconfig to enable.',
    );
  }

  return { tsDiagnostics, converterDiagnostics, godotDiagnostics, staleFiles };
}

// ─── Output helpers ───────────────────────────────────────────

export type DiagnosticSource = 'TS' | 'CONV' | 'GD';

/** Indent each line of `message` with `prefix`, preserving line breaks. */
function indentMessage(message: string, prefix: string): string {
  return message
    .split('\n')
    .map((line) => prefix + line)
    .join('\n');
}

export interface DiagnosticCounts {
  errors: number;
  typeErrors: number;
  warnings: number;
}

function countByseverity(diagnostics: TransformDiagnostic[]): DiagnosticCounts {
  let errors = 0;
  let typeErrors = 0;
  let warnings = 0;
  for (const d of diagnostics) {
    if (d.severity === 'error') errors++;
    else if (d.severity === 'type-error') typeErrors++;
    else if (d.severity === 'warning') warnings++;
  }
  return { errors, typeErrors, warnings };
}

function formatCounts(c: DiagnosticCounts): string {
  const parts: string[] = [];
  if (c.errors > 0) parts.push(`${c.errors} error(s)`);
  if (c.typeErrors > 0) parts.push(`${c.typeErrors} type-error(s)`);
  if (c.warnings > 0) parts.push(`${c.warnings} warning(s)`);
  return parts.join(', ');
}

/**
 * Multi-line summary grouped by diagnostic source. Returns `null` when
 * everything is clean (caller decides what to print in that case).
 *
 * Example output:
 *   TS:   2 error(s), 1 warning(s)
 *   CONV: 1 error(s), 2 type-error(s)
 *   GD:   2 error(s)
 */
export function summarizeDiagnostics(result: CheckResult): string | null {
  const ts = countByseverity(result.tsDiagnostics);
  const conv = countByseverity(result.converterDiagnostics);
  const gd = countByseverity(result.godotDiagnostics);

  const groups: Array<{ label: string; counts: DiagnosticCounts }> = [
    { label: 'TS  ', counts: ts },
    { label: 'CONV', counts: conv },
    { label: 'GD  ', counts: gd },
  ];

  const visible = groups.filter(
    (g) => g.counts.errors > 0 || g.counts.typeErrors > 0 || g.counts.warnings > 0,
  );
  if (visible.length === 0) return null;

  return visible.map((g) => `  ${g.label}: ${formatCounts(g.counts)}`).join('\n');
}

/**
 * True when the result contains any reportable error (hard or type-error).
 * Used by callers to decide exit codes.
 */
export function hasReportableErrors(result: CheckResult): boolean {
  for (const d of result.tsDiagnostics) {
    if (d.severity === 'error') return true;
  }
  for (const d of result.converterDiagnostics) {
    if (d.severity === 'error' || d.severity === 'type-error') return true;
  }
  for (const d of result.godotDiagnostics) {
    if (d.severity === 'error') return true;
  }
  return false;
}

/**
 * Print diagnostics for a single source. Format:
 *   ━━━━━━━━━━ <SOURCE> ━━━━━━━━━━     ← group separator (only when non-empty)
 *   [SOURCE:severity] file:line:col      ← header line
 *       message                          ← indented message
 *                                        ← empty line between errors
 */
export function printDiagnostics(
  diagnostics: TransformDiagnostic[],
  source: DiagnosticSource,
): void {
  const visible = diagnostics.filter((d) => d.severity !== 'info');
  if (visible.length === 0) return;

  console.error('');
  console.error(`━━━━━━━━━━ ${source} ━━━━━━━━━━`);
  console.error('');

  for (const d of visible) {
    console.error(`[${source}:${d.severity}] ${d.file}:${d.line}:${d.column}`);
    console.error(indentMessage(d.message, '    '));
    console.error('');
  }
}
