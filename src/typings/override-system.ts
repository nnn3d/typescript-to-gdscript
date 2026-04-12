import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import ts from 'typescript';

// ─── Types ───────────────────────────────────────────────────────

/**
 * Parsed override: a class/interface declaration with individual members.
 */
export interface ParsedOverride {
  /** The full declaration header, e.g. "interface Array<T>" or "declare class Node extends GodotObject" */
  header: string | undefined;
  /** Member name → full source text (one or more lines). Order preserved. */
  members: Map<string, string>;
  /** Extra lines (index signatures, comments) that don't have a named member */
  extras: string[];
}

// ─── Override loading ────────────────────────────────────────────

/**
 * Loads all override .d.ts files from a directory and parses them.
 * Returns a map: TS declaration name → ParsedOverride.
 */
export function loadOverrides(overrideDir: string): Map<string, ParsedOverride> {
  const result = new Map<string, ParsedOverride>();
  if (!existsSync(overrideDir)) return result;

  const files = readdirSync(overrideDir)
    .filter((f) => f.endsWith('.d.ts'))
    .sort();

  for (const file of files) {
    const filePath = join(overrideDir, file);
    const content = readFileSync(filePath, 'utf-8');
    const sourceFile = ts.createSourceFile(
      filePath,
      content,
      ts.ScriptTarget.Latest,
      true,
    );

    for (const stmt of sourceFile.statements) {
      var name: string | undefined;
      var header: string | undefined;
      var membersNode:
        | ts.NodeArray<ts.TypeElement | ts.ClassElement>
        | undefined;

      if (ts.isInterfaceDeclaration(stmt)) {
        name = stmt.name.text;
        // Get header from source: everything from "interface" to "{"
        const headerEnd = stmt.members.pos;
        header = content
          .substring(stmt.pos, headerEnd)
          .trim()
          .replace(/\{$/, '')
          .trim();
      } else if (ts.isClassDeclaration(stmt) && stmt.name) {
        name = stmt.name.text;
        // Extract class header only when it has generics (e.g. PackedScene<T extends Node = Node>)
        // Otherwise keep the generated header to preserve extends clause
        if (stmt.typeParameters && stmt.typeParameters.length > 0) {
          const headerEnd = stmt.members.pos;
          header = content
            .substring(stmt.pos, headerEnd)
            .trim()
            .replace(/\{$/, '')
            .trim();
        } else {
          header = undefined;
        }
      }

      if (!name || !(stmt as any).members) continue;
      membersNode = (stmt as any).members as ts.NodeArray<any>;

      const members = new Map<string, string>();
      const extras: string[] = [];

      for (const member of membersNode) {
        var memberName: string | undefined;

        if (ts.isMethodDeclaration(member) || ts.isMethodSignature(member)) {
          memberName = member.name?.getText(sourceFile);
        } else if (
          ts.isPropertyDeclaration(member) ||
          ts.isPropertySignature(member)
        ) {
          memberName = member.name?.getText(sourceFile);
        } else if (ts.isIndexSignatureDeclaration(member)) {
          // Index signatures like [index: number]: T
          extras.push('  ' + member.getText(sourceFile));
          continue;
        }

        if (memberName) {
          // Get text without excessive leading trivia, but keep JSDoc
          const start = member.getStart(sourceFile);
          const end = member.getEnd();
          var text = content.substring(start, end).trimEnd();

          // Check for JSDoc above (between fullStart and start)
          const trivia = content.substring(member.getFullStart(), start);
          const jsdocMatch = trivia.match(/(\/\*\*[\s\S]*?\*\/)\s*$/);
          if (jsdocMatch) {
            text = jsdocMatch[1] + '\n' + text;
          }

          // Ensure proper indentation
          const lines = text.split('\n').map((l) => {
            const trimmed = l.trimStart();
            if (trimmed === '') return '';
            return '  ' + trimmed;
          });
          text = lines.join('\n');

          // Support multiple overloads by appending
          if (members.has(memberName)) {
            members.set(memberName, members.get(memberName)! + '\n' + text);
          } else {
            members.set(memberName, text);
          }
        }
      }

      result.set(name, { header, members, extras });
    }
  }

  return result;
}

/**
 * Loads global function overrides from `_globals.d.ts` in the override directory.
 * Returns a map: function name → full declaration text (JSDoc + all overloads).
 */
export function loadGlobalOverrides(overrideDir: string): Map<string, string> {
  const result = new Map<string, string>();
  const filePath = join(overrideDir, '_globals.d.ts');
  if (!existsSync(filePath)) return result;

  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  let pendingJsDoc: string[] = [];
  let currentName: string | null = null;
  let currentLines: string[] = [];

  function flush() {
    if (currentName && currentLines.length > 0) {
      result.set(currentName, currentLines.join('\n'));
    }
    currentName = null;
    currentLines = [];
  }

  for (const line of lines) {
    const trimmed = line.trim();

    // Accumulate JSDoc lines
    if (trimmed.startsWith('/**') || trimmed.startsWith(' *') || trimmed.startsWith('*')) {
      if (!currentName) {
        // JSDoc before first function
        pendingJsDoc.push(line);
      } else if (trimmed.startsWith('/**')) {
        // New JSDoc block — might be a different function
        pendingJsDoc = [line];
      } else {
        pendingJsDoc.push(line);
      }
      continue;
    }

    // Match declare function lines
    const fnMatch = trimmed.match(/^declare\s+function\s+(\w+)/);
    if (fnMatch) {
      const fnName = fnMatch[1]!;
      if (fnName !== currentName) {
        flush();
        currentName = fnName;
        currentLines = [...pendingJsDoc, line];
      } else {
        // Additional overload for same function
        currentLines.push(...pendingJsDoc, line);
      }
      pendingJsDoc = [];
      continue;
    }

    // Skip empty lines and comments between functions
    if (trimmed === '' || trimmed.startsWith('//')) {
      if (currentName) {
        // Could be between overloads — keep pending
      }
      pendingJsDoc = [];
      continue;
    }
  }
  flush();

  return result;
}

// ─── Override application ────────────────────────────────────────

/**
 * Applies global function overrides to generated `_globals.d.ts` content.
 * For each overridden function, replaces the generated declaration (and its JSDoc)
 * with the override text.
 */
export function applyGlobalOverrides(
  content: string,
  globalOverrides: Map<string, string>,
): string {
  if (globalOverrides.size === 0) return content;

  const lines = content.split('\n');
  const result: string[] = [];
  const replaced = new Set<string>();
  let i = 0;

  while (i < lines.length) {
    const line = lines[i]!;
    const fnMatch = line.match(/^declare\s+function\s+(\w+)/);

    if (fnMatch && globalOverrides.has(fnMatch[1]!)) {
      const fnName = fnMatch[1]!;
      const overrideText = globalOverrides.get(fnName)!;
      const overrideHasJsDoc = overrideText.trimStart().startsWith('/**');

      if (overrideHasJsDoc) {
        // Override has its own JSDoc — remove generated JSDoc
        while (
          result.length > 0 &&
          (result[result.length - 1]!.trimStart().startsWith('*') ||
            result[result.length - 1]!.trimStart().startsWith('/**') ||
            result[result.length - 1]!.trimStart().startsWith('*/'))
        ) {
          result.pop();
        }
      }
      // Otherwise keep the generated JSDoc already in result

      // Insert override text on first occurrence
      if (!replaced.has(fnName)) {
        result.push(overrideText);
        replaced.add(fnName);
      }

      // Skip this line (and any subsequent overloads of the same function)
      i++;
      continue;
    }

    result.push(line);
    i++;
  }

  return result.join('\n');
}

/**
 * Applies override to a generated declaration string.
 * Replaces the header and merges members: overridden members replace generated ones,
 * new members from the override are appended.
 */
export function applyOverride(generated: string, override: ParsedOverride): string {
  const lines = generated.split('\n');

  // Replace header line (first line that has interface/class + {)
  if (override.header) {
    const headerIdx = lines.findIndex((l) =>
      /^(declare\s+)?(interface|class)\s/.test(l.trim()),
    );
    if (headerIdx >= 0) {
      // The override header may be multi-line (with JSDoc). Split it into individual lines.
      const headerLines = (override.header + ' {').split('\n');
      // Ensure the interface/class line has `declare` prefix
      for (let hi = 0; hi < headerLines.length; hi++) {
        if (
          /^\s*(interface|class)\s/.test(headerLines[hi]) &&
          !/^\s*declare\s/.test(headerLines[hi])
        ) {
          headerLines[hi] = 'declare ' + headerLines[hi];
        }
      }
      // If the override header includes JSDoc, remove existing JSDoc before the header line
      const overrideHasJsDoc = headerLines.some((l) => l.trim().startsWith('/**'));
      let removeFrom = headerIdx;
      if (overrideHasJsDoc) {
        // Walk backwards to find the start of the existing JSDoc block
        let j = headerIdx - 1;
        while (j >= 0 && (lines[j].trim().startsWith('*') || lines[j].trim().startsWith('/**') || lines[j].trim() === '*/')) {
          j--;
        }
        removeFrom = j + 1;
      }
      lines.splice(removeFrom, headerIdx - removeFrom + 1, ...headerLines);
    }
  }

  // Parse generated members: find each "  memberName(" or "  memberName:" line
  const result: string[] = [];
  const usedOverrides = new Set<string>();
  var i = 0;

  // Copy lines up to and including the opening brace
  while (i < lines.length) {
    result.push(lines[i]);
    if (lines[i].trimEnd().endsWith('{')) {
      i++;
      break;
    }
    i++;
  }

  // Process body lines — buffer JSDoc lines so they can be dropped when a member is overridden
  var pendingJsDoc: string[] = [];
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trimStart();

    // Closing brace — stop
    if (trimmed === '}') break;

    // Buffer JSDoc/comment lines
    if (
      trimmed.startsWith('/**') ||
      trimmed.startsWith('* ') ||
      trimmed.startsWith('*/') ||
      trimmed === '*'
    ) {
      pendingJsDoc.push(line);
      i++;
      continue;
    }

    // Try to extract member name from this line
    const memberMatch = trimmed.match(
      /^(?:static\s+)?(?:readonly\s+)?(?:'([^']+)'|(\w+))\s*[:(]/,
    );
    if (memberMatch) {
      const memberName = memberMatch[1] ?? memberMatch[2];
      if (override.members.has(memberName)) {
        const overrideText = override.members.get(memberName)!;
        // If override has its own JSDoc, use it; otherwise preserve generated JSDoc
        const overrideHasJsDoc = overrideText.trimStart().startsWith('/**');
        if (overrideHasJsDoc || pendingJsDoc.length === 0) {
          pendingJsDoc = [];
        } else {
          result.push(...pendingJsDoc);
          pendingJsDoc = [];
        }
        result.push(overrideText);
        usedOverrides.add(memberName);
        i++;
        continue;
      }
    }

    // Flush buffered JSDoc (not overridden) then push current line
    result.push(...pendingJsDoc);
    pendingJsDoc = [];
    result.push(line);
    i++;
  }
  // Flush any trailing JSDoc
  result.push(...pendingJsDoc);

  // Add override-only members (new additions) before closing brace
  for (const [name, text] of override.members) {
    if (!usedOverrides.has(name)) {
      result.push(text);
    }
  }

  // Add extras (index signatures etc.)
  for (const extra of override.extras) {
    result.push(extra);
  }

  // Closing brace
  result.push('}');

  return result.join('\n');
}
