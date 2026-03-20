import ts from 'typescript';
import { readFileSync } from 'fs';

export interface TsProgramOptions {
  rootDir: string;
  files: string[];
  tsConfigPath?: string;
}

export function createTsProgram(options: TsProgramOptions): ts.Program {
  if (options.tsConfigPath) {
    const configFile = ts.readConfigFile(options.tsConfigPath, (path) =>
      readFileSync(path, 'utf-8'),
    );
    const parsedConfig = ts.parseJsonConfigFileContent(
      configFile.config,
      ts.sys,
      options.rootDir,
    );
    return ts.createProgram(parsedConfig.fileNames, parsedConfig.options);
  }

  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ES2022,
    strict: true,
    rootDir: options.rootDir,
    declaration: false,
    noEmit: true,
  };

  return ts.createProgram(options.files, compilerOptions);
}

export function getTypeChecker(program: ts.Program): ts.TypeChecker {
  return program.getTypeChecker();
}

export function getSourceFile(
  program: ts.Program,
  filePath: string,
): ts.SourceFile | undefined {
  return program.getSourceFile(filePath);
}
