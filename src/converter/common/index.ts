import ts from 'typescript';

/**
 * Pre-derived lookup sets for `in`-operator diagnostics and variant/class type
 * checks. Built once per converter run from the Godot class registry.
 */
export interface DiagnosticsTypeInfo {
  /** All variant/value type constructors (Vector2, Color, Packed*Array, Dictionary, ...). */
  constructors: Set<string>;
  /** Subset of {@link constructors} whose names match `Packed*Array`. */
  packedArrayTypes: Set<string>;
  /** Constructors banned from `in` RHS (excludes allowed containers and packed arrays). */
  bannedInTypes: Set<string>;
}

/**
 * Context passed through the transformation pipeline.
 */
export interface TransformContext {
  /** TypeScript program */
  program: ts.Program;
  /** TypeScript type checker */
  checker: ts.TypeChecker;
  /** Current source file being transformed */
  sourceFile: ts.SourceFile;
  /** File path of the source */
  filePath: string;
  /** Diagnostics / warnings collected during transformation */
  diagnostics: TransformDiagnostic[];
  /** Pre-derived sets of Godot variant types (for `in`-operator and param diagnostics). */
  diagInfo: DiagnosticsTypeInfo;
}

/**
 * Diagnostic severity levels.
 *
 * - `error` — conversion failure (invalid/unsupported syntax). Blocks .gd
 *   output (unless `--emit-on-error`). Blocks Godot validation.
 * - `type-error` — semantic/type issue, but GD emission produced valid output.
 *   .gd IS written. Shown as warning by `convert`/`watch`, as error by
 *   `lint`/ESLint. Godot validation still runs.
 * - `warning` — non-blocking advisory. Shown as WARN everywhere.
 * - `info` — debug-level; filtered out in most consumers.
 */
export type DiagnosticSeverity = 'error' | 'type-error' | 'warning' | 'info';

export interface TransformDiagnostic {
  message: string;
  severity: DiagnosticSeverity;
  file: string;
  line: number;
  column: number;
}

/**
 * True for severities that should surface as ESLint/lint errors (exit code 1).
 * Both `error` and `type-error` are user-facing errors; only `error` blocks
 * emission/Godot validation. Use {@link isConversionErrorSeverity} for that.
 */
export function isReportableErrorSeverity(sev: DiagnosticSeverity): boolean {
  return sev === 'error' || sev === 'type-error';
}

/**
 * True only for real conversion errors — the converter could not emit valid
 * GDScript. These block `.gd` write (unless `--emit-on-error`) AND block
 * Godot validation (unless `--godot-validate-on-error`).
 */
export function isConversionErrorSeverity(sev: DiagnosticSeverity): boolean {
  return sev === 'error';
}

export interface TransformResult {
  /** Generated GDScript code */
  code: string;
  /** Source map JSON (if generated) */
  sourceMap?: string;
  /** Diagnostics from transformation */
  diagnostics: TransformDiagnostic[];
}

/**
 * Checks if a TypeScript type is the `int` alias.
 */
export function isIntType(type: ts.Type, checker: ts.TypeChecker): boolean {
  const symbol = type.getSymbol() ?? type.aliasSymbol;
  return symbol?.getName() === 'int';
}

/**
 * Checks if a TypeScript type is the `float` alias.
 */
export function isFloatType(type: ts.Type, checker: ts.TypeChecker): boolean {
  const symbol = type.getSymbol() ?? type.aliasSymbol;
  return symbol?.getName() === 'float';
}

/**
 * Converts a TypeScript type to its GDScript type annotation string.
 * Returns null if the type should be omitted.
 */
