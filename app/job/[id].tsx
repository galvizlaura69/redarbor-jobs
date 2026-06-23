import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Share,
  Linking,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useJobsStore } from '@/store/useJobsStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { FavoriteButton } from '@/components/FavoriteButton';
import { EmptyState } from '@/components/EmptyState';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  const job = useJobsStore((s) => s.jobs.find((j) => j.id === Number(id)))
    ?? useFavoritesStore((s) => s.favorites.find((j) => j.id === Number(id)));

  useLayoutEffect(() => {
    if (job) {
      navigation.setOptions({
        headerRight: () => <FavoriteButton job={job} size={24} />,
      });
    }
  }, [job]);

  if (!job) {
    return (
      <EmptyState
        title="Job not found"
        message="This job is no longer available."
        icon="briefcase-outline"
      />
    );
  }

  const handleApply = () => {
    Linking.openURL(job.url);
  };

  const handleShare = async () => {
    await Share.share({
      title: job.title,
      message: `Check out this job: ${job.title} at ${job.company_name}\n${job.url}`,
    });
  };

  const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, sans-serif;
            font-size: 15px;
            color: #374151;
            line-height: 1.7;
            padding: 0 4px;
            margin: 0;
          }
          h1, h2, h3 { color: #1F2937; }
          a { color: #4F46E5; }
          ul { padding-left: 20px; }
          li { margin-bottom: 6px; }
        </style>
      </head>
      <body>${job.description}</body>
    </html>
  `;

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-4 pt-6 pb-4 border-b border-gray-100">
        <View className="flex-row items-center mb-4">
          {job.company_logo ? (
            <Image
              source={{ uri: job.company_logo }}
              className="w-16 h-16 rounded-2xl"
              resizeMode="contain"
            />
          ) : (
            <View className="w-16 h-16 rounded-2xl bg-indigo-100 items-center justify-center">
              <Text className="text-indigo-600 font-bold text-2xl">
                {job.company_name.charAt(0)}
              </Text>
            </View>
          )}
          <View className="ml-4 flex-1">
            <Text className="text-xl font-bold text-gray-800">
              {job.title}
            </Text>
            <Text className="text-base text-gray-500 mt-1">
              {job.company_name}
            </Text>
          </View>
        </View>
        <View className="flex-row flex-wrap gap-2">
          <View className="bg-indigo-50 px-3 py-1 rounded-full">
            <Text className="text-xs text-indigo-600 font-medium">
              {job.category}
            </Text>
          </View>
          {job.job_type && (
            <View className="bg-emerald-50 px-3 py-1 rounded-full">
              <Text className="text-xs text-emerald-600 font-medium">
                {job.job_type}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View className="px-4 py-4 border-b border-gray-100">
        <View className="flex-row items-center mb-3">
          <Ionicons name="location-outline" size={18} color="#6B7280" />
          <Text className="ml-2 text-sm text-gray-600">
            {job.candidate_required_location || 'Worldwide'}
          </Text>
        </View>
        <View className="flex-row items-center mb-3">
          <Ionicons name="calendar-outline" size={18} color="#6B7280" />
          <Text className="ml-2 text-sm text-gray-600">
            {formatDate(job.publication_date)}
          </Text>
        </View>
        {job.salary && (
          <View className="flex-row items-center">
            <Ionicons name="cash-outline" size={18} color="#6B7280" />
            <Text className="ml-2 text-sm text-gray-600">{job.salary}</Text>
          </View>
        )}
      </View>
      <View className="px-4 pt-4">
        <Text className="text-base font-semibold text-gray-800 mb-3">
          Job Description
        </Text>
        <WebView
          source={{ html: htmlContent }}
          scrollEnabled={false}
          style={{ height: 600 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View className="px-4 py-6 flex-row gap-3">
        <TouchableOpacity
          onPress={handleApply}
          className="flex-1 bg-indigo-600 py-4 rounded-2xl items-center"
        >
          <Text className="text-white font-semibold text-base">
            Apply Now
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleShare}
          className="bg-gray-100 px-4 py-4 rounded-2xl items-center"
        >
          <Ionicons name="share-outline" size={22} color="#4F46E5" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}