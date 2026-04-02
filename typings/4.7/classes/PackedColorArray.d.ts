// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A packed array of {@link Color}s. */
declare interface PackedColorArray {
  /** Appends an element at the end of the array (alias of {@link push_back}). */
  append(value: Color): boolean;
  /** Appends a {@link PackedColorArray} at the end of this array. */
  append_array(array: PackedColorArray): void;
  /**
   * Finds the index of an existing value (or the insertion index that maintains sorting order, if the value is not yet present in the array) using binary search. Optionally, a `before` specifier can be passed. If `false`, the returned index comes after all existing entries of the value in the array.
   * **Note:** Calling {@link bsearch} on an unsorted array results in unexpected behavior.
   */
  bsearch(value: Color, before?: boolean): int;
  /** Clears the array. This is equivalent to using {@link resize} with a size of `0`. */
  clear(): void;
  /** Returns the number of times an element is in the array. */
  count(value: Color): int;
  /** Creates a copy of the array, and returns it. */
  duplicate(): PackedColorArray;
  /**
   * Removes the first occurrence of a value from the array and returns `true`. If the value does not exist in the array, nothing happens and `false` is returned. To remove an element by index, use {@link remove_at} instead.
   */
  erase(value: Color): boolean;
  /**
   * Assigns the given value to all elements in the array. This can typically be used together with {@link resize} to create an array with a given size and initialized elements.
   */
  fill(value: Color): void;
  /**
   * Searches the array for a value and returns its index or `-1` if not found. Optionally, the initial search index can be passed.
   */
  find(value: Color, from_?: int): int;
  /**
   * Returns the {@link Color} at the given `index` in the array. If `index` is out-of-bounds or negative, this method fails and returns `Color(0, 0, 0, 1)`.
   * This method is similar (but not identical) to the `[]` operator. Most notably, when this method fails, it doesn't pause project execution if run from the editor.
   */
  get(index: int): Color;
  /** Returns `true` if the array contains `value`. */
  has(value: Color): boolean;
  /**
   * Inserts a new element at a given position in the array. The position must be valid, or at the end of the array (`idx == size()`).
   */
  insert(at_index: int, value: Color): int;
  /** Returns `true` if the array is empty. */
  is_empty(): boolean;
  /** Appends a value to the array. */
  push_back(value: Color): boolean;
  /** Removes an element from the array by index. */
  remove_at(index: int): void;
  /**
   * Sets the size of the array. If the array is grown, reserves elements at the end of the array. If the array is shrunk, truncates the array to the new size. Calling {@link resize} once and assigning the new values is faster than adding new elements one by one.
   * Returns {@link OK} on success, or one of the following {@link Error} constants if this method fails: {@link ERR_INVALID_PARAMETER} if the size is negative, or {@link ERR_OUT_OF_MEMORY} if allocations fail. Use {@link size} to find the actual size of the array after resize.
   */
  resize(new_size: int): int;
  /** Reverses the order of the elements in the array. */
  reverse(): void;
  /**
   * Searches the array in reverse order. Optionally, a start search index can be passed. If negative, the start index is considered relative to the end of the array.
   */
  rfind(value: Color, from_?: int): int;
  /** Changes the {@link Color} at the given index. */
  set(index: int, value: Color): void;
  /** Returns the number of elements in the array. */
  size(): int;
  /**
   * Returns the slice of the {@link PackedColorArray}, from `begin` (inclusive) to `end` (exclusive), as a new {@link PackedColorArray}.
   * The absolute value of `begin` and `end` will be clamped to the array size, so the default value for `end` makes it slice to the size of the array by default (i.e. `arr.slice(1)` is a shorthand for `arr.slice(1, arr.size())`).
   * If either `begin` or `end` are negative, they will be relative to the end of the array (i.e. `arr.slice(0, -2)` is a shorthand for `arr.slice(0, arr.size() - 2)`).
   */
  slice(begin: int, end?: int): PackedColorArray;
  /** Sorts the elements of the array in ascending order. */
  sort(): void;
  /** Returns a {@link PackedByteArray} with each color encoded as bytes. */
  to_byte_array(): PackedByteArray;

  // Operator overloads
  [__ops_ne]: { right: PackedColorArray; ret: boolean };
  [__ops_add]: { right: PackedColorArray; ret: PackedColorArray };
  [__ops_eq]: { right: PackedColorArray; ret: boolean };

  // Dictionary method overrides (prevent Object interface leaking)
  assign: never;
  duplicate_deep: never;
  find_key: never;
  get_or_add: never;
  get_typed_key_builtin: never;
  get_typed_key_class_name: never;
  get_typed_key_script: never;
  get_typed_value_builtin: never;
  get_typed_value_class_name: never;
  get_typed_value_script: never;
  has_all: never;
  hash: never;
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
  values: never;
}

declare interface PackedColorArrayConstructor {
  /** Constructs an empty {@link PackedColorArray}. */
  (): PackedColorArray;
  /** Constructs a {@link PackedColorArray} as a copy of the given {@link PackedColorArray}. */
  (from_: PackedColorArray): PackedColorArray;
  /**
   * Constructs a new {@link PackedColorArray}. Optionally, you can pass in a generic {@link Array} that will be converted.
   * **Note:** When initializing a {@link PackedColorArray} with elements, it must be initialized with an {@link Array} of {@link Color} values:
   */
  (from_: Array<unknown>): PackedColorArray;
}
declare const PackedColorArray: PackedColorArrayConstructor;
