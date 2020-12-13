import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CacheService } from '../shared/cache.service';
import { IpService } from './services/ip.service';

const IP_DATA_KEY = 'IP_DATA';

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
  styleUrls: ['./ip.component.scss']
})
export class IpComponent implements OnInit, OnDestroy {
  isOwnIp: boolean;
  ip: string;
  hostname: string;
  org: string;
  location: string;
  private ngUnsubscribe = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute,
              private ipService: IpService,
              private cacheService: CacheService<CachedIpData>) {}

  ngOnInit() {
    const ip = this.activatedRoute.snapshot.paramMap.get('ip');
    this.isOwnIp = !ip;
    this.getIpData(ip);
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
          this.cacheService.set(IP_DATA_KEY, cacheEntry);
        });
    } else {
      // else (same ip address & non expired) use stored value
      this.setIpData(this.cacheService.get(IP_DATA_KEY).data);
    }
  }

  private setIpData = ({ ip, hostname, org, city, region, country }: IpData) => {
    this.ip = ip;
    if (hostname) {
      this.hostname = hostname;
    }
    this.org = org;
    this.location = `${city} ${region} ${country}`;
  }
}
