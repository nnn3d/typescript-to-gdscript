/**
 * Post-processes @asgerf/dts-tree-sitter output to be compatible with
 * TypeScript's erasableSyntaxOnly mode and strict class checking.
 *
 * Fixes:
 * 1. `export class` → `export declare class` (ambient declarations)
 * 2. `export const enum SyntaxType` → const object + type alias (erasableSyntaxOnly)
 * 3. `SyntaxType.Foo` in type positions → `typeof SyntaxType.Foo`
 */
const fs = require('fs');

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node fix-tree-sitter-types.js <file>');
  process.exit(1);
}

let source = fs.readFileSync(filePath, 'utf8');

// 1. Fix class declarations: export class → export declare class
source = source.replace(/^export class /gm, 'export declare class ');

// 2. Convert const enum → const object + type alias
source = source.replace(
  /export const enum SyntaxType \{([^}]+)\}/s,
  (_match, body) => {
    const members = body
      .trim()
      .split(',\n')
      .map((l) => l.trim())
      .filter(Boolean);
    const entries = members.map((m) => {
      const [key, val] = m.replace(/,$/, '').split(' = ');
      return [key.trim(), val.trim()];
    });
    const objLines = entries.map(([k, v]) => `  ${k}: ${v},`).join('\n');
    return (
      `export const SyntaxType = {\n${objLines}\n} as const;\n` +
      `export type SyntaxType = typeof SyntaxType[keyof typeof SyntaxType];`
    );
  },
);

// 3. Fix SyntaxType member access in type positions
// e.g., `type: SyntaxType.ERROR` → `type: typeof SyntaxType.ERROR`
// Also handles generic params like `UnnamedNode<SyntaxType.Foo>` and union members `| SyntaxType.Foo`
source = source.replace(/(?<=[:|\<,]\s*)SyntaxType\./g, 'typeof SyntaxType.');

fs.writeFileSync(filePath, source);
console.log(`Fixed: ${filePath}`);
