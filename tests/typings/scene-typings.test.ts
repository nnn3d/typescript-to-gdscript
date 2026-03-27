import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import { join, resolve } from 'path';
import { readFileSync, globSync } from 'fs';
import { generateTypings } from '../../src/typings/scenes.js';

const SCENE_DIR = join(__dirname, 'scene-typings');
const GLOBALS_PATH = join(SCENE_DIR, 'globals.d.ts');
const TSCONFIG_PATH = join(SCENE_DIR, 'tsconfig.json');
const PROJECT_FILE = join(SCENE_DIR, 'project.godot');
// Discover all .ts source files (not .d.ts)
const sourceFiles = globSync(join(SCENE_DIR, '**/*.ts'))
  .filter((f) => f.endsWith('.ts') && !f.endsWith('.d.ts'));

function generate() {
  return generateTypings({
    rootDir: SCENE_DIR,
    tsDir: SCENE_DIR,
    gdDir: SCENE_DIR,
    files: sourceFiles,
    outputPath: GLOBALS_PATH,
    scenesDir: SCENE_DIR,
    projectFile: PROJECT_FILE,
  });
}

describe('Scene typings generation', () => {
  it('should generate globals.d.ts with named class declarations (excluding __CLASS__)', () => {
    const content = generate();

    // Named classes should be declared globally
    expect(content).toContain('class Player extends _Player {}');
    expect(content).toContain('class Ball extends _Ball {}');

    // __CLASS__ should NOT be in global class declarations
    expect(content).not.toMatch(/class __CLASS__/);
    // But __CLASS__ should still be imported (for GodotResources, autoloads, etc.)
    expect(content).toContain('__CLASS__ as _Anonym');
    expect(content).toContain('__CLASS__ as _GameManager');
  });

  it('should generate scene node types with [__parent] for Godot built-in types', () => {
    const content = generate();

    // Per-script scene nodes interface
    expect(content).toContain('interface _PlayerSceneNodes');

    // Direct children get [__parent] pointing to script class alias
    expect(content).toContain('"Sprite2D": Sprite2D<{[__parent]: _Player}>;');
    expect(content).toContain('"CollisionShape2D": CollisionShape2D<{[__parent]: _Player}>;');

    // Nested path: AnimationPlayer's parent is Sprite2D (intermediate node), not Player
    expect(content).toContain('"Sprite2D/AnimationPlayer": AnimationPlayer<{[__parent]: Sprite2D}>;');

    // Unique nodes (%Name) also get [__parent] pointing to script class
    expect(content).toContain('"%HealthBar": ProgressBar<{[__parent]: _Player}>;');

    // Module augmentation with typed overloads
    expect(content).toContain('declare module "./Player.ts"');
    expect(content).toContain('interface Player');
    expect(content).toContain('get_node<P extends keyof _PlayerSceneNodes');
    expect(content).toContain('get_node_or_null<P extends keyof _PlayerSceneNodes');
  });

  it('should generate union types with [__parent] for scripts used in multiple scenes', () => {
    const content = generate();

    // Ball.gd is used in BallA.tscn (Sprite2D, Timer) and BallB.tscn (Sprite2D, Label)
    expect(content).toContain('interface _BallSceneNodes');

    // Sprite2D is in both scenes with the same type — no null, with [__parent]
    expect(content).toMatch(/"Sprite2D": Sprite2D<\{\[__parent\]: _Ball\}>;/);
    // Timer is only in BallA — gets | null, each type part gets [__parent]
    expect(content).toMatch(/"Timer": Timer<\{\[__parent\]: _Ball\}> \| null;/);
    // Label is only in BallB — gets | null
    expect(content).toMatch(/"Label": Label<\{\[__parent\]: _Ball\}> \| null;/);
  });

  it('should resolve instanced scene nodes to their root script class type', () => {
    const content = generate();

    // Level.tscn instances Player.tscn and Enemy.tscn
    expect(content).toContain('interface _LevelSceneNodes');
    // Instanced scene roots: user classes stay plain (get_parent via module augmentation)
    expect(content).toContain('"Player": Player;');
    expect(content).toContain('"Enemy": Enemy;');
    // Instanced scene without script → root node Godot type with [__parent]
    expect(content).toContain('"TilesetObjects": TileMap<{[__parent]: _Level}>;');
    // Regular Godot built-in child gets [__parent]
    expect(content).toContain('"Background": Sprite2D<{[__parent]: _Level}>;');
    // Nested children under non-script intermediate nodes
    expect(content).toContain('"UI": CanvasLayer<{[__parent]: _Level}>;');
    expect(content).toContain('"UI/ScoreLabel": Label<{[__parent]: CanvasLayer}>;');

    // Level1.tscn inherits Level.tscn and adds extra children
    // These should appear in Level's SceneNodes (as union/nullable with other occurrences)
    // TilesetObjects2 and ExtraSprite are added by the inheriting scene
    expect(content).toContain('"TilesetObjects2"');
    expect(content).toContain('"ExtraSprite"');
  });

  it('should generate GodotResources and autoload singletons', () => {
    const content = generate();

    // GodotResources entries (using import aliases)
    expect(content).toContain('interface GodotResources');
    expect(content).toContain('"res://Player.tscn": PackedScene<_Player>');

    // Script class entries in GodotResources (typeof = class/constructor type, not instance)
    expect(content).toContain('"res://Player.gd": typeof _Player;');
    expect(content).toContain('"res://Ball.gd": typeof _Ball;');
    expect(content).toContain('"res://Anonym.gd": typeof _Anonym;');
    expect(content).toContain('"res://Anonym2.gd": typeof _Anonym2;');
    expect(content).toContain('"res://GameManager.gd": typeof _GameManager;');

    // .tres resources use gd_resource type header for precise typing
    expect(content).toContain('"res://player_material.tres": ShaderMaterial;');

    // Autoload singletons from project.godot
    expect(content).toContain('Autoload singletons from project.godot');
    expect(content).toContain('const GameManager: _GameManager;');
  });

  it('should compile all .ts files with generated typings (typed get_node, get_parent, load, autoloads)', () => {
    generate();

    // Run tsc — should compile without errors.
    // Tests that:
    //   - get_node("Sprite2D") returns Sprite2D<{[__parent]: _Player}> (assignable to Sprite2D)
    //   - get_parent() on a child resolves to the script class via [__parent]
    //   - Nested path get_parent() resolves to intermediate node type
    //   - Instanced scene get_node returns the script class type
    //   - load/preload/autoloads are typed correctly
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
