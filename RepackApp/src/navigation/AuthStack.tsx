import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Interfaces

// Screens
import LoginScreen from '@/screens/Login';
import { SCREENS } from '@/interfaces/navigation';

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
