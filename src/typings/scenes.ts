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

/** Resolve parent type for a child node path (direct child → script alias, nested → intermediate type) */
function resolveChildParentType(
  path: string,
  childTypeMap: Map<string, string>,
  defaultParent: string,
): string {
  if (path.startsWith('%') || !path.includes('/')) return defaultParent;
  const parentPath = path.substring(0, path.lastIndexOf('/'));
  const rawParent = childTypeMap.get(parentPath);
  return rawParent
    ? rawParent.split(' | ').find(t => t !== 'null') ?? 'Node'
    : 'Node';
}

/** Build `[__children]: [...]` line for a tree interface.
 *  Only includes immediate children (no flat paths, no %Name aliases).
 *  @param treeName  Interface name for member references (e.g. `_PlayerTscn_Tree`)
 *  @param annotated Annotated children from buildAnnotatedChildren()
 */
function buildChildrenTupleLine(
  treeName: string,
  annotated: Array<{ path: string; annotatedType: string }>,
): string | null {
  const immediateChildren: string[] = [];
  for (const { path } of annotated) {
    if (path.includes('/') || path.startsWith('%')) continue;
    immediateChildren.push(`${treeName}["${path}"]`);
  }
  if (immediateChildren.length === 0) return null;
  return `  [__children]: [${immediateChildren.join(', ')}];`;
}

/** Build a merged `[__children]` tuple for scripts used in multiple scenes.
 *  Takes the union of types at each position across all scenes.
 *  Shorter scenes get `| null` padding for missing positions. */
function buildMergedChildrenTuple(
  sceneMaps: Array<Map<string, string>>,
  treeNames: string[],
  sceneResPaths: string[],
): string | null {
  // Collect immediate children (in order) per scene
  const perScene: Array<string[]> = [];
  for (let i = 0; i < sceneMaps.length; i++) {
    const immediate: string[] = [];
    const treeName = treeNames[i];
    for (const path of sceneMaps[i].keys()) {
      if (path.includes('/') || path.startsWith('%')) continue;
      immediate.push(`${treeName}["${path}"]`);
    }
    perScene.push(immediate);
  }

  const maxLen = Math.max(0, ...perScene.map(s => s.length));
  if (maxLen === 0) return null;

  const tupleEntries: string[] = [];
  for (let idx = 0; idx < maxLen; idx++) {
    const typesAtIdx = new Set<string>();
    let hasMissing = false;
    for (const scene of perScene) {
      if (idx < scene.length) {
        typesAtIdx.add(scene[idx]);
      } else {
        hasMissing = true;
      }
    }
    let entry = [...typesAtIdx].join(' | ');
    if (hasMissing) entry += ' | null';
    tupleEntries.push(entry);
  }

  return `[__children]: [${tupleEntries.join(', ')}];`;
}

/** Build merged property lookups for scripts used in multiple scenes.
 *  Instead of `extends Tree1, Tree2` (which breaks on conflicting types),
 *  emits each property as a union of tree interface lookups:
 *  `"Label": _Tree1["Label"] | _Tree2["Label"]`
 *  Paths not present in all scenes get `| null`. */
function buildMergedTreeLookups(
  sceneMaps: Array<Map<string, string>>,
  treeNames: string[],
): Array<{ path: string; typeExpr: string }> {
  const totalScenes = sceneMaps.length;
  // Collect all paths (preserving insertion order from first scene)
  const pathToTrees = new Map<string, string[]>();
  for (let i = 0; i < sceneMaps.length; i++) {
    for (const path of sceneMaps[i].keys()) {
      let trees = pathToTrees.get(path);
      if (!trees) {
        trees = [];
        pathToTrees.set(path, trees);
      }
      trees.push(treeNames[i]);
    }
  }

  const result: Array<{ path: string; typeExpr: string }> = [];
  for (const [path, trees] of pathToTrees) {
    const lookups = trees.map(t => `${t}["${path}"]`);
    let typeExpr = lookups.join(' | ');
    if (trees.length < totalScenes) {
      typeExpr += ' | null';
    }
    result.push({ path, typeExpr });
  }
  return result;
}

/** Annotate a raw type string with [__parent], [__script_tree], and nested subtree entries */
function annotateChildType(
  type: string,
  parentType: string,
  userClassTypes: Set<string>,
  typeToSceneNodes: Map<string, string>,
  subtreeEntries?: Array<{ name: string; annotatedType: string }>,
): string {
  return type.split(' | ').map(t => {
    if (t === 'null') return 'null';
    if (userClassTypes.has(t)) {
      const sceneNodesName = typeToSceneNodes.get(t);
      if (sceneNodesName) return `${t} & {[__script_tree]: ${sceneNodesName}}`;
      return t;
    }
    const entries: string[] = [`[__parent]: ${parentType}`];
    if (subtreeEntries && subtreeEntries.length > 0) {
      const childrenTuple = subtreeEntries.map(c => c.annotatedType).join(', ');
      entries.push(`[__children]: [${childrenTuple}]`);
      for (const child of subtreeEntries) {
        entries.push(`"${child.name}": ${child.annotatedType}`);
      }
    }
    return `${t}<{${entries.join('; ')}}>`;
  }).join(' | ');
}

export interface BuildScriptClassMapOptions {
  /** TS source files to scan for class names */
  files: string[];
  /** Root directory of the project (used for res:// path computation) */
  rootDir: string;
  /** TS source directory */
  tsDir: string;
  /** GD output directory */
  gdDir: string;
  /** Output directory where scene-typings.d.ts will be written */
  sceneTypingsDir: string;
  /** Path to tsconfig.json */
  tsConfigPath?: string;
}

/**
 * Builds a map from GD script res:// paths to { className, tsModulePath }.
 * Scans TS files for exported class declarations, computes the corresponding
 * GD path (res://...) and the TS module path relative to sceneTypingsDir.
 */
