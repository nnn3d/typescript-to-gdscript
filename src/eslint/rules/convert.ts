import { writeFileSync, mkdirSync, rmSync, existsSync, statSync } from 'fs';
import { resolve, relative, dirname, join } from 'path';
import { tmpdir } from 'os';
import type ts from 'typescript';
import { convertTsToGd } from '../../converter/ts-to-gd/index.ts';
import { createTsProgram } from '../../parser/typescript/index.ts';
import { validateGdFilesSync } from '../../godot-validate/index.ts';
import { resolveConfig, resolveGodotPath } from '../../config/index.ts';
import { ProjectCache } from '../../cache/index.ts';
import {
  type TransformDiagnostic,
  isConversionErrorSeverity,
  isReportableErrorSeverity,
} from '../../converter/common/index.ts';

// ─── Long-lived ts.Program cache ─────────────────────────────
//
// In a long-running ESLint process (IDE / LSP), rebuilding a fresh ts.Program
// on every lint invocation is the dominant cost — for a Godot project the
// generated typings alone are ~1000 .d.ts files. Passing the previous
// Program as `oldProgram` lets TypeScript reuse SourceFile instances for
// files whose content hasn't changed, so only edited files get re-parsed.
//
// Keyed by resolved tsconfig path; invalidated when the tsconfig's own
// mtime changes (e.g. the user edits includes/excludes or compilerOptions).

interface CachedProgram {
  program: ts.Program;
  /** Mtime of the tsconfig file at the time the cache entry was built. */
  tsConfigMtimeMs: number;
}

const programCache = new Map<string, CachedProgram>();

function getOrCreateProgram(
  tsConfigPath: string,
  rootDir: string,
): ts.Program {
  const key = resolve(tsConfigPath);
  const currentMtime = statSync(key).mtimeMs;

  const cached = programCache.get(key);
  if (cached && cached.tsConfigMtimeMs !== currentMtime) {
    // tsconfig itself changed (include/exclude/compilerOptions edit) — drop
    // the cache. File-level changes are handled below via `oldProgram` reuse.
    programCache.delete(key);
  }

  const prev = programCache.get(key);
  const program = createTsProgram({
    rootDir,
    files: [],
    tsConfigPath: key,
    oldProgram: prev?.program,
  });
  programCache.set(key, { program, tsConfigMtimeMs: currentMtime });
  return program;
}

// ESLint rule definition — uses `any` for ESLint types to avoid hard dep on @types/eslint
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RuleModule = any;

interface RuleOptions {
  rootDir?: string;
  tsDir?: string;
  tsconfig?: string;
  projectRoot?: string;
}

