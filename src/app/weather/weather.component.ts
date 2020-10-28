import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

// TODO replace all fetch() with http client

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// TODO remove jquery
const $ = (...args: any[]) => ({} as any);

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getLocation();
  }

  wxEntry = () => {
    const locationName = prompt('Please enter a place.', '');
    $('#locationName').html(`Loading&nbsp;${locationName}...`);
    const loc = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=AIzaSyD14VN2PWMa-wzExV0g6dn1YBCnqecO_uw`;
    fetch(loc, { method: 'get' })
      .then(response => response.json())
      .then(jsonData => {
        const lat = jsonData.results[0].geometry.location.lat;
        const long = jsonData.results[0].geometry.location.lng;
        const address = jsonData.results[0].formatted_address;
        this.getWeather(`${lat},${long}`, address);
      })
      .catch(err => { /* error block */ });
  }

  private getLocation = () => {
    if (navigator.geolocation) {
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
    }
  }

  private getWeather = (coordinates, locationName?) => {
    // update location name message
    if (locationName) {
      $('#locationName').html(`Loading&nbsp;${locationName}...`);
    } else {
      $('#locationName').html('Loading...');
    }

    // clear weather info
    $('#weather').empty();

    // fetch new weather data
    const baseUrl = 'https://linode.lucashmiller.com:7443/https://api.darksky.net/forecast/3a62fe93bd0d5aeb142409a6a07a1e0d/';
    fetch(baseUrl + coordinates, { method: 'get' })
      .then(response => response.json())
      .then(jsonData => {
        if (locationName) {
          this.printWeather(jsonData, locationName);
        } else {
          this.getLocationName(jsonData, coordinates);
        }
      })
      .catch(err => {
          console.warn(err);
          // TODO log initial response?
          // console.log(response);
      });
  }

  private getLocationName = (wxData, coordinates) => {
    // tslint:disable-next-line:max-line-length
    const loc = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates}&result_type=postal_code&key=AIzaSyD14VN2PWMa-wzExV0g6dn1YBCnqecO_uw`;
    fetch(loc, { method: 'get' })
      .then(response => response.json())
      .then(jsonData => {
        const locationName = jsonData.results[0].address_components[1].short_name;
        this.printWeather(wxData, locationName);
      })
      // TODO remove empty error block?
      .catch(err => { /* error block */ });
  }

  private printWeather = (wxData, locationName) => {
    $('#weather').empty();
    $(`<br>`).appendTo('#weather');
    // tslint:disable:max-line-length
    $(`<h1><img src='icons/${wxData.currently.icon}.png' width='88'></img><span id='temp'>${Math.round(wxData.currently.temperature)}&deg;</span></h1>`).appendTo('#weather');
    // tslint:enable:max-line-length
    $(`<h5>${wxData.currently.summary}</h5>`).appendTo('#weather');
    $(`<h3 class='text-center' id='locationName' onclick='wxEntry();'>${locationName}</h3>`).appendTo('#weather');

    // tslint:disable:max-line-length
    $(`<div id='today' class='d-flex'>
    <div class='p-2 align-self-center'><h4>$this.{getDayName(this.epochToDateTime(wxData.currently.time).getDay())} <small><small><small>TODAY</small></small></small></div>
    <div class='ml-auto p-2 align-self-center'><h4>${Math.round(wxData.daily.data[0].temperatureHigh)}&deg;</div>
    <div class='p-2 align-self-center'><h4 class='text-muted'>${Math.round(wxData.daily.data[0].temperatureLow)}&deg;</div>
    </div>`).appendTo('#weather');
    // tslint:enable:max-line-length

    $('<h5>Next 48 Hours</h5>').appendTo('#weather');
    $(`<div class='table-responsive pageCenter'><table class='table pageCenter'><tbody id='tbHourlyHorizontal'><tr>`).appendTo('#weather');
    // TODO could this be a boolean? (isFirstHour?)
    let hourlyNum = 0;
    wxData.hourly.data.forEach(element => {
      const dateTime = this.epochToDateTime(element.time);
      let hourTitle = '';
      if (hourlyNum === 0) {
          hourTitle = 'Now';
      } else if (dateTime.getHours() === 0) {
          hourTitle = '<strong>' + this.getDayName(dateTime.getDay()).substr(0, 3) + '</strong>';
      } else {
          hourTitle = this.formatTime(dateTime.getHours());
      }
      $(`<td><big>
      <div>${hourTitle}</div>
      <div><img src='icons/${element.icon}.png' height='24'></img></div>
      <div>${Math.round(element.temperature)}&deg;</div>
      <div>${Math.round(element.precipProbability * 100)}<small>&percnt;</small></div>
      <div>${Math.round(element.windSpeed)}<small>MPH</small></div>
      </big></td>`).appendTo('#tbHourlyHorizontal');
      hourlyNum++;
    });
    $(`<br>`).appendTo('#weather');

    $(`<div><table class='table table-sm pageCenter table-borderless'><tbody id='tbDaily'>`).appendTo('#weather');
    wxData.daily.data.forEach(element => {
      const dateTime = this.epochToDateTime(element.time);
      $(`<tr>
      <td class='h5'>${weekdays[dateTime.getDay()]}</td>
      <td><img src='icons/${element.icon}.png' height='28'></img></td>
      <td class='h5'>${Math.round(element.precipProbability * 10) * 10}<small>&percnt;</small></td>
      <td class='h5'>${Math.round(element.temperatureHigh)}&deg;</td>
      <td class='h5 text-muted'>${Math.round(element.temperatureLow)}&deg;</td>
      </tr>`).appendTo('#tbDaily');
    });
    $(`<br>`).appendTo('#weather');

    $(`<div><table class='table table-sm pageCenter'><tbody id='tbCurrentlyData'>`).appendTo('#weather');
    const sunrise = this.epochToDateTime(wxData.daily.data[0].sunriseTime);
    const sunset = this.epochToDateTime(wxData.daily.data[0].sunsetTime);
    const time = this.epochToDateTime(wxData.currently.time);
    // tslint:disable:max-line-length
    $(`<tr>
    <td><div class='text-muted text-uppercase'>sunrise</div><div><h4>${this.formatTime(sunrise.getHours(), sunrise.getMinutes())}</h4></div></td>
    <td><div class='text-muted text-uppercase'>sunset</div><div><h4>${this.formatTime(sunset.getHours(), sunset.getMinutes())}</h4></div></td></tr>
    <tr><td><div class='text-muted text-uppercase'>chance of ${wxData.currently.precipType ? wxData.currently.precipType : 'rain'}</div><div><h4>${Math.round(wxData.currently.precipProbability * 100)}<small>&percnt;</small></h4></div></td>
    <td><div class='text-muted text-uppercase'>humidity</div><div><h4>${Math.round(wxData.currently.humidity * 100)}<small>&percnt;</small></h4></div></td></tr>
    <tr><td><div class='text-muted text-uppercase'>wind</div><div><h4><small>${this.windDirection(wxData.currently.windBearing)}</small>&nbsp;${Math.round(wxData.currently.windSpeed)}&nbsp;mph</h4></div></td>
    <td><div class='text-muted text-uppercase'>feels like</div><div><h4>${Math.round(wxData.currently.apparentTemperature)}&deg;</h4></div></td></tr>
    <tr><td><div class='text-muted text-uppercase'>precipitation</div><div><h4>${Math.round(wxData.currently.precipIntensity)}&nbsp;in</h4></div></td>
    <td><div class='text-muted text-uppercase'>pressure</div><div><h4>${Math.round((wxData.currently.pressure / 33.863886666667) * 100) / 100}&nbsp;inHg</h4></div></td></tr>
    <tr><td><div class='text-muted text-uppercase'>visibility</div><div><h4>${Math.round(wxData.currently.visibility)}&nbsp;mi</h4></div></td>
    <td><div class='text-muted text-uppercase'>uv index</div><div><h4>${wxData.currently.uvIndex}</h4></div></td></tr>
    <tr><td><div class='text-muted text-uppercase'>cloud cover</div><div><h4>${Math.round(wxData.currently.cloudCover)}<small>&percnt;</small></h4></div></td>
    <td><div class='text-muted text-uppercase'>time</div><div><h4>${this.formatTime(time.getHours(), time.getMinutes())}</h4></div></td></tr>
    `).appendTo('#tbCurrentlyData');

    $(`<br>`).appendTo('#weather');
    $(`<div class='btn-group'>
    <button class='btn btn-warning btn-sm' type='button' onclick='wxEntry();'>Change Location</button>
    <button type='button' class='btn btn-sm btn-warning dropdown-toggle dropdown-toggle-split' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
    <span class='sr-only'>Toggle Dropdown</span>
    </button>
    <div class='dropdown-menu'>
    <a class='dropdown-item' onclick='getLocation();'>Use Geolocation</a>
    <a class='dropdown-item' onclick='getWeather('35.2555507,-120.6849783');'>Lima</a>
    <a class='dropdown-item' onclick='getWeather('35.298539,-120.664545')'>Poly</a>
    <a class='dropdown-item' onclick='getWeather('35.416493,-120.609561')'>Oak</a>
    </div>
    </div>
    <br>`).appendTo('#weather');
    // tslint:enable:max-line-length
    $(`<br>`).appendTo('#weather');
  }

  private formatTime = (hour, minute?) => {
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

  private epochToDateTime = (epoch: number) => new Date(epoch * 1000);
  private getDayName = (day) => weekdays[day];

  private windDirection = (bearing: number) => {
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
}
