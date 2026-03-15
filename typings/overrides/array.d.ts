/**
 * Override: Array<T> — adds generic type parameter to GDScript Array.
 *
 * The generator produces `interface Array { ... }` with `unknown` for element types.
 * This override replaces it with `interface Array<T>` so that typed arrays work:
 *   var nums: Array<int> = [];
 *   nums.append(42);       // OK
 *   nums.append("hello");  // Error: string is not int
 */
interface Array<T = unknown> {
  all(method: (value: T) => boolean): boolean;
  any(method: (value: T) => boolean): boolean;
  append(value: T): void;
  append_array(array: Array<T>): void;
  assign(array: Array<T>): void;
  back(): T;
  bsearch(value: T, before?: boolean): int;
  bsearch_custom(value: T, func: (a: T, b: T) => boolean, before?: boolean): int;
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
  has(value: T): boolean;
  insert(position: int, value: T): int;
  is_same_typed(array: Array<T>): boolean;
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
  rfind(what: T, from_?: int): int;
  rfind_custom(method: (value: T) => boolean, from_?: int): int;
  set(index: int, value: T): void;
  slice(begin: int, end?: int, step?: int, deep?: boolean): Array<T>;
  sort_custom(func: (a: T, b: T) => boolean): void;
  [index: number]: T;
}