export function tsTypeToGdType(
  type: ts.Type,
  checker: ts.TypeChecker,
): string | null {
  // Check for int/float aliases
  if (isIntType(type, checker)) return 'int';
  if (isFloatType(type, checker)) return 'float';

  // number -> float
  if (type.getFlags() & ts.TypeFlags.Number) return 'float';

  // string
  if (type.getFlags() & ts.TypeFlags.String) return 'String';

  // boolean
  if (type.getFlags() & ts.TypeFlags.Boolean) return 'bool';

  // void
  if (type.getFlags() & ts.TypeFlags.Void) return 'void';

  // null
  if (type.getFlags() & ts.TypeFlags.Null) return 'null';

  // Array<T> -> Array[T]
  if (checker.isArrayType(type)) {
    const typeArgs = (type as ts.TypeReference).typeArguments;
    if (typeArgs && typeArgs.length > 0) {
      const elementType = tsTypeToGdType(typeArgs[0]!, checker);
      return elementType ? `Array[${elementType}]` : 'Array';
    }
    return 'Array';
  }

  // Function/callable types
  if (
    type.getCallSignatures().length > 0 &&
    !type.getConstructSignatures().length
  ) {
    const symbol = type.getSymbol();
    if (!symbol || symbol.getName() === '__type') return 'Callable';
  }

  // Class types
  const symbol = type.getSymbol();
  if (symbol) {
    const name = symbol.getName();
    // Skip TSOnly wrapped types
    if (name === 'TSOnly') return null;
    // Dictionary
    if (name === 'Dictionary') return 'Dictionary';
    return name;
  }

  // Union/intersection types -> omit (unsupported in GDScript)
  if (type.isUnion() || type.isIntersection()) return null;

  return null;
}

/**
 * Converts a TypeScript type annotation node to GDScript type string.
 */
export function tsTypeNodeToGdType(
  typeNode: ts.TypeNode | undefined,
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  className?: string,
): string | null {
  if (!typeNode) return null;

  // Check for literal type names like `int` and `float`
  if (ts.isTypeReferenceNode(typeNode)) {
    let name = typeNode.typeName.getText(sourceFile);
    // Strip own class name prefix: MyClass.State → State, __CLASS__.State → State
    if (className && name.startsWith(className + '.')) {
      name = name.slice(className.length + 1);
    }
    if (name === 'int' || name === 'float') return name;
    if (name === 'TSOnly') return null;
    if (name === 'Signal') return 'Signal';
    // `Promise<T>` is a TS-only async wrapper. GDScript's `await` resumes with
    // the raw value, so for type purposes `Promise<T>` ≡ `T`. Unwrap and recurse.
    // `Promise` (no arg) and `Promise<void>` degrade to no return type.
    if (name === 'Promise') {
      const arg = typeNode.typeArguments?.[0];
      if (!arg) return null;
      if (arg.kind === ts.SyntaxKind.VoidKeyword) return null;
      return tsTypeNodeToGdType(arg, checker, sourceFile, className);
    }
    // Type aliases (non-class) → omit annotation. GDScript has no equivalent
    // and `Variant` conveys nothing beyond "untyped", which the bare `var x`
    // / `func f(x)` forms already express.
    const symbol = checker.getSymbolAtLocation(typeNode.typeName);
    if (symbol) {
      const declarations = symbol.getDeclarations();
      if (declarations && declarations.length > 0) {
        const decl = declarations[0]!;
        if (ts.isTypeAliasDeclaration(decl)) {
          return null;
        }
      }
    }
    // Strip generic args for class types
    return name;
  }

  // Keyword types
  if (typeNode.kind === ts.SyntaxKind.NumberKeyword) return 'float';
  if (typeNode.kind === ts.SyntaxKind.StringKeyword) return 'String';
  if (typeNode.kind === ts.SyntaxKind.BooleanKeyword) return 'bool';
  if (typeNode.kind === ts.SyntaxKind.VoidKeyword) return 'void';
  if (typeNode.kind === ts.SyntaxKind.NullKeyword) return 'null';
  // `unknown` / `any` → omit annotation. GD's `Variant` is just "untyped",
  // and the no-annotation form is the idiomatic way to express that.
  if (typeNode.kind === ts.SyntaxKind.UnknownKeyword) return null;
  if (typeNode.kind === ts.SyntaxKind.AnyKeyword) return null;

  // Array type: T[] -> Array[T]
  if (ts.isArrayTypeNode(typeNode)) {
    const elementType = tsTypeNodeToGdType(
      typeNode.elementType,
      checker,
      sourceFile,
      className,
    );
    return elementType ? `Array[${elementType}]` : 'Array';
  }

  // Function type: () => void -> Callable
  if (ts.isFunctionTypeNode(typeNode)) {
    return 'Callable';
  }

  // Union/intersection -> omit
  if (ts.isUnionTypeNode(typeNode) || ts.isIntersectionTypeNode(typeNode)) {
    return null;
  }

  return null;
}
