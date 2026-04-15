import type { Command } from 'commander';
import { rmSync } from 'fs';
import { resolveConfig } from '../config/index.ts';

export function registerClearCacheCommand(program: Command): void {
  program
    .command('clear-cache')
    .description('Clear the conversion cache')
    .action(() => {
      const cfg = resolveConfig();
      rmSync(cfg.cacheDir, { recursive: true, force: true });
      console.log(`Cache cleared: ${cfg.cacheDir}`);
    });
}
