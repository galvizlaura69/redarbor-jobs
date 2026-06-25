import { create } from 'zustand';
import { Job, Category, UIState } from '../types/jobs';
import { fetchJobs, fetchCategories } from '@/api/remotive';
import Toast from 'react-native-toast-message';



function normalise(str: string): string {
  return str.replace(/-/g, ' ').toLowerCase();
}

function applyFilters(
  jobs: Job[],
  {
    search,
    category,
    jobType,
  }: { search: string; category: string; jobType: string }
): Job[] {
  let result = jobs;

  if (category) {
    const normCat = normalise(category);
    result = result.filter((j) => j.category?.toLowerCase().includes(normCat));
  }

  if (jobType) {
    const normType = jobType.toLowerCase();
    result = result.filter((j) => j.job_type?.toLowerCase() === normType);
  }

  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company_name.toLowerCase().includes(q)
    );
  }

  return result;
}
interface JobsState {
  jobs: Job[];
  allJobs: Job[];
  uiState: UIState;
  error: string | null;
  search: string;
  category: string;
  jobType: string;
  categories: Category[];
  categoriesLoaded: boolean;
  loadJobs: () => Promise<void>;
  loadCategories: () => Promise<void>;
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  setJobType: (value: string) => void;
  applyFilters: (category: string, jobType: string) => void;
}

export const useJobsStore = create<JobsState>((set, get) => ({
  jobs: [],
  allJobs: [],
  uiState: 'idle',
  error: null,
  search: '',
  category: '',
  jobType: '',
  categories: [],
  categoriesLoaded: false,

  loadJobs: async () => {
    const { search, category, jobType } = get();

    set({ uiState: 'loading', error: null });

    try {
      const allJobs = await fetchJobs();
      const jobs = applyFilters(allJobs, { search, category, jobType });

      set({ allJobs, jobs, uiState: 'success' });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Error desconocido';
      set({ uiState: 'error', error: message });
    }
  },

  loadCategories: async () => {
    if (get().categoriesLoaded) return;
    try {
      const categories = await fetchCategories();
      set({ categories, categoriesLoaded: true });
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Ocurrio un error al cargar las categorias',
      });
    }
  },

  setSearch: (search) => {
    const { allJobs, category, jobType } = get();
    const jobs = applyFilters(allJobs, { search, category, jobType });
    set({ search, jobs });
  },

  applyFilters: (category, jobType) => {
    const { allJobs, search } = get();
    const jobs = applyFilters(allJobs, { search, category, jobType });
    set({ category, jobType, jobs });
  },

  setCategory: (category) => {
    const { allJobs, search, jobType } = get();
    const jobs = applyFilters(allJobs, { search, category, jobType });
    set({ category, jobs });
  },

  setJobType: (jobType) => {
    const { allJobs, search, category } = get();
    const jobs = applyFilters(allJobs, { search, category, jobType });
    set({ jobType, jobs });
  },
}));
