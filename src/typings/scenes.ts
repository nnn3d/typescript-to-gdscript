import ts from 'typescript';
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, relative, extname, dirname, resolve } from 'path';
import { createTsProgram } from '../parser/typescript/index.ts';
import { shouldIgnore } from '../config/index.ts';
import { GodotClassRegistry, type GodotSignalParamInfo } from './godot-registry.ts';
import { godotTypeToTs } from './godot-docs.ts';
import { GodotResourceParser } from '../parser/godot-resource/index.ts';
import { SyntaxType, type SyntaxNode } from '../parser/godot-resource/types.ts';

interface SceneNode {
  name: string;
  type: string;
  /** Empty string for root, "." for direct children, "Parent/Child" for nested */
  parent: string;
  /** ext_resource id referenced by `script = ExtResource("id")`, if any */
  scriptExtId?: string;
  /** ext_resource id referenced by `instance=ExtResource("id")`, if any */
  instanceExtId?: string;
  /** Whether this node has `unique_name_in_owner = true` */
  uniqueInOwner?: boolean;
  /** AST section node (for post-processing sub_resource chains) */
  section?: SyntaxNode;
}

interface ScriptNodeInfo {
  /** res:// path to the .gd script */
  scriptResPath: string;
  /** Full node path within the scene (e.g. "Ball", "." for root) */
  nodePath: string;
  /** Child nodes with paths relative to this script node */
  children: Array<{ path: string; type: string; instanceSceneResPath?: string }>;
}

interface SceneConnection {
  /** Signal name (e.g. "area_entered") */
  signal: string;
  /** Emitter node path (e.g. "Area2D", "tileset_objects/LevelExit") */
  fromPath: string;
  /** Receiver node path (e.g. ".", "tileset_objects/LevelExit") */
  toPath: string;
  /** Handler method name (e.g. "_on_area_entered") */
  method: string;
}

/** Shared parser instance for all godot-resource parsing */
const resourceParser = new GodotResourceParser();

/**
 * Extract a named attribute value from a section's attribute children.
 * Strips surrounding quotes from string values.
 */
function getSectionAttr(section: SyntaxNode, name: string): string | undefined {
  for (const child of section.namedChildren) {
    if (child.type !== SyntaxType.Attribute) continue;
    const parts = child.namedChildren;
    if (parts.length >= 2 && parts[0]!.type === SyntaxType.Identifier && parts[0]!.text === name) {
      const val = parts[1]!;
      if (val.type === SyntaxType.String) {
        return val.text.slice(1, -1); // strip quotes
      }
      return val.text;
    }
  }
  return undefined;
}

/**
 * Extract a named property value from a section's property children.
 * Returns the raw text of the value node.
 */
function getSectionProp(section: SyntaxNode, name: string): string | undefined {
  for (const child of section.namedChildren) {
    if (child.type !== SyntaxType.Property) continue;
    const parts = child.namedChildren;
    if (parts.length >= 2 && parts[0]!.type === SyntaxType.Path && parts[0]!.text === name) {
      return parts[1]!.text;
    }
  }
  return undefined;
}

/**
 * Extract the first argument string from a Constructor node like ExtResource("id").
 * Returns the unquoted string, or undefined.
 */
function getConstructorFirstArg(node: SyntaxNode): string | undefined {
  if (node.type !== SyntaxType.Constructor) return undefined;
  for (const child of node.namedChildren) {
    if (child.type === SyntaxType.Arguments) {
      const first = child.namedChildren[0];
      if (first?.type === SyntaxType.String) {
        return first.text.slice(1, -1);
      }
    }
  }
  return undefined;
}

/**
 * Extract ExtResource("id") from a property value in a section.
 * Looks for: `propertyName = ExtResource("id")`
 */
function getSectionExtResource(section: SyntaxNode, propName: string): string | undefined {
  for (const child of section.namedChildren) {
    if (child.type !== SyntaxType.Property) continue;
    const parts = child.namedChildren;
    if (parts.length >= 2 && parts[0]!.type === SyntaxType.Path && parts[0]!.text === propName) {
      const val = parts[1]!;
      if (val.type === SyntaxType.Constructor) {
        const ctorIdent = val.namedChildren.find(c => c.type === SyntaxType.Identifier);
        if (ctorIdent?.text === 'ExtResource') {
          return getConstructorFirstArg(val);
        }
      }
    }
  }
  return undefined;
}

