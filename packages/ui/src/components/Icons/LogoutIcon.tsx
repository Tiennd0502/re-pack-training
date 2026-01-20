import { memo } from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

// Interfaces
import { IconProps } from "@repo/interfaces/style";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

export const LogoutIcon = memo(
  ({
    width = 21,
    height = 21,
    color,
    disabled = false,
    style,
    onPress,
  }: IconProps) => {
    const { theme } = useTheme();

    return (
      <TouchableOpacity
        testID="logout-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}
      >
        <Svg width={width} height={height} viewBox="0 0 21 21" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.658 8.826a.674.674 0 00-.685.674.68.68 0 00.685.674H13v4.182c0 2.144-1.772 3.894-3.962 3.894H4.703C2.522 18.25.75 16.509.75 14.365V4.644C.75 2.49 2.53.75 4.712.75h4.344C11.228.75 13 2.491 13 4.635v4.191H7.658zm8.518-2.353l2.555 2.546a.668.668 0 010 .954l-2.555 2.546a.678.678 0 01-.472.201.676.676 0 01-.481-1.155l1.4-1.391H13V8.826h3.623l-1.4-1.39a.676.676 0 010-.955.668.668 0 01.953-.008z"
            fill={color || theme.primary}
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);
