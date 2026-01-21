import { Suspense, lazy, Component, ReactNode, useCallback } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';

// Hooks | Stores
import { useTheme } from '@repo/hooks/useTheme';
import { useUserStore } from '@repo/stores/user';
import { useAuthStore } from '@repo/stores/auth';

// Components
import MainLayout from '@/components/MainLayout';

const ProfileRemoteComponent = lazy(() => import('ProfileRemote/Profile'));

interface ProfileRemoteProps {
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}

class ProfileRemoteErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-xl font-bold mb-2 text-error">
            Failed to load Profile
          </Text>
          {this.state.error && (
            <Text className="text-sm text-gray-500 text-center">
              Error: {this.state.error?.message}
            </Text>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

const ProfileScreen: React.FC<ProfileRemoteProps> = () => {
  const { theme } = useTheme();
  const user = useUserStore(state => state.user);
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);

  const handleGoToLogout = useCallback(async () => {
    await useAuthStore.persist.clearStorage();
    await useUserStore.persist.clearStorage();
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);

  return (
    <MainLayout>
      <ScrollView
        contentContainerClassName="flex-1 w-full"
        showsVerticalScrollIndicator={false}
      >
        <ProfileRemoteErrorBoundary>
          <Suspense
            fallback={
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color={theme.info} />
                <Text className="mt-2 text-gray-500">Loading Profile...</Text>
              </View>
            }
          >
            <ProfileRemoteComponent
              userName={user?.name}
              userEmail={user?.email}
              onLogout={handleGoToLogout}
            />
          </Suspense>
        </ProfileRemoteErrorBoundary>
      </ScrollView>
    </MainLayout>
  );
};

export default ProfileScreen;
