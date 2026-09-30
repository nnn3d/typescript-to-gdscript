/**
 * A script's typings are keyed by the `res://` path of the `.gd` that
 * `convert` writes: `gdDir` + its path under `tsDir`. Scenes attach that
 * path, so any other key leaves the scene's nodes untyped in the script.
 * The layout here is the one `tstogd init` writes (`src/` → `scripts/`),
 * where the two directories differ.
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';
import {
  generateFileTypings,
  generateTypings,
} from '../../src/typings/scenes.ts';
import { createTsProgram } from '../../src/parser/typescript/index.ts';
import { collectTsDiagnostics } from '../../src/checker/ts-diagnostics.ts';

const REPO = join(__dirname, '..', '..');

let root: string;
let tsDir: string;
let gdDir: string;
let typingsDir: string;
let levelTs: string;

beforeEach(() => {
  root = join(tmpdir(), `tstogd-respaths-${randomBytes(4).toString('hex')}`);
  tsDir = join(root, 'src');
  gdDir = join(root, 'scripts');
  typingsDir = join(tsDir, '_typings');
  mkdirSync(tsDir, { recursive: true });

  writeFileSync(join(root, 'project.godot'), 'config_version=5\n');
  writeFileSync(
    join(root, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        target: 'esnext',
        module: 'esnext',
        moduleResolution: 'bundler',
        noLib: true,
        strict: true,
        noEmit: true,
        skipLibCheck: true,
        types: [],
      },
      include: [join(REPO, 'typings'), 'src/**/*.ts'],
    }),
  );
  levelTs = join(tsDir, 'level.ts');
  writeFileSync(
    levelTs,
    [
      'export class Level extends Node2D {',
      "  @onready sprite: Sprite2D = this.get_node('Sprite');",
      '}',
      '',
    ].join('\n'),
  );
  writeFileSync(
    join(root, 'level.tscn'),
    [
      '[gd_scene load_steps=2 format=3]',
      '',
      '[ext_resource type="Script" path="res://scripts/level.gd" id="1"]',
      '',
      '[node name="Level" type="Node2D"]',
      'script = ExtResource("1")',
      '',
      '[node name="Sprite" type="Sprite2D" parent="."]',
      '',
    ].join('\n'),
  );
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

function generateAll(): void {
  generateTypings({
    rootDir: root,
    tsDir,
    gdDir,
    files: [levelTs],
    outputDir: typingsDir,
    scenesDir: root,
    tsConfigPath: join(root, 'tsconfig.json'),
    projectFile: join(root, 'project.godot'),
  });
}

function diagnostics(): string[] {
  const program = createTsProgram({
    rootDir: root,
    files: [],
    tsConfigPath: join(root, 'tsconfig.json'),
  });
  return collectTsDiagnostics(program, tsDir).map(
    (d) => `${d.line}:${d.column} ${d.message}`,
  );
}

describe('script typings use the res:// path convert writes to', () => {
  it('types get_node from the scene that attaches the script', () => {
    generateAll();
    expect(existsSync(join(typingsDir, 'scripts', 'level.gd.d.ts'))).toBe(
      true,
    );
    expect(diagnostics()).toEqual([]);
  });

  it('keeps the same path when watch regenerates one script', () => {
    generateAll();
    const scriptTypings = join(typingsDir, 'scripts', 'level.gd.d.ts');
    rmSync(scriptTypings);
    generateFileTypings([levelTs], [levelTs], {
      rootDir: root,
      tsDir,
      gdDir,
      outputDir: typingsDir,
      tsConfigPath: join(root, 'tsconfig.json'),
      scenesDir: root,
      projectFile: join(root, 'project.godot'),
    });
    expect(existsSync(scriptTypings)).toBe(true);
    expect(diagnostics()).toEqual([]);
  });
});
