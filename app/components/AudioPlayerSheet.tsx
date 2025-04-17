import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, Animated, Dimensions, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';

type AudioSource = string | number; // string for URI, number for require()

type AudioPlayerSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  lesson: {
    title: string;
    description: string;
    duration: string;
    audioUrl: AudioSource;
    imageUrl?: string;
    completed?: boolean;
  };
  onComplete?: () => void;
};

const { width, height } = Dimensions.get('window');

export default function AudioPlayerSheet({ 
  isVisible, 
  onClose, 
  lesson,
  onComplete
}: AudioPlayerSheetProps) {
  const router = useRouter();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const positionTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Load audio when the component mounts
  useEffect(() => {
    if (isVisible) {
      loadAudio();
    }
    
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (positionTimer.current) {
        clearInterval(positionTimer.current);
      }
    };
  }, [isVisible]);

  // Animation for the sheet
  useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      
      // Stop audio when closing
      if (sound) {
        sound.pauseAsync();
        setIsPlaying(false);
      }
    }
  }, [isVisible]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  const loadAudio = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      
      // Handle both URI strings and required module assets
      const source = typeof lesson.audioUrl === 'string' 
        ? { uri: lesson.audioUrl } 
        : lesson.audioUrl;
      
      const { sound: newSound } = await Audio.Sound.createAsync(
        source,
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      
      setSound(newSound);
      
      // Start position update timer
      if (positionTimer.current) {
        clearInterval(positionTimer.current);
      }
      
      positionTimer.current = setInterval(async () => {
        if (sound && isPlaying) {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            setPosition(status.positionMillis);
          }
        }
      }, 1000);
      
    } catch (error) {
      console.error('Failed to load audio', error);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis);
      
      // Update playing state
      setIsPlaying(status.isPlaying);
      
      // Auto-complete when audio finishes
      if (status.didJustFinish) {
        setIsPlaying(false);
        
        // Small delay to ensure the UI updates before closing
        setTimeout(() => {
          if (onComplete) {
            onComplete();
          }
        }, 500);
      }
    }
  };

  const togglePlayPause = async () => {
    if (!sound) return;
    
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const seekBackward = async () => {
    if (!sound) return;
    
    const newPosition = Math.max(0, position - 15000); // 15 seconds back
    await sound.setPositionAsync(newPosition);
    setPosition(newPosition);
  };

  const seekForward = async () => {
    if (!sound || !duration) return;
    
    const newPosition = Math.min(duration, position + 15000); // 15 seconds forward
    await sound.setPositionAsync(newPosition);
    setPosition(newPosition);
  };

  const onSeek = async (value: number) => {
    if (!sound) return;
    
    const newPosition = value * duration;
    await sound.setPositionAsync(newPosition);
    setPosition(newPosition);
  };

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercentage = duration > 0 ? position / duration : 0;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View 
        style={[
          styles.container,
          { transform: [{ translateY }] }
        ]}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Header with close button */}
          <View style={styles.header}>
            <Pressable 
              style={styles.closeButton} 
              onPress={() => {
                // Pause audio if playing
                if (sound && isPlaying) {
                  sound.pauseAsync();
                  setIsPlaying(false);
                }
                
                onClose();
              }}
            >
              <MaterialCommunityIcons name="chevron-down" size={28} color="#5D5A8C" />
            </Pressable>
          </View>
          
          {/* Cover image */}
          <View style={styles.imageContainer}>
            {lesson.imageUrl ? (
              <Image 
                source={{ uri: lesson.imageUrl }} 
                style={styles.coverImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholderImage}>
                <MaterialCommunityIcons name="music" size={80} color="#8B7BB6" />
              </View>
            )}
          </View>
          
          {/* Lesson info */}
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{lesson.title}</Text>
            <Text style={styles.description}>{lesson.description}</Text>
          </View>
          
          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progressPercentage * 100}%` }
                ]} 
              />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(position)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>
          
          {/* Controls */}
          <View style={styles.controlsContainer}>
            <Pressable style={styles.controlButton} onPress={seekBackward}>
              <MaterialCommunityIcons name="rewind-15" size={36} color="#5D5A8C" />
            </Pressable>
            
            <Pressable style={styles.playPauseButton} onPress={togglePlayPause}>
              <MaterialCommunityIcons 
                name={isPlaying ? "pause" : "play"} 
                size={48} 
                color="white" 
              />
            </Pressable>
            
            <Pressable style={styles.controlButton} onPress={seekForward}>
              <MaterialCommunityIcons name="fast-forward-15" size={36} color="#5D5A8C" />
            </Pressable>
          </View>
          
          {/* Complete button */}
          <View style={styles.completeButtonContainer}>
            <Pressable 
              style={styles.completeButton} 
              onPress={() => {
                // Pause audio if playing
                if (sound && isPlaying) {
                  sound.pauseAsync();
                  setIsPlaying(false);
                }
                
                // Animate out the modal
                Animated.timing(slideAnim, {
                  toValue: 0.5,
                  duration: 200,
                  useNativeDriver: true,
                }).start(() => {
                  if (onComplete) {
                    onComplete();
                  }
                });
              }}
            >
              <MaterialCommunityIcons name="check" size={24} color="#5D5A8C" />
              <Text style={styles.completeButtonText}>
                {lesson.completed ? "Lesson Completed" : "Mark as Complete"}
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 1000,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 16,
  },
  closeButton: {
    padding: 4,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E6D7FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  infoContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D5A8C',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6B618F',
    lineHeight: 24,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E6D7FF',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B7BB6',
    borderRadius: 3,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 14,
    color: '#6B618F',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  controlButton: {
    padding: 12,
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8B7BB6',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
  },
  completeButtonContainer: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  completeButton: {
    backgroundColor: '#F5F0FF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  completeButtonText: {
    color: '#5D5A8C',
    fontSize: 16,
    fontWeight: '600',
  },
}); 