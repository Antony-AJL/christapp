import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type LessonActionSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  lesson: {
    title: string;
    description: string;
    duration: string;
    completed?: boolean;
  };
  onStart?: () => void;
  onComplete?: () => void;
};

export default function LessonActionSheet({ 
  isVisible, 
  onClose, 
  lesson,
  onStart,
  onComplete
}: LessonActionSheetProps) {
  // Prevent modal from showing if lesson data is incomplete
  if (!lesson || !lesson.title) {
    return null;
  }

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          
          <View style={styles.content}>
            <Text style={styles.title}>{lesson.title}</Text>
            <Text style={styles.description}>{lesson.description}</Text>
            
            <View style={styles.durationContainer}>
              <MaterialCommunityIcons name="clock-outline" size={20} color="#6B618F" />
              <Text style={styles.duration}>{lesson.duration}</Text>
            </View>

            <View style={styles.actions}>
              {lesson.completed ? (
                <View style={styles.completedContainer}>
                  <MaterialCommunityIcons name="check-circle" size={24} color="#7BB686" />
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              ) : (
                <Pressable 
                  style={styles.primaryButton}
                  onPress={() => {
                    if (onStart) onStart();
                  }}
                >
                  <MaterialCommunityIcons name="play" size={24} color="white" />
                  <Text style={styles.primaryButtonText}>Start Lesson</Text>
                </Pressable>
              )}

              <Pressable 
                style={[
                  styles.secondaryButton,
                  lesson.completed && styles.secondaryButtonCompleted
                ]} 
                onPress={() => {
                  if (onComplete) onComplete();
                }}
              >
                <MaterialCommunityIcons 
                  name={lesson.completed ? "refresh" : "check"} 
                  size={24} 
                  color="#5D5A8C" 
                />
                <Text style={styles.secondaryButtonText}>
                  {lesson.completed ? "Reset Progress" : "Mark as Complete"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    ...Platform.select({
      ios: {
        // iOS specific styling
      },
      android: {
        // Android specific styling to ensure proper rendering
        elevation: 4,
      },
    }),
  },
  sheet: {
    backgroundColor: '#FFF9F0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingTop: 8,
    minHeight: 300,
    ...Platform.select({
      android: {
        elevation: 8,
      },
    }),
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E6D7FF',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  content: {
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D5A8C',
  },
  description: {
    fontSize: 16,
    color: '#6B618F',
    lineHeight: 24,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  duration: {
    fontSize: 16,
    color: '#6B618F',
  },
  actions: {
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#8B7BB6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#F5F0FF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButtonCompleted: {
    backgroundColor: '#FFF0F0',
  },
  secondaryButtonText: {
    color: '#5D5A8C',
    fontSize: 16,
    fontWeight: '600',
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F0FFF4',
    borderRadius: 12,
    padding: 16,
  },
  completedText: {
    color: '#7BB686',
    fontSize: 16,
    fontWeight: '600',
  },
});