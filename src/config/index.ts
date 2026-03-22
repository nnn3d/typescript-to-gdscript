import { readFileSync, existsSync } from 'fs';
import { join, resolve, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
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
  /** Directory for generated global class typings (relative to rootDir). Defaults to "_gdtots". */
  classTypingsPath?: string;
  /** Directory for generated scene typings (relative to rootDir). Defaults to classTypingsPath. */
  sceneTypingsPath?: string;
  /** Directory to scan for .tscn scene files (relative to rootDir). Defaults to rootDir. */
  scenesDir?: string;
  /** Path to tsconfig.json */
  tsconfig?: string;
  /** Generate source maps */
  sourceMap?: boolean;
  /** Path to Godot executable for GDScript validation */
  godotPath?: string;
}

// ─── Resolved Config ─────────────────────────────────────────

export interface ResolvedConfig {
  rootDir: string;
  tsDir: string;
  gdDir: string;
  classTypingsPath: string;
  sceneTypingsPath: string;
  scenesDir: string;
  tsconfig?: string;
  sourceMap?: boolean;
  godotVersion?: string;
  registryPath?: string;
  godotPath?: string;
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
    overrides.gdDir ?? config?.gdDir ?? (relative(rootDir, tsDir) || '.'),
  );
  const classTypingsPath =
    overrides.classTypingsPath ?? config?.classTypingsPath ?? '_gdtots';
  const sceneTypingsPath =
    overrides.sceneTypingsPath ?? config?.sceneTypingsPath ?? classTypingsPath;
  const scenesDir = resolve(
    rootDir,
    overrides.scenesDir ?? config?.scenesDir ?? '.',
  );

  return {
    rootDir,
    tsDir,
    gdDir,
    classTypingsPath,
    sceneTypingsPath,
    scenesDir,
    tsconfig: overrides.tsconfig ?? config?.tsconfig,
    sourceMap: overrides.sourceMap ?? config?.sourceMap,
    godotVersion: overrides.godotVersion ?? config?.godotVersion,
    registryPath: overrides.registryPath ?? config?.registryPath,
    godotPath: overrides.godotPath ?? config?.godotPath,
  };
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
