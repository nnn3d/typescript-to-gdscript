import { describe, it, expect, afterEach } from 'vitest';
import { convertTsToGd } from '../../src/converter/ts-to-gd/index.ts';
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';
import ts from 'typescript';
import { tmpdir } from 'os';

const TMP_DIR = join(tmpdir(), 'tstogd-enum-' + Math.random().toString(36));

function createProgram(filePath: string, code: string): ts.Program {
  mkdirSync(TMP_DIR, { recursive: true });
  writeFileSync(filePath, code);
  return ts.createProgram([filePath], {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    strict: true,
    noEmit: true,
    noLib: true,
    moduleResolution: ts.ModuleResolutionKind.Classic,
    types: [],
  });
}

function convert(code: string, filename = 'test.ts') {
  const filePath = join(TMP_DIR, filename);
  const program = createProgram(filePath, code);
  return {
    filePath,
    result: convertTsToGd({ filePath, rootDir: TMP_DIR, program }),
  };
}

afterEach(() => {
  rmSync(TMP_DIR, { recursive: true, force: true });
});

describe('enum values should not trigger typeContainsUndefined', () => {
  it('enum literal passed as argument should not produce type-error', () => {
    const code = [
      'export namespace GC {',
      '  export enum GameState { PRE_LEVEL, COUNTDOWN, PLAYING, PAUSED, LEVEL_COMPLETE }',
      '}',
      'export class GC extends Node2D {',
      '  game_state?: GC.GameState;',
      '  _ready() {',
      '    this.set_state(GC.GameState.PRE_LEVEL);',
      '  }',
      '  set_state(new_state: GC.GameState) {',
      '    this._exit_state(this.game_state);',
      '    this.game_state = new_state;',
      '    this._enter_state(this.game_state);',
      '  }',
      '  _exit_state(state: GC.GameState) {}',
      '  _enter_state(state: GC.GameState) {}',
      '}',
      '',
    ].join('\n');

    const { result } = convert(code);

    const typeErrors = result.diagnostics.filter(
      (d) => d.severity === 'type-error',
    );
    expect(
      typeErrors.map((d) => d.message),
      'Enum values should not produce type-error diagnostics',
    ).toEqual([]);
  });

  it('enum property access should not convert to .get()', () => {
    const code = [
      'export namespace Test {',
      '  export enum Dir { Up, Down, Left, Right }',
      '}',
      'export class Test extends Node {',
      '  run() {',
      '    let d = Test.Dir.Up;',
      '  }',
      '}',
      '',
    ].join('\n');

    const { result } = convert(code);
    expect(result.code).not.toContain('.get(');
  });

  it('const enum values (Godot globals) should not false-positive', () => {
    const code = [
      'declare const enum Side { SIDE_LEFT = 0, SIDE_TOP = 1, SIDE_RIGHT = 2, SIDE_BOTTOM = 3 }',
      'export class Test extends Node {',
      '  run() {',
      '    let s: Side = Side.SIDE_LEFT;',
      '    self.foo(Side.SIDE_TOP);',
      '    self.foo(s);',
      '  }',
      '  foo(s: Side) {}',
      '}',
      '',
    ].join('\n');

    const { result } = convert(code);
    const typeErrors = result.diagnostics.filter(
      (d) => d.severity === 'type-error',
    );
    expect(typeErrors).toEqual([]);
    expect(result.code).not.toContain('.get(');
  });
});
