import Svg, { Path, Circle } from 'react-native-svg';
import { TouchableOpacity } from 'react-native';

// Interfaces
import { IconProps } from '@/interfaces/style';

// Hooks
import { useTheme } from '@/hooks/useTheme';

const SunIcon = ({
  width = 18,
  height = 18,
  disabled = false,
  color = '',
  onPress,
}: IconProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disabled}>
      <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="4" fill={color || theme.primary} />
        <Path
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
          stroke={color || theme.secondary}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default SunIcon;
