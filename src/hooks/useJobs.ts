import { useState, useEffect, useMemo } from 'react';
import { Job } from '@/types/jobs';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [jobType, setJobType] = useState('');

  const [uiState, setUIState] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  const loadJobs = async () => {
    try {
      setUIState('loading');

      const res = await fetch('https://remotive.com/api/remote-jobs');
      const data = await res.json();

      setJobs(data.jobs || []);
      setUIState('success');
    } catch (e: any) {
      setError(e.message);
      setUIState('error');
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch = search
        ? job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company_name.toLowerCase().includes(search.toLowerCase())
        : true;

      const matchCategory = category
        ? job.category.toLowerCase() === category.toLowerCase()
        : true;

      const matchType = jobType
        ? job.job_type.toLowerCase() === jobType.toLowerCase()
        : true;

      return matchSearch && matchCategory && matchType;
    });
  }, [jobs, search, category, jobType]);

  return {
    jobs: filteredJobs,
    search,
    category,
    jobType,
    setSearch,
    setCategory,
    setJobType,
    loadJobs,
    uiState,
    error,
    isLoading: uiState === 'loading',
    isError: uiState === 'error',
  };
}