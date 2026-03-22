import ts from 'typescript';
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'fs';
import { join, relative, extname, dirname } from 'path';
import { createTsProgram } from '../parser/typescript/index.ts';
import { shouldIgnore } from '../config/index.ts';
import { GodotClassRegistry, type GodotSignalParamInfo } from './godot-registry.ts';
import { godotTypeToTs } from './godot-docs.ts';

interface SceneNode {
  name: string;
  type: string;
  /** Empty string for root, "." for direct children, "Parent/Child" for nested */
  parent: string;
  /** ext_resource id referenced by `script = ExtResource("id")`, if any */
  scriptExtId?: string;
}

interface ScriptNodeInfo {
  /** res:// path to the .gd script */
  scriptResPath: string;
  /** Full node path within the scene (e.g. "Ball", "." for root) */
  nodePath: string;
  /** Child nodes with paths relative to this script node */
  children: Array<{ path: string; type: string }>;
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
  connections: SceneConnection[];
  /** Map of full node paths to their Godot type (e.g. "Area2D" → "Area2D") */
  nodeTypes: Map<string, string>;
} | null {
  const content = readFileSync(filePath, 'utf-8');
  const extResources = new Map<string, { path: string; type: string }>();
  const nodes: SceneNode[] = [];

  // Parse [ext_resource ...] sections
  const extRegex = /\[ext_resource\s+([^\]]+)\]/g;
  let extMatch: RegExpExecArray | null;
  while ((extMatch = extRegex.exec(content)) !== null) {
    const attrs = extMatch[1]!;
    const id = extractAttr(attrs, 'id');
    const path = extractAttr(attrs, 'path');
    const type = extractAttr(attrs, 'type');
    if (id && path && type) {
      extResources.set(id, { path, type });
    }
  }

  // Parse [node ...] sections with their body (for script = ExtResource("id"))
  const nodeRegex = /\[node\s+([^\]]+)\]([\s\S]*?)(?=\[|$)/g;
  let match: RegExpExecArray | null;
  while ((match = nodeRegex.exec(content)) !== null) {
    const attrs = match[1]!;
    const body = match[2] ?? '';
    const name = extractAttr(attrs, 'name');
    const type = extractAttr(attrs, 'type');
    const parent = extractAttr(attrs, 'parent');

    // Check for script assignment in node body
    const scriptMatch = /script\s*=\s*ExtResource\("([^"]+)"\)/.exec(body);
    let scriptExtId: string | undefined;
    if (scriptMatch) {
      scriptExtId = scriptMatch[1];
    }

    if (name) {
      nodes.push({ name, type: type ?? '', parent: parent ?? '', scriptExtId });
    }
  }

  if (nodes.length === 0) return null;

  // Build script attachments
  const scripts: ScriptNodeInfo[] = [];

  for (const node of nodes) {
    if (!node.scriptExtId) continue;
    const extRes = extResources.get(node.scriptExtId);
    if (!extRes || extRes.type !== 'Script' || !extRes.path.endsWith('.gd'))
      continue;

    // Compute this node's full path in the scene
    const nodePath =
      node.parent === '' ? '.' : node.parent === '.' ? node.name : `${node.parent}/${node.name}`;

    // Find all descendant nodes
    const children: Array<{ path: string; type: string }> = [];
    for (const other of nodes) {
      if (other === node) continue;
      if (!other.type) continue; // skip instance nodes without type

      // Compute the other node's full path
      const otherPath =
        other.parent === '.'
          ? other.name
          : `${other.parent}/${other.name}`;

      // Check if otherPath is a descendant of nodePath
      let relativePath: string | null = null;
      if (nodePath === '.') {
        // Root script — all non-root nodes are children
        if (other.parent !== '') {
          relativePath = otherPath;
        }
      } else if (other.parent === nodePath || other.parent.startsWith(nodePath + '/')) {
        // Direct or nested child of script node
        relativePath = otherPath.slice(nodePath.length + 1);
      }

      if (relativePath) {
        children.push({ path: relativePath, type: other.type });
      }
    }

    scripts.push({
      scriptResPath: extRes.path,
      nodePath,
      children,
    });
  }

  // Detect root node script
  const rootNode = nodes.find((n) => n.parent === '' && n.scriptExtId);
  let rootScript: { scriptResPath: string } | undefined;
  if (rootNode?.scriptExtId) {
    const extRes = extResources.get(rootNode.scriptExtId);
    if (extRes && extRes.type === 'Script' && extRes.path.endsWith('.gd')) {
      rootScript = { scriptResPath: extRes.path };
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

  // Parse [connection ...] sections
  const connections: SceneConnection[] = [];
  const connRegex = /\[connection\s+([^\]]+)\]/g;
  let connMatch: RegExpExecArray | null;
  while ((connMatch = connRegex.exec(content)) !== null) {
    const attrs = connMatch[1]!;
    const signal = extractAttr(attrs, 'signal');
    const fromPath = extractAttr(attrs, 'from');
    const toPath = extractAttr(attrs, 'to');
    const method = extractAttr(attrs, 'method');
    if (signal && fromPath && toPath && method) {
      connections.push({ signal, fromPath, toPath, method });
    }
  }

  return { filePath, scripts, rootScript, connections, nodeTypes };
}

