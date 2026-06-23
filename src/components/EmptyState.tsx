import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function EmptyState({
  title,
  message,
  icon = 'search-outline',
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-16">
      <Ionicons name={icon} size={64} color="#9CA3AF" />
      <Text className="mt-4 text-xl font-semibold text-gray-700 text-center">
        {title}
      </Text>
      <Text className="mt-2 text-sm text-gray-400 text-center leading-5">
        {message}
      </Text>
    </View>
  );
}