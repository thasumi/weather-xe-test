export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  localtime: string;
}

export interface WeatherCurrent {
  temp_c: number;
  feelslike_c: number;
  humidity: number;
  wind_kph: number;
  condition: WeatherCondition;

}

export interface WeatherHour {
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
}

export interface WeatherDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: WeatherCondition;
  };
}

export interface WeatherForecastResponse {
  location: WeatherLocation;
  current: WeatherCurrent;
  forecast: {
    forecastday: Array<{
      date: string;
      day: WeatherDay["day"];
      hour: WeatherHour[];
    }>;
  };
}

export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export type CitySuggestion = {
  id: number;
  name: string;
  region: string;
  country: string;
};