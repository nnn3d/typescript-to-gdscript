/**
 * Minimal LRU (least-recently-used) cache keyed by string.
 *
 * Backed by a plain `Map` — JS Maps iterate in insertion order, so:
 *   - `get()` bumps the key to "newest" (delete + re-set).
 *   - `set()` on an existing key does the same; on a new key past
 *     `max`, the iterator's first key (= oldest) is evicted.
 *
 * The optional `onEvict(key, value)` hook fires exactly once per
 * displaced entry — intended for releasing resources held by the
 * evicted value (file watchers, subprocesses, …). Not called on
 * explicit `delete()` or re-`set()` of the same key.
 *
 * Deliberately tiny and dependency-free. Used by the ts-plugin to
 * bound per-session Maps that would otherwise grow for the life of
 * the tsserver process.
 */
export class LRU<V> {
  readonly max: number;
  private readonly onEvict?: (key: string, value: V) => void;
  private readonly map = new Map<string, V>();

  constructor(max: number, onEvict?: (key: string, value: V) => void) {
    if (max <= 0) throw new Error(`LRU max must be > 0, got ${max}`);
    this.max = max;
    this.onEvict = onEvict;
  }

  get size(): number {
    return this.map.size;
  }

  has(key: string): boolean {
    return this.map.has(key);
  }

  /** Get a value and bump it to most-recently-used. Returns `undefined` if absent. */
  get(key: string): V | undefined {
    if (!this.map.has(key)) return undefined;
    // `has` guarded the access — value is whatever was stored,
    // including legitimately-undefined or null. Safe to assert.
    const v = this.map.get(key) as V;
    this.map.delete(key);
    this.map.set(key, v);
    return v;
  }

  /**
   * Store a value and mark it most-recently-used. Evicts the oldest
   * key when adding a new one would exceed `max` — the eviction hook
   * (if any) is called with the evicted entry.
   */
  set(key: string, value: V): void {
    this.map.delete(key); // no-op if absent
    this.map.set(key, value);
    if (this.map.size > this.max) {
      const iter = this.map.keys().next();
      if (!iter.done) {
        const oldestKey = iter.value;
        const oldestValue = this.map.get(oldestKey) as V;
        this.map.delete(oldestKey);
        this.onEvict?.(oldestKey, oldestValue);
      }
    }
  }

  /** Remove an entry. Does NOT fire `onEvict` — explicit deletes are caller-managed. */
  delete(key: string): boolean {
    return this.map.delete(key);
  }

  /** Empty the cache. Fires `onEvict` for every remaining entry. */
  clear(): void {
    if (this.onEvict) {
      for (const [k, v] of this.map) this.onEvict(k, v);
    }
    this.map.clear();
  }

  keys(): IterableIterator<string> {
    return this.map.keys();
  }

  values(): IterableIterator<V> {
    return this.map.values();
  }
}
