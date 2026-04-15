import type { Command } from 'commander';
import { resolve } from 'path';
import { generateAddonTypings } from '../typings/scenes.ts';
import { resolveConfig } from '../config/index.ts';
import { ProjectCache } from '../cache/index.ts';
import { debugLog } from './helpers.ts';

export function registerGenerateAddonTypingsCommand(program: Command): void {
  program
    .command('generate-addon-typings')
    .description(
      'Generate TypeScript typings for GDScript addon files in addons/',
    )
    .option('-o, --output <path>', 'Output directory for generated typings')
    .option('--root-dir <dir>', 'Root directory', '.')
    .action((opts) => {
      const cfg = resolveConfig({
        overrides: {
          rootDir: opts.rootDir,
        },
      });

      const outputDir = opts.output ? resolve(opts.output) : cfg.typingsDir;
      const cache = new ProjectCache(cfg.cacheDir, cfg.sourcemapsDir);

      const writtenFiles = generateAddonTypings({
        rootDir: cfg.rootDir,
        outputDir,
        ignore: cfg.ignore,
        cache,
      });
      debugLog(`Generated ${writtenFiles.length} addon typings files in ${outputDir}`);
    });
}
