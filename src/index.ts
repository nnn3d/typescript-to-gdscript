export {
  convertTsToGd,
  type ConvertOptions,
} from './converter/ts-to-gd/index.ts';
export {
  convertGdToTs,
  type GdToTsOptions,
} from './converter/gd-to-ts/index.ts';
export { GDScriptParser } from './parser/gdscript/index.ts';
export { createTsProgram } from './parser/typescript/index.ts';
export { SourceMapper } from './sourcemap/index.ts';
export { generateTypings } from './typings/scenes.ts';
export { generateGodotDocsTypings } from './typings/godot-docs.ts';
export {
  GodotClassRegistry,
  generateGodotRegistry,
  parseGodotVersion,
} from './typings/godot-registry.ts';
export { ProjectCache, type CachedDiagnostic } from './cache/index.ts';
export { Watcher, type WatcherOptions } from './watcher/index.ts';
export {
  resolveRegistry,
  resolveConfig,
  loadConfig,
  type TsToGdConfig,
  type ResolvedConfig,
  type ResolveRegistryOptions,
} from './config/index.ts';
export type {
  TransformResult,
  TransformDiagnostic,
  TransformContext,
} from './converter/common/index.ts';
