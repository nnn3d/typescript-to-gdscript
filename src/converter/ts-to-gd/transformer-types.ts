import type ts from 'typescript';
import type { TransformContext, TransformDiagnostic } from '../common/index.ts';
import type { GDScriptEmitter } from './emitter.ts';

/**
 * Interface exposed by TsToGdTransformer to module functions.
 * Module functions receive this delegate instead of the full class,
 * keeping the dependency surface explicit.
 */
export interface TransformerDelegate {
  readonly ctx: TransformContext;
  readonly emitter: GDScriptEmitter;
  readonly currentClassName: string;
  readonly currentAccessorName: string | null;
  setCurrentAccessorName(name: string | null): void;

  // ── Expression / statement visitors ─────────────────────────
  emitExpression(node: ts.Expression): string;
  visitStatement(node: ts.Statement): void;
  emitExpressionAsStatement(expr: ts.Expression): void;
  visitBlock(block: ts.Block): void;
  visitVariableStatement(node: ts.VariableStatement): void;

  // ── Parameters ──────────────────────────────────────────────
  emitParameters(params: ts.NodeArray<ts.ParameterDeclaration>): string;

  // ── Comments ────────────────────────────────────────────────
  emitLeadingComments(
    node: ts.Node,
    opts?: { statementsAllowed?: boolean },
  ): void;

  // ── String helpers ──────────────────────────────────────────
  emitStringLiteral(node: ts.StringLiteral): string;
  escapeGdString(text: string): string;

  // ── Diagnostics / position helpers ──────────────────────────
  addDiagnostic(
    node: ts.Node,
    severity: TransformDiagnostic['severity'],
    message: string,
  ): void;
  getLineAndCol(node: ts.Node): { line: number; col: number };

  // ── gd.* detection helpers ──────────────────────────────────
  isGdHelperCall(node: ts.Expression, methodName: string): boolean;

  // ── Multi-line dict helper ──────────────────────────────────
  emitMultiLineDict(entries: string[]): string;
}
