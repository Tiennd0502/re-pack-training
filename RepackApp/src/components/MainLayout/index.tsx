import { ReactNode, memo } from 'react';

// Hooks
import { useTheme } from '@/hooks/useTheme';

// Components
import Header from '../Header';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isDark } = useTheme();

  const wrapperClassName = twMerge(
    'flex-1 bg-background text-primary',
    isDark && 'dark',
  );

  return (
    <View className={wrapperClassName}>
      <Header />
      {children}
    </View>
  );
};

export default memo(MainLayout);
