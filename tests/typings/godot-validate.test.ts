import { describe, it, expect, afterEach, beforeAll } from 'vitest';
import {
  parseGodotErrors,
  remapError,
  validateGdFiles,
  type GodotRawError,
} from '../../src/godot-validate/index.ts';
import { convertTsToGd } from '../../src/converter/ts-to-gd/index.ts';
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join, resolve } from 'path';
import { dirname } from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';
import ts from 'typescript';
import { tmpdir } from 'os';

const execFileAsync = promisify(execFile);
const TMP_DIR = join(tmpdir(), '__tmp__' + Math.random().toString(36));
const GODOT_PATH = resolve(__dirname, '../../vendor/godot.exe');

afterEach(() => {
  rmSync(TMP_DIR, { recursive: true, force: true });
});

// ─── parseGodotErrors ─────────────────────────────────────────

describe('parseGodotErrors', () => {
  const projectRoot = '/project';

  it('should parse res:// format with line only', () => {
    const stderr =
      'res://scripts/player.gd:15 - Parse Error: Expected ":" after variable name.\n';
    const errors = parseGodotErrors(stderr, projectRoot);

    expect(errors).toHaveLength(1);
    expect(errors[0]!.file).toBe(resolve('/project/scripts/player.gd'));
    expect(errors[0]!.line).toBe(15);
    expect(errors[0]!.column).toBe(0);
    expect(errors[0]!.errorType).toBe('Parse Error');
    expect(errors[0]!.message).toBe('Expected ":" after variable name.');
  });

  it('should parse res:// format with line and column', () => {
    const stderr =
      'res://player.gd:10:5 - Compile Error: Unknown identifier.\n';
    const errors = parseGodotErrors(stderr, projectRoot);

    expect(errors).toHaveLength(1);
    expect(errors[0]!.line).toBe(10);
    expect(errors[0]!.column).toBe(5);
    expect(errors[0]!.errorType).toBe('Compile Error');
    expect(errors[0]!.message).toBe('Unknown identifier.');
  });

  it('should parse SCRIPT ERROR format with at: line', () => {
    const stderr = [
      'SCRIPT ERROR: Parse Error: Unexpected token.',
      '  at: res://scripts/enemy.gd:42',
    ].join('\n');
    const errors = parseGodotErrors(stderr, projectRoot);

    expect(errors).toHaveLength(1);
    expect(errors[0]!.file).toBe(resolve('/project/scripts/enemy.gd'));
    expect(errors[0]!.line).toBe(42);
    expect(errors[0]!.errorType).toBe('Parse Error');
    expect(errors[0]!.message).toBe('Unexpected token.');
  });

  it('should parse SCRIPT ERROR with GDScript::reload at: format', () => {
    const stderr = [
      'SCRIPT ERROR: Parse Error: Cannot assign a value of type "String" as "int".',
      '   at: GDScript::reload (res://test_error.gd:4)',
    ].join('\n');
    const errors = parseGodotErrors(stderr, projectRoot);

    expect(errors).toHaveLength(1);
    expect(errors[0]!.file).toBe(resolve('/project/test_error.gd'));
    expect(errors[0]!.line).toBe(4);
    expect(errors[0]!.errorType).toBe('Parse Error');
    expect(errors[0]!.message).toBe(
      'Cannot assign a value of type "String" as "int".',
    );
  });

  it('should parse real Godot 4.6 multi-error output', () => {
    const stderr = [
      'Godot Engine v4.6.stable.official.89cea1439 - https://godotengine.org',
      '',
      'SCRIPT ERROR: Parse Error: Cannot assign a value of type "String" as "int".',
      '   at: GDScript::reload (res://test_error.gd:4)',
      'SCRIPT ERROR: Parse Error: Cannot assign a value of type String to variable "test" with specified type int.',
      '   at: GDScript::reload (res://test_error.gd:4)',
      'ERROR: Failed to load script "res://test_error.gd" with error "Parse error".',
      '   at: load (modules/gdscript/gdscript.cpp:2907)',
    ].join('\n');
    const errors = parseGodotErrors(stderr, projectRoot);

    // Should get 2 SCRIPT ERRORs, skip the generic "Failed to load script" ERROR
    expect(errors).toHaveLength(2);
    expect(errors[0]!.message).toBe(
      'Cannot assign a value of type "String" as "int".',
    );
    expect(errors[0]!.line).toBe(4);
    expect(errors[1]!.message).toBe(
      'Cannot assign a value of type String to variable "test" with specified type int.',
    );
    expect(errors[1]!.line).toBe(4);
  });

  it('should parse SCRIPT ERROR format with column in at: line', () => {
    const stderr = [
      'SCRIPT ERROR: Compile Error: Cannot find member.',
      '  at: res://main.gd:7:3',
    ].join('\n');
    const errors = parseGodotErrors(stderr, projectRoot);

    expect(errors).toHaveLength(1);
    expect(errors[0]!.line).toBe(7);
    expect(errors[0]!.column).toBe(3);
  });

  it('should parse multiple errors', () => {
    const stderr = [
      'res://a.gd:1 - Parse Error: Error 1.',
      'res://b.gd:2 - Compile Error: Error 2.',
      'res://c.gd:3 - Script Error: Error 3.',
    ].join('\n');
    const errors = parseGodotErrors(stderr, projectRoot);

    expect(errors).toHaveLength(3);
    expect(errors[0]!.message).toBe('Error 1.');
    expect(errors[1]!.message).toBe('Error 2.');
    expect(errors[2]!.message).toBe('Error 3.');
  });

  it('should handle empty stderr', () => {
    expect(parseGodotErrors('', projectRoot)).toHaveLength(0);
  });

  it('should ignore non-error lines', () => {
    const stderr = [
      'Godot Engine v4.7.stable - https://godotengine.org',
      'OpenGL ES 3.0 Renderer: NVIDIA',
      'res://player.gd:5 - Parse Error: Bad syntax.',
      'Some other output line',
    ].join('\n');
    const errors = parseGodotErrors(stderr, projectRoot);

    expect(errors).toHaveLength(1);
    expect(errors[0]!.message).toBe('Bad syntax.');
  });

  it('should parse absolute path format', () => {
    const stderr =
      '/project/scripts/player.gd:20 - Parse Error: Unexpected end of file.\n';
    const errors = parseGodotErrors(stderr, projectRoot);

    expect(errors).toHaveLength(1);
    expect(errors[0]!.line).toBe(20);
    expect(errors[0]!.errorType).toBe('Parse Error');
  });
});

