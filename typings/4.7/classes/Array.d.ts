// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

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
  all(method: (value: T) => boolean): boolean;
  any(method: (value: T) => boolean): boolean;
  append(value: T): void;
  append_array(array: Array<T>): void;
  assign(array: Array<T>): void;
  back(): T;
  bsearch(value: T, before?: boolean): int;
  bsearch_custom(
  value: T,
  func: (a: T, b: T) => boolean,
  before?: boolean,
  ): int;
  /** Removes all elements from the array. This is equivalent to using {@link resize} with a size of `0`. */
  clear(): void;
  count(value: T): int;
  duplicate(deep?: boolean): Array<T>;
  duplicate_deep(deep_subresources_mode?: int): Array<T>;
  erase(value: T): void;
  fill(value: T): void;
  filter(method: (value: T) => boolean): Array<T>;
  find(what: T, from_?: int): int;
  find_custom(method: (value: T) => boolean, from_?: int): int;
  front(): T;
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
  has(value: T): boolean;
  /**
   * Returns a hashed 32-bit integer value representing the array and its contents.
   * **Note:** Arrays with equal hash values are *not* guaranteed to be the same, as a result of hash collisions. On the contrary, arrays with different hash values are guaranteed to be different.
   */
  hash(): int;
  insert(position: int, value: T): int;
  /** Returns `true` if the array is empty (`[]`). See also {@link size}. */
  is_empty(): boolean;
  /**
   * Returns `true` if the array is read-only. See {@link make_read_only}.
   * In GDScript, arrays are automatically read-only if declared with the `const` keyword.
   */
  is_read_only(): boolean;
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
  map<U>(method: (value: T) => U): Array<U>;
  max(): T;
  min(): T;
  pick_random(): T;
  pop_at(position: int): T;
  pop_back(): T;
  pop_front(): T;
  push_back(value: T): void;
  push_front(value: T): void;
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
  rfind(what: T, from_?: int): int;
  rfind_custom(method: (value: T) => boolean, from_?: int): int;
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
  slice(begin: int, end?: int, step?: int, deep?: boolean): Array<T>;
  /**
   * Sorts the array in ascending order. The final order is dependent on the "less than" (`<`) comparison between elements.
   * **Note:** The sorting algorithm used is not stable (https://en.wikipedia.org/wiki/Sorting_algorithm#Stability). This means that equivalent elements (such as `2` and `2.0`) may have their order changed when calling {@link sort}.
   */
  sort(): void;
  sort_custom(func: (a: T, b: T) => boolean): void;

  // Operator overloads
  [__ne]: { right: Array<unknown>; ret: boolean };
  [__add]: { right: Array<unknown>; ret: Array<unknown> };
  [__lt]: { right: Array<unknown>; ret: boolean };
  [__lte]: { right: Array<unknown>; ret: boolean };
  [__eq]: { right: Array<unknown>; ret: boolean };
  [__gt]: { right: Array<unknown>; ret: boolean };
  [__gte]: { right: Array<unknown>; ret: boolean };
  [Symbol.iterator](): IterableIterator<T>;
  [index: number]: T;
}

type GodotArray = Array<unknown>;
declare interface ArrayConstructor {
  new <T>(): Array<T>;
  new <T>(...items: T[]): Array<T>;
}
declare var Array: ArrayConstructor;
declare var GodotArray: { new(): Array<unknown> };
