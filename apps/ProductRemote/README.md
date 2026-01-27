# ProductRemote

ProductRemote is a **Module Federation remote application** built with React Native and Re.Pack. It exposes a Product module that can be dynamically loaded and consumed by the host application (`RepackApp`) at runtime.

## Overview

- **Type**: Module Federation Remote
- **Framework**: React Native 0.81.5 with Re.Pack 5.2.3
- **Purpose**: Exposes a reusable Product component that can be consumed by other apps in the monorepo
- **Deployment**: Hosted on Zephyr Cloud for production remote loading

## App Structure

```
ProductRemote/
├── android/                 # Android native code
├── ios/                     # iOS native code
├── src/
│   └── module/
│       └── Product/
│           └── index.tsx    # Exposed Product component
├── App.tsx                  # Standalone app wrapper (dev/testing)
├── index.js                 # Entry point with ScriptManager setup
├── rspack.config.mjs        # Re.Pack & Module Federation config
├── babel.config.js          # Babel configuration
├── tailwind.config.cjs      # Tailwind CSS configuration
└── package.json             # Dependencies and scripts
```

## Getting started

### Make sure you install packages with correct version below:

- node [v20.19.4](https://nodejs.org/en/download)
- pnpm [v7.32.2](https://pnpm.io/)

### All commands are run from the root folder, from a terminal:

| Command                      | Action                                   |
| :--------------------------- | :--------------------------------------- |
| `pnpm run dev:product`       | Metro dev server for Android (port 8083) |
| `pnpm run android`           | Run Android app (connects to port 8083)  |
| `pnpm run build:product:apk` | Build release APK                        |

## References

- [Re.Pack Documentation](https://re-pack.dev/)
- [Module Federation for React Native](https://re-pack.dev/docs/features/module-federation)
- [Zephyr Cloud](https://docs.zephyr-cloud.io/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [React Native Documentation](https://reactnative.dev/)
