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
  if (isError) {
    return (
      <ErrorState
        message={error ?? undefined}
        onRetry={loadJobs}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <SearchBar value={search} onChangeText={setSearch} />
        <FilterBar
          categories={categories}
          selectedCategory={category}
          selectedJobType={jobType}
          onSelectCategory={setCategory}
          onSelectJobType={setJobType}
        />
      </View>

      {isLoading ? (
        <LoadingState count={6} />
      ) : (
        <FlashList
          data={jobs}
          estimatedItemSize={154}
          keyExtractor={(item: Job) => String(item.id)}
          renderItem={({ item }) => <JobCard job={item} />}
          onRefresh={loadJobs}
          refreshing={uiState === 'loading'}
          ListEmptyComponent={
            <EmptyState
              title="Sin resultados"
              message="Intenta ajustar tu búsqueda o filtros para encontrar lo que buscas."
              icon="briefcase-outline"
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },

  list: {
    paddingTop: 16,
    paddingBottom: 24,
  },

  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  fixedHeader: {
    backgroundColor: '#F9FAFB',
    paddingTop: 22,
    paddingBottom: 8,
    zIndex: 10,
    elevation: 10,
  }
});