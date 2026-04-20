import ts from 'typescript';
import { createTsProgram } from '../../parser/typescript/index.ts';
import { resolveRegistry } from '../../config/index.ts';
import type { TransformResult } from '../common/index.ts';
import { TsToGdTransformer } from './transformer.ts';
import { buildDiagnosticsTypeInfo } from './diagnostics.ts';

export interface ConvertOptions {
  /** Path to the TypeScript file */
  filePath: string;
  /** Root directory of the project */
  rootDir: string;
  /**
   * TypeScript source root (where consumer `.ts` files live). Used to
   * compute the mirrored `.gd` path for imported classes when emitting
   * `const X = preload("res://…")` and `extends "res://…"`. Defaults to
   * `rootDir` (TS and GD trees share the same root).
   */
  tsDir?: string;
  /**
   * GDScript output root. Combined with `tsDir` to mirror the relative
   * tree structure when computing import paths. Defaults to `rootDir`.
   */
  gdDir?: string;
  /**
   * Godot project root — `res://` paths in emitted `preload(...)` and
   * `extends "res://..."` are taken relative to this directory. Defaults
   * to `rootDir`.
   */
  projectRoot?: string;
  /** Path to tsconfig.json */
  tsConfigPath?: string;
  /** Whether to generate source maps */
  sourceMap?: boolean;
  /** Pre-created TypeScript program (for batch mode) */
  program?: ts.Program;
}

export function convertTsToGd(options: ConvertOptions): TransformResult {
  const program =
    options.program ??
    createTsProgram({
      rootDir: options.rootDir,
      files: [options.filePath],
      tsConfigPath: options.tsConfigPath,
    });

  const sourceFile = program.getSourceFile(options.filePath);
  if (!sourceFile) {
    return {
      code: '',
      diagnostics: [
        {
          message: `File not found: ${options.filePath}`,
          severity: 'error',
          file: options.filePath,
          line: 0,
          column: 0,
        },
      ],
    };
  }

  // Registry is optional — if unavailable, diagnostics fall back to primitive checks only.
  let registry;
  try { registry = resolveRegistry(); } catch { /* registry unavailable */ }
  const diagInfo = buildDiagnosticsTypeInfo(registry);

  const transformer = new TsToGdTransformer(
    {
      program,
      checker: program.getTypeChecker(),
      sourceFile,
      filePath: options.filePath,
      diagnostics: [],
      diagInfo,
      tsDir: options.tsDir ?? options.rootDir,
      gdDir: options.gdDir ?? options.rootDir,
      projectRoot: options.projectRoot ?? options.rootDir,
    },
    {
      sourceMap: options.sourceMap ?? false,
    },
  );

  return transformer.transform();
}
