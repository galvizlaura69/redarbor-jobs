import { Job, Category } from '../types/jobs';
import { ENDPOINTS } from '@/constants/api';

export async function fetchJobs(params?: {
  search?: string;
  category?: string;
  job_type?: string;
}): Promise<Job[]> {
  const query = new URLSearchParams();
  if (params?.search)   query.append('search', params.search);
  if (params?.category) query.append('category', params.category);
  if (params?.job_type) query.append('job_type', params.job_type);

  const res = await fetch(`${ENDPOINTS.JOBS}?${query.toString()}`);
  if (!res.ok) throw new Error('Error fetching jobs');
  const data = await res.json();
  return data.jobs as Job[];
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(ENDPOINTS.CATEGORIES);
  if (!res.ok) throw new Error('Error fetching categories');
  const data = await res.json();
  return data.jobs as Category[];
}