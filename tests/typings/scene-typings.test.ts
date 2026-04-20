import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import { join, resolve } from 'path';
import { readFileSync, globSync } from 'fs';
import { generateTypings, generateAddonTypings } from '../../src/typings/scenes.js';

const SCENE_DIR = join(__dirname, 'scene-typings');
const TYPES_DIR = join(SCENE_DIR, 'types');
const TSCONFIG_PATH = join(SCENE_DIR, 'tsconfig.json');
const PROJECT_FILE = join(SCENE_DIR, 'project.godot');
// Discover all .ts source files (not .d.ts, not addons)
const sourceFiles = globSync(join(SCENE_DIR, '**/*.ts'))
  .filter((f) => f.endsWith('.ts') && !f.endsWith('.d.ts') && !f.replace(/\\/g, '/').includes('/addons/'));

function generate() {
  return generateTypings({
    rootDir: SCENE_DIR,
    tsDir: SCENE_DIR,
    gdDir: SCENE_DIR,
    files: sourceFiles,
    outputDir: TYPES_DIR,
    scenesDir: SCENE_DIR,
    projectFile: PROJECT_FILE,
    // The scene-typings fixtures (Player, Level, BaseCharacter, …) all
    // reference each other by bare class name, which assumes the
    // `declare global` typings layout. Treat this whole test set as
    // the canonical exercise of `generateGlobalClassTypes: true`.
    generateGlobalClassTypes: true,
  });
}

