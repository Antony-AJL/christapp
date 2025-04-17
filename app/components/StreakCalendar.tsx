import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function StreakCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const days = getDaysInMonth(currentMonth);
  const today = new Date().getDate();
  const isCurrentMonth = new Date().getMonth() === currentMonth.getMonth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Streak</Text>
      <Text style={styles.subtitle}>Practice each day so your streak won't reset!</Text>
      
      <View style={styles.calendar}>
        <View style={styles.header}>
          <Pressable onPress={goToPreviousMonth}>
            <MaterialCommunityIcons name="chevron-left" size={24} color="#5D5A8C" />
          </Pressable>
          <Text style={styles.monthYear}>            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' }).toUpperCase()}
          </Text>
          <Pressable onPress={goToNextMonth}>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#5D5A8C" />
          </Pressable>
        </View>

        <View style={styles.weekDays}>
          {DAYS_OF_WEEK.map(day => (
            <Text key={day} style={styles.weekDay}>{day}</Text>
          ))}
        </View>

        <View style={styles.daysGrid}>
          {days.map((day, index) => (
            <View key={index} style={styles.dayCell}>
              {day && (
                <View style={[
                  styles.day,
                  isCurrentMonth && day === today && styles.today
                ]}>
                  <Text style={[
                    styles.dayText,
                    isCurrentMonth && day === today && styles.todayText
                  ]}>
                    {day}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF9F0',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E6D7FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D5A8C',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B618F',
    textAlign: 'center',
    marginBottom: 16,
  },
  calendar: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthYear: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5D5A8C',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekDay: {
    width: 32,
    textAlign: 'center',
    fontSize: 14,
    color: '#6B618F',
    fontWeight: '500',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  day: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  today: {
    backgroundColor: '#F9A87A',
  },
  dayText: {
    fontSize: 14,
    color: '#5D5A8C',
  },
  todayText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});