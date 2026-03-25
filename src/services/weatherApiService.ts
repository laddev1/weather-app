import axios from "axios";
import type { WeatherData } from "@/src/types";
import type { IWeatherService } from "./weatherService";
import { API_CONFIG } from "@/src/constants";

interface WeatherApiResponse {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

export class WeatherApiService implements IWeatherService {
  async fetchWeather(location: string): Promise<WeatherData> {
    const { data } = await axios.get<WeatherApiResponse>(
      `${API_CONFIG.weatherApi.baseUrl}/current.json`,
      {
        params: {
          key: API_CONFIG.weatherApi.apiKey,
          q: location,
        },
      },
    );

    return this.mapResponse(data);
  }

  private mapResponse(data: WeatherApiResponse): WeatherData {
    const { location, current } = data;
    const kphToMs = (kph: number) => Math.round((kph / 3.6) * 10) / 10;

    return {
      location: location.name,
      temperature: Math.round(current.temp_c),
      description: current.condition.text,
      humidity: current.humidity,
      windSpeed: kphToMs(current.wind_kph),
      feelsLike: Math.round(current.feelslike_c),
      icon: current.condition.icon,
    };
  }
}
