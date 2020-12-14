import { sandboxOf } from 'angular-playground';
import { of } from 'rxjs';
import { WeatherComponent } from './weather.component';
import { GeolocationService } from './services/geolocation.service';
import weatherData from './playground/weather-response';
import { TitleService } from '../shared/title.service';
import { CacheService } from '../shared/cache.service';

class MockGeolocationService {
  getAddress = () => {
    const lat = 35.3579;
    const long = 120.6789;
    const address = '123 Test Lane';
    return of({ lat, long, address });
  }

  getWeather = () => {
    return of(weatherData);
  }

  getCurrentPosition = () => of('35.2555507,-120.6849783');

  getLocationName = () => of('San Luis Obispo');
}

class MockCacheService {
  get = () => {};
  valueChanged = () => false;
  isExpired = () => false;
}

class MockTitleService {
  setTitle = () => {};
}

export default sandboxOf(WeatherComponent, {
  providers: [
    { provide: GeolocationService, useClass: MockGeolocationService },
    { provide: CacheService, useClass: MockCacheService },
    { provide: TitleService, useClass: MockTitleService },
  ],
})
  .add('default', {
    template: `<app-weather></app-weather>`
  });
