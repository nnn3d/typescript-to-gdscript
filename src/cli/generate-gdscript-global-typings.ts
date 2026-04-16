import type { Command } from 'commander';
import { existsSync, mkdirSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { generateGodotDocsTypings } from '../typings/godot-docs.ts';
import { parseGodotVersion } from '../typings/godot-registry.ts';
import { writeTypingsIndexDts } from './helpers.ts';

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

/** Resolve the bundled src/typings/overrides directory next to this source file. */
function getDefaultOverrideDir(): string {
  const thisDir = dirname(fileURLToPath(import.meta.url));
  return resolve(thisDir, '..', 'typings', 'overrides');
}

export function registerGenerateGdscriptGlobalTypingsCommand(program: Command): void {
  program
    .command('generate-gdscript-global-typings')
    .description(
      'Generate TypeScript typings and class registry from Godot docs',
    )
    .option('--docs-dir <dir>', 'Godot XML class documentation directory')
    .option('--output-dir <dir>', 'Root typings output directory', 'typings')
    .option(
      '--override-dir <dir>',
      'User override directory for .d.ts files and non-nullable.json (combined with bundled defaults unless --no-default-overrides is set)',
    )
    .option(
      '--no-default-overrides',
      'Disable the bundled default overrides',
    )
    .action((opts) => {
      if (!opts.docsDir) {
        console.error('--docs-dir is required');
        process.exit(1);
      }

      const docsDir = resolve(opts.docsDir);
      const typingsRoot = resolve(opts.outputDir);
      mkdirSync(typingsRoot, { recursive: true });

      const version = detectGodotVersion(docsDir);
      if (!version) {
        console.error(
          'Could not detect Godot version from vendor/godot/version.py',
        );
        process.exit(1);
      }

      // Resolve override directories. Order: defaults first, user last (later dirs win).
      const overrideDirs: string[] = [];
      if (opts.defaultOverrides !== false) {
        const defaultDir = getDefaultOverrideDir();
        if (existsSync(defaultDir)) overrideDirs.push(defaultDir);
      }
      if (opts.overrideDir) {
        const userDir = resolve(opts.overrideDir);
        if (existsSync(userDir)) overrideDirs.push(userDir);
      }

      const registryPath = join(typingsRoot, 'godot-class-registry.json');

      generateGodotDocsTypings({
        classDocsDir: docsDir,
        outputDir: typingsRoot,
        overrideDirs,
        registryOutputPath: registryPath,
        version,
      });

      writeTypingsIndexDts(typingsRoot);
      console.log(`Generated typings for Godot ${version} in ${typingsRoot}`);
    });
}
