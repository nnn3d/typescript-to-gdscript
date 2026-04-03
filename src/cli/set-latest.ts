import type { Command } from 'commander';
import { existsSync } from 'fs';
import { resolve, join } from 'path';
import { writeLatestIndexDts, getAvailableVersions } from './helpers.ts';

export function registerSetLatestCommand(program: Command): void {
  program
    .command('set-latest')
    .description(
      'Set the "latest" typings to point to an existing version folder',
    )
    .argument('<version>', 'Version folder name to point to (e.g. "4.7")')
    .option('--typings-dir <dir>', 'Root typings directory', 'typings')
    .action((version: string, opts) => {
      const typingsRoot = resolve(opts.typingsDir);
      const sourceDir = join(typingsRoot, version);
      const latestDir = join(typingsRoot, 'latest');

      if (!existsSync(sourceDir)) {
        console.error(`Version folder not found: ${sourceDir}`);
        console.error(
          `Available versions: ${getAvailableVersions(typingsRoot).join(', ') || '(none)'}`,
        );
        process.exit(1);
      }

      writeLatestIndexDts(latestDir, version);
      console.log(`Set latest typings to version ${version}`);
    });
}
