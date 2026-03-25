import { useCallback, useState } from "react";
import { useWeatherStore } from "@/src/store";
import { useSavedCitiesStore } from "@/src/store";
import { useWeatherService } from "./useWeatherService";
import { useTheme } from "./useTheme";
import { useGeolocation } from "./useGeolocation";
import { validateLocation } from "@/src/utils";
import type { WeatherData, ServiceType } from "@/src/types";
import type { WeatherTheme } from "@/src/theme";

interface UseWeatherReturn {
  location: string;
  weather: WeatherData | null;
  isLoading: boolean;
  apiError: string | null;
  validationError: string | null;
  selectedService: ServiceType;
  theme: WeatherTheme;
  serviceName: string;
  isLocating: boolean;
  locationError: string | null;
  isCitySaved: boolean;
  setLocation: (location: string) => void;
  handleSearch: () => Promise<void>;
  handleToggleService: () => Promise<void>;
  handleDetectLocation: () => Promise<void>;
  handleSaveCity: () => Promise<void>;
  handleSelectSavedCity: (city: string) => Promise<void>;
}

const SERVICE_TOGGLE_MAP: Record<ServiceType, ServiceType> = {
  openWeather: "weatherApi",
  weatherApi: "openWeather",
};

export function useWeather(): UseWeatherReturn {
  const {
    location,
    weather,
    isLoading,
    error: apiError,
    selectedService,
    setLocation: storeSetLocation,
    setError,
    toggleService,
  } = useWeatherStore();

  const { toggleCity, isCitySaved: checkSaved } = useSavedCitiesStore();
  const { fetchWeatherForService } = useWeatherService();
  const { theme, serviceName } = useTheme();
  const { isLocating, locationError, clearLocationError, detectCity } =
    useGeolocation();
  const [validationError, setValidationError] = useState<string | null>(null);

  const currentCitySaved = weather ? checkSaved(weather.location) : false;

  const setLocation = useCallback(
    (value: string) => {
      storeSetLocation(value);
      if (validationError) setValidationError(null);
      if (apiError) setError(null);
      clearLocationError();
    },
    [storeSetLocation, validationError, apiError, setError, clearLocationError],
  );

  const handleSearch = useCallback(async () => {
    const { isValid, error: locationError } = validateLocation(location);

    if (!isValid) {
      setValidationError(locationError);
      return;
    }

    setValidationError(null);
    await fetchWeatherForService(location.trim(), selectedService);
  }, [location, selectedService, fetchWeatherForService]);

  const handleToggleService = useCallback(async () => {
    const nextService = SERVICE_TOGGLE_MAP[selectedService];
    toggleService();

    const trimmed = location.trim();
    if (!trimmed) return;

    const { isValid } = validateLocation(location);
    if (!isValid) return;

    setValidationError(null);
    await fetchWeatherForService(trimmed, nextService);
  }, [location, selectedService, toggleService, fetchWeatherForService]);

  const handleDetectLocation = useCallback(async () => {
    const city = await detectCity();
    if (!city) return;

    storeSetLocation(city);
    setValidationError(null);
    setError(null);
    await fetchWeatherForService(city, selectedService);
  }, [
    detectCity,
    storeSetLocation,
    setError,
    selectedService,
    fetchWeatherForService,
  ]);

  const handleSaveCity = useCallback(async () => {
    if (!weather) return;
    await toggleCity(weather.location);
  }, [weather, toggleCity]);

  const handleSelectSavedCity = useCallback(
    async (city: string) => {
      storeSetLocation(city);
      clearLocationError();
      const trimmed = city.trim();
      const { isValid, error: locationValidationError } =
        validateLocation(trimmed);

      if (!isValid) {
        setValidationError(locationValidationError);
        return;
      }

      setValidationError(null);
      setError(null);
      await fetchWeatherForService(trimmed, selectedService);
    },
    [
      storeSetLocation,
      clearLocationError,
      fetchWeatherForService,
      selectedService,
      setError,
    ],
  );

  return {
    location,
    weather,
    isLoading,
    apiError,
    validationError,
    selectedService,
    theme,
    serviceName,
    isLocating,
    locationError,
    isCitySaved: currentCitySaved,
    setLocation,
    handleSearch,
    handleToggleService,
    handleDetectLocation,
    handleSaveCity,
    handleSelectSavedCity,
  };
}
