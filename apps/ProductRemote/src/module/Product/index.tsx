import { useCallback } from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Interfaces
import { Product } from '@repo/types/product';
import { DIRECTION } from '@repo/types/style';
import { User } from '@repo/types/user';

// Components
import ChevronIcon from '@repo/ui/components/Icons/ChevronIcon';
import ProductCard, { ProductCardType } from '@repo/ui/components/ProductCard';
import Skeleton from '@repo/ui/components/Skeleton';

const { width: screenWidth } = Dimensions.get('window');

interface ProductsProps {
  isLoading: boolean;
  products: Product[];
  user: User;
  onPressItem: (product: Product) => void;
  onLoadMore: () => void;
}

const Products: React.FC<ProductsProps> = ({
  products = [],
  user,
  onPressItem,
  onLoadMore,
  isLoading,
}) => {
  const width = (screenWidth - 72) / 2;
  const height = 276;

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
            onPress={onPressItem}
          />
        </View>
      );
    },
    [width, height, onPressItem, user?.favorites],
  );

  const renderFooter = useCallback(() => {
    if (isLoading) {
      return (
        <View className="flex-row flex-wrap justify-between" style={{ height }}>
          <Skeleton width={width} height={height} />
          <Skeleton width={width} height={height} />
        </View>
      );
    }
    return null;
  }, [isLoading, width, height]);

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
    <>
      <View className="flex-row justify-between py-4 px-6">
        <Text className="text-xl text-primary font-bold">{`Found ${products?.length || 0} Results`}</Text>
        <TouchableOpacity
          disabled
          activeOpacity={0.6}
          onPress={handleShowFilter}
        >
          <View className="flex-row justify-center items-center gap-2 rounded-full w-24 h-10 text-primary">
            <Text className="text-sm font-primary text-quaternary">Filter</Text>
            <ChevronIcon
              className="text-quaternary"
              direction={DIRECTION.DOWN}
              disabled
            />
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-6 w-full h-full">
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={getKeyExtractor}
          numColumns={2}
          onEndReached={onLoadMore}
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
    </>
  );
};

export default Products;
