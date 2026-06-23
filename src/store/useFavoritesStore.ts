import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Job } from '../types/jobs';

const STORAGE_KEY = '@redarbor_favorites';

interface FavoritesState {
  favorites: Job[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  addFavorite: (job: Job) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  hydrated: false,

  hydrate: async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) set({ favorites: JSON.parse(raw) });
    set({ hydrated: true });
  },

  addFavorite: (job) => {
    const favorites = [...get().favorites, job];
    set({ favorites });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  },

  removeFavorite: (id) => {
    const favorites = get().favorites.filter((j) => j.id !== id);
    set({ favorites });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  },

  isFavorite: (id) => get().favorites.some((j) => j.id === id),
}));