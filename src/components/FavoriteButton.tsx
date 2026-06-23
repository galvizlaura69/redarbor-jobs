import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Job } from '../types/jobs';
import { useFavoritesStore } from '@/store/useFavoritesStore';

interface FavoriteButtonProps {
  job: Job;
  size?: number;
}

export function FavoriteButton({ job, size = 24 }: FavoriteButtonProps) {
  const isFavorite = useFavoritesStore((s) => s.isFavorite(job.id));
  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);

  const toggle = () => {
    isFavorite ? removeFavorite(job.id) : addFavorite(job);
  };

  return (
    <TouchableOpacity
      onPress={toggle}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
      accessibilityRole="button"
    >
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={size}
        color={isFavorite ? '#EF4444' : '#9CA3AF'}
      />
    </TouchableOpacity>
  );
}