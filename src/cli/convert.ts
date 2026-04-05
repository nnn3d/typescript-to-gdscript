import type { Command } from 'commander';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import { convertTsToGd } from '../converter/ts-to-gd/index.ts';
import { resolveConfig } from '../config/index.ts';
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
    .option('--source-map', 'Generate source maps', false)
    .option('--root-dir <dir>', 'Root directory', '.')
    .option('--tsconfig <path>', 'Path to tsconfig.json')
    .option('--emit-on-error', 'Emit output files even when conversion errors occur', false)
    .action((files: string[], opts) => {
      const cfg = resolveConfig({
        overrides: {
          rootDir: opts.rootDir,
          tsDir: opts.tsDir,
          gdDir: opts.gdDir,
          tsconfig: opts.tsconfig,
          sourceMap: opts.sourceMap,
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

      debugLog(`Converting ${resolvedFiles.length} file(s)...`);

      let hasErrors = false;
      for (const filePath of resolvedFiles) {
        const result = convertTsToGd({
          filePath,
          rootDir: cfg.tsDir,
          tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
          sourceMap: cfg.sourceMap,
        });

        for (const diag of result.diagnostics) {
          const prefix =
            diag.severity === 'error'
              ? 'ERROR'
              : diag.severity === 'warning'
                ? 'WARN'
                : 'INFO';
          console.error(
            `[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`,
          );
        }

        if (result.diagnostics.some((d) => d.severity === 'error')) {
          hasErrors = true;
          if (!opts.emitOnError) continue;
        }

        const relPath = relative(cfg.tsDir, filePath);
        const outputPath = resolve(cfg.gdDir, relPath.replace(/\.ts$/, '.gd'));

        mkdirSync(dirname(outputPath), { recursive: true });
        writeFileSync(outputPath, result.code);
        debugLog(`Written: ${outputPath}`);

        if (result.sourceMap) {
          const mapPath = outputPath + '.map';
          writeFileSync(mapPath, result.sourceMap);
          debugLog(`Written: ${mapPath}`);
        }
      }

      generateAllTypings({
        ...cfg,
        tsFiles: resolvedFiles,
      });

      if (hasErrors) process.exit(1);
    });
}
