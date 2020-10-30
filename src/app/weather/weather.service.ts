import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) {}

  getAddress = (locationName: string) => {
    // tslint:disable-next-line:max-line-length
    const loc = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=AIzaSyD14VN2PWMa-wzExV0g6dn1YBCnqecO_uw`;
    return this.httpGet(loc);
  }

  getWeather = (coordinates: string) => {
    // TODO add prod/dev config for this
    // const baseUrl = 'https://linode.lucashmiller.com:7443/https://api.darksky.net/forecast/3a62fe93bd0d5aeb142409a6a07a1e0d/';
    const baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/3a62fe93bd0d5aeb142409a6a07a1e0d/';
    return this.httpGet(baseUrl + coordinates);
  }

  getLocationName = (coordinates) => {
    // tslint:disable-next-line:max-line-length
    const loc = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates}&result_type=postal_code&key=AIzaSyD14VN2PWMa-wzExV0g6dn1YBCnqecO_uw`;
    return this.httpGet(loc);
  }

  private httpGet = (url: string) => {
    return this.http.get(url, { responseType: 'json' });
  }
}
