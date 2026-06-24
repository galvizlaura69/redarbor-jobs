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
  loadJobs: (params?: { category?: string; jobType?: string }) => Promise<void>;
  setSearch: (v: string) => void;
  setCategory: (v: string) => void;
  setJobType: (v: string) => void;
}

function filterBySearch(jobs: Job[], search: string): Job[] {
  if (!search.trim()) return jobs;
  const q = search.toLowerCase();
  return jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(q) ||
      j.company_name.toLowerCase().includes(q)
  );
}

export const useJobsStore = create<JobsState>((set, get) => ({
  jobs: [],
  allJobs: [],
  uiState: 'idle',
  error: null,
  search: '',
  category: '',
  jobType: '',

loadJobs: async (params) => {
  const category = params?.category ?? get().category;
  const jobType = params?.jobType ?? get().jobType;

  set({ uiState: 'loading', error: null });

  try {
    // Traer todos los jobs sin filtros del API
    const allJobs = await fetchJobs();

    let filteredJobs = [...allJobs];

    // Filtrar categoría
    if (category) {
      const normalizedCategory = category
        .replace(/-/g, ' ')
        .toLowerCase();

      filteredJobs = filteredJobs.filter((job) =>
        job.category?.toLowerCase().includes(normalizedCategory)
      );
    }

    // Filtrar tipo de empleo
    if (jobType) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.job_type?.toLowerCase() ===
          jobType.toLowerCase()
      );
    }

    // Filtrar búsqueda
    const { search } = get();

    const jobs = filterBySearch(filteredJobs, search);

    set({
      allJobs,
      jobs,
      uiState: 'success',
    });
  } catch (e: any) {
    set({
      uiState: 'error',
      error: e.message,
    });
  }
},

setSearch: (search) => {
  const { allJobs, category, jobType } = get();

  let filteredJobs = [...allJobs];

  // Mantener filtro categoría
  if (category) {
    const normalizedCategory = category
      .replace(/-/g, ' ')
      .toLowerCase();

    filteredJobs = filteredJobs.filter((job) =>
      job.category?.toLowerCase().includes(normalizedCategory)
    );
  }

  // Mantener filtro tipo
  if (jobType) {
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.job_type?.toLowerCase() ===
        jobType.toLowerCase()
    );
  }

  const jobs = filterBySearch(filteredJobs, search);

  set({
    search,
    jobs,
  });
},

  setCategory: (category) => set({ category }),
  setJobType: (jobType) => set({ jobType }),
}));