import { useSavedCitiesStore } from "@/src/store/savedCitiesStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const mockedStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe("savedCitiesStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSavedCitiesStore.setState({ cities: [], isLoaded: false });
  });

  describe("loadCities", () => {
    it("loads cities from storage", async () => {
      mockedStorage.getItem.mockResolvedValueOnce(
        JSON.stringify(["London", "Paris"]),
      );

      await useSavedCitiesStore.getState().loadCities();

      expect(useSavedCitiesStore.getState().cities).toEqual([
        "London",
        "Paris",
      ]);
      expect(useSavedCitiesStore.getState().isLoaded).toBe(true);
    });

    it("defaults to empty array when storage is empty", async () => {
      mockedStorage.getItem.mockResolvedValueOnce(null);

      await useSavedCitiesStore.getState().loadCities();

      expect(useSavedCitiesStore.getState().cities).toEqual([]);
      expect(useSavedCitiesStore.getState().isLoaded).toBe(true);
    });

    it("handles storage errors gracefully", async () => {
      mockedStorage.getItem.mockRejectedValueOnce(new Error("Storage error"));

      await useSavedCitiesStore.getState().loadCities();

      expect(useSavedCitiesStore.getState().cities).toEqual([]);
      expect(useSavedCitiesStore.getState().isLoaded).toBe(true);
    });
  });

  describe("addCity", () => {
    it("adds a new city to the beginning", async () => {
      useSavedCitiesStore.setState({ cities: ["Paris"] });

      await useSavedCitiesStore.getState().addCity("London");

      expect(useSavedCitiesStore.getState().cities).toEqual([
        "London",
        "Paris",
      ]);
      expect(mockedStorage.setItem).toHaveBeenCalled();
    });

    it("does not add duplicate cities (case insensitive)", async () => {
      useSavedCitiesStore.setState({ cities: ["London"] });

      await useSavedCitiesStore.getState().addCity("london");

      expect(useSavedCitiesStore.getState().cities).toEqual(["London"]);
      expect(mockedStorage.setItem).not.toHaveBeenCalled();
    });

    it("trims whitespace from city name", async () => {
      await useSavedCitiesStore.getState().addCity("  London  ");

      expect(useSavedCitiesStore.getState().cities).toEqual(["London"]);
    });
  });

  describe("removeCity", () => {
    it("removes a city by name (case insensitive)", async () => {
      useSavedCitiesStore.setState({ cities: ["London", "Paris"] });

      await useSavedCitiesStore.getState().removeCity("london");

      expect(useSavedCitiesStore.getState().cities).toEqual(["Paris"]);
      expect(mockedStorage.setItem).toHaveBeenCalled();
    });
  });

  describe("isCitySaved", () => {
    it("returns true for saved city", () => {
      useSavedCitiesStore.setState({ cities: ["London"] });

      expect(useSavedCitiesStore.getState().isCitySaved("London")).toBe(true);
    });

    it("returns true case-insensitively", () => {
      useSavedCitiesStore.setState({ cities: ["London"] });

      expect(useSavedCitiesStore.getState().isCitySaved("london")).toBe(true);
    });

    it("returns false for unsaved city", () => {
      useSavedCitiesStore.setState({ cities: ["London"] });

      expect(useSavedCitiesStore.getState().isCitySaved("Paris")).toBe(false);
    });
  });

  describe("toggleCity", () => {
    it("adds city if not saved", async () => {
      useSavedCitiesStore.setState({ cities: [] });

      await useSavedCitiesStore.getState().toggleCity("London");

      expect(useSavedCitiesStore.getState().cities).toContain("London");
    });

    it("removes city if already saved", async () => {
      useSavedCitiesStore.setState({ cities: ["London"] });

      await useSavedCitiesStore.getState().toggleCity("London");

      expect(useSavedCitiesStore.getState().cities).not.toContain("London");
    });
  });
});
