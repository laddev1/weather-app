export const API_CONFIG = {
  openWeather: {
    baseUrl: "https://api.openweathermap.org/data/2.5",
    apiKey: process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY ?? "",
  },
  weatherApi: {
    baseUrl: "https://api.weatherapi.com/v1",
    apiKey: process.env.EXPO_PUBLIC_WEATHERAPI_API_KEY ?? "",
  },
} as const;
