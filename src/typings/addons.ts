/**
 * Typings generation for GDScript addons.
 *
 * Split out of `scenes.ts`: the addon pipeline has its own shape — it
 * converts `.gd` to `.ts` in a temp dir, emits declarations from that,
 * and never writes a `.ts` into the typings tree.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join, relative, dirname, resolve } from 'path';
import { createTsProgram } from '../parser/typescript/index.ts';
import { resolveRegistry } from '../config/index.ts';
import { convertGdToTs } from '../converter/gd-to-ts/index.ts';
import { runTsHelpers } from '../converter/gd-to-ts/ts-helpers.ts';
import { findAddonGdFiles } from '../cli/helpers.ts';
import { ProjectCache } from '../cache/index.ts';
import type { TransformDiagnostic } from '../converter/common/index.ts';
import { isInside, pathKey } from '../utils/path-key.ts';
import { generateScriptTypingContent } from './content-generators.ts';
import {
  scriptResPathToOutputFile,
  computeTsImport,
  scanTsFilesForClasses,
  resolveResourceUid,
} from './scene-utils.ts';
import type { ScriptInfo } from './scene-utils.ts';
import {
  emitAddonDeclarations,
  validateAddonDeclarations,
  declarationPathFor,
} from './addon-declarations.ts';
import { addonProgramRoots, sweepAddonOutput } from './addon-output.ts';

export interface GenerateAddonTypingsOptions {
  rootDir: string;
  outputDir: string;
  ignore?: string[];
  registryPath?: string;
  /** Optional cache instance for skipping unchanged addon files */
  cache?: ProjectCache;
  /** Optional debug logger (e.g. for --debug CLI flag) */
  onDebug?: (message: string) => void;
  /**
   * Path to the project's tsconfig.json. Forwarded to the nullable helper so
   * its TS program can resolve Godot typings — otherwise references to
   * `Node`, `Resource`, etc. collapse to `any` and Phase C's TS2322 signal
   * never fires for Godot-class returns in addon code.
   *
   * Declaration emit needs it for the same reason, and more sharply: an
   * unresolved reference type there is frozen into the `.d.ts` as `any`
   * rather than merely weakening one pass. Omitting it raises a diagnostic.
   */
  tsConfigPath?: string;
}

export interface GenerateAddonTypingsResult {
  writtenFiles: string[];
  /**
   * Problems found in the generated declarations. Always `warning`:
   * addon code is third-party, so a broken addon must not fail the
   * user's build — see `printDiagnostics(..., 'ADDON')`.
   */
  diagnostics: TransformDiagnostic[];
}

/** Absolute path of the declaration emitted for an addon `.gd`. */
function addonDeclPath(rootDir: string, outputDir: string, gdPath: string): string {
  const relPath = relative(rootDir, gdPath).replace(/\\/g, '/');
  return resolve(outputDir, relPath.replace(/\.gd$/, '.d.ts'));
}

/** Absolute path of the `.gd.d.ts` typings file for an addon `.gd`. */
function addonGdDtsPath(rootDir: string, outputDir: string, gdPath: string): string {
  const relPath = relative(rootDir, gdPath).replace(/\\/g, '/');
  return resolve(outputDir, scriptResPathToOutputFile('res://' + relPath));
}

/**
 * Point a declaration-emit diagnostic at something that still exists once
 * the temp tree is gone: the addon `.gd` its converted `.ts` came from.
 * The line numbers belong to the converted code, not the `.gd`, so they
 * are dropped rather than shown against the wrong file.
 */
function relocateDiagnostic(
  d: TransformDiagnostic,
  tempDir: string,
  rootDir: string,
): TransformDiagnostic {
  if (!isInside(d.file, tempDir)) return d;
  const rel = relative(tempDir, d.file).replace(/\\/g, '/');
  return { ...d, file: resolve(rootDir, rel.replace(/\.ts$/, '.gd')), line: 0, column: 0 };
}

/**
 * The addon `.gd` a diagnostic belongs to — its own file, or the
 * `<name>.d.ts` / `<name>.gd.d.ts` generated for it — so it can be cached
 * with that script's entry. Undefined when it names neither.
 */
