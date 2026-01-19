import { memo, ReactNode, useCallback, useState } from "react";
import { View, TouchableOpacity, LayoutChangeEvent, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { twMerge } from "tailwind-merge";

// Components
import ChevronIcon from "../Icons/ChevronIcon";
import Divider from "../Divider";

interface CollapseProps {
  label: string;
  isOpen?: boolean;
  duration?: number;
  children: ReactNode;
  className?: string;
}

const Collapse = ({
  children,
  label,
  duration = 300,
  className,
}: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useSharedValue(false);
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(open.value), {
      duration,
    }),
  );

  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  const contentClassName = twMerge(
    "w-full absolute flex items-center py-5",
    className,
  );

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    open.value = !open.value;
  }, [open]);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      height.value = event.nativeEvent.layout.height;
    },
    [height],
  );

  return (
    <View className="w-full">
      <TouchableOpacity
        testID="label"
        activeOpacity={0.6}
        onPress={handleToggle}
      >
        <View className="flex-row items-center justify-between pr-[9px] py-[9px]">
          <Text className="text-base font-secondary text-primary">{label}</Text>
          <ChevronIcon rotate={isOpen ? 0 : -90} duration={duration} />
        </View>
      </TouchableOpacity>
      <Divider className="bg-primary" />
      <Animated.View className="w-full overflow-hidden" style={bodyStyle}>
        <View
          testID="content"
          onLayout={handleLayout}
          className={contentClassName}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

export default memo(Collapse);
