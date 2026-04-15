import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, relative, extname, dirname, resolve } from 'path';
import { createTsProgram } from '../parser/typescript/index.ts';
import { resolveRegistry } from '../config/index.ts';
import { convertGdToTs } from '../converter/gd-to-ts/index.ts';
import { findAddonGdFiles } from '../cli/helpers.ts';
import { ProjectCache } from '../cache/index.ts';

import { parseScene } from './scene-parser.ts';
import {
  generateSceneTypingContent,
  generateScriptTypingContent,
  generateIndexTypingContent,
} from './content-generators.ts';
import {
  absPathToResPath,
  sceneResPathToOutputFile,
  scriptResPathToOutputFile,
  computeTsImport,
  scanTsFilesForClasses,
  parseAutoloads,
  findSceneFiles,
  findAssetFiles,
  parseGdResourceType,
  ASSET_EXTENSION_MAP,
  resolveSignalHandlers,
  collectAllSignalHandlers,
  type ScriptInfo,
  type SignalHandlerInfo,
  type ScriptClassInfo,
  type AutoloadEntry,
} from './scene-utils.ts';

// ─── Re-exports (public API — other files import from scenes.ts) ───

export { parseAutoloads, resolveSignalHandlers, collectAllSignalHandlers, findSceneFiles };
export type { SignalHandlerInfo, ScriptClassInfo, AutoloadEntry };

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
  /** Optional cache instance for skipping unchanged typings */
  cache?: ProjectCache;
}

/**
 * Generates per-file .d.ts typings in outputDir:
 * - Per-scene .tscn.d.ts files (scene tree interfaces, GodotResources, parent entries)
 * - Per-script .gd.d.ts files (module augmentation, global class, GodotScripts)
 * - Per-resource .d.ts files (GodotResources entries)
 * - _index.d.ts (empty global interfaces, autoload singletons)
 * Returns list of written file paths.
 */
