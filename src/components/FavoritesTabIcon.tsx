import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { colors } from '@/theme/colors';

interface FavoritesTabIconProps {
  color: string;
  size: number;
}

export function FavoritesTabIcon({ color, size }: FavoritesTabIconProps) {
  const count = useFavoritesStore((s) => s.favorites.length);

  return (
    <View style={styles.wrapper}>
      <Ionicons name="heart-outline" size={size} color={color} />

      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 9 ? '9+' : count}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: colors.error,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
});
