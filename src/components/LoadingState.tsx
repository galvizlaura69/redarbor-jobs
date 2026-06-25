import { View, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

function SkeletonCard() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.avatar} />
        <View style={styles.textBlock}>
          <View style={styles.lineLarge} />
          <View style={styles.lineSmall} />
        </View>
      </View>
      <View style={styles.lineFull} />
      <View style={styles.lineMedium} />
    </View>
  );
}

interface LoadingStateProps {
  count?: number;
}

export function LoadingState({ count = 6 }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.gray200,
  },
  textBlock: {
    marginLeft: 12,
    flex: 1,
  },
  lineLarge: {
    height: 16,
    backgroundColor: colors.gray200,
    borderRadius: 6,
    width: '75%',
    marginBottom: 8,
  },
  lineSmall: {
    height: 12,
    backgroundColor: colors.gray100,
    borderRadius: 6,
    width: '50%',
  },
  lineFull: {
    height: 12,
    backgroundColor: colors.gray100,
    borderRadius: 6,
    width: '100%',
    marginBottom: 8,
  },
  lineMedium: {
    height: 12,
    backgroundColor: colors.gray100,
    borderRadius: 6,
    width: '65%',
  },
});
