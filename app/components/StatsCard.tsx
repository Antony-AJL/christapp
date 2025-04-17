import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function StatsCard() {
  return (
    <View style={styles.container}>
      <View style={styles.streakContainer}>        <MaterialCommunityIcons name="fire" size={32} color="#8B7BB6" />
        <Text style={styles.streakCount}>12</Text>
        <Text style={styles.streakLabel}>Day Streak</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>48</Text>
          <Text style={styles.statLabel}>Lessons</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>6.5</Text>
          <Text style={styles.statLabel}>Hours</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>85%</Text>
          <Text style={styles.statLabel}>Completion</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({  container: {    backgroundColor: '#F8F4E3',
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,    borderColor: '#A8D5BA',
  },
  streakContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  streakCount: {
    fontSize: 32,
    fontWeight: 'bold',    color: '#5D5A8C',
    marginTop: 4,
  },
  streakLabel: {
    fontSize: 14,    color: '#5D5A8C',
  },
  divider: {
    height: 1,    backgroundColor: '#E6D7FF',
    marginVertical: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',    color: '#5D5A8C',
  },
  statLabel: {
    fontSize: 14,    color: '#5D5A8C',
    marginTop: 4,
  },
});