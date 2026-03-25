import { useCallback, useState } from "react";
import * as Location from "expo-location";

interface UseGeolocationReturn {
  isLocating: boolean;
  locationError: string | null;
  clearLocationError: () => void;
  detectCity: () => Promise<string | null>;
}

export function useGeolocation(): UseGeolocationReturn {
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const detectCity = useCallback(async (): Promise<string | null> => {
    setIsLocating(true);
    setLocationError(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationError("Location permission denied.");
        return null;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const [address] = await Location.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      if (!address?.city) {
        setLocationError("Could not determine city from location.");
        return null;
      }

      return address.city;
    } catch {
      setLocationError("Failed to detect location.");
      return null;
    } finally {
      setIsLocating(false);
    }
  }, []);

  const clearLocationError = useCallback(() => {
    setLocationError(null);
  }, []);

  return { isLocating, locationError, clearLocationError, detectCity };
}