function generateAddons() {
  return generateAddonTypings({
    rootDir: SCENE_DIR,
    outputDir: TYPES_DIR,
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
  it('should generate per-file .gd.d.ts with named and anonymous class declarations', () => {
    const files = generate();
    const gdDtsFiles = files.filter(f => f.endsWith('.gd.d.ts'));
    const all = readAllOutputs(gdDtsFiles);

    // Named classes should be declared globally in their .gd.d.ts files
    expect(all).toContain('class Player extends ScriptClass');
    expect(all).toContain('class Ball extends ScriptClass');
    expect(all).toContain('class Level extends ScriptClass');
    expect(all).toContain('class BaseCharacter extends ScriptClass');

    // Anonymous scripts (legacy `__CLASS__` literal still in fixtures
    // — `_`-prefixed, so the new convention treats it as anonymous)
    // should NOT be declared globally and should NOT synthesize a
    // local `_Script` handle anymore — GodotScripts maps directly to
    // the imported `ScriptClass` alias.
    expect(all).not.toMatch(/class __CLASS__ extends ScriptClass/);
    expect(all).not.toContain('declare class _Script extends ScriptClass');

    // All scripts import as ScriptClass
    expect(all).toContain('__CLASS__ as ScriptClass');
    expect(all).toContain('Player as ScriptClass');
    expect(all).toContain('Ball as ScriptClass');
  });

  it('should generate .tscn.d.ts with tree type aliases and node structure', () => {
    generate();
    const playerScene = readOutput('Player.tscn.d.ts');

    // Named type aliases for each node
    expect(playerScene).toContain('type _PlayerTscn_Sprite2D = {');
    expect(playerScene).toContain('type _PlayerTscn_Sprite2D_AnimationPlayer = {');
    expect(playerScene).toContain('type _PlayerTscn_CollisionShape2D = {');
    expect(playerScene).toContain('type _PlayerTscn_HealthBar = {');

    // Node types use symbols
    expect(playerScene).toContain('[__node_type]: Sprite2D;');
    expect(playerScene).toContain('[__node_type]: AnimationPlayer;');
    expect(playerScene).toContain('[__node_type]: ProgressBar;');

    // Parent references
    expect(playerScene).toContain('[__node_parent]: _PlayerTscn_Tree;');
    expect(playerScene).toContain('[__node_parent]: _PlayerTscn_Sprite2D;');

    // Children tuples
    expect(playerScene).toContain('[__node_children]: [_PlayerTscn_Sprite2D_AnimationPlayer];');

    // Root tree type
    expect(playerScene).toContain('type _PlayerTscn_Tree = {');
    expect(playerScene).toContain('[__node_root]: "Player";');
    expect(playerScene).toContain('[__node_type]: _GDGetInterfaceNode<GodotScripts, "res://Player.gd">;');
    expect(playerScene).toContain('[__node_parent]: _GDGetInterfaceParent<__PlayerTscn__Parents>;');

    // Flat paths on root
    expect(playerScene).toContain('"Sprite2D": _PlayerTscn_Sprite2D;');
    expect(playerScene).toContain('"Sprite2D/AnimationPlayer": _PlayerTscn_Sprite2D_AnimationPlayer;');
    expect(playerScene).toContain('"CollisionShape2D": _PlayerTscn_CollisionShape2D;');

    // Unique name entry
    expect(playerScene).toContain('"%HealthBar": _PlayerTscn_HealthBar;');

    // Module file with declare global
    expect(playerScene).toContain('declare global {');
    expect(playerScene).toContain('export {}');

    // Global interfaces
    expect(playerScene).toContain('interface __PlayerTscn__Parents {}');
    expect(playerScene).toContain('interface __PlayerGd__Trees {');
    expect(playerScene).toContain('"res://Player.tscn": _PlayerTscn_Tree;');
    expect(playerScene).toContain('interface GodotSceneTrees {');
    expect(playerScene).toContain('PackedScene<_GDTreeNode<_PlayerTscn_Tree>>');
  });

  it('should generate GodotConnections for scenes with signal connections', () => {
    generate();
    const playerScene = readOutput('Player.tscn.d.ts');

    // GodotConnections interface with scene key
    expect(playerScene).toContain('interface GodotConnections {');
    expect(playerScene).toContain('"res://Player.tscn": {');

    // Connection entries use full node path as key and _GDSignalConnection type
    expect(playerScene).toContain('"AttackTimer.timeout": _GDSignalConnection<');
    expect(playerScene).toContain('Timer["timeout"]');
    expect(playerScene).toContain('GodotScripts["res://Player.gd"]["_on_attack_timer_timeout"]');

    expect(playerScene).toContain('"HitArea.area_entered": _GDSignalConnection<');
    expect(playerScene).toContain('Area2D["area_entered"]');
    expect(playerScene).toContain('GodotScripts["res://Player.gd"]["_on_hit_area_area_entered"]');
  });

  it('should not generate GodotConnections for scenes without connections', () => {
    generate();
    const enemyScene = readOutput('Enemy.tscn.d.ts');
    expect(enemyScene).not.toContain('GodotConnections');
  });

  it('should generate .gd.d.ts with module augmentation and typed overloads', () => {
    generate();
    const playerScript = readOutput('Player.gd.d.ts');

    // ScriptTree + ScriptPaths type aliases
    expect(playerScript).toContain('type ScriptTree = _GDGetInterfaceTree<__PlayerGd__Trees>;');
    expect(playerScript).toContain('type ScriptPaths = _GDGetTreePaths<ScriptTree>;');

    // StaticProps for static fields on instances
    expect(playerScript).toContain("type StaticProps = Omit<typeof ScriptClass, 'prototype' | keyof Function>;");

    // Module augmentation with typed overloads using pre-computed ScriptPaths
    expect(playerScript).toContain('declare module "../Player"');
    expect(playerScript).toContain('interface Player extends StaticProps {');
    expect(playerScript).toContain('get_node<P extends string & ScriptPaths>(path: P): _GDGetNode<ScriptTree, P>;');
    expect(playerScript).toContain('get_node_or_null<P extends string & ScriptPaths>(path: P): _GDGetNodeOrNull<ScriptTree, P>;');
    expect(playerScript).toContain('get_child<Idx extends number & _GDChildIndices<ScriptTree>>(idx: Idx): _GDGetChild<ScriptTree, Idx>;');
    expect(playerScript).toContain('get_parent(): _GDParentType<ScriptTree>;');
    expect(playerScript).toContain('get_parent<N extends Node = Node>(): N;');

    // Global class declaration
    expect(playerScript).toContain('class Player extends ScriptClass {');
    expect(playerScript).toContain('interface __PlayerGd__Trees {}');

    // GodotScripts and GodotResources
    expect(playerScript).toContain('"res://Player.gd": Player;');
    expect(playerScript).toContain('"res://Player.gd": typeof Player;');
  });

  it('should handle anonymous scripts module-scoped with no synthesized local class', () => {
    generate();
    const anonymScript = readOutput('Anonym.gd.d.ts');

    // Import as ScriptClass
    expect(anonymScript).toContain('__CLASS__ as ScriptClass');

    // Module augmentation targets __CLASS__ interface (extends StaticProps for static fields on instances)
    expect(anonymScript).toContain('interface __CLASS__ extends StaticProps {');

    // No synthesized `_Script` local handle anymore — GodotScripts /
    // GodotResources reference the imported `ScriptClass` alias directly.
    expect(anonymScript).not.toContain('declare class _Script extends ScriptClass');

    // GodotScripts/Resources map to the imported alias
    expect(anonymScript).toContain('"res://Anonym.gd": ScriptClass;');
    expect(anonymScript).toContain('"res://Anonym.gd": typeof ScriptClass;');

    // No global class for anonymous scripts
    expect(anonymScript).not.toMatch(/class Anonym extends/);
  });

  it('should resolve instanced scenes via GodotSceneTrees lookup', () => {
    generate();
    const levelScene = readOutput('Level.tscn.d.ts');

    // Instanced scene tree type aliases via GodotSceneTrees lookup
    expect(levelScene).toContain('type _PlayerTscn_Tree = GodotSceneTrees["res://Player.tscn"];');
    expect(levelScene).toContain('type _EnemyTscn_Tree = GodotSceneTrees["res://Enemy.tscn"];');
    expect(levelScene).toContain('type _TilesetObjectsTscn_Tree = GodotSceneTrees["res://TilesetObjects.tscn"];');
    expect(levelScene).toContain('type _Level2Tscn_Tree = GodotSceneTrees["res://Level2.tscn"];');

    // Instanced scenes in root tree
    expect(levelScene).toContain('"Player": _PlayerTscn_Tree;');
    expect(levelScene).toContain('"Enemy": _EnemyTscn_Tree;');
    expect(levelScene).toContain('"TilesetObjects": _TilesetObjectsTscn_Tree;');
    expect(levelScene).toContain('"Level2": _Level2Tscn_Tree;');

    // Non-instanced children use scene-local type aliases
    expect(levelScene).toContain('"Background": _LevelTscn_Background;');
    expect(levelScene).toContain('"UI": _LevelTscn_UI;');

    // Nested flat paths through non-instanced intermediate nodes
    expect(levelScene).toContain('"UI/ScoreLabel": _LevelTscn_UI_ScoreLabel;');
    expect(levelScene).toContain('"UI/ScoreLabel/ScoreSprite": _LevelTscn_UI_ScoreLabel_ScoreSprite;');

    // Instanced scene parent interfaces
    expect(levelScene).toContain('interface __PlayerTscn__Parents { "res://Level.tscn": _LevelTscn_Tree; }');
    expect(levelScene).toContain('interface __EnemyTscn__Parents { "res://Level.tscn": _LevelTscn_Tree; }');
    expect(levelScene).toContain('interface __Level2Tscn__Parents { "res://Level.tscn": _LevelTscn_Tree; }');
  });

  it('should resolve non-root scripted child nodes to their script class and register their subtree', () => {
    generate();
    const levelScene = readOutput('Level.tscn.d.ts');

    // UI child has script = GameManager.gd → __node_type must resolve via GodotScripts,
    // not the raw CanvasLayer type.
    expect(levelScene).toContain('type _LevelTscn_UI = {');
    expect(levelScene).toContain('[__node_type]: _GDGetInterfaceNode<GodotScripts, "res://LevelUI.gd">;');
    expect(levelScene).not.toContain('[__node_type]: CanvasLayer;');

    // The script's __Trees interface should map the scene to the subtree type.
    expect(levelScene).toMatch(
      /interface __LevelUIGd__Trees \{\s*"res:\/\/Level\.tscn": _LevelTscn_UI;\s*\}/,
    );
  });

  it('should resolve TileMap embedded scenes for parent interfaces', () => {
    generate();
    const tilesetScene = readOutput('TilesetObjects.tscn.d.ts');

    // TileMap scene with embedded scene references
    expect(tilesetScene).toContain('type _TilesetObjectsTscn_Tree = {');
    expect(tilesetScene).toContain('[__node_type]: TileMap;');

    // Parent interfaces for embedded scenes
    expect(tilesetScene).toContain('interface __AnonymTscn__Parents { "res://TilesetObjects.tscn": _TilesetObjectsTscn_Tree; }');
    expect(tilesetScene).toContain('interface __BallATscn__Parents { "res://TilesetObjects.tscn": _TilesetObjectsTscn_Tree; }');
  });

  it('should generate GodotResources and autoload singletons', () => {
    const files = generate();
    const all = readAllOutputs(files);

    // Scene PackedScene entries
    expect(all).toContain('"res://Player.tscn": PackedScene<_GDTreeNode<_PlayerTscn_Tree>>');
    expect(all).toContain('"res://Level.tscn": PackedScene<_GDTreeNode<_LevelTscn_Tree>>');

    // Script GodotResources entries (typeof for constructor type).
    // Named globals point at the bare class; anonymous scripts now
    // point at the imported `ScriptClass` alias directly (was `_Script`).
    expect(all).toContain('"res://Player.gd": typeof Player;');
    expect(all).toContain('"res://Ball.gd": typeof Ball;');
    expect(all).toContain('"res://Anonym.gd": typeof ScriptClass;');
    expect(all).toContain('"res://GameManager.gd": typeof ScriptClass;');

    // GodotScripts entries
    expect(all).toContain('"res://Player.gd": Player;');
    expect(all).toContain('"res://Ball.gd": Ball;');

    // .tres resources use gd_resource type header
    expect(all).toContain('"res://player_material.tres": ShaderMaterial;');

    // Autoload singletons from project.godot
    const index = readOutput('_index.d.ts');
    expect(index).toContain('Autoload singletons from project.godot');
    expect(index).toContain('const GameManager: GodotScripts["res://GameManager.gd"];');

    // Empty global interfaces in _index.d.ts
    expect(index).toContain('interface GodotScripts {}');
    expect(index).toContain('interface GodotSceneTrees {}');
    expect(index).toContain('interface GodotResources {}');
  });

  it('should generate addon .ts and .gd.d.ts from addons/ GDScript', () => {
    const files = generateAddons();

    // Should generate .ts (converted source) and .gd.d.ts (typings) for each addon file
    expect(files.some(f => f.endsWith('test_addon.ts') && !f.endsWith('.d.ts'))).toBe(true);
    expect(files.some(f => f.endsWith('test_addon.gd.d.ts'))).toBe(true);
    expect(files.some(f => f.endsWith('addon_helper.ts') && !f.endsWith('.d.ts'))).toBe(true);
    expect(files.some(f => f.endsWith('addon_helper.gd.d.ts'))).toBe(true);

    // Named addon class should have global class declaration and namespace enum
    const addonScript = readOutput('addons/TestAddon/test_addon.gd.d.ts');
    expect(addonScript).toContain('class TestAddon extends ScriptClass');
    expect(addonScript).toContain('namespace TestAddon');
    expect(addonScript).toContain('const enum AddonState');
    expect(addonScript).toContain('IDLE = 0');
    expect(addonScript).toContain('RUNNING = 1');
    expect(addonScript).toContain('STOPPED = 2');

    // GodotScripts/GodotResources entries use res://addons/... paths
    expect(addonScript).toContain('"res://addons/TestAddon/test_addon.gd": TestAddon;');
    expect(addonScript).toContain('"res://addons/TestAddon/test_addon.gd": typeof TestAddon;');

    // Anonymous addon class — module-scoped, GodotScripts/Resources
    // entries point at the imported `ScriptClass` alias directly. No
    // synthesized `_Script` local handle.
    const helperScript = readOutput('addons/TestAddon/addon_helper.gd.d.ts');
    expect(helperScript).not.toContain('declare class _Script extends ScriptClass');
    expect(helperScript).toContain('"res://addons/TestAddon/addon_helper.gd": ScriptClass;');

    // Converted .ts should contain valid class with gd.enum
    const addonTs = readOutput('addons/TestAddon/test_addon.ts');
    expect(addonTs).toContain('export class TestAddon extends Node');
    expect(addonTs).toContain("gd.enum('IDLE', 'RUNNING', 'STOPPED')");

    // Cross-file references: addon_helper.ts should reference TestAddon
    const helperTs = readOutput('addons/TestAddon/addon_helper.ts');
    expect(helperTs).toContain('TestAddon');
  });

  it('should compile all .ts files with generated typings (typed get_node, get_parent, load, autoloads)', () => {
    generate();
    generateAddons();

    // Run tsc — should compile without errors.
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
