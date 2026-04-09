// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A singleton that manages the unique identifiers of all resources within a project. */
declare interface ResourceUID extends GodotObject {
  /**
   * Adds a new UID value which is mapped to the given resource path.
   * Fails with an error if the UID already exists, so be sure to check {@link has_id} beforehand, or use {@link set_id} instead.
   */
  add_id(id: int, path: string | NodePath): void;
  /**
   * Generates a random resource UID which is guaranteed to be unique within the list of currently loaded UIDs.
   * In order for this UID to be registered, you must call {@link add_id} or {@link set_id}.
   */
  create_id(): int;
  /**
   * Like {@link create_id}, but the UID is seeded with the provided `path` and project name. UIDs generated for that path will be always the same within the current project.
   */
  create_id_for_path(path: string | NodePath): int;
  /**
   * Returns a path, converting `path_or_uid` if necessary. Fails and returns an empty string if an invalid UID is provided.
   */
  ensure_path(path_or_uid: string | NodePath): string;
  /**
   * Returns the path that the given UID value refers to.
   * Fails with an error if the UID does not exist, so be sure to check {@link has_id} beforehand.
   */
  get_id_path(id: int): string;
  /** Returns whether the given UID value is known to the cache. */
  has_id(id: int): boolean;
  /** Converts the given UID to a `uid://` string value. */
  id_to_text(id: int): string;
  /**
   * Converts the provided resource `path` to a UID. Returns the unchanged path if it has no associated UID.
   */
  path_to_uid(path: string | NodePath): string;
  /**
   * Removes a loaded UID value from the cache.
   * Fails with an error if the UID does not exist, so be sure to check {@link has_id} beforehand.
   */
  remove_id(id: int): void;
  /**
   * Updates the resource path of an existing UID.
   * Fails with an error if the UID does not exist, so be sure to check {@link has_id} beforehand, or use {@link add_id} instead.
   */
  set_id(id: int, path: string | NodePath): void;
  /** Extracts the UID value from the given `uid://` string. */
  text_to_id(text_id: string | NodePath): int;
  /** Converts the provided `uid` to a path. Prints an error if the UID is invalid. */
  uid_to_path(uid: string | NodePath): string;

  /**
   * The value to use for an invalid UID, for example if the resource could not be loaded.
   * Its text representation is `uid://<invalid>`.
   */
  readonly INVALID_ID: int;
}
declare const ResourceUID: ResourceUID;

