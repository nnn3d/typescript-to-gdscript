import { writeFileSync, mkdirSync, rmSync, existsSync } from 'fs';
import { resolve, relative, dirname, join } from 'path';
import { tmpdir } from 'os';
import { convertTsToGd } from '../../converter/ts-to-gd/index.ts';
import { validateGdFilesSync } from '../../godot-validate/index.ts';
import { resolveConfig, resolveGodotPath } from '../../config/index.ts';
import { ProjectCache } from '../../cache/index.ts';
import type { TransformDiagnostic } from '../../converter/common/index.ts';

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
          const hasErrors = cachedDiags
            ? reportDiagnostics(context, cachedDiags as TransformDiagnostic[])
            : false;

          // Re-run Godot validation (only if no converter errors)
          if (!hasErrors && !cfg.disableGodotLint && existsSync(gdPath)) {
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

        // Step 1: Convert TS to GD
        const result = convertTsToGd({
          filePath: filename,
          rootDir: cfg.tsDir,
          tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
          sourceMap: true, // Always generate source map for Godot error remapping
        });

        // Step 2: Report converter diagnostics
        const hasErrors = reportDiagnostics(context, result.diagnostics);

        // Step 3: If no converter errors and Godot lint not disabled, run Godot validation
        if (!hasErrors && !cfg.disableGodotLint) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reportDiagnostics(
  context: any,
  diagnostics: TransformDiagnostic[],
): boolean {
  let hasErrors = false;

  for (const diag of diagnostics) {
    if (diag.severity === 'info') continue;

    const messageId =
      diag.severity === 'error' ? 'convertError' : 'convertWarning';
    const severity = diag.severity === 'error' ? 2 : 1;

    if (diag.severity === 'error') hasErrors = true;

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

  return hasErrors;
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
