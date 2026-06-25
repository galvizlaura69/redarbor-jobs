import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { FavoritesTabIcon } from '@/components/FavoritesTabIcon';
import { colors } from '@/theme/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray400,
        tabBarStyle: {
          borderTopColor: colors.gray100,
          backgroundColor: colors.white,
        },
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTitleStyle: {
          fontWeight: '600',
          color: colors.gray800,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Empleos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <FavoritesTabIcon color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
