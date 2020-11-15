import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';

// TODO make this injectable per consumer to customize? but keep default value here
const CACHE_TTL_MS = 2 * 60 * 1000;

@Injectable()
export class CacheService<T> {
  constructor(private storageService: LocalStorageService) {}

  get = (key: string): T => {
    return this.storageService.get(key);
  }

  set = (key: string, value: T) => {
    const { timestampKey, now } = this.getCommonVars(key);
    this.storageService.set(key, value);
    this.storageService.set(timestampKey, now);
  }

  remove = (key: string) => {
    const { timestampKey } = this.getCommonVars(key);
    this.storageService.remove(key);
    this.storageService.remove(timestampKey);
  }

  clear = () => {
    this.storageService.clear();
  }

  isExpired = (key: string) => {
    const { timestampKey, now } = this.getCommonVars(key);
    const timestampValue = this.storageService.get(timestampKey);
    const timestamp = typeof timestampValue === 'number'
      ? timestampValue
      : -Number.MIN_VALUE;
    return (now - timestamp) > CACHE_TTL_MS;
  }

  valueChanged = (key: string, comparatorFn: (oldValue: T) => boolean) =>
    comparatorFn(this.get(key))

  length = () => this.storageService.length();

  private getCommonVars = (key: string) => ({
    timestampKey: this.getTimestampKey(key),
    now: new Date().valueOf(),
  })

  private getTimestampKey = (key: string) => `${key}-timestamp`;
}
