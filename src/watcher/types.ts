import type { ResolvedExternalPackage } from '../external-packages/index.ts';

export interface WatcherOptions {
  /** Root directory (base for relative paths) */
  rootDir: string;
  /** TypeScript source directory to watch. Defaults to rootDir. */
  tsDir?: string;
  /** GDScript output directory. Defaults to tsDir. */
  gdDir?: string;
  /** Output directory for GDScript files (deprecated, use gdDir) */
  outputDir?: string;
  /** Path to tsconfig.json */
  tsConfigPath?: string;
  /** Enable source maps */
  sourceMap?: boolean;
  /** Directory for all generated typings (globals.d.ts, scene-typings.d.ts) */
  typingsDir?: string;
  /** Directory to scan for .tscn files. Defaults to rootDir. */
  scenesDir?: string;
  /** Cache directory */
  cacheDir?: string;
  /** Callback for diagnostics */
  onDiagnostic?: (file: string, message: string, severity: string) => void;
  /** Path to Godot executable (enables GD validation after conversion) */
  godotPath?: string;
  /** Godot project root for validation (defaults to rootDir) */
  projectRoot?: string;
  /** Glob patterns for files/folders to ignore. */
  ignore?: string[];
  /** Path to project.godot file (for autoload singleton detection). */
  projectFile?: string;
  /** Emit output files even when conversion errors occur. */
  emitOnError?: boolean;
  /** Enable verbose debug logging. */
  debug?: boolean;
  /** Absolute path to Godot engine typings (for /// reference in _index.d.ts) */
  godotTypingsDir?: string;
  /** See `ConverterOptions.generateGlobalClassTypes` (default false). */
  generateGlobalClassTypes?: boolean;
  /** When true, skip the debounced full-project diagnostic check. */
  noCheck?: boolean;
  /** Emit imports within this project as relative GDScript paths. */
  lib?: boolean;
  /** Shared packages mounted below projectRoot/tstogd_modules. */
  externalPackages?: ResolvedExternalPackage[];
}
