// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A packed array of 32-bit integers. */
declare class PackedInt32Array {
  /** Appends an element at the end of the array (alias of {@link push_back}). */
  append(value: int): boolean;
  /** Appends a {@link PackedInt32Array} at the end of this array. */
  append_array(array: PackedInt32Array): void;
  /**
   * Finds the index of an existing value (or the insertion index that maintains sorting order, if the value is not yet present in the array) using binary search. Optionally, a `before` specifier can be passed. If `false`, the returned index comes after all existing entries of the value in the array.
   * **Note:** Calling {@link bsearch} on an unsorted array results in unexpected behavior.
   */
  bsearch(value: int, before?: boolean): int;
  /** Clears the array. This is equivalent to using {@link resize} with a size of `0`. */
  clear(): void;
  /** Returns the number of times an element is in the array. */
  count(value: int): int;
  /** Creates a copy of the array, and returns it. */
  duplicate(): PackedInt32Array;
  /**
   * Removes the first occurrence of a value from the array and returns `true`. If the value does not exist in the array, nothing happens and `false` is returned. To remove an element by index, use {@link remove_at} instead.
   */
  erase(value: int): boolean;
  /**
   * Assigns the given value to all elements in the array. This can typically be used together with {@link resize} to create an array with a given size and initialized elements.
   */
  fill(value: int): void;
  /**
   * Searches the array for a value and returns its index or `-1` if not found. Optionally, the initial search index can be passed.
   */
  find(value: int, from_?: int): int;
  /**
   * Returns the 32-bit integer at the given `index` in the array. If `index` is out-of-bounds or negative, this method fails and returns `0`.
   * This method is similar (but not identical) to the `[]` operator. Most notably, when this method fails, it doesn't pause project execution if run from the editor.
   */
  get(index: int): int;
  /** Returns `true` if the array contains `value`. */
  has(value: int): boolean;
  /**
   * Inserts a new integer at a given position in the array. The position must be valid, or at the end of the array (`idx == size()`).
   */
  insert(at_index: int, value: int): int;
  /** Returns `true` if the array is empty. */
  is_empty(): boolean;
  /** Appends a value to the array. */
  push_back(value: int): boolean;
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
  rfind(value: int, from_?: int): int;
  /** Changes the integer at the given index. */
  set(index: int, value: int): void;
  /** Returns the number of elements in the array. */
  size(): int;
  /**
   * Returns the slice of the {@link PackedInt32Array}, from `begin` (inclusive) to `end` (exclusive), as a new {@link PackedInt32Array}.
   * The absolute value of `begin` and `end` will be clamped to the array size, so the default value for `end` makes it slice to the size of the array by default (i.e. `arr.slice(1)` is a shorthand for `arr.slice(1, arr.size())`).
   * If either `begin` or `end` are negative, they will be relative to the end of the array (i.e. `arr.slice(0, -2)` is a shorthand for `arr.slice(0, arr.size() - 2)`).
   */
  slice(begin: int, end?: int): PackedInt32Array;
  /** Sorts the elements of the array in ascending order. */
  sort(): void;
  /**
   * Returns a copy of the data converted to a {@link PackedByteArray}, where each element has been encoded as 4 bytes.
   * The size of the new array will be `int32_array.size() * 4`.
   */
  to_byte_array(): PackedByteArray;

  // Operator overloads
  [__ne]: { right: PackedInt32Array; ret: boolean };
  [__add]: { right: PackedInt32Array; ret: PackedInt32Array };
  [__eq]: { right: PackedInt32Array; ret: boolean };
}
