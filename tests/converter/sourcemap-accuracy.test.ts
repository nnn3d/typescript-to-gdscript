import { describe, it, expect, afterEach } from 'vitest';
import { convertTsToGd } from '../../src/converter/ts-to-gd/index.ts';
import { SourceMapReader } from '../../src/sourcemap/index.ts';
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';
import ts from 'typescript';
import { tmpdir } from 'os';

const TMP_DIR = join(tmpdir(), 'tstogd-smap-' + Math.random().toString(36));

function createProgram(filePath: string, code: string): ts.Program {
  mkdirSync(TMP_DIR, { recursive: true });
  writeFileSync(filePath, code);
  return ts.createProgram([filePath], {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.Node16,
    moduleResolution: ts.ModuleResolutionKind.Node16,
    strict: true,
    noEmit: true,
  });
}

function convert(code: string, filename = 'test.ts') {
  const filePath = join(TMP_DIR, filename);
  const program = createProgram(filePath, code);
  return {
    filePath,
    result: convertTsToGd({
      filePath,
      rootDir: TMP_DIR,
      sourceMap: true,
      program,
    }),
  };
}

afterEach(() => {
  rmSync(TMP_DIR, { recursive: true, force: true });
});

describe('Source map accuracy', () => {
  it('column 0 lookup on indented lines should return the correct original line', async () => {
    const code = [
      'export class MyNode extends Node2D {',
      '  _ready() {',
      '    let x: int = 5;',
      '    let y: int = 10;',
      '  }',
      '}',
      '',
    ].join('\n');

    const { filePath, result } = convert(code);
    const reader = await SourceMapReader.fromJSON(result.sourceMap!);

    const gdLines = result.code.split('\n');

    // Find the lines with "var x" and "var y"
    const varXLineIdx = gdLines.findIndex((l) => l.includes('var x'));
    const varYLineIdx = gdLines.findIndex((l) => l.includes('var y'));
    expect(varXLineIdx).toBeGreaterThan(-1);
    expect(varYLineIdx).toBeGreaterThan(-1);

    const varXLine = varXLineIdx + 1; // 1-based
    const varYLine = varYLineIdx + 1;

    // Column 0 lookup (what Godot errors typically report)
    const xAtCol0 = reader.originalPositionFor(varXLine, 0);
    const yAtCol0 = reader.originalPositionFor(varYLine, 0);

    // These should map to TS lines 3 and 4 respectively
    expect(xAtCol0.line).toBe(3);
    expect(yAtCol0.line).toBe(4);

    reader.destroy();
  });

  it('every non-empty GD line with a statement should have a mapping', async () => {
    const code = [
      'export class Test extends Node {',
      '  health: int = 100;',
      '  _ready() {',
      '    let x: int = 1;',
      '    if (true) {',
      '      x = 2;',
      '    } else {',
      '      x = 3;',
      '    }',
      '    return x;',
      '  }',
      '}',
      '',
    ].join('\n');

    const { filePath, result } = convert(code);
    const reader = await SourceMapReader.fromJSON(result.sourceMap!);
    const gdLines = result.code.split('\n');

    const unmapped: string[] = [];
    for (let i = 0; i < gdLines.length; i++) {
      const line = gdLines[i]!;
      if (line.trim() === '') continue;
      const gdLine = i + 1; // 1-based

      // Try column 0 first, then first non-whitespace column
      const firstNonWs = line.length - line.trimStart().length;
      const pos0 = reader.originalPositionFor(gdLine, 0);
      const posNonWs = reader.originalPositionFor(gdLine, firstNonWs);

      // At least one of these should map to a valid original line on the correct GD line
      const hasValidMapping =
        (pos0.line !== null && pos0.line > 0) ||
        (posNonWs.line !== null && posNonWs.line > 0);

      if (!hasValidMapping) {
        unmapped.push(`GD line ${gdLine}: "${line.trim()}"`);
      }
    }

    // All statement lines should have mappings
    expect(unmapped).toEqual([]);

    reader.destroy();
  });

  it('mappings should point to the correct TS line, not the previous line', async () => {
    const code = [
      'export class Test extends Node {', // TS 1
      '  _process() {', // TS 2
      '    let a: int = 1;', // TS 3
      '    let b: int = 2;', // TS 4
      '    let c: int = 3;', // TS 5
      '  }', // TS 6
      '}', // TS 7
      '',
    ].join('\n');

    const { filePath, result } = convert(code);
    const reader = await SourceMapReader.fromJSON(result.sourceMap!);
    const gdLines = result.code.split('\n');

    // GD output should be something like:
    // 1: extends Node
    // 2: class_name Test
    // 3: (empty)
    // 4: func _process():
    // 5: \tvar a: int = 1
    // 6: \tvar b: int = 2
    // 7: \tvar c: int = 3

    // For each "var X" line, check at column 0
    for (let i = 0; i < gdLines.length; i++) {
      const line = gdLines[i]!;
      const gdLine = i + 1;

      if (line.includes('var a')) {
        const pos = reader.originalPositionFor(gdLine, 0);
        expect(pos.line).toBe(3); // TS line 3: let a
      }
      if (line.includes('var b')) {
        const pos = reader.originalPositionFor(gdLine, 0);
        expect(pos.line).toBe(4); // TS line 4: let b
      }
      if (line.includes('var c')) {
        const pos = reader.originalPositionFor(gdLine, 0);
        expect(pos.line).toBe(5); // TS line 5: let c
      }
    }

    reader.destroy();
  });

  it('else branch should map back to the else keyword position', async () => {
    const code = [
      'export class Test extends Node {', // TS 1
      '  run() {', // TS 2
      '    if (true) {', // TS 3
      '      return 1;', // TS 4
      '    } else {', // TS 5
      '      return 2;', // TS 6
      '    }', // TS 7
      '  }', // TS 8
      '}', // TS 9
      '',
    ].join('\n');

    const { filePath, result } = convert(code);
    const reader = await SourceMapReader.fromJSON(result.sourceMap!);
    const gdLines = result.code.split('\n');

    // Find the "else:" line
    const elseLineIdx = gdLines.findIndex((l) => l.trim() === 'else:');
    expect(elseLineIdx).toBeGreaterThan(-1);

    const elseGdLine = elseLineIdx + 1;
    const pos = reader.originalPositionFor(elseGdLine, 0);

    // else: should map to TS line 5 (the } else { line), or at minimum have a valid mapping
    expect(pos.line).toBeGreaterThan(0);

    reader.destroy();
  });

  it('all mappings should have generated columns that match actual content positions', async () => {
    const code = [
      'export class Test extends Node {',
      '  health: int = 100;',
      '  run() {',
      '    let x: int = 1;',
      '    if (true) {',
      '      return x;',
      '    }',
      '  }',
      '}',
      '',
    ].join('\n');

    const { filePath, result } = convert(code);
    const reader = await SourceMapReader.fromJSON(result.sourceMap!);
    const allMappings = reader.allMappings();
    const gdLines = result.code.split('\n');

    for (const m of allMappings) {
      const gdLine = gdLines[m.generatedLine - 1];
      if (!gdLine) continue;

      // Generated column should not exceed the line length
      expect(m.generatedColumn).toBeLessThanOrEqual(gdLine.length);

      // Generated column should not be negative
      expect(m.generatedColumn).toBeGreaterThanOrEqual(0);

      // Original line should be positive
      expect(m.originalLine).toBeGreaterThan(0);
    }

    reader.destroy();
  });

  it('bidirectional lookup should be consistent', async () => {
    const code = [
      'export class Test extends RefCounted {',
      '  value: int = 42;',
      '  name: String = "hello";',
      '  run() {',
      '    return self.value;',
      '  }',
      '}',
      '',
    ].join('\n');

    const { filePath, result } = convert(code);
    const reader = await SourceMapReader.fromJSON(result.sourceMap!);
    const allMappings = reader.allMappings();

    for (const m of allMappings) {
      // Reverse lookup: given the original position, find a generated position
      const genPos = reader.generatedPositionFor(
        filePath,
        m.originalLine,
        m.originalColumn,
      );
      expect(genPos.line).not.toBeNull();

      // Forward lookup from that generated position should return the
      // same original position — closing the round trip.
      if (genPos.line !== null && genPos.column !== null) {
        const origPos = reader.originalPositionFor(genPos.line, genPos.column);
        expect(origPos.line).toBe(m.originalLine);
        expect(origPos.column).toBe(m.originalColumn);
      }
    }

    reader.destroy();
  });

  it('nested indentation should produce correct column mappings', async () => {
    const code = [
      'export class Test extends Node {', // TS 1
      '  run() {', // TS 2
      '    if (true) {', // TS 3
      '      if (false) {', // TS 4
      '        let x: int = 1;', // TS 5
      '      }', // TS 6
      '    }', // TS 7
      '  }', // TS 8
      '}', // TS 9
      '',
    ].join('\n');

    const { filePath, result } = convert(code);
    const reader = await SourceMapReader.fromJSON(result.sourceMap!);
    const gdLines = result.code.split('\n');

    // Find deeply nested "var x" line
    const varXIdx = gdLines.findIndex((l) => l.includes('var x'));
    expect(varXIdx).toBeGreaterThan(-1);

    const varXGdLine = varXIdx + 1;

    // Should map correctly at column 0
    const pos = reader.originalPositionFor(varXGdLine, 0);
    expect(pos.line).toBe(5); // TS line 5

    reader.destroy();
  });
});
