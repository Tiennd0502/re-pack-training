import { Suspense, lazy, useCallback, useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

// Types
import { SCREENS } from '@/types/navigation';
import { Product } from '@repo/types/product';

// Constants
import { INIT_PAGE } from '@repo/constants/common';

// Utils
import { getData } from '@repo/utils/common';

// Hooks | Stores
import { useTheme } from '@repo/hooks/useTheme';
import { useUserStore } from '@repo/stores/user';
import { useProducts } from '@/hooks/useProducts';

// Components
import MainLayout from '@/components/MainLayout';
import RemoteErrorBoundary from '@/components/RemoteErrorBoundary';

const RemoteComponent = lazy(() => import('ProductRemote/Product'));

interface ProfileRemoteProps {
  navigation: NavigationProp<any>;
}

const ProductsScreen = ({ navigation }: ProfileRemoteProps) => {
  const { theme } = useTheme();
  const user = useUserStore(state => state.user);
  const { useFetchProducts } = useProducts();
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useFetchProducts(INIT_PAGE);

  const pages = useMemo(() => data?.pages || [], [data?.pages]);
  const products = useMemo(
    () => (pages.length > 0 && getData<Product>(pages as never[])) || [],
    [pages],
  );

  const handlePressProduct = useCallback(
    (product: Product) => {
      navigation.navigate(SCREENS.PRODUCT_DETAIL, { id: product.id });
    },
    [navigation],
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  return (
    <MainLayout className="flex-1">
      <RemoteErrorBoundary>
        <Suspense
          fallback={
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color={theme.info} />
              <Text className="mt-2 text-primary text-lg">
                Loading Products...
              </Text>
            </View>
          }
        >
          <RemoteComponent
            products={products}
            user={user}
            onPressItem={handlePressProduct}
            onLoadMore={handleLoadMore}
            isLoading={isLoading || isFetchingNextPage}
          />
        </Suspense>
      </RemoteErrorBoundary>
    </MainLayout>
  );
};

export default ProductsScreen;
