import { existsSync } from 'fs';
import { join, relative } from 'path';
import type { ParseSceneResult, SceneConnection } from './scene-parser.ts';
import type { TreeNodeInfo } from './scene-tree.ts';
import type { AutoloadEntry } from './scene-utils.ts';
import { buildNodeTree, collectDescendantPaths } from './scene-tree.ts';
import {
  sceneResPathToAlias,
  sceneResPathToTreeName,
  sceneResPathToParentsInterfaceName,
  scriptResPathToTreesInterfaceName,
  nodePathToTypeName,
} from './scene-utils.ts';

// ─── Helpers ────────────────────────────────────────────────

/**
 * Compute a relative path from outputDir to the package's typings/index.d.ts.
 * Walks up from outputDir looking for node_modules. Returns undefined if not found.
 */
export function resolvePackageTypingsRef(outputDir: string): string | undefined {
  let dir = outputDir;
  for (let i = 0; i < 10; i++) {
    const candidate = join(dir, 'node_modules', 'typescript-to-gdscript', 'typings', 'index.d.ts');
    if (existsSync(candidate)) {
      return relative(outputDir, candidate).replace(/\\/g, '/');
    }
    const parent = join(dir, '..');
    if (parent === dir) break;
    dir = parent;
  }
  return undefined;
}

// ─── Content Generators ─────────────────────────────────────

/**
 * Generate .tscn.d.ts file content for a single scene.
 */
