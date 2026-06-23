import { View, Text } from 'react-native';
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
    isEmpty,
  } = useJobs();

  const { categories } = useCategories();

  if (isLoading) return <LoadingState count={6} />;
  if (isError) return <ErrorState message={error ?? undefined} onRetry={loadJobs} />;

  return (
    <View className="flex-1 bg-gray-50">
      <FlashList
        data={jobs}
        keyExtractor={(item: Job) => String(item.id)}
        renderItem={({ item }: { item: Job }) => <JobCard job={item} />}
        onRefresh={loadJobs}
        refreshing={uiState === 'loading'}
        ListHeaderComponent={
          <View className="pt-4">
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
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}