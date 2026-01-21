// if (!__DEV__) {
//   const defaultHandler =
//     (globalThis)?.ErrorUtils?.getGlobalHandler?.();

// 		globalThis.nativeLoggingHook?.(
// 			`publicPath=${__webpack_public_path__}`,
// 			1
// 		);

//   (globalThis).ErrorUtils?.setGlobalHandler?.(
//     (error, isFatal) => {
//       globalThis.nativeLoggingHook?.(
//         '🔥 RELEASE JS ERROR (HOST)' + error?.message ?? 'Host error',
//         1
//       );
//       defaultHandler?.(error, isFatal);
//     }
//   );
// }

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { ScriptManager } from '@callstack/repack/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App from './App';
import { name as appName } from './app.json';

// Initialize Reactotron in development mode
if (__DEV__) {
  require('./ReactotronConfig');
}
if (!__DEV__) {
  ScriptManager.shared.setStorage(AsyncStorage);
}

AppRegistry.registerComponent(appName, () => App);
