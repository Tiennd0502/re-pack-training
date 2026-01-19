import { memo, useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Easing,
} from "react-native-reanimated";
import { twMerge } from "tailwind-merge";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

interface SkeletonProps {
  width: number;
  height: number;
  borderRadius?: number;
  className?: string;
}

const Skeleton = ({
  width,
  height,
  borderRadius = 8,
  className = "",
}: SkeletonProps) => {
  const { theme } = useTheme();

  const wrapperClassName = twMerge("overflow-hidden bg-quinary", className);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 800,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, [progress]);

  const shimmerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.3, 1], [0.2, 1, 0.2]);
    return {
      opacity,
      backgroundColor: theme.senary,
    };
  });

  return (
    <View
      className={wrapperClassName}
      style={[{ width, height, borderRadius }]}
    >
      <Animated.View className="absolute w-full h-full" style={shimmerStyle} />
    </View>
  );
};

export default memo(Skeleton);
