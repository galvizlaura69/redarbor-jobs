import { create } from 'zustand';
import { Job, UIState } from '../types/jobs';
import { fetchJobs } from '@/api/remotive';

interface JobsState {
  jobs: Job[];
  allJobs: Job[];
  uiState: UIState;
  error: string | null;
  search: string;
  category: string;
  jobType: string;
  loadJobs: () => Promise<void>;
  setSearch: (v: string) => void;
  setCategory: (v: string) => void;
  setJobType: (v: string) => void;
}

export const useJobsStore = create<JobsState>((set, get) => ({
  jobs: [],
  allJobs: [],
  uiState: 'idle',
  error: null,
  search: '',
  category: '',
  jobType: '',

  loadJobs: async () => {
    set({ uiState: 'loading', error: null });
    try {
      const { category, jobType } = get();
      const allJobs = await fetchJobs({
        category: category || undefined,
        job_type: jobType || undefined,
      });
      const { search } = get();
      const jobs = filterBySearch(allJobs, search);
      set({ allJobs, jobs, uiState: 'success' });
    } catch (e: any) {
      set({ uiState: 'error', error: e.message });
    }
  },

  setSearch: (search) => {
    const { allJobs } = get();
    const jobs = filterBySearch(allJobs, search);
    set({ search, jobs });
  },

  setCategory: (category) => set({ category }),
  setJobType:  (jobType)  => set({ jobType }),
}));

function filterBySearch(jobs: Job[], search: string): Job[] {
  if (!search.trim()) return jobs;
  const q = search.toLowerCase();
  return jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(q) ||
      j.company_name.toLowerCase().includes(q)
  );
}