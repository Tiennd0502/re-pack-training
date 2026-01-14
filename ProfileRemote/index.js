import { AppRegistry } from 'react-native';
import { ScriptManager } from '@callstack/repack/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import App from './App';
import { name as appName } from './app.json';


// if (!__DEV__) {
  ScriptManager.shared.setStorage(AsyncStorage);
// }

AppRegistry.registerComponent(appName, () => App);
