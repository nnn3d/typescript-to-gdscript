import type { Command } from 'commander';
import { existsSync, mkdirSync, cpSync, copyFileSync } from 'fs';
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

/**
 * Resolve this package's bundled user-facing `typings/` directory —
 * the folder that ships `globals/`, `index.d.ts`, and (when published)
 * a pre-built `classes/`. From `src/cli/<this>.ts` and the built
 * `dist/cli/<this>.js`, both `'..', '..', 'typings'` resolve to
 * `<package_root>/typings`, so the same path works for source mode
 * (`tsx`), local builds, and installed-as-dependency layouts.
 */
function getPackageTypingsDir(): string {
  const thisDir = dirname(fileURLToPath(import.meta.url));
  return resolve(thisDir, '..', '..', 'typings');
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

      // Static globals (`globals/`, `index.d.ts`) ship with this
      // package and are NOT regenerated from Godot docs. When the
      // user is generating into their own consumer project, copy the
      // bundled copies over so `tsc` can resolve `int`, `float`,
      // `gd.signal`, the `noLib` global stubs, etc. Skip the copy
      // when the destination IS this package's own bundled folder
      // (e.g. `yarn generate:godot-typings` in the source tree) —
      // the static files are already there and re-copying them onto
      // themselves would be a no-op at best.
      const pkgTypingsDir = getPackageTypingsDir();
      const isSelfRefresh = resolve(typingsRoot) === resolve(pkgTypingsDir);
      if (!isSelfRefresh) {
        const srcGlobals = join(pkgTypingsDir, 'globals');
        const srcIndex = join(pkgTypingsDir, 'index.d.ts');
        if (existsSync(srcGlobals)) {
          cpSync(srcGlobals, join(typingsRoot, 'globals'), { recursive: true });
        }
        if (existsSync(srcIndex)) {
          copyFileSync(srcIndex, join(typingsRoot, 'index.d.ts'));
        } else {
          // Fallback for unusual layouts where the bundled
          // `index.d.ts` is missing — synthesise one with the same
          // references so the generated tree is still usable.
          writeTypingsIndexDts(typingsRoot);
        }
      } else {
        // Self-refresh: regenerate index.d.ts in place so the file
        // stays in sync with the helper's reference list even when
        // `globals/` was edited by hand.
        writeTypingsIndexDts(typingsRoot);
      }

      console.log(`Generated typings for Godot ${version} in ${typingsRoot}`);
    });
}
