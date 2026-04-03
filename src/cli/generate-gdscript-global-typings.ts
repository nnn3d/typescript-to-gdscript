import type { Command } from 'commander';
import { existsSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';
import { generateGodotDocsTypings } from '../typings/godot-docs.ts';
import { parseGodotVersion } from '../typings/godot-registry.ts';
import { writeVersionIndexDts, writeLatestIndexDts } from './helpers.ts';

/**
 * Detects Godot version from vendor/godot/version.py relative to the given godot docs dir.
 */
function detectGodotVersion(docsDir: string): string | null {
  const candidates = [
    join(docsDir, '..', '..', 'version.py'),
    join(docsDir, '..', 'version.py'),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      const ver = parseGodotVersion(candidate);
      return ver.short;
    }
  }
  return null;
}

export function registerGenerateGdscriptGlobalTypingsCommand(program: Command): void {
  program
    .command('generate-gdscript-global-typings')
    .description(
      'Generate TypeScript typings and class registry from Godot docs into versioned typings folder',
    )
    .option('--docs-dir <dir>', 'Godot XML class documentation directory')
    .option('--typings-dir <dir>', 'Root typings directory', 'typings')
    .option('--override-dir <dir>', 'Directory containing override .d.ts files')
    .option(
      '--version <ver>',
      'Godot version label (auto-detected from vendor/godot/version.py if omitted)',
    )
    .option('--set-latest', 'Also update latest/ reference', true)
    .action((opts) => {
      if (!opts.docsDir) {
        console.error('--docs-dir is required');
        process.exit(1);
      }

      const docsDir = resolve(opts.docsDir);
      const typingsRoot = resolve(opts.typingsDir);
      const version = opts.version ?? detectGodotVersion(docsDir);

      if (!version) {
        console.error(
          'Could not detect Godot version. Use --version to specify it.',
        );
        process.exit(1);
      }

      const versionDir = join(typingsRoot, version);
      mkdirSync(versionDir, { recursive: true });

      const registryPath = join(versionDir, 'godot-class-registry.json');
      const overrideDir = opts.overrideDir
        ? resolve(opts.overrideDir)
        : join(typingsRoot, '_overrides');

      generateGodotDocsTypings({
        classDocsDir: docsDir,
        outputDir: versionDir,
        overrideDir: existsSync(overrideDir) ? overrideDir : undefined,
        registryOutputPath: registryPath,
        version,
      });

      writeVersionIndexDts(versionDir);
      console.log(`Generated typings for Godot ${version} in ${versionDir}`);

      if (opts.setLatest) {
        const latestDir = join(typingsRoot, 'latest');
        writeLatestIndexDts(latestDir, version);
        console.log(`Updated latest/ → ${version}`);
      }
    });
}
