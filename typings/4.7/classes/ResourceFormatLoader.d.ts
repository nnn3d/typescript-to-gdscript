// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Loads a specific resource type from a file. */
declare class ResourceFormatLoader extends RefCounted {
  _exists(path: string): boolean;
  _get_classes_used(path: string): PackedStringArray;
  /**
   * Should return the dependencies for the resource at the given `path`. Each dependency is a string composed of one to three sections separated by `::`, with trailing empty sections omitted:
   * - The first section should contain the UID if the resource has one. Otherwise, it should contain the file path.
   * - The second section should contain the class name of the dependency if `add_types` is `true`. Otherwise, it should be empty.
   * - The third section should contain the fallback path if the resource has a UID. Otherwise, it should be empty.
   * **Note:** Custom resource types defined by scripts aren't known by the {@link ClassDB}, so `"Resource"` can be used for the class name.
   */
  _get_dependencies(path: string, add_types: boolean): PackedStringArray;
  /** Gets the list of extensions for files this loader is able to read. */
  _get_recognized_extensions(): PackedStringArray;
  /**
   * Returns the script class name associated with the {@link Resource} under the given `path`. If the resource has no script or the script isn't a named class, it should return `""`.
   */
  _get_resource_script_class(path: string): string;
  /**
   * Gets the class name of the resource associated with the given path. If the loader cannot handle it, it should return `""`.
   * **Note:** Custom resource types defined by scripts aren't known by the {@link ClassDB}, so you might just return `"Resource"` for them.
   */
  _get_resource_type(path: string): string;
  /**
   * Should return the unique ID for the resource associated with the given path. If this method is not overridden, a `.uid` file is generated along with the resource file, containing the unique ID.
   */
  _get_resource_uid(path: string): int;
  /**
   * Tells which resource class this loader can load.
   * **Note:** Custom resource types defined by scripts aren't known by the {@link ClassDB}, so you might just handle `"Resource"` for them.
   */
  _handles_type(type_: string): boolean;
  /**
   * Loads a resource when the engine finds this loader to be compatible. If the loaded resource is the result of an import, `original_path` will target the source file. Returns a {@link Resource} object on success, or an {@link Error} constant in case of failure.
   * The `cache_mode` property defines whether and how the cache should be used or updated when loading the resource. See {@link CacheMode} for details.
   */
  _load(path: string, original_path: string, use_sub_threads: boolean, cache_mode: int): unknown;
  /**
   * Tells whether or not this loader should load a resource from its resource path for a given type.
   * If it is not implemented, the default behavior returns whether the path's extension is within the ones provided by {@link _get_recognized_extensions}, and if the type is within the ones provided by {@link _get_resource_type}.
   */
  _recognize_path(path: string, type_: string): boolean;
  /**
   * If implemented, renames dependencies within the given resource and saves it. `renames` is a dictionary `{ String => String }` mapping old dependency paths to new paths.
   * Returns {@link OK} on success, or an {@link Error} constant in case of failure.
   */
  _rename_dependencies(path: string, renames: Dictionary): int;

  // enum CacheMode
  /**
   * Neither the main resource (the one requested to be loaded) nor any of its subresources are retrieved from cache nor stored into it. Dependencies (external resources) are loaded with {@link CACHE_MODE_REUSE}.
   */
  static readonly CACHE_MODE_IGNORE: int;
  /**
   * The main resource (the one requested to be loaded), its subresources, and its dependencies (external resources) are retrieved from cache if present, instead of loaded. Those not cached are loaded and then stored into the cache. The same rules are propagated recursively down the tree of dependencies (external resources).
   */
  static readonly CACHE_MODE_REUSE: int;
  /**
   * Like {@link CACHE_MODE_REUSE}, but the cache is checked for the main resource (the one requested to be loaded) as well as for each of its subresources. Those already in the cache, as long as the loaded and cached types match, have their data refreshed from storage into the already existing instances. Otherwise, they are recreated as completely new objects.
   */
  static readonly CACHE_MODE_REPLACE: int;
  /**
   * Like {@link CACHE_MODE_IGNORE}, but propagated recursively down the tree of dependencies (external resources).
   */
  static readonly CACHE_MODE_IGNORE_DEEP: int;
  /**
   * Like {@link CACHE_MODE_REPLACE}, but propagated recursively down the tree of dependencies (external resources).
   */
  static readonly CACHE_MODE_REPLACE_DEEP: int;
}
