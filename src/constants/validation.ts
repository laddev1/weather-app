export const VALIDATION = {
  minLength: 2,
  maxLength: 100,
  forbiddenPattern: /[^a-zA-Z\s\-'.,"()áàâäãåæçéèêëíìîïñóòôöõøúùûüýÿ]/,
} as const;

export const VALIDATION_MESSAGES = {
  empty: "Please enter a city name.",
  tooShort: `City name must be at least ${VALIDATION.minLength} characters.`,
  tooLong: `City name must be less than ${VALIDATION.maxLength} characters.`,
  invalidCharacters: "City name contains invalid characters.",
} as const;