export function generateTypings(options: GenerateTypingsOptions): string[] {
  const { rootDir, tsDir, outputDir, scenesDir, ignore = [], cache } = options;
  const writtenFiles: string[] = [];
  const typingSources: string[] = []; // Track all sources for cleanStale

  mkdirSync(outputDir, { recursive: true });

  // 1. Scan TS files for class declarations
  const program = createTsProgram({
    rootDir: tsDir,
    files: options.files,
    tsConfigPath: options.tsConfigPath,
  });

  // Map: script res:// path -> class info including enums and inner classes
  const scriptClassMap = new Map<string, ScriptInfo>();

  let registry;
  try { registry = resolveRegistry({ registryPath: options.registryPath }); } catch { /* optional */ }
  scanTsFilesForClasses(program, options.files, tsDir, scriptClassMap, registry);

  // 2. Find and process all .tscn files
  const sceneFiles = findSceneFiles(scenesDir, rootDir, ignore);

  // Track unique names per scene (need to scan raw parsed data)
  for (const sceneFile of sceneFiles) {
    typingSources.push(sceneFile);
    const actualResPath = absPathToResPath(sceneFile, rootDir);
    const outputFile = sceneResPathToOutputFile(actualResPath);
    const outputPath = resolve(outputDir, outputFile);

    // Cache check: skip if scene file and .d.ts are unchanged
    if (cache?.isTypingsFresh(sceneFile, outputPath)) {
      writtenFiles.push(outputPath);
      continue;
    }

    const sceneData = parseScene(sceneFile);
    if (!sceneData) continue;

    // Collect unique name nodes from the parsed data
    const uniqueNames = new Set<string>();
    for (const script of sceneData.scripts) {
      for (const child of script.children) {
        if (child.path.startsWith('%')) {
          uniqueNames.add(child.path.slice(1));
        }
      }
    }

    const content = generateSceneTypingContent(actualResPath, sceneData, uniqueNames);
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, content);
    writtenFiles.push(outputPath);
    cache?.updateTypings(sceneFile, outputPath);
  }

  // 3. Generate .gd.d.ts for each script
  for (const [scriptResPath, classInfo] of scriptClassMap) {
    typingSources.push(classInfo.tsAbsPath);
    const outputFile = scriptResPathToOutputFile(scriptResPath);
    const outputPath = resolve(outputDir, outputFile);

    // Cache check: skip if TS source and .d.ts are unchanged
    if (cache?.isTypingsFresh(classInfo.tsAbsPath, outputPath)) {
      writtenFiles.push(outputPath);
      continue;
    }

    const tsImportPath = computeTsImport(outputDir, outputFile, classInfo.tsAbsPath);
    // Module path for declare module (uses .ts extension)
    const tsModulePath = tsImportPath.replace(/\.js$/, '.ts');

    const content = generateScriptTypingContent(
      scriptResPath,
      classInfo.className,
      classInfo.isAnonymous,
      tsImportPath,
      tsModulePath,
      classInfo.enums,
      classInfo.innerClasses,
      classInfo.extendsNode,
    );

    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, content);
    writtenFiles.push(outputPath);
    cache?.updateTypings(classInfo.tsAbsPath, outputPath);
  }

  // 4. Generate bundled _resources.d.ts for all asset files
  const assetFiles = findAssetFiles(rootDir, rootDir, ignore);
  const resourceEntries: Array<{ resPath: string; godotType: string }> = [];
  for (const assetFile of assetFiles) {
    const resPath = absPathToResPath(assetFile, rootDir);
    const ext = extname(assetFile).toLowerCase();

    // Skip .tscn files (handled by scene generator) and .gd files (handled by script generator)
    if (ext === '.tscn' || ext === '.gd') continue;

    let godotType: string;
    if (ext === '.tres' || ext === '.res') {
      godotType = parseGdResourceType(assetFile) ?? ASSET_EXTENSION_MAP[ext] ?? 'Resource';
    } else {
      godotType = ASSET_EXTENSION_MAP[ext] ?? 'Resource';
    }

    resourceEntries.push({ resPath, godotType });
  }

  if (resourceEntries.length > 0) {
    const resLines: string[] = [];
    resLines.push('// AUTO-GENERATED — do not edit manually.\n');
    resLines.push('declare global {');
    resLines.push('  interface GodotResources {');
    for (const { resPath, godotType } of resourceEntries) {
      resLines.push(`    "${resPath}": ${godotType};`);
    }
    resLines.push('  }');
    resLines.push('}\n');
    resLines.push('export {}');
    const resourcesPath = resolve(outputDir, '_resources.d.ts');
    writeFileSync(resourcesPath, resLines.join('\n'));
    writtenFiles.push(resourcesPath);
  }

  // 5. Generate _index.d.ts
  const projectFile = options.projectFile ?? join(rootDir, 'project.godot');
  const autoloads = existsSync(projectFile) ? parseAutoloads(projectFile) : [];

  const indexContent = generateIndexTypingContent(autoloads);
  const indexPath = resolve(outputDir, '_index.d.ts');
  writeFileSync(indexPath, indexContent);
  writtenFiles.push(indexPath);

  // Clean stale typings entries and save cache
  if (cache) {
    const currentTypingSources = new Set(typingSources.map(f => f.replace(/\\/g, '/')));
    cache.cleanStale(undefined, undefined, currentTypingSources);
    cache.save();
  }

  return writtenFiles;
}

// ─── Per-file Typings Generation (incremental) ─────────────

export interface GenerateFileTypingsOptions {
  rootDir: string;
  tsDir: string;
  outputDir: string;
  tsConfigPath?: string;
  scenesDir?: string;
  ignore?: string[];
  projectFile?: string;
  /** Optional cache instance for skipping unchanged typings */
  cache?: ProjectCache;
}

/**
 * Regenerate typings for specific changed files (incremental).
 * Handles .ts, .tscn, .tres/.res, and project.godot files.
 * All TS files must be passed for the TS program to resolve cross-references.
 */
