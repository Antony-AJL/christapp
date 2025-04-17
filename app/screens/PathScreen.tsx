import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter, Stack, Tabs, Link } from 'expo-router';
import { useState } from 'react';
import AudioPlayerSheet from '../components/AudioPlayerSheet';
import LessonActionSheet from '../components/LessonActionSheet';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';

type LessonType = {
  id: number;
  title: string;
  description?: string;
  duration: string;
  completed: boolean;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

const mockLessons: LessonType[] = [
  {
    id: 1,
    title: "Foundations of Faith",
    description: "Begin your spiritual journey with core concepts",
    duration: "10:23",
    completed: true,
    icon: "book-open-variant"
  },
  {
    id: 2,
    title: "Prayer & Meditation",
    description: "Learn the art of spiritual connection",
    duration: "15:45",
    completed: true,
    icon: "meditation"
  },
  {
    id: 3,
    title: "Understanding Scripture",
    description: "Dive deep into biblical wisdom",
    duration: "12:30",
    completed: false,
    icon: "book-cross"
  },
  {
    id: 4,
    title: "Living Faith",
    description: "Apply teachings to daily life",
    duration: "18:15",
    completed: false,
    icon: "heart-outline"
  },
  {
    id: 5,
    title: "Spiritual Mastery",
    description: "Advanced spiritual practices",
    duration: "14:20",
    completed: false,
    icon: "crown"
  }
];

export default function PathScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const path = JSON.parse(params.path as string);
  const progressPercentage = (path.progress / path.lessons) * 100;
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<LessonType | null>(null);

  const handleLessonPress = (lesson: LessonType, index: number) => {
    // Don't open locked lessons
    if (!lesson.completed && index > 0 && !mockLessons[index-1].completed) {
      return;
    }
    
    setCurrentLesson(lesson);
    setShowActionSheet(true);
  };

  const handleStartLesson = () => {
    setShowActionSheet(false);
    setShowAudioPlayer(true);
  };

  const handleLessonComplete = () => {
    if (currentLesson) {
      // Update the lesson status in the mockLessons array
      const updatedLessons = mockLessons.map(lesson => 
        lesson.id === currentLesson.id 
          ? { ...lesson, completed: true } 
          : lesson
      );
      // In a real app, you would update this in your state management or backend
      
      setShowAudioPlayer(false);
      
      // Show action sheet after audio lesson completion
      setTimeout(() => {
        setShowActionSheet(true);
      }, 300); // Short delay to allow audio player to close
    }
  };

  const handleToggleComplete = () => {
    if (currentLesson) {
      // Toggle the completed status
      const updatedCurrentLesson = {
        ...currentLesson,
        completed: !currentLesson.completed
      };
      
      // Update the lesson in mockLessons
      const lessonIndex = mockLessons.findIndex(l => l.id === currentLesson.id);
      if (lessonIndex !== -1) {
        mockLessons[lessonIndex] = updatedCurrentLesson;
      }
      
      // Update current lesson state
      setCurrentLesson(updatedCurrentLesson);
      
      // Close the action sheet
      setShowActionSheet(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <ImageBackground 
          source={{ uri: path.image }}
          style={styles.header}
          imageStyle={styles.headerImage}
        >
          <View style={styles.headerOverlay}>
            <Pressable 
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <MaterialCommunityIcons name="chevron-left" size={32} color="white" />
            </Pressable>
            
            <View style={styles.headerContent}>
              <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
              >
                <Text style={styles.title}>{path.title}</Text>
                <Text style={styles.description}>{path.description}</Text>
              </MotiView>

              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{path.progress}</Text>
                  <Text style={styles.statLabel}>Completed</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{path.lessons}</Text>
                  <Text style={styles.statLabel}>Total Lessons</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{Math.round(progressPercentage)}%</Text>
                  <Text style={styles.statLabel}>Progress</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* Lessons Section */}
        <View style={styles.lessonsContainer}>
          {mockLessons.map((lesson, index) => (
            <MotiView
              key={lesson.id}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: index * 100 }}
            >
              <Pressable 
                style={[
                  styles.lessonCard,
                  lesson.completed && styles.lessonCardCompleted,
                  !lesson.completed && index > 0 && !mockLessons[index-1].completed && styles.lessonCardLocked
                ]}
                onPress={() => handleLessonPress(lesson, index)}
                disabled={!lesson.completed && index > 0 && !mockLessons[index-1].completed}
              >
                <View style={styles.lessonContent}>
                  <View style={[
                    styles.iconContainer,
                    lesson.completed && styles.iconContainerCompleted
                  ]}>
                    <MaterialCommunityIcons 
                      name={lesson.icon} 
                      size={28} 
                      color={lesson.completed ? '#F8F4E3' : '#5D5A8C'} 
                    />
                  </View>
                  
                  <View style={styles.lessonInfo}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonDescription}>{lesson.description}</Text>
                    <View style={styles.lessonMeta}>
                      <View style={styles.durationContainer}>
                        <MaterialCommunityIcons 
                          name="clock-outline" 
                          size={14} 
                          color="#6B618F" 
                        />
                        <Text style={styles.duration}>{lesson.duration}</Text>
                      </View>
                      {lesson.completed && (
                        <View style={styles.completedBadge}>
                          <MaterialCommunityIcons 
                            name="check-circle" 
                            size={14} 
                            color="#7BB686" 
                          />
                          <Text style={styles.completedText}>Completed</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <MaterialCommunityIcons 
                    name={!lesson.completed && index > 0 && !mockLessons[index-1].completed ? "lock" : lesson.completed ? "check-circle" : "play-circle"} 
                    size={24} 
                    color={lesson.completed ? "#7BB686" : !lesson.completed && index > 0 && !mockLessons[index-1].completed ? "#6B618F" : "#F9A87A"} 
                  />
                </View>
              </Pressable>
            </MotiView>
          ))}
        </View>
      </ScrollView>
      
      {currentLesson && (
        <>
          <LessonActionSheet
            isVisible={showActionSheet}
            onClose={() => setShowActionSheet(false)}
            lesson={{
              title: currentLesson.title,
              description: currentLesson.description || "",
              duration: currentLesson.duration,
              completed: currentLesson.completed
            }}
            onStart={handleStartLesson}
            onComplete={handleToggleComplete}
          />
          <AudioPlayerSheet
            isVisible={showAudioPlayer}
            onClose={() => setShowAudioPlayer(false)}
            lesson={{
              title: currentLesson.title,
              description: currentLesson.description || "",
              duration: currentLesson.duration,
              audioUrl: require('../../assets/audio/meditation.mp3'), // Using a placeholder audio file
              completed: currentLesson.completed
            }}
            onComplete={handleLessonComplete}
          />
        </>
      )}
      
      {/* Bottom Navigation Bar */}
      <View style={styles.tabBar}>
        <Link href="/" asChild>
          <Pressable style={styles.tabItem}>
            <MaterialCommunityIcons name="home-outline" size={24} color="#6B618F" />
          </Pressable>
        </Link>
        <Link href="/QuickListenScreen" asChild>
          <Pressable style={styles.tabItem}>
            <MaterialCommunityIcons name="music-note" size={24} color="#6B618F" />
          </Pressable>
        </Link>
        <Link href="/ContinueScreen" asChild>
          <Pressable style={styles.tabItem}>
            <MaterialCommunityIcons name="play-circle" size={24} color="#6B618F" />
          </Pressable>
        </Link>
        <Link href="/DailyScreen" asChild>
          <Pressable style={styles.tabItem}>
            <MaterialCommunityIcons name="book-cross" size={24} color="#6B618F" />
          </Pressable>
        </Link>
        <Link href="/ProfileScreen" asChild>
          <Pressable style={styles.tabItem}>
            <MaterialCommunityIcons name="account-outline" size={24} color="#6B618F" />
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4E3',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    height: 340,
  },
  headerImage: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(93, 90, 140, 0.8)',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    padding: 16,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 24,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F8F4E3',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#F8F4E3',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(248, 244, 227, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8F4E3',
  },
  statLabel: {
    fontSize: 12,
    color: '#F8F4E3',
    opacity: 0.8,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(248, 244, 227, 0.2)',
  },
  lessonsContainer: {
    padding: 24,
    gap: 16,
  },
  lessonCard: {
    backgroundColor: '#FFF9F0',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E6D7FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 16,
  },
  lessonCardCompleted: {
    backgroundColor: '#F5F0FF',
    borderColor: '#A8D5BA',
  },
  lessonCardLocked: {
    opacity: 0.7,
  },
  lessonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F5F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerCompleted: {
    backgroundColor: '#5D5A8C',
  },
  lessonInfo: {
    flex: 1,
    gap: 4,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5D5A8C',
  },
  lessonDescription: {
    fontSize: 14,
    color: '#6B618F',
    opacity: 0.8,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  duration: {
    fontSize: 14,
    color: '#6B618F',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0FFF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedText: {
    fontSize: 12,
    color: '#7BB686',
    fontWeight: '500',
  },
  tabBar: {
    backgroundColor: '#FFF9F0',
    borderTopWidth: 1,
    borderTopColor: '#E6D7FF',
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 12,
  },
});