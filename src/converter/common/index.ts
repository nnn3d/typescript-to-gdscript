import ts from 'typescript';

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
}

export interface TransformDiagnostic {
  message: string;
  severity: 'error' | 'warning' | 'info';
  file: string;
  line: number;
  column: number;
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
export function tsTypeToGdType(type: ts.Type, checker: ts.TypeChecker): string | null {
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
  sourceFile: ts.SourceFile
): string | null {
  if (!typeNode) return null;

  // Check for literal type names like `int` and `float`
  if (ts.isTypeReferenceNode(typeNode)) {
    const name = typeNode.typeName.getText(sourceFile);
    if (name === 'int' || name === 'float') return name;
    if (name === 'TSOnly') return null;
    if (name === 'Signal') return 'Signal';
    // Strip generic args for class types
    return name;
  }

  // Keyword types
  if (typeNode.kind === ts.SyntaxKind.NumberKeyword) return 'float';
  if (typeNode.kind === ts.SyntaxKind.StringKeyword) return 'String';
  if (typeNode.kind === ts.SyntaxKind.BooleanKeyword) return 'bool';
  if (typeNode.kind === ts.SyntaxKind.VoidKeyword) return 'void';
  if (typeNode.kind === ts.SyntaxKind.NullKeyword) return 'null';

  // Array type: T[] -> Array[T]
  if (ts.isArrayTypeNode(typeNode)) {
    const elementType = tsTypeNodeToGdType(typeNode.elementType, checker, sourceFile);
    return elementType ? `Array[${elementType}]` : 'Array';
  }

  // Union/intersection -> omit
  if (ts.isUnionTypeNode(typeNode) || ts.isIntersectionTypeNode(typeNode)) {
    return null;
  }

  return null;
}
