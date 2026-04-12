import type { ParseSceneResult } from './scene-parser.ts';
import { nodePathToTypeName, sceneResPathToTreeName } from './scene-utils.ts';

// ─── Tree Node Structure ────────────────────────────────────

export interface TreeNodeInfo {
  name: string;
  /** Full path relative to scene root, e.g. "Sprite2D/AnimationPlayer" */
  fullPath: string;
  /** Godot class type name */
  type: string;
  /** Full path of parent node, or null for root */
  parentPath: string | null;
  /** Direct children */
  children: TreeNodeInfo[];
  /** Whether this node instances another scene */
  isInstanced: boolean;
  /** res:// path of instanced scene */
  instanceSceneResPath?: string;
  /** Whether this node has unique_name_in_owner */
  uniqueInOwner?: boolean;
  /** res:// path of GDScript attached to this node, if any */
  scriptResPath?: string;
}

/**
 * Build a tree structure from the flat node list returned by parseScene().
 */
export function buildNodeTree(
  sceneData: ParseSceneResult,
): TreeNodeInfo {
  const { nodeTypes, instancedNodes } = sceneData;

  // Find root node type
  const rootType = nodeTypes.get('.') ?? 'Node';

  const root: TreeNodeInfo = {
    name: '',
    fullPath: '.',
    type: rootType,
    parentPath: null,
    children: [],
    isInstanced: false,
  };

  // Build map of full path -> TreeNodeInfo
  const nodeMap = new Map<string, TreeNodeInfo>();
  nodeMap.set('.', root);

  // Collect all non-root nodes from the scene scripts' children (for the root script)
  const rootScript = sceneData.scripts.find(s => s.nodePath === '.');
  if (!rootScript) {
    // No root script — use nodeTypes to build tree
    for (const [fullPath, type] of nodeTypes) {
      if (fullPath === '.') continue;
      const parts = fullPath.split('/');
      const name = parts[parts.length - 1]!;
      const parentPath = parts.length === 1 ? '.' : parts.slice(0, -1).join('/');
      const instanceResPath = instancedNodes.get(fullPath);

      const node: TreeNodeInfo = {
        name,
        fullPath,
        type,
        parentPath,
        children: [],
        isInstanced: !!instanceResPath,
        instanceSceneResPath: instanceResPath,
      };
      nodeMap.set(fullPath, node);
    }
  } else {
    // Build from root script's children
    for (const child of rootScript.children) {
      const parts = child.path.split('/');
      const name = parts[parts.length - 1]!;
      const parentPath = parts.length === 1 ? '.' : parts.slice(0, -1).join('/');

      // Skip unique name entries (start with %)
      if (name.startsWith('%')) continue;

      const node: TreeNodeInfo = {
        name,
        fullPath: child.path,
        type: child.type,
        parentPath,
        children: [],
        isInstanced: !!child.instanceSceneResPath,
        instanceSceneResPath: child.instanceSceneResPath,
      };
      nodeMap.set(child.path, node);
    }
  }

  // Check for unique names from nodeTypes
  // We need to re-scan the original parsed nodes for uniqueInOwner
  // Since we don't have that info in rootScript.children, use nodeTypes + instancedNodes

  // Attach scriptResPath for any node that has a script (other than root, which
  // is handled separately via rootScriptResPath in the emit step).
  for (const script of sceneData.scripts) {
    if (script.nodePath === '.') continue;
    const node = nodeMap.get(script.nodePath);
    if (node) node.scriptResPath = script.scriptResPath;
  }

  // Link children to parents
  for (const [path, node] of nodeMap) {
    if (path === '.') continue;
    const parent = nodeMap.get(node.parentPath!);
    if (parent) {
      parent.children.push(node);
    }
  }

  return root;
}

/**
 * Collect all descendant paths relative to a given node (non-instanced subtrees only).
 * Returns flat path -> type name pairs for the node's type properties.
 */
export function collectDescendantPaths(
  node: TreeNodeInfo,
  sceneAlias: string,
  instancedSceneTreeNames: Map<string, string>,
  extendedInstancedNodes: Set<string>,
): Array<{ relativePath: string; typeName: string }> {
  const paths: Array<{ relativePath: string; typeName: string }> = [];

  function walk(current: TreeNodeInfo, prefix: string) {
    for (const child of current.children) {
      const childRelPath = prefix ? `${prefix}/${child.name}` : child.name;
      let typeName: string;
      if (child.isInstanced && child.instanceSceneResPath) {
        if (extendedInstancedNodes.has(child.fullPath)) {
          typeName = nodePathToTypeName(sceneAlias, child.fullPath);
        } else {
          typeName = instancedSceneTreeNames.get(child.instanceSceneResPath) ?? sceneResPathToTreeName(child.instanceSceneResPath);
        }
      } else {
        typeName = nodePathToTypeName(sceneAlias, child.fullPath);
      }
      paths.push({ relativePath: childRelPath, typeName });

      // Don't recurse into instanced scenes (they handle their own subtrees via __node_extends)
      if (!child.isInstanced) {
        walk(child, childRelPath);
      }
    }
  }

  walk(node, '');
  return paths;
}
