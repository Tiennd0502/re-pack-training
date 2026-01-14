import { AppRegistry } from 'react-native';
import { ScriptManager, Script } from '@callstack/repack/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App from './App';
import { name as appName } from './app.json';

// Initialize Reactotron in development mode
if (__DEV__) {
  require('./ReactotronConfig');
}

ScriptManager.shared.setStorage(AsyncStorage);

// ScriptManager resolver chỉ chạy khi có code gọi ScriptManager.loadScript(scriptId)
// Module Federation resolve remote modules tại build time, KHÔNG qua ScriptManager
ScriptManager.shared.addResolver(async scriptId => {
  console.log('[ScriptManager] Resolver called for scriptId:', scriptId);

  // Note: ProfileRemote is handled by Module Federation, not ScriptManager
  // Module Federation automatically resolves remote modules via rspack config
  // Resolver này chỉ dùng cho dynamic script loading (nếu có)

  // In dev mode, resolve script location to dev server.
  if (__DEV__) {
    return {
      url: Script.getDevServerURL(scriptId),
      cache: false,
    };
  }

  return {
    url: Script.getRemoteURL(
      `http://somewhere-on-the-internet.com/${scriptId}`,
    ),
  };
});

console.log(
  '[ScriptManager] Resolver registered (will only run when ScriptManager.loadScript() is called)',
);

AppRegistry.registerComponent(appName, () => App);
