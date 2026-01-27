import { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { twMerge } from 'tailwind-merge';

// Types
import type { Cart } from '@repo/types/cart';

// Components
import Divider from '@repo/ui/components/Divider';
import Button from '@repo/ui/components/Button';
import CartItem from '@repo/ui/components/CartItem';

const screenWidth = Dimensions.get('window').width;
const isAndroid = Platform.OS === 'android';

interface CartProps {
  currencyUnit: string;
  carts: Cart[];
  totalPrice: string;
  updateCartItem: (cart: Cart) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  currencyUnit,
  carts,
  totalPrice,
  updateCartItem,
  onCheckout,
}) => {
  const contentClassName = twMerge(
    'pt-6 px-6 bg-background text-primary',
    isAndroid ? 'p-bottom-[30px]' : 'p-bottom-[0px]',
  );

  const width = useMemo(() => screenWidth - 48, []);

  const getKeyExtractor = useCallback(({ id }: Cart) => id, []);

  const getItemLayout = useCallback(
    (_, index: number) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [width],
  );

  const renderListEmptyComponent = useCallback(
    () => <Text>Your Cart Is Empty</Text>,
    [],
  );

  const renderCartItem = useCallback(
    ({ item }: { item: Cart }) => {
      const handleChangeChecked = () => {
        updateCartItem({ ...item, isChecked: !item.isChecked });
      };

      const handleChangeQuantity = (value: number) => {
        updateCartItem({ ...item, quantity: value });
      };

      return (
        <CartItem
          key={item.id}
          {...item}
          onChangeChecked={handleChangeChecked}
          onChangeQuantity={handleChangeQuantity}
        />
      );
    },
    [updateCartItem],
  );

  return (
    <View className="flex-1 relative">
      <FlatList
        data={carts}
        extraData={carts}
        showsVerticalScrollIndicator={false}
        keyExtractor={getKeyExtractor}
        renderItem={renderCartItem}
        getItemLayout={getItemLayout}
        ListEmptyComponent={renderListEmptyComponent}
        contentContainerStyle={styles.carts}
      />
      <View className={contentClassName} style={styles.content}>
        <View className="flex-row justify-between py-4">
          <Text className="text-sm font-bold text-primary">Product price</Text>
          <Text className="text-sm font-primary text-primary">{`${currencyUnit} ${totalPrice}`}</Text>
        </View>
        <Divider />
        <View className="flex-row justify-between py-4">
          <Text className="text-sm font-bold text-primary">Shipping</Text>
          <Text className="text-sm font-bold text-primary">Freeship</Text>
        </View>
        <Divider />
        <View className="flex-row justify-between py-4 mb-3">
          <Text className="text-sm font-bold text-primary">Subtotal</Text>
          <Text className="text-xl font-primary text-primary">{`${currencyUnit} ${totalPrice}`}</Text>
        </View>
        <Button
          className="mb-4"
          size="sm"
          disabled={!(carts?.length && totalPrice)}
          text="Proceed to checkout"
          onPress={onCheckout}
        />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  carts: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 24,
    flexGrow: 1,
  },
  content: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },
});
