import { memo } from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

// Interfaces
import { IconProps } from "@repo/interfaces/style";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

export const CartIcon = memo(
  ({
    width = 20,
    height = 20,
    disabled = false,
    isActive = false,
    color,
    style,
    onPress,
    ...props
  }: IconProps) => {
    const { theme } = useTheme();

    return (
      <TouchableOpacity
        testID="cart-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}
        {...props}
      >
        <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
          <Path
            d="M5 5H3.207A3 3 0 00.213 8.2l.6 9A3 3 0 003.807 20h12.386a3 3 0 002.994-2.8l.6-9A3 3 0 0016.793 5H15v2a1 1 0 11-2 0V5H7v2a1 1 0 01-2 0V5z"
            fill={color || (isActive ? theme.primary : theme.quaternary)}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 5a5 5 0 0110 0h-2a3 3 0 10-6 0H5z"
            fill={color || (isActive ? theme.primary : theme.quaternary)}
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);

export default CartIcon;
