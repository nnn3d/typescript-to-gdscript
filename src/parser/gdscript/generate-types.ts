/**
 * Generates TypeScript type definitions from tree-sitter-gdscript's node-types.json.
 * Run: yarn generate:ast-types
 * Output: src/parser/gdscript/types.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

interface NodeField {
  multiple: boolean;
  required: boolean;
  types: Array<{ type: string; named: boolean }>;
}

interface NodeTypeEntry {
  type: string;
  named: boolean;
  fields?: Record<string, NodeField>;
  children?: NodeField;
  subtypes?: Array<{ type: string; named: boolean }>;
}

function toPascalCase(str: string): string {
  return str
    .split(/[_\s-]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function toNodeTypeName(type: string): string {
  // Supertypes start with _ — differentiate to avoid collisions (e.g. _parameters vs parameters)
  if (type.startsWith('_')) {
    return `GD${toPascalCase(type.slice(1))}Union`;
  }
  return `GD${toPascalCase(type)}Node`;
}

function generateFieldType(field: NodeField): string {
  const types = field.types
    .filter((t) => t.named)
    .map((t) => toNodeTypeName(t.type));

  if (types.length === 0) return 'GDNode';

  const union = types.length === 1 ? types[0]! : `(${types.join(' | ')})`;

  if (field.multiple) {
    return `${union}[]`;
  }
  return field.required ? union : `${union} | null`;
}

function generate() {
  const nodeTypesPath = require.resolve(
    'tree-sitter-gdscript/src/node-types.json',
  );
  const nodeTypes: NodeTypeEntry[] = JSON.parse(
    readFileSync(nodeTypesPath, 'utf-8'),
  );

  const lines: string[] = [];
  lines.push(
    '// AUTO-GENERATED — do not edit. Run `yarn generate:ast-types` to regenerate.',
  );
  lines.push('// Generated from tree-sitter-gdscript node-types.json');
  lines.push('');
  lines.push("import type Parser from 'tree-sitter';");
  lines.push('');

  // Base interface
  lines.push('/** Base interface for all GDScript AST nodes */');
  lines.push('export interface GDNodeBase {');
  lines.push('  type: string;');
  lines.push('  text: string;');
  lines.push('  isNamed: boolean;');
  lines.push('  startPosition: Parser.Point;');
  lines.push('  endPosition: Parser.Point;');
  lines.push('  startIndex: number;');
  lines.push('  endIndex: number;');
  lines.push('  parent: GDNode | null;');
  lines.push('  children: GDNode[];');
  lines.push('  namedChildren: GDNode[];');
  lines.push('  childCount: number;');
  lines.push('  namedChildCount: number;');
  lines.push('  firstChild: GDNode | null;');
  lines.push('  lastChild: GDNode | null;');
  lines.push('  firstNamedChild: GDNode | null;');
  lines.push('  lastNamedChild: GDNode | null;');
  lines.push('  nextSibling: GDNode | null;');
  lines.push('  previousSibling: GDNode | null;');
  lines.push('  nextNamedSibling: GDNode | null;');
  lines.push('  previousNamedSibling: GDNode | null;');
  lines.push('  childForFieldName(fieldName: string): GDNode | null;');
  lines.push('  childrenForFieldName(fieldName: string): GDNode[];');
  lines.push('  descendantsOfType(type: string | string[]): GDNode[];');
  lines.push('  closest(type: string | string[]): GDNode | null;');
  lines.push('  toString(): string;');
  lines.push('}');
  lines.push('');

  // Separate named types and supertypes
  const namedTypes = nodeTypes.filter((t) => t.named && !t.subtypes);
  const supertypes = nodeTypes.filter((t) => t.named && t.subtypes);

  // Generate interfaces for each named node type
  for (const entry of namedTypes) {
    const typeName = toNodeTypeName(entry.type);
    lines.push(`export interface ${typeName} extends GDNodeBase {`);
    lines.push(`  type: "${entry.type}";`);

    // Generate childForFieldName overloads for nodes with fields
    if (entry.fields && Object.keys(entry.fields).length > 0) {
      for (const [fieldName, field] of Object.entries(entry.fields)) {
        const fieldType = generateFieldType(field);
        lines.push(`  childForFieldName(name: '${fieldName}'): ${fieldType};`);
      }
      lines.push('  childForFieldName(name: string): GDNode | null;');
    }

    lines.push('}');
    lines.push('');
  }

  // Generate supertype unions
  for (const entry of supertypes) {
    const typeName = toNodeTypeName(entry.type);
    const subtypeNames = entry
      .subtypes!.filter((s) => s.named)
      .map((s) => toNodeTypeName(s.type));
    if (subtypeNames.length > 0) {
      lines.push(`export type ${typeName} = ${subtypeNames.join(' | ')};`);
      lines.push('');
    }
  }

  // Generate the main GDNode union type
  const allNodeTypes = namedTypes.map((t) => toNodeTypeName(t.type));
  lines.push('/** Union of all GDScript AST node types */');
  lines.push(`export type GDNode = ${allNodeTypes.join(' | ')};`);
  lines.push('');

  // Generate a type map for type narrowing
  lines.push('/** Map from node type string to its TypeScript interface */');
  lines.push('export interface GDNodeTypeMap {');
  for (const entry of namedTypes) {
    lines.push(`  '${entry.type}': ${toNodeTypeName(entry.type)};`);
  }
  lines.push('}');
  lines.push('');

  // Generate type guard helper
  lines.push('/** Type guard for narrowing GDNode to a specific type */');
  lines.push('export function isGDNodeType<T extends keyof GDNodeTypeMap>(');
  lines.push('  node: GDNodeBase,');
  lines.push('  type: T');
  lines.push('): node is GDNodeTypeMap[T] {');
  lines.push('  return node.type === type;');
  lines.push('}');
  lines.push('');

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const outPath = resolve(__dirname, 'types.ts');
  writeFileSync(outPath, lines.join('\n'));
  console.log(`Generated ${allNodeTypes.length} node types to ${outPath}`);
}

generate();
