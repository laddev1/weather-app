# Weather App

A production-quality Weather Mobile App built with React Native Expo and TypeScript. Search for any city and get real-time weather data from two different providers — with dynamic theme switching, input validation, and clean architecture throughout.

## Setup

### Prerequisites

- Node.js >= 20
- npm
- Expo CLI (`npx expo`)
- iOS Simulator / Android Emulator / Expo Go

### Installation

```bash
git clone <repo-url>
cd weather-app
npm install
```

### Environment Variables

Copy the example file and add your API keys:

```bash
cp .env.example .env
```

```
EXPO_PUBLIC_OPENWEATHER_API_KEY=your_openweathermap_key
EXPO_PUBLIC_WEATHERAPI_API_KEY=your_weatherapi_key
```

Get free API keys from:
- [OpenWeatherMap](https://openweathermap.org/api)
- [WeatherAPI](https://www.weatherapi.com/)

### Running the App

```bash
npx expo start
```

Press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go.

### Scripts

| Command | Description |
|---|---|
| `npm start` | Start Expo dev server |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Lint with ESLint |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting |

---

## Architecture

The app follows **Clean Architecture** principles with strict separation of concerns across five layers:

```
UI Layer          →  app/, src/features/, src/components/
Hook Layer        →  src/hooks/
State Layer       →  src/store/
Service Layer     →  src/services/
Foundation Layer  →  src/types/, src/constants/, src/utils/, src/theme/
```

### Data Flow

```
User Input → useWeather hook → validates input → calls useWeatherService
  → createWeatherService(factory) → IWeatherService adapter → Axios → API
  → maps response to WeatherData → Zustand store → React re-render
```

### Key Principles

- **No business logic in components** — screens are pure UI that consume hooks
- **No API logic in the store** — Zustand holds state only; orchestration lives in hooks
- **No direct service imports in UI** — everything flows through the hook layer
- **Adapter Pattern** — services implement `IWeatherService`, making providers swappable
- **Factory Pattern** — `createWeatherService()` maps a `ServiceType` to the correct adapter

---

## Folder Structure

```
weather-app/
├── app/                          # Expo Router screens
│   ├── _layout.tsx               # Root layout (imports global.css)
│   └── (tabs)/
│       ├── _layout.tsx           # Tab navigator
│       └── index.tsx             # Weather tab (renders WeatherScreen)
│
├── src/
│   ├── components/               # Shared reusable components
│   │   └── ui/
│   │       ├── Button.tsx        # Primary/secondary, loading state
│   │       └── Typography.tsx    # Title/subtitle/body/caption variants
│   │
│   ├── features/
│   │   └── weather/              # Weather feature module
│   │       ├── WeatherScreen.tsx # Main screen (composes all sub-components)
│   │       ├── SearchInput.tsx   # City input with inline validation errors
│   │       ├── WeatherCard.tsx   # Temperature, description, stats
│   │       ├── ServiceToggle.tsx # Segmented toggle between providers
│   │       ├── ErrorMessage.tsx  # API error card with retry
│   │       └── LoadingOverlay.tsx# Spinner with theme accent color
│   │
│   ├── services/                 # API adapters (Adapter Pattern)
│   │   ├── weatherService.ts     # IWeatherService interface
│   │   ├── openWeatherService.ts # OpenWeatherMap adapter
│   │   ├── weatherApiService.ts  # WeatherAPI adapter
│   │   └── weatherServiceFactory.ts # Factory: ServiceType → adapter
│   │
│   ├── store/                    # Zustand global state
│   │   └── weatherStore.ts       # Weather state + actions
│   │
│   ├── hooks/                    # Custom hooks (UI ↔ Business Logic bridge)
│   │   ├── useWeather.ts         # Master hook — composes all others
│   │   ├── useWeatherService.ts  # Fetch orchestration (loading/error/data)
│   │   ├── useTheme.ts           # Resolves theme from selected service
│   │   └── useDebounce.ts        # Generic value debounce
│   │
│   ├── theme/                    # Dynamic theming system
│   │   ├── weatherTheme.ts       # WeatherTheme interface + both themes
│   │   └── themeMap.ts           # ServiceType → WeatherTheme resolver
│   │
│   ├── types/                    # Shared TypeScript types
│   │   └── weather.ts            # WeatherData, ServiceType
│   │
│   ├── constants/                # App-wide constants
│   │   ├── api.ts                # API base URLs + env key references
│   │   └── validation.ts         # Validation rules + messages
│   │
│   ├── utils/                    # Pure utility functions
│   │   └── validateLocation.ts   # Location input validator
│   │
│   └── tests/                    # Unit tests
│       ├── validateLocation.test.ts
│       ├── weatherStore.test.ts
│       ├── weatherServices.test.ts
│       ├── themeMap.test.ts
│       └── useDebounce.test.ts
│
├── eslint.config.js              # ESLint 9 flat config (FlatCompat)
├── .prettierrc                   # Prettier config
├── babel.config.js               # Babel + NativeWind preset
├── global.css                    # Tailwind directives
├── jest.config.js                # Jest config
├── metro.config.js               # Metro + NativeWind
├── tailwind.config.js            # Tailwind content paths + NativeWind preset
├── tsconfig.json                 # TypeScript strict mode + path aliases
└── .env.example                  # Required environment variables
```

---

## Theming

The app dynamically switches its entire color scheme when the user toggles between weather services.

### How It Works

1. User taps the service toggle → `selectedService` changes in Zustand
2. `useTheme` hook calls `getThemeForService(selectedService)` → returns a `WeatherTheme` object
3. Every component receives theme tokens as Tailwind class strings
4. Background, cards, buttons, inputs, text — all swap colors instantly

### Theme Tokens

Each `WeatherTheme` object provides:

| Token | Description |
|---|---|
| `background` | Screen background class |
| `card` | Weather card background |
| `cardText` | Text color on cards |
| `accent` | Primary button style |
| `accentHex` | Hex color for native components (ActivityIndicator) |
| `toggleActive` | Active segment background |
| `toggleInactive` | Inactive segment background |
| `input` | Input border + background |
| `headerText` | Page title color |
| `subtitleText` | Subtitle / caption color |
| `emptyStateText` | Placeholder text color |
| `buttonLabel` | Button text color |
| `statusBarStyle` | Status bar appearance |

### Included Themes

| Theme | Service | Palette |
|---|---|---|
| `openWeatherTheme` | OpenWeather | Sky blue background, blue-600 accents |
| `weatherApiTheme` | WeatherAPI | Violet background, purple-700 accents |

### Adding a New Theme

1. Create a new `WeatherTheme` object in `src/theme/weatherTheme.ts`
2. Add one entry to `THEME_MAP` in `src/theme/themeMap.ts`
3. The TypeScript compiler enforces all required tokens are provided

---

## Service Replacement

The app uses the **Adapter Pattern** to make weather API providers fully interchangeable.

### The Interface

```typescript
interface IWeatherService {
  fetchWeather(location: string): Promise<WeatherData>;
}
```

Every provider must implement this single method and return a unified `WeatherData` shape.

### Adding a New Service

1. Create a new file (e.g., `src/services/accuWeatherService.ts`)
2. Implement `IWeatherService` — fetch from the API and map the response to `WeatherData`
3. Add the new literal to `ServiceType` in `src/types/weather.ts`
4. Add one entry to `SERVICE_MAP` in `src/services/weatherServiceFactory.ts`
5. Add one entry to `THEME_MAP` in `src/theme/themeMap.ts`

No changes needed in UI, store, or hooks. The factory and interface guarantee compatibility.

### Removing a Dead Service

1. Delete the adapter file
2. Remove its entry from `SERVICE_MAP` and `THEME_MAP`
3. TypeScript will flag any remaining references

---

## Testing

### Test Coverage (Business Logic)

| Module | Stmts | Branches | Functions |
|---|---|---|---|
| `utils/validateLocation.ts` | 100% | 100% | 100% |
| `store/weatherStore.ts` | 100% | 100% | 100% |
| `services/openWeatherService.ts` | 100% | 50% | 100% |
| `services/weatherApiService.ts` | 100% | 100% | 100% |
| `services/weatherServiceFactory.ts` | 100% | 100% | 100% |
| `theme/themeMap.ts` | 100% | 100% | 100% |
| `hooks/useDebounce.ts` | 100% | — | 100% |

### Test Suites

**Validation (15 tests)** — empty input, whitespace, min/max length, forbidden characters (numbers, symbols, emojis), accented characters, hyphens, apostrophes, edge cases.

**Store (12 tests)** — initial state, each action, toggle cycling, full reset.

**Services (9 tests)** — correct response mapping for both providers, proper axios parameters, wind speed conversion, error propagation, factory returns correct class.

**Theme (5 tests)** — correct theme per service, all interface fields present, themes are visually distinct.

**useDebounce (6 tests)** — immediate return, delayed update, timer reset on rapid changes, custom delay, generic type support.

### Running Tests

```bash
npm test                  # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage report
```

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React Native Expo (SDK 55) | Cross-platform mobile framework |
| TypeScript (strict mode) | Type safety |
| Expo Router | File-based navigation |
| Zustand | Lightweight state management |
| NativeWind v4 | Tailwind CSS for React Native |
| Axios | HTTP client |
| Jest + jest-expo | Unit testing |
| @testing-library/react-native | Hook testing |
| ESLint + Prettier | Code quality + formatting |
