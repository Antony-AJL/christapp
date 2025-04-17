import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';

export default function DailyScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const handleShare = () => {
    Alert.alert('Success', 'Verse copied to clipboard!');
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Hero Section with Stats */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000 }}
        >
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.title}>Daily Scripture</Text>
            </View>

            {/* Stats cards */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.statsContainer}
              contentContainerStyle={styles.statsContent}
            >
              <View style={[styles.statCard, { borderLeftColor: '#F9A87A' }]}>
                <MaterialCommunityIcons name="heart" size={24} color="#F9A87A" />
                <Text style={styles.statValue}>7</Text>
                <Text style={styles.statLabel}>Kindness</Text>
              </View>
              
              <View style={[styles.statCard, { borderLeftColor: '#8B7BB6' }]}>
                <MaterialCommunityIcons name="hand-heart" size={24} color="#8B7BB6" />
                <Text style={styles.statValue}>4</Text>
                <Text style={styles.statLabel}>Prayer</Text>
              </View>
              
              <View style={[styles.statCard, { borderLeftColor: '#A8D5BA' }]}>
                <MaterialCommunityIcons name="book-open-variant" size={24} color="#A8D5BA" />
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Scripture</Text>
              </View>
              
              <View style={[styles.statCard, { borderLeftColor: '#F9A87A' }]}>
                <MaterialCommunityIcons name="lightbulb" size={24} color="#F9A87A" />
                <Text style={styles.statValue}>5</Text>
                <Text style={styles.statLabel}>Wisdom</Text>
              </View>
            </ScrollView>
          </View>
        </MotiView>

        {/* Daily Verse Card */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000, delay: 200 }}
        >
          <View style={styles.verseContainer}>
            <View style={styles.verseCard}>
              <View style={styles.verseHeader}>
                <MaterialCommunityIcons name="book-cross" size={24} color="#F9A87A" />
                <Pressable onPress={handleShare} style={styles.shareButton}>
                  <MaterialCommunityIcons name="share-variant" size={20} color="#6B618F" />
                </Pressable>
              </View>
              <Text style={styles.verseText}>
                "For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."
              </Text>
              <Text style={styles.verseReference}>- Jeremiah 29:11</Text>
            </View>
          </View>
        </MotiView>

        {/* Christian Calendar Events */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000, delay: 400 }}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.eventsContainer}
            >
              <View style={[styles.eventCard, styles.activeEventCard]}>
                <View style={[styles.eventIcon, { backgroundColor: '#F9A87A' }]}>
                  <MaterialCommunityIcons name="star-four-points" size={24} color="white" />
                </View>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>Easter Sunday</Text>
                  <Text style={styles.eventDate}>March 31, 2024</Text>
                  <View style={styles.daysLeftContainer}>
                    <Text style={styles.daysLeft}>15 days left</Text>
                  </View>
                </View>
              </View>

              <View style={styles.eventCard}>
                <View style={[styles.eventIcon, { backgroundColor: '#8B7BB6' }]}>
                  <MaterialCommunityIcons name="candle" size={24} color="white" />
                </View>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>Advent Begins</Text>
                  <Text style={styles.eventDate}>December 1, 2024</Text>
                  <View style={styles.daysLeftContainer}>
                    <Text style={styles.daysLeft}>260 days left</Text>
                  </View>
                </View>
              </View>

              <View style={styles.eventCard}>
                <View style={[styles.eventIcon, { backgroundColor: '#A8D5BA' }]}>
                  <MaterialCommunityIcons name="cross" size={24} color="white" />
                </View>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>Good Friday</Text>
                  <Text style={styles.eventDate}>March 29, 2024</Text>
                  <View style={styles.daysLeftContainer}>
                    <Text style={styles.daysLeft}>13 days left</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </MotiView>

        {/* Daily Challenge */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000, delay: 600 }}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Challenges</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.challengesContainer}
            >
              <Pressable style={[styles.challengeCard, { backgroundColor: '#F5F0FF' }]}>
                <View style={styles.cardInner}>
                  <View style={styles.challengeHeader}>
                    <View style={[styles.challengeIcon, { backgroundColor: '#8B7BB6' }]}>
                      <MaterialCommunityIcons name="heart" size={24} color="white" />
                    </View>
                    <View style={styles.challengeContent}>
                      <Text style={styles.challengeTitle}>Acts of Kindness</Text>
                      <Text style={styles.challengeText}>
                        Help someone in need today
                      </Text>
                    </View>
                  </View>
                  <Pressable style={[styles.completeButton, { backgroundColor: '#8B7BB6' }]}>
                    <Text style={[styles.completeButtonText, { color: 'white' }]}>Complete</Text>
                  </Pressable>
                </View>
              </Pressable>

              <Pressable style={[styles.challengeCard, { backgroundColor: '#F0FFF4' }]}>
                <View style={styles.cardInner}>
                  <View style={styles.challengeHeader}>
                    <View style={[styles.challengeIcon, { backgroundColor: '#A8D5BA' }]}>
                      <MaterialCommunityIcons name="hands-pray" size={24} color="white" />
                    </View>
                    <View style={styles.challengeContent}>
                      <Text style={styles.challengeTitle}>Prayer Time</Text>
                      <Text style={styles.challengeText}>
                        Spend time in prayer
                      </Text>
                    </View>
                  </View>
                  <Pressable style={[styles.completeButton, { backgroundColor: '#A8D5BA' }]}>
                    <Text style={[styles.completeButtonText, { color: 'white' }]}>Complete</Text>
                  </Pressable>
                </View>
              </Pressable>

              <Pressable style={[styles.challengeCard, { backgroundColor: '#FFF5F0' }]}>
                <View style={styles.cardInner}>
                  <View style={styles.challengeHeader}>
                    <View style={[styles.challengeIcon, { backgroundColor: '#F9A87A' }]}>
                      <MaterialCommunityIcons name="book-open-variant" size={24} color="white" />
                    </View>
                    <View style={styles.challengeContent}>
                      <Text style={styles.challengeTitle}>Scripture Study</Text>
                      <Text style={styles.challengeText}>
                        Read and reflect on scripture
                      </Text>
                    </View>
                  </View>
                  <Pressable style={[styles.completeButton, { backgroundColor: '#F9A87A' }]}>
                    <Text style={[styles.completeButtonText, { color: 'white' }]}>Complete</Text>
                  </Pressable>
                </View>
              </Pressable>
            </ScrollView>
          </View>
        </MotiView>

        {/* Daily Virtues */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000, delay: 800 }}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Daily Virtues</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.virtuesContainer}
            >
              <Pressable style={[styles.virtueCard, { borderColor: '#8B7BB6' }]}>
                <View style={[styles.virtueIconWrapper, { backgroundColor: '#F5F0FF' }]}>
                  <MaterialCommunityIcons name="star" size={32} color="#8B7BB6" />
                </View>
                <Text style={styles.virtueTitle}>Faith</Text>
                <Text style={styles.virtueVerse}>"Now faith is confidence in what we hope for..."</Text>
                <Text style={styles.virtueReference}>Hebrews 11:1</Text>
              </Pressable>

              <Pressable style={[styles.virtueCard, { borderColor: '#A8D5BA' }]}>
                <View style={[styles.virtueIconWrapper, { backgroundColor: '#F0FFF4' }]}>
                  <MaterialCommunityIcons name="heart" size={32} color="#A8D5BA" />
                </View>
                <Text style={styles.virtueTitle}>Love</Text>
                <Text style={styles.virtueVerse}>"Love is patient, love is kind..."</Text>
                <Text style={styles.virtueReference}>1 Corinthians 13:4</Text>
              </Pressable>

              <Pressable style={[styles.virtueCard, { borderColor: '#F9A87A' }]}>
                <View style={[styles.virtueIconWrapper, { backgroundColor: '#FFF5F0' }]}>
                  <MaterialCommunityIcons name="peace" size={32} color="#F9A87A" />
                </View>
                <Text style={styles.virtueTitle}>Peace</Text>
                <Text style={styles.virtueVerse}>"Peace I leave with you..."</Text>
                <Text style={styles.virtueReference}>John 14:27</Text>
              </Pressable>
            </ScrollView>
          </View>
        </MotiView>
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
    paddingTop: 12,
    gap: 20,
  },
  headerContent: {
    gap: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5D5A8C',
    marginBottom: 16,
  },
  statsContainer: {
    marginHorizontal: -20,
  },
  statsContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#F8F4E3',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    minWidth: 100,
    borderLeftWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D5A8C',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B618F',
  },
  verseContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  verseCard: {
    backgroundColor: '#FFF9F0',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E6D7FF',
  },
  verseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  shareButton: {
    padding: 8,
  },
  verseText: {
    fontSize: 18,
    color: '#5D5A8C',
    lineHeight: 28,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  verseReference: {
    fontSize: 16,
    color: '#8B7BB6',
    textAlign: 'right',
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D5A8C',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  eventsContainer: {
    paddingHorizontal: 20,
    paddingRight: 36,
    gap: 16,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9F0',
    borderRadius: 16,
    padding: 16,
    gap: 16,
    width: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E6D7FF',
  },
  activeEventCard: {
    borderColor: '#F9A87A',
    backgroundColor: '#FFF9F0',
  },
  eventIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventInfo: {
    flex: 1,
    gap: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5D5A8C',
  },
  eventDate: {
    fontSize: 14,
    color: '#6B618F',
  },
  daysLeftContainer: {
    marginTop: 4,
  },
  daysLeft: {
    fontSize: 12,
    color: '#F9A87A',
    fontWeight: '500',
  },
  challengesContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  challengeCard: {
    width: 250,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardInner: {
    padding: 16,
    height: 180,
    justifyContent: 'space-between',
  },
  challengeHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  challengeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeContent: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5D5A8C',
    marginBottom: 4,
  },
  challengeText: {
    fontSize: 14,
    color: '#6B618F',
    lineHeight: 20,
  },
  completeButton: {
    backgroundColor: '#F5F0FF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#8B7BB6',
    fontSize: 16,
    fontWeight: '600',
  },
  virtuesContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  virtueCard: {
    width: 180,
    backgroundColor: '#FFF9F0',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 2,
  },
  virtueIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  virtueTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D5A8C',
  },
  virtueVerse: {
    fontSize: 14,
    color: '#6B618F',
    textAlign: 'center',
    lineHeight: 20,
  },
  virtueReference: {
    fontSize: 12,
    color: '#8B7BB6',
    fontWeight: '500',
  },
});