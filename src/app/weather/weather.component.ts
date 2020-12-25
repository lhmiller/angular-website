import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { epochToDateTime, WxData } from './weather-utils';
import { GeolocationService } from './services/geolocation.service';
import { TitleService } from '../shared/title.service';
import { CacheService } from '../shared/cache.service';

const WEATHER_DATA_KEY = 'WEATHER_DATA';
const WEATHER_DATA_TTL_MS = 2 * 60 * 1000; // 2 mins
const LOCATION_DATA_KEY = 'LOCATION_DATA';
const LOCATION_DATA_TTL_MS = 5 * 60 * 1000; // 5 mins

interface CachedLocationData {
  coords: string;
  name: string;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  locationDropdownOptions = [
    {
      text: 'Lima',
      coords: '35.2555507,-120.6849783',
    },
    {
      text: 'Poly',
      coords: '35.298539,-120.664545',
    },
    {
      text: 'Oak',
      coords: '35.416493,-120.609561',
    },
  ];
  wxData: WxData;
  locationName = '';
  isLoading = false;
  sunrise: Date;
  sunset: Date;
  time: Date;
  round = Math.round;
  private ngUnsubscribe = new Subject<void>();

  constructor(private geolocationService: GeolocationService,
              private cacheService: CacheService<WxData|CachedLocationData>,
              private titleService: TitleService) {}

