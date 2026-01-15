# Overview

This repo contains a React Native proof-of-concept that mirrors the MoMo wallet home screen while demonstrating **Re.Pack** features:

- Code-splitting via `React.lazy` + Suspense.
- Remote “mini apps” shipped as standalone bundles.
- Script runtime that resolves chunks from dev server or CDN.
- Shared React/React Native singletons to avoid duplicate runtimes.
- Apply UI framework [Nativewind](https://www.nativewind.dev/)

## Project Structure

```
RePackApp
├── android                # Android-specific files
├── ios                    # iOS-specific files
├── src
│   ├── assets             # Assets (images, fonts, etc.)
│   ├── components         # Reusable components
│   ├── constants          # Constant values used throughout the app
│   ├── hooks              # Custom hooks
│   ├── interfaces         # TypeScript interfaces and types
│   ├── navigation         # Navigation configuration
│   ├── screens            # Screen components
│   │   └── Profile        # Remote mini app #1
│   ├── services           # API services
│   └── utils              # Utility functions
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
├── app.json               # App configuration
├── App.tsx                # Main App component
├── babel.config.js        # Babel configuration
├── index.js               # ScriptManager resolver
├── jest.config.js         # Jest configuration
├── nativewind.css         # Nativewind config
├── package.json           # Project dependencies
├── package.json           # Project dependencies
├── react-native.config.js # Custom configuration for React Native CLI
├── rspack.config.mjs      # Re.Pack + Rspack config
├── tailwind.config.cjs    # Tailwind config
└── tsconfig.json          # TypeScript configuration file
```

## Prerequisites

- Node.js ≥ 18, PNPM ≥ 8
- Android Studio / Xcode with React Native toolchain
- Java 17 (Android Gradle plugin requirement)
- Cursor (AI code editor)

Install dependencies:

```bash
pnpm install
```

## Development Workflow

1. **Start Re.Pack dev server**
   ```bash
   pnpm start
   ```
2. **Launch Android**
   ```bash
   pnpm android
   ```
   or open the native project in Android Studio / Xcode.

In dev mode `ScriptManager` always serves chunks from the running Rspack server, so the remote bundles in `build/` are not required.

## Production Bundles

Generate production JS artifacts (host + remotes):

```bash
pnpm build:android
```

Outputs land in `build/output/android/`

### Publishing Remote Mini Apps

1. Upload each chunk bundle (and optional `.map`) to your CDN/edge.
2. Update `index.js` resolver:
   ```js
   url: Script.getRemoteURL(`https://cdn.your-domain.com/repack/${remotePath}`);
   ```
3. Rebuild native release binaries so they reference the new URL.

If you want to embed remotes locally instead of fetching from the network, swap the resolver to `Script.getFileSystemURL`.

## Building the APK / AAB

1. Create a keystore and add credentials to `android/gradle.properties`.
2. Wire signing info in `android/app/build.gradle`.
3. Assemble release:
   ```bash
   pnpm android:apk   # app-release.apk
   ```

⚠️ The release build expects those remote bundles to be reachable at the URL you configure; otherwise mini apps will fail to load.

## How Code-Splitting Works Here

1. `Profile` screen import mini app with `React.lazy` and chunk names.
2. When a user taps a mini app tile, Suspense triggers loading of that chunk.
3. `ScriptManager` resolves the request:
   - Dev → fetch from local Rspack server.
   - Prod → fetch from CDN path.
4. Chunk executes, exporting the React component that renders inside `Profile`.

## Troubleshooting

- “property is not configurable” in production: ensure React/React Native are marked as shared singletons (`rspack.config.mjs` handles this).
- Suspense fallback never resolves in release builds: check the resolver URL and CDN deployment of remote bundles.
- Animated worklets fail: verify the `ReanimatedPlugin` is enabled in the config.

## Useful Commands

| Command                     | Description                                 |
| --------------------------- | ------------------------------------------- |
| `pnpm start`                | Launch Re.Pack dev server (in RepackApp)    |
| `pnpm android` / `pnpm ios` | Run native apps in debug mode               |
| `pnpm android:build`        | Emit production JS bundles (host + remotes) |
| `pnpm build:apk`            | Build signed Android APK                    |

## References

- [Re.Pack Documentation](https://re-pack.dev/docs/getting-started/quick-start)
- [Module Federation across Platforms](https://v4.re-pack.dev/docs/module-federation)
- [React Native](https://reactnative.dev/)
