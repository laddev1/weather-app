import { useCallback } from "react";
import { useWeatherStore } from "@/src/store";
import { createWeatherService } from "@/src/services";
import type { WeatherData } from "@/src/types";
import type { ServiceType } from "@/src/types";

interface UseWeatherServiceReturn {
  fetchWeatherForService: (
    location: string,
    service: ServiceType,
  ) => Promise<WeatherData | null>;
}

export function useWeatherService(): UseWeatherServiceReturn {
  const { setLoading, setError, setWeather } = useWeatherStore();

  const fetchWeatherForService = useCallback(
    async (
      location: string,
      service: ServiceType,
    ): Promise<WeatherData | null> => {
      setLoading(true);
      setError(null);

      try {
        const weatherService = createWeatherService(service);
        const data = await weatherService.fetchWeather(location);
        setWeather(data);
        return data;
      } catch {
        setError("Failed to fetch weather. Please check the city name.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setWeather],
  );

  return { fetchWeatherForService };
}
