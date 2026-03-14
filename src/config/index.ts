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
 * Resolves the bundled registry JSON path for a given version.
 * Falls back to "latest" if the version folder doesn't exist.
 */
function getBundledRegistryPath(version?: string): string | null {
  const typingsDir = getPackageTypingsDir();
  if (version) {
    const versionedPath = join(typingsDir, version, 'godot-class-registry.json');
    if (existsSync(versionedPath)) return versionedPath;
  }
  const latestPath = join(typingsDir, 'latest', 'godot-class-registry.json');
  if (existsSync(latestPath)) return latestPath;
  return null;
}

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