export function generateSceneTypingContent(
  sceneResPath: string,
  sceneData: ParseSceneResult,
  uniqueNameNodes: Set<string>,
  connections?: ResolvedConnection[],
): string {
  const lines: string[] = [];
  lines.push('// AUTO-GENERATED — do not edit manually.\n');

  const alias = sceneResPathToAlias(sceneResPath);
  const treeName = sceneResPathToTreeName(sceneResPath);
  const parentsInterface = sceneResPathToParentsInterfaceName(sceneResPath);

  const root = buildNodeTree(sceneData);

  // Collect instanced scenes. Two kinds:
  // 1. Plain instanced scenes (no extra children) -> GodotSceneTrees lookup
  // 2. Extended instanced scenes (has extra children added by parent scene) -> local __node_extends type
  const instancedSceneTreeNames = new Map<string, string>();
  // Set of instanced node fullPaths that have extra children (need __node_extends)
  const extendedInstancedNodes = new Set<string>();

  function findInstancedScenes(node: TreeNodeInfo) {
    for (const child of node.children) {
      if (child.isInstanced && child.instanceSceneResPath) {
        if (child.children.length > 0) {
          // Instanced scene with extra children added -> needs local extension type
          extendedInstancedNodes.add(child.fullPath);
        } else if (!instancedSceneTreeNames.has(child.instanceSceneResPath)) {
          instancedSceneTreeNames.set(
            child.instanceSceneResPath,
            sceneResPathToTreeName(child.instanceSceneResPath),
          );
        }
      }
      if (!child.isInstanced) {
        findInstancedScenes(child);
      }
    }
  }
  findInstancedScenes(root);

  /** Get the type name for a child node, handling instanced/extended cases */
  function childTypeName(child: TreeNodeInfo): string {
    if (child.isInstanced && child.instanceSceneResPath) {
      if (extendedInstancedNodes.has(child.fullPath)) {
        return nodePathToTypeName(alias, child.fullPath);
      }
      return instancedSceneTreeNames.get(child.instanceSceneResPath) ?? sceneResPathToTreeName(child.instanceSceneResPath);
    }
    return nodePathToTypeName(alias, child.fullPath);
  }

  // Collect all non-instanced nodes AND nodes under extended instanced scenes
  const emittableNodes: TreeNodeInfo[] = [];
  function collectEmittable(node: TreeNodeInfo) {
    for (const child of node.children) {
      if (child.isInstanced && !extendedInstancedNodes.has(child.fullPath)) {
        continue; // Plain instanced: skip, handled as GodotSceneTrees lookup
      }
      collectEmittable(child);
      emittableNodes.push(child);
    }
  }
  collectEmittable(root);

  // Build unique name entries and emit shared type (available from every subtree via intersection)
  const uniqueEntries: Array<{ name: string; typeName: string }> = [];
  {
    const allRootDescendants = collectDescendantPaths(root, alias, instancedSceneTreeNames, extendedInstancedNodes);
    for (const uniqueName of uniqueNameNodes) {
      const match = allRootDescendants.find(p => {
        const parts = p.relativePath.split('/');
        return parts[parts.length - 1] === uniqueName;
      });
      if (match) {
        uniqueEntries.push({ name: uniqueName, typeName: match.typeName });
      }
    }
  }
  const uniqueNodesTypeName = `${alias}_UniqueNodes`;
  const hasUniqueNodes = uniqueEntries.length > 0;
  if (hasUniqueNodes) {
    lines.push(`type ${uniqueNodesTypeName} = {`);
    for (const { name, typeName: uTypeName } of uniqueEntries) {
      lines.push(`  "%${name}": ${uTypeName};`);
    }
    lines.push(`};\n`);
  }
  // Helper to emit __node_unique property on a node type
  const uniqueProp = hasUniqueNodes ? `  [__node_unique]: ${uniqueNodesTypeName};` : '';

  for (const node of emittableNodes) {
    const typeName = nodePathToTypeName(alias, node.fullPath);
    const parentTypeName = node.parentPath === '.'
      ? treeName
      : nodePathToTypeName(alias, node.parentPath!);
    const isExtendedInstanced = extendedInstancedNodes.has(node.fullPath);

    const childTupleEntries = node.children.map(c => childTypeName(c));
    const descendantPaths = collectDescendantPaths(node, alias, instancedSceneTreeNames, extendedInstancedNodes);

    if (isExtendedInstanced) {
      const baseResPath = node.instanceSceneResPath!;
      lines.push(`type ${typeName} = {`);
      lines.push(`  [__node_extends]: GodotSceneTrees["${baseResPath}"];`);
      lines.push(`  [__node_root]: "${node.name}";`);
      lines.push(`  [__node_type]: _GDTreeGetType<GodotSceneTrees["${baseResPath}"]>;`);
      lines.push(`  [__node_parent]: ${parentTypeName};`);
      lines.push(`  [__node_children]: [${childTupleEntries.join(', ')}];`);
    } else {
      const nodeTypeExpr = node.scriptResPath
        ? `_GDGetInterfaceNode<GodotScripts, "${node.scriptResPath}">`
        : node.type;
      lines.push(`type ${typeName} = {`);
      lines.push(`  [__node_type]: ${nodeTypeExpr};`);
      lines.push(`  [__node_parent]: ${parentTypeName};`);
      lines.push(`  [__node_children]: [${childTupleEntries.join(', ')}];`);
    }
    lines.push(uniqueProp);
    for (const { relativePath, typeName: childType } of descendantPaths) {
      lines.push(`  "${relativePath}": ${childType};`);
    }
    lines.push(`};\n`);
  }

  // Emit plain instanced scene tree type aliases (via GodotSceneTrees lookup)
  for (const [instanceResPath, localTreeName] of instancedSceneTreeNames) {
    lines.push(`type ${localTreeName} = GodotSceneTrees["${instanceResPath}"];\n`);
  }

  // Emit root _Tree type
  const rootScriptResPath = sceneData.rootScript?.scriptResPath;
  const inheritedSceneResPath = sceneData.inheritedSceneResPath;
  const rootNodeType = rootScriptResPath
    ? `_GDGetInterfaceNode<GodotScripts, "${rootScriptResPath}">`
    : inheritedSceneResPath
      ? `_GDTreeGetType<GodotSceneTrees["${inheritedSceneResPath}"]>`
      : (sceneData.nodeTypes.get('.') ?? 'Node');

  const rootChildTupleEntries = root.children.map(c => childTypeName(c));

  const rootDescendantPaths = collectDescendantPaths(root, alias, instancedSceneTreeNames, extendedInstancedNodes);

  lines.push(`type ${treeName} = {`);
  if (inheritedSceneResPath) {
    lines.push(`  [__node_extends]: GodotSceneTrees["${inheritedSceneResPath}"];`);
  }
  lines.push(`  [__node_root]: "${sceneData.rootNodeName}";`);
  lines.push(`  [__node_type]: ${rootNodeType};`);
  lines.push(`  [__node_parent]: _GDGetInterfaceParent<${parentsInterface}>;`);
  lines.push(`  [__node_children]: [${rootChildTupleEntries.join(', ')}];`);
  lines.push(uniqueProp);
  for (const { relativePath, typeName } of rootDescendantPaths) {
    lines.push(`  "${relativePath}": ${typeName};`);
  }
  lines.push(`};\n`);

  // Emit declare global block
  lines.push(`declare global {`);
  lines.push(`  interface ${parentsInterface} {}\n`);

  // __ScriptGd__Trees entry (if root has a script)
  if (rootScriptResPath) {
    const treesInterface = scriptResPathToTreesInterfaceName(rootScriptResPath);
    lines.push(`  interface ${treesInterface} {`);
    lines.push(`    "${sceneResPath}": ${treeName};`);
    lines.push(`  }\n`);
  }

  // __ScriptGd__Trees entries for non-root scripted nodes: map the script's
  // Trees interface to the sub-tree type for this node.
  for (const node of emittableNodes) {
    if (!node.scriptResPath) continue;
    const treesInterface = scriptResPathToTreesInterfaceName(node.scriptResPath);
    const subTypeName = nodePathToTypeName(alias, node.fullPath);
    lines.push(`  interface ${treesInterface} {`);
    lines.push(`    "${sceneResPath}": ${subTypeName};`);
    lines.push(`  }\n`);
  }

  // Instanced scene parent entries
  const instancedParentEntries: Array<{ parentsInterface: string; sceneResPath: string }> = [];
  for (const child of root.children) {
    if (child.isInstanced && child.instanceSceneResPath) {
      instancedParentEntries.push({
        parentsInterface: sceneResPathToParentsInterfaceName(child.instanceSceneResPath),
        sceneResPath,
      });
    }
  }

  // TileMap embedded scene parent entries
  for (const [, { sceneResPaths }] of sceneData.embeddedScenes) {
    for (const embeddedResPath of sceneResPaths) {
      instancedParentEntries.push({
        parentsInterface: sceneResPathToParentsInterfaceName(embeddedResPath),
        sceneResPath,
      });
    }
  }

  if (instancedParentEntries.length > 0) {
    lines.push(`  // Instanced scene parents`);
    for (const { parentsInterface: pi, sceneResPath: srp } of instancedParentEntries) {
      lines.push(`  interface ${pi} { "${srp}": ${treeName}; }`);
    }
    lines.push('');
  }

  // GodotSceneTrees entry
  lines.push(`  interface GodotSceneTrees {`);
  lines.push(`    "${sceneResPath}": ${treeName};`);
  lines.push(`  }`);

  // GodotScenes entry (node type, not tree type)
  lines.push(`  interface GodotScenes {`);
  lines.push(`    "${sceneResPath}": _GDTreeNode<${treeName}>;`);
  lines.push(`  }`);

  // GodotResources entry
  lines.push(`  interface GodotResources {`);
  lines.push(`    "${sceneResPath}": PackedScene<_GDTreeNode<${treeName}>>;`);
  lines.push(`  }`);

  // GodotGroups entries — per-group interfaces + GodotGroups mapping
  if (sceneData.nodeGroups.size > 0) {
    const groupEntries: Array<{ groupName: string; interfaceName: string; typeExpr: string }> = [];
    for (const [groupName, groupNodes] of sceneData.nodeGroups) {
      const treeExprs: string[] = [];
      for (const node of groupNodes) {
        if (node.instanceSceneResPath) {
          treeExprs.push(`GodotSceneTrees["${node.instanceSceneResPath}"]`);
        } else if (node.nodePath === '.') {
          treeExprs.push(treeName);
        } else {
          treeExprs.push(nodePathToTypeName(alias, node.nodePath));
        }
      }
      if (treeExprs.length > 0) {
        const uniqueExprs = [...new Set(treeExprs)];
        const interfaceName = `__GodotGroup_${groupName.replace(/[^a-zA-Z0-9_]/g, '_')}`;
        lines.push(`  interface ${interfaceName} {`);
        lines.push(`    "${sceneResPath}": ${uniqueExprs.join(' | ')}`);
        lines.push(`  }`);
        groupEntries.push({ groupName, interfaceName, typeExpr: uniqueExprs.join(' | ') });
      }
    }
    if (groupEntries.length > 0) {
      lines.push(`  interface GodotGroups {`);
      for (const { groupName, interfaceName } of groupEntries) {
        lines.push(`    ${groupName}: ${interfaceName};`);
      }
      lines.push(`  }`);
    }
  }

  // Signal connections from [connection] entries
  if (connections && connections.length > 0) {
    lines.push(`  interface GodotConnections {`);
    lines.push(`    "${sceneResPath}": {`);
    for (const conn of connections) {
      lines.push(`      "${conn.fromNode}.${conn.signal}": _GDSignalConnection<`);
      lines.push(`        ${conn.fromType}["${conn.signal}"],`);
      lines.push(`        GodotScripts["${conn.receiverScript}"]["${conn.method}"]`);
      lines.push(`      >;`);
    }
    lines.push(`    };`);
    lines.push(`  }`);
  }

  lines.push(`}\n`);
  lines.push(`export {}`);

  return lines.join('\n');
}

