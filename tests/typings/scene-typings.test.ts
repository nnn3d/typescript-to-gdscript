import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import { join, resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { convertTsToGd } from '../../src/converter/ts-to-gd/index.js';
import { generateClassTypings } from '../../src/typings/classes.js';
import {
  collectSceneOverloads,
  type ScriptClassInfo,
} from '../../src/typings/scenes.js';

const SCENE_DIR = join(__dirname, 'scene-typings');
const PLAYER_TS = join(SCENE_DIR, 'Player.ts');
const PLAYER_GD = join(SCENE_DIR, 'Player.gd');
const GLOBALS_PATH = join(SCENE_DIR, 'globals.d.ts');
const TSCONFIG_PATH = join(SCENE_DIR, 'tsconfig.json');

const sourceFiles = [PLAYER_TS];

function buildScriptClassMap() {
  const map = new Map<string, ScriptClassInfo>();
  map.set('res://scripts/Player.gd', {
    className: 'Player',
    tsModulePath: './Player.js',
  });
  return map;
}

describe('Scene typings generation', () => {
  it('should convert Player.ts to Player.gd', () => {
    const result = convertTsToGd({
      filePath: PLAYER_TS,
      rootDir: SCENE_DIR,
    });

    expect(result.diagnostics).toHaveLength(0);
    expect(result.code).toContain('class_name Player');
    expect(result.code).toContain('extends CharacterBody2D');

    writeFileSync(PLAYER_GD, result.code, 'utf-8');
  });

  it('should generate class typings with get_node/get_node_or_null overloads', () => {
    // Collect scene overloads
    const sceneOverloads = collectSceneOverloads({
      scenesDir: SCENE_DIR,
      scriptClassMap: buildScriptClassMap(),
    });

    expect(sceneOverloads.has('Player')).toBe(true);
    const overloads = sceneOverloads.get('Player')!;
    expect(overloads.some((o) => o.path === 'Sprite2D' && o.type === 'Sprite2D')).toBe(true);
    expect(overloads.some((o) => o.path === 'CollisionShape2D' && o.type === 'CollisionShape2D')).toBe(true);
    expect(overloads.some((o) => o.path === 'Sprite2D/AnimationPlayer' && o.type === 'AnimationPlayer')).toBe(true);

    // Generate globals.d.ts with scene overloads
    generateClassTypings({
      rootDir: SCENE_DIR,
      files: sourceFiles,
      outputPath: GLOBALS_PATH,
      sceneOverloads,
    });

    const globals = readFileSync(GLOBALS_PATH, 'utf-8');
    expect(globals).toContain(
      'import { Player as _Player } from "./Player.js";',
    );
    expect(globals).toContain('class Player extends _Player {');
    expect(globals).toContain(
      'get_node(path: "Sprite2D"): Sprite2D;',
    );
    expect(globals).toContain(
      'get_node_or_null(path: "Sprite2D"): Sprite2D;',
    );
    expect(globals).toContain(
      'get_node(path: "CollisionShape2D"): CollisionShape2D;',
    );
    expect(globals).toContain(
      'get_node_or_null(path: "CollisionShape2D"): CollisionShape2D;',
    );
    expect(globals).toContain(
      'get_node(path: "Sprite2D/AnimationPlayer"): AnimationPlayer;',
    );

    // Fallback overloads for unknown paths
    expect(globals).toContain('get_node(path: string): Node;');
    expect(globals).toContain(
      'get_node_or_null(path: string): Node | null;',
    );
  });

  it('should compile Player.ts with scene typings (get_node_or_null returns concrete type)', () => {
    // Generate all files: GD, globals with scene overloads
    const gdResult = convertTsToGd({
      filePath: PLAYER_TS,
      rootDir: SCENE_DIR,
    });
    writeFileSync(PLAYER_GD, gdResult.code, 'utf-8');

    const sceneOverloads = collectSceneOverloads({
      scenesDir: SCENE_DIR,
      scriptClassMap: buildScriptClassMap(),
    });

    generateClassTypings({
      rootDir: SCENE_DIR,
      files: sourceFiles,
      outputPath: GLOBALS_PATH,
      sceneOverloads,
    });

    // Run tsc — should compile without errors.
    // Player.ts assigns get_node_or_null("Sprite2D") to Sprite2D (no null),
    // which only works if the scene typings overload is in effect.
    try {
      execSync(`npx tsc -p "${TSCONFIG_PATH}"`, {
        cwd: resolve(__dirname, '../..'),
        encoding: 'utf-8',
        stdio: 'pipe',
      });
    } catch (err: any) {
      const output = (err.stdout || '') + (err.stderr || '');
      expect.fail(
        `Scene typings type checking failed:\n${output}`,
      );
    }
  });
});
