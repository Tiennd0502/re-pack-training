import Svg, { Path } from "react-native-svg";

// Interfaces
import { IconProps } from "@repo/types/style";

const CheckIcon = ({
  width = 24,
  height = 24,
  color = "currentColor",
}: IconProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M20 6L9 17l-5-5" />
    </Svg>
  );
};

export default CheckIcon;
