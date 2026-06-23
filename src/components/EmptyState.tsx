import { View, Text, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color="#9CA3AF" />

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  title: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  message: {
    marginTop: 8,
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
});