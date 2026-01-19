import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum SCREENS {
  ONBOARDING_STACK = 'OnboardingStack',
  WELCOME = 'Welcome',
  INTRO = 'Intro',

  AUTH_STACK = 'AuthStack',
  LOGIN = 'Login',

  TABS = 'Tabs',
  HOME = 'Home',
  SEARCH = 'Search',

  CART_STACK = 'CartStack',
  CART = 'Cart',

  PRODUCT_STACK = 'ProductStack',
  PRODUCTS = 'Products',
  PRODUCT_DETAIL = 'ProductDetail',

  ORDER_STACK = 'OrderStack',
  ORDERS = 'Orders',
  SHIPPING_ADDRESS = 'ShippingAddress',
  ORDER_COMPLETED = 'OrderCompleted',

  PROFILE_STACK = 'ProfileStack',
  PROFILE = 'Profile',
}

export type OnboardingStackParamList = {
  [SCREENS.WELCOME]: undefined;
  [SCREENS.INTRO]: undefined;
};

export type AuthStackParamList = {
  [SCREENS.LOGIN]: undefined;
};

export type TabsStackParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.SEARCH]: undefined;
  [SCREENS.ORDER_STACK]: undefined;
  [SCREENS.PROFILE_STACK]: undefined;
};

export type ProductStackParamList = {
  [SCREENS.PRODUCTS]: undefined;
  [SCREENS.PRODUCT_DETAIL]: { id: string };
};

export type CartStackParamList = {
  [SCREENS.CART]: undefined;
};

export type OrderStackParamList = {
  [SCREENS.ORDERS]: undefined;
  [SCREENS.SHIPPING_ADDRESS]: undefined;
  [SCREENS.ORDER_COMPLETED]: undefined;
};

export type ProfileStackParamList = {
  [SCREENS.PROFILE]: undefined;
};

export type AppStackParamList = {
  [SCREENS.ONBOARDING_STACK]: NavigatorScreenParams<OnboardingStackParamList>;
  [SCREENS.AUTH_STACK]: NavigatorScreenParams<AuthStackParamList>;
  [SCREENS.TABS]: NavigatorScreenParams<TabsStackParamList>;
  [SCREENS.PRODUCT_STACK]: NavigatorScreenParams<ProductStackParamList>;
  [SCREENS.CART_STACK]: NavigatorScreenParams<CartStackParamList>;
  [SCREENS.ORDER_STACK]: NavigatorScreenParams<OrderStackParamList>;
  [SCREENS.PROFILE_STACK]: NavigatorScreenParams<ProfileStackParamList>;
  [SCREENS.SEARCH]: undefined;
};

export type BottomTabs = {
  [SCREENS.HOME]?: undefined;
  [SCREENS.SEARCH]?: undefined;
  [SCREENS.CART]?: undefined;
  [SCREENS.PROFILE]?: undefined;
};

export interface TabBarIcon {
  focused: boolean;
  color: string;
  size: number;
}

export type AppStackScreenProps<Screen extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, Screen>;

export type OnboardingScreenProps<
  Screen extends keyof OnboardingStackParamList,
> = CompositeScreenProps<
  NativeStackScreenProps<OnboardingStackParamList, Screen>,
  NativeStackScreenProps<AppStackParamList>
>;

export type AuthScreenProps<Screen extends keyof AuthStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, Screen>,
    NativeStackScreenProps<AppStackParamList>
  >;

export type BottomTabsScreenProps<Screen extends keyof TabsStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamList, Screen>,
    NativeStackScreenProps<AppStackParamList>
  >;

export type ProductScreenProps<Screen extends keyof ProductStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProductStackParamList, Screen>,
    NativeStackScreenProps<AppStackParamList>
  >;

export type CartScreenProps<Screen extends keyof CartStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<CartStackParamList, Screen>,
    NativeStackScreenProps<AppStackParamList>
  >;

export type OrderScreenProps<Screen extends keyof OrderStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<OrderStackParamList, Screen>,
    NativeStackScreenProps<AppStackParamList>
  >;

export type ProfileScreenProps<Screen extends keyof ProfileStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProfileStackParamList, Screen>,
    NativeStackScreenProps<AppStackParamList>
  >;
