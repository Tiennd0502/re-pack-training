import { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { twMerge } from "tailwind-merge";

interface SizeSelectorProps {
  sizes: string[];
  defaultValue?: string;
  onValueChange: (size: string) => void;
  className?: string;
}

const SizeSelector = ({
  sizes,
  defaultValue = "",
  onValueChange,
  className = "",
}: SizeSelectorProps) => {
  const containerClassName = twMerge("", className);

  return (
    <View className={containerClassName}>
      <Text className="text-sm text-tertiary capitalize">Size</Text>
      <View className="flex-row mt-[10px] gap-2">
        {sizes.map((size) => {
          const isSelected = defaultValue === size;
          const handleToggleSelect = () => {
            if (size !== defaultValue) {
              onValueChange(size);
            }
          };

          const sizeButtonClassName = twMerge(
            "w-[33px] h-[33px] rounded-full justify-center items-center",
            isSelected ? "bg-primary" : "bg-senary",
          );

          const sizeTextClassName = twMerge(
            "capitalize",
            isSelected ? "text-secondary" : "text-tertiary",
          );

          return (
            <TouchableOpacity
              key={size}
              disabled={isSelected}
              onPress={handleToggleSelect}
              activeOpacity={0.8}
            >
              <View className={sizeButtonClassName}>
                <Text className={sizeTextClassName}>{size}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default memo(SizeSelector);
