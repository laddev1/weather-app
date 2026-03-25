import type { ComponentProps } from "react";
import type { Ionicons } from "@expo/vector-icons";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

export interface WeatherTheme {
  name: string;
  background: string;
  card: string;
  cardText: string;
  accent: string;
  accentHex: string;
  toggleActive: string;
  toggleInactive: string;
  input: string;
  headerText: string;
  subtitleText: string;
  emptyStateText: string;
  buttonLabel: string;
  statusBarStyle: "light" | "dark";
  tabBarActiveTint: string;
  tabBarInactiveTint: string;
  tabBarBackground: string;
  weatherIcon: IoniconName;
  searchIcon: IoniconName;
  cardBorder: string;
  saveBtnClass: string;
}

export const openWeatherTheme: WeatherTheme = {
  name: "OpenWeather",
  background: "bg-sky-50",
  card: "bg-blue-600",
  cardText: "text-white",
  accent: "bg-blue-600 active:bg-blue-700",
  accentHex: "#2563eb",
  toggleActive: "bg-blue-600",
  toggleInactive: "bg-transparent",
  input: "border-blue-200 bg-white text-gray-900",
  headerText: "text-blue-950",
  subtitleText: "text-blue-400",
  emptyStateText: "text-blue-300",
  buttonLabel: "text-white",
  statusBarStyle: "dark",
  tabBarActiveTint: "#2563eb",
  tabBarInactiveTint: "#94a3b8",
  tabBarBackground: "#f0f9ff",
  weatherIcon: "cloud",
  searchIcon: "search",
  cardBorder: "border-blue-400",
  saveBtnClass: "bg-blue-500 active:bg-blue-600",
};

export const weatherApiTheme: WeatherTheme = {
  name: "WeatherAPI",
  background: "bg-violet-50",
  card: "bg-purple-700",
  cardText: "text-white",
  accent: "bg-purple-700 active:bg-purple-800",
  accentHex: "#7c3aed",
  toggleActive: "bg-purple-700",
  toggleInactive: "bg-transparent",
  input: "border-purple-200 bg-white text-gray-900",
  headerText: "text-purple-950",
  subtitleText: "text-purple-400",
  emptyStateText: "text-purple-300",
  buttonLabel: "text-white",
  statusBarStyle: "dark",
  tabBarActiveTint: "#7c3aed",
  tabBarInactiveTint: "#a78bfa",
  tabBarBackground: "#f5f3ff",
  weatherIcon: "thunderstorm",
  searchIcon: "globe",
  cardBorder: "border-purple-400",
  saveBtnClass: "bg-purple-500 active:bg-purple-600",
};
