## Re.Pack Training

React Native monorepo demonstrating **Module Federation with Re.Pack (Rspack)**, using a host app (`RepackApp`) that dynamically loads a remote module app (`ProfileRemote`) over the network.

### Tech stack

- **Monorepo & Tooling**: Turborepo, pnpm, TypeScript
- **Mobile**: React Native `0.81.5`, Android & iOS
- **Bundler**: Re.Pack `@callstack/repack` (Rspack)
- **Module Federation**: `@module-federation/enhanced` + `ModuleFederationPluginV2`
- **Styling**: NativeWind 4 (Tailwind CSS), `nativewind.css` design tokens
- **State**: Zustand stores (`@repo/stores`)
- **Data**: React Query (`@repo/providers`), Axios (`@repo/services`)

---

## Structure

```text
apps/
  RepackApp/      # Host/container app that consumes remote modules
  ProfileRemote/  # Remote app exposing a Profile screen via Module Federation

packages/
  constants/      # API paths, messages, validation, storage keys
  hooks/          # Shared hooks (auth, products, theme, user,...)
  interfaces/     # Shared TypeScript types (auth, user, product,...)
  providers/      # Shared providers (React Query)
  services/       # Axios API client
  stores/         # Zustand stores (auth, user, theme)
  ui/             # Shared UI component library
  utils/          # Shared helpers (common, time)
  eslint-config/  # Shared ESLint config
  typescript-config/ # Shared TS configs
```

---

## Installation

From the **repo root**:

```bash
pnpm run setup
```

Node requirements:

- **Root**: `"engines": { "node": ">=18" }`
- **Apps**: each app prefers **Node >= 20**, so use Node 20+.

---

## Apps overview

### RepackApp (host)

- Location: `apps/RepackApp`
- Role: Main app that:
  - Handles auth, navigation, theme, home screen, etc.
  - Dynamically loads the remote profile screen from `ProfileRemote` using Module Federation.
- Entry:
  - Metro entry: `index.js` → `App.tsx`
  - Rspack entry: `rspack.config.mjs` (`entry: './index.js'`)

### ProfileRemote (remote)

- Location: `apps/ProfileRemote`
- Role: Exposes `./Profile` screen to be consumed by `RepackApp`.
- Exposed module:
  - `./src/module/Profile/index.tsx` as `ProfileRemote/Profile`
- Entry:
  - Metro entry: `index.js`
  - Rspack entry: `rspack.config.mjs` (`entry: './index.js'`)

---

## Module Federation

### Remote (ProfileRemote)

- Config: `apps/ProfileRemote/rspack.config.mjs`
- Key parts:
  - **Name**: `ProfileRemote`
  - **Filename**: `ProfileRemote.container.js.bundle`
  - **Exposes**:
    - `'./Profile': './src/module/Profile/index.tsx'`
  - **Shared singletons**:
    - `react`, `react-native`, `react/jsx-runtime`, `react-native-svg`
  - Uses `withZephyr` to integrate with Zephyr Cloud.

### Host (RepackApp)

- Config: `apps/RepackApp/rspack.config.mjs`
- Key parts:
  - **Name**: `RepackApp`
  - **Remotes**:
    - `ProfileRemote@<zephyr-https-url>/ProfileRemote.container.js.bundle`
    - The URL can be made configurable via `PROFILE_REMOTE_URL` env.
  - **Shared singletons**:
    - `react`, `react-native`, `react/jsx-runtime`, (and `react/jsx-dev-runtime` in dev), `react-native-svg`
  - Uses `NativeWindPlugin`, `ReanimatedPlugin`, `RepackPlugin`, and `DefinePlugin` for env vars.

### Consumption in RepackApp

- Route: `apps/RepackApp/src/screens/Profile.tsx`
- Loads `ProfileRemote/Profile` lazily:
  - Using `React.lazy(() => import('ProfileRemote/Profile'))`
  - Wrapped by `Suspense` and a custom error boundary to:
    - Show loading state
    - Display helpful errors if the remote fails to load
- Data passed into remote:
  - `userName`, `userEmail` from `@repo/stores/user`
  - `onLogout` handler that clears auth & user stores

---

## Running the apps (development)

### 1. Start Metro/Rspack dev servers via Turborepo

From **repo root**:

```bash
# Start both Android dev servers (host + remote)
pnpm dev

# Or start only host
pnpm dev:repack

# Or start only remote
pnpm dev:profile
```

These scripts call `turbo run dev:android` and filter to the desired app.

### 2. Per-app scripts

From `apps/RepackApp`:

```bash
# Metro dev server for Android (port 8081)
pnpm run dev:android

# Run Android app (connects to port 8081)
pnpm run android

# Run iOS app
pnpm run ios
```

From `apps/ProfileRemote`:

