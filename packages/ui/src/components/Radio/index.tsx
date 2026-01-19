import { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import { twMerge } from "tailwind-merge";

export interface RadioProps {
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  onPress?: () => void;
}

const Radio = ({
  selected = false,
  disabled = false,
  className = "",
  onPress,
}: RadioProps) => {
  const radioClassName = twMerge(
    "rounded-full border border-primary w-[23px] h-[23px] border-[1px] bg-transparent",
    selected && "border-[7px] border-icon-form border-solid",
    disabled && "opacity-50",
    className,
  );

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View className={radioClassName} />
    </TouchableOpacity>
  );
};

export default memo(Radio);
