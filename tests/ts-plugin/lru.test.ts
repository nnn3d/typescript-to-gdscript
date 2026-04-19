import { describe, it, expect, vi } from 'vitest';
import { LRU } from '../../src/ts-plugin/lru.ts';

describe('LRU', () => {
  it('rejects non-positive max', () => {
    expect(() => new LRU<number>(0)).toThrow();
    expect(() => new LRU<number>(-1)).toThrow();
  });

  it('stores and retrieves values up to max', () => {
    const lru = new LRU<string>(3);
    lru.set('a', 'A');
    lru.set('b', 'B');
    lru.set('c', 'C');
    expect(lru.size).toBe(3);
    expect(lru.get('a')).toBe('A');
    expect(lru.get('b')).toBe('B');
    expect(lru.get('c')).toBe('C');
  });

  it('evicts the oldest entry when adding past max', () => {
    const lru = new LRU<string>(2);
    lru.set('a', 'A');
    lru.set('b', 'B');
    lru.set('c', 'C'); // evicts 'a'
    expect(lru.size).toBe(2);
    expect(lru.has('a')).toBe(false);
    expect(lru.has('b')).toBe(true);
    expect(lru.has('c')).toBe(true);
  });

  it('get() bumps the accessed key to newest', () => {
    const lru = new LRU<string>(2);
    lru.set('a', 'A');
    lru.set('b', 'B');
    // 'a' would normally be oldest; touching it bumps it.
    expect(lru.get('a')).toBe('A');
    lru.set('c', 'C'); // evicts 'b', not 'a'
    expect(lru.has('a')).toBe(true);
    expect(lru.has('b')).toBe(false);
    expect(lru.has('c')).toBe(true);
  });

  it('set() on existing key bumps it to newest (no eviction)', () => {
    const lru = new LRU<string>(2);
    lru.set('a', 'A');
    lru.set('b', 'B');
    lru.set('a', 'A2'); // overwrite + bump
    lru.set('c', 'C'); // evicts 'b', not 'a'
    expect(lru.get('a')).toBe('A2');
    expect(lru.has('b')).toBe(false);
    expect(lru.has('c')).toBe(true);
    expect(lru.size).toBe(2);
  });

  it('returns undefined from get() on unknown key', () => {
    const lru = new LRU<string>(2);
    lru.set('a', 'A');
    expect(lru.get('missing')).toBeUndefined();
    // Missing gets don't bump anything.
    lru.set('b', 'B');
    lru.set('c', 'C');
    expect(lru.has('a')).toBe(false);
  });

  it('preserves null values (distinct from absent)', () => {
    const lru = new LRU<string | null>(2);
    lru.set('a', null);
    expect(lru.has('a')).toBe(true);
    expect(lru.get('a')).toBeNull();
  });

  it('fires onEvict when capacity is exceeded', () => {
    const onEvict = vi.fn();
    const lru = new LRU<string>(2, onEvict);
    lru.set('a', 'A');
    lru.set('b', 'B');
    expect(onEvict).not.toHaveBeenCalled();
    lru.set('c', 'C');
    expect(onEvict).toHaveBeenCalledOnce();
    expect(onEvict).toHaveBeenCalledWith('a', 'A');
  });

  it('does NOT fire onEvict on explicit delete()', () => {
    const onEvict = vi.fn();
    const lru = new LRU<string>(2, onEvict);
    lru.set('a', 'A');
    lru.delete('a');
    expect(onEvict).not.toHaveBeenCalled();
    expect(lru.has('a')).toBe(false);
  });

  it('does NOT fire onEvict on re-set of same key', () => {
    const onEvict = vi.fn();
    const lru = new LRU<string>(2, onEvict);
    lru.set('a', 'A');
    lru.set('a', 'A2');
    expect(onEvict).not.toHaveBeenCalled();
    expect(lru.get('a')).toBe('A2');
  });

  it('clear() fires onEvict for every entry', () => {
    const onEvict = vi.fn();
    const lru = new LRU<string>(3, onEvict);
    lru.set('a', 'A');
    lru.set('b', 'B');
    lru.set('c', 'C');
    lru.clear();
    expect(onEvict).toHaveBeenCalledTimes(3);
    expect(lru.size).toBe(0);
  });

  it('keys() and values() reflect insertion/access order', () => {
    const lru = new LRU<string>(3);
    lru.set('a', 'A');
    lru.set('b', 'B');
    lru.set('c', 'C');
    lru.get('a'); // bump a to newest
    expect(Array.from(lru.keys())).toEqual(['b', 'c', 'a']);
    expect(Array.from(lru.values())).toEqual(['B', 'C', 'A']);
  });

  it('eviction cascade: onEvict on each overflow insert', () => {
    const evicted: Array<[string, number]> = [];
    const lru = new LRU<number>(2, (k, v) => evicted.push([k, v]));
    lru.set('a', 1);
    lru.set('b', 2);
    lru.set('c', 3); // evicts a
    lru.set('d', 4); // evicts b
    lru.set('e', 5); // evicts c
    expect(evicted).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    expect(Array.from(lru.keys())).toEqual(['d', 'e']);
  });
});
