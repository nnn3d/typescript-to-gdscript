import type { Command } from 'commander';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import { convertTsToGd } from '../converter/ts-to-gd/index.ts';
import { resolveConfig } from '../config/index.ts';
import { ProjectCache } from '../cache/index.ts';
import { isConversionErrorSeverity } from '../converter/common/index.ts';
import { debugLog, resolveFiles, generateAllTypings } from './helpers.ts';

export function registerConvertCommand(program: Command): void {
  program
    .command('convert')
    .description(
      'Convert TypeScript file(s) to GDScript. If no files given, converts all .ts files in tsDir.',
    )
    .argument('[files...]', 'TypeScript files or glob patterns to convert')
    .option('-o, --output-dir <dir>', 'Output directory (alias for --gd-dir)')
    .option('--ts-dir <dir>', 'TypeScript source directory')
    .option('--gd-dir <dir>', 'GDScript output directory')
    .option('--root-dir <dir>', 'Root directory', '.')
    .option('--tsconfig <path>', 'Path to tsconfig.json')
    .option('--no-cache', 'Disable cache (force full reconversion)')
    .option('--emit-on-error', 'Emit output files even when conversion errors occur', false)
    .action((files: string[], opts) => {
      const cfg = resolveConfig({
        overrides: {
          rootDir: opts.rootDir,
          tsDir: opts.tsDir,
          gdDir: opts.gdDir,
          tsconfig: opts.tsconfig,
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

      const useCache = opts.cache !== false;
      const cache = useCache ? new ProjectCache(cfg.cacheDir) : null;

      debugLog(`Converting ${resolvedFiles.length} file(s)...`);

      let hasErrors = false;
      let skipped = 0;

      for (const filePath of resolvedFiles) {
        const relPath = relative(cfg.tsDir, filePath);
        const outputPath = resolve(cfg.gdDir, relPath.replace(/\.ts$/, '.gd'));

        // Check cache — skip if fresh
        if (cache?.isTsToGdFresh(filePath, outputPath)) {
          debugLog(`Skipped (cache): ${outputPath}`);
          skipped++;
          continue;
        }

        const result = convertTsToGd({
          filePath,
          rootDir: cfg.tsDir,
          tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
          sourceMap: true,
        });

        for (const diag of result.diagnostics) {
          // Only conversion errors show as ERROR in convert output;
          // type-errors and warnings both show as WARN (non-blocking).
          const prefix =
            diag.severity === 'error'
              ? 'ERROR'
              : diag.severity === 'info'
                ? 'INFO'
                : 'WARN';
          console.error(
            `[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`,
          );
        }

        if (result.diagnostics.some((d) => isConversionErrorSeverity(d.severity))) {
          hasErrors = true;
          if (!opts.emitOnError) continue;
        }

        mkdirSync(dirname(outputPath), { recursive: true });
        writeFileSync(outputPath, result.code);
        debugLog(`Written: ${outputPath}`);

        // Update cache with source map and diagnostics
        if (cache && result.sourceMap) {
          cache.updateTsToGd(filePath, outputPath, result.sourceMap, result.diagnostics);
        }
      }

      if (skipped > 0) {
        debugLog(`Skipped ${skipped} unchanged file(s)`);
      }

      // Clean stale entries and save
      if (cache) {
        const currentFiles = new Set(resolvedFiles.map((f) => f.replace(/\\/g, '/')));
        cache.cleanStale(currentFiles);
        cache.save();
      }

      generateAllTypings({
        ...cfg,
        tsFiles: resolvedFiles,
      });

      if (hasErrors) process.exit(1);
    });
}
