import type { Command } from 'commander';
import { rmSync, existsSync, readdirSync } from 'fs';
import { resolveConfig } from '../config/index.ts';

export function registerClearCacheCommand(program: Command): void {
  program
    .command('clear-cache')
    .description('Clear the conversion cache')
    .action(() => {
      const cfg = resolveConfig();
      const { cacheDir } = cfg;

      if (!existsSync(cacheDir)) {
        console.log(`Cache directory does not exist: ${cacheDir}`);
        return;
      }

      try {
        rmSync(cacheDir, { recursive: true, force: true });
      } catch (err) {
        console.error(
          `Failed to delete cache directory: ${cacheDir}\n` +
            `${err instanceof Error ? err.message : String(err)}\n` +
            `If an IDE is running, close it first or restart its TypeScript service after clearing.`,
        );
        process.exit(1);
      }

      if (existsSync(cacheDir)) {
        let remaining: string[] = [];
        try {
          remaining = readdirSync(cacheDir);
        } catch { /* ignore */ }
        console.error(
          `Cache directory still exists after deletion: ${cacheDir}` +
            (remaining.length > 0
              ? `\nRemaining files: ${remaining.join(', ')}`
              : '') +
            `\nThis usually means another process (IDE, watcher) is holding files open.` +
            `\nRestart your IDE's TypeScript service and try again.`,
        );
        process.exit(1);
      }

      console.log(`Cache cleared: ${cacheDir}`);
    });
}
