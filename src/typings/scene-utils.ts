import ts from 'typescript';
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative, dirname, resolve } from 'path';
import { parseScene, resourceParser, getSectionAttr } from './scene-parser.ts';
import type { GodotClassRegistry } from './godot-registry.ts';
import { SyntaxType } from '../parser/godot-resource/types.ts';
import { isAnonymousClassName } from '../converter/common/index.ts';

// ─── Interfaces ────────────────────────────────────────────

export interface EnumMemberInfo { name: string; value: number }
export interface EnumInfo { name: string; members: EnumMemberInfo[] }
export interface InnerClassInfo { name: string; extendsName?: string }
export interface ScriptInfo {
  className: string;
  isAnonymous: boolean;
  tsAbsPath: string;
  enums: EnumInfo[];
  innerClasses: InnerClassInfo[];
  /** Whether this class extends Node (directly or transitively). */
  extendsNode: boolean;
}

export interface ScriptClassInfo {
  className: string;
  tsModulePath: string;
  /** Absolute path to the .ts source file */
  tsAbsPath: string;
  extendsClassName?: string;
}

export interface ScriptlessSceneInfo {
  alias: string;
  rootType: string;
  sceneMap?: Map<string, string>;
}

export interface AutoloadEntry {
  /** Global singleton name (e.g. "Globals", "LevelTransition") */
  name: string;
  /** Resource path (e.g. "res://Scripts/Globals.gd" or "res://level_transition.tscn") */
  resPath: string;
}

/**
 * Resolved signal handler info: method name -> typed parameters.
 */
export interface SignalHandlerInfo {
  /** Signal handler method name (e.g. "_on_area_entered") */
  method: string;
  /** Typed parameters from the connected signal */
  params: Array<{ name: string; gdType: string }>;
}

// ─── Naming Helpers ─────────────────────────────────────────

