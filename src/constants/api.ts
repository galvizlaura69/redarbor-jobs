export const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

export const ENDPOINTS = {
  JOBS: `${API_URL}/remote-jobs`,
  CATEGORIES: `${API_URL}/remote-jobs`,
} as const;

export const JOB_TYPES = [
  { label: 'Full time', value: 'full_time' },
  { label: 'Contract', value: 'contract' },
  { label: 'Part time', value: 'part_time' },
  { label: 'Freelance', value: 'freelance' },
];

export const CATEGORIES = [
  { label: 'Software Development', value: 'Software Development' },
  { label: 'Marketing', value: 'Marketing' },
  { label: 'Design', value: 'Design' },
  { label: 'Customer Support', value: 'Customer Support' },
  { label: 'Sales', value: 'Sales' },
  { label: 'Writing', value: 'Writing' },
  { label: 'Product', value: 'Product' },
  { label: 'Medical', value: 'Medical' },
  { label: 'Artificial Intelligence', value: 'Artificial Intelligence' },
  { label: 'All others', value: 'All others' },
];