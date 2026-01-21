import { memo } from "react";
import { View, Text } from "react-native";

interface RatingPercentageProps {
  number: number;
  percentage: number;
}

const RatingPercentage = ({ number, percentage }: RatingPercentageProps) => {
  return (
    <View className="flex-row items-center gap-3">
      <Text className="text-xs font-primary text-primary w-4">{number}</Text>
      <View className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
        <View
          className="h-full bg-primary"
          style={{ width: `${percentage}%` }}
        />
      </View>
      <Text className="text-xs font-primary text-septenary w-10 text-right">
        {percentage}%
      </Text>
    </View>
  );
};

export default memo(RatingPercentage);
