import { View, Text, TouchableOpacity } from 'react-native';
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
    <View className="flex-1 items-center justify-center px-8 py-16">
      <Ionicons name="cloud-offline-outline" size={64} color="#F87171" />
      <Text className="mt-4 text-xl font-semibold text-gray-700 text-center">
        Oops!
      </Text>
      <Text className="mt-2 text-sm text-gray-400 text-center leading-5">
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="mt-6 bg-indigo-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold text-sm">Try again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}