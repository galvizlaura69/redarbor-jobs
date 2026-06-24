export const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

export const ENDPOINTS = {
  JOBS: `${API_URL}/remote-jobs`,
  CATEGORIES: `${API_URL}/remote-jobs/categories`,
} as const;

export const JOB_TYPES = [
  { label: 'Full-time', value: 'full_time' },
  { label: 'Contract', value: 'contract' },
  { label: 'Part-time', value: 'part_time' },
  { label: 'Freelance', value: 'freelance' },
  { label: 'Internship', value: 'internship' },
];