import ts from 'typescript';
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'fs';
import { join, relative, extname, dirname } from 'path';
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
} | null {
  const content = readFileSync(filePath, 'utf-8');
  const root = resourceParser.parse(content);

  const extResources = new Map<string, { path: string; type: string }>();
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
        nodes.push({ name, type: type ?? '', parent: parent ?? '', scriptExtId, instanceExtId, uniqueInOwner });
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

  return { filePath, scripts, rootScript, inheritedSceneResPath, connections, nodeTypes, instancedNodes };
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

      map.set(resPath, { className, tsModulePath });
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
  /** Output path for the generated globals.d.ts file */
  outputPath: string;
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
 * Generates a single globals.d.ts containing:
 * - Global class declarations (named classes available globally like GDScript class_name)
 * - Scene node interfaces and module augmentation (typed get_node/get_node_or_null)
 * - GodotResources interface (typed load/preload)
 * - Autoload singletons from project.godot
 * - GodotScenePaths type union
 */
export function generateTypings(options: GenerateTypingsOptions): string {
  const outputDir = dirname(options.outputPath);

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
    let alias = '_' + resPath.replace(/^res:\/\//, '').replace(/\.[^.]+$/, '').replace(/\//g, '_');
    let base = alias;
    let i = 2;
    while (usedAliases.has(alias)) {
      alias = `${base}_${i++}`;
    }
    usedAliases.add(alias);
    aliasMap.set(resPath, { alias, className: info.className, tsModulePath: info.tsModulePath });
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
    }
    // Track root node Godot type for instanced scene fallback
    const rootType = scene.nodeTypes.get('.');
    if (rootType) {
      sceneRootTypes.set(resPath, rootType);
    }
    resourceEntries.push({ resPath, alias: rootAlias });
    parsedScenes.push({ scenePath, resPath, scene });
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
        // If we couldn't resolve via script, use the root node's Godot type
        if (!childType && child.instanceSceneResPath) {
          childType = sceneRootTypes.get(child.instanceSceneResPath) ?? 'Node';
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
  for (const { scene } of parsedScenes) {
    for (const script of scene.scripts) {
      const aliasEntry = aliasMap.get(script.scriptResPath);
      if (!aliasEntry) continue;

      const data = ensureScriptData(script.scriptResPath);
      if (!data) continue;

      if (script.children.length > 0) {
        data.sceneMaps.push(resolveScriptChildren(script.children, aliasEntry));
      }
    }
  }

  // Pass 2: Handle inherited scenes (root node instances another scene, e.g. RI1_1.tscn inherits world.tscn)
  // Children added by the inheriting scene are ADDITIVE to the base scene's children,
  // so we clone the base scene's map and add the new children to get a complete snapshot.
  for (const { scene } of parsedScenes) {
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

  // Collect named classes for global declarations (skip __CLASS__)
  const globalClasses: Array<{ className: string; alias: string; commentPath: string }> = [];
  for (const [resPath, entry] of aliasMap) {
    if (entry.className === '__CLASS__') continue;
    const commentPath = resPath.replace(/^res:\/\//, '').replace(/\.gd$/, '.ts');
    globalClasses.push({ className: entry.className, alias: entry.alias, commentPath });
  }

  // ─── Emit globals.d.ts ───────────────────────────────────

  const lines: string[] = [];
  lines.push('// AUTO-GENERATED — do not edit manually.');
  lines.push('// Generated by ts2gd from TypeScript source files and .tscn scene files.');
  lines.push('// Provides global class declarations, get_node overloads, GodotResources, and autoloads.');
  lines.push('');

  // Import all script classes with unique aliases
  for (const [, entry] of aliasMap) {
    lines.push(`import type { ${entry.className} as ${entry.alias} } from "${entry.tsModulePath}";`);
  }
  if (aliasMap.size > 0) {
    lines.push('');
  }

  // Scene node interfaces + module augmentations (outside declare global)
  for (const [, data] of scriptData) {
    if (data.sceneMaps.length === 0) continue;

    const nodesInterface = `${data.alias}SceneNodes`;

    // Compute merged children: union of types across scenes, nullable if missing from some
    const mergedChildren = mergeSceneChildren(data.sceneMaps);

    // Build lookup for parent type resolution (path → raw type)
    const childTypeMap = new Map<string, string>();
    for (const { path, type } of mergedChildren) {
      childTypeMap.set(path, type);
    }

    lines.push(`// Scene nodes for: ${data.alias}`);
    lines.push(`interface ${nodesInterface} {`);
    for (const { path, type } of mergedChildren) {
      // Determine parent type: direct children → script alias, nested → intermediate node type
      let parentType: string;
      if (path.startsWith('%') || !path.includes('/')) {
        // Direct child or unique node → parent is the script class
        parentType = data.alias;
      } else {
        // Nested path like "Sprite2D/AnimationPlayer" → parent is "Sprite2D"
        const parentPath = path.substring(0, path.lastIndexOf('/'));
        const rawParent = childTypeMap.get(parentPath);
        // Use first non-null type from parent's union
        parentType = rawParent
          ? rawParent.split(' | ').find(t => t !== 'null') ?? 'Node'
          : 'Node';
      }

      // Annotate types with parent info:
      // - Godot built-in types get <{[__parent]: ParentType}> (they have Tree generic from godot-docs)
      // - User classes stay plain — their get_parent() is set via module augmentation
      // - null stays as null
      const annotatedType = type.split(' | ').map(t => {
        if (t === 'null') return 'null';
        if (userClassTypes.has(t)) {
          return t;
        }
        return `${t}<{[__parent]: ${parentType}}>`;
      }).join(' | ');

      lines.push(`  "${path}": ${annotatedType};`);
    }
    lines.push('}');
    lines.push('');

    lines.push(`declare module "${data.tsModulePath}" {`);
    lines.push(`  interface ${data.className} {`);
    lines.push(
      `    get_node<P extends keyof ${nodesInterface}>(path: P): null extends ${nodesInterface}[P] ? NonNullable<${nodesInterface}[P]> | Node : ${nodesInterface}[P];`,
    );
    lines.push(`    get_node<T extends Node = Node>(path: string): T;`);
    lines.push(`    get_node_or_null<P extends keyof ${nodesInterface}>(path: P): ${nodesInterface}[P] | null;`);
    lines.push(`    get_node_or_null<T extends Node = Node>(path: string): T | null;`);
    // Add get_parent() if this script is instanced in other scenes
    const parentAliases = instancedParents.get(data.alias);
    if (parentAliases && parentAliases.size > 0) {
      const parentType = [...parentAliases].join(' | ');
      lines.push(`    get_parent(): ${parentType};`);
    }
    lines.push('  }');
    lines.push('}');
    lines.push('');
  }

  // declare global block: class declarations + GodotResources + autoloads
  const hasResources = resourceEntries.length > 0 || aliasMap.size > 0 || assetEntries.length > 0;
  const hasAutoloads = autoloadDecls.length > 0;
  if (globalClasses.length > 0 || hasResources || hasAutoloads) {
    lines.push('declare global {');

    // Global class declarations
    if (globalClasses.length > 0) {
      for (const cls of globalClasses) {
        lines.push(`  // From: ${cls.commentPath}`);
        lines.push(`  class ${cls.className} extends ${cls.alias} {}`);
      }
    }

    // GodotResources interface
    if (hasResources) {
      lines.push('  interface GodotResources {');
      for (const entry of resourceEntries) {
        if (entry.alias) {
          lines.push(`    "${entry.resPath}": PackedScene<${entry.alias}>;`);
        } else {
          lines.push(`    "${entry.resPath}": PackedScene;`);
        }
      }
      for (const [resPath, aliasEntry] of aliasMap) {
        lines.push(`    "${resPath}": typeof ${aliasEntry.alias};`);
      }
      // Asset resources (images, audio, fonts, etc.)
      for (const asset of assetEntries) {
        lines.push(`    "${asset.resPath}": ${asset.type};`);
      }
      lines.push('  }');
    }

    // Autoload singletons
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

  const content = lines.join('\n');
  writeFileSync(options.outputPath, content);
  return content;
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