/** Derive a synthetic alias from a scene res:// path, e.g. "res://Level2.tscn" -> "_Level2Tscn" */
export function sceneResPathToAlias(resPath: string): string {
  const stripped = resPath.replace(/^res:\/\//, '').replace(/\.[^.]+$/, '');
  const name = stripped.split('/').map(p => p.replace(/[^a-zA-Z0-9]/g, '_')).join('_');
  return `_${name}Tscn`;
}

/** Derive output file name from scene res:// path, e.g. "res://Player.tscn" -> "Player.tscn.d.ts" */
export function sceneResPathToOutputFile(resPath: string): string {
  return resPath.replace(/^res:\/\//, '').replace(/\.tscn$/, '.tscn.d.ts');
}

/** Derive output file name from script res:// path, e.g. "res://Player.gd" -> "Player.gd.d.ts" */
export function scriptResPathToOutputFile(resPath: string): string {
  return resPath.replace(/^res:\/\//, '') + '.d.ts';
}

/** Derive scene tree interface name from scene res:// path, e.g. "res://Player.tscn" -> "_PlayerTscn_Tree" */
export function sceneResPathToTreeName(resPath: string): string {
  const base = resPath
    .replace(/^res:\/\//, '')
    .replace(/\.tscn$/, '')
    .replaceAll('/', '_')
    .replaceAll(' ', '_');
  return `_${base}Tscn_Tree`;
}

/** Derive __Trees interface name from script res:// path, e.g. "res://Player.gd" -> "__PlayerGd__Trees" */
export function scriptResPathToTreesInterfaceName(resPath: string): string {
  const base = resPath
    .replace(/^res:\/\//, '')
    .replace(/\.gd$/, '')
    .replaceAll('/', '_')
    .replaceAll(' ', '_');
  return `__${base}Gd__Trees`;
}

/** Derive __Parents interface name from scene res:// path, e.g. "res://Player.tscn" -> "__PlayerTscn__Parents" */
export function sceneResPathToParentsInterfaceName(resPath: string): string {
  const alias = sceneResPathToAlias(resPath);
  return `_${alias}__Parents`;
}

/** Derive a type name for a node in a scene, e.g. ("_PlayerTscn", "Sprite2D/AnimationPlayer") -> "_PlayerTscn_Sprite2D_AnimationPlayer" */
export function nodePathToTypeName(sceneAlias: string, nodePath: string): string {
  return `${sceneAlias}_${nodePath.replaceAll('/', '_').replace(/[^a-zA-Z0-9_]/g, '_')}`;
}

/** Derive output file name from a resource res:// path, e.g. "res://material.tres" -> "material.tres.d.ts" */
export function resourceResPathToOutputFile(resPath: string): string {
  return resPath.replace(/^res:\/\//, '') + '.d.ts';
}

/**
 * Compute a relative import path from an output file to a TS source
 * file. The project default is `moduleResolution: "classic"` (set by
 * the `tstogd init` template), which resolves bare-name specifiers
 * via the `.ts` extension search order — so we strip the trailing
 * `.ts` and emit no extension at all. Callers that need the original
 * `.ts` form (for `declare module "<path>"`) can re-append it; see
 * `tsModulePath` in `src/typings/scenes.ts`.
 */
export function computeTsImport(outputDir: string, fromOutputFile: string, tsAbsPath: string): string {
  const fromAbsDir = resolve(outputDir, dirname(fromOutputFile));
  let rel = relative(fromAbsDir, tsAbsPath).replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel.replace(/\.ts$/, '');
}

/** Convert an absolute file path to a res:// path relative to rootDir */
export function absPathToResPath(absPath: string, rootDir: string): string {
  return 'res://' + relative(rootDir, absPath).replace(/\\/g, '/');
}

// ─── Signal Handler Resolution ──────────────────────────────

/**
 * Resolves signal handler types for a GDScript file by scanning .tscn scenes for connections.
 *
 * Given a script's res:// path, finds all scenes that reference it, parses their connections,
 * and looks up signal parameter types from the Godot class registry.
 *
 * @param scriptResPath - The res:// path of the GD script (e.g. "res://Player.gd")
 * @param sceneFiles - Array of absolute paths to .tscn files to scan
 * @param registry - GodotClassRegistry for signal parameter lookup
 * @returns Map of method name -> typed parameter info
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

      // Resolve "from" node path -> Godot type
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

/**
 * Pre-collects signal handler types for ALL scripts by parsing all scenes ONCE.
 * Returns Map<scriptResPath, Map<methodName, SignalHandlerInfo>>.
 * This is much faster than calling resolveSignalHandlers() per script file,
 * which would re-parse all scenes for every .gd file.
 */
export function collectAllSignalHandlers(
  sceneFiles: string[],
  registry: GodotClassRegistry,
): Map<string, Map<string, SignalHandlerInfo>> {
  const allHandlers = new Map<string, Map<string, SignalHandlerInfo>>();

  for (const scenePath of sceneFiles) {
    const scene = parseScene(scenePath);
    if (!scene) continue;

    for (const conn of scene.connections) {
      // Find which script(s) handle this connection's "to" node
      for (const script of scene.scripts) {
        const nodePath = script.nodePath;
        let targetMatch = false;

        if (conn.toPath === '.' && nodePath === '.') {
          targetMatch = true;
        } else if (conn.toPath === nodePath) {
          targetMatch = true;
        } else if (nodePath === '.') {
          // Root script handles any "to" path not handled by a more specific script
          targetMatch = true;
        } else if (conn.toPath.startsWith(nodePath + '/')) {
          targetMatch = true;
        }

        if (!targetMatch) continue;

        // Get or create handler map for this script
        let handlers = allHandlers.get(script.scriptResPath);
        if (!handlers) {
          handlers = new Map();
          allHandlers.set(script.scriptResPath, handlers);
        }

        // Skip if already resolved this method for this script
        if (handlers.has(conn.method)) continue;

        // Resolve "from" node path -> Godot type
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
  }

  return allHandlers;
}

// ─── Autoload Parsing ───────────────────────────────────────

/**
 * Resolve a Godot `uid://...` to a `res://...` path by scanning `.uid` files.
 *
 * Strategy:
 * 1. Try `<autoloadName>.gd.uid` and `<autoloadName>.tscn.uid` by name (fast path).
 * 2. Fall back to scanning all `.uid` files in the project directory.
 *
 * Returns `null` if the UID cannot be resolved.
 */
function resolveUidToResPath(uid: string, rootDir: string, autoloadName?: string): string | null {
  // Fast path: try <name>.gd.uid and <name>.tscn.uid by name
  if (autoloadName) {
    for (const ext of ['.gd.uid', '.tscn.uid']) {
      const candidate = findFileByName(autoloadName + ext, rootDir);
      if (candidate) {
        try {
          const content = readFileSync(candidate, 'utf-8').trim();
          if (content === uid) {
            const resourcePath = candidate.slice(0, -4); // strip ".uid"
            const relPath = relative(rootDir, resourcePath).replace(/\\/g, '/');
            return 'res://' + relPath;
          }
        } catch { /* skip */ }
      }
    }
  }
  // Slow path: scan all .uid files recursively
  return findUidFile(uid, rootDir, rootDir);
}

/** Find a file by name recursively in a directory. */
function findFileByName(fileName: string, dir: string): string | null {
  let entries: string[];
  try { entries = readdirSync(dir); } catch { return null; }
  for (const entry of entries) {
    if (entry.startsWith('.') || entry === 'node_modules') continue;
    const fullPath = join(dir, entry);
    try {
      if (entry === fileName) return fullPath;
      if (statSync(fullPath).isDirectory()) {
        const result = findFileByName(fileName, fullPath);
        if (result) return result;
      }
    } catch { /* skip */ }
  }
  return null;
}

/** Recursively search for a .uid file whose content matches the target UID. */
function findUidFile(targetUid: string, dir: string, rootDir: string): string | null {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return null;
  }
  for (const entry of entries) {
    if (entry.startsWith('.') || entry === 'node_modules') continue;
    const fullPath = join(dir, entry);
    try {
      if (statSync(fullPath).isDirectory()) {
        const result = findUidFile(targetUid, fullPath, rootDir);
        if (result) return result;
      } else if (entry.endsWith('.uid')) {
        const content = readFileSync(fullPath, 'utf-8').trim();
        if (content === targetUid) {
          // .uid file sits next to the resource: "Foo.gd.uid" -> "Foo.gd"
          const resourcePath = fullPath.slice(0, -4); // strip ".uid"
          const relPath = relative(rootDir, resourcePath).replace(/\\/g, '/');
          return 'res://' + relPath;
        }
      }
    } catch {
      // skip inaccessible
    }
  }
  return null;
}

/**
 * Parses the [autoload] section from a project.godot file.
 * Autoload entries look like: `Name="*res://path.gd"`, `Name="*res://path.tscn"`,
 * or `Name="*uid://..."` (Godot 4.4+).
 * The `*` prefix means the autoload is enabled.
 */
export function parseAutoloads(projectFilePath: string): AutoloadEntry[] {
  if (!existsSync(projectFilePath)) return [];

  const rootDir = dirname(projectFilePath);
  const content = readFileSync(projectFilePath, 'utf-8');
  const root = resourceParser.parse(content);
  const entries: AutoloadEntry[] = [];

  for (const section of root.namedChildren) {
    if (section.type !== SyntaxType.Section) continue;
    const sectionIdent = section.namedChildren.find(c => c.type === SyntaxType.Identifier);
    if (!sectionIdent || sectionIdent.text !== 'autoload') continue;

    // Parse properties: Name="*res://path" or Name="*uid://..."
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
      if (!rawValue.startsWith('*')) continue;
      let resPath = rawValue.slice(1); // strip '*'

      // Resolve uid:// to res:// by scanning .uid files
      if (resPath.startsWith('uid://')) {
        const resolved = resolveUidToResPath(resPath, rootDir, name);
        if (!resolved) continue; // skip unresolvable UIDs
        resPath = resolved;
      }

      entries.push({ name, resPath });
    }
  }

  return entries;
}

// ─── TS Class Scanning ──────────────────────────────────────

/**
 * Check if a class declaration extends Node (directly or transitively).
 * Walks the heritage chain through both TS types and the Godot class registry.
 */
/** Get the `extends` class name from a class declaration's heritage clause. */
function getExtendsName(decl: ts.ClassDeclaration): string | undefined {
  const clause = decl.heritageClauses?.find(
    (c) => c.token === ts.SyntaxKind.ExtendsKeyword,
  );
  if (!clause || clause.types.length === 0) return undefined;
  const expr = clause.types[0]!.expression;
  if (ts.isIdentifier(expr)) return expr.text;
  return expr.getText();
}

/** Find a class declaration by name in any source file of the program. */
function findClassInProgram(program: ts.Program, name: string): ts.ClassDeclaration | undefined {
  for (const sf of program.getSourceFiles()) {
    if (sf.isDeclarationFile) continue;
    for (const stmt of sf.statements) {
      if (ts.isClassDeclaration(stmt) && stmt.name?.text === name) return stmt;
    }
  }
  return undefined;
}

function classExtendsNode(
  classDecl: ts.ClassDeclaration,
  checker: ts.TypeChecker,
  program: ts.Program,
  registry?: GodotClassRegistry,
): boolean {
  const visited = new Set<string>();

  // Strategy 1: Walk the TS type checker's base type chain
  let current: ts.Type | undefined = checker.getTypeAtLocation(classDecl);
  while (current) {
    const name = current.getSymbol()?.getName();
    if (!name || visited.has(name)) break;
    visited.add(name);
    if (name === 'Node') return true;

    // If this class is known to the Godot registry, walk the registry chain
    if (registry?.hasClass(name)) {
      return registryExtendsNode(name, registry);
    }

    const baseTypes = (current as ts.InterfaceType).getBaseTypes?.();
    if (!baseTypes || baseTypes.length === 0) break;
    current = baseTypes[0];
  }

  // Strategy 2: If type checker couldn't resolve (no tsconfig / no Godot typings),
  // walk heritage clauses syntactically and search all source files for the base class.
  {
    let baseName = getExtendsName(classDecl);
    const syntacticVisited = new Set<string>();
    while (baseName) {
      if (syntacticVisited.has(baseName)) break;
      syntacticVisited.add(baseName);
      if (baseName === 'Node') return true;
      if (registry?.hasClass(baseName)) return registryExtendsNode(baseName, registry);

      // Search all source files for a class with this name
      const baseDecl = findClassInProgram(program, baseName);
      if (!baseDecl) break;
      baseName = getExtendsName(baseDecl);
    }
  }

  return false;
}

/** Walk the Godot registry inheritance chain to check if a class extends Node. */
function registryExtendsNode(name: string, registry: GodotClassRegistry): boolean {
  let gdClass: string | null = name;
  while (gdClass) {
    if (gdClass === 'Node') return true;
    const info = registry.getClass(gdClass);
    gdClass = info?.inherits ?? null;
  }
  return false;
}

export function scanTsFilesForClasses(
  program: ts.Program,
  files: string[],
  baseDir: string,
  scriptClassMap: Map<string, ScriptInfo>,
  registry?: GodotClassRegistry,
): void {
  const checker = program.getTypeChecker();

  for (const filePath of files) {
    const sourceFile = program.getSourceFile(filePath);
    if (!sourceFile) continue;

    // Walk file-scope statements ONCE per file to collect enums and
    // non-exported classes (the new file-scope forms that lift into
    // the script class). The legacy `static X = gd.enum(...)` /
    // `static X = class {}` forms are converter errors and not
    // detected here.
    const fileScopeEnums: EnumInfo[] = [];
    const fileScopeInnerClasses: InnerClassInfo[] = [];
    for (const stmt of sourceFile.statements) {
      if (ts.isEnumDeclaration(stmt)) {
        const members: EnumMemberInfo[] = [];
        let autoValue = 0;
        for (const m of stmt.members) {
          if (!m.name || !ts.isIdentifier(m.name)) continue;
          if (m.initializer && ts.isNumericLiteral(m.initializer)) {
            const val = parseInt(m.initializer.text, 10);
            members.push({ name: m.name.text, value: val });
            autoValue = val + 1;
          } else {
            members.push({ name: m.name.text, value: autoValue++ });
          }
        }
        if (members.length > 0) {
          fileScopeEnums.push({ name: stmt.name.text, members });
        }
        continue;
      }
      if (ts.isClassDeclaration(stmt) && stmt.name) {
        const isExported = stmt.modifiers?.some(
          (m) => m.kind === ts.SyntaxKind.ExportKeyword,
        );
        if (isExported) continue; // script class \u2014 collected separately
        let extendsName: string | undefined;
        if (stmt.heritageClauses) {
          for (const clause of stmt.heritageClauses) {
            if (clause.token === ts.SyntaxKind.ExtendsKeyword && clause.types.length > 0) {
              extendsName = clause.types[0]!.expression.getText(sourceFile);
            }
          }
        }
        fileScopeInnerClasses.push({ name: stmt.name.text, extendsName });
      }
    }

    for (const statement of sourceFile.statements) {
      if (!ts.isClassDeclaration(statement) || !statement.name) continue;
      const className = statement.name.text;

      // Attach the file-scope collections to every class entry. Files
      // with multiple `class` declarations share the same file-scope
      // lifts (only the script class actually owns them, but the
      // typings generator uses these to emit `namespace ClassName {
      // type EnumName = ...; type InnerClassName = ... }`).
      const enums = fileScopeEnums;
      const innerClasses = fileScopeInnerClasses;

      const relPath = relative(baseDir, filePath).replace(/\\/g, '/');
      const scriptResPath = 'res://' + relPath.replace(/\.ts$/, '.gd');

      scriptClassMap.set(scriptResPath, {
        className,
        // New convention: anonymous = leading `_` (excluding the `G_`
        // escape used for real GD `class_name _Foo`). The legacy
        // `__CLASS__` sentinel is gone — generated TS files now use
        // `_FilenameInUpperCamel` instead.
        isAnonymous: isAnonymousClassName(className),
        tsAbsPath: filePath,
        enums,
        innerClasses,
        extendsNode: classExtendsNode(statement, checker, program, registry),
      });
    }
  }
}

// ─── Resource Type Parsing ──────────────────────────────────

/**
 * Parses the `[gd_resource type="..."]` header from a .tres/.res file
 * to determine the actual Godot resource class (e.g. "ShaderMaterial", "AudioStreamOggVorbis").
 * Returns undefined if the header cannot be parsed (binary .res files, corrupt files, etc.).
 */
export function parseGdResourceType(filePath: string): string | undefined {
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

// ─── File Finding Utilities ─────────────────────────────────

/** Known Godot asset extensions -> Godot resource type name */
export const ASSET_EXTENSION_MAP: Record<string, string> = {
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
export const ASSET_EXTENSIONS = new Set(Object.keys(ASSET_EXTENSION_MAP));

import { shouldIgnore } from '../config/index.ts';
import { extname } from 'path';

export function findProjectFiles(
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

export function findAssetFiles(
  dir: string,
  rootDir: string,
  ignore: string[],
): string[] {
  return findProjectFiles(dir, rootDir, ignore, ASSET_EXTENSIONS);
}
