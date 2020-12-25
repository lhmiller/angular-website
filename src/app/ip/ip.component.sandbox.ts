import { ActivatedRoute } from '@angular/router';
import { sandboxOf } from 'angular-playground';
import { CacheService } from '../shared/cache.service';
import { TitleService } from '../shared/title.service';
import { IpComponent } from './ip.component';
import { IpService } from './services/ip.service';

class MockIpService {
  getIpInfo = () => ({
    pipe: () => ({ subscribe: () => {} })
  })
}

class MockActivatedRouteOwnIp {
  snapshot = {
    paramMap: { get: () => '' }
  };
}

class MockActivatedRouteNotOwnIp {
  snapshot = {
    paramMap: { get: () => '23.34.45.56' }
  };
}

class MockCacheServiceBase {
  valueChangedOrExpired = () => false;
}

class MockCacheServiceOwnIp extends MockCacheServiceBase {
  get = () => ({
    data: {
      ip: '1.2.3.4',
      hostname: 'My hostname',
      org: 'My org',
      city: 'Somecity',
      region: 'Someregion',
      country: 'US&A',
    }
  })
}

class MockCacheServiceNotOwnIp extends MockCacheServiceBase {
  get = () => ({
    data: {
      ip: '234.56.420.69',
      hostname: 'Google',
      org: 'Alphabet',
      city: 'Mountain View',
      region: 'The Bay',
      country: 'US&A',
    }
  })
}

class MockTitleService {
  setTitle = () => {};
}

export default sandboxOf(IpComponent, {
  providers: [
    { provide: IpService, useClass: MockIpService },
    { provide: TitleService, useClass: MockTitleService },
  ],
})
  .add('own IP', {
    template: `<app-ip></app-ip>`,
    providers: [
      { provide: ActivatedRoute, useClass: MockActivatedRouteOwnIp },
      { provide: CacheService, useClass: MockCacheServiceOwnIp },
    ]
  })
  .add('not own IP', {
    template: `<app-ip></app-ip>`,
    providers: [
      { provide: ActivatedRoute, useClass: MockActivatedRouteNotOwnIp },
      { provide: CacheService, useClass: MockCacheServiceNotOwnIp },
    ]
  });