export function buildScriptClassMap(
  options: BuildScriptClassMapOptions,
): Map<string, ScriptClassInfo> {
  const map = new Map<string, ScriptClassInfo>();

  const program = createTsProgram({
    rootDir: options.tsDir,
    files: options.files,
    tsConfigPath: options.tsConfigPath,
  });

  for (const filePath of options.files) {
    const sourceFile = program.getSourceFile(filePath);
    if (!sourceFile) continue;

    for (const statement of sourceFile.statements) {
      if (!ts.isClassDeclaration(statement) || !statement.name) continue;

      const className = statement.name.text;

      // Extract extends clause (e.g. "CharacterBody2D", "BaseCharacter")
      let extendsClassName: string | undefined;
      if (statement.heritageClauses) {
        for (const clause of statement.heritageClauses) {
          if (clause.token === ts.SyntaxKind.ExtendsKeyword && clause.types.length > 0) {
            extendsClassName = clause.types[0]!.expression.getText(sourceFile);
          }
        }
      }

      // Compute res:// path for the corresponding .gd file
      // When tsDir != gdDir, the GD output goes to gdDir with the same relative path,
      // so we compute the GD path relative to rootDir (which is the Godot project root).
      const relFromTs = relative(options.tsDir, filePath).replace(/\\/g, '/').replace(/\.ts$/, '.gd');
      const gdAbsPath = join(options.gdDir, relFromTs);
      const relFromRoot = relative(options.rootDir, gdAbsPath).replace(/\\/g, '/');
      const resPath = `res://${relFromRoot}`;

      // Compute TS module path relative to scene typings output dir
      let tsModulePath = relative(options.sceneTypingsDir, filePath)
        .replace(/\\/g, '/');
      if (!tsModulePath.startsWith('.')) {
        tsModulePath = './' + tsModulePath;
      }

      map.set(resPath, { className, tsModulePath, tsAbsPath: filePath, extendsClassName });
    }
  }

  return map;
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
  const outputDir = options.outputDir ?? dirname(options.outputPath!);

  // Build script class map (scans all TS files for class declarations)
  const scriptClassMap = buildScriptClassMap({
    files: options.files,
    rootDir: options.rootDir,
    tsDir: options.tsDir,
    gdDir: options.gdDir,
    sceneTypingsDir: outputDir,
    tsConfigPath: options.tsConfigPath,
  });

  // Build unique import aliases for each script class (handles duplicate class names like __CLASS__)
  // resPath → { alias, className, tsModulePath }
  const aliasMap = new Map<string, { alias: string; className: string; tsModulePath: string }>();
  const usedAliases = new Set<string>();
  for (const [resPath, info] of scriptClassMap) {
    let alias = '_' + resPath.replace(/^res:\/\//, '')
      .replace(/\.[^.]+$/, '')
      .replaceAll('/', '_')
      .replaceAll(' ', '_');
    let base = alias;
    let i = 2;
    while (usedAliases.has(alias)) {
      alias = `${base}_${i++}`;
    }
    usedAliases.add(alias);
    aliasMap.set(resPath, { alias, className: info.className, tsModulePath: info.tsModulePath });
  }

  // Reverse map: className → resPath (for resolving extendsClassName to script res:// paths)
  const classNameToResPath = new Map<string, string>();
  for (const [resPath, info] of scriptClassMap) {
    if (info.className !== '__CLASS__') {
      classNameToResPath.set(info.className, resPath);
    }
  }

  // Reverse map: alias → resPath (for finding script res:// path from alias)
  const aliasToResPath = new Map<string, string>();
  for (const [resPath, entry] of aliasMap) {
    aliasToResPath.set(entry.alias, resPath);
  }

  /** Find the script res:// path for a given alias string */
  function findResPathByAlias(alias: string): string | undefined {
    return aliasToResPath.get(alias);
  }

  /** Extract _Xxx-style aliases from a type string into a set (e.g. "_Player | TileMap<{...}>" → {"_Player"}) */
  function extractAliasesFromType(typeStr: string, out: Set<string>): void {
    // Match identifiers that start with _ and look like script aliases
    const re = /\b(_[A-Za-z][A-Za-z0-9_]*)\b/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(typeStr)) !== null) {
      const candidate = m[1]!;
      // Only include if it's actually a known alias
      if (aliasToResPath.has(candidate)) {
        out.add(candidate);
      }
    }
  }

  // Find scene files and collect per-script scene node data
  const scenes = findSceneFiles(
    options.scenesDir,
    options.rootDir,
    options.ignore ?? [],
  );

  // Parse all scenes first, then process
  const parsedScenes: Array<{
    scenePath: string;
    resPath: string;
    scene: NonNullable<ReturnType<typeof parseScene>>;
  }> = [];
  const resourceEntries: Array<{ resPath: string; alias?: string }> = [];

  // Build scene root script map: tscn res:// path → gd script res:// path
  const sceneRootScripts = new Map<string, string>();
  // Build scene root type map: tscn res:// path → Godot type of root node (e.g. "TileMap", "Node2D")
  // Used as fallback for instanced scenes without a root script
  const sceneRootTypes = new Map<string, string>();

  for (const scenePath of scenes) {
    const scene = parseScene(scenePath);
    const resPath = `res://${relative(options.rootDir, scenePath).replace(/\\/g, '/')}`;
    if (!scene) {
      resourceEntries.push({ resPath });
      continue;
    }

    let rootAlias: string | undefined;
    if (scene.rootScript) {
      const aliasEntry = aliasMap.get(scene.rootScript.scriptResPath);
      if (aliasEntry) {
        rootAlias = aliasEntry.alias;
      }
      sceneRootScripts.set(resPath, scene.rootScript.scriptResPath);
    } else if (scene.inheritedSceneResPath) {
      // Inherited scene (e.g. Level1.tscn inherits Level.tscn):
      // root script comes from the base scene
      const inheritedScriptPath = sceneRootScripts.get(scene.inheritedSceneResPath);
      if (inheritedScriptPath) {
        const aliasEntry = aliasMap.get(inheritedScriptPath);
        if (aliasEntry) {
          rootAlias = aliasEntry.alias;
        }
        sceneRootScripts.set(resPath, inheritedScriptPath);
      }
    }
    // Track root node Godot type for instanced scene fallback
    const rootType = scene.nodeTypes.get('.');
    if (rootType) {
      sceneRootTypes.set(resPath, rootType);
    }
    resourceEntries.push({ resPath, alias: rootAlias });
    parsedScenes.push({ scenePath, resPath, scene });
  }

  // Second pass: resolve inherited root scripts that failed due to processing order.
  // When scene A inherits scene B, but B was processed after A, sceneRootScripts
  // wouldn't have B's entry yet. Walk inheritance chains until resolved.
  for (let changed = true; changed; ) {
    changed = false;
    for (const { resPath, scene } of parsedScenes) {
      if (sceneRootScripts.has(resPath)) continue;
      if (!scene.inheritedSceneResPath) continue;
      // Walk inheritance chain: follow inheritedSceneResPath until we find a root script
      let baseResPath: string | undefined = scene.inheritedSceneResPath;
      while (baseResPath) {
        const baseScript = sceneRootScripts.get(baseResPath);
        if (baseScript) {
          sceneRootScripts.set(resPath, baseScript);
          // Update the resource entry alias
          const aliasEntry = aliasMap.get(baseScript);
          const entry = resourceEntries.find((e) => e.resPath === resPath);
          if (entry && aliasEntry) {
            entry.alias = aliasEntry.alias;
          }
          changed = true;
          break;
        }
        // Check if the base scene also inherits from another scene
        const baseScene = parsedScenes.find((p) => p.resPath === baseResPath);
        baseResPath = baseScene?.scene.inheritedSceneResPath;
      }
    }
  }

  // Identify scriptless scenes (no root script, no inherited script).
  // These get synthetic type aliases using Node<Tree> / TileMap<Tree> etc. with [__parent] and children.
  const scriptlessSceneData = new Map<string, ScriptlessSceneInfo>();
  for (const { resPath, scene } of parsedScenes) {
    if (sceneRootScripts.has(resPath)) continue; // has a script, skip
    const rootType = scene.nodeTypes.get('.') ?? 'Node';
    scriptlessSceneData.set(resPath, { alias: sceneResPathToAlias(resPath), rootType });
  }

  // Track per-scene children for each script, so we can compute union types.
  // When a script is used in multiple scenes, a path present in all scenes gets a union
  // of all types; a path missing from some scenes gets `| null`.
  const scriptData = new Map<
    string,
    {
      alias: string; tsModulePath: string; className: string;
      /** Each entry is one scene's children map (path → type) */
      sceneMaps: Array<Map<string, string>>;
    }
  >();

  // Track instanced scene parent relationships: childScriptAlias → Set<parentScriptAlias>
  // Used to add get_parent() to module augmentation returning the parent script class type.
  const instancedParents = new Map<string, Set<string>>();

  // Per-scene root script children (sceneResPath → resolved children map)
  // Used for per-scene .tscn.d.ts file emission
  const perSceneRootTree = new Map<string, Map<string, string>>();

  // Track which scenes each script is ROOT in (scriptResPath → sceneResPaths[])
  const scriptToRootScenes = new Map<string, string[]>();

  /** Resolve a script's children into a type map and track instanced parent relationships */
  function resolveScriptChildren(
    children: ScriptNodeInfo['children'],
    parentAliasEntry: { alias: string },
  ): Map<string, string> {
    const sceneChildren = new Map<string, string>();
    for (const child of children) {
      let childType = child.type;
      // Resolve instanced scene nodes to their root script class
      if (child.instanceSceneResPath) {
        const instanceScriptResPath = sceneRootScripts.get(child.instanceSceneResPath);
        if (instanceScriptResPath) {
          const instanceAlias = aliasMap.get(instanceScriptResPath);
          if (instanceAlias) {
            childType = instanceAlias.className === '__CLASS__' ? instanceAlias.alias : instanceAlias.className;

            // Track parent→child scene relationship for get_parent() in module augmentation
            const childScriptAlias = instanceAlias.alias;
            if (!instancedParents.has(childScriptAlias)) {
              instancedParents.set(childScriptAlias, new Set());
            }
            instancedParents.get(childScriptAlias)!.add(parentAliasEntry.alias);
          }
        }
        // If we couldn't resolve via script, check for scriptless scene with synthetic type
        if (!childType && child.instanceSceneResPath) {
          const slData = scriptlessSceneData.get(child.instanceSceneResPath);
          if (slData) {
            childType = slData.alias;
            // Track parent relationship for get_parent()
            if (!instancedParents.has(slData.alias)) {
              instancedParents.set(slData.alias, new Set());
            }
            instancedParents.get(slData.alias)!.add(parentAliasEntry.alias);
          } else {
            childType = sceneRootTypes.get(child.instanceSceneResPath) ?? 'Node';
          }
        }
        if (!childType) {
          childType = 'Node';
        }
      }
      if (childType) {
        sceneChildren.set(child.path, childType);
      }
    }
    return sceneChildren;
  }

  /** Ensure scriptData entry exists for a given script res path */
  function ensureScriptData(scriptResPath: string) {
    if (scriptData.has(scriptResPath)) return scriptData.get(scriptResPath)!;
    const classInfo = scriptClassMap.get(scriptResPath);
    if (!classInfo) return null;
    const aliasEntry = aliasMap.get(scriptResPath);
    if (!aliasEntry) return null;
    const data = {
      alias: aliasEntry.alias,
      tsModulePath: classInfo.tsModulePath,
      className: classInfo.className,
      sceneMaps: [] as Array<Map<string, string>>,
    };
    scriptData.set(scriptResPath, data);
    return data;
  }

  // Pass 1: Process all regular scripts (scripts defined directly in scenes)
  for (const { resPath, scene } of parsedScenes) {
    for (const script of scene.scripts) {
      const aliasEntry = aliasMap.get(script.scriptResPath);
      if (!aliasEntry) continue;

      const data = ensureScriptData(script.scriptResPath);
      if (!data) continue;

      if (script.children.length > 0) {
        const resolvedChildren = resolveScriptChildren(script.children, aliasEntry);
        data.sceneMaps.push(resolvedChildren);

        // Track per-scene root tree (for per-scene file emission)
        if (script.nodePath === '.') {
          perSceneRootTree.set(resPath, resolvedChildren);
          const scenes = scriptToRootScenes.get(script.scriptResPath) ?? [];
          scenes.push(resPath);
          scriptToRootScenes.set(script.scriptResPath, scenes);
        }
      }
    }
  }

  // Pass 2: Handle inherited scenes (root node instances another scene, e.g. RI1_1.tscn inherits world.tscn)
  // Children added by the inheriting scene are ADDITIVE to the base scene's children,
  // so we clone the base scene's map and add the new children to get a complete snapshot.
  for (const { resPath, scene } of parsedScenes) {
    if (!scene.inheritedSceneResPath) continue;

    const inheritedRootScriptPath = sceneRootScripts.get(scene.inheritedSceneResPath);
    if (!inheritedRootScriptPath) continue;

    const aliasEntry = aliasMap.get(inheritedRootScriptPath);
    if (!aliasEntry) continue;

    const data = ensureScriptData(inheritedRootScriptPath);
    if (!data) continue;

    // Collect children added by the inheriting scene
    const inheritedChildren: ScriptNodeInfo['children'] = [];
    for (const [fullPath, instanceResPath] of scene.instancedNodes) {
      if (fullPath === '.') continue;
      inheritedChildren.push({ path: fullPath, type: '', instanceSceneResPath: instanceResPath });
    }
    for (const [fullPath, nodeType] of scene.nodeTypes) {
      if (fullPath === '.') continue;
      if (!scene.instancedNodes.has(fullPath)) {
        inheritedChildren.push({ path: fullPath, type: nodeType });
      }
    }
    if (inheritedChildren.length === 0) continue;

    // Combine with the base scene's children: clone the first existing map (from base scene)
    // and merge the inherited additions into it, so it's a complete snapshot
    const resolvedAdditions = resolveScriptChildren(inheritedChildren, aliasEntry);
    const baseMap = data.sceneMaps.length > 0
      ? new Map(data.sceneMaps[0]!)
      : new Map<string, string>();
    for (const [path, type] of resolvedAdditions) {
      baseMap.set(path, type);
    }
    data.sceneMaps.push(baseMap);

    // Track per-scene data for this inherited scene
    perSceneRootTree.set(resPath, baseMap);
    const scenes = scriptToRootScenes.get(inheritedRootScriptPath) ?? [];
    scenes.push(resPath);
    scriptToRootScenes.set(inheritedRootScriptPath, scenes);
  }

  // Pass 3: Handle embedded scene references (TileMap tiles, etc.)
  // These scenes are instantiated at runtime as children of the embedding node (e.g. TileMap),
  // so their get_parent() should return the embedding node's type with [__parent] for chain resolution.
  //
  // For a TileMap node in a scene, the embedded scene's parent chain is:
  //   embedded_scene → TileMap → owning_scene_script
  // So get_parent() should be: TileMap<{[__parent]: owning_script_alias}>
  //
  // If the TileMap is the root of a non-scripted scene (e.g. TilesetObjects.tscn),
  // the grandparent comes from wherever that scene is instanced.
  for (const { resPath, scene } of parsedScenes) {
    for (const [parentPath, { parentType, sceneResPaths }] of scene.embeddedScenes) {
      // Determine grandparent aliases (parent of the TileMap node)
      const grandparentAliases = new Set<string>();

      if (parentPath === '.') {
        // TileMap is root of this scene — grandparent comes from where this scene is instanced
        // Look through all scenes to find which ones instance this scene
        for (const { scene: otherScene } of parsedScenes) {
          for (const [, instanceResPath] of otherScene.instancedNodes) {
            if (instanceResPath === resPath) {
              // Found a scene that instances this scene
              // The grandparent is the root script of the instancing scene
              if (otherScene.rootScript) {
                const gpAlias = aliasMap.get(otherScene.rootScript.scriptResPath);
                if (gpAlias) grandparentAliases.add(gpAlias.alias);
              }
            }
          }
        }
      } else {
        // TileMap is a non-root node — grandparent is the scene's root script
        if (scene.rootScript) {
          const gpAlias = aliasMap.get(scene.rootScript.scriptResPath);
          if (gpAlias) grandparentAliases.add(gpAlias.alias);
        }
      }

      // Build the parent type with [__parent] for chain resolution.
      // If the embedding node is the root of a scriptless scene, use its synthetic alias
      // (which already encodes [__parent]) instead of building TileMap<{[__parent]: ...}>.
      let resolvedParentType: string;
      const slData = parentPath === '.' ? scriptlessSceneData.get(resPath) : undefined;
      if (slData) {
        resolvedParentType = slData.alias;
      } else if (grandparentAliases.size > 0) {
        const gpType = [...grandparentAliases].join(' | ');
        resolvedParentType = `${parentType}<{[__parent]: ${gpType}}>`;
      } else {
        resolvedParentType = parentType;
      }

      for (const sceneResPath of sceneResPaths) {
        const instanceScriptResPath = sceneRootScripts.get(sceneResPath);
        if (!instanceScriptResPath) continue;
        const instanceAlias = aliasMap.get(instanceScriptResPath);
        if (!instanceAlias) continue;

        const childScriptAlias = instanceAlias.alias;
        if (!instancedParents.has(childScriptAlias)) {
          instancedParents.set(childScriptAlias, new Set());
        }
        instancedParents.get(childScriptAlias)!.add(resolvedParentType);
      }
    }
  }

  // Pass 4: Inherit scene trees for parent classes without their own scenes.
  // If BaseCharacter has no scene but Player and Enemy extend it, BaseCharacter
  // gets scene nodes = union of Player's and Enemy's scene trees.
  const childrenOf = new Map<string, Set<string>>();
  for (const [resPath, info] of scriptClassMap) {
    if (!info.extendsClassName) continue;
    const parentResPath = classNameToResPath.get(info.extendsClassName);
    if (!parentResPath) continue; // extends a Godot built-in or unknown class
    if (!childrenOf.has(parentResPath)) {
      childrenOf.set(parentResPath, new Set());
    }
    childrenOf.get(parentResPath)!.add(resPath);
  }

  // Iterate until stable (handles multi-level chains: A extends B extends C)
  let changed = true;
  while (changed) {
    changed = false;
    for (const [parentResPath, childResPaths] of childrenOf) {
      const existing = scriptData.get(parentResPath);
      if (existing && existing.sceneMaps.length > 0) continue; // already has scenes

      const inheritedMaps: Array<Map<string, string>> = [];
      for (const childResPath of childResPaths) {
        const childData = scriptData.get(childResPath);
        if (!childData || childData.sceneMaps.length === 0) continue;
        inheritedMaps.push(...childData.sceneMaps);
      }
      if (inheritedMaps.length === 0) continue;

      const data = ensureScriptData(parentResPath);
      if (!data) continue;
      data.sceneMaps.push(...inheritedMaps);
      changed = true;
    }
  }

  // Pass 5: Resolve children for scriptless scenes (e.g. Level2.tscn has Node root + Sprite2D child).
  // This builds scene maps so we can emit get_node overloads on synthetic instance types.
  for (const { resPath, scene } of parsedScenes) {
    const slData = scriptlessSceneData.get(resPath);
    if (!slData) continue;

    const children: ScriptNodeInfo['children'] = [];
    for (const [fullPath, nodeType] of scene.nodeTypes) {
      if (fullPath === '.') continue;
      const instanceResPath = scene.instancedNodes.get(fullPath);
      children.push({ path: fullPath, type: nodeType, instanceSceneResPath: instanceResPath });
    }
    for (const [fullPath, instanceResPath] of scene.instancedNodes) {
      if (fullPath === '.' || scene.nodeTypes.has(fullPath)) continue;
      children.push({ path: fullPath, type: '', instanceSceneResPath: instanceResPath });
    }
    if (children.length > 0) {
      slData.sceneMap = resolveScriptChildren(children, { alias: slData.alias });
    }
  }

  // Update resource entries for scriptless scenes: use synthetic alias if the type will be emitted
  // (has children or has known parent from instancedParents), otherwise use root Godot type
  for (const entry of resourceEntries) {
    if (entry.alias) continue;
    const slData = scriptlessSceneData.get(entry.resPath);
    if (slData) {
      const hasParent = instancedParents.has(slData.alias);
      const hasChildren = slData.sceneMap && slData.sceneMap.size > 0;
      if (hasParent || hasChildren) {
        entry.alias = slData.alias;
      } else {
        // No parent, no children — just use root Godot type
        entry.alias = slData.rootType;
      }
    }
  }

  // Parse autoloads from project.godot
  const autoloads = options.projectFile ? parseAutoloads(options.projectFile) : [];
  const autoloadDecls: Array<{ name: string; type: string }> = [];
  for (const autoload of autoloads) {
    if (autoload.resPath.endsWith('.gd')) {
      const aliasEntry = aliasMap.get(autoload.resPath);
      autoloadDecls.push({ name: autoload.name, type: aliasEntry ? aliasEntry.alias : 'Node' });
    } else if (autoload.resPath.endsWith('.tscn')) {
      const sceneEntry = resourceEntries.find((e) => e.resPath === autoload.resPath);
      autoloadDecls.push({ name: autoload.name, type: sceneEntry?.alias ?? 'Node' });
    } else {
      autoloadDecls.push({ name: autoload.name, type: 'Node' });
    }
  }

  // Find asset files and build resource entries for them
  const assetFiles = findAssetFiles(options.scenesDir, options.rootDir, options.ignore ?? []);
  const assetEntries: Array<{ resPath: string; type: string }> = [];
  for (const assetPath of assetFiles) {
    const resPath = `res://${relative(options.rootDir, assetPath).replace(/\\/g, '/')}`;
    const ext = extname(assetPath).toLowerCase();
    // For Godot resource files (.tres/.res), parse the gd_resource header to get the actual type
    const type = (ext === '.tres' || ext === '.res')
      ? parseGdResourceType(assetPath) ?? 'Resource'
      : ASSET_EXTENSION_MAP[ext] ?? 'Resource';
    assetEntries.push({ resPath, type });
  }

  // Build set of user-defined class types (these don't accept Tree generic parameter)
  // Only Godot built-in Node descendants have <Tree extends object = {}> from godot-docs generation
  const userClassTypes = new Set<string>();
  for (const [, entry] of aliasMap) {
    userClassTypes.add(entry.alias);
    if (entry.className !== '__CLASS__') {
      userClassTypes.add(entry.className);
    }
  }
  // Scriptless scene synthetic types also behave like user classes (no Tree generic)
  for (const [, slData] of scriptlessSceneData) {
    userClassTypes.add(slData.alias);
  }

  // Collect named classes for global declarations (skip __CLASS__)
  const globalClasses: Array<{ className: string; alias: string; commentPath: string }> = [];
  for (const [resPath, entry] of aliasMap) {
    if (entry.className === '__CLASS__') continue;
    const commentPath = resPath.replace(/^res:\/\//, '').replace(/\.gd$/, '.ts');
    globalClasses.push({ className: entry.className, alias: entry.alias, commentPath });
  }

  // Build lookup: script alias/className → scene nodes interface name
  // Used to annotate user-class children with {[__script_tree]: _XSceneNodes}
  const typeToSceneNodes = new Map<string, string>();
  for (const [, data] of scriptData) {
    if (data.sceneMaps.length === 0) continue;
    const nodesName = aliasToSceneNodesName(data.alias);
    typeToSceneNodes.set(data.alias, nodesName);
    if (data.className !== '__CLASS__') {
      typeToSceneNodes.set(data.className, nodesName);
    }
  }

  // ─── Per-File Emission ───────────────────────────────────

  const writtenFiles: string[] = [];
  mkdirSync(outputDir, { recursive: true });

  /** Write a file and track it */
  function writeOutput(fileName: string, content: string): void {
    const filePath = join(outputDir, fileName);
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, content);
    writtenFiles.push(filePath);
  }

  /** Build annotated children list from a raw children map.
   *  Intermediate (non-user-class) nodes get nested subtrees in their generic parameter,
   *  enabling chained get_node/get_parent on intermediate nodes.
   *  @param treeName - Name of the tree interface (e.g. "_LevelTscn_Tree") for parent references.
   *    When set, nested children use `TreeName["ParentPath"]` as [__parent] so chained
   *    get_node/get_parent on intermediate nodes resolves to the full annotated type. */
  function buildAnnotatedChildren(
    childrenMap: Map<string, string>,
    defaultParent: string,
    treeName?: string,
  ): Array<{ path: string; annotatedType: string }> {
    // Build lookup for parent resolution
    const childTypeMap = new Map<string, string>();
    for (const [path, type] of childrenMap) {
      childTypeMap.set(path, type);
    }

    /** Resolve the parent type for a child path.
     *  For nested paths with a treeName, uses tree member reference so the parent
     *  carries its full subtree (e.g. `_LevelTscn_Tree["UI"]` instead of raw `CanvasLayer`). */
    function resolveParent(path: string): string {
      if (path.startsWith('%') || !path.includes('/')) return defaultParent;
      const parentPath = path.substring(0, path.lastIndexOf('/'));
      if (treeName && childTypeMap.has(parentPath)) {
        // Use tree interface member reference for full annotated parent type (lazy lookup)
        return `${treeName}["${parentPath}"]`;
      }
      return resolveChildParentType(path, childTypeMap, defaultParent);
    }

    /** Recursively annotate a node, embedding its immediate children as subtree entries */
    function annotateNode(path: string, type: string): string {
      const parentType = resolveParent(path);
      // Find immediate children of this path (one level deeper, no further nesting)
      const prefix = path + '/';
      const immediateChildren: Array<{ name: string; annotatedType: string }> = [];
      for (const [childPath, childType] of childrenMap) {
        if (!childPath.startsWith(prefix)) continue;
        const rest = childPath.substring(prefix.length);
        // Only immediate children (no further '/' in the rest)
        if (rest.includes('/')) continue;
        immediateChildren.push({
          name: rest,
          annotatedType: annotateNode(childPath, childType),
        });
      }

      return annotateChildType(
        type, parentType, userClassTypes, typeToSceneNodes,
        immediateChildren.length > 0 ? immediateChildren : undefined,
      );
    }

    const result: Array<{ path: string; annotatedType: string }> = [];
    for (const [path, type] of childrenMap) {
      result.push({ path, annotatedType: annotateNode(path, type) });
    }
    return result;
  }

  /** Collect imports needed for annotated children (scene nodes for __script_tree, scriptless scene aliases) */
  function collectChildImports(
    childrenMap: Map<string, string>,
    outputFileName: string,
  ): {
    sceneNodeImports: Map<string, string>;
    scriptlessImports: Map<string, string>;
    /** Anonymous class aliases (__CLASS__) that need importing from source .ts files */
    anonClassImports: Map<string, { className: string; from: string }>;
  } {
    const sceneNodeImports = new Map<string, string>();
    const scriptlessImports = new Map<string, string>();
    const anonClassImports = new Map<string, { className: string; from: string }>();

    for (const [, rawType] of childrenMap) {
      for (const t of rawType.split(' | ')) {
        if (t === 'null') continue;
        // Check if it's a user class type that needs __script_tree import
        const sceneNodesName = typeToSceneNodes.get(t);
        if (sceneNodesName && !sceneNodeImports.has(sceneNodesName)) {
          // Find the script res:// path for this type
          for (const [scriptResPath, entry] of aliasMap) {
            if (entry.alias === t || entry.className === t) {
              const scriptOutputFile = scriptResPathToOutputFile(scriptResPath);
              sceneNodeImports.set(sceneNodesName, computeRelImport(outputFileName, scriptOutputFile));
              break;
            }
          }
        }
        // Check if it's an anonymous class alias (__CLASS__) — not globally declared,
        // needs explicit import from source .ts file
        for (const [scriptResPath, entry] of aliasMap) {
          if (entry.alias === t && entry.className === '__CLASS__' && !anonClassImports.has(t)) {
            const classInfo = scriptClassMap.get(scriptResPath);
            if (classInfo) {
              const tsImport = computeTsImport(outputDir, outputFileName, classInfo.tsAbsPath);
              anonClassImports.set(entry.alias, { className: entry.className, from: tsImport });
            }
            break;
          }
        }
        // Check if it's a scriptless scene alias — needs import from its .tscn.d.ts file
        for (const [sceneResPath, slInfo] of scriptlessSceneData) {
          if (slInfo.alias === t && !scriptlessImports.has(t)) {
            const sceneFile = sceneResPathToOutputFile(sceneResPath);
            scriptlessImports.set(t, computeRelImport(outputFileName, sceneFile));
          }
        }
      }
    }

    return { sceneNodeImports, scriptlessImports, anonClassImports };
  }

  // ── Emit per-scene .tscn.d.ts files ──

  for (const { resPath } of parsedScenes) {
    const rootScriptResPath = sceneRootScripts.get(resPath);
    const slData = scriptlessSceneData.get(resPath);

    if (slData) {
      // Scriptless scene — emit type alias
      const parentAliases = instancedParents.get(slData.alias);
      const hasParent = parentAliases && parentAliases.size > 0;
      const hasChildren = slData.sceneMap && slData.sceneMap.size > 0;
      if (!hasParent && !hasChildren) continue;

      const fileName = sceneResPathToOutputFile(resPath);
      const lines: string[] = ['// AUTO-GENERATED — do not edit manually.', ''];

      // Collect imports: parent aliases and child type aliases
      const importedAliases = new Set<string>();

      if (hasParent) {
        for (const pAlias of parentAliases!) {
          // Only import if it's a script alias (not a generic type like TileMap<...>)
          const pResPath = findResPathByAlias(pAlias);
          if (pResPath) {
            importedAliases.add(pAlias);
          }
        }
      }

      // Find all aliases used in children and parent annotations
      const allUsedAliases = new Set<string>();
      if (hasParent) {
        for (const pAlias of parentAliases!) {
          extractAliasesFromType(pAlias, allUsedAliases);
        }
      }
      if (slData.sceneMap) {
        for (const [, type] of slData.sceneMap) {
          extractAliasesFromType(type, allUsedAliases);
        }
      }

      // Emit imports for aliases
      for (const usedAlias of allUsedAliases) {
        const scriptResPath = findResPathByAlias(usedAlias);
        if (scriptResPath) {
          const classInfo = scriptClassMap.get(scriptResPath);
          const aliasEntry = aliasMap.get(scriptResPath);
          if (classInfo && aliasEntry) {
            const tsImport = computeTsImport(outputDir, fileName, classInfo.tsAbsPath);
            lines.push(`import type { ${aliasEntry.className} as ${aliasEntry.alias} } from "${tsImport}";`);
          }
        }
      }
      if (allUsedAliases.size > 0) lines.push('');

      // Build child type map
      const childTypeMap = new Map<string, string>();
      if (slData.sceneMap) {
        for (const [path, type] of slData.sceneMap) {
          childTypeMap.set(path, type);
        }
      }

      lines.push(`// Scriptless scene: ${slData.alias}`);
      lines.push(`export type ${slData.alias} = ${slData.rootType}<{`);

      if (hasParent) {
        const parentType = [...parentAliases!].join(' | ');
        lines.push(`  [__parent]: ${parentType};`);
      }

      if (slData.sceneMap && slData.sceneMap.size > 0) {
        const annotated = buildAnnotatedChildren(slData.sceneMap, slData.alias);
        // [__children] tuple for scriptless scenes — inline types (no named interface to reference)
        const immediateChildTypes: string[] = [];
        for (const { path, annotatedType } of annotated) {
          if (!path.includes('/') && !path.startsWith('%')) {
            immediateChildTypes.push(annotatedType);
          }
        }
        if (immediateChildTypes.length > 0) {
          lines.push(`  [__children]: [${immediateChildTypes.join(', ')}];`);
        }
        for (const { path, annotatedType } of annotated) {
          lines.push(`  "${path}": ${annotatedType};`);
        }
      }

      lines.push('}>');
      lines.push('');

      // declare global: GodotResources + _XParents for embedded scenes
      const globalLines: string[] = [];

      const resourceEntry = resourceEntries.find(e => e.resPath === resPath);
      if (resourceEntry) {
        globalLines.push('  interface GodotResources {');
        globalLines.push(`    "${resPath}": PackedScene<${resourceEntry.alias ?? slData.rootType}>;`);
        globalLines.push('  }');
      }

      // _XParents entries for embedded scene scripts (TileMap sub_resource chains)
      const scene = parsedScenes.find(p => p.resPath === resPath)?.scene;
      if (scene) {
        for (const [, { sceneResPaths }] of scene.embeddedScenes) {
          for (const embeddedResPath of sceneResPaths) {
            const embeddedScriptResPath = sceneRootScripts.get(embeddedResPath);
            if (embeddedScriptResPath) {
              const embeddedAlias = aliasMap.get(embeddedScriptResPath);
              if (embeddedAlias) {
                const parentsName = aliasToParentsName(embeddedAlias.alias);
                globalLines.push(`  interface ${parentsName} { "${resPath}": ${slData.alias}; }`);
              }
            }
          }
        }
      }

      if (globalLines.length > 0) {
        lines.push('declare global {');
        lines.push(...globalLines);
        lines.push('}');
        lines.push('');
      }

      lines.push('export {};');
      lines.push('');
      writeOutput(fileName, lines.join('\n'));
      continue;
    }

    if (!rootScriptResPath) continue;

    // Regular scene with root script
    const childrenMap = perSceneRootTree.get(resPath);
    const rootAliasEntry = aliasMap.get(rootScriptResPath);
    if (!rootAliasEntry) continue;

    const fileName = sceneResPathToOutputFile(resPath);
    const treeName = sceneResPathToTreeName(resPath);
    const lines: string[] = ['// AUTO-GENERATED — do not edit manually.', ''];

    // Import root script alias
    const rootClassInfo = scriptClassMap.get(rootScriptResPath);
    if (rootClassInfo) {
      const tsImport = computeTsImport(outputDir, fileName, rootClassInfo.tsAbsPath);
      lines.push(`import type { ${rootAliasEntry.className} as ${rootAliasEntry.alias} } from "${tsImport}";`);
    }

    // Collect and emit imports for __script_tree references, scriptless scene aliases,
    // and anonymous class aliases (__CLASS__) that aren't globally declared
    if (childrenMap && childrenMap.size > 0) {
      const { sceneNodeImports, scriptlessImports, anonClassImports } = collectChildImports(
        childrenMap,
        fileName,
      );
      for (const [name, from] of sceneNodeImports) {
        lines.push(`import type { ${name} } from "${from}";`);
      }
      for (const [name, from] of scriptlessImports) {
        lines.push(`import type { ${name} } from "${from}";`);
      }
      for (const [alias, { className, from }] of anonClassImports) {
        lines.push(`import type { ${className} as ${alias} } from "${from}";`);
      }
    }

    lines.push('');

    // Emit tree interface with all entries (including flat paths for nested children).
    // Flat paths are needed for _GDGetNodeByPath direct key lookup — removing them
    // forces _GDGetItemTree inference on self-referencing interface members, which
    // causes TypeScript to bail on circular type resolution.
    if (childrenMap && childrenMap.size > 0) {
      const annotated = buildAnnotatedChildren(childrenMap, rootAliasEntry.alias, treeName);
      lines.push(`export interface ${treeName} {`);
      // [__children] is NOT emitted on per-scene trees — it goes on the merged SceneNodes
      // interface only, to avoid conflicts when SceneNodes extends multiple scene trees
      for (const { path, annotatedType } of annotated) {
        lines.push(`  "${path}": ${annotatedType};`);
      }
      lines.push('}');
    } else {
      lines.push(`export interface ${treeName} {}`);
    }
    lines.push('');

    // declare global block: GodotResources + _XParents entries for instanced scripts
    const globalLines: string[] = [];

    // GodotResources for this scene
    const resourceEntry = resourceEntries.find(e => e.resPath === resPath);
    if (resourceEntry) {
      globalLines.push('  interface GodotResources {');
      globalLines.push(`    "${resPath}": PackedScene<${resourceEntry.alias ?? 'Node'}>;`);
      globalLines.push('  }');
    }

    // _XParents entries for scripts instanced in this scene
    // Find which scripts are instanced as children and add parent entries
    const scene = parsedScenes.find(p => p.resPath === resPath)?.scene;
    if (scene) {
      for (const [childPath, instanceResPath] of scene.instancedNodes) {
        if (childPath === '.') continue;
        const instanceScriptResPath = sceneRootScripts.get(instanceResPath);
        if (instanceScriptResPath) {
          const instanceAlias = aliasMap.get(instanceScriptResPath);
          if (instanceAlias) {
            const parentsName = aliasToParentsName(instanceAlias.alias);
            globalLines.push(`  interface ${parentsName} { "${resPath}": ${rootAliasEntry.alias}; }`);
          }
        }
        // Also check scriptless scenes
        const slSceneData = scriptlessSceneData.get(instanceResPath);
        if (slSceneData) {
          const parentsName = aliasToParentsName(slSceneData.alias);
          globalLines.push(`  interface ${parentsName} { "${resPath}": ${rootAliasEntry.alias}; }`);
        }
      }
      // _XParents entries for embedded scene scripts (TileMap sub_resource chains)
      for (const [, { sceneResPaths }] of scene.embeddedScenes) {
        for (const embeddedResPath of sceneResPaths) {
          const embeddedScriptResPath = sceneRootScripts.get(embeddedResPath);
          if (embeddedScriptResPath) {
            const embeddedAlias = aliasMap.get(embeddedScriptResPath);
            if (embeddedAlias) {
              // Parent type comes from instancedParents (set in Pass 3)
              const parentTypes = instancedParents.get(embeddedAlias.alias);
              if (parentTypes) {
                for (const pt of parentTypes) {
                  const parentsName = aliasToParentsName(embeddedAlias.alias);
                  globalLines.push(`  interface ${parentsName} { "${resPath}": ${pt}; }`);
                }
              }
            }
          }
        }
      }
    }

    if (globalLines.length > 0) {
      lines.push('declare global {');
      lines.push(...globalLines);
      lines.push('}');
      lines.push('');
    }

    lines.push('export {};');
    lines.push('');
    writeOutput(fileName, lines.join('\n'));
  }

  // ── Emit per-script .d.ts files ──

  for (const [scriptResPath, aliasEntry] of aliasMap) {
    const classInfo = scriptClassMap.get(scriptResPath);
    if (!classInfo) continue;

    const fileName = scriptResPathToOutputFile(scriptResPath);
    const lines: string[] = ['// AUTO-GENERATED — do not edit manually.', ''];

    // Import script class alias
    const tsImport = computeTsImport(outputDir, fileName, classInfo.tsAbsPath);
    lines.push(`import type { ${aliasEntry.className} as ${aliasEntry.alias} } from "${tsImport}";`);

    // Get scene data for this script
    const data = scriptData.get(scriptResPath);
    const hasScenes = data && data.sceneMaps.length > 0;
    const nodesName = aliasToSceneNodesName(aliasEntry.alias);
    const parentsName = aliasToParentsName(aliasEntry.alias);

    // Import scene tree interfaces
    const rootScenes = scriptToRootScenes.get(scriptResPath) ?? [];
    const sceneTreeImports: Array<{ treeName: string; from: string }> = [];

    for (const sceneResPath of rootScenes) {
      const treeName = sceneResPathToTreeName(sceneResPath);
      const sceneFile = sceneResPathToOutputFile(sceneResPath);
      sceneTreeImports.push({ treeName, from: computeRelImport(fileName, sceneFile) });
    }

    for (const imp of sceneTreeImports) {
      lines.push(`import type { ${imp.treeName} } from "${imp.from}";`);
    }
    lines.push('');

    // Emit scene nodes interface
    if (hasScenes) {
      if (sceneTreeImports.length === 1) {
        // Single scene: safe to use extends (no conflicts possible)
        const treeName = sceneTreeImports[0]!.treeName;
        const mergedChildrenTuple = buildMergedChildrenTuple(
          data!.sceneMaps, [treeName], rootScenes,
        );
        if (mergedChildrenTuple) {
          lines.push(`export interface ${nodesName} extends ${treeName} {`);
          lines.push(`  ${mergedChildrenTuple}`);
          lines.push('}');
        } else {
          lines.push(`export interface ${nodesName} extends ${treeName} {}`);
        }
      } else if (sceneTreeImports.length > 1) {
        // Multiple scenes: use tree interface lookups to avoid extends conflicts
        // when different scenes have different types for the same node name
        const treeNamesList = sceneTreeImports.map(i => i.treeName);
        const mergedLookups = buildMergedTreeLookups(data!.sceneMaps, treeNamesList);
        lines.push(`export interface ${nodesName} {`);
        const mergedChildrenTuple = buildMergedChildrenTuple(
          data!.sceneMaps, treeNamesList, rootScenes,
        );
        if (mergedChildrenTuple) lines.push(`  ${mergedChildrenTuple}`);
        for (const { path, typeExpr } of mergedLookups) {
          lines.push(`  "${path}": ${typeExpr};`);
        }
        lines.push('}');
      } else {
        // Fallback: inline merged children (sub-script occurrences or edge cases)
        const mergedChildren = mergeSceneChildren(data!.sceneMaps);
        const mergedMap = new Map<string, string>();
        for (const { path, type } of mergedChildren) {
          mergedMap.set(path, type);
        }
        const annotated = buildAnnotatedChildren(mergedMap, aliasEntry.alias, nodesName);
        lines.push(`export interface ${nodesName} {`);
        const childrenLine = buildChildrenTupleLine(nodesName, annotated);
        if (childrenLine) lines.push(childrenLine);
        for (const { path, annotatedType } of annotated) {
          lines.push(`  "${path}": ${annotatedType};`);
        }
        lines.push('}');
      }
      lines.push('');

      // Module augmentation
      const moduleImport = computeTsImport(outputDir, fileName, classInfo.tsAbsPath)
        .replace(/\.js$/, '.ts');
      lines.push(`declare module "${moduleImport}" {`);
      lines.push(`  interface ${aliasEntry.className} {`);
      lines.push(`    get_node<P extends string & _GDGetTreePaths<${nodesName}>>(path: P): _GDGetNode<${nodesName}, P>;`);
      lines.push(`    get_node(path: string): Node;`);
      lines.push(`    get_node_or_null<P extends string & _GDGetTreePaths<${nodesName}>>(path: P): _GDGetNodeOrNull<${nodesName}, P>;`);
      lines.push(`    get_node_or_null(path: string): Node | null;`);
      lines.push(`    has_node<P extends string & _GDGetTreePaths<${nodesName}>>(path: P): true;`);
      lines.push(`    has_node(path: string): boolean;`);
      lines.push(`    get_child<Idx extends number & _GDChildIndices<_GDGetChildren<${nodesName}>>>(idx: Idx): _GDGetChild<${nodesName}, Idx>;`);
      lines.push(`    get_child(idx: int, include_internal?: boolean): Node;`);
      lines.push(`    get_parent(): _GDParentType<${parentsName}>;`);
      lines.push('  }');
      lines.push('}');
      lines.push('');
    }

    // declare global: class declaration + _XParents base + GodotResources for .gd
    lines.push('declare global {');
    if (aliasEntry.className !== '__CLASS__') {
      lines.push(`  // From: ${scriptResPath.replace(/^res:\/\//, '').replace(/\.gd$/, '.ts')}`);
      lines.push(`  class ${aliasEntry.className} extends ${aliasEntry.alias} {}`);
    }
    if (hasScenes) {
      lines.push(`  interface ${parentsName} {}`);
    }
    lines.push('  interface GodotResources {');
    lines.push(`    "${scriptResPath}": typeof ${aliasEntry.alias};`);
    lines.push('  }');
    lines.push('}');
    lines.push('');
    lines.push('export {};');
    lines.push('');
    writeOutput(fileName, lines.join('\n'));
  }

  // ── Emit _index.d.ts (assets + autoloads) ──

  {
    const lines: string[] = ['// AUTO-GENERATED — do not edit manually.', ''];

    // Import aliases needed for autoloads
    for (const decl of autoloadDecls) {
      // Find the alias's script to import it
      for (const [scriptResPath, aliasEntry] of aliasMap) {
        if (aliasEntry.alias === decl.type) {
          const classInfo = scriptClassMap.get(scriptResPath);
          if (classInfo) {
            const tsImport = computeTsImport(outputDir, '_index.d.ts', classInfo.tsAbsPath);
            lines.push(`import type { ${aliasEntry.className} as ${aliasEntry.alias} } from "${tsImport}";`);
          }
          break;
        }
      }
    }
    if (autoloadDecls.length > 0) lines.push('');

    const hasAssets = assetEntries.length > 0;
    const hasAutoloads = autoloadDecls.length > 0;

    if (hasAssets || hasAutoloads) {
      lines.push('declare global {');

      if (hasAssets) {
        lines.push('  interface GodotResources {');
        for (const asset of assetEntries) {
          lines.push(`    "${asset.resPath}": ${asset.type};`);
        }
        lines.push('  }');
      }

      if (hasAutoloads) {
        lines.push('  // Autoload singletons from project.godot');
        for (const decl of autoloadDecls) {
          lines.push(`  const ${decl.name}: ${decl.type};`);
        }
      }

      lines.push('}');
      lines.push('');
    }

    lines.push('export {};');
    lines.push('');
    writeOutput('_index.d.ts', lines.join('\n'));
  }

  return writtenFiles;
}

/**
 * Merges children from multiple scene occurrences of the same script.
 * - Collects all unique paths across all scenes
 * - For each path, builds a union of all distinct types seen
 * - If a path is missing from at least one scene, appends `| null`
 */
function mergeSceneChildren(
  sceneMaps: Array<Map<string, string>>,
): Array<{ path: string; type: string }> {
  const totalScenes = sceneMaps.length;

  // Collect all paths and, for each, the set of types and how many scenes contain it
  const pathInfo = new Map<string, { types: Set<string>; count: number }>();
  for (const sceneMap of sceneMaps) {
    for (const [path, type] of sceneMap) {
      let info = pathInfo.get(path);
      if (!info) {
        info = { types: new Set(), count: 0 };
        pathInfo.set(path, info);
      }
      info.types.add(type);
      info.count++;
    }
  }

  const result: Array<{ path: string; type: string }> = [];
  for (const [path, info] of pathInfo) {
    const types = [...info.types];
    const nullable = info.count < totalScenes;
    let type = types.join(' | ');
    if (nullable) {
      type += ' | null';
    }
    result.push({ path, type });
  }
  return result;
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
