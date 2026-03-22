import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import { join, resolve } from 'path';
import { readFileSync, globSync } from 'fs';
import { generateTypings } from '../../src/typings/scenes.js';

const SCENE_DIR = join(__dirname, 'scene-typings');
const GLOBALS_PATH = join(SCENE_DIR, 'globals.d.ts');
const TSCONFIG_PATH = join(SCENE_DIR, 'tsconfig.json');
const PROJECT_FILE = join(SCENE_DIR, 'project.godot');
const REGISTRY_PATH = join(SCENE_DIR, 'test-registry.json');

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
    registryPath: REGISTRY_PATH,
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

  it('should generate scene node overloads with module augmentation', () => {
    const content = generate();

    // Per-script scene nodes interface (uses alias to avoid __CLASS__ collisions)
    expect(content).toContain('interface _PlayerSceneNodes');
    expect(content).toContain('"Sprite2D": Sprite2D;');
    expect(content).toContain('"CollisionShape2D": CollisionShape2D;');

    // Module augmentation with typed overloads
    expect(content).toContain('declare module "./Player.ts"');
    expect(content).toContain('interface Player');
    expect(content).toContain('get_node<P extends keyof _PlayerSceneNodes');
    expect(content).toContain('get_node_or_null<P extends keyof _PlayerSceneNodes');
  });

  it('should generate union types for scripts used in multiple scenes', () => {
    const content = generate();

    // Ball.gd is used in BallA.tscn (Sprite2D, Timer) and BallB.tscn (Sprite2D, Label)
    expect(content).toContain('interface _BallSceneNodes');

    // Sprite2D is in both scenes with the same type — no null
    expect(content).toMatch(/"Sprite2D": Sprite2D;/);
    // Timer is only in BallA — gets | null
    expect(content).toMatch(/"Timer": Timer \| null;/);
    // Label is only in BallB — gets | null
    expect(content).toMatch(/"Label": Label \| null;/);
  });

  it('should generate typed signal handler methods from .tscn connections', () => {
    const content = generate();

    // Player.tscn has: [connection signal="area_entered" from="Area2D" to="." method="_on_area_entered"]
    // Area2D.area_entered signal has parameter: area: Area2D
    expect(content).toContain('_on_area_entered(area: Area2D): void;');
    // Should have a JSDoc comment indicating the signal source
    expect(content).toContain('/** Signal handler: Area2D.area_entered */');
  });

  it('should generate GodotResources and autoload singletons', () => {
    const content = generate();

    // GodotResources entries (using import aliases)
    expect(content).toContain('interface GodotResources');
    expect(content).toContain('"res://Player.tscn": PackedScene<_Player>');

    // Script class entries in GodotResources (aliased)
    expect(content).toContain('"res://Player.gd": _Player;');
    expect(content).toContain('"res://Ball.gd": _Ball;');
    expect(content).toContain('"res://Anonym.gd": _Anonym;');
    expect(content).toContain('"res://Anonym2.gd": _Anonym2;');
    expect(content).toContain('"res://GameManager.gd": _GameManager;');

    // Autoload singletons from project.godot
    expect(content).toContain('Autoload singletons from project.godot');
    expect(content).toContain('const GameManager: _GameManager;');
  });

  it('should compile all .ts files with generated typings (typed get_node, load, preload, autoloads)', () => {
    generate();

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
