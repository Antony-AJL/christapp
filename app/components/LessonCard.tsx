import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import LessonActionSheet from './LessonActionSheet';

type LessonCardProps = {
  title: string;
  description: string;
  duration: string;
  progress?: number;
  image: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress?: () => void;
  navigation?: any;
};

export default function LessonCard({ 
  title, 
  description, 
  duration, 
  progress = 0,
  image,
  icon,
  onPress,
  navigation 
}: LessonCardProps) {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [actionSheetReady, setActionSheetReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure action sheet is ready after component mount
    const timer = setTimeout(() => {
      setActionSheetReady(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handlePress = () => {
    if (actionSheetReady) {
      setShowActionSheet(true);
    }
  };

  const handleComplete = () => {
    setCompleted(!completed);
    // Add a small delay before closing to ensure UI updates properly
    setTimeout(() => {
      setShowActionSheet(false);
    }, 100);
  };

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 450 }}
    >
      <Pressable style={styles.container} onPress={handlePress}>
        <ImageBackground 
          source={{ uri: image }} 
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <View style={styles.content}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name={icon} size={24} color="white" />
              </View>
              
              <View style={styles.textContent}>
                <View>
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.description}>{description}</Text>
                </View>
                
                <View style={styles.footer}>
                  <View style={styles.durationContainer}>
                    <MaterialCommunityIcons name="clock-outline" size={16} color="white" />
                    <Text style={styles.duration}>{duration}</Text>
                  </View>
                  
                  <View style={styles.actionContainer}>
                    <MaterialCommunityIcons 
                      name={completed ? "check-circle" : "play-circle"} 
                      size={28} 
                      color={completed ? "#7BB686" : "white"} 
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Pressable>

      {actionSheetReady && (
        <LessonActionSheet
          isVisible={showActionSheet}
          onClose={() => setShowActionSheet(false)}
          lesson={{
            title,
            description,
            duration,
            completed
          }}
          onStart={onPress}
          onComplete={handleComplete}
        />
      )}
    </MotiView>
  );
}

const styles = StyleSheet.create({  container: {
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#A8D5BA',
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    borderRadius: 20,
  },  overlay: {
    flex: 1,
    backgroundColor: 'rgba(93, 90, 140, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  content: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    gap: 16,
  },  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#A8D5BA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF9F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(248, 244, 227, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  duration: {
    color: 'white',
    fontSize: 14,
  },
  actionContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(248, 244, 227, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});