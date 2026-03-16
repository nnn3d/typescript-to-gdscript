// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A singleton for saving {@link Resource}s to the filesystem. */
declare class ResourceSaver extends GodotObject {
  /**
   * Registers a new {@link ResourceFormatSaver}. The ResourceSaver will use the ResourceFormatSaver as described in {@link save}.
   * This method is performed implicitly for ResourceFormatSavers written in GDScript (see {@link ResourceFormatSaver} for more information).
   */
  add_resource_format_saver(format_saver: ResourceFormatSaver, at_front?: boolean): void;
  /** Returns the list of extensions available for saving a resource of a given type. */
  get_recognized_extensions(type_: Resource): PackedStringArray;
  /**
   * Returns the resource ID for the given path. If `generate` is `true`, a new resource ID will be generated if one for the path is not found. If `generate` is `false` and the path is not found, {@link ResourceUID.INVALID_ID} is returned.
   */
  get_resource_id_for_path(path: string, generate?: boolean): int;
  /** Unregisters the given {@link ResourceFormatSaver}. */
  remove_resource_format_saver(format_saver: ResourceFormatSaver): void;
  /**
   * Saves a resource to disk to the given path, using a {@link ResourceFormatSaver} that recognizes the resource object. If `path` is empty, {@link ResourceSaver} will try to use {@link Resource.resource_path}.
   * The `flags` bitmask can be specified to customize the save behavior.
   * Returns {@link OK} on success.
   * **Note:** When the project is running, any generated UID associated with the resource will not be saved as the required code is only executed in editor mode.
   */
  save(resource: Resource, path?: string, flags?: int): int;
  /**
   * Sets the UID of the given `resource` path to `uid`. You can generate a new UID using {@link ResourceUID.create_id}.
   * Since resources will normally get a UID automatically, this method is only useful in very specific cases.
   */
  set_uid(resource: string, uid: int): int;

  // enum SaverFlags
  /** No resource saving option. */
  static readonly FLAG_NONE: int;
  /** Save the resource with a path relative to the scene which uses it. */
  static readonly FLAG_RELATIVE_PATHS: int;
  /** Bundles external resources. */
  static readonly FLAG_BUNDLE_RESOURCES: int;
  /** Changes the {@link Resource.resource_path} of the saved resource to match its new location. */
  static readonly FLAG_CHANGE_PATH: int;
  /** Do not save editor-specific metadata (identified by their `__editor` prefix). */
  static readonly FLAG_OMIT_EDITOR_PROPERTIES: int;
  /** Save as big endian (see {@link FileAccess.big_endian}). */
  static readonly FLAG_SAVE_BIG_ENDIAN: int;
  /**
   * Compress the resource on save using {@link FileAccess.COMPRESSION_ZSTD}. Only available for binary resource types.
   */
  static readonly FLAG_COMPRESS: int;
  /** Take over the paths of the saved subresources (see {@link Resource.take_over_path}). */
  static readonly FLAG_REPLACE_SUBRESOURCE_PATHS: int;
}
