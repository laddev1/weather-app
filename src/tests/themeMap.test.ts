import { getThemeForService } from "@/src/theme/themeMap";
import { openWeatherTheme, weatherApiTheme } from "@/src/theme/weatherTheme";

describe("getThemeForService", () => {
  it("returns openWeatherTheme for openWeather service", () => {
    const theme = getThemeForService("openWeather");
    expect(theme).toBe(openWeatherTheme);
  });

  it("returns weatherApiTheme for weatherApi service", () => {
    const theme = getThemeForService("weatherApi");
    expect(theme).toBe(weatherApiTheme);
  });

  it("openWeatherTheme has all required fields", () => {
    const theme = getThemeForService("openWeather");
    expect(theme.name).toBe("OpenWeather");
    expect(theme.background).toBeDefined();
    expect(theme.card).toBeDefined();
    expect(theme.cardText).toBeDefined();
    expect(theme.accent).toBeDefined();
    expect(theme.accentHex).toBeDefined();
    expect(theme.toggleActive).toBeDefined();
    expect(theme.toggleInactive).toBeDefined();
    expect(theme.input).toBeDefined();
    expect(theme.headerText).toBeDefined();
    expect(theme.subtitleText).toBeDefined();
    expect(theme.emptyStateText).toBeDefined();
    expect(theme.buttonLabel).toBeDefined();
    expect(theme.statusBarStyle).toBeDefined();
  });

  it("weatherApiTheme has all required fields", () => {
    const theme = getThemeForService("weatherApi");
    expect(theme.name).toBe("WeatherAPI");
    expect(theme.background).toBeDefined();
    expect(theme.card).toBeDefined();
    expect(theme.cardText).toBeDefined();
    expect(theme.accent).toBeDefined();
    expect(theme.accentHex).toBeDefined();
    expect(theme.toggleActive).toBeDefined();
    expect(theme.toggleInactive).toBeDefined();
    expect(theme.input).toBeDefined();
    expect(theme.headerText).toBeDefined();
    expect(theme.subtitleText).toBeDefined();
    expect(theme.emptyStateText).toBeDefined();
    expect(theme.buttonLabel).toBeDefined();
    expect(theme.statusBarStyle).toBeDefined();
  });

  it("themes have different color schemes", () => {
    const owTheme = getThemeForService("openWeather");
    const waTheme = getThemeForService("weatherApi");
    expect(owTheme.background).not.toBe(waTheme.background);
    expect(owTheme.card).not.toBe(waTheme.card);
    expect(owTheme.accentHex).not.toBe(waTheme.accentHex);
  });
});
