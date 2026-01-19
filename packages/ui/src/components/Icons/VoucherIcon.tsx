import { memo } from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

// Interfaces
import { IconProps } from "@repo/interfaces/style";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

export const VoucherIcon = memo(
  ({
    width = 19,
    height = 15,
    color = "",
    disabled = false,
    isActive = false,
    style,
    onPress,
  }: IconProps) => {
    const { theme } = useTheme();

    return (
      <TouchableOpacity
        testID="voucher-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}
      >
        <Svg width={width} height={height} viewBox="0 0 19 15" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.064 6.222a.643.643 0 01-.449.18c-.626 0-1.134.494-1.134 1.094 0 .604.502 1.095 1.122 1.101.35.004.647.24.647.58v2.109c0 1.774-1.48 3.214-3.309 3.214h-2.759a.509.509 0 01-.516-.502v-1.775a.62.62 0 00-.634-.617.625.625 0 00-.635.617v1.775a.509.509 0 01-.515.502H4.059C2.239 14.5.75 13.061.75 11.286V9.177c0-.34.297-.576.647-.58.62-.006 1.122-.497 1.122-1.101 0-.584-.491-1.028-1.134-1.028a.644.644 0 01-.449-.18.607.607 0 01-.186-.436v-2.13C.75 1.95 2.243.5 4.067.5h5.815c.284 0 .515.224.515.501v2.105a.63.63 0 00.635.617c.355 0 .634-.28.634-.617V1.001c0-.277.231-.501.516-.501h2.76c1.827 0 3.308 1.439 3.308 3.214v2.072c0 .164-.068.32-.186.436zm-7.032 3.79c.355 0 .634-.28.634-.617V6.107a.625.625 0 00-.634-.617.63.63 0 00-.635.617v3.288a.63.63 0 00.635.617z"
            fill={color ?? (isActive ? theme.primary : theme.quaternary)}
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);

export default VoucherIcon;
