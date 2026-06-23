import { useEffect } from 'react';
import { useJobsStore } from '../store/useJobsStore';

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

  useEffect(() => {
    loadJobs();
  }, [search, category, jobType]);

  return {
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
    isLoading: uiState === 'loading',
    isError: uiState === 'error',
    isEmpty: uiState === 'success' && jobs.length === 0,
  };
}