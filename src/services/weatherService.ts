import type { WeatherData } from "@/src/types";

export interface IWeatherService {
  fetchWeather(location: string): Promise<WeatherData>;
}
