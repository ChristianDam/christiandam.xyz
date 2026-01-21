export interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  timezone: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  isNight: boolean;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  location: string;
  isNight: boolean;
  hourlyForecast?: HourlyForecast[];
}