/**
 * Override: Dictionary typed surface.
 *
 * `DictionaryTypedMethods<K, V>` is the single source of truth for the
 * key/value-typed access methods. The generator derives `DictionaryKeyMethods`
 * from it — `Omit<Object, keyof DictionaryTypedMethods> & DictionaryTypedMethods`
 * — so the method-name list lives only here. Because the typed methods are
 * all-`unknown` when K = V = unknown, a bare `Dictionary`
 * (= DictionaryKeyMethods<unknown, unknown>) still accepts `{}` literals.
 */
interface DictionaryTypedMethods<K = unknown, V = unknown> {
  get(key: K, default_?: V): V;
  get_or_add(key: K, default_?: V): V;
  set(key: K, value: V): boolean;
  has(key: K): boolean;
  has_all(keys: Array<K>): boolean;
  erase(key: K): boolean;
  find_key(value: V): K | null;
  keys(): Array<K>;
  values(): Array<V>;
  assign(dictionary: Dictionary<K, V>): void;
  merge(dictionary: Dictionary<K, V>, overwrite?: boolean): void;
  merged(dictionary: Dictionary<K, V>, overwrite?: boolean): Dictionary<K, V>;
  duplicate(deep?: boolean): Dictionary<K, V>;
}

/**
 * Override: DictionaryConstructor — generic call signatures so
 * `Dictionary<K, V>()` yields a typed dictionary. (Inference from a contextual
 * type or a copy argument can't flow through the conditional `Dictionary` alias,
 * so use explicit type arguments for a typed result.)
 */
declare interface DictionaryConstructor {
  readonly prototype: Dictionary;
  <K = unknown, V = unknown>(): Dictionary<K, V>;
  <K = unknown, V = unknown>(from_: Dictionary<K, V>): Dictionary<K, V>;
  <K = unknown, V = unknown>(
    base: Dictionary<K, V>,
    key_type: int,
    key_class_name: string,
    key_script: unknown,
    value_type: int,
    value_class_name: string,
    value_script: unknown,
  ): Dictionary<K, V>;
}
