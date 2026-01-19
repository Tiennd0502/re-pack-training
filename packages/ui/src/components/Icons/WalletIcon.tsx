import { memo } from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

// Interfaces
import { IconProps } from "@repo/interfaces/style";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

export const WalletIcon = memo(
  ({
    width = 19,
    height = 17,
    color = "",
    disabled = false,
    isActive = false,
    style,
    onPress,
  }: IconProps) => {
    const { theme } = useTheme();

    return (
      <TouchableOpacity
        testID="wallet-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}
      >
        <Svg width={width} height={height} viewBox="0 0 19 17" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.548 5.334h3.702c0-2.972-1.781-4.709-4.799-4.709H5.55C2.53.625.75 2.362.75 5.296v6.408c0 2.934 1.781 4.671 4.799 4.671h7.902c3.018 0 4.799-1.736 4.799-4.671v-.273h-3.702c-1.718 0-3.111-1.358-3.111-3.033 0-1.676 1.393-3.034 3.11-3.034v-.03zm0 1.304h3.049c.36 0 .653.286.653.637V9.49a.653.653 0 01-.653.637h-2.98c-.87.011-1.63-.57-1.827-1.396a1.735 1.735 0 01.379-1.445 1.83 1.83 0 011.379-.648zm.132 2.328h.288a.66.66 0 00.669-.652.66.66 0 00-.67-.652h-.287a.67.67 0 00-.473.186.637.637 0 00-.196.459c0 .361.298.655.669.66zM4.896 5.334h4.938a.66.66 0 00.67-.652.66.66 0 00-.67-.652H4.896a.66.66 0 00-.67.644c0 .362.299.656.67.66z"
            fill={color ?? (isActive ? theme.primary : theme.quaternary)}
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);

export default WalletIcon;
