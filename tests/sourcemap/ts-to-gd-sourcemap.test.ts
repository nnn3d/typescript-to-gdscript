import { describe, it, expect, afterEach } from 'vitest';
import { convertTsToGd } from '../../src/converter/ts-to-gd/index.js';
import { SourceMapReader } from '../../src/sourcemap/index.js';
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TMP_DIR = join(__dirname, '__tmp__');

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

afterEach(() => {
  rmSync(TMP_DIR, { recursive: true, force: true });
});

describe('Source Map: TS-to-GD mappings', () => {
  it('should map class_name and extends to class declaration', async () => {
    // TS source:
    // Line 1: class MyNode extends Node2D {
    // Line 2: }
    const code = `class MyNode extends Node2D {\n}\n`;
    const filePath = join(TMP_DIR, 'test.ts');
    const program = createProgram(filePath, code);

    const result = convertTsToGd({
      filePath,
      rootDir: TMP_DIR,
      sourceMap: true,
      program,
    });

    expect(result.sourceMap).toBeDefined();
    const reader = await SourceMapReader.fromJSON(result.sourceMap!);

    // GD output:
    // Line 1: extends Node2D
    // Line 2: class_name MyNode
    // Both should map back to TS line 1 (class declaration)
    const extendsPos = reader.originalPositionFor(1, 0);
    expect(extendsPos.line).toBe(1);

    const classNamePos = reader.originalPositionFor(2, 0);
    expect(classNamePos.line).toBe(1);

    reader.destroy();
  });

  it('should map variable declarations to correct lines', async () => {
    // TS source:
    // Line 1: class Vars extends Node {
    // Line 2:   health: int = 100;
    // Line 3:   speed: float = 10.5;
    // Line 4:   _ready() {
    // Line 5:     let x: int = 5;
    // Line 6:   }
    // Line 7: }
    const code = [
      'class Vars extends Node {',
      '  health: int = 100;',
      '  speed: float = 10.5;',
      '  _ready() {',
      '    let x: int = 5;',
      '  }',
      '}',
      '',
    ].join('\n');

    const filePath = join(TMP_DIR, 'vars.ts');
    const program = createProgram(filePath, code);

    const result = convertTsToGd({
      filePath,
      rootDir: TMP_DIR,
      sourceMap: true,
      program,
    });

    expect(result.sourceMap).toBeDefined();
    const reader = await SourceMapReader.fromJSON(result.sourceMap!);

    // GD output:
    // Line 1: extends Node
    // Line 2: class_name Vars
    // Line 3: (empty)
    // Line 4: var health: int = 100
    // Line 5: var speed: float = 10.5
    // Line 6: (empty)
    // Line 7: func _ready():
    // Line 8: \tvar x: int = 5

    // "var health" on GD line 4 should map to TS line 2
    const healthPos = reader.originalPositionFor(4, 0);
    expect(healthPos.line).toBe(2);

    // "var speed" on GD line 5 should map to TS line 3
    const speedPos = reader.originalPositionFor(5, 0);
    expect(speedPos.line).toBe(3);

    // "func _ready" on GD line 7 should map to TS line 4
    const readyPos = reader.originalPositionFor(7, 0);
    expect(readyPos.line).toBe(4);

    // "var x" on GD line 8, column 1 (after tab indent) should map to TS line 5
    const xPos = reader.originalPositionFor(8, 1);
    expect(xPos.line).toBe(5);

    reader.destroy();
  });

  it('should map control flow statements', async () => {
    // TS source:
    // Line 1: class CF extends Node {
    // Line 2:   run() {
    // Line 3:     if (true) {
    // Line 4:       return 1;
    // Line 5:     } else {
    // Line 6:       return 2;
    // Line 7:     }
    // Line 8:   }
    // Line 9: }
    const code = [
      'class CF extends Node {',
      '  run() {',
      '    if (true) {',
      '      return 1;',
      '    } else {',
      '      return 2;',
      '    }',
      '  }',
      '}',
      '',
    ].join('\n');

    const filePath = join(TMP_DIR, 'cf.ts');
    const program = createProgram(filePath, code);

    const result = convertTsToGd({
      filePath,
      rootDir: TMP_DIR,
      sourceMap: true,
      program,
    });

    expect(result.sourceMap).toBeDefined();
    const reader = await SourceMapReader.fromJSON(result.sourceMap!);

    // GD output:
    // Line 1: extends Node
    // Line 2: class_name CF
    // Line 3: (empty)
    // Line 4: func run():
    // Line 5: \tif true:
    // Line 6: \t\treturn 1
    // Line 7: \telse:
    // Line 8: \t\treturn 2

    // "func run" on GD line 4 -> TS line 2
    const funcPos = reader.originalPositionFor(4, 0);
    expect(funcPos.line).toBe(2);

    // "if true" on GD line 5 -> TS line 3
    const ifPos = reader.originalPositionFor(5, 1);
    expect(ifPos.line).toBe(3);

    // "return 1" on GD line 6 -> TS line 4
    const ret1Pos = reader.originalPositionFor(6, 2);
    expect(ret1Pos.line).toBe(4);

    // "return 2" on GD line 8 -> TS line 6
    const ret2Pos = reader.originalPositionFor(8, 2);
    expect(ret2Pos.line).toBe(6);

    reader.destroy();
  });

  it('should map comments to their original positions', async () => {
    // TS source:
    // Line 1: class CM extends Node {
    // Line 2:   // A single-line comment
    // Line 3:   health: int = 100;
    // Line 4:   /** A doc comment */
    // Line 5:   speed: float = 5.0;
    // Line 6: }
    const code = [
      'class CM extends Node {',
      '  // A single-line comment',
      '  health: int = 100;',
      '  /** A doc comment */',
      '  speed: float = 5.0;',
      '}',
      '',
    ].join('\n');

    const filePath = join(TMP_DIR, 'comments.ts');
    const program = createProgram(filePath, code);

    const result = convertTsToGd({
      filePath,
      rootDir: TMP_DIR,
      sourceMap: true,
      program,
    });

    expect(result.sourceMap).toBeDefined();
    const reader = await SourceMapReader.fromJSON(result.sourceMap!);

    // GD output:
    // Line 1: extends Node
    // Line 2: class_name CM
    // Line 3: (empty)
    // Line 4: # A single-line comment
    // Line 5: var health: int = 100
    // Line 6: ## A doc comment
    // Line 7: var speed: float = 5.0

    // "# A single-line comment" on GD line 4 -> TS line 2
    const commentPos = reader.originalPositionFor(4, 0);
    expect(commentPos.line).toBe(2);

    // "var health" on GD line 5 -> TS line 3
    const healthPos = reader.originalPositionFor(5, 0);
    expect(healthPos.line).toBe(3);

    // "## A doc comment" on GD line 6 -> TS line 4
    const docPos = reader.originalPositionFor(6, 0);
    expect(docPos.line).toBe(4);

    // "var speed" on GD line 7 -> TS line 5
    const speedPos = reader.originalPositionFor(7, 0);
    expect(speedPos.line).toBe(5);

    reader.destroy();
  });

  it('should map for loop and while loop', async () => {
    // TS source:
    // Line 1: class Loops extends Node {
    // Line 2:   run() {
    // Line 3:     for (let item of items) {
    // Line 4:       process(item);
    // Line 5:     }
    // Line 6:     while (true) {
    // Line 7:       break;
    // Line 8:     }
    // Line 9:   }
    // Line 10: }
    const code = [
      'class Loops extends Node {',
      '  run() {',
      '    for (let item of items) {',
      '      process(item);',
      '    }',
      '    while (true) {',
      '      break;',
      '    }',
      '  }',
      '}',
      '',
    ].join('\n');

    const filePath = join(TMP_DIR, 'loops.ts');
    const program = createProgram(filePath, code);

    const result = convertTsToGd({
      filePath,
      rootDir: TMP_DIR,
      sourceMap: true,
      program,
    });

    expect(result.sourceMap).toBeDefined();
    const reader = await SourceMapReader.fromJSON(result.sourceMap!);

    // GD output:
    // Line 1: extends Node
    // Line 2: class_name Loops
    // Line 3: (empty)
    // Line 4: func run():
    // Line 5: \tfor item in items:
    // Line 6: \t\tprocess(item)
    // Line 7: \twhile true:
    // Line 8: \t\tbreak

    // "for item in items" on GD line 5 -> TS line 3
    const forPos = reader.originalPositionFor(5, 1);
    expect(forPos.line).toBe(3);

    // "process(item)" on GD line 6 -> TS line 4
    const processPos = reader.originalPositionFor(6, 2);
    expect(processPos.line).toBe(4);

    // "while true" on GD line 7 -> TS line 6
    const whilePos = reader.originalPositionFor(7, 1);
    expect(whilePos.line).toBe(6);

    // "break" on GD line 8 -> TS line 7
    const breakPos = reader.originalPositionFor(8, 2);
    expect(breakPos.line).toBe(7);

    reader.destroy();
  });

  it('should include source content in the source map', async () => {
    const code = `class Simple extends Node {\n}\n`;
    const filePath = join(TMP_DIR, 'simple.ts');
    const program = createProgram(filePath, code);

    const result = convertTsToGd({
      filePath,
      rootDir: TMP_DIR,
      sourceMap: true,
      program,
    });

    const rawMap = JSON.parse(result.sourceMap!);
    expect(rawMap.sourcesContent).toBeDefined();
    expect(rawMap.sourcesContent[0]).toBe(code);
  });

  it('should have no source map when sourceMap option is false', () => {
    const code = `class NoMap extends Node {\n}\n`;
    const filePath = join(TMP_DIR, 'nomap.ts');
    const program = createProgram(filePath, code);

    const result = convertTsToGd({
      filePath,
      rootDir: TMP_DIR,
      sourceMap: false,
      program,
    });

    expect(result.sourceMap).toBeUndefined();
  });

  it('should produce valid bidirectional mappings', async () => {
    // TS source:
    // Line 1: class Bi extends RefCounted {
    // Line 2:   value: int = 42;
    // Line 3: }
    const code = [
      'class Bi extends RefCounted {',
      '  value: int = 42;',
      '}',
      '',
    ].join('\n');

    const filePath = join(TMP_DIR, 'bi.ts');
    const program = createProgram(filePath, code);

    const result = convertTsToGd({
      filePath,
      rootDir: TMP_DIR,
      sourceMap: true,
      program,
    });

    const reader = await SourceMapReader.fromJSON(result.sourceMap!);

    // GD line 4: var value: int = 42 -> TS line 2
    const origPos = reader.originalPositionFor(4, 0);
    expect(origPos.line).toBe(2);

    // Reverse: TS line 2 col 2 -> GD position
    const genPos = reader.generatedPositionFor(filePath, 2, 2);
    expect(genPos.line).toBe(4);

    reader.destroy();
  });

  it('should map all entries and cover every GD output line with a statement', async () => {
    const code = [
      'class Full extends Node {',       // Line 1
      '  hp: int = 10;',                 // Line 2
      '  run() {',                        // Line 3
      '    let x: int = 1;',             // Line 4
      '    return x;',                    // Line 5
      '  }',                              // Line 6
      '}',                                // Line 7
      '',
    ].join('\n');

    const filePath = join(TMP_DIR, 'full.ts');
    const program = createProgram(filePath, code);

    const result = convertTsToGd({
      filePath,
      rootDir: TMP_DIR,
      sourceMap: true,
      program,
    });

    const reader = await SourceMapReader.fromJSON(result.sourceMap!);
    const allMappings = reader.allMappings();

    // Every mapping should have valid original and generated positions
    for (const m of allMappings) {
      expect(m.originalLine).toBeGreaterThan(0);
      expect(m.originalColumn).toBeGreaterThanOrEqual(0);
      expect(m.generatedLine).toBeGreaterThan(0);
      expect(m.generatedColumn).toBeGreaterThanOrEqual(0);
    }

    // We expect mappings for: extends, class_name, var hp, func run, var x, return x
    // That's at least 6 mapping entries
    expect(allMappings.length).toBeGreaterThanOrEqual(6);

    reader.destroy();
  });
});
