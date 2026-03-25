import axios from "axios";
import type { WeatherData } from "@/src/types";
import type { IWeatherService } from "./weatherService";
import { API_CONFIG } from "@/src/constants";

interface OpenWeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export class OpenWeatherService implements IWeatherService {
  async fetchWeather(location: string): Promise<WeatherData> {
    const { data } = await axios.get<OpenWeatherResponse>(
      `${API_CONFIG.openWeather.baseUrl}/weather`,
      {
        params: {
          q: location,
          appid: API_CONFIG.openWeather.apiKey,
          units: "metric",
        },
      },
    );

    return this.mapResponse(data);
  }

  private mapResponse(data: OpenWeatherResponse): WeatherData {
    const { name, main, weather, wind } = data;
    const [weatherInfo] = weather;

    return {
      location: name,
      temperature: Math.round(main.temp),
      description: weatherInfo?.description ?? "N/A",
      humidity: main.humidity,
      windSpeed: wind.speed,
      feelsLike: Math.round(main.feels_like),
      icon: weatherInfo?.icon ?? "01d",
    };
  }
}