function extractAttr(attrs: string, name: string): string | undefined {
  const regex = new RegExp(`(?:^|\\s)${name}="([^"]+)"`);
  const match = regex.exec(attrs);
  return match?.[1];
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
  const entries: AutoloadEntry[] = [];

  // Find [autoload] section
  const autoloadMatch = /^\[autoload\]\s*$/m.exec(content);
  if (!autoloadMatch) return entries;

  // Extract lines after [autoload] until next section or end of file
  const afterAutoload = content.slice(autoloadMatch.index + autoloadMatch[0].length);
  const nextSection = /^\[/m.exec(afterAutoload);
  const autoloadBlock = nextSection
    ? afterAutoload.slice(0, nextSection.index)
    : afterAutoload;

  // Parse each line: Name="*res://path"
  const lineRegex = /^(\w+)="(\*?)([^"]+)"$/gm;
  let lineMatch: RegExpExecArray | null;
  while ((lineMatch = lineRegex.exec(autoloadBlock)) !== null) {
    const name = lineMatch[1]!;
    const enabled = lineMatch[2] === '*';
    const resPath = lineMatch[3]!;
    if (enabled) {
      entries.push({ name, resPath });
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

  const resourceEntries: Array<{ resPath: string; alias?: string }> = [];

  for (const scenePath of scenes) {
    const scene = parseScene(scenePath);
    if (!scene) {
      const resPath = `res://${relative(options.rootDir, scenePath).replace(/\\/g, '/')}`;
      resourceEntries.push({ resPath });
      continue;
    }

    const resPath = `res://${relative(options.rootDir, scenePath).replace(/\\/g, '/')}`;

    let rootAlias: string | undefined;
    if (scene.rootScript) {
      const aliasEntry = aliasMap.get(scene.rootScript.scriptResPath);
      if (aliasEntry) {
        rootAlias = aliasEntry.alias;
      }
    }
    resourceEntries.push({ resPath, alias: rootAlias });

    for (const script of scene.scripts) {
      const classInfo = scriptClassMap.get(script.scriptResPath);
      if (!classInfo) continue;

      const aliasEntry = aliasMap.get(script.scriptResPath);
      if (!aliasEntry) continue;

      let data = scriptData.get(script.scriptResPath);
      if (!data) {
        data = {
          alias: aliasEntry.alias,
          tsModulePath: classInfo.tsModulePath,
          className: classInfo.className,
          sceneMaps: [],
        };
        scriptData.set(script.scriptResPath, data);
      }

      if (script.children.length > 0) {
        // One map per scene occurrence
        const sceneChildren = new Map<string, string>();
        for (const child of script.children) {
          sceneChildren.set(child.path, child.type);
        }
        data.sceneMaps.push(sceneChildren);
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
    const type = ASSET_EXTENSION_MAP[ext] ?? 'Resource';
    assetEntries.push({ resPath, type });
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

    lines.push(`// Scene nodes for: ${data.alias}`);
    lines.push(`interface ${nodesInterface} {`);
    for (const { path, type } of mergedChildren) {
      lines.push(`  "${path}": ${type};`);
    }
    lines.push('}');
    lines.push('');

    lines.push(`declare module "${data.tsModulePath}" {`);
    lines.push(`  interface ${data.className} {`);
    lines.push(`    get_node<P extends keyof ${nodesInterface}>(path: P): ${nodesInterface}[P];`);
    lines.push(`    get_node(path: string): Node;`);
    lines.push(`    get_node_or_null<P extends keyof ${nodesInterface}>(path: P): ${nodesInterface}[P] | null;`);
    lines.push(`    get_node_or_null(path: string): Node | null;`);
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
        lines.push(`    "${resPath}": ${aliasEntry.alias};`);
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
