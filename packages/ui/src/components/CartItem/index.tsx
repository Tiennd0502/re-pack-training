import { memo } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { twMerge } from "tailwind-merge";

// Interfaces
import { Cart } from "@repo/types/cart";

// Constants
import { CURRENCY_UNIT } from "@repo/constants/common";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

// Components
import Quantity from "../Quantity";
import Checkbox from "../Checkbox";

interface CartItemProps extends Cart {
  isChecked: boolean;
  onChangeChecked: () => void;
  onChangeQuantity: (quantity: number) => void;
  className?: string;
}

const CartItem = ({
  product,
  quantity,
  isChecked,
  sizes,
  colors,
  onChangeChecked,
  onChangeQuantity,
  className,
}: CartItemProps) => {
  const { theme } = useTheme();
  const { name = "", image = "", price = "" } = product || {};

  const wrapperClassName = twMerge(
    "h-[99px] flex-row rounded-[25px] shadow-lg bg-background",
    className,
  );

  return (
    <View
      className={wrapperClassName}
      style={[styles.boxShadow, { shadowColor: theme.primary }]}
    >
      <Image
        className="rounded-l-[20px] bg-secondary"
        source={{
          uri: image,
          width: 99,
          height: 99,
        }}
      />
      <View className="flex-1 flex-row justify-between h-full pt-4 pb-[13px] pl-[13px] pr-5 rounded-r-[20px]">
        <View className="flex-1 justify-between">
          <Text
            className="text-xs font-primary text-primary capitalize"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {name}
          </Text>
          <Text
            className="text-sm font-primary text-primary"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {`${CURRENCY_UNIT} ${price}`}
          </Text>
          <Text
            className="text-xs text-primary capitalize"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {`Size: ${sizes} | Color: ${colors}`}
          </Text>
        </View>
        <View className="justify-between items-end mr-0">
          <Checkbox
            size={14}
            selected={isChecked}
            onValueChange={onChangeChecked}
          />
          <Quantity defaultValue={quantity} onChangeValue={onChangeQuantity} />
        </View>
      </View>
    </View>
  );
};

export default memo(CartItem);

const styles = StyleSheet.create({
  boxShadow: {
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
});
