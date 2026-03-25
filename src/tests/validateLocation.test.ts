import { validateLocation } from "@/src/utils/validateLocation";
import { VALIDATION_MESSAGES } from "@/src/constants/validation";

describe("validateLocation", () => {
  it("rejects empty string", () => {
    const { isValid, error } = validateLocation("");
    expect(isValid).toBe(false);
    expect(error).toBe(VALIDATION_MESSAGES.empty);
  });

  it("rejects whitespace-only string", () => {
    const { isValid, error } = validateLocation("   ");
    expect(isValid).toBe(false);
    expect(error).toBe(VALIDATION_MESSAGES.empty);
  });

  it("rejects single character", () => {
    const { isValid, error } = validateLocation("A");
    expect(isValid).toBe(false);
    expect(error).toBe(VALIDATION_MESSAGES.tooShort);
  });

  it("rejects string exceeding max length", () => {
    const longString = "a".repeat(101);
    const { isValid, error } = validateLocation(longString);
    expect(isValid).toBe(false);
    expect(error).toBe(VALIDATION_MESSAGES.tooLong);
  });

  it("rejects numeric characters", () => {
    const { isValid, error } = validateLocation("London123");
    expect(isValid).toBe(false);
    expect(error).toBe(VALIDATION_MESSAGES.invalidCharacters);
  });

  it("rejects special characters", () => {
    const { isValid, error } = validateLocation("London@#$");
    expect(isValid).toBe(false);
    expect(error).toBe(VALIDATION_MESSAGES.invalidCharacters);
  });

  it("rejects emojis", () => {
    const { isValid, error } = validateLocation("London 🌧");
    expect(isValid).toBe(false);
    expect(error).toBe(VALIDATION_MESSAGES.invalidCharacters);
  });

  it("accepts valid city name", () => {
    const { isValid, error } = validateLocation("London");
    expect(isValid).toBe(true);
    expect(error).toBeNull();
  });

  it("accepts city with spaces", () => {
    const { isValid, error } = validateLocation("New York");
    expect(isValid).toBe(true);
    expect(error).toBeNull();
  });

  it("accepts city with hyphens", () => {
    const { isValid, error } = validateLocation("Stratford-upon-Avon");
    expect(isValid).toBe(true);
    expect(error).toBeNull();
  });

  it("accepts city with apostrophe", () => {
    const { isValid, error } = validateLocation("O'Brien");
    expect(isValid).toBe(true);
    expect(error).toBeNull();
  });

  it("accepts accented characters", () => {
    const { isValid, error } = validateLocation("São Paulo");
    expect(isValid).toBe(true);
    expect(error).toBeNull();
  });

  it("accepts city with parentheses", () => {
    const { isValid, error } = validateLocation("Washington (DC)");
    expect(isValid).toBe(true);
    expect(error).toBeNull();
  });

  it("trims leading and trailing whitespace before validation", () => {
    const { isValid, error } = validateLocation("  London  ");
    expect(isValid).toBe(true);
    expect(error).toBeNull();
  });

  it("accepts minimum valid length", () => {
    const { isValid, error } = validateLocation("LA");
    expect(isValid).toBe(true);
    expect(error).toBeNull();
  });

  it("accepts exactly max length", () => {
    const { isValid, error } = validateLocation("a".repeat(100));
    expect(isValid).toBe(true);
    expect(error).toBeNull();
  });
});
