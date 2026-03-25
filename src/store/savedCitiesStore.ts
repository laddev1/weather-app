import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "saved_cities";

interface SavedCitiesState {
  cities: string[];
  isLoaded: boolean;
}

interface SavedCitiesActions {
  loadCities: () => Promise<void>;
  addCity: (city: string) => Promise<void>;
  removeCity: (city: string) => Promise<void>;
  isCitySaved: (city: string) => boolean;
  toggleCity: (city: string) => Promise<void>;
}

export type SavedCitiesStore = SavedCitiesState & SavedCitiesActions;

const persist = async (cities: string[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
};

export const useSavedCitiesStore = create<SavedCitiesStore>((set, get) => ({
  cities: [],
  isLoaded: false,

  loadCities: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const cities = raw ? (JSON.parse(raw) as string[]) : [];
      set({ cities, isLoaded: true });
    } catch {
      set({ cities: [], isLoaded: true });
    }
  },

  addCity: async (city: string) => {
    const { cities } = get();
    const normalized = city.trim();
    if (cities.some((c) => c.toLowerCase() === normalized.toLowerCase())) {
      return;
    }
    const updated = [normalized, ...cities];
    set({ cities: updated });
    await persist(updated);
  },

  removeCity: async (city: string) => {
    const { cities } = get();
    const updated = cities.filter(
      (c) => c.toLowerCase() !== city.toLowerCase(),
    );
    set({ cities: updated });
    await persist(updated);
  },

  isCitySaved: (city: string) => {
    const { cities } = get();
    return cities.some((c) => c.toLowerCase() === city.trim().toLowerCase());
  },

  toggleCity: async (city: string) => {
    const { isCitySaved, addCity, removeCity } = get();
    if (isCitySaved(city)) {
      await removeCity(city);
    } else {
      await addCity(city);
    }
  },
}));