export function generateFileTypings(
  changedFiles: string[],
  allTsFiles: string[],
  options: GenerateFileTypingsOptions,
): string[] {
  const { rootDir, tsDir, outputDir, ignore = [], cache } = options;
  const writtenFiles: string[] = [];

  mkdirSync(outputDir, { recursive: true });

  const changedTs = changedFiles.filter(f => f.endsWith('.ts') && !f.endsWith('.d.ts'));
  const changedScenes = changedFiles.filter(f => f.endsWith('.tscn'));
  const changedResources = changedFiles.filter(f =>
    f.endsWith('.tres') || f.endsWith('.res') ||
    f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.ogg') ||
    f.endsWith('.wav') || f.endsWith('.mp3') || f.endsWith('.gdshader') ||
    f.endsWith('.theme'),
  );
  const changedProject = changedFiles.filter(f => f.endsWith('project.godot'));

  // Regenerate .gd.d.ts for changed .ts files
  if (changedTs.length > 0) {
    // Need full TS program for type resolution, but only generate typings for changed files
    const program = createTsProgram({
      rootDir: tsDir,
      files: allTsFiles,
      tsConfigPath: options.tsConfigPath,
    });
    const scriptClassMap = new Map<string, ScriptInfo>();
    let fileRegistry;
    try { fileRegistry = resolveRegistry(); } catch { /* optional */ }
    scanTsFilesForClasses(program, changedTs, tsDir, scriptClassMap, fileRegistry);

    for (const [scriptResPath, classInfo] of scriptClassMap) {
      const outputFile = scriptResPathToOutputFile(scriptResPath);
      const tsImportPath = computeTsImport(outputDir, outputFile, classInfo.tsAbsPath);
      const tsModulePath = tsImportPath.replace(/\.js$/, '.ts');

      const content = generateScriptTypingContent(
        scriptResPath,
        classInfo.className,
        classInfo.isAnonymous,
        tsImportPath,
        tsModulePath,
        classInfo.enums,
        classInfo.innerClasses,
      );

      const outputPath = resolve(outputDir, outputFile);
      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, content);
      writtenFiles.push(outputPath);
      cache?.updateTypings(classInfo.tsAbsPath, outputPath);
    }
  }

  // Regenerate .tscn.d.ts for changed .tscn files
  for (const sceneFile of changedScenes) {
    const sceneData = parseScene(sceneFile);
    if (!sceneData) continue;

    const actualResPath = absPathToResPath(sceneFile, rootDir);
    const uniqueNames = new Set<string>();
    for (const script of sceneData.scripts) {
      for (const child of script.children) {
        if (child.path.startsWith('%')) {
          uniqueNames.add(child.path.slice(1));
        }
      }
    }

    const content = generateSceneTypingContent(actualResPath, sceneData, uniqueNames);
    const outputFile = sceneResPathToOutputFile(actualResPath);
    const outputPath = resolve(outputDir, outputFile);
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, content);
    writtenFiles.push(outputPath);
    cache?.updateTypings(sceneFile, outputPath);
  }

  // Regenerate _resources.d.ts if any resource/asset changed
  if (changedResources.length > 0) {
    const assetFiles = findAssetFiles(rootDir, rootDir, ignore);
    const resourceEntries: Array<{ resPath: string; godotType: string }> = [];
    for (const assetFile of assetFiles) {
      const resPath = absPathToResPath(assetFile, rootDir);
      const ext = extname(assetFile).toLowerCase();
      if (ext === '.tscn' || ext === '.gd') continue;
      let godotType: string;
      if (ext === '.tres' || ext === '.res') {
        godotType = parseGdResourceType(assetFile) ?? ASSET_EXTENSION_MAP[ext] ?? 'Resource';
      } else {
        godotType = ASSET_EXTENSION_MAP[ext] ?? 'Resource';
      }
      resourceEntries.push({ resPath, godotType });
    }
    if (resourceEntries.length > 0) {
      const resLines: string[] = [];
      resLines.push('// AUTO-GENERATED — do not edit manually.\n');
      resLines.push('declare global {');
      resLines.push('  interface GodotResources {');
      for (const { resPath, godotType } of resourceEntries) {
        resLines.push(`    "${resPath}": ${godotType};`);
      }
      resLines.push('  }');
      resLines.push('}\n');
      resLines.push('export {}');
      const resourcesPath = resolve(outputDir, '_resources.d.ts');
      writeFileSync(resourcesPath, resLines.join('\n'));
      writtenFiles.push(resourcesPath);
    }
  }

  // Regenerate _index.d.ts if project.godot changed
  if (changedProject.length > 0) {
    const projectFile = options.projectFile ?? join(rootDir, 'project.godot');
    const autoloads = existsSync(projectFile) ? parseAutoloads(projectFile) : [];
    const indexContent = generateIndexTypingContent(autoloads);
    const indexPath = resolve(outputDir, '_index.d.ts');
    writeFileSync(indexPath, indexContent);
    writtenFiles.push(indexPath);
  }

  cache?.save();

  return writtenFiles;
}

// ─── Addon Typings Generator ──────────────────────────────────

