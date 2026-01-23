import { memo, RefObject, useCallback, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { twMerge } from "tailwind-merge";

// Components
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
  disabled?: boolean;
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
  disabled = false,
  ...props
}: InputProps) => {
  const [value, setValue] = useState(defaultValue);
  const [showValue, setIsShowValue] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const labelClassName = twMerge(
    "text-xs text-tertiary",
    value ? "font-medium" : "font-regular",
    disabled ? "opacity-75" : "opacity-100",
  );

  const contentClassName = twMerge(
    "relative h-[51px] border-solid border-b",
    errorMessage ? "border-error" : "border-quinary",
  );

  const containerLabelClassName = twMerge(
    "w-fit flex-row justify-start absolute bottom-9 left-0",
    isFocused || value ? "bottom-9" : "bottom-4",
  );

  const requiredClassName = twMerge(
    "text-xs text-primary",
    errorMessage ? "font-medium text-error" : "font-regular",
    value ? "font-medium" : "font-regular",
  );

  const inputClassName = twMerge(
    "h-[51px] pt-[25px] pb-0.5 pl-0 text-primary font-secondary text-sm",
    disabled ? "opacity-75" : "opacity-100",
  );

  const handleFocus = useCallback(
    (event: NativeSyntheticEvent<TextInputProps>) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (event: NativeSyntheticEvent<TextInputProps>) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur],
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
    <KeyboardAvoidingView>
      <View className={`w-full ${className}`}>
        <View className={contentClassName}>
          <TouchableWithoutFeedback
            onPress={() => {
              ref?.current?.focus();
            }}
          >
            <View className={containerLabelClassName}>
              <Text className={labelClassName}>{placeholder}</Text>
              {isRequired && <Text className={requiredClassName}>{` *`}</Text>}
            </View>
          </TouchableWithoutFeedback>
          <TextInput
            testID="input"
            ref={ref}
            className={inputClassName}
            editable={editable && !disabled}
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
              disabled={disabled}
              onPress={handleToggleVisibility}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {showValue ? (
                <EyeSlashIcon width={20} height={20} />
              ) : (
                <EyeIcon width={20} height={20} />
              )}
            </TouchableOpacity>
          )}
        </View>

        {errorMessage && (
          <Text className="text-xs text-error mt-1">{errorMessage}</Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default memo(Input);
