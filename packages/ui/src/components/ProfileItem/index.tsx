import { ReactNode } from "react";
import { TouchableOpacity, View, Text } from "react-native";

// Interfaces
import { DIRECTION } from "@repo/types/style";

// Components
import ChevronIcon from "../Icons/ChevronIcon";
import Divider from "../Divider";

interface ProfileItemProps {
  icon: ReactNode;
  title: string;
  disabled?: boolean;
  onPress?: () => void;
}

const ProfileItem = ({
  icon,
  title,
  disabled = false,
  onPress,
}: ProfileItemProps) => {
  const wrapperClassName = disabled ? "opacity-50" : "";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      className={wrapperClassName}
    >
      <View className="flex-row items-center align-middle justify-between py-5">
        <View className="w-[20px] justify-center items-center">{icon}</View>
        <View className="ml-[10px]">
          <Text className="text-primary text-base font-primary">{title}</Text>
        </View>
        <View className="ml-auto mr-0">
          <ChevronIcon direction={DIRECTION.RIGHT} />
        </View>
      </View>
      <Divider />
    </TouchableOpacity>
  );
};

export default ProfileItem;
