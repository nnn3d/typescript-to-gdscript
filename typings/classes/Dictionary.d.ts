// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A built-in data structure that holds key-value pairs. */
declare interface Object {
  /**
   * Assigns elements of another `dictionary` into the dictionary. Resizes the dictionary to match `dictionary`. Performs type conversions if the dictionary is typed.
   */
  assign(dictionary: Dictionary): void;
  /** Clears the dictionary, removing all entries from it. */
  clear(): void;
  /**
   * Returns a new copy of the dictionary.
   * By default, a **shallow** copy is returned: all nested {@link Array}, {@link Dictionary}, and {@link Resource} keys and values are shared with the original dictionary. Modifying any of those in one dictionary will also affect them in the other.
   * If `deep` is `true`, a **deep** copy is returned: all nested arrays and dictionaries are also duplicated (recursively). Any {@link Resource} is still shared with the original dictionary, though.
   */
  duplicate(deep?: boolean): Dictionary;
  /**
   * Duplicates this dictionary, deeply, like {@link duplicate} when passing `true`, with extra control over how subresources are handled.
   * `deep_subresources_mode` must be one of the values from {@link Resource.DeepDuplicateMode}. By default, only internal resources will be duplicated (recursively).
   */
  duplicate_deep(deep_subresources_mode?: int): Dictionary;
  /**
   * Removes the dictionary entry by key, if it exists. Returns `true` if the given `key` existed in the dictionary, otherwise `false`.
   * **Note:** Do not erase entries while iterating over the dictionary. You can iterate over the {@link keys} array instead.
   */
  erase(key: unknown): boolean;
  /**
   * Finds and returns the first key whose associated value is equal to `value`, or `null` if it is not found.
   * **Note:** `null` is also a valid key. If inside the dictionary, {@link find_key} may give misleading results.
   */
  find_key(value: unknown): unknown;
  /**
   * Returns the corresponding value for the given `key` in the dictionary. If the `key` does not exist, returns `default`, or `null` if the parameter is omitted.
   */
  get(key: unknown, default_?: unknown): unknown;
  /**
   * Gets a value and ensures the key is set. If the `key` exists in the dictionary, this behaves like {@link get}. Otherwise, the `default` value is inserted into the dictionary and returned.
   */
  get_or_add(key: unknown, default_?: unknown): unknown;
  /**
   * Returns the built-in {@link Variant} type of the typed dictionary's keys as a {@link Variant.Type} constant. If the keys are not typed, returns {@link TYPE_NIL}. See also {@link is_typed_key}.
   */
  get_typed_key_builtin(): int;
  /**
   * Returns the **built-in** class name of the typed dictionary's keys, if the built-in {@link Variant} type is {@link TYPE_OBJECT}. Otherwise, returns an empty {@link StringName}. See also {@link is_typed_key} and {@link Object.get_class}.
   */
  get_typed_key_class_name(): string;
  /**
   * Returns the {@link Script} instance associated with this typed dictionary's keys, or `null` if it does not exist. See also {@link is_typed_key}.
   */
  get_typed_key_script(): unknown;
  /**
   * Returns the built-in {@link Variant} type of the typed dictionary's values as a {@link Variant.Type} constant. If the values are not typed, returns {@link TYPE_NIL}. See also {@link is_typed_value}.
   */
  get_typed_value_builtin(): int;
  /**
   * Returns the **built-in** class name of the typed dictionary's values, if the built-in {@link Variant} type is {@link TYPE_OBJECT}. Otherwise, returns an empty {@link StringName}. See also {@link is_typed_value} and {@link Object.get_class}.
   */
  get_typed_value_class_name(): string;
  /**
   * Returns the {@link Script} instance associated with this typed dictionary's values, or `null` if it does not exist. See also {@link is_typed_value}.
   */
  get_typed_value_script(): unknown;
  /**
   * Returns `true` if the dictionary contains an entry with the given `key`.
   * In GDScript, this is equivalent to the `in` operator:
   * **Note:** This method returns `true` as long as the `key` exists, even if its corresponding value is `null`.
   */
  has(key: unknown): boolean;
  /** Returns `true` if the dictionary contains all keys in the given `keys` array. */
  has_all(keys: Array<unknown>): boolean;
  /**
   * Returns a hashed 32-bit integer value representing the dictionary contents.
   * **Note:** Dictionaries with the same entries but in a different order will not have the same hash.
   * **Note:** Dictionaries with equal hash values are *not* guaranteed to be the same, because of hash collisions. On the contrary, dictionaries with different hash values are guaranteed to be different.
   */
  hash(): int;
  /** Returns `true` if the dictionary is empty (its size is `0`). See also {@link size}. */
  is_empty(): boolean;
  /**
   * Returns `true` if the dictionary is read-only. See {@link make_read_only}. Dictionaries are automatically read-only if declared with `const` keyword.
   */
  is_read_only(): boolean;
  /** Returns `true` if the dictionary is typed the same as `dictionary`. */
  is_same_typed(dictionary: Dictionary): boolean;
  /** Returns `true` if the dictionary's keys are typed the same as `dictionary`'s keys. */
  is_same_typed_key(dictionary: Dictionary): boolean;
  /** Returns `true` if the dictionary's values are typed the same as `dictionary`'s values. */
  is_same_typed_value(dictionary: Dictionary): boolean;
  /**
   * Returns `true` if the dictionary is typed. Typed dictionaries can only store keys/values of their associated type and provide type safety for the `[]` operator. Methods of typed dictionary still return {@link Variant}.
   */
  is_typed(): boolean;
  /** Returns `true` if the dictionary's keys are typed. */
  is_typed_key(): boolean;
  /** Returns `true` if the dictionary's values are typed. */
  is_typed_value(): boolean;
  /** Returns the list of keys in the dictionary. */
  keys(): Array<unknown>;
  /**
   * Makes the dictionary read-only, i.e. disables modification of the dictionary's contents. Does not apply to nested content, e.g. content of nested dictionaries.
   */
  make_read_only(): void;
  /**
   * Adds entries from `dictionary` to this dictionary. By default, duplicate keys are not copied over, unless `overwrite` is `true`.
   * **Note:** {@link merge} is *not* recursive. Nested dictionaries are considered as keys that can be overwritten or not depending on the value of `overwrite`, but they will never be merged together.
   */
  merge(dictionary: Dictionary, overwrite?: boolean): void;
  /**
   * Returns a copy of this dictionary merged with the other `dictionary`. By default, duplicate keys are not copied over, unless `overwrite` is `true`. See also {@link merge}.
   * This method is useful for quickly making dictionaries with default values:
   */
  merged(dictionary: Dictionary, overwrite?: boolean): Dictionary;
  /**
   * Returns `true` if the two dictionaries contain the same keys and values, inner {@link Dictionary} and {@link Array} keys and values are compared recursively.
   */
  recursive_equal(dictionary: Dictionary, recursion_count: int): boolean;
  /**
   * Sets the value of the element at the given `key` to the given `value`. Returns `true` if the value is set successfully. Fails and returns `false` if the dictionary is read-only, or if `key` and `value` don't match the dictionary's types. This is the same as using the `[]` operator (`dict[key] = value`).
   */
  set(key: unknown, value: unknown): boolean;
  /**
   * Returns the number of entries in the dictionary. Empty dictionaries (`{ }`) always return `0`. See also {@link is_empty}.
   */
  size(): int;
  /**
   * Sorts the dictionary in ascending order, by key. The final order is dependent on the "less than" (`<`) comparison between keys.
   * This method ensures that the dictionary's entries are ordered consistently when {@link keys} or {@link values} are called, or when the dictionary needs to be converted to a string through {@link @GlobalScope.str} or {@link JSON.stringify}.
   */
  sort(): void;
  /** Returns the list of values in this dictionary. */
  values(): Array<unknown>;

