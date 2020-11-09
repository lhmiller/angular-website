import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LocalStorageService] });
    service = TestBed.inject(LocalStorageService);
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
    expect(service.length()).toBe(1);

    service.clear();
    expect(service.length()).toBe(0);
  });
});
