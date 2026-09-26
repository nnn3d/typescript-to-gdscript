/**
 * Declaration emit for addon typings.
 *
 * Addon `.gd` files are converted to `.ts` only so TypeScript can infer
 * the types their bodies imply — the code itself never runs. This module
 * turns that intermediate `.ts` into a `.d.ts`, which is what consumers
 * actually get: signatures with no bodies, and so nothing for the
 * consumer's TS service to re-check on every project load.
 *
 * The inference is not lost by dropping the bodies — it is frozen. A
 * `func get_health():` with no GDScript return annotation still emits
 * `get_health(): number`, because declaration emit computes the type
 * from the body before discarding it. Only parameters degrade: a method
 * parameter has no contextual type to infer from, so an unannotated one
 * becomes `any` — exactly the implicit any a consumer sees today.
 */

import ts from 'typescript';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, isAbsolute, relative, resolve } from 'path';
import type { TransformDiagnostic } from '../converter/common/index.ts';
import {
  NOISE_CODES,
  flattenDiagnosticMessage,
} from '../checker/ts-diagnostics.ts';
import { createTsProgram } from '../parser/typescript/index.ts';
import { pathKey, isInside } from '../utils/path-key.ts';
import { GENERATED_HEADER, addonProgramRoots } from './addon-output.ts';

/**
 * Emit settings layered over the user's tsconfig.
 *
 * `rootDir` / `declarationDir` are not optional bookkeeping: TypeScript
 * writes references between files *inside* the temp tree relative to
 * where it believes the output lands. Leave them off and a `preload()` of
 * a sibling addon comes out as `typeof import("../../../<abs path>/helper")`
 * instead of `typeof import("./helper")`. References to files *outside*
 * the tree are a separate problem — see `reanchorSpecifierTransformer`.
 *
 * The rest neutralise settings a user's tsconfig may carry that would
 * suppress or redirect the emit. The converted code never type-checks
 * cleanly, so `noEmitOnError` alone would skip every file; and
 * `isolatedDeclarations` refuses to emit any declaration whose types are
 * inferred — which is every declaration here worth having.
 */
function emitOverrides(tempDir: string, outputDir: string): ts.CompilerOptions {
  return {
    declaration: true,
    emitDeclarationOnly: true,
    declarationMap: false,
    isolatedDeclarations: false,
    noEmit: false,
    noEmitOnError: false,
    outDir: undefined,
    outFile: undefined,
    incremental: false,
    composite: false,
    rootDir: tempDir,
    declarationDir: outputDir,
  };
}

export interface EmitAddonDeclarationsOptions {
  /** Absolute paths of the converted addon `.ts` files (inside `tempDir`). */
  tsFiles: string[];
  /**
   * Extra inputs to type-check against but not emit from — the generated
   * `.gd.d.ts`, co-located in `tempDir`. They populate `GodotResources`,
   * which is what gives `preload("res://addons/…")` a real type instead
   * of the `Resource` fallback.
   */
  extraFiles?: string[];
  /** Temp root the `.ts` files live under. */
  tempDir: string;
  /** Typings root the `.d.ts` files are written to. */
  outputDir: string;
  /**
   * Which of the tsconfig's own files to take as roots. It must keep out
   * the files this emit writes — TypeScript refuses to write a file that is
   * also one of its inputs (TS5055) — and the pipeline passes the same
   * rule it gives the ts-helpers (`addonProgramRoots`). Defaults to that
   * rule with no known targets, which still keeps out every file the
   * generator wrote on an earlier run.
   */
  filterConfigRoots?: (file: string) => boolean;
  /**
   * The project's tsconfig. Required in practice: without it the program
   * cannot resolve Godot typings, every reference type collapses to
   * `any`, and that `any` gets frozen into the declaration.
   */
  tsConfigPath?: string;
}

export interface EmitAddonDeclarationsResult {
  /** Converted `.ts` path (in `tempDir`) → emitted `.d.ts` path (in `outputDir`). */
  declarations: Map<string, string>;
  /** Paths name temp files; the caller maps them back to the addon's `.gd`. */
  diagnostics: TransformDiagnostic[];
  /**
   * Some output is missing or known to be wrong for a reason outside the
   * addon's own code — as opposed to an addon that merely draws a warning,
   * or whose declaration can't be written because of an error in it. A
   * degraded run must not be cached.
   */
  degraded: boolean;
}

