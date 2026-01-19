import { memo, useMemo } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { twMerge } from "tailwind-merge";
import { View } from "react-native";

interface DotProps {
  hasBorder: boolean;
  onSelect: () => void;
  color?: string;
  size?: number;
  className?: string;
}

const Dot = ({
  hasBorder,
  onSelect,
  color = "",
  size = 34,
  className,
}: DotProps) => {
  const scale = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const dotStyles = useMemo(() => {
    if (hasBorder) {
      return {
        width: size,
        height: size,
        borderWidth: 5,
        shadowColor: color,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
      };
    }

    return {
      width: size - 10,
      height: size - 10,
      shadowColor: color,
    };
  }, [hasBorder, color, size]);

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

  const wrapperClassName = twMerge(
    `rounded-full w-[${size}px] h-[${size}px] items-center justify-center`,
    color && `bg-${color}-500`,
    className,
  );

  const dotClassName = twMerge(
    `rounded-full w-[${size}px] h-[${size}px]`,
    hasBorder ? `border border-secondary shadow-lg` : "shadow-sm",
  );

  return (
    <View className={wrapperClassName}>
      <GestureDetector gesture={composed}>
        <Animated.View className={dotClassName} style={[dotStyles, rStyle]} />
      </GestureDetector>
    </View>
  );
};

export default memo(Dot);
