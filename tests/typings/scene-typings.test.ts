import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import { join, resolve } from 'path';
import { readFileSync, globSync } from 'fs';
import { generateTypings } from '../../src/typings/scenes.js';

const SCENE_DIR = join(__dirname, 'scene-typings');
const TYPES_DIR = join(SCENE_DIR, 'types');
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
    outputDir: TYPES_DIR,
    scenesDir: SCENE_DIR,
    projectFile: PROJECT_FILE,
  });
}

/** Read a generated file from the output directory */
function readOutput(name: string): string {
  return readFileSync(join(TYPES_DIR, name), 'utf-8');
}

/** Read all generated files, concatenated */
function readAllOutputs(files: string[]): string {
  return files.map((f) => readFileSync(f, 'utf-8')).join('\n');
}

describe('Scene typings generation', () => {
  it('should generate per-file typings with named class declarations (excluding __CLASS__)', () => {
    const files = generate();
    const all = readAllOutputs(files);

    // Named classes should be declared globally in their .gd.d.ts files
    expect(all).toContain('class Player extends _Player {}');
    expect(all).toContain('class Ball extends _Ball {}');

    // __CLASS__ should NOT be in global class declarations
    expect(all).not.toMatch(/class __CLASS__/);
    // But __CLASS__ should still be imported (for GodotResources, autoloads, etc.)
    expect(all).toContain('__CLASS__ as _Anonym');
    expect(all).toContain('__CLASS__ as _GameManager');
  });

  it('should generate scene node types with [__parent] for Godot built-in types', () => {
    generate();
    const playerScene = readOutput('Player.tscn.d.ts');
    const playerScript = readOutput('Player.gd.d.ts');

    // Per-scene tree interface in .tscn.d.ts
    expect(playerScene).toContain('interface _PlayerTscn_Tree');

    // Direct children get [__parent] pointing to script class alias
    // Sprite2D has a subtree with AnimationPlayer embedded in its generic, including [__children]
    expect(playerScene).toContain('"Sprite2D": Sprite2D<{[__parent]: _Player; [__children]: [AnimationPlayer<{[__parent]: _PlayerTscn_Tree["Sprite2D"]}>]; "AnimationPlayer": AnimationPlayer<{[__parent]: _PlayerTscn_Tree["Sprite2D"]}>}>;');
    expect(playerScene).toContain('"CollisionShape2D": CollisionShape2D<{[__parent]: _Player}>;');

    // Flat path also present for direct key lookup by _GDGetNodeByPath
    expect(playerScene).toContain('"Sprite2D/AnimationPlayer": AnimationPlayer<{[__parent]: _PlayerTscn_Tree["Sprite2D"]}>;');

    // Unique nodes (%Name) also get [__parent] pointing to script class
    expect(playerScene).toContain('"%HealthBar": ProgressBar<{[__parent]: _Player}>;');

    // Per-script .gd.d.ts: scene nodes interface extends scene tree with [__children] tuple
    expect(playerScript).toContain('interface _PlayerSceneNodes extends _PlayerTscn_Tree');
    expect(playerScript).toContain('[__children]: [_PlayerTscn_Tree["Sprite2D"], _PlayerTscn_Tree["CollisionShape2D"], _PlayerTscn_Tree["HealthBar"]]');

    // Module augmentation with typed overloads
    expect(playerScript).toContain('declare module "../Player.ts"');
    expect(playerScript).toContain('interface Player');
    expect(playerScript).toContain('get_node<P extends string & _GDGetTreePaths<_PlayerSceneNodes>>(path: P): _GDGetNode<_PlayerSceneNodes, P>');
    expect(playerScript).toContain('get_node_or_null<P extends string & _GDGetTreePaths<_PlayerSceneNodes>>(path: P): _GDGetNode<_PlayerSceneNodes, P> | null');
    expect(playerScript).toContain('get_child<Idx extends number & _GDChildIndices<_GDGetChildren<_PlayerSceneNodes>>>(idx: Idx): _GDGetChild<_PlayerSceneNodes, Idx>');
  });

  it('should generate scene tree interfaces for scripts used in multiple scenes', () => {
    generate();
    const ballScript = readOutput('Ball.gd.d.ts');
    const ballA = readOutput('BallA.tscn.d.ts');
    const ballB = readOutput('BallB.tscn.d.ts');

    // Ball.gd is used in BallA.tscn (Sprite2D, Timer) and BallB.tscn (Sprite2D, Label)
    expect(ballScript).toContain('interface _BallSceneNodes extends _BallATscn_Tree, _BallBTscn_Tree');

    // Sprite2D is in both scenes with the same type — with [__parent]
    expect(ballA).toContain('"Sprite2D": Sprite2D<{[__parent]: _Ball}>;');
    expect(ballB).toContain('"Sprite2D": Sprite2D<{[__parent]: _Ball}>;');

    // Timer is only in BallA
    expect(ballA).toContain('"Timer": Timer<{[__parent]: _Ball}>;');
    // Label is only in BallB
    expect(ballB).toContain('"Label": Label<{[__parent]: _Ball}>;');
  });

  it('should resolve instanced scene nodes to their root script class type', () => {
    generate();
    const levelScene = readOutput('Level.tscn.d.ts');
    const levelScript = readOutput('Level.gd.d.ts');

    // Level.tscn tree: instances Player.tscn and Enemy.tscn
    expect(levelScene).toContain('interface _LevelTscn_Tree');
    // Instanced scene roots: user classes with scene nodes get __script_tree annotation
    expect(levelScene).toContain('"Player": Player & {[__script_tree]: _PlayerSceneNodes};');
    expect(levelScene).toContain('"Enemy": Enemy & {[__script_tree]: _EnemySceneNodes};');
    // Instanced scene without script → synthetic type alias (scriptless scene)
    expect(levelScene).toContain('"TilesetObjects": _TilesetObjectsTscn;');
    // Regular Godot built-in child gets [__parent]
    expect(levelScene).toContain('"Background": Sprite2D<{[__parent]: _Level}>;');
    // Nested children under non-script intermediate nodes — subtrees embedded with [__children]
    expect(levelScene).toContain('"UI": CanvasLayer<{[__parent]: _Level; [__children]: [Label<{[__parent]: _LevelTscn_Tree["UI"]');
    expect(levelScene).toContain('"ScoreLabel": Label<{[__parent]: _LevelTscn_Tree["UI"]; [__children]: [Sprite2D<{[__parent]: _LevelTscn_Tree["UI/ScoreLabel"]}>]');
    // Flat paths also present for direct key lookup by _GDGetNodeByPath
    expect(levelScene).toContain('"UI/ScoreLabel": Label<{[__parent]: _LevelTscn_Tree["UI"]');
    expect(levelScene).toContain('"UI/ScoreLabel/ScoreSprite": Sprite2D<{[__parent]: _LevelTscn_Tree["UI/ScoreLabel"]}>;');

    // Level script: scene nodes extends multiple scene trees (Level.tscn, ALevel.tscn, Level1.tscn)
    expect(levelScript).toContain('interface _LevelSceneNodes extends');

    // Level1.tscn inherits Level.tscn and adds extra children
    const level1Scene = readOutput('Level1.tscn.d.ts');
    expect(level1Scene).toContain('"TilesetObjects2"');
    expect(level1Scene).toContain('"ExtraSprite"');
  });

  it('should resolve TileMap embedded scenes (via TileSetScenesCollectionSource) for get_parent()', () => {
    generate();
    const levelScene = readOutput('Level.tscn.d.ts');
    const ballScript = readOutput('Ball.gd.d.ts');
    const anonymScript = readOutput('Anonym.gd.d.ts');

    // TileMap child (instanced TilesetObjects.tscn) should use synthetic type alias
    expect(levelScene).toContain('"TilesetObjectsMap": _TilesetObjectsTscn;');

    // Ball and Anonym should get _XParents populated by embedded scene relationships
    // Ball: get_parent() → _GDParentType<_BallParents>
    expect(ballScript).toContain('get_parent(): _GDParentType<_BallParents>');

    // Anonym: get_parent() → _GDParentType<_AnonymParents>
    expect(anonymScript).toContain('get_parent(): _GDParentType<_AnonymParents>');

    // _BallParents and _AnonymParents should be populated by scene files
    // (via declaration merging from TilesetObjects.tscn.d.ts or Level.tscn.d.ts)
    const all = readAllOutputs(generate());
    expect(all).toContain('interface _BallParents');
    expect(all).toContain('interface _AnonymParents');
  });

  it('should inherit scene trees for parent classes without their own scenes', () => {
    generate();
    const baseCharScript = readOutput('BaseCharacter.gd.d.ts');

    // BaseCharacter has no scene but Player and Enemy extend it
    expect(baseCharScript).toContain('interface _BaseCharacterSceneNodes');

    // Sprite2D is in both Player and Enemy → no null (has nested AnimationPlayer subtree + [__children])
    expect(baseCharScript).toContain('"Sprite2D": Sprite2D<{[__parent]: _BaseCharacter; [__children]: [AnimationPlayer<{[__parent]: _BaseCharacterSceneNodes["Sprite2D"]}>]; "AnimationPlayer": AnimationPlayer<{[__parent]: _BaseCharacterSceneNodes["Sprite2D"]}>}>;');

    // Sprite2D/AnimationPlayer flat path for direct key lookup
    expect(baseCharScript).toContain('"Sprite2D/AnimationPlayer": AnimationPlayer<{[__parent]: _BaseCharacterSceneNodes["Sprite2D"]}>;');

    // CollisionShape2D is only in Player → | null
    expect(baseCharScript).toContain('"CollisionShape2D": CollisionShape2D<{[__parent]: _BaseCharacter}> | null;');

    // HitBox is only in Enemy → | null (has nested CollisionShape2D subtree + [__children])
    expect(baseCharScript).toContain('"HitBox": Area2D<{[__parent]: _BaseCharacter; [__children]: [CollisionShape2D<{[__parent]: _BaseCharacterSceneNodes["HitBox"]}> | null]; "CollisionShape2D": CollisionShape2D<{[__parent]: _BaseCharacterSceneNodes["HitBox"]}> | null}> | null;');

    // [__children] tuple on merged interface
    expect(baseCharScript).toContain('[__children]: [_BaseCharacterSceneNodes["Sprite2D"]');

    // Module augmentation for BaseCharacter
    expect(baseCharScript).toContain('declare module "../BaseCharacter.ts"');
    expect(baseCharScript).toContain('interface BaseCharacter');
    expect(baseCharScript).toContain('get_node<P extends string & _GDGetTreePaths<_BaseCharacterSceneNodes>>(path: P): _GDGetNode<_BaseCharacterSceneNodes, P>');
    expect(baseCharScript).toContain('get_child<Idx extends number & _GDChildIndices<_GDGetChildren<_BaseCharacterSceneNodes>>>(idx: Idx): _GDGetChild<_BaseCharacterSceneNodes, Idx>');
  });

  it('should generate GodotResources and autoload singletons', () => {
    const files = generate();
    const all = readAllOutputs(files);

    // GodotResources entries across per-file outputs
    expect(all).toContain('"res://Player.tscn": PackedScene<_Player>');

    // Script class entries in GodotResources (typeof = class/constructor type, not instance)
    expect(all).toContain('"res://Player.gd": typeof _Player;');
    expect(all).toContain('"res://Ball.gd": typeof _Ball;');
    expect(all).toContain('"res://Anonym.gd": typeof _Anonym;');
    expect(all).toContain('"res://Anonym2.gd": typeof _Anonym2;');
    expect(all).toContain('"res://BaseCharacter.gd": typeof _BaseCharacter;');
    expect(all).toContain('"res://GameManager.gd": typeof _GameManager;');

    // Inherited scenes get the base scene's root script type
    // Level1.tscn inherits Level.tscn → root script is Level.gd → PackedScene<_Level>
    expect(all).toContain('"res://Level1.tscn": PackedScene<_Level>');
    // ALevel.tscn also inherits Level.tscn — sorted before Level.tscn alphabetically,
    // tests forward-reference resolution (base scene processed after inheriting scene)
    expect(all).toContain('"res://ALevel.tscn": PackedScene<_Level>');

    // .tres resources use gd_resource type header for precise typing
    const index = readOutput('_index.d.ts');
    expect(index).toContain('"res://player_material.tres": ShaderMaterial;');

    // Autoload singletons from project.godot
    expect(index).toContain('Autoload singletons from project.godot');
    expect(index).toContain('const GameManager: _GameManager;');
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
