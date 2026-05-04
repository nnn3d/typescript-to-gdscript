import ts from 'typescript';
import { normalize, resolve } from 'path';
import type { TransformDiagnostic } from '../converter/common/index.ts';

/** TS diagnostic codes that are correct-but-noisy for the namespace+class merge pattern. */
const NOISE_CODES = new Set([2434, 2435, 2449]);

function flattenDiagnosticMessage(msg: string | ts.DiagnosticMessageChain): string {
  if (typeof msg === 'string') return msg;
  const parts = [msg.messageText];
  if (msg.next) {
    for (const chain of msg.next) {
      parts.push(flattenDiagnosticMessage(chain));
    }
  }
  return parts.join(' ');
}

function tsSeverity(category: ts.DiagnosticCategory): TransformDiagnostic['severity'] {
  switch (category) {
    case ts.DiagnosticCategory.Error: return 'error';
    case ts.DiagnosticCategory.Warning: return 'warning';
    default: return 'info';
  }
}

/**
 * Collect TypeScript semantic + syntactic diagnostics from `program`,
 * limited to source files under `tsDir`. Filters out:
 * - `.d.ts` declaration files
 * - files outside `tsDir`
 * - noise codes 2434, 2435, 2449 (namespace+class merge pattern)
 */
export function collectTsDiagnostics(
  program: ts.Program,
  tsDir: string,
): TransformDiagnostic[] {
  const normalizedTsDir = normalize(resolve(tsDir));
  const result: TransformDiagnostic[] = [];

  for (const sf of program.getSourceFiles()) {
    const filePath = normalize(resolve(sf.fileName));
    if (filePath.endsWith('.d.ts')) continue;
    if (!filePath.startsWith(normalizedTsDir)) continue;

    const diags: readonly ts.Diagnostic[] = [
      ...program.getSyntacticDiagnostics(sf),
      ...program.getSemanticDiagnostics(sf),
    ];

    for (const d of diags) {
      if (NOISE_CODES.has(d.code)) continue;

      let line = 0;
      let column = 0;
      if (d.file && d.start !== undefined) {
        const lc = d.file.getLineAndCharacterOfPosition(d.start);
        line = lc.line + 1;
        column = lc.character + 1;
      }

      result.push({
        message: `TS${d.code}: ${flattenDiagnosticMessage(d.messageText)}`,
        severity: tsSeverity(d.category),
        file: filePath,
        line,
        column,
      });
    }
  }

  return result;
}
