export type CurrentSituation = {
  date: string
  days_from_last_rain: number
  dew_point: number
  humidity: number
  id: number
  pressure: number
  rainfall_24h: number
  temp: number
  value: number
  wind_speed: number
};

export type WeatherData = {
  dt: Date;
  temp: number;
  humidity: number;
  wind_speed: number;
  pressure: number;
  dew_point: number;
};

// export type DynamicPoint = {
//   date: Date;
//   value: number;
// };

export type WeatherState = {
  current_situation: CurrentSituation | null;
  weather_data: Array<WeatherData> | null;
  dynamic_data: Array<CurrentSituation> | null;
};
