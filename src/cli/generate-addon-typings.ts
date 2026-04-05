import type { Command } from 'commander';
import { resolve } from 'path';
import { generateAddonTypings } from '../typings/scenes.ts';
import { resolveConfig } from '../config/index.ts';
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

      const writtenFiles = generateAddonTypings({
        rootDir: cfg.rootDir,
        outputDir,
        ignore: cfg.ignore,
        registryPath: cfg.registryPath,
      });
      debugLog(`Generated ${writtenFiles.length} addon typings files in ${outputDir}`);
    });
}
