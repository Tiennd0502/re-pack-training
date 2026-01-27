import { Component, ReactNode } from 'react';
import { View, Text } from 'react-native';

class RemoteErrorBoundary extends Component<
  { children: ReactNode; title?: string },
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
            Failed to load {this.props.title || 'Remote Component'}
          </Text>
          {this.state.error && (
            <Text className="text-sm text-error text-center">
              Error: {this.state.error?.message}
            </Text>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

export default RemoteErrorBoundary;
