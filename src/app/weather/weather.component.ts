import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { epochToDateTime, WxData } from './weather-utils';
import { GeolocationService } from './services/geolocation.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  locationDropdownOptions = [
    {
      text: 'Use Geolocation',
      coords: null,
    },
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
  locationName: string;
  isLoading: boolean;
  sunrise: Date;
  sunset: Date;
  time: Date;
  round = Math.round;
  private ngUnsubscribe = new Subject<void>();

  constructor(private geolocationService: GeolocationService) {}

  ngOnInit() {
    // TODO use cache service for weather data
    this.getLocation();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  wxEntry = () => {
    const newLocationName = prompt('Please enter a place.', '');
    if (!newLocationName) {
      return;
    }

    this.locationName = newLocationName;
    this.isLoading = true;

    this.geolocationService.getAddress(this.locationName)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(({ lat, long, address }) => {
        this.getWeather(`${lat},${long}`, address);
      });
  }

  getLocation = () => {
    this.geolocationService.getCurrentPosition()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((latLong: string) => {
        this.getWeather(latLong);
      });
  }

  getWeather = (coords: string, locationName?: string) => {
    this.locationName = locationName;
    this.isLoading = true;

    this.geolocationService.getWeather(coords)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(({ data, sunrise, sunset, time }) => {
        this.wxData = data;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.time = time;

        if (!locationName) {
          this.updateLocationName(coords);
        }
        this.isLoading = false;
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

  getLoadingMessage = () => {
    const { locationName, isLoading } = this;
    if (isLoading || !locationName) {
      return `Loading${locationName ? (' ' + locationName) : '' }...`;
    } else {
      return locationName;
    }
  }

  private updateLocationName = (coords: string) => {
    this.geolocationService.getLocationName(coords)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((locationName: string) => {
        this.locationName = locationName;
      });
  }

  private getDayName = (day: number) => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[day];
  }
}
