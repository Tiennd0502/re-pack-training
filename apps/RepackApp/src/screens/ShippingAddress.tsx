import { Suspense, lazy, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';

// Types
import { SCREENS } from '@/types/navigation';

// Hooks | Stores
import { useTheme } from '@repo/hooks/useTheme';
import { useUserStore } from '@repo/stores/user';

// Components
import MainLayout from '@/components/MainLayout';
import RemoteErrorBoundary from '@/components/RemoteErrorBoundary';
import { useCartStore } from '@repo/stores/cart';

const RemoteComponent = lazy(
  () => import('ShippingAddressRemote/ShippingAddress'),
);

const isAndroid = Platform.OS === 'android';

interface ShippingAddressRemoteProps {
  navigation: NavigationProp<any>;
}

const ShippingAddressScreen: React.FC<ShippingAddressRemoteProps> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const user = useUserStore(state => state.user);
  const clearCart = useCartStore(state => state.clearCart);

  const handleGoToOrderCompleted = useCallback(async () => {
    Toast.show({
      type: 'success',
      text1: 'Order successfully',
      topOffset: insets.top + (isAndroid ? 10 : 0),
    });
    clearCart();

    navigation.navigate(SCREENS.ORDER_COMPLETED);
  }, [clearCart, insets.top, isAndroid, navigation]);

  return (
    <MainLayout className="flex-1">
      <ScrollView
        contentContainerClassName="flex-1 w-full px-6"
        showsVerticalScrollIndicator={false}
      >
        <RemoteErrorBoundary title="Profile">
          <Suspense
            fallback={
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color={theme.info} />
                <Text className="mt-2 text-error text-lg">
                  Loading Profile...
                </Text>
              </View>
            }
          >
            <RemoteComponent
              user={user}
              onCheckout={handleGoToOrderCompleted}
            />
          </Suspense>
        </RemoteErrorBoundary>
      </ScrollView>
    </MainLayout>
  );
};

export default ShippingAddressScreen;
