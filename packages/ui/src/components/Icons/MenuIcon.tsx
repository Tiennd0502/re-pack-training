import { memo } from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

// Interfaces
import { IconProps } from "@repo/types/style";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

export const MenuIcon = memo(
  ({
    width = 20,
    height = 20,
    color,
    disabled = false,
    style,
    onPress,
  }: IconProps) => {
    const { theme } = useTheme();

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}
      >
        <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
          <Path
            d="M1 1.5h10M1 9.5h18M1 18.5h18"
            stroke={color || (disabled ? theme.quaternary : theme.primary)}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);

export default MenuIcon;
