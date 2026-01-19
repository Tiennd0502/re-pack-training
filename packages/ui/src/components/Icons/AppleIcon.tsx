import { memo } from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

// Interfaces
import { IconProps } from "@repo/interfaces/style";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

const AppleIcon = memo(
  ({ width = 42, height = 42, disabled = false, onPress }: IconProps) => {
    const { theme } = useTheme();

    return (
      <TouchableOpacity
        testID="apple-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
      >
        <Svg width={width} height={height} viewBox="0 0 42 42" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.19 13.513c.77-.93 1.287-2.225 1.146-3.513-1.107.045-2.447.738-3.24 1.667-.712.824-1.336 2.14-1.167 3.403 1.234.096 2.495-.627 3.263-1.557h-.002zm2.77 8.175c.032 3.329 2.921 4.437 2.952 4.452-.023.078-.46 1.578-1.521 3.128-.917 1.34-1.868 2.676-3.368 2.704-1.473.026-1.946-.874-3.631-.874-1.683 0-2.21.846-3.604.9-1.447.055-2.549-1.45-3.475-2.784-1.888-2.731-3.332-7.718-1.393-11.084.962-1.672 2.683-2.73 4.551-2.757 1.421-.028 2.762.956 3.63.956.87 0 2.5-1.183 4.212-1.01.718.03 2.731.29 4.025 2.183-.105.064-2.403 1.402-2.378 4.186"
            fill={theme.primary}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.19 13.513c.77-.93 1.287-2.225 1.146-3.513-1.107.045-2.447.738-3.24 1.667-.712.824-1.336 2.14-1.167 3.403 1.234.096 2.495-.627 3.263-1.557h-.002zm2.77 8.175c.032 3.329 2.921 4.437 2.952 4.452-.023.078-.46 1.578-1.521 3.128-.917 1.34-1.868 2.676-3.368 2.704-1.473.026-1.946-.874-3.631-.874-1.683 0-2.21.846-3.604.9-1.447.055-2.549-1.45-3.475-2.784-1.888-2.731-3.332-7.718-1.393-11.084.962-1.672 2.683-2.73 4.551-2.757 1.421-.028 2.762.956 3.63.956.87 0 2.5-1.183 4.212-1.01.718.03 2.731.29 4.025 2.183-.105.064-2.403 1.402-2.378 4.186"
            fill={theme.primary}
          />
          <Rect
            opacity={0.14}
            x={0.5}
            y={0.5}
            width={41}
            height={41}
            rx={20.5}
            fill={theme.secondary}
            stroke={theme.tertiary}
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);

export default AppleIcon;