/**
 * Generate .gd.d.ts file content for a single script.
 */
export function generateScriptTypingContent(
  scriptResPath: string,
  className: string,
  isAnonymous: boolean,
  tsImportPath: string,
  tsModulePath: string,
  enums: Array<{ name: string; members: Array<{ name: string; value: number }> }>,
  innerClasses: Array<{ name: string; extendsName?: string }>,
  extendsNode: boolean = true,
): string {
  const lines: string[] = [];
  lines.push('// AUTO-GENERATED — do not edit manually.\n');

  const treesInterface = scriptResPathToTreesInterfaceName(scriptResPath);
  const importName = isAnonymous ? '__CLASS__' : className;

  // Import
  lines.push(`import type { ${importName} as ScriptClass } from "${tsImportPath}";\n`);

  if (extendsNode) {
    // ScriptTree + ScriptPaths (pre-computed) + StaticProps + module augmentation
    lines.push(`type ScriptTree = _GDGetInterfaceTree<${treesInterface}>;`);
    lines.push(`type ScriptPaths = _GDGetTreePaths<ScriptTree>;\n`);
    lines.push(`type StaticProps = Omit<typeof ScriptClass, 'prototype' | keyof Function>;\n`);

    lines.push(`declare module "${tsModulePath}" {`);
    lines.push(`  interface ${importName} extends StaticProps {`);
    lines.push(`    get_node<P extends string & ScriptPaths>(path: P): _GDGetNode<ScriptTree, P>;`);
    lines.push(`    get_node<P extends '/root' | \`/root/\${string}\`>(path: P): _GDGetRootNode<ScriptTree, P>;`);
    lines.push(`    get_node(path: string): Node | null;`);
    lines.push(`    get_node_or_null<P extends string & ScriptPaths>(path: P): _GDGetNodeOrNull<ScriptTree, P>;`);
    lines.push(`    get_node_or_null<P extends '/root' | \`/root/\${string}\`>(path: P): _GDGetRootNode<ScriptTree, P> | null;`);
    lines.push(`    get_node_or_null(path: string): Node | null;`);
    lines.push(`    has_node<P extends string & ScriptPaths>(path: P): boolean;`);
    lines.push(`    has_node(path: string): boolean;`);
    lines.push(`    get_child<Idx extends number & _GDChildIndices<ScriptTree>>(idx: Idx): _GDGetChild<ScriptTree, Idx>;`);
    lines.push(`    get_child(idx: int, include_internal?: boolean): Node;`);
    lines.push(`    get_parent(): _GDParentType<ScriptTree>;`);
    lines.push(`    get_parent<N extends Node = Node>(): N;`);
    lines.push(`  }`);
    lines.push(`}\n`);
  }

  // Class declaration
  if (isAnonymous) {
    // Module-level _Script class (not in declare global)
    lines.push(`declare class _Script extends ScriptClass {`);
    if (extendsNode) {
      lines.push(`  get_node(path: string): Node | null;`);
      lines.push(`  get_node_or_null(path: string): Node | null;`);
      lines.push(`  has_node(path: string): boolean;`);
      lines.push(`  get_child(idx: int, include_internal?: boolean): Node;`);
      lines.push(`  get_parent<N extends Node = Node>(): N;`);
    }
    lines.push(`}\n`);
    // Namespace for enum types and inner class types (merged with __CLASS__ via module augmentation)
    if (enums.length > 0 || innerClasses.length > 0) {
      lines.push(`declare module "${tsModulePath}" {`);
      lines.push(`  namespace __CLASS__ {`);
      for (const e of enums) {
        lines.push(`    type ${e.name} = number & { readonly __brand: '${e.name}' };`);
      }
      for (const ic of innerClasses) {
        lines.push(`    type ${ic.name} = InstanceType<typeof ScriptClass.${ic.name}>;`);
      }
      lines.push(`  }`);
      if (enums.length > 0) {
        lines.push(`  interface __CLASS__ {`);
        for (const e of enums) {
          const memberTypes = e.members.map(m => `${m.name}: __CLASS__.${e.name}`).join('; ');
          lines.push(`    ${e.name}: { ${memberTypes} };`);
        }
        lines.push(`  }`);
      }
      lines.push(`}\n`);
    }

    lines.push(`declare global {`);
    if (extendsNode) {
      lines.push(`  interface ${treesInterface} {}\n`);
    }
    lines.push(`  interface GodotScripts {`);
    lines.push(`    "${scriptResPath}": _Script;`);
    lines.push(`  }\n`);
    lines.push(`  interface GodotResources {`);
    lines.push(`    "${scriptResPath}": typeof _Script;`);
    lines.push(`  }`);
    lines.push(`}`);
  } else {
    // Named class in declare global
    lines.push(`declare global {`);
    if (extendsNode) {
      lines.push(`  interface ${treesInterface} {}\n`);
    }
    lines.push(`  /** @see import("${tsModulePath}") */`);
    lines.push(`  class ${className} extends ScriptClass {`);
    if (extendsNode) {
      lines.push(`    get_node(path: string): Node | null;`);
      lines.push(`    get_node_or_null(path: string): Node | null;`);
      lines.push(`    has_node(path: string): boolean;`);
      lines.push(`    get_child(idx: int, include_internal?: boolean): Node;`);
      lines.push(`    get_parent<N extends Node = Node>(): N;`);
    }
    lines.push(`  }`);
    // Namespace for enum types and inner class types
    if (enums.length > 0 || innerClasses.length > 0) {
      lines.push(`  namespace ${className} {`);
      for (const e of enums) {
        lines.push(`    const enum ${e.name} {`);
        for (const m of e.members) {
          lines.push(`      ${m.name} = ${m.value},`);
        }
        lines.push(`    }`);
      }
      for (const ic of innerClasses) {
        lines.push(`    type ${ic.name} = InstanceType<typeof ScriptClass.${ic.name}>;`);
      }
      lines.push(`  }`);
    }
    lines.push('');
    lines.push(`  interface GodotScripts {`);
    lines.push(`    "${scriptResPath}": ${className};`);
    lines.push(`  }\n`);
    lines.push(`  interface GodotResources {`);
    lines.push(`    "${scriptResPath}": typeof ${className};`);
    lines.push(`  }`);
    lines.push(`}`);
  }

  lines.push('\nexport {};');

  return lines.join('\n');
}

