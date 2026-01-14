import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';

// Interfaces
import { SCREENS } from '@/interfaces/navigation';

// Hooks | Stores
import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/stores/auth';

// Screens
import HomeScreen from '@/screens/Home';
import LoginScreen from '@/screens/Login';

const AppStack = createNativeStackNavigator();

export const Navigation = () => {
  const { isDark, theme } = useTheme();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <KeyboardProvider>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor={theme.background}
          barStyle={isDark ? 'light-content' : 'dark-content'}
        />
        <NavigationContainer>
          <AppStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {isAuthenticated ? (
              <AppStack.Screen name={SCREENS.HOME} component={HomeScreen} />
            ) : (
              <AppStack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
            )}
          </AppStack.Navigator>
          <Toast />
        </NavigationContainer>
      </SafeAreaProvider>
    </KeyboardProvider>
  );
};
