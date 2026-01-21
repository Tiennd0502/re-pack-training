import { memo, useCallback, useMemo } from "react";
import {
  DimensionValue,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { twMerge } from "tailwind-merge";

// Interfaces
import { Product } from "@repo/interfaces/product";

// Constants
import { CURRENCY_UNIT } from "@repo/constants/common";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

// Components
import Rating from "../Rating";
import { HeartIcon } from "../Icons/HeartIcon";

export enum ProductCardType {
  Primary = "primary",
  Secondary = "secondary",
  Tertiary = "tertiary",
}

export interface ProductCardProps {
  item: Product;
  isFavorite?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
  type?: ProductCardType;
  onPress?: (item: Product) => void;
  className?: string;
}

const ProductCard = ({
  item,
  isFavorite = false,
  width = "100%",
  height = "100%",
  type = ProductCardType.Primary,
  onPress,
  className,
}: ProductCardProps) => {
  const { theme } = useTheme();

  const {
    image = "",
    name = "",
    price: priceStr = "0",
    discount = 0,
    rating = 0,
    reviewCount = 0,
  } = item || {};
  const price =
    typeof priceStr === "string" ? parseFloat(priceStr) || 0 : priceStr;
  const isSecondaryType = type === ProductCardType.Secondary;
  const isPrimaryType = type === ProductCardType.Primary;
  const isTertiaryType = type === ProductCardType.Tertiary;

  const imageSize = useMemo(() => {
    switch (type) {
      case ProductCardType.Secondary: {
        return {
          width: 66,
          height: height,
        };
      }

      case ProductCardType.Tertiary: {
        return {
          width: width,
          height: 172,
        };
      }

      case ProductCardType.Primary:
      default: {
        return {
          width: width,
          height: 200,
        };
      }
    }
  }, [type, height, width]);

  const wrapperClassName = useMemo(
    () =>
      twMerge(
        "bg-background gap-[10px] overflow-hidden",
        isSecondaryType && "flex-row gap-2 border border-border-secondary",
        isSecondaryType || isTertiaryType ? "rounded-md" : "rounded-lg",
        className,
      ),
    [isSecondaryType, isTertiaryType, className],
  );
  const themeStyles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          width,
          height,

          ...(isSecondaryType && {
            borderColor: theme.septenary,
          }),
        },
      }),
    [theme, isSecondaryType, width, height],
  );

  const imageClassName = useMemo(
    () =>
      twMerge(
        "w-full h-full block object-cover object-center overflow-hidden",
        isTertiaryType ? "-top-1 rounded-md" : "top-0 -left-1",
        isPrimaryType && "top-0 left-0",
      ),
    [isTertiaryType, isPrimaryType],
  );

  const priceContainerClassName = useMemo(
    () =>
      twMerge("flex-row items-center", isSecondaryType ? "mt-2" : "mt-[10px]"),
    [isSecondaryType],
  );

  const { originalPrice, promoPrice } = useMemo(() => {
    const formatAmount = (amount: number) => {
      return amount.toFixed(2);
    };
    return {
      promoPrice: discount ? formatAmount((price * (100 - discount)) / 100) : 0,
      originalPrice: formatAmount(price),
    };
  }, [price, discount]);

  const handlePressCard = useCallback(() => {
    onPress?.(item);
  }, [item, onPress]);

  return (
    <TouchableOpacity
      className={wrapperClassName}
      style={themeStyles.wrapper}
      activeOpacity={0.8}
      onPress={handlePressCard}
    >
      <View
        className="relative overflow-hidden"
        style={{ width: imageSize.width, height: imageSize.height }}
      >
        <Image
          className={imageClassName}
          src={image}
          style={{ width: imageSize.width, height: imageSize.height }}
          source={{ uri: image }}
          resizeMode="cover"
        />

        {type === ProductCardType.Primary && (
          <View className="w-[27px] h-[27px] rounded-full absolute top-[10px] right-[10px] justify-center items-center bg-background-icon">
            <HeartIcon isActive={isFavorite} color={theme.favorite} />
          </View>
        )}
      </View>
      <View className="justify-center">
        <Text className="text-xs font-primary font-semibold text-primary">
          {name}
        </Text>
        <View className={priceContainerClassName}>
          <Text className="text-sm font-primary font-bold text-primary">
            {`${CURRENCY_UNIT} ${promoPrice || originalPrice}`}
          </Text>
          {!!promoPrice && (
            <Text className="ml-2 text-xs font-primary text-septenary line-through">{`${CURRENCY_UNIT} ${originalPrice}`}</Text>
          )}
        </View>
        {isPrimaryType && (
          <View className="flex-row items-center mt-1">
            <Rating value={rating} />
            <Text className="text-[10px] text-primary">{` (${reviewCount})`}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(ProductCard);
