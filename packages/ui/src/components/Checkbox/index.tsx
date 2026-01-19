import { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { twMerge } from "tailwind-merge";

//  Hooks
import { useTheme } from "@repo/hooks/useTheme";

// Components
import CheckIcon from "../Icons/CheckIcon";

export interface CheckboxProps {
  label?: string;
  size?: number;
  selected?: boolean;
  disabled?: boolean;
  onValueChange?: () => void;
}

const Checkbox = ({
  label = "",
  size = 20,
  disabled = false,
  selected = false,
  onValueChange,
}: CheckboxProps) => {
  const { theme } = useTheme();

  const wrapperClassName = "flex-row items-center mb-5 gap-4";

  const checkboxClassName = twMerge(
    "items-center justify-center border border-primary rounded-sm",
    `w-[${size}px] h-[${size}px]`,
    selected && "bg-icon-form border-icon-form",
    disabled && "opacity-50",
  );

  const labelClassName = twMerge(
    "font-secondary text-sm text-primary",
    disabled && "opacity-80",
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onValueChange || undefined}
      className={wrapperClassName}
    >
      <View className={checkboxClassName}>
        <CheckIcon
          width={size}
          height={size}
          color={selected ? theme.secondary : "transparent"}
        />
      </View>
      {label && <Text className={labelClassName}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default memo(Checkbox);
