import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "@/src/components/ui";

interface CityRowProps {
  city: string;
  accentHex: string;
  onPress: () => void;
  onRemove: () => void;
}

export function CityRow({ city, accentHex, onPress, onRemove }: CityRowProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between rounded-2xl bg-white px-5 py-4 mb-3 border border-gray-100"
    >
      <View className="flex-row items-center flex-1">
        <Ionicons name="location-outline" size={20} color={accentHex} />
        <Typography variant="body" className="ml-3 text-gray-900">
          {city}
        </Typography>
      </View>
      <Pressable onPress={onRemove} className="p-2">
        <Ionicons name="trash-outline" size={20} color="#ef4444" />
      </Pressable>
    </Pressable>
  );
}
