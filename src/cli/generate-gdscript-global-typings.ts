import type { Command } from 'commander';
import { existsSync, mkdirSync, cpSync, copyFileSync, statSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { generateGodotDocsTypings } from '../typings/godot-docs.ts';
import { parseGodotVersion } from '../typings/godot-registry.ts';
import { writeTypingsIndexDts } from './helpers.ts';

/**
 * Print an error and exit non-zero. Typed `never` so TypeScript narrows
 * subsequent code as if the call were a `throw` — eliminates the need
 * for `as` casts after validation guards.
 */
function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

/**
 * Detects Godot version from `version.py` near any of the given docs
 * dirs. For each dir, candidates are tried in this order:
 *
 *   1. `<dir>/../../version.py` — covers the canonical
 *      `vendor/godot/doc/classes/` layout (two levels up).
 *   2. `<dir>/../version.py` — fallback for callers that already
 *      pass a one-level-deep dir (e.g. `vendor/godot/some_subdir/`).
 *
 * If multiple dirs resolve to different versions, prints a warning
 * and returns the first hit so we don't silently pick a value the
 * caller may not expect.
 */
function detectGodotVersion(docsDirs: string[]): string | null {
  const hits: Array<{ docsDir: string; versionFile: string; short: string }> =
    [];
  for (const docsDir of docsDirs) {
    const candidates = [
      join(docsDir, '..', '..', 'version.py'),
      join(docsDir, '..', 'version.py'),
    ];
    for (const candidate of candidates) {
      if (existsSync(candidate)) {
        const ver = parseGodotVersion(candidate);
        hits.push({ docsDir, versionFile: candidate, short: ver.short });
        break;
      }
    }
  }
  if (hits.length === 0) return null;

  const distinct = [...new Set(hits.map((h) => h.short))];
  if (distinct.length > 1) {
    console.warn(
      `[WARN] --docs-dir entries resolve to conflicting Godot versions (${distinct.join(', ')}). Using "${hits[0]!.short}" from ${hits[0]!.versionFile}. Make sure all docs dirs come from the same Godot tree.`,
    );
  }
  return hits[0]!.short;
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

export function registerGenerateGdscriptGlobalTypingsCommand(
  program: Command,
): void {
  program
    .command('generate-gdscript-global-typings')
    .description(
      'Generate TypeScript typings and class registry from Godot docs',
    )
    .option(
      '--docs-dir <dirs...>',
      'Godot XML class documentation directories. Accepts one or more paths — Godot ships docs across `doc/classes/` and `modules/<module>/doc_classes/` (notably `modules/gdscript/doc_classes/` for `@GDScript.xml`). Pass every dir whose XMLs you want included; later dirs override earlier ones for same-named classes.',
    )
    .option('--output-dir <dir>', 'Root typings output directory', 'typings')
    .option(
      '--override-dir <dir>',
      'User override directory for .d.ts files and non-nullable.json (combined with bundled defaults unless --no-default-overrides is set)',
    )
    .option('--no-default-overrides', 'Disable the bundled default overrides')
    .action((opts) => {
      // Variadic options collect into an array; commander gives us
      // either an array (when present), `undefined` (omitted), or
      // `true` (flag passed without a value — invalid here).
      const rawDocsDirs: unknown = opts.docsDir;
      if (
        !Array.isArray(rawDocsDirs) ||
        rawDocsDirs.length === 0 ||
        !rawDocsDirs.every((d) => typeof d === 'string')
      ) {
        fail('--docs-dir is required (one or more directories)');
      }
      const docsDirs = rawDocsDirs.map((d) => resolve(d));

      // Validate each path early. Variadic options consume positional
      // values until the next flag, so a stray non-dir argument (e.g.
      // `--docs-dir doc1 doc2 typings` where `typings` was meant for
      // `--output-dir`) would otherwise fail deep inside `readdirSync`
      // with an opaque ENOENT. Surfacing it here points at the exact
      // bad path AND nudges the user toward the "place --docs-dir
      // last" convention.
      for (const d of docsDirs) {
        if (!existsSync(d)) {
          fail(
            `--docs-dir path does not exist: ${d}\n` +
              `(hint: place --docs-dir LAST on the command line — variadic options ` +
              `consume every following positional value until the next flag)`,
          );
        }
        if (!statSync(d).isDirectory()) {
          fail(`--docs-dir path is not a directory: ${d}`);
        }
      }

      const typingsRoot = resolve(opts.outputDir);
      mkdirSync(typingsRoot, { recursive: true });

      const version = detectGodotVersion(docsDirs);
      if (!version) {
        fail(
          'Could not detect Godot version from vendor/godot/version.py near any of the given --docs-dir paths',
        );
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
        classDocsDir: docsDirs,
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
