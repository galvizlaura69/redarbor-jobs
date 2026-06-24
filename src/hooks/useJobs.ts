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

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      loadJobs();
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [category, jobType]);

  useEffect(() => {
    loadJobs();
  }, []);

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