  // Operator overloads
  [__ops_ne]: { right: Dictionary; ret: boolean };
  [__ops_eq]: { right: Dictionary; ret: boolean };

  [__variant_converts]: Dictionary;
}

/**
 * Override: Dictionary<K, V> — typed key/value dictionary.
 *
 * Extends the non-generic Object interface (which provides Dictionary methods
 * for {} literals) with generic overloads for typed dictionaries:
 *   var scores: Dictionary<string, int> = Dictionary();
 *   scores.set("player", 100);    // OK — key is string, value is int
 *   scores.get("player");         // returns int
 *   scores.keys();                // returns Array<string>
 */
interface Dictionary<K = unknown, V = unknown> extends Object {
  assign(dictionary: Dictionary<K, V>): void;
  duplicate(deep?: boolean): Dictionary<K, V>;
  duplicate_deep(deep_subresources_mode?: int): Dictionary<K, V>;
  erase(key: K): boolean;
  find_key(value: V): K | null;
  get(key: K, default_?: V): V;
  get_or_add(key: K, default_?: V): V;
  has(key: K): boolean;
  has_all(keys: Array<K>): boolean;
  keys(): Array<K>;
  merge(dictionary: Dictionary<K, V>, overwrite?: boolean): void;
  merged(dictionary: Dictionary<K, V>, overwrite?: boolean): Dictionary<K, V>;
  set(key: K, value: V): boolean;
  values(): Array<V>;
}
declare interface DictionaryConstructor {
  readonly prototype: Dictionary;
  /** Constructs an empty {@link Dictionary}. */
  (): Dictionary;
  /**
   * Creates a typed dictionary from the `base` dictionary. A typed dictionary can only contain keys and values of the given types, or that inherit from the given classes, as described by this constructor's parameters.
   */
  (base: Dictionary, key_type: int, key_class_name: string, key_script: unknown, value_type: int, value_class_name: string, value_script: unknown): Dictionary;
  /** Returns the same dictionary as `from`. If you need a copy of the dictionary, use {@link duplicate}. */
  (from_: Dictionary): Dictionary;
}
declare const Dictionary: DictionaryConstructor;
declare var Object: typeof GodotObject;
