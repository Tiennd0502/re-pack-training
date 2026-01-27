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
  onPress: () => void;
}

const ProfileItem = ({ icon, title, onPress }: ProfileItemProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View className="flex-row items-center align-middle justify-between py-5">
        <View className="w-[20px] justify-center items-center">{icon}</View>
        <View className="ml-[10px]">
          <Text className="text-primary text-base font-primary">{title}</Text>
        </View>
        <View className="ml-auto mr-0">
          <ChevronIcon direction={DIRECTION.RIGHT} disabled />
        </View>
      </View>
      <Divider />
    </TouchableOpacity>
  );
};

export default ProfileItem;
