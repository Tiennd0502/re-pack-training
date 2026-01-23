import { Platform, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useCallback, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

// Interfaces
import { Category } from '@repo/types/category';
import { Product } from '@repo/types/product';

// Constants
import { INIT_PAGE } from '@repo/constants/common';
import { Banners } from '@repo/constants/images';

// Hooks
import { useProducts } from '@/hooks/useProducts';

// Utils
import { getData } from '@repo/utils/common';

// Component
import MainLayout from '@/components/MainLayout';
import WomenIcon from '@repo/ui/components/Icons/WomenIcon';
import MenIcon from '@repo/ui/components/Icons/MenIcon';
import EyeglassesIcon from '@repo/ui/components/Icons/EyeglassesIcon';
import ScrewdriverIcon from '@repo/ui/components/Icons/ScrewdriverIcon';
import Categories from '@repo/ui/components/Categories';
import Button from '@repo/ui/components/Button';
import ProductList from '@repo/ui/components/ProductList';
import { ProductCardType } from '@repo/ui/components/ProductCard';
import PromoBanner, { PromoBannerType } from '@repo/ui/components/PromoBanner';
import { SCREENS } from '@/interfaces/navigation';
import { NavigationProp } from '@react-navigation/native';

const CATEGORIES: Category[] = [
  {
    label: 'Women',
    key: 'women',
    Icon: WomenIcon,
  },
  {
    label: 'Men',
    key: 'men',
    Icon: MenIcon,
  },
  {
    label: 'Accessories',
    key: 'accessories',
    Icon: EyeglassesIcon,
  },
  {
    label: 'Beauty',
    key: 'beauty',
    Icon: ScrewdriverIcon,
  },
];

const isAndroid = Platform.OS === 'android';

const Home = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { useFetchProducts } = useProducts();
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useFetchProducts(INIT_PAGE);

  const pages = useMemo(() => data?.pages || [], [data?.pages]);
  const products = useMemo(
    () => (pages.length > 0 && getData<Product>(pages as never[])) || [],
    [pages],
  );

  const [categoryKey, setCategoryKey] = useState(CATEGORIES[0]);

  const containerClassName = twMerge(
    'flex-1 w-full h-full justify-start mt-10 pb-[${isAndroid ? 130 : 100}px]',
    isAndroid ? 'pb-[100px]' : 'pb-[80px]',
  );

  const handleChangeCategory = useCallback((value: Category) => {
    setCategoryKey(value);
  }, []);

  const handleShowAllProduct = useCallback(() => {
    navigation.navigate(SCREENS.PRODUCTS);
  }, [navigation]);

  const handlePressProduct = useCallback(() => {}, []);

  const handleLoadMoreProduct = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isLoading, isFetchingNextPage]);

  const handlePressCollection = useCallback(() => {}, []);

  const handlePressBeautyBanner = useCallback(() => {}, []);

  const handlePressShirtsBanner = useCallback(() => {}, []);

  const handlePressDressesBanner = useCallback(() => {}, []);

  const handleShowAllTopCollection = useCallback(() => {}, []);

  return (
    <MainLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className={containerClassName}>
          <View className="justify-start gap-5 px-6">
            <Categories
              list={CATEGORIES}
              keyActivated={categoryKey.key}
              onChange={handleChangeCategory}
            />

            <View className="w-full flex-row justify-between items-center">
              <Text className="text-2xl font-bold">Feature Products</Text>
              <Button
                variant="ghost"
                text="Show all"
                className="text-sm text-senary pr-0 w-auto"
                onPress={handleShowAllProduct}
              />
            </View>
          </View>

          <View className="w-full">
            <ProductList
              data={products}
              isLoading={isLoading || isFetchingNextPage}
              productCardType={ProductCardType.Tertiary}
              onPressItem={handlePressProduct}
              onLoadMore={handleLoadMoreProduct}
            />
          </View>

          <View className="mt-5 h-40">
            <PromoBanner
              title={`HANG OUT \n& PARTY`}
              tag="|  NEW COLLECTION"
              image={Banners.collection}
              height={158}
              widthImage={119}
              heightImage={158}
              onPress={handlePressCollection}
            />
          </View>

          <View className="w-full flex-row justify-between items-center mt-3 mb-2 px-6">
            <Text className="text-2xl font-bold">Recommended</Text>
            <Button
              variant="ghost"
              text="Show all"
              className="text-sm text-senary pr-0 w-auto"
              onPress={handleShowAllProduct}
            />
          </View>

          <View className="w-full ">
            <ProductList
              data={products}
              isLoading={isLoading || isFetchingNextPage}
              productCardType={ProductCardType.Secondary}
              onPressItem={handlePressProduct}
              onLoadMore={handleLoadMoreProduct}
            />
          </View>
          <View className="flex-row justify-between items-center mt-3 mb-2 px-6">
            <Text className="text-2xl font-bold">Top Collection</Text>
            <Button
              variant="ghost"
              text="Show all"
              className="text-sm text-senary"
              onPress={handleShowAllTopCollection}
            />
          </View>
          <View className="w-full px-6 gap-5">
            <PromoBanner
              title={`FOR SLIM\n& BEAUTY`}
              tag="|  Sale up to 40%"
              image={Banners.beauty}
              height={141}
              widthImage={128}
              heightImage={141}
              type={PromoBannerType.Secondary}
              onPress={handlePressBeautyBanner}
            />
            <PromoBanner
              title={`Most sexy\n& fabulous\ndesign`}
              tag="|  Summer Collection 2025"
              image={Banners.fabulous}
              height={210}
              widthImage={128}
              heightImage={210}
              type={PromoBannerType.Tertiary}
              onPress={handlePressBeautyBanner}
            />
          </View>
          <View className="flex-row justify-between gap-5 mt-5 px-6">
            <PromoBanner
              title={`The\nOffice\nLife`}
              tag="T-Shirts"
              image={Banners.shirts}
              height={194}
              widthImage={110}
              heightImage={194}
              isReversed
              type={PromoBannerType.Quaternary}
              onPress={handlePressShirtsBanner}
            />
            <PromoBanner
              title={`Elegant\nDesign`}
              tag="Dresses"
              image={Banners.dresses}
              height={194}
              widthImage={110}
              heightImage={194}
              type={PromoBannerType.Quaternary}
              onPress={handlePressDressesBanner}
            />
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default Home;
