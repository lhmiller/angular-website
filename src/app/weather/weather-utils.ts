export interface WxData {
  latitude: number;
  longitude: number;
  timezone: string;
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
    nearestStormDistance: number;
    nearestStormBearing: number;
    dewPoint: number;
    windGust: number;
    ozone: number;
  };
  minutely: {
    summary: string;
    icon: string;
    data: Array<{
      time: number;
      precipIntensity: number;
      precipProbability: number;
    }>;
  };
  hourly: {
    summary: string;
    icon: string;
    data: Array<{
      time: number;
      summary: string;
      icon: string;
      precipIntensity: number;
      precipProbability: number;
      precipType: string;
      temperature: number;
      apparentTemperature: number;
      dewPoint: number;
      humidity: number;
      pressure: number;
      windSpeed: number;
      windGust: number;
      windBearing: number;
      cloudCover: number;
      uvIndex: number;
      visibility: number;
      ozone: number;
    }>;
  };
  daily: {
    summary: string;
    icon: string;
    data: Array<{
      sunriseTime: number;
      sunsetTime: number;
      temperatureHigh: number;
      temperatureLow: number;
      time: number;
      summary: string;
      icon: string;
      moonPhase: number;
      precipIntensity: number;
      precipIntensityMax: number;
      precipIntensityMaxTime: number;
      precipProbability: number;
      precipType: string;
      temperatureHighTime: number;
      temperatureLowTime: number;
      apparentTemperatureHigh: number;
      apparentTemperatureHighTime: number;
      apparentTemperatureLow: number;
      apparentTemperatureLowTime: number;
      dewPoint: number;
      humidity: number;
      pressure: number;
      windSpeed: number;
      windGust: number;
      windGustTime: number;
      windBearing: number;
      cloudCover: number;
      uvIndex: number;
      uvIndexTime: number;
      visibility: number;
      ozone: number;
      temperatureMin: number;
      temperatureMinTime: number;
      temperatureMax: number;
      temperatureMaxTime: number;
      apparentTemperatureMin: number;
      apparentTemperatureMinTime: number;
      apparentTemperatureMax: number;
      apparentTemperatureMaxTime: number;
    }>;
  };
  flags: {
    sources: string[];
    'nearest-station': number;
    units: string;
  };
}

export interface GoogleMapsData {
  results: Array<{
    geometry: {
      location: {
        lat: number;
        lng: number;
      }
    }
    formatted_address: string;
    address_components: Array<{
      short_name: string;
    }>;
  }>;
}

export const epochToDateTime = (epoch: number) => new Date(epoch * 1000);
