import '../../nativewind.css';

import Profile from './src/module/Profile';
import { StatusBar, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <View className="flex-1 bg-background">
      <Profile
        userName="John Doe"
        userEmail="john.doe@example.com"
        onLogout={() => {}}
      />
    </View>
  );
}

export default App;
