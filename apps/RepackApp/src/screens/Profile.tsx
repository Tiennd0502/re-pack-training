import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  Suspense,
  lazy,
  Component,
  ErrorInfo,
  ReactNode,
  useCallback,
} from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

// Interfaces
import { SCREENS } from '@/interfaces/navigation';

// Hooks | Stores
import { useTheme } from '@repo/hooks/useTheme';
import { useUserStore } from '@repo/stores/user';
import { useAuthStore } from '@repo/stores/auth';

const ProfileRemoteComponent = lazy(() =>
  import('ProfileRemote/Profile')
    .then(module => {
      console.log('[ProfileRemote] Module loaded:', module);
      return { default: module?.default };
    })
    .catch(error => {
      console.error('[ProfileRemote] Error loading module:', error);
      throw error;
    }),
);

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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ProfileRemote] Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-xl font-bold mb-2 text-error">
            Failed to load ProfileRemote
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

const ProfileScreen: React.FC<ProfileRemoteProps> = props => {
  const navigation = useNavigation<NavigationProp<any>>();

  const { theme } = useTheme();
  const user = useUserStore(state => state.user);
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);

  if (!user) {
    navigation.navigate(SCREENS.LOGIN);
  }

  const handleGoToLogout = useCallback(async () => {
    await useAuthStore.persist.clearStorage();
    await useUserStore.persist.clearStorage();
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);

  return (
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
          {...props}
          userName={user?.name}
          userEmail={user?.email}
          onLogout={handleGoToLogout}
        />
      </Suspense>
    </ProfileRemoteErrorBoundary>
  );
};

export default ProfileScreen;