function toDiagnostic(
  d: ts.Diagnostic,
  fallbackFile: string,
): TransformDiagnostic {
  let line = 0;
  let column = 0;
  if (d.file && d.start !== undefined) {
    const lc = d.file.getLineAndCharacterOfPosition(d.start);
    line = lc.line + 1;
    column = lc.character + 1;
  }
  return {
    message: `TS${d.code}: ${flattenDiagnosticMessage(d.messageText)}`,
    // Addon code is third-party: the user cannot fix it, so a broken
    // addon must not fail their build. See `hasReportableErrors`.
    severity: 'warning',
    file: d.file?.fileName ?? fallbackFile,
    line,
    column,
  };
}

/** Map a converted `.ts` under `tempDir` to its `.d.ts` under `outputDir`. */
export function declarationPathFor(
  tsPath: string,
  tempDir: string,
  outputDir: string,
): string {
  const rel = relative(tempDir, tsPath).replace(/\\/g, '/');
  return resolve(outputDir, rel.replace(/\.ts$/, '.d.ts'));
}

/** A specifier for `target` relative to `fromDir`; absolute when none exists (another drive). */
function specifierFrom(fromDir: string, target: string): string {
  const rel = relative(fromDir, target).replace(/\\/g, '/');
  if (isAbsolute(rel)) return target.replace(/\\/g, '/');
  return rel.startsWith('.') ? rel : './' + rel;
}

/**
 * Re-anchor module specifiers so they hold at the declaration's real
 * location rather than the temp source's.
 *
 * TypeScript writes a reference to another file relative to the *source*
 * file, assuming the output tree mirrors the source tree. That holds for
 * addon-to-addon references — both ends move from temp to output together
 * — but not for a file the addon depends on in the project itself, e.g.
 * `extends "res://scripts/user_base.gd"`, whose class lives in the user's
 * own `src/`. Relative to the temp source that path runs through the OS
 * temp folder; relative to the output it's what the consumer needs.
 *
 * Absolute specifiers are handled too. TypeScript writes one when no
 * relative path exists (temp dir and project on different Windows
 * drives), and an annotation written into the source by a helper may
 * carry one that declaration emit then reuses. One pointing into the temp
 * tree is mapped to the same place in the output tree.
 *
 * Only the string literal is replaced, which keeps this independent of
 * the node-factory signatures that have shifted across TypeScript
 * versions (`updateImportTypeNode` among them).
 */
function reanchorSpecifierTransformer(
  sourceFileName: string,
  tempDir: string,
  outputDir: string,
  outPath: string,
): ts.TransformerFactory<ts.SourceFile | ts.Bundle> {
  const sourceDir = dirname(sourceFileName);
  const outDir = dirname(outPath);

  const remap = (spec: string): string | undefined => {
    const isRelative = spec.startsWith('./') || spec.startsWith('../');
    if (!isRelative && !isAbsolute(spec)) return undefined;
    const target = isRelative ? resolve(sourceDir, spec) : resolve(spec);
    if (isInside(target, tempDir)) {
      // A relative reference within the tree already holds at the output.
      if (isRelative) return undefined;
      return specifierFrom(outDir, resolve(outputDir, relative(tempDir, target)));
    }
    return specifierFrom(outDir, target);
  };

  return (context) => {
    const rewriteLiteral = (node: ts.Node): ts.Node => {
      if (!ts.isStringLiteral(node)) return node;
      const next = remap(node.text);
      return next === undefined ? node : context.factory.createStringLiteral(next);
    };

    const visit = (node: ts.Node): ts.Node => {
      if (ts.isImportTypeNode(node)) {
        const arg = node.argument;
        return ts.visitEachChild(
          node,
          (child) =>
            child === arg && ts.isLiteralTypeNode(child)
              ? ts.visitEachChild(child, rewriteLiteral, context)
              : visit(child),
          context,
        );
      }
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier) {
        const spec = node.moduleSpecifier;
        return ts.visitEachChild(
          node,
          (child) => (child === spec ? rewriteLiteral(child) : child),
          context,
        );
      }
      return ts.visitEachChild(node, visit, context);
    };

    return (root) => (ts.isSourceFile(root) ? ts.visitEachChild(root, visit, context) : root);
  };
}

/**
 * Emit `.d.ts` for each converted addon `.ts`.
 *
 * Emit is driven per source file. TypeScript is told the real destination
 * through `rootDir` / `declarationDir`, but the write itself goes through
 * a callback, which is where the generator header is added.
 */
