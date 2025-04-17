import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import ActivityCalendar from '../components/ActivityCalendar';
import { subDays, addDays } from 'date-fns';

// Create comprehensive mock data showing different streak patterns
const today = new Date();
const mockActivityDates = [
  // Current streak - 8 days (today and 7 previous days)
  today,
  subDays(today, 1),
  subDays(today, 2),
  subDays(today, 3),
  subDays(today, 4),
  subDays(today, 5),
  subDays(today, 6),
  subDays(today, 7),
  
  // Gap of 2 days
  
  // Previous streak - 3 days
  subDays(today, 10),
  subDays(today, 11),
  subDays(today, 12),
  
  // Single day activity
  subDays(today, 15),
  
  // Another streak - 2 days
  subDays(today, 18),
  subDays(today, 19),
  
  // Activity in previous month
  subDays(today, 28),
  subDays(today, 29),
  subDays(today, 30),
];

export default function ProfileScreen() {
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleShareProfile = () => {
    Alert.alert('Success', 'Profile link copied to clipboard!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000 }}
        >
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: 'https://api.a0.dev/assets/image?text=peaceful%20profile%20avatar%20minimal&aspect=1:1' }}
                  style={styles.avatar}
                />
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>12</Text>
                </View>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.bio}>On a journey of faith and learning</Text>
                <View style={styles.joinedContainer}>
                  <MaterialCommunityIcons name="calendar" size={14} color="#6B618F" />
                  <Text style={styles.joinedText}>Joined April 2024</Text>
                </View>
              </View>
            </View>
            
            {/* Activity Calendar */}
            <ActivityCalendar 
              activityDates={mockActivityDates}
              currentStreak={8}
              totalLessons={48}
            />
          </View>
        </MotiView>

        {/* Journey Progress */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000, delay: 200 }}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Journey Distribution</Text>
            <View style={[styles.distributionContainer, { marginTop: 4 }]}>
              <View style={styles.chartContainer}>
                <View style={styles.totalActivitiesOverlay}>
                  <Text style={styles.totalNumber}>156</Text>
                  <Text style={styles.totalLabel}>Total</Text>
                </View>
                <View style={styles.pieChart}>
                  {/* Prayer Segment - 30% */}
                  <View style={[styles.pieSegment, { 
                    backgroundColor: '#8B7BB6',
                    transform: [{ rotate: '0deg' }],
                    borderTopRightRadius: 100,
                    borderBottomRightRadius: 100,
                    zIndex: 4
                  }]} />
                  
                  {/* Kindness Segment - 35% */}
                  <View style={[styles.pieSegment, { 
                    backgroundColor: '#F9A87A',
                    transform: [{ rotate: '108deg' }],
                    borderTopRightRadius: 100,
                    borderBottomRightRadius: 100,
                    zIndex: 3
                  }]} />
                  
                  {/* Scripture Segment - 25% */}
                  <View style={[styles.pieSegment, { 
                    backgroundColor: '#A8D5BA',
                    transform: [{ rotate: '234deg' }],
                    borderTopRightRadius: 100,
                    borderBottomRightRadius: 100,
                    zIndex: 2
                  }]} />
                  
                  {/* Wisdom Segment - 10% */}
                  <View style={[styles.pieSegment, { 
                    backgroundColor: '#F5BB89',
                    transform: [{ rotate: '324deg' }],
                    borderTopRightRadius: 100,
                    borderBottomRightRadius: 100,
                    zIndex: 1
                  }]} />
                </View>
              </View>

              <View style={styles.legendContainer}>
                <View style={styles.legendRow}>
                  <View style={styles.legendItem}>
                    <MaterialCommunityIcons name="heart" size={20} color="#F9A87A" />
                    <Text style={styles.legendLabel}>Kindness</Text>
                    <Text style={styles.legendValue}>35%</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <MaterialCommunityIcons name="hands-pray" size={20} color="#8B7BB6" />
                    <Text style={styles.legendLabel}>Prayer</Text>
                    <Text style={styles.legendValue}>30%</Text>
                  </View>
                </View>
                <View style={styles.legendRow}>
                  <View style={styles.legendItem}>
                    <MaterialCommunityIcons name="book-open-variant" size={20} color="#A8D5BA" />
                    <Text style={styles.legendLabel}>Scripture</Text>
                    <Text style={styles.legendValue}>25%</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <MaterialCommunityIcons name="lightbulb" size={20} color="#F5BB89" />
                    <Text style={styles.legendLabel}>Wisdom</Text>
                    <Text style={styles.legendValue}>10%</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </MotiView>

        {/* Recent Activity */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000, delay: 400 }}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.activityContainer}>
              <View style={styles.activityCard}>
                <View style={[styles.activityIcon, { backgroundColor: '#8B7BB6' }]}>
                  <MaterialCommunityIcons name="star" size={24} color="white" />
                </View>
                <View style={styles.activityContent}>
                  <View style={[styles.activityBadge, { backgroundColor: '#F5F0FF' }]}>
                    <Text style={styles.activityTitle}>Completed Daily Challenge</Text>
                    <Text style={styles.activityTime}>2 hours ago</Text>
                  </View>
                </View>
              </View>

              <View style={styles.activityCard}>
                <View style={[styles.activityIcon, { backgroundColor: '#F9A87A' }]}>
                  <MaterialCommunityIcons name="trophy" size={24} color="white" />
                </View>
                <View style={styles.activityContent}>
                  <View style={[styles.activityBadge, { backgroundColor: '#FFF5F0' }]}>
                    <Text style={styles.activityTitle}>Earned Prayer Warrior Badge</Text>
                    <Text style={styles.activityTime}>Yesterday</Text>
                  </View>
                </View>
              </View>

              <View style={styles.activityCard}>
                <View style={[styles.activityIcon, { backgroundColor: '#A8D5BA' }]}>
                  <MaterialCommunityIcons name="book" size={24} color="white" />
                </View>
                <View style={styles.activityContent}>
                  <View style={[styles.activityBadge, { backgroundColor: '#F0FFF4' }]}>
                    <Text style={styles.activityTitle}>Completed Scripture Study</Text>
                    <Text style={styles.activityTime}>2 days ago</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </MotiView>

        {/* Quick Actions */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000, delay: 600 }}
        >
          <View style={styles.section}>
            <View style={styles.actionButtons}>
              <Pressable 
                style={[styles.actionButton, { backgroundColor: '#F5F0FF' }]}
                onPress={() => setShowEditProfile(true)}
              >
                <MaterialCommunityIcons name="account-edit" size={24} color="#8B7BB6" />
                <Text style={[styles.actionButtonText, { color: '#8B7BB6' }]}>Edit Profile</Text>
              </Pressable>

              <Pressable 
                style={[styles.actionButton, { backgroundColor: '#FFF5F0' }]}
                onPress={handleShareProfile}
              >
                <MaterialCommunityIcons name="share" size={24} color="#F9A87A" />
                <Text style={[styles.actionButtonText, { color: '#F9A87A' }]}>Share Profile</Text>
              </Pressable>
            </View>
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
    gap: 20,
  },
  profileSection: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#8B7BB6',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#F9A87A',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF9F0',
  },
  levelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D5A8C',
  },
  bio: {
    fontSize: 14,
    color: '#6B618F',
    marginBottom: 4,
  },
  joinedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  joinedText: {
    fontSize: 12,
    color: '#6B618F',
  },
  section: {
    padding: 20,
    gap: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5D5A8C',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  distributionContainer: {
    backgroundColor: '#F8F4E3',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    gap: 28,
    shadowColor: '#6B618F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E6D7FF',
  },
  chartContainer: {
    width: 200,
    height: 200,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalActivitiesOverlay: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF9F0',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    shadowColor: '#6B618F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 4,
    borderColor: 'rgba(248, 244, 227, 0.8)',
  },
  totalNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#5D5A8C',
    marginBottom: 2,
  },
  totalLabel: {
    fontSize: 14,
    color: '#6B618F',
  },
  pieChart: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    position: 'relative',
    transform: [{ rotate: '-90deg' }],
    shadowColor: '#6B618F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  pieSegment: {
    position: 'absolute',
    width: 100,
    height: 200,
    right: 0,
    top: 0,
    transformOrigin: 'left center',
  },
  legendContainer: {
    width: '100%',
    gap: 20,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    backgroundColor: '#FFF9F0',
    padding: 14,
    borderRadius: 16,
    shadowColor: '#6B618F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  legendLabel: {
    fontSize: 14,
    color: '#5D5A8C',
    fontWeight: '500',
    flex: 1,
  },
  legendValue: {
    fontSize: 14,
    color: '#6B618F',
    fontWeight: '600',
  },
  activityContainer: {
    gap: 12,
  },
  activityCard: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityBadge: {
    padding: 12,
    borderRadius: 12,
    gap: 4,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5D5A8C',
  },
  activityTime: {
    fontSize: 12,
    color: '#6B618F',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E6D7FF',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});