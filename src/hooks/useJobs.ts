import { useState, useEffect, useMemo } from 'react';
import { Job } from '@/types/jobs';
import { UIState } from '@/types/jobs';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [jobType, setJobType] = useState('');
  const [uiState, setUIState] = useState<UIState>('idle');
  const [error, setError] = useState<string | null>(null);

  const loadJobs = async () => {
    try {
      setUIState('loading');
      const res = await fetch('https://remotive.com/api/remote-jobs');

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setJobs(data.jobs ?? []);
      setUIState('success');
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Error desconocido';
      setError(message);
      setUIState('error');
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    const q = search.toLowerCase();
    const normType = jobType.toLowerCase();
    const normCategory = category.toLowerCase();

    return jobs.filter((job) => {
      const matchSearch = q
        ? job.title.toLowerCase().includes(q) ||
          job.company_name.toLowerCase().includes(q)
        : true;

      const matchCategory = normCategory
        ? job.category.toLowerCase() === normCategory
        : true;

      const matchType = normType
        ? job.job_type.toLowerCase() === normType
        : true;

      return matchSearch && matchCategory && matchType;
    });
  }, [jobs, search, category, jobType]);

  return {
    jobs: filteredJobs,
    search,
    category,
    jobType,
    uiState,
    error,
    isLoading: uiState === 'loading',
    isError: uiState === 'error',
    setSearch,
    setCategory,
    setJobType,
    loadJobs,
  };
}