export function emitAddonDeclarations(
  options: EmitAddonDeclarationsOptions,
): EmitAddonDeclarationsResult {
  const { tsFiles, tempDir, outputDir, tsConfigPath } = options;
  const extraFiles = options.extraFiles ?? [];
  const result: EmitAddonDeclarationsResult = {
    declarations: new Map(),
    diagnostics: [],
    degraded: false,
  };
  if (tsFiles.length === 0) return result;

  const program = createTsProgram({
    rootDir: tempDir,
    files: [...tsFiles, ...extraFiles],
    tsConfigPath,
    overrideOptions: emitOverrides(tempDir, outputDir),
    includeFilesAsRoots: true,
    filterConfigRoots: options.filterConfigRoots ?? addonProgramRoots(outputDir, []),
  });

  // How the temp dir appears inside emitted text, for the guard below.
  const tempNeedle = pathKey(tempDir);
  const degrade = (message: string, file: string): void => {
    result.degraded = true;
    result.diagnostics.push({ message, severity: 'warning', file, line: 0, column: 0 });
  };

  // A file being written can still get into the program as an import of
  // some project declaration outside the addon folder, which no root filter
  // can stop. TypeScript then refuses to overwrite it and says so only here,
  // among the options diagnostics — the emit itself just yields nothing.
  for (const d of program.getOptionsDiagnostics()) {
    if (d.code !== 5055) continue;
    degrade(
      `TS5055: ${flattenDiagnosticMessage(d.messageText)} A project declaration ` +
        'outside the addon folder probably imports this addon declaration by path.',
      outputDir,
    );
  }

  for (const tsPath of tsFiles) {
    const sf = program.getSourceFile(tsPath);
    if (!sf) {
      degrade('Addon source missing from the TypeScript program', tsPath);
      continue;
    }

    const outPath = declarationPathFor(tsPath, tempDir, outputDir);
    let wrote = false;
    const emitResult = program.emit(
      sf,
      (fileName, text) => {
        // Only the declaration; anything else TypeScript might hand over
        // (a build-info file, say) is not ours to write.
        if (!fileName.endsWith('.d.ts')) return;
        // TypeScript computed intra-tree references against `fileName`.
        // If it disagrees with where the file actually goes, those
        // references are wrong — say so rather than ship them quietly.
        if (pathKey(fileName) !== pathKey(outPath)) {
          degrade(
            `Declaration emit targeted ${fileName}, expected ${outPath}; its relative references may be wrong`,
            tsPath,
          );
        }
        // The temp tree is deleted when the run ends, so any path into it
        // is broken for whoever reads this file. The specifier transformer
        // and `typeTextForSource` exist to prevent it; this is the net.
        const normalizedText = process.platform === 'win32' ? text.toLowerCase() : text;
        if (normalizedText.includes(tempNeedle)) {
          degrade('Declaration references the temporary build folder', tsPath);
        }
        mkdirSync(dirname(outPath), { recursive: true });
        writeFileSync(outPath, `${GENERATED_HEADER}\n${text}`);
        wrote = true;
      },
      /* cancellationToken */ undefined,
      /* emitOnlyDtsFiles */ true,
      { afterDeclarations: [reanchorSpecifierTransformer(tsPath, tempDir, outputDir, outPath)] },
    );

    // The emit result carries the declaration diagnostics for this file —
    // asking `getDeclarationDiagnostics` as well reports each one twice.
    const ownErrors = emitResult.diagnostics.filter((d) => !NOISE_CODES.has(d.code));
    for (const d of ownErrors) result.diagnostics.push(toDiagnostic(d, tsPath));

    if (wrote) {
      result.declarations.set(tsPath, outPath);
    } else if (ownErrors.length > 0) {
      // TypeScript writes no declaration that has errors. That is a fact
      // about the addon's code, as stable as the code itself — not a
      // degraded run — so it is reported and the run can still be cached.
      result.diagnostics.push({
        message: 'No declaration was written for this script because of the errors above',
        severity: 'warning',
        file: tsPath,
        line: 0,
        column: 0,
      });
    } else {
      degrade('Declaration emit produced no output', tsPath);
    }
  }

  return result;
}

export interface ValidateAddonDeclarationsOptions {
  /** Emitted `.d.ts` paths. */
  declarationPaths: string[];
  /** Generated `.gd.d.ts` paths — they carry the `declare global` addon classes. */
  gdDtsPaths: string[];
  /**
   * Required: without a tsconfig the Godot typings can't be in the program,
   * and every check would only restate the "no tsconfig" warning the
   * pipeline already gives.
   */
  tsConfigPath: string;
  outputDir: string;
}

