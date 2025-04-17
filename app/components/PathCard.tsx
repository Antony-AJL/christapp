import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';

type PathType = {
  id: number;
  title: string;
  description: string;
  lessons: number;
  progress: number;
  color: string;
  image: string;
};

type PathCardProps = {
  path: PathType;
  navigation?: any; // Keep for backward compatibility
};

export default function PathCard({ path, navigation }: PathCardProps) {
  const router = useRouter();
  const progressPercentage = (path.progress / path.lessons) * 100;
  
  const getPathStyles = (pathId: number) => {
    switch (pathId) {
      case 1:
        return {
          borderColor: '#A8D5BA',
          overlayColor: 'rgba(168, 213, 186, 0.85)',
          progressColor: '#A8D5BA',
          textShadow: '#2C5A3E',
          iconBackground: 'rgba(168, 213, 186, 0.3)',
          borderAccent: 'rgba(168, 213, 186, 0.3)'
        };
      case 2:
        return {
          borderColor: '#F9A87A',
          overlayColor: 'rgba(249, 168, 122, 0.85)',
          progressColor: '#F9A87A',
          textShadow: '#8B4924',
          iconBackground: 'rgba(249, 168, 122, 0.3)',
          borderAccent: 'rgba(249, 168, 122, 0.3)'
        };
      case 3:
        return {
          borderColor: '#8B7BB6',
          overlayColor: 'rgba(139, 123, 182, 0.85)',
          progressColor: '#8B7BB6',
          textShadow: '#3D3563',
          iconBackground: 'rgba(139, 123, 182, 0.3)',
          borderAccent: 'rgba(139, 123, 182, 0.3)'
        };
      default:
        return {
          borderColor: '#8B7BB6',
          overlayColor: 'rgba(139, 123, 182, 0.85)',
          progressColor: '#8B7BB6',
          textShadow: '#3D3563',
          iconBackground: 'rgba(139, 123, 182, 0.3)',
          borderAccent: 'rgba(139, 123, 182, 0.3)'
        };
    }
  };

  const pathStyles = getPathStyles(path.id);
  
  const handlePress = () => {
    // Use expo-router for navigation
    router.push({
      pathname: '/path',
      params: { path: JSON.stringify(path) }
    });
  };
  
return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 450 }}
    >      <Pressable 
        style={[styles.container, { borderColor: pathStyles.borderColor }]}
        onPress={handlePress}
      >
        <ImageBackground 
          source={{ uri: path.image }} 
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >          <View style={[
            styles.content, 
            { 
              backgroundColor: pathStyles.overlayColor,
              borderColor: pathStyles.borderAccent
            }
          ]}>
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>{path.title}</Text>
                <Text style={styles.description}>{path.description}</Text>
              </View>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
              </View>
            </View>
            
            <View style={styles.footer}>
              <View style={styles.statsContainer}>
                <MaterialCommunityIcons name="book-open-variant" size={16} color="white" />
                <Text style={styles.statsText}>
                  {path.progress}/{path.lessons} lessons
                </Text>
              </View>
              
              <View style={styles.progressWrapper}>
                <View style={styles.progressContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { 
                        backgroundColor: pathStyles.progressColor,
                        width: `${progressPercentage}%`
                      }
                    ]} 
                  >
                    <Text style={{ height: 0, width: 0 }}></Text>
                  </View>
                </View>
                <Text style={styles.progressText}>{Math.round(progressPercentage)}%</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Pressable>
    </MotiView>
  );
}  const styles = StyleSheet.create({  
    container: {
      height: 180,
      borderRadius: 20,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
      transform: [{ scale: 1 }],
      borderWidth: 2,
    },
    background: {
      flex: 1,
    },
    backgroundImage: {
      borderRadius: 20,
    },  
    content: {
      flex: 1,
      padding: 20,
      justifyContent: 'space-between',
      borderWidth: 1,
    },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(248, 244, 227, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    maxWidth: '80%',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  footer: {
    gap: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statsText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressContainer: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(248, 244, 227, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },    progressBar: {
      height: '100%',
      borderRadius: 2,
    },
  progressText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    minWidth: 45,
  },
});