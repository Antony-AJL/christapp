import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'index') {
            return <MaterialCommunityIcons name={focused ? "home" : "home-outline"} size={24} color={color} />;
          } else if (route.name === 'QuickListenScreen') {
            return <MaterialCommunityIcons name={focused ? "music" : "music-note"} size={24} color={color} />;
          } else if (route.name === 'ContinueScreen') {
            return <MaterialCommunityIcons name="play-circle" size={24} color={color} />;
          } else if (route.name === 'DailyScreen') {
            return <MaterialCommunityIcons name="book-cross" size={24} color={color} />;
          } else if (route.name === 'ProfileScreen') {
            return <MaterialCommunityIcons name={focused ? "account" : "account-outline"} size={24} color={color} />;
          }
        },
        tabBarActiveTintColor: '#8B7BB6',
        tabBarInactiveTintColor: '#6B618F',
        tabBarStyle: {
          backgroundColor: '#FFF9F0',
          borderTopColor: '#E6D7FF',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarShowLabel: false,
      })}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="QuickListenScreen"
        options={{
          title: 'Quick Listen',
        }}
      />
      <Tabs.Screen
        name="ContinueScreen"
        options={{
          title: 'Continue',
        }}
      />
      <Tabs.Screen
        name="DailyScreen"
        options={{
          title: 'Daily',
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFF9F0',
    borderTopWidth: 1,
    borderTopColor: '#E6D7FF',
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
});