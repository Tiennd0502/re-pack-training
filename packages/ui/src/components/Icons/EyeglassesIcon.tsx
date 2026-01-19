import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

// Interfaces
import { IconProps } from "@repo/interfaces/style";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

const EyeglassesIcon = ({
  width = 21,
  height = 15,
  color,
  disabled = false,
  isActive = false,
  style,
  onPress,
}: IconProps) => {
  const { theme } = useTheme();

  const fillColor = color || (isActive ? theme.primary : theme.tertiary);

  return (
    <TouchableOpacity
      testID="eyeglasses-icon"
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={style}
    >
      <Svg width={width} height={height} viewBox="0 0 21 15" fill="none">
        <Path
          d="M6.742 0a2.6 2.6 0 00-1.967.9L.47 5.88A1.942 1.942 0 000 7.15v3.9a3.25 3.25 0 003.25 3.25h2.6a3.25 3.25 0 003.25-3.25V9.1h2.6v1.95a3.25 3.25 0 003.25 3.25h2.6a3.25 3.25 0 003.25-3.25v-3.9c0-.558-.234-1.06-.608-1.414L16.025.902A2.6 2.6 0 0014.057 0H13a.65.65 0 100 1.3h1.057a1.3 1.3 0 01.984.451L18.014 5.2H13.65a1.95 1.95 0 00-1.95 1.95v.65H9.1v-.65A1.95 1.95 0 007.15 5.2H2.775L5.76 1.75a1.3 1.3 0 01.983-.45H7.8a.65.65 0 100-1.3H6.742zM7.8 7.15v3.9A1.95 1.95 0 015.85 13h-2.6a1.95 1.95 0 01-1.95-1.95v-3.9a.65.65 0 01.65-.65h5.2a.65.65 0 01.65.65zm5.2 3.9v-3.9a.65.65 0 01.65-.65h5.2c.156 0 .299.055.41.147l.072.082.008-.005c.103.118.16.27.16.426v3.9A1.95 1.95 0 0117.55 13h-2.6A1.95 1.95 0 0113 11.05z"
          fill={fillColor}
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default EyeglassesIcon;
