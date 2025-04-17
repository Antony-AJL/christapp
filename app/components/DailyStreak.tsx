import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo } from 'react';

const weekDayLabels = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];

export default function DailyStreak() {
  // Get current date information
  const today = useMemo(() => {
    const date = new Date();
    // Convert to 0-based day of week where 0 is Monday (to match our weekDayLabels)
    // JavaScript's getDay() returns 0 for Sunday, so we need to convert
    const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
    return {
      date,
      dayIndex,
      dayLabel: weekDayLabels[dayIndex]
    };
  }, []);

  // Mock data - in real app, this would come from an API or local storage
  const currentStreak: number = 3;
  // Mock one day as completed for the streak (yesterday)
  const yesterdayIndex = today.dayIndex === 0 ? 6 : today.dayIndex - 1;
  const completedDays = [weekDayLabels[yesterdayIndex]];
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>For you</Text>
      
      <View style={styles.streakContainer}>
        {weekDayLabels.map((day, index) => (
          <View key={day} style={styles.dayContainer}>
            <View style={[
              styles.streakCircle,
              completedDays.includes(day) && styles.streakCircleActive,
              index === today.dayIndex && styles.currentDay
            ]}>
              <MaterialCommunityIcons 
                name="cross" 
                size={16} 
                color={completedDays.includes(day) ? '#5D5A8C' : '#E6D7FF'} 
              />
            </View>
            <Text style={[
              styles.dayText,
              index === today.dayIndex && styles.currentDayText
            ]}>
              {day}
            </Text>
          </View>
        ))}
      </View>

      <Pressable style={styles.practiceCard}>
        <View style={styles.practiceContent}>
          <MaterialCommunityIcons name="book-open-variant" size={24} color="#5D5A8C" />
          <View style={styles.practiceTextContainer}>
            <Text style={styles.practiceTitle}>
              Sharpen your skills in 3 mins with a quick practice session
            </Text>
          </View>
        </View>
        <Pressable style={styles.startButton}>
          <Text style={styles.startButtonText}>Start practice</Text>
        </Pressable>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D5A8C',
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  dayContainer: {
    alignItems: 'center',
    gap: 4,
  },
  streakCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF9F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E6D7FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  streakCircleActive: {
    backgroundColor: '#A8D5BA',
    borderColor: '#8B7BB6',
  },
  currentDay: {
    borderColor: '#F9A87A',
    borderWidth: 2,
  },
  dayText: {
    fontSize: 12,
    color: '#6B618F',
  },
  currentDayText: {
    fontWeight: 'bold',
    color: '#F9A87A',
  },
  streakInfoContainer: {
    alignItems: 'center',
    marginTop: -8,
  },
  streakInfoText: {
    fontSize: 14,
    color: '#5D5A8C',
    fontWeight: '600',
  },
  practiceCard: {
    backgroundColor: '#FFF9F0',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 2,
    borderColor: '#A8D5BA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  practiceContent: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  practiceTextContainer: {
    flex: 1,
  },
  practiceTitle: {
    fontSize: 16,
    color: '#5D5A8C',
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#A8D5BA',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});