/**
 * Generate .d.ts file content for a resource or asset file.
 */
export function generateResourceTypingContent(
  resPath: string,
  godotType: string,
): string {
  const lines: string[] = [];
  lines.push(`declare global {`);
  lines.push(`  interface GodotResources {`);
  lines.push(`    "${resPath}": ${godotType};`);
  lines.push(`  }`);
  lines.push(`}\n`);
  lines.push(`export {}`);
  return lines.join('\n');
}

/**
 * Generate _index.d.ts file content with empty global interfaces and autoload declarations.
 */
export function generateIndexTypingContent(
  autoloads: AutoloadEntry[],
  outputDir?: string,
): string {
  const lines: string[] = [];
  lines.push('// AUTO-GENERATED — do not edit manually.');
  // Reference the package typings so IDEs eagerly index all Godot classes for autocomplete.
  if (outputDir) {
    const ref = resolvePackageTypingsRef(outputDir);
    if (ref) lines.push(`/// <reference path="${ref}" />`);
  }
  lines.push('');

  // Import autoload scripts (.gd autoloads need imports; .tscn autoloads use GodotSceneTrees)
  const gdAutoloads = autoloads.filter(a => a.resPath.endsWith('.gd'));
  const sceneAutoloads = autoloads.filter(a => a.resPath.endsWith('.tscn'));

  if (autoloads.length > 0) lines.push('');

  lines.push(`declare global {`);
  lines.push(`  interface GodotScripts {}`);
  lines.push(`  interface GodotSceneTrees {}`);
  lines.push(`  interface GodotScenes {}`);
  lines.push(`  interface GodotResources {}`);
  lines.push(`  interface GodotGroups {}`);
  lines.push(`  interface GodotConnections {}`);

  // Autoload singletons
  if (autoloads.length > 0) {
    lines.push(`  // Autoload singletons from project.godot`);
    for (const autoload of gdAutoloads) {
      lines.push(`  const ${autoload.name}: GodotScripts["${autoload.resPath}"];`);
    }
    for (const autoload of sceneAutoloads) {
      lines.push(`  const ${autoload.name}: _GDTreeNode<GodotSceneTrees["${autoload.resPath}"]>;`);
    }
  }

  lines.push(`}\n`);
  lines.push(`export {};`);

  return lines.join('\n');
}

