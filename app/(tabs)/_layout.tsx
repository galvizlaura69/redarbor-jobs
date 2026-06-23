import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { View, Text } from 'react-native';

function FavoritesTabIcon({
  color,
  size,
}: {
  color: string;
  size: number;
}) {
  const count = useFavoritesStore((s) => s.favorites.length);

  return (
    <View>
      <Ionicons name="heart-outline" size={size} color={color} />
      {count > 0 && (
        <View className="absolute -top-1 -right-2 bg-red-500 rounded-full w-4 h-4 items-center justify-center">
          <Text className="text-white text-xs font-bold">
            {count > 9 ? '9+' : count}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          borderTopColor: '#F3F4F6',
          backgroundColor: '#FFFFFF',
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTitleStyle: {
          fontWeight: '600',
          color: '#1F2937',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <FavoritesTabIcon color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}