function owningGdFile(
  d: TransformDiagnostic,
  rootDir: string,
  outputDir: string,
): string | undefined {
  if (d.file.endsWith('.gd')) return d.file;
  if (!isInside(d.file, outputDir)) return undefined;
  const rel = relative(outputDir, d.file).replace(/\\/g, '/');
  if (rel.endsWith('.gd.d.ts')) return resolve(rootDir, rel.slice(0, -'.d.ts'.length));
  if (rel.endsWith('.d.ts')) return resolve(rootDir, rel.replace(/\.d\.ts$/, '.gd'));
  return undefined;
}

/**
 * Record a completed run. A degraded run records nothing and drops the
 * addon entries, so the next run starts over. Otherwise each script's
 * entry carries the warnings the run reported for it, to be replayed on a
 * cache hit: a third-party addon's warning never goes away, so declining
 * to cache it would switch the addon cache off for good, while caching it
 * silently would hide it. A diagnostic that belongs to no addon script
 * can't be filed that way, so it counts as degraded too.
 */
function recordInCache(
  cache: ProjectCache,
  run: {
    rootDir: string;
    outputDir: string;
    addonGdFiles: string[];
    diagnostics: TransformDiagnostic[];
    degraded: boolean;
  },
): void {
  const { rootDir, outputDir, addonGdFiles } = run;
  const byScript = new Map<string, TransformDiagnostic[]>();
  let cacheable = !run.degraded;
  for (const d of run.diagnostics) {
    const owner = owningGdFile(d, rootDir, outputDir);
    if (!owner) {
      cacheable = false;
      break;
    }
    const key = pathKey(owner);
    byScript.set(key, [...(byScript.get(key) ?? []), d]);
  }

  if (!cacheable) {
    cache.cleanStale(undefined, new Set());
    cache.save();
    return;
  }

  for (const gdPath of addonGdFiles) {
    const declPath = addonDeclPath(rootDir, outputDir, gdPath);
    const dtsPath = addonGdDtsPath(rootDir, outputDir, gdPath);
    const warnings = byScript.get(pathKey(gdPath)) ?? [];
    const hasDecl = existsSync(declPath);
    const hasDts = existsSync(dtsPath);
    if (hasDecl && hasDts) {
      cache.updateAddon(gdPath, declPath, dtsPath, warnings);
    } else if (!hasDecl && !hasDts) {
      // A script TypeScript wrote no declaration for, because of an error
      // in its own code (a degraded run never gets here). That outcome is
      // as stable as the code, so it is cached as such — otherwise one such
      // addon would switch the whole addon cache off for good.
      cache.updateAddon(gdPath, null, null, warnings);
    }
  }
  cache.cleanStale(undefined, new Set(addonGdFiles.map(f => f.replace(/\\/g, '/'))));
  cache.save();
}

/**
 * Generate typings for GDScript addon files.
 *
 * Addon `.gd` is converted to `.ts` in a temp directory so TypeScript can
 * infer what the bodies imply; only the emitted `.d.ts` reaches
 * `outputDir`. Consumers get signatures and never addon code, which is
 * why no `@ts-nocheck` is needed and why `typingsDir` holds no `.ts` at
 * all — a `my_script.ts` sitting next to `my_script.d.ts` would win
 * module resolution and shadow the declaration.
 */
