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

AppRegistry.registerComponent(appName, () => App);
