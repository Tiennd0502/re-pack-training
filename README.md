# React Native Micro-Frontend with Re.Pack

A React Native micro-frontend architecture demonstration using **Re.Pack** builder and **React Native CLI**. This repo contains a host application (`RepackApp`) that dynamically loads remote mini-apps (`Profile`) using Module Federation.

## Project Structure

```
re-pack-training/
├── RepackApp/               # Host application (shell)
│   ├── src/
│   │   ├── App.tsx          # Main host app entry
│   │   ├── screens/         # Host UI screens
│   │   └── components/      # Shared components
│   ├── index.js             # ScriptManager resolver
│   └── rspack.config.mjs
│
└── ProfileRemote/            # Remote mini-app
    ├── src/module/Profile/
    └── rspack.config.mjs
```

## Features

- **Code-splitting** via `React.lazy` + Suspense
- **Remote mini-apps** shipped as standalone bundles
- **Module Federation** for dynamic loading
- **Shared React/React Native singletons** to avoid duplicate runtimes
- **Re.Pack builder** with Rspack for fast builds
- **React Native CLI** (not Expo) for native development
- **Apply UI framework Nativewind** 

## Prerequisites

- **Node.js** ≥ 20
- **PNPM** ≥ 7.32.2
- **Android Studio** / **Xcode** with React Native toolchain
- **Java 17** (required for Android Gradle plugin)
- **Cursor**(AI code editor)

## Installation

Install dependencies for all projects:

```bash
# Clone the repository
git clone -b feature/flux-store git@gitlab.asoft-python.com:tien.nguyen/re-pack-training.git

# Move to folder
cd re-pack-training

# Install dependencies for host app
cd RepackApp
pnpm install

# Install dependencies for each mini-app
cd ProfileRemote && pnpm install
```

## Development Workflow

### 1. Start the Host App (RepackApp)

```bash
cd RepackApp

# Start Re.Pack dev server
pnpm start

# In another terminal, launch Android
pnpm android

# Or launch iOS
pnpm ios
```

### 2. Build Mini-Apps (Optional - for standalone testing)

Each mini-app can be built independently:

```bash
# Build ProfileRemote mini-app
cd ProfileRemote
pnpm build:android

### Building Native Release Binaries

#### Android (APK / AAB)

1. Create a keystore and add credentials to `RepackApp/android/gradle.properties`
2. Configure signing in `RepackApp/android/app/build.gradle`
3. Assemble release:
   
  cd RepackApp
  pnpm android:apk   # app-release.apk


⚠️ **Note**: Release builds expect remote bundles to be reachable at the configured URL; otherwise mini-apps will fail to load.

## How It Works

1. **Host App** (`RepackApp`) imports mini-apps using `React.lazy` with chunk names
2. When a user interacts with a mini-app tile, **Suspense** triggers loading of that chunk
3. Chunk executes and exports the React component that renders inside the host

## Troubleshooting

- **"property is not configurable" in production**: Ensure React/React Native are marked as shared singletons in `rspack.config.mjs`
- **Suspense fallback never resolves in release builds**: Check the resolver URL and CDN deployment of remote bundles
- **Animated worklets fail**: Verify the `ReanimatedPlugin` is enabled in the Rspack config
- **"undefined is not a function" during JSX rendering**: Do not wrap the host configuration with `withZephyr()` like `withZephyr()(config)`. This will automatically deploy the host and use local chunks deployed on Zephyr, which is not intended for release mode. Only use `withZephyr` for remote mini-app configurations, not the host app.

## Useful Commands

| Command                      | Description                                 |
| ---------------------------- | ------------------------------------------- |
| `pnpm start`                 | Launch Re.Pack dev server (in RepackApp)    |
| `pnpm android` / `pnpm ios`  | Run native apps in debug mode               |
| `pnpm build:android`         | Emit production JS bundles (host + remotes) |
| `pnpm build:apk`             | Build signed Android APK                    |

## References

- [Re.Pack Documentation](https://re-pack.dev/docs/getting-started/quick-start)
- [Module Federation across Platforms](https://v4.re-pack.dev/docs/module-federation)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Rspack Documentation](https://rspack.dev/)
