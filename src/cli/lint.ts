import type { Command } from 'commander';
import { writeFileSync, mkdirSync, existsSync, rmSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import { convertTsToGd } from '../converter/ts-to-gd/index.ts';
import { validateGdFilesSync } from '../godot-validate/index.ts';
import { resolveConfig, resolveGodotPath } from '../config/index.ts';
import { resolveFiles } from './helpers.ts';
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

      const godotPath = cfg.godotPath
        ? resolveGodotPath({ godotPath: cfg.godotPath })
        : undefined;
      const projectRoot = opts.projectRoot
        ? resolve(opts.projectRoot)
        : cfg.rootDir;

      let totalErrors = 0;
      let totalWarnings = 0;

      for (const filePath of resolvedFiles) {
        if (filePath.endsWith('.d.ts')) continue;

        const result = convertTsToGd({
          filePath,
          rootDir: cfg.tsDir,
          tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
          sourceMap: true,
        });

        let fileHasErrors = false;

        for (const diag of result.diagnostics) {
          if (diag.severity === 'info') continue;
          const prefix = diag.severity === 'error' ? 'ERROR' : 'WARN';
          if (diag.severity === 'error') {
            totalErrors++;
            fileHasErrors = true;
          } else {
            totalWarnings++;
          }
          console.error(
            `[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`,
          );
        }

        if (!fileHasErrors && godotPath) {
          const relPath = relative(cfg.tsDir, filePath);
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
