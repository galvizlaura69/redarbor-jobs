import { useState, useEffect } from 'react';
import { Category } from '../types/jobs';
import { fetchCategories } from '@/api/remotive';

interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

export function useCategories() {
  const [state, setState] = useState<CategoriesState>({
    categories: [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const categories = await fetchCategories();
        if (!cancelled) {
          setState({ categories, isLoading: false, error: null });
        }
      } catch (e: any) {
        if (!cancelled) {
          setState({ categories: [], isLoading: false, error: e.message });
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return state;
}