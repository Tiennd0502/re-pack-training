import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';

// Interfaces
import { SCREENS } from '@/types/navigation';

// Hooks | Stores
import { useTheme } from '@repo/hooks/useTheme';
import { useAuthStore } from '@repo/stores/auth';

// Screens
import TabStack from './TabStack';
import LoginScreen from '@/screens/Login';
import ProductsScreen from '@/screens/Products';
import ProductDetailScreen from '@/screens/ProductDetail';

const AppStack = createNativeStackNavigator();

export const Navigation = () => {
  const { isDark, theme } = useTheme();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
      <StatusBar
        backgroundColor={theme.background}
        // backgroundColor="transparent"
        translucent={true}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer>
        <AppStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {isAuthenticated ? (
            <>
              <AppStack.Screen name={SCREENS.TABS} component={TabStack} />
              <AppStack.Screen
                name={SCREENS.PRODUCTS}
                component={ProductsScreen}
              />

              <AppStack.Screen
                name={SCREENS.PRODUCT_DETAIL}
                component={ProductDetailScreen}
              />
            </>
          ) : (
            <AppStack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
          )}
        </AppStack.Navigator>
        <Toast />
      </NavigationContainer>
    </KeyboardProvider>
  );
};
