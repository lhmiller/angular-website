import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CacheService } from './cache.service';
import { LocalStorageService } from './local-storage.service';

const CACHE_TTL_MS = 2 * 60 * 1000; // TTL is 2 mins

describe('CacheService', () => {
  let service: CacheService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CacheService,
        LocalStorageService,
      ]
    });
    service = TestBed.inject(CacheService);
    service.clear();
  });

  it('should store and retrieve values properly', () => {
    const obj = { a: 1, b: false, c: 'foo' };
    service.set('num', 22.3, CACHE_TTL_MS);
    service.set('bool', true, CACHE_TTL_MS);
    service.set('obj', obj, CACHE_TTL_MS);
    service.set('str', 'foo', CACHE_TTL_MS);

    expect(service.get('num')).toBe(22.3);
    expect(service.get('bool')).toBe(true);
    expect(service.get('obj')).toEqual(obj);
    expect(service.get('str')).toBe('foo');
  });

  it('should say an expired value is expired, and an non-expired value is not expired', fakeAsync(() => {
    const key = 'TEST_KEY';
    const value = 'foo';

    service.set(key, value, CACHE_TTL_MS);
    expect(service.isExpired(key)).toBeFalse();

    tick(CACHE_TTL_MS);
    expect(service.isExpired(key)).toBeFalse();

    tick(1000);
    expect(service.isExpired(key)).toBeTrue();
  }));

  it('should say a changed value is changed, and an unchanged value is not changed', () => {
    const key = 'TEST_KEY';
    const value = 'foo';
    const valueChanged = (oldValue: string) => oldValue !== value;

    service.set(key, value, CACHE_TTL_MS);
    expect(service.valueChanged(key, valueChanged)).toBeFalse();

    service.set(key, value + 'changed', CACHE_TTL_MS);
    expect(service.valueChanged(key, valueChanged)).toBeTrue();
  });

  it('should remove entries', () => {
    const keyToRemove = 'foo';
    service.set(keyToRemove, 'bar', CACHE_TTL_MS);
    expect(service.get(keyToRemove)).toBe('bar');

    service.remove(keyToRemove);
    expect(service.get(keyToRemove)).toBeNull();
  });

  it('should clear', () => {
    expect(service.length()).toBe(0);

    service.set('foo', 'bar', CACHE_TTL_MS);
    expect(service.length()).toBeGreaterThan(0);

    service.clear();
    expect(service.length()).toBe(0);
  });
});
