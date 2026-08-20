/**
 * TS→GD import processing.
 *
 * Translates `import { … } from '…'` statements at the top of a TS source
 * file into the GDScript output, following the project's anonymous-class
 * convention:
 *
 *   - Non-anonymous (regular `class_name X`) class, no rename →
 *     skip emission. The class is globally available in GD by virtue of
 *     `class_name`; no `const` alias needed.
 *
 *   - Non-anonymous, renamed (`import { Foo as Bar }`) →
 *     `const Bar = preload("res://path/to/Foo.gd")` so the local TS
 *     identifier resolves to the same script in GD.
 *
 *   - Anonymous (`_FilenameClass` — see `gdFilenameToAnonymousClassName`)
 *     class, with or without rename →
 *     `const <local> = preload("res://path/to/file.gd")`. Anonymous
 *     classes have no `class_name`, so a `const` alias is the only way
 *     to refer to them at all.
 *
 *   - `import X from '…'` (default) and `import * as X from '…'`
 *     (namespace) → hard error. GDScript has no equivalent.
 *
 *   - `import type { … }` and per-binding `import { type X }` →
 *     skip silently (TS-only, erased at runtime).
 *
 * The collected `consts` list is emitted by the transformer right after
 * `class_name`/`extends`. The `importMap` is consulted later for the
 * `extends "res://…"` rewrite (when extending an anonymous class) and
 * for field-name conflict detection.
 */

import ts from 'typescript';
import {
  isAnonymousClassName,
  type TransformContext,
  type TransformDiagnostic,
} from '../common/index.ts';
import {
  gdResourcePath,
  hasRuntimeImport,
  resolveImportSource,
} from './modules.ts';

/**
 * One entry per LOCAL name in the importing file's scope. Keyed by the
 * local identifier (post-rename). Only includes imports we actually
 * care about — i.e. those that need a `const` alias OR are candidates
 * for the `extends "res://…"` rewrite. Skipped imports (regular global
 * GD classes) and type-only imports are NOT in the map.
 */
export interface ImportEntry {
  /**
   * Name as exported from the source module, used to decide whether
   * the target is anonymous. Same as `localName` when no `as` rename.
   */
  importedName: string;
  /** True iff `importedName` follows the `_FilenameClass` convention. */
  isAnonymous: boolean;
  /**
   * `res://…` path of the target's `.gd` mirror. Already forward-slashed
   * and ready to drop into a `preload(…)` or `extends "…"` literal.
   */
  resPath: string;
  /** TS AST node — used for accurate diagnostic anchoring. */
  node: ts.Node;
}

export interface ProcessImportsResult {
  /** Lines to emit at the top of the GD output, e.g. `const Foo = preload("res://…")`. */
  consts: string[];
  /** Local-name → entry map used by `extends`-rewriting and field-conflict checks. */
  importMap: Map<string, ImportEntry>;
  /** Errors produced by import processing (unsupported forms, unresolvable specifiers, …). */
  errors: TransformDiagnostic[];
}

export function processImports(
  sourceFile: ts.SourceFile,
  ctx: TransformContext,
): ProcessImportsResult {
  const consts: string[] = [];
  const importMap = new Map<string, ImportEntry>();
  const errors: TransformDiagnostic[] = [];

  for (const stmt of sourceFile.statements) {
    if (!ts.isImportDeclaration(stmt)) continue;

    // Whole-import `import type { … }` is TS-only — drop entirely.
    if (stmt.importClause?.isTypeOnly) continue;

    const clause = stmt.importClause;
    if (!clause) {
      // `import "./side-effect"` — no bindings, nothing to translate.
      continue;
    }

    // Default import: `import X from '…'` — unsupported.
    if (clause.name) {
      errors.push(
        diagOf(
          ctx,
          clause.name,
          `Default imports are not supported in TS→GD (no GDScript equivalent). Use \`import { X } from '...'\` instead.`,
        ),
      );
      // Continue processing named bindings on the same statement, if any.
    }

    // Namespace import: `import * as X from '…'` — unsupported.
    if (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings)) {
      errors.push(
        diagOf(
          ctx,
          clause.namedBindings,
          `Namespace imports (\`import * as X\`) are not supported in TS→GD (GDScript has no module namespace).`,
        ),
      );
      continue;
    }

    if (!clause.namedBindings || !ts.isNamedImports(clause.namedBindings)) {
      continue;
    }

    // Resolve the import specifier to an absolute `.ts` path.
    const specifier = stmt.moduleSpecifier;
    if (!ts.isStringLiteral(specifier)) continue;
    const targetTsPath = resolveImportSource(
      specifier.text,
      sourceFile,
      ctx.program,
    );
    if (!targetTsPath) {
      if (hasRuntimeImport(stmt)) {
        errors.push(
          diagOf(
            ctx,
            specifier,
            `Runtime import ${JSON.stringify(specifier.text)} must resolve to a TypeScript source file.`,
          ),
        );
      }
      continue;
    }

    const resPath = gdResourcePath(targetTsPath, ctx);
    if (!resPath) {
      errors.push(
        diagOf(
          ctx,
          specifier,
          `Runtime import ${JSON.stringify(specifier.text)} is outside tsDir and has no package.json for staging.`,
        ),
      );
      continue;
    }

    for (const element of clause.namedBindings.elements) {
      // Per-binding `import { type Foo, Bar }` — skip the type-only one.
      if (element.isTypeOnly) continue;

      // `localName` is what the rest of the TS source uses; `importedName`
      // is what the target module exports (== localName when no `as`).
      const localName = element.name.text;
      const importedName = element.propertyName?.text ?? localName;
      const isAnonymous = isAnonymousClassName(importedName);
      const renamed = element.propertyName !== undefined;

      if (!isAnonymous && !renamed) {
        // Regular global GD class — no `const` needed; the user's TS
        // refers to it by the same name GD knows it as.
        continue;
      }

      consts.push(`const ${localName} = preload("${resPath}")`);
      importMap.set(localName, {
        importedName,
        isAnonymous,
        resPath,
        node: element,
      });
    }
  }

  return { consts, importMap, errors };
}

// ─── Diagnostic helper ──────────────────────────────────────────

function diagOf(
  ctx: TransformContext,
  node: ts.Node,
  message: string,
): TransformDiagnostic {
  const { line, character } = ctx.sourceFile.getLineAndCharacterOfPosition(
    node.getStart(ctx.sourceFile),
  );
  return {
    message,
    severity: 'error',
    file: ctx.filePath,
    line: line + 1,
    column: character + 1,
  };
}
