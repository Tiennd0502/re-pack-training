import Reactotron from 'reactotron-react-native';
import { name as appName } from './app.json';

// Only import Reactotron in development mode
if (__DEV__) {
  Reactotron.configure({ name: appName })
    .useReactNative({
      networking: {
        ignoreUrls: /symbolicate/,
      },
    })
    .connect();
}

export default {};
