import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useWeather } from "@/src/hooks";
import { Typography } from "@/src/components/ui";
import { ServiceToggle } from "@/src/features/weather/ServiceToggle";

interface SettingRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  accentHex: string;
}

function SettingRow({ icon, label, value, accentHex }: SettingRowProps) {
  return (
    <View className="flex-row items-center justify-between bg-white rounded-2xl px-5 py-4 mb-3 border border-gray-100">
      <View className="flex-row items-center">
        <Ionicons name={icon} size={20} color={accentHex} />
        <Typography variant="body" className="ml-3 text-gray-900">
          {label}
        </Typography>
      </View>
      <Typography variant="caption" className="text-gray-500">
        {value}
      </Typography>
    </View>
  );
}

export function SettingsScreen() {
  const { selectedService, theme, handleToggleService } = useWeather();

  return (
    <SafeAreaView className={`flex-1 ${theme.background}`}>
      <View className="px-6 py-4">
        <View className="items-center mb-6">
          <Ionicons name="settings-outline" size={28} color={theme.accentHex} />
          <Typography variant="title" className={theme.headerText}>
            Settings
          </Typography>
        </View>

        <Typography
          variant="caption"
          className={`mb-3 ml-1 uppercase tracking-wider ${theme.subtitleText}`}
        >
          Weather Provider
        </Typography>

        <View className="mb-6">
          <ServiceToggle
            selectedService={selectedService}
            onToggle={() => void handleToggleService()}
            activeClassName={theme.toggleActive}
            inactiveClassName={theme.toggleInactive}
          />
        </View>

        <Typography
          variant="caption"
          className={`mb-3 ml-1 uppercase tracking-wider ${theme.subtitleText}`}
        >
          Current Configuration
        </Typography>

        <SettingRow
          icon="cloud-outline"
          label="Active Service"
          value={theme.name}
          accentHex={theme.accentHex}
        />
        <SettingRow
          icon="color-palette-outline"
          label="Theme"
          value={selectedService === "openWeather" ? "Blue" : "Purple"}
          accentHex={theme.accentHex}
        />
        <SettingRow
          icon="thermometer-outline"
          label="Units"
          value="Metric (°C)"
          accentHex={theme.accentHex}
        />
        <SettingRow
          icon="speedometer-outline"
          label="Wind Speed"
          value="m/s"
          accentHex={theme.accentHex}
        />

        <View className="mt-6 items-center">
          <Typography variant="caption" className="text-gray-400">
            Weather App v1.0.0
          </Typography>
        </View>
      </View>
    </SafeAreaView>
  );
}
