import { View, Text, StyleSheet, ScrollView, Pressable, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';

const quickListens = [
  {
    id: 1,
    title: "Morning Prayer",
    category: "Prayer",
    duration: "5 min",
    icon: "hand-heart",
    color: "#8B7BB6",
    image: "https://api.a0.dev/assets/image?text=morning%20prayer%20peaceful%20minimal&aspect=16:9",
  },
  {
    id: 2,
    title: "Psalm of the Day",
    category: "Scripture",
    duration: "3 min",
    icon: "book-open-variant",
    color: "#A8D5BA",
    image: "https://api.a0.dev/assets/image?text=psalm%20scripture%20peaceful%20minimal&aspect=16:9",
  },
  {
    id: 3,
    title: "Mindful Meditation",
    category: "Meditation",
    duration: "10 min",
    icon: "meditation",
    color: "#F9A87A",
    image: "https://api.a0.dev/assets/image?text=mindful%20meditation%20peaceful%20minimal&aspect=16:9",
  },
  {
    id: 4,
    title: "Evening Prayer",
    category: "Prayer",
    duration: "5 min",
    icon: "hand-heart",
    color: "#8B7BB6",
    image: "https://api.a0.dev/assets/image?text=evening%20prayer%20peaceful%20minimal&aspect=16:9",
  }
];

export default function QuickListenScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000 }}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Quick Listen</Text>
            <Text style={styles.subtitle}>Short, inspiring audio content</Text>
          </View>
        </MotiView>

        {/* Featured Daily Audio */}
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 1000 }}
        >
          <Pressable style={styles.featuredCard}>
            <ImageBackground
              source={{ uri: "https://api.a0.dev/assets/image?text=daily%20inspiration%20peaceful%20minimal&aspect=16:9" }}
              style={styles.featuredBackground}
              imageStyle={styles.featuredImage}
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
                style={styles.featuredGradient}
              >
                <View style={styles.featuredContent}>
                  <View style={styles.featuredMeta}>
                    <MaterialCommunityIcons name="star" size={20} color="#FFF" />
                    <Text style={styles.featuredLabel}>Today's Featured</Text>
                  </View>
                  <View>
                    <Text style={styles.featuredTitle}>Daily Devotional</Text>
                    <Text style={styles.featuredSubtitle}>Start your day with purpose</Text>
                  </View>
                  <View style={styles.featuredFooter}>
                    <View style={styles.durationBadge}>
                      <MaterialCommunityIcons name="clock-outline" size={14} color="#FFF" />
                      <Text style={styles.durationText}>5 min</Text>
                    </View>
                    <Pressable style={styles.playButton}>
                      <MaterialCommunityIcons name="play" size={24} color="#FFF" />
                    </Pressable>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </Pressable>
        </MotiView>

        {/* Quick Listen Cards */}
        <View style={styles.quickListensContainer}>
          {quickListens.map((item, index) => (
            <MotiView
              key={item.id}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: index * 100 }}
            >
              <Pressable style={styles.quickListenCard}>
                <ImageBackground
                  source={{ uri: item.image }}
                  style={styles.cardBackground}
                  imageStyle={styles.cardImage}
                >
                  <LinearGradient
                    colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.7)']}
                    style={styles.cardGradient}
                  >
                    <View style={styles.cardContent}>
                      <View style={[styles.categoryBadge, { backgroundColor: item.color }]}>
                        <MaterialCommunityIcons name={item.icon as any} size={14} color="#FFF" />
                        <Text style={styles.categoryText}>{item.category}</Text>
                      </View>
                      <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <View style={styles.cardMeta}>
                          <View style={styles.durationBadge}>
                            <MaterialCommunityIcons name="clock-outline" size={14} color="#FFF" />
                            <Text style={styles.durationText}>{item.duration}</Text>
                          </View>
                          <Pressable style={[styles.playButton, { backgroundColor: item.color }]}>
                            <MaterialCommunityIcons name="play" size={20} color="#FFF" />
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </Pressable>
            </MotiView>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5D5A8C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B618F',
  },
  featuredCard: {
    margin: 20,
    height: 200,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  featuredBackground: {
    flex: 1,
  },
  featuredImage: {
    borderRadius: 24,
  },
  featuredGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  featuredContent: {
    gap: 12,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featuredLabel: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  featuredSubtitle: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.9,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  quickListensContainer: {
    padding: 20,
    gap: 16,
  },
  quickListenCard: {
    height: 140,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  cardBackground: {
    flex: 1,
  },
  cardImage: {
    borderRadius: 20,
  },
  cardGradient: {
    flex: 1,
    padding: 16,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cardInfo: {
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  durationText: {
    color: '#FFF',
    fontSize: 14,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(139, 123, 182, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 