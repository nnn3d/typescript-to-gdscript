// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Saves a specific resource type to a file. */
declare class ResourceFormatSaver extends RefCounted {
  /**
   * Returns the list of extensions available for saving the resource object, provided it is recognized (see {@link _recognize}).
   */
  _get_recognized_extensions(resource: Resource): PackedStringArray;
  /** Returns whether the given resource object can be saved by this saver. */
  _recognize(resource: Resource): boolean;
  /**
   * Returns `true` if this saver handles a given save path and `false` otherwise.
   * If this method is not implemented, the default behavior returns whether the path's extension is within the ones provided by {@link _get_recognized_extensions}.
   */
  _recognize_path(resource: Resource, path: string | NodePath): boolean;
  /**
   * Saves the given resource object to a file at the target `path`. `flags` is a bitmask composed with {@link ResourceSaver.SaverFlags} constants.
   * Returns {@link OK} on success, or an {@link Error} constant in case of failure.
   */
  _save(resource: Resource, path: string | NodePath, flags: int): int;
  /**
   * Sets a new UID for the resource at the given `path`. Returns {@link OK} on success, or an {@link Error} constant in case of failure.
   */
  _set_uid(path: string | NodePath, uid: int): int;
}
