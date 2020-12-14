import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class CacheService<T> {
  constructor(private storageService: LocalStorageService) {}

  get = (key: string): T => {
    return this.storageService.get(key);
  }

  set = (key: string, value: T, ttlMs: number) => {
    const { expirationKey, now } = this.getCommonVars(key);
    this.storageService.set(key, value);
    const expiration = now + ttlMs;
    this.storageService.set(expirationKey, expiration);
  }

  remove = (key: string) => {
    const { expirationKey } = this.getCommonVars(key);
    this.storageService.remove(key);
    this.storageService.remove(expirationKey);
  }

  clear = () => {
    this.storageService.clear();
  }

  isExpired = (key: string) => {
    const { expirationKey, now } = this.getCommonVars(key);
    const expirationValue = this.storageService.get(expirationKey);
    const expiration = typeof expirationValue === 'number'
      ? expirationValue
      : -Number.MIN_VALUE;
    return now > expiration;
  }

  valueChanged = (key: string, comparatorFn: (oldValue: T) => boolean) =>
    comparatorFn(this.get(key))

  length = () => this.storageService.length();

  private getCommonVars = (key: string) => ({
    expirationKey: `${key}-expiration`,
    now: new Date().valueOf(),
  })
}
