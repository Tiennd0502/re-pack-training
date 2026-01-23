import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

// Interfaces
import { IconProps } from "@repo/types/style";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

const ScrewdriverIcon = ({
  width = 6,
  height = 22,
  color,
  disabled = false,
  isActive = false,
  style,
  onPress,
}: IconProps) => {
  const { theme } = useTheme();

  const strokeColor = color || (isActive ? theme.primary : theme.tertiary);

  return (
    <TouchableOpacity
      testID="screwdriver-icon"
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={style}
    >
      <Svg width={width} height={height} viewBox="0 0 6 22" fill="none">
        <Path
          d="M3 13V5M1 13h4v6a2 2 0 11-4 0v-6zM1 1h4L4 5H2L1 1z"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default ScrewdriverIcon;
