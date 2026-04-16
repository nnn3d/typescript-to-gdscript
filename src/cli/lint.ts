import type { Command } from 'commander';
import { writeFileSync, mkdirSync, existsSync, rmSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import { convertTsToGd } from '../converter/ts-to-gd/index.ts';
import { validateGdFilesSync } from '../godot-validate/index.ts';
import { resolveConfig, resolveGodotPath } from '../config/index.ts';
import { ProjectCache } from '../cache/index.ts';
import { debugLog, resolveFiles } from './helpers.ts';
import {
  isConversionErrorSeverity,
  isReportableErrorSeverity,
} from '../converter/common/index.ts';
import { tmpdir } from 'os';

export function registerLintCommand(program: Command): void {
  program
    .command('lint')
    .description(
      'Lint TypeScript files by converting to GDScript and reporting diagnostics. If no files given, lints all .ts files in tsDir.',
    )
    .argument('[files...]', 'TypeScript files or glob patterns to lint')
    .option('--root-dir <dir>', 'Root directory', '.')
    .option('--ts-dir <dir>', 'TypeScript source directory')
    .option('--tsconfig <path>', 'Path to tsconfig.json')
    .option(
      '--godot-path <path>',
      'Path to Godot executable (enables GDScript validation)',
    )
    .option('--project-root <dir>', 'Godot project root for validation')
    .option('--godot-validate-on-error', 'Run Godot validation even when converter errors are present')
    .option('--no-cache', 'Disable cache (force full re-lint)')
    .action((files: string[], opts) => {
      const cfg = resolveConfig({
        overrides: {
          rootDir: opts.rootDir,
          tsDir: opts.tsDir,
          tsconfig: opts.tsconfig,
          godotPath: opts.godotPath,
        },
      });

      const resolvedFiles = resolveFiles(
        files.length > 0 ? files : undefined,
        '.ts',
        cfg.tsDir,
        cfg.rootDir,
        cfg.ignore,
      );

      if (resolvedFiles.length === 0) {
        console.log('No TypeScript files found to lint.');
        return;
      }

      let godotPath: string | undefined;
      if (!cfg.disableGodotLint) {
        godotPath = resolveGodotPath({ godotPath: cfg.godotPath });
      }
      const projectRoot = opts.projectRoot
        ? resolve(opts.projectRoot)
        : cfg.rootDir;

      const useCache = opts.cache !== false;
      const cache = useCache ? new ProjectCache(cfg.cacheDir) : null;

      let totalErrors = 0;
      let totalWarnings = 0;
      let skipped = 0;

      for (const filePath of resolvedFiles) {
        if (filePath.endsWith('.d.ts')) continue;

        const relPath = relative(cfg.tsDir, filePath);
        const gdPath = resolve(cfg.gdDir, relPath.replace(/\.ts$/, '.gd'));

        // Cache check: if TS→GD conversion is fresh, report cached diagnostics
        // and re-run Godot validation (without re-converting).
        if (cache?.isTsToGdFresh(filePath, gdPath)) {
          skipped++;
          debugLog(`Cached: ${relPath}`);
          // Only real conversion errors block Godot validation;
          // type-errors still produced a valid .gd, so Godot validation runs on them.
          let fileHasConversionError = false;

          // Report cached converter diagnostics
          const cachedDiags = cache.getDiagnostics(filePath);
          if (cachedDiags) {
            for (const diag of cachedDiags) {
              if (diag.severity === 'info') continue;
              if (isConversionErrorSeverity(diag.severity)) {
                totalErrors++;
                fileHasConversionError = true;
              } else if (isReportableErrorSeverity(diag.severity)) {
                totalErrors++;
              } else {
                totalWarnings++;
              }
              const prefix = isReportableErrorSeverity(diag.severity) ? 'ERROR' : 'WARN';
              console.error(
                `[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`,
              );
            }
          }

          // Godot validation — runs for type-errors (valid .gd); skipped only on real
          // conversion errors unless --godot-validate-on-error is set.
          if ((!fileHasConversionError || opts.godotValidateOnError) && godotPath && existsSync(gdPath)) {
            const sourceMapJson = cache.getSourceMap(filePath);
            const validateResult = validateGdFilesSync({
              gdFiles: [{ path: gdPath, sourceMapJson, tsFilePath: filePath }],
              projectRoot,
              godotPath,
            });
            for (const diag of validateResult.diagnostics) {
              const prefix = diag.severity === 'error' ? 'ERROR' : 'WARN';
              if (diag.severity === 'error') totalErrors++;
              else totalWarnings++;
              console.error(
                `[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`,
              );
            }
          }
          continue;
        }

        // Not cached — convert and report diagnostics
        debugLog(`Converting: ${relPath}`);
        const result = convertTsToGd({
          filePath,
          rootDir: cfg.tsDir,
          tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
          sourceMap: true,
        });

        // Only real conversion errors block Godot validation;
        // type-errors still produced valid .gd, so Godot validation runs on them.
        let fileHasConversionError = false;

        for (const diag of result.diagnostics) {
          if (diag.severity === 'info') continue;
          if (isConversionErrorSeverity(diag.severity)) {
            totalErrors++;
            fileHasConversionError = true;
          } else if (isReportableErrorSeverity(diag.severity)) {
            totalErrors++;
          } else {
            totalWarnings++;
          }
          const prefix = isReportableErrorSeverity(diag.severity) ? 'ERROR' : 'WARN';
          console.error(
            `[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`,
          );
        }

        // Godot validation — runs for type-errors (valid .gd); skipped only on real
        // conversion errors unless --godot-validate-on-error is set.
        if ((!fileHasConversionError || opts.godotValidateOnError) && godotPath) {
          const gdRelPath = relPath.replace(/\.ts$/, '.gd');
          const gdAbsPath = resolve(tmpdir(), 'tstogd', gdRelPath);
          const gdDir = dirname(gdAbsPath);

          try {
            mkdirSync(gdDir, { recursive: true });
            writeFileSync(gdAbsPath, result.code);

            const validateResult = validateGdFilesSync({
              gdFiles: [
                {
                  path: gdAbsPath,
                  sourceMapJson: result.sourceMap,
                  tsFilePath: filePath,
                },
              ],
              projectRoot,
              godotPath,
            });

            for (const diag of validateResult.diagnostics) {
              const prefix = diag.severity === 'error' ? 'ERROR' : 'WARN';
              if (diag.severity === 'error') {
                totalErrors++;
              } else {
                totalWarnings++;
              }
              console.error(
                `[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`,
              );
            }
          } finally {
            try {
              if (existsSync(gdAbsPath)) rmSync(gdAbsPath);
              const mapPath = gdAbsPath + '.map';
              if (existsSync(mapPath)) rmSync(mapPath);
            } catch {
              // Ignore cleanup errors
            }
          }
        }
      }

      if (skipped > 0) {
        debugLog(`Skipped ${skipped} unchanged file(s)`);
      }

      if (totalErrors > 0 || totalWarnings > 0) {
        console.log(
          `\nLint complete: ${totalErrors} error(s), ${totalWarnings} warning(s)`,
        );
      } else {
        console.log(
          `\nLint complete: ${resolvedFiles.length} file(s) checked, no issues found.`,
        );
      }

      if (totalErrors > 0) process.exit(1);
    });
}
