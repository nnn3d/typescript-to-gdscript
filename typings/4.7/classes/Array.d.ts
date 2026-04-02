// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/**
 * Override: Array<T> — adds generic type parameter to GDScript Array.
 *
 * The generator produces `interface Array { ... }` with `unknown` for element types.
 * This override replaces it with `interface Array<T>` so that typed arrays work:
 *   var nums: Array<int> = [];
 *   nums.append(42);       // OK
 *   nums.append("hello");  // Error: string is not int
 */
declare interface Array<T = unknown> {
  /**
   * Calls the given {@link Callable} on each element in the array and returns `true` if the {@link Callable} returns `true` for *all* elements in the array. If the {@link Callable} returns `false` for one array element or more, this method returns `false`.
   * The `method` should take one {@link Variant} parameter (the current array element) and return a [bool].
   * See also {@link any}, {@link filter}, {@link map} and {@link reduce}.
   * **Note:** Unlike relying on the size of an array returned by {@link filter}, this method will return as early as possible to improve performance (especially with large arrays).
   * **Note:** For an empty array, this method always (https://en.wikipedia.org/wiki/Vacuous_truth) returns `true`.
   */
  all(method: (value: T) => boolean): boolean;
  /**
   * Calls the given {@link Callable} on each element in the array and returns `true` if the {@link Callable} returns `true` for *one or more* elements in the array. If the {@link Callable} returns `false` for all elements in the array, this method returns `false`.
   * The `method` should take one {@link Variant} parameter (the current array element) and return a [bool].
   * See also {@link all}, {@link filter}, {@link map} and {@link reduce}.
   * **Note:** Unlike relying on the size of an array returned by {@link filter}, this method will return as early as possible to improve performance (especially with large arrays).
   * **Note:** For an empty array, this method always returns `false`.
   */
  any(method: (value: T) => boolean): boolean;
  /** Appends `value` at the end of the array (alias of {@link push_back}). */
  append(value: T): void;
  /** Appends another `array` at the end of this array. */
  append_array(array: Array<T>): void;
  /**
   * Assigns elements of another `array` into the array. Resizes the array to match `array`. Performs type conversions if the array is typed.
   */
  assign(array: Array<T>): void;
  /**
   * Returns the last element of the array. If the array is empty, fails and returns `null`. See also {@link front}.
   * **Note:** Unlike with the `[]` operator (`array[-1]`), an error is generated without stopping project execution.
   */
  back(): T;
  /**
   * Returns the index of `value` in the sorted array. If it cannot be found, returns where `value` should be inserted to keep the array sorted. The algorithm used is binary search (https://en.wikipedia.org/wiki/Binary_search_algorithm).
   * If `before` is `true` (as by default), the returned index comes before all existing elements equal to `value` in the array.
   * **Note:** Calling {@link bsearch} on an *unsorted* array will result in unexpected behavior. Use {@link sort} before calling this method.
   */
  bsearch(value: T, before?: boolean): int;
  /**
   * Returns the index of `value` in the sorted array. If it cannot be found, returns where `value` should be inserted to keep the array sorted (using `func` for the comparisons). The algorithm used is binary search (https://en.wikipedia.org/wiki/Binary_search_algorithm).
   * Similar to {@link sort_custom}, `func` is called as many times as necessary, receiving one array element and `value` as arguments. The function should return `true` if the array element should be *behind* `value`, otherwise it should return `false`.
   * If `before` is `true` (as by default), the returned index comes before all existing elements equal to `value` in the array.
   * **Note:** Calling {@link bsearch_custom} on an *unsorted* array will result in unexpected behavior. Use {@link sort_custom} with `func` before calling this method.
   */
  bsearch_custom(
  value: T,
  func: (a: T, b: T) => boolean,
  before?: boolean,
  ): int;
  /** Removes all elements from the array. This is equivalent to using {@link resize} with a size of `0`. */
  clear(): void;
  /**
   * Returns the number of times an element is in the array.
   * To count how many elements in an array satisfy a condition, see {@link reduce}.
   */
  count(value: T): int;
  /**
   * Returns a new copy of the array.
   * By default, a **shallow** copy is returned: all nested {@link Array}, {@link Dictionary}, and {@link Resource} elements are shared with the original array. Modifying any of those in one array will also affect them in the other.
   * If `deep` is `true`, a **deep** copy is returned: all nested arrays and dictionaries are also duplicated (recursively). Any {@link Resource} is still shared with the original array, though.
   */
  duplicate(deep?: boolean): Array<T>;
  /**
   * Duplicates this array, deeply, like {@link duplicate} when passing `true`, with extra control over how subresources are handled.
   * `deep_subresources_mode` must be one of the values from {@link Resource.DeepDuplicateMode}. By default, only internal resources will be duplicated (recursively).
   */
  duplicate_deep(deep_subresources_mode?: int): Array<T>;
  /**
   * Finds and removes the first occurrence of `value` from the array. If `value` does not exist in the array, nothing happens. To remove an element by index, use {@link remove_at} instead.
   * **Note:** This method shifts every element's index after the removed `value` back, which may have a noticeable performance cost, especially on larger arrays.
   * **Note:** Erasing elements while iterating over arrays is **not** supported and will result in unpredictable behavior.
   */
  erase(value: T): void;
  /**
   * Assigns the given `value` to all elements in the array.
   * This method can often be combined with {@link resize} to create an array with a given size and initialized elements:
   * **Note:** If `value` is a {@link Variant} passed by reference ({@link Object}-derived, {@link Array}, {@link Dictionary}, etc.), the array will be filled with references to the same `value`, which are not duplicates.
   */
  fill(value: T): void;
  /**
   * Calls the given {@link Callable} on each element in the array and returns a new, filtered {@link Array}.
   * The `method` receives one of the array elements as an argument, and should return `true` to add the element to the filtered array, or `false` to exclude it.
   * See also {@link any}, {@link all}, {@link map} and {@link reduce}.
   */
  filter(method: (value: T) => boolean): Array<T>;
  /**
   * Returns the index of the **first** occurrence of `what` in this array, or `-1` if there are none. The search's start can be specified with `from`, continuing to the end of the array.
   * **Note:** If you just want to know whether the array contains `what`, use {@link has} (`Contains` in C#). In GDScript, you may also use the `in` operator.
   * **Note:** For performance reasons, the search is affected by `what`'s {@link Variant.Type}. For example, `7` ([int]) and `7.0` ([float]) are not considered equal for this method.
   */
  find(what: T, from_?: int): int;
  /**
   * Returns the index of the **first** element in the array that causes `method` to return `true`, or `-1` if there are none. The search's start can be specified with `from`, continuing to the end of the array.
   * `method` is a callable that takes an element of the array, and returns a [bool].
   * **Note:** If you just want to know whether the array contains *anything* that satisfies `method`, use {@link any}.
   */
  find_custom(method: (value: T) => boolean, from_?: int): int;
  /**
   * Returns the first element of the array. If the array is empty, fails and returns `null`. See also {@link back}.
   * **Note:** Unlike with the `[]` operator (`array[0]`), an error is generated without stopping project execution.
   */
  front(): T;
  /**
   * Returns the element at the given `index` in the array. If `index` is out-of-bounds or negative, this method fails and returns `null`.
   * This method is similar (but not identical) to the `[]` operator. Most notably, when this method fails, it doesn't pause project execution if run from the editor.
   */
  get(index: int): T;
  /**
   * Returns the built-in {@link Variant} type of the typed array as a {@link Variant.Type} constant. If the array is not typed, returns {@link TYPE_NIL}. See also {@link is_typed}.
   */
  get_typed_builtin(): int;
  /**
   * Returns the **built-in** class name of the typed array, if the built-in {@link Variant} type {@link TYPE_OBJECT}. Otherwise, returns an empty {@link StringName}. See also {@link is_typed} and {@link Object.get_class}.
   */
  get_typed_class_name(): string;
  /**
   * Returns the {@link Script} instance associated with this typed array, or `null` if it does not exist. See also {@link is_typed}.
   */
  get_typed_script(): unknown;
  /**
   * Returns `true` if the array contains the given `value`.
   * In GDScript, this is equivalent to the `in` operator:
   * **Note:** For performance reasons, the search is affected by the `value`'s {@link Variant.Type}. For example, `7` ([int]) and `7.0` ([float]) are not considered equal for this method.
   */
  has(value: T): boolean;
  /**
   * Returns a hashed 32-bit integer value representing the array and its contents.
   * **Note:** Arrays with equal hash values are *not* guaranteed to be the same, as a result of hash collisions. On the contrary, arrays with different hash values are guaranteed to be different.
   */
  hash(): int;
  /**
   * Inserts a new element (`value`) at a given index (`position`) in the array. `position` should be between `0` and the array's {@link size}. If negative, `position` is considered relative to the end of the array.
   * Returns {@link OK} on success, or one of the other {@link Error} constants if this method fails.
   * **Note:** Every element's index after `position` needs to be shifted forward, which may have a noticeable performance cost, especially on larger arrays.
   */
  insert(position: int, value: T): int;
  /** Returns `true` if the array is empty (`[]`). See also {@link size}. */
  is_empty(): boolean;
  /**
   * Returns `true` if the array is read-only. See {@link make_read_only}.
   * In GDScript, arrays are automatically read-only if declared with the `const` keyword.
   */
  is_read_only(): boolean;
  /** Returns `true` if this array is typed the same as the given `array`. See also {@link is_typed}. */
  is_same_typed(array: Array<T>): boolean;
  /**
   * Returns `true` if the array is typed. Typed arrays can only contain elements of a specific type, as defined by the typed array constructor. The methods of a typed array are still expected to return a generic {@link Variant}.
   * In GDScript, it is possible to define a typed array with static typing:
   */
  is_typed(): boolean;
  /**
   * Makes the array read-only. The array's elements cannot be overridden with different values, and their order cannot change. Does not apply to nested elements, such as dictionaries.
   * In GDScript, arrays are automatically read-only if declared with the `const` keyword.
   */
  make_read_only(): void;
  /**
   * Calls the given {@link Callable} for each element in the array and returns a new array filled with values returned by the `method`.
   * The `method` should take one {@link Variant} parameter (the current array element) and can return any {@link Variant}.
   * See also {@link filter}, {@link reduce}, {@link any} and {@link all}.
   */
  map<U>(method: (value: T) => U): Array<U>;
  /**
   * Returns the maximum value contained in the array, if all elements can be compared. Otherwise, returns `null`. See also {@link min}.
   * To find the maximum value using a custom comparator, you can use {@link reduce}.
   */
  max(): T;
  /**
   * Returns the minimum value contained in the array, if all elements can be compared. Otherwise, returns `null`. See also {@link max}.
   */
  min(): T;
  /**
   * Returns a random element from the array. Generates an error and returns `null` if the array is empty.
   * **Note:** Like many similar functions in the engine (such as {@link @GlobalScope.randi} or {@link shuffle}), this method uses a common, global random seed. To get a predictable outcome from this method, see {@link @GlobalScope.seed}.
   */
  pick_random(): T;
  /**
   * Removes and returns the element of the array at index `position`. If negative, `position` is considered relative to the end of the array. Returns `null` if the array is empty. If `position` is out of bounds, an error message is also generated.
   * **Note:** This method shifts every element's index after `position` back, which may have a noticeable performance cost, especially on larger arrays.
   */
  pop_at(position: int): T;
  /**
   * Removes and returns the last element of the array. Returns `null` if the array is empty, without generating an error. See also {@link pop_front}.
   */
  pop_back(): T;
  /**
   * Removes and returns the first element of the array. Returns `null` if the array is empty, without generating an error. See also {@link pop_back}.
   * **Note:** This method shifts every other element's index back, which may have a noticeable performance cost, especially on larger arrays.
   */
  pop_front(): T;
  /** Appends an element at the end of the array. See also {@link push_front}. */
  push_back(value: T): void;
  /**
   * Adds an element at the beginning of the array. See also {@link push_back}.
   * **Note:** This method shifts every other element's index forward, which may have a noticeable performance cost, especially on larger arrays.
   */
  push_front(value: T): void;
  /**
   * Calls the given {@link Callable} for each element in array, accumulates the result in `accum`, then returns it.
   * The `method` takes two arguments: the current value of `accum` and the current array element. If `accum` is `null` (as by default), the iteration will start from the second element, with the first one used as initial value of `accum`.
   * If {@link max} is not desirable, this method may also be used to implement a custom comparator:
   * This method can also be used to count how many elements in an array satisfy a certain condition, similar to {@link count}:
   * See also {@link map}, {@link filter}, {@link any}, and {@link all}.
   */
  reduce<U>(method: (accum: U, value: T) => U, accum: U): U;
  reduce(method: (accum: T, value: T) => T, accum?: T): T;
  /**
   * Removes the element from the array at the given index (`position`). If the index is out of bounds, this method fails. If the index is negative, `position` is considered relative to the end of the array.
   * If you need to return the removed element, use {@link pop_at}. To remove an element by value, use {@link erase} instead.
   * **Note:** This method shifts every element's index after `position` back, which may have a noticeable performance cost, especially on larger arrays.
   */
  remove_at(position: int): void;
  /**
   * Sets the array's number of elements to `size`. If `size` is smaller than the array's current size, the elements at the end are removed. If `size` is greater, new default elements (usually `null`) are added, depending on the array's type.
   * Returns {@link OK} on success, or one of the following {@link Error} constants if this method fails: {@link ERR_LOCKED} if the array is read-only, {@link ERR_INVALID_PARAMETER} if the size is negative, or {@link ERR_OUT_OF_MEMORY} if allocations fail. Use {@link size} to find the actual size of the array after resize.
   * **Note:** Calling this method once and assigning the new values is faster than calling {@link append} for every new element.
   */
  resize(size: int): int;
  /** Reverses the order of all elements in the array. */
  reverse(): void;
  /**
   * Returns the index of the **last** occurrence of `what` in this array, or `-1` if there are none. The search's start can be specified with `from`, continuing to the beginning of the array. This method is the reverse of {@link find}.
   */
  rfind(what: T, from_?: int): int;
  /**
   * Returns the index of the **last** element of the array that causes `method` to return `true`, or `-1` if there are none. The search's start can be specified with `from`, continuing to the beginning of the array. This method is the reverse of {@link find_custom}.
   */
  rfind_custom(method: (value: T) => boolean, from_?: int): int;
  /**
   * Sets the value of the element at the given `index` to the given `value`. This will not change the size of the array, it only changes the value at an index already in the array. This is the same as using the `[]` operator (`array[index] = value`).
   */
  set(index: int, value: T): void;
  /**
   * Shuffles all elements of the array in a random order.
   * **Note:** Like many similar functions in the engine (such as {@link @GlobalScope.randi} or {@link pick_random}), this method uses a common, global random seed. To get a predictable outcome from this method, see {@link @GlobalScope.seed}.
   */
  shuffle(): void;
  /**
   * Returns the number of elements in the array. Empty arrays (`[]`) always return `0`. See also {@link is_empty}.
   */
  size(): int;
  /**
   * Returns a new {@link Array} containing this array's elements, from index `begin` (inclusive) to `end` (exclusive), every `step` elements.
   * If either `begin` or `end` are negative, their value is relative to the end of the array.
   * If `step` is negative, this method iterates through the array in reverse, returning a slice ordered backwards. For this to work, `begin` must be greater than `end`.
   * If `deep` is `true`, all nested {@link Array} and {@link Dictionary} elements in the slice are duplicated from the original, recursively. See also {@link duplicate}.
   */
  slice(begin: int, end?: int, step?: int, deep?: boolean): Array<T>;
  /**
   * Sorts the array in ascending order. The final order is dependent on the "less than" (`<`) comparison between elements.
   * **Note:** The sorting algorithm used is not stable (https://en.wikipedia.org/wiki/Sorting_algorithm#Stability). This means that equivalent elements (such as `2` and `2.0`) may have their order changed when calling {@link sort}.
   */
  sort(): void;
  /**
   * Sorts the array using a custom {@link Callable}.
   * `func` is called as many times as necessary, receiving two array elements as arguments. The function should return `true` if the first element should be moved *before* the second one, otherwise it should return `false`.
   * It may also be necessary to use this method to sort strings by natural order, with {@link String.naturalnocasecmp_to}, as in the following example:
   * **Note:** In C#, this method is not supported.
   * **Note:** The sorting algorithm used is not stable (https://en.wikipedia.org/wiki/Sorting_algorithm#Stability). This means that values considered equal may have their order changed when calling this method.
   * **Note:** You should not randomize the return value of `func`, as the heapsort algorithm expects a consistent result. Randomizing the return value will result in unexpected behavior.
   */
  sort_custom(func: (a: T, b: T) => boolean): void;

  // Operator overloads
  [__ops_ne]: { right: Array<unknown>; ret: boolean };
  [__ops_add]: { right: Array<unknown>; ret: Array<unknown> };
  [__ops_lt]: { right: Array<unknown>; ret: boolean };
  [__ops_lte]: { right: Array<unknown>; ret: boolean };
  [__ops_eq]: { right: Array<unknown>; ret: boolean };
  [__ops_gt]: { right: Array<unknown>; ret: boolean };
  [__ops_gte]: { right: Array<unknown>; ret: boolean };
  [Symbol.iterator](): IterableIterator<T>;
  [index: number]: T;
}

declare interface ArrayConstructor {
  <T>(): Array<T>;
  new <T>(): Array<T>;
  new <T>(...items: T[]): Array<T>;
}
declare var Array: ArrayConstructor;
declare var GodotArray: { new(): Array<unknown> };
