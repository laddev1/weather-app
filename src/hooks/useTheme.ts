import { useWeatherStore } from "@/src/store";
import { getThemeForService } from "@/src/theme";
import type { WeatherTheme } from "@/src/theme";

interface UseThemeReturn {
  theme: WeatherTheme;
  serviceName: string;
}

export function useTheme(): UseThemeReturn {
  const { selectedService } = useWeatherStore();
  const theme = getThemeForService(selectedService);

  return {
    theme,
    serviceName: theme.name,
  };
}
