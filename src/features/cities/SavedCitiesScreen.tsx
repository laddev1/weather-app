import { useEffect } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSavedCitiesStore } from "@/src/store";
import { useWeather } from "@/src/hooks";
import { Typography } from "@/src/components/ui";
import { CityRow } from "./CityRow";

export function SavedCitiesScreen() {
  const { cities, isLoaded, loadCities, removeCity } = useSavedCitiesStore();
  const { theme, handleSelectSavedCity } = useWeather();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) {
      loadCities();
    }
  }, [isLoaded, loadCities]);

  const handleCityPress = (city: string) => {
    void handleSelectSavedCity(city);
    router.navigate("/(tabs)");
  };

  const renderCity = ({ item }: { item: string }) => (
    <CityRow
      city={item}
      accentHex={theme.accentHex}
      onPress={() => handleCityPress(item)}
      onRemove={() => removeCity(item)}
    />
  );

  const renderEmpty = () => (
    <View className="items-center py-16">
      <Ionicons
        name="bookmark-outline"
        size={48}
        color={theme.accentHex}
        style={{ opacity: 0.3 }}
      />
      <Typography variant="body" className={`mt-4 ${theme.emptyStateText}`}>
        No saved cities yet
      </Typography>
      <Typography variant="caption" className="mt-2 text-gray-400">
        Save cities from the weather screen
      </Typography>
    </View>
  );

  return (
    <SafeAreaView className={`flex-1 ${theme.background}`}>
      <View className="px-6 py-4">
        <View className="items-center mb-6">
          <Ionicons
            name="bookmarks-outline"
            size={28}
            color={theme.accentHex}
          />
          <Typography variant="title" className={theme.headerText}>
            Saved Cities
          </Typography>
          <Typography
            variant="caption"
            className={`mt-1 ${theme.subtitleText}`}
          >
            {cities.length} {cities.length === 1 ? "city" : "cities"} saved
          </Typography>
        </View>

        <FlatList
          data={cities}
          keyExtractor={(item) => item}
          renderItem={renderCity}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
