import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CacheService } from '../shared/cache.service';
import { TitleService } from '../shared/title.service';
import { IpService } from './services/ip.service';

const IP_DATA_KEY = 'IP_DATA';
const IP_DATA_TTL_MS = 10 * 60 * 1000;

interface CachedIpData {
  ipAddress: string;
  data: IpData;
}

interface IpData {
  ip: string;
  hostname: string;
  org: string;
  city: string;
  region: string;
  country: string;
}

@Component({
  selector: 'app-ip',
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.scss'],
})
export class IpComponent implements OnInit, OnDestroy {
  isOwnIp: boolean;
  ip: string;
  details: Array<{ key: string, value: string }>;
  private ngUnsubscribe = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute,
              private ipService: IpService,
              private cacheService: CacheService<CachedIpData>,
              private titleService: TitleService) {}

  ngOnInit() {
    const ip = this.activatedRoute.snapshot.paramMap.get('ip');
    this.isOwnIp = !ip;
    this.getIpData(ip);
    this.titleService.setTitle('IP Lookup');
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getIpData = (ipAddress: string) => {
    const valueChanged = (oldValue: CachedIpData) =>
      !oldValue || (ipAddress === oldValue.ipAddress);
    if (this.cacheService.valueChanged(IP_DATA_KEY, valueChanged)
        || this.cacheService.isExpired(IP_DATA_KEY)) {
      // if new ip address, or cached value expired, save new value
      this.ipService.getIpInfo(ipAddress)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((ipData: IpData) => {
          this.setIpData(ipData);
          const cacheEntry: CachedIpData = {
            ipAddress,
            data: ipData,
          };
          this.cacheService.set(IP_DATA_KEY, cacheEntry, IP_DATA_TTL_MS);
        });
    } else {
      // else (same ip address & non expired) use stored value
      this.setIpData(this.cacheService.get(IP_DATA_KEY).data);
    }
  }

  private setIpData = ({ ip, hostname, org, city, region, country }: IpData) => {
    this.ip = ip;
    const details = [];
    if (hostname) {
      details.push({ name: 'hostname', value: hostname });
    }
    details.push({ name: 'organization', value: org });
    details.push({ name: 'location', value: `${city}, ${region}, ${country}` });
    this.details = details;
  }
}
