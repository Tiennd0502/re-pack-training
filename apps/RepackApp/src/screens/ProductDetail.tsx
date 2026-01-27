import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, RouteProp } from '@react-navigation/native';

// Interfaces
import { SCREENS } from '@/types/navigation';
import { DIRECTION } from '@repo/types/style';

// Constants
import { CURRENCY_UNIT } from '@repo/constants/common';
import { REVIEWS } from '@repo/constants/review';

// Hooks | Stores
import { useProducts } from '@/hooks/useProducts';
import { useTheme } from '@repo/hooks/useTheme';
import { useUserStore } from '@repo/stores/user';
import { useCartStore } from '@repo/stores/cart';

// Utils
import { formatAmount } from '@repo/utils/common';

// Components
import ChevronIcon from '@repo/ui/components/Icons/ChevronIcon';
import { HeartIcon } from '@repo/ui/components/Icons/HeartIcon';
import CartIcon from '@repo/ui/components/Icons/CartIcon';
import Skeleton from '@repo/ui/components/Skeleton';
import Rating from '@repo/ui/components/Rating';
import ColorSelector from '@repo/ui/components/ColorSelector';
import SizeSelector from '@repo/ui/components/SizeSelector';
import Divider from '@repo/ui/components/Divider';
import Collapse from '@repo/ui/components/Collapse';
import ReviewSection from '@repo/ui/components/ReviewSection';
import Button from '@repo/ui/components/Button';

const { width: screenWidth } = Dimensions.get('window');

const isAndroid = Platform.OS === 'android';

const ProductDetail = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}) => {
  const insets = useSafeAreaInsets();
  const { id = '' } = route.params || {};

  const user = useUserStore(state => state.user);
  const { theme, isDark } = useTheme();

  const { useProductDetail } = useProducts();
  const addNewCart = useCartStore(state => state.addNewCart);

  const {
    data: product,
    isLoading,
    isFetched,
    isError,
    refetch,
  } = useProductDetail(id);

  const {
    name = '',
    // carouselImages = [],
    price = 0,
    discount = 0,
    rating = 0,
    reviewCount = 0,
    colors: colorsPrd = [],
    sizes: sizesPrd = [],
    description = '',
  } = product || {};
  const isFavorite = user?.favorites?.includes(id);

  const [color, setColor] = useState(colorsPrd[0]);
  const [size, setSize] = useState(sizesPrd[0]);

  // const images = carouselImages?.map((url, index) => ({
  //   id: index.toString(),
  //   image: url,
  // }));

  const { originalPrice, promoPrice } = useMemo(
    () => ({
      promoPrice: discount ? formatAmount((price * discount) / 100) : 0,
      originalPrice: formatAmount(price),
    }),
    [price, discount],
  );

  // const renderItemCarousel = useCallback(
  //   ({ image }: CarouselCard) => (
  //     <Image
  //       style={{ width: '100%', height: 406 }}
  //       className="object-cover object-center overflow-hidden"
  //       source={{
  //         uri: image,
  //       }}
  //       resizeMode="cover"
  //     />
  //   ),
  //   [],
  // );

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

  const handleGoToBack = useCallback(() => {
    if (navigation?.canGoBack()) {
      navigation.goBack();
    } else {
      handleGoToHome();
    }
  }, [navigation, handleGoToHome]);

  const handleChangeFavorite = useCallback(() => {}, []);

  const handleChangeColor = useCallback((value: string) => {
    setColor(value);
  }, []);

  const handleChangeSizes = useCallback((value: string) => {
    setSize(value);
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (product) {
      addNewCart({
        id: product.id,
        product,
        colors: color,
        sizes: size,
        quantity: 1,
        isChecked: true,
      });
      Toast.show({
        type: 'success',
        text1: 'Added to cart',
        topOffset: insets.top + (isAndroid ? 10 : 0),
      });
      navigation.navigate(SCREENS.CART);
    }
  }, [navigation, product, color, size, addNewCart, insets]);

  useEffect(() => {
    if (isFetched) {
      setColor(colorsPrd[0]);
      setSize(sizesPrd[0]);
    }
  }, [isFetched, colorsPrd, sizesPrd]);

  useEffect(() => {
    if (isError) {
      Alert.alert(
        'Product detail error!',
        'Oops, looks like there was a problem loading product detail. Go to home screen',
        [
          {
            text: 'Yes',
            onPress: () => handleGoToHome(),
          },
          {
            text: 'Cancel',
            onPress: () => refetch(),
          },
        ],
      );
    }
  }, [isError, handleGoToHome, refetch]);

  return (
    <View
      className={`${isDark && 'dark '} flex-1 w-full relative pb-[77px] bg-background `}
    >
      <View
        className={`absolute flex-row justify-between items-center top-[70px] h-[50px] w-[${screenWidth}px] left-0 right-0 z-[10] flex-row items-center gap-4 px-6`}
      >
        <ChevronIcon
          className="w-10 h-10 rounded-[40px] justify-center align-middle items-center bg-background overflow-hidden"
          color={theme.primary}
          direction={DIRECTION.LEFT}
          onPress={handleGoToBack}
        />
        <HeartIcon
          className="w-10 h-10 rounded-[40px] justify-center align-middle items-center bg-background overflow-hidden"
          width={24}
          height={24}
          isActive={isFavorite}
          onPress={handleChangeFavorite}
        />
      </View>
      <View className="flex-1 relative bg-background">
        <ScrollView
          className="flex-1 mt-0"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 bottom-0 h-full relative z-[1]">
            {isLoading ? (
              <Skeleton width={screenWidth} height={426} />
            ) : (
              <Image
                source={{ uri: product?.image }}
                className="w-full h-[406px] object-cover object-center z-0"
              />
            )}
            <View className="flex-1 h-full px-6 z-3 pt-14 -top-10 bg-background rounded-t-[30px] overflow-hidden">
              <View className="flex-row justify-between">
                <View>
                  <Text className="text-lg font-primary font-bold text-primary">
                    {name}
                  </Text>
                  <View className="flex-row mt-4">
                    <Rating size={18} value={rating} />
                    <Text className="text-xs font-primary text-primary">{` (${reviewCount})`}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-[26px] font-primary font-bold text-septenary">
                    {`${CURRENCY_UNIT} ${promoPrice || originalPrice}`}
                  </Text>
                  {!!promoPrice && (
                    <Text className="text-sm font-primary text-septenary line-through">
                      {`${CURRENCY_UNIT} ${originalPrice}`}
                    </Text>
                  )}
                </View>
              </View>
              <View className="flex-row justify-between mt-9">
                <ColorSelector
                  colors={colorsPrd}
                  defaultValue={color}
                  onValueChange={handleChangeColor}
                />
                <SizeSelector
                  sizes={sizesPrd}
                  defaultValue={size}
                  onValueChange={handleChangeSizes}
                />
              </View>
              <View className="mt-8">
                <Divider />
                <Collapse label="Description">
                  <View className="w-full">
                    <Text className="text-sm text-quaternary">
                      {description}
                    </Text>
                  </View>
                </Collapse>
              </View>
              <ReviewSection reviews={REVIEWS} rating={rating} />
            </View>
          </View>
        </ScrollView>
      </View>

      <View className="absolute bottom-0 w-full h-[77px] bg-background">
        <Button
          className="h-[77px] border-b-0 rounded-bl-none rounded-br-none"
          text="Add to cart"
          startIcon={<CartIcon />}
          onPress={handleAddToCart}
        />
      </View>
    </View>
  );
};

export default ProductDetail;
