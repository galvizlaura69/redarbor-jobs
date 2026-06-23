import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { JobCard } from '@/components/JobCard';
import { EmptyState } from '@/components/EmptyState';
import { Job } from '../../src/types/jobs';

export default function FavoritesScreen() {
  const favorites = useFavoritesStore((s) => s.favorites);

  return (
    <View className="flex-1 bg-gray-50">
      <FlashList
        data={favorites}
        keyExtractor={(item: Job) => String(item.id)}
        renderItem={({ item }: { item: Job }) => <JobCard job={item} />}
        ListEmptyComponent={
          <EmptyState
            title="No favorites yet"
            message="Save jobs you're interested in and they'll appear here."
            icon="heart-outline"
          />
        }
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}
      />
    </View>
  );
}