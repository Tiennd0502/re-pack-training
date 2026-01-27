import { useMemo } from "react";
import { Image, View, Text } from "react-native";
import { twMerge } from "tailwind-merge";

// Utils
import { getShortTimeAgo } from "@repo/utils/time";

// Components
import Rating from "../Rating";

interface ReviewCardProps {
  avatarUrl: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: number;
  className?: string;
}

const ReviewCard = ({
  avatarUrl,
  name,
  rating,
  comment,
  createdAt,
  className,
}: ReviewCardProps) => {
  const containerClassName = twMerge("gap-4", className);

  const timeAgo = useMemo(() => getShortTimeAgo(createdAt), [createdAt]);

  return (
    <View className={containerClassName}>
      <View className="flex-row gap-3 items-center">
        <Image
          source={{ uri: avatarUrl }}
          resizeMode="cover"
          className="w-9 h-9 rounded-full overflow-hidden bg-secondary"
        />
        <View className="gap-2">
          <Text className="text-xs font-primary font-bold text-primary">
            {name}
          </Text>
          <Rating value={rating} size={10} />
        </View>
        <View className="ml-auto mr-0">
          <Text className="text-sm font-secondary font-medium text-septenary">
            {timeAgo}
          </Text>
        </View>
      </View>
      <Text className="text-sm text-quaternary">{comment}</Text>
    </View>
  );
};

export default ReviewCard;
