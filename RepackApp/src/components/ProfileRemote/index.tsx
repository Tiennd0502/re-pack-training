import React, { Suspense, lazy, Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const ProfileRemoteComponent = lazy(() => {
  console.log('[ProfileRemote] Attempting to load ProfileRemote/Profile...');
  return import('ProfileRemote/Profile')
    .then(module => {
      console.log('[ProfileRemote] Successfully loaded:', module);
      // Profile component is exported as default
      if (module.default) {
        return module;
      } else {
        throw new Error(
          'Profile component not found in module (no default export)',
        );
      }
    })
    .catch(error => {
      console.error('[ProfileRemote] Failed to load:', error);
      console.error('[ProfileRemote] Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
      throw error; // Re-throw để Suspense có thể handle
    });
});

interface ProfileRemoteProps {
  userName?: string;
  userEmail?: string;
  onEditPress?: () => void;
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
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
              color: '#ff0000',
            }}
          >
            Failed to load ProfileRemote
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#666',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            Make sure ProfileRemote is running on port 8082{'\n'}
            Start it with: cd ProfileRemote && pnpm start
          </Text>
          {this.state.error && (
            <Text style={{ fontSize: 12, color: '#999', textAlign: 'center' }}>
              Error: {this.state.error.message}
            </Text>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

const ProfileRemote: React.FC<ProfileRemoteProps> = props => {
  return (
    <ProfileRemoteErrorBoundary>
      <Suspense
        fallback={
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={{ marginTop: 10, color: '#666' }}>
              Loading Profile...
            </Text>
          </View>
        }
      >
        <ProfileRemoteComponent {...props} />
      </Suspense>
    </ProfileRemoteErrorBoundary>
  );
};

export default ProfileRemote;
