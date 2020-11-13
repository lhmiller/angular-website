import { ActivatedRoute } from '@angular/router';
import { sandboxOf } from 'angular-playground';
import { IpComponent } from './ip.component';
import { IpService } from './ip.service';

class MockIpService {
  getIpInfo = () => ({
    pipe: () => ({ subscribe: () => {} })
  })
}

class MockActivatedRoute {
  snapshot = {
    paramMap: { get: () => '' }
  };
}

export default sandboxOf(IpComponent, {
  providers: [
    { provide: IpService, useClass: MockIpService },
    { provide: ActivatedRoute, useClass: MockActivatedRoute },
  ]
})
  .add('own IP', {
    template: `
      <app-ip
        [ip]="ip"
        [hostname]="hostname"
        [org]="org"
        [location]="location">
      </app-ip>`,
    context: {
      isOwnIp: true,
      ip: '1.2.3.4',
      hostname: 'My hostname!',
      org: 'My house!',
      location: 'United States',
    }
  })
  .add('not own IP', {
    template: `
      <app-ip
        [ip]="ip"
        [hostname]="hostname"
        [org]="org"
        [location]="location">
      </app-ip>`,
    context: {
      isOwnIp: false,
      ip: '234.56.420.69',
      hostname: 'Not my IP',
      org: 'Some org',
      location: 'Los Angeles',
    }
  });