```bash
# Metro dev server for Android (port 8082)
pnpm run dev:android

# Run Android app (connects to port 8082)
pnpm run android

# Run iOS app
pnpm run ios
```

> **Note**: To test Module Federation end‑to‑end locally, you usually:
>
> - Run **ProfileRemote** locally and host its Rspack bundle
> - Point `RepackApp` remote URL to that local bundle (or to a deployed Zephyr URL).

---

## Android building & signing (RepackApp)

Android Gradle configs live under `apps/RepackApp/android`.

### Build types & signing

- `applicationId`: `com.repackapp`
- Signing:
  - **Debug**: `debug.keystore` (password/key: `android`)
  - **Release**: `my-release-key.keystore` (password: `RepackApp1234`, alias: `my-key-alias`)

### Build commands (RepackApp)

From `apps/RepackApp`:

```bash
# Clean Android build
pnpm run clean:android

# Build release APK
pnpm run build:apk
```

For details on debugging release crashes and bundle ordering, see `apps/RepackApp/DEBUG_RELEASE_APK.md`.

---

## Styling & theming

### NativeWind + Tailwind

- **Global CSS tokens**: `nativewind.css`
  - Defines CSS variables: `--color-primary`, `--color-secondary`, `--color-background`, etc.
  - Defines fonts: `--font-family-primary`, `--font-family-secondary`, `--font-family-tertiary`.
  - Includes `.dark` variants for dark mode.
- **Shared Tailwind config**: `packages/ui/tailwind.config.cjs`
  - Exposed to apps (e.g. `apps/RepackApp/tailwind.config.cjs`) via preset.

### Theme store

- Store: `@repo/stores/theme`
  - `colorScheme`: `"light" | "dark" | "system"`
  - `isDark`, `isInitialized`
  - `initializeTheme`, `setColorScheme`, `toggleTheme`
  - Persists to AsyncStorage and listens to system theme changes.
- The root `App.tsx` in `RepackApp`:
  - Waits until theme is initialized before rendering
  - Hides the splash screen (`react-native-bootsplash`) only when ready.

---

## State management

### Auth (`@repo/stores/auth`)

- `isAuthenticated` + `authHydrated` (persisted)
- `setIsAuthenticated`, `setAuthHydrated`
- Backed by AsyncStorage with partialization.

### User (`@repo/stores/user`)

- Stores the current `User` object
- `setUser`, `clearUser`
- Persisted to AsyncStorage.

### Theme (`@repo/stores/theme`)

- See **Styling & theming**.

---

## Data fetching

### React Query

- Provider: `@repo/providers/QueryProvider`
  - Wraps the app with a shared `QueryClient`.

### Axios service

- Location: `@repo/services/api`
- Uses `process.env.API_URL` as base URL (if defined).
- Helpers:
  - `GET<T>(url, config?)`
  - `POST<T, P>(url, payload, config?)`
  - `PATCH<T, P>(url, payload, config?)`

### Auth flow

- `@repo/hooks/useAuth`:
  - Uses `useMutation` to call `GET` on `API_URL + API_PATH.USER`.
  - Filters by `email` and `password`.
- `apps/RepackApp/src/screens/Login.tsx`:
  - Uses `react-hook-form` + shared `ControllerInput` component.
  - On success: sets user into `useUserStore` and `isAuthenticated` into `useAuthStore`.

---

## Navigation

### App navigation (RepackApp)

- Root navigation: `apps/RepackApp/src/navigation/index.tsx`
  - `NavigationContainer` + `NativeStackNavigator`.
  - If `isAuthenticated`:
    - Renders `TabStack` (home + profile).
  - Else:
    - Renders `LoginScreen`.

### Tab stack

- File: `apps/RepackApp/src/navigation/TabStack.tsx`
- Tabs:
  - `SCREENS.HOME` → Home screen
  - `SCREENS.PROFILE` → Profile screen (Module Federation host).
- Custom tab bar styling based on theme, with shared icons from `@repo/ui`.

## Linting & formatting

- **ESLint**:
  - Root config: `eslint.config.mts` (flat config).
  - Shared rules also via `@repo/eslint-config`.
- **Prettier**:
  - Root dev dependency.
  - `lint-staged` is configured at the root for `.js/.jsx/.ts/.tsx/.json/.md`.
- **TypeScript**:
  - Shared TS configs from `@repo/typescript-config`.

Run from root:

```bash
pnpm lint
pnpm format
```

---

## References

- [Re.Pack Documentation](https://re-pack.dev/docs/getting-started/quick-start)
- [Module Federation across Platforms](https://v4.re-pack.dev/docs/module-federation)
- [React Native](https://reactnative.dev/)
- [Zephyr Cloud](https://docs.zephyr-cloud.io/)
