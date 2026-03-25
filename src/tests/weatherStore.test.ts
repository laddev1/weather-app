import { useWeatherStore } from "@/src/store/weatherStore";
import type { WeatherData } from "@/src/types";

const MOCK_WEATHER: WeatherData = {
  location: "London",
  temperature: 15,
  description: "Cloudy",
  humidity: 72,
  windSpeed: 5.4,
  feelsLike: 13,
  icon: "04d",
};

describe("weatherStore", () => {
  beforeEach(() => {
    useWeatherStore.getState().reset();
  });

  describe("initial state", () => {
    it("has empty location", () => {
      expect(useWeatherStore.getState().location).toBe("");
    });

    it("has null weather", () => {
      expect(useWeatherStore.getState().weather).toBeNull();
    });

    it("has loading false", () => {
      expect(useWeatherStore.getState().isLoading).toBe(false);
    });

    it("has null error", () => {
      expect(useWeatherStore.getState().error).toBeNull();
    });

    it("defaults to openWeather service", () => {
      expect(useWeatherStore.getState().selectedService).toBe("openWeather");
    });
  });

  describe("setLocation", () => {
    it("updates location", () => {
      useWeatherStore.getState().setLocation("Paris");
      expect(useWeatherStore.getState().location).toBe("Paris");
    });
  });

  describe("setWeather", () => {
    it("sets weather data", () => {
      useWeatherStore.getState().setWeather(MOCK_WEATHER);
      expect(useWeatherStore.getState().weather).toEqual(MOCK_WEATHER);
    });

    it("clears weather when set to null", () => {
      useWeatherStore.getState().setWeather(MOCK_WEATHER);
      useWeatherStore.getState().setWeather(null);
      expect(useWeatherStore.getState().weather).toBeNull();
    });
  });

  describe("setLoading", () => {
    it("sets loading to true", () => {
      useWeatherStore.getState().setLoading(true);
      expect(useWeatherStore.getState().isLoading).toBe(true);
    });

    it("sets loading to false", () => {
      useWeatherStore.getState().setLoading(true);
      useWeatherStore.getState().setLoading(false);
      expect(useWeatherStore.getState().isLoading).toBe(false);
    });
  });

  describe("setError", () => {
    it("sets error message", () => {
      useWeatherStore.getState().setError("Something went wrong");
      expect(useWeatherStore.getState().error).toBe("Something went wrong");
    });

    it("clears error when set to null", () => {
      useWeatherStore.getState().setError("Error");
      useWeatherStore.getState().setError(null);
      expect(useWeatherStore.getState().error).toBeNull();
    });
  });

  describe("toggleService", () => {
    it("toggles from openWeather to weatherApi", () => {
      useWeatherStore.getState().toggleService();
      expect(useWeatherStore.getState().selectedService).toBe("weatherApi");
    });

    it("toggles from weatherApi back to openWeather", () => {
      useWeatherStore.getState().toggleService();
      useWeatherStore.getState().toggleService();
      expect(useWeatherStore.getState().selectedService).toBe("openWeather");
    });
  });

  describe("reset", () => {
    it("restores all state to initial values", () => {
      useWeatherStore.getState().setLocation("Tokyo");
      useWeatherStore.getState().setWeather(MOCK_WEATHER);
      useWeatherStore.getState().setLoading(true);
      useWeatherStore.getState().setError("Error");
      useWeatherStore.getState().toggleService();

      useWeatherStore.getState().reset();

      const state = useWeatherStore.getState();
      expect(state.location).toBe("");
      expect(state.weather).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.selectedService).toBe("openWeather");
    });
  });
});
