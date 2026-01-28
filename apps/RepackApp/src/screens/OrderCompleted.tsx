import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationProp } from '@react-navigation/native';

// Types
import { SCREENS } from '@/types/navigation';

// Components
import MainLayout from '@/components/MainLayout';
import Button from '@repo/ui/components/Button';
import CartCompletedIcon from '@repo/ui/components/Icons/CartCompletedIcon';

interface OrderCompletedScreenProps {
  navigation: NavigationProp<any>;
}

const OrderCompletedScreen = ({ navigation }: OrderCompletedScreenProps) => {
  const handleGoToHome = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: SCREENS.TABS,
          state: {
            index: 0,
            routes: [{ name: SCREENS.HOME }],
          },
        },
      ],
    });
  }, [navigation]);

  return (
    <MainLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1"
      >
        <View className="flex-1 mt-10 px-6">
          <Text className="text-primary text-4xl font-bold mb-6">
            Order Completed
          </Text>
          <View className="flex-1 flex-col items-center justify-around">
            <View className="gap-5 mx-auto max-w-72 items-center">
              <CartCompletedIcon />
              <Text className="text-primary text-sm font-secondary text-center">
                {`Thank you for your purchase.\n You can view your order in 'My Orders' section.`}
              </Text>
            </View>

            <Button
              className="mb-5"
              size="sm"
              text="Continue shopping"
              onPress={handleGoToHome}
            />
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default OrderCompletedScreen;
