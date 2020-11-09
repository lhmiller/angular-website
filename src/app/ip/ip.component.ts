import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IpService } from './ip.service';

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
              private ipService: IpService) {}

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
    this.ipService.getIpInfo(ipAddress)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(({
        ip, hostname, org, city, region, country
      }: any) => {
        this.ip = ip;
        if (hostname) {
          this.hostname = hostname;
        }
        this.org = org;
        this.location = `${city} ${region} ${country}`;
      });
  }
}
