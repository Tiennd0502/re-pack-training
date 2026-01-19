import { memo } from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

// Interfaces
import { IconProps } from "@repo/interfaces/style";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

export const AddressIcon = memo(
  ({
    width = 15,
    height = 19,
    color = "",
    disabled = false,
    isActive = false,
    style,
    onPress,
  }: IconProps) => {
    const { theme } = useTheme();

    return (
      <TouchableOpacity
        testID="address-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}
      >
        <Svg width={width} height={height} viewBox="0 0 15 19" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M.063 8.028C.063 4.003 3.425.75 7.494.75c4.08 0 7.444 3.253 7.444 7.278 0 2.028-.738 3.911-1.952 5.507a19.306 19.306 0 01-4.849 4.498c-.425.279-.809.3-1.275 0a18.935 18.935 0 01-4.848-4.498C.8 11.94.063 10.056.063 8.028zm4.982.227c0 1.348 1.1 2.409 2.45 2.409s2.46-1.061 2.46-2.41c0-1.337-1.11-2.45-2.46-2.45a2.462 2.462 0 00-2.45 2.45z"
            fill={color ?? (isActive ? theme.primary : theme.quaternary)}
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);

export default AddressIcon;
