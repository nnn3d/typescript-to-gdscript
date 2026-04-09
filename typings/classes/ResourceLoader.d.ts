// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A singleton for loading resource files. */
declare interface ResourceLoader extends GodotObject {
  /**
   * Registers a new {@link ResourceFormatLoader}. The ResourceLoader will use the ResourceFormatLoader as described in {@link load}.
   * This method is performed implicitly for ResourceFormatLoaders written in GDScript (see {@link ResourceFormatLoader} for more information).
   */
  add_resource_format_loader(format_loader: ResourceFormatLoader, at_front?: boolean): void;
  /**
   * Returns whether a recognized resource exists for the given `path`.
   * An optional `type_hint` can be used to further specify the {@link Resource} type that should be handled by the {@link ResourceFormatLoader}. Anything that inherits from {@link Resource} can be used as a type hint, for example {@link Image}.
   * **Note:** If you use {@link Resource.take_over_path}, this method will return `true` for the taken path even if the resource wasn't saved (i.e. exists only in resource cache).
   */
  exists(path: string, type_hint?: string): boolean;
  /**
   * Returns the cached resource reference for the given `path`.
   * **Note:** If the resource is not cached, the returned {@link Resource} will be invalid.
   */
  get_cached_ref(path: string): Resource | null;
  /**
   * Returns the dependencies for the resource at the given `path`.
   * Each dependency is a string that can be divided into sections by `::`. There can be either one section or three sections, with the second section always being empty. When there is one section, it contains the file path. When there are three sections, the first section contains the UID and the third section contains the fallback path.
   */
  get_dependencies(path: string): PackedStringArray;
  /** Returns the list of recognized extensions for a resource type. */
  get_recognized_extensions_for_type(type_: string): PackedStringArray;
  /** Returns the ID associated with a given resource path, or `-1` when no such ID exists. */
  get_resource_uid(path: string): int;
  /**
   * Returns whether a cached resource is available for the given `path`.
   * Once a resource has been loaded by the engine, it is cached in memory for faster access, and future calls to the {@link load} method will use the cached version. The cached resource can be overridden by using {@link Resource.take_over_path} on a new resource for that same path.
   */
  has_cached(path: string): boolean;
  /**
   * Lists a directory, returning all resources and subdirectories contained within. The resource files have the original file names as visible in the editor before exporting. The directories have `"/"` appended.
   * **Note:** The order of files and directories returned by this method is not deterministic, and can vary between operating systems.
   * **Note:** To normally traverse the filesystem, see {@link DirAccess}.
   */
  list_directory(directory_path: string): PackedStringArray;
  /**
   * Loads a resource at the given `path`, caching the result for further access.
   * The registered {@link ResourceFormatLoader}s are queried sequentially to find the first one which can handle the file's extension, and then attempt loading. If loading fails, the remaining ResourceFormatLoaders are also attempted.
   * An optional `type_hint` can be used to further specify the {@link Resource} type that should be handled by the {@link ResourceFormatLoader}. Anything that inherits from {@link Resource} can be used as a type hint, for example {@link Image}.
   * The `cache_mode` property defines whether and how the cache should be used or updated when loading the resource.
   * Returns an empty resource if no {@link ResourceFormatLoader} could handle the file, and prints an error if no file is found at the specified path.
   * GDScript has a simplified {@link @GDScript.load} built-in method which can be used in most situations, leaving the use of {@link ResourceLoader} for more advanced scenarios.
   * **Note:** If {@link ProjectSettings.editor/export/convert_text_resources_to_binary} is `true`, {@link @GDScript.load} will not be able to read converted files in an exported project. If you rely on run-time loading of files present within the PCK, set {@link ProjectSettings.editor/export/convert_text_resources_to_binary} to `false`.
   * **Note:** Relative paths will be prefixed with `"res://"` before loading, to avoid unexpected results make sure your paths are absolute.
   */
  load(path: string, type_hint?: string, cache_mode?: int): Resource | null;
  /**
   * Returns the resource loaded by {@link load_threaded_request}.
   * If this is called before the loading thread is done (i.e. {@link load_threaded_get_status} is not {@link THREAD_LOAD_LOADED}), the calling thread will be blocked until the resource has finished loading. However, it's recommended to use {@link load_threaded_get_status} to known when the load has actually completed.
   */
  load_threaded_get(path: string): Resource | null;
  /**
   * Returns the status of a threaded loading operation started with {@link load_threaded_request} for the resource at `path`.
   * An array variable can optionally be passed via `progress`, and will return a one-element array containing the ratio of completion of the threaded loading (between `0.0` and `1.0`).
   * **Note:** The recommended way of using this method is to call it during different frames (e.g., in {@link Node._process}, instead of a loop).
   */
  load_threaded_get_status(path: string, progress?: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): int;
  /**
   * Loads the resource using threads. If `use_sub_threads` is `true`, multiple threads will be used to load the resource, which makes loading faster, but may affect the main thread (and thus cause game slowdowns).
   * The `cache_mode` parameter defines whether and how the cache should be used or updated when loading the resource.
   */
  load_threaded_request(path: string, type_hint?: string, use_sub_threads?: boolean, cache_mode?: int): int;
  /** Unregisters the given {@link ResourceFormatLoader}. */
  remove_resource_format_loader(format_loader: ResourceFormatLoader): void;
  /** Changes the behavior on missing sub-resources. The default behavior is to abort loading. */
  set_abort_on_missing_resources(abort: boolean): void;

  // enum ThreadLoadStatus
  /** The resource is invalid, or has not been loaded with {@link load_threaded_request}. */
  readonly THREAD_LOAD_INVALID_RESOURCE: int;
  /** The resource is still being loaded. */
  readonly THREAD_LOAD_IN_PROGRESS: int;
  /** Some error occurred during loading and it failed. */
  readonly THREAD_LOAD_FAILED: int;
  /** The resource was loaded successfully and can be accessed via {@link load_threaded_get}. */
  readonly THREAD_LOAD_LOADED: int;
  // enum CacheMode
  /**
   * Neither the main resource (the one requested to be loaded) nor any of its subresources are retrieved from cache nor stored into it. Dependencies (external resources) are loaded with {@link CACHE_MODE_REUSE}.
   */
  readonly CACHE_MODE_IGNORE: int;
  /**
   * The main resource (the one requested to be loaded), its subresources, and its dependencies (external resources) are retrieved from cache if present, instead of loaded. Those not cached are loaded and then stored into the cache. The same rules are propagated recursively down the tree of dependencies (external resources).
   */
  readonly CACHE_MODE_REUSE: int;
  /**
   * Like {@link CACHE_MODE_REUSE}, but the cache is checked for the main resource (the one requested to be loaded) as well as for each of its subresources. Those already in the cache, as long as the loaded and cached types match, have their data refreshed from storage into the already existing instances. Otherwise, they are recreated as completely new objects.
   */
  readonly CACHE_MODE_REPLACE: int;
  /**
   * Like {@link CACHE_MODE_IGNORE}, but propagated recursively down the tree of dependencies (external resources).
   */
  readonly CACHE_MODE_IGNORE_DEEP: int;
  /**
   * Like {@link CACHE_MODE_REPLACE}, but propagated recursively down the tree of dependencies (external resources).
   */
  readonly CACHE_MODE_REPLACE_DEEP: int;
}
declare const ResourceLoader: ResourceLoader;

