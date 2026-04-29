/**
 * TS-based post-processing helpers for GD-to-TS conversion.
 *
 * These run AFTER initial conversion and typings generation, using the TS
 * type-checker to find and fix issues that couldn't be detected during
 * GDScript parsing (e.g. operator overloads on inherited types).
 */

import ts from 'typescript';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { createTsProgram } from '../../parser/typescript/index.ts';
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';

import { collectOperatorFixes } from './helpers/operator-fix.ts';
import { collectExplicitConvertFixes } from './helpers/explicit-convert.ts';
import { collectReadyFieldTypeFixes } from './helpers/ready-field-types.ts';
import {
  collectExtendsTypeFixes,
  collectUnsafeAnyFieldFixes,
  collectUnsafeNonNullFixes,
} from './helpers/unsafe-helpers.ts';
import { collectNullableFixes } from './helpers/nullable.ts';

// ─── Types ───────────────────────────────────────────────────

export interface TsHelperOptions {
  /** Converted .ts file paths to process */
  files: string[];
  /** Root directory (for TS program creation) */
  rootDir: string;
  /** Path to tsconfig.json */
  tsConfigPath?: string;
  /** Godot class registry (required for explicitConvert / nullable helpers) */
  registry?: GodotClassRegistry;
  /**
   * Use `!` (definite-assignment) instead of `?` (optional) for non-primitive
   * TS2564 fields that aren't assigned in `_ready()`. Less strict but fewer
   * downstream `X | undefined` errors at usage sites.
   */
  unsafeUseAny?: boolean;
  /**
   * Addon mode: widen ALL reference-typed OUT positions to `T | null`
   * (fields, returns, locals, getters) instead of using the TS2322
   * fallback. Use when generating typings for external addon code whose
   * internals we can't type-check for null flow.
   */
  addonMode?: boolean;
}

export interface TsHelperResult {
  /** Files that were modified */
  fixedFiles: string[];
  /** Remaining diagnostics that couldn't be auto-fixed */
  diagnostics: Array<{
    file: string;
    message: string;
    line: number;
    column: number;
  }>;
}

export interface SourceFix {
  start: number;
  end: number;
  replacement: string;
}

/**
 * Apply fixes to source text, processing from end to start to preserve positions.
 */
function applyFixes(source: string, fixes: SourceFix[]): string {
  // Sort descending by start position
  const sorted = [...fixes].sort((a, b) => b.start - a.start);
  let result = source;
  for (const fix of sorted) {
    result = result.slice(0, fix.start) + fix.replacement + result.slice(fix.end);
  }
  return result;
}

// ─── Main Entry Point ────────────────────────────────────────

/**
 * Run TS-based post-processing helpers on converted files.
 * Call AFTER conversion and typings generation.
 */
/**
 * A named fix collector. The name is used in the pass log so users can see
 * which helper produced which fixes; e.g. `pass 1 — 5 fix(es) applied
 * (nullable: 3, operator-fix: 2)`.
 */
type NamedCollector = {
  name: string;
  collect: (program: ts.Program, filePaths: Set<string>) => Map<string, SourceFix[]>;
};

