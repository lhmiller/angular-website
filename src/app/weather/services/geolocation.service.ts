import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoogleMapsData, WxData } from '../weather-utils';
import { environment } from '../../../environments/environment';

@Injectable()
export class GeolocationService {
  constructor(private http: HttpClient) {}

  getWeather = (coordinates: string) => {
    return this.http.get(environment.weatherBaseUrl + coordinates).pipe(
      map((data: WxData) => {
        return data;
      })
    );
  }

  getAddress = (locationName: string) => {
    // tslint:disable-next-line:max-line-length
    const loc = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=AIzaSyD14VN2PWMa-wzExV0g6dn1YBCnqecO_uw`;
    return this.http.get(loc).pipe(
      map((data: GoogleMapsData) => {
        const lat = data.results[0].geometry.location.lat;
        const long = data.results[0].geometry.location.lng;
        const address = data.results[0].formatted_address;
        return { lat, long, address };
      })
    );
  }

  getLocationName = (coordinates) => {
    // tslint:disable-next-line:max-line-length
    const loc = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates}&result_type=postal_code&key=AIzaSyD14VN2PWMa-wzExV0g6dn1YBCnqecO_uw`;
    return this.http.get(loc).pipe(
      map((data: GoogleMapsData) => data.results[0].address_components[1].short_name)
    );
  }

  getCurrentPosition = () => {
    const defaultLatLong = '35.2555507,-120.6849783';

    if (navigator.geolocation) {
      return new Observable(observer => {
        navigator.geolocation.getCurrentPosition(
          // success
          (pos: Position) => {
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
