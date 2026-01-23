import { memo } from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

// Interfaces
import { IconProps } from "@repo/types/style";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

export const UserIcon = memo(
  ({
    width = 20,
    height = 24,
    color = "",
    disabled = false,
    isActive = false,
    onPress,
  }: IconProps) => {
    const { theme } = useTheme();

    return (
      <TouchableOpacity
        testID="user-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
      >
        <Svg width={width} height={height} viewBox="0 0 20 24" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.783 18.892c0 3.846-5.462 4.29-9.57 4.29H9.92c-2.617-.006-9.277-.166-9.277-4.313 0-3.767 5.242-4.27 9.318-4.29h.547c2.616.006 9.275.166 9.275 4.313zm-9.57-2.563c-5.148 0-7.758.854-7.758 2.54 0 1.701 2.61 2.563 7.759 2.563 5.147 0 7.756-.854 7.756-2.54 0-1.7-2.609-2.563-7.756-2.563zm0-16.329c3.539 0 6.416 2.779 6.416 6.195 0 3.416-2.877 6.194-6.415 6.194h-.039c-3.53-.01-6.39-2.79-6.379-6.197C3.796 2.778 6.675 0 10.214 0zm0 1.666c-2.586 0-4.691 2.031-4.691 4.529-.009 2.49 2.08 4.52 4.657 4.529l.035.833v-.833c2.586 0 4.69-2.032 4.69-4.529 0-2.498-2.104-4.529-4.69-4.529z"
            fill={color || (isActive ? theme.primary : theme.quaternary)}
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);

export default UserIcon;
