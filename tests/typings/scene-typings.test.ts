import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'child_process';
import { join, resolve } from 'path';
import { readFileSync, writeFileSync, globSync } from 'fs';
import { convertTsToGd } from '../../src/converter/ts-to-gd/index.js';
import { generateClassTypings } from '../../src/typings/classes.js';
import {
  buildScriptClassMap,
  generateSceneTypings,
} from '../../src/typings/scenes.js';

const SCENE_DIR = join(__dirname, 'scene-typings');
const GLOBALS_PATH = join(SCENE_DIR, 'globals.d.ts');
const SCENE_TYPINGS_PATH = join(SCENE_DIR, 'scene-typings.d.ts');
const TSCONFIG_PATH = join(SCENE_DIR, 'tsconfig.json');
const PROJECT_FILE = join(SCENE_DIR, 'project.godot');

// Discover all .ts source files (not .d.ts)
const sourceFiles = globSync(join(SCENE_DIR, '**/*.ts'))
  .filter((f) => f.endsWith('.ts') && !f.endsWith('.d.ts'));


// Build script class map from real file structure
function getScriptClassMap() {
  return buildScriptClassMap({
    files: sourceFiles,
    rootDir: SCENE_DIR,
    tsDir: SCENE_DIR,
    gdDir: SCENE_DIR,
    sceneTypingsDir: SCENE_DIR,
  });
}

describe('Scene typings generation', () => {
  it('should generate globals.d.ts with named imports (excluding __CLASS__)', () => {
    generateClassTypings({
      rootDir: SCENE_DIR,
      files: sourceFiles,
      outputPath: GLOBALS_PATH,
    });

    const globals = readFileSync(GLOBALS_PATH, 'utf-8');
    // Named classes should be global
    expect(globals).toContain(
      'import { Player as _Player } from "./Player.js";',
    );
    expect(globals).toContain('class Player extends _Player {}');
    expect(globals).toContain(
      'import { Ball as _Ball } from "./Ball.js";',
    );
    expect(globals).toContain('class Ball extends _Ball {}');

    // __CLASS__ should NOT be in globals (anonymous scripts)
    expect(globals).not.toContain('__CLASS__');
  });

  it('should generate scene-typings.d.ts with module augmentation and autoloads', () => {
    const scriptClassMap = getScriptClassMap();
    const sceneTypings = generateSceneTypings({
      scenesDir: SCENE_DIR,
      outputPath: SCENE_TYPINGS_PATH,
      scriptClassMap,
      rootDir: SCENE_DIR,
      projectFile: PROJECT_FILE,
    });

    // Per-script scene nodes interface (uses alias to avoid __CLASS__ collisions)
    expect(sceneTypings).toContain('interface _PlayerSceneNodes');
    expect(sceneTypings).toContain('"Sprite2D": Sprite2D;');
    expect(sceneTypings).toContain('"CollisionShape2D": CollisionShape2D;');

    // Module augmentation with conditional types + autocomplete
    expect(sceneTypings).toContain('declare module "./Player.ts"');
    expect(sceneTypings).toContain('interface Player');
    expect(sceneTypings).toContain('keyof _PlayerSceneNodes');
    expect(sceneTypings).toContain('get_node<P extends keyof _PlayerSceneNodes');
    expect(sceneTypings).toContain('get_node_or_null<P extends keyof _PlayerSceneNodes');

    // GodotResources entries (using import aliases)
    expect(sceneTypings).toContain('interface GodotResources');
    expect(sceneTypings).toContain('"res://Player.tscn": PackedScene<_Player>');

    // Script class entries in GodotResources (aliased)
    expect(sceneTypings).toContain('"res://Player.gd": _Player;');
    expect(sceneTypings).toContain('"res://Ball.gd": _Ball;');
    expect(sceneTypings).toContain('"res://Anonym.gd": _Anonym;');
    expect(sceneTypings).toContain('"res://Anonym2.gd": _Anonym2;');
    expect(sceneTypings).toContain('"res://GameManager.gd": _GameManager;');

    // Autoload singletons from project.godot
    expect(sceneTypings).toContain('Autoload singletons from project.godot');
    expect(sceneTypings).toContain('const GameManager: _GameManager;');
  });

  it('should compile all .ts files with scene typings (typed get_node, load, preload, autoloads)', () => {
    generateClassTypings({
      rootDir: SCENE_DIR,
      files: sourceFiles,
      outputPath: GLOBALS_PATH,
    });

    const scriptClassMap = getScriptClassMap();
    generateSceneTypings({
      scenesDir: SCENE_DIR,
      outputPath: SCENE_TYPINGS_PATH,
      scriptClassMap,
      rootDir: SCENE_DIR,
      projectFile: PROJECT_FILE,
    });

    // Run tsc — should compile without errors.
    // Tests that:
    //   - get_node_or_null("Sprite2D") returns Sprite2D (not Node | null)
    //   - load("res://Anonym.gd") returns __CLASS__ (not Resource)
    //   - preload("res://Player.gd") returns Player (not Resource)
    //   - GameManager autoload global is typed correctly
    //   - GameManager.reset_game() and GameManager.get_score() are valid
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
