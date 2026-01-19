import { ReactNode, memo } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

// Hooks
import { useTheme } from '@repo/hooks/useTheme';

// Components
import Header from '../Header';

interface MainLayoutProps {
  className?: string;
  children: ReactNode;
}

const MainLayout = ({ children, className = '' }: MainLayoutProps) => {
  const { isDark } = useTheme();

  const wrapperClassName = twMerge(
    'flex-1 bg-background text-primary',
    isDark && 'dark',
    className,
  );

  return (
    <View className={wrapperClassName}>
      <Header />
      {children}
    </View>
  );
};

export default memo(MainLayout);
