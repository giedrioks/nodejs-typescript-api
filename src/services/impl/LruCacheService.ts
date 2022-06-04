import { ICacheService } from '../ICacheService';

export class LruCacheService<T> implements ICacheService<T> {
  values: Map<string, T> = new Map<string, T>();
  maxEntries;

  constructor(maxEntries = 5) {
    this.maxEntries = maxEntries;
  }

  public get(key: string): T | undefined {
    const hasKey = this.values.has(key);
    let entry: T | undefined = undefined;
    if (hasKey) {
      // peek the entry, re-insert for LRU strategy
      entry = this.values.get(key);
      this.values.delete(key);
      if (entry) this.values.set(key, entry);
    }
    return entry;
  }

  public put(key: string, value: T) {
    if (this.values.size >= this.maxEntries) {
      // least-recently used cache eviction strategy
      const keyToDelete = this.values.keys().next().value;
      this.values.delete(keyToDelete);
    }

    this.values.set(key, value);
  }

  public has(key: string): boolean {
    return this.values.has(key);
  }
}
