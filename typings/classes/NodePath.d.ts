// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A pre-parsed scene tree path. */
declare interface NodePath {
  /**
   * Returns a copy of this node path with a colon character (`:`) prefixed, transforming it to a pure property path with no node names (relative to the current node).
   */
  get_as_property_path(): NodePath;
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
  slice(begin: int, end?: int): NodePath;

  // Operator overloads
  [__ops_ne]: { right: NodePath; ret: boolean };
  [__ops_eq]: { right: NodePath; ret: boolean };

  [__variant_converts]: NodePath | string;

  // Dictionary method overrides (prevent Object interface leaking)
  assign: never;
  clear: never;
  duplicate: never;
  duplicate_deep: never;
  erase: never;
  find_key: never;
  get: never;
  get_or_add: never;
  get_typed_key_builtin: never;
  get_typed_key_class_name: never;
  get_typed_key_script: never;
  get_typed_value_builtin: never;
  get_typed_value_class_name: never;
  get_typed_value_script: never;
  has: never;
  has_all: never;
  is_read_only: never;
  is_same_typed: never;
  is_same_typed_key: never;
  is_same_typed_value: never;
  is_typed: never;
  is_typed_key: never;
  is_typed_value: never;
  keys: never;
  make_read_only: never;
  merge: never;
  merged: never;
  recursive_equal: never;
  set: never;
  size: never;
  sort: never;
  values: never;
}

declare interface NodePathConstructor {
  readonly prototype: NodePath;
  /** Constructs an empty {@link NodePath}. */
  (): NodePath;
  /** Constructs a {@link NodePath} as a copy of the given {@link NodePath}. */
  (from_: NodePath): NodePath;
  /**
   * Constructs a {@link NodePath} from a {@link String}. The created path is absolute if prefixed with a slash (see {@link is_absolute}).
   * The "subnames" optionally included after the path to the target node can point to properties, and can also be nested.
   * The following strings can be valid node paths:
   * **Note:** In GDScript, it's also possible to convert a constant string into a node path by prefixing it with `^`. `^"path/to/node"` is equivalent to `NodePath("path/to/node")`.
   */
  (from_: string): NodePath;
}
declare const NodePath: NodePathConstructor;
