import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

// Interfaces
import { IconProps } from "@repo/interfaces/style";

const PlusIcon = ({
  width = 24,
  height = 24,
  color = "",
  disabled = false,
  onPress,
}: IconProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.8}>
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
        <Path d="M5 12h14M12 5v14" />
      </Svg>
    </TouchableOpacity>
  );
};

export default PlusIcon;
