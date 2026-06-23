import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavoritesStore } from '@/store/useFavoritesStore';

function FavoritesTabIcon({
  color,
  size,
}: {
  color: string;
  size: number;
}) {
  const count = useFavoritesStore((s) => s.favorites.length);

  return (
    <View style={styles.iconWrapper}>
      <Ionicons name="heart-outline" size={size} color={color} />

      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {count > 9 ? '9+' : count}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#EF4444',
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
});