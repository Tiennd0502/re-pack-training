import { memo } from "react";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";

// Components
import StarIcon from "../Icons/StarIcon";

interface RatingProps {
  value?: number;
  size?: number;
  count?: number;
  className?: string;
}

const Rating = ({ value = 0, size, count = 5, className }: RatingProps) => {
  const wrapperClassName = twMerge("flex-row gap-[5px]", className);

  return (
    <View className={wrapperClassName}>
      {[...Array(count).keys()].map((item) => (
        <StarIcon
          key={item}
          width={size}
          height={size}
          isActive={item < value}
        />
      ))}
    </View>
  );
};

export default memo(Rating);
