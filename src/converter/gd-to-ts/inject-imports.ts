/**
 * Batch-level import injection for GD\u2192TS conversion.
 *
 * Runs AFTER every `.gd` source has been converted and written to
 * disk. Builds a real TS program over the generated `.ts` files,
 * pulls semantic diagnostics, and prepends `import { Foo } from "./foo.js"`
 * lines for every unresolved identifier that maps to a known user
 * class. Much more precise than the previous per-file regex \u2014 names
 * appearing only inside comments or string literals don't trigger
 * a TS 2304/2503 diagnostic, so they don't produce phantom imports.
 *
 * No-op when `generateGlobalClassTypes` is `true` (the addon /
 * legacy-global layout, where every user class is in `declare global`
 * and no imports are required).
 */

import ts from 'typescript';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, relative, resolve } from 'path';
import { createTsProgram } from '../../parser/typescript/index.ts';
import type { UserClassInfo } from './context.ts';
import { parseGdClassInfo } from './index.ts';
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';

/** TS error code for "Cannot find name 'X'." */
const TS_CANNOT_FIND_NAME = 2304;
/** TS error code for "Cannot find namespace 'X'." */
const TS_CANNOT_FIND_NAMESPACE = 2503;

export interface ConvertedFile {
  /** Absolute on-disk path of the generated `.ts` file. */
  tsPath: string;
  /** Absolute on-disk path of the source `.gd` file (used to skip self-imports). */
  gdPath: string;
}

export interface InjectMissingImportsOptions {
  /**
   * When `true`, every user class is assumed to live in `declare global`
   * and no imports are needed. The function returns immediately.
   */
  generateGlobalClassTypes: boolean;
  /**
   * Optional `tsconfig.json` to drive the diagnostic program. When
   * unset a minimal default config (ES2022 / NodeNext-ish) is used \u2014
   * sufficient for identifier-resolution diagnostics, which don't
   * depend on strictness or target.
   */
  tsConfigPath?: string;
}

/**
 * For every `.ts` file in `files`, prepend `import { X } from "..."`
 * lines for any TS 2304/2503 diagnostic whose name resolves to a
 * known entry in `userClasses`. Files are rewritten in place. Files
 * with nothing missing are left untouched.
 */
export function injectMissingImports(
  files: ConvertedFile[],
  userClasses: Map<string, UserClassInfo>,
  options: InjectMissingImportsOptions,
): void {
  if (options.generateGlobalClassTypes) return;
  if (files.length === 0) return;

  // The TS program needs every generated file as a root file; otherwise
  // it won't parse them and we won't see their diagnostics. `rootDir`
  // is just used by the compiler options for moduleResolution context;
  // the common ancestor of the generated files is a safe choice.
  const rootDir = commonDir(files.map((f) => f.tsPath));
  const program = createTsProgram({
    rootDir,
    files: files.map((f) => f.tsPath),
    tsConfigPath: options.tsConfigPath,
  });

  // Build a `gdPath \u2192 tsPath` lookup so we can resolve a missing
  // user class's *actual* on-disk TS file (not just the gd path with
  // its extension swapped). Crucial when `cfg.gdDir != cfg.tsDir` \u2014
  // the gd and ts trees diverge and the TS file lives in `tsDir`,
  // not next to the gd source. Falls back to the extension-swap for
  // user classes whose `.gd` was outside the converted batch (rare,
  // and the resulting import is best-effort anyway).
  const gdToTs = new Map<string, string>();
  for (const f of files) {
    gdToTs.set(normalizePath(f.gdPath), f.tsPath);
  }

  for (const file of files) {
    const sourceFile = program.getSourceFile(file.tsPath);
    if (!sourceFile) continue;

    const diags = program.getSemanticDiagnostics(sourceFile);
    const missing = collectMissingClassNames(diags, userClasses, file);
    if (missing.size === 0) continue;

    // Stable alphabetical order \u2014 matches the prior regex-based
    // implementation and keeps diffs predictable across runs.
    const sortedNames = Array.from(missing).sort();
    const importLines = sortedNames.map((name) => {
      const info = userClasses.get(name)!;
      const targetTsPath =
        gdToTs.get(normalizePath(info.filePath!)) ??
        info.filePath!.replace(/\.gd$/, '.ts');
      const specifier = importSpecifierFor(file.tsPath, targetTsPath);
      return `import { ${name} } from "${specifier}";`;
    });

    const original = readFileSync(file.tsPath, 'utf-8');
    const updated = importLines.join('\n') + '\n\n' + original;
    writeFileSync(file.tsPath, updated);
  }
}

