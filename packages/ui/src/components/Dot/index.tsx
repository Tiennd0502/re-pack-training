import { memo, useMemo } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { View } from "react-native";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

interface DotProps {
  isActive: boolean;
  onSelect: () => void;
  color?: string;
  size?: number;
  className?: string;
}

const Dot = ({
  isActive,
  onSelect,
  color = "",
  size = 24,
  className = "",
}: DotProps) => {
  const scale = useSharedValue(1);
  const { theme } = useTheme();

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const dotStyles = useMemo(
    () => ({
      width: isActive ? size : size - 10,
      height: isActive ? size : size - 10,
      borderWidth: isActive ? 5 : 1,
      borderColor: isActive ? theme.tertiary : theme.primary,
      backgroundColor: color,
      borderRadius: size,
    }),
    [isActive, color, size, theme.primary, theme.tertiary],
  );

  const handleSelect = () => {
    "worklet";

    scale.value = withSpring(1.1, {}, () => {
      scale.value = withSpring(1);
      runOnJS(onSelect)();
    });
  };

  const press = Gesture.Pan()
    .onBegin(handleSelect)
    ?.onEnd(() => {
      "worklet";
      scale.value = withSpring(1, { duration: 180 });
    });

  const composed = Gesture.Simultaneous(press);

  return (
    <View className={className}>
      <GestureDetector gesture={composed}>
        <Animated.View style={[dotStyles, rStyle]} />
      </GestureDetector>
    </View>
  );
};

export default memo(Dot);
