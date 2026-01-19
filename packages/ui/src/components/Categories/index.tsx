import { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { twMerge } from "tailwind-merge";

// Interfaces
import { Category } from "@repo/interfaces/category";

// Hooks
import { useTheme } from "@repo/hooks/useTheme";

interface CategoriesProps {
  list: Category[];
  keyActivated?: string;
  onChange: (item: Category) => void;
  className?: string;
}

const Categories = ({
  list = [],
  keyActivated = list[0]?.key,
  onChange,
  className = "",
}: CategoriesProps) => {
  const { theme } = useTheme();

  const containerClassName = twMerge(
    "w-full flex-row justify-between",
    className,
  );

  return (
    <View className={containerClassName}>
      {list.map((item) => {
        const { key, label, Icon } = item;
        const isActive = key === keyActivated;

        const boxIconClassName = twMerge(
          "justify-center items-center w-[42px] h-[42px] rounded-[21px] border border-[1px] border-transparent",
          isActive ? "border-primary bg-secondary" : "",
        );

        const iconContainerClassName = twMerge(
          "w-[36px] h-[36px] rounded-[18px] justify-center items-center",
          isActive ? "bg-primary" : "bg-senary",
        );

        const labelClassName = isActive
          ? "text-primary font-bold"
          : "text-tertiary";

        return (
          <TouchableOpacity
            key={key}
            activeOpacity={0.8}
            onPress={() => onChange(item)}
            className="justify-center items-center gap-[6px]"
          >
            <View className={boxIconClassName}>
              <View className={iconContainerClassName}>
                <Icon
                  isActive={isActive}
                  disabled
                  color={isActive ? theme.secondary : theme.tertiary}
                />
              </View>
            </View>
            <Text className={twMerge("text-xs", labelClassName)}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default memo(Categories);
