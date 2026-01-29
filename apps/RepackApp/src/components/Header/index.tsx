import { memo, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

// Types
import { DIRECTION } from '@repo/types/style';
import { SCREENS } from '@/types/navigation';

// Hooks | Stores
import { useTheme } from '@repo/hooks/useTheme';
import { useAuthStore } from '@repo/stores/auth';
import { useUserStore } from '@repo/stores/user';

// Components
import ChevronIcon from '@repo/ui/components/Icons/ChevronIcon';
import { HeartIcon } from '@repo/ui/components/Icons/HeartIcon';
import MenuIcon from '@repo/ui/components/Icons/MenuIcon';
import NotificationIcon from '@repo/ui/components/Icons/NotificationIcon';

const Header = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useUserStore(state => state.user);

  const { theme } = useTheme();
  const { name = '', params = { id: '' } } = route;

  const handleShowMenu = useCallback(() => null, []);

  const handleShowNotification = useCallback(() => null, []);

  const handleGoToBack = useCallback(() => {
    if (navigation.canGoBack()) {
      return navigation.goBack();
    } else if (isAuthenticated) {
      return navigation.reset({
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
    }
    return navigation.navigate(SCREENS.AUTH_STACK, {
      screen: SCREENS.LOGIN,
    });
  }, [navigation, isAuthenticated]);

  const handleChangeFavorite = useCallback(() => {}, []);

  const productId = (params as { id: string })?.id || '';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        icon: {
          minWidth: 50,
        },
        iconBack: {
          width: 36,
          height: 36,
          borderRadius: 36,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: theme.primary,
          backgroundColor: theme.background,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 12,
        },
      }),
    [theme.primary, theme.background],
  );

  const header = useMemo(() => {
    switch (name) {
      case SCREENS.HOME: {
        return {
          title: 'Fluxstore',
          leftIcon: <MenuIcon onPress={handleShowMenu} disabled />,
          rightIcon: (
            <NotificationIcon onPress={handleShowNotification} disabled />
          ),
        };
      }

      case SCREENS.PRODUCTS: {
        return {
          title: '',
          leftIcon: (
            <View className="flex-row items-center gap-5">
              <ChevronIcon
                direction={DIRECTION.LEFT}
                style={styles.iconBack}
                onPress={handleGoToBack}
              />
              <Text className="text-primary text-xl font-bold">Dresses</Text>
            </View>
          ),
        };
      }

      case SCREENS.PRODUCT_DETAIL: {
        const isFavorite = productId
          ? user?.favorites?.includes(productId)
          : false;
        return {
          title: '',
          leftIcon: (
            <ChevronIcon
              direction={DIRECTION.LEFT}
              style={styles.iconBack}
              onPress={handleGoToBack}
            />
          ),
          rightIcon: (
            <HeartIcon onPress={handleChangeFavorite} isActive={isFavorite} />
          ),
        };
      }

      case SCREENS.CART: {
        return {
          title: 'Your Cart',
          leftIcon: (
            <ChevronIcon
              color={theme.primary}
              direction={DIRECTION.LEFT}
              style={styles.iconBack}
              onPress={handleGoToBack}
            />
          ),
        };
      }

      case SCREENS.SHIPPING_ADDRESS:
      case SCREENS.ORDER_COMPLETED: {
        return {
          title: 'Check out',
          leftIcon: (
            <ChevronIcon
              direction={DIRECTION.LEFT}
              style={styles.iconBack}
              onPress={handleGoToBack}
            />
          ),
        };
      }

      default: {
        return undefined;
      }
    }
  }, [
    name,
    theme.primary,
    handleShowMenu,
    handleShowNotification,
    styles.iconBack,
    handleGoToBack,
    productId,
    user?.favorites,
    handleChangeFavorite,
  ]);

  if (!header) {
    return null;
  }

  const { title = '', leftIcon = null, rightIcon = null } = header || {};

  return (
    <View className="w-full flex-row items-center justify-between h-11 pt-2 px-6">
      <View className="flex-1">{leftIcon && leftIcon}</View>
      <Text className="flex-1 text-center text-primary text-xl font-bold">
        {title}
      </Text>
      <View className="flex-1 justify-end items-end">
        {rightIcon && rightIcon}
      </View>
    </View>
  );
};

export default memo(Header);
