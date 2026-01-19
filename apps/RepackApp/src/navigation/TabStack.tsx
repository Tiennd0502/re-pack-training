import { ReactNode, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

// Interfaces
import { SCREENS, TabBarIcon } from '@/interfaces/navigation';

// Screens || Stack
import HomeScreen from '@/screens/Home';
import ProfileScreen from '@/screens/Profile';
import { useTheme } from '@repo/hooks/useTheme';

// Components
import HomeIcon from '@repo/ui/components/Icons/HomeIcon';
import UserIcon from '@repo/ui/components/Icons/UserIcon';

const Tabs = createBottomTabNavigator();

const renderTabBarIcon =
  (screen: string) =>
  ({ focused }: TabBarIcon): ReactNode => {
    switch (screen) {
      case SCREENS.HOME:
        return <HomeIcon isActive={focused} disabled />;

      case SCREENS.PROFILE:
        return <UserIcon isActive={focused} disabled />;
      default:
        return null;
    }
  };

const TabsStack = () => {
  const { theme } = useTheme();

  const tabBarStyle = useMemo(
    () => ({
      borderColor: theme.secondary,
      backgroundColor: theme.secondary,
      shadowColor: theme.primary,
    }),
    [theme.secondary, theme.primary],
  );

  const renderTabBarButton = useCallback(
    (props: BottomTabBarButtonProps) => (
      <TouchableOpacity
        activeOpacity={1}
        {...(props as TouchableOpacityProps)}
      />
    ),
    [],
  );

  return (
    <Tabs.Navigator
      initialRouteName={SCREENS.HOME}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: renderTabBarIcon(route.name),
        tabBarButton: renderTabBarButton,
        tabBarStyle: {
          ...styles.tabBarStyle,
          ...tabBarStyle,
        },
      })}
    >
      <Tabs.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Tabs.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

export default TabsStack;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    paddingTop: 12,
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    zIndex: 3,
    borderTopWidth: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 16,
  },
});
