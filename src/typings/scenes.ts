import ts from 'typescript';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join, relative, extname, dirname } from 'path';
import { createTsProgram } from '../parser/typescript/index.ts';

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

/**
 * Parses a .tscn file and extracts script attachments with their child nodes.
 * Each node with a script gets its own entry with relative child paths.
 */
function parseScene(
  filePath: string,
): { filePath: string; scripts: ScriptNodeInfo[] } | null {
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

  return { filePath, scripts, rootScript };
}

function extractAttr(attrs: string, name: string): string | undefined {
  const regex = new RegExp(`(?:^|\\s)${name}="([^"]+)"`);
  const match = regex.exec(attrs);
  return match?.[1];
}

export interface ScriptClassInfo {
  className: string;
  tsModulePath: string;
}

export interface SceneNodeOverload {
  path: string;
  type: string;
}

export interface SceneTypingsOptions {
  /** Directory containing .tscn files */
  scenesDir: string;
  /**
   * Map from GD script path (as written in .tscn, e.g. "res://scripts/Player.gd")
   * to { className, tsModulePath } where tsModulePath is relative to outputPath dir.
   */
  scriptClassMap: Map<string, ScriptClassInfo>;
}

/**
 * Collects get_node/get_node_or_null overloads from scene files.
 * Returns a map from class name to its scene node overloads, which should be
 * passed to `generateClassTypings({ sceneOverloads })` to be included directly
 * on the global class declaration (overriding inherited Node methods).
 *
 * Overloads must be on the class (not via interface merge) because TypeScript
 * resolves class method overloads before interface overloads — and the base
 * Node.get_node<T>(path: string) generic would always match first.
 */
export function collectSceneOverloads(
  options: SceneTypingsOptions,
): Map<string, SceneNodeOverload[]> {
  const scenes = findSceneFiles(options.scenesDir);
  const result = new Map<string, SceneNodeOverload[]>();

  for (const scenePath of scenes) {
    const scene = parseScene(scenePath);
    if (!scene) continue;

    for (const script of scene.scripts) {
      if (script.children.length === 0) continue;
      const classInfo = options.scriptClassMap.get(script.scriptResPath);
      if (!classInfo) continue;

      let overloads = result.get(classInfo.className);
      if (!overloads) {
        overloads = [];
        result.set(classInfo.className, overloads);
      }
      overloads.push(...script.children);
    }
  }

  return result;
}

export interface GenerateSceneTypingsOptions {
  /** Directory containing .tscn files */
  scenesDir: string;
  /** Output path for the generated scene-typings.d.ts file */
  outputPath: string;
  /**
   * Map from GD script path (as written in .tscn, e.g. "res://scripts/Player.gd")
   * to { className, tsModulePath } where tsModulePath is relative to outputPath dir.
   */
  scriptClassMap: Map<string, ScriptClassInfo>;
  /** Root directory of the project (used for res:// path computation) */
  rootDir: string;
}

/**
 * Generates scene-typings.d.ts with `declare module` augmentations.
 * Each class that has a script attached in a .tscn scene gets
 * get_node / get_node_or_null overloads for its child nodes.
 *
 * Uses module augmentation (`declare module "./Player.js" { interface Player { ... } }`)
 * so overloads are visible inside the source file itself (via interface-class merging).
 */
