import { sandboxOf } from 'angular-playground';
import { of } from 'rxjs';
import { epochToDateTime } from './weather-utils';
import { WeatherComponent } from './weather.component';
import { GeolocationService } from './services/geolocation.service';
import weatherData from './playground/weather-response';
import { TitleService } from '../shared/title.service';

class MockGeolocationService {
  getAddress = () => {
    const lat = 35.3579;
    const long = 120.6789;
    const address = '123 Test Lane';
    return of({ lat, long, address });
  }

  getWeather = () => {
    const data = weatherData;
    const sunrise = epochToDateTime(data.daily.data[0].sunriseTime);
    const sunset = epochToDateTime(data.daily.data[0].sunsetTime);
    const time = epochToDateTime(data.currently.time);
    return of({ data, sunrise, sunset, time });
  }

  getCurrentPosition = () => of('35.2555507,-120.6849783');

  getLocationName = () => of('San Luis Obispo');
}

class MockTitleService {
  setTitle = () => {};
}

export default sandboxOf(WeatherComponent, {
  providers: [
    { provide: GeolocationService, useClass: MockGeolocationService },
    { provide: TitleService, useClass: MockTitleService },
  ],
})
  .add('default', {
    template: `<app-weather></app-weather>`
  });
