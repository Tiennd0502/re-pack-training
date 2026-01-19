import { memo } from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

// Interfaces
import { IconProps } from "@repo/interfaces/style";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

const FacebookIcon = memo(
  ({ width = 42, height = 42, disabled = false, onPress }: IconProps) => {
    const { theme } = useTheme();

    return (
      <TouchableOpacity
        testID="facebook-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
      >
        <Svg width={width} height={height} viewBox="0 0 42 42" fill="none">
          <Rect
            opacity={0.14}
            x={0.5}
            y={0.5}
            width={41}
            height={41}
            rx={20.5}
            fill={theme.background}
            stroke={theme.primary}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.136 31v-9.276H15V17.86h3.136v-3.092c0-3.195 2.051-4.767 4.942-4.767 1.384 0 2.575.102 2.922.147v3.339h-2.005c-1.572 0-1.939.738-1.939 1.819v2.554h3.92l-.784 3.864h-3.136L22.12 31"
            fill="#3266CE"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.136 31v-9.276H15V17.86h3.136v-3.092c0-3.195 2.051-4.767 4.942-4.767 1.384 0 2.575.102 2.922.147v3.339h-2.005c-1.572 0-1.939.738-1.939 1.819v2.554h3.92l-.784 3.864h-3.136L22.12 31"
            fill="#3266CE"
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);

export default FacebookIcon;
