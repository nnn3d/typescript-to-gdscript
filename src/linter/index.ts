import ts from 'typescript';
import { createTsProgram } from '../parser/typescript/index.js';
import type { TransformDiagnostic } from '../converter/common/index.js';
import { lintRules } from './rules/index.js';

export interface LintOptions {
  /** Files to lint */
  files: string[];
  /** Root directory */
  rootDir: string;
  /** Path to tsconfig.json */
  tsConfigPath?: string;
  /** Pre-created program */
  program?: ts.Program;
}

export interface LintResult {
  file: string;
  diagnostics: TransformDiagnostic[];
}

/**
 * Lints TypeScript files for transformation errors and unsupported features.
 */
export function lintFiles(options: LintOptions): LintResult[] {
  const program = options.program ?? createTsProgram({
    rootDir: options.rootDir,
    files: options.files,
    tsConfigPath: options.tsConfigPath,
  });

  const checker = program.getTypeChecker();
  const results: LintResult[] = [];

  for (const filePath of options.files) {
    const sourceFile = program.getSourceFile(filePath);
    if (!sourceFile) continue;

    const diagnostics: TransformDiagnostic[] = [];

    for (const rule of lintRules) {
      rule(sourceFile, checker, diagnostics);
    }

    results.push({ file: filePath, diagnostics });
  }

  return results;
}
