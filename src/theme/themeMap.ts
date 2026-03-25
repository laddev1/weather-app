import type { ServiceType } from "@/src/types";
import type { WeatherTheme } from "./weatherTheme";
import { openWeatherTheme, weatherApiTheme } from "./weatherTheme";

const THEME_MAP: Record<ServiceType, WeatherTheme> = {
  openWeather: openWeatherTheme,
  weatherApi: weatherApiTheme,
};

export function getThemeForService(service: ServiceType): WeatherTheme {
  return THEME_MAP[service];
}
