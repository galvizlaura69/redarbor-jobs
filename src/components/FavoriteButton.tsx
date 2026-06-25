import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { Job } from '../types/jobs';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { colors } from '@/theme/colors';

interface FavoriteButtonProps {
  job: Job;
  size?: number;
}

export function FavoriteButton({ job, size = 24 }: FavoriteButtonProps) {
  const isFavorite = useFavoritesStore((s) => s.isFavorite(job.id));
  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);

  const toggle = () => {
    if (isFavorite) {
      removeFavorite(job.id);
      Toast.show({
        type: 'info',
        text1: 'Eliminado de favoritos',
        text2: job.title,
      });
    } else {
      addFavorite(job);
      Toast.show({
        type: 'success',
        text1: 'Agregado a favoritos ❤️',
        text2: job.title,
      });
    }
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
        color={isFavorite ? colors.error : colors.gray400}
      />
    </TouchableOpacity>
  );
}