export interface ValidateAddonDeclarationsResult {
  diagnostics: TransformDiagnostic[];
  /**
   * Whether the project's Godot typings reached the program. When they
   * didn't, the declarations were inferred without them too, so the output
   * is degraded and must not be cached.
   */
  typingsVisible: boolean;
}

/**
 * Type-check the emitted declarations.
 *
 * This is not redundant with the emit's own diagnostics, which only catch
 * what cannot be *written* as a declaration. A class expression in
 * `extends` (GDScript's `extends "res://x.gd"`, rendered as
 * `extends preload("res://x.gd")`) always emits: TypeScript synthesises
 * `declare const X_base: <type of the expression>`. When the path isn't
 * in `GodotResources` that type is the `Resource` fallback, which is not
 * a constructor — and only checking the result catches it (TS2507).
 *
 * The `.gd.d.ts` files must be in the program: they declare the addon
 * classes globally, and without them cross-file references between
 * addons report spurious TS2304.
 */
export function validateAddonDeclarations(
  options: ValidateAddonDeclarationsOptions,
): ValidateAddonDeclarationsResult {
  const { declarationPaths, gdDtsPaths, tsConfigPath, outputDir } = options;
  if (declarationPaths.length === 0) return { diagnostics: [], typingsVisible: true };

  const files = [...declarationPaths, ...gdDtsPaths];
  const program = createTsProgram({
    rootDir: outputDir,
    files,
    tsConfigPath,
    includeFilesAsRoots: true,
    // Everything checked here is a declaration file, and `skipLibCheck`
    // skips exactly those — a user tsconfig with it on would turn this
    // whole pass into a no-op. Only our own files are asked for
    // diagnostics, so checking them costs little.
    overrideOptions: { skipLibCheck: false },
  });

  const checked = new Set(files.map(pathKey));
  const sourceFiles = program
    .getSourceFiles()
    .filter((sf) => checked.has(pathKey(sf.fileName)));

  // Without Godot typings in the program, every reference type is an
  // unresolved name and the check degenerates into dozens of TS2304s
  // per file — all of them pointing at the addon when the fault is in
  // the project's tsconfig. Say that once instead.
  if (sourceFiles.length > 0 && !godotTypingsVisible(program, sourceFiles[0])) {
    return {
      typingsVisible: false,
      diagnostics: [
        {
          message:
            'Addon declarations could not be verified: Godot typings are not visible ' +
            "to the project's tsconfig, so every Godot type in them reads as an " +
            'unknown name. Add the typings folder to `include` in tsconfig.json.',
          severity: 'warning',
          file: sourceFiles[0].fileName,
          line: 0,
          column: 0,
        },
      ],
    };
  }

  const diagnostics: TransformDiagnostic[] = [];
  for (const sf of sourceFiles) {
    for (const d of program.getSemanticDiagnostics(sf)) {
      if (NOISE_CODES.has(d.code)) continue;
      diagnostics.push(toDiagnostic(d, sf.fileName));
    }
  }

  return { diagnostics, typingsVisible: true };
}

/**
 * `Node` is the probe for "are the Godot typings in scope": it is the
 * root of everything a Godot script can extend, so if it is missing so
 * is everything else. This is one reference point, not a hardcoded list
 * of Godot types — those still come from the registry.
 */
const GODOT_PROBE_TYPE = 'Node';

/**
 * Whether Godot's class typings reached the program.
 *
 * Presence of the name alone is not enough: `Node` also exists in
 * `lib.dom`, so a project that merely forgot the typings but kept the
 * default library would look fine. The declaration has to come from
 * outside the default library for the Godot one to be the one in scope.
 */
function godotTypingsVisible(
  program: ts.Program,
  sample: ts.SourceFile,
): boolean {
  const checker = program.getTypeChecker();
  for (const symbol of checker.getSymbolsInScope(sample, ts.SymbolFlags.Type)) {
    if (symbol.name !== GODOT_PROBE_TYPE) continue;
    const declaredOutsideDefaultLib = (symbol.getDeclarations() ?? []).some(
      (d) => !program.isSourceFileDefaultLibrary(d.getSourceFile()),
    );
    if (declaredOutsideDefaultLib) return true;
  }
  return false;
}
