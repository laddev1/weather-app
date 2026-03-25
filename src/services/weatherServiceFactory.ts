import type { ServiceType } from "@/src/types";
import type { IWeatherService } from "./weatherService";
import { OpenWeatherService } from "./openWeatherService";
import { WeatherApiService } from "./weatherApiService";

const SERVICE_MAP: Record<ServiceType, () => IWeatherService> = {
  openWeather: () => new OpenWeatherService(),
  weatherApi: () => new WeatherApiService(),
};

export function createWeatherService(
  serviceType: ServiceType,
): IWeatherService {
  const factory = SERVICE_MAP[serviceType];
  return factory();
}
