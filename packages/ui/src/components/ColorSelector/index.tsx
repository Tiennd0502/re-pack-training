import { memo } from "react";
import { View, Text } from "react-native";

// Components
import Dot from "../Dot";

interface ColorSelectorProps {
  colors: string[];
  size?: number;
  onValueChange: (value: string) => void;
  defaultValue?: string;
  className?: string;
}

const ColorSelector = ({
  colors,
  defaultValue = "",
  size = 34,
  onValueChange,
  className,
}: ColorSelectorProps) => {
  return (
    <View className={className}>
      <Text className="text-sm text-tertiary">Color</Text>
      <View className="flex-row mt-[10px] gap-2 items-center justify-center">
        {colors.map((color, index) => {
          const isSelected = defaultValue === color;
          const handleToggleSelect = () => {
            if (color !== defaultValue) {
              onValueChange(color);
            }
          };

          return (
            <Dot
              key={index}
              color={color}
              size={size}
              isActive={isSelected}
              onSelect={handleToggleSelect}
            />
          );
        })}
      </View>
    </View>
  );
};

export default memo(ColorSelector);
