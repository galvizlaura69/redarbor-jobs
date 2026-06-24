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
        estimatedItemSize={154}
        keyExtractor={(item: Job) => String(item.id)}
        renderItem={({ item }: { item: Job }) => <JobCard job={item} />}
        ListEmptyComponent={
          <EmptyState
            title="Sin favoritos aún"
            message="Guarda empleos que te interesen y aparecerán aquí."
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
    backgroundColor: '#F9FAFB',
  },
  list: {
    paddingTop: 16,
    paddingBottom: 24,
  },
});