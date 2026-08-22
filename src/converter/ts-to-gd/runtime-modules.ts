import { resolve } from 'path';
import ts from 'typescript';
import { createTsProgram } from '../../parser/typescript/index.ts';
import type { TransformResult } from '../common/index.ts';
import { convertTsToGd, type ConvertOptions } from './index.ts';
import {
  collectRuntimeModules,
  gdImportOutputPath,
  gdOutputPath,
} from './modules.ts';

/** Options for converting entry files and every runtime module they import. */
export interface ConvertRuntimeModulesOptions extends Omit<
  ConvertOptions,
  'filePath'
> {
  /** Source files that belong to the caller's project. */
  entryFiles: readonly string[];
}

/** One converted source file and the Godot resource destination it should use. */
export interface ConvertedRuntimeModule {
  /** Absolute TypeScript source path. */
  sourcePath: string;
  /** Absolute GDScript destination path. */
  outputPath: string;
  /** GDScript conversion result for {@link sourcePath}. */
  result: TransformResult;
}

/**
 * Convert every source reachable from value imports of the entry files.
 *
 * Entry files retain the normal `tsDir` → `gdDir` mirror. Imported package
 * sources receive destinations below `projectRoot/.tstogd_modules`, matching
 * the `res://` paths emitted by the converter. The caller owns filesystem
 * writes, which keeps this API usable by CLIs, editors, and test runners.
 */
export function convertRuntimeModules(
  options: ConvertRuntimeModulesOptions,
): ConvertedRuntimeModule[] {
  const entryFiles = options.entryFiles.map((file) => resolve(file));
  const tsDir = options.tsDir ?? options.rootDir;
  const gdDir = options.gdDir ?? options.rootDir;
  const projectRoot = options.projectRoot ?? options.rootDir;
  const program =
    options.program ??
    createTsProgram({
      rootDir: options.rootDir,
      files: entryFiles,
      tsConfigPath: options.tsConfigPath,
    });
  const entryFileSet = new Set(entryFiles);
  const outputOptions = { tsDir, gdDir, projectRoot };

  return collectRuntimeModules(entryFiles, program).map((sourcePath) => {
    const outputPath = entryFileSet.has(sourcePath)
      ? gdOutputPath(sourcePath, outputOptions)
      : gdImportOutputPath(sourcePath, outputOptions);
    if (!outputPath) {
      throw new Error(
        `Cannot determine a GDScript destination for runtime module: ${sourcePath}`,
      );
    }

    return {
      sourcePath,
      outputPath,
      result: convertTsToGd({
        filePath: sourcePath,
        rootDir: options.rootDir,
        tsDir,
        gdDir,
        projectRoot,
        tsConfigPath: options.tsConfigPath,
        sourceMap: options.sourceMap,
        program,
      }),
    };
  });
}
