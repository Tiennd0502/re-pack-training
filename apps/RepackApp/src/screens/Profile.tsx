import { Suspense, lazy, useCallback } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';

// Hooks | Stores
import { useTheme } from '@repo/hooks/useTheme';
import { useUserStore } from '@repo/stores/user';
import { useAuthStore } from '@repo/stores/auth';

// Components
import MainLayout from '@/components/MainLayout';
import RemoteErrorBoundary from '@/components/RemoteErrorBoundary';

const ProfileRemoteComponent = lazy(() => import('ProfileRemote/Profile'));

const ProfileScreen = () => {
  const { theme } = useTheme();
  const user = useUserStore(state => state.user);
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);

  const handleGoToLogout = useCallback(async () => {
    await useAuthStore.persist.clearStorage();
    await useUserStore.persist.clearStorage();
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);

  return (
    <MainLayout className="flex-1">
      <ScrollView
        contentContainerClassName="flex-1 w-full"
        showsVerticalScrollIndicator={false}
      >
        <RemoteErrorBoundary title="Profile">
          <Suspense
            fallback={
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color={theme.primary} />
                <Text className="mt-2 text-primary text-lg">
                  Loading Profile...
                </Text>
              </View>
            }
          >
            {user && (
              <ProfileRemoteComponent user={user} onLogout={handleGoToLogout} />
            )}
          </Suspense>
        </RemoteErrorBoundary>
      </ScrollView>
    </MainLayout>
  );
};

export default ProfileScreen;
