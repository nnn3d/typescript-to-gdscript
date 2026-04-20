import type { Command } from 'commander';
import { resolve } from 'path';
import { generateTypings } from '../typings/scenes.ts';
import { resolveConfig } from '../config/index.ts';
import { ProjectCache } from '../cache/index.ts';
import { debugLog, resolveFiles } from './helpers.ts';

export function registerGenerateTypingsCommand(program: Command): void {
  program
    .command('generate-typings')
    .description(
      'Generate globals.d.ts with class declarations, scene overloads, GodotResources, and autoloads. If no files given, scans tsDir.',
    )
    .argument('[files...]', 'TypeScript source files or glob patterns')
    .option('-o, --output <path>', 'Output .d.ts file path')
    .option(
      '--typings-dir <path>',
      'Directory for all generated typings (relative to rootDir)',
    )
    .option('--root-dir <dir>', 'Root directory', '.')
    .option('--tsconfig <path>', 'Path to tsconfig.json')
    .action((files: string[], opts) => {
      const cfg = resolveConfig({
        overrides: {
          rootDir: opts.rootDir,
          typingsDir: opts.typingsDir,
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
        console.log('No TypeScript files found.');
        return;
      }

      const outputDir = opts.output ? resolve(opts.output) : cfg.typingsDir;
      const cache = new ProjectCache(cfg.cacheDir);

      const writtenFiles = generateTypings({
        rootDir: cfg.rootDir,
        tsDir: cfg.tsDir,
        gdDir: cfg.gdDir,
        files: resolvedFiles,
        outputDir,
        scenesDir: cfg.scenesDir,
        tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
        ignore: cfg.ignore,
        projectFile: cfg.projectFile,
        cache,
        onDebug: debugLog,
        godotTypingsDir: cfg.godotTypingsDir,
        generateGlobalClassTypes: cfg.converterOptions.generateGlobalClassTypes,
      });
      debugLog(`Generated ${writtenFiles.length} typings files in ${outputDir}`);
    });
}
