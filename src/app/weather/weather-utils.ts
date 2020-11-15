export interface WxData {
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

export const epochToDateTime = (epoch: number) => new Date(epoch * 1000);