/**
 * Extract SubResource("id") from a property value in a section.
 * Looks for: `propertyName = SubResource("id")`
 */
function getSectionSubResource(section: SyntaxNode, propName: string): string | undefined {
  for (const child of section.namedChildren) {
    if (child.type !== SyntaxType.Property) continue;
    const parts = child.namedChildren;
    if (parts.length >= 2 && parts[0]!.type === SyntaxType.Path && parts[0]!.text === propName) {
      const val = parts[1]!;
      if (val.type === SyntaxType.Constructor) {
        const ctorIdent = val.namedChildren.find(c => c.type === SyntaxType.Identifier);
        if (ctorIdent?.text === 'SubResource') {
          return getConstructorFirstArg(val);
        }
      }
    }
  }
  return undefined;
}

/**
 * Find all properties in a section whose path starts with a given prefix.
 * Returns [fullPath, valueNode] pairs.
 * E.g. prefix "sources/" matches "sources/0", "sources/1", etc.
 */
function getSectionPropsWithPrefix(
  section: SyntaxNode,
  prefix: string,
): Array<{ path: string; valueNode: SyntaxNode }> {
  const results: Array<{ path: string; valueNode: SyntaxNode }> = [];
  for (const child of section.namedChildren) {
    if (child.type !== SyntaxType.Property) continue;
    const parts = child.namedChildren;
    if (parts.length >= 2 && parts[0]!.type === SyntaxType.Path && parts[0]!.text.startsWith(prefix)) {
      results.push({ path: parts[0]!.text, valueNode: parts[1]! });
    }
  }
  return results;
}

/**
 * Extract SubResource("id") from a Constructor value node.
 */
function getSubResourceId(valueNode: SyntaxNode): string | undefined {
  if (valueNode.type !== SyntaxType.Constructor) return undefined;
  const ctorIdent = valueNode.namedChildren.find(c => c.type === SyntaxType.Identifier);
  if (ctorIdent?.text !== 'SubResource') return undefined;
  return getConstructorFirstArg(valueNode);
}

/**
 * Extract ExtResource("id") from a Constructor value node.
 */
function getExtResourceId(valueNode: SyntaxNode): string | undefined {
  if (valueNode.type !== SyntaxType.Constructor) return undefined;
  const ctorIdent = valueNode.namedChildren.find(c => c.type === SyntaxType.Identifier);
  if (ctorIdent?.text !== 'ExtResource') return undefined;
  return getConstructorFirstArg(valueNode);
}

/**
 * Follow the TileMap sub_resource chain to find all referenced PackedScene ext_resource IDs.
 *
 * Chain: TileMap node → tile_set = SubResource("TileSet_xxx")
 *   → TileSet sub_resource → sources/N = SubResource("TileSetScenesCollectionSource_xxx")
 *     → TileSetScenesCollectionSource → scenes/N/scene = ExtResource("id")
 */
function collectTileMapScenes(
  nodeSection: SyntaxNode,
  subResources: Map<string, { type: string; section: SyntaxNode }>,
): string[] {
  const extIds: string[] = [];

  // Step 1: Find tile_set = SubResource("TileSet_xxx") on the node
  const tileSetId = getSectionSubResource(nodeSection, 'tile_set');
  if (!tileSetId) return extIds;

  const tileSet = subResources.get(tileSetId);
  if (!tileSet || tileSet.type !== 'TileSet') return extIds;

  // Step 2: Find sources/N = SubResource("TileSetScenesCollectionSource_xxx") on the TileSet
  const sourceProps = getSectionPropsWithPrefix(tileSet.section, 'sources/');
  for (const { valueNode } of sourceProps) {
    const sourceId = getSubResourceId(valueNode);
    if (!sourceId) continue;

    const source = subResources.get(sourceId);
    if (!source || source.type !== 'TileSetScenesCollectionSource') continue;

    // Step 3: Find scenes/N/scene = ExtResource("id") on the TileSetScenesCollectionSource
    const sceneProps = getSectionPropsWithPrefix(source.section, 'scenes/');
    for (const { path, valueNode: sceneValue } of sceneProps) {
      // Only match scenes/N/scene (not scenes/N/id or other props)
      if (!path.endsWith('/scene')) continue;
      const extId = getExtResourceId(sceneValue);
      if (extId && !extIds.includes(extId)) {
        extIds.push(extId);
      }
    }
  }

  return extIds;
}

