import { View } from 'react-native';

function SkeletonCard() {
  return (
    <View className="bg-white rounded-2xl p-4 mb-3 mx-4 border border-gray-100">
      <View className="flex-row items-center mb-3">
        <View className="w-12 h-12 rounded-xl bg-gray-200" />
        <View className="ml-3 flex-1">
          <View className="h-4 bg-gray-200 rounded-md w-3/4 mb-2" />
          <View className="h-3 bg-gray-100 rounded-md w-1/2" />
        </View>
      </View>
      <View className="h-3 bg-gray-100 rounded-md w-full mb-2" />
      <View className="h-3 bg-gray-100 rounded-md w-2/3" />
    </View>
  );
}

interface LoadingStateProps {
  count?: number;
}

export function LoadingState({ count = 6 }: LoadingStateProps) {
  return (
    <View className="flex-1 pt-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  );
}