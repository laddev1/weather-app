import { VALIDATION, VALIDATION_MESSAGES } from "@/src/constants/validation";

interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

export function validateLocation(raw: string): ValidationResult {
  const trimmed = raw.trim();

  if (trimmed.length === 0) {
    return { isValid: false, error: VALIDATION_MESSAGES.empty };
  }

  if (trimmed.length < VALIDATION.minLength) {
    return { isValid: false, error: VALIDATION_MESSAGES.tooShort };
  }

  if (trimmed.length > VALIDATION.maxLength) {
    return { isValid: false, error: VALIDATION_MESSAGES.tooLong };
  }

  if (VALIDATION.forbiddenPattern.test(trimmed)) {
    return { isValid: false, error: VALIDATION_MESSAGES.invalidCharacters };
  }

  return { isValid: true, error: null };
}
