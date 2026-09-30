import ts from 'typescript';
import { createMemoryHost } from '../parser/typescript/memory-host.ts';
import { convertTsToGd } from '../converter/ts-to-gd/index.ts';
import { GodotClassRegistry } from '../typings/godot-registry.ts';
import { collectTsDiagnostics } from '../checker/ts-diagnostics.ts';
import type { TransformDiagnostic } from '../converter/common/index.ts';
import { TYPINGS_ROOT, type TypingsBundle } from './bundle.ts';

export { TYPINGS_ROOT, type TypingsBundle } from './bundle.ts';

/** A diagnostic tagged with where it came from. */
export interface PlaygroundDiagnostic extends TransformDiagnostic {
  source: 'ts' | 'converter';
}

export interface BrowserConvertResult {
  code: string;
  diagnostics: PlaygroundDiagnostic[];
}

export interface BrowserConverter {
  convert(source: string, fileName?: string): BrowserConvertResult;
}

export const DEFAULT_FILE = '/src/main.ts';

/** The compiler options `tstogd init` writes into a project's tsconfig.json. */
export const COMPILER_OPTIONS: ts.CompilerOptions = {
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Classic,
  noLib: true,
  strict: true,
  noEmit: true,
  types: [],
};

/**
 * TS→GD conversion of a single file with no filesystem: the typings live
 * in memory and each call rebuilds the program on top of the previous
 * one, so the typings are parsed once.
 */
export function createBrowserConverter(
  bundle: TypingsBundle,
): BrowserConverter {
  const typingsIndex = `${TYPINGS_ROOT}/index.d.ts`;
  if (!(typingsIndex in bundle.typings)) {
    throw new Error(`Typings bundle has no ${typingsIndex}`);
  }
  const registry = GodotClassRegistry.fromJson(bundle.registryJson);
  const host = createMemoryHost(new Map(Object.entries(bundle.typings)));
  let program: ts.Program | undefined;

  return {
    convert(source, fileName = DEFAULT_FILE) {
      if (!fileName.startsWith('/')) {
        throw new Error(
          `fileName must be an absolute virtual path: ${fileName}`,
        );
      }
      host.setFile(fileName, source);
      program = ts.createProgram({
        rootNames: [typingsIndex, fileName],
        options: COMPILER_OPTIONS,
        host,
        oldProgram: program,
      });
      const rootDir = fileName.slice(0, fileName.lastIndexOf('/')) || '/';
      const tsDiagnostics = collectTsDiagnostics(program, rootDir).map(
        (d): PlaygroundDiagnostic => ({ ...d, file: fileName, source: 'ts' }),
      );
      const result = convertTsToGd({
        filePath: fileName,
        rootDir,
        program,
        registry,
      });
      return {
        code: result.code,
        diagnostics: [
          ...tsDiagnostics,
          ...result.diagnostics.map(
            (d): PlaygroundDiagnostic => ({
              ...d,
              file: fileName,
              source: 'converter',
            }),
          ),
        ],
      };
    },
  };
}
