import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// TODO use `scheduled` instead of `of`
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { epochToDateTime, WxData } from '../weather-utils';

@Injectable()
export class GeolocationService {
  constructor(private http: HttpClient) {}

  getWeather = (coordinates: string) => {
    // TODO add prod/dev config for this url
    // const baseUrl = 'https://linode.lucashmiller.com:7443/https://api.darksky.net/forecast/3a62fe93bd0d5aeb142409a6a07a1e0d/';
    const baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/3a62fe93bd0d5aeb142409a6a07a1e0d/';
    return this.http.get(baseUrl + coordinates).pipe(
      map((data: WxData) => {
        const sunrise = epochToDateTime(data.daily.data[0].sunriseTime);
        const sunset = epochToDateTime(data.daily.data[0].sunsetTime);
        const time = epochToDateTime(data.currently.time);
        console.log('WEATHER', data);
        return { data, sunrise, sunset, time };
      })
    );
  }

  getAddress = (locationName: string) => {
    // tslint:disable-next-line:max-line-length
    const loc = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=AIzaSyD14VN2PWMa-wzExV0g6dn1YBCnqecO_uw`;
    return this.http.get(loc).pipe(
      map((data: any) => {
        const lat = data.results[0].geometry.location.lat;
        const long = data.results[0].geometry.location.lng;
        const address = data.results[0].formatted_address;
        console.log('ADDRESS', data.results[0]);
        console.log(lat, long, address);
        return { lat, long, address };
      })
    );
  }

  getLocationName = (coordinates) => {
    // tslint:disable-next-line:max-line-length
    const loc = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates}&result_type=postal_code&key=AIzaSyD14VN2PWMa-wzExV0g6dn1YBCnqecO_uw`;
    return this.http.get(loc).pipe(
      map((data: WxData) => data.results[0].address_components[1].short_name)
    );
  }

  getCurrentPosition = () => {
    const defaultLatLong = '35.2555507,-120.6849783';

    if (navigator.geolocation) {
      return new Observable(observer => {
        navigator.geolocation.getCurrentPosition(
          // success
          (pos) => {
            const latLong = `${pos.coords.latitude},${pos.coords.longitude}`;
            observer.next(latLong);
            observer.complete();
          },
          // error
          (err) => {
            console.warn(err);
            observer.next(defaultLatLong);
            observer.complete();
          },
          // options
          {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0
          }
        );
      });
    } else {
      alert('Could not determine your geolocation.');
      return of(defaultLatLong);
    }
  }
}
