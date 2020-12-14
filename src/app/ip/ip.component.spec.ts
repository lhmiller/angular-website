import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CacheService } from '../shared/cache.service';
import { TitleService } from '../shared/title.service';
import { IpComponent } from './ip.component';
import { IpService } from './services/ip.service';

class MockIpService {
  getIpInfo = () => of({});
}

class MockActivatedRoute {
  snapshot = {
    paramMap: { get: () => '' }
  };
}

class MockCacheService {
  get = () => ({
    data: {
      ip: '1.1.1.1',
      hostname: 'host',
      org: 'org',
      city: 'city',
      region: 'region',
      country: 'country',
    }
  })
  valueChanged = () => false;
  isExpired = () => false;
}

class MockTitleService {
  setTitle = () => {};
}

describe('IpComponent', () => {
  let component: IpComponent;
  let fixture: ComponentFixture<IpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IpComponent],
      providers: [
        { provide: IpService, useClass: MockIpService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: CacheService, useClass: MockCacheService },
        { provide: TitleService, useClass: MockTitleService },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
