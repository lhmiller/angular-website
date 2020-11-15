import { TestBed } from '@angular/core/testing';
import { CacheService } from './cache.service';
import { LocalStorageService } from './local-storage.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheService, LocalStorageService]
    });
    service = TestBed.inject(CacheService);
    service.clear();
  });

  it('should store and retrieve values properly', () => {
    const obj = { a: 1, b: false, c: 'foo' };
    service.set('num', 22.3);
    service.set('bool', true);
    service.set('obj', obj);
    service.set('str', 'foo');

    expect(service.get('num')).toBe(22.3);
    expect(service.get('bool')).toBe(true);
    expect(service.get('obj')).toEqual(obj);
    expect(service.get('str')).toBe('foo');
  });

  it('should say an expired value is expired, and an non-expired value is not expired', () => {
    const key = 'TEST_KEY';
    const value = 'foo';

    service.set(key, value);
    expect(service.isExpired(key)).toBeFalse();

    // TODO simulate time passing so it expires
    // expect(service.isExpired(key)).toBeTrue();
  });

  it('should say a changed value is changed, and an unchanged value is not changed', () => {
    const key = 'TEST_KEY';
    const value = 'foo';
    const valueChanged = (oldValue: string) => oldValue !== value;

    service.set(key, value);
    expect(service.valueChanged(key, valueChanged)).toBeFalse();

    service.set(key, value + 'changed');
    expect(service.valueChanged(key, valueChanged)).toBeTrue();
  });

  it('should remove entries', () => {
    const keyToRemove = 'foo';
    service.set(keyToRemove, 'bar');
    expect(service.get(keyToRemove)).toBe('bar');

    service.remove(keyToRemove);
    expect(service.get(keyToRemove)).toBeNull();
  });

  it('should clear', () => {
    expect(service.length()).toBe(0);

    service.set('foo', 'bar');
    expect(service.length()).toBeGreaterThan(0);

    service.clear();
    expect(service.length()).toBe(0);
  });
});
