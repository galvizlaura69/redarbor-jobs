export interface Job {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo: string | null;
  category: string;
  tags: string[];
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary: string;
  description: string;
  company_logo_url: string;
}

export interface JobsResponse {
  jobs: Job[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export type UIState = 'idle' | 'loading' | 'success' | 'error';
