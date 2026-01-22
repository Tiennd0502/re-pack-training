import '../../nativewind.css';

import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { QueryProvider } from '@repo/providers';
import { useThemeStore } from '@repo/stores/theme';
import { Navigation } from '@/navigation';

function App() {
  const { initializeTheme, isInitialized } = useThemeStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeTheme();
        setIsReady(true);
      } catch {
        setIsReady(true);
      }
    };
    init();
  }, [initializeTheme]);

  useEffect(() => {
    if (isReady) {
      RNBootSplash.hide({ fade: true });
    }
  }, [isReady]);

  if (!isInitialized || !isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryProvider>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </QueryProvider>
    </GestureHandlerRootView>
  );
}

export default App;
