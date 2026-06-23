import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="cloud-offline-outline" size={64} color="#F87171" />

      <Text style={styles.title}>Oops!</Text>

      <Text style={styles.message}>{message}</Text>

      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Try again</Text>
        </TouchableOpacity>
      )}
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
  button: {
    marginTop: 24,
    backgroundColor: '#4F46E5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});