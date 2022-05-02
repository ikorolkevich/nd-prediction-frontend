export type CurrentSituation = {
  temp: number;
  humidity: number;
  wind_speed: number;
  pressure: number;
  days_without_rain: number;
  fire_probability: number;
};

export type WeatherData = {
  dt: Date;
  temp: number;
  humidity: number;
  wind_speed: number;
  pressure: number;
  dew_point: number;
};

export type DynamicPoint = {
  dt: Date;
  value: number;
};

export type WeatherState = {
  current_situation: CurrentSituation | null;
  weather_data: Array<WeatherData> | null;
  dynamic_data: Array<DynamicPoint> | null;
};
