import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import PathCard from '../components/PathCard';
import LessonCard from '../components/LessonCard';
import DailyStreak from '../components/DailyStreak';

const learningPaths = [
  {
    id: 1,
    title: 'Mindfulness Meditation',
    description: 'Learn the art of mindful meditation',
    lessons: 24,
    progress: 8,
    color: '#FF6B6B',
    image: 'https://api.a0.dev/assets/image?text=peaceful%20meditation%20zen%20minimal%20illustration&aspect=16:9'
  },
  {
    id: 2,
    title: 'Public Speaking',
    description: 'Master the art of public speaking',
    lessons: 30,
    progress: 15,
    color: '#4ECDC4',
    image: 'https://api.a0.dev/assets/image?text=public%20speaking%20confidence%20minimal%20illustration&aspect=16:9'
  },
  {
    id: 3,
    title: 'Music Theory',
    description: 'Understanding music fundamentals',
    lessons: 40,
    progress: 5,
    color: '#45B7D1',
    image: 'https://api.a0.dev/assets/image?text=music%20notes%20theory%20minimal%20illustration&aspect=16:9'
  }
];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const handleLessonPress = () => {
    router.push({
      pathname: '/path',
      params: { path: JSON.stringify(learningPaths[0]) }
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left', 'top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000 }}
          style={styles.header}
        >
          <View style={styles.welcomeContainer}>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.welcomeText}>Continue your spiritual journey</Text>
          </View>
          
          <View style={styles.statsPreview}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="lightning-bolt" size={24} color="#F9A87A" />
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Lesson Streak</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={[styles.statItem, { borderLeftColor: '#A8D5BA' }]}>
              <MaterialCommunityIcons name="book-open-variant" size={24} color="#A8D5BA" />
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Scripture</Text>
            </View>
          </View>
        </MotiView>

        <View style={styles.section}>
          <MotiView
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 800 }}
          >
            <DailyStreak />
          </MotiView>
        </View>
        
        <View style={styles.section}>
          <MotiView
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 800 }}
          >
            <Text style={styles.sectionTitle}>Continue Learning</Text>
            <View style={styles.nextLessonContainer}>
              <LessonCard
                title="Basic Techniques"
                description="Learn fundamental meditation practices"
                duration="15:45"
                icon="meditation"
                image="https://api.a0.dev/assets/image?text=peaceful%20meditation%20zen%20minimal%20illustration&aspect=16:9"
                onPress={handleLessonPress}
              />
            </View>
          </MotiView>
        </View>
        
        <View style={styles.section}>
          <MotiView
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 800, delay: 200 }}
          >
            <Text style={styles.sectionTitle}>Learning Paths</Text>
            <View style={styles.pathsContainer}>
              {learningPaths.map((path, index) => (
                <MotiView
                  key={path.id}
                  from={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ delay: index * 100 + 400 }}
                >
                  <PathCard key={path.id} path={path} />
                </MotiView>
              ))}
            </View>
          </MotiView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
    height: '100%',
  },
  scrollView: {
    flexGrow: 1,
  },
  scrollContent: {
    flexGrow: 1, 
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    paddingTop: 12,
    gap: 20,
  },
  welcomeContainer: {
    gap: 4,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5D5A8C',
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B618F',
    opacity: 0.9,
  },
  statsPreview: {
    flexDirection: 'row',
    backgroundColor: '#FFF9F0',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#F9A87A',
    gap: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8F4E3',
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#F9A87A',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D5A8C',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B618F',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E6D7FF',
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D5A8C',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  nextLessonContainer: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  pathsContainer: {
    padding: 20,
    gap: 20,
  }
});