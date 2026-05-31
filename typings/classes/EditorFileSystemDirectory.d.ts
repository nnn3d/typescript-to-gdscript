// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A directory for the resource filesystem. */
declare class EditorFileSystemDirectory extends GodotObject {
  /** Returns the index of the directory with name `name` or `-1` if not found. */
  find_dir_index(name: string | NodePath): int;
  /** Returns the index of the file with name `name` or `-1` if not found. */
  find_file_index(name: string | NodePath): int;
  /** Returns the name of the file at index `idx`. */
  get_file(idx: int): string;
  /** Returns the number of files in this directory. */
  get_file_count(): int;
  /** Returns `true` if the file at index `idx` imported properly. */
  get_file_import_is_valid(idx: int): boolean;
  /** Returns the path to the file at index `idx`. */
  get_file_path(idx: int): string;
  /**
   * Returns the base class of the script class defined in the file at index `idx`. If the file doesn't define a script class using the `class_name` syntax, this will return an empty string.
   */
  get_file_script_class_extends(idx: int): string;
  /**
   * Returns the name of the script class defined in the file at index `idx`. If the file doesn't define a script class using the `class_name` syntax, this will return an empty string.
   */
  get_file_script_class_name(idx: int): string;
  /**
   * Returns the resource type of the file at index `idx`. This returns a string such as `"Resource"` or `"GDScript"`, *not* a file extension such as `".gd"`.
   */
  get_file_type(idx: int): string;
  /** Returns the name of this directory. */
  get_name(): string;
  /**
   * Returns the parent directory for this directory or `null` if called on a directory at `res://` or `user://`.
   */
  get_parent(): EditorFileSystemDirectory | null;
  /** Returns the path to this directory. */
  get_path(): string;
  /** Returns the subdirectory at index `idx`. */
  get_subdir(idx: int): EditorFileSystemDirectory | null;
  /** Returns the number of subdirectories in this directory. */
  get_subdir_count(): int;
}