const convertRule: RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Convert TypeScript to GDScript and report transformation errors and Godot validation errors',
    },
    schema: [
      {
        type: 'object',
        properties: {
          rootDir: { type: 'string' },
          tsDir: { type: 'string' },
          tsconfig: { type: 'string' },
          projectRoot: { type: 'string' },
        },
        additionalProperties: false,
      },
    ],
    fixable: 'code',
    messages: {
      convertError: '{{message}}',
      convertWarning: '{{message}}',
      godotError: '{{message}}',
    },
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(context: any) {
    const options: RuleOptions = context.options[0] ?? {};
    const filename: string = context.filename ?? context.getFilename();

    // Skip .d.ts files
    if (filename.endsWith('.d.ts')) return {};

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Program(_node: any) {
        const cfg = resolveConfig({
          configDir: options.rootDir
            ? resolve(options.rootDir)
            : dirname(filename),
          overrides: {
            rootDir: options.rootDir,
            tsDir: options.tsDir,
            tsconfig: options.tsconfig,
          },
        });

        // Cache check: if TS→GD conversion is fresh, report cached diagnostics
        const cache = new ProjectCache(cfg.cacheDir);
        const relPath = relative(cfg.tsDir, filename);
        const gdPath = resolve(cfg.gdDir, relPath.replace(/\.ts$/, '.gd'));

        if (cache.isTsToGdFresh(filename, gdPath)) {
          // Report cached converter diagnostics
          const cachedDiags = cache.getDiagnostics(filename);
          // Only real conversion errors block Godot validation;
          // type-errors still produced valid .gd and should be validated.
          const hasConversionError = cachedDiags
            ? reportDiagnostics(context, cachedDiags as TransformDiagnostic[])
            : false;

          // Re-run Godot validation (only if no converter errors)
          if (!hasConversionError && !cfg.disableGodotLint && existsSync(gdPath)) {
            const projectRoot = options.projectRoot
              ? resolve(options.projectRoot)
              : cfg.rootDir;
            const godotPath = resolveGodotPath({ godotPath: cfg.godotPath });
            const sourceMapJson = cache.getSourceMap(filename);

            runGodotValidation(context, {
              gdCode: '',
              sourceMapJson,
              tsFilePath: filename,
              tsDirOrRootDir: cfg.tsDir,
              projectRoot,
              godotPath,
              cachedGdPath: gdPath,
            });
          }
          return;
        }

        // Step 1: Convert TS to GD.
        // Reuse a module-level ts.Program when a tsconfig is available so
        // long-lived ESLint processes (IDE / LSP) don't re-parse every .d.ts
        // on each lint. Falls back to the per-call Program when no tsconfig
        // is set (rare: only standalone TS files).
        const resolvedTsConfig = cfg.tsconfig ? resolve(cfg.tsconfig) : undefined;
        const program = resolvedTsConfig
          ? getOrCreateProgram(resolvedTsConfig, cfg.tsDir)
          : undefined;
        const result = convertTsToGd({
          filePath: filename,
          rootDir: cfg.tsDir,
          tsConfigPath: resolvedTsConfig,
          sourceMap: true, // Always generate source map for Godot error remapping
          program,
        });

        // Step 2: Report converter diagnostics
        // Only real conversion errors block Godot validation;
        // type-errors still produced valid .gd and should be validated.
        const hasConversionError = reportDiagnostics(context, result.diagnostics);

        // Step 3: If no converter errors and Godot lint not disabled, run Godot validation
        if (!hasConversionError && !cfg.disableGodotLint) {
          const projectRoot = options.projectRoot
            ? resolve(options.projectRoot)
            : cfg.rootDir;
          const godotPath = resolveGodotPath({ godotPath: cfg.godotPath });

          runGodotValidation(context, {
            gdCode: result.code,
            sourceMapJson: result.sourceMap,
            tsFilePath: filename,
            tsDirOrRootDir: cfg.tsDir,
            projectRoot,
            godotPath,
          });
        }
      },
    };
  },
};

