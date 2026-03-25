import { Pressable, View } from "react-native";
import type { ServiceType } from "@/src/types";
import { Typography } from "@/src/components/ui";

interface ServiceToggleProps {
  selectedService: ServiceType;
  onToggle: () => void;
  activeClassName?: string;
  inactiveClassName?: string;
}

const SERVICE_LABELS: Record<ServiceType, string> = {
  openWeather: "OpenWeather",
  weatherApi: "WeatherAPI",
};

const SERVICES: ServiceType[] = ["openWeather", "weatherApi"];

export function ServiceToggle({
  selectedService,
  onToggle,
  activeClassName = "bg-blue-600",
  inactiveClassName = "bg-transparent",
}: ServiceToggleProps) {
  return (
    <View className="w-full flex-row rounded-2xl bg-gray-200 p-1">
      {SERVICES.map((service) => {
        const isActive = service === selectedService;

        return (
          <Pressable
            key={service}
            onPress={isActive ? undefined : onToggle}
            className={`flex-1 items-center rounded-xl py-3 ${isActive ? activeClassName : inactiveClassName}`}
          >
            <Typography
              variant="caption"
              className={`font-semibold ${isActive ? "text-white" : "text-gray-600"}`}
            >
              {SERVICE_LABELS[service]}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
}
