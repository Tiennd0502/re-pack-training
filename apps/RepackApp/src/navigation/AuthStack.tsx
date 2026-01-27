import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Interfaces
import { SCREENS } from '@/types/navigation';

// Screens
import LoginScreen from '@/screens/Login';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
  </Stack.Navigator>
);

export default AuthStack;
