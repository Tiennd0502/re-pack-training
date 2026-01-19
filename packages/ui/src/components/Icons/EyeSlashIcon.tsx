import Svg, { Path } from "react-native-svg";

// Interfaces
import { IconProps } from "@repo/interfaces/style";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

const EyeSlashIcon = ({ width = 24, height = 24, color = "" }: IconProps) => {
  const { theme } = useTheme();

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || theme.primary}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M10.733 5.076a10.744 10.744 0 0111.205 6.575 1 1 0 010 .696 10.747 10.747 0 01-1.444 2.49M14.084 14.158a3 3 0 01-4.242-4.242" />
      <Path d="M17.479 17.499a10.75 10.75 0 01-15.417-5.151 1 1 0 010-.696 10.75 10.75 0 014.446-5.143M2 2l20 20" />
    </Svg>
  );
};

export default EyeSlashIcon;
