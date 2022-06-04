import { LruCacheService } from './LruCacheService';

describe('LRU Cache tests', () => {
  const KEY1_VALUE = { v: 1 };
  const KEY2_VALUE = { v: 2 };
  const KEY3_VALUE = { v: 3 };
  const KEY4_VALUE = { v: 4 };

  const KEY1 = 'key1';
  const KEY2 = 'key2';
  const KEY3 = 'key3';
  const KEY4 = 'key4';

  test('Cache instance created with provided max entries', () => {
    const cache = new LruCacheService(1);
    expect(cache.maxEntries).toBe(1);
  });

  test('Cache instance created with default max entries = 5', () => {
    const cache = new LruCacheService();
    expect(cache.maxEntries).toBe(5);
  });

  test('Cache stores only max entries even adding more', () => {
    const cache = new LruCacheService(1);
    cache.put(KEY1, KEY1_VALUE);
    cache.put(KEY2, KEY2_VALUE);
    cache.put(KEY3, KEY3_VALUE);
    expect(cache.values.size).toBe(1);
  });

  test('Cache evicts first added entry', () => {
    const cache = new LruCacheService(2);
    cache.put(KEY1, KEY1_VALUE);
    cache.put(KEY2, KEY2_VALUE);
    cache.put(KEY3, KEY3_VALUE);

    expect(cache.get(KEY1)).toBe(undefined);
  });

  test('Cache evicts least used entry', () => {
    const cache = new LruCacheService(2);
    cache.put(KEY1, KEY1_VALUE);
    cache.put(KEY2, KEY2_VALUE);
    cache.put(KEY3, KEY3_VALUE);

    cache.get(KEY2);
    cache.get(KEY1);
    cache.put(KEY4, KEY4_VALUE); // KEY3 remains least used before adding extra, so will be evicted

    expect(cache.get(KEY3)).toBe(undefined);
  });

  test('has() returns true if key exists', () => {
    const cache = new LruCacheService(1);
    cache.put(KEY1, KEY1_VALUE);
    expect(cache.has(KEY1)).toBe(true);
  });

  test('has() returns false if key not exists', () => {
    const cache = new LruCacheService(1);
    cache.put(KEY1, KEY1_VALUE);
    expect(cache.has(KEY2)).toBe(false);
  });
});
