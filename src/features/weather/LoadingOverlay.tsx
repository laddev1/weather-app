import { ActivityIndicator, View } from "react-native";
import { Typography } from "@/src/components/ui";

interface LoadingOverlayProps {
  accentColor?: string;
}

export function LoadingOverlay({
  accentColor = "#2563eb",
}: LoadingOverlayProps) {
  return (
    <View className="w-full items-center py-12">
      <ActivityIndicator size="large" color={accentColor} />
      <Typography variant="caption" className="mt-4 text-gray-500">
        Fetching weather data...
      </Typography>
    </View>
  );
}
