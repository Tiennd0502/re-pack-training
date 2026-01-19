import { memo } from "react";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";

export interface DividerProps {
  className?: string;
}

const Divider = ({ className }: DividerProps) => {
  const dividerClassName = twMerge(
    "block w-full h-[1px] bg-quinary",
    className,
  );

  return <View className={dividerClassName} />;
};

export default memo(Divider);
