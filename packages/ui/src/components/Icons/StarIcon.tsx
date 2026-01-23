import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";

// Interfaces
import { IconProps } from "@repo/types/style";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

const StarIcon = ({
  width = 9,
  height = 8,
  disabled = false,
  isActive = false,
  color = "",
  onPress,
}: IconProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disabled}>
      <Svg width={width} height={height} viewBox="0 0 9 8" fill="none">
        {isActive ? (
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.097 2.624a.328.328 0 01-.313-.22L5.058.22a.332.332 0 00-.625 0l-.73 2.18a.328.328 0 01-.313.22H1.025a.32.32 0 00-.311.216.313.313 0 00.117.357l1.92 1.359a.31.31 0 01.118.352L2.137 7.1a.315.315 0 00.166.383.331.331 0 00.34-.03l1.907-1.35a.339.339 0 01.389 0l1.906 1.349a.331.331 0 00.34.03.326.326 0 00.178-.232.315.315 0 00-.011-.15L6.62 4.906a.311.311 0 01.118-.352L8.658 3.2a.313.313 0 00-.002-.516.321.321 0 00-.191-.057l-2.368-.003z"
            fill={color || theme.bgIconForm}
          />
        ) : (
          <Path
            d="M4.31.25c.017 0 .035.005.048.015a.083.083 0 01.018.017l.012.023.724 2.178.001.003a.578.578 0 00.55.387v.001l2.367.003h.006a.07.07 0 01.042.013c.012.008.021.02.026.033a.064.064 0 010 .04l-.023.032h0L6.16 4.35a.561.561 0 00-.234.548l.02.087.001.001.732 2.194c.002.009.003.019.002.028l-.013.028a.076.076 0 01-.026.023l-.036.007h-.003a.082.082 0 01-.025-.004l-.022-.012h-.002l-1.907-1.35h0a.589.589 0 00-.598-.046l-.078.046H3.97l-1.907 1.35h-.002a.082.082 0 01-.022.012l-.024.004h-.004a.076.076 0 01-.034-.007l-.028-.023a.065.065 0 01-.012-.028.064.064 0 01.002-.03v-.001l.732-2.192v-.002a.561.561 0 00-.212-.634h0L.542 2.989H.54l-.024-.033a.063.063 0 010-.038.072.072 0 01.026-.035l.042-.013h2.371v0a.578.578 0 00.513-.305l.036-.082V2.48l.73-2.175a.084.084 0 01.03-.04.082.082 0 01.022-.011L4.311.25z"
            stroke={color || theme.bgIconForm}
            strokeWidth={0.5}
          />
        )}
      </Svg>
    </TouchableOpacity>
  );
};

export default StarIcon;