/**
 * Parses a .tscn file and extracts script attachments with their child nodes.
 * Each node with a script gets its own entry with relative child paths.
 */
function parseScene(
  filePath: string,
): {
  filePath: string;
  scripts: ScriptNodeInfo[];
  rootScript?: { scriptResPath: string };
  /** When root node instances another scene (inherited scene), this is the instanced scene's res:// path.
   *  E.g. RI1_1.tscn inherits world.tscn → inheritedSceneResPath = "res://world.tscn" */
  inheritedSceneResPath?: string;
  connections: SceneConnection[];
  /** Map of full node paths to their Godot type (e.g. "Area2D" → "Area2D") */
  nodeTypes: Map<string, string>;
  /** Map of full node paths to instanced scene res:// paths */
  instancedNodes: Map<string, string>;
  /** Scenes embedded via sub_resource chains (TileMap tiles, etc.) — parentNodePath → { parentType, sceneResPaths } */
  embeddedScenes: Map<string, { parentType: string; sceneResPaths: string[] }>;
} | null {
  const content = readFileSync(filePath, 'utf-8');
  const root = resourceParser.parse(content);

  const extResources = new Map<string, { path: string; type: string }>();
  const subResources = new Map<string, { type: string; section: SyntaxNode }>();
  const nodes: SceneNode[] = [];
  const connections: SceneConnection[] = [];

  for (const section of root.namedChildren) {
    if (section.type !== SyntaxType.Section) continue;
    const sectionIdent = section.namedChildren.find(c => c.type === SyntaxType.Identifier);
    if (!sectionIdent) continue;
    const sectionType = sectionIdent.text;

    if (sectionType === 'ext_resource') {
      const id = getSectionAttr(section, 'id');
      const path = getSectionAttr(section, 'path');
      const type = getSectionAttr(section, 'type');
      if (id && path && type) {
        extResources.set(id, { path, type });
      }
    } else if (sectionType === 'node') {
      const name = getSectionAttr(section, 'name');
      const type = getSectionAttr(section, 'type');
      const parent = getSectionAttr(section, 'parent');

      // Check for instance=ExtResource("id") in attributes
      const instanceAttr = getSectionAttr(section, 'instance');
      let instanceExtId: string | undefined;
      if (instanceAttr) {
        // instance attribute is inlined as ExtResource("id") in the section header
        // tree-sitter parses this as a constructor node in the attribute value
        for (const child of section.namedChildren) {
          if (child.type !== SyntaxType.Attribute) continue;
          const parts = child.namedChildren;
          if (parts.length >= 2 && parts[0]!.type === SyntaxType.Identifier && parts[0]!.text === 'instance') {
            instanceExtId = getConstructorFirstArg(parts[1]!);
            break;
          }
        }
      }

      // Check for script = ExtResource("id") in properties
      const scriptExtId = getSectionExtResource(section, 'script');

      // Check for unique_name_in_owner = true
      const uniqueVal = getSectionProp(section, 'unique_name_in_owner');
      const uniqueInOwner = uniqueVal === 'true' || undefined;

      if (name) {
        nodes.push({ name, type: type ?? '', parent: parent ?? '', scriptExtId, instanceExtId, uniqueInOwner, section });
      }
    } else if (sectionType === 'sub_resource') {
      const id = getSectionAttr(section, 'id');
      const type = getSectionAttr(section, 'type');
      if (id && type) {
        subResources.set(id, { type, section });
      }
    } else if (sectionType === 'connection') {
      const signal = getSectionAttr(section, 'signal');
      const fromPath = getSectionAttr(section, 'from');
      const toPath = getSectionAttr(section, 'to');
      const method = getSectionAttr(section, 'method');
      if (signal && fromPath && toPath && method) {
        connections.push({ signal, fromPath, toPath, method });
      }
    }
  }

  if (nodes.length === 0) return null;

  // Post-process: collect embedded scene references from special node types (TileMap, etc.)
  // TileMap nodes reference external scenes through sub_resource chains
  // (TileSet → TileSetScenesCollectionSource → scenes/N/scene = ExtResource("id")).
  // At runtime, Godot instantiates these as children of the TileMap node.
  const embeddedScenes = new Map<string, { parentType: string; sceneResPaths: string[] }>();
  for (const node of nodes) {
    if (node.type === 'TileMap' || node.type === 'TileMapLayer') {
      if (!node.section) continue;
      const extIds = collectTileMapScenes(node.section, subResources);
      if (extIds.length === 0) continue;
      const parentPath = node.parent === '' ? '.' : node.parent === '.' ? node.name : `${node.parent}/${node.name}`;
      const sceneResPaths: string[] = [];
      for (const extId of extIds) {
        const extRes = extResources.get(extId);
        if (extRes && extRes.type === 'PackedScene') {
          sceneResPaths.push(extRes.path);
        }
      }
      if (sceneResPaths.length > 0) {
        embeddedScenes.set(parentPath, { parentType: node.type, sceneResPaths });
      }
    }
  }

  /** Collect all descendant nodes of `scriptNode` as children with relative paths */
  function collectChildren(
    scriptNode: SceneNode,
    nodePath: string,
  ): Array<{ path: string; type: string; instanceSceneResPath?: string }> {
    const children: Array<{ path: string; type: string; instanceSceneResPath?: string }> = [];
    for (const other of nodes) {
      if (other === scriptNode) continue;

      // Resolve type: explicit type, or from instance ext_resource
      let nodeType = other.type;
      let instanceSceneResPath: string | undefined;
      if (!nodeType && other.instanceExtId) {
        const instanceRes = extResources.get(other.instanceExtId);
        if (instanceRes && instanceRes.type === 'PackedScene') {
          instanceSceneResPath = instanceRes.path;
          nodeType = '';
        }
      }
      if (!nodeType && !instanceSceneResPath) continue;

      const otherPath =
        other.parent === '.'
          ? other.name
          : `${other.parent}/${other.name}`;

      let relativePath: string | null = null;
      if (nodePath === '.') {
        if (other.parent !== '') {
          relativePath = otherPath;
        }
      } else if (other.parent === nodePath || other.parent.startsWith(nodePath + '/')) {
        relativePath = otherPath.slice(nodePath.length + 1);
      }

      if (relativePath) {
        children.push({ path: relativePath, type: nodeType, instanceSceneResPath });
      }

      if (other.uniqueInOwner && nodePath === '.') {
        children.push({ path: `%${other.name}`, type: nodeType, instanceSceneResPath });
      }
    }
    return children;
  }

  // Build script attachments
  const scripts: ScriptNodeInfo[] = [];

  for (const node of nodes) {
    if (!node.scriptExtId) continue;
    const extRes = extResources.get(node.scriptExtId);
    if (!extRes || extRes.type !== 'Script' || !extRes.path.endsWith('.gd'))
      continue;

    const nodePath =
      node.parent === '' ? '.' : node.parent === '.' ? node.name : `${node.parent}/${node.name}`;

    scripts.push({
      scriptResPath: extRes.path,
      nodePath,
      children: collectChildren(node, nodePath),
    });
  }

  // Detect root node script (direct or from inherited/instanced scene)
  const rootNode = nodes.find((n) => n.parent === '');
  let rootScript: { scriptResPath: string } | undefined;
  let inheritedSceneResPath: string | undefined;
  if (rootNode?.scriptExtId) {
    const extRes = extResources.get(rootNode.scriptExtId);
    if (extRes && extRes.type === 'Script' && extRes.path.endsWith('.gd')) {
      rootScript = { scriptResPath: extRes.path };
    }
  }
  // Inherited scene: root node instances another scene (e.g. level inherits world.tscn)
  if (rootNode?.instanceExtId) {
    const extRes = extResources.get(rootNode.instanceExtId);
    if (extRes && extRes.type === 'PackedScene') {
      inheritedSceneResPath = extRes.path;
    }
  }

  // Build node type map (full path → Godot type)
  const nodeTypes = new Map<string, string>();
  for (const node of nodes) {
    if (!node.type) continue;
    const fullPath =
      node.parent === '' ? '.' : node.parent === '.' ? node.name : `${node.parent}/${node.name}`;
    nodeTypes.set(fullPath, node.type);
  }

  // Build instanced nodes map (full path → instanced scene res:// path)
  const instancedNodes = new Map<string, string>();
  for (const node of nodes) {
    if (!node.instanceExtId) continue;
    const extRes = extResources.get(node.instanceExtId);
    if (!extRes || extRes.type !== 'PackedScene') continue;
    const fullPath =
      node.parent === '' ? '.' : node.parent === '.' ? node.name : `${node.parent}/${node.name}`;
    instancedNodes.set(fullPath, extRes.path);
  }

  return { filePath, scripts, rootScript, inheritedSceneResPath, connections, nodeTypes, instancedNodes, embeddedScenes };
}

