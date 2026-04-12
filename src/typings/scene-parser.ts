import { readFileSync } from 'fs';
import { GodotResourceParser } from '../parser/godot-resource/index.ts';
import { SyntaxType, type SyntaxNode } from '../parser/godot-resource/types.ts';

// ─── Interfaces ────────────────────────────────────────────

export interface SceneNode {
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
  /** Group names from `groups = ["name1", "name2"]` property */
  groups?: string[];
  /** AST section node (for post-processing sub_resource chains) */
  section?: SyntaxNode;
}

export interface ScriptNodeInfo {
  /** res:// path to the .gd script */
  scriptResPath: string;
  /** Full node path within the scene (e.g. "Ball", "." for root) */
  nodePath: string;
  /** Child nodes with paths relative to this script node */
  children: Array<{ path: string; type: string; instanceSceneResPath?: string }>;
}

export interface SceneConnection {
  /** Signal name (e.g. "area_entered") */
  signal: string;
  /** Emitter node path (e.g. "Area2D", "tileset_objects/LevelExit") */
  fromPath: string;
  /** Receiver node path (e.g. ".", "tileset_objects/LevelExit") */
  toPath: string;
  /** Handler method name (e.g. "_on_area_entered") */
  method: string;
}

export interface ParseSceneResult {
  filePath: string;
  scripts: ScriptNodeInfo[];
  rootScript?: { scriptResPath: string };
  /** Name of the root node (e.g. "Level", "Player") */
  rootNodeName: string;
  /** When root node instances another scene (inherited scene), this is the instanced scene's res:// path. */
  inheritedSceneResPath?: string;
  connections: SceneConnection[];
  /** Map of full node paths to their Godot type (e.g. "Area2D" → "Area2D") */
  nodeTypes: Map<string, string>;
  /** Map of full node paths to instanced scene res:// paths */
  instancedNodes: Map<string, string>;
  /** Scenes embedded via sub_resource chains (TileMap tiles, etc.) — parentNodePath → { parentType, sceneResPaths } */
  embeddedScenes: Map<string, { parentType: string; sceneResPaths: string[] }>;
  /** Map of group name → array of { nodePath, nodeType, scriptResPath?, instanceSceneResPath? } */
  nodeGroups: Map<string, Array<{ nodePath: string; nodeType: string; scriptResPath?: string; instanceSceneResPath?: string }>>;
}

// ─── Shared parser instance ────────────────────────────────

/** Shared parser instance for all godot-resource parsing */
export const resourceParser = new GodotResourceParser();

// ─── Section helpers ───────────────────────────────────────

/**
 * Extract a named attribute value from a section's attribute children.
 * Strips surrounding quotes from string values.
 */
export function getSectionAttr(section: SyntaxNode, name: string): string | undefined {
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
export function getSectionProp(section: SyntaxNode, name: string): string | undefined {
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
 * Extract a string array from a section attribute or property.
 * Checks attributes first (e.g. `[node groups=["a", "b"]]`),
 * then properties (e.g. `groups = ["a", "b"]`).
 */
export function getSectionStringArray(section: SyntaxNode, name: string): string[] {
  for (const child of section.namedChildren) {
    // Check attributes (on section header line)
    if (child.type === SyntaxType.Attribute) {
      const parts = child.namedChildren;
      if (parts.length >= 2 && parts[0]!.type === SyntaxType.Identifier && parts[0]!.text === name) {
        const val = parts[1]!;
        if (val.type === SyntaxType.Array) {
          return val.namedChildren
            .filter(c => c.type === SyntaxType.String)
            .map(c => c.text.slice(1, -1));
        }
      }
    }
    // Check properties (in section body)
    if (child.type === SyntaxType.Property) {
      const parts = child.namedChildren;
      if (parts.length >= 2 && parts[0]!.type === SyntaxType.Path && parts[0]!.text === name) {
        const val = parts[1]!;
        if (val.type === SyntaxType.Array) {
          return val.namedChildren
            .filter(c => c.type === SyntaxType.String)
            .map(c => c.text.slice(1, -1));
        }
      }
    }
  }
  return [];
}

/**
 * Extract the first argument string from a Constructor node like ExtResource("id").
 * Returns the unquoted string, or undefined.
 */
export function getConstructorFirstArg(node: SyntaxNode): string | undefined {
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
export function getSectionExtResource(section: SyntaxNode, propName: string): string | undefined {
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
 * Chain: TileMap node -> tile_set = SubResource("TileSet_xxx")
 *   -> TileSet sub_resource -> sources/N = SubResource("TileSetScenesCollectionSource_xxx")
 *     -> TileSetScenesCollectionSource -> scenes/N/scene = ExtResource("id")
 */
export function collectTileMapScenes(
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

// ─── Main parseScene function ──────────────────────────────

/**
 * Parses a .tscn file and extracts script attachments with their child nodes.
 * Each node with a script gets its own entry with relative child paths.
 */
export function parseScene(filePath: string): ParseSceneResult | null {
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

      // Check for groups = ["group1", "group2"]
      const groups = getSectionStringArray(section, 'groups');

      if (name) {
        nodes.push({ name, type: type ?? '', parent: parent ?? '', scriptExtId, instanceExtId, uniqueInOwner, groups: groups.length > 0 ? groups : undefined, section });
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

  // Build node type map (full path -> Godot type)
  const nodeTypes = new Map<string, string>();
  for (const node of nodes) {
    if (!node.type) continue;
    const fullPath =
      node.parent === '' ? '.' : node.parent === '.' ? node.name : `${node.parent}/${node.name}`;
    nodeTypes.set(fullPath, node.type);
  }

  // Build instanced nodes map (full path -> instanced scene res:// path)
  const instancedNodes = new Map<string, string>();
  for (const node of nodes) {
    if (!node.instanceExtId) continue;
    const extRes = extResources.get(node.instanceExtId);
    if (!extRes || extRes.type !== 'PackedScene') continue;
    const fullPath =
      node.parent === '' ? '.' : node.parent === '.' ? node.name : `${node.parent}/${node.name}`;
    instancedNodes.set(fullPath, extRes.path);
  }

  // Build node groups map (group name -> nodes in that group)
  const nodeGroups = new Map<string, Array<{ nodePath: string; nodeType: string; scriptResPath?: string; instanceSceneResPath?: string }>>();
  for (const node of nodes) {
    if (!node.groups || node.groups.length === 0) continue;
    const fullPath =
      node.parent === '' ? '.' : node.parent === '.' ? node.name : `${node.parent}/${node.name}`;

    // Resolve script res path if this node has a script
    let scriptResPath: string | undefined;
    if (node.scriptExtId) {
      const extRes = extResources.get(node.scriptExtId);
      if (extRes && extRes.type === 'Script' && extRes.path.endsWith('.gd')) {
        scriptResPath = extRes.path;
      }
    }

    // Resolve instanced scene res path
    let instanceSceneResPath: string | undefined;
    if (node.instanceExtId) {
      const extRes = extResources.get(node.instanceExtId);
      if (extRes && extRes.type === 'PackedScene') {
        instanceSceneResPath = extRes.path;
      }
    }

    for (const group of node.groups) {
      let entries = nodeGroups.get(group);
      if (!entries) {
        entries = [];
        nodeGroups.set(group, entries);
      }
      entries.push({ nodePath: fullPath, nodeType: node.type, scriptResPath, instanceSceneResPath });
    }
  }

  const rootNodeName = rootNode?.name ?? '';

  return { filePath, scripts, rootScript, rootNodeName, inheritedSceneResPath, connections, nodeTypes, instancedNodes, embeddedScenes, nodeGroups };
}
