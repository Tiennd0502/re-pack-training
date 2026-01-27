import { ReactNode, memo } from 'react';
import { twMerge } from 'tailwind-merge';

// Hooks
import { useTheme } from '@repo/hooks/useTheme';

// Components
import Header from '../Header';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView className={wrapperClassName}>
      <Header />
      {children}
    </SafeAreaView>
  );
};

export default memo(MainLayout);
