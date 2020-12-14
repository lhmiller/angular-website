import { TestBed } from '@angular/core/testing';
import { TitleService } from './title.service';

describe('TitleService', () => {
  let service: TitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TitleService] });
    service = TestBed.inject(TitleService);
  });

  it('should update the document title', () => {
    document.title = '';
    service.setTitle('foo');
    expect(document.title).toBe('foo');
  });
});
