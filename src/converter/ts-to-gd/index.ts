import ts from 'typescript';
import { createTsProgram } from '../../parser/typescript/index.ts';
import type { TransformResult } from '../common/index.ts';
import { TsToGdTransformer } from './transformer.ts';

export interface ConvertOptions {
  /** Path to the TypeScript file */
  filePath: string;
  /** Root directory of the project */
  rootDir: string;
  /** Path to tsconfig.json */
  tsConfigPath?: string;
  /** Whether to generate source maps */
  sourceMap?: boolean;
  /** Pre-created TypeScript program (for batch mode) */
  program?: ts.Program;
}

export function convertTsToGd(options: ConvertOptions): TransformResult {
  const program = options.program ?? createTsProgram({
    rootDir: options.rootDir,
    files: [options.filePath],
    tsConfigPath: options.tsConfigPath,
  });

  const sourceFile = program.getSourceFile(options.filePath);
  if (!sourceFile) {
    return {
      code: '',
      diagnostics: [{
        message: `File not found: ${options.filePath}`,
        severity: 'error',
        file: options.filePath,
        line: 0,
        column: 0,
      }],
    };
  }

  const transformer = new TsToGdTransformer({
    program,
    checker: program.getTypeChecker(),
    sourceFile,
    filePath: options.filePath,
    diagnostics: [],
  }, {
    sourceMap: options.sourceMap ?? false,
  });

  return transformer.transform();
}
