import { memo } from "react";
import { View, Text } from "react-native";

// Interfaces
import { Review } from "@repo/interfaces/review";

// Components
import Collapse from "../Collapse";
import Rating from "../Rating";
import ReviewCard from "../ReviewCard";
import PencilIcon from "../Icons/PencilIcon";
import RatingPercentage from "../RatingPercentage";

interface ReviewSectionProps {
  reviews: Review[];
  rating: number;
}

const ReviewSection = ({ reviews, rating }: ReviewSectionProps) => {
  const reviewLength = reviews?.length || 0;

  return (
    <Collapse label="Review">
      <View className="w-full flex-row justify-between items-center">
        <View className="flex-row items-center gap-2.5">
          <Text className="text-3xl font-primary font-bold text-primary">
            {rating}
          </Text>
          <Text className="text-[10px] font-secondary text-quaternary">
            OUT OF 5
          </Text>
        </View>
        <View className="items-end gap-2">
          <Rating size={19} value={Math.ceil(rating)} />
          <Text className="text-[10px] font-primary text-right">
            {reviewLength} Rating
          </Text>
        </View>
      </View>
      <View className="w-full gap-4 mt-4 mb-5">
        <RatingPercentage number={5} percentage={80} />
        <RatingPercentage number={4} percentage={12} />
        <RatingPercentage number={3} percentage={5} />
        <RatingPercentage number={2} percentage={3} />
        <RatingPercentage number={1} percentage={0} />
      </View>
      <View className="w-full flex-row justify-between items-center">
        <Text className="text-[10px] font-primary text-primary">
          {reviewLength} Reviews
        </Text>
        <View className="flex-row items-center gap-1">
          <Text className="text-[10px] font-primary text-primary">
            WRITE A REVIEW
          </Text>
          <PencilIcon width={12} height={12} />
        </View>
      </View>
      {!!reviewLength && (
        <View className="w-full mt-8 gap-6">
          {reviews.map((item) => (
            <ReviewCard key={item.id} {...item} />
          ))}
        </View>
      )}
    </Collapse>
  );
};

export default memo(ReviewSection);
