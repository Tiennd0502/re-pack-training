import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

// Interfaces
import { IconProps } from "@repo/interfaces/style";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

const MenIcon = ({
  width = 17,
  height = 17,
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
      testID="men-icon"
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={style}
    >
      <Svg width={width} height={height} viewBox="0 0 17 17" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.322 1.15a.625.625 0 01-.43-.168.56.56 0 01-.177-.407.56.56 0 01.177-.407.625.625 0 01.43-.168h6.071c.161 0 .316.06.43.168A.56.56 0 0117 .575v5.752a.56.56 0 01-.177.407.625.625 0 01-.43.168.625.625 0 01-.43-.168.56.56 0 01-.177-.407V1.964l-5.014 4.75a5.552 5.552 0 011.354 4.071c-.117 1.472-.827 2.845-1.982 3.834a6.272 6.272 0 01-4.225 1.485 6.24 6.24 0 01-4.14-1.683C.676 13.377.04 11.973.001 10.498a5.579 5.579 0 011.567-4.003C2.614 5.401 4.063 4.73 5.616 4.618A6.3 6.3 0 019.914 5.9l5.014-4.75h-4.606zm-4.25 4.602A4.997 4.997 0 002.637 7.1a4.482 4.482 0 00-1.422 3.253c0 1.22.511 2.391 1.422 3.254a4.998 4.998 0 003.435 1.348 4.998 4.998 0 003.434-1.348 4.482 4.482 0 001.423-3.254c0-1.22-.512-2.39-1.423-3.253a4.997 4.997 0 00-3.434-1.348z"
          fill={fillColor}
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default MenIcon;