export function runTsHelpers(options: TsHelperOptions): TsHelperResult {
  const { files, rootDir, tsConfigPath, registry } = options;
  const unsafeUseAny = !!options.unsafeUseAny;
  const addonMode = !!options.addonMode;
  const result: TsHelperResult = { fixedFiles: [], diagnostics: [] };

  if (files.length === 0) return result;

  const MAX_FIX_PASSES = 10;
  const allFixedFiles = new Set<string>();

  const normalizedInputFiles = new Set(
    files.map((f) => resolve(f).replace(/\\/g, '/')),
  );

  /** Run a set of fix collectors in a multi-pass loop until convergence. */
  const runFixLoop = (
    collectors: NamedCollector[],
    label?: string,
  ) => {
    for (let pass = 0; pass < MAX_FIX_PASSES; pass++) {
      const program = createTsProgram({ rootDir, files, tsConfigPath });

      const filePaths = new Set<string>();
      for (const sf of program.getSourceFiles()) {
        const normalizedSf = resolve(sf.fileName).replace(/\\/g, '/');
        if (normalizedInputFiles.has(normalizedSf)) {
          filePaths.add(sf.fileName);
        }
      }

      // Merge fixes from all collectors in this pass, tagging each with the
      // producing collector's name so the pass log can attribute applied
      // fixes back to their helper.
      type TaggedFix = SourceFix & { __helper: string };
      const mergedFixes = new Map<string, TaggedFix[]>();
      for (const { name, collect } of collectors) {
        const from = collect(program, filePaths);
        for (const [file, fs] of from) {
          const tagged = fs.map((f) => ({ ...f, __helper: name }));
          const existing = mergedFixes.get(file) ?? [];
          mergedFixes.set(file, [...existing, ...tagged]);
        }
      }

      let fixedInPass = 0;
      const perHelper = new Map<string, number>();
      for (const [fileName, fixes] of mergedFixes) {
        if (fixes.length === 0) continue;

        // Drop overlapping fixes within a single pass -- keep innermost/earliest.
        const dedupedFixes: TaggedFix[] = [];
        const used: Array<{ start: number; end: number }> = [];
        for (const f of fixes) {
          const overlap = used.some(
            (u) =>
              (f.start >= u.start && f.start < u.end) ||
              (f.end > u.start && f.end <= u.end) ||
              (f.start <= u.start && f.end >= u.end),
          );
          if (overlap) continue;
          dedupedFixes.push(f);
          used.push({ start: f.start, end: f.end });
        }
        if (dedupedFixes.length === 0) continue;

        const source = readFileSync(fileName, 'utf-8');
        const fixed = applyFixes(source, dedupedFixes);
        writeFileSync(fileName, fixed);
        allFixedFiles.add(fileName);
        fixedInPass += dedupedFixes.length;
        for (const f of dedupedFixes) {
          perHelper.set(f.__helper, (perHelper.get(f.__helper) ?? 0) + 1);
        }
      }

      if (fixedInPass === 0) break;
      if (label) {
        const breakdown = [...perHelper.entries()]
          .sort((a, b) => b[1] - a[1])
          .map(([name, n]) => `${name}: ${n}`)
          .join(', ');
        console.log(
          `  [ts-helpers] ${label}: pass ${pass + 1} — ${fixedInPass} fix(es) applied (${breakdown})`,
        );
      }
    }
  };

  // Phase 1: primary helpers (converge first so the unsafe fallback only
  // fires on fields/params the other helpers couldn't resolve).
  // Order matters: nullable runs BEFORE ready-field-types so Phase A
  // widens unassigned reference fields before ready-field-types inspects them;
  // it runs AFTER operator-fix / explicit-convert so their diagnostics don't
  // pollute the TS2322 signal used by Phase C.
  const primaryCollectors: NamedCollector[] = [
    { name: 'operator-fix', collect: (program, filePaths) => collectOperatorFixes(program, filePaths) },
    ...(registry
      ? [{
          name: 'explicit-convert',
          collect: (program: ts.Program, filePaths: Set<string>) =>
            collectExplicitConvertFixes(program, filePaths, registry),
        }]
      : []),
    ...(registry
      ? [{
          name: 'nullable',
          collect: (program: ts.Program, filePaths: Set<string>) =>
            collectNullableFixes(program, filePaths, registry, { addonMode }),
        }]
      : []),
    { name: 'ready-field-types', collect: (program, filePaths) => collectReadyFieldTypeFixes(program, filePaths, registry, unsafeUseAny) },
    { name: 'extends-type', collect: (program, filePaths) => collectExtendsTypeFixes(program, filePaths) },
  ];
  console.log('[ts-helpers] Running primary helpers...');
  runFixLoop(primaryCollectors, 'primary');

  // Phase 2 (unsafe mode only): type any remaining untyped fields/params as `any`,
  // then suppress "possibly null" errors with `!` assertions.
  if (unsafeUseAny) {
    console.log('[ts-helpers] Running unsafe-any fallback...');
    runFixLoop(
      [{ name: 'unsafe-any-field', collect: (program, filePaths) => collectUnsafeAnyFieldFixes(program, filePaths) }],
      'unsafe-any',
    );
    console.log('[ts-helpers] Running unsafe non-null assertions...');
    runFixLoop(
      [{ name: 'unsafe-non-null', collect: (program, filePaths) => collectUnsafeNonNullFixes(program, filePaths) }],
      'non-null',
    );
  }

  result.fixedFiles = [...allFixedFiles];
  if (allFixedFiles.size > 0) {
    console.log(`[ts-helpers] Done — ${allFixedFiles.size} file(s) modified`);
  }
  return result;
}