/**
 * Resolved signal handler info: method name → typed parameters.
 */
export interface SignalHandlerInfo {
  /** Signal handler method name (e.g. "_on_area_entered") */
  method: string;
  /** Typed parameters from the connected signal */
  params: Array<{ name: string; gdType: string }>;
}

/**
 * Resolves signal handler types for a GDScript file by scanning .tscn scenes for connections.
 *
 * Given a script's res:// path, finds all scenes that reference it, parses their connections,
 * and looks up signal parameter types from the Godot class registry.
 *
 * @param scriptResPath - The res:// path of the GD script (e.g. "res://Player.gd")
 * @param sceneFiles - Array of absolute paths to .tscn files to scan
 * @param registry - GodotClassRegistry for signal parameter lookup
 * @returns Map of method name → typed parameter info
 */
export function resolveSignalHandlers(
  scriptResPath: string,
  sceneFiles: string[],
  registry: GodotClassRegistry,
): Map<string, SignalHandlerInfo> {
  const handlers = new Map<string, SignalHandlerInfo>();

  for (const scenePath of sceneFiles) {
    const scene = parseScene(scenePath);
    if (!scene) continue;

    // Find script nodes that match the target script
    const scriptNodes = scene.scripts.filter(
      (s) => s.scriptResPath === scriptResPath,
    );
    if (scriptNodes.length === 0) continue;

    // Build set of node paths where this script is attached
    const scriptNodePaths = new Set(scriptNodes.map((s) => s.nodePath));

    for (const conn of scene.connections) {
      // Check if "to" node matches a script node for this script
      // Find the most specific script node that is an ancestor of (or equal to) the "to" path
      let targetMatch = false;
      for (const nodePath of scriptNodePaths) {
        if (conn.toPath === '.' && nodePath === '.') {
          targetMatch = true;
          break;
        }
        if (conn.toPath === nodePath) {
          targetMatch = true;
          break;
        }
        // Root script handles any "to" path that isn't handled by a more specific script
        if (nodePath === '.') {
          targetMatch = true;
        }
        // Check if script node is an ancestor of "to" path
        if (conn.toPath.startsWith(nodePath + '/')) {
          targetMatch = true;
        }
      }
      if (!targetMatch) continue;

      // Already resolved this method
      if (handlers.has(conn.method)) continue;

      // Resolve "from" node path → Godot type
      const fromType = scene.nodeTypes.get(conn.fromPath);
      if (!fromType) continue;

      // Look up signal parameters on the emitter's type
      const signalParams = registry.getSignalParams(fromType, conn.signal);
      if (!signalParams) continue;

      handlers.set(conn.method, {
        method: conn.method,
        params: signalParams.map((p) => ({ name: p.name, gdType: p.type })),
      });
    }
  }

  return handlers;
}