/**
 * Report converter diagnostics to ESLint.
 *
 * Returns `true` only when there was a real **conversion error** (i.e. the
 * converter could not produce valid GDScript). Type-errors are reported to
 * ESLint as errors too (so `--max-warnings 0` / exit code behaviour is
 * preserved), but they do NOT block Godot validation — the emitted `.gd` is
 * syntactically valid and Godot can still lint it.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reportDiagnostics(
  context: any,
  diagnostics: TransformDiagnostic[],
): boolean {
  let hasConversionError = false;

  for (const diag of diagnostics) {
    if (diag.severity === 'info') continue;

    const messageId = isReportableErrorSeverity(diag.severity)
      ? 'convertError'
      : 'convertWarning';

    if (isConversionErrorSeverity(diag.severity)) hasConversionError = true;

    // Only report diagnostics from the current file
    const diagFile = resolve(diag.file);
    const contextFile = resolve(context.filename ?? context.getFilename());
    if (diagFile !== contextFile) continue;

    const loc =
      diag.line > 0
        ? {
            start: { line: diag.line, column: diag.column },
            end: { line: diag.line, column: diag.column + 1000 },
          }
        : undefined;

    // For logical value errors, provide an auto-fix that wraps in bool()
    const isLogicalValueError = diag.message.includes('non-boolean value');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let fix: ((fixer: any) => any) | undefined;
    if (isLogicalValueError && loc) {
      // Find the BinaryExpression (||/&&) at the diagnostic line
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sourceCode = context.sourceCode ?? context.getSourceCode();
      const nodeAtLoc = sourceCode.getNodeByRangeIndex?.(
        sourceCode.getIndexFromLoc(loc.start),
      );
      // Walk up to find the LogicalExpression, then continue to the outermost
      // logical in the chain (so `a && b || c` wraps the whole thing, not just `a && b`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let logicalNode: any = nodeAtLoc;
      while (logicalNode && logicalNode.type !== 'LogicalExpression') {
        logicalNode = logicalNode.parent;
      }
      // Walk up through parent LogicalExpressions to find the outermost one
      while (
        logicalNode?.parent?.type === 'LogicalExpression'
      ) {
        logicalNode = logicalNode.parent;
      }
      // Skip if already wrapped in bool()
      const alreadyWrapped =
        logicalNode?.parent?.type === 'CallExpression' &&
        logicalNode.parent.callee?.type === 'Identifier' &&
        logicalNode.parent.callee.name === 'bool';
      if (logicalNode && !alreadyWrapped) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fix = (fixer: any) => [
          fixer.insertTextBefore(logicalNode, 'bool('),
          fixer.insertTextAfter(logicalNode, ')'),
        ];
      }
    }

    context.report({
      messageId,
      data: { message: diag.message },
      ...(loc ? { loc } : { node: context.sourceCode.ast }),
      ...(fix ? { fix } : {}),
    });
  }

  return hasConversionError;
}

interface GodotValidationParams {
  gdCode: string;
  sourceMapJson?: string;
  tsFilePath: string;
  tsDirOrRootDir: string;
  projectRoot: string;
  godotPath: string;
  /** If set, use this existing .gd file instead of writing a temp one */
  cachedGdPath?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function runGodotValidation(context: any, params: GodotValidationParams): void {
  // If we have a cached GD file in the project, validate it directly
  if (params.cachedGdPath) {
    const validateResult = validateGdFilesSync({
      gdFiles: [
        {
          path: params.cachedGdPath,
          sourceMapJson: params.sourceMapJson,
          tsFilePath: params.tsFilePath,
        },
      ],
      projectRoot: params.projectRoot,
      godotPath: params.godotPath,
    });
    reportGodotDiagnostics(context, validateResult.diagnostics);
    return;
  }

  // Create temp GD file for Godot validation
  const relPath = relative(params.tsDirOrRootDir, params.tsFilePath);
  const gdRelPath = relPath.replace(/\.ts$/, '.gd');
  const gdAbsPath = resolve(tmpdir(), 'tstogd', gdRelPath);
  const gdDir = dirname(gdAbsPath);

  try {
    mkdirSync(gdDir, { recursive: true });
    writeFileSync(gdAbsPath, params.gdCode);

    const validateResult = validateGdFilesSync({
      gdFiles: [
        {
          path: gdAbsPath,
          sourceMapJson: params.sourceMapJson,
          tsFilePath: params.tsFilePath,
        },
      ],
      projectRoot: params.projectRoot,
      godotPath: params.godotPath,
    });
    reportGodotDiagnostics(context, validateResult.diagnostics);
  } finally {
    try {
      if (existsSync(gdAbsPath)) rmSync(gdAbsPath);
      const mapPath = gdAbsPath + '.map';
      if (existsSync(mapPath)) rmSync(mapPath);
    } catch {
      // Ignore cleanup errors
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reportGodotDiagnostics(context: any, diagnostics: TransformDiagnostic[]): void {
  for (const diag of diagnostics) {
    const loc =
      diag.line > 0
        ? {
            start: { line: diag.line, column: diag.column },
            end: { line: diag.line, column: diag.column + 1000 },
          }
        : undefined;

    context.report({
      messageId: 'godotError',
      data: { message: diag.message },
      ...(loc ? { loc } : { node: context.sourceCode.ast }),
    });
  }
}

export default convertRule;
