import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function ContinueScreen() {
  const router = useRouter();

  useEffect(() => {
    // Navigate after a short delay to ensure proper mount
    const timer = setTimeout(() => {
      const pathData = {
        id: 1,
        title: 'Mindfulness Meditation',
        description: 'Learn the art of mindful meditation',
        lessons: 24,
        progress: 8,
        color: '#8B7BB6',
        image: 'https://api.a0.dev/assets/image?text=peaceful%20meditation%20zen%20minimal%20illustration&aspect=16:9'
      };
      
      router.push({
        pathname: '/screens/PathScreen',
        params: {
          path: JSON.stringify(pathData)
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#8B7BB6" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 