import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class IpService {
  constructor(private http: HttpClient) {}

  getIpInfo = (ipAddress: string) => {
    const ipUrl = `https://ipinfo.io/${ipAddress || ''}`;
    return this.http.get(ipUrl);
  }
}
