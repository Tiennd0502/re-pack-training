import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

// Interfaces
import { IconProps } from "@repo/interfaces/style";

const MinusIcon = ({
  width = 13,
  height = 13,
  color = "",
  disabled = false,
  onPress,
}: IconProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.7}>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color || theme.primary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={disabled ? 0.5 : 1}
      >
        <Path d="M5 12h14" />
      </Svg>
    </TouchableOpacity>
  );
};

export default MinusIcon;
