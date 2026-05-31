import ts from 'typescript';
import { tsTypeNodeToGdType } from '../common/index.ts';
import { isGdClassType, isGdVariantType } from './diagnostics.ts';
import type { TransformerDelegate } from './transformer-types.ts';

/** Check a type node for `undefined` keyword and emit a diagnostic. */
export function checkTypeForUndefined(
  t: TransformerDelegate,
  typeNode: ts.TypeNode,
): void {
  if (typeNode.kind === ts.SyntaxKind.UndefinedKeyword) {
    t.addDiagnostic(
      typeNode,
      'type-error',
      '`undefined` type is not supported in GDScript; use `null` instead',
    );
  }
  if (ts.isUnionTypeNode(typeNode)) {
    for (const u of typeNode.types) {
      if (u.kind === ts.SyntaxKind.UndefinedKeyword) {
        t.addDiagnostic(
          u,
          'type-error',
          '`undefined` type is not supported in GDScript; use `null` instead',
        );
      }
    }
  }
}

/** Check if a resolved TS type contains `undefined` (for runtime value checks). */
export function typeContainsUndefined(type: ts.Type): boolean {
  if (type.flags & ts.TypeFlags.Undefined) return true;
  if (type.isUnion()) {
    return type.types.some((u) => !!(u.flags & ts.TypeFlags.Undefined));
  }
  return false;
}

/**
 * Emit a parameter list as a GDScript parameter string.
 * Handles optional/null/vararg/undefined semantics.
 */
export function emitParameters(
  t: TransformerDelegate,
  params: ts.NodeArray<ts.ParameterDeclaration>,
): string {
  return params
    .map((p) => {
      const name = p.name.getText(t.ctx.sourceFile);
      const isRest = !!p.dotDotDotToken;

      // Check for `undefined` in type annotations (type position, not value)
      if (p.type) {
        checkTypeForUndefined(t, p.type);
      }

      if (isRest) {
        // Rest parameter: `...args: Type[]` -> `...args: Array` or `...args`
        // GDScript varargs use `...name` or `...name: Array`
        let gdType: string | null = null;
        if (p.type) {
          // Strip array wrapper: `any[]` -> null, `Type[]` -> Array, `Array<Type>` -> Array
          const typeText = p.type.getText(t.ctx.sourceFile);
          if (typeText === 'any[]' || typeText === 'unknown[]') {
            gdType = null;
          } else {
            gdType = 'Array';
          }
        }
        const typeAnnotation = gdType ? `: ${gdType}` : '';
        return `...${name}${typeAnnotation}`;
      }

      const isNullDefault = p.initializer?.kind === ts.SyntaxKind.NullKeyword;

      // Check if the type is a union containing null (e.g. `Node | null`, `null | Node2D`)
      const isNullableUnion =
        p.type &&
        ts.isUnionTypeNode(p.type) &&
        p.type.types.some(
          (u) =>
            u.kind === ts.SyntaxKind.NullKeyword ||
            (ts.isLiteralTypeNode(u) &&
              u.literal.kind === ts.SyntaxKind.NullKeyword),
        );

      // For nullable unions, strip `| null` and use the base type
      let gdType: string | null = null;
      if (p.type && isNullableUnion) {
        const nonNullTypes = (p.type as ts.UnionTypeNode).types.filter(
          (u) =>
            u.kind !== ts.SyntaxKind.NullKeyword &&
            !(
              ts.isLiteralTypeNode(u) &&
              u.literal.kind === ts.SyntaxKind.NullKeyword
            ),
        );
        if (nonNullTypes.length === 1) {
          gdType = tsTypeNodeToGdType(
            nonNullTypes[0]!,
            t.ctx.checker,
            t.ctx.sourceFile,
            t.currentClassName,
          );
        }
        // Multi-type union (e.g. Node | Node2D | null) -- can't express in GD
      } else {
        gdType = tsTypeNodeToGdType(
          p.type,
          t.ctx.checker,
          t.ctx.sourceFile,
          t.currentClassName,
        );
      }

      // Nullable param with `?` or `= null` -> `= null` in GDScript.
      // Add type annotation only for class types (not primitives/variant types).
      const needsNullDefault =
        (p.questionToken && !p.initializer) || isNullDefault;
      if (needsNullDefault) {
        if (gdType && isGdClassType(gdType, t.ctx.diagInfo)) {
          return `${name}: ${gdType} = null`;
        }
        return `${name} = null`;
      }

      const defaultValue = p.initializer
        ? ` = ${t.emitExpression(p.initializer)}`
        : '';
      // Omit type annotation for variant/constructor types with non-null defaults
      // (GDScript infers type from the constructor call, e.g. Vector2.DOWN -> Vector2)
      const omitType =
        gdType &&
        p.initializer &&
        !isNullDefault &&
        isGdVariantType(gdType, t.ctx.diagInfo);
      const typeAnnotation = gdType && !omitType ? `: ${gdType}` : '';
      return `${name}${typeAnnotation}${defaultValue}`;
    })
    .join(', ');
}
