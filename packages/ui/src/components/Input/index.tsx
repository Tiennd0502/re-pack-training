import { memo, RefObject, useCallback, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { twMerge } from "tailwind-merge";

// Components
import Divider from "../Divider";
import EyeIcon from "../Icons/EyeIcon";
import EyeSlashIcon from "../Icons/EyeSlashIcon";

export interface InputProps extends Omit<
  TextInputProps,
  "onFocus" | "onBlur" | "onChangeText"
> {
  ref?: RefObject<TextInput | null>;
  field?: string;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  isRequired?: boolean;
  className?: string;
  secureTextEntry?: boolean;
  onSubmit?: () => void;
  onToggleVisibility?: () => void;
  onChangeText?: (value: string, field?: string) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputProps>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputProps>) => void;
}

const Input = ({
  ref,
  field = "",
  placeholder = "",
  errorMessage = "",
  editable = true,
  isRequired = false,
  defaultValue,
  secureTextEntry = false,
  onFocus,
  onBlur,
  onChangeText,
  onSubmit,
  className,
  ...props
}: InputProps) => {
  const [value, setValue] = useState(defaultValue);
  const [showValue, setIsShowValue] = useState(false);

  const bottom = useSharedValue(defaultValue ? 36 : 15);

  const animatedStyle = useAnimatedStyle(() => ({
    flexDirection: "row",
    position: "absolute",
    left: 0,
    bottom: bottom.value,
    zIndex: 2,
  }));

  const labelClassName = twMerge(
    "text-xs text-tertiary",
    value ? "font-medium" : "font-regular",
  );

  const requiredClassName = twMerge(
    "text-xs text-primary",
    errorMessage ? "font-medium text-error" : "font-regular",
    value ? "font-medium" : "font-regular",
  );

  const handleFocus = useCallback(
    (event: NativeSyntheticEvent<TextInputProps>) => {
      if (!value) {
        bottom.value = withTiming(36, { duration: 500 });
      }
      onFocus?.(event);
    },
    [bottom, value, onFocus],
  );

  const handleBlur = useCallback(
    (event: NativeSyntheticEvent<TextInputProps>) => {
      if (!value) {
        bottom.value = withTiming(15, { duration: 500 });
      }
      onBlur?.(event);
    },
    [bottom, value, onBlur],
  );

  const handleChangeText = useCallback(
    (str: string) => {
      setValue(str);
      onChangeText?.(str, field);
    },
    [field, onChangeText],
  );

  const handleToggleVisibility = useCallback(() => {
    setIsShowValue((prev) => !prev);
  }, []);

  const handleSubmitEditing = useCallback(() => {
    onSubmit?.();
  }, [onSubmit]);

  return (
    <View className={`w-full ${className}`}>
      <View className="relative h-[51px]">
        <TouchableWithoutFeedback
          onPress={() => {
            ref?.current?.focus();
          }}
        >
          <Animated.View style={animatedStyle}>
            <Text className={labelClassName}>{placeholder}</Text>
            {isRequired && <Text className={requiredClassName}>{` *`}</Text>}
          </Animated.View>
        </TouchableWithoutFeedback>
        <TextInput
          testID="input"
          ref={ref}
          className="h-[51px] pt-[25px] pb-0.5 pl-0 text-primary font-secondary"
          editable={editable}
          defaultValue={defaultValue}
          secureTextEntry={secureTextEntry && !showValue}
          onFocus={handleFocus as any}
          onBlur={handleBlur as any}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
          {...props}
        />

        {secureTextEntry && (
          <TouchableOpacity
            className="absolute right-0 top-0 h-[51px] w-9 justify-center items-center z-3"
            activeOpacity={0.8}
            onPress={handleToggleVisibility}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {showValue ? (
              <EyeIcon
                width={20}
                height={20}
                onPress={handleToggleVisibility}
              />
            ) : (
              <EyeSlashIcon
                width={20}
                height={20}
                onPress={handleToggleVisibility}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      <Divider className={errorMessage ? "bg-error" : undefined} />

      {errorMessage && (
        <Text className="text-xs text-error">{errorMessage}</Text>
      )}
    </View>
  );
};

export default memo(Input);
