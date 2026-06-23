import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { useJobs } from '@/hooks/useJobs';
import { useCategories } from '@/hooks/useCategories';

import { JobCard } from '@/components/JobCard';
import { SearchBar } from '@/components/SearchBar';
import { FilterBar } from '@/components/FilterBar';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';

import { Job } from '../../src/types/jobs';

export default function JobsScreen() {
  const {
    jobs,
    uiState,
    error,
    search,
    category,
    jobType,
    loadJobs,
    setSearch,
    setCategory,
    setJobType,
    isLoading,
    isError,
  } = useJobs();

  const { categories } = useCategories();

  if (isLoading) return <LoadingState count={6} />;
  if (isError)
    return <ErrorState message={error ?? undefined} onRetry={loadJobs} />;

  return (
    <View style={styles.container}>
      <FlashList
        data={jobs}
        keyExtractor={(item: Job) => String(item.id)}
        renderItem={({ item }) => <JobCard job={item} />}
        onRefresh={loadJobs}
        refreshing={uiState === 'loading'}
        ListHeaderComponent={
          <View style={styles.header}>
            <SearchBar value={search} onChangeText={setSearch} />

            <FilterBar
              categories={categories}
              selectedCategory={category}
              selectedJobType={jobType}
              onSelectCategory={setCategory}
              onSelectJobType={setJobType}
            />
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title="No jobs found"
            message="Try adjusting your search or filters to find what you're looking for."
            icon="briefcase-outline"
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
  header: {
    paddingTop: 16,
  },
  list: {
    paddingBottom: 24,
  },
});