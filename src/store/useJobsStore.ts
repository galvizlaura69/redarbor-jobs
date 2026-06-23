import { create } from 'zustand';
import { Job, UIState } from '../types/jobs';
import { fetchJobs } from '@/api/remotive';

interface JobsState {
  jobs: Job[];
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
  uiState: 'idle',
  error: null,
  search: '',
  category: '',
  jobType: '',

  loadJobs: async () => {
    set({ uiState: 'loading', error: null });
    try {
      const { search, category, jobType } = get();
      const jobs = await fetchJobs({
        search: search || undefined,
        category: category || undefined,
        job_type: jobType || undefined,
      });
      set({ jobs, uiState: 'success' });
    } catch (e: any) {
      set({ uiState: 'error', error: e.message });
    }
  },

  setSearch:   (search)   => set({ search }),
  setCategory: (category) => set({ category }),
  setJobType:  (jobType)  => set({ jobType }),
}));