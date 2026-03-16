import { readFileSync, existsSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { GodotClassRegistry } from '../typings/godot-registry.js';

// ─── Config Types ─────────────────────────────────────────────

export interface TsToGdConfig {
  /** Godot version to use for typings (e.g. "4.6"). If omitted, uses "latest". */
  godotVersion?: string;
  /** Path to a custom godot-class-registry.json. Overrides godotVersion. */
  registryPath?: string;
  /** Root directory for TS source files */
  rootDir?: string;
  /** Output directory for GDScript files */
  outputDir?: string;
  /** Path to tsconfig.json */
  tsconfig?: string;
  /** Generate source maps */
  sourceMap?: boolean;
  /** Path to Godot executable for GDScript validation */
  godotPath?: string;
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
    const versionedPath = join(typingsDir, version, 'godot-class-registry.json');
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
export function resolveRegistry(options?: ResolveRegistryOptions): GodotClassRegistry {
  // 1. Explicit CLI path
  if (options?.registryPath) {
    return GodotClassRegistry.fromJsonFile(resolve(options.registryPath));
  }

  // 2-3. From tstogd.json
  const config = loadConfig(options?.configDir);
  if (config?.registryPath) {
    const configDir = options?.configDir ?? process.cwd();
    return GodotClassRegistry.fromJsonFile(resolve(configDir, config.registryPath));
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
    'set godotVersion in tstogd.json, or ensure typings/latest/ exists in the package.'
  );
}
