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
import { collectNullableReturnFixes } from './helpers/nullable-return.ts';

// ─── Types ───────────────────────────────────────────────────

export interface TsHelperOptions {
  /** Converted .ts file paths to process */
  files: string[];
  /** Root directory (for TS program creation) */
  rootDir: string;
  /** Path to tsconfig.json */
  tsConfigPath?: string;
  /** Godot class registry (required for explicitConvert helper) */
  registry?: GodotClassRegistry;
  /**
   * Use `!` (definite-assignment) instead of `?` (optional) for non-primitive
   * TS2564 fields that aren't assigned in `_ready()`. Less strict but fewer
   * downstream `X | undefined` errors at usage sites.
   */
  unsafeUseAny?: boolean;
  /** Which helpers to run (all default to true) */
  helpers?: {
    /** Fix operator type errors by wrapping in gd.ops.X() */
    operatorFix?: boolean;
    /** Fix variant-type assignment errors by inserting explicit `gd.as(value, Target)` conversions */
    explicitConvert?: boolean;
    /** Fix TS7008/TS2564 on class properties by adding `!` and inferring type from `_ready()` assignments */
    readyFieldTypes?: boolean;
    /** Fix TS7006 implicit-any parameters on overridden methods by copying types from the parent class */
    extendsType?: boolean;
    /** Add `| null` to return types when function body returns null */
    nullableReturn?: boolean;
  };
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
export function runTsHelpers(options: TsHelperOptions): TsHelperResult {
  const { files, rootDir, tsConfigPath, registry, helpers = {} } = options;
  const unsafeUseAny = !!options.unsafeUseAny;
  const result: TsHelperResult = { fixedFiles: [], diagnostics: [] };

  if (files.length === 0) return result;

  const operatorFixEnabled = helpers.operatorFix !== false;
  const explicitConvertEnabled = helpers.explicitConvert !== false && !!registry;
  const readyFieldTypesEnabled = helpers.readyFieldTypes !== false;
  const extendsTypeEnabled = helpers.extendsType !== false;
  const nullableReturnEnabled = helpers.nullableReturn !== false;
  const unsafeAnyFallbackEnabled = unsafeUseAny;

  if (
    !operatorFixEnabled &&
    !explicitConvertEnabled &&
    !readyFieldTypesEnabled &&
    !extendsTypeEnabled &&
    !nullableReturnEnabled &&
    !unsafeAnyFallbackEnabled
  ) {
    return result;
  }

  const MAX_FIX_PASSES = 10;
  const allFixedFiles = new Set<string>();

  const normalizedInputFiles = new Set(
    files.map((f) => resolve(f).replace(/\\/g, '/')),
  );

  /** Run a set of fix collectors in a multi-pass loop until convergence. */
  const runFixLoop = (
    collectors: Array<(program: ts.Program, filePaths: Set<string>) => Map<string, SourceFix[]>>,
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

      // Merge fixes from all collectors in this pass
      const mergedFixes = new Map<string, SourceFix[]>();
      for (const collect of collectors) {
        const from = collect(program, filePaths);
        for (const [file, fs] of from) {
          const existing = mergedFixes.get(file) ?? [];
          mergedFixes.set(file, [...existing, ...fs]);
        }
      }

      let fixedInPass = 0;
      for (const [fileName, fixes] of mergedFixes) {
        if (fixes.length === 0) continue;

        // Drop overlapping fixes within a single pass -- keep innermost/earliest.
        const dedupedFixes: SourceFix[] = [];
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
      }

      if (fixedInPass === 0) break;
      if (label) {
        console.log(`  [ts-helpers] ${label}: pass ${pass + 1} — ${fixedInPass} fix(es) applied`);
      }
    }
  };

  // Phase 1: primary helpers (converge first so the unsafe fallback only
  // fires on fields/params the other helpers couldn't resolve).
  const primaryCollectors: Array<(program: ts.Program, filePaths: Set<string>) => Map<string, SourceFix[]>> = [];
  if (operatorFixEnabled) {
    primaryCollectors.push((program, filePaths) =>
      collectOperatorFixes(program, filePaths),
    );
  }
  if (explicitConvertEnabled) {
    primaryCollectors.push((program, filePaths) =>
      collectExplicitConvertFixes(program, filePaths, registry!),
    );
  }
  if (readyFieldTypesEnabled) {
    primaryCollectors.push((program, filePaths) =>
      collectReadyFieldTypeFixes(program, filePaths, registry, unsafeUseAny),
    );
  }
  if (extendsTypeEnabled) {
    primaryCollectors.push((program, filePaths) =>
      collectExtendsTypeFixes(program, filePaths),
    );
  }
  if (helpers.nullableReturn !== false) {
    primaryCollectors.push((program, filePaths) =>
      collectNullableReturnFixes(program, filePaths),
    );
  }
  if (primaryCollectors.length > 0) {
    console.log('[ts-helpers] Running primary helpers...');
    runFixLoop(primaryCollectors, 'primary');
  }

  // Phase 2 (unsafe mode only): type any remaining untyped fields/params as `any`,
  // then suppress "possibly null" errors with `!` assertions.
  if (unsafeAnyFallbackEnabled) {
    console.log('[ts-helpers] Running unsafe-any fallback...');
    runFixLoop([
      (program, filePaths) => collectUnsafeAnyFieldFixes(program, filePaths),
    ], 'unsafe-any');
    console.log('[ts-helpers] Running unsafe non-null assertions...');
    runFixLoop([
      (program, filePaths) => collectUnsafeNonNullFixes(program, filePaths),
    ], 'non-null');
  }

  result.fixedFiles = [...allFixedFiles];
  if (allFixedFiles.size > 0) {
    console.log(`[ts-helpers] Done — ${allFixedFiles.size} file(s) modified`);
  }
  return result;
}
