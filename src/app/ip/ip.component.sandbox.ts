import { ActivatedRoute } from '@angular/router';
import { sandboxOf } from 'angular-playground';
import { CacheService } from '../shared/cache.service';
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
  valueChanged = () => false;
  isExpired = () => false;
}

class MockCacheServiceOwnIp extends MockCacheServiceBase {
  get = () => ({
    ip: '1.2.3.4',
    hostname: 'My hostname!',
    org: 'My org!',
    city: 'city',
    region: 'region',
    country: 'country',
  })
}

class MockCacheServiceNotOwnIp extends MockCacheServiceBase {
  get = () => ({
    ip: '234.56.420.69',
    hostname: 'Some hostname (not my IP)',
    org: 'Some org',
    city: 'city',
    region: 'region',
    country: 'country',
  })
}

export default sandboxOf(IpComponent, {
  providers: [{ provide: IpService, useClass: MockIpService }]
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
