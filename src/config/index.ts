import { readFileSync, existsSync } from 'fs';
import { join, resolve, dirname, relative, basename } from 'path';
import { tmpdir } from 'os';
import { fileURLToPath } from 'url';
import { minimatch } from 'minimatch';
import { GodotClassRegistry } from '../typings/godot-registry.ts';

// ─── Config Types ─────────────────────────────────────────────

export interface TsToGdConfig {
  /** Root directory (base for relative paths). Defaults to config file directory or CWD. */
  rootDir?: string;
  /** TypeScript source directory (relative to rootDir or absolute). Defaults to rootDir. */
  tsDir?: string;
  /** Directory for all generated typings (globals.d.ts, scene-typings.d.ts). Relative to rootDir. Defaults to "_gdtots". */
  typingsDir?: string;
  /** Directory to scan for .tscn scene files (relative to rootDir). Defaults to rootDir. */
  scenesDir?: string;
  /** Path to tsconfig.json */
  tsconfig?: string;
  /** Path to Godot executable for GDScript validation */
  godotPath?: string;
  /** Glob patterns for files/folders to exclude from all conversions and typings generation. */
  exclude?: string[];
  /** Path to project.godot file (relative to rootDir). Defaults to "project.godot". */
  projectFile?: string;
  /** Disable Godot executable validation (linting, ESLint). When false (default), an error is raised if Godot is not found. */
  disableGodotLint?: boolean;
  /** Cache directory. Default: `node_modules/.cache/typescript-to-gdscript` or temp dir. */
  cacheDir?: string;
  /** Source maps directory. Default: `${cacheDir}/sourcemaps`. */
  sourcemapsDir?: string;
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
  godotPath?: string;
  /** Glob patterns for files/folders to ignore. */
  ignore: string[];
  /** Absolute path to project.godot file. */
  projectFile: string;
  /** Disable Godot executable validation. */
  disableGodotLint: boolean;
  /** Absolute path to cache directory. */
  cacheDir: string;
  /** Absolute path to source maps directory. */
  sourcemapsDir: string;
}

/**
 * Loads tstogd.json and resolves all paths to absolute.
 * CLI flags can override any field via the `overrides` parameter.
 * Returns fully resolved config with absolute paths.
 */
/** CLI-only overrides that don't come from tstogd.json */
export interface ConfigOverrides extends Partial<TsToGdConfig> {
  /** GDScript output directory (CLI-only, not stored in tstogd.json) */
  gdDir?: string;
  /** Generate source maps (CLI-only flag, always true for lint/eslint) */
  sourceMap?: boolean;
}

export function resolveConfig(options?: {
  configDir?: string;
  overrides?: ConfigOverrides;
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
    overrides.gdDir ?? '.',
  );
  const typingsDir = resolve(
    rootDir,
    overrides.typingsDir ?? config?.typingsDir ?? '_gdtots',
  );
  const scenesDir = resolve(
    rootDir,
    overrides.scenesDir ?? config?.scenesDir ?? '.',
  );

  const ignore = overrides.exclude ?? config?.exclude ?? [];
  const projectFile = resolve(
    rootDir,
    overrides.projectFile ?? config?.projectFile ?? 'project.godot',
  );
  const cacheDir = resolve(
    rootDir,
    overrides.cacheDir ?? config?.cacheDir ??
      (existsSync(join(rootDir, 'node_modules'))
        ? join('node_modules', '.cache', 'typescript-to-gdscript')
        : join(tmpdir(), 'typescript-to-gdscript', basename(rootDir))),
  );
  const sourcemapsDir = resolve(
    rootDir,
    overrides.sourcemapsDir ?? config?.sourcemapsDir ?? join(cacheDir, 'sourcemaps'),
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
    godotPath: overrides.godotPath ?? config?.godotPath,
    disableGodotLint: config?.disableGodotLint ?? false,
    cacheDir,
    sourcemapsDir,
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
 * Resolves the bundled registry JSON path.
 * The registry lives directly in typings/godot-class-registry.json.
 */
function getBundledRegistryPath(): string | null {
  const typingsDir = getPackageTypingsDir();
  const registryPath = join(typingsDir, 'godot-class-registry.json');
  if (existsSync(registryPath)) return registryPath;
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
 * 3. Bundled typings/godot-class-registry.json
 */
export function resolveRegistry(
  options?: ResolveRegistryOptions,
): GodotClassRegistry {
  // 1. Explicit CLI path
  if (options?.registryPath) {
    return GodotClassRegistry.fromJsonFile(resolve(options.registryPath));
  }

  // 2. Bundled registry
  const bundledPath = getBundledRegistryPath();
  if (bundledPath) return GodotClassRegistry.fromJsonFile(bundledPath);

  throw new Error(
    'Could not find Godot class registry. Provide --registry flag ' +
      'or ensure typings/godot-class-registry.json exists in the package.',
  );
}