export function generateAddonTypings(options: GenerateAddonTypingsOptions): GenerateAddonTypingsResult {
  const { rootDir, outputDir, cache, onDebug } = options;
  const ignore = options.ignore ?? [];
  const writtenFiles: string[] = [];
  const diagnostics: TransformDiagnostic[] = [];

  const addonGdFiles = findAddonGdFiles(rootDir, ignore);
  const expectedFiles = addonGdFiles.flatMap(gdPath => [
    addonDeclPath(rootDir, outputDir, gdPath),
    addonGdDtsPath(rootDir, outputDir, gdPath),
  ]);

  // The sweep runs on every path out of here, including the two early
  // ones: with no addons left, everything generated is stale; and a cache
  // hit still has to clear a pre-declaration `.ts` that shadows a fresh
  // declaration, which no hash of that declaration can reveal.
  if (addonGdFiles.length === 0) {
    sweepAddonOutput({ rootDir, outputDir, keep: [], onDebug });
    return { writtenFiles, diagnostics };
  }

  // Cache check: if ALL addon files are fresh, skip the entire pipeline.
  // (Changing one addon can affect type resolution for others, so it's
  // all-or-nothing — and a removed addon counts as a change too.)
  if (cache) {
    const allFresh =
      !cache.hasAddonEntriesOutside(addonGdFiles) &&
      addonGdFiles.every(gdPath =>
        cache.isAddonFresh(
          gdPath,
          addonDeclPath(rootDir, outputDir, gdPath),
          addonGdDtsPath(rootDir, outputDir, gdPath),
        ),
      );
    if (allFresh) {
      sweepAddonOutput({ rootDir, outputDir, keep: expectedFiles, onDebug });
      onDebug?.(`Addon typings: skipped ${addonGdFiles.length} unchanged file(s)`);
      // The warnings that came with this output still apply to it.
      const replayed = addonGdFiles.flatMap(gdPath => cache.getAddonDiagnostics(gdPath));
      return { writtenFiles, diagnostics: replayed };
    }
  }

  if (!options.tsConfigPath) {
    diagnostics.push({
      message:
        'Addon declarations generated without a tsconfig: Godot types cannot be ' +
        'resolved, so inferred types collapse to `any`. Set `tsconfig` in ' +
        'tstogd.json to get accurate addon typings.',
      severity: 'warning',
      file: rootDir,
      line: 0,
      column: 0,
    });
  }

  const registry = resolveRegistry({ registryPath: options.registryPath });
  const addonSources = addonGdFiles.map(f => ({
    source: readFileSync(f, 'utf-8'),
    filePath: f,
  }));

  // Output known to be missing or wrong — as opposed to an addon whose code
  // merely draws warnings. A degraded run is never cached: a cache hit
  // would keep serving it after the user fixed the cause.
  let degraded = !options.tsConfigPath;

  // One rule for which project declarations the ts-helpers and the emit
  // see; the files this run writes are among what it keeps out.
  const programRoots = addonProgramRoots(outputDir, expectedFiles);

  const tempDir = mkdtempSync(join(tmpdir(), 'tstogd-addon-'));
  onDebug?.(`Addon typings: temp dir ${tempDir}`);
  try {
    // Pass 1: Convert all addon .gd -> .ts into the temp tree, mirroring
    // the addon directory layout so relative imports between addon files
    // keep resolving.
    const addonTsPaths: string[] = [];
    for (const { source, filePath } of addonSources) {
      const result = convertGdToTs({ source, filePath, registry, projectSources: addonSources, isAddon: true });
      const relPath = relative(rootDir, filePath).replace(/\\/g, '/');
      const tempTsPath = resolve(tempDir, relPath.replace(/\.gd$/, '.ts'));
      mkdirSync(dirname(tempTsPath), { recursive: true });
      writeFileSync(tempTsPath, result.code);
      addonTsPaths.push(tempTsPath);
    }

    // Pass 2: Scan the converted `.ts`, not the emitted `.d.ts`. Declaration
    // emit rewrites `extends preload(...)` into a synthesised
    // `declare const X_base`, which would make `extendsNode` — and with it
    // the typed `get_node` / `get_parent` overloads — come out wrong.
    // Nothing the scan reads (class names, enums, inner classes, bases) is
    // touched by the ts-helpers, so it can run before them.
    const scriptClassMap = new Map<string, ScriptInfo>();
    const addonProgram = createTsProgram({ rootDir: tempDir, files: addonTsPaths });
    scanTsFilesForClasses(addonProgram, addonTsPaths, tempDir, scriptClassMap, registry, true);

    // Pass 3: Generate .gd.d.ts for each addon script. Addons always opt
    // into `declare global` so their classes are usable in the consuming
    // project without explicit imports — that's the contract addons rely
    // on, regardless of the project's `generateGlobalClassTypes` setting.
    //
    // They are written into the TEMP tree first, beside the `.ts` they
    // describe, because both later passes need them: they declare the
    // addon classes globally and populate `GodotResources`, which is how
    // one addon's reference to another — by class name or through
    // `preload("res://addons/…")` — resolves at all. Co-locating works
    // because the temp tree mirrors the output layout exactly, so the same
    // extensionless `./my_script` resolves to the `.ts` here and to the
    // `.d.ts` once copied out.
    const gdDtsCopies: Array<{ temp: string; output: string; tsPath: string }> = [];
    for (const [scriptResPath, classInfo] of scriptClassMap) {
      const outputFile = scriptResPathToOutputFile(scriptResPath);
      // `tsAbsPath` points into the temp tree, which is about to be
      // deleted — the import has to name the emitted declaration.
      const declPath = declarationPathFor(classInfo.tsAbsPath, tempDir, outputDir);
      const tsImportPath = computeTsImport(outputDir, outputFile, declPath);

      const gdUid = resolveResourceUid(join(rootDir, scriptResPath.slice('res://'.length)));
      const content = generateScriptTypingContent(
        scriptResPath,
        classInfo.className,
        classInfo.isAnonymous,
        tsImportPath,
        // The module name `declare module` augments is the import itself.
        tsImportPath,
        classInfo.enums,
        classInfo.innerClasses,
        classInfo.extendsNode,
        true,
        gdUid,
      );

      const tempPath = resolve(tempDir, outputFile);
      mkdirSync(dirname(tempPath), { recursive: true });
      writeFileSync(tempPath, content);
      gdDtsCopies.push({
        temp: tempPath,
        output: resolve(outputDir, outputFile),
        tsPath: classInfo.tsAbsPath,
      });
    }
    const tempGdDts = gdDtsCopies.map(c => c.temp);

    // Pass 4: The ts-helpers, in addon mode — the nullable phases, which fit
    // the signatures to the addon's actual null behaviour, and the addon-only
    // implicit-null returns, which replace the `undefined` TypeScript infers
    // for a bare `return` / fall-through with the `null` GDScript returns.
    // The program sees the temp `.gd.d.ts` and the project's declarations,
    // never the previous run's addon output (see `addonProgramRoots`).
    runTsHelpers({
      files: addonTsPaths,
      extraFiles: tempGdDts,
      filterConfigRoots: programRoots,
      rootDir: tempDir,
      tsConfigPath: options.tsConfigPath,
      registry,
      addonMode: true,
    });

    // Pass 5: Declaration emit. This is what consumers actually get — the
    // `.ts` above never leaves `tempDir`.
    const emitted = emitAddonDeclarations({
      tsFiles: addonTsPaths,
      extraFiles: tempGdDts,
      tempDir,
      outputDir,
      filterConfigRoots: programRoots,
      tsConfigPath: options.tsConfigPath,
    });
    degraded ||= emitted.degraded;
    diagnostics.push(...emitted.diagnostics.map(d => relocateDiagnostic(d, tempDir, rootDir)));
    writtenFiles.push(...emitted.declarations.values());

    // Now the declarations exist, so the `.gd.d.ts` imports resolve — for
    // those whose declaration was emitted. One whose declaration wasn't
    // would import a file that isn't there, and with `skipLibCheck` the
    // global class it declares would silently become `any`; it is left for
    // the sweep instead.
    const gdDtsPaths: string[] = [];
    for (const { temp, output, tsPath } of gdDtsCopies) {
      if (!emitted.declarations.has(tsPath)) continue;
      mkdirSync(dirname(output), { recursive: true });
      writeFileSync(output, readFileSync(temp, 'utf-8'));
      writtenFiles.push(output);
      gdDtsPaths.push(output);
    }

    // Sweep before validating, so the check runs against the same file set
    // the consumer will see. `writtenFiles`, not the expected set: a
    // declaration that failed to emit this time is better gone than left
    // standing from an earlier run as if it were current.
    sweepAddonOutput({ rootDir, outputDir, keep: writtenFiles, onDebug });

    // Pass 6: Type-check the result — see `validateAddonDeclarations` for
    // what this catches that emit diagnostics don't. Skipped without a
    // tsconfig: the typings can't be in the program then, and the check
    // could only repeat the "no tsconfig" warning above in a vaguer form.
    if (options.tsConfigPath) {
      const validation = validateAddonDeclarations({
        declarationPaths: [...emitted.declarations.values()],
        gdDtsPaths,
        tsConfigPath: options.tsConfigPath,
        outputDir,
      });
      degraded ||= !validation.typingsVisible;
      diagnostics.push(...validation.diagnostics);
    }
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }

  if (cache) recordInCache(cache, { rootDir, outputDir, addonGdFiles, diagnostics, degraded });

  onDebug?.(
    `Addon typings: wrote ${writtenFiles.length} file(s)` +
      (diagnostics.length ? `, ${diagnostics.length} diagnostic(s)` : ''),
  );

  return { writtenFiles, diagnostics };
}
