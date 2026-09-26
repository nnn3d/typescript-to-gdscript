/**
 * Housekeeping for the addon typings folder (`<typingsDir>/addons`).
 *
 * Deletion here is keyed on *origin*, not on file extension. A user may
 * keep hand-written or hand-fixed declarations in that folder — the README
 * FAQ even walks them through fixing addon typings by hand — so a file is
 * only ever removed when its first line carries a marker this generator
 * writes.
 */

import { existsSync, readdirSync, readFileSync, rmSync, rmdirSync } from 'fs';
import { dirname, join } from 'path';
import { pathKey, isInside } from '../utils/path-key.ts';

/**
 * First line of every declaration the addon pipeline writes. The
 * `.gd.d.ts` generators already open with it; emitted `<name>.d.ts` get it
 * prepended so they are recognisable as ours.
 */
export const GENERATED_HEADER = '// AUTO-GENERATED — do not edit manually.';

/**
 * What pre-declaration versions of tstogd put at the top of the converted
 * addon `.ts` they wrote into the typings tree.
 */
export const LEGACY_SOURCE_HEADER = '// @ts-nocheck — auto-generated from GDScript addon';

/** First-line prefixes that identify a file as written by this generator. */
const GENERATED_MARKERS = ['// AUTO-GENERATED', LEGACY_SOURCE_HEADER];

/** The typings folder addon output goes to. */
function addonOutputRoot(outputDir: string): string {
  return join(outputDir, 'addons');
}

/**
 * Which of the tsconfig's own files a program over addon code takes as
 * roots: the project's declarations, minus the addon output this run
 * rebuilds.
 *
 * That output has to stay out. It is the previous run's result, which
 * would stand in for the temp files being rebuilt and make the result
 * depend on what an earlier run left; and for declaration emit it is the
 * very set of files being written, which TypeScript refuses to overwrite
 * (TS5055). What counts as that output is decided by origin, as for the
 * sweep: the files this run will write (`targets`) and anything carrying
 * the generator's marker. A hand-written declaration in the same folder —
 * the README's fix for a badly converted addon — stays in, so the addons
 * that use it still get its types.
 *
 * `.ts` sources are left out only for cost: rooting every source in the
 * project parses all of it, while the declarations still pull in the few
 * that addon types actually reach.
 */
export function addonProgramRoots(
  outputDir: string,
  targets: Iterable<string>,
): (file: string) => boolean {
  const outputRoot = addonOutputRoot(outputDir);
  const written = new Set([...targets].map(pathKey));
  return (file) => {
    if (!file.endsWith('.d.ts')) return false;
    if (!isInside(file, outputRoot)) return true;
    return !written.has(pathKey(file)) && !isGeneratedFile(file);
  };
}

function isGeneratedFile(file: string): boolean {
  let firstLine: string;
  try {
    firstLine = readFileSync(file, 'utf-8').split('\n', 1)[0].replace(/^\uFEFF/, '');
  } catch {
    return false;
  }
  return GENERATED_MARKERS.some((m) => firstLine.startsWith(m));
}

/** Every regular file under `dir`. Symlinks are skipped, not followed. */
function listFilesRecursive(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue;
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFilesRecursive(abs));
    else if (entry.isFile()) out.push(abs);
  }
  return out;
}

/** Remove `dir` and each parent it leaves empty, up to and including `root`. */
function pruneEmptyDirs(dir: string, root: string): void {
  let current = dir;
  while (pathKey(current) === pathKey(root) || isInside(current, root)) {
    if (!existsSync(current) || readdirSync(current).length > 0) return;
    rmdirSync(current);
    if (pathKey(current) === pathKey(root)) return;
    current = dirname(current);
  }
}

export interface SweepAddonOutputOptions {
  rootDir: string;
  outputDir: string;
  /** Files this run produced, or expects to exist; never deleted. */
  keep: Iterable<string>;
  onDebug?: (message: string) => void;
}

/**
 * Delete generated files in the addon typings folder that aren't in
 * `keep`: declarations for addons since removed or excluded, and the
 * `<name>.ts` that pre-declaration versions of tstogd wrote there. The
 * latter is why this runs on every call — a leftover `my_script.ts`
 * beside `my_script.d.ts` wins module resolution and silently pins the
 * user to stale addon types.
 *
 * Refuses to touch anything when the output folder overlaps the addon
 * *source* folder (`typingsDir` set to the project root, say): the
 * addon's own files live there, and markers are not a strong enough
 * guarantee to delete among them.
 */
export function sweepAddonOutput(options: SweepAddonOutputOptions): void {
  const { rootDir, outputDir, onDebug } = options;
  const root = addonOutputRoot(outputDir);
  const sourceRoot = join(rootDir, 'addons');

  const overlaps =
    pathKey(root) === pathKey(sourceRoot) ||
    isInside(root, sourceRoot) ||
    isInside(sourceRoot, root);
  if (overlaps) {
    onDebug?.('Addon typings: output folder overlaps addons/ sources, skipping stale-file sweep');
    return;
  }

  const kept = new Set([...options.keep].map(pathKey));
  let removed = 0;

  for (const file of listFilesRecursive(root)) {
    if (!file.endsWith('.ts')) continue;
    if (kept.has(pathKey(file))) continue;
    if (!isGeneratedFile(file)) continue;
    rmSync(file, { force: true });
    pruneEmptyDirs(dirname(file), root);
    removed++;
  }

  if (removed > 0) onDebug?.(`Addon typings: removed ${removed} stale file(s)`);
}
