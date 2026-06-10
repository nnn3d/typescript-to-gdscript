import type { Command } from 'commander';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import { convertTsToGd } from '../converter/ts-to-gd/index.ts';
import { createTsProgram } from '../parser/typescript/index.ts';
import { resolveConfig, resolveGodotPath } from '../config/index.ts';
import { ProjectCache } from '../cache/index.ts';
import { isConversionErrorSeverity } from '../converter/common/index.ts';
import { debugLog, resolveFiles, generateAllTypings } from './helpers.ts';
import {
  collectProjectDiagnostics,
  printDiagnostics,
  summarizeDiagnostics,
  hasReportableErrors,
} from '../checker/index.ts';

export function registerConvertCommand(program: Command): void {
  program
    .command('convert')
    .description(
      'Convert TypeScript file(s) to GDScript. If no files given, converts all .ts files in tsDir. ' +
        'Converts every file fresh by default — correct even when types in other files changed; ' +
        'pass --use-cache to skip content-unchanged files (faster, may serve stale output). ' +
        'After writing, runs full diagnostic check (TS + converter + Godot) unless --no-check is set.',
    )
    .argument('[files...]', 'TypeScript files or glob patterns to convert')
    .option('--ts-dir <dir>', 'TypeScript source directory')
    .option('--gd-dir <dir>', 'GDScript output directory')
    .option('--root-dir <dir>', 'Root directory', '.')
    .option('--tsconfig <path>', 'Path to tsconfig.json')
    .option(
      '--godot-path <path>',
      'Path to Godot executable (enables GDScript validation)',
    )
    .option('--project-root <dir>', 'Godot project root for validation')
    .option(
      '--use-cache',
      'Skip conversion for files with a fresh cache entry. Fast, but can keep ' +
        'stale .gd output when types in imported files or global typings changed ' +
        '(freshness is judged by file content only)',
      false,
    )
    .option('--no-cache', 'Disable cache entirely (no reads, no writes)')
    .option(
      '--emit-on-error',
      'Emit output files even when conversion errors occur',
      false,
    )
    .option(
      '--no-emit',
      'Dry-run: convert in memory, check for stale outputs, do not write files',
    )
    .option('--no-check', 'Skip the post-convert diagnostic check (TS + Godot)')
    .action(async (files: string[], opts) => {
      const cfg = resolveConfig({
        overrides: {
          rootDir: opts.rootDir,
          tsDir: opts.tsDir,
          gdDir: opts.gdDir,
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
        console.log('No TypeScript files found to convert.');
        return;
      }

      // commander: --no-emit sets opts.emit = false, --no-check sets opts.check = false
      const noEmit: boolean = opts.emit === false;
      const noCheck: boolean = opts.check === false;
      // Cache is write-only by default: every run converts fresh (correct even
      // when types in OTHER files changed — content hashes can't see that),
      // but results are still recorded so the watcher / ts-plugin / check
      // phase can reuse them. `--use-cache` opts into the read-side skip;
      // `--no-cache` disables the cache entirely.
      const cache =
        opts.cache !== false ? new ProjectCache(cfg.cacheDir) : null;
      const useCacheReads: boolean = opts.useCache === true && cache !== null;

      debugLog(
        `${noEmit ? 'Checking' : 'Converting'} ${resolvedFiles.length} file(s)...`,
      );

      // Build the ts.Program once and share it across the write loop and the
      // post-convert checker — avoids re-parsing every .ts file twice.
      debugLog(`Building shared ts.Program (${resolvedFiles.length} file(s))`);
      const sharedProgram = createTsProgram({
        rootDir: cfg.tsDir,
        files: resolvedFiles.filter((f) => !f.endsWith('.d.ts')),
        tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
      });

      let hasErrors = false;
      let skipped = 0;

      if (!noEmit) {
        // ── Write mode ───────────────────────────────────��─────
        for (const filePath of resolvedFiles) {
          const relPath = relative(cfg.tsDir, filePath);
          const outputPath = resolve(
            cfg.gdDir,
            relPath.replace(/\.ts$/, '.gd'),
          );

          if (useCacheReads && cache?.isTsToGdFresh(filePath, outputPath)) {
            debugLog(`Skipped (cache): ${outputPath}`);
            skipped++;
            continue;
          }

          if (useCacheReads && cache?.hasFreshCachedGd(filePath)) {
            const promoted = cache.promoteCachedGd(filePath, outputPath);
            if (promoted && cache.isTsToGdFresh(filePath, outputPath)) {
              debugLog(`Promoted (cache-folder): ${outputPath}`);
              skipped++;
              continue;
            }
          }

          const result = convertTsToGd({
            filePath,
            rootDir: cfg.tsDir,
            tsDir: cfg.tsDir,
            gdDir: cfg.gdDir,
            projectRoot: cfg.rootDir,
            tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
            sourceMap: true,
            program: sharedProgram,
          });

          // When the post-convert checker runs, it will print converter diagnostics
          // (from cache or fresh re-convert). Only print here when --no-check is set,
          // so users with --no-check still see errors.
          if (noCheck) {
            for (const diag of result.diagnostics) {
              if (diag.severity === 'info') continue;
              console.error(
                `[CONV:${diag.severity}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`,
              );
            }
          }

          if (
            result.diagnostics.some((d) =>
              isConversionErrorSeverity(d.severity),
            )
          ) {
            hasErrors = true;
            if (!opts.emitOnError) continue;
          }

          mkdirSync(dirname(outputPath), { recursive: true });
          writeFileSync(outputPath, result.code);
          debugLog(`Written: ${outputPath}`);

          if (cache && result.sourceMap) {
            cache.updateTsToGd(
              filePath,
              outputPath,
              result.sourceMap,
              result.diagnostics,
              {
                gdContent: result.code,
              },
            );
          }
        }

        if (skipped > 0) debugLog(`Skipped ${skipped} unchanged file(s)`);

        if (cache) {
          const currentFiles = new Set(
            resolvedFiles.map((f) => f.replace(/\\/g, '/')),
          );
          cache.cleanStale(currentFiles);
          cache.save();
        }

        generateAllTypings({ ...cfg, tsFiles: resolvedFiles });
      }

      // ── Diagnostic check ────────────────────────────────────
      if (!noCheck) {
        debugLog('Starting diagnostic check phase');
        let godotPath: string | undefined;
        if (!cfg.disableGodotLint) {
          try {
            godotPath = resolveGodotPath({ godotPath: cfg.godotPath });
          } catch {
            // godotPath unavailable — Godot check skipped
          }
        }
        const projectRoot = opts.projectRoot
          ? resolve(opts.projectRoot)
          : cfg.rootDir;
        debugLog(
          `Diagnostic check: godotPath=${godotPath ?? '(skipped)'}, tsConfig=${cfg.tsconfig ?? '(none)'}, projectRoot=${projectRoot}`,
        );

        const checkResult = await collectProjectDiagnostics({
          tsDir: cfg.tsDir,
          gdDir: cfg.gdDir,
          projectRoot,
          tsFiles: resolvedFiles.filter((f) => !f.endsWith('.d.ts')),
          tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
          cache,
          godotPath,
          cacheDir: cfg.cacheDir,
          noEmit,
          program: sharedProgram,
          onDebug: debugLog,
        });

        printDiagnostics(checkResult.tsDiagnostics, 'TS');
        printDiagnostics(checkResult.converterDiagnostics, 'CONV');
        printDiagnostics(checkResult.godotDiagnostics, 'GD');

        if (hasReportableErrors(checkResult)) hasErrors = true;

        const summary = summarizeDiagnostics(checkResult);
        if (summary) {
          console.log('\nCheck complete:');
          console.log(summary);
        } else {
          console.log('\nCheck complete: no issues found.');
        }
      }

      if (hasErrors) process.exit(1);
    });
}
