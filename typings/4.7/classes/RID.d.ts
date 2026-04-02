// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A handle for a {@link Resource}'s unique identifier. */
declare interface RID {
  /** Returns the ID of the referenced low-level resource. */
  get_id(): int;
  /** Returns `true` if the {@link RID} is not `0`. */
  is_valid(): boolean;

  // Operator overloads
  [__ops_ne]: { right: RID; ret: boolean };
  [__ops_lt]: { right: RID; ret: boolean };
  [__ops_lte]: { right: RID; ret: boolean };
  [__ops_eq]: { right: RID; ret: boolean };
  [__ops_gt]: { right: RID; ret: boolean };
  [__ops_gte]: { right: RID; ret: boolean };

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
  hash: never;
  is_empty: never;
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

declare interface RIDConstructor {
  /** Constructs an empty {@link RID} with the invalid ID `0`. */
  (): RID;
  /** Constructs an {@link RID} as a copy of the given {@link RID}. */
  (from_: RID): RID;
}
declare const RID: RIDConstructor;
