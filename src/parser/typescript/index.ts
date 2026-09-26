import ts from 'typescript';
import { readFileSync } from 'fs';
import { dirname } from 'path';
import { pathKey } from '../../utils/path-key.ts';

export interface TsProgramOptions {
  rootDir: string;
  files: string[];
  tsConfigPath?: string;
  /** Previous program for incremental reuse — TypeScript skips re-parsing unchanged files. */
  oldProgram?: ts.Program;
  /**
   * Compiler options applied on top of the ones the tsconfig resolves
   * to. Used by the addon declaration emitter, which needs the user's
   * type resolution but its own emit settings.
   */
  overrideOptions?: ts.CompilerOptions;
  /**
   * Add `files` to the program as extra roots alongside the ones the
   * tsconfig resolves to. Off by default: with a tsconfig the config's
   * own file set is the program, and every existing caller passes files
   * that set already covers.
   *
   * Addon declaration emit is the exception — its sources live in a temp
   * dir outside the project, so nothing in the config pulls them in and
   * nothing imports them either.
   */
  includeFilesAsRoots?: boolean;
  /**
   * Narrows the roots taken from the tsconfig. Programs over addon code
   * use it to take the project's declarations but not the addon output
   * they are rebuilding — see `addonProgramRoots`.
   */
  filterConfigRoots?: (file: string) => boolean;
}

export function createTsProgram(options: TsProgramOptions): ts.Program {
  if (options.tsConfigPath) {
    const configFile = ts.readConfigFile(options.tsConfigPath, (path) =>
      readFileSync(path, 'utf-8'),
    );
    // Use tsconfig directory for resolving include/exclude patterns (not rootDir/tsDir)
    const tsConfigDir = dirname(options.tsConfigPath);
    const parsedConfig = ts.parseJsonConfigFileContent(
      configFile.config,
      ts.sys,
      tsConfigDir,
    );
    const rootNames = options.filterConfigRoots
      ? parsedConfig.fileNames.filter(options.filterConfigRoots)
      : [...parsedConfig.fileNames];
    if (options.includeFilesAsRoots) {
      const seen = new Set(rootNames.map(pathKey));
      for (const f of options.files) {
        const key = pathKey(f);
        if (seen.has(key)) continue;
        seen.add(key);
        rootNames.push(f);
      }
    }
    return ts.createProgram(
      rootNames,
      { ...parsedConfig.options, ...options.overrideOptions },
      /* host */ undefined,
      options.oldProgram,
    );
  }

  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ES2022,
    strict: true,
    rootDir: options.rootDir,
    declaration: false,
    noEmit: true,
    ...options.overrideOptions,
  };

  return ts.createProgram(
    options.files,
    compilerOptions,
    /* host */ undefined,
    options.oldProgram,
  );
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
