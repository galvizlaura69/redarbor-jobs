import { Job, Category } from '@/types/jobs';
import { ENDPOINTS } from '@/constants/api';

export interface FetchJobsParams {
  search?: string;
  category?: string;
  job_type?: string;
}

export async function fetchJobs(params?: FetchJobsParams): Promise<Job[]> {
  const query = new URLSearchParams();

  if (params?.category) query.append('category', params.category);
  if (params?.job_type) query.append('job_type', params.job_type);

  const url = query.toString()
    ? `${ENDPOINTS.JOBS}?${query.toString()}`
    : ENDPOINTS.JOBS;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Error al obtener empleos (HTTP ${res.status})`);
  }

  const data = await res.json();
  return data.jobs as Job[];
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(ENDPOINTS.CATEGORIES);

  if (!res.ok) {
    throw new Error(`Error al obtener categorías (HTTP ${res.status})`);
  }

  const data = await res.json();
  return data.jobs as Category[];
}
