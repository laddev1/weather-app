import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { WeatherData } from "@/src/types";
import { Typography } from "@/src/components/ui";

interface WeatherCardProps {
  weather: WeatherData;
  cardClassName?: string;
  textClassName?: string;
  onSave?: () => void;
  isSaved?: boolean;
}

interface StatItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  textClassName?: string;
}

function StatItem({ icon, label, value, textClassName = "" }: StatItemProps) {
  return (
    <View className="items-center gap-1">
      <Ionicons name={icon} size={18} color="rgba(255,255,255,0.7)" />
      <Typography variant="caption" className={textClassName}>
        {label}
      </Typography>
      <Typography variant="body" className={`font-semibold ${textClassName}`}>
        {value}
      </Typography>
    </View>
  );
}

export function WeatherCard({
  weather,
  cardClassName = "",
  textClassName = "",
  onSave,
  isSaved = false,
}: WeatherCardProps) {
  const { location, temperature, description, humidity, windSpeed, feelsLike } =
    weather;

  return (
    <View className={`w-full rounded-3xl p-6 ${cardClassName}`}>
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1" />
        <View className="flex-1 items-center">
          <Typography variant="subtitle" className={textClassName}>
            {location}
          </Typography>
        </View>
        <View className="flex-1 items-end">
          {onSave && (
            <Pressable onPress={onSave} className="p-2">
              <Ionicons
                name={isSaved ? "bookmark" : "bookmark-outline"}
                size={24}
                color="white"
              />
            </Pressable>
          )}
        </View>
      </View>

      <View className="items-center mb-6">
        <Typography variant="title" className={`text-6xl ${textClassName}`}>
          {temperature}°
        </Typography>
        <Typography
          variant="body"
          className={`capitalize mt-1 ${textClassName}`}
        >
          {description}
        </Typography>
      </View>

      <View className="flex-row justify-around border-t border-white/20 pt-4">
        <StatItem
          icon="thermometer-outline"
          label="Feels Like"
          value={`${feelsLike}°`}
          textClassName={textClassName}
        />
        <StatItem
          icon="water-outline"
          label="Humidity"
          value={`${humidity}%`}
          textClassName={textClassName}
        />
        <StatItem
          icon="speedometer-outline"
          label="Wind"
          value={`${windSpeed} m/s`}
          textClassName={textClassName}
        />
      </View>
    </View>
  );
}
