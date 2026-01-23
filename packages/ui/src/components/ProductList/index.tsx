import { memo, useCallback, useMemo } from "react";
import { FlatList, View } from "react-native";

// Interfaces
import { Product } from "@repo/types/product";
import ProductCard, { ProductCardType } from "../ProductCard";
import Skeleton from "../Skeleton";

// Components
interface ProductListProps {
  data: Product[];
  productCardType?: ProductCardType;
  isLoading?: boolean;
  itemSpacing?: number;
  onPressItem: (item: Product) => void;
  onLoadMore: () => void;
}

const ProductList = ({
  data,
  productCardType = ProductCardType.Primary,
  isLoading = false,
  onPressItem,
  onLoadMore,
}: ProductListProps) => {
  const isTertiary = productCardType === ProductCardType.Tertiary;

  const cardDimensions = useMemo(
    () => ({
      width: isTertiary ? 126 : 203,
      height: isTertiary ? 227 : 66,
    }),
    [isTertiary],
  );

  const renderItemProduct = useCallback(
    ({ item, index }: { item: Product; index: number }) => {
      return (
        <View key={index + item.id}>
          <ProductCard
            width={cardDimensions.width}
            height={cardDimensions.height}
            item={item}
            type={productCardType}
            onPress={onPressItem}
          />
        </View>
      );
    },
    [cardDimensions, productCardType, onPressItem],
  );

  const renderListFooterComponent = useMemo(() => {
    if (isLoading) {
      return (
        <View
          className={`flex-row gap-6 mx-${data?.length ? 6 : 0} h-[${
            cardDimensions.height
          }px]`}
        >
          {[...Array(3).keys()].map((item) => (
            <Skeleton
              key={item}
              width={cardDimensions.width}
              height={cardDimensions.height}
            />
          ))}
        </View>
      );
    }

    return <View className={`w-6 h-[${cardDimensions.height}px]`} />;
  }, [isLoading, cardDimensions.height, cardDimensions.width, data?.length]);

  const renderItemSpacingComponent = useCallback(
    () => <View className="w-6" />,
    [],
  );

  const getKeyExtractor = useCallback(({ id }: Product) => id, []);

  return (
    <FlatList
      data={data}
      extraData={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={renderItemSpacingComponent}
      ListFooterComponent={renderListFooterComponent}
      keyExtractor={getKeyExtractor}
      renderItem={renderItemProduct}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.1}
      ItemSeparatorComponent={renderItemSpacingComponent}
    />
  );
};

export default memo(ProductList);