export interface GenerateAddonTypingsOptions {
  rootDir: string;
  outputDir: string;
  ignore?: string[];
  registryPath?: string;
  /** Optional cache instance for skipping unchanged addon files */
  cache?: ProjectCache;
}

/**
 * Generate typings for GDScript addon files.
 * Converts addon .gd -> .ts, writes to outputDir/addons/ preserving structure,
 * then generates .gd.d.ts scene typings for each addon script.
 */
export function generateAddonTypings(options: GenerateAddonTypingsOptions): string[] {
  const { rootDir, outputDir, cache } = options;
  const ignore = options.ignore ?? [];
  const writtenFiles: string[] = [];

  const addonGdFiles = findAddonGdFiles(rootDir, ignore);
  if (addonGdFiles.length === 0) return writtenFiles;

  // Cache check: if ALL addon files are fresh, skip the entire pipeline.
  // (Changing one addon can affect type resolution for others, so it's all-or-nothing.)
  if (cache) {
    const allFresh = addonGdFiles.every(gdPath => {
      const relPath = relative(rootDir, gdPath).replace(/\\/g, '/');
      const tsPath = resolve(outputDir, relPath.replace(/\.gd$/, '.ts'));
      const dtsPath = resolve(
        outputDir,
        scriptResPathToOutputFile('res://' + relPath),
      );
      return cache.isAddonFresh(gdPath, tsPath, dtsPath);
    });
    if (allFresh) return writtenFiles;
  }

  const registry = resolveRegistry({ registryPath: options.registryPath });
  const addonSources = addonGdFiles.map(f => ({
    source: readFileSync(f, 'utf-8'),
    filePath: f,
  }));

  // Pass 1: Convert all addon .gd -> .ts, write to outputDir
  const addonTsPaths: string[] = [];
  for (const { source, filePath } of addonSources) {
    const result = convertGdToTs({ source, filePath, registry, projectSources: addonSources });
    const relPath = relative(rootDir, filePath).replace(/\\/g, '/');
    const outputTsPath = resolve(outputDir, relPath.replace(/\.gd$/, '.ts'));
    mkdirSync(dirname(outputTsPath), { recursive: true });
    writeFileSync(outputTsPath, '// @ts-nocheck — auto-generated from GDScript addon\n' + result.code);
    writtenFiles.push(outputTsPath);
    addonTsPaths.push(outputTsPath);
  }

  // Pass 2: Create TS program from addon .ts files, scan for classes
  const scriptClassMap = new Map<string, ScriptInfo>();
  const addonProgram = createTsProgram({ rootDir: outputDir, files: addonTsPaths });
  scanTsFilesForClasses(addonProgram, addonTsPaths, outputDir, scriptClassMap, registry);

  // Pass 3: Generate .gd.d.ts for each addon script
  for (const [scriptResPath, classInfo] of scriptClassMap) {
    const outputFile = scriptResPathToOutputFile(scriptResPath);
    const tsImportPath = computeTsImport(outputDir, outputFile, classInfo.tsAbsPath);
    const tsModulePath = tsImportPath.replace(/\.js$/, '.ts');

    const content = generateScriptTypingContent(
      scriptResPath,
      classInfo.className,
      classInfo.isAnonymous,
      tsImportPath,
      tsModulePath,
      classInfo.enums,
      classInfo.innerClasses,
      classInfo.extendsNode,
    );

    const outputPath = resolve(outputDir, outputFile);
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, content);
    writtenFiles.push(outputPath);
  }

  // Update addon cache entries after full pipeline
  if (cache) {
    for (const gdPath of addonGdFiles) {
      const relPath = relative(rootDir, gdPath).replace(/\\/g, '/');
      const tsPath = resolve(outputDir, relPath.replace(/\.gd$/, '.ts'));
      const resPath = 'res://' + relPath;
      const dtsFile = scriptResPathToOutputFile(resPath);
      const dtsPath = resolve(outputDir, dtsFile);
      if (existsSync(tsPath) && existsSync(dtsPath)) {
        cache.updateAddon(gdPath, tsPath, dtsPath);
      }
    }
    const currentAddonFiles = new Set(addonGdFiles.map(f => f.replace(/\\/g, '/')));
    cache.cleanStale(undefined, currentAddonFiles);
    cache.save();
  }

  return writtenFiles;
}
