import { readFileSync, existsSync } from 'fs';
import { join, resolve, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
import { minimatch } from 'minimatch';
import { GodotClassRegistry } from '../typings/godot-registry.ts';

// ─── Config Types ─────────────────────────────────────────────

export interface TsToGdConfig {
  /** Godot version to use for typings (e.g. "4.6"). If omitted, uses "latest". */
  godotVersion?: string;
  /** Path to a custom godot-class-registry.json. Overrides godotVersion. */
  registryPath?: string;
  /** Root directory (base for relative paths). Defaults to config file directory or CWD. */
  rootDir?: string;
  /** TypeScript source directory (relative to rootDir or absolute). Defaults to rootDir. */
  tsDir?: string;
  /** GDScript output directory (relative to rootDir or absolute). Defaults to tsDir. */
  gdDir?: string;
  /** Directory for all generated typings (globals.d.ts, scene-typings.d.ts). Relative to rootDir. Defaults to "_gdtots". */
  typingsDir?: string;
  /** Directory to scan for .tscn scene files (relative to rootDir). Defaults to rootDir. */
  scenesDir?: string;
  /** Path to tsconfig.json */
  tsconfig?: string;
  /** Generate source maps */
  sourceMap?: boolean;
  /** Path to Godot executable for GDScript validation */
  godotPath?: string;
  /** Glob patterns for files/folders to ignore in all conversions and typings generation. */
  ignore?: string[];
  /** Path to project.godot file (relative to rootDir). Defaults to "project.godot". */
  projectFile?: string;
}

// ─── Resolved Config ─────────────────────────────────────────

export interface ResolvedConfig {
  rootDir: string;
  tsDir: string;
  gdDir: string;
  /** Absolute path to the directory for all generated typings (globals.d.ts, scene-typings.d.ts). */
  typingsDir: string;
  scenesDir: string;
  tsconfig?: string;
  sourceMap?: boolean;
  godotVersion?: string;
  registryPath?: string;
  godotPath?: string;
  /** Glob patterns for files/folders to ignore. */
  ignore: string[];
  /** Absolute path to project.godot file. */
  projectFile: string;
}

/**
 * Loads tstogd.json and resolves all paths to absolute.
 * CLI flags can override any field via the `overrides` parameter.
 * Returns fully resolved config with absolute paths.
 */
export function resolveConfig(options?: {
  configDir?: string;
  overrides?: Partial<TsToGdConfig>;
}): ResolvedConfig {
  const configDir = options?.configDir ?? process.cwd();
  const config = loadConfig(configDir);
  const overrides = options?.overrides ?? {};

  // Merge: CLI overrides > config > defaults
  const rootDir = resolve(
    configDir,
    overrides.rootDir ?? config?.rootDir ?? '.',
  );
  const tsDir = resolve(rootDir, overrides.tsDir ?? config?.tsDir ?? '.');
  const gdDir = resolve(
    rootDir,
    overrides.gdDir ?? config?.gdDir ?? '.',
  );
  const typingsDir = resolve(
    rootDir,
    overrides.typingsDir ?? config?.typingsDir ?? '_gdtots',
  );
  const scenesDir = resolve(
    rootDir,
    overrides.scenesDir ?? config?.scenesDir ?? '.',
  );

  const ignore = overrides.ignore ?? config?.ignore ?? [];
  const projectFile = resolve(
    rootDir,
    overrides.projectFile ?? config?.projectFile ?? 'project.godot',
  );

  return {
    rootDir,
    tsDir,
    gdDir,
    typingsDir,
    scenesDir,
    ignore,
    projectFile,
    tsconfig: overrides.tsconfig ?? config?.tsconfig
      ?? (existsSync(join(rootDir, 'tsconfig.json')) ? join(rootDir, 'tsconfig.json') : undefined),
    sourceMap: overrides.sourceMap ?? config?.sourceMap,
    godotVersion: overrides.godotVersion ?? config?.godotVersion,
    registryPath: overrides.registryPath ?? config?.registryPath,
    godotPath: overrides.godotPath ?? config?.godotPath,
  };
}

// ─── Ignore Patterns ─────────────────────────────────────────

/**
 * Tests whether a file path matches any of the ignore glob patterns.
 * Paths are compared relative to rootDir using forward slashes.
 */
export function shouldIgnore(
  filePath: string,
  rootDir: string,
  patterns: string[],
): boolean {
  if (patterns.length === 0) return false;
  const rel = relative(rootDir, filePath).replace(/\\/g, '/');
  return patterns.some((pattern) => minimatch(rel, pattern, { dot: true }));
}

const CONFIG_FILENAME = 'tstogd.json';

/**
 * Loads tstogd.json from the given directory (defaults to CWD).
 * Returns null if not found.
 */
export function loadConfig(dir?: string): TsToGdConfig | null {
  const searchDir = dir ?? process.cwd();
  const configPath = join(searchDir, CONFIG_FILENAME);
  if (!existsSync(configPath)) return null;
  const raw = readFileSync(configPath, 'utf-8');
  return JSON.parse(raw) as TsToGdConfig;
}

// ─── Registry Resolution ──────────────────────────────────────

/**
 * Get the path to the package's bundled typings directory.
 * Works whether running from src/ (ts-node) or dist/ (compiled).
 */
function getPackageTypingsDir(): string {
  // This file is at src/config/index.ts or dist/config/index.js
  // Package root is two levels up
  const thisDir = dirname(fileURLToPath(import.meta.url));
  const packageRoot = resolve(thisDir, '..', '..');
  return join(packageRoot, 'typings');
}

/**
 * Reads the latest version from typings/latest/index.d.ts.
 * Parses the "// @version X.Y" comment.
 */
function getLatestVersion(): string | null {
  const typingsDir = getPackageTypingsDir();
  const latestIndex = join(typingsDir, 'latest', 'index.d.ts');
  if (!existsSync(latestIndex)) return null;
  const content = readFileSync(latestIndex, 'utf-8');
  const match = content.match(/\/\/\s*@version\s+(\S+)/);
  return match?.[1] ?? null;
}

/**
 * Resolves the bundled registry JSON path for a given version.
 * Falls back to the version referenced by latest/index.d.ts.
 */
function getBundledRegistryPath(version?: string): string | null {
  const typingsDir = getPackageTypingsDir();
  if (version) {
    const versionedPath = join(
      typingsDir,
      version,
      'godot-class-registry.json',
    );
    if (existsSync(versionedPath)) return versionedPath;
  }
  // Resolve from latest/ pointer
  const latestVersion = getLatestVersion();
  if (latestVersion) {
    const path = join(typingsDir, latestVersion, 'godot-class-registry.json');
    if (existsSync(path)) return path;
  }
  return null;
}

// ─── Godot Path Resolution ────────────────────────────────────

export interface ResolveGodotPathOptions {
  /** Explicit path from CLI flag (highest priority) */
  godotPath?: string;
  /** Directory to search for tstogd.json (defaults to CWD) */
  configDir?: string;
}

/**
 * Resolves the Godot executable path with the following priority:
 * 1. Explicit --godot-path CLI flag
 * 2. godotPath from tstogd.json
 * 3. GODOT_PATH environment variable
 * 4. "godot" on system PATH
 */
export function resolveGodotPath(options?: ResolveGodotPathOptions): string {
  if (options?.godotPath) return resolve(options.godotPath);

  const config = loadConfig(options?.configDir);
  if (config?.godotPath) {
    const configDir = options?.configDir ?? process.cwd();
    return resolve(configDir, config.godotPath);
  }

  if (process.env.GODOT_PATH) return process.env.GODOT_PATH;

  return 'godot';
}

// ─── Registry Resolution ──────────────────────────────────────

export interface ResolveRegistryOptions {
  /** Explicit registry path from CLI flag (highest priority) */
  registryPath?: string;
  /** Directory to search for tstogd.json (defaults to CWD) */
  configDir?: string;
}

/**
 * Resolves the GodotClassRegistry with the following priority:
 * 1. Explicit --registry CLI path
 * 2. registryPath from tstogd.json
 * 3. godotVersion from tstogd.json → bundled typings/<version>/
 * 4. Bundled typings/latest/
 */
export function resolveRegistry(
  options?: ResolveRegistryOptions,
): GodotClassRegistry {
  // 1. Explicit CLI path
  if (options?.registryPath) {
    return GodotClassRegistry.fromJsonFile(resolve(options.registryPath));
  }

  // 2-3. From tstogd.json
  const config = loadConfig(options?.configDir);
  if (config?.registryPath) {
    const configDir = options?.configDir ?? process.cwd();
    return GodotClassRegistry.fromJsonFile(
      resolve(configDir, config.registryPath),
    );
  }
  if (config?.godotVersion) {
    const path = getBundledRegistryPath(config.godotVersion);
    if (path) return GodotClassRegistry.fromJsonFile(path);
  }

  // 4. Bundled latest
  const latestPath = getBundledRegistryPath();
  if (latestPath) return GodotClassRegistry.fromJsonFile(latestPath);

  throw new Error(
    'Could not find Godot class registry. Provide --registry flag, ' +
      'set godotVersion in tstogd.json, or ensure typings/latest/ exists in the package.',
  );
}
