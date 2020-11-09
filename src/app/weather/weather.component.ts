import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WeatherService } from './weather.service';

interface WxData {
  currently: {
    apparentTemperature: number;
    cloudCover: number;
    currently: string;
    humidity: number;
    icon: string;
    precipIntensity: number;
    precipProbability: number;
    precipType: string;
    pressure: number;
    summary: string;
    temperature: number;
    time: number;
    uvIndex: number;
    visibility: number;
    windBearing: number;
    windSpeed: number;
  };
  daily: {
    data: Array<{
      sunriseTime: number;
      sunsetTime: number;
      temperatureHigh: number;
      temperatureLow: number;
    }>;
  };
  hourly: {
    data: Array<{}>;
  };
  results: Array<{
    address_components: Array<{
      short_name: string;
    }>;
  }>;
}

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

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getLocation();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  wxEntry = () => {
    const newLocationName = prompt('Please enter a place.', '');
    this.locationName = newLocationName;
    this.isLoading = true;

    this.weatherService.getAddress(this.locationName)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        const lat = data.results[0].geometry.location.lat;
        const long = data.results[0].geometry.location.lng;
        const address = data.results[0].formatted_address;
        // TODO chain subscribes
        this.getWeather(`${lat},${long}`, address);
      });
  }

  getLocation = () => {
    if (navigator.geolocation) {
      this.isLoading = true;

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const latLong = `${pos.coords.latitude},${pos.coords.longitude}`;
          this.getWeather(latLong);
        },
        (err) => {
          console.warn(err);
          this.getWeather('35.2555507,-120.6849783');
        }, {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0
      });
    } else {
      alert('Could not determine your geolocation.');
    }
  }

  getWeather = (coords: string, locationName?: string) => {
    this.wxData = null;
    this.locationName = locationName;
    this.isLoading = true;

    this.weatherService.getWeather(coords)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: WxData) => {
        this.wxData = data;
        console.log(this.wxData); // remove
        this.sunrise = this.epochToDateTime(this.wxData.daily.data[0].sunriseTime);
        this.sunset = this.epochToDateTime(this.wxData.daily.data[0].sunsetTime);
        this.time = this.epochToDateTime(this.wxData.currently.time);

        if (!locationName) {
          // TODO how to chain subscribes?
          this.updateLocationName(coords);
        }
        this.isLoading = false;
      });
  }

  getHourTitle = (element: any, i: number) => {
    const dateTime = this.epochToDateTime(element.time);
    if (i === 0) {
      return 'Now';
    } else if (dateTime.getHours() === 0) {
      // for the first hour of a day, show the day name
      return '<strong>' + this.getDayName(dateTime.getDay()).substr(0, 3) + '</strong>';
    } else {
      return this.formatTime(dateTime.getHours());
    }
  }

  formatTime = (hour: number, minute?: number) => {
    let num: number;
    let ampm: string;
    const minuteFormatted = minute ? `:${minute}` : '';

    if (hour < 12) {
      num = hour === 0 ? 12 : hour;
      ampm = 'AM';
    } else {
      num = hour === 12 ? 12 : hour - 12;
      ampm = 'PM';
    }
    return `${num}:${minuteFormatted}<small>${ampm}</small>`;
  }

  getDayName = (day) => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[day];
  }

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
    if (isLoading) {
      return `Loading${locationName ? (' ' + locationName) : '' }...`;
    } else {
      return locationName || 'Unknown Location';
    }
  }

  epochToDateTime = (epoch: number) => new Date(epoch * 1000);

  private updateLocationName = (coords: string) => {
    this.weatherService.getLocationName(coords)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: WxData) => {
        this.locationName = data.results[0].address_components[1].short_name;
      });
  }
}
