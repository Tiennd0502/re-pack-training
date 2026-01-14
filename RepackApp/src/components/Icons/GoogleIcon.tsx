import { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

// Interfaces
import { IconProps } from '@/interfaces/style';

// Hooks
import { useTheme } from '@/hooks/useTheme';

const GoogleIcon = memo(
  ({ width = 42, height = 42, disabled = false, onPress }: IconProps) => {
    const { theme } = useTheme();

    return (
      <TouchableOpacity
        testID="google-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
      >
        <Svg width={width} height={height} viewBox="0 0 42 42" fill="none">
          <G clipPath="url(#clip0_9200_443)">
            <Path
              d="M14.827 18.951A6.488 6.488 0 0121 14.5c1.55 0 2.95.55 4.05 1.45l3.2-3.2C26.3 11.05 23.8 10 21 10a10.97 10.97 0 00-9.863 6.096l3.69 2.855z"
              fill="#EA4335"
            />
            <Path
              d="M24.703 26.512c-.999.644-2.268.988-3.703.988a6.488 6.488 0 01-6.163-4.42l-3.703 2.81A10.968 10.968 0 0021 32c2.689 0 5.257-.956 7.181-2.75l-3.477-2.738z"
              fill="#34A853"
            />
            <Path
              d="M28.181 29.25C30.193 27.373 31.5 24.579 31.5 21c0-.65-.1-1.35-.25-2H21v4.25h5.9c-.29 1.43-1.073 2.536-2.196 3.262l3.477 2.738z"
              fill="#4A90E2"
            />
            <Path
              d="M14.837 23.08A6.527 6.527 0 0114.5 21c0-.717.115-1.405.327-2.049l-3.69-2.855A10.94 10.94 0 0010 21c0 1.76.408 3.42 1.134 4.89l3.703-2.81z"
              fill="#FBBC05"
            />
          </G>
          <G clipPath="url(#clip1_9200_443)">
            <Path
              d="M14.827 18.951A6.488 6.488 0 0121 14.5c1.55 0 2.95.55 4.05 1.45l3.2-3.2C26.3 11.05 23.8 10 21 10a10.97 10.97 0 00-9.863 6.096l3.69 2.855z"
              fill="#EA4335"
            />
            <Path
              d="M24.703 26.512c-.999.644-2.268.988-3.703.988a6.488 6.488 0 01-6.163-4.42l-3.703 2.81A10.968 10.968 0 0021 32c2.689 0 5.257-.956 7.181-2.75l-3.477-2.738z"
              fill="#34A853"
            />
            <Path
              d="M28.181 29.25C30.193 27.373 31.5 24.579 31.5 21c0-.65-.1-1.35-.25-2H21v4.25h5.9c-.29 1.43-1.073 2.536-2.196 3.262l3.477 2.738z"
              fill="#4A90E2"
            />
            <Path
              d="M14.837 23.08A6.527 6.527 0 0114.5 21c0-.717.115-1.405.327-2.049l-3.69-2.855A10.94 10.94 0 0010 21c0 1.76.408 3.42 1.134 4.89l3.703-2.81z"
              fill="#FBBC05"
            />
          </G>
          <Rect
            opacity={0.14}
            x={0.5}
            y={0.5}
            width={41}
            height={41}
            rx={20.5}
            fill={theme.background}
            stroke={theme.primary}
          />
          <Defs>
            <ClipPath id="clip0_9200_443">
              <Path
                fill={theme.background}
                transform="translate(10 10)"
                d="M0 0H22V22H0z"
              />
            </ClipPath>
            <ClipPath id="clip1_9200_443">
              <Path
                fill={theme.background}
                transform="translate(10 10)"
                d="M0 0H22V22H0z"
              />
            </ClipPath>
          </Defs>
        </Svg>
      </TouchableOpacity>
    );
  },
);

export default GoogleIcon;
