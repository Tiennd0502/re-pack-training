import { memo } from "react";
import {
  DimensionValue,
  ImageSourcePropType,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import { twMerge } from "tailwind-merge";

export enum PromoBannerType {
  Primary = "primary",
  Secondary = "secondary",
  Tertiary = "tertiary",
  Quaternary = "quaternary",
}

interface PromoBannerProps {
  title: string;
  tag: string;
  image: ImageSourcePropType;
  type?: PromoBannerType;
  isReversed?: boolean;
  height: DimensionValue;
  widthImage: number;
  heightImage: number;
  onPress: () => void;
  className?: string;
}

const PromoBanner = ({
  title,
  tag,
  image,
  height,
  type = PromoBannerType.Primary,
  widthImage,
  heightImage,
  isReversed = false,
  onPress,
  className = "",
}: PromoBannerProps) => {
  const isPrimaryType = type === PromoBannerType.Primary;
  const isSecondaryType = type === PromoBannerType.Secondary;
  const isTertiaryType = type === PromoBannerType.Tertiary;
  const isQuaternaryType = type === PromoBannerType.Quaternary;

  const wrapperClassName = twMerge(
    "flex-1 flex-row justify-between overflow-hidden bg-secondary",
    isReversed ? "flex-row-reverse" : "flex-row",
    isPrimaryType ? "pl-[55px]" : "pl-6 rounded-[10px]",
    "pr-4",
    className,
  );

  const tagClassName = twMerge(
    "text-xs font-secondary font-semibold text-quaternary",
    isQuaternaryType && "text-[13px]",
  );

  const titleClassName = twMerge(
    "font-secondary font-normal text-tertiary",
    isSecondaryType && "text-quaternary font-semibold",
    isTertiaryType && "font-bold tracking-[1.2px]",
    isQuaternaryType && "font-normal text-lg text-primary",
  );

  const imageSource = typeof image === "string" ? { uri: image } : image;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={wrapperClassName}
      style={{ height }}
      onPress={onPress}
    >
      <View className="flex-1 justify-center items-start gap-6">
        <Text className={tagClassName}>{tag}</Text>
        <Text className={titleClassName}>{title}</Text>
      </View>

      <View className="flex-1 justify-center items-center relative">
        {!isQuaternaryType && (
          <>
            <View className="absolute opacity-50 w-[132px] h-[132px] rounded-full bg-septenary" />
            <View className="w-[102px] h-[102px] rounded-full bg-septenary" />
          </>
        )}
        <View className="absolute top-0 right-0 justify-center items-center z-[2]">
          <Image
            source={imageSource}
            resizeMode="cover"
            style={{
              width: widthImage,
              height: heightImage,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(PromoBanner);
