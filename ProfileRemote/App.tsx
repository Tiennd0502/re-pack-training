import Profile from './src/module/Profile';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </View>
  );
}

function AppContent() {
  return (
    <View style={styles.container}>
      <Profile userName="John Doe" userEmail="john.doe@example.com" onEditPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