// ─── Connections Typings ────────────────────────────────────

export interface ResolvedConnection {
  sceneResPath: string;
  /** Signal name (e.g. "pressed") */
  signal: string;
  /** Full emitter node path (e.g. "LevelDisplay/VBoxContainer2/MarginContainer/NextLevelButton") */
  fromNode: string;
  /** Godot type of the emitter node (e.g. "Button", "Timer") */
  fromType: string;
  /** Script res:// path of the receiver node */
  receiverScript: string;
  /** Handler method name (e.g. "_on_next_level_button_pressed") */
  method: string;
}

/**
 * Resolve raw scene connections into typed connection info.
 * Matches each connection's receiver node to its attached script.
 */
export function resolveConnections(
  sceneResPath: string,
  sceneData: ParseSceneResult,
): ResolvedConnection[] {
  const result: ResolvedConnection[] = [];

  // Build node path → script res:// path map
  const nodeScripts = new Map<string, string>();
  for (const script of sceneData.scripts) {
    nodeScripts.set(script.nodePath, script.scriptResPath);
  }
  if (sceneData.rootScript) {
    nodeScripts.set('.', sceneData.rootScript.scriptResPath);
  }

  for (const conn of sceneData.connections) {
    const fromType = sceneData.nodeTypes.get(conn.fromPath);
    if (!fromType) continue;

    const receiverScript = nodeScripts.get(conn.toPath);
    if (!receiverScript) continue;

    result.push({
      sceneResPath,
      signal: conn.signal,
      fromNode: conn.fromPath,
      fromType,
      receiverScript,
      method: conn.method,
    });
  }

  return result;
}

