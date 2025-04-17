import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  getDay, 
  isSameDay,
  addDays,
  startOfWeek,
  endOfWeek
} from 'date-fns';

interface ActivityCalendarProps {
  activityDates: Date[];
  currentStreak: number;
  totalLessons: number;
}

const ActivityCalendar: React.FC<ActivityCalendarProps> = ({ 
  activityDates, 
  currentStreak, 
  totalLessons 
}) => {
  // Calculate calendar days
  const calendarDays = useMemo(() => {
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);
    
    // Get the start of the week containing the first day of the month
    const calendarStart = startOfWeek(monthStart);
    // Get the end of the week containing the last day of the month
    const calendarEnd = endOfWeek(monthEnd);
    
    // Get all days in the month including padding days from previous/next months
    const daysInCalendar = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    
    return daysInCalendar;
  }, []);

  // Check if a date is in the current month
  const isCurrentMonth = (date: Date) => {
    const today = new Date();
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  // Check if a date has activity
  const hasActivity = (date: Date | null) => {
    if (!date) return false;
    return activityDates.some(activityDate => 
      date && isSameDay(activityDate, date)
    );
  };

  // Check if date is today
  const isToday = (date: Date | null) => {
    if (!date) return false;
    return isSameDay(date, new Date());
  };

  // Check if date has been part of a streak
  const hasBeenPartOfStreak = (date: Date | null) => {
    if (!date || !hasActivity(date)) return false;
    
    // Check if previous or next day has activity (indicating it was part of a streak)
    const prevDay = new Date(date);
    prevDay.setDate(prevDay.getDate() - 1);
    
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    
    return hasActivity(prevDay) || hasActivity(nextDay);
  };

  // Determine connection direction (top, bottom, both or none)
  const getStreakConnectionType = (date: Date) => {
    if (!hasActivity(date)) return 'none';
    
    const prevDay = new Date(date);
    prevDay.setDate(prevDay.getDate() - 1);
    
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    
    const prevHasActivity = hasActivity(prevDay);
    const nextHasActivity = hasActivity(nextDay);
    
    if (prevHasActivity && nextHasActivity) return 'both';
    if (prevHasActivity) return 'top';
    if (nextHasActivity) return 'bottom';
    return 'none';
  };

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <MaterialCommunityIcons name="book-open-variant" size={20} color="#A8D5BA" />
          <Text style={styles.statValue}>{totalLessons}</Text>
          <Text style={styles.statLabel}>Lessons</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <MaterialCommunityIcons name="lightning-bolt" size={20} color="#F9A87A" />
          <Text style={styles.statValue}>{currentStreak}</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
      </View>
      
      <View style={styles.calendar}>
        {/* Weekday headers */}
        {weekDays.map((day, index) => (
          <View key={`header-${index}`} style={styles.dayHeader}>
            <Text style={styles.dayHeaderText}>{day}</Text>
          </View>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((day, index) => {
          const hasDayActivity = hasActivity(day);
          const wasPartOfStreak = hasBeenPartOfStreak(day);
          const isCurrentDay = isToday(day);
          
          return (
            <View key={`day-${index}`} style={styles.dayCellWrapper}>
              {/* Activity background - only for streak days */}
              {hasDayActivity && wasPartOfStreak && (
                <View style={styles.streakBackground} />
              )}
              
              {/* Day number */}
              <View style={[
                styles.dayCell,
                isCurrentDay && styles.todayCell
              ]}>
                <Text style={[
                  styles.dayText,
                  !isCurrentMonth(day) && styles.otherMonthText,
                  isCurrentDay && styles.todayText
                ]}>
                  {day.getDate()}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F4E3',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E6D7FF',
    shadowColor: '#6B618F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF9F0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E6D7FF',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D5A8C',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B618F',
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E6D7FF',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayHeader: {
    width: '14.28%',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 8,
  },
  dayHeaderText: {
    fontSize: 14,
    color: '#6B618F',
    fontWeight: '500',
  },
  dayCellWrapper: {
    width: '14.28%',
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dayCell: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  dayText: {
    fontSize: 14,
    color: '#5D5A8C',
  },
  otherMonthText: {
    color: '#B0ABC7',
    opacity: 0.6,
  },
  todayCell: {
    backgroundColor: '#8B7BB6',
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  todayText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  streakBackground: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderRadius: 17,
    opacity: 0.2,
    backgroundColor: '#F9A87A',
    zIndex: 1,
  },
});

export default ActivityCalendar; 