export interface ICacheService<T> {
  get(key: string): T | undefined;
  put(key: string, value: T): void;
  has(key: string): boolean;
}
