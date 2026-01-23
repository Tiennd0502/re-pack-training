import { memo } from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

// Interfaces
import { IconProps } from "@repo/types/style";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

export const PencilIcon = memo(
  ({
    width = 16,
    height = 16,
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
        testID="pencil-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}
        {...props}
      >
        <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
          <Path
            d="M11.333 2a1.414 1.414 0 0 1 2 2L5.333 12l-3 1 1-3L11.333 2z"
            stroke={color || (isActive ? theme.primary : theme.quaternary)}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);

export default PencilIcon;
