import ts from 'typescript';
import { dirname, isAbsolute, relative } from 'path';

/**
 * Render a type as text to be written into the source file that holds
 * `enclosing`.
 *
 * `checker.typeToString` names a type that has no name in scope through
 * the module that exports it, and — having no module-resolution context —
 * writes that module as an ABSOLUTE path: `import("C:/…/helper")`. Written
 * back into a source file that is wrong twice over: it ties the file to
 * one machine, and in addon code it points into a temp tree that is
 * deleted before anyone reads the result. Declaration emit then reuses the
 * written specifier for every other reference to the same module, so one
 * such annotation spoils the whole declaration.
 *
 * Absolute specifiers are rewritten relative to the file the text goes
 * into. Across Windows drives no relative path exists, so those stay.
 */
export function typeTextForSource(
  checker: ts.TypeChecker,
  type: ts.Type,
  enclosing: ts.Node,
  flags: ts.TypeFormatFlags,
): string {
  const text = checker.typeToString(type, enclosing, flags);
  const fromDir = dirname(enclosing.getSourceFile().fileName);
  return text.replace(/import\("([^"]+)"\)/g, (whole, spec: string) => {
    if (!isAbsolute(spec)) return whole;
    const rel = relative(fromDir, spec).replace(/\\/g, '/');
    if (isAbsolute(rel)) return whole;
    return `import("${rel.startsWith('.') ? rel : './' + rel}")`;
  });
}