export interface AutoloadEntry {
  /** Global singleton name (e.g. "Globals", "LevelTransition") */
  name: string;
  /** Resource path (e.g. "res://Scripts/Globals.gd" or "res://level_transition.tscn") */
  resPath: string;
}

/**
 * Parses the [autoload] section from a project.godot file.
 * Autoload entries look like: `Name="*res://path.gd"` or `Name="*res://path.tscn"`
 * The `*` prefix means the autoload is enabled.
 */
export function parseAutoloads(projectFilePath: string): AutoloadEntry[] {
  if (!existsSync(projectFilePath)) return [];

  const content = readFileSync(projectFilePath, 'utf-8');
  const root = resourceParser.parse(content);
  const entries: AutoloadEntry[] = [];

  for (const section of root.namedChildren) {
    if (section.type !== SyntaxType.Section) continue;
    const sectionIdent = section.namedChildren.find(c => c.type === SyntaxType.Identifier);
    if (!sectionIdent || sectionIdent.text !== 'autoload') continue;

    // Parse properties: Name="*res://path"
    for (const child of section.namedChildren) {
      if (child.type !== SyntaxType.Property) continue;
      const parts = child.namedChildren;
      if (parts.length < 2) continue;
      const pathNode = parts[0]!;
      const valueNode = parts[1]!;
      if (pathNode.type !== SyntaxType.Path) continue;
      if (valueNode.type !== SyntaxType.String) continue;

      const name = pathNode.text;
      const rawValue = valueNode.text.slice(1, -1); // strip quotes
      if (rawValue.startsWith('*')) {
        entries.push({ name, resPath: rawValue.slice(1) });
      }
    }
  }

  return entries;
}

