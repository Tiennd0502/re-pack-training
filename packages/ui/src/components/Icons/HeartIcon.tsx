import { memo } from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

// Interfaces
import { IconProps } from "@repo/types/style";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

export const HeartIcon = memo(
  ({
    width = 17,
    height = 15,
    color,
    disabled = false,
    isActive = false,
    onPress,
  }: IconProps) => {
    const { theme } = useTheme();

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
      >
        <Svg width={width} height={height} viewBox="0 0 17 15" fill="none">
          <Path
            d="M8.504 14.6l-1.178-1.037C3.154 9.9.4 7.481.4 4.516a4.159 4.159 0 01.328-1.658c.221-.526.55-1.004.964-1.406.415-.402.908-.72 1.451-.935A4.536 4.536 0 014.854.2a4.984 4.984 0 012.009.436c.63.283 1.19.693 1.641 1.203.451-.51 1.01-.919 1.638-1.202A4.98 4.98 0 0112.145.2a4.536 4.536 0 011.712.317 4.425 4.425 0 011.45.935c.415.402.743.88.965 1.406a4.16 4.16 0 01.328 1.658c0 2.965-2.754 5.384-6.926 9.056L8.504 14.6z"
            fill={(color ?? isActive) ? theme.error : theme.primary}
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);
