import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ip',
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.scss']
})
export class IpComponent implements OnInit {
  isOwnIp: boolean;
  ip: string;
  hostname: string;
  org: string;
  location: string;

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient) {}

  ngOnInit() {
    const ip = this.activatedRoute.snapshot.paramMap.get('ip');
    this.isOwnIp = !ip;
    this.getIpData(ip);
  }

  getIpData(ipAddress: string) {
    const ipUrl = `https://ipinfo.io/${ipAddress || ''}`;
    // TODO is this needed?
    const token = '?token=a96a29a2e3eb6f';
    // TODO figure out how to authenticate
    this.http.get(ipUrl + token).subscribe(({
      ip, hostname, org, region, country
    }: any) => {
      this.ip = ip;
      if (hostname) {
        this.hostname = hostname;
      }
      this.org = org;
      this.location = `${region}, ${country}`;
    });
  }
}