export interface ScriptClassInfo {
  className: string;
  tsModulePath: string;
  /** Absolute path to the .ts source file */
  tsAbsPath: string;
  extendsClassName?: string;
}

interface ScriptlessSceneInfo {
  alias: string;
  rootType: string;
  sceneMap?: Map<string, string>;
}

/** Derive a synthetic alias from a scene res:// path, e.g. "res://Level2.tscn" → "_Level2Tscn" */
function sceneResPathToAlias(resPath: string): string {
  const stripped = resPath.replace(/^res:\/\//, '').replace(/\.[^.]+$/, '');
  const name = stripped.split('/').map(p => p.replace(/[^a-zA-Z0-9]/g, '_')).join('_');
  return `_${name}Tscn`;
}

/** Derive output file name from scene res:// path, e.g. "res://Player.tscn" → "Player.tscn.d.ts" */
function sceneResPathToOutputFile(resPath: string): string {
  return resPath.replace(/^res:\/\//, '').replace(/\.tscn$/, '.tscn.d.ts');
}

/** Derive output file name from script res:// path, e.g. "res://Player.gd" → "Player.gd.d.ts" */
function scriptResPathToOutputFile(resPath: string): string {
  return resPath.replace(/^res:\/\//, '') + '.d.ts';
}

/** Derive scene tree interface name from scene res:// path, e.g. "res://Player.tscn" → "_PlayerTscn_Tree" */
function sceneResPathToTreeName(resPath: string): string {
  const base = resPath
    .replace(/^res:\/\//, '')
    .replace(/\.tscn$/, '')
    .replaceAll('/', '_')
    .replaceAll(' ', '_');
  return `_${base}Tscn_Tree`;
}

/** Derive scene nodes interface name from script alias, e.g. "_Player" → "_PlayerSceneNodes" */
function aliasToSceneNodesName(alias: string): string {
  return `${alias}SceneNodes`;
}

/** Derive parents interface name from script alias, e.g. "_Player" → "_PlayerParents" */
function aliasToParentsName(alias: string): string {
  return `${alias}Parents`;
}

/** Compute a relative import path between two files within the same output directory */
function computeRelImport(fromFile: string, toFile: string): string {
  const fromDir = dirname(fromFile);
  let rel = relative(fromDir, toFile).replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel.replace(/\.d\.ts$/, '.js');
}

/** Compute a relative import path from an output file to a TS source file */
function computeTsImport(outputDir: string, fromOutputFile: string, tsAbsPath: string): string {
  const fromAbsDir = resolve(outputDir, dirname(fromOutputFile));
  let rel = relative(fromAbsDir, tsAbsPath).replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel.replace(/\.ts$/, '.js');
}

// ─── Combined Typings Generator ─────────────────────────────

export interface GenerateTypingsOptions {
  /** Root directory of the project (base for res:// paths) */
  rootDir: string;
  /** TypeScript source directory */
  tsDir: string;
  /** GDScript output directory */
  gdDir: string;
  /** TS source files to scan for class declarations */
  files: string[];
  /** Output directory for per-file .d.ts typings */
  outputDir: string;
  /** @deprecated Use outputDir instead */
  outputPath?: string;
  /** Directory containing .tscn scene files */
  scenesDir: string;
  /** Path to tsconfig.json */
  tsConfigPath?: string;
  /** Glob patterns for files/folders to ignore */
  ignore?: string[];
  /** Path to project.godot file (for autoload singleton detection) */
  projectFile?: string;
  /** Path to godot-class-registry.json (for typed signal handler generation) */
  registryPath?: string;
}

/**
 * Generates per-file .d.ts typings in outputDir:
 * - Per-scene .tscn.d.ts files (scene tree interfaces, GodotResources, parent entries)
 * - Per-script .d.ts files (merged scene nodes, module augmentation, global class)
 * - _index.d.ts (asset GodotResources, autoload singletons)
 * Returns list of written file paths.
 */
export function generateTypings(options: GenerateTypingsOptions): string[] {

}

/** Known Godot asset extensions → Godot resource type name */
const ASSET_EXTENSION_MAP: Record<string, string> = {
  // Images / Textures
  '.png': 'Texture2D', '.jpg': 'Texture2D', '.jpeg': 'Texture2D',
  '.webp': 'Texture2D', '.svg': 'Texture2D', '.bmp': 'Texture2D',
  '.tga': 'Texture2D', '.hdr': 'Texture2D', '.exr': 'Texture2D',
  // Audio
  '.wav': 'AudioStream', '.ogg': 'AudioStream', '.mp3': 'AudioStream',
  // 3D models
  '.glb': 'PackedScene', '.gltf': 'PackedScene', '.obj': 'Resource',
  '.fbx': 'PackedScene', '.dae': 'PackedScene',
  // Fonts
  '.ttf': 'Font', '.otf': 'Font', '.woff': 'Font', '.woff2': 'Font',
  '.fnt': 'Font',
  // Shaders
  '.gdshader': 'Shader', '.gdshaderinc': 'Resource',
  // Resources
  '.tres': 'Resource', '.res': 'Resource',
  // Themes
  '.theme': 'Theme',
  // Videos
  '.ogv': 'VideoStream', '.webm': 'VideoStream',
  // Translations
  '.translation': 'Translation', '.po': 'Translation',
  // Materials
  '.material': 'Material',
};

/** Extensions recognized as Godot asset files (for GodotResources scanning) */
const ASSET_EXTENSIONS = new Set(Object.keys(ASSET_EXTENSION_MAP));

/**
 * Parses the `[gd_resource type="..."]` header from a .tres/.res file
 * to determine the actual Godot resource class (e.g. "ShaderMaterial", "AudioStreamOggVorbis").
 * Returns undefined if the header cannot be parsed (binary .res files, corrupt files, etc.).
 */
function parseGdResourceType(filePath: string): string | undefined {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const root = resourceParser.parse(content);

    for (const section of root.namedChildren) {
      if (section.type !== SyntaxType.Section) continue;
      const sectionIdent = section.namedChildren.find(c => c.type === SyntaxType.Identifier);
      if (!sectionIdent || sectionIdent.text !== 'gd_resource') continue;
      return getSectionAttr(section, 'type');
    }
    return undefined;
  } catch {
    return undefined;
  }
}

function findProjectFiles(
  dir: string,
  rootDir: string,
  ignore: string[],
  extensions: Set<string>,
): string[] {
  const results: string[] = [];

  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      try {
        if (shouldIgnore(fullPath, rootDir, ignore)) continue;
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
          // Skip addons, hidden dirs, and node_modules
          if (!entry.startsWith('.') && entry !== 'addons' && entry !== 'node_modules') {
            results.push(...findProjectFiles(fullPath, rootDir, ignore, extensions));
          }
        } else if (extensions.has(extname(entry).toLowerCase())) {
          results.push(fullPath);
        }
      } catch {
        // Skip inaccessible files
      }
    }
  } catch {
    // Skip inaccessible dirs
  }

  return results;
}

export function findSceneFiles(
  dir: string,
  rootDir: string,
  ignore: string[],
): string[] {
  return findProjectFiles(dir, rootDir, ignore, new Set(['.tscn']));
}

function findAssetFiles(
  dir: string,
  rootDir: string,
  ignore: string[],
): string[] {
  return findProjectFiles(dir, rootDir, ignore, ASSET_EXTENSIONS);
}
