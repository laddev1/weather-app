import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useWeather } from "@/src/hooks";
import { Typography } from "@/src/components/ui";
import { Button } from "@/src/components/ui";
import { SearchInput } from "./SearchInput";
import { WeatherCard } from "./WeatherCard";
import { ServiceToggle } from "./ServiceToggle";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingOverlay } from "./LoadingOverlay";

export function WeatherScreen() {
  const {
    location,
    weather,
    isLoading,
    apiError,
    validationError,
    selectedService,
    theme,
    serviceName,
    isLocating,
    locationError,
    isCitySaved,
    setLocation,
    handleSearch,
    handleToggleService,
    handleDetectLocation,
    handleSaveCity,
  } = useWeather();

  return (
    <SafeAreaView className={`flex-1 ${theme.background}`}>
      <StatusBar style={theme.statusBarStyle} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow px-6 py-4"
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-1" />
            <View className="flex-1 items-center">
              <Ionicons
                name={theme.weatherIcon}
                size={32}
                color={theme.accentHex}
              />
              <Typography variant="title" className={theme.headerText}>
                Weather
              </Typography>
              <Typography
                variant="caption"
                className={`mt-1 ${theme.subtitleText}`}
              >
                {serviceName}
              </Typography>
            </View>
            <View className="flex-1 items-end">
              <Pressable
                onPress={handleDetectLocation}
                disabled={isLocating}
                className="p-2"
              >
                <Ionicons
                  name="navigate-circle-outline"
                  size={28}
                  color={theme.accentHex}
                />
              </Pressable>
            </View>
          </View>

          <View className="mb-4">
            <ServiceToggle
              selectedService={selectedService}
              onToggle={handleToggleService}
              activeClassName={theme.toggleActive}
              inactiveClassName={theme.toggleInactive}
            />
          </View>

          <View className="mb-4">
            <SearchInput
              value={location}
              onChangeText={setLocation}
              onSubmit={handleSearch}
              error={validationError}
              inputClassName={theme.input}
            />
          </View>

          <View className="mb-6">
            <Button
              label={isLocating ? "Detecting..." : "Search Weather"}
              onPress={handleSearch}
              isLoading={isLoading || isLocating}
              disabled={isLoading || isLocating}
              className={theme.accent}
            />
          </View>

          {!isLocating && locationError && (
            <View className="mb-4">
              <Typography variant="caption" className="text-red-500">
                {locationError}
              </Typography>
            </View>
          )}

          {(isLoading || isLocating) && (
            <LoadingOverlay accentColor={theme.accentHex} />
          )}

          {!isLoading && !isLocating && apiError && (
            <ErrorMessage message={apiError} onRetry={handleSearch} />
          )}

          {!isLoading && !isLocating && !apiError && weather && (
            <WeatherCard
              weather={weather}
              cardClassName={theme.card}
              textClassName={theme.cardText}
              onSave={handleSaveCity}
              isSaved={isCitySaved}
            />
          )}

          {!isLoading &&
            !isLocating &&
            !apiError &&
            !weather &&
            !validationError && (
              <View className="items-center py-12">
                <Ionicons
                  name={theme.searchIcon}
                  size={48}
                  color={theme.accentHex}
                  style={{ opacity: 0.3 }}
                />
                <Typography
                  variant="body"
                  className={`mt-4 ${theme.emptyStateText}`}
                >
                  Search for a city or tap the location icon
                </Typography>
              </View>
            )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
