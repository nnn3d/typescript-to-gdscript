// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A pre-parsed scene tree path. */
declare class NodePath {
  /**
   * Returns a copy of this node path with a colon character (`:`) prefixed, transforming it to a pure property path with no node names (relative to the current node).
   */
  get_as_property_path(): string;
  /** Returns all node names concatenated with a slash character (`/`) as a single {@link StringName}. */
  get_concatenated_names(): string;
  /**
   * Returns all property subnames concatenated with a colon character (`:`) as a single {@link StringName}.
   */
  get_concatenated_subnames(): string;
  /**
   * Returns the node name indicated by `idx`, starting from 0. If `idx` is out of bounds, an error is generated. See also {@link get_subname_count} and {@link get_name_count}.
   */
  get_name(idx: int): string;
  /**
   * Returns the number of node names in the path. Property subnames are not included.
   * For example, `"../RigidBody2D/Sprite2D:texture"` contains 3 node names.
   */
  get_name_count(): int;
  /**
   * Returns the property name indicated by `idx`, starting from 0. If `idx` is out of bounds, an error is generated. See also {@link get_subname_count}.
   */
  get_subname(idx: int): string;
  /**
   * Returns the number of property names ("subnames") in the path. Each subname in the node path is listed after a colon character (`:`).
   * For example, `"Level/RigidBody2D/Sprite2D:texture:resource_name"` contains 2 subnames.
   */
  get_subname_count(): int;
  /**
   * Returns the 32-bit hash value representing the node path's contents.
   * **Note:** Node paths with equal hash values are *not* guaranteed to be the same, as a result of hash collisions. Node paths with different hash values are guaranteed to be different.
   */
  hash(): int;
  /**
   * Returns `true` if the node path is absolute. Unlike a relative path, an absolute path is represented by a leading slash character (`/`) and always begins from the {@link SceneTree}. It can be used to reliably access nodes from the root node (e.g. `"/root/Global"` if an autoload named "Global" exists).
   */
  is_absolute(): boolean;
  /** Returns `true` if the node path has been constructed from an empty {@link String} (`""`). */
  is_empty(): boolean;
  /**
   * Returns the slice of the {@link NodePath}, from `begin` (inclusive) to `end` (exclusive), as a new {@link NodePath}.
   * The absolute value of `begin` and `end` will be clamped to the sum of {@link get_name_count} and {@link get_subname_count}, so the default value for `end` makes it slice to the end of the {@link NodePath} by default (i.e. `path.slice(1)` is a shorthand for `path.slice(1, path.get_name_count() + path.get_subname_count())`).
   * If either `begin` or `end` are negative, they will be relative to the end of the {@link NodePath} (i.e. `path.slice(0, -2)` is a shorthand for `path.slice(0, path.get_name_count() + path.get_subname_count() - 2)`).
   */
  slice(begin: int, end?: int): string;

  // Operator overloads
  [__ops_ne]: { right: string; ret: boolean };
  [__ops_eq]: { right: string; ret: boolean };
}
