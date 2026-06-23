import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { JobCard } from '@/components/JobCard';
import { EmptyState } from '@/components/EmptyState';
import { Job } from '../../src/types/jobs';

export default function FavoritesScreen() {
  const favorites = useFavoritesStore((s) => s.favorites);

  return (
    <View style={styles.container}>
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
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // gray-50
  },
  list: {
    paddingTop: 16,
    paddingBottom: 24,
  },
});