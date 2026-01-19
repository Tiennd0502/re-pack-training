import { useCallback, useEffect } from "react";
import { View, StyleSheet, LayoutChangeEvent, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { twMerge } from "tailwind-merge";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

// Components
import MoonIcon from "../Icons/MoonIcon";
import SunIcon from "../Icons/SunIcon";

interface ThemeSwitchProps {
  className?: string;
}

const ThemeSwitch = ({}: ThemeSwitchProps) => {
  const { isDark, toggleTheme, theme } = useTheme();

  const knobX = useSharedValue(0);
  const optionWidth = useSharedValue(0);

  const styles = StyleSheet.create({
    option: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2,
      color: "red",
    },
    icon: {
      fontSize: 18,
      marginRight: 6,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      lineHeight: 30,
      zIndex: 7,
    },
    thumb: {
      position: "absolute",
      width: "49%",
      height: 32,
      backgroundColor: theme.secondary,
      borderRadius: 999,
      zIndex: 1,
      shadowColor: theme.secondary,
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 4,
      elevation: 3,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      knobX.value = withTiming((isDark ? 1 : 0) * optionWidth.value, {
        duration: 200,
      });
    }, 50);
  }, [isDark, knobX, optionWidth.value]);

  const onLayout = (e: LayoutChangeEvent) => {
    optionWidth.value = e.nativeEvent.layout.width / 2;
    knobX.value = withTiming((isDark ? 1 : 0) * optionWidth.value);
  };

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: knobX.value }],
    left: isDark ? 0 : 4,
    right: isDark ? 4 : 0,
  }));

  const lightTextStyle = twMerge(
    "text-primary h-8 ml-1",
    isDark && "text-secondary",
  );

  const darkTextStyle = twMerge(
    "text-secondary h-8 ml-1",
    isDark && "text-primary",
  );

  const handleTap = useCallback(
    (targetIndex: number) => () => {
      knobX.value = withTiming(targetIndex * optionWidth.value, {
        duration: 200,
      });
      if ((targetIndex === 1 && !isDark) || (targetIndex === 0 && isDark)) {
        toggleTheme();
      }
    },
    [isDark, knobX, optionWidth.value, toggleTheme],
  );

  const tapLight = Gesture.Tap().runOnJS(true).onEnd(handleTap(0));
  const tapDark = Gesture.Tap().runOnJS(true).onEnd(handleTap(1));

  return (
    <GestureHandlerRootView>
      <View
        className="flex-row w-full justify-between bg-tertiary rounded-full h-[40px] items-center relative"
        onLayout={onLayout}
      >
        <Animated.View style={[styles.thumb, knobStyle]} />
        <GestureDetector gesture={tapLight}>
          <Animated.View style={styles.option}>
            <SunIcon color={isDark ? theme.secondary : theme.primary} />
            <Text className={lightTextStyle} style={[styles.label]}>
              Light
            </Text>
          </Animated.View>
        </GestureDetector>

        <GestureDetector gesture={tapDark}>
          <Animated.View style={styles.option}>
            <MoonIcon color={isDark ? theme.primary : theme.secondary} />
            <Text className={darkTextStyle} style={[styles.label]}>
              Dark
            </Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export default ThemeSwitch;
