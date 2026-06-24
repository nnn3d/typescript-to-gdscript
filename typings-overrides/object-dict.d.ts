/**
 * Override: Object (the structural base every value/dictionary inherits) —
 * `this: T` generic methods so plain object literals and typed Dictionaries
 * get key/value-aware typing for the Dictionary access methods.
 *
 * The `this: T` parameter (à la CallableFunction.apply/bind) infers the actual
 * receiver type at the call site, so `keyof this` resolves to the real keys
 * instead of collapsing to `keyof Object`. Each method pairs a typed overload
 * (literal/known keys → precise type) with a permissive fallback (`unknown`
 * key/value) so dynamic runtime keys, `{}` literals, and untyped Dictionaries
 * keep compiling — matching GDScript's Variant semantics where these methods
 * accept/return Variant. The typed overload comes first so it wins for known
 * literal keys.
 *
 * Value/key TYPE ENFORCEMENT for typed dictionaries comes from the index
 * signature on `Dictionary<K, V>` via the `[]` operator (`d[k] = v`), not from
 * these methods — the permissive fallback intentionally allows `.set()` etc.
 * with any value.
 *
 *   const d: Dictionary<string, int> = { x: 1 };
 *   d.get("x");          // int      (typed overload)
 *   d.get(someStr);      // unknown  (fallback)
 *   d.keys();            // Array<string>
 *   d["x"] = "no";       // ERROR    (index signature enforces value type)
 */
interface Object {
  get<T, K extends keyof T>(this: T, key: K, default_?: T[K]): T[K];
  get(key: unknown, default_?: unknown): unknown;
  get_or_add<T, K extends keyof T>(this: T, key: K, default_?: T[K]): T[K];
  get_or_add(key: unknown, default_?: unknown): unknown;
  has<T, K extends keyof T>(this: T, key: K): boolean;
  has(key: unknown): boolean;
  erase<T, K extends keyof T>(this: T, key: K): boolean;
  erase(key: unknown): boolean;
  set<T, K extends keyof T>(this: T, key: K, value: T[K]): boolean;
  set(key: unknown, value: unknown): boolean;
  find_key<T>(this: T, value: T[keyof T]): keyof T | null;
  find_key(value: unknown): unknown;
  keys<T>(this: T): Array<keyof T>;
  values<T>(this: T): Array<T[keyof T]>;
  duplicate<T>(this: T, deep?: boolean): T;
  merged<T>(this: T, dictionary: T, overwrite?: boolean): T;
}
