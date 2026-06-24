import { useEffect, useRef } from 'react';
import { useJobsStore } from '@/store/useJobsStore';

export function useJobs() {
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
  } = useJobsStore();

  const isFirstRender = useRef(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const handleSetCategory = (value: string) => {
    setCategory(value);
    loadJobs({ category: value, jobType });
  };

  const handleSetJobType = (value: string) => {
    setJobType(value);
    loadJobs({ category, jobType: value });
  };

  return {
    jobs,
    uiState,
    error,
    search,
    category,
    jobType,
    loadJobs,
    setSearch,
    setCategory: handleSetCategory,
    setJobType: handleSetJobType,
    isLoading: uiState === 'loading',
    isError: uiState === 'error',
    isEmpty: uiState === 'success' && jobs.length === 0,
  };
}