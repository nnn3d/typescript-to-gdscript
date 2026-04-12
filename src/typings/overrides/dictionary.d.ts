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
