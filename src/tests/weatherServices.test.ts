import axios from "axios";
import { OpenWeatherService } from "@/src/services/openWeatherService";
import { WeatherApiService } from "@/src/services/weatherApiService";
import { createWeatherService } from "@/src/services/weatherServiceFactory";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const OPEN_WEATHER_RESPONSE = {
  data: {
    name: "London",
    main: {
      temp: 15.3,
      feels_like: 13.1,
      humidity: 72,
    },
    weather: [
      {
        description: "overcast clouds",
        icon: "04d",
      },
    ],
    wind: {
      speed: 5.4,
    },
  },
};

const WEATHER_API_RESPONSE = {
  data: {
    location: {
      name: "London",
    },
    current: {
      temp_c: 15.3,
      feelslike_c: 13.1,
      humidity: 72,
      wind_kph: 19.4,
      condition: {
        text: "Overcast",
        icon: "//cdn.weatherapi.com/weather/64x64/day/122.png",
      },
    },
  },
};

describe("OpenWeatherService", () => {
  const service = new OpenWeatherService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and maps weather data correctly", async () => {
    mockedAxios.get.mockResolvedValueOnce(OPEN_WEATHER_RESPONSE);

    const result = await service.fetchWeather("London");

    expect(result.location).toBe("London");
    expect(result.temperature).toBe(15);
    expect(result.description).toBe("overcast clouds");
    expect(result.humidity).toBe(72);
    expect(result.windSpeed).toBe(5.4);
    expect(result.feelsLike).toBe(13);
    expect(result.icon).toBe("04d");
  });

  it("calls axios with correct parameters", async () => {
    mockedAxios.get.mockResolvedValueOnce(OPEN_WEATHER_RESPONSE);

    await service.fetchWeather("London");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/weather"),
      expect.objectContaining({
        params: expect.objectContaining({
          q: "London",
          units: "metric",
        }),
      }),
    );
  });

  it("throws when API call fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    await expect(service.fetchWeather("London")).rejects.toThrow(
      "Network Error",
    );
  });
});

describe("WeatherApiService", () => {
  const service = new WeatherApiService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and maps weather data correctly", async () => {
    mockedAxios.get.mockResolvedValueOnce(WEATHER_API_RESPONSE);

    const result = await service.fetchWeather("London");

    expect(result.location).toBe("London");
    expect(result.temperature).toBe(15);
    expect(result.description).toBe("Overcast");
    expect(result.humidity).toBe(72);
    expect(result.windSpeed).toBe(5.4);
    expect(result.feelsLike).toBe(13);
    expect(result.icon).toBe("//cdn.weatherapi.com/weather/64x64/day/122.png");
  });

  it("converts wind speed from kph to m/s", async () => {
    mockedAxios.get.mockResolvedValueOnce(WEATHER_API_RESPONSE);

    const result = await service.fetchWeather("London");

    expect(result.windSpeed).toBeCloseTo(5.4, 1);
  });

  it("calls axios with correct parameters", async () => {
    mockedAxios.get.mockResolvedValueOnce(WEATHER_API_RESPONSE);

    await service.fetchWeather("London");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/current.json"),
      expect.objectContaining({
        params: expect.objectContaining({
          q: "London",
        }),
      }),
    );
  });

  it("throws when API call fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

    await expect(service.fetchWeather("London")).rejects.toThrow("API Error");
  });
});

describe("createWeatherService", () => {
  it("returns OpenWeatherService for openWeather type", () => {
    const service = createWeatherService("openWeather");
    expect(service).toBeInstanceOf(OpenWeatherService);
  });

  it("returns WeatherApiService for weatherApi type", () => {
    const service = createWeatherService("weatherApi");
    expect(service).toBeInstanceOf(WeatherApiService);
  });
});
