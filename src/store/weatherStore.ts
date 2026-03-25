import { create } from "zustand";
import type { WeatherData, ServiceType } from "@/src/types";

interface WeatherState {
  location: string;
  weather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  selectedService: ServiceType;
}

interface WeatherActions {
  setLocation: (location: string) => void;
  setWeather: (weather: WeatherData | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  toggleService: () => void;
  reset: () => void;
}

export type WeatherStore = WeatherState & WeatherActions;

const INITIAL_STATE: WeatherState = {
  location: "",
  weather: null,
  isLoading: false,
  error: null,
  selectedService: "openWeather",
};

const SERVICE_TOGGLE_MAP: Record<ServiceType, ServiceType> = {
  openWeather: "weatherApi",
  weatherApi: "openWeather",
};

export const useWeatherStore = create<WeatherStore>((set, get) => ({
  ...INITIAL_STATE,

  setLocation: (location) => set({ location }),

  setWeather: (weather) => set({ weather }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  toggleService: () => {
    const { selectedService } = get();
    set({ selectedService: SERVICE_TOGGLE_MAP[selectedService] });
  },

  reset: () => set(INITIAL_STATE),
}));