export function generateSceneTypings(options: GenerateSceneTypingsOptions): string {
  const scenes = findSceneFiles(options.scenesDir);

  // Build unique import aliases for each script class (handles duplicate class names like __CLASS__)
  // resPath → { alias, className, tsModulePath }
  const aliasMap = new Map<string, { alias: string; className: string; tsModulePath: string }>();
  const usedAliases = new Set<string>();
  for (const [resPath, info] of options.scriptClassMap) {
    // Derive alias from res:// path: res://scripts/Player.gd → _scripts_Player
    let alias = '_' + resPath.replace(/^res:\/\//, '').replace(/\.[^.]+$/, '').replace(/\//g, '_');
    let base = alias;
    let i = 2;
    while (usedAliases.has(alias)) {
      alias = `${base}_${i++}`;
    }
    usedAliases.add(alias);
    aliasMap.set(resPath, { alias, className: info.className, tsModulePath: info.tsModulePath });
  }

  // Collect per-class: { tsModulePath, className, children[] }
  const classData = new Map<
    string,
    { tsModulePath: string; className: string; children: Array<{ path: string; type: string }> }
  >();

  // Collect GodotResources entries: res:// path → alias | undefined
  const resourceEntries: Array<{ resPath: string; alias?: string }> = [];

  for (const scenePath of scenes) {
    const scene = parseScene(scenePath);
    if (!scene) {
      const resPath = `res://${relative(options.rootDir, scenePath).replace(/\\/g, '/')}`;
      resourceEntries.push({ resPath });
      continue;
    }

    const resPath = `res://${relative(options.rootDir, scenePath).replace(/\\/g, '/')}`;

    // Determine root script alias (if any)
    let rootAlias: string | undefined;
    if (scene.rootScript) {
      const aliasEntry = aliasMap.get(scene.rootScript.scriptResPath);
      if (aliasEntry) {
        rootAlias = aliasEntry.alias;
      }
    }
    resourceEntries.push({ resPath, alias: rootAlias });

    for (const script of scene.scripts) {
      const classInfo = options.scriptClassMap.get(script.scriptResPath);
      if (!classInfo) continue;
      if (script.children.length === 0) continue;

      let data = classData.get(classInfo.className);
      if (!data) {
        data = {
          tsModulePath: classInfo.tsModulePath,
          className: classInfo.className,
          children: [],
        };
        classData.set(classInfo.className, data);
      }
      data.children.push(...script.children);
    }
  }

  const lines: string[] = [];
  lines.push('// AUTO-GENERATED — do not edit manually.');
  lines.push('// Generated by ts2gd from .tscn scene files.');
  lines.push('// Provides get_node/get_node_or_null overloads and GodotResources entries.');
  lines.push('');

  // Import all script classes with unique aliases
  for (const [, entry] of aliasMap) {
    lines.push(`import type { ${entry.className} as ${entry.alias} } from "${entry.tsModulePath}";`);
  }
  if (aliasMap.size > 0) {
    lines.push('');
  }

  for (const [, data] of classData) {
    const relScene = data.tsModulePath;
    const nodesInterface = `${data.className}SceneNodes`;

    // Per-class path → type mapping interface
    lines.push(`// Scene nodes for: ${data.className}`);
    lines.push(`interface ${nodesInterface} {`);
    for (const child of data.children) {
      lines.push(`  "${child.path}": ${child.type};`);
    }
    lines.push('}');
    lines.push('');

    // Module augmentation: override get_node/get_node_or_null with conditional types
    lines.push(`declare module "${relScene}" {`);
    lines.push(`  interface ${data.className} {`);
    lines.push(`    get_node<P extends keyof ${nodesInterface}>(path: P): ${nodesInterface}[P];`);
    lines.push(`    get_node(path: string): Node;`);
    lines.push(`    get_node_or_null<P extends keyof ${nodesInterface}>(path: P): ${nodesInterface}[P] | null;`);
    lines.push(`    get_node_or_null(path: string): Node | null;`);
    lines.push('  }');
    lines.push('}');
    lines.push('');
  }

  // GodotResources interface augmentation (must be global scope)
  const hasScriptEntries = aliasMap.size > 0;
  if (resourceEntries.length > 0 || hasScriptEntries) {
    lines.push('// Resource path → type mappings for load()/preload()');
    lines.push('declare global {');
    lines.push('  interface GodotResources {');

    // Scene paths → PackedScene<Alias> or PackedScene
    for (const entry of resourceEntries) {
      if (entry.alias) {
        lines.push(`    "${entry.resPath}": PackedScene<${entry.alias}>;`);
      } else {
        lines.push(`    "${entry.resPath}": PackedScene;`);
      }
    }

    // Script paths → class types (for load/preload of .gd scripts)
    for (const [resPath, aliasEntry] of aliasMap) {
      lines.push(`    "${resPath}": ${aliasEntry.alias};`);
    }

    lines.push('  }');
    lines.push('}');
    lines.push('');
  }

  // export {} makes this a module file, required for declare module with relative paths
  lines.push('export {};');
  lines.push('');

  const content = lines.join('\n');
  writeFileSync(options.outputPath, content);
  return content;
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
      const relFromRoot = relative(options.rootDir, filePath)
        .replace(/\\/g, '/')
        .replace(/\.ts$/, '.gd');
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

function findSceneFiles(dir: string): string[] {
  const results: string[] = [];

  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      try {
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
          // Skip addons and hidden dirs
          if (!entry.startsWith('.') && entry !== 'addons') {
            results.push(...findSceneFiles(fullPath));
          }
        } else if (extname(entry) === '.tscn') {
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
