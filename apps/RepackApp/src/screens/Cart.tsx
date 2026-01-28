import { Suspense, lazy, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { shallow } from 'zustand/shallow';
import { NavigationProp } from '@react-navigation/native';

// Types
import { SCREENS } from '@/types/navigation';

// Constants
import { CURRENCY_UNIT } from '@repo/constants/common';

// Hooks | Stores
import { useTheme } from '@repo/hooks/useTheme';
import { useCartStore } from '@repo/stores/cart';

// Components
import MainLayout from '@/components/MainLayout';
import RemoteErrorBoundary from '@/components/RemoteErrorBoundary';

const CartRemoteComponent = lazy(() => import('CartRemote/Cart'));

interface CartScreenProps {
  navigation: NavigationProp<any>;
}

const CartScreen = ({ navigation }: CartScreenProps) => {
  const { theme } = useTheme();
  const [carts, totalPrice = 0, updateCartItem] = useCartStore(
    state => [state.carts, state.totalPrice, state.updateCartItem],
    shallow,
  );

  const handleGoToCheckout = useCallback(() => {
    navigation.navigate(SCREENS.SHIPPING_ADDRESS);
  }, [navigation]);

  return (
    <MainLayout>
      <RemoteErrorBoundary title="Cart">
        <Suspense
          fallback={
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color={theme.primary} />
              <Text className="mt-2 text-primary text-lg">Loading Cart...</Text>
            </View>
          }
        >
          <CartRemoteComponent
            currencyUnit={CURRENCY_UNIT}
            carts={carts}
            totalPrice={totalPrice.toString()}
            updateCartItem={updateCartItem}
            onCheckout={handleGoToCheckout}
          />
        </Suspense>
      </RemoteErrorBoundary>
    </MainLayout>
  );
};

export default CartScreen;
