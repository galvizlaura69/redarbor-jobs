export const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

export const ENDPOINTS = {
  JOBS: `${API_URL}/remote-jobs`,
  CATEGORIES: `${API_URL}/remote-jobs/categories`,
} as const;