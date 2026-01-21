import { useCallback, useMemo } from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

// Interfaces
import { SCREENS } from '@/interfaces/navigation';
import { Product } from '@repo/interfaces/product';
import { DIRECTION } from '@repo/interfaces/style';

// Constants
import { INIT_PAGE } from '@repo/constants/common';

// Hooks | Stores
import { useProducts } from '@repo/hooks/useProducts';
import { useUserStore } from '@repo/stores/user';

// Utils
import { getData } from '@repo/utils/common';

// Components
import MainLayout from '@/components/MainLayout';
import ChevronIcon from '@repo/ui/components/Icons/ChevronIcon';
import ProductCard, { ProductCardType } from '@repo/ui/components/ProductCard';
import Skeleton from '@repo/ui/components/Skeleton';

const { width: screenWidth } = Dimensions.get('window');

const ProductsScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const user = useUserStore(state => state.user);
  const { useFetchProducts } = useProducts();
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useFetchProducts(INIT_PAGE);

  const pages = useMemo(() => data?.pages || [], [data?.pages]);
  const products = useMemo(
    () => (pages.length > 0 && getData<Product>(pages as never[])) || [],
    [pages],
  );

  const width = (screenWidth - 72) / 2;
  const height = 276;

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

  const renderItem = useCallback(
    ({ item }: { item: Product }) => {
      const isFavorite = user?.favorites?.includes(item.id);
      return (
        <View
          key={item.id}
          className="w-full"
          style={{
            width,
            overflow: 'hidden',
          }}
        >
          <ProductCard
            item={item}
            type={ProductCardType.Primary}
            height={height}
            isFavorite={isFavorite}
            onPress={handlePressProduct}
          />
        </View>
      );
    },
    [width, height, handlePressProduct, user?.favorites],
  );

  const renderFooter = useCallback(() => {
    if (isFetchingNextPage || isLoading) {
      return (
        <View className="flex-row flex-wrap justify-between" style={{ height }}>
          <Skeleton width={width} height={height} />
          <Skeleton width={width} height={height} />
        </View>
      );
    }
    return null;
  }, [isFetchingNextPage, isLoading, width, height]);

  const renderItemSeparatorComponent = useCallback(() => {
    return <View className={`w-6 max-h-[${height}px] bg-blue-500`} />;
  }, [height]);

  const renderEmpty = useCallback(
    () => (isLoading ? null : <Text>Product Empty</Text>),
    [isLoading],
  );

  const getKeyExtractor = useCallback((item: Product) => item.id, []);

  const handleShowFilter = useCallback(() => {}, []);

  return (
    <MainLayout>
      <View className="flex-row justify-between my-5 px-6">
        <Text className="text-xl font-bold">{`Found ${products?.length || 0} Results`}</Text>
        <TouchableOpacity
          disabled
          activeOpacity={0.6}
          onPress={handleShowFilter}
        >
          <View className="flex-row justify-center items-center gap-2 rounded-full w-24 h-10 border-2 border-quaternary">
            <Text>Filter</Text>
            <ChevronIcon direction={DIRECTION.DOWN} />
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-6 w-full h-full">
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={getKeyExtractor}
          numColumns={2}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={renderItemSeparatorComponent}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 24,
          }}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </MainLayout>
  );
};

export default ProductsScreen;
