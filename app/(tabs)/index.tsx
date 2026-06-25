import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { useJobsStore } from '@/store/useJobsStore';
import { JobCard } from '@/components/JobCard';
import { SearchBar } from '@/components/SearchBar';
import { FilterBar } from '@/components/FilterBar';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';
import { colors } from '@/theme/colors';
import { Job } from '@/types/jobs';

export default function JobsScreen() {
  const jobs = useJobsStore((s) => s.jobs);
  const uiState = useJobsStore((s) => s.uiState);
  const error = useJobsStore((s) => s.error);
  const search = useJobsStore((s) => s.search);
  const category = useJobsStore((s) => s.category);
  const jobType = useJobsStore((s) => s.jobType);
  const loadJobs = useJobsStore((s) => s.loadJobs);
  const setSearch = useJobsStore((s) => s.setSearch);
  const setCategory = useJobsStore((s) => s.setCategory);
  const setJobType = useJobsStore((s) => s.setJobType);
  const applyFilters = useJobsStore((s) => s.applyFilters);

  const isLoading = uiState === 'loading';
  const isError = uiState === 'error';

  useEffect(() => {
    loadJobs();
  }, []);

  if (isLoading) return <LoadingState count={6} />;

  if (isError) {
    return <ErrorState message={error ?? undefined} onRetry={loadJobs} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <SearchBar value={search} onChangeText={setSearch} />
        <FilterBar
          selectedCategory={category}
          selectedJobType={jobType}
          onApply={(cat, type) => applyFilters(cat, type)}
          onClearCategory={() => setCategory('')}
          onClearJobType={() => setJobType('')}
        />
      </View>

      <FlashList
        data={jobs}
        estimatedItemSize={154}
        keyExtractor={(item: Job) => String(item.id)}
        renderItem={({ item }) => <JobCard job={item} />}
        onRefresh={loadJobs}
        refreshing={isLoading}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState
            title="Sin resultados"
            message="Intenta ajustar tu búsqueda o filtros para encontrar lo que buscas."
            icon="briefcase-outline"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  fixedHeader: {
    backgroundColor: colors.gray50,
    paddingTop: 22,
    paddingBottom: 8,
    zIndex: 10,
    elevation: 10,
  },
  list: {
    paddingTop: 16,
    paddingBottom: 24,
  },
});
