import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Job } from '../types/jobs';
import { FavoriteButton } from './FavoriteButton';

interface JobCardProps {
  job: Job;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function JobCard({ job }: JobCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/job/${job.id}`)}
      className="bg-white rounded-2xl p-4 mb-3 mx-4 border border-gray-100"
      activeOpacity={0.7}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center flex-1">
          {job.company_logo ? (
            <Image
              source={{ uri: job.company_logo }}
              className="w-12 h-12 rounded-xl"
              resizeMode="contain"
            />
          ) : (
            <View className="w-12 h-12 rounded-xl bg-indigo-100 items-center justify-center">
              <Text className="text-indigo-600 font-bold text-lg">
                {job.company_name.charAt(0)}
              </Text>
            </View>
          )}
          <View className="ml-3 flex-1">
            <Text
              className="text-base font-semibold text-gray-800"
              numberOfLines={1}
            >
              {job.title}
            </Text>
            <Text className="text-sm text-gray-500 mt-0.5" numberOfLines={1}>
              {job.company_name}
            </Text>
          </View>
        </View>
        <FavoriteButton job={job} size={22} />
      </View>

      <View className="mt-3 flex-row flex-wrap gap-2">
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={13} color="#9CA3AF" />
          <Text className="text-xs text-gray-400 ml-1">
            {job.candidate_required_location || 'Worldwide'}
          </Text>
        </View>
        <View className="flex-row items-center ml-3">
          <Ionicons name="calendar-outline" size={13} color="#9CA3AF" />
          <Text className="text-xs text-gray-400 ml-1">
            {formatDate(job.publication_date)}
          </Text>
        </View>
      </View>

      <View className="mt-2 flex-row gap-2">
        <View className="bg-indigo-50 px-2 py-1 rounded-lg">
          <Text className="text-xs text-indigo-600 font-medium">
            {job.category}
          </Text>
        </View>
        {job.job_type && (
          <View className="bg-emerald-50 px-2 py-1 rounded-lg">
            <Text className="text-xs text-emerald-600 font-medium">
              {job.job_type}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}