/**
 * Convenience wrapper: build the user-class index from a list of GD
 * sources (the same shape `convertGdToTs` consumes via
 * `projectSources`), then call {@link injectMissingImports}. Mirrors
 * what `cli/convert-gd.ts` needs to do for a full project run.
 */
export function injectMissingImportsForProject(
  files: ConvertedFile[],
  projectSources: Array<{ source: string; filePath: string }>,
  registry: GodotClassRegistry,
  options: InjectMissingImportsOptions,
): void {
  if (options.generateGlobalClassTypes) return;
  const userClasses = new Map<string, UserClassInfo>();
  for (const ps of projectSources) {
    const info = parseGdClassInfo(ps.source, registry, ps.filePath);
    if (info) userClasses.set(info.name, info);
  }
  injectMissingImports(files, userClasses, options);
}

// \u2500\u2500\u2500 Helpers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function collectMissingClassNames(
  diags: readonly ts.Diagnostic[],
  userClasses: Map<string, UserClassInfo>,
  file: ConvertedFile,
): Set<string> {
  const out = new Set<string>();
  for (const d of diags) {
    if (d.code !== TS_CANNOT_FIND_NAME && d.code !== TS_CANNOT_FIND_NAMESPACE) {
      continue;
    }
    const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
    // TS phrases both diagnostics as `Cannot find name 'X'.` /
    // `Cannot find namespace 'X'.`. Pull the quoted identifier.
    const m = message.match(/'([^']+)'/);
    if (!m) continue;
    const name = m[1]!;
    const info = userClasses.get(name);
    if (!info?.filePath) continue;          // unknown class \u2014 not ours to fix
    if (sameFile(info.filePath, file.gdPath)) continue; // self
    out.add(name);
  }
  return out;
}

/**
 * Build the import specifier for `import { X } from "..."` referencing
 * `targetTs` from `currentTs`. Project default is
 * `moduleResolution: "classic"` (set by the `tstogd init` template),
 * which resolves bare-name specifiers via the `.ts` extension search
 * order \u2014 so we strip the trailing `.ts` and emit no extension at all.
 * `relative()` returns a bare filename for siblings, so we also force
 * a leading `./` to keep TypeScript from treating the specifier as
 * a non-relative module.
 */
function importSpecifierFor(currentTs: string, targetTs: string): string {
  let rel = relative(dirname(currentTs), targetTs).replace(/\\/g, '/');
  if (!rel.startsWith('.') && !rel.startsWith('/')) rel = './' + rel;
  return rel.replace(/\.ts$/, '');
}

function sameFile(a: string, b: string): boolean {
  return normalizePath(a) === normalizePath(b);
}

/** Absolutize + normalize separators so paths can be used as Map keys. */
function normalizePath(p: string): string {
  return resolve(p).replace(/\\/g, '/');
}

/**
 * Longest common parent directory of the given absolute paths. Used
 * as the TS program's `rootDir` so module-resolution behaves naturally
 * for the generated tree. Returns `'/'` (or drive root on Windows)
 * when the paths share no meaningful prefix.
 */
function commonDir(paths: string[]): string {
  if (paths.length === 0) return '';
  const parts = paths.map((p) => p.replace(/\\/g, '/').split('/'));
  let i = 0;
  while (i < parts[0]!.length && parts.every((p) => p[i] === parts[0]![i])) {
    i++;
  }
  // Drop the trailing basename component so `rootDir` is a directory.
  const dirParts = parts[0]!.slice(0, Math.max(0, i));
  return dirParts.join('/') || '/';
}