// ─── remapError ───────────────────────────────────────────────

describe('remapError', () => {
  function createTestProgram(filePath: string, code: string): ts.Program {
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

  it('should remap GD error to TS position via source map', async () => {
    const tsCode = `class Player extends Node2D {\n  test_method() {\n    let x: int = 42;\n  }\n}\n`;
    const tsPath = join(TMP_DIR, 'player.ts');
    const gdPath = join(TMP_DIR, 'player.gd');
    const mapPath = gdPath + '.map';

    const program = createTestProgram(tsPath, tsCode);
    const result = convertTsToGd({
      filePath: tsPath,
      rootDir: TMP_DIR,
      sourceMap: true,
      program,
    });

    writeFileSync(gdPath, result.code);
    writeFileSync(mapPath, result.sourceMap!);

    // Find the "class_name" line in GD output — it definitely has a mapping
    const gdLines = result.code.split('\n');
    const classNameLine =
      gdLines.findIndex((l) => l.includes('class_name')) + 1; // 1-based

    const rawError: GodotRawError = {
      file: gdPath,
      line: classNameLine,
      column: 0,
      errorType: 'Parse Error',
      message: 'Test error.',
    };

    const diag = await remapError(rawError);

    // Should point to the TS file, not the GD file
    expect(diag.file).toContain('player.ts');
    expect(diag.message).toBe('[Godot Parse Error] Test error.');
    expect(diag.severity).toBe('error');
    // class_name maps back to TS line 1 (class declaration)
    expect(diag.line).toBe(1);
  });

  it('should fall back to GD position when no source map', async () => {
    const rawError: GodotRawError = {
      file: join(TMP_DIR, 'nonexistent.gd'),
      line: 10,
      column: 5,
      errorType: 'Compile Error',
      message: 'Unknown identifier.',
    };

    const diag = await remapError(rawError);

    expect(diag.file).toBe(rawError.file);
    expect(diag.line).toBe(10);
    expect(diag.column).toBe(5);
    expect(diag.message).toBe('[Godot Compile Error] Unknown identifier.');
  });

  it('should use sourceMapDir when provided', async () => {
    const tsCode = `class Enemy extends Node {\n  attack() {\n    let damage: int = 10;\n  }\n}\n`;
    const tsPath = join(TMP_DIR, 'enemy.ts');
    const gdPath = join(TMP_DIR, 'output', 'enemy.gd');
    const mapDir = join(TMP_DIR, 'maps');
    const mapPath = join(mapDir, 'enemy.gd.map');

    mkdirSync(join(TMP_DIR, 'output'), { recursive: true });
    mkdirSync(mapDir, { recursive: true });

    const program = createTestProgram(tsPath, tsCode);
    const result = convertTsToGd({
      filePath: tsPath,
      rootDir: TMP_DIR,
      sourceMap: true,
      program,
    });

    writeFileSync(gdPath, result.code);
    writeFileSync(mapPath, result.sourceMap!);

    const rawError: GodotRawError = {
      file: gdPath,
      line: 1, // class_name line
      column: 0,
      errorType: 'Parse Error',
      message: 'Test error.',
    };

    const diag = await remapError(rawError, mapDir);

    // Should find the source map in mapDir and remap
    expect(diag.line).toBeGreaterThan(0);
    expect(diag.message).toBe('[Godot Parse Error] Test error.');
  });
});

// ─── Real Godot CLI integration tests ─────────────────────────

try {
  await execFileAsync('godot', ['--version'], { timeout: 10000 });
} catch {
  console.error('godot is not found!');
}

describe('Godot CLI integration', () => {
  function setupGodotProject(): string {
    const projectDir = join(TMP_DIR, 'godot-project');
    mkdirSync(projectDir, { recursive: true });
    writeFileSync(
      join(projectDir, 'project.godot'),
      [
        '; Engine configuration file.',
        'config_version=5',
        '',
        '[application]',
        'config/name="Test"',
      ].join('\n'),
    );
    return projectDir;
  }

  function createTestProgram(filePath: string, code: string): ts.Program {
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, code);
    return ts.createProgram([filePath], {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.Node16,
      moduleResolution: ts.ModuleResolutionKind.Node16,
      strict: true,
      noEmit: true,
    });
  }

  it('should detect type mismatch: var test: int = ""', async () => {
    const projectDir = setupGodotProject();
    writeFileSync(
      join(projectDir, 'type_error.gd'),
      [
        'class_name TypeErrorTest',
        'extends Node',
        '',
        'var test: int = ""',
      ].join('\n'),
    );

    const result = await validateGdFiles({
      gdFiles: [join(projectDir, 'type_error.gd')],
      projectRoot: projectDir,
      godotPath: GODOT_PATH,
    });

    expect(result.godotAvailable).toBe(true);
    expect(result.diagnostics.length).toBeGreaterThan(0);
    expect(
      result.diagnostics.some(
        (d) => d.severity === 'error' && d.message.includes('String'),
      ),
    ).toBe(true);
  });

  it('should detect unknown function call', async () => {
    const projectDir = setupGodotProject();
    writeFileSync(
      join(projectDir, 'unknown_func.gd'),
      [
        'class_name UnknownFuncTest',
        'extends Node',
        '',
        'func _ready() -> void:',
        '\tvar x = nonexistent_func()',
      ].join('\n'),
    );

    const result = await validateGdFiles({
      gdFiles: [join(projectDir, 'unknown_func.gd')],
      projectRoot: projectDir,
      godotPath: GODOT_PATH,
    });

    expect(result.diagnostics.length).toBeGreaterThan(0);
    expect(
      result.diagnostics.some((d) => d.message.includes('nonexistent_func')),
    ).toBe(true);
  });

  it('should detect syntax error: missing colon after if', async () => {
    const projectDir = setupGodotProject();
    writeFileSync(
      join(projectDir, 'syntax_error.gd'),
      [
        'class_name SyntaxErrorTest',
        'extends Node',
        '',
        'func _ready() -> void:',
        '\tif true',
        '\t\tpass',
      ].join('\n'),
    );

    const result = await validateGdFiles({
      gdFiles: [join(projectDir, 'syntax_error.gd')],
      projectRoot: projectDir,
      godotPath: GODOT_PATH,
    });

    expect(result.diagnostics.length).toBeGreaterThan(0);
    expect(result.diagnostics[0]!.severity).toBe('error');
  });

  it('should pass for valid script', async () => {
    const projectDir = setupGodotProject();
    writeFileSync(
      join(projectDir, 'valid.gd'),
      [
        'class_name ValidTest',
        'extends Node',
        '',
        'var health: int = 100',
        '',
        'func _ready() -> void:',
        '\tpass',
      ].join('\n'),
    );

    const result = await validateGdFiles({
      gdFiles: [join(projectDir, 'valid.gd')],
      projectRoot: projectDir,
      godotPath: GODOT_PATH,
    });

    expect(result.diagnostics).toHaveLength(0);
  });

  it('should report correct line number for type error', async () => {
    const projectDir = setupGodotProject();
    writeFileSync(
      join(projectDir, 'line_check.gd'),
      [
        'class_name LineCheckTest', // line 1
        'extends Node', // line 2
        '', // line 3
        'var a: int = 1', // line 4
        'var b: String = "hello"', // line 5
        'var c: int = "wrong"', // line 6 — error here
      ].join('\n'),
    );

    const result = await validateGdFiles({
      gdFiles: [join(projectDir, 'line_check.gd')],
      projectRoot: projectDir,
      godotPath: GODOT_PATH,
    });

    expect(result.diagnostics.length).toBeGreaterThan(0);
    // Error should point to line 6
    expect(result.diagnostics.some((d) => d.line === 6)).toBe(true);
  });

  it('should remap type error to TS source via source map', async () => {
    const projectDir = setupGodotProject();
    const tsPath = join(projectDir, 'remap_test.ts');

    // TS source: line 3 has the bad let (will produce type error in GD)
    // But we can't actually produce a type error from valid TS conversion,
    // so we'll write a GD file with an error + a source map from a real conversion,
    // and verify the line maps back.
    const tsCode =
      [
        'class RemapTest extends Node {',
        '  empty() {',
        '    // empty fn',
        '  }',
        '  _ready() {',
        '    let health: int = "";',
        '  }',
        '}',
      ].join('\n') + '\n';

    const program = createTestProgram(tsPath, tsCode);
    const result = convertTsToGd({
      filePath: tsPath,
      rootDir: projectDir,
      sourceMap: true,
      program,
    });

    const gdPath = join(projectDir, 'remap_test.gd');
    const mapPath = gdPath + '.map';

    writeFileSync(gdPath, result.code);
    writeFileSync(mapPath, result.sourceMap!);

    const validateResult = await validateGdFiles({
      gdFiles: [gdPath],
      projectRoot: projectDir,
      godotPath: GODOT_PATH,
    });

    expect(validateResult.diagnostics.length).toBeGreaterThan(0);

    // The error should be remapped to the TS file (not pointing to .gd)
    const remappedDiag = validateResult.diagnostics.find((d) =>
      d.file.endsWith('.ts'),
    );
    expect(
      remappedDiag,
      `Expected TS file in diagnostics, got: ${JSON.stringify(validateResult.diagnostics.map((d) => ({ file: d.file, line: d.line })))}`,
    ).toBeDefined();
    // Should point to TS line 6 (let health: int = "")
    expect(remappedDiag!.line).toBe(6);
    expect(remappedDiag!.message).toContain(
      'Cannot assign a value of type "String" as "int".',
    );
  });

  it('should validate multiple files', async () => {
    const projectDir = setupGodotProject();

    writeFileSync(
      join(projectDir, 'good.gd'),
      ['class_name GoodTest', 'extends Node', 'var x: int = 1'].join('\n'),
    );

    writeFileSync(
      join(projectDir, 'bad.gd'),
      ['class_name BadTest', 'extends Node', 'var x: int = ""'].join('\n'),
    );

    const result = await validateGdFiles({
      gdFiles: [join(projectDir, 'good.gd'), join(projectDir, 'bad.gd')],
      projectRoot: projectDir,
      godotPath: GODOT_PATH,
    });

    // Only bad.gd should have errors
    expect(result.diagnostics.length).toBeGreaterThan(0);
    expect(result.diagnostics.every((d) => d.file.includes('bad.gd'))).toBe(
      true,
    );
  });
});