  ngOnInit() {
    // while getting the current position (to see if it has changed), load any cached weather data
    this.checkForNewLocation();
    this.loadCachedWeatherDataIfExists();
    this.titleService.setTitle('Weather');
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  checkForNewLocation = (forceUpdate = false) => {
    if (forceUpdate) {
      this.locationName = '';
    }

    this.geolocationService.getCurrentPosition()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((coords: string) => {
        const valueChanged = (oldValue: CachedLocationData) =>
          !oldValue || !this.fuzzyMatchCoords(coords, oldValue.coords);
        if (this.cacheService.valueChanged(LOCATION_DATA_KEY, valueChanged)
            || this.cacheService.isExpired(LOCATION_DATA_KEY)
            || forceUpdate) {
          // new location - save coords & get weather
          this.checkForNewWeatherData(coords, this.locationName, true);
          const cacheEntry: CachedLocationData = {
            coords,
            name: this.locationName,
          };
          this.cacheService.set(LOCATION_DATA_KEY, cacheEntry, LOCATION_DATA_TTL_MS);
          this.isLoading = true;
          // update location name since coords have changed
          this.updateLocationName(coords);
        } else {
          // same location - move on to checking cached weather data
          const cachedData = this.cacheService.get(LOCATION_DATA_KEY) as CachedLocationData;
          this.checkForNewWeatherData(cachedData.coords, cachedData.name);
        }
      });
  }

  checkForNewWeatherData = (coords: string, locationName: string, forceUpdate = false) => {
    if (!coords) {
      this.checkForNewLocation();
      return;
    } else {
      this.setLocationName(locationName);
    }

    if (this.cacheService.isExpired(WEATHER_DATA_KEY) || forceUpdate) {
      this.isLoading = true;

      // cached value expired, fetch & save new weather data
      this.geolocationService.getWeather(coords)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data) => {
          this.setWeatherData(data);
          this.cacheService.set(WEATHER_DATA_KEY, data, WEATHER_DATA_TTL_MS);
          this.isLoading = false;
        });
    } else {
      // else (weather data not expired) use stored value
      this.setWeatherData(this.cacheService.get(WEATHER_DATA_KEY) as WxData);
      this.setLocationName(locationName);
      this.updateLocationName(coords);
    }
  }

  wxEntry = () => {
    const newLocationName = prompt('Please enter a place.', '');
    if (!newLocationName) {
      return;
    }

    this.setLocationName(newLocationName);
    this.isLoading = true;

    this.geolocationService.getAddress(this.locationName)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(({ lat, long, address }) => {
        this.checkForNewWeatherData(`${lat},${long}`, address, true);
      });
  }

  getHourTitle = (element: any, i: number) => {
    const dateTime = epochToDateTime(element.time);
    let isBold = false;
    let showAmPm = true;
    let hourFormatted = '';
    if (i === 0) {
      hourFormatted = 'Now';
      showAmPm = false;
    } else if (dateTime.getHours() === 0) {
      // for the first hour of a day, show the day name (in bold)
      isBold = true;
      showAmPm = false;
      hourFormatted = this.getDayName(dateTime.getDay()).substr(0, 3);
    }

    const formatted = this.formatTime(dateTime.getHours());
    Object.assign(formatted.$implicit, { isBold, showAmPm });
    if (hourFormatted) {
      Object.assign(formatted.$implicit, { formattedTime: hourFormatted });
    }
    return formatted;
  }

  formatTime = (hour: number, minute?: number) => {
    let hourFormatted: number;
    let ampm: string;
    const minuteFormatted = typeof minute === 'number'
      ? ':' + `0${minute}`.substr(-2)
      : '';

    if (hour < 12) {
      hourFormatted = hour === 0 ? 12 : hour;
      ampm = 'AM';
    } else {
      hourFormatted = hour === 12 ? 12 : hour - 12;
      ampm = 'PM';
    }
    // need this format for ngTemplate outlets
    return {
      $implicit: {
        formattedTime: `${hourFormatted}${minuteFormatted}`,
        ampm,
      }
    };
  }

  getDayNameFromEpoch = (epoch: number) => this.getDayName(epochToDateTime(epoch).getDay());

  windDirection = (bearing: number) => {
    switch (Math.round(bearing / 22.5)) {
      case 0:
        return 'N';
      case 1:
        return 'NNE';
      case 2:
        return 'NE';
      case 3:
        return 'ENE';
      case 4:
        return 'E';
      case 5:
        return 'ESE';
      case 6:
        return 'SE';
      case 7:
        return 'SSE';
      case 8:
        return 'S';
      case 9:
        return 'SSW';
      case 10:
        return 'SW';
      case 11:
        return 'WSW';
      case 12:
        return 'W';
      case 13:
        return 'WNW';
      case 14:
        return 'NW';
      case 15:
        return 'NNW';
      case 16:
        return 'N';
      default:
        return '';
    }
  }

  getLocationName = () => {
    const { locationName, isLoading } = this;
    if (!locationName) {
      return 'Getting Location...';
    } else if (isLoading) {
      return `Loading ${locationName}...`;
    } else {
      return locationName;
    }
  }

  private setWeatherData = (data: WxData) => {
    if (data) {
      this.wxData = data;
      this.sunrise = epochToDateTime(data.daily.data[0].sunriseTime);
      this.sunset = epochToDateTime(data.daily.data[0].sunsetTime);
      this.time = epochToDateTime(data.currently.time);
    }
  }

  private setLocationName = (locationName: string) => {
    this.locationName = locationName;
  }

  private loadCachedWeatherDataIfExists = () => {
    const weatherData = this.cacheService.get(WEATHER_DATA_KEY) as WxData;
    const locationData = this.cacheService.get(LOCATION_DATA_KEY) as CachedLocationData;
    if (weatherData && locationData) {
      this.setWeatherData(weatherData);
      this.setLocationName(locationData.name);
    }
  }

  private fuzzyMatchCoords = (coords1: string, coords2: string) => {
    const coordsRegex = /^(-?\d+\.\d+),(-?\d+\.\d+)$/;
    const match1 = coords1.match(coordsRegex);
    const lat1 = parseInt(match1[1], 10);
    const long1 = parseInt(match1[2], 10);
    const match2 = coords2.match(coordsRegex);
    const lat2 = parseInt(match2[1], 10);
    const long2 = parseInt(match2[2], 10);
    const latDelta = Math.abs(lat1 - lat2);
    const longDelta = Math.abs(long1 - long2);
    const MAX_ALLOWED_DELTA = 0.001;
    return latDelta <= MAX_ALLOWED_DELTA && longDelta <= MAX_ALLOWED_DELTA;
  }

  private updateLocationName = (coords: string) => {
    this.geolocationService.getLocationName(coords)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((locationName: string) => {
        this.setLocationName(locationName);

        const cachedLocationData = this.cacheService.get(LOCATION_DATA_KEY) as CachedLocationData;
        const cacheEntry = Object.assign({}, cachedLocationData, { name: locationName });
        this.cacheService.set(LOCATION_DATA_KEY, cacheEntry, LOCATION_DATA_TTL_MS);
      });
  }

  private getDayName = (day: number) => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[day];
  }
}
