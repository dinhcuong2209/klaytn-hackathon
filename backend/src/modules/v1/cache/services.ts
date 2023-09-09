import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string): Promise<T> {
    const value = await this.cacheManager.get<T>(key);
    return value as T;
  }

  async set<T>(key: string, value: T, ttl?: number) {
    await this.cacheManager.set(key, value, ttl);
  }

  async del(key: string) {
    await this.cacheManager.del(key);
  }
}
