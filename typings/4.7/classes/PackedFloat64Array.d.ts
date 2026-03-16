// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A packed array of 64-bit floating-point values. */
declare class PackedFloat64Array {
  /** Appends an element at the end of the array (alias of {@link push_back}). */
  append(value: float): boolean;
  /** Appends a {@link PackedFloat64Array} at the end of this array. */
  append_array(array: PackedFloat64Array): void;
  /**
   * Finds the index of an existing value (or the insertion index that maintains sorting order, if the value is not yet present in the array) using binary search. Optionally, a `before` specifier can be passed. If `false`, the returned index comes after all existing entries of the value in the array.
   * **Note:** Calling {@link bsearch} on an unsorted array results in unexpected behavior.
   * **Note:** {@link @GDScript.NAN} doesn't behave the same as other numbers. Therefore, the results from this method may not be accurate if NaNs are included.
   */
  bsearch(value: float, before?: boolean): int;
  /** Clears the array. This is equivalent to using {@link resize} with a size of `0`. */
  clear(): void;
  /**
   * Returns the number of times an element is in the array.
   * **Note:** {@link @GDScript.NAN} doesn't behave the same as other numbers. Therefore, the results from this method may not be accurate if NaNs are included.
   */
  count(value: float): int;
  /** Creates a copy of the array, and returns it. */
  duplicate(): PackedFloat64Array;
  /**
   * Removes the first occurrence of a value from the array and returns `true`. If the value does not exist in the array, nothing happens and `false` is returned. To remove an element by index, use {@link remove_at} instead.
   * **Note:** {@link @GDScript.NAN} doesn't behave the same as other numbers. Therefore, the results from this method may not be accurate if NaNs are included.
   */
  erase(value: float): boolean;
  /**
   * Assigns the given value to all elements in the array. This can typically be used together with {@link resize} to create an array with a given size and initialized elements.
   */
  fill(value: float): void;
  /**
   * Searches the array for a value and returns its index or `-1` if not found. Optionally, the initial search index can be passed.
   * **Note:** {@link @GDScript.NAN} doesn't behave the same as other numbers. Therefore, the results from this method may not be accurate if NaNs are included.
   */
  find(value: float, from_?: int): int;
  /**
   * Returns the 64-bit float at the given `index` in the array. If `index` is out-of-bounds or negative, this method fails and returns `0.0`.
   * This method is similar (but not identical) to the `[]` operator. Most notably, when this method fails, it doesn't pause project execution if run from the editor.
   */
  get(index: int): float;
  /**
   * Returns `true` if the array contains `value`.
   * **Note:** {@link @GDScript.NAN} doesn't behave the same as other numbers. Therefore, the results from this method may not be accurate if NaNs are included.
   */
  has(value: float): boolean;
  /**
   * Inserts a new element at a given position in the array. The position must be valid, or at the end of the array (`idx == size()`).
   */
  insert(at_index: int, value: float): int;
  /** Returns `true` if the array is empty. */
  is_empty(): boolean;
  /** Appends an element at the end of the array. */
  push_back(value: float): boolean;
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
   * **Note:** {@link @GDScript.NAN} doesn't behave the same as other numbers. Therefore, the results from this method may not be accurate if NaNs are included.
   */
  rfind(value: float, from_?: int): int;
  /** Changes the float at the given index. */
  set(index: int, value: float): void;
  /** Returns the number of elements in the array. */
  size(): int;
  /**
   * Returns the slice of the {@link PackedFloat64Array}, from `begin` (inclusive) to `end` (exclusive), as a new {@link PackedFloat64Array}.
   * The absolute value of `begin` and `end` will be clamped to the array size, so the default value for `end` makes it slice to the size of the array by default (i.e. `arr.slice(1)` is a shorthand for `arr.slice(1, arr.size())`).
   * If either `begin` or `end` are negative, they will be relative to the end of the array (i.e. `arr.slice(0, -2)` is a shorthand for `arr.slice(0, arr.size() - 2)`).
   */
  slice(begin: int, end?: int): PackedFloat64Array;
  /**
   * Sorts the elements of the array in ascending order.
   * **Note:** {@link @GDScript.NAN} doesn't behave the same as other numbers. Therefore, the results from this method may not be accurate if NaNs are included.
   */
  sort(): void;
  /**
   * Returns a copy of the data converted to a {@link PackedByteArray}, where each element has been encoded as 8 bytes.
   * The size of the new array will be `float64_array.size() * 8`.
   */
  to_byte_array(): PackedByteArray;

  // Operator overloads
  [__ne]: { right: PackedFloat64Array; ret: boolean };
  [__add]: { right: PackedFloat64Array; ret: PackedFloat64Array };
  [__eq]: { right: PackedFloat64Array; ret: boolean };
}
