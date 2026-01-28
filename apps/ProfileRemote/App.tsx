import Profile from './src/module/Profile';
import { StatusBar, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { User } from '@repo/types/user';

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
  const mockUser: User = {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    country: 'USA',
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phoneNumber: '+1234567890',
  };

  return (
    <View className="flex-1 bg-background">
      <Profile user={mockUser} onLogout={() => {}} />
    </View>
  );
}

export default App;
