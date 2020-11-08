import { async, TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LocalStorageService] });
    service = TestBed.inject(LocalStorageService);
  });

  it('should store and retrieve values properly', () => {
    const obj = { a: 1, b: false, c: 'foo' };
    service.set('num', 22.3);
    service.set('bool', true);
    service.set('object', obj);
    service.set('str', 'foo');

    expect(service.get('num')).toBe(22.3);
    expect(service.get('bool')).toBe(true);
    expect(service.get('object')).toBe(obj);
    expect(service.get('str')).toBe('foo');
  });
});
